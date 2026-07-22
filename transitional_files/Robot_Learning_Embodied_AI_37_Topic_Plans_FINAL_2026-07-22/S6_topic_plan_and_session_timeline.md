# S6 — Multi-agent reinforcement learning: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S6** |
| Area | F. Specialization branches |
| Execution status | **Deferred** |
| Covers | Centralized training/decentralized execution, credit assignment, communication, non-stationarity, and cooperative control. |
| Excludes | It excludes game-theoretic breadth and remains deferred until a concrete multi-robot/cooperative task exists. |
| Target competence | Understand CTDE, non-stationarity, credit assignment, value factorization, communication, and evaluation sufficiently to launch a justified multi-agent project. |
| Curriculum role | Deferred until a concrete multi-robot problem exists. Independent branch with limited immediate overlap. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **9** |
| Classification | Required Core: 7 · Optional Specialization: 2 |
| Required Core endpoint | **S7** |
| Completion boundary | Complete S1–S7 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | L1–L2. | Before S1 or the first dependent session |
| Topic-local foundation | Markov games, joint policies, decentralized observations, CTDE, centralized critics, credit assignment, value decomposition, communication, and exploitability/generalization. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R037 | [PettingZoo Documentation](https://pettingzoo.farama.org/) | Supporting resource | Correct multi-agent environment semantics, reproducible interfaces, and controlled CTDE/non-stationarity experiments. | S1, S5, S6, S7, S8, S9 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L1–L2. | S1 |
| D1 | Topic-local foundation | Markov games, joint policies, decentralized observations, CTDE, centralized critics, credit assignment, value decomposition, communication, and exploitability/generalization. | Required Core papers |
| D2 | Required Core paper lineage | P185 → P186 → P187 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | When does multi-agent structure require dedicated algorithms rather than independent single-agent learning? | future multi-robot systems |
| D6 | Optional branch | optional practical continuation | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Markov games, joint policies, decentralized observations**<br>*Foundations and boundary confirmation* | Required Core | L1–L2. | **Papers:** —<br>**Resources:** R001, R004, R037 | Markov games, joint policies, decentralized observations, CTDE, centralized critics, credit assignment, value decomposition, communication, and exploitability/generalization. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P185 — Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P185 — Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275)<br>**Resources:** R001, R004 | Introduces MADDPG with centralized critics and decentralized actors. | Method/evidence reconstruction; limitation: Known instability and limited scalability; simple benchmarks. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P186 — QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P186 — QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning](https://proceedings.mlr.press/v80/rashid18a.html)<br>**Resources:** R001, R004 | Factorizes joint action values under a monotonicity constraint for cooperative agents. | Method/evidence reconstruction; limitation: Monotonicity limits representable coordination; benchmark concentration. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P187 — The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games**<br>*Paper lineage — Modern Core; Critical* | Required Core | S3 | **Papers:** [P187 — The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games](https://arxiv.org/abs/2103.01955)<br>**Resources:** R001, R004 | Shows a carefully implemented multi-agent PPO baseline can outperform specialized methods. | Method/evidence reconstruction; limitation: Benchmark suite remains game/simulation centric. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S4 | **Papers:** P185, P186, P187<br>**Resources:** R001, R004, R037 | Compare MADDPG, QMIX, and MAPPO as centralized-critic, value-factorization, and policy-gradient approaches. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S6. |
| 6 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S5; F1 and D2 | **Papers:** —<br>**Resources:** R001, R004, R037 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S7. |
| 7 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S6 | **Papers:** —<br>**Resources:** R001, R004, R037 | When does multi-agent structure require dedicated algorithms rather than independent single-agent learning? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Optional Specialization | S7 | **Papers:** —<br>**Resources:** R001, R004, R037 | When activated, implement matched PettingZoo/TorchRL experiments and audit sensitivity to agent ordering, parameter sharing, observability, and team size. | When activated, implement matched PettingZoo/TorchRL experiments and audit sensitivity to agent ordering, parameter sharing, observability, and team size. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S7; S8 | **Papers:** —<br>**Resources:** R001, R004, R037 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L1–L2. |
| Closely related / cross-area | Independent branch with limited immediate overlap. |
| Outgoing capability | future multi-robot systems |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P185, P186, P187 | Complete |
| Supporting resources | R001, R004, R037 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **When does multi-agent structure require dedicated algorithms rather than independent single-agent learning?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to future multi-robot systems is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P185, P186, P187. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
