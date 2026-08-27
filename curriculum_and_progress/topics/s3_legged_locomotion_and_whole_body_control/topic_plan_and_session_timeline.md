# S3 — Legged locomotion and whole-body control: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S3** |
| Area | F. Specialization branches |
| Execution status | **Specialization** |
| Covers | Policy learning for locomotion, motion imitation, terrain adaptation, privileged learning, humanoid control, and loco-manipulation. |
| Excludes | It excludes general rigid-body control already covered in F6 and sim-to-real methodology already covered in L7 except as applied to locomotion. |
| Target competence | Reconstruct locomotion and whole-body policy architectures, reward/reference design, privileged learning, terrain adaptation, and humanoid/loco-manipulation evaluation. |
| Curriculum role | Executable with simulation-first infrastructure. Whole-body and humanoid specialization. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **11** |
| Classification | Required Core: 9 · Frontier Continuation: 2 |
| Required Core endpoint | **S9** |
| Completion boundary | Complete S1–S9 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F6–F8, L2, L7. | Before S1 or the first dependent session |
| Topic-local foundation | Floating-base dynamics, contacts, gait/phase representations, reward shaping, motion imitation, terrain curricula, privileged observations, adaptation, and fall/safety metrics. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R020 | [MuJoCo Documentation](https://mujoco.readthedocs.io/) | Physics simulator documentation | Reliable dynamics/control simulation reference. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S6, S7, S8, S9, S10, S11 |
| R034 | [Drake Documentation and Tutorials](https://drake.mit.edu/tutorials/) | Supporting resource | Multibody dynamics, contact, mathematical programming, automatic differentiation, systems diagrams, and model-based verification. | S1, S6, S7, S8, S9, S11 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S6, S7, S8, S10, S11 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S6, S7, S8, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F6–F8, L2, L7. | S1 |
| D1 | Topic-local foundation | Floating-base dynamics, contacts, gait/phase representations, reward shaping, motion imitation, terrain curricula, privileged observations, adaptation, and fall/safety metrics. | Required Core papers |
| D2 | Required Core paper lineage | P172 → P173 → P174 → P175 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which capabilities require learned whole-body coordination, and which should remain model-based or reference-driven? | whole-body/humanoid E2 and L7 work |
| D7 | Frontier branch | P176 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Floating-base dynamics, contacts, gait/phase representations**<br>*Foundations and boundary confirmation* | Required Core | F6–F8, L2, L7. | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R039, R040 | Floating-base dynamics, contacts, gait/phase representations, reward shaping, motion imitation, terrain curricula, privileged observations, adaptation, and fall/safety metrics. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P172 — DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills**<br>*Paper lineage — Foundation; Modern Core* | Required Core | S1 | **Papers:** [P172 — DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills](https://doi.org/10.1145/3197517.3201311)<br>**Resources:** R006, R020 | Combines motion-imitation rewards and task objectives to learn robust physics-based skills. | Method/evidence reconstruction; limitation: Simulation characters and reward engineering; not direct robot transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P173 — Learning Quadrupedal Locomotion over Challenging Terrain**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P173 — Learning Quadrupedal Locomotion over Challenging Terrain](https://www.science.org/doi/10.1126/scirobotics.abc5986)<br>**Resources:** R006, R020 | Uses privileged learning and teacher–student training for robust rough-terrain locomotion. | Method/evidence reconstruction; limitation: Specialized platform and extensive engineering; terrain coverage remains bounded. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P174 — AMP: Adversarial Motion Priors for Stylized Physics-Based Character Control**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P174 — AMP: Adversarial Motion Priors for Stylized Physics-Based Character Control](https://doi.org/10.1145/3450626.3459670)<br>**Resources:** R006, R020 | Learns motion style priors adversarially from reference data while optimizing task objectives. | Method/evidence reconstruction; limitation: Reference data quality and adversarial training stability matter. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P175 — Walk These Ways: Tuning Robot Control for Generalization with Multiplicity of Behavior**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P175 — Walk These Ways: Tuning Robot Control for Generalization with Multiplicity of Behavior](https://arxiv.org/abs/2212.03238)<br>**Resources:** R006, R020 | Conditions locomotion policies on interpretable behavior parameters for versatile deployment. The training environment uses Isaac Gym; compare the migration path to Isaac Lab. | Method/evidence reconstruction; limitation: Limited to locomotion and specific hardware/simulation assumptions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P110, P111, P172, P173, P174, P175<br>**Resources:** R006, R020, R021, R034, R039, R040 | Trace deep locomotion, DeepMimic, ANYmal-style sim-to-real, RMA, and humanoid whole-body control. Include the Isaac Gym–Orbit–Isaac Lab framework lineage and separate platform effects from learning-method effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R039, R040 | Train a simulation locomotion or whole-body policy; perform reward, terrain, latency, and dynamics-randomization ablations and analyze failure modes. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Train a simulation locomotion or whole-body policy; perform reward, terrain, latency, and dynamics-randomization ablations and analyze failure modes. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R039, R040 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R006, R020, R021, R034 | Which capabilities require learned whole-body coordination, and which should remain model-based or reference-driven? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S10. |
| 10 | **P176 — SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control**<br>*Paper lineage — Frontier* | Frontier Continuation | S9 | **Papers:** [P176 — SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control](https://arxiv.org/abs/2511.07820)<br>**Resources:** R006, R020, R021, R039, R040 | Scales motion tracking data and models for natural humanoid whole-body control. Official training and evaluation use Isaac Lab. | Method/evidence reconstruction; limitation: Specialized hardware and large-scale motion data constrain independent reproduction; external validation remains limited. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S11. |
| 11 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S9; S10 | **Papers:** P176<br>**Resources:** R006, R020, R021, R039, R040, R034 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F6–F8, L2, L7. |
| Closely related / cross-area | Whole-body and humanoid specialization. |
| Outgoing capability | whole-body/humanoid E2 and L7 work |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P172, P173, P174, P175, P176 | Complete |
| Supporting resources | R006, R020, R021, R034, R039, R040 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which capabilities require learned whole-body coordination, and which should remain model-based or reference-driven?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to whole-body/humanoid E2 and L7 work is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P172, P173, P174, P175, P176. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-73C34CA5-6B3E-55B9-9EAD-1E42D22E7FDD` | `S3-S01` | 1 | Foundations — Floating-base dynamics, contacts, gait/phase representations |
| `SES-C54B301D-E1F3-55CD-9C52-E463C2473191` | `S3-S02` | 2 | P172 — DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills |
| `SES-5B12A093-6C0A-5094-9D03-3F1BA0DE6359` | `S3-S03` | 3 | P173 — Learning Quadrupedal Locomotion over Challenging Terrain |
| `SES-40853ED5-F1A6-5899-B45E-29AC83091B9A` | `S3-S04` | 4 | P174 — AMP: Adversarial Motion Priors for Stylized Physics-Based Character Control |
| `SES-11625150-A752-5830-8F05-3B9DC0B6B507` | `S3-S05` | 5 | P175 — Walk These Ways: Tuning Robot Control for Generalization with Multiplicity of Behavior |
| `SES-1B65D2AF-932A-533C-9D85-D54DE1D807FF` | `S3-S06` | 6 | Unified reconstruction and method comparison |
| `SES-5875A3AB-332E-5D04-AC7B-B118299C8D4A` | `S3-S07` | 7 | Controlled implementation and evaluation |
| `SES-A98A63C3-BBB1-59E8-BB77-81AFE34B56F7` | `S3-S08` | 8 | Evidence, limitations, and system interpretation |
| `SES-E083642B-239D-5A64-A014-43C07452E6A7` | `S3-S09` | 9 | Synthesis and research directions |
| `SES-D1006F0C-2A4E-562E-B0E0-256EBE325860` | `S3-S10` | 10 | P176 — SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control |
| `SES-3427CBFA-1271-5401-B13A-539E5F8E5EF4` | `S3-S11` | 11 | Frontier synthesis and promotion review |
