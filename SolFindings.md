# Robot Learning and Embodied AI Research Curriculum

## Purpose

This curriculum builds broad, implementation-ready competence across robotics, reinforcement learning, perception, state estimation, data-centric learning, world models, generative policies, and embodied AI.

The program is paper-driven. Each session focuses on one primary paper and, when useful, one supporting paper. The team studies both historically important work and current state-of-the-art methods.

The curriculum is not tied to a fixed number of weeks. Topics are selected according to team progress, current implementation needs, and research relevance.

## Program structure

The shared curriculum covers four parallel competency areas:

```text
Classical robotics
├── kinematics and dynamics
├── control and contact
├── motion planning
└── state estimation

Artificial intelligence
├── neural representations
├── 2D and 3D perception
├── generative models
└── multimodal models

Learning control
├── model-free reinforcement learning
├── model-based reinforcement learning
├── offline reinforcement learning
├── imitation learning
├── hierarchical reinforcement learning
└── safe reinforcement learning

Data and embodied systems
├── data collection
├── synchronization and labeling
├── evaluation and benchmarking
├── simulation-to-reality transfer
├── manipulation policies
└── vision-language-action models
```

## Paper selection policy

The reading program uses the following balance:

- 50–60% foundational and historically important papers.
- 25–35% mature modern methods that remain technically relevant.
- 10–20% frontier research that may change quickly.

Each block includes:

- key research questions,
- required papers,
- optional extensions,
- concepts that every participant must be able to explain,
- implementation or evaluation implications.

---

# 1. Classical Robotics: Dynamics, Control, and Planning

## Scope

We will study how classical robotics structures the control stack before any learned policy is added.

The team will cover:

- joint-space and task-space control,
- position, force, impedance, and admittance control,
- operational-space dynamics,
- redundancy and null-space behavior,
- geometric and kinodynamic motion planning,
- trajectory optimization,
- model predictive control,
- safety constraints and control barrier functions.

## Questions to answer

- What is the difference between joint-space and operational-space control?
- When should a robot regulate position, force, impedance, or admittance?
- Why should a high-level learned policy not directly replace the low-level controller?
- How is redundancy handled in kinematically redundant manipulators?
- What is the difference between geometric planning and planning with dynamics?
- When should PRM, RRT, trajectory optimization, or MPC be used?

## Core papers

1. **Neville Hogan — “Impedance Control: An Approach to Manipulation, Part I—Theory” (1985)**
   - Mechanical impedance as the controlled relationship between force and motion.
   - Contact interaction as a control problem, not only a position-tracking problem.

2. **Oussama Khatib — “A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation” (1987)**
   - Task-space dynamics.
   - Force and motion control directly at the end effector.
   - Dynamically consistent task-space control.

3. **Kavraki et al. — “Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces” (1996)**
   - Sampling-based planning.
   - Multi-query planning in high-dimensional configuration spaces.

4. **Steven LaValle — “Rapidly-Exploring Random Trees: A New Tool for Path Planning” (1998)**
   - Exploration of large configuration spaces.
   - Single-query sampling-based planning.

## Extensions

- CHOMP.
- TrajOpt.
- Dynamic Movement Primitives.
- Task and Motion Planning.
- Model Predictive Control.
- Control Barrier Functions.

---

# 2. State Estimation, Sensor Fusion, and SLAM

## Scope

We will study how a robot estimates its own state and the state of the environment from noisy, incomplete, and asynchronous measurements.

The team will cover:

- probabilistic state estimation,
- filtering and smoothing,
- covariance and uncertainty,
- observability,
- visual odometry,
- visual-inertial odometry,
- factor graphs,
- loop closure,
- relocalization,
- RGB-D, stereo, monocular, and inertial sensing.

## Questions to answer

- Why is a sensor measurement not equivalent to the true state?
- How are camera, encoder, and IMU measurements fused?
- What is the difference between filtering and smoothing?
- What do covariance and observability mean in practice?
- How do factor graphs represent a robotics estimation problem?
- What is the difference between visual odometry, localization, mapping, and SLAM?
- How do loop closure and relocalization work?

## Core papers

1. **R. E. Kalman — “A New Approach to Linear Filtering and Prediction Problems” (1960)**
   - Recursive state estimation.
   - Prediction and measurement update.
   - Model uncertainty and measurement uncertainty.

