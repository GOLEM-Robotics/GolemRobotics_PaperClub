# F4 — Self-supervised and generative learning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F4** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Contrastive, masked, predictive, diffusion, score-based, and flow-based objectives. |
| Excludes | It excludes domain-specific action policies and world models except as downstream connections. |
| Target competence | Derive contrastive, masking, diffusion, score, and flow objectives and identify what representation or distribution each objective learns. |
| Curriculum role | Mathematical bridge from representation learning to generative action policies. Supports P1, P4, P5, L6, D5, and E2. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **12** |
| Classification | Required Core: 10 · Optional Specialization: 2 |
| Required Core endpoint | **S10** |
| Completion boundary | Complete S1–S10 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F2–F3; probability. | Before S1 or the first dependent session |
| Topic-local foundation | Likelihood, latent-variable intuition, contrastive estimation, corruption processes, denoising, score fields, ODE/SDE views, and conditional generation. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R011 | [Deep Learning](https://www.deeplearningbook.org/) | Open textbook | Targeted chapters for optimization, regularization, sequence models, and generative modeling. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R012 | [Dive into Deep Learning](https://d2l.ai/) | Interactive open textbook | Implementation-oriented prerequisite repair for uneven member backgrounds. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R013 | [Stanford CS231n](https://cs231n.github.io/) | Lecture notes | Targeted computer-vision and optimization foundation. | S1, S7, S8, S9, S10, S12 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F2–F3; probability. | S1 |
| D1 | Topic-local foundation | Likelihood, latent-variable intuition, contrastive estimation, corruption processes, denoising, score fields, ODE/SDE views, and conditional generation. | Required Core papers |
| D2 | Required Core paper lineage | P014 → P015 → P016 → P017 → P018 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | When should physical-AI systems predict representations, pixels, actions, scores, or vector fields? | P1, P4–P5, L6, D5, E2 |
| D6 | Optional branch | P019 | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Likelihood, latent-variable intuition, contrastive estimation**<br>*Foundations and boundary confirmation* | Required Core | F2–F3; probability. | **Papers:** —<br>**Resources:** R011, R012, R013 | Likelihood, latent-variable intuition, contrastive estimation, corruption processes, denoising, score fields, ODE/SDE views, and conditional generation. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P014 — A Simple Framework for Contrastive Learning of Visual Representations**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P014 — A Simple Framework for Contrastive Learning of Visual Representations](https://proceedings.mlr.press/v119/chen20j.html)<br>**Resources:** R011, R012 | Clarifies the data augmentation, projection head, and batch-size choices behind contrastive visual learning. | Method/evidence reconstruction; limitation: Large-batch negatives and image-level invariances may discard spatial detail. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P015 — Masked Autoencoders Are Scalable Vision Learners**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P015 — Masked Autoencoders Are Scalable Vision Learners](https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.html)<br>**Resources:** R011, R012 | Uses high-ratio masked image reconstruction to pretrain scalable ViT encoders. | Method/evidence reconstruction; limitation: Pixel reconstruction does not guarantee physical or semantic relevance. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P016 — Denoising Diffusion Probabilistic Models**<br>*Paper lineage — Foundation; Seminal* | Required Core | S3 | **Papers:** [P016 — Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)<br>**Resources:** R011, R012 | Establishes a practical diffusion-model formulation based on iterative denoising. | Method/evidence reconstruction; limitation: Iterative sampling is computationally expensive; likelihood framing is not the only interpretation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P017 — Score-Based Generative Modeling through Stochastic Differential Equations**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P017 — Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456)<br>**Resources:** R011, R012 | Unifies score matching, diffusion processes, and probability-flow ODEs. | Method/evidence reconstruction; limitation: Mathematically demanding; direct robot-policy transfer requires additional conditioning/control design. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P018 — Flow Matching for Generative Modeling**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P018 — Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747)<br>**Resources:** R011, R012 | Introduces simulation-free training of continuous normalizing flows through flow matching. | Method/evidence reconstruction; limitation: Choice of probability path and solver affects efficiency and quality. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P014, P015, P016, P017, P018<br>**Resources:** R011, R012, R013 | Map each objective to its training target, sampling/inference procedure, inductive bias, and failure mode. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R011, R012, R013 | Train miniature contrastive, masked-autoencoding, and diffusion/flow models on a controlled dataset and compare representations, likelihood proxies, and sampling cost. | Train miniature contrastive, masked-autoencoding, and diffusion/flow models on a controlled dataset and compare representations, likelihood proxies, and sampling cost. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R011, R012, R013 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R011, R012, R013 | When should physical-AI systems predict representations, pixels, actions, scores, or vector fields? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S11. |
| 11 | **P019 — Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow**<br>*Paper lineage — Optional Specialization* | Optional Specialization | S10 | **Papers:** [P019 — Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow](https://arxiv.org/abs/2209.03003)<br>**Resources:** R011, R012 | Learns straighter transport paths to reduce sampling steps. | Method/evidence reconstruction; limitation: Terminology and relationships among rectified flow/flow matching variants require careful comparison. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S12. |
| 12 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S10; S11 | **Papers:** P019<br>**Resources:** R011, R012, R013 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F2–F3; probability. |
| Closely related / cross-area | Supports P1, P4, P5, L6, D5, and E2. |
| Outgoing capability | P1, P4–P5, L6, D5, E2 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P014, P015, P016, P017, P018, P019 | Complete |
| Supporting resources | R011, R012, R013 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **When should physical-AI systems predict representations, pixels, actions, scores, or vector fields?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P1, P4–P5, L6, D5, E2 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P014, P015, P016, P017, P018, P019. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
