# L7 — Sim-to-real transfer, system identification, and adaptation: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L7** |
| Area | C. Learning to act |
| Execution status | **Active Research Track** |
| Covers | Domain and dynamics randomization, simulator calibration, privileged learning, online adaptation, latency and actuator modeling, and robustness. |
| Excludes | It excludes generic robustness augmentation without a physical-parameter or deployment hypothesis. |
| Target competence | Model the reality gap, design domain/dynamics randomization and simulator adaptation, use privileged information correctly, and evaluate rapid adaptation under physical mismatch. |
| Curriculum role | Required for physical-system competence. Connects simulation, physical deployment, locomotion, and manipulation. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **12** |
| Classification | Required Core: 10 · Frontier Continuation: 2 |
| Required Core endpoint | **S10** |
| Completion boundary | Complete S1–S10 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F6–F8, L1–L2. | Before S1 or the first dependent session |
| Topic-local foundation | Parameter distributions, system identification, observability of dynamics, privileged learning, dynamics encoders, actuator/sensor latency, contact uncertainty, and robust evaluation. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S12 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S12 |
| R020 | [MuJoCo Documentation](https://mujoco.readthedocs.io/) | Physics simulator documentation | Reliable dynamics/control simulation reference. | S1, S7, S8, S9, S10, S12 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S7, S8, S9, S10, S11, S12 |
| R024 | [Robot Learning from Randomized Simulations: A Review](https://arxiv.org/abs/2111.00956) | Survey | Structured overview of domain randomization assumptions, methods, and limitations. | S1, S7, S8, S9, S10, S12 |
| R030 | [ROS 2 Real-Time Programming Documentation](https://docs.ros.org/en/kilted/Tutorials/Demos/Real-Time-Programming.html) | Supporting resource | Deadline, jitter, memory-allocation, scheduling, and execution-path constraints for physical robot deployment. | S1, S7, S8, S9, S10, S12 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S7, S8, S9, S11, S12 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S7, S8, S9, S11, S12 |
| R041 | [Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments](https://arxiv.org/abs/2301.04195) | Framework paper / implementation lineage | Predecessor lineage to Isaac Lab; modular Isaac Sim environments, manipulation tasks, sensor/action abstractions, demonstration generation, and GPU-parallel learning. | S1, S7, S8, S9, S11, S12 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F6–F8, L1–L2. | S1 |
| D1 | Topic-local foundation | Parameter distributions, system identification, observability of dynamics, privileged learning, dynamics encoders, actuator/sensor latency, contact uncertainty, and robust evaluation. | Required Core papers |
| D2 | Required Core paper lineage | P107 → P108 → P109 → P110 → P111 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which uncertainties should be randomized, identified, adapted online, or handled by feedback control? | D5, S1, S3 |
| D7 | Frontier branch | W011 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Parameter distributions, system identification, observability of dynamics**<br>*Foundations and boundary confirmation* | Required Core | F6–F8, L1–L2. | **Papers:** —<br>**Resources:** R006, R019, R020, R021, R024, R030, R039, R040, R041 | Parameter distributions, system identification, observability of dynamics, privileged learning, dynamics encoders, actuator/sensor latency, contact uncertainty, and robust evaluation. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P107 — Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World**<br>*Paper lineage — Seminal* | Required Core | S1 | **Papers:** [P107 — Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World](https://arxiv.org/abs/1703.06907)<br>**Resources:** R006, R019 | Shows visual randomization can make real images appear as one variation of simulation. | Method/evidence reconstruction; limitation: Manual randomization ranges and unrealistic variation can hurt transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P108 — Sim-to-Real Transfer of Robotic Control with Dynamics Randomization**<br>*Paper lineage — Seminal; Bridge* | Required Core | S2 | **Papers:** [P108 — Sim-to-Real Transfer of Robotic Control with Dynamics Randomization](https://arxiv.org/abs/1710.06537)<br>**Resources:** R006, R019 | Randomizes physical parameters during training to transfer control policies. | Method/evidence reconstruction; limitation: Coverage of real dynamics and actuator/latency modeling is critical. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P109 — SimOpt: Learning to Adapt Simulators to Real-World Conditions**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P109 — SimOpt: Learning to Adapt Simulators to Real-World Conditions](https://arxiv.org/abs/1810.05687)<br>**Resources:** R006, R019 | Updates simulator-parameter distributions from real trajectories to improve transfer. | Method/evidence reconstruction; limitation: Requires informative real rollouts and chosen simulator parameterization. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P110 — Learning Agile and Dynamic Motor Skills for Legged Robots**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P110 — Learning Agile and Dynamic Motor Skills for Legged Robots](https://www.science.org/doi/10.1126/scirobotics.aau5872)<br>**Resources:** R006, R019 | Combines massively parallel simulation, dynamics randomization, and learned actuator modeling for quadruped transfer. | Method/evidence reconstruction; limitation: Specialized hardware and extensive engineering obscure individual contributions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P111 — RMA: Rapid Motor Adaptation for Legged Robots**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P111 — RMA: Rapid Motor Adaptation for Legged Robots](https://arxiv.org/abs/2107.04034)<br>**Resources:** R006, R019 | Uses privileged training and an online adaptation module to infer environmental dynamics. | Method/evidence reconstruction; limitation: Primarily locomotion; adaptation identifiability and safety under novelty remain open. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P107, P108, P109, P110, P111<br>**Resources:** R006, R019, R020, R021, R024, R030, R039, R040, R041 | Trace visual randomization, dynamics randomization, SimOpt, agile locomotion, and RMA as increasingly adaptive sim-to-real strategies. Include the Isaac Gym–Orbit–Isaac Lab framework lineage and separate platform effects from learning-method effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R006, R019, R020, R021, R024, R030, R039, R040, R041 | Build a simulation-to-real or simulation-to-held-out-dynamics study with parameter calibration, randomization ablations, latency/noise models, and adaptation tests. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Build a simulation-to-real or simulation-to-held-out-dynamics study with parameter calibration, randomization ablations, latency/noise models, and adaptation tests. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R006, R019, R020, R021, R024, R030, R039, R040, R041 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R006, R019, R020, R021, R024, R030 | Which uncertainties should be randomized, identified, adapted online, or handled by feedback control? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S11. |
| 11 | **Frontier — GPU simulator validity, scaling, and determinism**<br>*Frontier evidence / platform evaluation* | Frontier Continuation | S10 | **Papers:** [W011 — GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI](https://arxiv.org/abs/2607.13059)<br>**Resources:** R021, R039, R040, R041 | Evaluate whether GPU-parallel simulator throughput preserves physical consistency, reproducibility, and valid cross-environment comparisons. | Reproduce a small determinism and scaling audit in Isaac Lab or another GPU simulator; compare repeated runs and environment counts. | Judge whether the frontier result changes simulator selection, evaluation design, or the durable topic sequence.<br>Artifact: session record; next S12. |
| 12 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S10; S11 | **Papers:** W011<br>**Resources:** R021, R039, R040, R041, R006, R019, R020, R024, R030 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F6–F8, L1–L2. |
| Closely related / cross-area | Connects simulation, physical deployment, locomotion, and manipulation. |
| Outgoing capability | D5, S1, S3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P107, P108, P109, P110, P111 | Complete |
| Supporting resources | R006, R019, R020, R021, R024, R030, R039, R040, R041 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which uncertainties should be randomized, identified, adapted online, or handled by feedback control?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D5, S1, S3 is underspecified and should become an integration experiment?<br>• W011: GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P107, P108, P109, P110, P111. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning; R041 — Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments |
| Frontier additions | W011 — GPUSimBench: Towards Scalable and Reliable GPU-Accelerated Simulators in Embodied AI |
| Revision date | 22 July 2026 |
