# P4 — Video representation and predictive learning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **P4** |
| Area | B. Perception, spatial intelligence, and world models |
| Execution status | **Active Research Track** |
| Covers | Temporal self-supervision, masked video modeling, joint-embedding prediction, action-free physical representations, and video-to-action transfer. |
| Excludes | It excludes action-conditioned control models and full model-based RL, which belong to P5/E3. |
| Target competence | Understand temporal self-supervision and predictive representation learning; evaluate whether video features encode dynamics, object persistence, affordances, and planning-relevant structure. |
| Curriculum role | Core for physical prediction and learning from human video. Bridge from perception to P5, D5, and E3. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **11** |
| Classification | Required Core: 9 · Frontier Continuation: 2 |
| Required Core endpoint | **S9** |
| Completion boundary | Complete S1–S9 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F3–F4, P1. | Before S1 or the first dependent session |
| Topic-local foundation | Temporal sampling, predictive coding, masked video modeling, joint-embedding prediction, feature collapse, temporal invariance/equivariance, and action-free supervision. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R013 | [Stanford CS231n](https://cs231n.github.io/) | Lecture notes | Targeted computer-vision and optimization foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R023 | [A Survey of Vision-Language-Action Models for Robotics: Towards Real-World Applications](https://arxiv.org/abs/2510.07077) | Survey | Current full-stack map of VLA architectures, data, hardware, and evaluation; use for navigation, not as a replacement for primary papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F3–F4, P1. | S1 |
| D1 | Topic-local foundation | Temporal sampling, predictive coding, masked video modeling, joint-embedding prediction, feature collapse, temporal invariance/equivariance, and action-free supervision. | Required Core papers |
| D2 | Required Core paper lineage | P061 → P062 → P063 → P064 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which physical knowledge can be learned from passive video, and what remains unidentifiable without action or embodiment? | P5, D5, E3 |
| D7 | Frontier branch | P065 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Temporal sampling, predictive coding, masked video modeling**<br>*Foundations and boundary confirmation* | Required Core | F3–F4, P1. | **Papers:** —<br>**Resources:** R013, R023 | Temporal sampling, predictive coding, masked video modeling, joint-embedding prediction, feature collapse, temporal invariance/equivariance, and action-free supervision. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P061 — Representation Learning with Contrastive Predictive Coding**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P061 — Representation Learning with Contrastive Predictive Coding](https://arxiv.org/abs/1807.03748)<br>**Resources:** R013, R023 | Learns representations by predicting future latent observations with a contrastive objective. | Method/evidence reconstruction; limitation: Contrastive negatives and autoregressive assumptions limit scalability/semantics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P062 — VideoMAE: Masked Autoencoders are Data-Efficient Learners for Self-Supervised Video Pre-Training**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P062 — VideoMAE: Masked Autoencoders are Data-Efficient Learners for Self-Supervised Video Pre-Training](https://arxiv.org/abs/2203.12602)<br>**Resources:** R013, R023 | Extends high-ratio masked reconstruction to video for efficient temporal representation learning. | Method/evidence reconstruction; limitation: Reconstruction objective may focus on appearance over actionable dynamics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P063 — Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P063 — Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://openaccess.thecvf.com/content/CVPR2023/html/Assran_Self-Supervised_Learning_From_Images_With_a_Joint-Embedding_Predictive_Architecture_CVPR_2023_paper.html)<br>**Resources:** R013, R023 | Introduces I-JEPA, predicting target embeddings rather than reconstructing pixels. | Method/evidence reconstruction; limitation: Image-only and not action-conditioned. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P064 — Revisiting Feature Prediction for Learning Visual Representations from Video**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P064 — Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)<br>**Resources:** R013, R023 | Introduces V-JEPA and shows feature prediction can learn strong frozen video representations without pixel reconstruction or text. | Method/evidence reconstruction; limitation: Action-free representation quality does not itself establish planning capability. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P061, P062, P063, P064<br>**Resources:** R013, R023 | Compare CPC, VideoMAE, I-JEPA/V-JEPA objectives and their assumptions about what must be predicted. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R013, R023 | Probe pretrained or small trained video representations for temporal correspondence, future discrimination, and simple planning/control transfer. | Probe pretrained or small trained video representations for temporal correspondence, future discrimination, and simple planning/control transfer. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R013, R023 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R013, R023 | Which physical knowledge can be learned from passive video, and what remains unidentifiable without action or embodiment? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S10. |
| 10 | **P065 — V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning**<br>*Paper lineage — Modern Core; Frontier Bridge* | Frontier Continuation | S9 | **Papers:** [P065 — V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985)<br>**Resources:** R013, R023 | Scales action-free video pretraining and adds an action-conditioned latent predictor for zero-shot image-goal planning. | Method/evidence reconstruction; limitation: Robot evidence is limited in task breadth and relies on a small action-conditioned post-training stage. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S11. |
| 11 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S9; S10 | **Papers:** P065<br>**Resources:** R013, R023 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F3–F4, P1. |
| Closely related / cross-area | Bridge from perception to P5, D5, and E3. |
| Outgoing capability | P5, D5, E3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P061, P062, P063, P064, P065 | Complete |
| Supporting resources | R013, R023 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which physical knowledge can be learned from passive video, and what remains unidentifiable without action or embodiment?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P5, D5, E3 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P061, P062, P063, P064, P065. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
