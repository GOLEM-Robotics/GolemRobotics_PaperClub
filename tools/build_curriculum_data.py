"""Build the deterministic JSON projection used by the curriculum viewer.

Markdown under ``curriculum_and_progress`` remains authoritative. The JSON is
only a generated, browser-readable projection of that dataset.
"""

from __future__ import annotations

import json
import hashlib
import logging
import re
from collections import Counter, defaultdict, deque
from pathlib import Path
from typing import Any, Iterable

log = logging.getLogger("golem.curriculum_data")

TOPIC_FILE = "topic_plan_and_session_timeline.md"
TOPIC_ID_RE = re.compile(r"\b([FPLDES])(\d+)\b")
RANGE_RE = re.compile(r"\b([FPLDES])(\d+)\s*[–—-]\s*([FPLDES])?(\d+)\b")
PAPER_ID_RE = re.compile(r"\bP\d{3}\b")
RESOURCE_ID_RE = re.compile(r"\bR\d{3}\b")
FRONTIER_ID_RE = re.compile(r"\bW\d{3}\b")
SESSION_ID_RE = re.compile(r"^SES-[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}$")
RELATIONSHIP_TYPES = {"hard_prerequisite", "recommended_background", "related", "feedback"}
TOPIC_STATUSES = {
    "Shared Core",
    "Active Research Track",
    "Specialization",
    "Optional",
    "Frontier Watchlist",
    "Deferred",
}
SESSION_CLASSIFICATIONS = {"Required Core", "Frontier Continuation", "Optional Specialization", "Quarantined"}

AREA_DEFINITIONS = {
    "F": {
        "id": "shared_foundations",
        "label": "Shared foundations",
        "short_label": "Foundations",
        "order": 0,
    },
    "P": {
        "id": "perception_world_models",
        "label": "Perception, spatial intelligence, and world models",
        "short_label": "Perception & world models",
        "order": 1,
    },
    "L": {
        "id": "learning_to_act",
        "label": "Learning to act",
        "short_label": "Learning to act",
        "order": 2,
    },
    "D": {
        "id": "data_research_systems",
        "label": "Data, evaluation, and research systems",
        "short_label": "Data & systems",
        "order": 3,
    },
    "E": {
        "id": "language_embodied_reasoning",
        "label": "Language, multimodality, and embodied reasoning",
        "short_label": "Language & reasoning",
        "order": 4,
    },
    "S": {
        "id": "specialization_branches",
        "label": "Specialization branches",
        "short_label": "Specializations",
        "order": 5,
    },
}

STATUS_ORDER = {
    "Shared Core": 0,
    "Active Research Track": 1,
    "Specialization": 2,
    "Optional": 3,
    "Frontier Watchlist": 4,
    "Deferred": 5,
}


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = value.replace("–", "-").replace("—", "-")
    value = re.sub(r"[^a-z0-9]+", "_", value)
    return value.strip("_")


def clean_inline(value: str) -> str:
    value = value.replace("<br>", "\n").replace("<br/>", "\n").replace("<br />", "\n")
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)
    value = value.replace("**", "").replace("__", "").replace("*", "")
    value = re.sub(r"`([^`]+)`", r"\1", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def split_markdown_row(line: str) -> list[str]:
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]

    cells: list[str] = []
    buffer: list[str] = []
    escaped = False
    for char in line:
        if escaped:
            buffer.append(char)
            escaped = False
        elif char == "\\":
            escaped = True
            buffer.append(char)
        elif char == "|":
            cells.append("".join(buffer).strip().replace("\\|", "|"))
            buffer = []
        else:
            buffer.append(char)
    cells.append("".join(buffer).strip().replace("\\|", "|"))
    return cells


def parse_tables(section_text: str) -> list[list[dict[str, str]]]:
    lines = section_text.splitlines()
    tables: list[list[dict[str, str]]] = []
    i = 0
    while i + 1 < len(lines):
        if lines[i].lstrip().startswith("|") and lines[i + 1].lstrip().startswith("|"):
            header = split_markdown_row(lines[i])
            separator = split_markdown_row(lines[i + 1])
            if len(header) == len(separator) and all(re.fullmatch(r":?-{3,}:?", c.strip()) for c in separator):
                rows: list[dict[str, str]] = []
                i += 2
                while i < len(lines) and lines[i].lstrip().startswith("|"):
                    cells = split_markdown_row(lines[i])
                    if len(cells) < len(header):
                        cells += [""] * (len(header) - len(cells))
                    elif len(cells) > len(header):
                        cells = cells[: len(header) - 1] + [" | ".join(cells[len(header) - 1 :])]
                    rows.append(dict(zip(header, cells)))
                    i += 1
                tables.append(rows)
                continue
        i += 1
    return tables


def get_section(text: str, heading: str) -> str:
    pattern = re.compile(rf"^##\s+{re.escape(heading)}\s*$", re.MULTILINE)
    match = pattern.search(text)
    if not match:
        return ""
    start = match.end()
    next_heading = re.search(r"^##\s+", text[start:], re.MULTILINE)
    end = start + next_heading.start() if next_heading else len(text)
    return text[start:end]


def first_table_map(section_text: str, key: str = "Field", value: str = "Specification") -> dict[str, str]:
    tables = parse_tables(section_text)
    if not tables:
        return {}
    rows = tables[0]
    if not rows:
        return {}
    headers = list(rows[0].keys())
    key_name = key if key in headers else headers[0]
    value_name = value if value in headers else headers[1]
    return {clean_inline(row.get(key_name, "")): row.get(value_name, "").strip() for row in rows}


def expand_topic_ids(value: str) -> list[str]:
    ids: set[str] = set()
    masked = value
    for match in RANGE_RE.finditer(value):
        prefix1, start, prefix2, end = match.groups()
        prefix2 = prefix2 or prefix1
        if prefix1 == prefix2:
            lo, hi = int(start), int(end)
            for number in range(min(lo, hi), max(lo, hi) + 1):
                ids.add(f"{prefix1}{number}")
        else:
            ids.add(f"{prefix1}{start}")
            ids.add(f"{prefix2}{end}")
        masked = masked.replace(match.group(0), " ")
    for prefix, number in TOPIC_ID_RE.findall(masked):
        ids.add(f"{prefix}{int(number)}")
    return sorted(ids, key=topic_sort_key)


