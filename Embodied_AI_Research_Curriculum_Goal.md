# Goal Specification: AI, Robot Learning, and Embodied Intelligence Research Curriculum

## Mission

Create a long-term, paper-driven and experiment-centered research curriculum that develops a technically capable student organization into a team able to **independently understand, build, evaluate, and extend intelligent systems operating in the physical world**.

The objective is not merely to follow existing implementations or reproduce the current VLA ecosystem. The curriculum should develop the scientific judgment, technical depth, and systems competence required to identify meaningful research questions, test them rigorously, and produce original work in robot learning, physical AI, and embodied intelligence.

## Starting Point

The team already has a solid base in programming, robotics, classical machine learning, deep learning, generative models, and selected reinforcement-learning concepts. The curriculum should therefore avoid becoming a general introduction to AI.

It should instead close the gaps between this existing engineering knowledge and research-level competence in modern robot learning, reinforcement learning, world models, multimodal foundation models, embodied reasoning, and large-scale learning systems.

Different members do not need to become experts in every area. The shared core should establish a common technical language and research standard, after which members can specialize while remaining capable of collaborating on integrated systems.

## Target Capability

Through successive curriculum cycles, members should learn to:

- reconstruct the assumptions, mathematics, architecture, training procedure, and evidence behind important methods;
- read papers critically, distinguish demonstrated results from claims, and identify hidden dependencies on data, compute, benchmarks, and implementation choices;
- implement or reproduce representative methods, design controlled comparisons and ablations, and diagnose failure rather than only report success;
- reason across the complete embodied-intelligence stack: perception, representation, memory, reasoning, planning, learning, control, data, simulation, hardware, and safety;
- train, adapt, evaluate, compress, and deploy relevant models at a scale feasible for the organization, including small language and multimodal models when this provides genuine understanding;
- formulate original hypotheses and carry research from question selection through implementation, evaluation, interpretation, and technical communication.

## Intellectual Scope

The curriculum should build a connected understanding of six major areas:

1. **Learning foundations and model architectures** — probability, optimization, representation and sequence learning, self-supervision, generative modeling, attention and Transformers, alternative sequence architectures, and the complete training lifecycle of language and multimodal models.

2. **Robotics and physical-system foundations** — kinematics, dynamics, estimation, feedback and interaction control, planning, contact, partial observability, real-time constraints, system identification, hardware limitations, and safety. These topics should be studied to the depth needed to evaluate learned systems, not as a detached classical-robotics course.

3. **Perception, spatial intelligence, and world models** — visual, video, multimodal, and 3D representations; state estimation and mapping; spatial and temporal reasoning; memory; predictive representations; learned dynamics; uncertainty; and planning through explicit or latent models of the world.

4. **Learning to act** — learning from demonstration, imitation learning, reinforcement learning, offline and model-based learning, reward and preference learning, hierarchical and goal-conditioned methods, generative action policies, sim-to-real transfer, adaptation, and learning across tasks and embodiments.

5. **Language, multimodality, and embodied reasoning** — language-model and vision-language-model design, pretraining and post-training, grounding, tool use, planning, memory, reasoning, and the conversion of semantic intent into physically valid continuous behavior.

6. **Data, evaluation, and research systems** — robot-data collection, teleoperation, synchronization, dataset composition, synthetic and self-supervised data, distributed training, experiment tracking, reproducibility, benchmark design, generalization, robustness, uncertainty, latency, hardware-in-the-loop testing, and systematic failure analysis.

The eventual paper-level curriculum should trace the major intellectual lineages connecting these areas rather than treating them as independent subjects. Vision-language-action models and general-purpose robot policies should appear as a major synthesis point, not as the sole organizing principle.

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

## Governing Question

**What knowledge, experimental practice, and systems competence must the team develop to independently investigate and advance machines that perceive, represent, reason about, learn from, plan within, and act upon the physical world?**
