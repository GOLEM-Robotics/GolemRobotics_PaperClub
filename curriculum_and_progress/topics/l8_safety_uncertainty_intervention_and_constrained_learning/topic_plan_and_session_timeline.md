# L8 — Safety, uncertainty, intervention, and constrained learning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L8** |
| Area | C. Learning to act |
| Execution status | **Active Research Track** |
| Covers | Constrained MDPs, control barrier functions, uncertainty estimation, recovery policies, human intervention, and risk-sensitive evaluation. |
| Excludes | It excludes formal safety engineering in full breadth; it focuses on learning/control interfaces and evidence relevant to robot learning. |
| Target competence | Formulate constraints and uncertainty, implement safety filters/recovery/intervention logic, and evaluate risk rather than average return alone. |
| Curriculum role | Safety and failure-management track. Cross-cuts all deployment topics and D2. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

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
| Other topic timelines | F7, L1–L4. | Before S1 or the first dependent session |
| Topic-local foundation | Constrained MDPs, chance/risk measures, calibration, epistemic/aleatoric uncertainty, barrier functions, recovery sets, intervention policies, and human oversight budgets. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F7, L1–L4. | S1 |
| D1 | Topic-local foundation | Constrained MDPs, chance/risk measures, calibration, epistemic/aleatoric uncertainty, barrier functions, recovery sets, intervention policies, and human oversight budgets. | Required Core papers |
| D2 | Required Core paper lineage | P112 → P113 → P114 → P115 → P116 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What evidence is sufficient to claim safer learning, and which hazards remain outside the learned safety mechanism? | D2, D4, S8 and every deployed-policy track |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Constrained MDPs, chance/risk measures, calibration**<br>*Foundations and boundary confirmation* | Required Core | F7, L1–L4. | **Papers:** —<br>**Resources:** R001, R004, R018 | Constrained MDPs, chance/risk measures, calibration, epistemic/aleatoric uncertainty, barrier functions, recovery sets, intervention policies, and human oversight budgets. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P112 — Constrained Policy Optimization**<br>*Paper lineage — Foundation; Modern Core* | Required Core | S1 | **Papers:** [P112 — Constrained Policy Optimization](https://proceedings.mlr.press/v70/achiam17a.html)<br>**Resources:** R001, R004 | Optimizes return under explicit expected-cost constraints using trust-region updates. | Method/evidence reconstruction; limitation: Average constraints do not guarantee per-step safety; estimates can be inaccurate. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P113 — Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles**<br>*Paper lineage — Foundation; Modern Core* | Required Core | S2 | **Papers:** [P113 — Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles](https://arxiv.org/abs/1612.01474)<br>**Resources:** R001, R004 | Establishes independently trained ensembles as a simple and strong baseline for predictive uncertainty, calibration, and out-of-distribution behavior. | Method/evidence reconstruction; limitation: Compute scales with ensemble size; uncertainty quality is empirical rather than guaranteed. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P114 — Recovery RL: Safe Reinforcement Learning with Learned Recovery Zones**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P114 — Recovery RL: Safe Reinforcement Learning with Learned Recovery Zones](https://arxiv.org/abs/2010.15920)<br>**Resources:** R001, R004 | Separates task policy and recovery policy using learned safety estimates. | Method/evidence reconstruction; limitation: Safety depends on learned classifier coverage and reset assumptions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P115 — ThriftyDAgger: Budget-Aware Novelty and Risk Gating for Interactive Imitation Learning**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P115 — ThriftyDAgger: Budget-Aware Novelty and Risk Gating for Interactive Imitation Learning](https://arxiv.org/abs/2109.08273)<br>**Resources:** R001, R004 | Queries human intervention selectively based on risk and novelty. | Method/evidence reconstruction; limitation: Risk/novelty estimators can fail outside training support. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P116 — Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P116 — Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning](https://doi.org/10.1126/scirobotics.ads5033)<br>**Resources:** R001, R004 | Combines demonstrations, sparse rewards, interventions, and sample-efficient RL in a practical real-robot system. | Method/evidence reconstruction; limitation: Requires reliable success signals, operator availability, and controlled hardware resets. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P112, P113, P114, P115, P116<br>**Resources:** R001, R004, R018 | Compare CPO, ensembles, Recovery RL, ThriftyDAgger, and HIL-SERL by safety assumption, uncertainty signal, intervention mechanism, and evidence. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R001, R004, R018 | Add uncertainty or recovery/intervention layers to a policy; evaluate violations, false alarms, coverage, intervention cost, and distribution shift. | Add uncertainty or recovery/intervention layers to a policy; evaluate violations, false alarms, coverage, intervention cost, and distribution shift. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R001, R004, R018 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R001, R004, R018 | What evidence is sufficient to claim safer learning, and which hazards remain outside the learned safety mechanism? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F7, L1–L4. |
| Closely related / cross-area | Cross-cuts all deployment topics and D2. |
| Outgoing capability | D2, D4, S8 and every deployed-policy track |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P112, P113, P114, P115, P116 | Complete |
| Supporting resources | R001, R004, R018 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What evidence is sufficient to claim safer learning, and which hazards remain outside the learned safety mechanism?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D2, D4, S8 and every deployed-policy track is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P112, P113, P114, P115, P116. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-D9E4E015-A841-5ADD-860E-1F26CD985EB9` | `L8-S01` | 1 | Foundations — Constrained MDPs, chance/risk measures, calibration |
| `SES-E2AF68A0-909F-5A86-A9F2-A9E94A269868` | `L8-S02` | 2 | P112 — Constrained Policy Optimization |
| `SES-4E3AB0CA-F1BC-5988-A6EC-B91C71D8B0CE` | `L8-S03` | 3 | P113 — Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles |
| `SES-90C3440B-A40E-56F0-B6D0-5C91E1693785` | `L8-S04` | 4 | P114 — Recovery RL: Safe Reinforcement Learning with Learned Recovery Zones |
| `SES-33845BEC-D8CD-591A-B43D-3868BF34C506` | `L8-S05` | 5 | P115 — ThriftyDAgger: Budget-Aware Novelty and Risk Gating for Interactive Imitation Learning |
| `SES-233249AD-614A-5B2A-91D8-F2C00E8BA9A6` | `L8-S06` | 6 | P116 — Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning |
| `SES-FE8328F1-BD35-5B0C-912A-9668BF3F319E` | `L8-S07` | 7 | Unified reconstruction and method comparison |
| `SES-353BF7DF-6FD0-540F-B97C-8C349FE046A4` | `L8-S08` | 8 | Controlled implementation and evaluation |
| `SES-7EDE6E6D-29EE-5C4B-8EE7-6B9238FD724C` | `L8-S09` | 9 | Evidence, limitations, and system interpretation |
| `SES-F6FCDCCE-CEE5-53DD-ABC3-CE2856EAF985` | `L8-S10` | 10 | Synthesis and research directions |
