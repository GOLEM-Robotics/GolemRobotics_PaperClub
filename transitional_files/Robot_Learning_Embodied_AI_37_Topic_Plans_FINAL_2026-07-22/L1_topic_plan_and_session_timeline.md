# L1 — Reinforcement-learning foundations: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L1** |
| Area | C. Learning to act |
| Execution status | **Shared Core** |
| Covers | MDPs/POMDPs, Bellman equations, temporal-difference learning, value functions, policy gradients, actor–critic methods, and function approximation. |
| Excludes | It excludes modern algorithm engineering beyond representative bridges to deep RL. |
| Target competence | Derive Bellman, TD, Q-learning, policy-gradient, and actor–critic foundations and explain convergence assumptions, bias/variance, on/off-policy distinctions, and function-approximation failures. |
| Curriculum role | Mathematical RL foundation. Prerequisite for L2, L4–L5, L7–L8, and P5. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **10** |
| Classification | Required Core: 10 |
| Required Core endpoint | **S10** |
| Completion boundary | Complete S1–S10. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Prior knowledge | Probability, optimization. | Before S1 |
| Topic-local foundation | MDPs/POMDPs, returns, occupancy, Bellman operators, dynamic programming, Monte Carlo, bootstrapping, stochastic approximation, policy gradients, and baselines. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R002 | [Algorithms for Reinforcement Learning](https://sites.ualberta.ca/~szepesva/RLBook.html) | Open monograph | Concise mathematical treatment when Sutton–Barto is too broad. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R003 | [OpenAI Spinning Up in Deep RL](https://spinningup.openai.com/) | Course notes and reference implementations | Practical derivations and baseline implementations for policy-gradient and actor–critic methods. | S1, S7, S8, S9, S10 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S7, S8, S9, S10 |
| R029 | [CleanRL Documentation and Reference Implementations](https://docs.cleanrl.dev/) | Supporting resource | Code-level reconstruction, implementation-difference audits, seeded baselines, and reproducibility checks. | S1, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | Probability, optimization. | S1 |
| D1 | Topic-local foundation | MDPs/POMDPs, returns, occupancy, Bellman operators, dynamic programming, Monte Carlo, bootstrapping, stochastic approximation, policy gradients, and baselines. | Required Core papers |
| D2 | Required Core paper lineage | P072 → P073 → P074 → P075 → P076 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which RL guarantees survive approximation, partial observability, and physical-system constraints? | L2, L4–L5, L7–L8, P5 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — MDPs/POMDPs, returns, occupancy**<br>*Foundations and boundary confirmation* | Required Core | Probability, optimization. | **Papers:** —<br>**Resources:** R001, R002, R003, R004, R029 | MDPs/POMDPs, returns, occupancy, Bellman operators, dynamic programming, Monte Carlo, bootstrapping, stochastic approximation, policy gradients, and baselines. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P072 — Learning to Predict by the Methods of Temporal Differences**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P072 — Learning to Predict by the Methods of Temporal Differences](https://doi.org/10.1007/BF00115009)<br>**Resources:** R001, R002 | Introduces temporal-difference learning and bootstrapping. | Method/evidence reconstruction; limitation: Linear/tabular analysis; function approximation adds instability. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P073 — Q-Learning**<br>*Paper lineage — Seminal* | Required Core | S2 | **Papers:** [P073 — Q-Learning](https://doi.org/10.1007/BF00992698)<br>**Resources:** R001, R002 | Establishes off-policy temporal-difference control through Q-learning. | Method/evidence reconstruction; limitation: Convergence assumptions fail under nonlinear approximation and distribution shift. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P074 — Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning**<br>*Paper lineage — Seminal* | Required Core | S3 | **Papers:** [P074 — Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://doi.org/10.1007/BF00992696)<br>**Resources:** R001, R002 | Introduces REINFORCE likelihood-ratio policy gradients. | Method/evidence reconstruction; limitation: High variance and poor sample efficiency without baselines/critics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P075 — Human-Level Control through Deep Reinforcement Learning**<br>*Paper lineage — Bridge; Seminal* | Required Core | S4 | **Papers:** [P075 — Human-Level Control through Deep Reinforcement Learning](https://www.nature.com/articles/nature14236)<br>**Resources:** R001, R002 | Combines convolutional perception, replay buffers, and target networks in DQN. | Method/evidence reconstruction; limitation: Atari-specific, discrete actions, high sample cost, and reproducibility issues. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P076 — Asynchronous Methods for Deep Reinforcement Learning**<br>*Paper lineage — Bridge* | Required Core | S5 | **Papers:** [P076 — Asynchronous Methods for Deep Reinforcement Learning](https://proceedings.mlr.press/v48/mniha16.html)<br>**Resources:** R001, R002 | Introduces A3C and practical deep actor–critic training without replay. | Method/evidence reconstruction; limitation: Later synchronous methods are easier to reproduce; still sample-inefficient. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P072, P073, P074, P075, P076<br>**Resources:** R001, R002, R003, R004, R029 | Derive TD(0), Q-learning, REINFORCE, and actor–critic updates from common objectives and identify assumptions broken by deep approximation. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R001, R002, R003, R004, R029 | Implement tabular and small neural baselines; verify updates against analytic examples and reproduce instability from correlated/off-policy data. | Implement tabular and small neural baselines; verify updates against analytic examples and reproduce instability from correlated/off-policy data. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R001, R002, R003, R004, R029 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R001, R002, R003, R004, R029 | Which RL guarantees survive approximation, partial observability, and physical-system constraints? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | Probability, optimization. |
| Closely related / cross-area | Prerequisite for L2, L4–L5, L7–L8, and P5. |
| Outgoing capability | L2, L4–L5, L7–L8, P5 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P072, P073, P074, P075, P076 | Complete |
| Supporting resources | R001, R002, R003, R004, R029 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which RL guarantees survive approximation, partial observability, and physical-system constraints?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to L2, L4–L5, L7–L8, P5 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P072, P073, P074, P075, P076. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
