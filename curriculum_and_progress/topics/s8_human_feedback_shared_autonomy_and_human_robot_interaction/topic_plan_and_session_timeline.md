# S8 — Human feedback, shared autonomy, and human–robot interaction: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S8** |
| Area | F. Specialization branches |
| Execution status | **Optional** |
| Covers | Preference learning, corrections, interventions, shared autonomy, intent inference, and human-centered evaluation. |
| Excludes | It excludes broad social-robotics theory unrelated to learning, feedback, shared control, or evaluation of physical systems. |
| Target competence | Design human-feedback, correction, intervention, and shared-autonomy systems; model intent and authority; conduct valid human-centered evaluations. |
| Curriculum role | Optional cross-cutting branch. Supports safe deployment and data collection. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **10** |
| Classification | Required Core: 8 · Optional Specialization: 2 |
| Required Core endpoint | **S8** |
| Completion boundary | Complete S1–S8 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | L3–L4, L8, E1. | Before S1 or the first dependent session |
| Topic-local foundation | Preference elicitation, corrections, interventions, shared-control blending, intent inference, trust/calibration, study design, ethics, workload, and user variability. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R001 | [Reinforcement Learning: An Introduction, 2nd ed.](http://incompleteideas.net/book/the-book-2nd.html) | Textbook | Primary mathematical entry point; use selected chapters before original TD/Q/policy-gradient papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S6, S7, S8, S9, S10 |
| R035 | [Human–Robot Interaction: An Introduction, 2nd ed.](https://www.human-robot-interaction.org/) | Supporting resource | HRI concepts, study design, human-centered evaluation, interaction modalities, and societal constraints. | S1, S6, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L3–L4, L8, E1. | S1 |
| D1 | Topic-local foundation | Preference elicitation, corrections, interventions, shared-control blending, intent inference, trust/calibration, study design, ethics, workload, and user variability. | Required Core papers |
| D2 | Required Core paper lineage | P190 → P191 → P192 → P193 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | How should authority, learning, uncertainty, and accountability be distributed between human and robot? | D1, L8, E1–E3 |
| D6 | Optional branch | optional practical continuation | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Preference elicitation, corrections, interventions**<br>*Foundations and boundary confirmation* | Required Core | L3–L4, L8, E1. | **Papers:** —<br>**Resources:** R001, R004, R018, R035 | Preference elicitation, corrections, interventions, shared-control blending, intent inference, trust/calibration, study design, ethics, workload, and user variability. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P190 — Deep Reinforcement Learning from Human Preferences**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P190 — Deep Reinforcement Learning from Human Preferences](https://arxiv.org/abs/1706.03741)<br>**Resources:** R001, R004 | Learns reward models from pairwise human trajectory preferences and optimizes policies against them. | Method/evidence reconstruction; limitation: Preference burden, reward hacking, and distribution shift remain serious. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P191 — PEBBLE: Feedback-Efficient Interactive Reinforcement Learning via Relabeling Experience and Unsupervised Pre-Training**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P191 — PEBBLE: Feedback-Efficient Interactive Reinforcement Learning via Relabeling Experience and Unsupervised Pre-Training](https://proceedings.mlr.press/v139/lee21i.html)<br>**Resources:** R001, R004 | Improves preference-based RL with unsupervised pretraining and relabeling. | Method/evidence reconstruction; limitation: Mostly simulated benchmarks; preference-model exploitation remains. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P192 — Shared Autonomy via Deep Reinforcement Learning**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P192 — Shared Autonomy via Deep Reinforcement Learning](https://arxiv.org/abs/1802.01744)<br>**Resources:** R001, R004 | Learns assistance policies from user input while inferring intended goals. | Method/evidence reconstruction; limitation: Assumes goal sets/training distribution and can over-assist under ambiguity. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P193 — Learning from Interventions Using Hierarchical Policies for Safe Learning**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P193 — Learning from Interventions Using Hierarchical Policies for Safe Learning](https://ojs.aaai.org/index.php/AAAI/article/view/6602)<br>**Resources:** R001, R004 | Corrects reaction-delay labels and adds hierarchical subgoal prediction to intervention-based learning. | Method/evidence reconstruction; limitation: Evidence is primarily simulated and depends on consistent expert oversight. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P190, P191, P192, P193<br>**Resources:** R001, R004, R018, R035 | Connect preference learning, corrective feedback, shared autonomy, and intervention-based learning as different allocations of human authority and information. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S6; F1 and D2 | **Papers:** —<br>**Resources:** R001, R004, R018, R035 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S8. |
| 8 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S7 | **Papers:** —<br>**Resources:** R001, R004, R018, R035 | How should authority, learning, uncertainty, and accountability be distributed between human and robot? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Optional Specialization | S8 | **Papers:** —<br>**Resources:** R001, R004, R018, R035 | Prototype a shared-autonomy or feedback interface and run a small controlled/user study or simulation-based evaluation with safety, workload, and performance metrics. | Prototype a shared-autonomy or feedback interface and run a small controlled/user study or simulation-based evaluation with safety, workload, and performance metrics. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S8; S9 | **Papers:** —<br>**Resources:** R001, R004, R018, R035 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L3–L4, L8, E1. |
| Closely related / cross-area | Supports safe deployment and data collection. |
| Outgoing capability | D1, L8, E1–E3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P190, P191, P192, P193 | Complete |
| Supporting resources | R001, R004, R018, R035 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **How should authority, learning, uncertainty, and accountability be distributed between human and robot?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D1, L8, E1–E3 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P190, P191, P192, P193. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
