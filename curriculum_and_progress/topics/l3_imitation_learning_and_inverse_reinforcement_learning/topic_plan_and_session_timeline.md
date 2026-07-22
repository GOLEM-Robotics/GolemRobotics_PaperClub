# L3 — Imitation learning and inverse reinforcement learning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L3** |
| Area | C. Learning to act |
| Execution status | **Shared Core** |
| Covers | Behavior cloning, covariate shift, interactive imitation, occupancy matching, reward recovery, and demonstration-guided policy optimization. |
| Excludes | It excludes fixed-dataset value learning covered in L4 and modern generative policy architectures covered in L6. |
| Target competence | Diagnose behavior-cloning distribution shift; derive DAgger, max-entropy IRL, GAIL/AIRL, and demonstration-guided RL; select intervention and demonstration strategies. |
| Curriculum role | Central learning-from-demonstration lineage. Precedes L4, L6, D1, and most robot-policy work. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **11** |
| Classification | Required Core: 11 |
| Required Core endpoint | **S11** |
| Completion boundary | Complete S1–S11. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | L1; supervised learning. | Before S1 or the first dependent session |
| Topic-local foundation | Supervised policy learning, covariate shift, compounding error, occupancy measures, maximum entropy, reward ambiguity, discriminator objectives, and expert-query cost. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L1; supervised learning. | S1 |
| D1 | Topic-local foundation | Supervised policy learning, covariate shift, compounding error, occupancy measures, maximum entropy, reward ambiguity, discriminator objectives, and expert-query cost. | Required Core papers |
| D2 | Required Core paper lineage | P084 → P085 → P086 → P087 → P088 → P089 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | When should a robot copy actions, infer rewards, match occupancies, request corrections, or improve through interaction? | L4, L6, D1, E2, S1–S2, S8 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Supervised policy learning, covariate shift, compounding error**<br>*Foundations and boundary confirmation* | Required Core | L1; supervised learning. | **Papers:** —<br>**Resources:** R001, R004, R018 | Supervised policy learning, covariate shift, compounding error, occupancy measures, maximum entropy, reward ambiguity, discriminator objectives, and expert-query cost. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P084 — A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning**<br>*Paper lineage — Seminal* | Required Core | S1 | **Papers:** [P084 — A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning](https://proceedings.mlr.press/v15/ross11a.html)<br>**Resources:** R001, R004 | Introduces DAgger and formalizes compounding error from covariate shift. | Method/evidence reconstruction; limitation: Requires expert queries during rollout; unsafe states may be costly. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P085 — Maximum Entropy Inverse Reinforcement Learning**<br>*Paper lineage — Foundation* | Required Core | S2 | **Papers:** [P085 — Maximum Entropy Inverse Reinforcement Learning](https://www.aaai.org/Papers/AAAI/2008/AAAI08-227.pdf)<br>**Resources:** R001, R004 | Infers rewards by maximum-entropy trajectory modeling. | Method/evidence reconstruction; limitation: Reward identifiability and dynamics knowledge remain difficult. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P086 — Generative Adversarial Imitation Learning**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P086 — Generative Adversarial Imitation Learning](https://arxiv.org/abs/1606.03476)<br>**Resources:** R001, R004 | Matches expert occupancy measures through adversarial learning. | Method/evidence reconstruction; limitation: Training instability and sample cost; discriminator reward may not transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P087 — Learning Robust Rewards with Adversarial Inverse Reinforcement Learning**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P087 — Learning Robust Rewards with Adversarial Inverse Reinforcement Learning](https://arxiv.org/abs/1710.11248)<br>**Resources:** R001, R004 | Introduces AIRL to recover disentangled rewards under adversarial imitation. | Method/evidence reconstruction; limitation: Identifiability assumptions and adversarial instability remain. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P088 — Learning Complex Dexterous Manipulation with Deep Reinforcement Learning and Demonstrations**<br>*Paper lineage — Bridge; Modern Core* | Required Core | S5 | **Papers:** [P088 — Learning Complex Dexterous Manipulation with Deep Reinforcement Learning and Demonstrations](https://arxiv.org/abs/1709.10087)<br>**Resources:** R001, R004 | Introduces DAPG, combining demonstrations with policy-gradient fine-tuning for dexterous hands. | Method/evidence reconstruction; limitation: Simulation-heavy, task-specific, and dependent on demonstrations and reward design. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P089 — What Matters in Learning from Offline Human Demonstrations for Robot Manipulation**<br>*Paper lineage — Critical; Modern Core* | Required Core | S6 | **Papers:** [P089 — What Matters in Learning from Offline Human Demonstrations for Robot Manipulation](https://arxiv.org/abs/2108.03298)<br>**Resources:** R001, R004 | Systematically studies demonstration quality, observation modalities, algorithms, and datasets in robomimic. | Method/evidence reconstruction; limitation: Limited task/platform diversity relative to current generalist datasets. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P084, P085, P086, P087, P088, P089<br>**Resources:** R001, R004, R018 | Trace the lineage from BC failure to interactive imitation, inverse RL, adversarial occupancy matching, and demonstration-guided optimization. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R001, R004, R018 | Compare BC and DAgger in a sequential task, then audit GAIL/AIRL or demonstration-guided RL on a controlled benchmark. | Compare BC and DAgger in a sequential task, then audit GAIL/AIRL or demonstration-guided RL on a controlled benchmark. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R001, R004, R018 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R001, R004, R018 | When should a robot copy actions, infer rewards, match occupancies, request corrections, or improve through interaction? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L1; supervised learning. |
| Closely related / cross-area | Precedes L4, L6, D1, and most robot-policy work. |
| Outgoing capability | L4, L6, D1, E2, S1–S2, S8 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P084, P085, P086, P087, P088, P089 | Complete |
| Supporting resources | R001, R004, R018 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **When should a robot copy actions, infer rewards, match occupancies, request corrections, or improve through interaction?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to L4, L6, D1, E2, S1–S2, S8 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P084, P085, P086, P087, P088, P089. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
