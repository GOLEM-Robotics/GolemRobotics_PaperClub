# Curriculum Explorer — Current Architecture

**Status:** implemented and regression-tested
**Product specification:** CURRICULUM_EXPLORER_TARGET_DESIGN.md

## Product boundary

The explorer is a navigation and planning layer over the Markdown curriculum. It is not a second curriculum authoring system.

- Markdown under **curriculum_and_progress/** is authoritative.
- Generated JSON is disposable and deterministic.
- Only topics are global graph nodes.
- Sessions, papers, resources, and frontier items appear inside selected-topic context.
- Progress is optional browser-local state; it never edits curriculum files.

## Data flow

    authoritative Markdown
            |
            v
    hooks/build_curriculum_graph.py
      parse -> normalize -> validate -> hash
            |
            v
    assets/data/curriculum_graph.json
            |
            v
    static browser application
      Overview · Map · Focus · Topic · Table

The **source_revision** field hashes the path and bytes of every authoritative input, so rebuilding the same sources produces the same JSON on every machine. The build validator fails for duplicate IDs, broken ownership, missing records, invalid dependency endpoints, session-count drift, missing topic files, unassigned papers/resources, or invalid topic mappings.

## Browser state

The application keeps a small explicit state model:

| State | Values |
| --- | --- |
| Primary view | overview, map, focus, topic, table |
| Selected topic | one valid topic ID or none |
| Topic tab | summary, sessions, papers, resources, related |
| Focus direction | prerequisites, both, dependents |
| Focus depth | direct or transitive |
| Filters | curriculum areas, execution statuses, ready-only |
| Progress | completed session IDs in browser local storage |

Shareable state is encoded as URL query parameters. Filters remain transient so a shared topic URL cannot accidentally hide its own context.

Search uses a normalized in-memory index generated from every content entity. A result always resolves to a topic:

- topic → Summary;
- session → Sessions and the matching row;
- paper → Papers and the matching record;
- resource/frontier item → Resources and the matching record.

## Graph behavior

The global Map contains exactly 37 topic nodes and prerequisite edges. Positions are computed at build time and exposed as **topic.positions.map**; the browser does not expose alternative layout experiments.

Focus creates a second topic-only Cytoscape view. It computes direct or transitive reachability from the selected topic, places prerequisites to the left and dependents to the right, hides unrelated nodes, then fits the committed bounds.

Both graph views have structured alternatives:

- a keyboard topic selector on Map;
- the Focus relationship lists in the inspector and Topic workspace;
- the complete Table view;
- direct links to authoritative Markdown.

## Progress and recommendations

Progress is stored under **golem-curriculum-progress-v1** as a versioned list of completed session IDs. Invalid or stale IDs are ignored.

A topic is:

- **not started** when no session is complete;
- **in progress** when some sessions are complete;
- **complete** when every planned session is complete;
- **ready** when all curriculum-topic prerequisites are complete.

Recommendations prioritize an already-started topic, then ready Shared Core topics, then other ready or partially unlocked work. The algorithm does not claim that browser progress is organizational truth.

## Responsive and accessibility contract

- All controls have accessible names and visible focus states.
- Focus and Topic are disabled until selection.
- Status is represented with text and border patterns, not color alone.
- Reduced-motion preferences disable transition-heavy behavior.
- Desktop uses filter, workspace, and inspector columns.
- Tablet moves the inspector below the workspace.
- Mobile uses an explicit Filters drawer and horizontally scrollable view/tab controls.
- No graph-only information is inaccessible to keyboard or no-JavaScript users.

## Validation

    python -m unittest discover -s tests -v
    mkdocs build --strict
    npm run test:browser

The Python suite protects the content and generated-data contract. The browser suite covers initialization, zero-error resource loading, navigation guards, Map, Focus, Topic tabs, progress persistence, cross-entity search routing, filters, URL state, and a mobile overflow check.