2. **Kaess et al. — “iSAM2: Incremental Smoothing and Mapping Using the Bayes Tree” (2012)**
   - Factor graphs.
   - Sparse nonlinear optimization.
   - Incremental smoothing and mapping.

3. **Qin, Li, Shen — “VINS-Mono: A Robust and Versatile Monocular Visual-Inertial State Estimator”**
   - Tightly coupled visual-inertial estimation.
   - Initialization.
   - IMU preintegration.
   - Sliding-window optimization.

4. **Campos et al. — “ORB-SLAM3”**
   - Visual, visual-inertial, and multi-map SLAM.
   - Monocular, stereo, and RGB-D configurations.
   - Relocalization and map reuse.

---

# 3. Neural Representations: From CNNs to Transformers

## Scope

We will build a shared foundation for understanding modern representation learning in vision, language, video, and robotic trajectories.

The team will cover:

- convolutional inductive biases,
- residual learning,
- self-attention and cross-attention,
- tokenization,
- positional encoding,
- image patches,
- multimodal representation learning,
- self-supervised pretraining,
- frozen encoders and full fine-tuning.

## Questions to answer

- What does a learned representation encode?
- How do convolution and attention differ in inductive bias?
- What can be treated as a token in an image, video, or robot trajectory?
- How do self-attention and cross-attention differ?
- Why does large-scale pretraining help robotics?
- When should an encoder remain frozen?
- When should the full model be fine-tuned?

## Core papers

1. **He et al. — “Deep Residual Learning for Image Recognition”**
   - Residual connections.
   - Optimization of deep neural networks.

2. **Vaswani et al. — “Attention Is All You Need”**
   - Query, key, and value.
   - Scaled dot-product attention.
   - Multi-head attention.
   - Positional encoding.
   - Encoder and decoder structure.
   - Causal masking.

3. **Dosovitskiy et al. — “An Image Is Worth 16×16 Words: Transformers for Image Recognition at Scale”**
   - Patch tokenization.
   - Vision Transformer architecture.
   - Transfer from large-scale pretraining.

4. **Radford et al. — “Learning Transferable Visual Models From Natural Language Supervision”**
   - CLIP.
   - Contrastive image-text learning.
   - Shared visual-language representation space.
   - Zero-shot transfer.

5. **He et al. — “Masked Autoencoders Are Scalable Vision Learners”**
   - Masked image modeling.
   - Reconstruction-based visual pretraining.

6. **DINO and DINOv2**
   - Self-supervised visual representations.
   - Dense and transferable image features without class labels.

---

# 4. Robotic Perception and Automated Data Processing

## Scope

We will study perception methods that support scene understanding, dataset construction, automatic annotation, object tracking, pose estimation, and 3D reasoning.

The team will cover:

- image classification,
- object detection,
- semantic segmentation,
- instance segmentation,
- open-vocabulary detection,
- video object segmentation,
- object tracking,
- 6D object pose estimation,
- RGB-D fusion,
- point-cloud processing,
- automatic and semi-automatic data annotation.

## Questions to answer

- What is the difference between classification, detection, semantic segmentation, instance segmentation, and tracking?
- How are previously unseen object categories detected?
- How can language specify the object of interest?
- How is a 6D object pose estimated from RGB-D data?
- How should a point cloud be represented?
- How can an object be tracked across video frames?
- When are automatic labels reliable enough for training?
- When is human verification required?

## Core 2D papers

1. **He et al. — “Mask R-CNN”**
   - Detection and instance segmentation.

2. **Carion et al. — “End-to-End Object Detection with Transformers”**
   - DETR.
   - Detection as set prediction.
   - Bipartite matching.

3. **Kirillov et al. — “Segment Anything”**
   - Promptable segmentation.
   - General-purpose segmentation foundation model.

4. **Ravi et al. — “SAM 2: Segment Anything in Images and Videos”**
   - Video segmentation.
   - Object tracking through a memory mechanism.

5. **Liu et al. — “Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection”**
   - Open-vocabulary detection.
   - Language-conditioned object grounding.

## Core 3D papers

1. **Qi et al. — “PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation”**
   - Direct point-set processing.
   - Permutation invariance.

2. **Qi et al. — “PointNet++”**
   - Hierarchical local geometry.

