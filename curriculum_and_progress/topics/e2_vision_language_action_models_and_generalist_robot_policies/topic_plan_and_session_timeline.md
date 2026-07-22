# E2 — Vision-language-action models and generalist robot policies: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **E2** |
| Area | E. Language, multimodality, and embodied reasoning |
| Execution status | **Active Research Track** |
| Covers | Cross-embodiment pretraining, VLM-to-action adaptation, discrete versus continuous actions, action experts, heterogeneous co-training, and policy adaptation. |
| Excludes | It excludes company demonstrations without inspectable methods from the durable core and treats E3 agentic/self-improving systems separately. |
| Target competence | Reconstruct modern generalist policy stacks, compare data mixtures and action representations, adapt an open VLA, and critically evaluate claims of cross-task/embodiment generalization. |
| Curriculum role | Primary generalist-policy track. Major synthesis point, not the sole curriculum organizer. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **14** |
| Classification | Required Core: 9 · Frontier Continuation: 5 |
| Required Core endpoint | **S9** |
| Completion boundary | Complete S1–S9 for Required Core. Continue through Frontier Continuation only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | P1–P4, L3–L6, D1–D4, E1. | Before S1 or the first dependent session |
| Topic-local foundation | VLM backbones, robot co-training, embodiment/action normalization, discrete tokens versus continuous experts, cross-attention, flow/diffusion heads, adaptation, and evaluation protocols. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R014 | [Stanford CS224n](https://web.stanford.edu/class/cs224n/) | Lecture notes | Transformer, language-model, and alignment prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14 |
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14 |
| R022 | [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) | Research essay | Short framing resource for scale-versus-hand-engineering debates; not a primary scientific result. | S1, S6, S7, S8, S9, S14 |
| R023 | [A Survey of Vision-Language-Action Models for Robotics: Towards Real-World Applications](https://arxiv.org/abs/2510.07077) | Survey | Current full-stack map of VLA architectures, data, hardware, and evaluation; use for navigation, not as a replacement for primary papers. | S1, S6, S7, S8, S9, S14 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | P1–P4, L3–L6, D1–D4, E1. | S1 |
| D1 | Topic-local foundation | VLM backbones, robot co-training, embodiment/action normalization, discrete tokens versus continuous experts, cross-attention, flow/diffusion heads, adaptation, and evaluation protocols. | Required Core papers |
| D2 | Required Core paper lineage | P150 → P151 → P152 → P157 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which capabilities come from architecture, internet pretraining, robot data scale, embodiment normalization, or evaluation design? | E3, D4, S1–S4 |
| D7 | Frontier branch | P153 → P154 → P155 → P156 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — VLM backbones, robot co-training, embodiment/action normalization**<br>*Foundations and boundary confirmation* | Required Core | P1–P4, L3–L6, D1–D4, E1. | **Papers:** —<br>**Resources:** R014, R017, R022, R023 | VLM backbones, robot co-training, embodiment/action normalization, discrete tokens versus continuous experts, cross-attention, flow/diffusion heads, adaptation, and evaluation protocols. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P150 — RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control**<br>*Paper lineage — Seminal; Bridge* | Required Core | S1 | **Papers:** [P150 — RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818)<br>**Resources:** R014, R017 | Co-trains web-scale vision-language tasks and robot actions represented as tokens. | Method/evidence reconstruction; limitation: Closed models/data and limited reproducibility; tokenized actions and evaluation scope require scrutiny. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P151 — Octo: An Open-Source Generalist Robot Policy**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P151 — Octo: An Open-Source Generalist Robot Policy](https://arxiv.org/abs/2405.12213)<br>**Resources:** R014, R017 | Trains an open generalist policy on heterogeneous Open X data with adaptable observation/action heads. | Method/evidence reconstruction; limitation: Smaller scale and weaker semantics than VLM-backed VLAs; benchmark sensitivity. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P152 — OpenVLA: An Open-Source Vision-Language-Action Model**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P152 — OpenVLA: An Open-Source Vision-Language-Action Model](https://proceedings.mlr.press/v270/kim25c.html)<br>**Resources:** R014, R017 | Adapts a pretrained VLM into an open 7B action-token policy trained on Open X-Embodiment. | Method/evidence reconstruction; limitation: Large inference cost, discrete actions, and benchmark-specific fine-tuning; data mixture quality matters. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P157 — What Matters in Building Vision–Language–Action Models for Generalist Robots**<br>*Paper lineage — Critical; Modern Core* | Required Core | S4 | **Papers:** [P157 — What Matters in Building Vision–Language–Action Models for Generalist Robots](https://www.nature.com/articles/s42256-025-01168-7)<br>**Resources:** R014, R017 | Systematically studies VLM backbone, policy architecture, and cross-embodiment data across hundreds of experiments. | Method/evidence reconstruction; limitation: Results remain tied to selected backbones, tasks, and training recipes. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S5 | **Papers:** P150, P151, P152, P157<br>**Resources:** R014, R017, R022, R023 | Compare RT-2, Open X/RT-X, Octo, OpenVLA, π0, π0.5, GR00T N1, and empirical VLA design studies across data, architecture, action, compute, and evidence. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S6; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R014, R017, R022, R023 | Fine-tune or evaluate an accessible VLA/generalist policy on a small dataset; benchmark against non-VLA baselines and analyze latency, data, and failure slices. | Fine-tune or evaluate an accessible VLA/generalist policy on a small dataset; benchmark against non-VLA baselines and analyze latency, data, and failure slices. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S7; F1 and D2 | **Papers:** —<br>**Resources:** R014, R017, R022, R023 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S9. |
| 9 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S8 | **Papers:** —<br>**Resources:** R014, R017, R022, R023 | Which capabilities come from architecture, internet pretraining, robot data scale, embodiment normalization, or evaluation design? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S10. |
| 10 | **P153 — π0: A Vision-Language-Action Flow Model for General Robot Control**<br>*Paper lineage — Modern Core; Frontier Bridge* | Frontier Continuation | S9 | **Papers:** [P153 — π0: A Vision-Language-Action Flow Model for General Robot Control](https://www.pi.website/download/pi0.pdf)<br>**Resources:** R014, R017 | Adds a continuous flow-matching action expert to a pretrained VLM and trains across multiple embodiments and dexterous tasks. | Method/evidence reconstruction; limitation: Most data and full training stack are proprietary; comparisons occur on internal tasks. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S11. |
| 11 | **P154 — π0.5: A Vision-Language-Action Model with Open-World Generalization**<br>*Paper lineage — Modern Core; Frontier* | Frontier Continuation | S10 | **Papers:** [P154 — π0.5: A Vision-Language-Action Model with Open-World Generalization](https://proceedings.mlr.press/v305/black25a.html)<br>**Resources:** R014, R017 | Uses heterogeneous co-training and high-level semantic prediction for long-horizon manipulation in unseen homes. | Method/evidence reconstruction; limitation: Private data, internal evaluation, and limited independent reproduction remain major caveats. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S12. |
| 12 | **P155 — GR00T N1: An Open Foundation Model for Generalist Humanoid Robots**<br>*Paper lineage — Modern Core; Frontier* | Frontier Continuation | S11 | **Papers:** [P155 — GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734)<br>**Resources:** R014, R017 | Combines a vision-language module with a diffusion/flow-style action module for cross-embodiment humanoid control. | Method/evidence reconstruction; limitation: Evaluation, data mixture, and hardware scope are organization-specific; full training reproduction is expensive. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S13. |
| 13 | **P156 — Gemini Robotics: Bringing AI into the Physical World**<br>*Paper lineage — Frontier; Synthesis* | Frontier Continuation | S12 | **Papers:** [P156 — Gemini Robotics: Bringing AI into the Physical World](https://arxiv.org/abs/2503.20020)<br>**Resources:** R014, R017 | Presents a Gemini-derived VLA and separate embodied-reasoning model across multiple robot embodiments. | Method/evidence reconstruction; limitation: Private preview, proprietary data, and limited independent reproduction. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S14. |
| 14 | **Frontier synthesis and promotion review**<br>*Frontier synthesis and promotion review* | Frontier Continuation | S9; S10–S13 | **Papers:** P153, P154, P155, P156<br>**Resources:** R014, R017, R022, R023 | Assess whether the frontier results are reproducible, materially consequential, and mature enough to alter the durable topic sequence. | Compare claims, accessibility, independent evidence, compute/data requirements, failure cases, and promotion criteria. | Decide whether each frontier item remains on watch, becomes an active experiment, or is promoted into the durable curriculum.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | P1–P4, L3–L6, D1–D4, E1. |
| Closely related / cross-area | Major synthesis point, not the sole curriculum organizer. |
| Outgoing capability | E3, D4, S1–S4 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P150, P151, P152, P157, P153, P154, P155, P156 | Complete |
| Supporting resources | R014, R017, R022, R023 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which capabilities come from architecture, internet pretraining, robot data scale, embodiment normalization, or evaluation design?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to E3, D4, S1–S4 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P150, P151, P152, P157, P153, P154, P155, P156. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
