"""Auditable rotating maintenance for curriculum links and frontier evidence.

The tool never edits canonical curriculum content. It advances a due queue,
records checks, and emits a proposal report for human review when evidence
requires attention.
"""

from __future__ import annotations

import argparse
import html
import ipaddress
import json
import re
import socket
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from dataclasses import dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

from tools.build_curriculum_data import build_dataset, validate_dataset


USER_AGENT = "GolemRoboticsCurriculumMaintenance/1.0 (+https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub)"
URL_RE = re.compile(r"https?://[^\s,;)]+")
WORD_RE = re.compile(r"[a-z0-9]+")
ARXIV_QUERIES = (
    'all:"vision language action" OR all:"robot foundation model"',
    'all:"robot learning" AND (all:"benchmark" OR all:"replication")',
    'all:"world model" AND (all:"robot" OR all:"embodied")',
)


@dataclass(frozen=True)
class Target:
    key: str
    kind: str
    entity_id: str
    title: str
    url: str


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def normalize_words(value: str) -> set[str]:
    stop = {"the", "a", "an", "of", "for", "and", "in", "to", "with", "via", "on"}
    return {item for item in WORD_RE.findall(value.lower()) if len(item) > 2 and item not in stop}


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise ValueError(f"Maintenance state is missing: {path}")
    state = json.loads(path.read_text(encoding="utf-8"))
    if state.get("schema_version") != 1:
        raise ValueError(f"Unsupported maintenance state schema: {state.get('schema_version')}")
    state.setdefault("cursors", {})
    state.setdefault("checks", {})
    state.setdefault("history", [])
    return state


def targets_from_dataset(dataset: dict[str, Any]) -> dict[str, list[Target]]:
    return {
        "primary_paper": [
            Target(f"primary_paper:{item['id']}", "primary_paper", item["id"], item["title"], item["url"])
            for item in dataset["papers"]
        ],
        "supporting_resource": [
            Target(f"supporting_resource:{item['id']}", "supporting_resource", item["id"], item["title"], item["url"])
            for item in dataset["resources"]
        ],
        "frontier_record": [
            Target(f"frontier_record:{item['id']}", "frontier_record", item["id"], item["title"], item["url"])
            for item in dataset["frontier_items"]
        ],
    }