3. **Wang et al. — “DenseFusion: 6D Object Pose Estimation by Iterative Dense Fusion”**
   - RGB and depth fusion.
   - 6D object pose estimation.

4. **Point Transformer**
   - Attention for point-cloud representation learning.

## Data-processing study track

We will explicitly study:

- Grounding DINO + SAM/SAM 2 for semi-automatic video annotation,
- tracking-assisted annotation,
- confidence-based label filtering,
- human-in-the-loop verification,
- synthetic label generation,
- label quality audits,
- annotation consistency across sequences.

---

# 5. Reinforcement Learning Foundations

## Scope

We will study reinforcement learning from its mathematical foundations before moving to modern algorithms.

The team will cover:

- Markov Decision Processes,
- Partially Observable Markov Decision Processes,
- return,
- value functions,
- action-value functions,
- advantage functions,
- Bellman equations,
- prediction and control,
- bootstrapping,
- temporal-difference learning,
- value-based learning,
- policy gradients,
- actor-critic methods,
- on-policy and off-policy learning,
- bias, variance, and overestimation.

## Questions to answer

- What are MDPs and POMDPs?
- What are return, value, Q-value, and advantage?
- What is a Bellman backup?
- What is the difference between prediction and control?
- Why is bootstrapping sample-efficient but potentially unstable?
- What is the difference between on-policy and off-policy learning?
- What is the difference between value-based, policy-based, and actor-critic methods?
- How do function approximators change classical RL theory?

## Core papers

1. **Sutton — “Learning to Predict by the Methods of Temporal Differences” (1988)**
   - Temporal-difference learning.
   - Bootstrapping.

2. **Watkins and Dayan — “Q-Learning” (1992)**
   - Model-free, off-policy value learning.

3. **Williams — “Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning” (1992)**
   - REINFORCE.
   - Monte Carlo policy gradient.

4. **Mnih et al. — “Human-Level Control Through Deep Reinforcement Learning” (2015)**
   - DQN.
   - Replay buffer.
   - Target network.
   - Deep value approximation from images.

These papers will be studied mathematically, including the objective functions and update rules.

---

# 6. Modern Model-Free Reinforcement Learning for Continuous Control

## Scope

We will study the main algorithmic families used for continuous-action control.

The team will cover:

- trust-region methods,
- actor-critic learning,
- generalized advantage estimation,
- deterministic and stochastic policies,
- replay buffers,
- entropy regularization,
- critic overestimation,
- sparse rewards,
- goal-conditioned learning,
- sample efficiency.

## Questions to answer

- Why does DQN not directly support continuous action spaces?
- Why does actor-critic learning use separate actor and critic components?
- Where does critic overestimation come from?
- Why must policy updates be constrained?
- How does entropy influence exploration?
- When is an on-policy algorithm appropriate?
- When is an off-policy algorithm appropriate?
- Why is sample efficiency critical on physical robots?

## Core papers

1. **Schulman et al. — “Trust Region Policy Optimization”**
   - Trust-region policy updates.
   - Monotonic improvement motivation.

2. **Schulman et al. — “High-Dimensional Continuous Control Using Generalized Advantage Estimation”**
   - Bias-variance control in advantage estimation.

3. **Schulman et al. — “Proximal Policy Optimization Algorithms”**
   - Clipped surrogate objective.
   - Stable on-policy optimization.

4. **Lillicrap et al. — “Continuous Control with Deep Reinforcement Learning”**
   - DDPG.
   - Deterministic actor-critic for continuous control.

5. **Fujimoto et al. — “Addressing Function Approximation Error in Actor-Critic Methods”**
   - TD3.
   - Twin critics.
   - Delayed policy updates.
   - Target policy smoothing.

6. **Haarnoja et al. — “Soft Actor-Critic”**
   - Maximum-entropy reinforcement learning.
   - Stochastic off-policy actor-critic.

7. **Andrychowicz et al. — “Hindsight Experience Replay”**
   - Goal relabeling.
   - Learning from sparse rewards.

## Required comparison

The team will compare:

- PPO,
- SAC,
- TD3,
- DDPG,
- HER-augmented goal-conditioned learning.

The comparison will include:

