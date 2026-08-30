# System architecture and data contract

The repository is both a durable research-curriculum reference and a static learner product. The architecture keeps those responsibilities separate: reviewed Markdown defines shared truth, while every learner owns a browser-local overlay.

## Authority model

| Level | Authority | Location | Mutation path |
|---|---|---|---|
| 1 | Club methodology | The five numbered root documents | Explicit club approval only |
| 2 | Canonical curriculum | `curriculum_and_progress/` | Reviewed pull request |
| 3 | Official club execution records | Published session/project artifacts when added | Reviewed pull request |
| 4 | Personal workspace | Browser IndexedDB or exported Workspace Bundle | Learner-controlled |
| 5 | Generated product data | `viewer/assets/data/curriculum_graph.json` and `site/` | Regenerate; never author directly |

Lower levels cannot silently overwrite higher ones. A personal note is not club evidence; generated JSON is not a second curriculum; a maintenance finding is not a correction until reviewed.

## Build boundary

```text
reviewed Markdown + identity locks + relationship registry
                         │
                         ▼
              build_curriculum_data.py
          parse → normalize → validate → hash
                         │
                         ▼
             curriculum_graph.json (schema 2)
                         │
                         ▼
          MkDocs + static browser application
```

`hooks/mkdocs.py` runs the builder before each site build and publishes the viewer plus the five root framework documents without maintaining copies. The generated dataset carries a SHA-256 `source_revision` over topic plans, the map and table, relationship and identity registries, and the paper, resource, and frontier indices. Framework documents and mutable maintenance state are deliberately outside that curriculum digest; maintenance dates appear as separate provenance. A strict build still fails if any checked-in generated output is stale or a contract is violated.

The production result is a static `site/` directory. It can be served by GitHub Pages, a local HTTP server, or another static host; no application server is required.

## Canonical entity model

The current projection contains:

- 37 topics;
- 400 sessions;
- 192 active primary papers;
- 41 supporting resources;
- 12 frontier records;
- 255 reviewed relationships.

P189 is retained only as a visible quarantine record and stable session slot. It is not parsed as an active paper and cannot contribute curriculum credit until its intended identity is verified.

Topic, paper, resource, frontier, session, and relationship identifiers are globally unique. Sessions use durable UUID-based IDs such as `SES-…`; display aliases such as `F1-S02` remain import and navigation aliases. The locks in `stable_session_ids.json` and `canonical_entity_ids.json` turn accidental deletion, reassignment, or identifier reuse into validation failures.

Each topic owns an ordered session timeline. A primary paper has exactly one owning topic, while explicit cross-references can place it in another session without changing ownership. Supporting-resource assignments must agree in both the central index and topic plans.

## Relationship and readiness semantics

Relationships are reviewed records, not inferred arrows:

| Type | Blocking | Typical scope |
|---|---:|---|
| `hard_prerequisite` | Yes | Topic entry or named target sessions |
| `recommended_background` | No | Just-in-time context |
| `related` | No | Intellectual or implementation connection |
| `feedback` | No | Co-development loop |

Each record includes a stable ID, source and target topic, scope, rationale, evidence, confidence, and stable target-session IDs when scoped. Hard-prerequisite edges must be acyclic. A raw session prerequisite is invalid unless a corresponding hard relationship actually gates that topic or session.

Topic-entry gates and session-specific gates are evaluated separately. Recommendations are explainable from these records and never promote a related or feedback edge into a blocker.

## Completion model

The product keeps five concepts distinct:

- Session handling status: not started, in progress, completed, or skipped.
- Required Core completion: every Required Core session is completed.
- Continuation progress: completed activated Optional Specialization or Frontier Continuation sessions.
- Full activated path: Required Core plus only the continuations the learner explicitly activated.
- Validated competence and AI Sprint coverage: separate evidence records that never imply canonical completion by themselves.

Required Core is an exact prefix of every topic timeline. Optional and frontier work is inactive by default. Disabling a canonical entity only changes the learner's route; it never deletes shared curriculum data or existing personal state.

## Learner application

The application is a standalone static single-page workspace served at the site root. It is hand-written ES modules
plus one stylesheet; it has no build step, no framework and no runtime dependency. The reviewed Markdown documents are
rendered by MkDocs Material at their own paths and act as the Reference surface behind the workspace.

```text
viewer/
├── index.md                     page stub that selects the standalone template
├── assets/app/                  ES modules: model, engine, store, prompts, publish, views
├── assets/styles/app.css        the whole design system
└── assets/data/                 the generated schema-2 projection
overrides/app.html               the application shell rendered at the site root
```

### Navigation

Five destinations, in the order a learner uses them:

