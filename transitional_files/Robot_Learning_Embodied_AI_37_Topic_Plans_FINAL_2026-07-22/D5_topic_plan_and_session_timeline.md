# D5 — Synthetic data, learned simulators, and scalable data engines: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **D5** |
| Area | D. Data, evaluation, and research systems |
| Execution status | **Specialization** |
| Covers | Procedural generation, imitation-data generation, world-model rollouts, video generation, learned physics, and synthetic-to-real validation. |
| Excludes | It excludes synthetic data used only for visual novelty without a validated downstream learning or evaluation purpose. |
| Target competence | Design procedural and learned data engines; evaluate coverage, bias, controllability, sim-to-real transfer, and whether synthetic rollouts improve policies or benchmarks. |
| Curriculum role | Specialized scaling and data-generation branch. Feeds E2 and specialization tracks. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **12** |
| Classification | Required Core: 7 · Frontier Continuation: 5 |
| Required Core endpoint | **S7** |
| Completion boundary | Complete S1–S7 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | P3–P5, L7, D1. | Before S1 or the first dependent session |
| Topic-local foundation | Procedural generation, scene/task distributions, synthetic labels, simulator fidelity, learned simulators, rollout filtering, domain gap, and coverage metrics. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S12 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R024 | [Robot Learning from Randomized Simulations: A Review](https://arxiv.org/abs/2111.00956) | Survey | Structured overview of domain randomization assumptions, methods, and limitations. | S1, S4, S5, S6, S7, S12 |
| R026 | [A Survey on Model-Based Reinforcement Learning](https://arxiv.org/abs/2006.16712) | Survey | Taxonomy of learned models, planning, uncertainty, and policy learning. | S1, S4, S5, S6, S7, S12 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S4, S5, S6, S11, S12 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S4, S5, S6, S11, S12 |
| R041 | [Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments](https://arxiv.org/abs/2301.04195) | Framework paper / implementation lineage | Predecessor lineage to Isaac Lab; modular Isaac Sim environments, manipulation tasks, sensor/action abstractions, demonstration generation, and GPU-parallel learning. | S1, S4, S5, S6, S11, S12 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | P3–P5, L7, D1. | S1 |
| D1 | Topic-local foundation | Procedural generation, scene/task distributions, synthetic labels, simulator fidelity, learned simulators, rollout filtering, domain gap, and coverage metrics. | Required Core papers |
| D2 | Required Core paper lineage | P139 → P141 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | When does synthetic scale create capability, and when does it amplify simulator or generator bias? | P5, E2–E3, S5 |
| D7 | Frontier branch | P140 → P142 → P143 → W011 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Procedural generation, scene/task distributions, synthetic labels**<br>*Foundations and boundary confirmation* | Required Core | P3–P5, L7, D1. | **Papers:** —<br>**Resources:** R019, R021, R024, R026, R039, R040, R041 | Procedural generation, scene/task distributions, synthetic labels, simulator fidelity, learned simulators, rollout filtering, domain gap, and coverage metrics. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P139 — MimicGen: A Data Generation System for Scalable Robot Learning using Human Demonstrations**<br>*Paper lineage — Modern Core* | Required Core | S1 | **Papers:** [P139 — MimicGen: A Data Generation System for Scalable Robot Learning using Human Demonstrations](https://arxiv.org/abs/2310.17596)<br>**Resources:** R019, R021 | Generates diverse task demonstrations by transforming and recomposing a small set of human demonstrations in simulation. | Method/evidence reconstruction; limitation: Requires object-centric state and simulator access; sim-to-real validity must be tested. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P141 — GenSim: Generating Robotic Simulation Tasks via Large Language Models**<br>*Paper lineage — Bridge* | Required Core | S2 | **Papers:** [P141 — GenSim: Generating Robotic Simulation Tasks via Large Language Models](https://arxiv.org/abs/2310.01361)<br>**Resources:** R019, R021 | Generates task code and simulation assets with LLMs and self-refinement. | Method/evidence reconstruction; limitation: Code generation errors and simulator-task validity require human verification. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S3 | **Papers:** P139, P141<br>**Resources:** R019, R021, R024, R026, R039, R040, R041 | Compare procedural generation, scalable simulators, learned world models, and data-engine approaches by controllability, cost, fidelity, and validation. Include the Isaac Gym–Orbit–Isaac Lab framework lineage and separate platform effects from learning-method effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S5. |
| 5 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S4; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R019, R021, R024, R026, R039, R040, R041 | Generate a controlled synthetic dataset or simulator curriculum, train a downstream model, and measure transfer against real/held-out data with ablations. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Generate a controlled synthetic dataset or simulator curriculum, train a downstream model, and measure transfer against real/held-out data with ablations. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S6. |
| 6 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S5; F1 and D2 | **Papers:** —<br>**Resources:** R019, R021, R024, R026, R039, R040, R041 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S7. |
| 7 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S6 | **Papers:** —<br>**Resources:** R019, R021, R024, R026 | When does synthetic scale create capability, and when does it amplify simulator or generator bias? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S8. |
| 8 | **P140 — RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning via Generative Simulation**<br>*Paper lineage — Bridge; Frontier* | Frontier Continuation | S7 | **Papers:** [P140 — RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning via Generative Simulation](https://arxiv.org/abs/2311.01455)<br>**Resources:** R019, R021 | Uses generative models and LLMs to propose tasks, assets, environments, and training procedures in simulation. | Method/evidence reconstruction; limitation: Generated tasks/rewards can be invalid or biased; physical transfer is limited. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S9. |
| 9 | **P142 — DreamGen: Unlocking Generalization in Robot Learning through Video World Models**<br>*Paper lineage — Frontier Bridge* | Frontier Continuation | S8 | **Papers:** [P142 — DreamGen: Unlocking Generalization in Robot Learning through Video World Models](https://arxiv.org/abs/2505.12705)<br>**Resources:** R019, R021 | Uses video world models to generate diverse synthetic robot trajectories for policy training. | Method/evidence reconstruction; limitation: Synthetic action/physics fidelity and closed-loop benefit require independent validation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S10. |
| 10 | **P143 — DreamDojo: A Generalist Robot World Model from Large-Scale Human Videos**<br>*Paper lineage — Frontier* | Frontier Continuation | S9 | **Papers:** [P143 — DreamDojo: A Generalist Robot World Model from Large-Scale Human Videos](https://dreamdojo-world.github.io/)<br>**Resources:** R019, R021 | Trains a generalist robot world model from large-scale human video for prediction, evaluation, and planning. | Method/evidence reconstruction; limitation: Very recent; compute, data, and evaluation independence require scrutiny. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S11. |
| 11 | **Frontier — GPU simulator validity, scaling, and determinism**<br>*Frontier evidence / platform evaluation* | Frontier Continuation | S10 | **Papers:** [W011 — GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI](https://arxiv.org/abs/2607.13059)<br>**Resources:** R021, R039, R040, R041 | Evaluate whether GPU-parallel simulator throughput preserves physical consistency, reproducibility, and valid cross-environment comparisons. | Reproduce a small determinism and scaling audit in Isaac Lab or another GPU simulator; compare repeated runs and environment counts. | Judge whether the frontier result changes simulator selection, evaluation design, or the durable topic sequence.<br>Artifact: session record; next S12. |
| 12 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S7; S8–S11 | **Papers:** P140, P142, P143, W011<br>**Resources:** R019, R021, R039, R040, R041, R024, R026 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | P3–P5, L7, D1. |
| Closely related / cross-area | Feeds E2 and specialization tracks. |
| Outgoing capability | P5, E2–E3, S5 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P139, P141, P140, P142, P143 | Complete |
| Supporting resources | R019, R021, R024, R026, R039, R040, R041 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **When does synthetic scale create capability, and when does it amplify simulator or generator bias?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P5, E2–E3, S5 is underspecified and should become an integration experiment?<br>• W011: GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P139, P141, P140, P142, P143. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning; R041 — Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments |
| Frontier additions | W011 — GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI |
| Revision date | 22 July 2026 |
