# L6 — Generative action policies and action representations: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **L6** |
| Area | C. Learning to act |
| Execution status | **Active Research Track** |
| Covers | Multimodal action distributions, latent-variable policies, action chunking, autoregressive tokens, diffusion, flow matching, and receding-horizon execution. |
| Excludes | It excludes generic image generation and generalist VLA scaling beyond action representation and policy heads. |
| Target competence | Compare direct regression, latent-variable, chunked autoregressive, diffusion, flow, and tokenized action policies; reason about multimodality, horizons, closed-loop correction, and latency. |
| Curriculum role | Modern core policy architecture track. Direct bridge to E2 and D4. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

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
| Other topic timelines | F3–F4, L3. | Before S1 or the first dependent session |
| Topic-local foundation | Conditional density modeling, multimodal actions, action chunks, temporal ensembling, receding horizon, diffusion/flow sampling, quantization/tokenization, and control frequency. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R018 | [robomimic Documentation](https://robomimic.github.io/) | Documentation and benchmark recipes | Reference implementation for demonstration learning and benchmark audits. | S1, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F3–F4, L3. | S1 |
| D1 | Topic-local foundation | Conditional density modeling, multimodal actions, action chunks, temporal ensembling, receding horizon, diffusion/flow sampling, quantization/tokenization, and control frequency. | Required Core papers |
| D2 | Required Core paper lineage | P102 → P103 → P104 → P105 → P106 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | How should an action distribution be represented when behavior is multimodal but control must remain reactive and real-time? | D4, E2, S1 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Conditional density modeling, multimodal actions, action chunks**<br>*Foundations and boundary confirmation* | Required Core | F3–F4, L3. | **Papers:** —<br>**Resources:** R004, R017, R018 | Conditional density modeling, multimodal actions, action chunks, temporal ensembling, receding horizon, diffusion/flow sampling, quantization/tokenization, and control frequency. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P102 — Behavior Transformers: Cloning k Modes with One Stone**<br>*Paper lineage — Bridge* | Required Core | S1 | **Papers:** [P102 — Behavior Transformers: Cloning k Modes with One Stone](https://arxiv.org/abs/2206.11251)<br>**Resources:** R004, R017 | Introduces BeT, combining discrete behavior modes with continuous residual actions. | Method/evidence reconstruction; limitation: Token clustering and autoregressive errors limit precision/latency. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P103 — Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P103 — Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://arxiv.org/abs/2304.13705)<br>**Resources:** R004, R017 | Introduces ACT: action-chunking Transformer, temporal ensembling, and low-cost ALOHA data collection. | Method/evidence reconstruction; limitation: Task-specific training and fixed observation/action conventions limit generality. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P104 — Diffusion Policy: Visuomotor Policy Learning via Action Diffusion**<br>*Paper lineage — Modern Core* | Required Core | S3 | **Papers:** [P104 — Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](https://arxiv.org/abs/2303.04137)<br>**Resources:** R004, R017 | Models action sequences with conditional diffusion and receding-horizon control. | Method/evidence reconstruction; limitation: Iterative sampling and horizon design create latency/reactivity tradeoffs. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P105 — RT-1: Robotics Transformer for Real-World Control at Scale**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P105 — RT-1: Robotics Transformer for Real-World Control at Scale](https://arxiv.org/abs/2212.06817)<br>**Resources:** R004, R017 | Uses tokenized actions and a Transformer policy trained on a large multi-task real-robot dataset. | Method/evidence reconstruction; limitation: Single-organization data and embodiment; limited open reproduction. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P106 — FAST: Efficient Action Tokenization for Vision-Language-Action Models**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P106 — FAST: Efficient Action Tokenization for Vision-Language-Action Models](https://arxiv.org/abs/2501.09747)<br>**Resources:** R004, R017 | Compresses high-frequency action trajectories into efficient discrete tokens. | Method/evidence reconstruction; limitation: Tokenization quality is embodiment/data dependent; discrete reconstruction errors matter. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S6 | **Papers:** P102, P103, P104, P105, P106<br>**Resources:** R004, R017, R018 | Build a common representation of BeT, ACT, Diffusion Policy, RT-1, and FAST, separating observation encoder, action representation, objective, sampler, and execution loop. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S7; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R004, R017, R018 | Train at least two action-policy families on the same demonstrations and measure rollout success, diversity, smoothness, latency, and sensitivity to chunk/horizon settings. | Train at least two action-policy families on the same demonstrations and measure rollout success, diversity, smoothness, latency, and sensitivity to chunk/horizon settings. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S8; F1 and D2 | **Papers:** —<br>**Resources:** R004, R017, R018 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S9 | **Papers:** —<br>**Resources:** R004, R017, R018 | How should an action distribution be represented when behavior is multimodal but control must remain reactive and real-time? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F3–F4, L3. |
| Closely related / cross-area | Direct bridge to E2 and D4. |
| Outgoing capability | D4, E2, S1 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P102, P103, P104, P105, P106 | Complete |
| Supporting resources | R004, R017, R018 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **How should an action distribution be represented when behavior is multimodal but control must remain reactive and real-time?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D4, E2, S1 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P102, P103, P104, P105, P106. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-E039CC7A-8382-5E0A-976C-C058AD548A91` | `L6-S01` | 1 | Foundations — Conditional density modeling, multimodal actions, action chunks |
| `SES-3A0BD5C4-8D8B-51D2-8ABB-F6783226941E` | `L6-S02` | 2 | P102 — Behavior Transformers: Cloning k Modes with One Stone |
| `SES-892775D4-26C5-55B1-ABA0-4DE2F42718AB` | `L6-S03` | 3 | P103 — Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware |
| `SES-1C366279-86DB-5D3D-A6BB-37440EB7C2D4` | `L6-S04` | 4 | P104 — Diffusion Policy: Visuomotor Policy Learning via Action Diffusion |
| `SES-F6B418CC-0DB0-5B82-877A-F5FF6994015E` | `L6-S05` | 5 | P105 — RT-1: Robotics Transformer for Real-World Control at Scale |
| `SES-9C628F46-4505-5CD6-9C3B-DC8D1DA5B10B` | `L6-S06` | 6 | P106 — FAST: Efficient Action Tokenization for Vision-Language-Action Models |
| `SES-A6861571-8FAD-50BD-808B-2E751637F64D` | `L6-S07` | 7 | Unified reconstruction and method comparison |
| `SES-8E632B9A-6D6F-5E11-AA39-2139A657B7DE` | `L6-S08` | 8 | Controlled implementation and evaluation |
| `SES-1EFDC86B-4041-5BAF-BA88-EFBE920DC9D1` | `L6-S09` | 9 | Evidence, limitations, and system interpretation |
| `SES-F509283C-3537-502A-B1AD-320D209F657D` | `L6-S10` | 10 | Synthesis and research directions |
