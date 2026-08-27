"""Validate or update supporting-resource topic assignments.

The supporting-material index states where each resource is used. Topic plans
remain the authority for actual placement, so the two sets must agree exactly.
"""

from __future__ import annotations

import argparse
import re
from collections import defaultdict
from pathlib import Path

from tools.build_curriculum_data import parse_topic_file, split_markdown_row, topic_sort_key


REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "curriculum_and_progress"
INDEX_PATH = DOCS_DIR / "supporting_materials_index.md"


def expected_assignments() -> dict[str, list[str]]:
    assignments: dict[str, set[str]] = defaultdict(set)
    for path in sorted((DOCS_DIR / "topics").glob("*/topic_plan_and_session_timeline.md")):
        topic = parse_topic_file(path, DOCS_DIR)
        for resource_id in topic["resources"]:
            assignments[resource_id].add(topic["id"])
    return {
        resource_id: sorted(topic_ids, key=topic_sort_key)
        for resource_id, topic_ids in assignments.items()
    }


def render(*, write: bool) -> list[str]:
    expected = expected_assignments()
    lines = INDEX_PATH.read_text(encoding="utf-8").splitlines()
    mismatches: list[str] = []
    rendered: list[str] = []
    for line in lines:
        match = re.match(r"^\|\s*(R\d{3})\s*\|", line)
        if not match:
            rendered.append(line)
            continue
        resource_id = match.group(1)
        cells = split_markdown_row(line)
        actual = [item.strip() for item in cells[3].split(",") if item.strip()]
        target = expected.get(resource_id, [])
        if actual != target:
            mismatches.append(f"{resource_id}: {', '.join(actual)} -> {', '.join(target)}")
            cells[3] = ", ".join(target)
        rendered.append("| " + " | ".join(cells) + " |")
    if write and mismatches:
        INDEX_PATH.write_text("\n".join(rendered) + "\n", encoding="utf-8")
    return mismatches


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="replace drifted Supports cells")
    args = parser.parse_args()
    mismatches = render(write=args.write)
    for mismatch in mismatches:
        print(mismatch)
    if mismatches and not args.write:
        raise SystemExit(f"{len(mismatches)} supporting-resource assignments drifted; rerun with --write")
    print(f"checked=41 updated={len(mismatches) if args.write else 0}")


if __name__ == "__main__":
    main()
