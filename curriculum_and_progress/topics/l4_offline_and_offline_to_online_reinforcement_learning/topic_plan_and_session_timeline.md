# L4 — Offline and offline-to-online reinforcement learning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L4** |
| Area | C. Learning to act |
| Execution status | **Active Research Track** |
| Covers | Distributional shift, conservative value learning, sequence-model policies, policy extraction, and online fine-tuning from logged data. |
| Excludes | It excludes pure supervised imitation and unrestricted online RL; online interaction appears only as controlled fine-tuning. |
| Target competence | Explain offline-RL distribution shift and extrapolation error; implement conservative/value-filtered methods; compare sequence modeling and value-based learning; design safe offline-to-online transition. |
| Curriculum role | High-value active track for limited robot interaction. Links static robot datasets to real-world improvement and E3. |
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
| Other topic timelines | L1–L3. | Before S1 or the first dependent session |
| Topic-local foundation | Dataset support, concentrability intuition, OOD actions, pessimism/conservatism, behavior regularization, expectile regression, sequence conditioning, and online fine-tuning risk. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R002 | [Algorithms for Reinforcement Learning](https://sites.ualberta.ca/~szepesva/RLBook.html) | Open monograph | Concise mathematical treatment when Sutton–Barto is too broad. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S8, S9, S10, S11 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S8, S9, S10, S11 |
| R025 | [Offline Reinforcement Learning: Tutorial, Review, and Perspectives on Open Problems](https://arxiv.org/abs/2005.01643) | Survey | Entry point before BCQ/CQL/IQL; clarifies distribution shift and evaluation. | S1, S8, S9, S10, S11 |
| R038 | [CORL: Clean Offline Reinforcement Learning](https://corl-team.github.io/CORL/) | Supporting resource | Auditable CQL/IQL/Decision Transformer/offline-to-online baselines with published benchmark configurations and logs. | S1, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L1–L3. | S1 |
| D1 | Topic-local foundation | Dataset support, concentrability intuition, OOD actions, pessimism/conservatism, behavior regularization, expectile regression, sequence conditioning, and online fine-tuning risk. | Required Core papers |
| D2 | Required Core paper lineage | P090 → P091 → P092 → P093 → P094 → P095 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Under what dataset and interaction conditions can offline learning outperform behavior cloning without exploiting evaluation artifacts? | E3, L8, S8 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Dataset support, concentrability intuition, OOD actions**<br>*Foundations and boundary confirmation* | Required Core | L1–L3. | **Papers:** —<br>**Resources:** R001, R002, R004, R018, R025, R038 | Dataset support, concentrability intuition, OOD actions, pessimism/conservatism, behavior regularization, expectile regression, sequence conditioning, and online fine-tuning risk. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P090 — Off-Policy Deep Reinforcement Learning without Exploration**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P090 — Off-Policy Deep Reinforcement Learning without Exploration](https://proceedings.mlr.press/v97/fujimoto19a.html)<br>**Resources:** R001, R002 | Introduces BCQ, constraining policy actions to remain near the offline dataset. | Method/evidence reconstruction; limitation: Constraint can block improvement beyond behavior and is sensitive to generative-model quality. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P091 — Conservative Q-Learning for Offline Reinforcement Learning**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P091 — Conservative Q-Learning for Offline Reinforcement Learning](https://arxiv.org/abs/2006.04779)<br>**Resources:** R001, R002 | Penalizes overestimated values for actions outside the dataset. | Method/evidence reconstruction; limitation: Conservatism is difficult to tune and can underperform on high-quality data. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P092 — Offline Reinforcement Learning with Implicit Q-Learning**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P092 — Offline Reinforcement Learning with Implicit Q-Learning](https://arxiv.org/abs/2110.06169)<br>**Resources:** R001, R002 | Avoids explicit evaluation of out-of-distribution actions through expectile value learning and advantage-weighted regression. | Method/evidence reconstruction; limitation: Expectile and temperature tuning strongly affect behavior; theory/evidence remain dataset-dependent. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P093 — Decision Transformer: Reinforcement Learning via Sequence Modeling**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P093 — Decision Transformer: Reinforcement Learning via Sequence Modeling](https://arxiv.org/abs/2106.01345)<br>**Resources:** R001, R002 | Frames offline RL as return-conditioned sequence modeling. | Method/evidence reconstruction; limitation: Return conditioning is brittle under distribution shift; weak online correction. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P094 — Efficient Online Reinforcement Learning with Offline Data**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P094 — Efficient Online Reinforcement Learning with Offline Data](https://arxiv.org/abs/2302.02948)<br>**Resources:** R001, R002 | Introduces RLPD, mixing offline and online replay with ensemble critics for sample-efficient fine-tuning. | Method/evidence reconstruction; limitation: Still needs safe online interaction and careful replay balance. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P095 — Cal-QL: Calibrated Offline RL Pre-Training for Efficient Online Fine-Tuning**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P095 — Cal-QL: Calibrated Offline RL Pre-Training for Efficient Online Fine-Tuning](https://arxiv.org/abs/2303.05479)<br>**Resources:** R001, R002 | Calibrates conservative Q-values to improve transition from offline pretraining to online learning. | Method/evidence reconstruction; limitation: Calibration depends on reward/value scale and online safety. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P090, P091, P092, P093, P094, P095<br>**Resources:** R001, R002, R004, R018, R025, R038 | Compare BCQ, CQL, IQL, Decision Transformer, RLPD, and Cal-QL by policy constraint, value estimation, data assumptions, and deployment pathway. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R001, R002, R004, R018, R025, R038 | Run auditable CORL/robomimic baselines on fixed datasets; perform dataset-quality, seed, hyperparameter, and offline-to-online sensitivity analysis. | Run auditable CORL/robomimic baselines on fixed datasets; perform dataset-quality, seed, hyperparameter, and offline-to-online sensitivity analysis. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R001, R002, R004, R018, R025, R038 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R001, R002, R004, R018, R025, R038 | Under what dataset and interaction conditions can offline learning outperform behavior cloning without exploiting evaluation artifacts? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L1–L3. |
| Closely related / cross-area | Links static robot datasets to real-world improvement and E3. |
| Outgoing capability | E3, L8, S8 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P090, P091, P092, P093, P094, P095 | Complete |
| Supporting resources | R001, R002, R004, R018, R025, R038 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Under what dataset and interaction conditions can offline learning outperform behavior cloning without exploiting evaluation artifacts?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to E3, L8, S8 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P090, P091, P092, P093, P094, P095. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-7E8AB998-07BD-5172-9CDD-284EBDF3DDDC` | `L4-S01` | 1 | Foundations — Dataset support, concentrability intuition, OOD actions |
| `SES-75C00E3A-BCFB-57CB-A76B-0E89D96B8E88` | `L4-S02` | 2 | P090 — Off-Policy Deep Reinforcement Learning without Exploration |
| `SES-7CC99C69-007C-5183-ABE3-6ADAA43E1D0D` | `L4-S03` | 3 | P091 — Conservative Q-Learning for Offline Reinforcement Learning |
| `SES-9F04E9A7-CD91-567B-8CBD-008823AED60E` | `L4-S04` | 4 | P092 — Offline Reinforcement Learning with Implicit Q-Learning |
| `SES-CABC33A8-B0EF-5883-8702-CED9C8A86B94` | `L4-S05` | 5 | P093 — Decision Transformer: Reinforcement Learning via Sequence Modeling |
| `SES-4E37DA38-8929-5A3D-BE69-0C7E6062CBBF` | `L4-S06` | 6 | P094 — Efficient Online Reinforcement Learning with Offline Data |
| `SES-FBC428B2-05A3-5652-851E-7A93199A0B65` | `L4-S07` | 7 | P095 — Cal-QL: Calibrated Offline RL Pre-Training for Efficient Online Fine-Tuning |
| `SES-34F43108-871B-5A16-9A40-9088170342D3` | `L4-S08` | 8 | Unified reconstruction and method comparison |
| `SES-669650B1-314E-558C-B6E8-E4B494FF985E` | `L4-S09` | 9 | Controlled implementation and evaluation |
| `SES-2D69E846-D208-5C2C-A858-27BA49E09FE8` | `L4-S10` | 10 | Evidence, limitations, and system interpretation |
| `SES-A4FA48B9-32E0-565B-8D9C-1DEF2F13121F` | `L4-S11` | 11 | Synthesis and research directions |
