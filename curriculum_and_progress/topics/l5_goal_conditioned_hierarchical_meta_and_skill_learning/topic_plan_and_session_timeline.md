# L5 — Goal-conditioned, hierarchical, meta-, and skill learning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L5** |
| Area | C. Learning to act |
| Execution status | **Specialization** |
| Covers | Temporal abstraction, universal value functions, unsupervised skills, hierarchical control, meta-learning, and task inference. |
| Excludes | It excludes generic long-horizon planning and language planners unless they rely directly on learned skills or task inference. |
| Target competence | Understand temporal abstraction, goal conditioning, unsupervised skill discovery, hierarchy, and meta-RL; identify when abstractions improve exploration, transfer, or long-horizon control. |
| Curriculum role | Specialized abstraction and transfer branch. Supports long-horizon planning, transfer, and E3. |
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
| Other topic timelines | L1–L2. | Before S1 or the first dependent session |
| Topic-local foundation | Semi-MDPs, options, termination, universal value functions, mutual-information skill objectives, subgoals, off-policy hierarchy, meta-learning, and latent task inference. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L1–L2. | S1 |
| D1 | Topic-local foundation | Semi-MDPs, options, termination, universal value functions, mutual-information skill objectives, subgoals, off-policy hierarchy, meta-learning, and latent task inference. | Required Core papers |
| D2 | Required Core paper lineage | P096 → P097 → P098 → P099 → P100 → P101 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which abstractions are reusable across tasks and embodiments, and which merely compress one benchmark? | E3 and long-horizon skill/planning systems |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Semi-MDPs, options, termination**<br>*Foundations and boundary confirmation* | Required Core | L1–L2. | **Papers:** —<br>**Resources:** R001, R004 | Semi-MDPs, options, termination, universal value functions, mutual-information skill objectives, subgoals, off-policy hierarchy, meta-learning, and latent task inference. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P096 — Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction in Reinforcement Learning**<br>*Paper lineage — Seminal* | Required Core | S1 | **Papers:** [P096 — Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction in Reinforcement Learning](https://doi.org/10.1016/S0004-3702(99)00052-1)<br>**Resources:** R001, R004 | Introduces the options framework for temporally extended actions. | Method/evidence reconstruction; limitation: Learning useful options and termination remains difficult. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P097 — Universal Value Function Approximators**<br>*Paper lineage — Bridge* | Required Core | S2 | **Papers:** [P097 — Universal Value Function Approximators](https://proceedings.mlr.press/v37/schaul15.html)<br>**Resources:** R001, R004 | Conditions value functions on goals to enable transfer across tasks. | Method/evidence reconstruction; limitation: Goal representation and sampling determine generalization. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P098 — Diversity Is All You Need: Learning Skills without a Reward Function**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P098 — Diversity Is All You Need: Learning Skills without a Reward Function](https://arxiv.org/abs/1802.06070)<br>**Resources:** R001, R004 | Introduces DIAYN, discovering diverse skills by maximizing mutual information. | Method/evidence reconstruction; limitation: Diversity does not guarantee task usefulness or physical safety. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P099 — Data-Efficient Hierarchical Reinforcement Learning**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P099 — Data-Efficient Hierarchical Reinforcement Learning](https://arxiv.org/abs/1805.08296)<br>**Resources:** R001, R004 | Introduces HIRO with off-policy correction for hierarchical continuous control. | Method/evidence reconstruction; limitation: Subgoal representation and non-stationarity remain difficult. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P100 — Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks**<br>*Paper lineage — Bridge* | Required Core | S5 | **Papers:** [P100 — Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://proceedings.mlr.press/v70/finn17a.html)<br>**Resources:** R001, R004 | Learns initial parameters optimized for rapid adaptation. | Method/evidence reconstruction; limitation: Bi-level optimization is expensive and sensitive to task distribution. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P101 — Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P101 — Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables](https://proceedings.mlr.press/v97/rakelly19a.html)<br>**Resources:** R001, R004 | Introduces PEARL, inferring latent task context from experience for off-policy meta-RL. | Method/evidence reconstruction; limitation: Assumes training/test task-family overlap and can fail under ambiguity. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P096, P097, P098, P099, P100, P101<br>**Resources:** R001, R004 | Connect options, UVFAs, DIAYN, HIRO, MAML, and PEARL through the representation and adaptation of tasks/skills. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R001, R004 | Implement one goal-conditioned/hierarchical or meta-RL experiment and test skill reuse, adaptation speed, and failure under task shift. | Implement one goal-conditioned/hierarchical or meta-RL experiment and test skill reuse, adaptation speed, and failure under task shift. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R001, R004 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R001, R004 | Which abstractions are reusable across tasks and embodiments, and which merely compress one benchmark? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L1–L2. |
| Closely related / cross-area | Supports long-horizon planning, transfer, and E3. |
| Outgoing capability | E3 and long-horizon skill/planning systems |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P096, P097, P098, P099, P100, P101 | Complete |
| Supporting resources | R001, R004 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which abstractions are reusable across tasks and embodiments, and which merely compress one benchmark?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to E3 and long-horizon skill/planning systems is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P096, P097, P098, P099, P100, P101. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
