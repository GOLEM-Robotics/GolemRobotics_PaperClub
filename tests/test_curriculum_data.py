"""Regression tests for the Markdown-to-viewer data contract."""

from __future__ import annotations

import json
import re
import unittest
from collections import Counter, defaultdict
from pathlib import Path

from tools import build_curriculum_data as graph


REPO_ROOT = Path(__file__).resolve().parents[1]
GOVERNANCE_SHA256 = {
    "1_operating_principles.md": "3ef3f1c652e4eea89c20fb5d76f47637fc9803438b21ec16d385a6e233f726ce",
    "2_research_curriculum_goal.md": "39debe4cfae74b25e7ffd4e6feeb09eb6f8fd951ff7817bf45c77abc85fc082d",
    "3_research_curriculum_construction_rules.md": "1b1bcc318d01fe5c9e54aba6616750fd6d3b64cfac880ed2a7260fd6b17584f4",
    "4_topic_planning_guideline.md": "7e953cc430d21b41ac1420c26ad97a3a11dce7cde7216bbe742ccccc888b6c2e",
    "5_repo_structure.md": "f50842a6744faeb8d21a8ac2a499e3953ef6161a43d1bb60d2fc9a12cb36e274",
}


class CurriculumGraphTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.dataset = graph.build_dataset(REPO_ROOT)
        cls.topic_ids = {topic["id"] for topic in cls.dataset["topics"]}
        cls.session_ids = {session["id"] for session in cls.dataset["sessions"]}
        cls.paper_ids = {paper["id"] for paper in cls.dataset["papers"]}
        cls.resource_ids = {resource["id"] for resource in cls.dataset["resources"]}

    def test_dataset_passes_authoritative_validator(self) -> None:
        graph.validate_dataset(self.dataset, REPO_ROOT)

    def test_validated_governance_files_are_unchanged(self) -> None:
        import hashlib

        actual = {
            filename: hashlib.sha256((REPO_ROOT / filename).read_bytes()).hexdigest()
            for filename in GOVERNANCE_SHA256
        }
        self.assertEqual(actual, GOVERNANCE_SHA256)

    def test_expected_curriculum_inventory(self) -> None:
        self.assertEqual(
            self.dataset["statistics"],
            {
                "topics": 37,
                "sessions": 400,
                "papers": 193,
                "resources": 41,
                "frontier_items": 17,
                "dependencies": 122,
            },
        )
        self.assertEqual(len(self.dataset["areas"]), 6)
        self.assertEqual(sum(status["count"] for status in self.dataset["statuses"]), 37)

    def test_generated_file_is_current_and_reproducible(self) -> None:
        generated_path = REPO_ROOT / "viewer/assets/data/curriculum_graph.json"
        committed = json.loads(generated_path.read_text(encoding="utf-8"))
        self.assertEqual(committed, self.dataset)
        self.assertRegex(self.dataset["source_revision"], r"^[0-9a-f]{64}$")
        self.assertNotIn("source_updated_at", self.dataset)

    def test_global_graph_contract_is_topic_only(self) -> None:
        self.assertNotIn("global_session_edges", self.dataset)
        self.assertNotIn("area_boxes", self.dataset)
        for topic in self.dataset["topics"]:
            self.assertEqual(set(topic["positions"]), {"map"})
            self.assertEqual(set(topic["positions"]["map"]), {"x", "y"})

    def test_sessions_are_contiguous_and_match_topic_metadata(self) -> None:
        sessions_by_topic: dict[str, list[dict]] = defaultdict(list)
        for session in self.dataset["sessions"]:
            sessions_by_topic[session["topic_id"]].append(session)
        for topic in self.dataset["topics"]:
            sessions = sorted(sessions_by_topic[topic["id"]], key=lambda item: item["sequence"])
            self.assertEqual(
                [session["sequence"] for session in sessions],
                list(range(1, topic["planned_sessions"] + 1)),
                topic["id"],
            )
            endpoint = topic["required_core_endpoint"]
            if topic["status"] == "Frontier Watchlist":
                self.assertEqual(endpoint, "N/A", topic["id"])
                continue
            self.assertRegex(endpoint, r"^S\d+$", topic["id"])
            endpoint_id = f"{topic['id']}-S{int(endpoint[1:]):02d}"
            self.assertIn(endpoint_id, self.session_ids, topic["id"])

    def test_every_content_record_has_a_valid_owner_and_link(self) -> None:
        for paper in self.dataset["papers"]:
            self.assertIn(paper["topic_id"], self.topic_ids, paper["id"])
            self.assertRegex(paper["url"], r"^https?://", paper["id"])
        for resource in self.dataset["resources"]:
            self.assertTrue(resource["topic_ids"], resource["id"])
            self.assertLessEqual(set(resource["topic_ids"]), self.topic_ids, resource["id"])
            self.assertRegex(resource["url"] or "", r"^https?://", resource["id"])
        for item in self.dataset["frontier_items"]:
            self.assertTrue(item["topic_ids"], item["id"])
            self.assertLessEqual(set(item["topic_ids"]), self.topic_ids, item["id"])
            self.assertRegex(item["url"] or "", r"^https?://", item["id"])

    def test_papers_and_resources_are_used_by_timelines(self) -> None:
        used_papers = {paper for topic in self.dataset["topics"] for paper in topic["papers"]}
        used_resources = {resource for topic in self.dataset["topics"] for resource in topic["resources"]}
        self.assertEqual(used_papers, self.paper_ids)
        self.assertEqual(used_resources, self.resource_ids)

    def test_dependency_edges_are_unique_and_non_self_referential(self) -> None:
        edges = [(edge["source"], edge["target"]) for edge in self.dataset["dependencies"]]
        self.assertEqual(len(edges), len(set(edges)))
        self.assertFalse([edge for edge in edges if edge[0] == edge[1]])
        endpoints = Counter(node for edge in edges for node in edge)
        self.assertEqual(set(endpoints), self.topic_ids)

    def test_curriculum_table_matches_topic_timelines(self) -> None:
        text = (REPO_ROOT / "curriculum_and_progress/curriculum_table.md").read_text(encoding="utf-8")
        tables = graph.parse_tables(text)
        index = next(table for table in tables if table and {"ID", "Topic plan", "Sessions"} <= set(table[0]))
        rows = {row["ID"].strip(): row for row in index}
        self.assertEqual(set(rows), self.topic_ids)
        for topic in self.dataset["topics"]:
            row = rows[topic["id"]]
            self.assertEqual(graph.clean_inline(row["Execution status"]), topic["status"], topic["id"])
            self.assertEqual(int(graph.clean_inline(row["Sessions"])), topic["planned_sessions"], topic["id"])
            self.assertEqual(graph.clean_inline(row["Required Core endpoint"]), topic["required_core_endpoint"], topic["id"])
            link = re.search(r"\(([^)]+)\)", row["Topic plan"])
            self.assertIsNotNone(link, topic["id"])
            self.assertTrue((REPO_ROOT / "curriculum_and_progress" / link.group(1)).exists(), topic["id"])

    def test_curriculum_map_paper_sequences_match_topic_timelines(self) -> None:
        text = (REPO_ROOT / "curriculum_and_progress/curriculum_map.md").read_text(encoding="utf-8")
        headings = list(re.finditer(r"^###\s+([FPLDES]\d+)\.\s+.+$", text, re.MULTILINE))
        sections: dict[str, str] = {}
        for index, heading in enumerate(headings):
            end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
            sections[heading.group(1)] = text[heading.end():end]
        self.assertEqual(set(sections), self.topic_ids)
        for topic in self.dataset["topics"]:
            section = sections[topic["id"]]
            status = re.search(r"^- \*\*Execution status:\*\*\s*(.+)$", section, re.MULTILINE)
            self.assertIsNotNone(status, topic["id"])
            self.assertEqual(graph.clean_inline(status.group(1)), topic["status"], topic["id"])
            sequence = re.findall(r"^\|\s*\d+\s*\|\s*\[?(P\d{3})\b", section, re.MULTILINE)
            self.assertEqual(sequence, topic["papers"], topic["id"])


if __name__ == "__main__":
    unittest.main()
