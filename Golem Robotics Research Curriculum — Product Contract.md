# Golem Robotics Research Curriculum — Product Contract

**Status:** Implemented; protected `main` review and GitHub Pages publication remain the release boundary

**Purpose:** Ground-truth product specification

**Implementation:** First implementation completed on 2026-08-27. The learner interface was redesigned on 2026-08-30 after a usability review, and reoriented on the same day around a personal plan after a second review. The interface sections below describe the converged design; Section 31 records each round of decisions and its evidence.

**How to read this document:** Sections 1 to 8, 12 to 22 and 26 to 30 are product invariants. Sections 9 to 11, 11a, and 23 to 25 describe the interface that implements them. Interface sections may be revised when a better design is demonstrated and validated; invariants may not.

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
- personal plan;
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

## 3.7 The curriculum is a reference, not a track

The canonical curriculum is a reviewed map of the field. It is not a syllabus every member must complete, and the
product must not behave as though it were.

Most members will read it the way one reads a good bibliography: to work out what to read next. The interface must
therefore make it trivial to look, decide, and record that decision — without adopting the whole structure.

Concretely:

- the learner's own ordered **plan** is the primary surface, not the curriculum's recommendation;
- the plan may reference canonical papers, sessions and topics, or contain material the curriculum knows nothing about;
- the curriculum contributes **suggestions** that are added only on an explicit act;
- nothing in the plan is required to come from the curriculum, and nothing in the curriculum is required to enter the plan;
- canonical completion records and personal plan progress remain separate, and neither silently rewrites the other.

This does not weaken the methodology. Required Core, competence validation and Sprint coverage keep their exact
meanings for anyone who chooses to follow the curriculum. It changes who is in charge of the order.

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

The application is a standalone workspace served at the site root. The reviewed Markdown documents are rendered
alongside it and reached through Reference; the product is never presented inside documentation chrome.

Navigation has five destinations, in the order a learner actually uses them: **My plan · Papers · Curriculum ·
Workspace · Reference**.

## My plan

The landing surface, and the only one that is entirely the learner's. It answers:

> What am I actually going to do next?

Contains, in priority order:

- the first unfinished item in the plan, presented in the form its kind deserves;
- one box that adds anything — a canonical paper, session or topic, or free text the curriculum has never heard of;
- the ordered plan itself: reorderable, annotatable, removable, with finished items collapsed;
- what the curriculum *would* suggest, each with its reasons and an explicit "add to my plan";
- the learning profile, the target and its route, the personal record, recent work and curriculum provenance.

A first visit adds a short, dismissible orientation band explaining that the curriculum is a reference, how to make a
plan from it, and how to be led instead if that is preferred. It disappears permanently once the learner records
anything. Marketing hero copy is not used.

Plan items reference canonical entities without owning them. A canonical item is ticked off by the record that already
exists for it — a paper by its reading state, a session by its completion, a topic by its Required Core boundary — so
the plan never becomes a second source of truth about progress.

## Curriculum

Structural exploration, in three presentations plus the map:

- the route in a prerequisite-valid order (default);
- the areas, as a browsable catalogue;
- the matrix, for comparing prerequisites and unlocks as text;
- the relationship map, which has its own address because it serves papers as well as topics.

## Papers

The complete primary-source library as a first-class destination, with supporting resources and the frontier watchlist
as sibling collections. Global paper browsing never requires entering a topic first, and is described in Section 11a.

## Workspace

The personal record: progress, reading, notes, artifacts, personal additions, hidden canonical items, personal route
order, raised proposals and portability.

## Relationship map

One surface, two layers over the same reviewed relationships, described in Section 24.

## Reference

Pretty, readable rendering of documents 1 to 5, the curriculum map and table, typed relationships, the paper and
supporting-material indexes, the frontier watchlist, topic source Markdown, the audit, and the architecture and
governance documentation. Every rendered source document has stable section anchors, useful navigation and a link back
into the workspace.

## Addressing

Every view is a shareable deep link. Routing is hash-based (`#/papers/P104`, `#/topics/L6`, `#/sessions/SES-…`,
`#/map?layer=papers&focus=P104`, `#/compare`, `#/place`, `#/workspace?tab=…`), so links survive a reload on any static
host and browser history works without server rewrites. Filter, sort and presentation state belongs in the address; personal state never does.
Historical `?view=` links are migrated on load.

