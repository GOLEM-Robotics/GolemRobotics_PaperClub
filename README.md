# Golem Robotics Paper Club

[![Validate and deploy](https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub/actions/workflows/pages.yml/badge.svg)](https://github.com/GOLEM-Robotics/GolemRobotics_PaperClub/actions/workflows/pages.yml)

A source-grounded research curriculum for robot learning, embodied intelligence, and physical AI—paired with a browser-local, portable learning workspace.

[Open the learning workspace](https://golem-robotics.github.io/GolemRobotics_PaperClub/) · [Read the product contract](Golem%20Robotics%20Research%20Curriculum%20%E2%80%94%20Product%20Contract.md) · [Contribute](CONTRIBUTING.md)

## What this repository provides

- A reviewed club framework in the five numbered root documents.
- An authoritative Markdown curriculum. The audited 27 August 2026 snapshot has 37 topics, 400 stable sessions, 192 active primary papers, 41 supporting resources, 12 frontier records, and 255 typed relationships.
- A static learner workspace with explainable recommendations, target-based planning, a first-class paper library, source-aware sessions, private notes and attachments, reversible personal customization, portable Workspace Bundles, and repository-ready proposal patches.

The curriculum is a reference, not a track. The landing surface is **your plan**: an ordered list of what you have actually decided to do next, which can hold canonical papers, sessions and topics, or things the curriculum has never heard of. Add to it in one act from a paper row, a paper page, a session, a topic, a filtered library, a target route or the search box. The curriculum offers suggestions beside it, each with the reasons that produced it — they enter your plan only when you say so, and a canonical item is ticked off by its own record, so Required Core, validated competence and AI Sprint coverage keep their exact meanings.

If you would rather be led, choose Guided, Accelerated, or AI Sprint, aim at a target — a topic, a session, or one specific paper — and drop the computed route straight into your plan.

The relationship map has two layers: topics with their entry gates, and paper lineages side by side with the cross-links between them. Clicking a node focuses and explains it; double-clicking opens it.

Papers are a destination rather than a footnote. The library filters 192 primary sources by curriculum role, technical level, preparation burden, area, topic and your own reading state; each paper has its own page carrying why it is assigned, what to read first and next, its position in the topic's curated lineage, its limitations and evidence signals, the sessions that use it, your notes, and a safe route to propose a correction or a replacement. Paste a link, an arXiv identifier or a title into **I found a paper** to see exactly where it fits — or, when it is not canonical, which topics it plausibly belongs to.

The application has no accounts, sync backend, server database, analytics, or repository credentials. Personal data is stored in IndexedDB and leaves the browser only through an explicit plaintext export. Local and hosted URLs have separate workspaces. On the default GitHub Pages host, other `golem-robotics.github.io` project sites share the same browser-origin trust boundary; see [the security policy](SECURITY.md).

## Run it locally

Python 3.12 or newer is recommended.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Open <http://127.0.0.1:8000>; the workspace is at the site root and the reviewed documents are rendered alongside it. Do not open generated files through `file://` — the application is an ES module bundle and needs an HTTP origin. The local build and GitHub Pages deployment provide the same learner features. Export a Workspace Bundle to move state between origins or devices.

## Deploy a fork

1. Fork or copy the repository and update `site_url`, repository links, and the README badge for the new owner and name.
2. In **Settings → Pages**, choose **GitHub Actions** as the source and enable Actions.
3. Push to `main` or run **Validate and deploy** manually.

The expected project URL is `https://<owner>.github.io/<repository>/`. Everything is served from relative paths and routed through the URL hash, so the same build works at a domain root, at a project subpath, or from any other static host without configuration. CI proves this by running the journey suite against the site served from a subdirectory rather than the server root.

Pull requests validate without deploying; successful `main` builds deploy the static site. Hosting never synchronizes learner workspaces.

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
├── viewer/                                            # static learner workspace (ES modules, no build step)
├── overrides/                                         # the application shell rendered at the site root
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
