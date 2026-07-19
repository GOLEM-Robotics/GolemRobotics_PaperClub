# Operating Principles and Curriculum Workflow

## Learning Model

The curriculum is a research apprenticeship, not a reading list. Important themes should progress through a recurring sequence:

**foundations → intellectual and paper lineage → mathematical or architectural reconstruction → implementation or reproduction where useful → controlled evaluation or evidence analysis → system-level interpretation → synthesis and original research directions**

Paper selection should combine:

- foundational and historically decisive work;
- mature modern methods;
- critical, negative, replication, or limitation-revealing results;
- a small, continuously updated set of frontier papers.

Members should produce evidence: derivations, implementations, ablations, benchmark audits, failure studies, research prototypes, or equivalent analytical outputs. A presentation that only summarizes a paper is insufficient for the most important topics.

## Curriculum Structure and Priorities

The program should contain:

- a **shared core** covering the concepts and research practices needed by everyone;
- **specialization paths** for deeper work in areas such as robot learning, reinforcement learning, perception and world models, multimodal reasoning, or research systems;
- a **frontier watchlist** that can change as the field changes without destabilizing the durable core;
- recurring **integration projects** where knowledge from multiple areas is tested in simulation, on physical systems, or through a common research question.

Topics should be prioritized by their educational leverage, relevance to physical intelligence, strength of scientific evidence, feasibility for the organization, and ability to enable original research. Reinforcement learning, language and multimodal models, world models, and vision-language-action systems are all major components, but none should be treated as a universal solution.

The complete curriculum map may be broader than the material currently scheduled for execution. The executable curriculum should identify what is active, deferred, optional, or reserved for specialization.

## Boundaries

The curriculum should not become:

- a generic survey of all AI;
- a catalogue of fashionable architectures or papers;
- a VLA-only, LLM-only, or reinforcement-learning-only program;
- a set of tutorials focused on library usage;
- a plan tied to one current robot, dataset, or project;
- an attempt to imitate frontier-scale model training without a research purpose;
- a paper club disconnected from implementation, evaluation, evidence analysis, and original investigation;
- a rigid schedule that overrides conceptual prerequisites, continuity, or practical constraints.

## How the Repository Files Form a Workflow

The Markdown files in the repository have two different roles:

- **reference files** define goals, constraints, or organization rules; consulting them does not directly create a new artifact;
- **production guidelines** transform approved inputs into curriculum or topic artifacts when their instructions are applied.

The main flow is iterative:

```text
Operating principles + curriculum goal
                 ↓
Research curriculum construction rules
                 ↓
Master curriculum map, paper inventory, and dependency structure
                 ↓
Topic planning guideline, repeated for every approved topic
                 ↓
Topic plan and session timeline
                 ↓
Session execution, evidence, and topic review
                 ├── update the topic timeline
                 ├── update paper selection or status
                 └── propose a justified correction to the master curriculum
```

`5_repo_structure.md` applies throughout this flow. It determines where outputs are stored and how they are named, but it does not determine their research content.

### File-by-file inputs and outputs

| File | Description | Required before using it | Result after using it | Direct output? |
| --- | --- | --- | --- | --- |
| `1_operating_principles.md` | Defines the learning model, curriculum priorities, boundaries, and overall workflow that every curriculum decision must respect. | Starting point | Shared interpretation of how the club learns, evaluates work, and develops the curriculum. | No |
| `2_research_curriculum_goal.md` | Defines the mission, team starting point, target capabilities, intellectual scope, and governing question. | Starting point | Shared interpretation of what the curriculum must achieve. The goal constrains later work but does not itself create a new artifact. | No |
| `3_research_curriculum_construction_rules.md` | Defines how to divide the research scope into areas, topics, dependencies, paper lineages, and an ordered learning progression. It also specifies paper metadata, assessment, verification, and final presentation requirements. | `1_operating_principles.md`; `2_research_curriculum_goal.md`; the literature-search cutoff date; access to authoritative literature sources; known team, time, compute, hardware, and access constraints. | The master curriculum: a hierarchy of areas and topics, topic relationships and prerequisites, paper sequences, a dependency map, a paper index, supporting-material references, prioritization status, and frontier candidates. | Yes |
| `4_topic_planning_guideline.md` | Converts one approved curriculum topic into a bounded, dependency-aware learning cycle made of ordered potential sessions. | The selected topic and its place in the master curriculum; its paper sequence; prerequisites and related topics; available time, members, tools, compute, and hardware. | A topic directory and `topic_plan_and_session_timeline.md`. The relevant entries in `curriculum_table.md` may be added or updated, but the topic file remains the detailed source of truth. | Yes |
| `5_repo_structure.md` | Defines the directory hierarchy, artifact locations, and naming conventions for curriculum, topics, sessions, frontier tracking, and integration projects. | Any curriculum artifact that is about to be created, named, linked, or stored. | The artifact is placed in the correct directory with a consistent name and links. This file produces no curriculum or session content by itself. | No |