---

# 10. Topic workspace

A topic page presents everything in one scrollable surface with a sticky section index. Content is never hidden behind
tabs: a learner deciding whether to enter a topic must be able to see its sessions and its papers without guessing
which tab holds them.

Sections, in order:

- Overview — scope, deliberate exclusions, target competence, the Required Core boundary, assumed prior knowledge.
- Sessions — the canonical timeline. Optional and frontier sessions are collapsed beneath it and can be activated into the personal route.
- Papers — the curated lineage in teaching order, stating plainly how many are studied inside Required Core sessions.
- Resources — supporting material and any frontier record touching the topic.
- Connections — the four relationship types, incoming and outgoing, each with its rationale and its reviewed evidence.
- My notes.
- Revision history.

A persistent side rail carries progress and action:

```text
Required Core       7 / 8
Continuation        1 / 3
Sprint covered      2
```

together with the current profile's estimated remaining effort, the Continue or Start action, "Plan the fastest route
here", the readiness breakdown, and the personal overlay actions.

Readiness distinguishes the two hard-prerequisite scopes explicitly, because they mean different things to a learner:

- **Topic-entry gates** block the whole topic;
- **session-scoped gates** hold back only the sessions that name them.

When a topic is gated, one banner above the timeline explains it. Individual rows are not each labelled "blocked".

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
- role, technical level and preparation burden;
- required sections when available;
- authoritative link;
- code/project link when available;
- the learner's reading state for that source;
- a route to the paper's own workspace, described in Section 11a.

When a session assigns more than one paper, it offers a direct comparison of them, because reconstruction and
lineage-integration sessions exist precisely to compare sources.

### Learning profile

Guided / Accelerated / AI Sprint.

Changing the profile updates:

- preparation recommendation;
- expected duration;
- AI assistance;
- validation requirement;
- what may be skipped.

### AI assistance

One prompt builder rather than a wall of pre-rendered prompts. The learner selects an intent:

- Repair my prerequisites
- Walk me through the source
- Give me the fast version
- Quiz my readiness
- Check my understanding
- Help me reconstruct the method

The generated prompt is shown in full before it is copied, so the learner can see exactly what the model is being told
about them and about the source.

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

# 11a. Paper workspace

Papers are a first-class research object and a central workflow, not passive references beneath lessons. Roughly half
of the canonical sessions exist to study one specific paper, so an interface that reaches a paper only through a
session inverts the real object model.

## Library

The library is reachable directly from primary navigation and lists every active primary paper without entering a
topic first. It supports:

- faceted narrowing by curriculum role, technical level, preparation burden, area, topic, personal reading state, and relevance to the learner's own route;
- explicit filters for Required Core use, criticality, availability of official code, starred, annotated and hidden;
- free-text search across title, authors, venue, contribution and lineage;
- sorting by curriculum order, year, title, preparation burden and role;
- paging rather than an unbounded list;
- a zero-result state that names the way back.

Facet and sort state is in the address, so a filtered library view is shareable. Every row states the paper's identity,
authors, year, venue, owning topic, role, level, preparation burden, whether Required Core uses it, and how it relates
to what the learner is doing now.

Supporting resources and frontier records are sibling collections of the same destination.

## Paper page

Every paper has its own addressable workspace answering, in order:

- **Why it is in the curriculum** — its contribution and what its curriculum role means.
- **How to read it** — the assigned sections, technical level, preparation burden, authoritative version, project or code, and generated paper-level AI prompts.
- **Read first** — the topics and earlier papers the curriculum assumes, each with the reason.
- **Read after** — what it opens up.
- **Lineage** — the topic's curated paper sequence with this paper's position, plus the canonical lineage note verbatim.
- **Evidence and limitations** — the recorded limitation, quality and influence signals, and metadata confidence.
- **Where it is used** — every session that assigns it, with classification and what it is studied alongside.
- **Closely related papers** — with one action to compare them.
- **My notes.**
- **Provenance** — a link into the exact canonical record and a route to propose a correction.

## Lineage honesty

The per-topic paper sequence taken from the canonical session timeline is authoritative and is presented as such. The
free-text lineage note is displayed unchanged; references resolved out of it by name matching are presented as
inferred, and a direction that cannot be established from the canonical text is never asserted.

## Comparison

