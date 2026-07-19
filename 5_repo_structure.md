# Repository Structure

This repository contains the principles, goals, and planning guidelines for the Golem Robotics Paper Club. As the curriculum is developed and sessions are held, curriculum maps, topic plans, session records, papers, code, experiments, integration projects, and other outputs will be organized under `curriculum_and_progress/`.

## Current files

| File | Description |
| --- | --- |
| `1_operating_principles.md` | Defines the club's learning model, curriculum priorities, boundaries, and overall workflow. It emphasizes research apprenticeship, practical evidence, and connections across physical AI rather than paper summaries alone. |
| `2_research_curriculum_goal.md` | States the curriculum's mission, team-level starting point, target capabilities, intellectual scope, and central research question. |
| `3_research_curriculum_construction_rules.md` | Specifies how the research curriculum, topic hierarchy, paper sequences, supporting materials, dependencies, prioritization, and paper assessments should be constructed and verified. |
| `4_topic_planning_guideline.md` | Describes how to turn an approved topic into a dependency-aware learning cycle with foundations, outcomes, ordered potential sessions, completion boundaries, and a final review. |
| `5_repo_structure.md` | Documents the repository's current contents and the planned organization of curriculum topics, sessions, frontier tracking, and integration projects. |

Individual sessions are prepared on a per-session basis. There is no mandatory repository-wide guideline prescribing how every meeting must be prepared or conducted.

## Planned `curriculum_and_progress` structure

The `curriculum_and_progress/` directory contains the active curriculum and the club's progress records. Each topic has its own directory, a topic-level timeline, and a directory for each session that is actually prepared or conducted.

```text
curriculum_and_progress/
├── curriculum_map.md
├── curriculum_table.md
├── paper_index.md
├── supporting_materials_index.md
├── frontier_watchlist.md
├── topics/
│   ├── <topic_01_name>/
│   │   ├── topic_plan_and_session_timeline.md
│   │   ├── 01_<session_name>/
│   │   │   ├── session_plan.md
│   │   │   ├── session_notes.md
│   │   │   ├── code/
│   │   │   └── other_session_files/
│   │   ├── 02_<session_name>/
│   │   │   ├── session_plan.md
│   │   │   ├── session_notes.md
│   │   │   ├── code/
│   │   │   └── other_session_files/
│   │   └── ...
│   ├── <topic_02_name>/
│   │   ├── topic_plan_and_session_timeline.md
│   │   └── ...
│   └── ...
└── integration_projects/
    └── <project_name>/
        ├── project_plan.md
        ├── linked_topics.md
        ├── experiments/
        └── conclusions.md
```

## Curriculum-level files

### `curriculum_map.md`

`curriculum_map.md` is the authoritative curriculum-wide description. It contains:

- the hierarchy of areas, subareas, and topics;
- the purpose and scope of each topic;
- dependencies and relationships between topics;
- the global topic-dependency map;
- the execution status of each topic, such as Shared Core, Active Research Track, Specialization, Optional, Frontier Watchlist, or Deferred;
- links to topic-specific timelines;
- material revision notes when topic planning or completed sessions reveal a justified change.

### `curriculum_table.md`

`curriculum_table.md` is a global planning and visualization artifact:

- columns represent topics;
- cells contain successive sessions or depth stages within each topic;
- upper cells contain foundations and early-entry material;
- lower cells progress toward advanced, expert, and frontier work;
- entries link to the relevant topic timelines and session directories;
- the table may include planned, ready, completed, blocked, deferred, or skipped status.

The table supports interleaved execution, but it is not an authoritative dependency model or a fixed weekly schedule. Actual session selection is performed on a per-session basis. The dependency map and topic timelines take precedence.

### `paper_index.md`

`paper_index.md` contains the verified paper inventory. Each paper appears once under its primary topic and may be cross-referenced from other topics.

### `supporting_materials_index.md`

