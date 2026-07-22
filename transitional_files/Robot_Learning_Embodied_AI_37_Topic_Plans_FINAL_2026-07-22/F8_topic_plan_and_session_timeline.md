# F8 — State estimation, sensor fusion, and SLAM: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F8** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Bayesian filtering, smoothing, factor graphs, visual–inertial odometry, mapping, observability, and uncertainty. |
| Excludes | It excludes a complete computer-vision course and application-specific SLAM engineering beyond representative systems. |
| Target competence | Formulate state estimation as probabilistic inference; derive filtering, smoothing, factor-graph, preintegration, and observability concepts; audit visual–inertial SLAM evidence. |
| Curriculum role | Physical-state grounding and uncertainty foundation. Supports P3–P5, S3–S4, and real-world evaluation. |
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
| Other topic timelines | Probability, linear algebra, F6. | Before S1 or the first dependent session |
| Topic-local foundation | Bayes rule, Gaussian propagation, linearization, manifolds, observability, filtering versus smoothing, factors, sparsity, and sensor timing/calibration. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R008 | [Probabilistic Robotics](https://mitpress.mit.edu/9780262201629/probabilistic-robotics/) | Textbook | Bayesian filtering, localization, mapping, and SLAM foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R009 | [Factor Graphs for Robot Perception](https://www.cs.cmu.edu/~kaess/pub/Dellaert17fnt.pdf) | Monograph | Best structured entry point to factor graphs, smoothing, and sparse inference. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R010 | [GTSAM Documentation and Tutorials](https://gtsam.org/) | Documentation/tutorials | Implementation support for factor graphs, preintegration, and SLAM reproductions. | S1, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | Probability, linear algebra, F6. | S1 |
| D1 | Topic-local foundation | Bayes rule, Gaussian propagation, linearization, manifolds, observability, filtering versus smoothing, factors, sparsity, and sensor timing/calibration. | Required Core papers |
| D2 | Required Core paper lineage | P038 → P039 → P040 → P041 → P042 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | How do state-estimation uncertainty and failure propagate into learned perception, planning, and control? | P3, P5, D1, L7, S3–S4 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Bayes rule, Gaussian propagation, linearization**<br>*Foundations and boundary confirmation* | Required Core | Probability, linear algebra, F6. | **Papers:** —<br>**Resources:** R008, R009, R010 | Bayes rule, Gaussian propagation, linearization, manifolds, observability, filtering versus smoothing, factors, sparsity, and sensor timing/calibration. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P038 — A New Approach to Linear Filtering and Prediction Problems**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P038 — A New Approach to Linear Filtering and Prediction Problems](https://doi.org/10.1115/1.3662552)<br>**Resources:** R008, R009 | Introduces recursive optimal state estimation for linear Gaussian systems. | Method/evidence reconstruction; limitation: Linear-Gaussian assumptions; consistency under nonlinearization is nontrivial. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P039 — iSAM2: Incremental Smoothing and Mapping Using the Bayes Tree**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P039 — iSAM2: Incremental Smoothing and Mapping Using the Bayes Tree](https://doi.org/10.1177/0278364911430419)<br>**Resources:** R008, R009 | Introduces efficient incremental nonlinear smoothing using the Bayes tree. | Method/evidence reconstruction; limitation: Requires careful factor modeling, linearization, and robustification. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P040 — On-Manifold Preintegration for Real-Time Visual–Inertial Odometry**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P040 — On-Manifold Preintegration for Real-Time Visual–Inertial Odometry](https://arxiv.org/abs/1512.02363)<br>**Resources:** R008, R009 | Develops IMU preintegration on manifolds for factor-graph estimation. | Method/evidence reconstruction; limitation: Bias/noise assumptions and calibration dominate practice. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P041 — VINS-Mono: A Robust and Versatile Monocular Visual–Inertial State Estimator**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P041 — VINS-Mono: A Robust and Versatile Monocular Visual–Inertial State Estimator](https://arxiv.org/abs/1708.03852)<br>**Resources:** R008, R009 | Presents a tightly coupled sliding-window monocular VIO system with initialization and loop closure. | Method/evidence reconstruction; limitation: Monocular scale/degeneracy and calibration sensitivity remain important. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P042 — ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual–Inertial, and Multi-Map SLAM**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P042 — ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual–Inertial, and Multi-Map SLAM](https://arxiv.org/abs/2007.11898)<br>**Resources:** R008, R009 | Unifies monocular, stereo, RGB-D, and visual–inertial SLAM with atlas-based map reuse. | Method/evidence reconstruction; limitation: Texture, dynamics, calibration, and compute conditions affect robustness. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P038, P039, P040, P041, P042<br>**Resources:** R008, R009, R010 | Derive Kalman updates, factor-graph objectives, and IMU preintegration assumptions, then connect them to VINS/ORB-SLAM3 systems. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R008, R009, R010 | Build a small factor-graph or visual–inertial pipeline; inject timestamp, calibration, bias, and dropout errors and analyze consistency. | Build a small factor-graph or visual–inertial pipeline; inject timestamp, calibration, bias, and dropout errors and analyze consistency. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R008, R009, R010 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R008, R009, R010 | How do state-estimation uncertainty and failure propagate into learned perception, planning, and control? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | Probability, linear algebra, F6. |
| Closely related / cross-area | Supports P3–P5, S3–S4, and real-world evaluation. |
| Outgoing capability | P3, P5, D1, L7, S3–S4 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P038, P039, P040, P041, P042 | Complete |
| Supporting resources | R008, R009, R010 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **How do state-estimation uncertainty and failure propagate into learned perception, planning, and control?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P3, P5, D1, L7, S3–S4 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P038, P039, P040, P041, P042. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