- **My plan** — the landing surface: the learner's own ordered intent, one box that adds anything to it, and the curriculum's suggestions offered rather than imposed.
- **Papers** — the whole primary-source library as a first-class object, with supporting resources and the frontier watchlist alongside it.
- **Curriculum** — the route, the areas and the matrix, plus a link to the map.
- **Workspace** — the personal record: reading, notes, artifacts, additions, hidden items, route order, proposals and portability.
- **Reference** — the reviewed documents, provenance and governance.

Topic, session, paper and the relationship map are contextual surfaces reached from those five. Routing is hash-based
(`#/papers/P104`, `#/topics/L6`, `#/sessions/SES-…`, `#/map?layer=papers&focus=P104`), so every view is a shareable
deep link that survives a reload on any static host, browser history works without server rewrites (with scroll
restoration), and legacy `?view=` links are migrated on load. Filter, sort and focus state lives in the address;
personal state never does.

### The personal plan

`state.plan` is an ordered list of items, each either a reference to a canonical entity (`paper`, `session`, `topic`,
`resource`) or a `custom` item the learner wrote. It is the overlay's primary object and the product's landing surface,
because the canonical curriculum is a reference rather than a track (contract §3.7).

The plan deliberately owns no progress. `Engine.planItemDone` resolves a canonical item against the record that already
exists for it — a paper's reading state, a session's completion, a topic's Required Core boundary — so the five
completion states stay authoritative and the plan adds no sixth. Only `custom` and `resource` items carry their own
flag. Adding is always an explicit act; `Engine.inPlan` drives an add control on every canonical object, in single and
bulk form, including a whole target route.

### Papers as a first-class object

`model.js` derives display structure from canonical fields without changing them:

- `role_level_preparation` is parsed into role, criticality, technical level, preparation burden and reading assignment, and the raw string is retained.
- The per-topic paper sequence taken from the session timeline is the authoritative lineage; a paper knows its position, its predecessor and its successor.
- The free-text lineage note is displayed verbatim, with high-confidence references resolved into links by author surname, distinctive title phrase or unique acronym, and labelled as inferred.
- A paper knows which sessions assign it, whether any of them is Required Core, which papers are reconstructed alongside it, and which official code or project page it has.

`#/place` answers "I found this paper — where does it fit?". It normalises arXiv identifiers, DOIs and URLs, falls back
to title overlap, and when nothing canonical matches it ranks topics by term overlap against their stated scope and
existing sources, then offers the two safe outcomes: add it to the personal overlay, or raise a canonical proposal.

### Readiness and recommendation

A topic is enterable when its `topic_entry` hard prerequisites are satisfied by completion or by validated competence.
A `target_sessions` prerequisite holds back only the sessions it names, which carry it in `relationship_gates`.
Recommendations are always accompanied by the reasons that produced them: the topic's curriculum role, the satisfied
gates, continuity with work in progress, how many later topics depend on it, its position on the target route, its
primary source, and the time the selected profile implies.

### Profiles and generated prompts

The three profiles — Guided, Accelerated and AI Sprint — change traversal guidance, not canonical truth. Each exposes a
planning-duration range, an assistance strategy, a validation requirement, a compression boundary and what it earns.
Prompts are generated per session and per paper from identity, objective, prerequisite state, canonical source URLs,
assigned sections, profile, time budget, expected capability, artifact and evidence boundary. Every prompt carries the
same guardrail: stay inside the linked sources, separate source claims from inference, expose uncertainty, name what
was compressed, and finish with an active check.

### Relationship map

Plain SVG, no graph library, with two layers.

The **topic layer** uses the reviewed layout coordinates in the projection and defaults to the 56 topic-entry gates
rather than all 187 hard prerequisites, because that is the structure that actually blocks a learner.

The **paper layer** lays out one column per topic and one row per curated lineage position, so parallel lineages read
top to bottom side by side. Solid edges follow the lineage; dashed edges are the references resolved out of free-text
lineage notes and are labelled as inferred. It is scoped to one area, or to the lineages around one focused paper,
because 192 nodes at once is decoration rather than a tool.

Interaction separates looking from leaving: a click or Enter focuses a node (highlighting its relationships, dimming
the rest and filling a panel that names every relationship and holds the real link); a double click opens the page. The
focus is a query parameter, so a focused map is shareable, and keyboard focus is restored across the re-render. Nodes
are sized to be read; horizontal scrolling is the accepted cost.

## Personal workspace and portability

`assets/app/store.js` owns workspace schema version 4 in the `golem-curriculum-workspace` IndexedDB database. State and attachments use separate stores. The state includes:

- the personal plan;
- learning profile and target (a topic, a session or a single paper);
- per-entity status;
- per-paper reading state and stars;
- competence and Sprint evidence;
- activated and disabled IDs;
- notes;
- personal ordering and explicit overrides;
- custom papers, sessions and materials;
- raised curriculum proposals;
- orphaned migration records;
- recent meaningful activity;
- the last observed curriculum source revision;
- the last route.

