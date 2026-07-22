# E3 — Embodied memory, agentic control, self-improvement, and world-action models: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **E3** |
| Area | E. Language, multimodality, and embodied reasoning |
| Execution status | **Frontier Watchlist** |
| Covers | Long/short-term memory, test-time adaptation, skill discovery, autonomous data loops, reward models, planners above VLAs, and predictive action-conditioned models. |
| Excludes | It does not promote fast-moving proprietary systems into the durable core without independent evidence, code, and stable metadata. |
| Target competence | Maintain a technically informed watchlist and experimental hypotheses for memory, test-time adaptation, autonomous data/reward loops, self-improvement, and world-action models. |
| Curriculum role | Fast-moving integration frontier. Monitored frontier; promote only after independent evidence and reproducibility mature. |
| Literature cutoff / resource verification | 19 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **10** |
| Classification | Frontier Continuation: 10 |
| Required Core endpoint | **N/A** |
| Completion boundary | No durable-core completion boundary; all sessions remain Frontier Continuation. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | E1–E2, P4–P5, L4–L5, D5. | Before S1 or the first dependent session |
| Topic-local foundation | Persistent and episodic memory, context scaling, test-time training, skill/reward discovery, autonomous data collection, planner-policy interfaces, and promotion criteria. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R014 | [Stanford CS224n](https://web.stanford.edu/class/cs224n/) | Lecture notes | Transformer, language-model, and alignment prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R017 | [LeRobot Documentation](https://huggingface.co/docs/lerobot/) | Documentation and open framework | Dataset schema, teleoperation, policy training, evaluation, and low-cost hardware integration. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 |
| R023 | [A Survey of Vision-Language-Action Models for Robotics: Towards Real-World Applications](https://arxiv.org/abs/2510.07077) | Survey | Current full-stack map of VLA architectures, data, hardware, and evaluation; use for navigation, not as a replacement for primary papers. | S1, S7, S8, S9, S10 |
| R026 | [A Survey on Model-Based Reinforcement Learning](https://arxiv.org/abs/2006.16712) | Survey | Taxonomy of learned models, planning, uncertainty, and policy learning. | S1, S7, S8, S9, S10 |
| R032 | [Habitat Lab Documentation](https://aihabitat.org/docs/habitat-lab/) | Supporting resource | Navigation/embodied-agent task definitions, vectorized environments, datasets, evaluation, and hierarchical-agent experiments. | S1, S7, S8, S9, S10 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | E1–E2, P4–P5, L4–L5, D5. | S1 |
| D1 | Topic-local foundation | Persistent and episodic memory, context scaling, test-time training, skill/reward discovery, autonomous data collection, planner-policy interfaces, and promotion criteria. | Frontier papers |
| D2 | Frontier paper lineage | P158 → P159 → P160 → P161 → P162 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Frontier synthesis and promotion review | Which frontier mechanisms materially change the durable embodied-intelligence lineage, and what evidence would justify promotion? | Future revisions to P5, L4–L5, D5, and E2 |
| D7 | Frontier branch | P158 → P159 → P160 → P161 → P162 | Promotion/watch decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Persistent and episodic memory, context scaling, test-time training**<br>*Foundations and boundary confirmation* | Frontier Continuation | E1–E2, P4–P5, L4–L5, D5. | **Papers:** —<br>**Resources:** R014, R017, R023, R026, R032 | Persistent and episodic memory, context scaling, test-time training, skill/reward discovery, autonomous data collection, planner-policy interfaces, and promotion criteria. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P158 — VLAs with Long and Short-Term Memory**<br>*Paper lineage — Frontier* | Frontier Continuation | S1 | **Papers:** [P158 — VLAs with Long and Short-Term Memory](https://www.pi.website/research/memory)<br>**Resources:** R014, R017 | Introduces Multi-scale Embodied Memory with compressed video history and textual long-term memory for tasks lasting many minutes. | Method/evidence reconstruction; limitation: Private data/model and very recent evidence; memory summaries can introduce causal confusion. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P159 — π0.7: a Steerable Model with Emergent Capabilities**<br>*Paper lineage — Frontier* | Frontier Continuation | S2 | **Papers:** [P159 — π0.7: a Steerable Model with Emergent Capabilities](https://www.pi.website/blog/pi07)<br>**Resources:** R014, R017 | Combines heterogeneous robot, human, and autonomous data with multimodal conditioning and visual subgoals to improve steerability and compositional generalization. | Method/evidence reconstruction; limitation: Company-authored technical report; model, training data, and full independent reproduction are unavailable. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P160 — Vesta: A Generalist Embodied Reasoning Model**<br>*Paper lineage — Frontier* | Frontier Continuation | S3 | **Papers:** [P160 — Vesta: A Generalist Embodied Reasoning Model](https://research.nvidia.com/labs/gear/vesta/)<br>**Resources:** R014, R017 | Combines explicit observation–progress–reasoning–action memory with a low-level robot actor. | Method/evidence reconstruction; limitation: Very recent, organization-specific stack and limited task/platform evaluation. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P161 — RoboTTT: Context Scaling for Robot Policies**<br>*Paper lineage — Frontier* | Frontier Continuation | S4 | **Papers:** [P161 — RoboTTT: Context Scaling for Robot Policies](https://research.nvidia.com/labs/gear/robottt/)<br>**Resources:** R014, R017 | Studies very long policy context and in-context adaptation learned from intervention histories. | Method/evidence reconstruction; limitation: New and not independently reproduced; context cost and failure modes need analysis. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P162 — ENPIRE: Agentic Robot Policy Self-Improvement in the Real World**<br>*Paper lineage — Frontier* | Frontier Continuation | S5 | **Papers:** [P162 — ENPIRE: Agentic Robot Policy Self-Improvement in the Real World](https://arxiv.org/abs/2606.19980)<br>**Resources:** R014, R017 | Builds an agentic loop for autonomous policy improvement and real-world data acquisition. | Method/evidence reconstruction; limitation: Very recent; safety, human oversight, and reproducibility are unresolved. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Frontier Continuation | S6 | **Papers:** P158, P159, P160, P161, P162<br>**Resources:** R014, R017, R023, R026, R032 | Compare current memory, steerability, reasoning, context-scaling, and self-improvement claims without treating demonstrations as established evidence. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S8. |
| 8 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Frontier Continuation | S7 | **Papers:** —<br>**Resources:** R014, R017, R023, R026, R032 | Design lightweight falsification tests or interface prototypes for one frontier claim; prioritize benchmarkable hypotheses over full reproduction. | Design lightweight falsification tests or interface prototypes for one frontier claim; prioritize benchmarkable hypotheses over full reproduction. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S9. |
| 9 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Frontier Continuation | S8 | **Papers:** —<br>**Resources:** R014, R017, R023, R026, R032 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S10. |
| 10 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Frontier Continuation | S1–S9 | **Papers:** —<br>**Resources:** R014, R017, R023, R026, R032 | Which frontier mechanisms materially change the durable embodied-intelligence lineage, and what evidence would justify promotion? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | E1–E2, P4–P5, L4–L5, D5. |
| Closely related / cross-area | Monitored frontier; promote only after independent evidence and reproducibility mature. |
| Outgoing capability | future revisions to P5, L4–L5, D5, and E2 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P158, P159, P160, P161, P162 | Complete |
| Supporting resources | R014, R017, R023, R026, R032 | Assigned to sessions |
| Dependency order | Foundations → Frontier lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Entire topic remains Frontier Continuation; no durable-core endpoint is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **Which frontier mechanisms materially change the durable embodied-intelligence lineage, and what evidence would justify promotion?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to future revisions to P5, L4–L5, D5, and E2 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P158, P159, P160, P161, P162. |
| Topic boundary | No split or merge. |
| Session-status correction | None; the topic remains entirely Frontier Continuation. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
