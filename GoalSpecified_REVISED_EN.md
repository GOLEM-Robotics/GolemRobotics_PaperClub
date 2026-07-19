# Goal Specification: AI, Robot Learning, and Embodied Intelligence Research Curriculum

## Purpose

Design a paper-driven and experiment-supported curriculum that enables a student research organization with an existing foundation in programming, robotics, machine learning, and modern AI to progress from **competent users of established methods** to **independent researchers capable of producing original work** in robot learning, physical AI, and embodied intelligence.

The curriculum must not be organized around one current project, robot platform, model family, or short-lived research trend. Its purpose is to build durable technical judgment while keeping the team capable of understanding and contributing to the current frontier, including vision-language-action models, multimodal reasoning, world models, and general-purpose robot policies.

## Intended Outcome

After completing the shared core and an appropriate specialization path, members should be able to:

- understand the mathematical, algorithmic, and systems assumptions behind modern AI and robotics methods;
- read research papers critically, reconstruct their key derivations, and distinguish evidence from unsupported claims;
- implement or reproduce representative methods, design ablations, and diagnose why a system succeeds or fails;
- select suitable combinations of perception, representation, reasoning, planning, learning, and control for a physical task;
- design data-collection, training, simulation, and evaluation procedures that measure genuine generalization rather than benchmark overfitting;
- train, adapt, compress, and deploy relevant language, vision-language, world-model, and action-policy components at a scale feasible for the organization;
- formulate meaningful research questions and carry an original project from hypothesis through implementation, evaluation, and technical communication.

## Competency Scope

The curriculum should develop a connected understanding of the following areas.

### 1. Research and Learning Foundations

Probability, optimization, representation learning, sequence modeling, generative modeling, decision-making under uncertainty, experimental design, statistical reasoning, reproducibility, and critical paper analysis.

Foundations should be studied to the depth required to derive, implement, compare, and modify modern methods—not merely use existing libraries.

### 2. Robotics and Physical-System Foundations

The essential substrate required to reason correctly about learned robotic systems: kinematics and dynamics, feedback and interaction control, state estimation, planning, contact, partial observability, system identification, real-time constraints, hardware limitations, and safety.

This is not intended to become a complete classical robotics curriculum. It should provide the physical and systems knowledge needed to understand where learned methods fit and where they fail.

### 3. Perception, Spatial Intelligence, and World Modeling

Visual, video, multimodal, and 3D representation learning; object- and scene-level perception; spatial and temporal reasoning; mapping and memory; predictive representations; learned dynamics; uncertainty; and planning with learned models.

The team should understand both task-specific perception pipelines and large pretrained representations, including their limitations in physical environments.

### 4. Learning to Act

Imitation learning, reinforcement learning, offline and model-based learning, goal-conditioned and hierarchical methods, generative action models, visuomotor policies, planning-policy hybrids, sim-to-real transfer, adaptation, and cross-embodiment learning.

The curriculum must teach when each paradigm is appropriate, what data and assumptions it requires, and when classical or hybrid methods are preferable to end-to-end learning.

### 5. Language, Multimodal Models, and Embodied Reasoning

Transformers and alternative sequence architectures; language-model and vision-language-model design; tokenization and representations; pretraining objectives; scaling and data mixtures; instruction tuning; preference- and reinforcement-based post-training; reasoning, tool use, memory, and agentic systems; multimodal grounding; and the connection between semantic reasoning and continuous robot action.

The objective is not to reproduce frontier-scale language-model training. Members should nevertheless understand the full training lifecycle and gain practical experience through smaller-scale pretraining, fine-tuning, distillation, parameter-efficient adaptation, evaluation, and deployment.

This area should support embodied-AI research rather than become a detached general NLP curriculum.

### 6. Data, Evaluation, Reliability, and Research Systems

Robot-data acquisition, teleoperation, synchronization, labeling, self-supervision, synthetic data, dataset composition, domain shift, contamination, benchmark design, uncertainty, robustness, failure analysis, safety, human oversight, compute efficiency, distributed training, experiment tracking, inference latency, and hardware-in-the-loop evaluation.

## Curriculum Design Principles

- Organize the material into a **shared core**, **specialization tracks**, and a continuously updated **frontier watchlist**.
- Prioritize transferable concepts and research questions over model names or popularity.
- Combine historical foundations, mature modern methods, critical or negative results, and carefully selected frontier work.
- Require more than paper summaries: important topics should produce derivations, implementations, reproductions, comparisons, or evaluation studies.
- Study both modular and end-to-end systems, with explicit analysis of interfaces, assumptions, failure modes, data requirements, compute costs, and deployment constraints.
- Treat reinforcement learning, foundation models, and VLAs as major components—not as universal solutions or the sole organizing principle.
- Select topics according to educational leverage, relevance to physical intelligence, quality of evidence, and potential to enable original research.

## Exclusions

The program should not become:

- a generic survey of all artificial intelligence;
- a catalogue of fashionable architectures;
- a VLA-only, LLM-only, or reinforcement-learning-only curriculum;
- a collection of tutorials without scientific analysis;
- a plan tied exclusively to the club’s current implementation;
- an attempt to imitate industrial-scale model training without a clear research question;
- a reading exercise that does not lead to implementation, evaluation, or original investigation.

## Governing Question

**What knowledge, research practice, and systems competence must the team develop to independently understand, build, evaluate, and extend intelligent systems that perceive, reason, learn, plan, and act in the physical world?**