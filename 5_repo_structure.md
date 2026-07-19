# Repository Structure

This repository contains the principles, goals, and planning guidelines for the Golem Robotics Paper Club. As the curriculum is developed and sessions are held, their plans, notes, code, and other outputs will be organized under `curriculum_and_progress/`.

## Current files

| File | Description |
| --- | --- |
| `1_Operating_Principles.md` | Defines the club's learning model, curriculum priorities, and boundaries. It emphasizes research apprenticeship, practical evidence, and connections across physical AI rather than paper summaries alone. |
| `2_Research_Curriculum_Goal.md` | States the curriculum's mission, starting point, target capabilities, intellectual scope, and central research question. |
| `3_research_curriculum_construction_rules.md` | Specifies how the research curriculum and paper sequences should be constructed, evaluated, sourced, and presented. |
| `4_Topic_Planning_Guideline.md` | Describes how to turn a general topic into a learning cycle with foundations, outcomes, ordered sessions, a shared topic record, and a final review. |
| `Individual_Session_Guideline.md` | Defines how to prepare, run, document, and evaluate an individual study session. |
| `5_repo_structure.md` | Documents the repository's current contents and the planned organization of curriculum topics and sessions. |

## Planned `curriculum_and_progress` structure

The `curriculum_and_progress/` directory will contain the active curriculum and the club's progress records. Each topic will have its own directory, a topic-level timeline, and one directory for every individual session.

```text
curriculum_and_progress/
├── division_into_topics_description.md
├── curriculum_table.md
└── topics/
    ├── <topic_01_name>/
    │   ├── topic_plan_and_session_timeline.md
    │   ├── 01_<session_name>/
    │   │   ├── session_plan.md
    │   │   ├── session_notes.md
    │   │   ├── code/
    │   │   └── other_session_files/
    │   ├── 02_<session_name>/
    │   │   ├── session_plan.md
    │   │   ├── session_notes.md
    │   │   ├── code/
    │   │   └── other_session_files/
    │   └── ...
    ├── <topic_02_name>/
    │   ├── topic_plan_and_session_timeline.md
    │   └── ...
    └── ...
```

### Curriculum-level file

`division_into_topics_description.md` will describe:

- how the curriculum is divided into topics;
- the purpose and scope of each topic;
- dependencies and relationships between topics;
- the status of each topic, such as planned, active, completed, or deferred.

`curriculum_table.md` will describe:

- the recommended order of study;
- global curriculum table
- columns represent topics
- rows repersent sessions within each topic, the rows proceed from simplest to more advanced sessions
- the schedule proceedes from left to right changing topics every week 


### Topic directories

Each directory under `topics/` will represent one general topic. Its `topic_plan_and_session_timeline.md` will contain:

- the topic's scope and intended learning outcomes;
- required foundations and related topics;
- the ordered list of planned sessions;
- links to the corresponding session directories;
- topic-level conclusions, unresolved questions, and follow-up work.

### Session directories

Each session will have a numbered directory so that filesystem order matches the learning sequence. Every session directory should contain:

- `session_plan.md` — the session question, objective, prerequisites, assigned materials, preparation, agenda, and expected outputs;
- `session_notes.md` — concepts established during the session, evidence discussed, practical findings, limitations, unresolved questions, and next steps;
- `code/` — implementations, experiments, notebooks, scripts, configuration files, and tests created or used during the session;
- `other_session_files/` — figures, diagrams, datasets or dataset references, presentation material, experiment results, and other supporting artifacts.

Only directories needed by a session have to be created. For example, a discussion-only session may omit `code/`, while an implementation session may add `results/` or `data/` when that makes its outputs easier to navigate.

## Naming conventions

- Use lowercase `snake_case` for directories and Markdown filenames.
- Prefix session directories with two-digit sequence numbers, for example `01_transformer_foundations` and `02_attention_implementation`.
- Give every file a descriptive name; avoid ambiguous names such as `notes2.md` or `final.md`.
- Keep topic-wide information in the topic timeline and session-specific information in the relevant session directory.
- Link related topics, sessions, papers, code, and results with relative Markdown links.
- Do not commit large datasets, model weights, or generated build artifacts. Store instructions or links for obtaining them instead.

## Example

```text
curriculum_and_progress/
└── topics/
    └── reinforcement_learning_foundations/
        ├── topic_plan_and_session_timeline.md
        ├── 01_markov_decision_processes/
        │   ├── session_plan.md
        │   └── session_notes.md
        └── 02_value_based_learning/
            ├── session_plan.md
            ├── session_notes.md
            ├── code/
            │   ├── README.md
            │   └── dqn_experiment.py
            └── other_session_files/
                └── experiment_results.md
```
