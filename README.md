# Golem Robotics Paper Club

[![Validate and deploy](https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub/actions/workflows/pages.yml/badge.svg)](https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub/actions/workflows/pages.yml)

A source-grounded research curriculum for robot learning, embodied intelligence, and physical AI—paired with a browser-local, portable learning workspace.

[Open the Curriculum Explorer](https://golem-robotics.github.io/GolemRobotics_PaperClub/) · [Read the product contract](Golem%20Robotics%20Research%20Curriculum%20%E2%80%94%20Product%20Contract.md) · [Contribute](CONTRIBUTING.md)

## What this repository provides

- A reviewed club framework in the five numbered root documents.
- An authoritative Markdown curriculum. The audited 27 August 2026 snapshot has 37 topics, 400 stable sessions, 192 active primary papers, 41 supporting resources, 12 frontier records, and 255 typed relationships.
- A static learner application with explainable recommendations, target-based planning, source-aware sessions, private notes and attachments, reversible personal customization, portable Workspace Bundles, and repository-ready proposal patches.

On first use, choose Guided, Accelerated, or AI Sprint; optionally choose a target capability; then open the recommended ready session. The route explains every hard gate and keeps Required Core separate from opt-in continuation work.

The application has no accounts, sync backend, server database, analytics, or repository credentials. Personal data is stored in IndexedDB and leaves the browser only through an explicit plaintext export. Local and hosted URLs have separate workspaces. On the default GitHub Pages host, other `golem-robotics.github.io` project sites share the same browser-origin trust boundary; see [the security policy](SECURITY.md).

## Run it locally

Python 3.12 or newer is recommended.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Open <http://127.0.0.1:8000>; do not open generated files through `file://`. The local build and GitHub Pages deployment provide the same learner features. Export a Workspace Bundle to move state between origins or devices.

## Deploy a fork

1. Fork or copy the repository and update `site_url`, repository links, and the README badge for the new owner and name.
2. In **Settings → Pages**, choose **GitHub Actions** as the source and enable Actions.
3. Push to `main` or run **Validate and deploy** manually.

The expected project URL is `https://<owner>.github.io/<repository>/`. Pull requests validate without deploying; successful `main` builds deploy the static site. Hosting never synchronizes learner workspaces.

## Repository structure

```text
.
├── 1_operating_principles.md … 5_repo_structure.md   # protected club framework
├── Golem Robotics Research Curriculum — Product Contract.md
├── curriculum_and_progress/
│   ├── topics/                                        # canonical topic and session plans
│   ├── paper_index.md                                 # active primary-paper records
│   ├── supporting_materials_index.md
│   ├── frontier_watchlist.md
│   ├── relationships.md                               # typed, scoped topic relationships
│   ├── stable_session_ids.json
│   ├── canonical_entity_ids.json
│   └── maintenance/                                   # review state and proposal evidence
├── viewer/                                            # static learner application
├── tools/                                             # validation, projection, and maintenance
├── hooks/                                             # MkDocs integration
├── tests/                                             # semantic and browser journeys
└── docs/                                              # system architecture documentation
```

Markdown under `curriculum_and_progress/` is authoritative. `viewer/assets/data/curriculum_graph.json` is a deterministic browser projection and is regenerated during every strict build.

## Validate a change

```bash
python -m unittest discover -s tests -v
mkdocs build --strict
```

For application changes, run the browser journeys against the built site:

```bash
npm ci
python -m http.server 8001 --directory site
CHROME_PATH=/path/to/google-chrome BASE_URL=http://127.0.0.1:8001 npm run test:browser
```

See [the architecture](docs/architecture.md) for data contracts and privacy boundaries, and [the contribution guide](CONTRIBUTING.md) before changing curriculum identities or relationships. Every rendered source document links back to its exact repository file.

Pushes to `main` are validated and deployed through GitHub Actions. Scheduled research maintenance records evidence and opens a review proposal only when attention is required; it never silently rewrites curriculum content.

Security issues should be reported privately as described in [SECURITY.md](SECURITY.md). Third-party licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The repository currently does not declare a project license; public visibility alone does not grant reuse rights.