- data reuse,
- sample efficiency,
- stability,
- sensitivity to hyperparameters,
- exploration behavior,
- suitability for physical systems.

---

# 7. Exploration, Hierarchy, Transfer, and Safe Reinforcement Learning

## Scope

We will study the main methods used when rewards are sparse, tasks are long, behavior must be reusable, or physical constraints must be satisfied.

The team will cover:

- intrinsic motivation,
- curiosity,
- novelty estimation,
- temporal abstraction,
- skills and options,
- universal value functions,
- goal-conditioned policies,
- curriculum learning,
- meta-learning,
- constrained reinforcement learning,
- safety constraints.

## Questions to answer

- How can a policy learn when rewards are sparse?
- How does useful exploration differ from uncontrolled random behavior?
- How are temporally extended skills represented?
- How can a learned skill be reused in another task?
- How are safety constraints separated from the reward?
- How are long-horizon tasks decomposed?
- How can one policy solve many goals?

## Core papers

1. **Sutton, Precup, Singh — “Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction in Reinforcement Learning”**
   - Options.
   - Temporally extended actions.

2. **Schaul et al. — “Universal Value Function Approximators”**
   - Goal-conditioned value functions.

3. **Pathak et al. — “Curiosity-Driven Exploration by Self-Supervised Prediction”**
   - Intrinsic curiosity module.

4. **Burda et al. — “Exploration by Random Network Distillation”**
   - Novelty through prediction error.

5. **Achiam et al. — “Constrained Policy Optimization”**
   - Reinforcement learning with explicit safety constraints.

6. **Finn et al. — “Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks”**
   - Fast adaptation across tasks.

7. **Rakelly et al. — “Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables”**
   - PEARL.
   - Meta-RL with latent task context.

## Extensions

- Reward shaping.
- Preference learning.
- Inverse reinforcement learning.
- Curriculum learning.
- Skill discovery.
- Goal-conditioned and language-conditioned RL.

---

# 8. Imitation Learning, Offline Reinforcement Learning, and Reuse of Existing Data

## Scope

We will study how policies learn from demonstrations, logged trajectories, failed rollouts, and limited additional interaction.

The team will cover:

- behavior cloning,
- covariate shift,
- compounding errors,
- interactive imitation learning,
- inverse reinforcement learning,
- adversarial imitation learning,
- offline reinforcement learning,
- out-of-distribution actions,
- conservative value learning,
- offline-to-online transition,
- human intervention.

## Questions to answer

- Why does low supervised loss not guarantee a successful rollout?
- What is covariate shift?
- How are expert corrections collected?
- How does behavior cloning differ from offline RL?
- Why can standard off-policy RL fail on a fixed dataset?
- How can a policy outperform the demonstrator?
- How can demonstrations, failures, and further interaction be combined?
- When should a human intervene during policy execution?

## Core papers

1. **Ross, Gordon, Bagnell — “A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning”**
   - DAgger.
   - Distribution shift between expert trajectories and policy rollouts.

2. **Ho and Ermon — “Generative Adversarial Imitation Learning”**
   - Occupancy-measure matching.

3. **Fu, Luo, Levine — “Learning Robust Rewards with Adversarial Inverse Reinforcement Learning”**
   - AIRL.
   - Reward recovery.

4. **Rajeswaran et al. — “Learning Complex Dexterous Manipulation with Deep Reinforcement Learning and Demonstrations”**
   - DAPG.
   - Demonstrations combined with policy-gradient fine-tuning.

5. **Kumar et al. — “Conservative Q-Learning for Offline Reinforcement Learning”**
   - Conservative value estimation.
   - Protection against out-of-distribution actions.

6. **Kostrikov et al. — “Offline Reinforcement Learning with Implicit Q-Learning”**
   - IQL.
   - Policy improvement without explicit out-of-distribution action evaluation.

7. **Chen et al. — “Decision Transformer: Reinforcement Learning via Sequence Modeling”**
   - Offline RL as conditional sequence modeling.

8. **Ball et al. — “Efficient Online Reinforcement Learning with Offline Data”**
   - RLPD.
   - Offline-to-online reinforcement learning.

9. **Luo et al. — “SERL: A Software Suite for Sample-Efficient Robotic Reinforcement Learning”**
   - Practical real-world RL.
   - Reset design.
   - Demonstrations.
   - System-level engineering requirements.

