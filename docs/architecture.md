# Curriculum Viewer Architecture

The viewer is a static navigation layer over the Markdown curriculum. It is intentionally not a second authoring system.

## System boundary

```text
curriculum_and_progress/*.md
            │
            ▼
tools/build_curriculum_data.py
  parse → normalize → validate → hash
            │
            ▼
viewer/assets/data/curriculum_graph.json
            │
            ▼
MkDocs + browser application
  Overview · Map · Focus · Topic · Table
```

- Markdown under `curriculum_and_progress/` is authoritative.
- The JSON projection is deterministic and disposable.
- Only topics appear as nodes in the global dependency graph.
- Sessions, papers, resources, and frontier records appear in topic context.
- `hooks/mkdocs.py` injects the viewer and the five root framework documents into the site without maintaining duplicate Markdown copies.

The dataset includes a `source_revision` hash over all authoritative curriculum inputs. Validation fails for duplicate identifiers, broken ownership, invalid dependencies, session-count drift, missing topic files, or unassigned papers and resources.

## Browser state and progress

Shareable navigation state is encoded in URL parameters: selected view, topic, topic tab, and Focus options. Filters remain transient so a shared link cannot hide its own context.

Session completion is stored under the versioned browser key `golem-curriculum-progress-v1`. It never edits curriculum files or leaves the user's browser. Users can export the same state as a versioned JSON document and import it elsewhere; unknown or stale session identifiers are ignored.

Readiness and recommendations are derived views:

- a topic is complete when every planned session is complete;
- a topic is ready when all curriculum-topic prerequisites are complete;
- recommendations prioritize work already started, then ready Shared Core topics, then other ready or partially unlocked topics.

These suggestions do not claim to represent organization-wide progress.

## Build and deployment

`mkdocs build --strict` regenerates and validates the browser dataset, then produces a fully static `site/` directory. The same output can be served locally or by any static host.

`.github/workflows/pages.yml` runs the data tests, strict build, and browser smoke test for every pull request and push to `main`. Successful `main` builds are deployed to GitHub Pages.

## Dependency policy

The browser uses a locally vendored, pinned Cytoscape.js module. MkDocs Material is pinned in `requirements.txt`; browser-test tooling is pinned in `package-lock.json`. The production site has no Node.js runtime or application server.
