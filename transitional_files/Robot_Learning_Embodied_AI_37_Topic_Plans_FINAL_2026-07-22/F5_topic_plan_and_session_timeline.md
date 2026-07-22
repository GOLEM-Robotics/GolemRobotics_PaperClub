# F5 — Foundation-model training, post-training, and adaptation: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F5** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Scaling laws, data–compute tradeoffs, instruction tuning, preference optimization, parameter-efficient adaptation, quantization, and multimodal alignment. |
| Excludes | It does not attempt frontier-scale pretraining; it targets reconstructable small-model experiments and systems understanding. |
| Target competence | Understand and reproduce the complete lifecycle of a small language/multimodal model: data, scaling, architecture, training, instruction tuning, preference optimization, PEFT, quantization, and evaluation. |
| Curriculum role | Complete model lifecycle at a level relevant to embodied systems. Direct prerequisite for E1–E3 and D4; useful for P1. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **13** |
| Classification | Required Core: 13 |
| Required Core endpoint | **S13** |
| Completion boundary | Complete S1–S13. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F2–F4. | Before S1 or the first dependent session |
| Topic-local foundation | Tokenization, data mixtures, compute accounting, scaling laws, supervised fine-tuning, preference data, KL control, low-rank adaptation, quantization error, and multimodal connectors. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R012 | [Dive into Deep Learning](https://d2l.ai/) | Interactive open textbook | Implementation-oriented prerequisite repair for uneven member backgrounds. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13 |
| R014 | [Stanford CS224n](https://web.stanford.edu/class/cs224n/) | Lecture notes | Transformer, language-model, and alignment prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13 |
| R015 | [Full Stack Deep Learning](https://fullstackdeeplearning.com/) | Course | Experiment management, deployment, testing, data, and production ML systems. | S1, S10, S11, S12, S13 |
| R016 | [Machine Learning Systems](https://mlsysbook.ai/) | Open textbook | Hardware-aware training and inference support; use current online version. | S1, S10, S11, S12, S13 |
| R022 | [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) | Research essay | Short framing resource for scale-versus-hand-engineering debates; not a primary scientific result. | S1, S10, S11, S12, S13 |
| R027 | [Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) | Supporting resource | End-to-end reconstruction of tokenization, Transformer training, systems optimization, scaling, data preparation, evaluation, and post-training. | S1, S10, S11, S12, S13 |
| R033 | [PyTorch Distributed and Distributed Checkpoint Documentation](https://docs.pytorch.org/tutorials/distributed.html) | Supporting resource | DDP/FSDP/tensor parallelism, distributed checkpointing, recovery, profiling, and topology-aware training experiments. | S1, S10, S11, S12, S13 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F2–F4. | S1 |
| D1 | Topic-local foundation | Tokenization, data mixtures, compute accounting, scaling laws, supervised fine-tuning, preference data, KL control, low-rank adaptation, quantization error, and multimodal connectors. | Required Core papers |
| D2 | Required Core paper lineage | P020 → P021 → P022 → P023 → P024 → P025 → P026 → P027 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which foundation-model competencies are genuinely necessary to investigate embodied systems rather than merely consume APIs? | P1, D3–D4, E1–E3 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Tokenization, data mixtures, compute accounting**<br>*Foundations and boundary confirmation* | Required Core | F2–F4. | **Papers:** —<br>**Resources:** R012, R014, R015, R016, R022, R027, R033 | Tokenization, data mixtures, compute accounting, scaling laws, supervised fine-tuning, preference data, KL control, low-rank adaptation, quantization error, and multimodal connectors. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P020 — Scaling Laws for Neural Language Models**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P020 — Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)<br>**Resources:** R012, R014 | Documents power-law relationships among model size, data, compute, and loss. | Method/evidence reconstruction; limitation: Language-domain results do not transfer mechanically to robot policies. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P021 — Training Compute-Optimal Large Language Models**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P021 — Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)<br>**Resources:** R012, R014 | Shows many large models were undertrained and derives compute-optimal data/model tradeoffs. | Method/evidence reconstruction; limitation: Derived from language modeling; data quality and multimodality complicate transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P022 — Training Language Models to Follow Instructions with Human Feedback**<br>*Paper lineage — Bridge; Modern Core* | Required Core | S3 | **Papers:** [P022 — Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155)<br>**Resources:** R012, R014 | Establishes a practical supervised-plus-RLHF post-training pipeline. | Method/evidence reconstruction; limitation: Proprietary data/model; annotator preferences and reward hacking remain concerns. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P023 — LoRA: Low-Rank Adaptation of Large Language Models**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P023 — LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)<br>**Resources:** R012, R014 | Introduces low-rank parameter updates for efficient model adaptation. | Method/evidence reconstruction; limitation: Rank/module choices can bottleneck large domain shifts. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P024 — QLoRA: Efficient Finetuning of Quantized LLMs**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P024 — QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)<br>**Resources:** R012, R014 | Combines 4-bit quantization with LoRA to reduce fine-tuning memory. | Method/evidence reconstruction; limitation: Quality and throughput depend on kernels, quantizer, and hardware; primarily language evidence. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P025 — Direct Preference Optimization: Your Language Model is Secretly a Reward Model**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P025 — Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290)<br>**Resources:** R012, R014 | Recasts preference alignment as a direct classification-like objective without explicit reward-model RL. | Method/evidence reconstruction; limitation: Offline preference datasets can encode bias; not a substitute for closed-loop safety evaluation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **P026 — Flamingo: a Visual Language Model for Few-Shot Learning**<br>*Paper lineage — Bridge* | Required Core | S7 | **Papers:** [P026 — Flamingo: a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198)<br>**Resources:** R012, R014 | Introduces cross-attention-based multimodal conditioning with frozen vision/language components. | Method/evidence reconstruction; limitation: Closed model/data and expensive training limit reproduction. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S9. |
| 9 | **P027 — BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models**<br>*Paper lineage — Modern Core* | Required Core | S8 | **Papers:** [P027 — BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models](https://arxiv.org/abs/2301.12597)<br>**Resources:** R012, R014 | Uses a lightweight query transformer to connect frozen vision and language models. | Method/evidence reconstruction; limitation: Image-centric and not designed for real-time control. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S10. |
| 10 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S9 | **Papers:** P020, P021, P022, P023, P024, P025, P026, P027<br>**Resources:** R012, R014, R015, R016, R022, R027, R033 | Reconstruct the training and adaptation stack, separating data, objective, architecture, systems, and evaluation effects. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S11. |
| 11 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S10; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R012, R014, R015, R016, R022, R027, R033 | Train a small LM or multimodal adapter, fit a limited scaling curve, then compare full fine-tuning, LoRA/QLoRA, and preference tuning under fixed resources. | Train a small LM or multimodal adapter, fit a limited scaling curve, then compare full fine-tuning, LoRA/QLoRA, and preference tuning under fixed resources. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S12. |
| 12 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S11; F1 and D2 | **Papers:** —<br>**Resources:** R012, R014, R015, R016, R022, R027, R033 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S13. |
| 13 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S12 | **Papers:** —<br>**Resources:** R012, R014, R015, R016, R022, R027, R033 | Which foundation-model competencies are genuinely necessary to investigate embodied systems rather than merely consume APIs? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F2–F4. |
| Closely related / cross-area | Direct prerequisite for E1–E3 and D4; useful for P1. |
| Outgoing capability | P1, D3–D4, E1–E3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P020, P021, P022, P023, P024, P025, P026, P027 | Complete |
| Supporting resources | R012, R014, R015, R016, R022, R027, R033 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which foundation-model competencies are genuinely necessary to investigate embodied systems rather than merely consume APIs?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P1, D3–D4, E1–E3 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P020, P021, P022, P023, P024, P025, P026, P027. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