## Frontier watchlist

- Human-in-the-loop robotic RL.
- Intervention-based policy improvement.
- Automatic reset methods.
- Demonstration-efficient real-world RL.

---

# 9. Model-Based Reinforcement Learning and World Models

## Scope

We will study learned models of environment dynamics, predictive latent representations, planning in learned models, and the limitations of model-based control.

The team will cover:

- probabilistic dynamics models,
- model uncertainty,
- latent dynamics,
- pixel prediction and feature prediction,
- imagined rollouts,
- planning in latent space,
- model bias,
- uncertainty-aware planning,
- predictive video representation learning,
- action-conditioned world models.

## Questions to answer

- What is the difference between an environment model and a policy?
- What should a world model predict: pixels, latent states, rewards, values, or features?
- How should uncertainty be represented?
- How does planning in a learned model differ from planning in a physical simulator?
- What is model bias?
- How long can a learned model be rolled out reliably?
- Must a world model be generative?
- How can world knowledge be learned from video without action labels?

## Core papers

1. **Deisenroth and Rasmussen — “PILCO: A Model-Based and Data-Efficient Approach to Policy Search”**
   - Probabilistic dynamics.
   - Data-efficient control.

2. **Ha and Schmidhuber — “World Models”**
   - Learned visual compression.
   - Learned dynamics.
   - Separate controller.

3. **Chua et al. — “Deep Reinforcement Learning in a Handful of Trials Using Probabilistic Dynamics Models”**
   - PETS.
   - Ensembles.
   - Uncertainty-aware planning.

4. **Hafner et al. — “Learning Latent Dynamics for Planning from Pixels”**
   - PlaNet.
   - Planning in latent state space.

5. **Dreamer series, including DreamerV3**
   - Learning behavior from imagined latent trajectories.

6. **Schrittwieser et al. — “Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model”**
   - MuZero.
   - Learning only reward-, value-, and planning-relevant dynamics.

7. **Hansen et al. — “TD-MPC2: Scalable, Robust World Models for Continuous Control”**
   - Latent world model.
   - Local trajectory optimization.
   - Multi-task continuous control.

8. **V-JEPA 2 — “Self-Supervised Video Models Enable Understanding, Prediction and Planning”**
   - Predictive visual representations.
   - Planning from self-supervised video pretraining.

## Required comparison

The team will compare:

- probabilistic dynamics models,
- latent world models,
- value-equivalent models,
- predictive video representation models,
- learned models versus physics simulators.

---

# 10. Generative Models and Trajectory Policies

## Scope

We will study why robotic control can be formulated as generative modeling of action sequences rather than direct regression of a single action.

The team will cover:

- multimodal action distributions,
- diffusion models,
- score matching,
- flow matching,
- rectified flow,
- action chunking,
- prediction horizon,
- observation horizon,
- receding-horizon control,
- action tokenization,
- inference latency.

## Questions to answer

- Why can regression to the mean produce an invalid action?
- What is a multimodal action distribution?
- How do diffusion, score matching, flow matching, and rectified flow differ?
- What is the difference between generating one action and generating an action chunk?
- How does prediction horizon affect smoothness and reactivity?
- How does iterative sampling affect real-time control?

## Core papers

1. **Ho et al. — “Denoising Diffusion Probabilistic Models”**
   - Forward noising process.
   - Reverse denoising process.

2. **Lipman et al. — “Flow Matching for Generative Modeling”**
   - Vector-field learning.
   - Continuous probability paths.

3. **Chi et al. — “Diffusion Policy: Visuomotor Policy Learning via Action Diffusion”**
   - Conditional action diffusion.
   - Action sequences.
   - Receding-horizon execution.

4. **Zhao et al. — “Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware”**
   - ACT.
   - Action chunking.
   - Temporal ensembling.
   - Leader-follower demonstrations.

5. **FAST — “Efficient Action Tokenization for Vision-Language-Action Models”**
   - Compression and tokenization of high-frequency robot trajectories.

## Required comparison

The team will compare:

- direct action regression,
- autoregressive action tokens,
- latent-variable policies,
- diffusion policies,
- flow-matching policies,
- action-chunking transformers.

---

# 11. Data-Centric Robot Learning

## Scope

