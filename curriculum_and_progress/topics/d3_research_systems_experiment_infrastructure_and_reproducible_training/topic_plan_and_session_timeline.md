# D3 — Research systems, experiment infrastructure, and reproducible training: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **D3** |
| Area | D. Data, evaluation, and research systems |
| Execution status | **Active Research Track** |
| Covers | Configuration and provenance, distributed training, checkpointing, deterministic evaluation, artifact tracking, hardware-aware profiling, and recovery. |
| Excludes | It excludes generic MLOps product engineering unrelated to scientific reproducibility or robot-learning scale. |
| Target competence | Build recoverable, observable, configuration-driven research systems with distributed training, artifact/data provenance, deterministic evaluation, and hardware-aware profiling. |
| Curriculum role | Systems competence track. Supports all implementation and reproduction work. |
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
| Other topic timelines | F1–F5. | Before S1 or the first dependent session |
| Topic-local foundation | Configuration immutability, provenance, environment capture, experiment DAGs, checkpoint semantics, distributed parallelism, failure recovery, profiling, and evaluation isolation. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R015 | [Full Stack Deep Learning](https://fullstackdeeplearning.com/) | Course | Experiment management, deployment, testing, data, and production ML systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R016 | [Machine Learning Systems](https://mlsysbook.ai/) | Open textbook | Hardware-aware training and inference support; use current online version. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S6, S7, S8, S9 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S6, S7, S8, S9 |
| R027 | [Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) | Supporting resource | End-to-end reconstruction of tokenization, Transformer training, systems optimization, scaling, data preparation, evaluation, and post-training. | S1, S6, S7, S8, S9 |
| R029 | [CleanRL Documentation and Reference Implementations](https://docs.cleanrl.dev/) | Supporting resource | Code-level reconstruction, implementation-difference audits, seeded baselines, and reproducibility checks. | S1, S6, S7, S8, S9 |
| R033 | [PyTorch Distributed and Distributed Checkpoint Documentation](https://docs.pytorch.org/tutorials/distributed.html) | Supporting resource | DDP/FSDP/tensor parallelism, distributed checkpointing, recovery, profiling, and topology-aware training experiments. | S1, S6, S7, S8, S9 |
| R038 | [CORL: Clean Offline Reinforcement Learning](https://corl-team.github.io/CORL/) | Supporting resource | Auditable CQL/IQL/Decision Transformer/offline-to-online baselines with published benchmark configurations and logs. | S1, S6, S7, S8, S9 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S6, S7 |
| R040 | [Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning](https://arxiv.org/abs/2511.04831) | Framework paper / technical reference | Architecture and design reference for GPU-parallel physics, sensors, actuator models, domain randomization, demonstration collection, reinforcement learning, and imitation learning. | S1, S6, S7 |
| R041 | [Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments](https://arxiv.org/abs/2301.04195) | Framework paper / implementation lineage | Predecessor lineage to Isaac Lab; modular Isaac Sim environments, manipulation tasks, sensor/action abstractions, demonstration generation, and GPU-parallel learning. | S1, S6, S7 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F1–F5. | S1 |
| D1 | Topic-local foundation | Configuration immutability, provenance, environment capture, experiment DAGs, checkpoint semantics, distributed parallelism, failure recovery, profiling, and evaluation isolation. | Required Core papers |
| D2 | Required Core paper lineage | P131 → P132 → P133 → P134 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which infrastructure guarantees are prerequisites for believing and extending the club’s experiments? | all implementation/reproduction tracks |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Configuration immutability, provenance, environment capture**<br>*Foundations and boundary confirmation* | Required Core | F1–F5. | **Papers:** —<br>**Resources:** R015, R016, R017, R021, R027, R029, R033, R038, R039, R040, R041 | Configuration immutability, provenance, environment capture, experiment DAGs, checkpoint semantics, distributed parallelism, failure recovery, profiling, and evaluation isolation. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P131 — Hidden Technical Debt in Machine Learning Systems**<br>*Paper lineage — Entry Point; Critical* | Required Core | S1 | **Papers:** [P131 — Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems)<br>**Resources:** R015, R016 | Catalogs data, dependency, configuration, feedback-loop, and monitoring debt in deployed ML systems. | Method/evidence reconstruction; limitation: Conceptual/experience paper rather than controlled experimental evidence. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P132 — ZeRO: Memory Optimizations Toward Training Trillion Parameter Models**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P132 — ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)<br>**Resources:** R015, R016 | Partitions optimizer, gradient, and parameter states across devices for memory-efficient distributed training. | Method/evidence reconstruction; limitation: Communication and framework complexity; model scale may exceed club needs. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P133 — Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P133 — Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism](https://arxiv.org/abs/1909.08053)<br>**Resources:** R015, R016 | Demonstrates tensor model parallelism for large Transformer training. | Method/evidence reconstruction; limitation: Proprietary-scale assumptions and rapidly evolving implementations. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P134 — SERL: A Software Suite for Sample-Efficient Robotic Reinforcement Learning**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P134 — SERL: A Software Suite for Sample-Efficient Robotic Reinforcement Learning](https://arxiv.org/abs/2401.16013)<br>**Resources:** R015, R016 | Packages asynchronous data collection, replay, resets, demonstrations, and actor–learner infrastructure for real-robot RL. | Method/evidence reconstruction; limitation: Hardware/task integration still requires substantial engineering; not a general benchmark. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P131, P132, P133, P134<br>**Resources:** R015, R016, R017, R021, R027, R029, R033, R038, R039, R040, R041 | Relate ML technical debt, ZeRO, Megatron-LM, and SERL to the requirements of small-team robot-learning research. Include the Isaac Gym–Orbit–Isaac Lab framework lineage and separate platform effects from learning-method effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R015, R016, R017, R021, R027, R029, R033, R038, R039, R040, R041 | Create a reference experiment stack with config validation, seeds, artifact tracking, distributed/checkpoint tests, interruption recovery, and reproducibility reports. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Create a reference experiment stack with config validation, seeds, artifact tracking, distributed/checkpoint tests, interruption recovery, and reproducibility reports. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R015, R016, R017, R021, R027, R029, R033, R038 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R015, R016, R017, R021, R027, R029, R033, R038 | Which infrastructure guarantees are prerequisites for believing and extending the club’s experiments? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F1–F5. |
| Closely related / cross-area | Supports all implementation and reproduction work. |
| Outgoing capability | all implementation/reproduction tracks |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P131, P132, P133, P134 | Complete |
| Supporting resources | R015, R016, R017, R021, R027, R029, R033, R038, R039, R040, R041 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which infrastructure guarantees are prerequisites for believing and extending the club’s experiments?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to all implementation/reproduction tracks is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P131, P132, P133, P134. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation; R040 — Isaac Lab: A GPU-Accelerated Simulation Framework for Multi-Modal Robot Learning; R041 — Orbit: A Unified Simulation Framework for Interactive Robot Learning Environments |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
