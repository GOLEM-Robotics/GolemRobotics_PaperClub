# E1 — Language-conditioned robotics, grounding, and task planning: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **E1** |
| Area | E. Language, multimodality, and embodied reasoning |
| Execution status | **Active Research Track** |
| Covers | Affordance grounding, code/program generation, multimodal prompts, object-centric planning, high-level/low-level decomposition, and embodied VLMs. |
| Excludes | It excludes end-to-end continuous VLA training, which belongs to E2, and purely linguistic planning without physical grounding. |
| Target competence | Design and critique language-conditioned robot systems that connect semantic intent to affordances, programs, object-centric states, motion plans, and feedback. |
| Curriculum role | Embodied reasoning lineage before end-to-end VLAs. Bridge from semantic models to E2 and E3. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

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
| Other topic timelines | F3–F5, P1–P3, F7. | Before S1 or the first dependent session |
| Topic-local foundation | Grounding, affordance/value functions, prompt/state representations, code generation, tool APIs, planning hierarchies, object-centric scenes, and execution monitoring. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R014 | [Stanford CS224n](https://web.stanford.edu/class/cs224n/) | Lecture notes | Transformer, language-model, and alignment prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R023 | [Vision-Language-Action Models for Robotics: A Review Towards Real-World Applications](https://arxiv.org/abs/2510.07077) | Survey | Current full-stack map of VLA architectures, data, hardware, and evaluation; use for navigation, not as a replacement for primary papers. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R028 | [MIT Robotic Manipulation: Perception, Planning, and Control](https://manipulation.mit.edu/) | Supporting resource | Integrated manipulation stack connecting geometry, perception, planning, contact, control, and learning. | S1, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F3–F5, P1–P3, F7. | S1 |
| D1 | Topic-local foundation | Grounding, affordance/value functions, prompt/state representations, code generation, tool APIs, planning hierarchies, object-centric scenes, and execution monitoring. | Required Core papers |
| D2 | Required Core paper lineage | P144 → P145 → P146 → P147 → P148 → P149 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | Where should language-model reasoning stop and structured perception, planning, control, and verification begin? | E2–E3, S1, S4, S8 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Grounding, affordance/value functions, prompt/state representations**<br>*Foundations and boundary confirmation* | Required Core | F3–F5, P1–P3, F7. | **Papers:** —<br>**Resources:** R014, R023, R028 | Grounding, affordance/value functions, prompt/state representations, code generation, tool APIs, planning hierarchies, object-centric scenes, and execution monitoring. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P144 — Do As I Can, Not As I Say: Grounding Language in Robotic Affordances**<br>*Paper lineage — Seminal; Bridge* | Required Core | S1 | **Papers:** [P144 — Do As I Can, Not As I Say: Grounding Language in Robotic Affordances](https://arxiv.org/abs/2204.01691)<br>**Resources:** R014, R023 | Introduces SayCan: combines language-model skill likelihood with learned affordance/value estimates. | Method/evidence reconstruction; limitation: Requires a predefined skill library and value functions; language model is not grounded by itself. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P145 — Code as Policies: Language Model Programs for Embodied Control**<br>*Paper lineage — Bridge* | Required Core | S2 | **Papers:** [P145 — Code as Policies: Language Model Programs for Embodied Control](https://arxiv.org/abs/2209.07753)<br>**Resources:** R014, R023 | Uses code-generating language models to compose perception and control APIs. | Method/evidence reconstruction; limitation: Execution safety, API coverage, and hallucinated code are major risks. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P146 — Inner Monologue: Embodied Reasoning through Planning with Language Models**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P146 — Inner Monologue: Embodied Reasoning through Planning with Language Models](https://proceedings.mlr.press/v205/huang23c.html)<br>**Resources:** R014, R023 | Feeds success, scene, and human feedback back into language-model planning loops. | Method/evidence reconstruction; limitation: Relies on external modules and brittle textual state summaries. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P147 — PaLM-E: An Embodied Multimodal Language Model**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P147 — PaLM-E: An Embodied Multimodal Language Model](https://arxiv.org/abs/2303.03378)<br>**Resources:** R014, R023 | Injects continuous sensor and visual embeddings into a language model for embodied reasoning and transfer. | Method/evidence reconstruction; limitation: Large proprietary model/data/compute and mainly high-level outputs. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P148 — VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P148 — VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models](https://arxiv.org/abs/2307.05973)<br>**Resources:** R014, R023 | Uses language models and open-vocabulary perception to compose 3D value maps for motion planning. | Method/evidence reconstruction; limitation: Depends on reliable perception, generated code, and hand-designed value-map interfaces. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P149 — VIMA: General Robot Manipulation with Multimodal Prompts**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P149 — VIMA: General Robot Manipulation with Multimodal Prompts](https://arxiv.org/abs/2210.03094)<br>**Resources:** R014, R023 | Conditions a Transformer policy on interleaved text and image prompts across diverse manipulation tasks. | Method/evidence reconstruction; limitation: Simulation benchmark and discrete task structure limit real-world conclusions. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P144, P145, P146, P147, P148, P149<br>**Resources:** R014, R023, R028 | Trace SayCan, Code as Policies, Inner Monologue, PaLM-E, VoxPoser, and VIMA as alternative semantic-to-action interfaces. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R014, R023, R028 | Build a small language-conditioned planner or code/constraint generator connected to a simulator; evaluate grounding errors, feasibility, recovery, and prompt sensitivity. | Build a small language-conditioned planner or code/constraint generator connected to a simulator; evaluate grounding errors, feasibility, recovery, and prompt sensitivity. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R014, R023, R028 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R014, R023, R028 | Where should language-model reasoning stop and structured perception, planning, control, and verification begin? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F3–F5, P1–P3, F7. |
| Closely related / cross-area | Bridge from semantic models to E2 and E3. |
| Outgoing capability | E2–E3, S1, S4, S8 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P144, P145, P146, P147, P148, P149 | Complete |
| Supporting resources | R014, R023, R028 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Where should language-model reasoning stop and structured perception, planning, control, and verification begin?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to E2–E3, S1, S4, S8 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P144, P145, P146, P147, P148, P149. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-D5B8C90C-C1B5-535A-A138-46EF4E515F1A` | `E1-S01` | 1 | Foundations — Grounding, affordance/value functions, prompt/state representations |
| `SES-51D52C9C-1562-5596-AEE8-0BEC67AFF3E8` | `E1-S02` | 2 | P144 — Do As I Can, Not As I Say: Grounding Language in Robotic Affordances |
| `SES-1E03FB90-0E0A-5978-A66E-AFD2C4DBFC59` | `E1-S03` | 3 | P145 — Code as Policies: Language Model Programs for Embodied Control |
| `SES-A36F9045-84EF-5B87-92BC-38B778F7F4A2` | `E1-S04` | 4 | P146 — Inner Monologue: Embodied Reasoning through Planning with Language Models |
| `SES-47FF29A8-C907-5F1C-A382-B25F41B056C7` | `E1-S05` | 5 | P147 — PaLM-E: An Embodied Multimodal Language Model |
| `SES-E70EBE73-0997-5A3A-90A2-40A2208A70DD` | `E1-S06` | 6 | P148 — VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models |
| `SES-6CE07227-AD68-58F0-B933-D11C27B5449A` | `E1-S07` | 7 | P149 — VIMA: General Robot Manipulation with Multimodal Prompts |
| `SES-022B3191-486E-5EEC-944D-55CF0E6DD5F2` | `E1-S08` | 8 | Unified reconstruction and method comparison |
| `SES-52FBC7CB-4156-5E7C-8E71-D1EFF711C7CC` | `E1-S09` | 9 | Controlled implementation and evaluation |
| `SES-1AC016D0-8D52-54E3-A3E7-33EE5FEB7BF7` | `E1-S10` | 10 | Evidence, limitations, and system interpretation |
| `SES-178D9F08-F797-55E8-BA53-106CD2C98150` | `E1-S11` | 11 | Synthesis and research directions |
