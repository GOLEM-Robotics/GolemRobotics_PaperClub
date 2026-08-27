# F6 — Robot mechanics, dynamics, and interaction control: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F6** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Kinematics, rigid-body dynamics, operational-space control, force/impedance/admittance control, redundancy, and contact interaction. |
| Excludes | It does not replace a complete mechanics/control degree sequence and excludes high-level planning covered in F7. |
| Target competence | Model robot kinematics/dynamics and contact interactions sufficiently to derive and evaluate task-space, force, impedance, admittance, redundancy, and safety-filter behavior. |
| Curriculum role | Classical foundation needed to judge learned controllers. Constrains every physical-policy topic; links to S1–S3 and L7–L8. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **9** |
| Classification | Required Core: 9 |
| Required Core endpoint | **S9** |
| Completion boundary | Complete S1–S9. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Prior knowledge | Linear algebra, differential equations, basic control. | Before S1 |
| Topic-local foundation | Frames, twists, Jacobians, mass matrix, Coriolis/gravity terms, task-space dynamics, passivity, contact/friction, and feedback stability. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R005 | [Modern Robotics: Mechanics, Planning, and Control](https://modernrobotics.org) | Open textbook/course | Kinematics, dynamics, Jacobians, control, and planning prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R020 | [MuJoCo Documentation](https://mujoco.readthedocs.io/) | Physics simulator documentation | Reliable dynamics/control simulation reference. | S1, S6, S7, S8, S9 |
| R028 | [MIT Robotic Manipulation: Perception, Planning, and Control](https://manipulation.mit.edu/) | Supporting resource | Integrated manipulation stack connecting geometry, perception, planning, contact, control, and learning. | S1, S6, S7, S8, S9 |
| R030 | [ROS 2 Real-Time Programming Documentation](https://docs.ros.org/en/lyrical/Tutorials/Demos/Real-Time-Programming.html) | Supporting resource | Deadline, jitter, memory-allocation, scheduling, and execution-path constraints for physical robot deployment. | S1, S6, S7, S8, S9 |
| R034 | [Drake Documentation and Tutorials](https://drake.mit.edu/tutorials/) | Supporting resource | Multibody dynamics, contact, mathematical programming, automatic differentiation, systems diagrams, and model-based verification. | S1, S6, S7, S8, S9 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | Linear algebra, differential equations, basic control. | S1 |
| D1 | Topic-local foundation | Frames, twists, Jacobians, mass matrix, Coriolis/gravity terms, task-space dynamics, passivity, contact/friction, and feedback stability. | Required Core papers |
| D2 | Required Core paper lineage | P028 → P029 → P030 → P031 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What must a learned policy output, and what should remain in a structured low-level controller? | F7–F8, L7–L8, S1–S3, S7 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Frames, twists, Jacobians**<br>*Foundations and boundary confirmation* | Required Core | Linear algebra, differential equations, basic control. | **Papers:** —<br>**Resources:** R005, R006, R020, R028, R030, R034 | Frames, twists, Jacobians, mass matrix, Coriolis/gravity terms, task-space dynamics, passivity, contact/friction, and feedback stability. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P028 — Impedance Control: An Approach to Manipulation, Part I—Theory**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P028 — Impedance Control: An Approach to Manipulation, Part I—Theory](https://doi.org/10.1115/1.3140702)<br>**Resources:** R005, R006 | Frames manipulation as regulation of the dynamic force–motion relationship rather than pure position tracking. | Method/evidence reconstruction; limitation: Idealized assumptions; practical implementations require sensing, passivity, and actuator analysis. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P029 — A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation**<br>*Paper lineage — Seminal* | Required Core | S2 | **Papers:** [P029 — A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation](https://doi.org/10.1109/JRA.1987.1087068)<br>**Resources:** R005, R006 | Establishes operational-space dynamics and dynamically consistent task control. | Method/evidence reconstruction; limitation: Model accuracy and torque control are demanding; constraints/contact extensions require later work. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P030 — Dynamic Movement Primitives: A Framework for Motor Control in Humans and Humanoid Robotics**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P030 — Dynamic Movement Primitives: A Framework for Motor Control in Humans and Humanoid Robotics](https://doi.org/10.1007/4-431-31381-8_23)<br>**Resources:** R005, R006 | Introduces stable attractor-based motion primitives modulated by learned forcing terms. | Method/evidence reconstruction; limitation: Limited multimodality and perception coupling; not a general policy architecture. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P031 — Control Barrier Function Based Quadratic Programs for Safety Critical Systems**<br>*Paper lineage — Modern Core; Bridge* | Required Core | S4 | **Papers:** [P031 — Control Barrier Function Based Quadratic Programs for Safety Critical Systems](https://doi.org/10.1109/TAC.2016.2638961)<br>**Resources:** R005, R006 | Combines control Lyapunov and barrier functions in online quadratic programs for safety constraints. | Method/evidence reconstruction; limitation: Requires valid dynamics and barrier construction; feasibility and model mismatch are critical. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P028, P029, P030, P031<br>**Resources:** R005, R006, R020, R028, R030, R034 | Derive operational-space and impedance-control equations, including null-space and constraint interactions. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R005, R006, R020, R028, R030, R034 | Implement and compare joint-space, operational-space, impedance, and barrier-filtered control in simulation with latency/model-error perturbations. | Implement and compare joint-space, operational-space, impedance, and barrier-filtered control in simulation with latency/model-error perturbations. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R005, R006, R020, R028, R030, R034 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R005, R006, R020, R028, R030, R034 | What must a learned policy output, and what should remain in a structured low-level controller? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | Linear algebra, differential equations, basic control. |
| Closely related / cross-area | Constrains every physical-policy topic; links to S1–S3 and L7–L8. |
| Outgoing capability | F7–F8, L7–L8, S1–S3, S7 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P028, P029, P030, P031 | Complete |
| Supporting resources | R005, R006, R020, R028, R030, R034 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What must a learned policy output, and what should remain in a structured low-level controller?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to F7–F8, L7–L8, S1–S3, S7 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P028, P029, P030, P031. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-5D4F7DCF-2B88-52BA-A966-7DBC3C9226C8` | `F6-S01` | 1 | Foundations — Frames, twists, Jacobians |
| `SES-A8928F83-A9DA-53F7-9437-CF7E0BF1F73C` | `F6-S02` | 2 | P028 — Impedance Control: An Approach to Manipulation, Part I—Theory |
| `SES-048B7686-0CA0-599E-B80B-B4D1ED7A1BDB` | `F6-S03` | 3 | P029 — A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation |
| `SES-AFB564E5-9384-56BD-BD0F-330F22671128` | `F6-S04` | 4 | P030 — Dynamic Movement Primitives: A Framework for Motor Control in Humans and Humanoid Robotics |
| `SES-556717D9-0AB4-58E6-A109-77893E18DF41` | `F6-S05` | 5 | P031 — Control Barrier Function Based Quadratic Programs for Safety Critical Systems |
| `SES-F1AB6DF7-1131-5041-BF68-364E2D2125BE` | `F6-S06` | 6 | Unified reconstruction and method comparison |
| `SES-620BE85F-B05B-59CD-B8E7-BD7842DF4A32` | `F6-S07` | 7 | Controlled implementation and evaluation |
| `SES-DFEB82CC-0673-5E53-B5D4-9EFCD6589CDB` | `F6-S08` | 8 | Evidence, limitations, and system interpretation |
| `SES-C6AE4597-A70B-5320-902A-90D5637F3D25` | `F6-S09` | 9 | Synthesis and research directions |
