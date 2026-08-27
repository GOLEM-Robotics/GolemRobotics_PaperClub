# Golem Robotics Paper Club Curriculum

A paper-driven, experiment-centered learning resource for robot learning, embodied intelligence, and physical AI.

The repository has two complementary interfaces:

- Markdown documents are the authoritative curriculum, paper, resource, and topic records.
- The static Curriculum Explorer makes that material easier to orient within, search, sequence, and track.

There is no backend, database, account system, runtime API, React application, or frontend build step. A standard-library Python hook validates the Markdown and generates one normalized JSON file during every MkDocs build. The browser renders that file with a locally vendored Cytoscape.js module.

## Use the curriculum

The explorer provides five deliberate views:

- **Overview** — inventory, six curriculum areas, progress, and recommended next topics.
- **Map** — a stable, topic-only dependency map.
- **Focus** — direct or transitive prerequisites and dependents for one selected topic.
- **Topic** — summary, ordered sessions, primary papers, resources, and related topics.
- **Table** — a dense, keyboard-accessible alternative to the graph.

Search covers topics, sessions, papers, authors, resources, and frontier items. Every result opens the relevant topic tab. Progress is optional, stored only in the current browser, and used to calculate readiness and continuation suggestions. Selected topics, tabs, and Focus options are encoded in the URL for sharing and browser navigation.

The graph is never the only route to curriculum information. The conventional documentation navigation, topic workspaces, table, and Markdown source links remain available without graph interaction.

## Local preview

    python3 -m venv .venv
    source .venv/bin/activate
    python -m pip install -r requirements.txt
    mkdocs serve

Open <http://127.0.0.1:8000>. If that port is occupied:

    mkdocs serve -a 127.0.0.1:8001

## Validate

Run the content and data-contract tests, then perform a strict site build:

    python -m unittest discover -s tests -v
    mkdocs build --strict

The browser smoke test is optional for curriculum-only edits and required for explorer changes:

    npm install
    mkdocs serve -a 127.0.0.1:8001
    npm run test:browser

The smoke test uses the installed Chrome binary by default. Override either dependency when needed:

    CHROME_PATH=/path/to/chrome BASE_URL=http://127.0.0.1:8001 npm run test:browser

The current validated inventory is:

- 37 topics;
- 400 ordered sessions;
- 193 primary papers;
- 41 supporting resources;
- 17 frontier-watchlist records;
- 122 topic dependency edges.

## Authoritative content

- **curriculum_and_progress/curriculum_map.md** — topic scope, relationships, and paper sequences.
- **curriculum_and_progress/curriculum_table.md** — curriculum-wide topic and session matrix.
- **curriculum_and_progress/paper_index.md** — verified primary-paper records.
- **curriculum_and_progress/supporting_materials_index.md** — non-primary prerequisite and implementation resources.
- **curriculum_and_progress/frontier_watchlist.md** — explicitly provisional candidates.
- **curriculum_and_progress/topics/** — 37 detailed topic plans and ordered session timelines.
- **1_…5_*.md** — governing goals, construction rules, planning process, and repository conventions.

## Viewer implementation

- **hooks/build_curriculum_graph.py** — parses, normalizes, validates, and hashes authoritative Markdown.
- **curriculum_and_progress/assets/data/curriculum_graph.json** — generated, disposable browser data.
- **curriculum_and_progress/index.md** — semantic application shell and no-JavaScript alternatives.
- **curriculum_and_progress/assets/javascripts/curriculum_explorer.js** — routing, search, graph, progress, and workspace behavior.
- **curriculum_and_progress/assets/stylesheets/curriculum_explorer.css** — responsive visual system.
- **curriculum_and_progress/assets/vendor/** — pinned local Cytoscape.js distribution and license.
- **tests/test_curriculum_graph.py** — content and generated-data regression suite.
- **test_browser.js** — desktop/mobile browser smoke suite.
- **EXPLORER_DESIGN.md** — current implementation contract.
- **CURRICULUM_EXPLORER_TARGET_DESIGN.md** — original product and interaction specification.

## Deployment

**.github/workflows/deploy_pages.yml** validates the curriculum, builds with strict warnings, and deploys **site/** on pushes to **main**. GitHub Pages must use **GitHub Actions** as its build source.

Generated **site/**, local environments, editor databases, and Node dependencies are ignored. Historical bundles and transitional copies are intentionally not kept in the live tree; Git history provides provenance without allowing obsolete copies to compete with the authoritative curriculum.