Legacy localStorage completion data is migrated through stable aliases. Malformed or unknown records are preserved in the orphan archive instead of being discarded. If IndexedDB is unavailable, the application clearly falls back to memory for that visit; attachments require persistent storage.

A Workspace Bundle is a versioned JSON export containing the source revision and, only when selected, attachment data. Import migrates aliases, restores known records, archives unknown IDs, and reports a changed source revision while preserving personal work. Because browser storage is local and can be cleared, learners should export a bundle when they need a durable backup or a move between devices.

Bundles are treated as untrusted input. Imports validate schema, enums, canonical references, personal UUIDs, string and record bounds, attachment counts, and payload sizes. Attachments must be local base64 `data:` payloads; remote URLs are rejected. Current limits are 40 MB per bundle, 200 attachments, 8 MB per attachment, and 24 MB of attachments in total. Schema-2 and schema-3 bundles are still accepted.

## Privacy and publication security

The browser application:

- has no accounts or analytics;
- sends no progress, notes, custom items, or attachments to GitHub;
- contains no GitHub token, API key, or repository-write credential;
- opens external sources with `noopener`;
- downloads proposal files rather than writing to the repository.

IndexedDB isolates by origin rather than URL path. The default organization project site therefore shares its storage trust boundary with other applications served from `https://golem-robotics.github.io/`. A dedicated custom origin is recommended before making stronger isolation claims. Workspace Bundles and attachments are unencrypted plaintext files.

MathJax is the only pinned, vendored runtime asset, and it serves the rendered reference documents rather than the learner application. The application loads no executable code, font or image from a third-party origin.

Publishing is intentionally explicit. The current supported path exports a repository-compatible Git patch for a human-reviewed pull request. The patch creates the topic/session `session_plan.md` and `session_notes.md` structure required by the club framework. Enabled personal additions are included; private session notes and attachment manifests require separate opt-in controls, and attachment contents are never embedded. An authenticated publishing bridge is not deployed. If one is ever introduced, it must be a trusted server-side component and must never write directly to `main`.

## Maintenance

`tools/maintenance.py` validates the current dataset and maintenance state, rotates through canonical links, probes destination identity, scans arXiv for candidates, and detects due frontier reviews. HTTP status is evidence rather than identity proof: a successful response can still be the wrong source, while an anti-bot response is not automatically a broken link.

The scheduled workflow runs approximately every two days. It keeps runtime cursor state in the workflow cache, uploads complete evidence, and opens a review branch only when findings require attention. It opens a pull request when organization policy permits bot-created pull requests; otherwise it creates a linked maintainer issue for that branch. It never edits canonical curriculum content during a scan. The checked-in seed records the most recent exhaustive audit and lets a new scheduler start from reviewed evidence. The site displays the latest merged/published maintenance record; no-change cache-only scans are intentionally not presented as repository provenance.

## Validation and deployment

The Python suite enforces protected-document hashes, inventory, stable identities, deterministic projection, paper ownership, resource placement, session progression, completion boundaries, relationship semantics, hard-gate coverage, and projection consistency.

`tests/browser_journeys.js` walks complete learner journeys rather than components: first visit and explainable
recommendation; session execution with the five distinct completion states; papers as a first-class object including
facets, lineage, comparison, reading state and notes; placing a paper found elsewhere; non-destructive canonical data
beside fully editable personal data; personal ordering with prerequisite violations and explicit overrides;
credential-free publication; portability, revision migration and adversarial bundles; navigation, deep links and error
states; target planning; notes, artifacts and resuming; responsive layouts from 320 px to 1440 px; a built-in
accessibility audit (landmarks, heading order, accessible names, tap targets and computed WCAG AA contrast) across
fourteen routes in light and dark; keyboard operation and reduced motion; storage denial and offline-after-load. Every
context also asserts that no page error, failed request or third-party request occurs.

`.github/workflows/pages.yml` runs both suites and `mkdocs build --strict` for pull requests and `main`. Only a successful `main` build is uploaded and deployed to GitHub Pages.

The journey suite is run against the site served from a **subdirectory**, not the server root, because a project GitHub
Pages site lives at `https://<owner>.github.io/<repository>/`. Every asset reference, document link and route is
relative, and hash routing needs no server rewrites, so the same build works at any path — but testing at the root
would hide an absolute-path regression, so CI tests the deployed shape.

## Change paths

- Edit curriculum truth in Markdown, then regenerate the projection and review identity locks.
- Edit personal state only through the browser or a Workspace Bundle.
- Treat generated JSON and `site/` as outputs.
- Treat maintenance reports as proposals and evidence.
- Never change the five framework documents as a side effect of curriculum, viewer, or maintenance work.

See [CONTRIBUTING.md](CONTRIBUTING.md) for exact commands and review expectations.