Two to four papers can be compared side by side on the dimensions the curriculum actually judges: topic, role, year and
venue, authors, level, preparation burden, assigned reading, contribution, lineage, limitation, evidence signals,
metadata confidence, the sessions that use them, Required Core use, and the learner's own reading state and note. The
comparison is addressable and therefore shareable.

## Reading state

A paper carries a personal reading state — to read, reading, skimmed, read — and a star. Reading state is a personal
overlay record: it never contributes to Required Core completion, competence validation or Sprint coverage.

## Placing a paper found elsewhere

The learner must be able to arrive with a paper and ask where it fits. Given a link, an arXiv identifier, a DOI or a
title, the product either identifies the canonical record and states its exact placement, or reports that nothing
canonical matches and ranks the topics it most plausibly belongs to by overlap with their stated scope and existing
sources — labelled as term overlap, not curatorial judgement. Both outcomes end in an action: add it to the personal
overlay, or raise a canonical proposal.

## Paper management under the overlay model

Canonical papers may be annotated, marked, starred, hidden from a personal route and restored. They are never deleted.
Learners may add their own papers, alternatives and replacements, and may edit, move, disable, re-enable and delete
those additions. Every canonical paper offers a proposal route for an addition, a replacement, a metadata correction, a
retirement or a change of placement.

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

These prompts are generated from each session rather than manually duplicated across 400 sessions. The same contract
applies to paper-level prompts generated from a paper's canonical metadata, its curriculum placement and the learner's
profile.

The learner can always inspect the full generated prompt before using it. Nothing is sent anywhere by the product: the
prompt is copied into whichever assistant the learner already uses.

---

# 13. Personal customization model

Canonical content is rendered as **Base curriculum**.

The user's modifications form **My overlay**.

## 13.1 The personal plan

The plan is the overlay's primary object. It is an ordered list of intent.

A plan item is either a reference to a canonical entity — a paper, a session, a topic or a supporting resource — or an
item the learner wrote themselves, which need not correspond to anything in the curriculum.

Rules:

- **Adding is always explicit.** The curriculum proposes; the learner adds. Nothing is auto-planned.
- **Adding is always one act.** Every canonical object carries an add control wherever it is shown: a paper row, a
  paper page, a session, a topic, a filtered library in bulk, a target route in bulk, the search box, and the map.
- **Order belongs to the learner.** Items move freely. A plan order that violates a hard prerequisite is not prevented,
  because the plan is not a claim about the curriculum; the session itself still states its readiness honestly.
- **Completion is not duplicated.** A canonical plan item is finished when its own canonical record says so. Only
  learner-written items carry their own done flag.
- **Removal is free.** Removing a plan item removes intent, never a record: notes, reading state and progress survive.

The plan travels in the Workspace Bundle like every other personal record.

## 13.2 Actions on canonical and personal material

For a canonical session, reference, paper or topic, allowed personal actions include:

- Add to my plan
- Remove from my plan

- Add note
- Add attachment
- Add alternative reference
- Set a reading state and star a paper
- Disable in my path
- Re-enable
- Mark skipped
- Validate competence
- Record Sprint coverage
- Move within my custom plan
- Propose a canonical change for review

Canonical deletion is unavailable, and no interface offers it.

For user-created material:

- Edit
- Move
- Disable
- Re-enable
- Delete

A raised proposal is a personal record until the learner exports it. Withdrawing one changes nothing canonical.

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

No GitHub review required. Reading state, notes, stars, hidden items, personal additions and personal route order are
all personal changes.

### Raised proposal

A request for review recorded in the personal workspace. It is classified when raised — addition, replacement,
metadata correction, retirement, changed placement, or other — carries a mandatory justification, and changes nothing
until it is exported and reviewed through a pull request.

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

The plan is validated as its own journey:

- adding something the curriculum has never heard of;
- adding a canonical paper, a whole topic's papers in bulk, and a target route in bulk, without duplicates;
- reordering, annotating and removing items;
- a canonical item being ticked off by its own record rather than a second one;
- the curriculum's suggestions never entering the plan unasked.

The relationship map is validated on both layers: every node keyboard-reachable, a click focusing rather than
navigating, a double click opening, the focus surviving in the address and across the re-render, and the panel naming
each relationship and holding the real link.

Long side rails — the paper filters above all — are validated to scroll on their own without dragging the page.

The paper workflow is validated as its own journey:

