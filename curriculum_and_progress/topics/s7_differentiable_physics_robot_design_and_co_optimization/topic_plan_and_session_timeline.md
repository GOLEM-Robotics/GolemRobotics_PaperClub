# S7 — Differentiable physics, robot design, and co-optimization: Topic Plan and Session Timeline

**Repository indexes:** [Curriculum map](../../curriculum_map.md) · [Curriculum table](../../curriculum_table.md) · [Paper index](../../paper_index.md) · [Supporting materials](../../supporting_materials_index.md) · [Frontier watchlist](../../frontier_watchlist.md)

## 1. Topic scope and target depth

| Field | Specification |
|---|---|
| Topic ID | **S7** |
| Area | F. Specialization branches |
| Execution status | **Deferred** |
| Covers | Differentiable simulators, gradient-based system identification, morphology/control co-design, and design optimization. |
| Excludes | It excludes generic numerical optimization and non-differentiable simulation unless needed as a comparison. |
| Target competence | Differentiate through physical simulation and design variables, verify gradients, perform system identification, and understand morphology/control co-optimization limitations. |
| Curriculum role | Deferred pending project demand. Advanced research branch requiring dedicated mathematical and simulator work. |
| Literature cutoff / resource verification | 22 July 2026 / 22 July 2026 |

## 2. Execution status and completion boundary

| Field | Value |
|---|---|
| Planned sessions | **8** |
| Classification | Required Core: 5 · Optional Specialization: 3 |
| Required Core endpoint | **S5** |
| Completion boundary | Complete S1–S5 for Required Core. Continue through Optional Specialization only when activated. |

## 3. Dependencies and required foundations

| Classification | Requirement | Planned position |
|---|---|---|
| Other topic timelines | F2, F6–F7, P5. | Before S1 or the first dependent session |
| Topic-local foundation | Automatic differentiation through time, adjoints, implicit differentiation, contact discontinuities, gradient verification, inverse problems, morphology parameters, and bilevel/co-design objectives. | S1 |
| Individual preparation gap | Missing mathematics, robotics, software, framework, or hardware skill not covered above | Before the affected session; no dedicated session unless recurring |

### Supporting-resource plan

