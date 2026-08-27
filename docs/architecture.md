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

The primary navigation is deliberately task-oriented:

- Home: onboarding, profile, target, next action, resume, route explanation, and provenance.
- Curriculum: learning path, topic catalog, and relationship map.
- Library: active papers, supporting resources, and frontier records.
- Workspace: progress, competence evidence, personal ordering, additions, bundles, and proposals.
- Reference: methodology, canonical records, provenance, and maintenance.

Topic and Session are contextual workspaces reached from those sections. URLs encode shareable navigation state; personal filters and private state do not leak into shared links.

The three profiles—Guided, Accelerated, and AI Sprint—change traversal guidance, not canonical truth. AI prompts are generated from the current session's objective, sources, artifact, and evidence boundary. They explicitly require source verification and separate source claims, inference, and uncertainty.

## Personal workspace and portability

`workspace_store.js` owns schema version 2 in the `golem-curriculum-workspace` IndexedDB database. State and attachments use separate stores. The state includes:

- learning profile and target;
- per-entity status;
- competence and Sprint evidence;
- activated and disabled IDs;
- notes;
- personal ordering and explicit overrides;
- custom sessions and materials;
- orphaned migration records;
- the last route.

Legacy localStorage completion data is migrated through stable aliases. Malformed or unknown records are preserved in the orphan archive instead of being discarded. If IndexedDB is unavailable, the application clearly falls back to memory for that visit; attachments require persistent storage.

A Workspace Bundle is a versioned JSON export containing the source revision and, only when selected, attachment data. Import migrates aliases, restores known records, and archives unknown IDs. Because browser storage is local and can be cleared, learners should export a bundle when they need a durable backup or a move between devices.

Bundles are treated as untrusted input. Imports validate schema, enums, canonical references, personal UUIDs, string and record bounds, attachment counts, and payload sizes. Attachments must be local base64 `data:` payloads; remote URLs are rejected. Current limits are 40 MB per bundle, 32 attachments, 8 MB per attachment, and 24 MB of attachments in total.

## Privacy and publication security

The browser application:

- has no accounts or analytics;
- sends no progress, notes, custom items, or attachments to GitHub;
- contains no GitHub token, API key, or repository-write credential;
- opens external sources with `noopener`;
- downloads proposal files rather than writing to the repository.

IndexedDB isolates by origin rather than URL path. The default organization project site therefore shares its storage trust boundary with other applications served from `https://golem-robotics.github.io/`. A dedicated custom origin is recommended before making stronger isolation claims. Workspace Bundles and attachments are unencrypted plaintext files.

MathJax and Cytoscape are pinned, vendored runtime assets. The normal learner application does not load executable code or fonts from a third-party origin.

Publishing is intentionally explicit. The current supported path exports a repository-compatible proposal for a human-reviewed pull request. An authenticated publishing bridge is not deployed. If one is ever introduced, it must be a trusted server-side component and must never write directly to `main`.

## Maintenance

`tools/maintenance.py` validates the current dataset and maintenance state, rotates through canonical links, probes destination identity, scans arXiv for candidates, and detects due frontier reviews. HTTP status is evidence rather than identity proof: a successful response can still be the wrong source, while an anti-bot response is not automatically a broken link.

The scheduled workflow runs approximately every two days. It keeps runtime cursor state in the workflow cache, uploads complete evidence, and opens a review branch only when findings require attention. It opens a pull request when organization policy permits bot-created pull requests; otherwise it creates a linked maintainer issue for that branch. It never edits canonical curriculum content during a scan. The checked-in seed records the most recent exhaustive audit and lets a new scheduler start from reviewed evidence. The site displays the latest merged/published maintenance record; no-change cache-only scans are intentionally not presented as repository provenance.

## Validation and deployment

The Python suite enforces protected-document hashes, inventory, stable identities, deterministic projection, paper ownership, resource placement, session progression, completion boundaries, relationship semantics, hard-gate coverage, and projection consistency.

The browser suite exercises first use, target planning, deep links, history, readiness, orthogonal progress, persistence, legacy migration, customization, bundles, proposals, offline-after-load behavior, storage failure, responsive layouts, dark mode, and keyboard interactions.

`.github/workflows/pages.yml` runs both suites and `mkdocs build --strict` for pull requests and `main`. Only a successful `main` build is uploaded and deployed to GitHub Pages.

## Change paths

- Edit curriculum truth in Markdown, then regenerate the projection and review identity locks.
- Edit personal state only through the browser or a Workspace Bundle.
- Treat generated JSON and `site/` as outputs.
- Treat maintenance reports as proposals and evidence.
- Never change the five framework documents as a side effect of curriculum, viewer, or maintenance work.

See [CONTRIBUTING.md](CONTRIBUTING.md) for exact commands and review expectations.
