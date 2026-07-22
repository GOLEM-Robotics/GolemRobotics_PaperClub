# P1 — Visual and multimodal representation learning: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **P1** |
| Area | B. Perception, spatial intelligence, and world models |
| Execution status | **Shared Core** |
| Covers | Transferable image and image–text representations, dense features, frozen encoders, and multimodal pretraining. |
| Excludes | It excludes downstream detector/segmenter design and 3D/video-specific methods covered in P2–P4. |
| Target competence | Select and evaluate frozen or adapted visual/multimodal encoders for robotics, understanding contrastive and self-distillation objectives, dense-feature quality, and transfer limits. |
| Curriculum role | Durable visual foundation. Prerequisite for P2–P4, E1–E2, and L6. |
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
| Other topic timelines | F3–F5. | Before S1 or the first dependent session |
| Topic-local foundation | Global versus dense representations, contrastive alignment, self-distillation, pretraining data, frozen probes, fine-tuning, and representation diagnostics. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R012 | [Dive into Deep Learning](https://d2l.ai/) | Interactive open textbook | Implementation-oriented prerequisite repair for uneven member backgrounds. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R013 | [Stanford CS231n](https://cs231n.github.io/) | Lecture notes | Targeted computer-vision and optimization foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F3–F5. | S1 |
| D1 | Topic-local foundation | Global versus dense representations, contrastive alignment, self-distillation, pretraining data, frozen probes, fine-tuning, and representation diagnostics. | Required Core papers |
| D2 | Required Core paper lineage | P043 → P044 → P045 → P046 → P047 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What makes a representation useful for physical interaction rather than only image-level recognition? | P2–P4, L6, E1–E2 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Global versus dense representations, contrastive alignment, self-distillation**<br>*Foundations and boundary confirmation* | Required Core | F3–F5. | **Papers:** —<br>**Resources:** R012, R013 | Global versus dense representations, contrastive alignment, self-distillation, pretraining data, frozen probes, fine-tuning, and representation diagnostics. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P043 — Learning Transferable Visual Models From Natural Language Supervision**<br>*Paper lineage — Seminal; Bridge* | Required Core | S1 | **Papers:** [P043 — Learning Transferable Visual Models From Natural Language Supervision](https://proceedings.mlr.press/v139/radford21a.html)<br>**Resources:** R012, R013 | Introduces CLIP-style contrastive image–text pretraining and zero-shot classification. | Method/evidence reconstruction; limitation: Global image–text alignment is weak for precise geometry and temporal dynamics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P044 — Emerging Properties in Self-Supervised Vision Transformers**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P044 — Emerging Properties in Self-Supervised Vision Transformers](https://openaccess.thecvf.com/content/ICCV2021/html/Caron_Emerging_Properties_in_Self-Supervised_Vision_Transformers_ICCV_2021_paper.html)<br>**Resources:** R012, R013 | Shows DINO self-distillation yields strong semantic and dense structure without labels. | Method/evidence reconstruction; limitation: Training recipe sensitivity and compute requirements are substantial. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P045 — DINOv2: Learning Robust Visual Features without Supervision**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P045 — DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193)<br>**Resources:** R012, R013 | Scales curated self-supervised visual pretraining to robust transferable image features. | Method/evidence reconstruction; limitation: Image-only pretraining lacks explicit action/temporal grounding; data curation is expensive. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P046 — Sigmoid Loss for Language Image Pre-Training**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P046 — Sigmoid Loss for Language Image Pre-Training](https://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html)<br>**Resources:** R012, R013 | Replaces global softmax contrastive loss with pairwise sigmoid loss for scalable image–text pretraining. | Method/evidence reconstruction; limitation: Large-scale results rely on substantial proprietary data/compute. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P047 — What Makes for Good Visual Representations for Robot Manipulation?**<br>*Paper lineage — Critical; Bridge* | Required Core | S5 | **Papers:** [P047 — What Makes for Good Visual Representations for Robot Manipulation?](https://arxiv.org/abs/2107.12344)<br>**Resources:** R012, R013 | Systematically compares visual pretraining choices for downstream manipulation. | Method/evidence reconstruction; limitation: Results depend on task suite and policy architecture; predates newer foundation encoders. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P043, P044, P045, P046, P047<br>**Resources:** R012, R013 | Compare CLIP, DINO/DINOv2, SigLIP, and robot-specific representation evaluation at objective, data, feature, and transfer levels. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R012, R013 | Benchmark frozen features and limited fine-tuning on a small robot perception/manipulation dataset with linear probes and spatial diagnostics. | Benchmark frozen features and limited fine-tuning on a small robot perception/manipulation dataset with linear probes and spatial diagnostics. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R012, R013 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R012, R013 | What makes a representation useful for physical interaction rather than only image-level recognition? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F3–F5. |
| Closely related / cross-area | Prerequisite for P2–P4, E1–E2, and L6. |
| Outgoing capability | P2–P4, L6, E1–E2 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P043, P044, P045, P046, P047 | Complete |
| Supporting resources | R012, R013 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What makes a representation useful for physical interaction rather than only image-level recognition?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P2–P4, L6, E1–E2 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P043, P044, P045, P046, P047. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