| ID | Resource | Type | Topic role | Sessions |
|---|---|---|---|---|
| R006 | [Underactuated Robotics](https://underactuated.csail.mit.edu/) | Open textbook/lecture notes | Nonlinear dynamics, optimal control, planning, and learning for physical systems. | S1, S2, S3, S4, S5, S6, S7, S8 |
| R020 | [MuJoCo Documentation](https://mujoco.readthedocs.io/) | Physics simulator documentation | Reliable dynamics/control simulation reference. | S1, S2, S3, S4, S5, S6, S7, S8 |
| R021 | [Isaac Lab Documentation](https://isaac-sim.github.io/IsaacLab/) | Simulation and robot-learning documentation | GPU-parallel robot-learning workflows, domain randomization, and deployment interfaces. | S1, S3, S4, S5, S7, S8 |
| R034 | [Drake Documentation and Tutorials](https://drake.mit.edu/tutorials/) | Supporting resource | Multibody dynamics, contact, mathematical programming, automatic differentiation, systems diagrams, and model-based verification. | S1, S3, S4, S5, S7, S8 |
| R036 | [DiffTaichi Reproduction Examples](https://github.com/taichi-dev/difftaichi) | Supporting resource | Small differentiable simulators for gradient verification, inverse problems, controller optimization, and simulator-design tradeoffs. | S1, S3, S4, S5, S7, S8 |

## 4. Topic concept and dependency map

| Node | Stage | Content | Leads to |
|---|---|---|---|
| D0 | Prerequisites | F2, F6–F7, P5. | S1 |
| D1 | Topic-local foundation | Automatic differentiation through time, adjoints, implicit differentiation, contact discontinuities, gradient verification, inverse problems, morphology parameters, and bilevel/co-design objectives. | Required Core papers |
| D2 | Required Core paper lineage | P188 | Reconstruction |
| D3 | Reconstruction | Common notation, mechanisms, objectives, architectures, competing assumptions | Implementation/evidence |
| D4 | Evidence and system interpretation | Baselines, uncertainty, limitations, failure modes, compute/data/hardware dependencies, transfer validity | Required Core synthesis |
| D5 | Required Core synthesis | When are simulator gradients trustworthy and useful for physical robot design or control? | F6–F7, P5, L7, robot design |
| D6 | Optional branch | P189 | Activation decision |

## 5. Ordered session timeline

| # | Session / stage | Classification | Prerequisites | Papers and supporting resources | Objective / concepts | Planned component | Completion capability / continuity |
|---:|---|---|---|---|---|---|---|
| 1 | **Foundations — Automatic differentiation through time, adjoints, implicit differentiation**<br>*Foundations and boundary confirmation* | Required Core | F2, F6–F7, P5. | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R036 | Automatic differentiation through time, adjoints, implicit differentiation, contact discontinuities, gradient verification, inverse problems, morphology parameters, and bilevel/co-design objectives. | Notation/dependency map and targeted use of the listed supporting resources. | Use the prerequisite concepts and notation consistently across the topic.<br>Artifact: foundation map; next S2. |
| 2 | **P188 — ChainQueen: A Real-Time Differentiable Physical Simulator for Soft Robotics**<br>*Paper lineage — Foundation; Bridge* | Required Core | S1 | **Papers:** [P188 — ChainQueen: A Real-Time Differentiable Physical Simulator for Soft Robotics](https://arxiv.org/abs/1810.01054)<br>**Resources:** R006, R020 | Introduces differentiable simulation for soft-robot control and design. | Method/evidence reconstruction; limitation: Soft-body model scope and sim-to-real mismatch. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S3. |
| 3 | **Unified reconstruction and method comparison**<br>*Reconstruction and lineage integration* | Required Core | S1–S2 | **Papers:** P188<br>**Resources:** R006, R020, R021, R034, R036 | Compare DiffTaichi-style differentiable simulation with robot design/control co-optimization, including where gradients become biased or unstable. | Unified derivation, architecture/data-flow diagram, and method comparison table. | Compare the required methods in one notation and separate conceptual, implementation, data, and scale differences.<br>Artifact: comparison matrix; next S4. |
| 4 | **Evidence, limitations, and system interpretation**<br>*Controlled evaluation and system interpretation* | Required Core | S3; F1 and D2 | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R036 | Determine what the topic’s evidence establishes for intelligent physical systems and where conclusions fail under data, compute, hardware, latency, embodiment, or benchmark changes. | Baseline, uncertainty, distribution-shift, failure-mode, and system-validity audit. | State what the evidence supports, where it fails, and which system constraints control transfer.<br>Artifact: evidence statement; next S5. |
| 5 | **Synthesis and research directions**<br>*Synthesis and research-direction formation* | Required Core | S4 | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R036 | When are simulator gradients trustworthy and useful for physical robot design or control? | Dependency/evidence summary and 2–4 falsifiable research questions. | Formulate technically grounded research questions, specify falsifiable hypotheses and minimum evidence, and connect the topic to adjacent curriculum tracks.<br>Artifact: synthesis/decision record; Required Core complete; continuation S6. |
| 6 | **P189 — Learning to Design and Construct Structures in Simulated Environments**<br>*Paper lineage — Optional* | Optional Specialization | S5 | **Papers:** [P189 — Learning to Design and Construct Structures in Simulated Environments](https://arxiv.org/abs/2007.06011)<br>**Resources:** R006, R020 | Jointly learns construction strategies and structural objectives in simulation. | Method/evidence reconstruction; limitation: Simulation/task-specific and not direct robot morphology optimization. | Explain the method, assumptions, evidence, limitations, and lineage position.<br>Artifact: paper reconstruction; next S7. |
| 7 | **Controlled implementation and evaluation**<br>*Implementation / reproduction / controlled evaluation* | Optional Specialization | S6 | **Papers:** —<br>**Resources:** R006, R020, R021, R034, R036 | Reproduce a small differentiable simulator or inverse-design example; check gradients, optimize parameters/controller/design, and compare with derivative-free baselines. | Reproduce a small differentiable simulator or inverse-design example; check gradients, optimize parameters/controller/design, and compare with derivative-free baselines. | Run or audit the controlled comparison and separate method, implementation, data, optimization, and infrastructure effects.<br>Artifact: experiment record; next S8. |
| 8 | **Optional branch synthesis and activation decision**<br>*Optional specialization synthesis* | Optional Specialization | S5; S6–S7 | **Papers:** P189<br>**Resources:** R006, R020, R021, R034, R036 | Determine what the optional methods add beyond the required core and when the branch should be activated for a concrete project. | Compare incremental capability, prerequisites, implementation cost, evaluation value, and overlap with adjacent topics. | Define the activation conditions, minimal experiment, and stopping criteria for the optional branch.<br>Artifact: synthesis/decision record; topic complete. |

## 6. Cross-topic links

| Direction | Topics / interface |
|---|---|
| Incoming foundations | F2, F6–F7, P5. |
| Closely related / cross-area | Advanced research branch requiring dedicated mathematical and simulator work. |
| Outgoing capability | F6–F7, P5, L7, robot design |
| Evaluation dependency | F1 for experimental methodology; D2 for benchmark, robustness, and failure-analysis design; D3 for reproducible implementation when practical work is performed. |

## 7. Coverage and progression check

| Check | Coverage | Status |
|---|---|---|
| Durable primary papers | P188, P189 | Complete |
| Supporting resources | R006, R020, R021, R034, R036 | Assigned to sessions |
| Dependency order | Foundations → Required Core lineage → reconstruction → evidence → synthesis | Complete |
| Completion boundary | Required Core ends at synthesis; continuation branches are independent | Complete |
| Critical/evaluation coverage | Baselines, uncertainty, competing assumptions, limitations, failure modes, and transfer validity | Complete |
| Interleaving state | Each session retains a named artifact and next-session pointer | Complete |

## 8. Planned synthesis, frontier questions, and unresolved gaps

| Item | Specification |
|---|---|
| Synthesis question | **When are simulator gradients trustworthy and useful for physical robot design or control?** |
| Required synthesis record | • One dependency and method-lineage map using common notation.<br>• One evidence statement separating demonstrated results, assumptions, and unresolved failure modes.<br>• Two to four falsifiable research hypotheses with baselines, measurements, resource requirements, and stop conditions.<br>• One cross-topic integration note describing inputs, outputs, timing/data assumptions, and evaluation interfaces. |
| Frontier / unresolved questions | • Which assumptions in the durable paper sequence fail under the club's target data, compute, simulator, hardware, or embodiment constraints?<br>• Which apparent improvements come from architecture or algorithm, and which come from data scale, tuning, infrastructure, or evaluation protocol?<br>• What negative result or controlled ablation would most strongly change the topic's current ordering or research priority?<br>• Which interface to F6–F7, P5, L7, robot design is underspecified and should become an integration experiment? |

## 9. Revision notes for the master curriculum

| Item | Decision |
|---|---|
| Durable primary-paper inventory | Unchanged: P188, P189. |
| Topic boundary | No split or merge. |
| Session-status correction | Timeline classification finalized: Required Core ends at synthesis and continuation branches remain independent. |
| Supporting-resource additions | No new resource beyond the accepted R027–R038 additions. |
| Frontier additions | No new frontier reference. |
| Revision date | 22 July 2026 |
