# Golem Robotics Research Curriculum — Product Contract

**Status:** Implemented on `product-contract-v2`; awaiting required human review and protected merge

**Purpose:** Ground-truth product specification for the next implementation phase

**Implementation:** Completed on 2026-08-27; implementation decisions and validation evidence are recorded in Section 31

**Authority:** This contract derives from and must remain compatible with `1_operating_principles.md` through `5_repo_structure.md`

---

## 1. Authority and source-of-truth hierarchy

The system has five distinct kinds of truth.

### Level 1 — Club methodology

The five numbered root documents define the intent and methodology of the research curriculum.

They remain the highest-level authority:

1. `1_operating_principles.md`
2. `2_research_curriculum_goal.md`
3. `3_research_curriculum_construction_rules.md`
4. `4_topic_planning_guideline.md`
5. `5_repo_structure.md`

The product must implement these principles rather than redefine them.

### Level 2 — Canonical curriculum

The Markdown under `curriculum_and_progress/` defines the approved curriculum:

- topics;
- paper lineages;
- supporting materials;
- dependencies;
- session timelines;
- frontier material;
- official session artifacts;
- integration projects.

This Markdown remains authoritative.

### Level 3 — Official club execution record

When actual sessions or projects are prepared and executed, their durable club artifacts live in the repository structure already defined by `5_repo_structure.md`, including:

- `session_plan.md`;
- `session_notes.md`;
- code;
- experiments;
- results;
- other session files;
- integration-project artifacts.

These are shared organizational records.

### Level 4 — Personal workspace

A user's:

- progress;
- notes;
- custom learning path;
- disabled items;
- added references;
- custom sessions;
- attached private artifacts;
- selected learning mode;

form a **non-destructive overlay** on the canonical curriculum.

Personal state does not modify canonical Markdown unless the user explicitly publishes a proposed change.

### Level 5 — Generated product data

JSON, indexes, search structures, rendered HTML and other viewer assets are disposable projections.

They must always be reproducible from Levels 1–4 as appropriate.

---

# 2. Product purpose

The product exists to help a technically capable student or club member answer:

1. **What should I learn next?**
2. **Why should I learn it now?**
3. **What do I need to know first?**
4. **What is the fastest sensible way for me to acquire that knowledge?**
5. **Which papers and supporting sources matter, and why?**
6. **What should I actually produce or understand before moving on?**
7. **Where did I stop and how do I resume?**
8. **How does this material connect to the rest of embodied intelligence?**
9. **What notes, implementations, evidence and artifacts have I accumulated?**
10. **What has changed in the field since the curriculum was constructed?**

The system is therefore not primarily a graph viewer.

It is a **research-learning workspace backed by a rigorously maintained curriculum graph**.

---

# 3. Core product principles

## 3.1 Learner first

The default interface prioritizes the next meaningful action rather than the complete data structure.

A new user should not need to understand the repository hierarchy before starting.

## 3.2 Research apprenticeship, not content consumption

Reading or receiving an AI summary is not automatically equivalent to learning.

Important sessions continue to culminate, where appropriate, in:

- reconstruction;
- derivation;
- explanation;
- comparison;
- implementation;
- evaluation;
- evidence analysis;
- failure analysis;
- synthesis;
- original hypotheses.

This preserves the original learning model.

## 3.3 Canonical data is non-destructive

A normal product user must never be able to delete an original canonical topic, session, paper or resource.

Canonical entities can be:

- completed;
- annotated;
- hidden from a personal route;
- disabled from a personal workspace;
- superseded or deprecated through an approved curriculum revision.

They are not destructively deleted through ordinary UI operations.

## 3.4 Personal additions are fully editable

A user-added entity may be:

- edited;
- moved;
- disabled;
- re-enabled;
- deleted.

The UI must visually distinguish canonical and personal material.

## 3.5 Every recommendation is explainable

The system never displays only an opaque priority score.

