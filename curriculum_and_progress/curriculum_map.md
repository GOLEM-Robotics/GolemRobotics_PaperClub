# Curriculum Map

**Curriculum:** Robot Learning, Embodied Intelligence, and Physical AI  
**Literature-search cutoff:** 22 July 2026  
**Artifact:** authoritative curriculum hierarchy, topic dependencies, execution status, and ordered topic paper sequences  
**Inventory:** 37 topics · 193 primary papers · 41 supporting resources · 12 external frontier-watchlist items

## 1. Selection and metadata policy

- Primary research papers form the curriculum. Textbooks, courses, surveys, documentation, and implementation references are indexed separately.
- Papers are ordered by conceptual entry path and research lineage, not only by publication date.
- Each paper has one primary topic. Topic sequences elsewhere reference the paper ID rather than duplicating its full record.
- `Frontier` means current and potentially important, not established. Company technical reports and unreleased models are not treated as equivalent to peer-reviewed, reproducible evidence.
- Preparation burden is reported instead of page count when section selection and technical density are more informative.
- Numerical quality score `Q` is not used in this master map. Influence, evidence, transparency, current relevance, limitations, and assessment confidence are reported qualitatively to avoid false precision across incomparable paper roles.

### Role labels

`Entry Point` · `Foundation` · `Seminal` · `Bridge` · `Modern Core` · `Frontier` · `Critical` · `Optional Specialization`

### Technical levels

`Introductory` · `Intermediate` · `Advanced` · `Expert`

## 2. Complete knowledge map and execution status

| ID | Area | Topic | Status | Papers |
|---|---|---|---|---:|
| [F1](topics/f1_research_evidence_reproducibility_and_empirical_methodology/topic_plan_and_session_timeline.md) | A. Shared foundations | Research evidence, reproducibility, and empirical methodology | **Shared Core** | 4 |
| [F2](topics/f2_optimization_and_deep_learning_mechanics/topic_plan_and_session_timeline.md) | A. Shared foundations | Optimization and deep-learning mechanics | **Shared Core** | 4 |
| [F3](topics/f3_neural_architectures_and_sequence_models/topic_plan_and_session_timeline.md) | A. Shared foundations | Neural architectures and sequence models | **Shared Core** | 5 |
| [F4](topics/f4_self_supervised_and_generative_learning/topic_plan_and_session_timeline.md) | A. Shared foundations | Self-supervised and generative learning | **Shared Core** | 6 |
| [F5](topics/f5_foundation_model_training_post_training_and_adaptation/topic_plan_and_session_timeline.md) | A. Shared foundations | Foundation-model training, post-training, and adaptation | **Shared Core** | 8 |
| [F6](topics/f6_robot_mechanics_dynamics_and_interaction_control/topic_plan_and_session_timeline.md) | A. Shared foundations | Robot mechanics, dynamics, and interaction control | **Shared Core** | 4 |
| [F7](topics/f7_motion_planning_trajectory_optimization_and_optimal_control/topic_plan_and_session_timeline.md) | A. Shared foundations | Motion planning, trajectory optimization, and optimal control | **Shared Core** | 6 |
| [F8](topics/f8_state_estimation_sensor_fusion_and_slam/topic_plan_and_session_timeline.md) | A. Shared foundations | State estimation, sensor fusion, and SLAM | **Shared Core** | 5 |
| [P1](topics/p1_visual_and_multimodal_representation_learning/topic_plan_and_session_timeline.md) | B. Perception, spatial intelligence, and world models | Visual and multimodal representation learning | **Shared Core** | 5 |
| [P2](topics/p2_detection_segmentation_grounding_and_tracking/topic_plan_and_session_timeline.md) | B. Perception, spatial intelligence, and world models | Detection, segmentation, grounding, and tracking | **Active Research Track** | 6 |
| [P3](topics/p3_3d_representation_reconstruction_and_semantic_mapping/topic_plan_and_session_timeline.md) | B. Perception, spatial intelligence, and world models | 3D representation, reconstruction, and semantic mapping | **Active Research Track** | 7 |
| [P4](topics/p4_video_representation_and_predictive_learning/topic_plan_and_session_timeline.md) | B. Perception, spatial intelligence, and world models | Video representation and predictive learning | **Active Research Track** | 5 |
| [P5](topics/p5_learned_dynamics_model_based_rl_and_world_models/topic_plan_and_session_timeline.md) | B. Perception, spatial intelligence, and world models | Learned dynamics, model-based RL, and world models | **Active Research Track** | 6 |
| [L1](topics/l1_reinforcement_learning_foundations/topic_plan_and_session_timeline.md) | C. Learning to act | Reinforcement-learning foundations | **Shared Core** | 5 |
| [L2](topics/l2_deep_model_free_continuous_control/topic_plan_and_session_timeline.md) | C. Learning to act | Deep model-free continuous control | **Shared Core** | 7 |
| [L3](topics/l3_imitation_learning_and_inverse_reinforcement_learning/topic_plan_and_session_timeline.md) | C. Learning to act | Imitation learning and inverse reinforcement learning | **Shared Core** | 6 |
| [L4](topics/l4_offline_and_offline_to_online_reinforcement_learning/topic_plan_and_session_timeline.md) | C. Learning to act | Offline and offline-to-online reinforcement learning | **Active Research Track** | 6 |
| [L5](topics/l5_goal_conditioned_hierarchical_meta_and_skill_learning/topic_plan_and_session_timeline.md) | C. Learning to act | Goal-conditioned, hierarchical, meta-, and skill learning | **Specialization** | 6 |
| [L6](topics/l6_generative_action_policies_and_action_representations/topic_plan_and_session_timeline.md) | C. Learning to act | Generative action policies and action representations | **Active Research Track** | 5 |
| [L7](topics/l7_sim_to_real_transfer_system_identification_and_adaptation/topic_plan_and_session_timeline.md) | C. Learning to act | Sim-to-real transfer, system identification, and adaptation | **Active Research Track** | 5 |
| [L8](topics/l8_safety_uncertainty_intervention_and_constrained_learning/topic_plan_and_session_timeline.md) | C. Learning to act | Safety, uncertainty, intervention, and constrained learning | **Active Research Track** | 5 |
| [D1](topics/d1_robot_data_collection_teleoperation_and_dataset_construction/topic_plan_and_session_timeline.md) | D. Data, evaluation, and research systems | Robot-data collection, teleoperation, and dataset construction | **Active Research Track** | 6 |
| [D2](topics/d2_robot_learning_benchmarks_generalization_and_failure_analysis/topic_plan_and_session_timeline.md) | D. Data, evaluation, and research systems | Robot-learning benchmarks, generalization, and failure analysis | **Shared Core** | 8 |
| [D3](topics/d3_research_systems_experiment_infrastructure_and_reproducible_training/topic_plan_and_session_timeline.md) | D. Data, evaluation, and research systems | Research systems, experiment infrastructure, and reproducible training | **Active Research Track** | 4 |
| [D4](topics/d4_efficient_deployment_latency_compression_and_real_time_policy_execution/topic_plan_and_session_timeline.md) | D. Data, evaluation, and research systems | Efficient deployment, latency, compression, and real-time policy execution | **Active Research Track** | 4 |
| [D5](topics/d5_synthetic_data_learned_simulators_and_scalable_data_engines/topic_plan_and_session_timeline.md) | D. Data, evaluation, and research systems | Synthetic data, learned simulators, and scalable data engines | **Specialization** | 5 |
| [E1](topics/e1_language_conditioned_robotics_grounding_and_task_planning/topic_plan_and_session_timeline.md) | E. Language, multimodality, and embodied reasoning | Language-conditioned robotics, grounding, and task planning | **Active Research Track** | 6 |
| [E2](topics/e2_vision_language_action_models_and_generalist_robot_policies/topic_plan_and_session_timeline.md) | E. Language, multimodality, and embodied reasoning | Vision-language-action models and generalist robot policies | **Active Research Track** | 8 |
| [E3](topics/e3_embodied_memory_agentic_control_self_improvement_and_world_action_models/topic_plan_and_session_timeline.md) | E. Language, multimodality, and embodied reasoning | Embodied memory, agentic control, self-improvement, and world-action models | **Frontier Watchlist** | 5 |
| [S1](topics/s1_manipulation_grasping_contact_and_bimanual_control/topic_plan_and_session_timeline.md) | F. Specialization branches | Manipulation, grasping, contact, and bimanual control | **Specialization** | 5 |
| [S2](topics/s2_tactile_sensing_and_dexterous_manipulation/topic_plan_and_session_timeline.md) | F. Specialization branches | Tactile sensing and dexterous manipulation | **Specialization** | 4 |
| [S3](topics/s3_legged_locomotion_and_whole_body_control/topic_plan_and_session_timeline.md) | F. Specialization branches | Legged locomotion and whole-body control | **Specialization** | 5 |
| [S4](topics/s4_navigation_and_embodied_agents/topic_plan_and_session_timeline.md) | F. Specialization branches | Navigation and embodied agents | **Optional** | 4 |
| [S5](topics/s5_deformable_objects_learned_physics_and_graph_models/topic_plan_and_session_timeline.md) | F. Specialization branches | Deformable objects, learned physics, and graph models | **Optional** | 4 |
| [S6](topics/s6_multi_agent_reinforcement_learning/topic_plan_and_session_timeline.md) | F. Specialization branches | Multi-agent reinforcement learning | **Deferred** | 3 |
| [S7](topics/s7_differentiable_physics_robot_design_and_co_optimization/topic_plan_and_session_timeline.md) | F. Specialization branches | Differentiable physics, robot design, and co-optimization | **Deferred** | 2 |
| [S8](topics/s8_human_feedback_shared_autonomy_and_human_robot_interaction/topic_plan_and_session_timeline.md) | F. Specialization branches | Human feedback, shared autonomy, and human–robot interaction | **Optional** | 4 |