`supporting_materials_index.md` contains textbook chapters, lecture notes, surveys, technical reports, documentation, and other non-primary material used to establish foundations or support reconstruction.

### `frontier_watchlist.md`

`frontier_watchlist.md` contains papers, projects, and emerging directions that may affect the curriculum but are not yet integrated into the durable core. Each entry should include:

- title or project name;
- date added;
- related topic;
- reason it may matter;
- maturity or evidence status;
- review date;
- decision: monitor, integrate, reject, or defer.

## Topic directories

Each directory under `topics/` represents one general topic. Its `topic_plan_and_session_timeline.md` contains:

- the topic's scope and intended learning outcomes;
- its execution status and required completion boundary;
- required foundations and related topics;
- the topic dependency map;
- the ordered list of potential sessions;
- the classification of sessions as required core, advanced continuation, optional specialization, or frontier continuation;
- links to corresponding session directories after those sessions are created;
- topic-level conclusions, unresolved questions, revision notes, and follow-up work.

## Session directories

A session directory is created when the session is selected for preparation or execution. Numbered directories keep filesystem order aligned with the topic sequence.

A session directory may contain:

- `session_plan.md` — the session question, objective, prerequisites, assigned materials, preparation decisions, expected outputs, and any planned practical component;
- `session_notes.md` — concepts established during the session, evidence discussed, practical findings, limitations, unresolved questions, and next steps;
- `code/` — implementations, experiments, notebooks, scripts, configuration files, and tests created or used during the session;
- `other_session_files/` — figures, diagrams, dataset references, presentation material, experiment results, and other supporting artifacts.

Only files and directories needed by a session have to be created. For example, a discussion-only session may omit `code/`, while an implementation session may add `results/` or `data/` when that makes its outputs easier to navigate.

The exact preparation and conduct of an individual session are decided separately for that session. The repository structure defines where its artifacts are stored, not a universal meeting procedure.

## Integration projects

Each directory under `integration_projects/` represents a project that combines knowledge from multiple topics.

A project directory should contain, when applicable:

- `project_plan.md` — the research question, scope, expected evidence, resources, and completion criteria;
- `linked_topics.md` — the topic knowledge and session outputs used by the project;
- `experiments/` — code, configurations, logs, evaluations, and reproducible experiment instructions;
- `conclusions.md` — results, limitations, unresolved questions, and curriculum implications.

## Naming conventions

- Use lowercase `snake_case` for directories and Markdown filenames.
- Prefix the five repository reference and production-guideline files with their workflow order.
- Prefix session directories with two-digit sequence numbers, for example `01_transformer_foundations` and `02_attention_implementation`.
- Give every file a descriptive name; avoid ambiguous names such as `notes2.md` or `final.md`.
- Keep curriculum-wide information in curriculum-level files, topic-wide information in the topic timeline, and session-specific information in the relevant session directory.
- Link related topics, sessions, papers, code, results, and projects with relative Markdown links.
- Do not commit large datasets, model weights, or generated build artifacts. Store instructions, manifests, checksums, or links for obtaining them instead.
- Record material curriculum revisions with a short reason and date.

## Example

```text
curriculum_and_progress/
├── curriculum_map.md
├── curriculum_table.md
├── paper_index.md
├── supporting_materials_index.md
├── frontier_watchlist.md
├── topics/
│   └── reinforcement_learning_foundations/
│       ├── topic_plan_and_session_timeline.md
│       ├── 01_markov_decision_processes/
│       │   ├── session_plan.md
│       │   └── session_notes.md
│       └── 02_value_based_learning/
│           ├── session_plan.md
│           ├── session_notes.md
│           ├── code/
│           │   ├── README.md
│           │   └── dqn_experiment.py
│           └── other_session_files/
│               └── experiment_results.md
└── integration_projects/
    └── sim_to_real_policy_evaluation/
        ├── project_plan.md
        ├── linked_topics.md
        ├── experiments/
        └── conclusions.md
```