def validate_state(state: dict[str, Any], dataset: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if state.get("cadence_days") != 2:
        errors.append("cadence_days must remain 2")
    if not isinstance(state.get("rotation_window_days"), int) or state["rotation_window_days"] < 28:
        errors.append("rotation_window_days must cover at least four weeks")
    targets = targets_from_dataset(dataset)
    known = {target.key for records in targets.values() for target in records}
    unknown = sorted(set(state.get("checks", {})) - known)
    if unknown:
        errors.append(f"state contains unknown canonical entities: {', '.join(unknown)}")
    for kind in targets:
        cursor = state.get("cursors", {}).get(kind, 0)
        if not isinstance(cursor, int) or cursor < 0:
            errors.append(f"invalid cursor for {kind}")
    return errors


def choose_rotation(targets: dict[str, list[Target]], state: dict[str, Any], batch_size: int) -> list[Target]:
    selected: list[Target] = []
    nonempty = [kind for kind, records in targets.items() if records]
    quotas = {kind: batch_size // len(nonempty) for kind in nonempty}
    for kind in nonempty[: batch_size % len(nonempty)]:
        quotas[kind] += 1
    for kind, records in targets.items():
        if not records:
            continue
        count = quotas.get(kind, 0)
        cursor = state["cursors"].get(kind, 0) % len(records)
        selected.extend(records[(cursor + offset) % len(records)] for offset in range(count))
        state["cursors"][kind] = (cursor + count) % len(records)
    return selected


def validate_public_url(url: str) -> None:
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("only absolute HTTP(S) URLs are permitted")
    if parsed.username or parsed.password:
        raise ValueError("credential-bearing URLs are not permitted")
    try:
        addresses = {
            item[4][0]
            for item in socket.getaddrinfo(parsed.hostname, parsed.port or (443 if parsed.scheme == "https" else 80))
        }
    except socket.gaierror as error:
        raise ValueError(f"DNS resolution failed: {error}") from error
    if not addresses:
        raise ValueError("URL hostname did not resolve")
    for address in addresses:
        normalized = address.split("%", 1)[0]
        if not ipaddress.ip_address(normalized).is_global:
            raise ValueError(f"non-public destination is not permitted: {address}")


class PublicRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req: Any, fp: Any, code: int, msg: str, headers: Any, newurl: str) -> Any:
        validate_public_url(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def open_remote(request: urllib.request.Request, *, timeout: float, context: ssl.SSLContext) -> Any:
    validate_public_url(request.full_url)
    opener = urllib.request.build_opener(
        urllib.request.HTTPHandler(),
        urllib.request.HTTPSHandler(context=context),
        PublicRedirectHandler(),
    )
    return opener.open(request, timeout=timeout)


def fetch(url: str, timeout: float = 18.0, limit: int = 512_000) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml,application/pdf;q=0.8,*/*;q=0.5",
            "Range": f"bytes=0-{limit - 1}",
        },
    )
    context = ssl.create_default_context()
    try:
        with open_remote(request, timeout=timeout, context=context) as response:
            body = response.read(limit)
            content_type = response.headers.get_content_type()
            final_url = response.geturl()
            status = response.status
    except urllib.error.HTTPError as error:
        return {
            "status": error.code,
            "effective_url": error.geturl(),
            "content_type": error.headers.get_content_type() if error.headers else None,
            "page_title": None,
            "error": f"HTTP {error.code}",
        }
    except Exception as error:  # network evidence is recorded, never hidden
        return {
            "status": 0,
            "effective_url": url,
            "content_type": None,
            "page_title": None,
            "error": f"{type(error).__name__}: {error}",
        }
    page_title = None
    if "html" in content_type:
        decoded = body.decode("utf-8", errors="replace")
        match = re.search(r"<title[^>]*>(.*?)</title>", decoded, re.IGNORECASE | re.DOTALL)
        if match:
            page_title = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", match.group(1)))).strip()[:500]
    return {
        "status": status,
        "effective_url": final_url,
        "content_type": content_type,
        "page_title": page_title,
        "error": None,
    }


def classify_link(target: Target, probe: dict[str, Any], checked_at: str) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    source = urllib.parse.urlparse(target.url)
    final = urllib.parse.urlparse(probe.get("effective_url") or target.url)
    findings: list[dict[str, Any]] = []
    status = int(probe.get("status") or 0)
    if status in {401, 403, 429}:
        decision = "access_limited"
        confidence = "medium"
    elif status == 0 or status >= 500:
        decision = "retry"
        confidence = "low"
    elif status >= 400:
        decision = "proposal_required"
        confidence = "high"
        findings.append({
            "kind": "broken_link",
            "entity": target.key,
            "severity": "high",
            "evidence": probe,
            "decision": "Propose a metadata/link correction; do not rewrite automatically.",
        })
    else:
        decision = "pass"
        confidence = "high"

    redirected = (source.netloc.lower(), source.path.rstrip("/")) != (
        final.netloc.lower(), final.path.rstrip("/")
    )
    if status < 400 and redirected and source.netloc.lower() != final.netloc.lower():
        findings.append({
            "kind": "redirect_review",
            "entity": target.key,
            "severity": "medium",
            "evidence": {"source_url": target.url, "effective_url": probe["effective_url"]},
            "decision": "Review destination identity and update the canonical link only by pull request.",
        })
        decision = "review_redirect"
        confidence = "medium"

    page_title = probe.get("page_title") or ""
    expected_words = normalize_words(target.title)
    observed_words = normalize_words(page_title)
    identity_overlap = len(expected_words & observed_words) / max(1, min(len(expected_words), 7))
    identity_result = "not_observable"
    if page_title:
        identity_result = "pass" if identity_overlap >= 0.28 else "manual_review"
        if identity_result == "manual_review":
            findings.append({
                "kind": "destination_identity_review",
                "entity": target.key,
                "severity": "medium",
                "evidence": {
                    "expected_title": target.title,
                    "page_title": page_title,
                    "token_overlap": round(identity_overlap, 3),
                },
                "decision": "Verify that the destination still represents the intended source.",
            })
            confidence = "medium"

    record = {
        "checked_at": checked_at,
        "source": target.url,
        "evidence": probe,
        "identity_result": identity_result,
        "confidence": confidence,
        "decision": decision,
    }
    return record, findings


def scan_arxiv(known_titles: set[str], since: str | None) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    candidates: dict[str, dict[str, Any]] = {}
    diagnostics: list[dict[str, Any]] = []
    since_date = since[:10] if since else None
    namespace = {"atom": "http://www.w3.org/2005/Atom"}
    for query in ARXIV_QUERIES:
        params = urllib.parse.urlencode({
            "search_query": query,
            "start": 0,
            "max_results": 12,
            "sortBy": "submittedDate",
            "sortOrder": "descending",
        })
        url = f"https://export.arxiv.org/api/query?{params}"
        probe = fetch(url, timeout=25, limit=1_500_000)
        if probe["status"] != 200:
            diagnostics.append({"source": url, "status": probe["status"], "error": probe["error"]})
            continue
        request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with open_remote(request, timeout=25, context=ssl.create_default_context()) as response:
                body = response.read(1_500_001)
                if len(body) > 1_500_000:
                    raise ValueError("arXiv response exceeded the 1.5 MB safety limit")
                root = ET.fromstring(body)
        except Exception as error:
            diagnostics.append({"source": url, "status": 0, "error": str(error)})
            continue
        for entry in root.findall("atom:entry", namespace):
            title = re.sub(r"\s+", " ", entry.findtext("atom:title", default="", namespaces=namespace)).strip()[:500]
            published = entry.findtext("atom:published", default="", namespaces=namespace)
            canonical = entry.findtext("atom:id", default="", namespaces=namespace)
            if not title or normalize_title(title) in known_titles:
                continue
            if since_date and published[:10] <= since_date:
                continue
            summary = re.sub(r"\s+", " ", entry.findtext("atom:summary", default="", namespaces=namespace)).strip()
            key = canonical.rsplit("/", 1)[-1]
            candidates[key] = {
                "kind": "frontier_candidate",
                "title": title,
                "url": canonical,
                "published": published,
                "source": url,
                "evidence": summary[:900],
                "confidence": "low",
                "decision": "Monitor and map to a topic; do not integrate without evidence review.",
            }
    return list(candidates.values()), diagnostics


def normalize_title(value: str) -> str:
    return " ".join(WORD_RE.findall(value.lower()))


def seed_from_audit(state: dict[str, Any], dataset: dict[str, Any], audit_path: Path) -> None:
    audit = json.loads(audit_path.read_text(encoding="utf-8"))
    targets = targets_from_dataset(dataset)
    known = {target.key: target for records in targets.values() for target in records}
    kind_map = {
        "primary_paper": "primary_paper",
        "supporting_resource": "supporting_resource",
        "frontier_record": "frontier_record",
    }
    for item in audit.get("items", []):
        kind = kind_map.get(item.get("kind"))
        key = f"{kind}:{item.get('id')}" if kind else ""
        if key not in known:
            continue
        checked_at = item.get("checked_at") or audit.get("audit_meta", {}).get("checked_at") or date.today().isoformat()
        if len(checked_at) == 10:
            checked_at = f"{checked_at}T00:00:00+00:00"
        confidence = item.get("source_metadata", {}).get("metadata_assessment_confidence") or "medium"
        state["checks"][key] = {
            "checked_at": checked_at,
            "source": item.get("source_url"),
            "evidence": {
                "audit_status": item.get("status"),
                "severity": item.get("severity"),
                "evidence_urls": item.get("evidence_urls", []),
            },
            "identity_result": item.get("checks", {}).get("identity", "manual_review"),
            "confidence": str(confidence).lower(),
            "decision": "corrected_or_recorded_in_exhaustive_audit",
        }
    state["last_exhaustive_audit"] = (
        audit.get("audit_meta", {}).get("checked_at")
        or audit.get("audit_meta", {}).get("completed_at")
        or date.today().isoformat()
    )[:10]
    state["last_deep_review"] = state["last_exhaustive_audit"]


def markdown_text(value: Any, limit: int = 2000) -> str:
    text = re.sub(r"\s+", " ", str(value or "")).strip()[:limit]
    for character in ("\\", "`", "*", "_", "[", "]", "<", ">", "#"):
        text = text.replace(character, f"\\{character}")
    return text


def markdown_report(report: dict[str, Any]) -> str:
    lines = [
        f"# Research maintenance report — {report['run']['started_at'][:10]}",
        "",
        f"- Curriculum source revision: `{report['run']['source_revision']}`",
        f"- Mode: {'offline validation' if report['run']['offline'] else 'network-assisted scan'}",
        f"- Rotating records checked: {report['summary']['checked']}",
        f"- Findings requiring attention: {report['summary']['proposal_findings']}",
        f"- New frontier candidates: {report['summary']['frontier_candidates']}",
        f"- Proposal required: {'yes' if report['proposal_required'] else 'no'}",
        "",
        "## Decision",
        "",
        markdown_text(report["decision"]),
        "",
    ]
    if report["findings"]:
        lines += ["## Findings", ""]
        for item in report["findings"]:
            evidence = json.dumps(item.get("evidence", {}), ensure_ascii=False, indent=2)[:12000]
            evidence = evidence.replace("```", "` ` `")
            lines += [
                f"### {markdown_text(item.get('entity', item.get('title', 'Candidate')), 500)}",
                "",
                f"- Type: `{markdown_text(item['kind'], 100)}`",
                f"- Severity: {markdown_text(item.get('severity', 'low'), 100)}",
                f"- Decision: {markdown_text(item['decision'])}",
                "- Evidence:",
                "",
                "```json",
                evidence,
                "```",
                "",
            ]
    if report["diagnostics"]:
        lines += ["## Scan diagnostics", "", "Transient access failures are evidence, not automatic curriculum changes.", ""]
        for item in report["diagnostics"]:
            lines.append(
                f"- `{markdown_text(item.get('source'), 1000)}`: "
                f"{markdown_text(item.get('status'), 50)} {markdown_text(item.get('error'), 1000)}".rstrip()
            )
        lines.append("")
    lines += [
        "## Review boundary",
        "",
        "This report is a proposal artifact. It did not modify curriculum Markdown, framework documents, or personal workspaces.",
        "",
    ]
    return "\n".join(lines)


def run(args: argparse.Namespace) -> int:
    repo_root = Path(__file__).resolve().parents[1]
    dataset = build_dataset(repo_root)
    validate_dataset(dataset, repo_root)
    state_path = Path(args.state_file) if args.state_file else repo_root / "curriculum_and_progress/maintenance/state.json"
    state = load_state(state_path)
    if args.initialize_from_audit:
        seed_from_audit(state, dataset, Path(args.initialize_from_audit))
        state["source_revision"] = dataset["source_revision"]
        state_path.parent.mkdir(parents=True, exist_ok=True)
        state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Seeded {state_path}")
        return 0
    errors = validate_state(state, dataset)
    if errors:
        raise ValueError("Maintenance state validation failed:\n- " + "\n- ".join(errors))
    if args.validate:
        print(json.dumps({
            "state": str(state_path),
            "known_entities": sum(len(items) for items in targets_from_dataset(dataset).values()),
            "checks": len(state["checks"]),
            "source_revision": dataset["source_revision"],
        }, indent=2))
        return 0

    started_at = utc_now()
    targets = targets_from_dataset(dataset)
    selected = choose_rotation(targets, state, max(3, args.batch_size))
    findings: list[dict[str, Any]] = []
    diagnostics: list[dict[str, Any]] = []
    if not args.offline:
        for target in selected:
            probe = fetch(target.url)
            record, target_findings = classify_link(target, probe, started_at)
            state["checks"][target.key] = record
            findings.extend(target_findings)
        known_titles = {normalize_title(item.title) for kind in targets.values() for item in kind}
        candidates, arxiv_diagnostics = scan_arxiv(known_titles, state.get("last_run"))
        findings.extend(candidates)
        diagnostics.extend(arxiv_diagnostics)

    today = date.fromisoformat(args.today) if args.today else date.today()
    for item in dataset["frontier_items"]:
        try:
            due = date.fromisoformat(item["review_date"]) <= today
        except ValueError:
            due = True
        if due:
            findings.append({
                "kind": "frontier_review_due",
                "entity": f"frontier_record:{item['id']}",
                "severity": "medium",
                "evidence": {
                    "review_date": item["review_date"],
                    "latest_evidence": item.get("latest_evidence"),
                },
                "decision": "Review maturity and explicitly integrate, monitor, reject, or defer.",
            })

    proposal_kinds = {
        "broken_link", "redirect_review", "destination_identity_review",
        "frontier_review_due", "frontier_candidate",
    }
    proposal_findings = [item for item in findings if item["kind"] in proposal_kinds]
    state["last_run"] = started_at
    state["source_revision"] = dataset["source_revision"]
    state["history"] = (
        state["history"]
        + [{
            "run_at": started_at,
            "source_revision": dataset["source_revision"],
            "checked": len(selected) if not args.offline else 0,
            "finding_counts": dict(sorted(Counter(item["kind"] for item in findings).items())),
            "proposal_required": bool(proposal_findings),
        }]
    )[-24:]
    state_path.parent.mkdir(parents=True, exist_ok=True)
    state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report = {
        "schema_version": 1,
        "run": {
            "started_at": started_at,
            "offline": args.offline,
            "source_revision": dataset["source_revision"],
            "state_file": str(state_path),
        },
        "summary": {
            "checked": len(selected) if not args.offline else 0,
            "proposal_findings": len(proposal_findings),
            "frontier_candidates": sum(item["kind"] == "frontier_candidate" for item in findings),
            "finding_types": dict(sorted(Counter(item["kind"] for item in findings).items())),
        },
        "proposal_required": bool(proposal_findings),
        "decision": (
            "Review the evidence and open a scoped pull request; no canonical content was changed."
            if proposal_findings
            else "No material change found; maintenance state advanced without changing curriculum content."
        ),
        "findings": findings,
        "diagnostics": diagnostics,
    }
    report_json = Path(args.report_json)
    report_md = Path(args.report_markdown)
    report_json.parent.mkdir(parents=True, exist_ok=True)
    report_md.parent.mkdir(parents=True, exist_ok=True)
    report_json.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report_md.write_text(markdown_report(report), encoding="utf-8")
    print(json.dumps(report["summary"] | {"proposal_required": report["proposal_required"]}, indent=2))
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--state-file")
    parser.add_argument("--report-json", default="maintenance-report.json")
    parser.add_argument("--report-markdown", default="maintenance-report.md")
    parser.add_argument("--batch-size", type=int, default=18)
    parser.add_argument("--today", help="Deterministic YYYY-MM-DD override for tests.")
    parser.add_argument("--offline", action="store_true", help="Advance/check due state without network requests.")
    parser.add_argument("--validate", action="store_true", help="Validate state and curriculum integration without writing.")
    parser.add_argument("--initialize-from-audit", help="Seed per-entity check evidence from an exhaustive JSON audit.")
    return parser.parse_args(argv)


if __name__ == "__main__":
    try:
        raise SystemExit(run(parse_args(sys.argv[1:])))
    except (ValueError, json.JSONDecodeError) as error:
        print(error, file=sys.stderr)
        raise SystemExit(2)