### Status interpretation

- **Shared Core:** common technical language and evidence standard for all members.
- **Active Research Track:** immediately executable, project-facing research line; the club selects tracks according to current work.
- **Specialization:** deeper branch owned by a subset of members.
- **Optional:** useful but not required unless project scope makes it relevant.
- **Frontier Watchlist:** monitored and periodically re-evaluated; not yet promoted into the durable core.
- **Deferred:** retained in the complete map but not currently scheduled.

## 3. Currently executable curriculum

The executable curriculum consists of all **Shared Core** topics plus selected **Active Research Tracks**. Specializations are activated only when a concrete platform or research question exists.

### Shared Core
- **F1 — Research evidence, reproducibility, and empirical methodology**
- **F2 — Optimization and deep-learning mechanics**
- **F3 — Neural architectures and sequence models**
- **F4 — Self-supervised and generative learning**
- **F5 — Foundation-model training, post-training, and adaptation**
- **F6 — Robot mechanics, dynamics, and interaction control**
- **F7 — Motion planning, trajectory optimization, and optimal control**
- **F8 — State estimation, sensor fusion, and SLAM**
- **P1 — Visual and multimodal representation learning**
- **L1 — Reinforcement-learning foundations**
- **L2 — Deep model-free continuous control**
- **L3 — Imitation learning and inverse reinforcement learning**
- **D2 — Robot-learning benchmarks, generalization, and failure analysis**

### Active Research Tracks
- **P2 — Detection, segmentation, grounding, and tracking**
- **P3 — 3D representation, reconstruction, and semantic mapping**
- **P4 — Video representation and predictive learning**
- **P5 — Learned dynamics, model-based RL, and world models**
- **L4 — Offline and offline-to-online reinforcement learning**
- **L6 — Generative action policies and action representations**
- **L7 — Sim-to-real transfer, system identification, and adaptation**
- **L8 — Safety, uncertainty, intervention, and constrained learning**
- **D1 — Robot-data collection, teleoperation, and dataset construction**
- **D3 — Research systems, experiment infrastructure, and reproducible training**
- **D4 — Efficient deployment, latency, compression, and real-time policy execution**
- **E1 — Language-conditioned robotics, grounding, and task planning**
- **E2 — Vision-language-action models and generalist robot policies**

### Specialization ownership
- **L5 — Goal-conditioned, hierarchical, meta-, and skill learning**
- **D5 — Synthetic data, learned simulators, and scalable data engines**
- **S1 — Manipulation, grasping, contact, and bimanual control**
- **S2 — Tactile sensing and dexterous manipulation**
- **S3 — Legged locomotion and whole-body control**

## 4. Global topic-dependency map

```text
Research standard
F1 ───────────────────────────────────────────────────────────────► D2, D3, every empirical topic

Learning/model foundations
F2 ─► F3 ─► F4 ─► P1 ─► P2/P3/P4 ─► P5
       │     │      │                ├──────────────► D5
       │     │      └───────────────► L6 ─► E2 ─► E3
       │     └──────────────────────► F5 ─► E1 ───┘
       └────────────────────────────► D3/D4

Robotics foundations
F6 ─► F7 ───────────────► P5 / E1 / L8 / S1 / S3 / S7
 └──► F8 ─► P3/P5/S4 ──► real-world data and evaluation

Learning to act
L1 ─► L2 ───────────────► L7/L8/P5/S3
 └──► L3 ─► L4 ─────────► real-world improvement / E3
          └► L6 ─────────► E2/D4/S1
L2 ─► L5 ────────────────► long-horizon abstraction / E3

Data and systems
D1 ─► L4/L6/E2/S1–S3
D2 evaluates every branch
D3 enables reproduction and scale
D4 constrains deployable policy architecture
D5 feeds P5/E2/E3 and synthetic-data specializations

Synthesis
P1–P4 + L3–L6 + D1–D4 + E1 ─► E2
E2 + P5 + L4/L5 + D5 ─────────► E3
```

## 5. Topic specifications and ordered paper sequences

