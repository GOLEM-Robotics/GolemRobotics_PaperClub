# Golem Robotics Curriculum Explorer — Product and Interaction Design Specification

**Document status:** Implemented design reference (27 August 2026)

**Purpose:** Define the end-state interface and interaction model for the curriculum explorer.

**Scope:** Product structure, information architecture, interaction logic, visual hierarchy, and implementation boundaries.
**Non-goal:** This document does not prescribe the detailed implementation code.

---

## 1. Product Definition

The Curriculum Explorer is a **curriculum navigation workspace** for understanding, planning, and accessing the Golem Robotics Paper Club curriculum.

Its primary purpose is to help a user answer five questions quickly:

1. What is the structure of the curriculum?
2. What should be studied next?
3. Why does one topic depend on another?
4. What does a topic contain?
5. Where is the authoritative source document?

The explorer is not a generic graph sandbox and not a replacement for the Markdown curriculum. The repository Markdown remains the authoritative source of truth. The interface provides a structured, graphical navigation layer over that source.

---

## 2. Core Design Principle

### 2.1 Global graph scope

Only **topics** appear as first-class nodes in the global graph.

The global graph contains:

- 37 topic nodes;
- directed prerequisite relationships;
- optional secondary feedback or cross-link relationships;
- area grouping;
- execution status;
- readiness and next-step information.

The global graph does not contain all sessions, papers, resources, or frontier items simultaneously.

### 2.2 Local detail scope

Sessions, papers, supporting resources, and frontier items appear only in the context of a selected topic.

They are shown through structured tables, lists, and focused local views rather than global mixed-entity graphs.

### 2.3 Product hierarchy

The curriculum is the product. The graph is one navigation and reasoning tool within it.

---

## 3. Primary User Tasks

The design must optimize for the following tasks.

| Task | Target interaction |
|---|---|
| Understand the curriculum structure | Open Overview or Map |
| Identify a suitable starting topic | Open Overview or Next Steps |
| Identify prerequisites for a topic | Select topic, open Focus |
| Identify what a topic unlocks | Select topic, open Focus |
| Inspect a topic's sessions | Select topic, open Topic → Sessions |
| Inspect papers and resources | Select topic, open Topic → Papers or Resources |
| Find a paper, session, topic, or resource | Use global search |
| Open the authoritative Markdown | Use Open source document |
| Scan the complete curriculum precisely | Open Table |

---

## 4. Information Architecture

The explorer has five primary modes.

### 4.1 Overview

The Overview is the default entry state.

It provides:

- curriculum summary statistics;
- area summaries;
- recommended starting topics;
- recommended next topics;
- current execution-status distribution;
- links to Map, Table, papers, resources, and frontier watchlist.

The Overview is not a second curriculum document. It is an orientation and navigation surface.

### 4.2 Map

The Map is the main global dependency view.

It shows:

- all visible topics;
- directed prerequisite edges;
- subtle area grouping;
- topic status encoding;
- topic selection and path highlighting.

The Map uses one stable, deterministic layout.

### 4.3 Focus

The Focus view explains one selected topic in dependency context.

It shows:

- selected topic in the center;
- prerequisites to the left;
- dependents to the right;
- optional transitive paths;
- optional area context;
- unrelated topics dimmed or removed.

Focus is unavailable until a topic is selected.

### 4.4 Topic

The Topic view is the detailed workspace for a selected topic.

It contains five tabs:

1. Summary
2. Sessions
3. Papers
4. Resources
5. Related topics

The Topic view replaces global session, paper, and resource graph modes.

### 4.5 Table

The Table is the exact planning and dense-scanning view.

It contains:

- topic columns;
- session or depth rows;
- sticky headers;
- horizontal scrolling;
- status indicators;
- links to topics and source documents.

The dependency graph and topic timelines remain authoritative over the table.

---

## 5. Navigation Model

### 5.1 Primary navigation

The main navigation contains only:

- Overview
- Map
- Focus
- Topic
- Table

