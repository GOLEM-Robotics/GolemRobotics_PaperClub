# Operating Principles and Curriculum Workflow

## Learning Model

The curriculum is a research apprenticeship, not a reading list. Important themes should progress through a recurring sequence:

**paper lineage → mathematical and architectural reconstruction → implementation or reproduction → controlled evaluation → system-level interpretation → original extension**

Paper selection should combine:

- foundational and historically decisive work;
- mature modern methods;
- critical, negative, or limitation-revealing results;
- a small, continuously updated set of frontier papers.

Members should produce evidence: derivations, implementations, ablations, benchmark audits, failure studies, or research prototypes. A presentation that only summarizes a paper is insufficient for the most important topics.

## Curriculum Structure and Priorities

The program should contain:

- a **shared core** covering the concepts and research practices needed by everyone;
- **specialization paths** for deeper work in areas such as robot learning, reinforcement learning, perception and world models, multimodal reasoning, or research systems;
- a **frontier watchlist** that can change as the field changes without destabilizing the durable core;
- recurring **integration projects** where knowledge from multiple areas is tested in simulation or on physical systems.

Topics should be prioritized by their educational leverage, relevance to physical intelligence, strength of scientific evidence, and ability to enable original research. Reinforcement learning, language and multimodal models, world models, and VLAs are all major components, but none should be treated as a universal solution.

## Boundaries

The curriculum should not become:

- a generic survey of all AI;
- a catalogue of fashionable architectures or papers;
- a VLA-only, LLM-only, or reinforcement-learning-only program;
- a set of tutorials focused on library usage;
- a plan tied to one current robot, dataset, or project;
- an attempt to imitate frontier-scale model training without a research purpose;
- a paper club disconnected from implementation, evaluation, and original investigation.

## How the Repository Files Form a Workflow

The Markdown files in the repository have two different roles:

- **reference files** define goals, constraints, or organization rules; consulting them does not directly create a new artifact;
- **production guidelines** transform approved inputs into curriculum, topic, or session artifacts when their instructions are applied.

The main flow is:

```text
Operating principles + curriculum goal
                  ↓
Curriculum construction rules
                  ↓
Curriculum divided into ordered topics and paper lineages
                  ↓
Topic planning guideline (repeated for every topic)
                  ↓
Topic plan and session timeline


```

`5_Repo_Structure.md` applies throughout this flow. It determines where outputs are stored and how they are named, but it does not determine their research content.

### File-by-file inputs and outputs

| File | Description | Required before using it | Result after using it | Direct output? |
| --- | --- | --- | --- | --- |
| `1_Operating_Principles.md` | Defines the learning model, curriculum priorities, and boundaries that every curriculum decision must respect. | Starting point | Understanding of general concept and workflow | No |
| `2_Research_Curriculum_Goal.md` | Defines the mission, team starting point, target capabilities, intellectual scope, and governing question. | None | A shared interpretation of what the curriculum must achieve. The goal constrains later work but does not itself create a new artifact. | No |
| `3_research_curriculum_construction_rules.md` | Defines how to divide the research scope into areas, topics, dependencies, paper lineages, and an ordered learning progression. It also specifies paper metadata, quality assessment, verification, and final presentation requirements. | `1_Operating_Principles.md`; `2_Research_Curriculum_Goal.md`; the literature-search cutoff date; verified papers and metadata; known team, time, compute, hardware, and access constraints. | The master curriculum: an ordered hierarchy of areas and topics, topic relationships and prerequisites, paper sequences, a dependency map, and a paper index. Its top-level description is stored in `curriculum_and_progress/division_into_topics_description.md`, with topic-specific details linked from it as the curriculum grows. | Yes |
| `4_Topic_Planning_Guideline.md` | Converts one approved curriculum topic into a bounded learning cycle made of ordered sessions. | The selected topic and its place in the master curriculum; its paper sequence; prerequisites and related topics; available time, members, tools, compute, and hardware. | A topic directory, `topic_plan_and_session_timeline.md`, `curriculum_table.md` containing scope, outcomes, foundations, concept order, session sequence, links, and topic-level progress. This record is updated after each session and reviewed when the topic concludes. | Yes |
| `5_Repo_Structure.md` | Defines the directory hierarchy, artifact locations, and naming conventions for curriculum, topics, and sessions. | Any curriculum artifact that is about to be created, named, linked, or stored. | The artifact is placed in the correct directory with a consistent name and links. This file produces no curriculum or session content by itself. | No |
