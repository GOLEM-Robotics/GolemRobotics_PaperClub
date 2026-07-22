# D2 — Robot-learning benchmarks, generalization, and failure analysis: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **D2** |
| Area | D. Data, evaluation, and research systems |
| Execution status | **Shared Core** |
| Covers | Simulation and real-robot benchmarks, distribution shifts, task definitions, success measurement, robustness perturbations, and statistical comparison. |
| Excludes | It does not teach every benchmark task; it develops benchmark selection, validation, and failure-analysis competence. |
| Target competence | Design statistically defensible robot-policy evaluations across simulation and real systems, exposing task ambiguity, leakage, distribution shifts, robustness, and real-to-sim mismatch. |
| Curriculum role | Shared evaluation core. Defines evidence standards for every active track. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **15** |
| Classification | Required Core: 10 · Frontier Continuation: 5 |
| Required Core endpoint | **S10** |
| Completion boundary | Complete S1–S10 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F1; basic competence in relevant policy topic. | Before S1 or the first dependent session |
| Topic-local foundation | Task contracts, success metrics, episode sampling, train/test splits, perturbation taxonomies, real/sim correspondence, inter-rater reliability, confidence intervals, and benchmark governance. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S15 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S15 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S7, S8, S9, S10, S15 |
| R032 | [Habitat Lab Documentation](https://aihabitat.org/docs/habitat-lab/) | Supporting resource | Navigation/embodied-agent task definitions, vectorized environments, datasets, evaluation, and hierarchical-agent experiments. | S1, S7, S8, S9, S10, S15 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S8, S9, S14, S15 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S8, S9, S14, S15 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F1; basic competence in relevant policy topic. | S1 |
| D1 | Topic-local foundation | Task contracts, success metrics, episode sampling, train/test splits, perturbation taxonomies, real/sim correspondence, inter-rater reliability, confidence intervals, and benchmark governance. | Required Core papers |
| D2 | Required Core paper lineage | P123 → P124 → P125 → P126 → P127 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What does a benchmark result establish about real robot capability—and what does it leave untested? | all active and specialization tracks |
| D7 | Frontier branch | P128 → P129 → P130 → W011 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Task contracts, success metrics, episode sampling**<br>*Foundations and boundary confirmation* | Required Core | F1; basic competence in relevant policy topic. | **Papers:** —<br>**Resources:** R017, R018, R019, R032, R039, R040 | Task contracts, success metrics, episode sampling, train/test splits, perturbation taxonomies, real/sim correspondence, inter-rater reliability, confidence intervals, and benchmark governance. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P123 — RLBench: The Robot Learning Benchmark & Learning Environment**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P123 — RLBench: The Robot Learning Benchmark & Learning Environment](https://arxiv.org/abs/1909.12271)<br>**Resources:** R017, R018 | Provides a vision-rich manipulation benchmark with many tasks, demonstrations, and standardized interfaces. | Method/evidence reconstruction; limitation: Simulation realism, scripted demonstrations, and benchmark overfitting limit external validity. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P124 — CALVIN: A Benchmark for Language-Conditioned Policy Learning for Long-Horizon Robot Manipulation Tasks**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P124 — CALVIN: A Benchmark for Language-Conditioned Policy Learning for Long-Horizon Robot Manipulation Tasks](https://arxiv.org/abs/2112.03227)<br>**Resources:** R017, R018 | Evaluates language-conditioned policies on chained long-horizon manipulation tasks. | Method/evidence reconstruction; limitation: Narrow simulated tabletop domain and fixed task grammar. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P125 — LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P125 — LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning](https://arxiv.org/abs/2306.03310)<br>**Resources:** R017, R018 | Introduces suites for transfer, lifelong learning, and language-conditioned manipulation. | Method/evidence reconstruction; limitation: Simulation-only and susceptible to fixed-view/task-template overfitting. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P126 — ManiSkill2: A Unified Benchmark for Generalizable Manipulation Skills**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P126 — ManiSkill2: A Unified Benchmark for Generalizable Manipulation Skills](https://arxiv.org/abs/2302.04659)<br>**Resources:** R017, R018 | Provides diverse manipulation tasks, demonstrations, visual observations, and scalable simulation. | Method/evidence reconstruction; limitation: Benchmark breadth still cannot substitute for physical evaluation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P127 — SimplerEnv: Simulated Manipulation Policy Evaluation Environments with Real-to-Sim Transfer**<br>*Paper lineage — Modern Core; Critical* | Required Core | S5 | **Papers:** [P127 — SimplerEnv: Simulated Manipulation Policy Evaluation Environments with Real-to-Sim Transfer](https://arxiv.org/abs/2405.05941)<br>**Resources:** R017, R018 | Evaluates real-robot policies in simulation designed to preserve policy ranking and behavior. | Method/evidence reconstruction; limitation: Real-to-sim fidelity and ranking correlation remain embodiment/task dependent. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P123, P124, P125, P126, P127<br>**Resources:** R017, R018, R019, R032 | Compare RLBench, CALVIN, LIBERO, ManiSkill2, SimplerEnv, RoboArena, LIBERO-Plus, and RobotArena∞ as evaluation claims and infrastructures. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R017, R018, R019, R032, R039, R040 | Construct a benchmark audit and run a multi-seed policy comparison with uncertainty, robustness slices, failure taxonomy, and protocol sensitivity. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Construct a benchmark audit and run a multi-seed policy comparison with uncertainty, robustness slices, failure taxonomy, and protocol sensitivity. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 | **Papers:** —<br>**Resources:** R017, R018, R019, R032, R039, R040 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R017, R018, R019, R032 | What does a benchmark result establish about real robot capability—and what does it leave untested? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S11. |
| 11 | **P128 — RoboArena: A Community-Driven Real-World Benchmark for Generalist Robot Policies**<br>*Paper lineage — Frontier Bridge; Critical* | Frontier Continuation | S10 | **Papers:** [P128 — RoboArena: A Community-Driven Real-World Benchmark for Generalist Robot Policies](https://robo-arena.github.io/)<br>**Resources:** R017, R018 | Uses decentralized double-blind pairwise real-robot evaluations across diverse tasks and environments. | Method/evidence reconstruction; limitation: Community consistency, hardware comparability, and evolving protocols require careful interpretation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S12. |
| 12 | **P129 — LIBERO-Plus: A Progressive Robustness Benchmark for Vision-Language-Action Models**<br>*Paper lineage — Critical; Frontier* | Frontier Continuation | S11 | **Papers:** [P129 — LIBERO-Plus: A Progressive Robustness Benchmark for Vision-Language-Action Models](https://openaccess.thecvf.com/content/CVPR2026/html/Fei_LIBERO-Plus_A_Progressive_Robustness_Benchmark_for_Visual-Language-Action_Models_CVPR_2026_paper.html)<br>**Resources:** R017, R018 | Stress-tests VLA robustness under controlled perturbations in camera, language, initialization, appearance, and sensing. | Method/evidence reconstruction; limitation: Simulation-only and very recent; real-world correspondence remains to be established. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S13. |
| 13 | **P130 — RobotArena∞: Scalable Robot Benchmarking via Real-to-Sim Translation**<br>*Paper lineage — Frontier; Critical* | Frontier Continuation | S12 | **Papers:** [P130 — RobotArena∞: Scalable Robot Benchmarking via Real-to-Sim Translation](https://robotarenainf.github.io/)<br>**Resources:** R017, R018 | Translates real demonstrations into scalable simulated evaluation and combines automated and human judgment. | Method/evidence reconstruction; limitation: Translation fidelity and automated scoring can bias conclusions; new benchmark. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S14. |
| 14 | **Frontier — GPU simulator validity, scaling, and determinism**<br>*Frontier evidence / platform evaluation* | Frontier Continuation | S13 | **Papers:** [W011 — GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI](https://arxiv.org/abs/2607.13059)<br>**Resources:** R039, R040 | Evaluate whether GPU-parallel simulator throughput preserves physical consistency, reproducibility, and valid cross-environment comparisons. | Reproduce a small determinism and scaling audit in Isaac Lab or another GPU simulator; compare repeated runs and environment counts. | Judge whether the frontier result changes simulator selection, evaluation design, or the durable topic sequence.<br>Artifact: session record; next S15. |
| 15 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S10; S11–S14 | **Papers:** P128, P129, P130, W011<br>**Resources:** R017, R018, R039, R040, R019, R032 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F1; basic competence in relevant policy topic. |
| Closely related / cross-area | Defines evidence standards for every active track. |
| Outgoing capability | all active and specialization tracks |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P123, P124, P125, P126, P127, P128, P129, P130 | Complete |
| Supporting resources | R017, R018, R019, R032, R039, R040 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What does a benchmark result establish about real robot capability—and what does it leave untested?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to all active and specialization tracks is underspecified and should become an integration experiment?<br>• W011: GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P123, P124, P125, P126, P127, P128, P129, P130. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning |
| Frontier additions | W011 — GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI |
| Revision date | 22 July 2026 |