`Focus` and `Topic` are disabled until a topic is selected.

### 5.2 Secondary navigation

Detailed documentation remains available through a separate **Docs** action.

Docs include:

- curriculum map;
- curriculum table;
- paper index;
- supporting-material index;
- frontier watchlist;
- topic timelines;
- workflow and repository reference files.

### 5.3 Selection persistence

The selected topic persists when moving between Map, Focus, Topic, and Table.

Relevant state may be encoded in the URL so that a selected topic or sub-tab can be shared and restored.

Example:

```text
/?view=topic&topic=L6&tab=sessions
```

---

## 6. Desktop Layout

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Application bar: navigation | search | current context | utility actions    │
├───────────────┬───────────────────────────────────────┬──────────────────────┤
│ Left sidebar  │ Main workspace                        │ Context inspector    │
│               │                                       │                      │
│ Filters       │ Overview / Map / Focus / Topic /      │ Selected topic       │
│ Legend        │ Table                                 │ Recommended actions  │
│ Quick views   │                                       │ Source links         │
└───────────────┴───────────────────────────────────────┴──────────────────────┘
```

### 6.1 Application bar

The application bar contains:

- product title;
- five primary-mode controls;
- global search;
- reset or clear selection;
- fit graph where applicable;
- Docs action;
- theme control.

Zoom controls appear only in graph views.

### 6.2 Left sidebar

The left sidebar contains:

- curriculum-area filters;
- execution-status filters;
- Show ready topics only;
- Include frontier;
- graph legend;
- optional quick views.

The sidebar does not contain layout experiments or entity-type switches.

### 6.3 Main workspace

The main workspace changes according to the selected primary mode.

Only graph views use a full graph canvas.

### 6.4 Context inspector

The inspector is always useful.

With no topic selected, it shows:

- recommended starting topics;
- recommended next topics;
- a short explanation of the active mode;
- links to the curriculum map and table.

With a topic selected, it shows:

- topic ID and title;
- area;
- execution status;
- concise scope;
- prerequisite count;
- dependent count;
- session, paper, and resource counts;
- completion boundary;
- contextual actions.

---

## 7. Global Map Design

### 7.1 Layout

The default map uses a stable left-to-right prerequisite layout:

```text
Shared foundations
        →
Perception / Learning / Data / Language
        →
