# P5 — Learned dynamics, model-based RL, and world models: Topic Plan and Session Timeline

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **P5** |
| Area | B. Perception, spatial intelligence, and world models |
| Execution status | **Active Research Track** |
| Covers | Probabilistic dynamics, latent state-space models, imagined rollouts, value-equivalent models, and planning in learned models. |
| Excludes | It excludes passive video representation learning and proprietary world-action claims not yet supported by mature evidence. |
| Target competence | Derive probabilistic and latent dynamics models, understand planning/imagination/value-equivalence, diagnose model bias, and evaluate modern world-model control systems. |
| Curriculum role | Primary world-model lineage. Connects control, prediction, data engines, and frontier world-action models. |
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
| Other topic timelines | F4, F7, L1–L2. | Before S1 or the first dependent session |
| Topic-local foundation | Dynamics uncertainty, compounding error, latent state-space models, variational objectives, model-predictive control, imagination, value-equivalent modeling, and planning horizons. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R004 | [CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) | Lecture notes and videos | Modern bridge from theory to model-free, model-based, imitation, and offline RL. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R026 | [A Survey on Model-Based Reinforcement Learning](https://arxiv.org/abs/2006.16712) | Survey | Taxonomy of learned models, planning, uncertainty, and policy learning. | S1, S8, S9, S10, S11 |
| R034 | [Drake Documentation and Tutorials](https://drake.mit.edu/tutorials/) | Supporting resource | Multibody dynamics, contact, mathematical programming, automatic differentiation, systems diagrams, and model-based verification. | S1, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F4, F7, L1–L2. | S1 |
| D1 | Topic-local foundation | Dynamics uncertainty, compounding error, latent state-space models, variational objectives, model-predictive control, imagination, value-equivalent modeling, and planning horizons. | Required Core papers |
| D2 | Required Core paper lineage | P066 → P067 → P068 → P069 → P070 → P071 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | What must a learned world model predict to support reliable physical decisions? | D5, E3, S5, S7 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Dynamics uncertainty, compounding error, latent state-space models**<br>*Foundations and boundary confirmation* | Required Core | F4, F7, L1–L2. | **Papers:** —<br>**Resources:** R004, R006, R026, R034 | Dynamics uncertainty, compounding error, latent state-space models, variational objectives, model-predictive control, imagination, value-equivalent modeling, and planning horizons. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P066 — PILCO: A Model-Based and Data-Efficient Approach to Policy Search**<br>*Paper lineage — Foundation; Seminal* | Required Core | S1 | **Papers:** [P066 — PILCO: A Model-Based and Data-Efficient Approach to Policy Search](https://proceedings.mlr.press/v15/deisenroth11a.html)<br>**Resources:** R004, R006 | Uses Gaussian-process dynamics and analytic uncertainty propagation for data-efficient control. | Method/evidence reconstruction; limitation: Scales poorly with state/data dimension and relies on smooth low-dimensional dynamics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P067 — Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models**<br>*Paper lineage — Modern Core* | Required Core | S2 | **Papers:** [P067 — Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models](https://arxiv.org/abs/1805.12114)<br>**Resources:** R004, R006 | Introduces PETS: probabilistic ensembles plus trajectory sampling for uncertainty-aware planning. | Method/evidence reconstruction; limitation: Short-horizon benchmark focus and expensive online planning. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P068 — Learning Latent Dynamics for Planning from Pixels**<br>*Paper lineage — Bridge; Modern Core* | Required Core | S3 | **Papers:** [P068 — Learning Latent Dynamics for Planning from Pixels](https://proceedings.mlr.press/v97/hafner19a.html)<br>**Resources:** R004, R006 | Introduces PlaNet, a recurrent latent state-space model used for planning from images. | Method/evidence reconstruction; limitation: Planning quality depends on latent model and reward prediction; limited long-horizon uncertainty. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P069 — Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model**<br>*Paper lineage — Bridge* | Required Core | S4 | **Papers:** [P069 — Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model](https://www.nature.com/articles/s41586-020-03051-4)<br>**Resources:** R004, R006 | Introduces MuZero, learning reward/value/policy-relevant dynamics without reconstructing observations. | Method/evidence reconstruction; limitation: Large compute, discrete domains, and proprietary implementation limit robotics transfer. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P070 — Mastering Diverse Domains through World Models**<br>*Paper lineage — Modern Core* | Required Core | S5 | **Papers:** [P070 — Mastering Diverse Domains through World Models](https://arxiv.org/abs/2301.04104)<br>**Resources:** R004, R006 | Presents a robust latent world-model actor–critic recipe across diverse domains with one configuration. | Method/evidence reconstruction; limitation: Mostly simulated benchmarks; real-robot and model-bias questions remain. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P071 — TD-MPC2: Scalable, Robust World Models for Continuous Control**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P071 — TD-MPC2: Scalable, Robust World Models for Continuous Control](https://arxiv.org/abs/2310.16828)<br>**Resources:** R004, R006 | Combines latent dynamics, value learning, and local trajectory optimization for multi-task control. | Method/evidence reconstruction; limitation: Primarily simulated control; planning cost and representation choices matter. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P066, P067, P068, P069, P070, P071<br>**Resources:** R004, R006, R026, R034 | Reconstruct PILCO, PETS, PlaNet/Dreamer, MuZero, and TD-MPC2 as distinct answers to model representation and policy/planning integration. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R004, R006, R026, R034 | Implement or reproduce a compact model-based controller; vary ensemble uncertainty, rollout horizon, representation, and planning budget. | Implement or reproduce a compact model-based controller; vary ensemble uncertainty, rollout horizon, representation, and planning budget. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R004, R006, R026, R034 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R004, R006, R026, R034 | What must a learned world model predict to support reliable physical decisions? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F4, F7, L1–L2. |
| Closely related / cross-area | Connects control, prediction, data engines, and frontier world-action models. |
| Outgoing capability | D5, E3, S5, S7 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P066, P067, P068, P069, P070, P071 | Complete |
| Supporting resources | R004, R006, R026, R034 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **What must a learned world model predict to support reliable physical decisions?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to D5, E3, S5, S7 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P066, P067, P068, P069, P070, P071. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
