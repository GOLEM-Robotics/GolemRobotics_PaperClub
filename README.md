# Golem Robotics Paper Club

[![Validate and deploy](https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub/actions/workflows/pages.yml/badge.svg)](https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub/actions/workflows/pages.yml)

A paper-driven, experiment-centered curriculum for robot learning, embodied intelligence, and physical AI.

[Open the Curriculum Explorer](https://golem-robotics.github.io/GolemRobotics_PaperClub/) · [Browse the curriculum](curriculum_and_progress/curriculum_map.md) · [Contribute](CONTRIBUTING.md)

## What is in this repository?

The repository has three deliberately separate layers:

| Layer | Location | Purpose |
| --- | --- | --- |
| Club framework | [`1_operating_principles.md`](1_operating_principles.md) through [`5_repo_structure.md`](5_repo_structure.md) | Human-validated goals, rules, and repository conventions. |
| Curriculum dataset | [`curriculum_and_progress/`](curriculum_and_progress/) | Authoritative Markdown records for topics, sessions, papers, resources, dependencies, and frontier items. |
| Curriculum viewer | [`viewer/`](viewer/) | Static interface generated from the Markdown dataset and deployed through GitHub Pages. |

The Markdown dataset is the source of truth. The viewer has no backend, database, accounts, or frontend build step. A Python tool validates the Markdown and generates the JSON projection used by the browser.

## Curriculum Explorer

The hosted explorer provides five complementary views: Overview, Map, Focus, Topic, and Table. Search covers topics, sessions, papers, authors, resources, and frontier items.

Progress is stored privately in the current browser. It can also be exported to a JSON file and imported on another browser or machine. No progress information is sent to GitHub or any external service.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Open <http://127.0.0.1:8000>. The local and GitHub-hosted applications have the same capabilities, including progress export and import.

## Validate changes

```bash
python -m unittest discover -s tests -v
mkdocs build --strict
```

For viewer changes, also run the browser test:

```bash
npm ci
mkdocs serve -a 127.0.0.1:8001
BASE_URL=http://127.0.0.1:8001 npm run test:browser
```

The current validated dataset contains 37 topics, 400 ordered sessions, 193 primary papers, 41 supporting resources, 17 frontier records, and 122 topic-dependency edges.

## Repository map

```text
.
├── 1_operating_principles.md ... 5_repo_structure.md
├── curriculum_and_progress/   # authoritative curriculum dataset
│   ├── curriculum_map.md
│   ├── curriculum_table.md
│   ├── paper_index.md
│   ├── supporting_materials_index.md
│   ├── frontier_watchlist.md
│   └── topics/
├── viewer/                    # static application source and generated JSON
├── tools/                     # deterministic data builder
├── hooks/                     # MkDocs integration
├── tests/                     # data-contract and browser tests
└── docs/                      # implementation documentation
```

Implementation details are documented in [`docs/architecture.md`](docs/architecture.md). Pushes to `main` are validated and deployed automatically by [GitHub Actions](.github/workflows/pages.yml).