We will study how data composition, quality, diversity, labeling, synchronization, and evaluation determine the capabilities of a robot policy.

The team will cover:

- trajectory diversity,
- environment diversity,
- operator diversity,
- embodiment diversity,
- action-space normalization,
- dataset versioning,
- provenance,
- train-test leakage,
- failure labeling,
- active learning,
- uncertainty-based sample selection,
- scaling laws for robot data.

## Questions to answer

- What is gained by more trajectories?
- What is gained by more diverse environments?
- How are incorrect or incomplete demonstrations detected?
- How are actions from different robots represented consistently?
- How are datasets from different embodiments mixed?
- Which signals must be synchronized?
- How is leakage between training and evaluation prevented?
- Are failed trajectories useful?
- When is a smaller curated dataset better than a larger noisy dataset?
- How are robot-data scaling laws measured?

## Core papers and datasets

1. **Dasari et al. — “RoboNet: Large-Scale Multi-Robot Learning”**
   - Multi-robot data collection.
   - Cross-platform transfer.

2. **Bridge Data and BridgeData V2**
   - Diverse environments and tasks.
   - Reuse across domains.

3. **Open X-Embodiment Collaboration — “Open X-Embodiment: Robotic Learning Datasets and RT-X Models”**
   - Cross-embodiment standardization.
   - Large heterogeneous robot datasets.

4. **Khazatsky et al. — “DROID: A Large-Scale In-The-Wild Robot Manipulation Dataset”**
   - Multi-location data collection.
   - Operator and scene diversity.

5. **Mandlekar et al. — RoboMimic**
   - Demonstration quality.
   - Observation modalities.
   - Benchmarking imitation learning methods.

## Data-engineering study track

We will establish competence in:

- dataset schemas,
- timestamp alignment,
- action and observation normalization,
- versioned train-validation-test splits,
- automatic quality checks,
- failure taxonomies,
- representative sample selection,
- data lineage,
- reproducible experiment records.

---

# 12. Simulation-to-Reality Transfer, System Identification, and Robustness

## Scope

We will study the gap between simulation and physical systems and the methods used to reduce or manage it.

The team will cover:

- domain randomization,
- dynamics randomization,
- visual randomization,
- latency modeling,
- actuator dynamics,
- backlash,
- sensor noise,
- friction and contact uncertainty,
- system identification,
- adaptive policies,
- privileged information,
- robustness evaluation.

## Questions to answer

- What creates the reality gap?
- Which visual and physical parameters should be randomized?
- When can excessive randomization reduce performance?
- How are simulator parameters identified from physical rollouts?
- What makes a policy robust?
- How are perception errors separated from dynamics errors?
- How is privileged simulation information used during training?

## Core papers

1. **Tobin et al. — “Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World”**
   - Visual domain randomization.

2. **Peng et al. — “Sim-to-Real Transfer of Robotic Control with Dynamics Randomization”**
   - Physical parameter randomization.

3. **Mehta et al. — “Active Domain Randomization”**
   - Selecting informative simulation variations.

4. **Muratore et al. — “Robot Learning from Randomized Simulations: A Review” and related dynamics-randomization analyses**
   - Limits and practical interpretation of randomization.

5. **Kumar et al. — “RMA: Rapid Motor Adaptation for Legged Robots”**
   - Online adaptation to changing dynamics.

6. **OpenAI et al. — dexterous in-hand manipulation and Rubik’s Cube systems**
   - Large-scale simulation.
   - Dynamics randomization.
   - Adaptation to physical uncertainty.

---

# 13. Manipulation, Grasping, Contact, and Deformable Objects

## Scope

We will study manipulation-specific problems that remain important regardless of the high-level policy architecture.

The team will cover:

- grasp stability,
- candidate grasp generation,
- 6D pose estimation,
- contact and friction,
- insertion and assembly,
- deformable object manipulation,
- tactile feedback,
- semantic and geometric reasoning,
- bimanual manipulation.

## Questions to answer

- What defines a stable grasp?
- How are candidate grasps represented and scored?
- How is object pose estimated in 6D?
- How do contact and friction affect execution?
- Why are deformable objects more difficult than rigid objects?
- How are semantic task understanding and local geometric precision combined?
- When is tactile sensing necessary?

## Core papers