### F1. Research evidence, reproducibility, and empirical methodology

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f1_research_evidence_reproducibility_and_empirical_methodology/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Experimental design, variance, seeds, statistical uncertainty, ablations, benchmark leakage, reproducibility, and claim–evidence separation.
- **Prerequisites:** Basic probability and scientific method.
- **Cross-area relationships:** Feeds every empirical topic; especially D2 and D3.
- **Place in curriculum:** First shared research-standard topic.
- **Supporting materials:** R015, R016

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P001 — Deep Reinforcement Learning That Matters](https://arxiv.org/abs/1709.06560) | Entry Point; Critical | Intermediate |
| 2 | [P002 — Implementation Matters in Deep Policy Gradients: A Case Study on PPO and TRPO](https://arxiv.org/abs/2005.12729) | Critical | Intermediate |
| 3 | [P003 — Deep Reinforcement Learning at the Edge of the Statistical Precipice](https://arxiv.org/abs/2108.13264) | Modern Core; Critical | Advanced |
| 4 | [P004 — Improving Reproducibility in Machine Learning Research: A Report from the NeurIPS 2019 Reproducibility Program](https://www.jmlr.org/papers/v22/20-303.html) | Bridge; Critical | Introductory |

### F2. Optimization and deep-learning mechanics

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f2_optimization_and_deep_learning_mechanics/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Stochastic optimization, initialization, normalization, regularization, generalization, and failure modes of deep optimization.
- **Prerequisites:** Calculus, linear algebra, probability, basic neural networks.
- **Cross-area relationships:** Prerequisite for F3–F5 and all learned-policy topics.
- **Place in curriculum:** Targeted foundation, not a general ML survey.
- **Supporting materials:** R011, R012, R013

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P005 — A Stochastic Approximation Method](https://doi.org/10.1214/aoms/1177729586) | Foundation | Advanced |
| 2 | [P006 — Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980) | Modern Core | Intermediate |
| 3 | [P007 — Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101) | Modern Core | Intermediate |
| 4 | [P008 — Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://proceedings.mlr.press/v37/ioffe15.html) | Foundation | Intermediate |

### F3. Neural architectures and sequence models

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f3_neural_architectures_and_sequence_models/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Residual networks, attention, Transformers, tokenization, positional representations, state-space alternatives, and architectural inductive biases.
- **Prerequisites:** F2.
- **Cross-area relationships:** Supports P1–P4, E1–E3, L6, and E2.
- **Place in curriculum:** Common architectural language.
- **Supporting materials:** R011, R012, R014

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P009 — Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html) | Foundation; Seminal | Intermediate |
| 2 | [P010 — Attention Is All You Need](https://arxiv.org/abs/1706.03762) | Seminal | Intermediate |
| 3 | [P011 — An Image Is Worth 16×16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929) | Bridge; Modern Core | Intermediate |
| 4 | [P012 — Efficiently Modeling Long Sequences with Structured State Spaces](https://arxiv.org/abs/2111.00396) | Optional Specialization; Bridge | Advanced |
| 5 | [P013 — Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752) | Modern Core; Optional | Advanced |

### F4. Self-supervised and generative learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f4_self_supervised_and_generative_learning/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Contrastive, masked, predictive, diffusion, score-based, and flow-based objectives.
- **Prerequisites:** F2–F3; probability.
- **Cross-area relationships:** Supports P1, P4, P5, L6, D5, and E2.
- **Place in curriculum:** Mathematical bridge from representation learning to generative action policies.
- **Supporting materials:** R011, R012, R013

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P014 — A Simple Framework for Contrastive Learning of Visual Representations](https://proceedings.mlr.press/v119/chen20j.html) | Foundation | Intermediate |
| 2 | [P015 — Masked Autoencoders Are Scalable Vision Learners](https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.html) | Modern Core | Intermediate |
| 3 | [P016 — Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) | Foundation; Seminal | Advanced |
| 4 | [P017 — Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456) | Bridge | Advanced |
| 5 | [P018 — Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747) | Modern Core | Advanced |
| 6 | [P019 — Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow](https://arxiv.org/abs/2209.03003) | Optional Specialization | Advanced |

### F5. Foundation-model training, post-training, and adaptation

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f5_foundation_model_training_post_training_and_adaptation/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Scaling laws, data–compute tradeoffs, instruction tuning, preference optimization, parameter-efficient adaptation, quantization, and multimodal alignment.
- **Prerequisites:** F2–F4.
- **Cross-area relationships:** Direct prerequisite for E1–E3 and D4; useful for P1.
- **Place in curriculum:** Complete model lifecycle at a level relevant to embodied systems.
- **Supporting materials:** R012, R014, R015, R016, R022

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P020 — Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361) | Foundation | Advanced |
| 2 | [P021 — Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) | Modern Core | Advanced |
| 3 | [P022 — Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155) | Bridge; Modern Core | Advanced |
| 4 | [P023 — LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) | Modern Core | Intermediate |
| 5 | [P024 — QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314) | Modern Core | Advanced |
| 6 | [P025 — Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290) | Modern Core | Advanced |
| 7 | [P026 — Flamingo: a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198) | Bridge | Advanced |
| 8 | [P027 — BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models](https://arxiv.org/abs/2301.12597) | Modern Core | Intermediate |

### F6. Robot mechanics, dynamics, and interaction control

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f6_robot_mechanics_dynamics_and_interaction_control/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Kinematics, rigid-body dynamics, operational-space control, force/impedance/admittance control, redundancy, and contact interaction.
- **Prerequisites:** Linear algebra, differential equations, basic control.
- **Cross-area relationships:** Constrains every physical-policy topic; links to S1–S3 and L7–L8.
- **Place in curriculum:** Classical foundation needed to judge learned controllers.
- **Supporting materials:** R005, R006, R020

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P028 — Impedance Control: An Approach to Manipulation, Part I—Theory](https://doi.org/10.1115/1.3140702) | Foundation; Seminal | Advanced |
| 2 | [P029 — A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation](https://doi.org/10.1109/JRA.1987.1087068) | Seminal | Advanced |
| 3 | [P030 — Dynamic Movement Primitives: A Framework for Motor Control in Humans and Humanoid Robotics](https://doi.org/10.1007/4-431-31381-8_23) | Bridge | Intermediate |
| 4 | [P031 — Control Barrier Function Based Quadratic Programs for Safety Critical Systems](https://doi.org/10.1109/TAC.2016.2638961) | Modern Core; Bridge | Advanced |

### F7. Motion planning, trajectory optimization, and optimal control

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f7_motion_planning_trajectory_optimization_and_optimal_control/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Sampling-based planning, trajectory optimization, model predictive control, task-and-motion planning, and safety filters.
- **Prerequisites:** F6; optimization.
- **Cross-area relationships:** Links classical planning to P5, E1, L6, L8, and S1–S4.
- **Place in curriculum:** Shared planning vocabulary before learned planning.
- **Supporting materials:** R005, R006, R007, R020

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P032 — Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces](https://doi.org/10.1109/70.508439) | Seminal | Intermediate |
| 2 | [P033 — Rapidly-Exploring Random Trees: A New Tool for Path Planning](https://msl.cs.illinois.edu/~lavalle/papers/Lav98c.pdf) | Seminal | Intermediate |
| 3 | [P034 — CHOMP: Gradient Optimization Techniques for Efficient Motion Planning](https://doi.org/10.1109/ROBOT.2009.5152817) | Bridge | Advanced |
| 4 | [P035 — Motion Planning with Sequential Convex Optimization and Convex Collision Checking](https://arxiv.org/abs/1311.5605) | Modern Core | Advanced |
| 5 | [P036 — Hierarchical Task and Motion Planning in the Now](https://doi.org/10.1109/ICRA.2011.5980391) | Bridge | Advanced |
| 6 | [P037 — Information-Theoretic Model Predictive Control: Theory and Applications to Autonomous Driving](https://arxiv.org/abs/1707.02342) | Modern Core | Advanced |

### F8. State estimation, sensor fusion, and SLAM

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/f8_state_estimation_sensor_fusion_and_slam/topic_plan_and_session_timeline.md)

- **Area:** A. Shared foundations
- **Execution status:** Shared Core
- **Scope:** Bayesian filtering, smoothing, factor graphs, visual–inertial odometry, mapping, observability, and uncertainty.
- **Prerequisites:** Probability, linear algebra, F6.
- **Cross-area relationships:** Supports P3–P5, S3–S4, and real-world evaluation.
- **Place in curriculum:** Physical-state grounding and uncertainty foundation.
- **Supporting materials:** R008, R009, R010

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P038 — A New Approach to Linear Filtering and Prediction Problems](https://doi.org/10.1115/1.3662552) | Foundation; Seminal | Advanced |
| 2 | [P039 — iSAM2: Incremental Smoothing and Mapping Using the Bayes Tree](https://doi.org/10.1177/0278364911430419) | Modern Core | Advanced |
| 3 | [P040 — On-Manifold Preintegration for Real-Time Visual–Inertial Odometry](https://arxiv.org/abs/1512.02363) | Modern Core | Advanced |
| 4 | [P041 — VINS-Mono: A Robust and Versatile Monocular Visual–Inertial State Estimator](https://arxiv.org/abs/1708.03852) | Modern Core | Advanced |
| 5 | [P042 — ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual–Inertial, and Multi-Map SLAM](https://arxiv.org/abs/2007.11898) | Modern Core | Advanced |

### P1. Visual and multimodal representation learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/p1_visual_and_multimodal_representation_learning/topic_plan_and_session_timeline.md)

- **Area:** B. Perception, spatial intelligence, and world models
- **Execution status:** Shared Core
- **Scope:** Transferable image and image–text representations, dense features, frozen encoders, and multimodal pretraining.
- **Prerequisites:** F3–F5.
- **Cross-area relationships:** Prerequisite for P2–P4, E1–E2, and L6.
- **Place in curriculum:** Durable visual foundation.
- **Supporting materials:** R012, R013

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P043 — Learning Transferable Visual Models From Natural Language Supervision](https://proceedings.mlr.press/v139/radford21a.html) | Seminal; Bridge | Intermediate |
| 2 | [P044 — Emerging Properties in Self-Supervised Vision Transformers](https://openaccess.thecvf.com/content/ICCV2021/html/Caron_Emerging_Properties_in_Self-Supervised_Vision_Transformers_ICCV_2021_paper.html) | Modern Core | Intermediate |
| 3 | [P045 — DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193) | Modern Core | Intermediate |
| 4 | [P046 — Sigmoid Loss for Language Image Pre-Training](https://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html) | Modern Core | Advanced |
| 5 | [P047 — What Makes for Good Visual Representations for Robot Manipulation?](https://arxiv.org/abs/2107.12344) | Critical; Bridge | Intermediate |

### P2. Detection, segmentation, grounding, and tracking

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/p2_detection_segmentation_grounding_and_tracking/topic_plan_and_session_timeline.md)

- **Area:** B. Perception, spatial intelligence, and world models
- **Execution status:** Active Research Track
- **Scope:** Set-based detection, instance and promptable segmentation, open-vocabulary grounding, and temporal object tracking.
- **Prerequisites:** P1.
- **Cross-area relationships:** Supports automated labeling in D1, semantic planning in E1, and manipulation in S1.
- **Place in curriculum:** Executable perception and data-processing track.
- **Supporting materials:** R013, R017

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P048 — Mask R-CNN](https://openaccess.thecvf.com/content_ICCV_2017/html/He_Mask_R-CNN_ICCV_2017_paper.html) | Foundation | Intermediate |
| 2 | [P049 — End-to-End Object Detection with Transformers](https://arxiv.org/abs/2005.12872) | Bridge; Modern Core | Intermediate |
| 3 | [P050 — Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection](https://arxiv.org/abs/2303.05499) | Modern Core | Intermediate |
| 4 | [P051 — Segment Anything](https://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html) | Modern Core | Intermediate |
| 5 | [P052 — SAM 2: Segment Anything in Images and Videos](https://arxiv.org/abs/2408.00714) | Modern Core | Intermediate |
| 6 | [P053 — XMem: Long-Term Video Object Segmentation with an Atkinson–Shiffrin Memory Model](https://arxiv.org/abs/2207.07115) | Bridge; Optional | Advanced |

### P3. 3D representation, reconstruction, and semantic mapping

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/p3_3d_representation_reconstruction_and_semantic_mapping/topic_plan_and_session_timeline.md)

- **Area:** B. Perception, spatial intelligence, and world models
- **Execution status:** Active Research Track
- **Scope:** Point sets, implicit fields, radiance fields, Gaussian splats, open-vocabulary 3D features, and semantic maps.
- **Prerequisites:** P1, F8.
- **Cross-area relationships:** Connects perception to planning, manipulation, simulation, and world models.
- **Place in curriculum:** Spatial-intelligence track.
- **Supporting materials:** R008, R013, R019, R021

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P054 — PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation](https://openaccess.thecvf.com/content_cvpr_2017/html/Qi_PointNet_Deep_Learning_CVPR_2017_paper.html) | Foundation; Seminal | Intermediate |
| 2 | [P055 — PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space](https://arxiv.org/abs/1706.02413) | Bridge; Modern Core | Intermediate |
| 3 | [P056 — Point Transformer](https://openaccess.thecvf.com/content/ICCV2021/html/Zhao_Point_Transformer_ICCV_2021_paper.html) | Modern Core | Advanced |
| 4 | [P057 — Occupancy Networks: Learning 3D Reconstruction in Function Space](https://openaccess.thecvf.com/content_CVPR_2019/html/Mescheder_Occupancy_Networks_Learning_3D_Reconstruction_in_Function_Space_CVPR_2019_paper.html) | Bridge | Advanced |
| 5 | [P058 — NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis](https://arxiv.org/abs/2003.08934) | Seminal; Bridge | Advanced |
| 6 | [P059 — 3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) | Modern Core | Advanced |
| 7 | [P060 — ConceptFusion: Open-set Multimodal 3D Mapping](https://arxiv.org/abs/2302.07241) | Modern Core | Advanced |

### P4. Video representation and predictive learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/p4_video_representation_and_predictive_learning/topic_plan_and_session_timeline.md)

- **Area:** B. Perception, spatial intelligence, and world models
- **Execution status:** Active Research Track
- **Scope:** Temporal self-supervision, masked video modeling, joint-embedding prediction, action-free physical representations, and video-to-action transfer.
- **Prerequisites:** F3–F4, P1.
- **Cross-area relationships:** Bridge from perception to P5, D5, and E3.
- **Place in curriculum:** Core for physical prediction and learning from human video.
- **Supporting materials:** R013, R023

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P061 — Representation Learning with Contrastive Predictive Coding](https://arxiv.org/abs/1807.03748) | Foundation | Advanced |
| 2 | [P062 — VideoMAE: Masked Autoencoders are Data-Efficient Learners for Self-Supervised Video Pre-Training](https://arxiv.org/abs/2203.12602) | Modern Core | Intermediate |
| 3 | [P063 — Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://openaccess.thecvf.com/content/CVPR2023/html/Assran_Self-Supervised_Learning_From_Images_With_a_Joint-Embedding_Predictive_Architecture_CVPR_2023_paper.html) | Bridge | Advanced |
| 4 | [P064 — Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471) | Modern Core | Advanced |
| 5 | [P065 — V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) | Modern Core; Frontier Bridge | Expert |

### P5. Learned dynamics, model-based RL, and world models

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/p5_learned_dynamics_model_based_rl_and_world_models/topic_plan_and_session_timeline.md)

- **Area:** B. Perception, spatial intelligence, and world models
- **Execution status:** Active Research Track
- **Scope:** Probabilistic dynamics, latent state-space models, imagined rollouts, value-equivalent models, and planning in learned models.
- **Prerequisites:** F4, F7, L1–L2.
- **Cross-area relationships:** Connects control, prediction, data engines, and frontier world-action models.
- **Place in curriculum:** Primary world-model lineage.
- **Supporting materials:** R004, R006, R026

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P066 — PILCO: A Model-Based and Data-Efficient Approach to Policy Search](https://proceedings.mlr.press/v15/deisenroth11a.html) | Foundation; Seminal | Expert |
| 2 | [P067 — Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models](https://arxiv.org/abs/1805.12114) | Modern Core | Advanced |
| 3 | [P068 — Learning Latent Dynamics for Planning from Pixels](https://proceedings.mlr.press/v97/hafner19a.html) | Bridge; Modern Core | Advanced |
| 4 | [P069 — Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model](https://www.nature.com/articles/s41586-020-03051-4) | Bridge | Expert |
| 5 | [P070 — Mastering Diverse Domains through World Models](https://arxiv.org/abs/2301.04104) | Modern Core | Expert |
| 6 | [P071 — TD-MPC2: Scalable, Robust World Models for Continuous Control](https://arxiv.org/abs/2310.16828) | Modern Core | Expert |

### L1. Reinforcement-learning foundations

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l1_reinforcement_learning_foundations/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Shared Core
- **Scope:** MDPs/POMDPs, Bellman equations, temporal-difference learning, value functions, policy gradients, actor–critic methods, and function approximation.
- **Prerequisites:** Probability, optimization.
- **Cross-area relationships:** Prerequisite for L2, L4–L5, L7–L8, and P5.
- **Place in curriculum:** Mathematical RL foundation.
- **Supporting materials:** R001, R002, R003, R004

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P072 — Learning to Predict by the Methods of Temporal Differences](https://doi.org/10.1007/BF00115009) | Foundation; Seminal | Advanced |
| 2 | [P073 — Q-Learning](https://doi.org/10.1007/BF00992698) | Seminal | Advanced |
| 3 | [P074 — Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://doi.org/10.1007/BF00992696) | Seminal | Advanced |
| 4 | [P075 — Human-Level Control through Deep Reinforcement Learning](https://www.nature.com/articles/nature14236) | Bridge; Seminal | Intermediate |
| 5 | [P076 — Asynchronous Methods for Deep Reinforcement Learning](https://proceedings.mlr.press/v48/mniha16.html) | Bridge | Intermediate |

### L2. Deep model-free continuous control

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l2_deep_model_free_continuous_control/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Shared Core
- **Scope:** Trust regions, generalized advantage estimation, deterministic and stochastic actor–critic methods, replay, entropy, and sparse-reward goal learning.
- **Prerequisites:** L1, F2.
- **Cross-area relationships:** Baseline family for physical control and comparison with imitation/VLA methods.
- **Place in curriculum:** Durable algorithmic core.
- **Supporting materials:** R001, R003, R004

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P077 — Trust Region Policy Optimization](https://proceedings.mlr.press/v37/schulman15.html) | Foundation; Modern Core | Advanced |
| 2 | [P078 — High-Dimensional Continuous Control Using Generalized Advantage Estimation](https://arxiv.org/abs/1506.02438) | Bridge | Advanced |
| 3 | [P079 — Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347) | Modern Core | Intermediate |
| 4 | [P080 — Continuous Control with Deep Reinforcement Learning](https://arxiv.org/abs/1509.02971) | Bridge | Intermediate |
| 5 | [P081 — Addressing Function Approximation Error in Actor-Critic Methods](https://proceedings.mlr.press/v80/fujimoto18a.html) | Modern Core | Intermediate |
| 6 | [P082 — Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor](https://proceedings.mlr.press/v80/haarnoja18b.html) | Modern Core | Advanced |
| 7 | [P083 — Hindsight Experience Replay](https://arxiv.org/abs/1707.01495) | Bridge | Intermediate |

### L3. Imitation learning and inverse reinforcement learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l3_imitation_learning_and_inverse_reinforcement_learning/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Shared Core
- **Scope:** Behavior cloning, covariate shift, interactive imitation, occupancy matching, reward recovery, and demonstration-guided policy optimization.
- **Prerequisites:** L1; supervised learning.
- **Cross-area relationships:** Precedes L4, L6, D1, and most robot-policy work.
- **Place in curriculum:** Central learning-from-demonstration lineage.
- **Supporting materials:** R001, R004, R018

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P084 — A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning](https://proceedings.mlr.press/v15/ross11a.html) | Seminal | Advanced |
| 2 | [P085 — Maximum Entropy Inverse Reinforcement Learning](https://www.aaai.org/Papers/AAAI/2008/AAAI08-227.pdf) | Foundation | Advanced |
| 3 | [P086 — Generative Adversarial Imitation Learning](https://arxiv.org/abs/1606.03476) | Modern Core | Advanced |
| 4 | [P087 — Learning Robust Rewards with Adversarial Inverse Reinforcement Learning](https://arxiv.org/abs/1710.11248) | Bridge | Advanced |
| 5 | [P088 — Learning Complex Dexterous Manipulation with Deep Reinforcement Learning and Demonstrations](https://arxiv.org/abs/1709.10087) | Bridge; Modern Core | Advanced |
| 6 | [P089 — What Matters in Learning from Offline Human Demonstrations for Robot Manipulation](https://arxiv.org/abs/2108.03298) | Critical; Modern Core | Intermediate |

### L4. Offline and offline-to-online reinforcement learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l4_offline_and_offline_to_online_reinforcement_learning/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Active Research Track
- **Scope:** Distributional shift, conservative value learning, sequence-model policies, policy extraction, and online fine-tuning from logged data.
- **Prerequisites:** L1–L3.
- **Cross-area relationships:** Links static robot datasets to real-world improvement and E3.
- **Place in curriculum:** High-value active track for limited robot interaction.
- **Supporting materials:** R001, R002, R004, R018, R025

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P090 — Off-Policy Deep Reinforcement Learning without Exploration](https://proceedings.mlr.press/v97/fujimoto19a.html) | Foundation | Advanced |
| 2 | [P091 — Conservative Q-Learning for Offline Reinforcement Learning](https://arxiv.org/abs/2006.04779) | Modern Core | Advanced |
| 3 | [P092 — Offline Reinforcement Learning with Implicit Q-Learning](https://arxiv.org/abs/2110.06169) | Modern Core | Advanced |
| 4 | [P093 — Decision Transformer: Reinforcement Learning via Sequence Modeling](https://arxiv.org/abs/2106.01345) | Bridge | Intermediate |
| 5 | [P094 — Efficient Online Reinforcement Learning with Offline Data](https://arxiv.org/abs/2302.02948) | Modern Core | Advanced |
| 6 | [P095 — Cal-QL: Calibrated Offline RL Pre-Training for Efficient Online Fine-Tuning](https://arxiv.org/abs/2303.05479) | Modern Core | Advanced |

### L5. Goal-conditioned, hierarchical, meta-, and skill learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l5_goal_conditioned_hierarchical_meta_and_skill_learning/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Specialization
- **Scope:** Temporal abstraction, universal value functions, unsupervised skills, hierarchical control, meta-learning, and task inference.
- **Prerequisites:** L1–L2.
- **Cross-area relationships:** Supports long-horizon planning, transfer, and E3.
- **Place in curriculum:** Specialized abstraction and transfer branch.
- **Supporting materials:** R001, R004

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P096 — Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction in Reinforcement Learning](https://doi.org/10.1016/S0004-3702(99)00052-1) | Seminal | Expert |
| 2 | [P097 — Universal Value Function Approximators](https://proceedings.mlr.press/v37/schaul15.html) | Bridge | Advanced |
| 3 | [P098 — Diversity Is All You Need: Learning Skills without a Reward Function](https://arxiv.org/abs/1802.06070) | Modern Core | Advanced |
| 4 | [P099 — Data-Efficient Hierarchical Reinforcement Learning](https://arxiv.org/abs/1805.08296) | Modern Core | Advanced |
| 5 | [P100 — Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://proceedings.mlr.press/v70/finn17a.html) | Bridge | Advanced |
| 6 | [P101 — Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables](https://proceedings.mlr.press/v97/rakelly19a.html) | Modern Core | Expert |

### L6. Generative action policies and action representations

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l6_generative_action_policies_and_action_representations/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Active Research Track
- **Scope:** Multimodal action distributions, latent-variable policies, action chunking, autoregressive tokens, diffusion, flow matching, and receding-horizon execution.
- **Prerequisites:** F3–F4, L3.
- **Cross-area relationships:** Direct bridge to E2 and D4.
- **Place in curriculum:** Modern core policy architecture track.
- **Supporting materials:** R004, R017, R018

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P102 — Behavior Transformers: Cloning k Modes with One Stone](https://arxiv.org/abs/2206.11251) | Bridge | Advanced |
| 2 | [P103 — Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://arxiv.org/abs/2304.13705) | Modern Core | Intermediate |
| 3 | [P104 — Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](https://arxiv.org/abs/2303.04137) | Modern Core | Advanced |
| 4 | [P105 — RT-1: Robotics Transformer for Real-World Control at Scale](https://arxiv.org/abs/2212.06817) | Bridge | Advanced |
| 5 | [P106 — FAST: Efficient Action Tokenization for Vision-Language-Action Models](https://arxiv.org/abs/2501.09747) | Modern Core | Advanced |

### L7. Sim-to-real transfer, system identification, and adaptation

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l7_sim_to_real_transfer_system_identification_and_adaptation/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Active Research Track
- **Scope:** Domain and dynamics randomization, simulator calibration, privileged learning, online adaptation, latency and actuator modeling, and robustness.
- **Prerequisites:** F6–F8, L1–L2.
- **Cross-area relationships:** Connects simulation, physical deployment, locomotion, and manipulation.
- **Place in curriculum:** Required for physical-system competence.
- **Supporting materials:** R006, R019, R020, R021, R024

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P107 — Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World](https://arxiv.org/abs/1703.06907) | Seminal | Intermediate |
| 2 | [P108 — Sim-to-Real Transfer of Robotic Control with Dynamics Randomization](https://arxiv.org/abs/1710.06537) | Seminal; Bridge | Advanced |
| 3 | [P109 — SimOpt: Learning to Adapt Simulators to Real-World Conditions](https://arxiv.org/abs/1810.05687) | Modern Core | Advanced |
| 4 | [P110 — Learning Agile and Dynamic Motor Skills for Legged Robots](https://www.science.org/doi/10.1126/scirobotics.aau5872) | Modern Core | Advanced |
| 5 | [P111 — RMA: Rapid Motor Adaptation for Legged Robots](https://arxiv.org/abs/2107.04034) | Modern Core | Advanced |

### L8. Safety, uncertainty, intervention, and constrained learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/l8_safety_uncertainty_intervention_and_constrained_learning/topic_plan_and_session_timeline.md)

- **Area:** C. Learning to act
- **Execution status:** Active Research Track
- **Scope:** Constrained MDPs, control barrier functions, uncertainty estimation, recovery policies, human intervention, and risk-sensitive evaluation.
- **Prerequisites:** F7, L1–L4.
- **Cross-area relationships:** Cross-cuts all deployment topics and D2.
- **Place in curriculum:** Safety and failure-management track.
- **Supporting materials:** R001, R004, R018

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P112 — Constrained Policy Optimization](https://proceedings.mlr.press/v70/achiam17a.html) | Foundation; Modern Core | Advanced |
| 2 | [P113 — Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles](https://arxiv.org/abs/1612.01474) | Foundation; Modern Core | Advanced |
| 3 | [P114 — Recovery RL: Safe Reinforcement Learning with Learned Recovery Zones](https://arxiv.org/abs/1807.09308) | Bridge | Advanced |
| 4 | [P115 — ThriftyDAgger: Budget-Aware Novelty and Risk Gating for Interactive Imitation Learning](https://arxiv.org/abs/2109.08273) | Modern Core | Advanced |
| 5 | [P116 — HIL-SERL: Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning](https://doi.org/10.1126/scirobotics.ads5033) | Modern Core | Advanced |

### D1. Robot-data collection, teleoperation, and dataset construction

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/d1_robot_data_collection_teleoperation_and_dataset_construction/topic_plan_and_session_timeline.md)

- **Area:** D. Data, evaluation, and research systems
- **Execution status:** Active Research Track
- **Scope:** Teleoperation interfaces, synchronization, action-space normalization, multi-embodiment schemas, quality control, human video, and data scaling.
- **Prerequisites:** L3, F8.
- **Cross-area relationships:** Feeds L4, L6, E2, S1–S3, and D5.
- **Place in curriculum:** Data-engineering and collection track.
- **Supporting materials:** R017, R018

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P117 — RoboNet: Large-Scale Multi-Robot Learning](https://arxiv.org/abs/1910.11215) | Foundation | Intermediate |
| 2 | [P118 — BridgeData V2: A Dataset for Robot Learning at Scale](https://arxiv.org/abs/2308.12952) | Modern Core | Intermediate |
| 3 | [P119 — Open X-Embodiment: Robotic Learning Datasets and RT-X Models](https://arxiv.org/abs/2310.08864) | Seminal; Modern Core | Advanced |
| 4 | [P120 — DROID: A Large-Scale In-the-Wild Robot Manipulation Dataset](https://arxiv.org/abs/2403.12945) | Modern Core | Advanced |
| 5 | [P121 — Mobile ALOHA: Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation](https://arxiv.org/abs/2401.02117) | Modern Core; Bridge | Intermediate |
| 6 | [P122 — Data Scaling Laws in Imitation Learning for Robotic Manipulation](https://proceedings.iclr.cc/paper_files/paper/2025/hash/88b7b2c896506daabc8d3fd587055167-Abstract-Conference.html) | Modern Core; Critical | Advanced |

### D2. Robot-learning benchmarks, generalization, and failure analysis

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/d2_robot_learning_benchmarks_generalization_and_failure_analysis/topic_plan_and_session_timeline.md)

- **Area:** D. Data, evaluation, and research systems
- **Execution status:** Shared Core
- **Scope:** Simulation and real-robot benchmarks, distribution shifts, task definitions, success measurement, robustness perturbations, and statistical comparison.
- **Prerequisites:** F1; basic competence in relevant policy topic.
- **Cross-area relationships:** Defines evidence standards for every active track.
- **Place in curriculum:** Shared evaluation core.
- **Supporting materials:** R017, R018, R019

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P123 — RLBench: The Robot Learning Benchmark & Learning Environment](https://arxiv.org/abs/1909.12271) | Foundation | Intermediate |
| 2 | [P124 — CALVIN: A Benchmark for Language-Conditioned Policy Learning for Long-Horizon Robot Manipulation Tasks](https://arxiv.org/abs/2112.03227) | Modern Core | Intermediate |
| 3 | [P125 — LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning](https://arxiv.org/abs/2306.03310) | Modern Core | Intermediate |
| 4 | [P126 — ManiSkill2: A Unified Benchmark for Generalizable Manipulation Skills](https://arxiv.org/abs/2302.04659) | Modern Core | Advanced |
| 5 | [P127 — SimplerEnv: Simulated Manipulation Policy Evaluation Environments with Real-to-Sim Transfer](https://arxiv.org/abs/2405.05941) | Modern Core; Critical | Advanced |
| 6 | [P128 — RoboArena: Distributed Real-World Evaluation of Generalist Robot Policies](https://robo-arena.github.io/) | Frontier Bridge; Critical | Advanced |
| 7 | [P129 — LIBERO-Plus: A Progressive Robustness Benchmark for Vision-Language-Action Models](https://openaccess.thecvf.com/content/CVPR2026/html/Fei_LIBERO-Plus_A_Progressive_Robustness_Benchmark_for_Visual-Language-Action_Models_CVPR_2026_paper.html) | Critical; Frontier | Advanced |
| 8 | [P130 — RobotArena∞: Scalable Robot Benchmarking via Real-to-Sim Translation](https://robotarenainf.github.io/) | Frontier; Critical | Expert |

### D3. Research systems, experiment infrastructure, and reproducible training

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/d3_research_systems_experiment_infrastructure_and_reproducible_training/topic_plan_and_session_timeline.md)

- **Area:** D. Data, evaluation, and research systems
- **Execution status:** Active Research Track
- **Scope:** Configuration and provenance, distributed training, checkpointing, deterministic evaluation, artifact tracking, hardware-aware profiling, and recovery.
- **Prerequisites:** F1–F5.
- **Cross-area relationships:** Supports all implementation and reproduction work.
- **Place in curriculum:** Systems competence track.
- **Supporting materials:** R015, R016, R017, R021

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P131 — Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems) | Entry Point; Critical | Introductory |
| 2 | [P132 — ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054) | Modern Core | Advanced |
| 3 | [P133 — Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism](https://arxiv.org/abs/1909.08053) | Bridge | Advanced |
| 4 | [P134 — SERL: A Software Suite for Sample-Efficient Robotic Reinforcement Learning](https://arxiv.org/abs/2401.16013) | Modern Core | Intermediate |

### D4. Efficient deployment, latency, compression, and real-time policy execution

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/d4_efficient_deployment_latency_compression_and_real_time_policy_execution/topic_plan_and_session_timeline.md)

- **Area:** D. Data, evaluation, and research systems
- **Execution status:** Active Research Track
- **Scope:** Action frequency, asynchronous inference, action chunking, token compression, PEFT, quantization, distillation, edge deployment, and closed-loop latency.
- **Prerequisites:** F5, L6, E2.
- **Cross-area relationships:** Links model design to physical control constraints.
- **Place in curriculum:** Deployment track.
- **Supporting materials:** R015, R016, R017

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P135 — Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success](https://arxiv.org/abs/2502.19645) | Modern Core | Advanced |
| 2 | [P136 — Real-Time Action Chunking with Large Models](https://www.pi.website/research/real_time_chunking) | Modern Core; Systems | Advanced |
| 3 | [P137 — SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics](https://arxiv.org/abs/2506.01844) | Modern Core; Reproduction Candidate | Intermediate |
| 4 | [P138 — Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180) | Optional Specialization | Advanced |

### D5. Synthetic data, learned simulators, and scalable data engines

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/d5_synthetic_data_learned_simulators_and_scalable_data_engines/topic_plan_and_session_timeline.md)

- **Area:** D. Data, evaluation, and research systems
- **Execution status:** Specialization
- **Scope:** Procedural generation, imitation-data generation, world-model rollouts, video generation, learned physics, and synthetic-to-real validation.
- **Prerequisites:** P3–P5, L7, D1.
- **Cross-area relationships:** Feeds E2 and specialization tracks.
- **Place in curriculum:** Specialized scaling and data-generation branch.
- **Supporting materials:** R019, R021, R024, R026

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P139 — MimicGen: A Data Generation System for Scalable Robot Learning using Human Demonstrations](https://arxiv.org/abs/2310.17596) | Modern Core | Advanced |
| 2 | [P140 — RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning via Generative Simulation](https://arxiv.org/abs/2311.01455) | Bridge; Frontier | Expert |
| 3 | [P141 — GenSim: Generating Robotic Simulation Tasks via Large Language Models](https://arxiv.org/abs/2310.01361) | Bridge | Advanced |
| 4 | [P142 — DreamGen: Unlocking Generalization in Robot Learning through Neural Trajectories](https://arxiv.org/abs/2505.12705) | Frontier Bridge | Expert |
| 5 | [P143 — DreamDojo: A Generalist Robot World Model from Large-Scale Human Videos](https://dreamdojo-world.github.io/) | Frontier | Expert |

### E1. Language-conditioned robotics, grounding, and task planning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/e1_language_conditioned_robotics_grounding_and_task_planning/topic_plan_and_session_timeline.md)

- **Area:** E. Language, multimodality, and embodied reasoning
- **Execution status:** Active Research Track
- **Scope:** Affordance grounding, code/program generation, multimodal prompts, object-centric planning, high-level/low-level decomposition, and embodied VLMs.
- **Prerequisites:** F3–F5, P1–P3, F7.
- **Cross-area relationships:** Bridge from semantic models to E2 and E3.
- **Place in curriculum:** Embodied reasoning lineage before end-to-end VLAs.
- **Supporting materials:** R014, R023

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P144 — Do As I Can, Not As I Say: Grounding Language in Robotic Affordances](https://arxiv.org/abs/2204.01691) | Seminal; Bridge | Intermediate |
| 2 | [P145 — Code as Policies: Language Model Programs for Embodied Control](https://arxiv.org/abs/2209.07753) | Bridge | Intermediate |
| 3 | [P146 — Inner Monologue: Embodied Reasoning through Planning with Language Models](https://arxiv.org/abs/2207.05608) | Bridge | Intermediate |
| 4 | [P147 — PaLM-E: An Embodied Multimodal Language Model](https://arxiv.org/abs/2303.03378) | Modern Core | Advanced |
| 5 | [P148 — VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models](https://arxiv.org/abs/2307.05973) | Modern Core | Advanced |
| 6 | [P149 — VIMA: General Robot Manipulation with Multimodal Prompts](https://arxiv.org/abs/2210.03094) | Modern Core | Advanced |

### E2. Vision-language-action models and generalist robot policies

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/e2_vision_language_action_models_and_generalist_robot_policies/topic_plan_and_session_timeline.md)

- **Area:** E. Language, multimodality, and embodied reasoning
- **Execution status:** Active Research Track
- **Scope:** Cross-embodiment pretraining, VLM-to-action adaptation, discrete versus continuous actions, action experts, heterogeneous co-training, and policy adaptation.
- **Prerequisites:** P1–P4, L3–L6, D1–D4, E1.
- **Cross-area relationships:** Major synthesis point, not the sole curriculum organizer.
- **Place in curriculum:** Primary generalist-policy track.
- **Supporting materials:** R014, R017, R022, R023

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P150 — RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818) | Seminal; Bridge | Advanced |
| 2 | [P151 — Octo: An Open-Source Generalist Robot Policy](https://arxiv.org/abs/2405.12213) | Modern Core | Advanced |
| 3 | [P152 — OpenVLA: An Open-Source Vision-Language-Action Model](https://proceedings.mlr.press/v270/kim25c.html) | Modern Core | Advanced |
| 4 | [P153 — π0: A Vision-Language-Action Flow Model for General Robot Control](https://www.pi.website/download/pi0.pdf) | Modern Core; Frontier Bridge | Expert |
| 5 | [P154 — π0.5: A Vision-Language-Action Model with Open-World Generalization](https://proceedings.mlr.press/v305/black25a.html) | Modern Core; Frontier | Expert |
| 6 | [P155 — GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734) | Modern Core; Frontier | Expert |
| 7 | [P156 — Gemini Robotics: Bringing AI into the Physical World](https://arxiv.org/abs/2503.20020) | Frontier; Synthesis | Expert |
| 8 | [P157 — What Matters in Building Vision–Language–Action Models for Generalist Robots](https://www.nature.com/articles/s42256-025-01168-7) | Critical; Modern Core | Expert |

### E3. Embodied memory, agentic control, self-improvement, and world-action models

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/e3_embodied_memory_agentic_control_self_improvement_and_world_action_models/topic_plan_and_session_timeline.md)

- **Area:** E. Language, multimodality, and embodied reasoning
- **Execution status:** Frontier Watchlist
- **Scope:** Long/short-term memory, test-time adaptation, skill discovery, autonomous data loops, reward models, planners above VLAs, and predictive action-conditioned models.
- **Prerequisites:** E1–E2, P4–P5, L4–L5, D5.
- **Cross-area relationships:** Monitored frontier; promote only after independent evidence and reproducibility mature.
- **Place in curriculum:** Fast-moving integration frontier.
- **Supporting materials:** R014, R017, R023, R026

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P158 — MEM: Multi-Scale Embodied Memory for Vision Language Action Models](https://arxiv.org/abs/2603.03596) | Frontier | Expert |
| 2 | [P159 — π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](https://arxiv.org/abs/2604.15483) | Frontier | Expert |
| 3 | [P160 — Vesta: A Generalist Embodied Reasoning Model](https://arxiv.org/abs/2606.20905) | Frontier | Expert |
| 4 | [P161 — RoboTTT: Context Scaling for Robot Policies](https://arxiv.org/abs/2607.15275) | Frontier | Expert |
| 5 | [P162 — ENPIRE: Agentic Robot Policy Self-Improvement in the Real World](https://arxiv.org/abs/2606.19980) | Frontier | Expert |

### S1. Manipulation, grasping, contact, and bimanual control

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s1_manipulation_grasping_contact_and_bimanual_control/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Specialization
- **Scope:** Grasp synthesis, spatial action structure, contact-rich insertion, semantic manipulation, bimanual coordination, and mobile manipulation.
- **Prerequisites:** F6–F8, P2–P3, L3, L6.
- **Cross-area relationships:** Primary manipulation specialization.
- **Place in curriculum:** Executable when tied to a robot platform.
- **Supporting materials:** R005, R018, R019, R020

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P163 — Dex-Net 2.0: Deep Learning to Plan Robust Grasps with Synthetic Point Clouds and Analytic Grasp Metrics](https://arxiv.org/abs/1703.09312) | Foundation; Modern Core | Advanced |
| 2 | [P164 — Transporter Networks: Rearranging the Visual World for Robotic Manipulation](https://arxiv.org/abs/2010.14406) | Modern Core | Intermediate |
| 3 | [P165 — CLIPort: What and Where Pathways for Robotic Manipulation](https://arxiv.org/abs/2109.12098) | Modern Core | Intermediate |
| 4 | [P166 — Perceiver-Actor: A Multi-Task Transformer for Robotic Manipulation](https://arxiv.org/abs/2209.05451) | Modern Core | Advanced |
| 5 | [P167 — Learning to Manipulate Deformable Objects without Demonstrations](https://arxiv.org/abs/1910.13439) | Optional Specialization; Critical | Advanced |

### S2. Tactile sensing and dexterous manipulation

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s2_tactile_sensing_and_dexterous_manipulation/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Specialization
- **Scope:** Optical tactile sensing, visuotactile representation, contact-state estimation, dexterous hands, and tactile-reactive policies.
- **Prerequisites:** S1, P1, F6.
- **Cross-area relationships:** Crosses perception, contact control, and imitation/RL.
- **Place in curriculum:** Hardware-dependent specialization.
- **Supporting materials:** R005, R018, R019

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P168 — GelSight: High-Resolution Robot Tactile Sensors for Estimating Geometry and Force](https://doi.org/10.3390/s17020276) | Foundation | Intermediate |
| 2 | [P169 — DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor with Application to In-Hand Manipulation](https://arxiv.org/abs/2005.14679) | Modern Core | Intermediate |
| 3 | [P170 — Learning Dexterous In-Hand Manipulation](https://arxiv.org/abs/1808.00177) | Seminal; Bridge | Expert |
| 4 | [P171 — T-Rex: Tactile-Reactive Dexterous Manipulation](https://arxiv.org/abs/2606.17055) | Frontier | Expert |

### S3. Legged locomotion and whole-body control

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s3_legged_locomotion_and_whole_body_control/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Specialization
- **Scope:** Policy learning for locomotion, motion imitation, terrain adaptation, privileged learning, humanoid control, and loco-manipulation.
- **Prerequisites:** F6–F8, L2, L7.
- **Cross-area relationships:** Whole-body and humanoid specialization.
- **Place in curriculum:** Executable with simulation-first infrastructure.
- **Supporting materials:** R006, R020, R021

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P172 — DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills](https://arxiv.org/abs/1804.02717) | Foundation; Modern Core | Advanced |
| 2 | [P173 — Learning Quadrupedal Locomotion over Challenging Terrain](https://www.science.org/doi/10.1126/scirobotics.abc5986) | Modern Core | Advanced |
| 3 | [P174 — Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions](https://arxiv.org/abs/2104.02180) | Modern Core | Advanced |
| 4 | [P175 — Walk These Ways: Tuning Robot Control for Generalization with Multiplicity of Behavior](https://arxiv.org/abs/2212.03238) | Modern Core | Advanced |
| 5 | [P176 — SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control](https://arxiv.org/abs/2511.07820) | Frontier | Expert |

### S4. Navigation and embodied agents

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s4_navigation_and_embodied_agents/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Optional
- **Scope:** Visual navigation, mapping policies, vision-and-language navigation, embodied question answering, and hierarchical mobile manipulation.
- **Prerequisites:** F8, P1–P4, E1.
- **Cross-area relationships:** Complements manipulation-centric work.
- **Place in curriculum:** Optional unless mobile embodied agents become active.
- **Supporting materials:** R008, R019

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P177 — Cognitive Mapping and Planning for Visual Navigation](https://arxiv.org/abs/1702.03920) | Foundation; Bridge | Advanced |
| 2 | [P178 — Habitat: A Platform for Embodied AI Research](https://arxiv.org/abs/1904.01201) | Foundation | Intermediate |
| 3 | [P179 — Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments](https://arxiv.org/abs/1711.07280) | Seminal | Intermediate |
| 4 | [P180 — Active Neural SLAM](https://arxiv.org/abs/2004.05155) | Modern Core | Advanced |

### S5. Deformable objects, learned physics, and graph models

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s5_deformable_objects_learned_physics_and_graph_models/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Optional
- **Scope:** Object-centric relational models, graph-network simulators, cloth/rope manipulation, differentiable simulation, and material uncertainty.
- **Prerequisites:** F3–F4, F6, P3–P5.
- **Cross-area relationships:** Links learned physics to difficult manipulation.
- **Place in curriculum:** Optional advanced branch.
- **Supporting materials:** R006, R019, R021, R026

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P181 — Interaction Networks for Learning about Objects, Relations and Physics](https://arxiv.org/abs/1612.00222) | Foundation; Seminal | Advanced |
| 2 | [P182 — Learning to Simulate Complex Physics with Graph Networks](https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html) | Modern Core | Expert |
| 3 | [P183 — SoftGym: Benchmarking Deep Reinforcement Learning for Deformable Object Manipulation](https://arxiv.org/abs/2011.07215) | Bridge | Advanced |
| 4 | [P184 — DiffTaichi: Differentiable Programming for Physical Simulation](https://arxiv.org/abs/1910.00935) | Bridge to S7 | Expert |

### S6. Multi-agent reinforcement learning

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s6_multi_agent_reinforcement_learning/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Deferred
- **Scope:** Centralized training/decentralized execution, credit assignment, communication, non-stationarity, and cooperative control.
- **Prerequisites:** L1–L2.
- **Cross-area relationships:** Independent branch with limited immediate overlap.
- **Place in curriculum:** Deferred until a concrete multi-robot problem exists.
- **Supporting materials:** R001, R004

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P185 — Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275) | Foundation | Advanced |
| 2 | [P186 — QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning](https://proceedings.mlr.press/v80/rashid18a.html) | Modern Core | Advanced |
| 3 | [P187 — The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games](https://arxiv.org/abs/2103.01955) | Modern Core; Critical | Advanced |

### S7. Differentiable physics, robot design, and co-optimization

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s7_differentiable_physics_robot_design_and_co_optimization/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Deferred
- **Scope:** Differentiable simulators, gradient-based system identification, morphology/control co-design, and design optimization.
- **Prerequisites:** F2, F6–F7, P5.
- **Cross-area relationships:** Advanced research branch requiring dedicated mathematical and simulator work.
- **Place in curriculum:** Deferred pending project demand.
- **Supporting materials:** R006, R020, R021

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P188 — ChainQueen: A Real-Time Differentiable Physical Simulator for Soft Robotics](https://arxiv.org/abs/1810.01054) | Foundation; Bridge | Expert |
| 2 | [P189 — Learning to Design and Construct Structures in Simulated Environments](https://arxiv.org/abs/2007.06011) | Optional | Expert |

### S8. Human feedback, shared autonomy, and human–robot interaction

- **Topic timeline:** [Open the complete topic plan and session timeline](topics/s8_human_feedback_shared_autonomy_and_human_robot_interaction/topic_plan_and_session_timeline.md)

- **Area:** F. Specialization branches
- **Execution status:** Optional
- **Scope:** Preference learning, corrections, interventions, shared autonomy, intent inference, and human-centered evaluation.
- **Prerequisites:** L3–L4, L8, E1.
- **Cross-area relationships:** Supports safe deployment and data collection.
- **Place in curriculum:** Optional cross-cutting branch.
- **Supporting materials:** R001, R004, R018

| Order | Paper | Role | Level |
|---:|---|---|---|
| 1 | [P190 — Deep Reinforcement Learning from Human Preferences](https://arxiv.org/abs/1706.03741) | Foundation | Advanced |
| 2 | [P191 — PEBBLE: Feedback-Efficient Interactive Reinforcement Learning via Relabeling Experience and Unsupervised Pre-Training](https://proceedings.mlr.press/v139/lee21i.html) | Modern Core | Advanced |
| 3 | [P192 — Shared Autonomy via Deep Reinforcement Learning](https://arxiv.org/abs/1802.01744) | Bridge | Advanced |
| 4 | [P193 — Learning from Interventions Using Hierarchical Policies for Safe Learning](https://ojs.aaai.org/index.php/AAAI/article/view/6602) | Modern Core | Advanced |

## 6. Verification and revision record

| Date | Affected IDs | Verified correction or repository revision |
|---|---|---|
| 2026-07-22 | P128 | Updated to the CoRL 2025 version of record: *RoboArena: Distributed Real-World Evaluation of Generalist Robot Policies*, Pranav Atreya et al., PMLR 305. |
| 2026-07-22 | P135 | Updated to the RSS 2025 version-of-record title: *Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success*. |
| 2026-07-22 | P137 | Corrected the first author of SmolVLA to Mustafa Shukor. |
| 2026-07-22 | P142 | Corrected the title to *DreamGen: Unlocking Generalization in Robot Learning through Neural Trajectories* and the first author to Joel Jang. |
| 2026-07-22 | P158 | Updated MEM to its full arXiv title, canonical paper record, and official project page. |
| 2026-07-22 | P159 | Updated π0.7 to its full arXiv title, author attribution, canonical paper record, and official project page. |
| 2026-07-22 | P160–P162 | Updated Vesta, RoboTTT, and ENPIRE to authoritative paper records and official project pages where available. |
| 2026-07-22 | P176 | Updated SONIC from preprint-only metadata to its July 2026 *Science Robotics* publication. |
| 2026-07-22 | R027–R041 | Integrated the topic-planning supporting resources, including Isaac Sim, Isaac Lab, and Orbit. |
| 2026-07-22 | W011–W012 | Added simulator-reliability and Isaac-Lab navigation watch items. |
| 2026-07-22 | Repository | Added canonical topic paths and relative links; no session directories were created before session selection. |
