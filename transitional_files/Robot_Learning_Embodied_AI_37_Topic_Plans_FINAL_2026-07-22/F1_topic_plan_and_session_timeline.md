# F1 — Research evidence, reproducibility, and empirical methodology: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F1** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Experimental design, variance, seeds, statistical uncertainty, ablations, benchmark leakage, reproducibility, and claim–evidence separation. |
| Excludes | It does not teach generic probability from first principles or prescribe meeting/report templates. |
| Target competence | Design and audit empirical studies; distinguish exploratory evidence from confirmatory claims; choose uncertainty summaries, ablations, seeds, and reporting practices appropriate to robot-learning experiments. |
| Curriculum role | First shared research-standard topic. Feeds every empirical topic; especially D2 and D3. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

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
| Prior knowledge | Basic probability and scientific method. | Before S1 |
| Topic-local foundation | Experimental units, stochasticity sources, estimands, confidence intervals, multiple comparisons, leakage, and reproducibility levels. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R015 | [Full Stack Deep Learning](https://fullstackdeeplearning.com/) | Course | Experiment management, deployment, testing, data, and production ML systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R016 | [Machine Learning Systems](https://mlsysbook.ai/) | Open textbook | Hardware-aware training and inference support; use current online version. | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| R029 | [CleanRL Documentation and Reference Implementations](https://docs.cleanrl.dev/) | Supporting resource | Code-level reconstruction, implementation-difference audits, seeded baselines, and reproducibility checks. | S1, S6, S7, S8, S9 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | Basic probability and scientific method. | S1 |
| D1 | Topic-local foundation | Experimental units, stochasticity sources, estimands, confidence intervals, multiple comparisons, leakage, and reproducibility levels. | Required Core papers |
| D2 | Required Core paper lineage | P001 → P002 → P003 → P004 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What minimum evidence package should the club require before accepting a robot-learning claim? | D2, D3, and every empirical topic |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Experimental units, stochasticity sources, estimands**<br>*Foundations and boundary confirmation* | Required Core | Basic probability and scientific method. | **Papers:** —<br>**Resources:** R015, R016, R029 | Experimental units, stochasticity sources, estimands, confidence intervals, multiple comparisons, leakage, and reproducibility levels. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P001 — Deep Reinforcement Learning That Matters**<br>*Paper lineage — Entry Point; Critical* | Required Core | S1 | **Papers:** [P001 — Deep Reinforcement Learning That Matters](https://arxiv.org/abs/1709.06560)<br>**Resources:** R015, R016 | Shows how implementation, hyperparameters, seeds, and reporting choices can reverse apparent deep-RL conclusions. | Method/evidence reconstruction; limitation: Centered on deep RL and older algorithms, but the experimental lessons remain general. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P002 — Implementation Matters in Deep Policy Gradients: A Case Study on PPO and TRPO**<br>*Paper lineage — Critical* | Required Core | S2 | **Papers:** [P002 — Implementation Matters in Deep Policy Gradients: A Case Study on PPO and TRPO](https://arxiv.org/abs/2005.12729)<br>**Resources:** R015, R016 | Demonstrates that code-level choices can explain much of the apparent advantage of modern policy-gradient algorithms. | Method/evidence reconstruction; limitation: Narrow algorithm family and benchmark scope. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P003 — Deep Reinforcement Learning at the Edge of the Statistical Precipice**<br>*Paper lineage — Modern Core; Critical* | Required Core | S3 | **Papers:** [P003 — Deep Reinforcement Learning at the Edge of the Statistical Precipice](https://arxiv.org/abs/2108.13264)<br>**Resources:** R015, R016 | Provides robust aggregate metrics, uncertainty intervals, and performance profiles for few-run RL evaluation. | Method/evidence reconstruction; limitation: Primarily benchmark-level RL evaluation; assumes multiple tasks/runs. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P004 — Improving Reproducibility in Machine Learning Research: A Report from the NeurIPS 2019 Reproducibility Program**<br>*Paper lineage — Bridge; Critical* | Required Core | S4 | **Papers:** [P004 — Improving Reproducibility in Machine Learning Research: A Report from the NeurIPS 2019 Reproducibility Program](https://www.jmlr.org/papers/v22/20-303.html)<br>**Resources:** R015, R016 | Synthesizes practical reproducibility requirements for papers, code, data, and reporting. | Method/evidence reconstruction; limitation: Program-level evidence rather than a method paper. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P001, P002, P003, P004<br>**Resources:** R015, R016, R029 | Reconstruct an evidence chain from hypothesis through implementation choices, runs, aggregation, and claim. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R015, R016, R029 | Re-analyze one published or club experiment with rliable-style intervals, performance profiles, and an implementation checklist. | Re-analyze one published or club experiment with rliable-style intervals, performance profiles, and an implementation checklist. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7 | **Papers:** —<br>**Resources:** R015, R016, R029 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R015, R016, R029 | What minimum evidence package should the club require before accepting a robot-learning claim? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | Basic probability and scientific method. |
| Closely related / cross-area | Feeds every empirical topic; especially D2 and D3. |
| Outgoing capability | D2, D3, and every empirical topic |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P001, P002, P003, P004 | Complete |
| Supporting resources | R015, R016, R029 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What minimum evidence package should the club require before accepting a robot-learning claim?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D2, D3, and every empirical topic is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P001, P002, P003, P004. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