Every recommendation explains its reasoning, for example:

> **Recommended next: F3 — Synthesis of attention architectures**
>
> - Required prerequisites satisfied
> - Continues your currently active topic
> - Required by three downstream topics
> - Guided mode: approximately 90 min
> - Accelerated mode: approximately 45 min
> - AI Sprint: approximately 20 min

## 3.6 Source provenance is visible

Derived information should retain a route back to its canonical source.

Users should be able to inspect where a statement came from:

- curriculum map;
- topic plan;
- paper index;
- supporting-material index;
- frontier record;
- session record.

---

# 4. Canonical entity model

Every durable entity requires a **stable identifier independent of display order**.

This applies to:

- topics;
- sessions;
- papers;
- supporting resources;
- frontier items;
- projects;
- official artifacts.

A session's identity must no longer be derived solely from its current sequence number.

`sequence` and `id` are separate concepts.

Reordering a session must therefore change:

```text
sequence
```

without changing:

```text
stable_id
```

Existing session progress must be migrated once from the current `F3-S01` style identity scheme to the new stable identifiers.

Aliases must preserve historical progress files and links.

---

# 5. Relationship semantics

The system must distinguish at least four topic/session relationship types.

### Hard prerequisite

Knowledge that must be available before the dependent material can sensibly be executed.

Hard-prerequisite graphs must be acyclic.

### Recommended background

Material that improves understanding but does not block entry.

### Related / intellectual connection

An important conceptual or historical relationship without ordering semantics.

### Feedback / co-development relationship

Topics that inform one another iteratively.

These relationships may be cyclic.

The current E2↔D4 hard-prerequisite cycle must therefore be reviewed manually and resolved into the appropriate relationship types.

The data validator must reject cycles among **hard prerequisites**.

---

# 6. Completion semantics

The product distinguishes:

### Canonical Required Core completion

All Required Core sessions or required evidence for the topic have been completed.

Optional Specialization and Frontier Continuation do not block Required Core completion.

### Continuation progress

Progress through optional, advanced or frontier material after Required Core.

### Full topic completion

All activated material in the user's chosen path has been completed.

### Validated competence

The user already knows or demonstrates the required competence without having executed the complete canonical session.

### Sprint coverage

The user has acquired sufficient target-specific understanding through a compressed path but has not necessarily fulfilled the complete canonical evidence requirements.

These states must never be conflated.

Switching from a faster learning profile to a stricter one should therefore reveal missing work rather than rewrite history.

---

# 7. Three learning profiles

The canonical curriculum remains one curriculum.

The profiles alter **how a user traverses it**, not what the underlying curriculum contains.

## 7.1 Guided

**Purpose:** easiest cognitively, slowest and most complete.

Guided mode follows the intended research-learning progression.

It:

- traverses required prerequisites;
- uses assigned primary papers and supporting material;
- does not aggressively compress foundational material;
- preserves required reconstruction/evaluation work;
- completes the full Required Core before downstream topics are considered canonically complete.

This is the default recommendation for members studying an area systematically.

## 7.2 Accelerated

**Purpose:** substantially faster while preserving operational competence.

Accelerated mode may:

- diagnose and skip material the user demonstrably already understands;
- reduce reading to selected required sections;
- replace redundant introductory reading with concise prerequisite repair;
- use worked explanations and AI tutoring;
- combine closely related preparation stages;
- omit optional implementation work when reconstruction or evidence analysis provides the required understanding.

It may not skip a session's **essential competence/evidence gate**.

The UI explicitly shows what has been compressed.

## 7.3 AI Sprint

**Purpose:** fastest route to useful understanding of a target topic, session or paper.

This mode is appropriate when a member needs to catch up quickly or understand material required for another task.

The system computes the shortest sensible prerequisite path from the user's current state.

AI Sprint may:

- have AI inspect and explain linked prerequisite sources;
- summarize background material;
- explain the paper directly from its linked authoritative sources;
- generate a focused walkthrough of important figures, methods and evidence;
- identify only the sections the user should personally open;
- perform rapid prerequisite diagnostics;
- replace broad reading with targeted questioning and explanation.

It must explicitly expose:

- what was skipped;
- what was compressed;
- which claims came from the source;
- what the user has not personally verified;
- which evidence component would still be required for full canonical completion.

AI Sprint therefore generally produces **Sprint coverage**, not automatic Full/Required-Core completion.

---

# 8. Target-driven learning

The system supports two complementary journeys.

### Curriculum journey

> "I want to work through the curriculum intelligently."

The product recommends the next best session based on:

- hard-prerequisite readiness;
- topic continuity;
- Required Core priority;
- recent work;
- selected learning profile;
- current personal progress;
- active integration-project needs when known.

### Target journey

> "I need to understand E2 / Diffusion Policy / this paper as soon as possible."

The user selects a target.

The system calculates:

```text
current knowledge
        ↓
missing hard prerequisites
        ↓
minimum valid dependency path
        ↓
target session/paper/topic
```

The result changes according to Guided, Accelerated or AI Sprint mode.

---

# 9. Primary information architecture

The final application should use learner-oriented primary navigation.

## Home

Answers:

> What should I do now?

Contains:

- Resume;
- recommended next session;
- two alternatives;
- selected learning profile;
- target journey if active;
- blockers;
- recent work;
- Required Core progress;
- upcoming frontier/research context when relevant.

## Curriculum

Contains structural exploration.

Secondary views:

- dependency map;
- curriculum matrix;
- area overview;
- focused dependency path;
- topic browser.

`Focus` is no longer a standalone top-level destination.

It is a contextual tool.

## Library

Contains:

- Papers
- Supporting resources
- Frontier

Global paper browsing should therefore no longer require entering a topic first.

## Workspace

Contains:

- My notes
- My artifacts
- My custom sessions/material
- My disabled items
- My learning paths
- Import/export/sync
- Published/proposed changes

## Reference

Pretty, readable rendering of:

- documents 1–5;
- curriculum map;
- curriculum table;
- paper index;
- supporting-material index;
- frontier watchlist;
- topic source Markdown;
- architecture/product documentation.

Every rendered source document should have stable section anchors and useful navigation.

---

# 10. Topic workspace

A topic page contains:

- Summary
- Learning path
- Sessions
- Papers
- Resources
- Connections
- Notes
- Revision history

The topic header shows separately:

```text
Required Core       7 / 8
Continuation        1 / 3
My competence       Validated / In progress / —
```

It also shows:

- current learning profile;
- estimated remaining effort;
- prerequisites;
- downstream topics;
- "Continue" action;
- "Plan fastest route here";
- canonical source link.

---

# 11. Session workspace

The session becomes the core execution screen.

It contains:

### Why this session exists

Central question, curriculum role and relationship to surrounding sessions.

### Readiness

Hard prerequisites and current user state.

Each prerequisite indicates:

- completed;
- validated;
- missing;
- assumed/skipped.

### Sources

Primary papers and supporting resources.

Each source shows:

- why it is assigned;
- role;
- required sections when available;
- expected preparation burden;
- authoritative link;
- code/project link when available.

### Learning profile

Guided / Accelerated / AI Sprint.

Changing the profile updates:

- preparation recommendation;
- expected duration;
- AI assistance;
- validation requirement;
- what may be skipped.

### AI assistance

Actions such as:

- Explain prerequisites
- Walk me through this paper
- Give me the accelerated version
- Quiz my readiness
- Check my understanding
- Help me reconstruct the method

### Notes

Autosaved Markdown/rich-text notes tied to the stable session ID.

### Artifacts

Users can attach:

- code files;
- notebooks;
- figures;
- PDFs;
- experiment results;
- links;
- other session outputs.

### Completion

The interface explicitly records how the session was handled:

- fully completed;
- competence validated;
- Sprint-covered;
- skipped;
- still in progress.

---

# 12. AI tutoring contract

AI is a learning accelerator, not a source-of-truth replacement.

Every generated AI-tutor prompt includes:

- session/topic identifier;
- central objective;
- selected learning profile;
- missing prerequisites;
- completed prerequisites;
- canonical source URLs;
- relevant sections where known;
- expected capability;
- required evidence/artifact;
- desired time budget when specified.

The prompt instructs the model to:

1. ground its explanation primarily in the linked sources;
2. distinguish the source's claims from external context;
3. expose uncertainty;
4. explain only prerequisite material relevant to the target;
5. identify anything being skipped;
6. end with an active validation step.

### Short Guided example

> Teach me this session using the linked sources. First verify that I understand its prerequisites, then guide me through the method and evidence without skipping the important derivations. Finish by testing whether I can explain the result myself.

### Short Accelerated example

> I need to learn this session quickly. Use the linked papers and resources, teach only the prerequisites I am missing, explain the essential method/evidence/limitations, tell me what you compressed, and finish with a short understanding check.

### Short AI Sprint example

> Get me to operational understanding of this session as quickly as possible. Read/reference the linked sources yourself, explain the minimum prerequisite chain and the paper's core method, evidence and limitations, then tell me which figures/sections I absolutely should inspect myself and quiz me before I continue.

These prompts should be generated from each session rather than manually duplicated across 400 sessions.

---

# 13. Personal customization model

Canonical content is rendered as **Base curriculum**.

The user's modifications form **My overlay**.

For a canonical session/reference/topic, allowed personal actions include:

- Add note
- Add attachment
- Add alternative reference
- Disable in my path
- Re-enable
- Mark skipped
- Validate competence
- Move within my custom plan

Canonical deletion is unavailable.

For user-created material:

- Edit
- Move
- Disable
- Re-enable
- Delete

Disabled canonical items remain accessible through:

> Workspace → Disabled items

so hiding something is always reversible.

---

# 14. Reordering lessons

Users may create personal route orderings.

The canonical topic timeline never changes because somebody drags a card.

When a move violates a hard prerequisite, the interface must:

1. explain the violated prerequisite;
2. suggest a valid position;
3. prevent silent invalid ordering.

An advanced user may explicitly override the warning for their personal path, but the path must then display a visible dependency warning.

Official reordering of the canonical curriculum requires a reviewed curriculum change.

---

# 15. Notes and artifact persistence

Personal progress and text notes require durable browser storage more capable than `localStorage`.

Attachments must not be encoded directly into ordinary localStorage state.

The product requires a versioned **Workspace Bundle** capable of containing:

- progress;
- notes;
- custom entities;
- disabled-state overrides;
- custom ordering;
- learning-profile state;
- source revision;
- attachment manifests;
- optional attached files.

The bundle can be exported/imported.

Every bundle records the curriculum `source_revision`.

When the curriculum changes, migration occurs by stable entity ID.

Unknown or removed canonical entities become **orphaned/archived references** rather than causing data loss.

---

# 16. Official club artifacts

The existing repository model for session artifacts remains valid.

When a member wants to convert private work into an official club record, the system can generate the corresponding repository structure:

```text
topics/<topic>/
└── <session>/
    ├── session_plan.md
    ├── session_notes.md
    ├── code/
    └── other_session_files/
```

The user chooses what to publish.

Personal notes are never automatically made public.

---

# 17. GitHub publishing and security model

GitHub Pages remains suitable for the read application and anonymous/personal local workspace.

GitHub Pages is static, so repository write credentials must never live in browser JavaScript.

The contract defines a credential-free fallback and a possible authenticated extension. The fallback is implemented; the authenticated extension is not deployed.

## Fallback path

The application generates a repository-compatible proposal bundle or patch for manual upload/PR creation.

## Authenticated path

A minimal trusted GitHub App/serverless bridge may authenticate club members and create:

1. a change branch;
2. generated Markdown/artifacts;
3. a pull request.

It never writes directly to `main`.

This path is optional and intentionally deferred. It must not be represented as available until its trusted service, failure handling, and security review exist.

Before this capability is enabled, `main` must be protected with repository rules requiring:

- pull request;
- successful validation/build checks;
- no force pushes;
- appropriate human review.

Changes to framework documents 1–5 require stricter approval than ordinary notes or curriculum metadata.

---

# 18. Change semantics

Changes are classified.

### Personal change

Affects only the user's overlay.

No GitHub review required.

### Club execution artifact

Adds session/project output without changing the canonical curriculum structure.

Published by PR.

### Curriculum correction

Changes:

- prerequisites;
- topic boundaries;
- paper placement;
- session order;
- core/optional classification;
- canonical references.

Requires justification under the existing curriculum revision rules.

### Framework revision

Changes documents 1–5.

Never automatic.

Requires explicit club approval.

---

# 19. Maintenance agent

A scheduled research-maintenance agent should run approximately every two days.

Its job is not to continually rewrite the curriculum.

Its job is to determine whether the curriculum requires attention.

Each run should:

1. read current repository state and previous maintenance state;
2. search for materially relevant new papers/projects/releases since the previous scan;
3. inspect due frontier-review items;
4. detect broken, redirected or obsolete links;
5. rotate through existing papers/resources for metadata freshness;
6. check newly available official code/project pages;
7. detect important replications, negative results or benchmark critiques;
8. map candidates to existing topics;
9. assess whether anything genuinely changes a durable lineage;
10. produce a change proposal only when justified.

The agent must preserve the distinction between:

- durable core;
- frontier monitoring;
- metadata correction;
- structural curriculum revision.

A fashionable new paper is not sufficient reason for integration.

### Maintenance output

No meaningful change:

> update maintenance state; no user notification required.

Metadata/link correction:

> automated review-branch proposal; pull request when organization policy permits, linked maintainer issue otherwise.

New frontier candidate:

> frontier PR proposal with rationale and evidence maturity.

Material curriculum change:

> review proposal requiring human approval.

Framework change:

> recommendation only; never automatic modification.

---

# 20. Maintenance cadence

The two-day run acts as a scheduler.

It does not need to revalidate all 192 active primary papers every 48 hours.

It should maintain a due queue.

### Every approximately two days

- frontier delta scan;
- due frontier decisions;
- newly broken critical links;
- rotate through a subset of canonical material.

### Approximately monthly

Every canonical paper/resource/link should have been touched by the rotating audit.

### Periodically or after major field changes

Perform a deeper curriculum-structure review:

- topic boundaries;
- prerequisite validity;
- paper lineages;
- frontier promotion;
- obsolete material;
- new research directions.

All maintenance work records:

- checked date;
- source;
- evidence;
- confidence;
- decision.

---

# 21. One-time exhaustive curriculum audit before product completion

Before the new product is declared complete, an agent must perform an item-by-item validation of the entire current curriculum.

The audit covers:

### 37 topics

For each:

- scope;
- target competence;
- execution status;
- role;
- hard prerequisites;
- related topics;
- downstream relationships;
- required-core boundary;
- session progression;
- cross-topic interfaces.

### 400 sessions

For each:

- stable identity;
- coherent objective;
- stage;
- classification;
- prerequisite correctness;
- position in timeline;
- assigned materials;
- expected capability;
- planned evidence/activity;
- transition from prior/next session.

### 192 active primary papers and one quarantined historical slot

For each:

- title;
- authors;
- year;
- venue;
- canonical URL;
- authoritative version;
- official project page;
- code repository;
- assigned topic;
- role;
- technical level;
- required sections/preparation burden;
- contribution;
- lineage;
- limitations;
- evidence/influence indicators;
- metadata confidence.

### 41 supporting resources

For each:

- canonical link;
- type;
- relevance;
- appropriate topic/session placement;
- duplication;
- currency.

### Frontier records

For each:

- date added;
- related topics;
- rationale;
- maturity;
- review date;
- decision;
- latest evidence.

### Every dependency

Each relationship must be inspected semantically.

The audit must distinguish:

- hard prerequisite;
- recommended background;
- related;
- feedback/co-development.

A relationship is not accepted merely because an identifier appears in another Markdown file.

### Every external link

The agent must verify more than HTTP success.

Where appropriate it verifies:

- destination identity;
- authoritative version;
- redirect quality;
- project ownership;
- current code repository;
- whether the URL still represents the intended source.

---

# 22. Data-contract validation

CI must enforce semantic invariants, not merely counts.

At minimum:

- stable IDs unique;
- canonical IDs immutable once published;
- no hard-prerequisite cycles;
- every prerequisite endpoint exists;
- session dependencies never accidentally point forward unless explicitly cross-topic/concurrent;
- allowed topic-status vocabulary;
- allowed session-classification vocabulary;
- Required Core completion boundary valid;
- continuation sessions do not silently block core completion;
- all papers/resources have valid owners;
- all canonical paper metadata survives the JSON projection;
- all frontier lifecycle metadata survives projection;
- generated JSON reproducible;
- source revision correct;
- curriculum map/table/topic plans agree where they intentionally duplicate summaries.

---

# 23. User-interface validation

The final implementation must be tested as a user journey, not only as individual components.

Automated browser tests and targeted visual checks cover:

- first visit;
- resuming progress;
- target planning;
- changing learning profile;
- topic → session → paper → back;
- browser back/forward;
- deep-link reload;
- search;
- filters;
- zero-result state;
- hidden selected entity;
- disabled reference;
- re-enabled reference;
- custom session creation;
- custom deletion;
- canonical deletion attempt;
- reordering with valid prerequisites;
- reordering with invalid prerequisites;
- notes;
- attachments;
- workspace export/import;
- old curriculum revision import;
- curriculum-update migration;
- responsive desktop/tablet/mobile;
- light/dark mode;
- reduced motion;
- keyboard navigation;
- malformed local state;
- offline/read-only behavior;
- authentication failure, if an authenticated bridge is introduced;
- GitHub proposal failure, if an authenticated bridge is introduced.

No view may become blank, unreasonably zoomed, clipped or unrecoverable after valid navigation.

---

# 24. Visual and interaction standard

The product should feel like a serious research tool.

Priorities:

1. readability;
2. clear hierarchy;
3. provenance;
4. fast navigation;
5. explainable state;
6. dense information without tiny typography.

Normal explanatory text should not use miniature ~12 px sizing as the current viewer often does.

Graphs are used when relationships matter.

Tables are used when comparison matters.

Timelines are used when sequence matters.

Cards/lists are used when decisions and actions matter.

The UI should not use the graph merely because graph data exists.

---

# 25. Documentation experience

The source Markdown remains directly browsable in a high-quality documentation surface.

Each document should support:

- table of contents;
- stable anchors;
- backlinks where useful;
- readable tables;
- equations;
- code;
- source link;
- related curriculum entities;
- revision information.

For canonical material, normal users see:

> Add note
>
> Disable in my path
>
> Suggest change

rather than a destructive generic Edit/Delete interface.

---

# 26. Product provenance and revision awareness

The application displays:

- curriculum source revision;
- literature cutoff;
- last maintenance scan;
- last review date where applicable.

When the repository updates, users should be informed of material changes relevant to their current path.

Example:

> Curriculum updated since your last visit.
>
> - 2 papers changed metadata.
> - 1 session changed prerequisites.
> - Your notes and progress were preserved.

---

# 27. Framework amendment decision

The five numbered framework documents were reviewed and intentionally left byte-for-byte unchanged. They were jointly validated before this implementation and remain the highest-level authority.

