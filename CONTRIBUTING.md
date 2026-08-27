# Contributing

Contributions should preserve the distinction between the club framework, the curriculum dataset, and the viewer.

## Protected framework documents

The following files were jointly reviewed and validated by the club and must not be changed as part of ordinary curriculum, viewer, or maintenance work:

- `1_operating_principles.md`
- `2_research_curriculum_goal.md`
- `3_research_curriculum_construction_rules.md`
- `4_topic_planning_guideline.md`
- `5_repo_structure.md`

The test suite checks their exact contents. An intentional revision requires explicit club approval and a corresponding checksum update in `tests/test_curriculum_data.py`.

## Curriculum changes

Treat Markdown under `curriculum_and_progress/` as authoritative. Follow the numbered framework documents when adding or revising topics, sessions, papers, resources, frontier items, or project records.

After a curriculum change, run:

```bash
python -m unittest discover -s tests -v
mkdocs build --strict
```

The build regenerates `viewer/assets/data/curriculum_graph.json`. Commit that deterministic projection with the source Markdown change.

## Viewer changes

Viewer source belongs under `viewer/`; build logic belongs under `tools/` or `hooks/`. Do not place application assets in the curriculum dataset.

Run the Python checks, strict build, and browser smoke test before opening a pull request:

```bash
npm ci
python -m unittest discover -s tests -v
mkdocs build --strict
python -m http.server 8001 --directory site
```

In another terminal:

```bash
BASE_URL=http://127.0.0.1:8001 npm run test:browser
```

## Generated and large files

Do not commit `site/`, local environments, dependency directories, editor state, large datasets, or model weights. Store reproducible instructions, manifests, checksums, or canonical links instead.
