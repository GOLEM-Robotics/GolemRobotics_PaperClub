"""Create or verify the reviewed identity lock for canonical entities."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from tools.build_curriculum_data import build_dataset, canonical_identity_snapshot


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--write",
        action="store_true",
        help="Replace the lock with the current reviewed Markdown identities.",
    )
    args = parser.parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    path = repo_root / "curriculum_and_progress" / "canonical_entity_ids.json"
    expected = canonical_identity_snapshot(build_dataset(repo_root))
    if args.write:
        path.write_text(json.dumps(expected, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote {path}")
        return
    actual = json.loads(path.read_text(encoding="utf-8"))
    if actual != expected:
        raise SystemExit(
            "Canonical identities changed. Review the change, then run "
            "`python -m tools.update_identity_lock --write` in the same pull request."
        )
    print(f"Identity lock is current: {path}")


if __name__ == "__main__":
    main()