def topic_sort_key(topic_id: str) -> tuple[int, int]:
    prefix = topic_id[0]
    number = int(topic_id[1:])
    return AREA_DEFINITIONS[prefix]["order"], number

def parse_markdown_link(value: str) -> tuple[str, str | None]:
    match = re.search(r"\[([^\]]+)\]\(([^)]+)\)", value)
    if match:
        return clean_inline(match.group(1)), match.group(2).strip()
    return clean_inline(value), None


def parse_session_registry(text: str, path: Path) -> dict[int, dict[str, Any]]:
    """Parse the durable ID registry appended to a canonical topic plan."""
    tables = parse_tables(get_section(text, "10. Stable session identity registry"))
    if not tables:
        raise ValueError(f"Missing stable session identity registry: {path}")
    registry: dict[int, dict[str, Any]] = {}
    for row in tables[0]:
        session_id = clean_inline(row.get("Stable ID", "")).upper()
        sequence_raw = clean_inline(row.get("Current sequence", ""))
        aliases = re.findall(r"[FPLDES]\d+-S\d{2}", row.get("Legacy aliases", ""))
        if not SESSION_ID_RE.fullmatch(session_id):
            raise ValueError(f"Invalid stable session ID {session_id!r}: {path}")
        if not sequence_raw.isdigit():
            raise ValueError(f"Invalid session registry sequence {sequence_raw!r}: {path}")
        sequence = int(sequence_raw)
        if sequence in registry:
            raise ValueError(f"Duplicate session registry sequence {sequence}: {path}")
        registry[sequence] = {
            "id": session_id,
            "legacy_aliases": aliases,
            "registered_title": clean_inline(row.get("Session", "")),
        }
    return registry


