# D1 — Robot-data collection, teleoperation, and dataset construction: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **D1** |
| Area | D. Data, evaluation, and research systems |
| Execution status | **Active Research Track** |
| Covers | Teleoperation interfaces, synchronization, action-space normalization, multi-embodiment schemas, quality control, human video, and data scaling. |
| Excludes | It excludes policy architecture details except where they impose data-schema requirements. |
| Target competence | Design synchronized, versioned, auditable robot datasets and teleoperation systems; reason about operator/task/environment/embodiment diversity and scaling. |
| Curriculum role | Data-engineering and collection track. Feeds L4, L6, E2, S1–S3, and D5. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **11** |
| Classification | Required Core: 11 |
| Required Core endpoint | **S11** |
| Completion boundary | Complete S1–S11. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | L3, F8. | Before S1 or the first dependent session |
| Topic-local foundation | Observation/action schemas, clocks and synchronization, calibration, teleoperation mappings, episode segmentation, quality flags, provenance, normalization, splits, and privacy/safety. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | L3, F8. | S1 |
| D1 | Topic-local foundation | Observation/action schemas, clocks and synchronization, calibration, teleoperation mappings, episode segmentation, quality flags, provenance, normalization, splits, and privacy/safety. | Required Core papers |
| D2 | Required Core paper lineage | P117 → P118 → P119 → P120 → P121 → P122 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which data diversity and quality dimensions produce reusable policy capability rather than more redundant trajectories? | L4, L6, D5, E2, S1–S3 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Observation/action schemas, clocks and synchronization, calibration**<br>*Foundations and boundary confirmation* | Required Core | L3, F8. | **Papers:** —<br>**Resources:** R017, R018 | Observation/action schemas, clocks and synchronization, calibration, teleoperation mappings, episode segmentation, quality flags, provenance, normalization, splits, and privacy/safety. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P117 — RoboNet: Large-Scale Multi-Robot Learning**<br>*Paper lineage — Foundation* | Required Core | S1 | **Papers:** [P117 — RoboNet: Large-Scale Multi-Robot Learning](https://arxiv.org/abs/1910.11215)<br>**Resources:** R017, R018 | Introduces a multi-institution, multi-robot dataset and cross-platform predictive learning. | Method/evidence reconstruction; limitation: Heterogeneous quality and limited action semantics compared with newer datasets. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P118 — BridgeData V2: A Dataset for Robot Learning at Scale**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P118 — BridgeData V2: A Dataset for Robot Learning at Scale](https://arxiv.org/abs/2308.12952)<br>**Resources:** R017, R018 | Provides a large, diverse, language-labeled manipulation dataset collected across environments. | Method/evidence reconstruction; limitation: Concentrated embodiment and data-collection protocol; quality variation remains. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P119 — Open X-Embodiment: Robotic Learning Datasets and RT-X Models**<br>*Paper lineage — Seminal; Modern Core* | Required Core | S3 | **Papers:** [P119 — Open X-Embodiment: Robotic Learning Datasets and RT-X Models](https://arxiv.org/abs/2310.08864)<br>**Resources:** R017, R018 | Standardizes and mixes many robot datasets across embodiments and trains RT-X policies. | Method/evidence reconstruction; limitation: Action/observation heterogeneity, inconsistent labels, and benchmark leakage complicate conclusions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P120 — DROID: A Large-Scale In-the-Wild Robot Manipulation Dataset**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P120 — DROID: A Large-Scale In-the-Wild Robot Manipulation Dataset](https://arxiv.org/abs/2403.12945)<br>**Resources:** R017, R018 | Collects diverse real-world manipulation data across many institutions, scenes, operators, and tasks. | Method/evidence reconstruction; limitation: Single primary robot setup and teleoperation style; language/action quality vary. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P121 — Mobile ALOHA: Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation**<br>*Paper lineage — Modern Core; Bridge* | Required Core | S5 | **Papers:** [P121 — Mobile ALOHA: Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation](https://arxiv.org/abs/2401.02117)<br>**Resources:** R017, R018 | Extends low-cost ALOHA teleoperation and ACT to mobile bimanual whole-body tasks. | Method/evidence reconstruction; limitation: Platform-specific and demonstration-intensive. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P122 — Data Scaling Laws in Imitation Learning for Robotic Manipulation**<br>*Paper lineage — Modern Core; Critical* | Required Core | S6 | **Papers:** [P122 — Data Scaling Laws in Imitation Learning for Robotic Manipulation](https://proceedings.iclr.cc/paper_files/paper/2025/hash/88b7b2c896506daabc8d3fd587055167-Abstract-Conference.html)<br>**Resources:** R017, R018 | Measures how environments, objects, and demonstrations affect real-world generalization at substantial scale. | Method/evidence reconstruction; limitation: Task and platform scope limit universal extrapolation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P117, P118, P119, P120, P121, P122<br>**Resources:** R017, R018 | Compare RoboNet, BridgeData V2, Open X-Embodiment, DROID, Mobile ALOHA, and data-scaling evidence as data-system designs. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R017, R018 | Specify and implement a small dataset pipeline with capture, synchronization, validation, versioning, conversion, and quality dashboards. | Specify and implement a small dataset pipeline with capture, synchronization, validation, versioning, conversion, and quality dashboards. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R017, R018 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R017, R018 | Which data diversity and quality dimensions produce reusable policy capability rather than more redundant trajectories? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | L3, F8. |
| Closely related / cross-area | Feeds L4, L6, E2, S1–S3, and D5. |
| Outgoing capability | L4, L6, D5, E2, S1–S3 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P117, P118, P119, P120, P121, P122 | Complete |
| Supporting resources | R017, R018 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which data diversity and quality dimensions produce reusable policy capability rather than more redundant trajectories?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to L4, L6, D5, E2, S1–S3 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P117, P118, P119, P120, P121, P122. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