1. **Mahler et al. — “Dex-Net 2.0: Deep Learning to Plan Robust Grasps with Synthetic Point Clouds and Analytic Grasp Metrics”**
   - Synthetic grasp data.
   - Analytic grasp quality.

2. **Zeng et al. — “Transporter Networks: Rearranging the Visual World for Robotic Manipulation”**
   - Spatial action structure.
   - Pick-and-place as image-space transport.

3. **Shridhar et al. — “CLIPort: What and Where Pathways for Robotic Manipulation”**
   - Semantic “what” pathway.
   - Spatial “where” pathway.

4. **Shridhar et al. — “Perceiver-Actor: A Multi-Task Transformer for Robotic Manipulation”**
   - PerAct.
   - Language-conditioned 6D manipulation.
   - Voxel-based perception and action prediction.

5. **Zhao et al. — ACT**
   - Fine-grained bimanual manipulation.

6. **Chi et al. — Diffusion Policy**
   - Multimodal visuomotor action distributions.

7. **Fu et al. — Mobile ALOHA**
   - Whole-body and bimanual imitation learning.

## Tactile extensions

- GelSight.
- DIGIT.
- Visuotactile representation learning.
- Contact-rich insertion.
- Tactile world models.

---

# 14. Multimodal Models, Embodied Reasoning, and Vision-Language-Action Models

## Scope

We will study how pretrained vision-language models are extended into robot policies and how modern generalist robot systems represent language, perception, embodiment, and action.

The team will cover:

- language-conditioned control,
- web-scale visual-language pretraining,
- robot trajectory co-training,
- action tokenization,
- continuous action generation,
- action experts,
- high-level reasoning and low-level execution,
- cross-embodiment transfer,
- generalist robot policies,
- open-world generalization.

## Questions to answer

- How is a VLM converted into a robot policy?
- Which capabilities come from internet pretraining?
- Which capabilities require robot data?
- How are continuous robot actions represented in token-based models?
- What does an action expert contribute?
- How are high-level reasoning and reactive control combined?
- How are policies transferred across embodiments?
- Does the policy generate single actions, chunks, waypoints, plans, or code?
- Which results come from architecture and which come from data scale?

## Historical and conceptual sequence

1. **Brohan et al. — RT-1**
   - Scaling one policy across many real-world robot tasks.

2. **Driess et al. — PaLM-E**
   - Embodied multimodal language model.
   - Images and continuous robot state as language-model inputs.

3. **Brohan et al. — RT-2**
   - Vision-language-action co-training.
   - Robot actions represented as output tokens.

4. **Open X-Embodiment**
   - Cross-robot datasets and RT-X models.

5. **Ahn et al. — SayCan**
   - Language-model planning grounded through robot affordances.

6. **Liang et al. — Code as Policies**
   - Program generation for robot behavior.

7. **CLIPort and PerAct**
   - Language-conditioned manipulation before large generalist VLA models.

## Modern generalist policy papers

1. **Octo — “An Open-Source Generalist Robot Policy”**
   - Heterogeneous robot data.
   - Adaptation to new observation and action spaces.

2. **OpenVLA**
   - Open vision-language-action model.
   - Large-scale robot demonstration training.

3. **π0 — “A Vision-Language-Action Flow Model for General Robot Control”**
   - Pretrained VLM.
   - Transformer action expert.
   - Flow-matching action generation.

4. **FAST**
   - Efficient robot action tokenization.

5. **π0.5**
   - Open-world generalization.
   - Heterogeneous co-training.

6. **GR00T N1**
   - Dual-system architecture.
   - Vision-language reasoning plus diffusion-based action generation.

7. **Gemini Robotics**
   - Embodied reasoning.
   - Generalization and adaptation across robotic tasks and embodiments.

## Evaluation criteria for frontier VLA papers

Every frontier paper will be analyzed using:

- training-data composition,
- number and diversity of embodiments,
- action representation,
- inference frequency,
- model accessibility,
- reproducibility,
- baseline quality,
- evaluation protocol,
- failure cases,
- compute requirements,
- adaptation method,
- evidence of true generalization.

---

# 15. Specialized Modules

These modules are included when they become relevant to the team’s work.

## 15.1 Neural Scene Representations

### Papers

- NeRF.
- 3D Gaussian Splatting.
- Dynamic NeRF variants.
- Semantic NeRF variants.
- 3D semantic maps.