Stable identities, typed relationships, personal workspace overlays, learning profiles and proposal publication are implementation details. They are documented in the architecture, contribution guide and generated data contract instead of being retrofitted into the approved framework.

Any future framework revision requires an explicit, separately reviewed club decision. It must not be bundled into ordinary curriculum maintenance or product work.

---

# 28. What must remain unchanged

The product must not turn into:

- a generic AI course;
- a generic note-taking app;
- a paper-summary website;
- a project-management suite;
- an opaque recommendation engine;
- a rigid weekly timetable;
- a leaderboard;
- a VLA-only curriculum;
- an AI system that substitutes confident summaries for scientific evidence.

The curriculum remains broader and more durable than the current frontier.

---

# 29. Initial implementation order after approval

The implementation agent should begin with correctness, not visual polish.

1. Perform the exhaustive curriculum/data audit.
2. Correct dependency and completion semantics.
3. Introduce stable identities and migration.
4. Expand the data contract without losing canonical information.
5. Build the personal workspace state model.
6. Implement the learner-first navigation and session workspace.
7. Implement learning profiles and target-route planning.
8. Implement notes, custom entities, disabling/re-enabling and reordering.
9. Implement workspace portability.
10. Implement AI prompt generation.
11. Implement safe proposal/publishing flow.
12. Implement maintenance automation.
13. Perform exhaustive browser/accessibility/visual validation.
14. Update documentation and record the framework-amendment decision while preserving documents 1–5.
15. Protect `main`, require CI and human review.
16. Deploy only after all contract acceptance tests pass.

---

# 30. Definition of done

The project is complete when a new technically competent club member can open the site and, without understanding the repository beforehand:

- understand what the curriculum is trying to achieve;
- choose a learning speed;
- obtain a sensible next session;
- understand why it is next;
- see and repair missing prerequisites;
- learn from authoritative sources;
- use AI to accelerate appropriately;
- verify their understanding;
- take notes and attach artifacts;
- stop and resume later;
- customize their own path without damaging canonical material;
- inspect the complete knowledge structure when desired;
- understand which material is core, optional or frontier;
- publish selected work safely back to the club;
- trust that curriculum changes are reviewed, traceable and continuously maintained.

At the same time, a maintainer must be able to rely on the repository as a durable, reproducible, reviewed research curriculum rather than a mutable application database.

---

# 31. Implementation decision and evidence

The contract was implemented on the `product-contract-v2` feature branch on 27 August 2026. Protected `main` review remains the publication boundary.

Key decisions:

- The five framework documents remain byte-for-byte unchanged and are guarded by exact SHA-256 tests.
- Markdown remains authoritative; a deterministic schema-2 JSON projection serves the browser application.
- The final active inventory is 37 topics, 400 stable sessions, 192 primary papers, 41 resources, 12 frontier records, and 255 typed relationships, including 187 acyclic hard prerequisites.
- P158–P162 remain uniquely owned E3 Frontier Continuation papers; their duplicate watchlist entries were removed.
- P189 remains a stable, visible, no-credit quarantine slot because its former URL identified an unrelated work.
- Browser-local IndexedDB plus explicit plaintext Workspace Bundles provide persistence and portability without an account or backend.
- Safe publication uses a credential-free Markdown proposal download. The optional authenticated GitHub bridge is deferred rather than simulated in browser code.
- Scheduled maintenance produces bounded evidence and review proposals; it never silently edits canonical curriculum.

Validation evidence:

- the complete semantic suite passes, including framework hashes, inventories, ownership, identity locks, completion partitions, projection agreement, and hard-gate coverage;
- maintenance state validates against all 245 active paper, resource, and frontier entities, and offline report generation passes;
- `mkdocs build --strict` succeeds;
- the browser journey suite passes across persistence, migration, customization, adversarial bundle import, offline use, responsive layouts, dark mode, reduced motion, and the no-third-party-request boundary;
- `git diff --check` succeeds.
