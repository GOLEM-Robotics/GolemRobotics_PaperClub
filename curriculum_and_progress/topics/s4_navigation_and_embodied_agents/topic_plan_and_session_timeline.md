# S4 — Navigation and embodied agents: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S4** |
| Area | F. Specialization branches |
| Execution status | **Optional** |
| Covers | Visual navigation, mapping policies, vision-and-language navigation, embodied question answering, and hierarchical mobile manipulation. |
| Excludes | It excludes autonomous driving and full SLAM engineering; the focus is embodied-agent learning and language-conditioned navigation. |
| Target competence | Understand visual navigation, mapping policies, VLN, embodied QA, and hierarchical mobile manipulation; evaluate generalization and map/memory dependence. |
| Curriculum role | Optional unless mobile embodied agents become active. Complements manipulation-centric work. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **12** |
| Classification | Required Core: 8 · Optional Specialization: 2 · Frontier Continuation: 2 |
| Required Core endpoint | **S8** |
| Completion boundary | Complete S1–S8 for Required Core. Continue through Optional Specialization and Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F8, P1–P4, E1. | Before S1 or the first dependent session |
| Topic-local foundation | Navigation task definitions, egocentric observations, mapping/memory, exploration, language grounding, geodesic metrics, partial observability, and hierarchical control. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R008 | [Probabilistic Robotics](https://mitpress.mit.edu/9780262201629/probabilistic-robotics/) | Textbook | Bayesian filtering, localization, mapping, and SLAM foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S12 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S12 |
| R032 | [Habitat Lab Documentation](https://aihabitat.org/docs/habitat-lab/) | Supporting resource | Navigation/embodied-agent task definitions, vectorized environments, datasets, evaluation, and hierarchical-agent experiments. | S1, S6, S7, S8, S9, S10, S12 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S7, S9, S10, S11, S12 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S7, S9, S10, S11, S12 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S7, S9, S10, S11, S12 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F8, P1–P4, E1. | S1 |
| D1 | Topic-local foundation | Navigation task definitions, egocentric observations, mapping/memory, exploration, language grounding, geodesic metrics, partial observability, and hierarchical control. | Required Core papers |
| D2 | Required Core paper lineage | P177 → P178 → P179 → P180 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What internal spatial representation and memory are necessary for long-horizon embodied navigation? | mobile manipulation, E1–E3 |
| D6 | Optional branch | optional practical continuation | Activation decision |
| D7 | Frontier branch | W012 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Navigation task definitions, egocentric observations, mapping/memory**<br>*Foundations and boundary confirmation* | Required Core | F8, P1–P4, E1. | **Papers:** —<br>**Resources:** R008, R019, R032, R021, R039, R040 | Navigation task definitions, egocentric observations, mapping/memory, exploration, language grounding, geodesic metrics, partial observability, and hierarchical control. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P177 — Cognitive Mapping and Planning for Visual Navigation**<br>*Paper lineage — Foundation; Bridge* | Required Core | S1 | **Papers:** [P177 — Cognitive Mapping and Planning for Visual Navigation](https://arxiv.org/abs/1702.03920)<br>**Resources:** R008, R019 | Learns spatial maps and planning policies from visual observations. | Method/evidence reconstruction; limitation: Simulation/domain assumptions and supervised map structure. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P178 — Habitat: A Platform for Embodied AI Research**<br>*Paper lineage — Foundation* | Required Core | S2 | **Papers:** [P178 — Habitat: A Platform for Embodied AI Research](https://arxiv.org/abs/1904.01201)<br>**Resources:** R008, R019 | Introduces a high-throughput photorealistic simulation platform for embodied navigation. | Method/evidence reconstruction; limitation: Static scanned environments and simulator bias limit transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P179 — Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments**<br>*Paper lineage — Seminal* | Required Core | S3 | **Papers:** [P179 — Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments](https://arxiv.org/abs/1711.07280)<br>**Resources:** R008, R019 | Introduces the Room-to-Room benchmark for instruction-following navigation in scanned environments. | Method/evidence reconstruction; limitation: Discrete graph navigation, dataset biases, and limited physical interaction. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P180 — Active Neural SLAM**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P180 — Active Neural SLAM](https://arxiv.org/abs/2004.05155)<br>**Resources:** R008, R019 | Combines learned perception/exploration with explicit mapping and planning for navigation. | Method/evidence reconstruction; limitation: Simulation-heavy and dependent on map/action abstractions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P177, P178, P179, P180<br>**Resources:** R008, R019, R032 | Compare PointNav/Habitat-style navigation, neural mapping, VLN, embodied QA, and mobile manipulation as increasing semantic and action complexity. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S6; F1 and D2 | **Papers:** —<br>**Resources:** R008, R019, R032, R021, R039, R040 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S8. |
| 8 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S7 | **Papers:** —<br>**Resources:** R008, R019, R032 | What internal spatial representation and memory are necessary for long-horizon embodied navigation? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Optional Specialization | S8 | **Papers:** —<br>**Resources:** R008, R019, R032, R021, R039, R040 | Train/evaluate a navigation or VLN baseline in Habitat; test map/memory ablations, environment shift, language variation, and failure recovery. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Train/evaluate a navigation or VLN baseline in Habitat; test map/memory ablations, environment shift, language variation, and failure recovery. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S8; S9 | **Papers:** —<br>**Resources:** R008, R019, R032, R021, R039, R040 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; next S11. |
| 11 | **Frontier — Isaac-Lab human-aware navigation benchmarks**<br>*Frontier evidence / platform evaluation* | Frontier Continuation | S8 | **Papers:** [W012 — NavIsaacLab: Generating Realistic Crowd via Parallel Robot Learning for Benchmarking Human-aware Navigation](https://arxiv.org/abs/2606.26265)<br>**Resources:** R021, R039, R040 | Assess whether physics-based, photorealistic crowd simulation improves human-aware navigation training and evaluation validity. | Compare one navigation policy under rule-based and data-driven crowd simulation; audit transfer and safety metrics. | Judge whether the frontier result changes simulator selection, evaluation design, or the durable topic sequence.<br>Artifact: session record; next S12. |
| 12 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S8; S11 | **Papers:** W012<br>**Resources:** R021, R039, R040, R008, R019, R032 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F8, P1–P4, E1. |
| Closely related / cross-area | Complements manipulation-centric work. |
| Outgoing capability | mobile manipulation, E1–E3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P177, P178, P179, P180 | Complete |
| Supporting resources | R008, R019, R032, R021, R039, R040 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What internal spatial representation and memory are necessary for long-horizon embodied navigation?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to mobile manipulation, E1–E3 is underspecified and should become an integration experiment?<br>• W012: NavIsaacLab: Generating Realistic Crowd via Parallel Robot Learning for Benchmarking Human-aware Navigation |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P177, P178, P179, P180. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning |
| Frontier additions | W012 — NavIsaacLab: Generating Realistic Crowd via Parallel Robot Learning for Benchmarking Human-aware Navigation |
| Revision date | 22 July 2026 |
