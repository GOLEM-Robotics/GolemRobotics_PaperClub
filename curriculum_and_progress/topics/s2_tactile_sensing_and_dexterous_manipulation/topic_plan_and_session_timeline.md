# S2 — Tactile sensing and dexterous manipulation: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S2** |
| Area | F. Specialization branches |
| Execution status | **Specialization** |
| Covers | Optical tactile sensing, visuotactile representation, contact-state estimation, dexterous hands, and tactile-reactive policies. |
| Excludes | It excludes general haptics and hardware design not tied to perception/control learning. |
| Target competence | Understand tactile sensor physics and representations, fuse tactile/vision signals, estimate contact state, and evaluate tactile-reactive policies for dexterous tasks. |
| Curriculum role | Hardware-dependent specialization. Crosses perception, contact control, and imitation/RL. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **10** |
| Classification | Required Core: 8 · Frontier Continuation: 2 |
| Required Core endpoint | **S8** |
| Completion boundary | Complete S1–S8 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | S1, P1, F6. | Before S1 or the first dependent session |
| Topic-local foundation | Optical tactile sensing, deformation/contact images, calibration, slip/contact states, visuotactile alignment, tactile latency, hand kinematics, and dexterity metrics. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R005 | [Modern Robotics: Mechanics, Planning, and Control](https://modernrobotics.northwestern.edu/) | Open textbook/course | Kinematics, dynamics, Jacobians, control, and planning prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S5, S6, S7, S8, S10 |
| R028 | [MIT Robotic Manipulation: Perception, Planning, and Control](https://manipulation.mit.edu/) | Supporting resource | Integrated manipulation stack connecting geometry, perception, planning, contact, control, and learning. | S1, S5, S6, S7, S8, S10 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S6, S10 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S6, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | S1, P1, F6. | S1 |
| D1 | Topic-local foundation | Optical tactile sensing, deformation/contact images, calibration, slip/contact states, visuotactile alignment, tactile latency, hand kinematics, and dexterity metrics. | Required Core papers |
| D2 | Required Core paper lineage | P168 → P169 → P170 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which manipulation failures are observable and correctable only through touch? | dexterous manipulation and contact-rich E2 work |
| D7 | Frontier branch | P171 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Optical tactile sensing, deformation/contact images, calibration**<br>*Foundations and boundary confirmation* | Required Core | S1, P1, F6. | **Papers:** —<br>**Resources:** R005, R018, R019, R028, R021, R040 | Optical tactile sensing, deformation/contact images, calibration, slip/contact states, visuotactile alignment, tactile latency, hand kinematics, and dexterity metrics. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P168 — GelSight: High-Resolution Robot Tactile Sensors for Estimating Geometry and Force**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P168 — GelSight: High-Resolution Robot Tactile Sensors for Estimating Geometry and Force](https://doi.org/10.3390/s17020276)<br>**Resources:** R005, R018 | Describes optical tactile sensing that captures detailed contact geometry and force cues. | Method/evidence reconstruction; limitation: Sensor fabrication, calibration, wear, and contact mechanics are significant. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P169 — DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor with Application to In-Hand Manipulation**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P169 — DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor with Application to In-Hand Manipulation](https://arxiv.org/abs/2005.14679)<br>**Resources:** R005, R018 | Presents a compact manufacturable optical tactile sensor and manipulation demonstrations. | Method/evidence reconstruction; limitation: Optical artifacts, durability, and sensor-to-sensor variation matter. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P170 — Learning Dexterous In-Hand Manipulation**<br>*Paper lineage — Seminal; Bridge* | Required Core | S3 | **Papers:** [P170 — Learning Dexterous In-Hand Manipulation](https://arxiv.org/abs/1808.00177)<br>**Resources:** R005, R018 | Uses large-scale simulation, domain randomization, and recurrent policies for dexterous hand manipulation. | Method/evidence reconstruction; limitation: Exceptional compute, custom hardware, and sparse reproducibility. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S4 | **Papers:** P168, P169, P170<br>**Resources:** R005, R018, R019, R028 | Trace GelSight/DIGIT sensor design into visuotactile learning and tactile-based dexterous control. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S6. |
| 6 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S5; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R005, R018, R019, R028, R021, R040 | Calibrate or simulate a tactile sensor, train a contact/slip representation or policy component, and compare visual-only versus visuotactile performance. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Calibrate or simulate a tactile sensor, train a contact/slip representation or policy component, and compare visual-only versus visuotactile performance. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S7. |
| 7 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S6; F1 and D2 | **Papers:** —<br>**Resources:** R005, R018, R019, R028 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S8. |
| 8 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S7 | **Papers:** —<br>**Resources:** R005, R018, R019, R028 | Which manipulation failures are observable and correctable only through touch? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S9. |
| 9 | **P171 — T-Rex: Tactile-Reactive Dexterous Manipulation**<br>*Paper lineage — Frontier* | Frontier Continuation | S8 | **Papers:** [P171 — T-Rex: Tactile-Reactive Dexterous Manipulation](https://arxiv.org/abs/2606.17055)<br>**Resources:** R005, R018 | Uses tactile feedback for reactive dexterous manipulation under contact and perturbation. | Method/evidence reconstruction; limitation: Very recent and specialized hardware/data; independent evidence pending. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S10. |
| 10 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S8; S9 | **Papers:** P171<br>**Resources:** R005, R018, R019, R028, R021, R040 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | S1, P1, F6. |
| Closely related / cross-area | Crosses perception, contact control, and imitation/RL. |
| Outgoing capability | dexterous manipulation and contact-rich E2 work |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P168, P169, P170, P171 | Complete |
| Supporting resources | R005, R018, R019, R028, R021, R040 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which manipulation failures are observable and correctable only through touch?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to dexterous manipulation and contact-rich E2 work is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P168, P169, P170, P171. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
