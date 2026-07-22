# S1 — Manipulation, grasping, contact, and bimanual control: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S1** |
| Area | F. Specialization branches |
| Execution status | **Specialization** |
| Covers | Grasp synthesis, spatial action structure, contact-rich insertion, semantic manipulation, bimanual coordination, and mobile manipulation. |
| Excludes | It excludes tactile-specialized methods (S2) and generic VLA scaling unless directly relevant to manipulation mechanics. |
| Target competence | Integrate grasping, spatial action representations, contact-rich execution, semantic manipulation, bimanual coordination, and mobile manipulation on a concrete platform. |
| Curriculum role | Executable when tied to a robot platform. Primary manipulation specialization. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **11** |
| Classification | Required Core: 9 · Optional Specialization: 2 |
| Required Core endpoint | **S9** |
| Completion boundary | Complete S1–S9 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F6–F8, P2–P3, L3, L6. | Before S1 or the first dependent session |
| Topic-local foundation | Grasp geometry and stability, SE(3) actions, contact/friction, insertion tolerances, visual servoing, bimanual constraints, demonstrations, and task success metrics. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R005 | [Modern Robotics: Mechanics, Planning, and Control](https://modernrobotics.northwestern.edu/) | Open textbook/course | Kinematics, dynamics, Jacobians, control, and planning prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S6, S7, S8, S9, S11 |
| R020 | [MuJoCo Documentation](https://mujoco.readthedocs.io/) | Physics simulator documentation | Reliable dynamics/control simulation reference. | S1, S6, S7, S8, S9, S11 |
| R028 | [MIT Robotic Manipulation: Perception, Planning, and Control](https://manipulation.mit.edu/) | Supporting resource | Integrated manipulation stack connecting geometry, perception, planning, contact, control, and learning. | S1, S6, S7, S8, S9, S11 |
| R034 | [Drake Documentation and Tutorials](https://drake.mit.edu/tutorials/) | Supporting resource | Multibody dynamics, contact, mathematical programming, automatic differentiation, systems diagrams, and model-based verification. | S1, S6, S7, S8, S9, S11 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S6, S7, S11 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S6, S7, S11 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S6, S7, S11 |
| R041 | [Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments](https://arxiv.org/abs/2301.04195) | Framework paper / implementation lineage | Predecessor lineage to Isaac Lab; modular Isaac Sim environments, manipulation tasks, sensor/action abstractions, demonstration generation, and GPU-parallel learning. | S1, S6, S7, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F6–F8, P2–P3, L3, L6. | S1 |
| D1 | Topic-local foundation | Grasp geometry and stability, SE(3) actions, contact/friction, insertion tolerances, visual servoing, bimanual constraints, demonstrations, and task success metrics. | Required Core papers |
| D2 | Required Core paper lineage | P163 → P164 → P165 → P166 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | How should manipulation systems combine semantic intent, geometric precision, contact feedback, and coordinated control? | S2 and platform-specific E2/D1 work |
| D6 | Optional branch | P167 | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Grasp geometry and stability, SE(3) actions, contact/friction**<br>*Foundations and boundary confirmation* | Required Core | F6–F8, P2–P3, L3, L6. | **Papers:** —<br>**Resources:** R005, R018, R019, R020, R028, R034, R021, R039, R040, R041 | Grasp geometry and stability, SE(3) actions, contact/friction, insertion tolerances, visual servoing, bimanual constraints, demonstrations, and task success metrics. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P163 — Dex-Net 2.0: Deep Learning to Plan Robust Grasps with Synthetic Point Clouds and Analytic Grasp Metrics**<br>*Paper lineage — Foundation; Modern Core* | Required Core | S1 | **Papers:** [P163 — Dex-Net 2.0: Deep Learning to Plan Robust Grasps with Synthetic Point Clouds and Analytic Grasp Metrics](https://arxiv.org/abs/1703.09312)<br>**Resources:** R005, R018 | Combines analytic grasp metrics, synthetic depth data, and deep grasp scoring. | Method/evidence reconstruction; limitation: Relies on simplified gripper/contact models and object assumptions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P164 — Transporter Networks: Rearranging the Visual World for Robotic Manipulation**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P164 — Transporter Networks: Rearranging the Visual World for Robotic Manipulation](https://arxiv.org/abs/2010.14406)<br>**Resources:** R005, R018 | Models pick-and-place as spatial feature transport with strong translational equivariance. | Method/evidence reconstruction; limitation: Best suited to top-down planar manipulation and discrete pick/place actions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P165 — CLIPort: What and Where Pathways for Robotic Manipulation**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P165 — CLIPort: What and Where Pathways for Robotic Manipulation](https://arxiv.org/abs/2109.12098)<br>**Resources:** R005, R018 | Combines CLIP semantic features with Transporter spatial features for language-conditioned manipulation. | Method/evidence reconstruction; limitation: Primarily planar simulated tasks; inherited CLIP grounding limitations. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P166 — Perceiver-Actor: A Multi-Task Transformer for Robotic Manipulation**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P166 — Perceiver-Actor: A Multi-Task Transformer for Robotic Manipulation](https://arxiv.org/abs/2209.05451)<br>**Resources:** R005, R018 | Uses voxelized 3D observations and a Perceiver policy for language-conditioned 6-DoF actions. | Method/evidence reconstruction; limitation: Voxel resolution and compute cost; simulation-centric evidence. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P163, P164, P165, P166<br>**Resources:** R005, R018, R019, R020, R028, R034, R021, R039, R040, R041 | Connect Dex-Net, Transporter Networks, CLIPort, PerAct, and Mobile ALOHA as successive representations of manipulation action and data. Include the Isaac Gym–Orbit–Isaac Lab framework lineage and separate platform effects from learning-method effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R005, R018, R019, R020, R028, R034, R021, R039, R040, R041 | Implement/reproduce one grasping or language-conditioned manipulation baseline and one contact/bimanual task; evaluate geometry, semantics, precision, and failure recovery. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Implement/reproduce one grasping or language-conditioned manipulation baseline and one contact/bimanual task; evaluate geometry, semantics, precision, and failure recovery. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R005, R018, R019, R020, R028, R034 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R005, R018, R019, R020, R028, R034 | How should manipulation systems combine semantic intent, geometric precision, contact feedback, and coordinated control? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S10. |
| 10 | **P167 — Learning to Manipulate Deformable Objects without Demonstrations**<br>*Paper lineage — Optional Specialization; Critical* | Optional Specialization | S9 | **Papers:** [P167 — Learning to Manipulate Deformable Objects without Demonstrations](https://arxiv.org/abs/1910.13439)<br>**Resources:** R005, R018 | Uses a structured conditional pick–place action space and visual RL to learn cloth and rope manipulation without demonstrations, including sim-to-real transfer. | Method/evidence reconstruction; limitation: Narrow action structure and tasks; learned picking baselines were not uniformly superior, making the failure analysis important. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S11. |
| 11 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S9; S10 | **Papers:** P167<br>**Resources:** R005, R018, R019, R020, R028, R034, R021, R039, R040, R041 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F6–F8, P2–P3, L3, L6. |
| Closely related / cross-area | Primary manipulation specialization. |
| Outgoing capability | S2 and platform-specific E2/D1 work |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P163, P164, P165, P166, P167 | Complete |
| Supporting resources | R005, R018, R019, R020, R028, R034, R021, R039, R040, R041 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **How should manipulation systems combine semantic intent, geometric precision, contact feedback, and coordinated control?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to S2 and platform-specific E2/D1 work is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P163, P164, P165, P166, P167. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning; R041 — Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