Synthesis / applications / specializations
```

The layout must remain stable between visits and builds unless the curriculum structure changes.

A continuously moving force-directed layout is not used.

### 7.2 Area grouping

Curriculum areas are shown as subtle horizontal swimlanes or background regions.

Area regions must not compete visually with topic nodes or dependency paths.

### 7.3 Topic nodes

Each topic node displays:

- topic ID;
- shortened topic title;
- optional readiness indicator.

Topic-node encoding:

| Attribute | Visual encoding |
|---|---|
| Curriculum area | Fill color |
| Execution status | Border style and compact badge |
| Selected topic | Strong accent outline |
| Highlighted path | Increased contrast |
| Unrelated topic | Reduced opacity |
| Completed topic, when tracking is enabled | Small completion mark |

Status must not be encoded only by color.

### 7.4 Semantic zoom

Node labels adapt to zoom level:

- distant: topic ID only;
- medium: topic ID and shortened title;
- close or selected: full readable title.

This behavior prevents unreadable dense labels without removing access to information.

### 7.5 Edges

The map uses at most two visible edge classes:

1. prerequisite → dependent;
2. secondary feedback or reciprocal relationship.

Default edges are quiet and low-contrast.

Selected paths are emphasized with:

- stronger color;
- increased width;
- clear direction arrows.

### 7.6 Map interaction

| Interaction | Result |
|---|---|
| Hover topic | Preview title, status, area, and counts |
| Click topic | Select topic and populate inspector |
| Double-click topic | Open Topic view |
| Click prerequisite/dependent action | Open Focus view |
| Click empty canvas | Preserve selection unless Clear selection is used |
| Search result | Select topic and route to relevant mode |
| Filter change | Hide incompatible nodes and refit visible graph |
| Escape | Close transient search or clear selection |

---

## 8. Focus View

Focus is the primary dependency-reasoning view.

### 8.1 Structure

```text
Prerequisites  →  Selected topic  →  Dependents
```

### 8.2 Controls

Focus exposes only:

- Direction: Upstream / Downstream / Both
- Depth: Direct / Transitive
- Show area context: On / Off

### 8.3 Visual behavior

- selected topic remains central;
- upstream and downstream directions use distinguishable highlight treatment;
- unrelated nodes are removed by default;
- reciprocal dependencies are explicitly marked;
- fit occurs only after the layout is complete.

### 8.4 Inspector behavior

The inspector shows:

- required prerequisite topics;
- related but non-blocking topics;
- topics unlocked by completion;
- completion boundary;
- Open Topic action;
- Open source document action.

---

## 9. Topic Workspace

## 9.1 Summary tab

The Summary tab shows:

- scope;
- target competence;
- execution status;
- completion boundary;
- prerequisite classification;
- concept and dependency map;
- cross-topic relationships;
- synthesis;
- frontier questions;
- unresolved gaps;
- revision notes.

Content is rendered from the authoritative topic timeline.

## 9.2 Sessions tab

Sessions are displayed as a structured table.

| Column | Content |
|---|---|
| Sequence | Session number |
| Session | ID and title |
| Stage | Foundation, lineage, reconstruction, evaluation, synthesis, etc. |
| Classification | Required Core, Advanced, Optional, Frontier |
| Prerequisites | Required concepts or prior sessions |
| Materials | Papers and supporting resources |
| Objective | Central question or understanding |
| Planned component | Reconstruction, implementation, evaluation, synthesis |
| Capability | Expected capability after completion |

The table supports:

- classification filters;
- paper/resource links;
- row highlighting from search;
- optional local completion tracking;
- direct source-document anchor links.

The default presentation is a table, not a session graph.

## 9.3 Papers tab

Papers are shown in a sortable structured table or card-list hybrid.

Required fields:

- paper ID;
- title;
- authors;
- year;
- venue;
- curriculum role;
- technical level;
- concise contribution;
- authoritative paper link;
- project or code link where available.

## 9.4 Resources tab

Resources are shown in a compact table:

- resource ID;
- title;
- type;
- assigned sessions;
- role;
- canonical link.

## 9.5 Related topics tab

Related topics are divided into:

- prerequisites;
- dependents;
- cross-area relationships;
- optional continuation;
- frontier continuation.

Each entry opens the selected topic without leaving the explorer.

---

## 10. Overview Design

The Overview contains:

### 10.1 Summary row

- 37 topics
- 400 sessions
- 193 papers
- 41 supporting resources
- frontier-item count

### 10.2 Recommended starting topics

Topics with no unmet curriculum prerequisites and high shared-core priority.

### 10.3 Recommended next topics

A ranked list based on:

- prerequisite readiness;
- curriculum status;
- educational leverage;
- continuity with completed work;
- active research priorities.

The ranking must be presented as a recommendation, not as an authoritative schedule.

### 10.4 Area cards

One card for each curriculum area:

- area name;
- topic count;
- status distribution;
- selected active topics;
- Open filtered map action.

### 10.5 Quick access

- Curriculum map
- Curriculum table
- Paper index
- Supporting materials
- Frontier watchlist

---

## 11. Search

Search behaves like a command palette.

It searches:

- topic IDs and titles;
- session IDs and titles;
- paper IDs, titles, and authors;
- resource IDs and titles;
- frontier items;
- relevant concepts where indexed.

### 11.1 Search-result routing

| Result type | Action |
|---|---|
| Topic | Select topic and open Topic Summary or Map |
| Session | Open parent Topic → Sessions and highlight row |
| Paper | Open parent Topic → Papers and highlight record |
| Resource | Open parent Topic → Resources and highlight record |
| Frontier item | Open related topic or frontier watchlist |

Search results show entity type and parent topic.

The search bar must not switch the global graph into a global paper or session graph.

---

## 12. Filters

### 12.1 Required filters

- curriculum area;
- execution status.

### 12.2 Optional filters

- ready topics only;
- currently executable topics only;
- include frontier topics;
- include deferred topics;
- completed / incomplete, when local progress tracking is enabled.

### 12.3 Filter rules

- filters change visibility, not layout meaning;
- filters are preserved between Map and Focus where sensible;
- filtering never silently alters curriculum dependencies;
- hidden prerequisite warnings are shown when a selected path depends on filtered topics.

---

## 13. Next Steps

Next Steps is a decision-support panel, not a graph entity type or primary mode.

It displays a ranked list of candidate topics.

Each recommendation includes:

- topic;
- readiness state;
- satisfied and missing prerequisites;
- execution status;
- concise reason;
- Open Topic;
- Highlight on Map.

No topic is presented as automatically required solely because of a numerical score.

---

## 14. Progress Tracking

Progress tracking is optional and local-first.

### 14.1 Supported states

- not started;
- in progress;
- completed;
- skipped or deferred locally.

### 14.2 Storage

Initial implementation may use browser local storage.

Progress state must not modify authoritative curriculum Markdown.

### 14.3 Visual treatment

Progress is secondary to curriculum status.

Do not overload topic fill color with progress. Use a small mark, ring, or badge.

---

## 15. Responsive Behavior

### 15.1 Large desktop

Three-column layout:

- filters;
- main workspace;
- inspector.

### 15.2 Laptop

- narrower collapsible filter sidebar;
- persistent inspector;
- reduced node label length;
- semantic zoom remains active.

### 15.3 Tablet

- graph or content fills main area;
- filter panel becomes a drawer;
- inspector becomes a drawer or bottom sheet.

### 15.4 Mobile

Mobile is a supported navigation view, not a full graph-analysis environment.

- Overview and Topic remain fully usable;
- Table uses horizontal scrolling;
- Map opens in fullscreen;
- filters and inspector use sheets;
- labels default to topic IDs until zoomed.

---

## 16. Visual System

### 16.1 Tone

The interface should feel:

- research-grade;
- calm;
- precise;
- information-dense;
- stable;
- non-decorative.

### 16.2 Color

- area colors are restrained and consistent;
- one accent color is used for active selection;
- status is not represented solely by color;
- unrelated nodes dim significantly during focus;
- default edges remain low contrast.

### 16.3 Typography

- topic IDs are visually prominent;
- full titles remain readable at normal zoom;
- body text prioritizes legibility over density;
- table text does not shrink below a usable size to fit more columns.

### 16.4 Background

Use a plain or extremely subtle grid.

The background must not compete with edges or labels.

### 16.5 Motion

Motion is used only for:

- view transitions;
- focus changes;
- panel transitions;
- search routing.

No continuously animated force layout or decorative motion is used.

---

## 17. Empty, Loading, and Error States

### 17.1 Empty inspector

The empty inspector shows useful orientation:

- recommended starting topics;
- recommended next topics;
- active-mode explanation;
- keyboard hint for search.

### 17.2 Loading

Loading states identify the current operation:

- loading curriculum data;
- calculating layout;
- opening topic content.

### 17.3 No search results

Show:

- query;
- clear action;
- suggestion to search topic IDs, paper titles, or authors.

### 17.4 Filtered-out selection

When filters hide a selected topic or prerequisite:

- preserve selection;
- show a warning;
- offer Show selected path.

### 17.5 Data error

Show:

- concise error;
- failed resource;
- link to the textual curriculum;
- no blank canvas.

---

## 18. Accessibility

Required:

- complete keyboard navigation;
- visible focus states;
- non-color status encoding;
- accessible graph controls;
- labelled buttons;
- sufficient contrast;
- list/table alternatives for graph information;
- reduced-motion support;
- semantic headings and landmarks.

The graph must never be the only way to access curriculum information.

---

## 19. Technical Architecture

The system remains static.

```text
Authoritative repository Markdown
        │
        ▼
