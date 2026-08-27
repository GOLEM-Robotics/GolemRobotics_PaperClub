# P2 — Detection, segmentation, grounding, and tracking: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **P2** |
| Area | B. Perception, spatial intelligence, and world models |
| Execution status | **Active Research Track** |
| Covers | Set-based detection, instance and promptable segmentation, open-vocabulary grounding, and temporal object tracking. |
| Excludes | It excludes full 3D reconstruction and policy learning; models are studied as perception and data-engineering components. |
| Target competence | Construct and evaluate detection, grounding, promptable segmentation, and temporal tracking pipelines, including open-vocabulary and annotation-use cases. |
| Curriculum role | Executable perception and data-processing track. Supports automated labeling in D1, semantic planning in E1, and manipulation in S1. |
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
| Other topic timelines | P1. | Before S1 or the first dependent session |
| Topic-local foundation | Boxes, masks, set prediction, matching, prompt encodings, open-vocabulary alignment, temporal memory, identity persistence, and calibration. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R013 | [Stanford CS231n](https://cs231n.github.io/) | Lecture notes | Targeted computer-vision and optimization foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S8, S9, S12 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | P1. | S1 |
| D1 | Topic-local foundation | Boxes, masks, set prediction, matching, prompt encodings, open-vocabulary alignment, temporal memory, identity persistence, and calibration. | Required Core papers |
| D2 | Required Core paper lineage | P048 → P049 → P050 → P051 → P052 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | When can foundation perception models generate trustworthy robot-training labels, and where is verification mandatory? | D1, E1, S1 |
| D6 | Optional branch | P053 | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Boxes, masks, set prediction**<br>*Foundations and boundary confirmation* | Required Core | P1. | **Papers:** —<br>**Resources:** R013, R017, R039 | Boxes, masks, set prediction, matching, prompt encodings, open-vocabulary alignment, temporal memory, identity persistence, and calibration. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P048 — Mask R-CNN**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P048 — Mask R-CNN](https://openaccess.thecvf.com/content_iccv_2017/html/He_Mask_R-CNN_ICCV_2017_paper.html)<br>**Resources:** R013, R017 | Extends two-stage detection with instance masks and aligned region features. | Method/evidence reconstruction; limitation: Closed-set categories and proposal pipeline limit open-world use. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P049 — End-to-End Object Detection with Transformers**<br>*Paper lineage — Bridge; Modern Core* | Required Core | S2 | **Papers:** [P049 — End-to-End Object Detection with Transformers](https://arxiv.org/abs/2005.12872)<br>**Resources:** R013, R017 | Recasts detection as set prediction using bipartite matching and Transformers. | Method/evidence reconstruction; limitation: Original DETR converges slowly and struggles with small objects. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P050 — Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P050 — Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection](https://arxiv.org/abs/2303.05499)<br>**Resources:** R013, R017 | Combines language grounding with Transformer detection for open-set object localization. | Method/evidence reconstruction; limitation: Large pretraining mix and benchmark choices complicate attribution. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P051 — Segment Anything**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P051 — Segment Anything](https://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html)<br>**Resources:** R013, R017 | Introduces promptable segmentation trained on a large mask dataset. | Method/evidence reconstruction; limitation: Masks are not semantic, temporal, or guaranteed physically meaningful. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P052 — SAM 2: Segment Anything in Images and Videos**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P052 — SAM 2: Segment Anything in Images and Videos](https://arxiv.org/abs/2408.00714)<br>**Resources:** R013, R017 | Extends promptable segmentation to streaming video with memory. | Method/evidence reconstruction; limitation: Performance can degrade under occlusion, appearance change, and long sequences. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P048, P049, P050, P051, P052<br>**Resources:** R013, R017 | Trace the transition from region-based detection to set prediction, language grounding, promptable segmentation, and memory-based video tracking. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R013, R017, R039 | Build an annotation pipeline combining Grounding DINO, SAM/SAM2, and tracking; audit precision, recall, temporal consistency, and human correction load. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Build an annotation pipeline combining Grounding DINO, SAM/SAM2, and tracking; audit precision, recall, temporal consistency, and human correction load. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R013, R017, R039 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R013, R017 | When can foundation perception models generate trustworthy robot-training labels, and where is verification mandatory? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S11. |
| 11 | **P053 — XMem: Long-Term Video Object Segmentation with an Atkinson–Shiffrin Memory Model**<br>*Paper lineage — Bridge; Optional* | Optional Specialization | S10 | **Papers:** [P053 — XMem: Long-Term Video Object Segmentation with an Atkinson–Shiffrin Memory Model](https://arxiv.org/abs/2207.07115)<br>**Resources:** R013, R017 | Uses sensory, working, and long-term memory for efficient video object segmentation. | Method/evidence reconstruction; limitation: Requires initial object specification and is not a semantic reasoner. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S12. |
| 12 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S10; S11 | **Papers:** P053<br>**Resources:** R013, R017, R039 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | P1. |
| Closely related / cross-area | Supports automated labeling in D1, semantic planning in E1, and manipulation in S1. |
| Outgoing capability | D1, E1, S1 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P048, P049, P050, P051, P052, P053 | Complete |
| Supporting resources | R013, R017, R039 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **When can foundation perception models generate trustworthy robot-training labels, and where is verification mandatory?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D1, E1, S1 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P048, P049, P050, P051, P052, P053. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
