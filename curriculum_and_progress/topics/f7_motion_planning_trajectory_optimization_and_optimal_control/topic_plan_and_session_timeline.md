# F7 — Motion planning, trajectory optimization, and optimal control: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **F7** |
| Area | A. Shared foundations |
| Execution status | **Shared Core** |
| Covers | Sampling-based planning, trajectory optimization, model predictive control, task-and-motion planning, and safety filters. |
| Excludes | It excludes detailed state estimation and does not treat learned planning as a substitute for classical planning foundations. |
| Target competence | Select, derive, and evaluate sampling-based, optimization-based, MPC, and task-and-motion planning methods under geometry, dynamics, uncertainty, and real-time constraints. |
| Curriculum role | Shared planning vocabulary before learned planning. Links classical planning to P5, E1, L6, L8, and S1–S4. |
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
| Other topic timelines | F6; optimization. | Before S1 or the first dependent session |
| Topic-local foundation | Configuration spaces, collision checking, feasibility, optimal control, trajectory discretization, convexification, receding horizon, and hybrid task/motion structure. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R005 | [Modern Robotics: Mechanics, Planning, and Control](https://modernrobotics.org) | Open textbook/course | Kinematics, dynamics, Jacobians, control, and planning prerequisites. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11 |
| R007 | [Planning Algorithms](https://lavalle.pl/planning/) | Open textbook | Primary conceptual support for PRM/RRT, kinodynamic planning, and planning under uncertainty. | S1, S8, S9, S10, S11 |
| R020 | [MuJoCo Documentation](https://mujoco.readthedocs.io/) | Physics simulator documentation | Reliable dynamics/control simulation reference. | S1, S8, S9, S10, S11 |
| R028 | [MIT Robotic Manipulation: Perception, Planning, and Control](https://manipulation.mit.edu/) | Supporting resource | Integrated manipulation stack connecting geometry, perception, planning, contact, control, and learning. | S1, S8, S9, S10, S11 |
| R034 | [Drake Documentation and Tutorials](https://drake.mit.edu/tutorials/) | Supporting resource | Multibody dynamics, contact, mathematical programming, automatic differentiation, systems diagrams, and model-based verification. | S1, S8, S9, S10, S11 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F6; optimization. | S1 |
| D1 | Topic-local foundation | Configuration spaces, collision checking, feasibility, optimal control, trajectory discretization, convexification, receding horizon, and hybrid task/motion structure. | Required Core papers |
| D2 | Required Core paper lineage | P032 → P033 → P034 → P035 → P036 → P037 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | How should a robot allocate reasoning between discrete task plans, geometric paths, trajectory optimization, MPC, and learned policies? | P5, L8, E1, S1, S3–S4 |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Configuration spaces, collision checking, feasibility**<br>*Foundations and boundary confirmation* | Required Core | F6; optimization. | **Papers:** —<br>**Resources:** R005, R006, R007, R020, R028, R034 | Configuration spaces, collision checking, feasibility, optimal control, trajectory discretization, convexification, receding horizon, and hybrid task/motion structure. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P032 — Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces**<br>*Paper lineage — Seminal* | Required Core | S1 | **Papers:** [P032 — Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces](https://doi.org/10.1109/70.508439)<br>**Resources:** R005, R006 | Introduces multi-query sampling-based planning through a reusable roadmap. | Method/evidence reconstruction; limitation: Static known geometry and collision checking assumptions; no dynamics. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **P033 — Rapidly-Exploring Random Trees: A New Tool for Path Planning**<br>*Paper lineage — Seminal* | Required Core | S2 | **Papers:** [P033 — Rapidly-Exploring Random Trees: A New Tool for Path Planning](https://msl.cs.illinois.edu/~lavalle/papers/Lav98c.pdf)<br>**Resources:** R005, R006 | Introduces incremental exploration biased toward unvisited regions. | Method/evidence reconstruction; limitation: Basic RRT is not asymptotically optimal and may produce poor paths. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S4. |
| 4 | **P034 — CHOMP: Gradient Optimization Techniques for Efficient Motion Planning**<br>*Paper lineage — Bridge* | Required Core | S3 | **Papers:** [P034 — CHOMP: Gradient Optimization Techniques for Efficient Motion Planning](https://doi.org/10.1109/ROBOT.2009.5152817)<br>**Resources:** R005, R006 | Optimizes trajectories with smoothness and obstacle costs in functional space. | Method/evidence reconstruction; limitation: Local minima and cost-field quality matter; dynamics/contact are limited. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S5. |
| 5 | **P035 — Motion Planning with Sequential Convex Optimization and Convex Collision Checking**<br>*Paper lineage — Modern Core* | Required Core | S4 | **Papers:** [P035 — Motion Planning with Sequential Convex Optimization and Convex Collision Checking](https://doi.org/10.1177/0278364914528132)<br>**Resources:** R005, R006 | Introduces TrajOpt using sequential convex optimization and continuous-time collision checking. | Method/evidence reconstruction; limitation: Local optimization requires good initialization and accurate collision geometry. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S6. |
| 6 | **P036 — Hierarchical Task and Motion Planning in the Now**<br>*Paper lineage — Bridge* | Required Core | S5 | **Papers:** [P036 — Hierarchical Task and Motion Planning in the Now](https://doi.org/10.1109/ICRA.2011.5980391)<br>**Resources:** R005, R006 | Integrates symbolic task planning with geometric feasibility through interleaved refinement. | Method/evidence reconstruction; limitation: Scalability and model specification remain difficult; limited learning. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **P037 — Information-Theoretic Model Predictive Control: Theory and Applications to Autonomous Driving**<br>*Paper lineage — Modern Core* | Required Core | S6 | **Papers:** [P037 — Information-Theoretic Model Predictive Control: Theory and Applications to Autonomous Driving](https://arxiv.org/abs/1707.02342)<br>**Resources:** R005, R006 | Derives sampling-based MPC updates from information-theoretic control. | Method/evidence reconstruction; limitation: Compute and model fidelity constrain real-time performance. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S8. |
| 8 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S7 | **Papers:** P032, P033, P034, P035, P036, P037<br>**Resources:** R005, R006, R007, R020, R028, R034 | Compare PRM/RRT, CHOMP/TrajOpt, TAMP, and information-theoretic MPC by representation, solver, guarantees, and failure modes. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S9. |
| 9 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Required Core | S8; required compute/data/simulator/hardware | **Papers:** —<br>**Resources:** R005, R006, R007, R020, R028, R034 | Solve one manipulation/navigation problem with sampling, trajectory optimization, and MPC variants; measure success, compute, constraint violations, and robustness. | Solve one manipulation/navigation problem with sampling, trajectory optimization, and MPC variants; measure success, compute, constraint violations, and robustness. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S10. |
| 10 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S9; F1 and D2 | **Papers:** —<br>**Resources:** R005, R006, R007, R020, R028, R034 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S11. |
| 11 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S10 | **Papers:** —<br>**Resources:** R005, R006, R007, R020, R028, R034 | How should a robot allocate reasoning between discrete task plans, geometric paths, trajectory optimization, MPC, and learned policies? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F6; optimization. |
| Closely related / cross-area | Links classical planning to P5, E1, L6, L8, and S1–S4. |
| Outgoing capability | P5, L8, E1, S1, S3–S4 |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P032, P033, P034, P035, P036, P037 | Complete |
| Supporting resources | R005, R006, R007, R020, R028, R034 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; no continuation branch is defined | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **How should a robot allocate reasoning between discrete task plans, geometric paths, trajectory optimization, MPC, and learned policies?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to P5, L8, E1, S1, S3–S4 is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P032, P033, P034, P035, P036, P037. |
| Topic boundary | No split or merge. |
| Session-status correction | None. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |

## 10. Stable session identity registry

Stable IDs identify sessions independently of display order. Legacy aliases remain valid for imported progress and historical links.

| Stable ID | Legacy aliases | Current sequence | Session |
|---|---|---:|---|
| `SES-B6EB72BA-1CDF-596D-9EC8-AE2FF7D51C4C` | `F7-S01` | 1 | Foundations — Configuration spaces, collision checking, feasibility |
| `SES-2B367F9E-325B-5C46-828A-17BA4919EF05` | `F7-S02` | 2 | P032 — Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces |
| `SES-0F1000AF-4DD2-5668-A7F2-D4D666259D40` | `F7-S03` | 3 | P033 — Rapidly-Exploring Random Trees: A New Tool for Path Planning |
| `SES-AC54557D-F363-5EB4-BBBC-565EFF3F31D8` | `F7-S04` | 4 | P034 — CHOMP: Gradient Optimization Techniques for Efficient Motion Planning |
| `SES-95C4B039-D430-589F-9FC2-700EFB9E0D05` | `F7-S05` | 5 | P035 — Motion Planning with Sequential Convex Optimization and Convex Collision Checking |
| `SES-71316CBF-053F-56D3-A453-8B6FF6DA5341` | `F7-S06` | 6 | P036 — Hierarchical Task and Motion Planning in the Now |
| `SES-8B1BDC73-E2DA-56B9-BCF3-90FCC07867B2` | `F7-S07` | 7 | P037 — Information-Theoretic Model Predictive Control: Theory and Applications to Autonomous Driving |
| `SES-EC5D20BE-4A73-5E2D-97D6-EE42D86063AB` | `F7-S08` | 8 | Unified reconstruction and method comparison |
| `SES-D43EB470-6B58-5F8E-A78A-0D960E9115F2` | `F7-S09` | 9 | Controlled implementation and evaluation |
| `SES-02AED938-CE58-5A17-A4C5-B2D8D225C94A` | `F7-S10` | 10 | Evidence, limitations, and system interpretation |
| `SES-C2FB32D5-84C7-53AE-9003-83F20CC0D6EE` | `F7-S11` | 11 | Synthesis and research directions |