MkDocs build hook
        │
        ▼
Generated normalized graph/search data
        │
        ▼
Static explorer interface
        │
        ├── Overview
        ├── Topic map
        ├── Focus
        ├── Topic workspace
        └── Table
```

No backend, database, or runtime API is required.

### 19.1 Authoritative data

The following remain authoritative:

- curriculum map;
- topic timelines;
- paper index;
- supporting-material index;
- frontier watchlist.

Generated JSON is disposable and rebuilt from Markdown.

### 19.2 Data exposed to the interface

The generated data includes:

- topics;
- topic dependencies;
- sessions;
- papers;
- resources;
- frontier items;
- area and status metadata;
- search records;
- aggregate statistics.

Precomputed positions may be used only for the stable global map.

### 19.3 URL state

The explorer should encode:

- primary view;
- selected topic;
- topic sub-tab;
- focus direction;
- direct/transitive setting;
- active search result where useful.

This makes states shareable and supports browser navigation.

---

## 20. Explicit Removals and Demotions

Remove as first-class global modes:

- global sessions graph;
- global papers graph;
- global resources graph;
- heatmap-like paper graph;
- unrestricted data-type × layout combinations;
- separate Roadmap, Areas, and Hierarchy tabs;
- experimental graph layouts exposed directly to users.

Demote to implementation details or subfeatures:

- area layout → Map grouping;
- hierarchy layout → stable Map layout;
- roadmap → Table and Next Steps;
- session graph → optional local topic visualization only if later justified;
- paper/resource graph → structured Topic tabs;
- transitive toggle → Focus control;
- next-step scoring → recommendation panel.

---

## 21. Implementation Priorities

### Phase 1 — Product correction

1. Replace current navigation with Overview, Map, Focus, Topic, Table.
2. Remove global session, paper, and resource graph modes.
3. Make the global graph topic-only.
4. Implement stable global map layout.
5. Implement useful default inspector.
6. Implement Topic Summary and Sessions table.
7. Route search results into topic context.
8. Fix layout fitting only after layout completion.

### Phase 2 — Complete topic workspace

1. Add Papers, Resources, and Related Topics tabs.
2. Add command-palette search.
3. Add URL state and browser-history support.
4. Add ready-topic and frontier filters.
5. Add Next Steps panel.

### Phase 3 — Refinement

1. Add optional progress tracking.
2. Add responsive drawers and mobile behavior.
3. Add semantic zoom refinement.
4. Add accessibility audit and keyboard graph navigation.
5. Add performance and visual regression tests.

---

## 22. Acceptance Criteria

The redesign is accepted when:

1. A new user understands the curriculum structure within 30 seconds.
2. A user identifies a reasonable next topic within 10 seconds.
3. One click reveals a topic's direct dependency context.
4. Two clicks or fewer open a topic's sessions, papers, or resources.
5. No global view displays all sessions, papers, or resources as nodes.
6. Topic labels are readable at the default desktop viewport.
7. Switching views always results in a correctly fitted layout.
8. Focus is disabled until a topic is selected.
9. Search routes every result type to the correct topic context.
10. The inspector is useful before and after selection.
11. All graph information has a structured non-graph alternative.
12. The Markdown repository remains the sole editable source of truth.

---

## 23. Final Product Statement

The final Curriculum Explorer is a structured navigation and reasoning layer over the Golem Robotics curriculum.

Its global graph explains **topics and their dependencies**.

Its Focus view explains **why one topic connects to others**.

Its Topic workspace exposes **sessions, papers, resources, and completion requirements**.

Its Table provides **precise curriculum-wide planning**.
Its Overview and Next Steps features help users **orient themselves and decide what to study next**.

The interface prioritizes clarity, stable mental models, and direct access to authoritative curriculum content over experimental graph complexity.
