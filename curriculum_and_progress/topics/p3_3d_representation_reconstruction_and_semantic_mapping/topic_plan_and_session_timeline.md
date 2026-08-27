# P3 — 3D representation, reconstruction, and semantic mapping: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **P3** |
| Area | B. Perception, spatial intelligence, and world models |
| Execution status | **Active Research Track** |
| Covers | Point sets, implicit fields, radiance fields, Gaussian splats, open-vocabulary 3D features, and semantic maps. |
| Excludes | It excludes classical multi-view geometry in full depth and does not treat rendering quality as the final objective. |
| Target competence | Reason across point, implicit, radiance-field, Gaussian, and semantic-map representations; select representations for mapping, planning, manipulation, and simulation. |
| Curriculum role | Spatial-intelligence track. Connects perception to planning, manipulation, simulation, and world models. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **12** |
| Classification | Required Core: 12 |
| Required Core endpoint | **S12** |
| Completion boundary | Complete S1–S12. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | P1, F8. | Before S1 or the first dependent session |
| Topic-local foundation | Coordinate frames, camera geometry, point sets, occupancy/SDFs, volume rendering, splats, feature fields, map fusion, and pose dependence. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R008 | [Probabilistic Robotics](https://mitpress.mit.edu/9780262201629/probabilistic-robotics/) | Textbook | Bayesian filtering, localization, mapping, and SLAM foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R013 | [Stanford CS231n](https://cs231n.github.io/) | Lecture notes | Targeted computer-vision and optimization foundation. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 |
| R019 | [ManiSkill Documentation](https://maniskill.readthedocs.io/) | Simulation/benchmark documentation | High-throughput manipulation experiments and standardized evaluation. | S1, S9, S10, S11, S12 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S9, S10, S11, S12 |
| R028 | [MIT Robotic Manipulation: Perception, Planning, and Control](https://manipulation.mit.edu/) | Supporting resource | Integrated manipulation stack connecting geometry, perception, planning, contact, control, and learning. | S1, S9, S10, S11, S12 |
| R039 | [NVIDIA Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) | Official simulation documentation | Scene construction, physics and sensor simulation, ROS 2 integration, synthetic data generation, software-/hardware-in-the-loop evaluation, and simulator profiling. | S1, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | P1, F8. | S1 |
| D1 | Topic-local foundation | Coordinate frames, camera geometry, point sets, occupancy/SDFs, volume rendering, splats, feature fields, map fusion, and pose dependence. | Required Core papers |
| D2 | Required Core paper lineage | P054 → P055 → P056 → P057 → P058 → P059 → P060 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Which 3D representation preserves the information needed for action, not merely view synthesis? | P5, D5, E1, S1, S4–S5 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Coordinate frames, camera geometry, point sets**<br>*Foundations and boundary confirmation* | Required Core | P1, F8. | **Papers:** —<br>**Resources:** R008, R013, R019, R021, R028, R039 | Coordinate frames, camera geometry, point sets, occupancy/SDFs, volume rendering, splats, feature fields, map fusion, and pose dependence. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P054 — PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P054 — PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation](https://openaccess.thecvf.com/content_cvpr_2017/html/Qi_PointNet_Deep_Learning_CVPR_2017_paper.html)<br>**Resources:** R008, R013 | Introduces permutation-invariant direct learning over point sets. | Method/evidence reconstruction; limitation: Weak local-geometry modeling motivates PointNet++. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P055 — PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space**<br>*Paper lineage — Bridge; Modern Core* | Required Core | S2 | **Papers:** [P055 — PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space](https://arxiv.org/abs/1706.02413)<br>**Resources:** R008, R013 | Adds hierarchical neighborhood aggregation and multi-scale geometry. | Method/evidence reconstruction; limitation: Neighborhood sampling and density variation remain costly/sensitive. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P056 — Point Transformer**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P056 — Point Transformer](https://openaccess.thecvf.com/content/ICCV2021/html/Zhao_Point_Transformer_ICCV_2021_paper.html)<br>**Resources:** R008, R013 | Adapts vector attention to local point-cloud processing. | Method/evidence reconstruction; limitation: Compute/memory cost and sparse neighborhood design matter. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P057 — Occupancy Networks: Learning 3D Reconstruction in Function Space**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P057 — Occupancy Networks: Learning 3D Reconstruction in Function Space](https://openaccess.thecvf.com/content_CVPR_2019/html/Mescheder_Occupancy_Networks_Learning_3D_Reconstruction_in_Function_Space_CVPR_2019_paper.html)<br>**Resources:** R008, R013 | Represents 3D geometry as a continuous learned occupancy function. | Method/evidence reconstruction; limitation: Static object-centric setting; extracting meshes and high-frequency detail can be costly. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P058 — NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis**<br>*Paper lineage — Seminal; Bridge* | Required Core | S5 | **Papers:** P058<br>**Resources:** R008, R013 | Represents scenes as continuous density and radiance fields optimized through differentiable rendering. | Method/evidence reconstruction; limitation: Slow optimization/rendering in original form; static-scene and calibrated-camera assumptions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P059 — 3D Gaussian Splatting for Real-Time Radiance Field Rendering**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P059 — 3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)<br>**Resources:** R008, R013 | Uses anisotropic 3D Gaussians and differentiable splatting for high-quality real-time rendering. | Method/evidence reconstruction; limitation: Geometry can be noisy; dynamic scenes, relighting, and physical semantics require extensions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **P060 — ConceptFusion: Open-set Multimodal 3D Mapping**<br>*Paper lineage — Modern Core* | Required Core | S7 | **Papers:** [P060 — ConceptFusion: Open-set Multimodal 3D Mapping](https://arxiv.org/abs/2302.07241)<br>**Resources:** R008, R013 | Fuses open-vocabulary 2D features into queryable 3D maps. | Method/evidence reconstruction; limitation: Feature projection inherits 2D encoder and pose-estimation errors. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S9. |
| 9 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S8 | **Papers:** P054, P055, P056, P057, P058, P059, P060<br>**Resources:** R008, R013, R019, R021, R028 | Compare PointNet-family, occupancy fields, NeRF, 3DGS, and ConceptFusion by representation, supervision, rendering, update cost, semantics, and geometry fidelity. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S10. |
| 10 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S9; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R008, R013, R019, R021, R028, R039 | Reconstruct a small scene with point/implicit or Gaussian methods and build a semantic query layer; evaluate geometry, pose sensitivity, latency, and downstream utility. When Isaac Sim or Isaac Lab is used, record platform version, physics backend, rates, sensors/rendering, and repeated-run behavior. | Reconstruct a small scene with point/implicit or Gaussian methods and build a semantic query layer; evaluate geometry, pose sensitivity, latency, and downstream utility. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S11. |
| 11 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S10; F1 and D2 | **Papers:** —<br>**Resources:** R008, R013, R019, R021, R028, R039 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. Include simulator fidelity, throughput, determinism, and version sensitivity. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S12. |
| 12 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S11 | **Papers:** —<br>**Resources:** R008, R013, R019, R021, R028 | Which 3D representation preserves the information needed for action, not merely view synthesis? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | P1, F8. |
| Closely related / cross-area | Connects perception to planning, manipulation, simulation, and world models. |
| Outgoing capability | P5, D5, E1, S1, S4–S5 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P054, P055, P056, P057, P058, P059, P060 | Complete |
| Supporting resources | R008, R013, R019, R021, R028, R039 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which 3D representation preserves the information needed for action, not merely view synthesis?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P5, D5, E1, S1, S4–S5 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P054, P055, P056, P057, P058, P059, P060. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | R039 — NVIDIA Isaac Sim Documentation |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-4F563144-0A25-5ABD-A3C2-6B279908DE87` | `P3-S01` | 1 | Foundations — Coordinate frames, camera geometry, point sets |
| `SES-F83669FC-60B4-582F-A9D5-79AC19DFBA84` | `P3-S02` | 2 | P054 — PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation |
| `SES-3582E302-E23C-5A0A-B173-00AC98291AC2` | `P3-S03` | 3 | P055 — PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space |
| `SES-35AA73B0-6F08-58B2-B702-BE2B08F85DA1` | `P3-S04` | 4 | P056 — Point Transformer |
| `SES-B0CB4A8C-99C9-52AD-A61B-4625E0B3586B` | `P3-S05` | 5 | P057 — Occupancy Networks: Learning 3D Reconstruction in Function Space |
| `SES-A046A2FC-8A60-5282-87F2-232BAC5D0912` | `P3-S06` | 6 | P058 — NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis |
| `SES-8D1D900D-A3C9-5DF2-AFB1-2D7EF3999D2A` | `P3-S07` | 7 | P059 — 3D Gaussian Splatting for Real-Time Radiance Field Rendering |
| `SES-F9DA909B-2B5F-55E9-A81D-595281BA0BDB` | `P3-S08` | 8 | P060 — ConceptFusion: Open-set Multimodal 3D Mapping |
| `SES-2E6097E7-5357-5FC4-BE81-CCE1F54CC83F` | `P3-S09` | 9 | Unified reconstruction and method comparison |
| `SES-D7B914A4-7198-5860-97D4-00AF14AA4121` | `P3-S10` | 10 | Controlled implementation and evaluation |
| `SES-90ABDF80-0E8F-5A26-8959-24FD3BEE4E55` | `P3-S11` | 11 | Evidence, limitations, and system interpretation |
| `SES-278BEB03-AE6B-50CB-AEE5-0401C7D187A3` | `P3-S12` | 12 | Synthesis and research directions |