- browsing, faceting, sorting and paging the whole library;
- identifying a paper from a link, an arXiv identifier or a title;
- placing a paper the curriculum does not contain;
- reading a paper page end to end and reaching its prerequisites, its lineage neighbours and its sessions;
- comparing two to four papers;
- setting reading state, starring, annotating, hiding and restoring;
- adding a personal paper and proposing a canonical replacement.

Accessibility is validated mechanically rather than asserted. Every route is audited, in both colour schemes and at
desktop and mobile widths, for a single `h1` per view, unbroken heading order, an accessible name on every interactive
control, a minimum touch-target height, no duplicate identifiers, labelled or hidden graphics, and computed WCAG AA
contrast against the actually rendered background. Horizontal overflow is checked from 320 px to 1440 px.

Every test context also asserts that the application produced no page error, no failed request and no third-party
request.

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

Explanatory text is 16 px with a 1.55 line height; supporting text is 14 px. Twelve-pixel type is reserved for chips
and field labels and is never used for prose. Interactive controls carry a visible focus ring, and no colour alone
carries meaning.

Graphs are used when relationships matter.

Tables are used when comparison matters.

Timelines are used when sequence matters.

Cards/lists are used when decisions and actions matter.

The UI does not use the graph merely because graph data exists. The relationship map is deterministic SVG drawn from
the reviewed layout coordinates — identical for every learner, stable across releases, keyboard-operable, and free of
any graph-rendering dependency. The matrix view carries the same information as text for anyone who would rather read
it.

The map has two layers:

- **Topics.** The 37 topics in their area columns. It defaults to the 56 topic-entry gates rather than all 187 hard
  prerequisites, because that is the structure that actually blocks a learner.
- **Papers.** Each topic's curated paper lineage as a column, read top to bottom, with the lineage chain drawn solid
  and cross-lineage references inferred from lineage notes drawn dashed and labelled as inferred. Scoped to one area,
  or to the lineages around one paper, because 192 nodes at once would be a decoration rather than a tool.

Interaction is the same on both layers, and separates looking from leaving:

- a single click, or Enter, **focuses** a node: it and its relationships are highlighted, everything else is dimmed,
  and a panel names every relationship with its type and offers the real link;
- a double click, or the panel's link, **opens** the entity's page;
- the focused node is part of the address, so a focused map is shareable;
- every node is reachable with Tab, keeps its keyboard focus across the re-render, and carries a full text label.

Nodes are sized for reading, not for fitting everything on one screen. A map that has to be squinted at is a diagram
nobody uses; horizontal scrolling is the acceptable cost.

Vocabulary is the learner's, not the contract's. The interface says "hidden from my path" rather than "disabled
entity", "my additions" rather than "custom items", "read first" rather than "prerequisite closure". Terms of art that
carry real distinctions — Required Core, validated competence, Sprint coverage, topic-entry gate — are used precisely
and explained where they first appear.

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

> Add a note
>
> Hide from my path
>
> Propose a canonical change

rather than a destructive generic Edit/Delete interface. No surface offers deletion of a canonical entity, and hiding
always states where the item can be recovered.

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

Because the curriculum is a reference rather than a track, the same member must also be able to:

- keep an ordered plan of what they intend to do next, in their own order;
- put anything into it in one act — a canonical paper, session or topic, a whole topic's papers, a target route, or
  something the curriculum has never heard of;
- see what the curriculum would suggest, with reasons, and decline it;
- have a canonical plan item tick itself off from the record that already exists for it;
- reorder, annotate, remove and finish plan items without touching canonical data.

Because papers are the central research object, the same member must also be able to, without entering a session:

- browse, search and filter every primary source, and see why each one matters;
- see a paper's role, prerequisites, lineage position, contribution, limitations, evidence indicators, authoritative
  and code links, assigned sections, and every session that uses it;
- learn what to read before it and what it opens up;
- compare papers side by side;
- track reading state and keep paper-specific notes;
- move naturally between a paper, its prerequisites, its lineage neighbours, its topic and its sessions, and back;
- arrive with a paper found elsewhere and discover where it fits, or where it would fit;
- annotate, mark, hide and restore canonical papers without ever deleting one;
- add, edit, move, disable, re-enable and delete their own papers;
- propose a canonical addition, replacement, metadata correction, retirement or change of placement through the safe
  review workflow;
