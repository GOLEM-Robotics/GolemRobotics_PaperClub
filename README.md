# Golem Robotics Paper Club Curriculum Viewer

This repository renders the curriculum as a searchable Material for MkDocs site and adds a graphical **Curriculum Explorer** built with Cytoscape.js.

The Markdown files remain the only editable source of truth. A small standard-library Python hook reads the curriculum and generates `curriculum_graph.json` during each build. The browser then renders that static JSON. There is no backend, database, API server, React application, or Node.js build pipeline.

## Local preview

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Open <http://127.0.0.1:8000>.

When port 8000 is already occupied:

```bash
mkdocs serve -a 127.0.0.1:8001
```

## Validate and build

```bash
mkdocs build --strict
```

The build performs two stages:

1. `hooks/build_curriculum_graph.py` validates and extracts the Markdown curriculum into `curriculum_and_progress/assets/data/curriculum_graph.json`.
2. MkDocs builds the static site into `site/`.

The graph generator can also be run directly:

```bash
python hooks/build_curriculum_graph.py
```

Expected source counts for the current curriculum are 37 topics, 400 sessions, 193 primary papers, 41 supporting resources, and 17 frontier items.

## Interactive explorer

The homepage supports:

- deterministic curriculum and area layouts;
- directed prerequisite edges and explicit feedback-cycle styling;
- filters by curriculum area and execution status;
- search across topics, sessions, papers, authors, resources, and frontier items;
- direct prerequisite/dependent focus views;
- on-demand expansion of a topic into its ordered sessions or paper inventory;
- links from graph entities to the detailed Markdown timelines and canonical sources;
- fullscreen, pan, zoom, fit, and reset controls.

The explorer uses these files:

- `hooks/build_curriculum_graph.py` — Markdown-to-JSON extraction and validation;
- `curriculum_and_progress/index.md` — explorer page structure;
- `curriculum_and_progress/assets/javascripts/curriculum_explorer.js` — interactions and rendering;
- `curriculum_and_progress/assets/stylesheets/curriculum_explorer.css` — graphical layout;
- `curriculum_and_progress/assets/vendor/cytoscape-3.33.1.esm.min.js` — vendored graph renderer;
- `curriculum_and_progress/assets/data/curriculum_graph.json` — generated static data.

## GitHub Pages

The workflow at `.github/workflows/deploy_pages.yml` runs `mkdocs build --strict` and deploys the generated `site/` directory on pushes to `main`.

In the GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Repository viewer files

- `mkdocs.yml` — theme, navigation, hook, search, and Markdown configuration;
- `requirements.txt` — pinned MkDocs dependency;
- `curriculum_and_progress/overview.md` — conventional documentation landing page;
- `curriculum_and_progress/reference/` — include pages for the five root workflow documents;
- `curriculum_and_progress/stylesheets/extra.css` — table and reading-layout improvements;
- `.github/workflows/deploy_pages.yml` — static deployment;
- `THIRD_PARTY_NOTICES.md` — vendored dependency notice.

Curriculum, paper, resource, frontier, and topic files remain in their original locations.
