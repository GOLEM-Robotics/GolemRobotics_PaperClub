"""MkDocs integration for the curriculum dataset and viewer shell."""

from __future__ import annotations

from pathlib import Path
import sys
from typing import Any

from mkdocs.structure.files import File, Files

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT))

from tools.build_curriculum_data import write_dataset  # noqa: E402


VIEWER_DIR = REPO_ROOT / "viewer"
ARCHITECTURE_DIR = REPO_ROOT / "docs"
GOVERNANCE_FILES = (
    "1_operating_principles.md",
    "2_research_curriculum_goal.md",
    "3_research_curriculum_construction_rules.md",
    "4_topic_planning_guideline.md",
    "5_repo_structure.md",
)
PROJECT_FILES = ("CONTRIBUTING.md", "SECURITY.md", "THIRD_PARTY_NOTICES.md")


def on_pre_build(config: Any, **_: Any) -> None:
    """Regenerate the browser projection before MkDocs collects files."""
    write_dataset(REPO_ROOT)


def on_files(files: Files, config: Any, **_: Any) -> Files:
    """Publish viewer files and root governance documents without duplicating them."""
    site_dir = str(config["site_dir"])
    directory_urls = bool(config["use_directory_urls"])

    for source in sorted(path for path in VIEWER_DIR.rglob("*") if path.is_file()):
        relative = source.relative_to(VIEWER_DIR).as_posix()
        files.append(File(relative, str(VIEWER_DIR), site_dir, directory_urls))

    for filename in GOVERNANCE_FILES:
        files.append(File(filename, str(REPO_ROOT), site_dir, directory_urls))

    for filename in PROJECT_FILES:
        files.append(File(filename, str(REPO_ROOT), site_dir, directory_urls))

    files.append(File("architecture.md", str(ARCHITECTURE_DIR), site_dir, directory_urls))
    files.append(File("product_contract.md", str(ARCHITECTURE_DIR), site_dir, directory_urls))
    return files