- read the relationship map at the level they care about — topics and their gates, or paper lineages side by side —
  focusing a node to understand it and opening it only when they mean to.

At the same time, a maintainer must be able to rely on the repository as a durable, reproducible, reviewed research curriculum rather than a mutable application database.

---

# 31. Implementation decision and evidence

## 31.1 First implementation, 27 August 2026

The contract implementation was completed on 27 August 2026. Protected `main` review and successful GitHub Pages validation remain the publication boundary.

Key decisions:

- The five framework documents remain byte-for-byte unchanged and are guarded by exact SHA-256 tests.
- Markdown remains authoritative; a deterministic schema-2 JSON projection serves the browser application.
- The final active inventory is 37 topics, 400 stable sessions, 192 primary papers, 41 resources, 12 frontier records, and 255 typed relationships, including 187 acyclic hard prerequisites.
- P158–P162 remain uniquely owned E3 Frontier Continuation papers; their duplicate watchlist entries were removed.
- P189 remains a stable, visible, no-credit quarantine slot because its former URL identified an unrelated work.
- Browser-local IndexedDB plus explicit plaintext Workspace Bundles provide persistence and portability without an account or backend.
- Required Core completion, continuation progress, full activated-path progress, competence validation and Sprint coverage remain separate records; competence can satisfy a prerequisite without rewriting Required Core history.
- The Home and Workspace surfaces expose alternatives, blockers, recent work, route progress, frontier context, aggregated notes and artifacts, and reversible disabled-item recovery.
- The workspace records the last observed curriculum revision and reports revision changes while preserving personal data and archiving unknown identities.
- Safe publication uses a credential-free Git patch that generates repository-compatible session artifact directories. Private notes and artifact manifests are excluded unless the learner selects them. The optional authenticated GitHub bridge is deferred rather than simulated in browser code.
- Scheduled maintenance produces bounded evidence and review proposals; it never silently edits canonical curriculum.
- The authoritative Product Contract lives at the repository root, while rendered source documents link back to their exact GitHub files without introducing runtime third-party requests.

Validation evidence:

- the complete semantic suite passes, including framework hashes, inventories, ownership, identity locks, completion partitions, projection agreement, and hard-gate coverage;
- maintenance state validates against all 245 active paper, resource, and frontier entities, and offline report generation passes;
- `mkdocs build --strict` succeeds;
- the browser journey suite passes across learner recommendations, distinct completion semantics, source/profile/prompt contracts, note/artifact aggregation, disabled-item recovery, valid and overridden ordering, repository patch validation, revision awareness, persistence, migration, adversarial bundle import, offline use, responsive layouts, dark mode, reduced motion, and the no-third-party-request boundary;
- `git diff --check` succeeds.

## 31.2 Interface redesign, 30 August 2026

A usability review of the first implementation found that the product was a page inside a documentation site rather
than a product: two competing global navigations, two search fields, a documentation page title and pager wrapped
around the application, a content column it could not escape, and a sticky header that collided with the documentation
tabs. Papers, which are the object roughly half the curriculum is built from, had no page of their own and existed only
as cards in a thirty-thousand-pixel grid with no facets, no sort, no reading state and no comparison. The learner-facing
surfaces were redesigned rather than patched.

Decisions taken, and why:

- **The product owns the site root.** The workspace is a standalone shell rendered from `overrides/app.html`; MkDocs
  Material continues to render the reviewed documents at their own paths and is reached through Reference. There is now
  one navigation, one search, and no documentation chrome around the application. Document URLs did not change.
- **Papers became a first-class destination** with a faceted library, an addressable page per paper, comparison, reading
  state, per-paper notes, lineage navigation, and a "where does this fit" entry point. Section 11a records the contract
  this created.
- **Routing became hash-based.** Every view — including a filtered library, a comparison and a workspace tab — is a
  shareable deep link that survives reload on any static host, with working browser history and no server rewrites.
  Historical `?view=` links are migrated on load.
- **Relationship scope was being read incorrectly.** The projection distinguishes `topic_entry` from `target_sessions`,
  and the first implementation treated the two identically. Topic-entry gates now block a topic; session-scoped gates
  hold back only the sessions that name them. The interface states which is which.
