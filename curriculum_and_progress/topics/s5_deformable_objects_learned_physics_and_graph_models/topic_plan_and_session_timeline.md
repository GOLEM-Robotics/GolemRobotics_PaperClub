# S5 — Deformable objects, learned physics, and graph models: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S5** |
| Area | F. Specialization branches |
| Execution status | **Optional** |
| Covers | Object-centric relational models, graph-network simulators, cloth/rope manipulation, differentiable simulation, and material uncertainty. |
| Excludes | It excludes rigid-body manipulation and generic graph learning not grounded in physical interaction. |
| Target competence | Represent and predict relational/deformable dynamics, manipulate cloth/rope/materials, and reason about model uncertainty and differentiable/learned simulation. |
| Curriculum role | Optional advanced branch. Links learned physics to difficult manipulation. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **10** |
| Classification | Required Core: 8 · Optional Specialization: 2 |
| Required Core endpoint | **S8** |
| Completion boundary | Complete S1–S8 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F3–F4, F6, P3–P5. | Before S1 or the first dependent session |
| Topic-local foundation | Graphs and message passing, particle/mesh representations, material parameters, contact/topology, partial observability, learned simulators, and deformable-task metrics. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S6, S7, S8, S9, S10 |
| R026 | [A Survey on Model-Based Reinforcement Learning](https://arxiv.org/abs/2006.16712) | Survey | Taxonomy of learned models, planning, uncertainty, and policy learning. | S1, S6, S7, S8, S9, S10 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S6, S9, S10 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S6, S9, S10 |
| R041 | [Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments](https://arxiv.org/abs/2301.04195) | Framework paper / implementation lineage | Predecessor lineage to Isaac Lab; modular Isaac Sim environments, manipulation tasks, sensor/action abstractions, demonstration generation, and GPU-parallel learning. | S1, S6, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F3–F4, F6, P3–P5. | S1 |
| D1 | Topic-local foundation | Graphs and message passing, particle/mesh representations, material parameters, contact/topology, partial observability, learned simulators, and deformable-task metrics. | Required Core papers |
| D2 | Required Core paper lineage | P181 → P182 → P183 → P184 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which physical structure must be explicit for learned models of deformable objects to generalize? | P5, D5, S1 |
| D6 | Optional branch | optional practical continuation | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Graphs and message passing, particle/mesh representations, material parameters**<br>*Foundations and boundary confirmation* | Required Core | F3–F4, F6, P3–P5. | **Papers:** —<br>**Resources:** R006, R019, R021, R026, R039, R040, R041 | Graphs and message passing, particle/mesh representations, material parameters, contact/topology, partial observability, learned simulators, and deformable-task metrics. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P181 — Interaction Networks for Learning about Objects, Relations and Physics**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P181 — Interaction Networks for Learning about Objects, Relations and Physics](https://arxiv.org/abs/1612.00222)<br>**Resources:** R006, R019 | Introduces object–relation message passing for learned physical reasoning. | Method/evidence reconstruction; limitation: Requires object decomposition and struggles with perception from raw observations. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P182 — Learning to Simulate Complex Physics with Graph Networks**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P182 — Learning to Simulate Complex Physics with Graph Networks](https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html)<br>**Resources:** R006, R019 | Learns particle-based simulators with message-passing graph networks across complex materials. | Method/evidence reconstruction; limitation: Long-rollout error accumulation and particle representation costs remain. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P183 — SoftGym: Benchmarking Deep Reinforcement Learning for Deformable Object Manipulation**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P183 — SoftGym: Benchmarking Deep Reinforcement Learning for Deformable Object Manipulation](https://arxiv.org/abs/2011.07215)<br>**Resources:** R006, R019 | Provides simulation tasks and benchmarks for cloth, rope, and fluid manipulation. | Method/evidence reconstruction; limitation: Simulation fidelity and benchmark task design limit real transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P184 — DiffTaichi: Differentiable Programming for Physical Simulation**<br>*Paper lineage — Bridge to S7* | Required Core | S4 | **Papers:** [P184 — DiffTaichi: Differentiable Programming for Physical Simulation](https://arxiv.org/abs/1910.00935)<br>**Resources:** R006, R019 | Presents differentiable high-performance physical simulation for gradient-based control and design. | Method/evidence reconstruction; limitation: Differentiability and numerical stability do not eliminate model mismatch; specialized implementation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P181, P182, P183, P184<br>**Resources:** R006, R019, R021, R026, R039, R040, R041 | Connect interaction networks/graph simulators to deformable-object planning and learning without demonstrations. Include the Isaac Gym–Orbit–Isaac Lab framework lineage and separate platform effects from learning-method effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S6; F1 and D2 | **Papers:** —<br>**Resources:** R006, R019, R021, R026 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S8. |
| 8 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S7 | **Papers:** —<br>**Resources:** R006, R019, R021, R026 | Which physical structure must be explicit for learned models of deformable objects to generalize? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Optional Specialization | S8 | **Papers:** —<br>**Resources:** R006, R019, R021, R026, R039, R040, R041 | Train a graph dynamics model or reproduce a simple deformable manipulation task; test rollout horizon, topology/material shift, and planning utility. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Train a graph dynamics model or reproduce a simple deformable manipulation task; test rollout horizon, topology/material shift, and planning utility. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S8; S9 | **Papers:** —<br>**Resources:** R006, R019, R021, R026, R039, R040, R041 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F3–F4, F6, P3–P5. |
| Closely related / cross-area | Links learned physics to difficult manipulation. |
| Outgoing capability | P5, D5, S1 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P181, P182, P183, P184 | Complete |
| Supporting resources | R006, R019, R021, R026, R039, R040, R041 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which physical structure must be explicit for learned models of deformable objects to generalize?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P5, D5, S1 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P181, P182, P183, P184. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning; R041 — Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
