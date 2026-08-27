"""Assign durable session IDs without changing curriculum order or content.

The one-time migration seeds IDs from the published legacy alias so that the
result is deterministic. Once written, the registry in each topic document is
authoritative and must move with the session when its display order changes.
"""

from __future__ import annotations

import argparse
import json
import re
import uuid
from pathlib import Path

from tools.build_curriculum_data import get_section, parse_tables


REPO_ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = REPO_ROOT / "curriculum_and_progress" / "topics"
TOPIC_FILE = "topic_plan_and_session_timeline.md"
NAMESPACE = uuid.UUID("bce2db85-828e-4adc-84c8-d300f5e106f9")
REGISTRY_HEADING = "## 10. Stable session identity registry"
LOCK_PATH = REPO_ROOT / "curriculum_and_progress" / "stable_session_ids.json"


def stable_id(legacy_alias: str) -> str:
    value = uuid.uuid5(NAMESPACE, legacy_alias)
    return f"SES-{str(value).upper()}"


def escape_cell(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ").strip()


def registry_for(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    topic_match = re.search(r"^#\s+([FPLDES]\d+)\s+—", text, re.MULTILINE)
    if not topic_match:
        raise ValueError(f"Cannot determine topic ID: {path}")
    topic_id = topic_match.group(1)
    timeline = parse_tables(get_section(text, "5. Ordered session timeline"))
    if not timeline:
        raise ValueError(f"No ordered session timeline: {path}")

    rows = []
    for row in timeline[0]:
        sequence = row.get("#", "").strip()
        if not sequence.isdigit():
            continue
        legacy_alias = f"{topic_id}-S{int(sequence):02d}"
        title = re.split(r"<br\s*/?>", row.get("Session / stage", ""), maxsplit=1)[0]
        title = re.sub(r"[*_`]", "", title).strip()
        rows.append((stable_id(legacy_alias), legacy_alias, int(sequence), title))

    lines = [
        REGISTRY_HEADING,
        "",
        "Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.",
        "",
        "| Stable ID | Legacy aliases | Current sequence | Session |",
        "|---|---|---:|---|",
    ]
    lines.extend(
        f"| `{session_id}` | `{alias}` | {sequence} | {escape_cell(title)} |"
        for session_id, alias, sequence, title in rows
    )
    return "\n".join(lines) + "\n"


def migrate(path: Path, *, write: bool) -> bool:
    text = path.read_text(encoding="utf-8")
    if REGISTRY_HEADING in text:
        return False
    if write:
        path.write_text(text.rstrip() + "\n\n" + registry_for(path), encoding="utf-8")
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="append missing registries")
    parser.add_argument("--write-lock", action="store_true", help="create the published stable-ID lock")
    args = parser.parse_args()
    paths = sorted(TOPICS_DIR.glob(f"*/{TOPIC_FILE}"))
    missing = [path for path in paths if migrate(path, write=args.write)]
    if missing and not args.write:
        for path in missing:
            print(path.relative_to(REPO_ROOT))
        raise SystemExit(f"{len(missing)} topic files need stable session registries; rerun with --write")
    identities: dict[str, str] = {}
    for path in paths:
        tables = parse_tables(get_section(path.read_text(encoding="utf-8"), "10. Stable session identity registry"))
        for row in tables[0]:
            session_id = row["Stable ID"].strip("` ")
            for alias in re.findall(r"[FPLDES]\d+-S\d{2}", row["Legacy aliases"]):
                if alias in identities and identities[alias] != session_id:
                    raise ValueError(f"Alias {alias} maps to multiple stable IDs")
                identities[alias] = session_id
    if args.write_lock:
        if LOCK_PATH.exists():
            raise SystemExit(f"Refusing to replace published lock: {LOCK_PATH}")
        LOCK_PATH.write_text(
            json.dumps({"schema_version": 1, "aliases": dict(sorted(identities.items()))}, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"lock={LOCK_PATH.relative_to(REPO_ROOT)} identities={len(identities)}")
    elif LOCK_PATH.exists():
        locked = json.loads(LOCK_PATH.read_text(encoding="utf-8"))["aliases"]
        if locked != dict(sorted(identities.items())):
            raise SystemExit("Published stable session IDs changed; intentional migrations require explicit lock review")
    print(f"checked={len(paths)} added={len(missing) if args.write else 0}")


if __name__ == "__main__":
    main()