### Competence goals

- scene reconstruction,
- view synthesis,
- semantic scene representation,
- simulation asset generation,
- camera-pose dependence,
- dynamic-scene limitations.

## 15.2 Graph Neural Networks and Learned Physics

### Entry paper

- **Sanchez-Gonzalez et al. — “Learning to Simulate Complex Physics with Graph Networks”**

### Competence goals

- relational scene representations,
- message passing,
- particle-based learned simulation,
- deformable object modeling,
- multi-object interaction.

## 15.3 Multi-Agent Reinforcement Learning

### Papers

- MADDPG.
- QMIX.
- MAPPO.
- Mean-field reinforcement learning.

### Competence goals

- centralized training with decentralized execution,
- cooperative and competitive objectives,
- credit assignment,
- multi-agent non-stationarity.

## 15.4 Differentiable Physics

### Topics

- DiffTaichi.
- Differentiable rigid-body simulation.
- Differentiable MPC.
- Gradient-based system identification.
- Design optimization.

## 15.5 Tactile Learning

### Topics

- GelSight.
- DIGIT.
- Visuotactile representation learning.
- Contact-state estimation.
- Tactile policy learning.
- Tactile world models.

---

# Shared Core Curriculum

Every team member will complete the shared core below.

## Classical robotics and estimation

1. Kalman — “A New Approach to Linear Filtering and Prediction Problems.”
2. Hogan — “Impedance Control.”
3. Khatib — “Operational Space Formulation.”
4. PRM or RRT.
5. iSAM2 or ORB-SLAM3.

## Neural representations and perception

6. ResNet.
7. “Attention Is All You Need.”
8. Vision Transformer.
9. CLIP.
10. SAM 2 or Grounding DINO.
11. PointNet.

## Reinforcement learning

12. Temporal-Difference Learning.
13. Q-Learning.
14. REINFORCE.
15. DQN.
16. PPO.
17. SAC.
18. TD3.
19. HER.
20. Options.

## Robot learning

21. DAgger.
22. CQL or IQL.
23. PETS or DreamerV3.
24. ACT.
25. Diffusion Policy.

## Embodied AI and VLA

26. RT-1.
27. RT-2.
28. Open X-Embodiment.
29. OpenVLA or Octo.
30. π0, FAST, GR00T N1, or Gemini Robotics.

---

# Session Format

## Before the session

One person owns the paper and prepares:

- the research problem,
- the historical context,
- the main architecture,
- the core objective function,
- the training data,
- the inference procedure,
- the main experiments,
- the strongest result,
- the main limitation,
- the relationship to earlier work.

All participants read at least:

- abstract,
- introduction,
- method,
- main figures,
- primary experiments,
- limitations.

## During the session

Each session follows this structure:

1. **Problem and context — 10 minutes**
2. **Method and architecture — 25 minutes**
3. **Objective functions and training — 15 minutes**
4. **Experiments and evidence — 15 minutes**
5. **Critical analysis — 15 minutes**
6. **Connections to other research areas — 10 minutes**

## Required session output

Each session produces one technical note containing:

```text
Title and citation

1. Research problem
2. Historical context
3. Main contribution
4. Architecture
5. Objective function
6. Training data
7. Evaluation protocol
8. Main results
9. Limitations
10. Relationship to prior work
11. Possible robotics applications
12. Open research questions
```

---

# Curriculum Management

## Topic queue

The team maintains a ranked topic queue with the following fields:

```text
Topic
Primary paper
Supporting paper
Category
Difficulty
Historical importance
Current relevance
Prerequisites
Session owner
Status
```

## Review cycle

After each group of related papers, the team prepares:

- one comparison table,
- one concept map,
- one list of unresolved questions,
- one short technical synthesis.

## Knowledge retention

The team maintains:

- a glossary of recurring concepts,
- a repository of paper notes,
- a diagram library,
- a collection of reproduced equations,
- a benchmark and dataset catalog,
- a list of implementation references,
- a watchlist of frontier papers.

## Frontier update process

Frontier papers are added only after checking:

- whether the model or code is available,
- whether the dataset is described,
- whether evaluation is reproducible,
- whether comparisons are fair,
- whether compute requirements are known,
- whether the claimed generalization is directly tested.