- **Cytoscape was removed.** The relationship map is deterministic SVG drawn from the reviewed layout coordinates in the
  projection: 432 KB less vendored code, a keyboard-operable map, and a default view of the 56 blocking topic-entry
  gates instead of an unreadable 187-edge hairball. The application now vendors nothing at all.
- **Derived paper metadata is presented without overclaiming.** `role_level_preparation` is parsed into role,
  criticality, level, preparation burden and reading assignment while the raw string stays visible; references resolved
  out of free-text lineage notes are labelled inferred; and a lineage direction that cannot be established from
  canonical text is not asserted. The authoritative lineage shown to learners is the topic's own curated paper
  sequence.
- **The marketing hero was replaced by a decision surface.** Home leads with one explained next move, and a first visit
  gets a short dismissible orientation band instead of a permanent banner.
- **The six pre-rendered AI prompt cards became one prompt builder** whose full text is inspectable before copying.
- **Interface vocabulary was rewritten in the learner's language** while keeping the precise terms that carry real
  distinctions.

Validation evidence for this round:

- the complete Python semantic suite passes, including the framework hashes, inventories, identity locks, completion
  partitions, projection agreement and hard-gate coverage, plus a new assertion that the application vendors no
  unreviewed dependency;
- `tests/browser_journeys.js` passes sixteen end-to-end learner journeys covering first visit and explainable
  recommendation, session execution with five distinct completion states, the complete paper workflow, placing a paper
  found elsewhere, non-destructive canonical data beside fully editable personal data, personal ordering with
  prerequisite violations and explicit overrides, credential-free publication, portability with revision migration and
  adversarial bundles, navigation and error states, target planning, notes and artifacts and resuming, responsive
  layouts, accessibility, keyboard operation with reduced motion, degraded environments, and the reference surface;
- the built-in accessibility audit reports zero findings across fourteen routes in light and dark at 1440 px and
  390 px, and no route overflows horizontally between 320 px and 1440 px;
- every test context observed no page error, no failed request and no third-party request;
- `mkdocs build --strict` succeeds and `git diff --check` is clean.

## 31.3 Plan-led reorientation, 30 August 2026

A second review made a product-direction correction rather than a design one. The interface still treated the
canonical curriculum as the thing a learner follows: the landing surface was the curriculum's recommendation, and a
learner's own intentions had nowhere to live. In practice most members read the curriculum the way one reads a good
bibliography — to decide what to read next — and then keep that decision somewhere else.

Decisions taken, and why:

- **Principle 3.7 was added:** the curriculum is a reference, not a track. This is a product invariant, not an
  interface preference, and it is what the rest of this round follows from.
- **The personal plan became the landing surface and the first navigation item.** It is an ordered list of the
  learner's own intent that may reference canonical material or contain none at all. The curriculum's recommendation
  was demoted to a clearly-labelled suggestion with an explicit "add to my plan".
- **Adding is one act from everywhere** — a paper row, a paper page, a session, a topic, a filtered library in bulk, a
  target route in bulk, the quick-add box and the map — because a plan nobody can fill is not a plan.
- **Completion is never duplicated.** A canonical plan item is ticked off by the record that already exists for it, so
  the five completion states in Section 6 keep their exact meanings and the plan adds no sixth.
- **The relationship map gained a paper layer** and moved to its own address. Each topic's curated lineage is a column;
  the chain is solid, and references inferred from lineage notes are dashed and labelled as inferred.
- **Map interaction now separates looking from leaving.** A click focuses and explains; a double click opens. Nodes
  were enlarged to be read rather than squinted at, and the focused node lives in the address.
- **Side rails scroll independently.** The paper filter rail was only reachable by scrolling the whole results list —
  the single most irritating defect in the previous round.

Validation evidence for this round:

- the Python semantic suite, `python -m tools.maintenance --validate`, `mkdocs build --strict` and `git diff --check`
  all pass, and the generated projection is byte-identical: no canonical data was touched;
- `tests/browser_journeys.js` grew to nineteen journeys, adding one for the plan (free-text items, bulk adds without
  duplicates, reordering, annotation, removal, canonical completion not duplicated), one for both map layers and their
  interaction and keyboard behaviour, and one asserting that a side rail scrolls without moving the page;
- the built-in accessibility audit reports zero findings across seventeen routes in light and dark at 1440 px and
  390 px, and no route overflows horizontally between 320 px and 1440 px;
- every test context observed no page error, no failed request and no third-party request.
