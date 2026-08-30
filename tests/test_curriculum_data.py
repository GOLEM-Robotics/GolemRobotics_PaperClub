"""Semantic regression tests for the canonical curriculum data contract."""

from __future__ import annotations

import hashlib
import json
import re
import unittest
from collections import Counter, defaultdict
from pathlib import Path

from tools import build_curriculum_data as graph
from tools import maintenance


REPO_ROOT = Path(__file__).resolve().parents[1]
GOVERNANCE_SHA256 = {
    "1_operating_principles.md": "3ef3f1c652e4eea89c20fb5d76f47637fc9803438b21ec16d385a6e233f726ce",
    "2_research_curriculum_goal.md": "39debe4cfae74b25e7ffd4e6feeb09eb6f8fd951ff7817bf45c77abc85fc082d",
    "3_research_curriculum_construction_rules.md": "1b1bcc318d01fe5c9e54aba6616750fd6d3b64cfac880ed2a7260fd6b17584f4",
    "4_topic_planning_guideline.md": "7e953cc430d21b41ac1420c26ad97a3a11dce7cde7216bbe742ccccc888b6c2e",
    "5_repo_structure.md": "f50842a6744faeb8d21a8ac2a499e3953ef6161a43d1bb60d2fc9a12cb36e274",
}


class CurriculumDataTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.dataset = graph.build_dataset(REPO_ROOT)
        cls.topic_by_id = {item["id"]: item for item in cls.dataset["topics"]}
        cls.session_by_id = {item["id"]: item for item in cls.dataset["sessions"]}
        cls.paper_by_id = {item["id"]: item for item in cls.dataset["papers"]}

    def test_authoritative_validator_accepts_the_complete_dataset(self) -> None:
        graph.validate_dataset(self.dataset, REPO_ROOT)

    def test_maintenance_rejects_non_public_network_targets(self) -> None:
        for url in (
            "http://127.0.0.1/admin",
            "http://[::1]/admin",
            "http://user:password@example.com/",
            "file:///etc/passwd",
        ):
            with self.subTest(url=url), self.assertRaises(ValueError):
                maintenance.validate_public_url(url)

    def test_maintenance_report_escapes_untrusted_markdown(self) -> None:
        rendered = maintenance.markdown_report({
            "run": {"started_at": "2026-08-27T00:00:00+00:00", "source_revision": "abc", "offline": False},
            "summary": {"checked": 1, "proposal_findings": 1, "frontier_candidates": 0},
            "proposal_required": True,
            "decision": "[click](javascript:alert(1)) # injected",
            "findings": [{
                "kind": "broken_link",
                "entity": "<img src=x onerror=alert(1)>",
                "severity": "high",
                "decision": "**merge now**",
                "evidence": {"payload": "```\n# forged heading"},
            }],
            "diagnostics": [],
        })
        self.assertNotIn("[click](javascript:", rendered)
        self.assertNotIn("### <img", rendered)
        self.assertIn("\\[click\\](javascript:alert(1)) \\# injected", rendered)
        self.assertIn("### \\<img src=x onerror=alert(1)\\>", rendered)
        self.assertIn("` ` `", rendered)

    def test_protected_framework_documents_are_byte_identical(self) -> None:
        actual = {
            filename: hashlib.sha256((REPO_ROOT / filename).read_bytes()).hexdigest()
            for filename in GOVERNANCE_SHA256
        }
        self.assertEqual(actual, GOVERNANCE_SHA256)

    def test_product_contract_has_one_authoritative_root_location(self) -> None:
        contract = REPO_ROOT / "Golem Robotics Research Curriculum — Product Contract.md"
        self.assertTrue(contract.is_file())
        self.assertFalse((REPO_ROOT / "docs/product_contract.md").exists())
        text = contract.read_text(encoding="utf-8")
        self.assertTrue(text.startswith("# Golem Robotics Research Curriculum — Product Contract\n"))
        self.assertIn("# 30. Definition of done", text)

    def test_vendored_runtime_assets_match_reviewed_hashes(self) -> None:
        expected = {
            "viewer/assets/vendor/mathjax-3.2.2-tex-svg.min.js": "d4295dc33744836935c1399feece5159577b34c5c8ffb9f1c6324cd82e03a882",
            "viewer/assets/vendor/MATHJAX_LICENSE.txt": "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30",
        }
        self.assertEqual(
            sorted(path.name for path in (REPO_ROOT / "viewer/assets/vendor").iterdir()),
            ["MATHJAX_LICENSE.txt", "mathjax-3.2.2-tex-svg.min.js"],
            "the learner application must not gain an unreviewed vendored dependency",
        )
        actual = {
            filename: hashlib.sha256((REPO_ROOT / filename).read_bytes()).hexdigest()
            for filename in expected
        }
        self.assertEqual(actual, expected)

    def test_github_actions_are_commit_pinned(self) -> None:
        workflows = sorted((REPO_ROOT / ".github/workflows").glob("*.yml"))
        self.assertTrue(workflows)
        for workflow in workflows:
            for line_number, line in enumerate(workflow.read_text(encoding="utf-8").splitlines(), start=1):
                if re.match(r"\s*-?\s*uses:\s*", line):
                    with self.subTest(workflow=workflow.name, line=line_number):
                        self.assertRegex(line, r"@[0-9a-f]{40}(?:\s+#.*)?$")

    def test_inventory_and_typed_relationship_counts_are_explicit(self) -> None:
        self.assertEqual(self.dataset["schema_version"], 2)
        self.assertEqual(
            self.dataset["statistics"],
            {
                "topics": 37,
                "sessions": 400,
                "papers": 192,
                "resources": 41,
                "frontier_items": 12,
                "dependencies": 255,
                "hard_prerequisites": 187,
                "relationship_types": {
                    "feedback": 2,
                    "hard_prerequisite": 187,
                    "recommended_background": 50,
                    "related": 16,
                },
            },
        )
        self.assertEqual(len(self.dataset["areas"]), 6)
        self.assertEqual(sum(item["count"] for item in self.dataset["statuses"]), 37)

    def test_generated_projection_is_current_and_reproducible(self) -> None:
        generated = json.loads(
            (REPO_ROOT / "viewer/assets/data/curriculum_graph.json").read_text(encoding="utf-8")
        )
        self.assertEqual(generated, self.dataset)
        self.assertRegex(self.dataset["source_revision"], r"^[0-9a-f]{64}$")
        self.assertNotIn("source_updated_at", self.dataset)
        self.assertEqual(
            self.dataset["source_of_truth"],
            "Markdown files under curriculum_and_progress/",
        )

    def test_published_identity_locks_match_every_canonical_entity(self) -> None:
        stable_lock = json.loads(
            (REPO_ROOT / "curriculum_and_progress/stable_session_ids.json").read_text(encoding="utf-8")
        )
        aliases = {
            alias: session["id"]
            for session in self.dataset["sessions"]
            for alias in session["legacy_aliases"]
        }
        self.assertEqual(stable_lock["aliases"], dict(sorted(aliases.items())))
        identity_lock = json.loads(
            (REPO_ROOT / "curriculum_and_progress/canonical_entity_ids.json").read_text(encoding="utf-8")
        )
        self.assertEqual(identity_lock, graph.canonical_identity_snapshot(self.dataset))

    def test_sessions_have_stable_identity_and_lossless_progression(self) -> None:
        by_topic: dict[str, list[dict]] = defaultdict(list)
        seen_aliases: set[str] = set()
        for session in self.dataset["sessions"]:
            self.assertRegex(session["id"], graph.SESSION_ID_RE)
            self.assertEqual(session["id"], session["stable_id"])
            self.assertEqual(session["title"], session["registered_title"])
            self.assertIn(session["display_id"], session["legacy_aliases"])
            self.assertTrue(seen_aliases.isdisjoint(session["legacy_aliases"]))
            seen_aliases.update(session["legacy_aliases"])
            by_topic[session["topic_id"]].append(session)

        self.assertEqual(len(seen_aliases), 400)
        for topic_id, sessions in by_topic.items():
            sessions.sort(key=lambda item: item["sequence"])
            topic = self.topic_by_id[topic_id]
            self.assertEqual(
                [item["sequence"] for item in sessions],
                list(range(1, topic["planned_sessions"] + 1)),
                topic_id,
            )
            for current, following in zip(sessions, sessions[1:]):
                self.assertEqual(current["next_session_id"], following["id"], current["display_id"])
            self.assertIsNone(sessions[-1]["next_session_id"], topic_id)

    def test_completion_models_are_exact_and_do_not_leak_optional_work(self) -> None:
        for topic in self.dataset["topics"]:
            sessions = sorted(
                (item for item in self.dataset["sessions"] if item["topic_id"] == topic["id"]),
                key=lambda item: item["sequence"],
            )
            model = topic["completion_model"]
            classified = {
                "required_core_session_ids": [item["id"] for item in sessions if item["classification"] == "Required Core"],
                "continuation_session_ids": [item["id"] for item in sessions if item["classification"] == "Frontier Continuation"],
                "optional_session_ids": [item["id"] for item in sessions if item["classification"] == "Optional Specialization"],
                "quarantined_session_ids": [item["id"] for item in sessions if item["classification"] == "Quarantined"],
            }
            for key, expected in classified.items():
                self.assertEqual(model[key], expected, topic["id"])
            partition = [item for values in classified.values() for item in values]
            self.assertCountEqual(partition, [item["id"] for item in sessions], topic["id"])
            core = classified["required_core_session_ids"]
            self.assertEqual(core, [item["id"] for item in sessions[: len(core)]], topic["id"])
            if core:
                self.assertEqual(topic["required_core_endpoint_id"], core[-1], topic["id"])
            else:
                self.assertEqual(topic["required_core_endpoint"], "N/A", topic["id"])

    def test_every_raw_cross_topic_prerequisite_has_an_effective_hard_gate(self) -> None:
        for session in self.dataset["sessions"]:
            for source in session["readiness"]["cross_topic_ids"]:
                matches = [
                    edge
                    for edge in self.dataset["relationships"]
                    if edge["source"] == source
                    and edge["target"] == session["topic_id"]
                    and edge["type"] == "hard_prerequisite"
                    and (
                        edge["scope"] == "topic_entry"
                        or session["id"] in edge["target_session_ids"]
                    )
                ]
                self.assertTrue(matches, f"{session['display_id']}: {source}")
                scoped_ids = {edge["id"] for edge in matches if edge["scope"] != "topic_entry"}
                if scoped_ids:
                    self.assertLessEqual(scoped_ids, set(session["relationship_gates"]))

    def test_relationship_semantics_are_complete_acyclic_and_scoped(self) -> None:
        allowed_types = {"hard_prerequisite", "recommended_background", "related", "feedback"}
        pairs: set[tuple[str, str, str]] = set()
        for edge in self.dataset["relationships"]:
            self.assertIn(edge["type"], allowed_types, edge["id"])
            self.assertIn(edge["source"], self.topic_by_id, edge["id"])
            self.assertIn(edge["target"], self.topic_by_id, edge["id"])
            self.assertNotEqual(edge["source"], edge["target"], edge["id"])
            key = (edge["source"], edge["target"], edge["type"])
            self.assertNotIn(key, pairs, edge["id"])
            pairs.add(key)
            self.assertTrue(edge["rationale"], edge["id"])
            self.assertTrue(edge["evidence"], edge["id"])
            self.assertIn(edge["confidence"], {"high", "manual_review"}, edge["id"])
            self.assertEqual(edge["blocking"], edge["type"] == "hard_prerequisite", edge["id"])
            if edge["scope"] == "target_sessions":
                self.assertTrue(edge["target_session_ids"], edge["id"])
            for session_id in edge["target_session_ids"]:
                self.assertEqual(self.session_by_id[session_id]["topic_id"], edge["target"], edge["id"])

        hard = [item for item in self.dataset["relationships"] if item["type"] == "hard_prerequisite"]
        _, cycles = graph.compute_topic_ranks(self.topic_by_id, hard)
        self.assertFalse(cycles)
        self.assertEqual(
            next(item for item in self.dataset["relationships"] if item["source"] == "E2" and item["target"] == "D4")["type"],
            "hard_prerequisite",
        )
        self.assertEqual(
            next(item for item in self.dataset["relationships"] if item["source"] == "D4" and item["target"] == "E2")["type"],
            "feedback",
        )

    def test_global_map_contract_contains_topics_not_session_nodes(self) -> None:
        self.assertNotIn("global_session_edges", self.dataset)
        self.assertNotIn("area_boxes", self.dataset)
        for topic in self.dataset["topics"]:
            self.assertEqual(set(topic["positions"]), {"map"})
            self.assertEqual(set(topic["positions"]["map"]), {"x", "y"})

    def test_paper_metadata_is_complete_and_primary_ownership_is_unique(self) -> None:
        required = {
            "title", "authors", "year", "venue", "url", "authoritative_version",
            "official_project_or_code", "role_level_preparation", "contribution", "lineage",
            "limitation", "quality_influence_signals", "metadata_confidence",
        }
        primary_uses: Counter[str] = Counter()
        for topic in self.dataset["topics"]:
            self.assertEqual(topic["papers"], topic["primary_papers"])
            self.assertTrue(set(topic["papers"]).isdisjoint(topic["cross_referenced_papers"]))
            primary_uses.update(topic["papers"])
        self.assertEqual(set(primary_uses), set(self.paper_by_id))
        self.assertTrue(all(count == 1 for count in primary_uses.values()))
        for paper in self.dataset["papers"]:
            self.assertFalse(required - paper.keys(), paper["id"])
            self.assertTrue(all(paper[field] for field in required), paper["id"])
            self.assertIn(paper["topic_id"], self.topic_by_id)
            self.assertRegex(paper["url"], r"^https?://")

    def test_resource_placement_is_bidirectional_and_frontier_lifecycle_survives(self) -> None:
        for resource in self.dataset["resources"]:
            actual = {
                topic["id"] for topic in self.dataset["topics"]
                if resource["id"] in topic["resources"]
            }
            self.assertEqual(set(resource["topic_ids"]), actual, resource["id"])
            self.assertTrue(resource["required_use"], resource["id"])
            self.assertTrue(resource["status"], resource["id"])
            self.assertTrue(resource["confidence"], resource["id"])
            self.assertRegex(resource["url"], r"^https?://")
        for item in self.dataset["frontier_items"]:
            for field in (
                "date_added",
                "reason",
                "maturity",
                "latest_evidence",
                "last_checked",
                "review_date",
                "decision",
            ):
                self.assertTrue(item[field], f"{item['id']}:{field}")
            self.assertLessEqual(set(item["topic_ids"]), set(self.topic_by_id))
            self.assertRegex(item["url"], r"^https?://")

    def test_curriculum_table_matches_topic_timelines(self) -> None:
        text = (REPO_ROOT / "curriculum_and_progress/curriculum_table.md").read_text(encoding="utf-8")
        tables = graph.parse_tables(text)
        rows = {
            row["ID"].strip(): row
            for table in tables if table and {"ID", "Topic plan", "Sessions"} <= set(table[0])
            for row in table
        }
        self.assertEqual(set(rows), set(self.topic_by_id))
        for topic in self.dataset["topics"]:
            row = rows[topic["id"]]
            self.assertEqual(graph.clean_inline(row["Execution status"]), topic["status"])
            self.assertEqual(int(graph.clean_inline(row["Sessions"])), topic["planned_sessions"])
            self.assertEqual(graph.clean_inline(row["Required Core endpoint"]), topic["required_core_endpoint"])
            link = re.search(r"\(([^)]+)\)", row["Topic plan"])
            self.assertIsNotNone(link)
            self.assertTrue((REPO_ROOT / "curriculum_and_progress" / link.group(1)).exists())
        paper_titles = {paper["id"]: paper["title"] for paper in self.dataset["papers"]}
        for paper_id, title in re.findall(
            r"S\d+\s+(P\d{3})\s+—\s+(.+?)\s+\((?:Required Core|Frontier Continuation|Optional Specialization)\)",
            text,
        ):
            self.assertEqual(title, paper_titles[paper_id], paper_id)

    def test_curriculum_map_primary_sequences_match_executable_timelines(self) -> None:
        text = (REPO_ROOT / "curriculum_and_progress/curriculum_map.md").read_text(encoding="utf-8")
        headings = list(re.finditer(r"^###\s+([FPLDES]\d+)\.\s+.+$", text, re.MULTILINE))
        sections = {
            heading.group(1): text[
                heading.end(): headings[index + 1].start() if index + 1 < len(headings) else len(text)
            ]
            for index, heading in enumerate(headings)
        }
        self.assertEqual(set(sections), set(self.topic_by_id))
        for topic in self.dataset["topics"]:
            status = re.search(r"^- \*\*Execution status:\*\*\s*(.+)$", sections[topic["id"]], re.MULTILINE)
            self.assertIsNotNone(status)
            self.assertEqual(graph.clean_inline(status.group(1)), topic["status"])
            sequence = re.findall(r"^\|\s*\d+\s*\|\s*\[?(P\d{3})\b", sections[topic["id"]], re.MULTILINE)
            self.assertEqual(sequence, topic["primary_papers"], topic["id"])
            for paper_id, title in re.findall(
                r"^\|\s*\d+\s*\|\s*\[(P\d{3})\s+—\s+([^]]+)\]",
                sections[topic["id"]],
                re.MULTILINE,
            ):
                self.assertEqual(title, self.paper_by_id[paper_id]["title"], paper_id)


if __name__ == "__main__":
    unittest.main()