def parse_relationship_registry(path: Path) -> list[dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    tables = parse_tables(text)
    table = next(
        (
            rows
            for rows in tables
            if rows and {"Relationship ID", "Source", "Target", "Type", "Scope", "Rationale"} <= set(rows[0])
        ),
        [],
    )
    if not table:
        raise ValueError(f"No canonical relationship table found: {path}")
    records: list[dict[str, Any]] = []
    for row in table:
        records.append(
            {
                "id": clean_inline(row["Relationship ID"]),
                "source": clean_inline(row["Source"]),
                "target": clean_inline(row["Target"]),
                "type": clean_inline(row["Type"]),
                "scope": clean_inline(row["Scope"]),
                "target_session_ids": re.findall(SESSION_ID_RE.pattern[1:-1], clean_inline(row.get("Target session IDs", ""))),
                "confidence": clean_inline(row.get("Confidence", "")),
                "rationale": clean_inline(row["Rationale"]),
                "evidence": clean_inline(row.get("Evidence", "")),
            }
        )
    return records


def parse_topic_file(path: Path, docs_dir: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    title_match = re.search(r"^#\s+([FPLDES]\d+)\s+—\s+(.+?):\s+Topic Plan and Session Timeline\s*$", text, re.MULTILINE)
    if not title_match:
        raise ValueError(f"Cannot parse topic heading: {path}")
    topic_id = title_match.group(1)
    title = title_match.group(2).strip()

    scope = first_table_map(get_section(text, "1. Topic scope and target depth"))
    execution = first_table_map(get_section(text, "2. Execution status and completion boundary"), value="Value")

    dependency_section = get_section(text, "3. Dependencies and required foundations")
    dependency_tables = parse_tables(dependency_section)
    dependency_rows = dependency_tables[0] if dependency_tables else []
    foundation_map = {
        clean_inline(row.get("Classification", "")): row.get("Requirement", "").strip()
        for row in dependency_rows
    }
    explicit_dependencies = expand_topic_ids(foundation_map.get("Other topic timelines", ""))
    explicit_dependencies = [item for item in explicit_dependencies if item != topic_id]

    resource_rows: list[dict[str, str]] = []
    if len(dependency_tables) > 1:
        resource_rows = dependency_tables[1]
    supporting_resources = sorted(
        {
            row.get("ID", "").strip()
            for row in resource_rows
            if RESOURCE_ID_RE.fullmatch(row.get("ID", "").strip())
        }
    )

    timeline_section = get_section(text, "5. Ordered session timeline")
    timeline_tables = parse_tables(timeline_section)
    if not timeline_tables:
        raise ValueError(f"No session table found: {path}")
    session_rows = timeline_tables[0]
    session_registry = parse_session_registry(text, path)
    sessions: list[dict[str, Any]] = []
    paper_ids: list[str] = []
    seen_paper_ids: set[str] = set()
    session_resource_ids: set[str] = set()

    for row in session_rows:
        sequence_raw = clean_inline(row.get("#", ""))
        if not sequence_raw.isdigit():
            continue
        sequence = int(sequence_raw)
        identity = session_registry.get(sequence)
        if not identity:
            raise ValueError(f"Session {topic_id} S{sequence} is missing a stable identity: {path}")
        session_cell = row.get("Session / stage", "")
        title_parts = re.split(r"<br\s*/?>", session_cell, maxsplit=1)
        session_title = clean_inline(title_parts[0])
        stage = clean_inline(title_parts[1]) if len(title_parts) > 1 else ""
        materials = row.get("Papers and supporting resources", "")
        row_papers = sorted(set(PAPER_ID_RE.findall(materials)))
        row_resources = sorted(set(RESOURCE_ID_RE.findall(materials)))
        row_frontier = sorted(set(FRONTIER_ID_RE.findall(materials)))
        for paper_id in row_papers:
            if paper_id not in seen_paper_ids:
                paper_ids.append(paper_id)
                seen_paper_ids.add(paper_id)
        session_resource_ids.update(row_resources)

        completion = clean_inline(row.get("Completion capability / continuity", ""))
        artifact_match = re.search(r"Artifact:\s*([^;]+)", completion, re.IGNORECASE)
        next_match = re.search(r"(?:next|continuation)\s+(S\d+)", completion, re.IGNORECASE)
        next_alias = None
        if next_match:
            next_alias = f"{topic_id}-S{int(next_match.group(1)[1:]):02d}"
        sessions.append(
            {
                "id": identity["id"],
                "stable_id": identity["id"],
                "legacy_aliases": identity["legacy_aliases"],
                "display_id": f"{topic_id}-S{sequence:02d}",
                "registered_title": identity["registered_title"],
                "topic_id": topic_id,
                "sequence": sequence,
                "title": session_title,
                "stage": stage,
                "classification": clean_inline(row.get("Classification", "")),
                "classification_id": slugify(clean_inline(row.get("Classification", ""))),
                "prerequisites": clean_inline(row.get("Prerequisites", "")),
                "papers": row_papers,
                "resources": row_resources,
                "frontier_items": row_frontier,
                "objective": clean_inline(row.get("Objective / concepts", "")),
                "planned_component": clean_inline(row.get("Planned component", "")),
                "completion": completion,
                "artifact": artifact_match.group(1).strip() if artifact_match else None,
                "next_session_alias": next_alias,
                "next_session_id": None,
                "profile_modes": ["guided", "accelerated", "ai_sprint"],
                "competence_evidence": artifact_match.group(1).strip() if artifact_match else completion,
            }
        )

    if set(session_registry) != {session["sequence"] for session in sessions}:
        raise ValueError(f"Stable identity registry does not match the timeline: {path}")
    sessions_by_alias = {
        alias: session["id"]
        for session in sessions
        for alias in session["legacy_aliases"]
    }
    for session in sessions:
        session["next_session_id"] = sessions_by_alias.get(session["next_session_alias"])
        local_sequences: set[int] = set()
        raw_prerequisites = session["prerequisites"]
        for match in re.finditer(r"\bS(\d+)\s*[–—-]\s*S?(\d+)\b", raw_prerequisites):
            start, end = int(match.group(1)), int(match.group(2))
            local_sequences.update(range(min(start, end), max(start, end) + 1))
        for number in re.findall(r"\bS(\d+)\b", raw_prerequisites):
            local_sequences.add(int(number))
        local_sequences = {number for number in local_sequences if number < session["sequence"]}
        cross_topic_ids = expand_topic_ids(raw_prerequisites)
        cross_topic_ids = [
            candidate
            for candidate in cross_topic_ids
            if candidate != topic_id
            and (
                not candidate.startswith("S")
                or re.search(rf"\bTopic\s+{re.escape(candidate)}\b", raw_prerequisites, re.IGNORECASE)
            )
        ]
        session["readiness"] = {
            "raw": raw_prerequisites,
            "prior_session_ids": [session_registry[number]["id"] for number in sorted(local_sequences)],
            "cross_topic_ids": cross_topic_ids,
            "requires_execution_resources": bool(
                re.search(r"required\s+compute/data/simulator/hardware", raw_prerequisites, re.IGNORECASE)
            ),
        }

    supporting_resources = sorted(set(supporting_resources) | session_resource_ids)

    cross_section = get_section(text, "6. Cross-topic links")
    cross = first_table_map(cross_section, key="Direction", value="Topics / interface")

    prefix = topic_id[0]
    area = AREA_DEFINITIONS[prefix]
    relative_path = path.relative_to(docs_dir).as_posix()
    url = relative_path[:-3] + "/"

    classification_counts = Counter(session["classification"] for session in sessions)
    planned_sessions = int(re.sub(r"\D", "", clean_inline(execution.get("Planned sessions", "0"))) or len(sessions))
    core_sessions = [session for session in sessions if session["classification"] == "Required Core"]
    continuation_sessions = [session for session in sessions if session["classification"] == "Frontier Continuation"]
    optional_sessions = [session for session in sessions if session["classification"] == "Optional Specialization"]
    quarantined_sessions = [session for session in sessions if session["classification"] == "Quarantined"]
    endpoint_match = re.fullmatch(r"S(\d+)", clean_inline(execution.get("Required Core endpoint", "")))
    endpoint_id = session_registry[int(endpoint_match.group(1))]["id"] if endpoint_match else None
    revision_history = first_table_map(
        get_section(text, "9. Revision notes for the master curriculum"), key="Item", value="Decision"
    )

    return {
        "id": topic_id,
        "title": title,
        "short_title": title if len(title) <= 54 else title[:51].rstrip() + "…",
        "area": area["label"],
        "area_id": area["id"],
        "area_short_label": area["short_label"],
        "area_order": area["order"],
        "status": clean_inline(scope.get("Execution status", "")),
        "status_id": slugify(clean_inline(scope.get("Execution status", ""))),
        "covers": clean_inline(scope.get("Covers", "")),
        "excludes": clean_inline(scope.get("Excludes", "")),
        "target_competence": clean_inline(scope.get("Target competence", "")),
        "curriculum_role": clean_inline(scope.get("Curriculum role", "")),
        "literature_verification": clean_inline(scope.get("Literature cutoff / resource verification", "")),
        "planned_sessions": planned_sessions,
        "classification_counts": dict(sorted(classification_counts.items())),
        "required_core_endpoint": clean_inline(execution.get("Required Core endpoint", "")),
        "required_core_endpoint_id": endpoint_id,
        "completion_boundary": clean_inline(execution.get("Completion boundary", "")),
        "completion_model": {
            "required_core_session_ids": [session["id"] for session in core_sessions],
            "continuation_session_ids": [session["id"] for session in continuation_sessions],
            "optional_session_ids": [session["id"] for session in optional_sessions],
            "quarantined_session_ids": [session["id"] for session in quarantined_sessions],
            "validated_competence_evidence": [session["competence_evidence"] for session in core_sessions],
        },
        "revision_history": {key: clean_inline(value) for key, value in revision_history.items()},
        "dependencies": explicit_dependencies,
        "declared_dependency_topics": explicit_dependencies,
        "foundations": {
            "other_topics": clean_inline(foundation_map.get("Other topic timelines", "")),
            "topic_local": clean_inline(foundation_map.get("Topic-local foundation", "")),
            "individual_gap": clean_inline(foundation_map.get("Individual preparation gap", "")),
        },
        "cross_topic_links": {key: clean_inline(value) for key, value in cross.items()},
        "papers": paper_ids,
        "resources": supporting_resources,
        "sessions": sessions,
        "url": url,
        "source_path": relative_path,
        "directory": path.parent.name,
    }


def parse_paper_index(path: Path) -> list[dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    current_topic: str | None = None
    current_area: str | None = None
    papers: list[dict[str, Any]] = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        area_match = re.match(r"^###\s+([A-F])\.\s+(.+)$", line)
        if area_match:
            current_area = area_match.group(2).strip()
        topic_match = re.match(r"^####\s+([FPLDES]\d+)\.\s+(.+)$", line)
        if topic_match:
            current_topic = topic_match.group(1)
        paper_match = re.match(r"^#####\s+(P\d{3})\.\s+\[([^\]]+)\]\((.+)\)\s*$", line)
        if paper_match:
            paper_id, title, url = paper_match.groups()
            fields: dict[str, str] = {}
            j = i + 1
            while j < len(lines) and not lines[j].startswith("##### ") and not lines[j].startswith("#### ") and not lines[j].startswith("### "):
                field_match = re.match(r"^-\s+\*\*([^*]+):\*\*\s*(.*)$", lines[j])
                if field_match:
                    fields[field_match.group(1).strip()] = clean_inline(field_match.group(2))
                j += 1
            authors_year_venue = fields.get("Authors / year / venue", "")
            parts = [part.strip() for part in authors_year_venue.split("·")]
            papers.append(
                {
                    "id": paper_id,
                    "title": clean_inline(title),
                    "url": url.strip(),
                    "topic_id": current_topic,
                    "area": current_area,
                    "authors": parts[0] if parts else "",
                    "year": parts[1] if len(parts) > 1 else "",
                    "venue": parts[2] if len(parts) > 2 else "",
                    "authoritative_version": fields.get("Authoritative version used", ""),
                    "official_project_or_code": fields.get("Official project/code", ""),
                    "role_level_preparation": fields.get("Role / level / preparation", ""),
                    "contribution": fields.get("Contribution", ""),
                    "lineage": fields.get("Lineage and relationships", ""),
                    "limitation": fields.get("Major positioning limitation", ""),
                    "quality_influence_signals": fields.get("Quality/influence signals", ""),
                    "metadata_confidence": fields.get("Metadata and assessment confidence", ""),
                }
            )
            i = j
            continue
        i += 1
    return papers


def parse_resource_index(path: Path) -> list[dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    tables = parse_tables(text)
    resource_table = next((table for table in tables if table and "ID" in table[0] and "Resource" in table[0]), [])
    resources: list[dict[str, Any]] = []
    for row in resource_table:
        resource_id = row.get("ID", "").strip()
        if not RESOURCE_ID_RE.fullmatch(resource_id):
            continue
        title, url = parse_markdown_link(row.get("Resource", ""))
        topics_raw = clean_inline(row.get("Primary topics", row.get("Supports", "")))
        resources.append(
            {
                "id": resource_id,
                "title": title,
                "url": url,
                "type": clean_inline(row.get("Type", "")),
                "topics_raw": topics_raw,
                "topic_ids": expand_topic_ids(topics_raw),
                "required_use": clean_inline(row.get("Required use", row.get("Curriculum role", ""))),
                "status": clean_inline(row.get("Status", "")),
                "confidence": clean_inline(row.get("Confidence", "")),
            }
        )
    return resources


def parse_frontier_index(path: Path) -> list[dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    tables = parse_tables(text)
    frontier_table = next((table for table in tables if table and any(key in table[0] for key in ("ID", "Watch ID")) and any(key in table[0] for key in ("Item", "Title / project", "Paper / project"))), [])
    items: list[dict[str, Any]] = []
    for row in frontier_table:
        id_key = "ID" if "ID" in row else "Watch ID"
        title_key = "Item" if "Item" in row else ("Title / project" if "Title / project" in row else "Paper / project")
        item_id = row.get(id_key, "").strip()
        if not re.fullmatch(r"(?:P|W)\d{3}", item_id):
            continue
        title, url = parse_markdown_link(row.get(title_key, ""))
        related_raw = clean_inline(row.get("Related topic", row.get("Related topics", "")))
        items.append(
            {
                "id": item_id,
                "title": title,
                "url": url,
                "topic_ids": expand_topic_ids(related_raw),
                "related_topics_raw": related_raw,
                "date_added": clean_inline(row.get("Date added", "")),
                "reason": clean_inline(row.get("Reason it may matter", row.get("Why it matters", ""))),
                "maturity": clean_inline(row.get("Maturity / evidence status", row.get("Maturity", ""))),
                "latest_evidence": clean_inline(row.get("Latest evidence", "")),
                "last_checked": clean_inline(row.get("Last checked", "")),
                "review_date": clean_inline(row.get("Review date", "")),
                "decision": clean_inline(row.get("Decision", "")),
            }
        )
    return items


def compute_topic_ranks(nodes: Iterable[str], dependencies: list[dict[str, str]], sort_key=topic_sort_key) -> tuple[dict[str, int], set[tuple[str, str]]]:
    """Return deterministic ranks and identify any blocking cycles."""
    nodes = sorted(set(nodes), key=sort_key)
    outgoing: dict[str, set[str]] = {node: set() for node in nodes}
    for edge in dependencies:
        source, target = edge["source"], edge["target"]
        if source in outgoing and target in outgoing and source != target:
            outgoing[source].add(target)

    index = 0
    stack: list[str] = []
    on_stack: set[str] = set()
    indices: dict[str, int] = {}
    lowlink: dict[str, int] = {}
    components: list[list[str]] = []

    def strongconnect(node: str) -> None:
        nonlocal index
        indices[node] = index
        lowlink[node] = index
        index += 1
        stack.append(node)
        on_stack.add(node)

        for target in sorted(outgoing[node], key=sort_key):
            if target not in indices:
                strongconnect(target)
                lowlink[node] = min(lowlink[node], lowlink[target])
            elif target in on_stack:
                lowlink[node] = min(lowlink[node], indices[target])

        if lowlink[node] == indices[node]:
            component: list[str] = []
            while True:
                member = stack.pop()
                on_stack.remove(member)
                component.append(member)
                if member == node:
                    break
            component.sort(key=sort_key)
            components.append(component)

    for node in nodes:
        if node not in indices:
            strongconnect(node)

    component_of: dict[str, int] = {}
    for component_id, members in enumerate(components):
        for member in members:
            component_of[member] = component_id

    comp_outgoing: dict[int, set[int]] = {component_id: set() for component_id in range(len(components))}
    comp_incoming: dict[int, set[int]] = {component_id: set() for component_id in range(len(components))}
    cycle_edges: set[tuple[str, str]] = set()
    for source, targets in outgoing.items():
        for target in targets:
            source_component = component_of[source]
            target_component = component_of[target]
            if source_component == target_component:
                cycle_edges.add((source, target))
            else:
                comp_outgoing[source_component].add(target_component)
                comp_incoming[target_component].add(source_component)

    indegree = {component_id: len(comp_incoming[component_id]) for component_id in comp_incoming}
    component_key = lambda component_id: min(sort_key(member) for member in components[component_id])
    queue = deque(sorted((component_id for component_id, degree in indegree.items() if degree == 0), key=component_key))
    component_rank = {component_id: 0 for component_id in comp_incoming}
    while queue:
        component_id = queue.popleft()
        for target_component in sorted(comp_outgoing[component_id], key=component_key):
            component_rank[target_component] = max(component_rank[target_component], component_rank[component_id] + 1)
            indegree[target_component] -= 1
            if indegree[target_component] == 0:
                queue.append(target_component)

    ranks = {node: component_rank[component_of[node]] for node in nodes}
    return ranks, cycle_edges


def assign_positions(topics: list[dict[str, Any]], dependencies: list[dict[str, str]]) -> set[tuple[str, str]]:
    """Assign one stable, compact position for the topic-only global map."""
    ranks, cycle_edges = compute_topic_ranks((topic["id"] for topic in topics), dependencies)
    by_area: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for topic in topics:
        by_area[topic["area_id"]].append(topic)
    for area_topics in by_area.values():
        area_topics.sort(key=lambda topic: topic_sort_key(topic["id"]))
        for index, topic in enumerate(area_topics):
            topic["rank"] = ranks[topic["id"]]
            topic["positions"] = {
                "map": {
                    "x": 125 + topic["area_order"] * 205,
                    "y": 80 + index * 98,
                }
            }
    return cycle_edges


def build_dataset(repo_root: Path) -> dict[str, Any]:
    docs_dir = repo_root / "curriculum_and_progress"
    topic_paths = sorted((docs_dir / "topics").glob(f"*/{TOPIC_FILE}"))
    topics = [parse_topic_file(path, docs_dir) for path in topic_paths]
    topics.sort(key=lambda item: topic_sort_key(item["id"]))

    known_topic_ids = {topic["id"] for topic in topics}
    relationship_records = parse_relationship_registry(docs_dir / "relationships.md")
    relationship_records.sort(
        key=lambda edge: (topic_sort_key(edge["target"]), topic_sort_key(edge["source"]), edge["type"])
    )
    hard_relationships = [edge for edge in relationship_records if edge["type"] == "hard_prerequisite"]
    cycle_edges = assign_positions(topics, hard_relationships)
    for edge in relationship_records:
        edge["blocking"] = edge["type"] == "hard_prerequisite"
        edge["cycle"] = edge["blocking"] and (edge["source"], edge["target"]) in cycle_edges

    for topic in topics:
        incoming = [edge for edge in relationship_records if edge["target"] == topic["id"]]
        outgoing = [edge for edge in relationship_records if edge["source"] == topic["id"]]
        topic["relationships"] = {
            "incoming": [edge["id"] for edge in incoming],
            "outgoing": [edge["id"] for edge in outgoing],
        }
        topic["hard_prerequisites"] = [
            edge["source"]
            for edge in incoming
            if edge["type"] == "hard_prerequisite" and edge["scope"] == "topic_entry"
        ]
        topic["session_gate_relationships"] = [
            edge["id"]
            for edge in incoming
            if edge["type"] == "hard_prerequisite" and edge["scope"] != "topic_entry"
        ]
        topic["recommended_background"] = [
            edge["source"] for edge in incoming if edge["type"] == "recommended_background"
        ]
        # Backward-compatible name, now strictly limited to blocking relationships.
        topic["dependencies"] = list(topic["hard_prerequisites"])

    papers = parse_paper_index(docs_dir / "paper_index.md")
    resources = parse_resource_index(docs_dir / "supporting_materials_index.md")
    frontier = parse_frontier_index(docs_dir / "frontier_watchlist.md")

    paper_by_id = {paper["id"]: paper for paper in papers}
    resource_by_id = {resource["id"]: resource for resource in resources}
    frontier_by_id = {item["id"]: item for item in frontier}

    sessions: list[dict[str, Any]] = []
    for topic in topics:
        sessions.extend(topic.pop("sessions"))
        all_topic_papers = topic["papers"]
        topic["primary_papers"] = [
            paper_id for paper_id in all_topic_papers if paper_by_id.get(paper_id, {}).get("topic_id") == topic["id"]
        ]
        topic["cross_referenced_papers"] = [
            paper_id for paper_id in all_topic_papers if paper_by_id.get(paper_id, {}).get("topic_id") != topic["id"]
        ]
        # Backward-compatible name means primary ownership/order, not every session cross-reference.
        topic["papers"] = list(topic["primary_papers"])
        for paper_id in topic["papers"]:
            if paper_id not in paper_by_id:
                log.warning("Topic %s references missing paper %s", topic["id"], paper_id)
        for resource_id in topic["resources"]:
            if resource_id not in resource_by_id:
                log.warning("Topic %s references missing resource %s", topic["id"], resource_id)

    for session in sessions:
        targeted = [
            edge for edge in relationship_records if session["id"] in edge.get("target_session_ids", [])
        ]
        session["relationship_gates"] = [
            edge["id"] for edge in targeted if edge["type"] == "hard_prerequisite"
        ]
        session["recommended_relationships"] = [
            edge["id"] for edge in targeted if edge["type"] == "recommended_background"
        ]

    source_files = topic_paths + [
        docs_dir / "curriculum_map.md",
        docs_dir / "curriculum_table.md",
        docs_dir / "relationships.md",
        docs_dir / "canonical_entity_ids.json",
        docs_dir / "stable_session_ids.json",
        docs_dir / "paper_index.md",
        docs_dir / "supporting_materials_index.md",
        docs_dir / "frontier_watchlist.md",
    ]
    source_digest = hashlib.sha256()
    for path in sorted(source_files):
        source_digest.update(path.relative_to(repo_root).as_posix().encode("utf-8"))
        source_digest.update(b"\0")
        source_digest.update(path.read_bytes())
        source_digest.update(b"\0")

    area_records = [
        {
            "id": area["id"],
            "label": area["label"],
            "short_label": area["short_label"],
            "order": area["order"],
            "topic_ids": [topic["id"] for topic in topics if topic["area_id"] == area["id"]],
        }
        for _, area in sorted(AREA_DEFINITIONS.items(), key=lambda item: item[1]["order"])
    ]

    status_counts = Counter(topic["status"] for topic in topics)
    statuses = [
        {
            "id": slugify(status),
            "label": status,
            "order": STATUS_ORDER.get(status, 99),
            "count": count,
        }
        for status, count in sorted(status_counts.items(), key=lambda item: STATUS_ORDER.get(item[0], 99))
    ]

    paper_metadata = first_table_map((docs_dir / "paper_index.md").read_text(encoding="utf-8"), value="Value")
    resource_metadata = first_table_map((docs_dir / "supporting_materials_index.md").read_text(encoding="utf-8"), value="Value")
    frontier_metadata = first_table_map((docs_dir / "frontier_watchlist.md").read_text(encoding="utf-8"), value="Value")
    maintenance_path = docs_dir / "maintenance" / "state.json"
    maintenance_state = json.loads(maintenance_path.read_text(encoding="utf-8")) if maintenance_path.exists() else {}

    return {
        "schema_version": 2,
        "curriculum_version": "2026.07.22",
        "source_revision": source_digest.hexdigest(),
        "source_of_truth": "Markdown files under curriculum_and_progress/",
        "provenance": {
            "literature_cutoff": clean_inline(paper_metadata.get("Literature-search cutoff", "")),
            "paper_verification": clean_inline(paper_metadata.get("Verification date", "")),
            "resource_verification": clean_inline(resource_metadata.get("Verification date", "")),
            "frontier_verification": clean_inline(frontier_metadata.get("Verification date", "")),
            "next_frontier_review": clean_inline(frontier_metadata.get("Default next review", "")),
            "maintenance_state": "curriculum_and_progress/maintenance/state.json",
            "last_maintenance_scan": maintenance_state.get("last_run"),
            "last_exhaustive_audit": maintenance_state.get("last_exhaustive_audit"),
            "last_deep_review": maintenance_state.get("last_deep_review"),
        },
        "statistics": {
            "topics": len(topics),
            "sessions": len(sessions),
            "papers": len(papers),
            "resources": len(resources),
            "frontier_items": len(frontier),
            "dependencies": len(relationship_records),
            "hard_prerequisites": len(hard_relationships),
            "relationship_types": dict(sorted(Counter(edge["type"] for edge in relationship_records).items())),
        },
        "areas": area_records,
        "statuses": statuses,
        "topics": topics,
        "relationships": relationship_records,
        "dependencies": relationship_records,
        "sessions": sessions,
        "papers": papers,
        "resources": resources,
        "frontier_items": frontier,
    }


def canonical_identity_snapshot(dataset: dict[str, Any]) -> dict[str, Any]:
    """Return the reviewable identity lock for already published entities.

    Titles are retained as human-readable identity anchors. A justified metadata
    correction can update the lock in the same reviewed change, while an
    accidental rename, deletion, reassignment, or relationship-ID reuse fails CI.
    """
    return {
        "schema_version": 1,
        "topics": [
            {"id": item["id"], "title": item["title"]}
            for item in sorted(dataset["topics"], key=lambda item: topic_sort_key(item["id"]))
        ],
        "papers": [
            {"id": item["id"], "title": item["title"], "topic_id": item["topic_id"]}
            for item in sorted(dataset["papers"], key=lambda item: item["id"])
        ],
        "resources": [
            {"id": item["id"], "title": item["title"]}
            for item in sorted(dataset["resources"], key=lambda item: item["id"])
        ],
        "frontier_items": [
            {"id": item["id"], "title": item["title"]}
            for item in sorted(dataset["frontier_items"], key=lambda item: item["id"])
        ],
        "relationships": [
            {
                "id": item["id"],
                "source": item["source"],
                "target": item["target"],
                "type": item["type"],
                "scope": item["scope"],
            }
            for item in sorted(dataset["relationships"], key=lambda item: item["id"])
        ],
    }



def validate_dataset(dataset: dict[str, Any], repo_root: Path) -> None:
    errors: list[str] = []

    def unique_ids(records: list[dict[str, Any]], label: str) -> set[str]:
        ids = [record.get("id") for record in records]
        duplicates = sorted(item for item, count in Counter(ids).items() if count > 1)
        if duplicates:
            errors.append(f"Duplicate {label} IDs: {', '.join(duplicates)}")
        return set(ids)

    topic_ids = unique_ids(dataset["topics"], "topic")
    session_ids = unique_ids(dataset["sessions"], "session")
    paper_ids = unique_ids(dataset["papers"], "paper")
    paper_titles = {paper["id"]: paper["title"] for paper in dataset["papers"]}
    resource_ids = unique_ids(dataset["resources"], "resource")
    frontier_ids = unique_ids(dataset["frontier_items"], "frontier")
    relationship_ids = unique_ids(dataset["relationships"], "relationship")

    entity_kinds = {
        "topic": topic_ids,
        "session": session_ids,
        "paper": paper_ids,
        "resource": resource_ids,
        "frontier": frontier_ids,
        "relationship": relationship_ids,
    }
    global_owners: dict[str, list[str]] = defaultdict(list)
    for kind, identifiers in entity_kinds.items():
        for identifier in identifiers:
            global_owners[identifier].append(kind)
    cross_kind_duplicates = {
        identifier: kinds for identifier, kinds in global_owners.items() if len(kinds) > 1
    }
    if cross_kind_duplicates:
        rendered = ", ".join(
            f"{identifier} ({'/'.join(kinds)})"
            for identifier, kinds in sorted(cross_kind_duplicates.items())
        )
        errors.append(f"Entity IDs are not globally unique: {rendered}")

    relationship_pairs: set[tuple[str, str, str]] = set()
    for edge in dataset["relationships"]:
        if edge["source"] not in topic_ids or edge["target"] not in topic_ids:
            errors.append(f"Invalid dependency endpoint: {edge['source']} -> {edge['target']}")
        if edge["source"] == edge["target"]:
            errors.append(f"Self-referential relationship: {edge['id']}")
        if edge["type"] not in RELATIONSHIP_TYPES:
            errors.append(f"Invalid relationship type for {edge['id']}: {edge['type']}")
        if not edge.get("scope") or not edge.get("rationale"):
            errors.append(f"Relationship {edge['id']} lacks scope or rationale")
        if edge.get("confidence") not in {"high", "manual_review"}:
            errors.append(f"Relationship {edge['id']} has invalid confidence {edge.get('confidence')}")
        if edge["rationale"].startswith("Required before topic entry") or edge["rationale"].startswith("Useful background at"):
            errors.append(f"Relationship {edge['id']} retains a generic rationale")
        if edge.get("blocking") != (edge["type"] == "hard_prerequisite"):
            errors.append(f"Relationship {edge['id']} has inconsistent blocking semantics")
        pair_with_type = (edge["source"], edge["target"], edge["type"])
        if pair_with_type in relationship_pairs:
            errors.append(f"Duplicate relationship semantics: {edge['source']} -> {edge['target']} ({edge['type']})")
        relationship_pairs.add(pair_with_type)
    hard_edges = [edge for edge in dataset["relationships"] if edge["type"] == "hard_prerequisite"]
    _, hard_cycle_edges = compute_topic_ranks(topic_ids, hard_edges)
    if hard_cycle_edges:
        rendered = ", ".join(f"{source}->{target}" for source, target in sorted(hard_cycle_edges))
        errors.append(f"Hard-prerequisite cycle detected: {rendered}")

    session_topic_by_id = {session["id"]: session["topic_id"] for session in dataset["sessions"]}
    for edge in dataset["relationships"]:
        target_sessions = edge.get("target_session_ids", [])
        if edge["scope"] == "target_sessions" and not target_sessions:
            errors.append(f"Session-scoped relationship {edge['id']} has no target sessions")
        for session_id in target_sessions:
            if session_id not in session_topic_by_id:
                errors.append(f"Relationship {edge['id']} references unknown target session {session_id}")
            elif session_topic_by_id[session_id] != edge["target"]:
                errors.append(f"Relationship {edge['id']} targets a session outside {edge['target']}")

    sessions_by_topic = Counter(session["topic_id"] for session in dataset["sessions"])
    sessions_grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    aliases_seen: dict[str, str] = {}
    used_papers: set[str] = set()
    used_resources: set[str] = set()
    for topic in dataset["topics"]:
        topic_id = topic["id"]
        source_path = repo_root / "curriculum_and_progress" / topic["source_path"]
        if not source_path.exists():
            errors.append(f"Missing topic source file for {topic_id}: {topic['source_path']}")
        if topic["planned_sessions"] != sessions_by_topic[topic_id]:
            errors.append(
                f"Session count mismatch for {topic_id}: metadata={topic['planned_sessions']} parsed={sessions_by_topic[topic_id]}"
            )
        if topic["status"] not in TOPIC_STATUSES:
            errors.append(f"Invalid topic status for {topic_id}: {topic['status']}")
        unknown_dependencies = sorted(set(topic["hard_prerequisites"]) - topic_ids)
        if unknown_dependencies:
            errors.append(f"Unknown dependencies in {topic_id}: {', '.join(unknown_dependencies)}")
        for source in topic["declared_dependency_topics"]:
            if not any(edge["source"] == source and edge["target"] == topic_id for edge in dataset["relationships"]):
                errors.append(f"Declared dependency lacks typed relationship: {source} -> {topic_id}")
        unknown_papers = sorted(set(topic["papers"]) - paper_ids)
        if unknown_papers:
            errors.append(f"Unknown papers in {topic_id}: {', '.join(unknown_papers)}")
        unknown_resources = sorted(set(topic["resources"]) - resource_ids)
        if unknown_resources:
            errors.append(f"Unknown resources in {topic_id}: {', '.join(unknown_resources)}")
        used_papers.update(topic["papers"])
        used_resources.update(topic["resources"])
        if not topic.get("positions", {}).get("map"):
            errors.append(f"Missing global-map position for {topic_id}")

        topic_sessions = sorted(
            (session for session in dataset["sessions"] if session["topic_id"] == topic_id),
            key=lambda session: session["sequence"],
        )
        core_sessions = [session for session in topic_sessions if session["classification"] == "Required Core"]
        if core_sessions:
            expected_prefix = list(range(1, len(core_sessions) + 1))
            actual_prefix = [session["sequence"] for session in core_sessions]
            if actual_prefix != expected_prefix:
                errors.append(f"Required Core is not an exact prefix for {topic_id}: {actual_prefix}")
            if topic["required_core_endpoint_id"] != core_sessions[-1]["id"]:
                errors.append(f"Required Core endpoint does not resolve to final core session for {topic_id}")
        elif topic["required_core_endpoint"] != "N/A":
            errors.append(f"Topic {topic_id} has no Required Core but endpoint is {topic['required_core_endpoint']}")

    for session in dataset["sessions"]:
        sessions_grouped[session["topic_id"]].append(session)
        if session["topic_id"] not in topic_ids:
            errors.append(f"Session {session['id']} references unknown topic {session['topic_id']}")
        if not SESSION_ID_RE.fullmatch(session["id"]):
            errors.append(f"Invalid stable session ID: {session['id']}")
        if session["classification"] not in SESSION_CLASSIFICATIONS:
            errors.append(f"Invalid session classification for {session['display_id']}: {session['classification']}")
        if session["display_id"] not in session["legacy_aliases"]:
            errors.append(f"Current display ID is not a legacy alias: {session['display_id']}")
        if session["registered_title"] != session["title"]:
            errors.append(f"Stable registry title drift for {session['display_id']}")
        for alias in session["legacy_aliases"]:
            if alias in aliases_seen:
                errors.append(f"Legacy alias {alias} maps to both {aliases_seen[alias]} and {session['id']}")
            aliases_seen[alias] = session["id"]
        if session["next_session_alias"] and not session["next_session_id"]:
            errors.append(
                f"Session {session['display_id']} declares unresolved transition {session['next_session_alias']}"
            )
        for prerequisite_id in session["readiness"]["prior_session_ids"]:
            prerequisite = next((candidate for candidate in dataset["sessions"] if candidate["id"] == prerequisite_id), None)
            if prerequisite is None:
                errors.append(f"Session {session['display_id']} has unknown prerequisite {prerequisite_id}")
            elif prerequisite["topic_id"] != session["topic_id"] or prerequisite["sequence"] >= session["sequence"]:
                errors.append(f"Session {session['display_id']} has an accidental forward prerequisite")
        for paper_id in session["papers"]:
            if paper_id not in paper_ids:
                errors.append(f"Session {session['id']} references unknown paper {paper_id}")
        if len(session["papers"]) == 1:
            paper_id = session["papers"][0]
            title_prefix = f"{paper_id} — "
            if session["title"].startswith(title_prefix) and paper_id in paper_titles:
                observed_title = session["title"][len(title_prefix):]
                if observed_title != paper_titles[paper_id]:
                    errors.append(
                        f"Session {session['display_id']} uses stale title for {paper_id}: "
                        f"{observed_title!r} != {paper_titles[paper_id]!r}"
                    )
        for resource_id in session["resources"]:
            if resource_id not in resource_ids:
                errors.append(f"Session {session['id']} references unknown resource {resource_id}")
        unknown_cross_topics = sorted(set(session["readiness"]["cross_topic_ids"]) - topic_ids)
        if unknown_cross_topics:
            errors.append(f"Session {session['display_id']} has unknown cross-topic readiness: {', '.join(unknown_cross_topics)}")
        for source_topic in session["readiness"]["cross_topic_ids"]:
            matching_hard_edges = [
                edge
                for edge in dataset["relationships"]
                if edge["source"] == source_topic
                and edge["target"] == session["topic_id"]
                and edge["type"] == "hard_prerequisite"
                and (
                    edge["scope"] == "topic_entry"
                    or session["id"] in edge.get("target_session_ids", [])
                )
            ]
            if not matching_hard_edges:
                errors.append(
                    f"Session {session['display_id']} names {source_topic} as a prerequisite "
                    "without an effective typed hard gate"
                )
            elif not any(edge["id"] in session["relationship_gates"] for edge in matching_hard_edges if edge["scope"] != "topic_entry"):
                if not any(edge["scope"] == "topic_entry" for edge in matching_hard_edges):
                    errors.append(f"Session {session['display_id']} did not receive its scoped relationship gate")

    for topic_id, topic_sessions in sessions_grouped.items():
        ordered = sorted(topic_sessions, key=lambda session: session["sequence"])
        for session in ordered[:-1]:
            if not session["next_session_id"]:
                errors.append(f"Nonterminal session {session['display_id']} lacks a resolved transition")
        if ordered and ordered[-1]["next_session_id"]:
            errors.append(f"Terminal session {ordered[-1]['display_id']} unexpectedly has a transition")

    for paper in dataset["papers"]:
        if paper.get("topic_id") not in topic_ids:
            errors.append(f"Paper {paper['id']} has unknown primary topic {paper.get('topic_id')}")
        for field in (
            "title",
            "authors",
            "year",
            "venue",
            "authoritative_version",
            "official_project_or_code",
            "role_level_preparation",
            "contribution",
            "lineage",
            "limitation",
            "quality_influence_signals",
            "metadata_confidence",
        ):
            if not paper.get(field):
                errors.append(f"Paper {paper['id']} lost canonical metadata field {field}")
    unused_papers = sorted(paper_ids - used_papers)
    if unused_papers:
        errors.append(f"Primary papers not assigned to any topic timeline: {', '.join(unused_papers)}")
    unused_resources = sorted(resource_ids - used_resources)
    if unused_resources:
        errors.append(f"Supporting resources not assigned to any topic timeline: {', '.join(unused_resources)}")

    for resource in dataset["resources"]:
        unknown_topics = sorted(set(resource["topic_ids"]) - topic_ids)
        if unknown_topics:
            errors.append(f"Resource {resource['id']} references unknown topics: {', '.join(unknown_topics)}")
        if not resource["topic_ids"]:
            errors.append(f"Resource {resource['id']} is not mapped to any topic")
        actual_topic_uses = {
            topic["id"] for topic in dataset["topics"] if resource["id"] in topic["resources"]
        }
        if set(resource["topic_ids"]) != actual_topic_uses:
            errors.append(
                f"Resource {resource['id']} assignment drift: index={sorted(resource['topic_ids'])} "
                f"topic_plans={sorted(actual_topic_uses)}"
            )
        if not resource.get("required_use") or not resource.get("status") or not resource.get("confidence"):
            errors.append(f"Resource {resource['id']} lost lifecycle or placement metadata")

    for item in dataset["frontier_items"]:
        unknown_topics = sorted(set(item["topic_ids"]) - topic_ids)
        if unknown_topics:
            errors.append(f"Frontier item {item['id']} references unknown topics: {', '.join(unknown_topics)}")
        for field in (
            "date_added",
            "reason",
            "maturity",
            "latest_evidence",
            "last_checked",
            "review_date",
            "decision",
        ):
            if not item.get(field):
                errors.append(f"Frontier item {item['id']} lost lifecycle field {field}")

    if not session_ids:
        errors.append("No sessions were parsed")
    if not relationship_ids:
        errors.append("No typed relationships were parsed")
    lock_path = repo_root / "curriculum_and_progress" / "stable_session_ids.json"
    if not lock_path.exists():
        errors.append("Published stable-session ID lock is missing")
    else:
        locked_aliases = json.loads(lock_path.read_text(encoding="utf-8")).get("aliases", {})
        if locked_aliases != dict(sorted(aliases_seen.items())):
            errors.append("Stable session IDs or published aliases drifted from stable_session_ids.json")
    identity_lock_path = repo_root / "curriculum_and_progress" / "canonical_entity_ids.json"
    if not identity_lock_path.exists():
        errors.append("Published canonical-entity identity lock is missing")
    else:
        identity_lock = json.loads(identity_lock_path.read_text(encoding="utf-8"))
        if identity_lock != canonical_identity_snapshot(dataset):
            errors.append("Published canonical entity identities drifted from canonical_entity_ids.json")
    if errors:
        raise ValueError("Curriculum explorer dataset validation failed:\n- " + "\n- ".join(errors))

def write_dataset(repo_root: Path) -> Path:
    output_path = repo_root / "viewer" / "assets" / "data" / "curriculum_graph.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    dataset = build_dataset(repo_root)
    validate_dataset(dataset, repo_root)
    rendered = json.dumps(dataset, ensure_ascii=False, indent=2) + "\n"
    previous = output_path.read_text(encoding="utf-8") if output_path.exists() else None
    if previous != rendered:
        output_path.write_text(rendered, encoding="utf-8")
        log.info(
            "Generated curriculum explorer dataset: %d topics, %d sessions, %d papers, %d resources",
            dataset["statistics"]["topics"],
            dataset["statistics"]["sessions"],
            dataset["statistics"]["papers"],
            dataset["statistics"]["resources"],
        )
    return output_path


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    output = write_dataset(repo_root)
    dataset = json.loads(output.read_text(encoding="utf-8"))
    print(json.dumps(dataset["statistics"], indent=2))
    print(output)


if __name__ == "__main__":
    main()
