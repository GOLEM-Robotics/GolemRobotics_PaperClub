# L2 — Deep model-free continuous control: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L2** |
| Area | C. Learning to act |
| Execution status | **Shared Core** |
| Covers | Trust regions, generalized advantage estimation, deterministic and stochastic actor–critic methods, replay, entropy, and sparse-reward goal learning. |
| Excludes | It excludes offline-only learning, imitation, and model-based methods except as comparisons. |
| Target competence | Implement and critically compare PPO/TRPO, DDPG/TD3, SAC, and HER for continuous control, including objective derivations, implementation sensitivities, exploration, and data efficiency. |
| Curriculum role | Durable algorithmic core. Baseline family for physical control and comparison with imitation/VLA methods. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **12** |
| Classification | Required Core: 12 |
| Required Core endpoint | **S12** |
| Completion boundary | Complete S1–S12. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | L1, F2. | Before S1 or the first dependent session |
| Topic-local foundation | Actor–critic decomposition, likelihood ratios, advantage estimation, trust regions, replay, target networks, deterministic gradients, entropy regularization, and goal relabeling. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R003 | [OpenAI Spinning Up in Deep RL](https://spinningup.openai.com/) | Course notes and reference implementations | Practical derivations and baseline implementations for policy-gradient and actor–critic methods. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S9, S10, S11, S12 |
| R029 | [CleanRL Documentation and Reference Implementations](https://docs.cleanrl.dev/) | Supporting resource | Code-level reconstruction, implementation-difference audits, seeded baselines, and reproducibility checks. | S1, S9, S10, S11, S12 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L1, F2. | S1 |
| D1 | Topic-local foundation | Actor–critic decomposition, likelihood ratios, advantage estimation, trust regions, replay, target networks, deterministic gradients, entropy regularization, and goal relabeling. | Required Core papers |
| D2 | Required Core paper lineage | P077 → P078 → P079 → P080 → P081 → P082 → P083 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which continuous-control baseline is appropriate for simulation, limited real-robot data, sparse rewards, and safety constraints? | P5, L5, L7–L8, S3 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Actor–critic decomposition, likelihood ratios, advantage estimation**<br>*Foundations and boundary confirmation* | Required Core | L1, F2. | **Papers:** —<br>**Resources:** R001, R003, R004, R029 | Actor–critic decomposition, likelihood ratios, advantage estimation, trust regions, replay, target networks, deterministic gradients, entropy regularization, and goal relabeling. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P077 — Trust Region Policy Optimization**<br>*Paper lineage — Foundation; Modern Core* | Required Core | S1 | **Papers:** [P077 — Trust Region Policy Optimization](https://proceedings.mlr.press/v37/schulman15.html)<br>**Resources:** R001, R003 | Derives constrained policy updates motivated by monotonic improvement. | Method/evidence reconstruction; limitation: Second-order approximation and implementation complexity; guarantees are local/idealized. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P078 — High-Dimensional Continuous Control Using Generalized Advantage Estimation**<br>*Paper lineage — Bridge* | Required Core | S2 | **Papers:** [P078 — High-Dimensional Continuous Control Using Generalized Advantage Estimation](https://arxiv.org/abs/1506.02438)<br>**Resources:** R001, R003 | Introduces GAE to trade bias against variance in policy-gradient estimates. | Method/evidence reconstruction; limitation: Depends on value-function quality and trajectory truncation choices. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P079 — Proximal Policy Optimization Algorithms**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P079 — Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)<br>**Resources:** R001, R003 | Introduces clipped and KL-penalized surrogate objectives for simpler stable on-policy updates. | Method/evidence reconstruction; limitation: Sensitive to implementation, normalization, batch reuse, and tuning; no strict trust-region guarantee. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P080 — Continuous Control with Deep Reinforcement Learning**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P080 — Continuous Control with Deep Reinforcement Learning](https://arxiv.org/abs/1509.02971)<br>**Resources:** R001, R003 | Introduces DDPG, combining deterministic policy gradients with replay and target networks. | Method/evidence reconstruction; limitation: Known instability, overestimation, and exploration weaknesses. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P081 — Addressing Function Approximation Error in Actor-Critic Methods**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P081 — Addressing Function Approximation Error in Actor-Critic Methods](https://proceedings.mlr.press/v80/fujimoto18a.html)<br>**Resources:** R001, R003 | Introduces TD3 with twin critics, delayed policy updates, and target smoothing. | Method/evidence reconstruction; limitation: Deterministic exploration and tuning remain challenging. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P082 — Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P082 — Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor](https://proceedings.mlr.press/v80/haarnoja18b.html)<br>**Resources:** R001, R003 | Introduces maximum-entropy stochastic actor–critic learning for robust exploration and off-policy control. | Method/evidence reconstruction; limitation: Temperature, replay distribution, and reward scaling affect behavior; real-robot sample cost remains high. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **P083 — Hindsight Experience Replay**<br>*Paper lineage — Bridge* | Required Core | S7 | **Papers:** [P083 — Hindsight Experience Replay](https://arxiv.org/abs/1707.01495)<br>**Resources:** R001, R003 | Relabels failed trajectories with achieved goals to learn under sparse rewards. | Method/evidence reconstruction; limitation: Requires meaningful goal representation and relabeling semantics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S9. |
| 9 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S8 | **Papers:** P077, P078, P079, P080, P081, P082, P083<br>**Resources:** R001, R003, R004, R029 | Build a unified objective/update comparison for on-policy and off-policy continuous-control algorithms. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S10. |
| 10 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S9; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R001, R003, R004, R029 | Run matched-budget PPO, TD3, and SAC experiments with controlled implementations, seeds, normalization, and evaluation; add HER on a sparse goal task. | Run matched-budget PPO, TD3, and SAC experiments with controlled implementations, seeds, normalization, and evaluation; add HER on a sparse goal task. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S11. |
| 11 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S10; F1 and D2 | **Papers:** —<br>**Resources:** R001, R003, R004, R029 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S12. |
| 12 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S11 | **Papers:** —<br>**Resources:** R001, R003, R004, R029 | Which continuous-control baseline is appropriate for simulation, limited real-robot data, sparse rewards, and safety constraints? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L1, F2. |
| Closely related / cross-area | Baseline family for physical control and comparison with imitation/VLA methods. |
| Outgoing capability | P5, L5, L7–L8, S3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P077, P078, P079, P080, P081, P082, P083 | Complete |
| Supporting resources | R001, R003, R004, R029 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which continuous-control baseline is appropriate for simulation, limited real-robot data, sparse rewards, and safety constraints?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P5, L5, L7–L8, S3 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P077, P078, P079, P080, P081, P082, P083. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
