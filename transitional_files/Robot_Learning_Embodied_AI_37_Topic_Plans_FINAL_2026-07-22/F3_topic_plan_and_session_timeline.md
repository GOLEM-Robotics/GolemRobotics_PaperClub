# F3 — Neural architectures and sequence models: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F3** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Residual networks, attention, Transformers, tokenization, positional representations, state-space alternatives, and architectural inductive biases. |
| Excludes | It excludes full foundation-model data/post-training pipelines, which belong to F5, and domain-specific perception/policy uses. |
| Target competence | Reconstruct residual, attention, Transformer, tokenization/position, and state-space mechanisms; reason about inductive bias, complexity, memory, and suitability for physical sequences. |
| Curriculum role | Common architectural language. Supports P1–P4, E1–E3, L6, and E2. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **11** |
| Classification | Required Core: 8 · Optional Specialization: 3 |
| Required Core endpoint | **S8** |
| Completion boundary | Complete S1–S8 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F2. | Before S1 or the first dependent session |
| Topic-local foundation | Tensor shapes, convolution and residual paths, sequence tokenization, attention algebra, positional information, recurrence/state-space views, compute and memory scaling. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R011 | [Deep Learning](https://www.deeplearningbook.org/) | Open textbook | Targeted chapters for optimization, regularization, sequence models, and generative modeling. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R012 | [Dive into Deep Learning](https://d2l.ai/) | Interactive open textbook | Implementation-oriented prerequisite repair for uneven member backgrounds. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R014 | [Stanford CS224n](https://web.stanford.edu/class/cs224n/) | Lecture notes | Transformer, language-model, and alignment prerequisites. | S1, S5, S6, S7, S8, S11 |
| R027 | [Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) | Supporting resource | End-to-end reconstruction of tokenization, Transformer training, systems optimization, scaling, data preparation, evaluation, and post-training. | S1, S5, S6, S7, S8, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F2. | S1 |
| D1 | Topic-local foundation | Tensor shapes, convolution and residual paths, sequence tokenization, attention algebra, positional information, recurrence/state-space views, compute and memory scaling. | Required Core papers |
| D2 | Required Core paper lineage | P009 → P010 → P011 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | How should architecture choice change for images, language, video, and high-rate robot trajectories? | F4–F5, P1–P4, L6, E1–E3 |
| D6 | Optional branch | P012 → P013 | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Tensor shapes, convolution and residual paths, sequence tokenization**<br>*Foundations and boundary confirmation* | Required Core | F2. | **Papers:** —<br>**Resources:** R011, R012, R014, R027 | Tensor shapes, convolution and residual paths, sequence tokenization, attention algebra, positional information, recurrence/state-space views, compute and memory scaling. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P009 — Deep Residual Learning for Image Recognition**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P009 — Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html)<br>**Resources:** R011, R012 | Establishes residual connections as a practical mechanism for training deep networks. | Method/evidence reconstruction; limitation: Image classification setting; later architectures alter normalization and block design. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P010 — Attention Is All You Need**<br>*Paper lineage — Seminal* | Required Core | S2 | **Papers:** [P010 — Attention Is All You Need](https://arxiv.org/abs/1706.03762)<br>**Resources:** R011, R012 | Introduces the Transformer architecture based on self-attention and cross-attention. | Method/evidence reconstruction; limitation: Original model is small and sequence-length quadratic; later variants are substantial. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P011 — An Image Is Worth 16×16 Words: Transformers for Image Recognition at Scale**<br>*Paper lineage — Bridge; Modern Core* | Required Core | S3 | **Papers:** [P011 — An Image Is Worth 16×16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)<br>**Resources:** R011, R012 | Shows patch-tokenized Transformers can become strong visual backbones under large-scale pretraining. | Method/evidence reconstruction; limitation: Data-hungry relative to convolutional baselines; limited dense prediction analysis. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S4 | **Papers:** P009, P010, P011<br>**Resources:** R011, R012, R014, R027 | Build a shape- and equation-level comparison of ResNet, Transformer/ViT, S4, and Mamba blocks. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S6. |
| 6 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S5; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R011, R012, R014, R027 | Implement minimal residual, attention, and selective-state-space blocks; profile sequence-length scaling and verify masking/state behavior. | Implement minimal residual, attention, and selective-state-space blocks; profile sequence-length scaling and verify masking/state behavior. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S7. |
| 7 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S6; F1 and D2 | **Papers:** —<br>**Resources:** R011, R012, R014, R027 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S8. |
| 8 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S7 | **Papers:** —<br>**Resources:** R011, R012, R014, R027 | How should architecture choice change for images, language, video, and high-rate robot trajectories? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S9. |
| 9 | **P012 — Efficiently Modeling Long Sequences with Structured State Spaces**<br>*Paper lineage — Optional Specialization; Bridge* | Optional Specialization | S8 | **Papers:** [P012 — Efficiently Modeling Long Sequences with Structured State Spaces](https://arxiv.org/abs/2111.00396)<br>**Resources:** R011, R012 | Introduces S4, a structured state-space sequence model for long contexts. | Method/evidence reconstruction; limitation: Complex implementation and limited direct robotics evidence. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S10. |
| 10 | **P013 — Mamba: Linear-Time Sequence Modeling with Selective State Spaces**<br>*Paper lineage — Modern Core; Optional* | Optional Specialization | S9 | **Papers:** [P013 — Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752)<br>**Resources:** R011, R012 | Introduces input-dependent selective state-space models with linear-time sequence processing. | Method/evidence reconstruction; limitation: Early robotics evidence remains limited relative to Transformer baselines. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S11. |
| 11 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S8; S9–S10 | **Papers:** P012, P013<br>**Resources:** R011, R012, R014, R027 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F2. |
| Closely related / cross-area | Supports P1–P4, E1–E3, L6, and E2. |
| Outgoing capability | F4–F5, P1–P4, L6, E1–E3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P009, P010, P011, P012, P013 | Complete |
| Supporting resources | R011, R012, R014, R027 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **How should architecture choice change for images, language, video, and high-rate robot trajectories?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to F4–F5, P1–P4, L6, E1–E3 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P009, P010, P011, P012, P013. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
