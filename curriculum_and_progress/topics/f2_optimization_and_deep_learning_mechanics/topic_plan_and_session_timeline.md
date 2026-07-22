# F2 — Optimization and deep-learning mechanics: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F2** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Stochastic optimization, initialization, normalization, regularization, generalization, and failure modes of deep optimization. |
| Excludes | It is not a broad introductory machine-learning course and excludes architecture-specific details covered in F3. |
| Target competence | Derive and diagnose stochastic optimization behavior, select normalization/regularization choices, and identify optimization-induced confounds in downstream research. |
| Curriculum role | Targeted foundation, not a general ML survey. Prerequisite for F3–F5 and all learned-policy topics. |
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
| Prior knowledge | Calculus, linear algebra, probability, basic neural networks. | Before S1 |
| Topic-local foundation | Gradients, stochastic estimators, conditioning, curvature intuition, learning-rate schedules, initialization, regularization, and train/validation behavior. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R011 | [Deep Learning](https://www.deeplearningbook.org/) | Open textbook | Targeted chapters for optimization, regularization, sequence models, and generative modeling. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R012 | [Dive into Deep Learning](https://d2l.ai/) | Interactive open textbook | Implementation-oriented prerequisite repair for uneven member backgrounds. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R013 | [Stanford CS231n](https://cs231n.github.io/) | Lecture notes | Targeted computer-vision and optimization foundation. | S1, S6, S7, S8, S9 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | Calculus, linear algebra, probability, basic neural networks. | S1 |
| D1 | Topic-local foundation | Gradients, stochastic estimators, conditioning, curvature intuition, learning-rate schedules, initialization, regularization, and train/validation behavior. | Required Core papers |
| D2 | Required Core paper lineage | P005 → P006 → P007 → P008 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which optimization decisions are scientific variables rather than harmless implementation details? | F3–F5, P1, L1–L8, D3–D4 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Gradients, stochastic estimators, conditioning**<br>*Foundations and boundary confirmation* | Required Core | Calculus, linear algebra, probability, basic neural networks. | **Papers:** —<br>**Resources:** R011, R012, R013 | Gradients, stochastic estimators, conditioning, curvature intuition, learning-rate schedules, initialization, regularization, and train/validation behavior. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P005 — A Stochastic Approximation Method**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P005 — A Stochastic Approximation Method](https://doi.org/10.1214/aoms/1177729586)<br>**Resources:** R011, R012 | Establishes stochastic approximation, the conceptual ancestor of stochastic gradient methods. | Method/evidence reconstruction; limitation: Historical notation and assumptions; not a practical deep-learning recipe. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P006 — Adam: A Method for Stochastic Optimization**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P006 — Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)<br>**Resources:** R011, R012 | Introduces adaptive first- and second-moment optimization used throughout modern deep learning. | Method/evidence reconstruction; limitation: Known convergence/pathology caveats and strong dependence on schedules. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P007 — Decoupled Weight Decay Regularization**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P007 — Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)<br>**Resources:** R011, R012 | Separates weight decay from gradient-based L2 regularization in adaptive optimizers. | Method/evidence reconstruction; limitation: Does not determine optimal schedules or regularization strengths. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P008 — Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift**<br>*Paper lineage — Foundation* | Required Core | S4 | **Papers:** [P008 — Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://proceedings.mlr.press/v37/ioffe15.html)<br>**Resources:** R011, R012 | Introduces batch normalization and exposes the interaction between normalization, optimization, and train/eval behavior. | Method/evidence reconstruction; limitation: Original explanatory mechanism is debated; small-batch and non-i.i.d. issues matter in robotics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P005, P006, P007, P008<br>**Resources:** R011, R012, R013 | Derive SGD/Adam/AdamW update rules and analyze where normalization changes the optimization problem. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R011, R012, R013 | Implement a small controlled optimizer study with matched compute, seeds, logging, and failure diagnostics. | Implement a small controlled optimizer study with matched compute, seeds, logging, and failure diagnostics. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R011, R012, R013 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R011, R012, R013 | Which optimization decisions are scientific variables rather than harmless implementation details? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | Calculus, linear algebra, probability, basic neural networks. |
| Closely related / cross-area | Prerequisite for F3–F5 and all learned-policy topics. |
| Outgoing capability | F3–F5, P1, L1–L8, D3–D4 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P005, P006, P007, P008 | Complete |
| Supporting resources | R011, R012, R013 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which optimization decisions are scientific variables rather than harmless implementation details?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to F3–F5, P1, L1–L8, D3–D4 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P005, P006, P007, P008. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
