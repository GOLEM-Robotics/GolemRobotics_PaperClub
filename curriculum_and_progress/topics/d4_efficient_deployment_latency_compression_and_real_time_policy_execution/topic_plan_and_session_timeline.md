# D4 — Efficient deployment, latency, compression, and real-time policy execution: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **D4** |
| Area | D. Data, evaluation, and research systems |
| Execution status | **Active Research Track** |
| Covers | Action frequency, asynchronous inference, action chunking, token compression, PEFT, quantization, distillation, edge deployment, and closed-loop latency. |
| Excludes | It excludes generic cloud serving and focuses on closed-loop robot inference where latency and timing affect behavior. |
| Target competence | Measure and optimize end-to-end policy latency, jitter, throughput, memory, precision, action buffering, and control-loop stability without hiding accuracy regressions. |
| Curriculum role | Deployment track. Links model design to physical control constraints. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **10** |
| Classification | Required Core: 8 · Optional Specialization: 2 |
| Required Core endpoint | **S8** |
| Completion boundary | Complete S1–S8 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F5, L6, E2. | Before S1 or the first dependent session |
| Topic-local foundation | Latency decomposition, deadlines/jitter, asynchronous pipelines, batching tradeoffs, quantization, distillation, kernel/graph optimization, action chunking, and feedback-loop effects. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R015 | [Full Stack Deep Learning](https://fullstackdeeplearning.com/) | Course | Experiment management, deployment, testing, data, and production ML systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R016 | [Machine Learning Systems](https://mlsysbook.ai/) | Open textbook | Hardware-aware training and inference support; use current online version. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S5, S6, S7, S8, S10 |
| R027 | [Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) | Supporting resource | End-to-end reconstruction of tokenization, Transformer training, systems optimization, scaling, data preparation, evaluation, and post-training. | S1, S5, S6, S7, S8, S10 |
| R030 | [ROS 2 Real-Time Programming Documentation](https://docs.ros.org/en/lyrical/Tutorials/Demos/Real-Time-Programming.html) | Supporting resource | Deadline, jitter, memory-allocation, scheduling, and execution-path constraints for physical robot deployment. | S1, S5, S6, S7, S8, S10 |
| R031 | [NVIDIA TensorRT Documentation](https://docs.nvidia.com/deeplearning/tensorrt/latest/) | Supporting resource | Profiling, graph optimization, precision selection, dynamic shapes, engine construction, and latency/accuracy validation. | S1, S5, S6, S7, S8, S10 |
| R033 | [PyTorch Distributed and Distributed Checkpoint Documentation](https://docs.pytorch.org/tutorials/distributed.html) | Supporting resource | DDP/FSDP/tensor parallelism, distributed checkpointing, recovery, profiling, and topology-aware training experiments. | S1, S5, S6, S7, S8, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F5, L6, E2. | S1 |
| D1 | Topic-local foundation | Latency decomposition, deadlines/jitter, asynchronous pipelines, batching tradeoffs, quantization, distillation, kernel/graph optimization, action chunking, and feedback-loop effects. | Required Core papers |
| D2 | Required Core paper lineage | P135 → P136 → P137 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What deployment envelope preserves policy capability and closed-loop stability on the target robot? | E2, S1, S3 and real-robot deployment |
| D6 | Optional branch | P138 | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Latency decomposition, deadlines/jitter, asynchronous pipelines**<br>*Foundations and boundary confirmation* | Required Core | F5, L6, E2. | **Papers:** —<br>**Resources:** R015, R016, R017, R027, R030, R031, R033 | Latency decomposition, deadlines/jitter, asynchronous pipelines, batching tradeoffs, quantization, distillation, kernel/graph optimization, action chunking, and feedback-loop effects. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P135 — Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success**<br>*Paper lineage — Modern Core* | Required Core | S1 | **Papers:** [P135 — Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success](https://arxiv.org/abs/2502.19645)<br>**Resources:** R015, R016 | Improves OpenVLA fine-tuning and action generation for stronger, faster control. | Method/evidence reconstruction; limitation: Results remain benchmark/platform dependent and inherit backbone cost. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P136 — Real-Time Action Chunking with Large Models**<br>*Paper lineage — Modern Core; Systems* | Required Core | S2 | **Papers:** [P136 — Real-Time Action Chunking with Large Models](https://www.pi.website/research/real_time_chunking)<br>**Resources:** R015, R016 | Decouples slow model inference from fast control through asynchronous chunk prediction and execution. | Method/evidence reconstruction; limitation: Closed-system evidence and synchronization assumptions need independent reproduction. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P137 — SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics**<br>*Paper lineage — Modern Core; Reproduction Candidate* | Required Core | S3 | **Papers:** [P137 — SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics](https://arxiv.org/abs/2506.01844)<br>**Resources:** R015, R016 | Presents a compact open VLA with public data, consumer-hardware training, and asynchronous inference. | Method/evidence reconstruction; limitation: Results are narrower than large proprietary models and depend on benchmark/robot-specific fine-tuning. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S4 | **Papers:** P135, P136, P137<br>**Resources:** R015, R016, R017, R027, R030, R031, R033 | Connect model compression and efficient action representation to real-time control architecture and deployment hardware. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S6. |
| 6 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S5; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R015, R016, R017, R027, R030, R031, R033 | Profile a representative policy end to end; compare eager/compiled/TensorRT and precision variants; inject delay/jitter and measure task-level degradation. | Profile a representative policy end to end; compare eager/compiled/TensorRT and precision variants; inject delay/jitter and measure task-level degradation. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S7. |
| 7 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S6; F1 and D2 | **Papers:** —<br>**Resources:** R015, R016, R017, R027, R030, R031, R033 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S8. |
| 8 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S7 | **Papers:** —<br>**Resources:** R015, R016, R017, R027, R030, R031, R033 | What deployment envelope preserves policy capability and closed-loop stability on the target robot? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S9. |
| 9 | **P138 — Efficient Memory Management for Large Language Model Serving with PagedAttention**<br>*Paper lineage — Optional Specialization* | Optional Specialization | S8 | **Papers:** [P138 — Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)<br>**Resources:** R015, R016 | Introduces PagedAttention and vLLM for high-throughput memory-efficient autoregressive serving. | Method/evidence reconstruction; limitation: Robot control adds latency determinism and multimodal preprocessing not addressed here. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S10. |
| 10 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S8; S9 | **Papers:** P138<br>**Resources:** R015, R016, R017, R027, R030, R031, R033 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F5, L6, E2. |
| Closely related / cross-area | Links model design to physical control constraints. |
| Outgoing capability | E2, S1, S3 and real-robot deployment |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P135, P136, P137, P138 | Complete |
| Supporting resources | R015, R016, R017, R027, R030, R031, R033 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What deployment envelope preserves policy capability and closed-loop stability on the target robot?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to E2, S1, S3 and real-robot deployment is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P135, P136, P137, P138. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-CEF723E2-B118-50F4-B007-00B9E3A28A1E` | `D4-S01` | 1 | Foundations — Latency decomposition, deadlines/jitter, asynchronous pipelines |
| `SES-23B98D41-DACE-5C0D-BF00-B670B972C038` | `D4-S02` | 2 | P135 — Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success |
| `SES-E69BC01A-2345-5712-97EB-9ACD178579E6` | `D4-S03` | 3 | P136 — Real-Time Action Chunking with Large Models |
| `SES-F9DEBEFC-BFDB-5F30-A92B-16928B25E8F1` | `D4-S04` | 4 | P137 — SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics |
| `SES-3539305F-6D12-5B08-8BE4-AE3CAC7ECB44` | `D4-S05` | 5 | Unified reconstruction and method comparison |
| `SES-1DAD3C27-8AE5-56F9-A3D9-2C401E2FF0CF` | `D4-S06` | 6 | Controlled implementation and evaluation |
| `SES-B708601F-17A0-5897-9E71-8E9D47A8B2F0` | `D4-S07` | 7 | Evidence, limitations, and system interpretation |
| `SES-68FD206D-939A-5162-AC92-8B4356862FCD` | `D4-S08` | 8 | Synthesis and research directions |
| `SES-55AD93A5-87B0-5128-A0FA-7F39B5A4817C` | `D4-S09` | 9 | P138 — Efficient Memory Management for Large Language Model Serving with PagedAttention |
| `SES-A0C02B2C-0B6F-5FC2-AAE7-260AE6AC0DC4` | `D4-S10` | 10 | Optional branch synthesis and activation decision |
