# Paper Index

| Field | Value |
|---|---|
| Literature-search cutoff | 22 July 2026 |
| Verification date | 22 July 2026 |
| Primary-paper records | **193** |
| Index rule | Each paper appears once under its primary topic; topic timelines reference paper IDs. |

## Primary-paper records

Each paper appears here once under its primary topic. Cross-topic relationships are recorded in `Lineage`.

### A. Shared foundations

#### F1. Research evidence, reproducibility, and empirical methodology

##### P001. [Deep Reinforcement Learning That Matters](https://arxiv.org/abs/1709.06560)

- **Authors / year / venue:** Peter Henderson et al. · 2018 · AAAI
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Entry Point; Critical · Intermediate · Medium; focus §§1–5 and recommendations
- **Contribution:** Shows how implementation, hyperparameters, seeds, and reporting choices can reverse apparent deep-RL conclusions.
- **Lineage and relationships:** Precedes Engstrom and Agarwal; applies to L2–L8.
- **Major positioning limitation:** Centered on deep RL and older algorithms, but the experimental lessons remain general.
- **Quality/influence signals:** Highly influential reproducibility critique; public code/artifacts.
- **Metadata and assessment confidence:** High

##### P002. [Implementation Matters in Deep Policy Gradients: A Case Study on PPO and TRPO](https://arxiv.org/abs/2005.12729)

- **Authors / year / venue:** Logan Engstrom et al. · 2020 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/implementation-matters/code-for-paper
- **Role / level / preparation:** Critical · Intermediate · Medium; focus main experiments and implementation checklist
- **Contribution:** Demonstrates that code-level choices can explain much of the apparent advantage of modern policy-gradient algorithms.
- **Lineage and relationships:** Builds on Henderson; directly informs L2 and D3.
- **Major positioning limitation:** Narrow algorithm family and benchmark scope.
- **Quality/influence signals:** ICLR paper with released implementation and extensive controlled comparisons.
- **Metadata and assessment confidence:** High

##### P003. [Deep Reinforcement Learning at the Edge of the Statistical Precipice](https://arxiv.org/abs/2108.13264)

- **Authors / year / venue:** Rishabh Agarwal et al. · 2021 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/google-research/rliable
- **Role / level / preparation:** Modern Core; Critical · Advanced · High; focus §§2–5 and bootstrap methodology
- **Contribution:** Provides robust aggregate metrics, uncertainty intervals, and performance profiles for few-run RL evaluation.
- **Lineage and relationships:** Extends F1 beyond anecdotal reproducibility to statistical methodology; central to D2.
- **Major positioning limitation:** Primarily benchmark-level RL evaluation; assumes multiple tasks/runs.
- **Quality/influence signals:** NeurIPS paper; widely adopted evaluation toolkit.
- **Metadata and assessment confidence:** High

##### P004. [Improving Reproducibility in Machine Learning Research: A Report from the NeurIPS 2019 Reproducibility Program](https://www.jmlr.org/papers/v22/20-303.html)

- **Authors / year / venue:** Joelle Pineau et al. · 2021 · JMLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge; Critical · Introductory · Low–Medium; focus checklist and findings
- **Contribution:** Synthesizes practical reproducibility requirements for papers, code, data, and reporting.
- **Lineage and relationships:** Connects research norms to D3 infrastructure.
- **Major positioning limitation:** Program-level evidence rather than a method paper.
- **Quality/influence signals:** JMLR report from a major conference reproducibility program.
- **Metadata and assessment confidence:** High

#### F2. Optimization and deep-learning mechanics

##### P005. [A Stochastic Approximation Method](https://doi.org/10.1214/aoms/1177729586)

- **Authors / year / venue:** Herbert Robbins and Sutton Monro · 1951 · Annals of Mathematical Statistics
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · High; derivation-heavy
- **Contribution:** Establishes stochastic approximation, the conceptual ancestor of stochastic gradient methods.
- **Lineage and relationships:** Foundation for all optimization and RL updates.
- **Major positioning limitation:** Historical notation and assumptions; not a practical deep-learning recipe.
- **Quality/influence signals:** Seminal mathematical result.
- **Metadata and assessment confidence:** High

##### P006. [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)

- **Authors / year / venue:** Diederik P. Kingma and Jimmy Ba · 2015 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Intermediate · Low–Medium; focus algorithm and bias correction
- **Contribution:** Introduces adaptive first- and second-moment optimization used throughout modern deep learning.
- **Lineage and relationships:** Follows stochastic approximation; precedes AdamW.
- **Major positioning limitation:** Known convergence/pathology caveats and strong dependence on schedules.
- **Quality/influence signals:** Extremely broad adoption; official implementations across frameworks.
- **Metadata and assessment confidence:** High

##### P007. [Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)

- **Authors / year / venue:** Ilya Loshchilov and Frank Hutter · 2019 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Intermediate · Low
- **Contribution:** Separates weight decay from gradient-based L2 regularization in adaptive optimizers.
- **Lineage and relationships:** Corrects a common Adam regularization mistake; relevant to F5/D3.
- **Major positioning limitation:** Does not determine optimal schedules or regularization strengths.
- **Quality/influence signals:** Widely adopted AdamW optimizer.
- **Metadata and assessment confidence:** High

##### P008. [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://proceedings.mlr.press/v37/ioffe15.html)

- **Authors / year / venue:** Sergey Ioffe and Christian Szegedy · 2015 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Introduces batch normalization and exposes the interaction between normalization, optimization, and train/eval behavior.
- **Lineage and relationships:** Precedes later LayerNorm/normalization choices in Transformers and policies.
- **Major positioning limitation:** Original explanatory mechanism is debated; small-batch and non-i.i.d. issues matter in robotics.
- **Quality/influence signals:** Canonical ICML paper; ubiquitous implementation.
- **Metadata and assessment confidence:** High

#### F3. Neural architectures and sequence models

##### P009. [Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html)

- **Authors / year / venue:** Kaiming He et al. · 2016 · CVPR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Intermediate · Medium; focus architecture and ablations
- **Contribution:** Establishes residual connections as a practical mechanism for training deep networks.
- **Lineage and relationships:** Architectural precursor to modern vision and multimodal backbones.
- **Major positioning limitation:** Image classification setting; later architectures alter normalization and block design.
- **Quality/influence signals:** CVPR best paper; enduring architectural influence.
- **Metadata and assessment confidence:** High

##### P010. [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

- **Authors / year / venue:** Ashish Vaswani et al. · 2017 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Intermediate · High; reconstruct attention, masking, and positional encoding
- **Contribution:** Introduces the Transformer architecture based on self-attention and cross-attention.
- **Lineage and relationships:** Foundation for F5, P1/P4, E1/E2, and L6.
- **Major positioning limitation:** Original model is small and sequence-length quadratic; later variants are substantial.
- **Quality/influence signals:** Foundational paper for modern sequence modeling; open implementations everywhere.
- **Metadata and assessment confidence:** High

##### P011. [An Image Is Worth 16×16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)

- **Authors / year / venue:** Alexey Dosovitskiy et al. · 2021 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge; Modern Core · Intermediate · Medium
- **Contribution:** Shows patch-tokenized Transformers can become strong visual backbones under large-scale pretraining.
- **Lineage and relationships:** Connects Transformer sequence modeling to P1 and E2.
- **Major positioning limitation:** Data-hungry relative to convolutional baselines; limited dense prediction analysis.
- **Quality/influence signals:** Canonical ViT paper; broad downstream adoption.
- **Metadata and assessment confidence:** High

##### P012. [Efficiently Modeling Long Sequences with Structured State Spaces](https://arxiv.org/abs/2111.00396)

- **Authors / year / venue:** Albert Gu, Karan Goel, and Christopher Ré · 2022 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/state-spaces/s4
- **Role / level / preparation:** Optional Specialization; Bridge · Advanced · High; focus state-space construction and convolutional form
- **Contribution:** Introduces S4, a structured state-space sequence model for long contexts.
- **Lineage and relationships:** Alternative lineage to Transformers; precedes Mamba.
- **Major positioning limitation:** Complex implementation and limited direct robotics evidence.
- **Quality/influence signals:** Influential state-space model paper with public code.
- **Metadata and assessment confidence:** High

##### P013. [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752)

- **Authors / year / venue:** Albert Gu and Tri Dao · 2024 · COLM
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/state-spaces/mamba
- **Role / level / preparation:** Modern Core; Optional · Advanced · High; focus selective SSM and hardware-aware scan
- **Contribution:** Introduces input-dependent selective state-space models with linear-time sequence processing.
- **Lineage and relationships:** Builds on S4; relevant to long-context embodied memory and D4.
- **Major positioning limitation:** Early robotics evidence remains limited relative to Transformer baselines.
- **Quality/influence signals:** Widely reproduced; official implementation.
- **Metadata and assessment confidence:** High

#### F4. Self-supervised and generative learning

##### P014. [A Simple Framework for Contrastive Learning of Visual Representations](https://proceedings.mlr.press/v119/chen20j.html)

- **Authors / year / venue:** Ting Chen et al. · 2020 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/google-research/simclr
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Clarifies the data augmentation, projection head, and batch-size choices behind contrastive visual learning.
- **Lineage and relationships:** Precedes CLIP and later self-supervised vision methods.
- **Major positioning limitation:** Large-batch negatives and image-level invariances may discard spatial detail.
- **Quality/influence signals:** ICML paper; extensive independent reproduction.
- **Metadata and assessment confidence:** High

##### P015. [Masked Autoencoders Are Scalable Vision Learners](https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.html)

- **Authors / year / venue:** Kaiming He et al. · 2022 · CVPR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/facebookresearch/mae
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Uses high-ratio masked image reconstruction to pretrain scalable ViT encoders.
- **Lineage and relationships:** Alternative to contrastive learning; supports P1 and P4.
- **Major positioning limitation:** Pixel reconstruction does not guarantee physical or semantic relevance.
- **Quality/influence signals:** CVPR paper with broad adoption and public code.
- **Metadata and assessment confidence:** High

##### P016. [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)

- **Authors / year / venue:** Jonathan Ho, Ajay Jain, and Pieter Abbeel · 2020 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Advanced · High; derive forward/reverse processes and objective
- **Contribution:** Establishes a practical diffusion-model formulation based on iterative denoising.
- **Lineage and relationships:** Direct precursor to Diffusion Policy and many continuous-action generators.
- **Major positioning limitation:** Iterative sampling is computationally expensive; likelihood framing is not the only interpretation.
- **Quality/influence signals:** Foundational generative-model paper; strong open ecosystem.
- **Metadata and assessment confidence:** High

##### P017. [Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456)

- **Authors / year / venue:** Yang Song et al. · 2021 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/yang-song/score_sde_pytorch
- **Role / level / preparation:** Bridge · Advanced · High; SDE/ODE derivations
- **Contribution:** Unifies score matching, diffusion processes, and probability-flow ODEs.
- **Lineage and relationships:** Connects DDPM to continuous-time generative control formulations.
- **Major positioning limitation:** Mathematically demanding; direct robot-policy transfer requires additional conditioning/control design.
- **Quality/influence signals:** Canonical theoretical synthesis; public code.
- **Metadata and assessment confidence:** High

##### P018. [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747)

- **Authors / year / venue:** Yaron Lipman et al. · 2023 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High; focus conditional probability paths and vector fields
- **Contribution:** Introduces simulation-free training of continuous normalizing flows through flow matching.
- **Lineage and relationships:** Directly relevant to π-series action experts and modern VLA action heads.
- **Major positioning limitation:** Choice of probability path and solver affects efficiency and quality.
- **Quality/influence signals:** ICLR paper with rapid adoption in generative modeling and robotics.
- **Metadata and assessment confidence:** High

##### P019. [Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow](https://arxiv.org/abs/2209.03003)

- **Authors / year / venue:** Xingchao Liu, Chengyue Gong, and Qiang Liu · 2023 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Optional Specialization · Advanced · High
- **Contribution:** Learns straighter transport paths to reduce sampling steps.
- **Lineage and relationships:** Related to flow matching and efficient action generation.
- **Major positioning limitation:** Terminology and relationships among rectified flow/flow matching variants require careful comparison.
- **Quality/influence signals:** Influential efficiency-oriented flow paper; open implementations.
- **Metadata and assessment confidence:** High

#### F5. Foundation-model training, post-training, and adaptation

##### P020. [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)

- **Authors / year / venue:** Jared Kaplan et al. · 2020 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · Medium–High; focus empirical scaling methodology
- **Contribution:** Documents power-law relationships among model size, data, compute, and loss.
- **Lineage and relationships:** Precedes compute-optimal scaling and robot-data scaling studies.
- **Major positioning limitation:** Language-domain results do not transfer mechanically to robot policies.
- **Quality/influence signals:** Highly influential scaling study; proprietary training stack.
- **Metadata and assessment confidence:** High

##### P021. [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)

- **Authors / year / venue:** Jordan Hoffmann et al. · 2022 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Shows many large models were undertrained and derives compute-optimal data/model tradeoffs.
- **Lineage and relationships:** Corrects earlier scaling allocation; informs embodied pretraining design.
- **Major positioning limitation:** Derived from language modeling; data quality and multimodality complicate transfer.
- **Quality/influence signals:** NeurIPS paper; widely adopted 'Chinchilla' scaling rule.
- **Metadata and assessment confidence:** High

##### P022. [Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155)

- **Authors / year / venue:** Long Ouyang et al. · 2022 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge; Modern Core · Advanced · High; focus SFT, reward modeling, PPO, evaluation
- **Contribution:** Establishes a practical supervised-plus-RLHF post-training pipeline.
- **Lineage and relationships:** Precedes preference optimization and embodied reward modeling.
- **Major positioning limitation:** Proprietary data/model; annotator preferences and reward hacking remain concerns.
- **Quality/influence signals:** Highly influential post-training paper.
- **Metadata and assessment confidence:** High

##### P023. [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)

- **Authors / year / venue:** Edward J. Hu et al. · 2022 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/microsoft/LoRA
- **Role / level / preparation:** Modern Core · Intermediate · Low–Medium
- **Contribution:** Introduces low-rank parameter updates for efficient model adaptation.
- **Lineage and relationships:** Foundation for practical adaptation of VLM/VLA backbones.
- **Major positioning limitation:** Rank/module choices can bottleneck large domain shifts.
- **Quality/influence signals:** Extremely broad adoption; official code.
- **Metadata and assessment confidence:** High

##### P024. [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)

- **Authors / year / venue:** Tim Dettmers et al. · 2023 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Combines 4-bit quantization with LoRA to reduce fine-tuning memory.
- **Lineage and relationships:** Connects PEFT to D4 deployment constraints.
- **Major positioning limitation:** Quality and throughput depend on kernels, quantizer, and hardware; primarily language evidence.
- **Quality/influence signals:** NeurIPS paper; widely reproduced implementation.
- **Metadata and assessment confidence:** High

##### P025. [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290)

- **Authors / year / venue:** Rafael Rafailov et al. · 2023 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/eric-mitchell/direct-preference-optimization
- **Role / level / preparation:** Modern Core · Advanced · Medium–High; derive objective from KL-constrained RL
- **Contribution:** Recasts preference alignment as a direct classification-like objective without explicit reward-model RL.
- **Lineage and relationships:** Relevant to preference-based robotics and E3 reward interfaces.
- **Major positioning limitation:** Offline preference datasets can encode bias; not a substitute for closed-loop safety evaluation.
- **Quality/influence signals:** NeurIPS paper; large downstream adoption.
- **Metadata and assessment confidence:** High

##### P026. [Flamingo: a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198)

- **Authors / year / venue:** Jean-Baptiste Alayrac et al. · 2022 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Introduces cross-attention-based multimodal conditioning with frozen vision/language components.
- **Lineage and relationships:** Precedes embodied multimodal models and VLA backbones.
- **Major positioning limitation:** Closed model/data and expensive training limit reproduction.
- **Quality/influence signals:** Influential multimodal architecture paper.
- **Metadata and assessment confidence:** High

##### P027. [BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models](https://arxiv.org/abs/2301.12597)

- **Authors / year / venue:** Junnan Li et al. · 2023 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/salesforce/LAVIS
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Uses a lightweight query transformer to connect frozen vision and language models.
- **Lineage and relationships:** Alternative multimodal adaptation pattern relevant to embodied VLMs.
- **Major positioning limitation:** Image-centric and not designed for real-time control.
- **Quality/influence signals:** ICML paper; open models/code.
- **Metadata and assessment confidence:** High

#### F6. Robot mechanics, dynamics, and interaction control

##### P028. [Impedance Control: An Approach to Manipulation, Part I—Theory](https://doi.org/10.1115/1.3140702)

- **Authors / year / venue:** Neville Hogan · 1985 · ASME Journal of Dynamic Systems, Measurement, and Control
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Advanced · High; equations and physical interpretation
- **Contribution:** Frames manipulation as regulation of the dynamic force–motion relationship rather than pure position tracking.
- **Lineage and relationships:** Foundation for contact-rich manipulation, safety, and learned high-level policies.
- **Major positioning limitation:** Idealized assumptions; practical implementations require sensing, passivity, and actuator analysis.
- **Quality/influence signals:** Seminal interaction-control lineage.
- **Metadata and assessment confidence:** High

##### P029. [A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation](https://doi.org/10.1109/JRA.1987.1087068)

- **Authors / year / venue:** Oussama Khatib · 1987 · IEEE Journal on Robotics and Automation
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Advanced · High; derive task-space dynamics and null-space behavior
- **Contribution:** Establishes operational-space dynamics and dynamically consistent task control.
- **Lineage and relationships:** Connects manipulator dynamics to whole-body and contact control.
- **Major positioning limitation:** Model accuracy and torque control are demanding; constraints/contact extensions require later work.
- **Quality/influence signals:** Foundational robotics paper with enduring influence.
- **Metadata and assessment confidence:** High

##### P030. [Dynamic Movement Primitives: A Framework for Motor Control in Humans and Humanoid Robotics](https://doi.org/10.1007/4-431-31381-8_23)

- **Authors / year / venue:** Auke Ijspeert, Jun Nakanishi, and Stefan Schaal · 2002 · Adaptive Motion of Animals and Machines
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Introduces stable attractor-based motion primitives modulated by learned forcing terms.
- **Lineage and relationships:** Early bridge between control structure and learnable motion generation.
- **Major positioning limitation:** Limited multimodality and perception coupling; not a general policy architecture.
- **Quality/influence signals:** Long-standing use in robotics and movement learning.
- **Metadata and assessment confidence:** High

##### P031. [Control Barrier Function Based Quadratic Programs for Safety Critical Systems](https://doi.org/10.1109/TAC.2016.2638961)

- **Authors / year / venue:** Aaron D. Ames et al. · 2017 · IEEE Transactions on Automatic Control
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core; Bridge · Advanced · High
- **Contribution:** Combines control Lyapunov and barrier functions in online quadratic programs for safety constraints.
- **Lineage and relationships:** Links classical control to L8 safety filters.
- **Major positioning limitation:** Requires valid dynamics and barrier construction; feasibility and model mismatch are critical.
- **Quality/influence signals:** Canonical CBF formulation with broad robotics adoption.
- **Metadata and assessment confidence:** High

#### F7. Motion planning, trajectory optimization, and optimal control

##### P032. [Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces](https://doi.org/10.1109/70.508439)

- **Authors / year / venue:** Lydia E. Kavraki et al. · 1996 · IEEE Transactions on Robotics and Automation
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Intermediate · Medium
- **Contribution:** Introduces multi-query sampling-based planning through a reusable roadmap.
- **Lineage and relationships:** Foundation for motion-planning libraries and later sampling methods.
- **Major positioning limitation:** Static known geometry and collision checking assumptions; no dynamics.
- **Quality/influence signals:** Seminal planning paper; implemented in OMPL and other libraries.
- **Metadata and assessment confidence:** High

##### P033. [Rapidly-Exploring Random Trees: A New Tool for Path Planning](https://msl.cs.illinois.edu/~lavalle/papers/Lav98c.pdf)

- **Authors / year / venue:** Steven M. LaValle · 1998 · Technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Intermediate · Low–Medium
- **Contribution:** Introduces incremental exploration biased toward unvisited regions.
- **Lineage and relationships:** Foundation for single-query and kinodynamic planning variants.
- **Major positioning limitation:** Basic RRT is not asymptotically optimal and may produce poor paths.
- **Quality/influence signals:** Canonical algorithm with extensive independent implementations.
- **Metadata and assessment confidence:** High

##### P034. [CHOMP: Gradient Optimization Techniques for Efficient Motion Planning](https://doi.org/10.1109/ROBOT.2009.5152817)

- **Authors / year / venue:** Nathan Ratliff et al. · 2009 · ICRA
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · Medium–High
- **Contribution:** Optimizes trajectories with smoothness and obstacle costs in functional space.
- **Lineage and relationships:** Connects sampling-based planning to differentiable trajectory optimization.
- **Major positioning limitation:** Local minima and cost-field quality matter; dynamics/contact are limited.
- **Quality/influence signals:** Influential trajectory-optimization lineage.
- **Metadata and assessment confidence:** High

##### P035. [Motion Planning with Sequential Convex Optimization and Convex Collision Checking](https://arxiv.org/abs/1311.5605)

- **Authors / year / venue:** John Schulman et al. · 2014 · IJRR
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Introduces TrajOpt using sequential convex optimization and continuous-time collision checking.
- **Lineage and relationships:** Builds on trajectory optimization; used widely in manipulation.
- **Major positioning limitation:** Local optimization requires good initialization and accurate collision geometry.
- **Quality/influence signals:** IJRR paper with open implementations and broad use.
- **Metadata and assessment confidence:** High

##### P036. [Hierarchical Task and Motion Planning in the Now](https://doi.org/10.1109/ICRA.2011.5980391)

- **Authors / year / venue:** Leslie Pack Kaelbling and Tomás Lozano-Pérez · 2011 · ICRA
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · High
- **Contribution:** Integrates symbolic task planning with geometric feasibility through interleaved refinement.
- **Lineage and relationships:** Direct precursor to language-guided task-and-motion planning.
- **Major positioning limitation:** Scalability and model specification remain difficult; limited learning.
- **Quality/influence signals:** Foundational TAMP paper.
- **Metadata and assessment confidence:** High

##### P037. [Information-Theoretic Model Predictive Control: Theory and Applications to Autonomous Driving](https://arxiv.org/abs/1707.02342)

- **Authors / year / venue:** Grady Williams et al. · 2018 · IEEE Transactions on Robotics
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Derives sampling-based MPC updates from information-theoretic control.
- **Lineage and relationships:** Links optimal control to GPU-parallel stochastic planning and learned models.
- **Major positioning limitation:** Compute and model fidelity constrain real-time performance.
- **Quality/influence signals:** Widely used MPPI family; public implementations.
- **Metadata and assessment confidence:** High

#### F8. State estimation, sensor fusion, and SLAM

##### P038. [A New Approach to Linear Filtering and Prediction Problems](https://doi.org/10.1115/1.3662552)

- **Authors / year / venue:** Rudolf E. Kalman · 1960 · Journal of Basic Engineering
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Advanced · High; full derivation
- **Contribution:** Introduces recursive optimal state estimation for linear Gaussian systems.
- **Lineage and relationships:** Foundation for EKF/VIO and model-based filtering.
- **Major positioning limitation:** Linear-Gaussian assumptions; consistency under nonlinearization is nontrivial.
- **Quality/influence signals:** Seminal estimation paper.
- **Metadata and assessment confidence:** High

##### P039. [iSAM2: Incremental Smoothing and Mapping Using the Bayes Tree](https://doi.org/10.1177/0278364911430419)

- **Authors / year / venue:** Michael Kaess et al. · 2012 · IJRR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/borglab/gtsam
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Introduces efficient incremental nonlinear smoothing using the Bayes tree.
- **Lineage and relationships:** Connects factor graphs to real-time SLAM.
- **Major positioning limitation:** Requires careful factor modeling, linearization, and robustification.
- **Quality/influence signals:** Canonical factor-graph SLAM method; GTSAM implementation.
- **Metadata and assessment confidence:** High

##### P040. [On-Manifold Preintegration for Real-Time Visual–Inertial Odometry](https://arxiv.org/abs/1512.02363)

- **Authors / year / venue:** Christian Forster et al. · 2017 · IEEE Transactions on Robotics
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Develops IMU preintegration on manifolds for factor-graph estimation.
- **Lineage and relationships:** Prerequisite for modern VIO and many state-estimation stacks.
- **Major positioning limitation:** Bias/noise assumptions and calibration dominate practice.
- **Quality/influence signals:** Highly influential VIO methodology; implemented in GTSAM.
- **Metadata and assessment confidence:** High

##### P041. [VINS-Mono: A Robust and Versatile Monocular Visual–Inertial State Estimator](https://arxiv.org/abs/1708.03852)

- **Authors / year / venue:** Tong Qin, Peiliang Li, and Shaojie Shen · 2018 · IEEE Transactions on Robotics
- **Authoritative version used:** Published version
- **Official project/code:** https://github.com/HKUST-Aerial-Robotics/VINS-Mono
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Presents a tightly coupled sliding-window monocular VIO system with initialization and loop closure.
- **Lineage and relationships:** Applies preintegration and nonlinear optimization in a full system.
- **Major positioning limitation:** Monocular scale/degeneracy and calibration sensitivity remain important.
- **Quality/influence signals:** Widely deployed open-source VIO system.
- **Metadata and assessment confidence:** High

##### P042. [ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual–Inertial, and Multi-Map SLAM](https://arxiv.org/abs/2007.11898)

- **Authors / year / venue:** Carlos Campos et al. · 2021 · IEEE Transactions on Robotics
- **Authoritative version used:** Published version
- **Official project/code:** https://github.com/UZ-SLAMLab/ORB_SLAM3
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Unifies monocular, stereo, RGB-D, and visual–inertial SLAM with atlas-based map reuse.
- **Lineage and relationships:** Mature feature-based SLAM lineage after ORB-SLAM.
- **Major positioning limitation:** Texture, dynamics, calibration, and compute conditions affect robustness.
- **Quality/influence signals:** Highly influential open-source system with broad benchmarking.
- **Metadata and assessment confidence:** High

### B. Perception, spatial intelligence, and world models

#### P1. Visual and multimodal representation learning

##### P043. [Learning Transferable Visual Models From Natural Language Supervision](https://proceedings.mlr.press/v139/radford21a.html)

- **Authors / year / venue:** Alec Radford et al. · 2021 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/openai/CLIP
- **Role / level / preparation:** Seminal; Bridge · Intermediate · Medium
- **Contribution:** Introduces CLIP-style contrastive image–text pretraining and zero-shot classification.
- **Lineage and relationships:** Builds on contrastive learning; foundational for open-vocabulary perception and VLA backbones.
- **Major positioning limitation:** Global image–text alignment is weak for precise geometry and temporal dynamics.
- **Quality/influence signals:** Extremely influential multimodal representation paper; released models/code.
- **Metadata and assessment confidence:** High

##### P044. [Emerging Properties in Self-Supervised Vision Transformers](https://openaccess.thecvf.com/content/ICCV2021/html/Caron_Emerging_Properties_in_Self-Supervised_Vision_Transformers_ICCV_2021_paper.html)

- **Authors / year / venue:** Mathilde Caron et al. · 2021 · ICCV
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/facebookresearch/dino
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Shows DINO self-distillation yields strong semantic and dense structure without labels.
- **Lineage and relationships:** Alternative to contrastive/reconstruction objectives; precedes DINOv2.
- **Major positioning limitation:** Training recipe sensitivity and compute requirements are substantial.
- **Quality/influence signals:** ICCV paper with strong downstream influence and open code.
- **Metadata and assessment confidence:** High

##### P045. [DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193)

- **Authors / year / venue:** Maxime Oquab et al. · 2024 · TMLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/facebookresearch/dinov2
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Scales curated self-supervised visual pretraining to robust transferable image features.
- **Lineage and relationships:** Builds on DINO; common frozen visual backbone in robotics.
- **Major positioning limitation:** Image-only pretraining lacks explicit action/temporal grounding; data curation is expensive.
- **Quality/influence signals:** Widely adopted open foundation vision model.
- **Metadata and assessment confidence:** High

##### P046. [Sigmoid Loss for Language Image Pre-Training](https://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html)

- **Authors / year / venue:** Xiaohua Zhai et al. · 2023 · ICCV
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Replaces global softmax contrastive loss with pairwise sigmoid loss for scalable image–text pretraining.
- **Lineage and relationships:** Alternative to CLIP used in several efficient VLM/VLA stacks.
- **Major positioning limitation:** Large-scale results rely on substantial proprietary data/compute.
- **Quality/influence signals:** ICCV paper; SigLIP models widely reused in open VLMs.
- **Metadata and assessment confidence:** High

##### P047. [What Makes for Good Visual Representations for Robot Manipulation?](https://arxiv.org/abs/2107.12344)

- **Authors / year / venue:** Suraj Nair et al. · 2022 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Critical; Bridge · Intermediate · Medium
- **Contribution:** Systematically compares visual pretraining choices for downstream manipulation.
- **Lineage and relationships:** Connects generic representation papers to closed-loop robot control.
- **Major positioning limitation:** Results depend on task suite and policy architecture; predates newer foundation encoders.
- **Quality/influence signals:** Direct robotics evidence and controlled comparisons.
- **Metadata and assessment confidence:** High

#### P2. Detection, segmentation, grounding, and tracking

##### P048. [Mask R-CNN](https://openaccess.thecvf.com/content_ICCV_2017/html/He_Mask_R-CNN_ICCV_2017_paper.html)

- **Authors / year / venue:** Kaiming He et al. · 2017 · ICCV
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/facebookresearch/Detectron
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Extends two-stage detection with instance masks and aligned region features.
- **Lineage and relationships:** Foundation for instance-level robot scene understanding and annotation.
- **Major positioning limitation:** Closed-set categories and proposal pipeline limit open-world use.
- **Quality/influence signals:** ICCV best paper; broad production adoption.
- **Metadata and assessment confidence:** High

##### P049. [End-to-End Object Detection with Transformers](https://arxiv.org/abs/2005.12872)

- **Authors / year / venue:** Nicolas Carion et al. · 2020 · ECCV
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/facebookresearch/detr
- **Role / level / preparation:** Bridge; Modern Core · Intermediate · Medium
- **Contribution:** Recasts detection as set prediction using bipartite matching and Transformers.
- **Lineage and relationships:** Precedes open-vocabulary and grounded detector families.
- **Major positioning limitation:** Original DETR converges slowly and struggles with small objects.
- **Quality/influence signals:** Seminal set-based detection paper; extensive follow-up ecosystem.
- **Metadata and assessment confidence:** High

##### P050. [Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection](https://arxiv.org/abs/2303.05499)

- **Authors / year / venue:** Shilong Liu et al. · 2024 · ECCV
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/IDEA-Research/GroundingDINO
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Combines language grounding with Transformer detection for open-set object localization.
- **Lineage and relationships:** Builds on DETR/DINO and CLIP-like grounding; pairs naturally with SAM.
- **Major positioning limitation:** Large pretraining mix and benchmark choices complicate attribution.
- **Quality/influence signals:** Widely used open-vocabulary detector with released code/models.
- **Metadata and assessment confidence:** High

##### P051. [Segment Anything](https://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html)

- **Authors / year / venue:** Alexander Kirillov et al. · 2023 · ICCV
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/facebookresearch/segment-anything
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Introduces promptable segmentation trained on a large mask dataset.
- **Lineage and relationships:** Enables general annotation pipelines and object-centric robotics preprocessing.
- **Major positioning limitation:** Masks are not semantic, temporal, or guaranteed physically meaningful.
- **Quality/influence signals:** ICCV paper; large open model and dataset impact.
- **Metadata and assessment confidence:** High

##### P052. [SAM 2: Segment Anything in Images and Videos](https://arxiv.org/abs/2408.00714)

- **Authors / year / venue:** Nikhila Ravi et al. · 2025 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/facebookresearch/sam2
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Extends promptable segmentation to streaming video with memory.
- **Lineage and relationships:** Builds on SAM; supports tracking-assisted annotation and online perception.
- **Major positioning limitation:** Performance can degrade under occlusion, appearance change, and long sequences.
- **Quality/influence signals:** Open model, data, and implementation; rapid adoption.
- **Metadata and assessment confidence:** High

##### P053. [XMem: Long-Term Video Object Segmentation with an Atkinson–Shiffrin Memory Model](https://arxiv.org/abs/2207.07115)

- **Authors / year / venue:** Ho Kei Cheng and Alexander G. Schwing · 2022 · ECCV
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/hkchengrex/XMem
- **Role / level / preparation:** Bridge; Optional · Advanced · Medium
- **Contribution:** Uses sensory, working, and long-term memory for efficient video object segmentation.
- **Lineage and relationships:** Precedes memory-centric video segmentation and embodied memory ideas.
- **Major positioning limitation:** Requires initial object specification and is not a semantic reasoner.
- **Quality/influence signals:** Strong benchmark performance with open code.
- **Metadata and assessment confidence:** High

#### P3. 3D representation, reconstruction, and semantic mapping

##### P054. [PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation](https://openaccess.thecvf.com/content_cvpr_2017/html/Qi_PointNet_Deep_Learning_CVPR_2017_paper.html)

- **Authors / year / venue:** Charles R. Qi et al. · 2017 · CVPR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/charlesq34/pointnet
- **Role / level / preparation:** Foundation; Seminal · Intermediate · Medium
- **Contribution:** Introduces permutation-invariant direct learning over point sets.
- **Lineage and relationships:** Foundation for learned point-cloud perception.
- **Major positioning limitation:** Weak local-geometry modeling motivates PointNet++.
- **Quality/influence signals:** Canonical 3D deep-learning paper; broad open implementations.
- **Metadata and assessment confidence:** High

##### P055. [PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space](https://arxiv.org/abs/1706.02413)

- **Authors / year / venue:** Charles R. Qi et al. · 2017 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/charlesq34/pointnet2
- **Role / level / preparation:** Bridge; Modern Core · Intermediate · Medium
- **Contribution:** Adds hierarchical neighborhood aggregation and multi-scale geometry.
- **Lineage and relationships:** Direct development of PointNet toward local 3D structure.
- **Major positioning limitation:** Neighborhood sampling and density variation remain costly/sensitive.
- **Quality/influence signals:** Widely adopted 3D backbone; public code.
- **Metadata and assessment confidence:** High

##### P056. [Point Transformer](https://openaccess.thecvf.com/content/ICCV2021/html/Zhao_Point_Transformer_ICCV_2021_paper.html)

- **Authors / year / venue:** Hengshuang Zhao et al. · 2021 · ICCV
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Adapts vector attention to local point-cloud processing.
- **Lineage and relationships:** Transformer-based successor to PointNet-family representations.
- **Major positioning limitation:** Compute/memory cost and sparse neighborhood design matter.
- **Quality/influence signals:** Strong 3D benchmark influence; open implementations.
- **Metadata and assessment confidence:** High

##### P057. [Occupancy Networks: Learning 3D Reconstruction in Function Space](https://openaccess.thecvf.com/content_CVPR_2019/html/Mescheder_Occupancy_Networks_Learning_3D_Reconstruction_in_Function_Space_CVPR_2019_paper.html)

- **Authors / year / venue:** Lars Mescheder et al. · 2019 · CVPR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/autonomousvision/occupancy_networks
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Represents 3D geometry as a continuous learned occupancy function.
- **Lineage and relationships:** Precursor to neural implicit scene representations.
- **Major positioning limitation:** Static object-centric setting; extracting meshes and high-frequency detail can be costly.
- **Quality/influence signals:** Influential implicit-representation paper with released code.
- **Metadata and assessment confidence:** High

##### P058. [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis](https://arxiv.org/abs/2003.08934)

- **Authors / year / venue:** Ben Mildenhall et al. · 2020 · ECCV
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/bmild/nerf
- **Role / level / preparation:** Seminal; Bridge · Advanced · High
- **Contribution:** Represents scenes as continuous density and radiance fields optimized through differentiable rendering.
- **Lineage and relationships:** Foundation for neural scene reconstruction and synthetic asset generation.
- **Major positioning limitation:** Slow optimization/rendering in original form; static-scene and calibrated-camera assumptions.
- **Quality/influence signals:** Seminal neural rendering paper; massive follow-up literature.
- **Metadata and assessment confidence:** High

##### P059. [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

- **Authors / year / venue:** Bernhard Kerbl et al. · 2023 · ACM Transactions on Graphics / SIGGRAPH
- **Authoritative version used:** Published version
- **Official project/code:** https://github.com/graphdeco-inria/gaussian-splatting
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Uses anisotropic 3D Gaussians and differentiable splatting for high-quality real-time rendering.
- **Lineage and relationships:** Operational alternative to NeRF for scene capture and simulation assets.
- **Major positioning limitation:** Geometry can be noisy; dynamic scenes, relighting, and physical semantics require extensions.
- **Quality/influence signals:** SIGGRAPH paper; open reference implementation and rapid adoption.
- **Metadata and assessment confidence:** High

##### P060. [ConceptFusion: Open-set Multimodal 3D Mapping](https://arxiv.org/abs/2302.07241)

- **Authors / year / venue:** Krishna Murthy Jatavallabhula et al. · 2023 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/concept-fusion/concept-fusion
- **Role / level / preparation:** Modern Core · Advanced · Medium–High
- **Contribution:** Fuses open-vocabulary 2D features into queryable 3D maps.
- **Lineage and relationships:** Connects CLIP-like representations, SLAM, and embodied querying.
- **Major positioning limitation:** Feature projection inherits 2D encoder and pose-estimation errors.
- **Quality/influence signals:** RSS paper with open code and real-world demonstrations.
- **Metadata and assessment confidence:** High

#### P4. Video representation and predictive learning

##### P061. [Representation Learning with Contrastive Predictive Coding](https://arxiv.org/abs/1807.03748)

- **Authors / year / venue:** Aaron van den Oord, Yazhe Li, and Oriol Vinyals · 2018 · arXiv preprint
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · Medium
- **Contribution:** Learns representations by predicting future latent observations with a contrastive objective.
- **Lineage and relationships:** Early predictive-representation lineage leading to modern video SSL and JEPA.
- **Major positioning limitation:** Contrastive negatives and autoregressive assumptions limit scalability/semantics.
- **Quality/influence signals:** Highly influential self-supervised sequence-learning paper.
- **Metadata and assessment confidence:** High

##### P062. [VideoMAE: Masked Autoencoders are Data-Efficient Learners for Self-Supervised Video Pre-Training](https://arxiv.org/abs/2203.12602)

- **Authors / year / venue:** Zhan Tong et al. · 2022 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/MCG-NJU/VideoMAE
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Extends high-ratio masked reconstruction to video for efficient temporal representation learning.
- **Lineage and relationships:** Builds on MAE; baseline for predictive video encoders.
- **Major positioning limitation:** Reconstruction objective may focus on appearance over actionable dynamics.
- **Quality/influence signals:** NeurIPS paper with public code and broad benchmarking.
- **Metadata and assessment confidence:** High

##### P063. [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://openaccess.thecvf.com/content/CVPR2023/html/Assran_Self-Supervised_Learning_From_Images_With_a_Joint-Embedding_Predictive_Architecture_CVPR_2023_paper.html)

- **Authors / year / venue:** Mahmoud Assran et al. · 2023 · CVPR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/facebookresearch/ijepa
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Introduces I-JEPA, predicting target embeddings rather than reconstructing pixels.
- **Lineage and relationships:** Conceptual precursor to V-JEPA and latent world models.
- **Major positioning limitation:** Image-only and not action-conditioned.
- **Quality/influence signals:** CVPR paper with official code/models.
- **Metadata and assessment confidence:** High

##### P064. [Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)

- **Authors / year / venue:** Adrien Bardes et al. · 2024 · arXiv preprint
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/facebookresearch/jepa
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Introduces V-JEPA and shows feature prediction can learn strong frozen video representations without pixel reconstruction or text.
- **Lineage and relationships:** Extends I-JEPA from images to video; precursor to V-JEPA 2.
- **Major positioning limitation:** Action-free representation quality does not itself establish planning capability.
- **Quality/influence signals:** Official Meta code/models and strong benchmark results.
- **Metadata and assessment confidence:** High

##### P065. [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985)

- **Authors / year / venue:** Mido Assran et al. · 2025 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/facebookresearch/vjepa2
- **Role / level / preparation:** Modern Core; Frontier Bridge · Expert · High
- **Contribution:** Scales action-free video pretraining and adds an action-conditioned latent predictor for zero-shot image-goal planning.
- **Lineage and relationships:** Connects web video, DROID robot video, latent world modeling, and MPC.
- **Major positioning limitation:** Robot evidence is limited in task breadth and relies on a small action-conditioned post-training stage.
- **Quality/influence signals:** Official models/code; high-profile direct planning result.
- **Metadata and assessment confidence:** Medium

#### P5. Learned dynamics, model-based RL, and world models

##### P066. [PILCO: A Model-Based and Data-Efficient Approach to Policy Search](https://proceedings.mlr.press/v15/deisenroth11a.html)

- **Authors / year / venue:** Marc Peter Deisenroth and Carl Edward Rasmussen · 2011 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Expert · High
- **Contribution:** Uses Gaussian-process dynamics and analytic uncertainty propagation for data-efficient control.
- **Lineage and relationships:** Foundational uncertainty-aware model-based policy search.
- **Major positioning limitation:** Scales poorly with state/data dimension and relies on smooth low-dimensional dynamics.
- **Quality/influence signals:** Seminal model-based RL paper with strong real-robot evidence for its era.
- **Metadata and assessment confidence:** High

##### P067. [Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models](https://arxiv.org/abs/1805.12114)

- **Authors / year / venue:** Kurtland Chua et al. · 2018 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Introduces PETS: probabilistic ensembles plus trajectory sampling for uncertainty-aware planning.
- **Lineage and relationships:** Scalable neural successor to PILCO; precursor to modern ensemble MBRL.
- **Major positioning limitation:** Short-horizon benchmark focus and expensive online planning.
- **Quality/influence signals:** Highly influential model-based RL baseline; public code.
- **Metadata and assessment confidence:** High

##### P068. [Learning Latent Dynamics for Planning from Pixels](https://proceedings.mlr.press/v97/hafner19a.html)

- **Authors / year / venue:** Danijar Hafner et al. · 2019 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge; Modern Core · Advanced · High
- **Contribution:** Introduces PlaNet, a recurrent latent state-space model used for planning from images.
- **Lineage and relationships:** Precursor to Dreamer and latent imagination methods.
- **Major positioning limitation:** Planning quality depends on latent model and reward prediction; limited long-horizon uncertainty.
- **Quality/influence signals:** Canonical latent-dynamics paper with open implementation.
- **Metadata and assessment confidence:** High

##### P069. [Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model](https://www.nature.com/articles/s41586-020-03051-4)

- **Authors / year / venue:** Julian Schrittwieser et al. · 2020 · Nature
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Expert · High
- **Contribution:** Introduces MuZero, learning reward/value/policy-relevant dynamics without reconstructing observations.
- **Lineage and relationships:** Value-equivalent alternative to generative world models.
- **Major positioning limitation:** Large compute, discrete domains, and proprietary implementation limit robotics transfer.
- **Quality/influence signals:** Landmark planning-with-learned-model result.
- **Metadata and assessment confidence:** High

##### P070. [Mastering Diverse Domains through World Models](https://arxiv.org/abs/2301.04104)

- **Authors / year / venue:** Danijar Hafner et al. · 2023 · arXiv technical report (DreamerV3)
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/danijar/dreamerv3
- **Role / level / preparation:** Modern Core · Expert · High
- **Contribution:** Presents a robust latent world-model actor–critic recipe across diverse domains with one configuration.
- **Lineage and relationships:** Extends PlaNet/Dreamer lineage; strong baseline for imagined rollouts.
- **Major positioning limitation:** Mostly simulated benchmarks; real-robot and model-bias questions remain.
- **Quality/influence signals:** Widely used open implementation and strong cross-domain evidence.
- **Metadata and assessment confidence:** High

##### P071. [TD-MPC2: Scalable, Robust World Models for Continuous Control](https://arxiv.org/abs/2310.16828)

- **Authors / year / venue:** Nicklas Hansen et al. · 2024 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/nicklashansen/tdmpc2
- **Role / level / preparation:** Modern Core · Expert · High
- **Contribution:** Combines latent dynamics, value learning, and local trajectory optimization for multi-task control.
- **Lineage and relationships:** Modern model-based alternative to Dreamer-style policy learning.
- **Major positioning limitation:** Primarily simulated control; planning cost and representation choices matter.
- **Quality/influence signals:** ICLR paper with open code and broad benchmark evidence.
- **Metadata and assessment confidence:** High

### C. Learning to act

#### L1. Reinforcement-learning foundations

##### P072. [Learning to Predict by the Methods of Temporal Differences](https://doi.org/10.1007/BF00115009)

- **Authors / year / venue:** Richard S. Sutton · 1988 · Machine Learning
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Advanced · High
- **Contribution:** Introduces temporal-difference learning and bootstrapping.
- **Lineage and relationships:** Foundation for value learning and actor–critic algorithms.
- **Major positioning limitation:** Linear/tabular analysis; function approximation adds instability.
- **Quality/influence signals:** Seminal RL paper.
- **Metadata and assessment confidence:** High

##### P073. [Q-Learning](https://doi.org/10.1007/BF00992698)

- **Authors / year / venue:** Christopher J. C. H. Watkins and Peter Dayan · 1992 · Machine Learning
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Advanced · Medium–High
- **Contribution:** Establishes off-policy temporal-difference control through Q-learning.
- **Lineage and relationships:** Builds on TD learning; precursor to DQN and offline Q-learning.
- **Major positioning limitation:** Convergence assumptions fail under nonlinear approximation and distribution shift.
- **Quality/influence signals:** Canonical model-free RL result.
- **Metadata and assessment confidence:** High

##### P074. [Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://doi.org/10.1007/BF00992696)

- **Authors / year / venue:** Ronald J. Williams · 1992 · Machine Learning
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Advanced · Medium–High
- **Contribution:** Introduces REINFORCE likelihood-ratio policy gradients.
- **Lineage and relationships:** Foundation for modern policy-gradient and preference optimization methods.
- **Major positioning limitation:** High variance and poor sample efficiency without baselines/critics.
- **Quality/influence signals:** Canonical policy-gradient paper.
- **Metadata and assessment confidence:** High

##### P075. [Human-Level Control through Deep Reinforcement Learning](https://www.nature.com/articles/nature14236)

- **Authors / year / venue:** Volodymyr Mnih et al. · 2015 · Nature
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge; Seminal · Intermediate · Medium
- **Contribution:** Combines convolutional perception, replay buffers, and target networks in DQN.
- **Lineage and relationships:** Bridge from tabular Q-learning to deep RL.
- **Major positioning limitation:** Atari-specific, discrete actions, high sample cost, and reproducibility issues.
- **Quality/influence signals:** Landmark deep-RL result with extensive independent reproduction.
- **Metadata and assessment confidence:** High

##### P076. [Asynchronous Methods for Deep Reinforcement Learning](https://proceedings.mlr.press/v48/mniha16.html)

- **Authors / year / venue:** Volodymyr Mnih et al. · 2016 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Introduces A3C and practical deep actor–critic training without replay.
- **Lineage and relationships:** Links policy gradients, value functions, and parallel data collection.
- **Major positioning limitation:** Later synchronous methods are easier to reproduce; still sample-inefficient.
- **Quality/influence signals:** Highly influential actor–critic paper.
- **Metadata and assessment confidence:** High

#### L2. Deep model-free continuous control

##### P077. [Trust Region Policy Optimization](https://proceedings.mlr.press/v37/schulman15.html)

- **Authors / year / venue:** John Schulman et al. · 2015 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Modern Core · Advanced · High
- **Contribution:** Derives constrained policy updates motivated by monotonic improvement.
- **Lineage and relationships:** Foundation for GAE/PPO and stable on-policy optimization.
- **Major positioning limitation:** Second-order approximation and implementation complexity; guarantees are local/idealized.
- **Quality/influence signals:** Canonical continuous-control policy optimization paper.
- **Metadata and assessment confidence:** High

##### P078. [High-Dimensional Continuous Control Using Generalized Advantage Estimation](https://arxiv.org/abs/1506.02438)

- **Authors / year / venue:** John Schulman et al. · 2016 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · High
- **Contribution:** Introduces GAE to trade bias against variance in policy-gradient estimates.
- **Lineage and relationships:** Directly supports TRPO/PPO implementations.
- **Major positioning limitation:** Depends on value-function quality and trajectory truncation choices.
- **Quality/influence signals:** Widely adopted estimator in actor–critic systems.
- **Metadata and assessment confidence:** High

##### P079. [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)

- **Authors / year / venue:** John Schulman et al. · 2017 · arXiv preprint
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Introduces clipped and KL-penalized surrogate objectives for simpler stable on-policy updates.
- **Lineage and relationships:** Practical successor to TRPO; common robotics baseline.
- **Major positioning limitation:** Sensitive to implementation, normalization, batch reuse, and tuning; no strict trust-region guarantee.
- **Quality/influence signals:** Extremely broad adoption and extensive reproductions.
- **Metadata and assessment confidence:** High

##### P080. [Continuous Control with Deep Reinforcement Learning](https://arxiv.org/abs/1509.02971)

- **Authors / year / venue:** Timothy P. Lillicrap et al. · 2016 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Introduces DDPG, combining deterministic policy gradients with replay and target networks.
- **Lineage and relationships:** Precursor to TD3 and off-policy continuous-control methods.
- **Major positioning limitation:** Known instability, overestimation, and exploration weaknesses.
- **Quality/influence signals:** Historically decisive algorithm; broad but often superseded.
- **Metadata and assessment confidence:** High

##### P081. [Addressing Function Approximation Error in Actor-Critic Methods](https://proceedings.mlr.press/v80/fujimoto18a.html)

- **Authors / year / venue:** Scott Fujimoto, Herke van Hoof, and David Meger · 2018 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Introduces TD3 with twin critics, delayed policy updates, and target smoothing.
- **Lineage and relationships:** Direct correction of DDPG failure modes.
- **Major positioning limitation:** Deterministic exploration and tuning remain challenging.
- **Quality/influence signals:** Canonical off-policy continuous-control baseline; public code.
- **Metadata and assessment confidence:** High

##### P082. [Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor](https://proceedings.mlr.press/v80/haarnoja18b.html)

- **Authors / year / venue:** Tuomas Haarnoja et al. · 2018 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Introduces maximum-entropy stochastic actor–critic learning for robust exploration and off-policy control.
- **Lineage and relationships:** Alternative to TD3; widely used in robot learning.
- **Major positioning limitation:** Temperature, replay distribution, and reward scaling affect behavior; real-robot sample cost remains high.
- **Quality/influence signals:** Canonical continuous-control baseline; mature implementations.
- **Metadata and assessment confidence:** High

##### P083. [Hindsight Experience Replay](https://arxiv.org/abs/1707.01495)

- **Authors / year / venue:** Marcin Andrychowicz et al. · 2017 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Relabels failed trajectories with achieved goals to learn under sparse rewards.
- **Lineage and relationships:** Bridge from goal-conditioned RL to data reuse.
- **Major positioning limitation:** Requires meaningful goal representation and relabeling semantics.
- **Quality/influence signals:** Seminal sparse-reward technique with broad adoption.
- **Metadata and assessment confidence:** High

#### L3. Imitation learning and inverse reinforcement learning

##### P084. [A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning](https://proceedings.mlr.press/v15/ross11a.html)

- **Authors / year / venue:** Stéphane Ross, Geoffrey Gordon, and Drew Bagnell · 2011 · AISTATS
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Advanced · High
- **Contribution:** Introduces DAgger and formalizes compounding error from covariate shift.
- **Lineage and relationships:** Foundation for interactive corrections and human-in-the-loop data loops.
- **Major positioning limitation:** Requires expert queries during rollout; unsafe states may be costly.
- **Quality/influence signals:** Canonical imitation-learning result with strong theory.
- **Metadata and assessment confidence:** High

##### P085. [Maximum Entropy Inverse Reinforcement Learning](https://www.aaai.org/Papers/AAAI/2008/AAAI08-227.pdf)

- **Authors / year / venue:** Brian D. Ziebart et al. · 2008 · AAAI
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · High
- **Contribution:** Infers rewards by maximum-entropy trajectory modeling.
- **Lineage and relationships:** Foundation for probabilistic IRL and GAIL/AIRL.
- **Major positioning limitation:** Reward identifiability and dynamics knowledge remain difficult.
- **Quality/influence signals:** Seminal IRL paper.
- **Metadata and assessment confidence:** High

##### P086. [Generative Adversarial Imitation Learning](https://arxiv.org/abs/1606.03476)

- **Authors / year / venue:** Jonathan Ho and Stefano Ermon · 2016 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Matches expert occupancy measures through adversarial learning.
- **Lineage and relationships:** Connects IRL and policy optimization without explicit reward recovery.
- **Major positioning limitation:** Training instability and sample cost; discriminator reward may not transfer.
- **Quality/influence signals:** Canonical adversarial imitation paper with public implementations.
- **Metadata and assessment confidence:** High

##### P087. [Learning Robust Rewards with Adversarial Inverse Reinforcement Learning](https://arxiv.org/abs/1710.11248)

- **Authors / year / venue:** Justin Fu, Katie Luo, and Sergey Levine · 2018 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · High
- **Contribution:** Introduces AIRL to recover disentangled rewards under adversarial imitation.
- **Lineage and relationships:** Develops GAIL toward transferable reward learning.
- **Major positioning limitation:** Identifiability assumptions and adversarial instability remain.
- **Quality/influence signals:** Influential IRL method with open code.
- **Metadata and assessment confidence:** High

##### P088. [Learning Complex Dexterous Manipulation with Deep Reinforcement Learning and Demonstrations](https://arxiv.org/abs/1709.10087)

- **Authors / year / venue:** Aravind Rajeswaran et al. · 2018 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge; Modern Core · Advanced · High
- **Contribution:** Introduces DAPG, combining demonstrations with policy-gradient fine-tuning for dexterous hands.
- **Lineage and relationships:** Connects behavior cloning, RL, and sim-to-real dexterity.
- **Major positioning limitation:** Simulation-heavy, task-specific, and dependent on demonstrations and reward design.
- **Quality/influence signals:** Landmark dexterous manipulation result with physical transfer.
- **Metadata and assessment confidence:** High

##### P089. [What Matters in Learning from Offline Human Demonstrations for Robot Manipulation](https://arxiv.org/abs/2108.03298)

- **Authors / year / venue:** Ajay Mandlekar et al. · 2021 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/ARISE-Initiative/robomimic
- **Role / level / preparation:** Critical; Modern Core · Intermediate · High; focus controlled factors and benchmark design
- **Contribution:** Systematically studies demonstration quality, observation modalities, algorithms, and datasets in robomimic.
- **Lineage and relationships:** Provides empirical correction to architecture-only narratives.
- **Major positioning limitation:** Limited task/platform diversity relative to current generalist datasets.
- **Quality/influence signals:** Open benchmark, datasets, and code; broad adoption.
- **Metadata and assessment confidence:** High

#### L4. Offline and offline-to-online reinforcement learning

##### P090. [Off-Policy Deep Reinforcement Learning without Exploration](https://proceedings.mlr.press/v97/fujimoto19a.html)

- **Authors / year / venue:** Scott Fujimoto, David Meger, and Doina Precup · 2019 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · Medium–High
- **Contribution:** Introduces BCQ, constraining policy actions to remain near the offline dataset.
- **Lineage and relationships:** Early deep offline-RL response to extrapolation error.
- **Major positioning limitation:** Constraint can block improvement beyond behavior and is sensitive to generative-model quality.
- **Quality/influence signals:** Historically important offline-RL baseline.
- **Metadata and assessment confidence:** High

##### P091. [Conservative Q-Learning for Offline Reinforcement Learning](https://arxiv.org/abs/2006.04779)

- **Authors / year / venue:** Aviral Kumar et al. · 2020 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Penalizes overestimated values for actions outside the dataset.
- **Lineage and relationships:** Central conservative-value approach following BCQ.
- **Major positioning limitation:** Conservatism is difficult to tune and can underperform on high-quality data.
- **Quality/influence signals:** Canonical offline-RL method; open code.
- **Metadata and assessment confidence:** High

##### P092. [Offline Reinforcement Learning with Implicit Q-Learning](https://arxiv.org/abs/2110.06169)

- **Authors / year / venue:** Ilya Kostrikov, Ashvin Nair, and Sergey Levine · 2022 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/ikostrikov/implicit_q_learning
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Avoids explicit evaluation of out-of-distribution actions through expectile value learning and advantage-weighted regression.
- **Lineage and relationships:** Modern alternative to CQL; widely used in robotics.
- **Major positioning limitation:** Expectile and temperature tuning strongly affect behavior; theory/evidence remain dataset-dependent.
- **Quality/influence signals:** Highly influential open implementation.
- **Metadata and assessment confidence:** High

##### P093. [Decision Transformer: Reinforcement Learning via Sequence Modeling](https://arxiv.org/abs/2106.01345)

- **Authors / year / venue:** Lili Chen et al. · 2021 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Frames offline RL as return-conditioned sequence modeling.
- **Lineage and relationships:** Connects Transformers and trajectory modeling; precursor to token-based robot policies.
- **Major positioning limitation:** Return conditioning is brittle under distribution shift; weak online correction.
- **Quality/influence signals:** Landmark sequence-modeling view of offline RL.
- **Metadata and assessment confidence:** High

##### P094. [Efficient Online Reinforcement Learning with Offline Data](https://arxiv.org/abs/2302.02948)

- **Authors / year / venue:** Philip J. Ball et al. · 2023 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Introduces RLPD, mixing offline and online replay with ensemble critics for sample-efficient fine-tuning.
- **Lineage and relationships:** Bridge from offline datasets to real-world online learning.
- **Major positioning limitation:** Still needs safe online interaction and careful replay balance.
- **Quality/influence signals:** Strong empirical real-robot relevance; open code.
- **Metadata and assessment confidence:** High

##### P095. [Cal-QL: Calibrated Offline RL Pre-Training for Efficient Online Fine-Tuning](https://arxiv.org/abs/2303.05479)

- **Authors / year / venue:** Nir Levine et al. · 2023 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Calibrates conservative Q-values to improve transition from offline pretraining to online learning.
- **Lineage and relationships:** Develops CQL toward practical offline-to-online adaptation.
- **Major positioning limitation:** Calibration depends on reward/value scale and online safety.
- **Quality/influence signals:** Strong benchmark evidence and open implementation.
- **Metadata and assessment confidence:** High

#### L5. Goal-conditioned, hierarchical, meta-, and skill learning

##### P096. [Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction in Reinforcement Learning](https://doi.org/10.1016/S0004-3702(99)00052-1)

- **Authors / year / venue:** Richard Sutton, Doina Precup, and Satinder Singh · 1999 · Artificial Intelligence
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Expert · High
- **Contribution:** Introduces the options framework for temporally extended actions.
- **Lineage and relationships:** Foundation for hierarchical RL and skill composition.
- **Major positioning limitation:** Learning useful options and termination remains difficult.
- **Quality/influence signals:** Seminal hierarchy framework.
- **Metadata and assessment confidence:** High

##### P097. [Universal Value Function Approximators](https://proceedings.mlr.press/v37/schaul15.html)

- **Authors / year / venue:** Tom Schaul et al. · 2015 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Conditions value functions on goals to enable transfer across tasks.
- **Lineage and relationships:** Foundation for goal-conditioned RL and HER.
- **Major positioning limitation:** Goal representation and sampling determine generalization.
- **Quality/influence signals:** Influential goal-conditioned RL paper.
- **Metadata and assessment confidence:** High

##### P098. [Diversity Is All You Need: Learning Skills without a Reward Function](https://arxiv.org/abs/1802.06070)

- **Authors / year / venue:** Benjamin Eysenbach et al. · 2019 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Introduces DIAYN, discovering diverse skills by maximizing mutual information.
- **Lineage and relationships:** Key unsupervised skill-learning lineage.
- **Major positioning limitation:** Diversity does not guarantee task usefulness or physical safety.
- **Quality/influence signals:** Widely used skill-discovery baseline.
- **Metadata and assessment confidence:** High

##### P099. [Data-Efficient Hierarchical Reinforcement Learning](https://arxiv.org/abs/1805.08296)

- **Authors / year / venue:** Ofir Nachum et al. · 2018 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Introduces HIRO with off-policy correction for hierarchical continuous control.
- **Lineage and relationships:** Practical development of options-like temporal abstraction.
- **Major positioning limitation:** Subgoal representation and non-stationarity remain difficult.
- **Quality/influence signals:** Influential hierarchical-control method.
- **Metadata and assessment confidence:** High

##### P100. [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://proceedings.mlr.press/v70/finn17a.html)

- **Authors / year / venue:** Chelsea Finn, Pieter Abbeel, and Sergey Levine · 2017 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · High
- **Contribution:** Learns initial parameters optimized for rapid adaptation.
- **Lineage and relationships:** Foundation for meta-RL and few-shot robot adaptation.
- **Major positioning limitation:** Bi-level optimization is expensive and sensitive to task distribution.
- **Quality/influence signals:** Seminal meta-learning paper.
- **Metadata and assessment confidence:** High

##### P101. [Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables](https://proceedings.mlr.press/v97/rakelly19a.html)

- **Authors / year / venue:** Kate Rakelly et al. · 2019 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Expert · High
- **Contribution:** Introduces PEARL, inferring latent task context from experience for off-policy meta-RL.
- **Lineage and relationships:** Develops MAML-style adaptation into probabilistic task inference.
- **Major positioning limitation:** Assumes training/test task-family overlap and can fail under ambiguity.
- **Quality/influence signals:** Influential meta-RL method with open code.
- **Metadata and assessment confidence:** High

#### L6. Generative action policies and action representations

##### P102. [Behavior Transformers: Cloning k Modes with One Stone](https://arxiv.org/abs/2206.11251)

- **Authors / year / venue:** Homer Rich Walke et al. · 2022 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Introduces BeT, combining discrete behavior modes with continuous residual actions.
- **Lineage and relationships:** Alternative to direct regression and precursor to richer generative policies.
- **Major positioning limitation:** Token clustering and autoregressive errors limit precision/latency.
- **Quality/influence signals:** Influential multimodal behavior-cloning baseline.
- **Metadata and assessment confidence:** High

##### P103. [Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://arxiv.org/abs/2304.13705)

- **Authors / year / venue:** Tony Z. Zhao et al. · 2023 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/tonyzhaozh/act
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Introduces ACT: action-chunking Transformer, temporal ensembling, and low-cost ALOHA data collection.
- **Lineage and relationships:** Directly links D1 teleoperation to chunked imitation policies.
- **Major positioning limitation:** Task-specific training and fixed observation/action conventions limit generality.
- **Quality/influence signals:** Highly influential open hardware/policy system.
- **Metadata and assessment confidence:** High

##### P104. [Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](https://arxiv.org/abs/2303.04137)

- **Authors / year / venue:** Cheng Chi et al. · 2023 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/real-stanford/diffusion_policy
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Models action sequences with conditional diffusion and receding-horizon control.
- **Lineage and relationships:** Direct application of F4 diffusion models to multimodal robot behavior.
- **Major positioning limitation:** Iterative sampling and horizon design create latency/reactivity tradeoffs.
- **Quality/influence signals:** Canonical generative robot-policy paper; open code.
- **Metadata and assessment confidence:** High

##### P105. [RT-1: Robotics Transformer for Real-World Control at Scale](https://arxiv.org/abs/2212.06817)

- **Authors / year / venue:** Anthony Brohan et al. · 2023 · Robotics: Science and Systems
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · High
- **Contribution:** Uses tokenized actions and a Transformer policy trained on a large multi-task real-robot dataset.
- **Lineage and relationships:** Bridge from specialist imitation policies to E2 generalist VLAs.
- **Major positioning limitation:** Single-organization data and embodiment; limited open reproduction.
- **Quality/influence signals:** Landmark scaled real-robot policy paper.
- **Metadata and assessment confidence:** High

##### P106. [FAST: Efficient Action Tokenization for Vision-Language-Action Models](https://arxiv.org/abs/2501.09747)

- **Authors / year / venue:** Karl Pertsch et al. · 2025 · Robotics: Science and Systems
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/Physical-Intelligence/openpi
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Compresses high-frequency action trajectories into efficient discrete tokens.
- **Lineage and relationships:** Improves autoregressive VLA action efficiency and connects to D4.
- **Major positioning limitation:** Tokenization quality is embodiment/data dependent; discrete reconstruction errors matter.
- **Quality/influence signals:** Open method used in modern VLA stacks.
- **Metadata and assessment confidence:** High

#### L7. Sim-to-real transfer, system identification, and adaptation

##### P107. [Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World](https://arxiv.org/abs/1703.06907)

- **Authors / year / venue:** Josh Tobin et al. · 2017 · IROS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Intermediate · Low–Medium
- **Contribution:** Shows visual randomization can make real images appear as one variation of simulation.
- **Lineage and relationships:** Foundation for sim-to-real perception.
- **Major positioning limitation:** Manual randomization ranges and unrealistic variation can hurt transfer.
- **Quality/influence signals:** Seminal visual domain-randomization result.
- **Metadata and assessment confidence:** High

##### P108. [Sim-to-Real Transfer of Robotic Control with Dynamics Randomization](https://arxiv.org/abs/1710.06537)

- **Authors / year / venue:** Xue Bin Peng et al. · 2018 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal; Bridge · Advanced · Medium
- **Contribution:** Randomizes physical parameters during training to transfer control policies.
- **Lineage and relationships:** Extends domain randomization from vision to dynamics.
- **Major positioning limitation:** Coverage of real dynamics and actuator/latency modeling is critical.
- **Quality/influence signals:** Canonical dynamics-randomization paper.
- **Metadata and assessment confidence:** High

##### P109. [SimOpt: Learning to Adapt Simulators to Real-World Conditions](https://arxiv.org/abs/1810.05687)

- **Authors / year / venue:** Fabio Ramos et al. · 2019 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Updates simulator-parameter distributions from real trajectories to improve transfer.
- **Lineage and relationships:** System-identification complement to broad randomization.
- **Major positioning limitation:** Requires informative real rollouts and chosen simulator parameterization.
- **Quality/influence signals:** Influential simulator-calibration method.
- **Metadata and assessment confidence:** High

##### P110. [Learning Agile and Dynamic Motor Skills for Legged Robots](https://www.science.org/doi/10.1126/scirobotics.aau5872)

- **Authors / year / venue:** Jemin Hwangbo et al. · 2019 · Science Robotics
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Combines massively parallel simulation, dynamics randomization, and learned actuator modeling for quadruped transfer.
- **Lineage and relationships:** Important systems proof for simulation-trained control.
- **Major positioning limitation:** Specialized hardware and extensive engineering obscure individual contributions.
- **Quality/influence signals:** Landmark real-robot sim-to-real locomotion result.
- **Metadata and assessment confidence:** High

##### P111. [RMA: Rapid Motor Adaptation for Legged Robots](https://arxiv.org/abs/2107.04034)

- **Authors / year / venue:** Ashish Kumar et al. · 2021 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Uses privileged training and an online adaptation module to infer environmental dynamics.
- **Lineage and relationships:** Moves from robust randomization toward rapid latent adaptation.
- **Major positioning limitation:** Primarily locomotion; adaptation identifiability and safety under novelty remain open.
- **Quality/influence signals:** Highly influential real-world adaptation paper; open code.
- **Metadata and assessment confidence:** High

#### L8. Safety, uncertainty, intervention, and constrained learning

##### P112. [Constrained Policy Optimization](https://proceedings.mlr.press/v70/achiam17a.html)

- **Authors / year / venue:** Joshua Achiam et al. · 2017 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Modern Core · Advanced · High
- **Contribution:** Optimizes return under explicit expected-cost constraints using trust-region updates.
- **Lineage and relationships:** Canonical constrained-MDP method building on TRPO.
- **Major positioning limitation:** Average constraints do not guarantee per-step safety; estimates can be inaccurate.
- **Quality/influence signals:** Foundational safe-RL algorithm.
- **Metadata and assessment confidence:** High

##### P113. [Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles](https://arxiv.org/abs/1612.01474)

- **Authors / year / venue:** Balaji Lakshminarayanan, Alexander Pritzel, and Charles Blundell · 2017 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Modern Core · Advanced · Medium; focus method, calibration, and OOD experiments
- **Contribution:** Establishes independently trained ensembles as a simple and strong baseline for predictive uncertainty, calibration, and out-of-distribution behavior.
- **Lineage and relationships:** Practical uncertainty baseline for model-based control, OOD detection, and safety monitoring.
- **Major positioning limitation:** Compute scales with ensemble size; uncertainty quality is empirical rather than guaranteed.
- **Quality/influence signals:** Long-standing, widely used uncertainty baseline with extensive downstream comparisons.
- **Metadata and assessment confidence:** High

##### P114. [Recovery RL: Safe Reinforcement Learning with Learned Recovery Zones](https://arxiv.org/abs/1807.09308)

- **Authors / year / venue:** Thanard Kurutach et al. · 2018 · arXiv preprint
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Separates task policy and recovery policy using learned safety estimates.
- **Lineage and relationships:** Connects constrained RL to intervention/recovery architectures.
- **Major positioning limitation:** Safety depends on learned classifier coverage and reset assumptions.
- **Quality/influence signals:** Influential recovery-policy formulation.
- **Metadata and assessment confidence:** High

##### P115. [ThriftyDAgger: Budget-Aware Novelty and Risk Gating for Interactive Imitation Learning](https://arxiv.org/abs/2109.08273)

- **Authors / year / venue:** Ryan Hoque et al. · 2021 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Queries human intervention selectively based on risk and novelty.
- **Lineage and relationships:** Develops DAgger toward bounded human effort and safer collection.
- **Major positioning limitation:** Risk/novelty estimators can fail outside training support.
- **Quality/influence signals:** Direct real-robot intervention evidence and open implementation.
- **Metadata and assessment confidence:** High

##### P116. [HIL-SERL: Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning](https://doi.org/10.1126/scirobotics.ads5033)

- **Authors / year / venue:** Jianlan Luo, Charles Xu, Jeffrey Wu, and Sergey Levine · 2025 · Science Robotics
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/rail-berkeley/hil-serl
- **Role / level / preparation:** Modern Core · Advanced · High; focus system design, intervention loop, real-robot evaluations, and ablations
- **Contribution:** Combines demonstrations, sparse rewards, interventions, and sample-efficient RL in a practical real-robot system.
- **Lineage and relationships:** Builds on SERL/RLPD and interactive imitation.
- **Major positioning limitation:** Requires reliable success signals, operator availability, and controlled hardware resets.
- **Quality/influence signals:** Peer-reviewed real-robot study with public code and broad manipulation evidence.
- **Metadata and assessment confidence:** High

### D. Data, evaluation, and research systems

#### D1. Robot-data collection, teleoperation, and dataset construction

##### P117. [RoboNet: Large-Scale Multi-Robot Learning](https://arxiv.org/abs/1910.11215)

- **Authors / year / venue:** Sudeep Dasari et al. · 2019 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Introduces a multi-institution, multi-robot dataset and cross-platform predictive learning.
- **Lineage and relationships:** Early open data-scaling and embodiment-diversity effort.
- **Major positioning limitation:** Heterogeneous quality and limited action semantics compared with newer datasets.
- **Quality/influence signals:** Historically important open robot-data initiative.
- **Metadata and assessment confidence:** High

##### P118. [BridgeData V2: A Dataset for Robot Learning at Scale](https://arxiv.org/abs/2308.12952)

- **Authors / year / venue:** Homer Walke et al. · 2023 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://rail-berkeley.github.io/bridgedata/
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Provides a large, diverse, language-labeled manipulation dataset collected across environments.
- **Lineage and relationships:** Major precursor and component of Open X-Embodiment.
- **Major positioning limitation:** Concentrated embodiment and data-collection protocol; quality variation remains.
- **Quality/influence signals:** Widely used open dataset with code/tools.
- **Metadata and assessment confidence:** High

##### P119. [Open X-Embodiment: Robotic Learning Datasets and RT-X Models](https://arxiv.org/abs/2310.08864)

- **Authors / year / venue:** Open X-Embodiment Collaboration · 2024 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://robotics-transformer-x.github.io/
- **Role / level / preparation:** Seminal; Modern Core · Advanced · High
- **Contribution:** Standardizes and mixes many robot datasets across embodiments and trains RT-X policies.
- **Lineage and relationships:** Central data foundation for modern cross-embodiment policy research.
- **Major positioning limitation:** Action/observation heterogeneity, inconsistent labels, and benchmark leakage complicate conclusions.
- **Quality/influence signals:** Large international collaboration; open dataset mixture and models.
- **Metadata and assessment confidence:** High

##### P120. [DROID: A Large-Scale In-the-Wild Robot Manipulation Dataset](https://arxiv.org/abs/2403.12945)

- **Authors / year / venue:** Arjun Khazatsky et al. · 2024 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://droid-dataset.github.io/
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Collects diverse real-world manipulation data across many institutions, scenes, operators, and tasks.
- **Lineage and relationships:** Extends Bridge/OXE toward decentralized in-the-wild collection.
- **Major positioning limitation:** Single primary robot setup and teleoperation style; language/action quality vary.
- **Quality/influence signals:** Large open dataset and active benchmark ecosystem.
- **Metadata and assessment confidence:** High

##### P121. [Mobile ALOHA: Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation](https://arxiv.org/abs/2401.02117)

- **Authors / year / venue:** Zipeng Fu et al. · 2024 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://mobile-aloha.github.io/
- **Role / level / preparation:** Modern Core; Bridge · Intermediate · Medium
- **Contribution:** Extends low-cost ALOHA teleoperation and ACT to mobile bimanual whole-body tasks.
- **Lineage and relationships:** Connects hardware, data collection, and long-horizon imitation.
- **Major positioning limitation:** Platform-specific and demonstration-intensive.
- **Quality/influence signals:** High-impact open hardware/data/policy system.
- **Metadata and assessment confidence:** High

##### P122. [Data Scaling Laws in Imitation Learning for Robotic Manipulation](https://proceedings.iclr.cc/paper_files/paper/2025/hash/88b7b2c896506daabc8d3fd587055167-Abstract-Conference.html)

- **Authors / year / venue:** Fanqi Lin et al. · 2025 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core; Critical · Advanced · High
- **Contribution:** Measures how environments, objects, and demonstrations affect real-world generalization at substantial scale.
- **Lineage and relationships:** Empirical bridge from language-model scaling ideas to robot data design.
- **Major positioning limitation:** Task and platform scope limit universal extrapolation.
- **Quality/influence signals:** Large real-world study with many demonstrations and rollouts; ICLR paper.
- **Metadata and assessment confidence:** High

#### D2. Robot-learning benchmarks, generalization, and failure analysis

##### P123. [RLBench: The Robot Learning Benchmark & Learning Environment](https://arxiv.org/abs/1909.12271)

- **Authors / year / venue:** Stephen James et al. · 2020 · IEEE Robotics and Automation Letters
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/stepjam/RLBench
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Provides a vision-rich manipulation benchmark with many tasks, demonstrations, and standardized interfaces.
- **Lineage and relationships:** Precursor to language-conditioned and generalist simulation evaluation.
- **Major positioning limitation:** Simulation realism, scripted demonstrations, and benchmark overfitting limit external validity.
- **Quality/influence signals:** Widely used open benchmark.
- **Metadata and assessment confidence:** High

##### P124. [CALVIN: A Benchmark for Language-Conditioned Policy Learning for Long-Horizon Robot Manipulation Tasks](https://arxiv.org/abs/2112.03227)

- **Authors / year / venue:** Oier Mees et al. · 2022 · IEEE Robotics and Automation Letters
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/mees/calvin
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Evaluates language-conditioned policies on chained long-horizon manipulation tasks.
- **Lineage and relationships:** Builds on RLBench-style simulation and motivates sequence-level evaluation.
- **Major positioning limitation:** Narrow simulated tabletop domain and fixed task grammar.
- **Quality/influence signals:** Widely used benchmark with open code/data.
- **Metadata and assessment confidence:** High

##### P125. [LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning](https://arxiv.org/abs/2306.03310)

- **Authors / year / venue:** Bo Liu et al. · 2023 · NeurIPS Datasets and Benchmarks
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://libero-project.github.io/
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Introduces suites for transfer, lifelong learning, and language-conditioned manipulation.
- **Lineage and relationships:** Major current VLA/IL benchmark family.
- **Major positioning limitation:** Simulation-only and susceptible to fixed-view/task-template overfitting.
- **Quality/influence signals:** Open benchmark with broad VLA adoption.
- **Metadata and assessment confidence:** High

##### P126. [ManiSkill2: A Unified Benchmark for Generalizable Manipulation Skills](https://arxiv.org/abs/2302.04659)

- **Authors / year / venue:** Jiayuan Gu et al. · 2023 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/haosulab/ManiSkill
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Provides diverse manipulation tasks, demonstrations, visual observations, and scalable simulation.
- **Lineage and relationships:** Supports RL, IL, sim-to-real, and generalization studies.
- **Major positioning limitation:** Benchmark breadth still cannot substitute for physical evaluation.
- **Quality/influence signals:** Open high-throughput benchmark and baselines.
- **Metadata and assessment confidence:** High

##### P127. [SimplerEnv: Simulated Manipulation Policy Evaluation Environments with Real-to-Sim Transfer](https://arxiv.org/abs/2405.05941)

- **Authors / year / venue:** Siddharth Karamcheti et al. · 2024 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/simpler-env/SimplerEnv
- **Role / level / preparation:** Modern Core; Critical · Advanced · High
- **Contribution:** Evaluates real-robot policies in simulation designed to preserve policy ranking and behavior.
- **Lineage and relationships:** Addresses expensive VLA evaluation and sim/real correspondence.
- **Major positioning limitation:** Real-to-sim fidelity and ranking correlation remain embodiment/task dependent.
- **Quality/influence signals:** Open benchmark used by OpenVLA and later policies.
- **Metadata and assessment confidence:** High

##### P128. [RoboArena: Distributed Real-World Evaluation of Generalist Robot Policies](https://proceedings.mlr.press/v305/atreya25a.html)

- **Authors / year / venue:** Pranav Atreya et al. · 2025 · Conference on Robot Learning (CoRL); PMLR 305
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://robo-arena.github.io/
- **Role / level / preparation:** Frontier Bridge; Critical · Advanced · Medium
- **Contribution:** Uses decentralized double-blind pairwise real-robot evaluations across diverse tasks and environments.
- **Lineage and relationships:** Responds to narrow fixed benchmark tasks and scales real-world evaluation diversity.
- **Major positioning limitation:** Community consistency, hardware comparability, and evolving protocols require careful interpretation.
- **Quality/influence signals:** Peer-reviewed CoRL 2025 paper; distributed real-robot benchmark with public project infrastructure.
- **Metadata and assessment confidence:** High

##### P129. [LIBERO-Plus: A Progressive Robustness Benchmark for Vision-Language-Action Models](https://openaccess.thecvf.com/content/CVPR2026/html/Fei_LIBERO-Plus_A_Progressive_Robustness_Benchmark_for_Visual-Language-Action_Models_CVPR_2026_paper.html)

- **Authors / year / venue:** Senyu Fei et al. · 2026 · CVPR
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/sylvestf/LIBERO-plus
- **Role / level / preparation:** Critical; Frontier · Advanced · Medium
- **Contribution:** Stress-tests VLA robustness under controlled perturbations in camera, language, initialization, appearance, and sensing.
- **Lineage and relationships:** Directly challenges high scores on clean LIBERO and belongs after LIBERO.
- **Major positioning limitation:** Simulation-only and very recent; real-world correspondence remains to be established.
- **Quality/influence signals:** CVPR 2026 paper with official benchmark code.
- **Metadata and assessment confidence:** Medium

##### P130. [RobotArena∞: Scalable Robot Benchmarking via Real-to-Sim Translation](https://robotarenainf.github.io/)

- **Authors / year / venue:** Yash Jangir et al. · 2026 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Frontier; Critical · Expert · High
- **Contribution:** Translates real demonstrations into scalable simulated evaluation and combines automated and human judgment.
- **Lineage and relationships:** Extends real-to-sim evaluation beyond fixed hand-built environments.
- **Major positioning limitation:** Translation fidelity and automated scoring can bias conclusions; new benchmark.
- **Quality/influence signals:** ICLR 2026 paper with benchmark and code.
- **Metadata and assessment confidence:** Medium

#### D3. Research systems, experiment infrastructure, and reproducible training

##### P131. [Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems)

- **Authors / year / venue:** D. Sculley et al. · 2015 · NeurIPS
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Entry Point; Critical · Introductory · Low
- **Contribution:** Catalogs data, dependency, configuration, feedback-loop, and monitoring debt in deployed ML systems.
- **Lineage and relationships:** Frames why experiment infrastructure and data lineage are research requirements.
- **Major positioning limitation:** Conceptual/experience paper rather than controlled experimental evidence.
- **Quality/influence signals:** Widely cited systems paper from production ML.
- **Metadata and assessment confidence:** High

##### P132. [ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)

- **Authors / year / venue:** Samyam Rajbhandari et al. · 2020 · SC
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/microsoft/DeepSpeed
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Partitions optimizer, gradient, and parameter states across devices for memory-efficient distributed training.
- **Lineage and relationships:** Important distributed-training lineage for large VLM/VLA reproduction.
- **Major positioning limitation:** Communication and framework complexity; model scale may exceed club needs.
- **Quality/influence signals:** SC paper; production implementation in DeepSpeed.
- **Metadata and assessment confidence:** High

##### P133. [Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism](https://arxiv.org/abs/1909.08053)

- **Authors / year / venue:** Mohammad Shoeybi et al. · 2019 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/NVIDIA/Megatron-LM
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Demonstrates tensor model parallelism for large Transformer training.
- **Lineage and relationships:** Complements data parallelism and ZeRO; useful for systems literacy.
- **Major positioning limitation:** Proprietary-scale assumptions and rapidly evolving implementations.
- **Quality/influence signals:** Influential large-model training system with open code.
- **Metadata and assessment confidence:** High

##### P134. [SERL: A Software Suite for Sample-Efficient Robotic Reinforcement Learning](https://arxiv.org/abs/2401.16013)

- **Authors / year / venue:** Zhiyuan Luo et al. · 2024 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/rail-berkeley/serl
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Packages asynchronous data collection, replay, resets, demonstrations, and actor–learner infrastructure for real-robot RL.
- **Lineage and relationships:** Connects RLPD-style algorithms to reliable physical experimentation.
- **Major positioning limitation:** Hardware/task integration still requires substantial engineering; not a general benchmark.
- **Quality/influence signals:** Open suite with direct real-robot evidence.
- **Metadata and assessment confidence:** High

#### D4. Efficient deployment, latency, compression, and real-time policy execution

##### P135. [Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success](https://www.roboticsproceedings.org/rss21/p017.html)

- **Authors / year / venue:** Moo Jin Kim, Chelsea Finn, and Percy Liang · 2025 · Robotics: Science and Systems (RSS)
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/moojink/openvla-oft
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Improves OpenVLA fine-tuning and action generation for stronger, faster control.
- **Lineage and relationships:** Direct continuation of OpenVLA and bridge to deployable open VLAs.
- **Major positioning limitation:** Results remain benchmark/platform dependent and inherit backbone cost.
- **Quality/influence signals:** Open implementation with strong reported gains.
- **Metadata and assessment confidence:** High

##### P136. [Real-Time Action Chunking with Large Models](https://www.pi.website/research/real_time_chunking)

- **Authors / year / venue:** Physical Intelligence · 2025 · Technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core; Systems · Advanced · Medium
- **Contribution:** Decouples slow model inference from fast control through asynchronous chunk prediction and execution.
- **Lineage and relationships:** Extends ACT/action chunking to high-latency large VLAs.
- **Major positioning limitation:** Closed-system evidence and synchronization assumptions need independent reproduction.
- **Quality/influence signals:** Official technical report with direct real-robot demonstrations.
- **Metadata and assessment confidence:** Medium

##### P137. [SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics](https://arxiv.org/abs/2506.01844)

- **Authors / year / venue:** Mustafa Shukor et al. · 2025 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/huggingface/lerobot
- **Role / level / preparation:** Modern Core; Reproduction Candidate · Intermediate · Medium
- **Contribution:** Presents a compact open VLA with public data, consumer-hardware training, and asynchronous inference.
- **Lineage and relationships:** Open, low-cost counterpart to larger generalist policies; integrates with LeRobot.
- **Major positioning limitation:** Results are narrower than large proprietary models and depend on benchmark/robot-specific fine-tuning.
- **Quality/influence signals:** Open weights, training code, datasets, and affordable hardware ecosystem.
- **Metadata and assessment confidence:** High

##### P138. [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)

- **Authors / year / venue:** Woosuk Kwon et al. · 2023 · SOSP
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/vllm-project/vllm
- **Role / level / preparation:** Optional Specialization · Advanced · Medium
- **Contribution:** Introduces PagedAttention and vLLM for high-throughput memory-efficient autoregressive serving.
- **Lineage and relationships:** Useful for embodied planners/VLMs and shared inference infrastructure.
- **Major positioning limitation:** Robot control adds latency determinism and multimodal preprocessing not addressed here.
- **Quality/influence signals:** SOSP paper; widely deployed open serving stack.
- **Metadata and assessment confidence:** High

#### D5. Synthetic data, learned simulators, and scalable data engines

##### P139. [MimicGen: A Data Generation System for Scalable Robot Learning using Human Demonstrations](https://arxiv.org/abs/2310.17596)

- **Authors / year / venue:** Ajay Mandlekar et al. · 2023 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/NVlabs/mimicgen
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Generates diverse task demonstrations by transforming and recomposing a small set of human demonstrations in simulation.
- **Lineage and relationships:** Scales imitation data while preserving task structure.
- **Major positioning limitation:** Requires object-centric state and simulator access; sim-to-real validity must be tested.
- **Quality/influence signals:** Open system with large generated datasets and broad reuse.
- **Metadata and assessment confidence:** High

##### P140. [RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning via Generative Simulation](https://arxiv.org/abs/2311.01455)

- **Authors / year / venue:** Yuanchen Wang et al. · 2024 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/Genesis-Embodied-AI/RoboGen
- **Role / level / preparation:** Bridge; Frontier · Expert · High
- **Contribution:** Uses generative models and LLMs to propose tasks, assets, environments, and training procedures in simulation.
- **Lineage and relationships:** Extends procedural generation toward autonomous data engines.
- **Major positioning limitation:** Generated tasks/rewards can be invalid or biased; physical transfer is limited.
- **Quality/influence signals:** ICML paper with open project/code.
- **Metadata and assessment confidence:** High

##### P141. [GenSim: Generating Robotic Simulation Tasks via Large Language Models](https://arxiv.org/abs/2310.01361)

- **Authors / year / venue:** Yecheng Jason Ma et al. · 2024 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/liruiw/GenSim
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Generates task code and simulation assets with LLMs and self-refinement.
- **Lineage and relationships:** Task-generation counterpart to MimicGen and RoboGen.
- **Major positioning limitation:** Code generation errors and simulator-task validity require human verification.
- **Quality/influence signals:** Open benchmark/code with systematic generated-task study.
- **Metadata and assessment confidence:** High

##### P142. [DreamGen: Unlocking Generalization in Robot Learning through Neural Trajectories](https://arxiv.org/abs/2505.12705)

- **Authors / year / venue:** Joel Jang et al. · 2025 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://research.nvidia.com/labs/gear/dreamgen/
- **Role / level / preparation:** Frontier Bridge · Expert · High
- **Contribution:** Uses video world models to generate diverse synthetic robot trajectories for policy training.
- **Lineage and relationships:** Connects video generation, data augmentation, and generalist policies.
- **Major positioning limitation:** Synthetic action/physics fidelity and closed-loop benefit require independent validation.
- **Quality/influence signals:** High-profile open project with models/code.
- **Metadata and assessment confidence:** Medium

##### P143. [DreamDojo: A Generalist Robot World Model from Large-Scale Human Videos](https://dreamdojo-world.github.io/)

- **Authors / year / venue:** Shenyuan Gao et al. · 2026 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Trains a generalist robot world model from large-scale human video for prediction, evaluation, and planning.
- **Lineage and relationships:** Extends video world models from synthetic data generation toward interactive robot-world simulation.
- **Major positioning limitation:** Very recent; compute, data, and evaluation independence require scrutiny.
- **Quality/influence signals:** ICML 2026 spotlight; project, paper, and code available.
- **Metadata and assessment confidence:** Medium

### E. Language, multimodality, and embodied reasoning

#### E1. Language-conditioned robotics, grounding, and task planning

##### P144. [Do As I Can, Not As I Say: Grounding Language in Robotic Affordances](https://arxiv.org/abs/2204.01691)

- **Authors / year / venue:** Michael Ahn et al. · 2022 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal; Bridge · Intermediate · Medium
- **Contribution:** Introduces SayCan: combines language-model skill likelihood with learned affordance/value estimates.
- **Lineage and relationships:** Canonical high-level semantic planner plus low-level skills architecture.
- **Major positioning limitation:** Requires a predefined skill library and value functions; language model is not grounded by itself.
- **Quality/influence signals:** Landmark language-grounded robotics system.
- **Metadata and assessment confidence:** High

##### P145. [Code as Policies: Language Model Programs for Embodied Control](https://arxiv.org/abs/2209.07753)

- **Authors / year / venue:** Jacky Liang et al. · 2023 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/google-research/google-research/tree/master/code_as_policies
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Uses code-generating language models to compose perception and control APIs.
- **Lineage and relationships:** Alternative to end-to-end policies; enables explicit structure and tool use.
- **Major positioning limitation:** Execution safety, API coverage, and hallucinated code are major risks.
- **Quality/influence signals:** Highly influential programmatic robotics approach; open examples.
- **Metadata and assessment confidence:** High

##### P146. [Inner Monologue: Embodied Reasoning through Planning with Language Models](https://arxiv.org/abs/2207.05608)

- **Authors / year / venue:** Wenlong Huang et al. · 2022 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Intermediate · Medium
- **Contribution:** Feeds success, scene, and human feedback back into language-model planning loops.
- **Lineage and relationships:** Precursor to memory/tool-using embodied agents.
- **Major positioning limitation:** Relies on external modules and brittle textual state summaries.
- **Quality/influence signals:** Influential closed-loop LLM planning system.
- **Metadata and assessment confidence:** High

##### P147. [PaLM-E: An Embodied Multimodal Language Model](https://arxiv.org/abs/2303.03378)

- **Authors / year / venue:** Danny Driess et al. · 2023 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Injects continuous sensor and visual embeddings into a language model for embodied reasoning and transfer.
- **Lineage and relationships:** Bridge from VLMs to multimodal embodied models; precedes Gemini Robotics.
- **Major positioning limitation:** Large proprietary model/data/compute and mainly high-level outputs.
- **Quality/influence signals:** ICML paper with broad influence despite closed implementation.
- **Metadata and assessment confidence:** High

##### P148. [VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models](https://arxiv.org/abs/2307.05973)

- **Authors / year / venue:** Wenlong Huang et al. · 2023 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/huangwl18/VoxPoser
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Uses language models and open-vocabulary perception to compose 3D value maps for motion planning.
- **Lineage and relationships:** Combines E1 semantic reasoning with P3 geometry and F7 planning.
- **Major positioning limitation:** Depends on reliable perception, generated code, and hand-designed value-map interfaces.
- **Quality/influence signals:** Strong zero-shot manipulation demonstrations; public code.
- **Metadata and assessment confidence:** High

##### P149. [VIMA: General Robot Manipulation with Multimodal Prompts](https://arxiv.org/abs/2210.03094)

- **Authors / year / venue:** Yunfan Jiang et al. · 2023 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/vimalabs/VIMA
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Conditions a Transformer policy on interleaved text and image prompts across diverse manipulation tasks.
- **Lineage and relationships:** Bridge from language-conditioned policy learning to multimodal prompting and steerability.
- **Major positioning limitation:** Simulation benchmark and discrete task structure limit real-world conclusions.
- **Quality/influence signals:** ICML paper with open benchmark/code.
- **Metadata and assessment confidence:** High

#### E2. Vision-language-action models and generalist robot policies

##### P150. [RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818)

- **Authors / year / venue:** Anthony Brohan et al. · 2023 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal; Bridge · Advanced · High
- **Contribution:** Co-trains web-scale vision-language tasks and robot actions represented as tokens.
- **Lineage and relationships:** Establishes the modern VLA framing after RT-1.
- **Major positioning limitation:** Closed models/data and limited reproducibility; tokenized actions and evaluation scope require scrutiny.
- **Quality/influence signals:** Landmark VLA paper with substantial downstream influence.
- **Metadata and assessment confidence:** High

##### P151. [Octo: An Open-Source Generalist Robot Policy](https://arxiv.org/abs/2405.12213)

- **Authors / year / venue:** Octo Model Team et al. · 2024 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/octo-models/octo
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Trains an open generalist policy on heterogeneous Open X data with adaptable observation/action heads.
- **Lineage and relationships:** Open alternative to RT-X and precursor to later open VLA stacks.
- **Major positioning limitation:** Smaller scale and weaker semantics than VLM-backed VLAs; benchmark sensitivity.
- **Quality/influence signals:** Open weights, code, and adaptation recipes.
- **Metadata and assessment confidence:** High

##### P152. [OpenVLA: An Open-Source Vision-Language-Action Model](https://proceedings.mlr.press/v270/kim25c.html)

- **Authors / year / venue:** Moo Jin Kim et al. · 2024/2025 · CoRL 2024; PMLR proceedings 2025
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/openvla/openvla
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Adapts a pretrained VLM into an open 7B action-token policy trained on Open X-Embodiment.
- **Lineage and relationships:** Major reproducible VLA baseline between RT-2 and newer action-expert models.
- **Major positioning limitation:** Large inference cost, discrete actions, and benchmark-specific fine-tuning; data mixture quality matters.
- **Quality/influence signals:** Open model/code; established baseline across VLA studies.
- **Metadata and assessment confidence:** High

##### P153. [π0: A Vision-Language-Action Flow Model for General Robot Control](https://www.pi.website/download/pi0.pdf)

- **Authors / year / venue:** Physical Intelligence et al. · 2024 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/Physical-Intelligence/openpi
- **Role / level / preparation:** Modern Core; Frontier Bridge · Expert · High
- **Contribution:** Adds a continuous flow-matching action expert to a pretrained VLM and trains across multiple embodiments and dexterous tasks.
- **Lineage and relationships:** Connects F4 flow matching, L6 chunked actions, and cross-embodiment pretraining.
- **Major positioning limitation:** Most data and full training stack are proprietary; comparisons occur on internal tasks.
- **Quality/influence signals:** Highly influential architecture; partial open implementation through OpenPI.
- **Metadata and assessment confidence:** Medium

##### P154. [π0.5: A Vision-Language-Action Model with Open-World Generalization](https://proceedings.mlr.press/v305/black25a.html)

- **Authors / year / venue:** Physical Intelligence et al. · 2025 · CoRL
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** https://github.com/Physical-Intelligence/openpi
- **Role / level / preparation:** Modern Core; Frontier · Expert · High
- **Contribution:** Uses heterogeneous co-training and high-level semantic prediction for long-horizon manipulation in unseen homes.
- **Lineage and relationships:** Extends π0 from dexterity toward open-world task generalization.
- **Major positioning limitation:** Private data, internal evaluation, and limited independent reproduction remain major caveats.
- **Quality/influence signals:** CoRL paper with released OpenPI code/model components.
- **Metadata and assessment confidence:** Medium

##### P155. [GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734)

- **Authors / year / venue:** NVIDIA et al. · 2025 · arXiv technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** https://github.com/NVIDIA/Isaac-GR00T
- **Role / level / preparation:** Modern Core; Frontier · Expert · High
- **Contribution:** Combines a vision-language module with a diffusion/flow-style action module for cross-embodiment humanoid control.
- **Lineage and relationships:** Humanoid-focused counterpart to π0 and OpenVLA.
- **Major positioning limitation:** Evaluation, data mixture, and hardware scope are organization-specific; full training reproduction is expensive.
- **Quality/influence signals:** Open weights/code and large industrial research program.
- **Metadata and assessment confidence:** Medium

##### P156. [Gemini Robotics: Bringing AI into the Physical World](https://arxiv.org/abs/2503.20020)

- **Authors / year / venue:** Google DeepMind et al. · 2025 · Technical report
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Frontier; Synthesis · Expert · High
- **Contribution:** Presents a Gemini-derived VLA and separate embodied-reasoning model across multiple robot embodiments.
- **Lineage and relationships:** Strong example of dual-model reasoning-plus-control architecture.
- **Major positioning limitation:** Private preview, proprietary data, and limited independent reproduction.
- **Quality/influence signals:** Official technical report/model cards and broad real-robot demonstrations.
- **Metadata and assessment confidence:** Medium

##### P157. [What Matters in Building Vision–Language–Action Models for Generalist Robots](https://www.nature.com/articles/s42256-025-01168-7)

- **Authors / year / venue:** Xinghang Li et al. · 2026 · Nature Machine Intelligence
- **Authoritative version used:** Published version
- **Official project/code:** https://robovlms.github.io/
- **Role / level / preparation:** Critical; Modern Core · Expert · High
- **Contribution:** Systematically studies VLM backbone, policy architecture, and cross-embodiment data across hundreds of experiments.
- **Lineage and relationships:** Important corrective to single-model showcase papers; directly informs architecture selection.
- **Major positioning limitation:** Results remain tied to selected backbones, tasks, and training recipes.
- **Quality/influence signals:** Peer-reviewed 2026 study with open RoboVLMs framework.
- **Metadata and assessment confidence:** Medium

#### E3. Embodied memory, agentic control, self-improvement, and world-action models

##### P158. [MEM: Multi-Scale Embodied Memory for Vision Language Action Models](https://arxiv.org/abs/2603.03596)

- **Authors / year / venue:** Marcel Torne et al. · 2026 · arXiv preprint
- **Authoritative version used:** Latest arXiv paper version at cutoff
- **Official project/code:** https://www.pi.website/research/memory
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Introduces Multi-scale Embodied Memory with compressed video history and textual long-term memory for tasks lasting many minutes.
- **Lineage and relationships:** Extends π0.6/π0.5 toward partial observability, adaptation, and long-horizon execution.
- **Major positioning limitation:** Private data/model and very recent evidence; memory summaries can introduce causal confusion.
- **Quality/influence signals:** ArXiv paper and official project with quantitative ablations and real-robot demonstrations.
- **Metadata and assessment confidence:** High metadata; Medium assessment

##### P159. [π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](https://arxiv.org/abs/2604.15483)

- **Authors / year / venue:** Physical Intelligence / Bo Ai et al. · 2026 · arXiv preprint
- **Authoritative version used:** Latest arXiv paper version at cutoff
- **Official project/code:** https://www.pi.website/blog/pi07
- **Role / level / preparation:** Frontier · Expert · High; inspect paper, data/conditioning design, evaluation protocol, and omitted details
- **Contribution:** Combines heterogeneous robot, human, and autonomous data with multimodal conditioning and visual subgoals to improve steerability and compositional generalization.
- **Lineage and relationships:** Builds on π0/π0.5, memory, and RL-specialist distillation.
- **Major positioning limitation:** Company-authored arXiv paper; model, training data, and full independent reproduction are unavailable.
- **Quality/influence signals:** High-current-interest system; broad demonstrations but no independent validation yet.
- **Metadata and assessment confidence:** High metadata; Medium assessment

##### P160. [Vesta: A Generalist Embodied Reasoning Model](https://arxiv.org/abs/2606.20905)

- **Authors / year / venue:** Johan Bjorck et al. · 2026 · arXiv preprint / NVIDIA technical report
- **Authoritative version used:** Latest arXiv paper version at cutoff
- **Official project/code:** https://research.nvidia.com/labs/gear/vesta/
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Combines explicit observation–progress–reasoning–action memory with a low-level robot actor.
- **Lineage and relationships:** Planner-above-VLA alternative to end-to-end memory models.
- **Major positioning limitation:** Very recent company-authored work; training data, model weights, and independent reproduction remain limited.
- **Quality/influence signals:** ArXiv paper and official project with benchmark, navigation, and real-robot experiments.
- **Metadata and assessment confidence:** High metadata; Medium assessment

##### P161. [RoboTTT: Context Scaling for Robot Policies](https://arxiv.org/abs/2607.15275)

- **Authors / year / venue:** Yunfan Jiang et al. · 2026 · arXiv preprint
- **Authoritative version used:** Latest arXiv paper version at cutoff
- **Official project/code:** https://research.nvidia.com/labs/gear/robottt/
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Scales policy context to 8K timesteps with test-time training and fast weights, enabling in-context imitation, adaptation, perturbation robustness, and long-horizon execution.
- **Lineage and relationships:** Connects recurrent fast-weight memory, test-time training, long-context sequence modeling, and VLA policies.
- **Major positioning limitation:** Very recent and not independently reproduced; training cost, stability, memory failure modes, and deployment overhead require audit.
- **Quality/influence signals:** Official project with controlled comparisons to GR00T baselines.
- **Metadata and assessment confidence:** High metadata; Medium assessment

##### P162. [ENPIRE: Agentic Robot Policy Self-Improvement in the Real World](https://arxiv.org/abs/2606.19980)

- **Authors / year / venue:** Wenli Xiao et al. · 2026 · arXiv preprint
- **Authoritative version used:** Latest arXiv paper version at cutoff
- **Official project/code:** https://research.nvidia.com/labs/gear/enpire/
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Builds an agentic loop for autonomous policy improvement and real-world data acquisition.
- **Lineage and relationships:** Links offline-to-online RL, reward/success models, and E2 policies.
- **Major positioning limitation:** Very recent; safety, human oversight, and reproducibility are unresolved.
- **Quality/influence signals:** Official NVIDIA GEAR project/paper.
- **Metadata and assessment confidence:** High metadata; Low-to-Medium assessment

### F. Specialization branches

#### S1. Manipulation, grasping, contact, and bimanual control

##### P163. [Dex-Net 2.0: Deep Learning to Plan Robust Grasps with Synthetic Point Clouds and Analytic Grasp Metrics](https://arxiv.org/abs/1703.09312)

- **Authors / year / venue:** Jeff Mahler et al. · 2017 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Modern Core · Advanced · High
- **Contribution:** Combines analytic grasp metrics, synthetic depth data, and deep grasp scoring.
- **Lineage and relationships:** Foundation for data-driven parallel-jaw grasp planning.
- **Major positioning limitation:** Relies on simplified gripper/contact models and object assumptions.
- **Quality/influence signals:** Landmark grasping system with open datasets/code.
- **Metadata and assessment confidence:** High

##### P164. [Transporter Networks: Rearranging the Visual World for Robotic Manipulation](https://arxiv.org/abs/2010.14406)

- **Authors / year / venue:** Andy Zeng et al. · 2021 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/google-research/ravens
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Models pick-and-place as spatial feature transport with strong translational equivariance.
- **Lineage and relationships:** Precursor to CLIPort and structured visuomotor policies.
- **Major positioning limitation:** Best suited to top-down planar manipulation and discrete pick/place actions.
- **Quality/influence signals:** Highly influential open implementation and benchmark.
- **Metadata and assessment confidence:** High

##### P165. [CLIPort: What and Where Pathways for Robotic Manipulation](https://arxiv.org/abs/2109.12098)

- **Authors / year / venue:** Mohit Shridhar et al. · 2022 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/cliport/cliport
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Combines CLIP semantic features with Transporter spatial features for language-conditioned manipulation.
- **Lineage and relationships:** Bridges P1 representations, E1 language, and structured manipulation.
- **Major positioning limitation:** Primarily planar simulated tasks; inherited CLIP grounding limitations.
- **Quality/influence signals:** Open code/benchmark and broad influence.
- **Metadata and assessment confidence:** High

##### P166. [Perceiver-Actor: A Multi-Task Transformer for Robotic Manipulation](https://arxiv.org/abs/2209.05451)

- **Authors / year / venue:** Mohit Shridhar et al. · 2023 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/peract/peract
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Uses voxelized 3D observations and a Perceiver policy for language-conditioned 6-DoF actions.
- **Lineage and relationships:** Develops CLIPort toward 3D multi-task manipulation.
- **Major positioning limitation:** Voxel resolution and compute cost; simulation-centric evidence.
- **Quality/influence signals:** Strong RLBench results and open implementation.
- **Metadata and assessment confidence:** High

##### P167. [Learning to Manipulate Deformable Objects without Demonstrations](https://arxiv.org/abs/1910.13439)

- **Authors / year / venue:** Yilin Wu, Wilson Yan, Thanard Kurutach, Lerrel Pinto, and Pieter Abbeel · 2020 · Robotics: Science and Systems
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Optional Specialization; Critical · Advanced · High
- **Contribution:** Uses a structured conditional pick–place action space and visual RL to learn cloth and rope manipulation without demonstrations, including sim-to-real transfer.
- **Lineage and relationships:** Early demonstration-free deformable manipulation; bridge from S1 to S5.
- **Major positioning limitation:** Narrow action structure and tasks; learned picking baselines were not uniformly superior, making the failure analysis important.
- **Quality/influence signals:** RSS paper with real-robot transfer and unusually informative negative comparisons.
- **Metadata and assessment confidence:** High

#### S2. Tactile sensing and dexterous manipulation

##### P168. [GelSight: High-Resolution Robot Tactile Sensors for Estimating Geometry and Force](https://doi.org/10.3390/s17020276)

- **Authors / year / venue:** Wenzhen Yuan, Siyuan Dong, and Edward H. Adelson · 2017 · Sensors
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Describes optical tactile sensing that captures detailed contact geometry and force cues.
- **Lineage and relationships:** Hardware foundation for modern visuotactile learning.
- **Major positioning limitation:** Sensor fabrication, calibration, wear, and contact mechanics are significant.
- **Quality/influence signals:** Canonical tactile sensor lineage with extensive reuse.
- **Metadata and assessment confidence:** High

##### P169. [DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor with Application to In-Hand Manipulation](https://arxiv.org/abs/2005.14679)

- **Authors / year / venue:** Mike Lambeta et al. · 2020 · IEEE Robotics and Automation Letters
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/facebookresearch/digit-design
- **Role / level / preparation:** Modern Core · Intermediate · Medium
- **Contribution:** Presents a compact manufacturable optical tactile sensor and manipulation demonstrations.
- **Lineage and relationships:** Accessible successor/complement to GelSight.
- **Major positioning limitation:** Optical artifacts, durability, and sensor-to-sensor variation matter.
- **Quality/influence signals:** Open hardware/design with broad adoption.
- **Metadata and assessment confidence:** High

##### P170. [Learning Dexterous In-Hand Manipulation](https://arxiv.org/abs/1808.00177)

- **Authors / year / venue:** OpenAI et al. · 2018 · IJRR
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal; Bridge · Expert · High
- **Contribution:** Uses large-scale simulation, domain randomization, and recurrent policies for dexterous hand manipulation.
- **Lineage and relationships:** Links L7 sim-to-real to dexterous control.
- **Major positioning limitation:** Exceptional compute, custom hardware, and sparse reproducibility.
- **Quality/influence signals:** Landmark real-world dexterous RL result.
- **Metadata and assessment confidence:** High

##### P171. [T-Rex: Tactile-Reactive Dexterous Manipulation](https://arxiv.org/abs/2606.17055)

- **Authors / year / venue:** Dantong Niu et al. · 2026 · arXiv preprint
- **Authoritative version used:** Latest public technical report or arXiv version at cutoff
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Uses tactile feedback for reactive dexterous manipulation under contact and perturbation.
- **Lineage and relationships:** Modern frontier connecting optical tactile sensing to generalist dexterity.
- **Major positioning limitation:** Very recent and specialized hardware/data; independent evidence pending.
- **Quality/influence signals:** Official project/code/dataset announced by NVIDIA GEAR.
- **Metadata and assessment confidence:** Low

#### S3. Legged locomotion and whole-body control

##### P172. [DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills](https://arxiv.org/abs/1804.02717)

- **Authors / year / venue:** Xue Bin Peng et al. · 2018 · ACM Transactions on Graphics / SIGGRAPH
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Modern Core · Advanced · High
- **Contribution:** Combines motion-imitation rewards and task objectives to learn robust physics-based skills.
- **Lineage and relationships:** Foundation for motion-prior humanoid and quadruped control.
- **Major positioning limitation:** Simulation characters and reward engineering; not direct robot transfer.
- **Quality/influence signals:** Landmark motion-imitation paper with public code.
- **Metadata and assessment confidence:** High

##### P173. [Learning Quadrupedal Locomotion over Challenging Terrain](https://www.science.org/doi/10.1126/scirobotics.abc5986)

- **Authors / year / venue:** Joonho Lee et al. · 2020 · Science Robotics
- **Authoritative version used:** Published version
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Uses privileged learning and teacher–student training for robust rough-terrain locomotion.
- **Lineage and relationships:** Develops sim-to-real locomotion beyond flat-ground randomization.
- **Major positioning limitation:** Specialized platform and extensive engineering; terrain coverage remains bounded.
- **Quality/influence signals:** Strong real-robot evidence and major influence.
- **Metadata and assessment confidence:** High

##### P174. [Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions](https://arxiv.org/abs/2104.02180)

- **Authors / year / venue:** Xue Bin Peng et al. · 2021 · SIGGRAPH
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Learns motion style priors adversarially from reference data while optimizing task objectives.
- **Lineage and relationships:** Successor to DeepMimic with less hand-designed imitation reward.
- **Major positioning limitation:** Reference data quality and adversarial training stability matter.
- **Quality/influence signals:** Widely used humanoid-control method with open implementation.
- **Metadata and assessment confidence:** High

##### P175. [Walk These Ways: Tuning Robot Control for Generalization with Multiplicity of Behavior](https://arxiv.org/abs/2212.03238)

- **Authors / year / venue:** Gabriel B. Margolis and Pulkit Agrawal · 2023 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/Improbable-AI/walk-these-ways
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Conditions locomotion policies on interpretable behavior parameters for versatile deployment.
- **Lineage and relationships:** Connects skill conditioning and practical quadruped control.
- **Major positioning limitation:** Limited to locomotion and specific hardware/simulation assumptions.
- **Quality/influence signals:** Strong open real-robot system.
- **Metadata and assessment confidence:** High

##### P176. [SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control](https://research.nvidia.com/labs/dair/publication/sonic2026/)

- **Authors / year / venue:** Zhengyi Luo et al. · 2026 · Science Robotics (preprint first released 2025)
- **Authoritative version used:** Version of record / official journal publication; arXiv:2511.07820 retained as preprint
- **Official project/code:** https://research.nvidia.com/labs/dair/publication/sonic2026/
- **Role / level / preparation:** Frontier · Expert · High
- **Contribution:** Scales motion tracking data and models for natural humanoid whole-body control.
- **Lineage and relationships:** Modern frontier after DeepMimic/AMP for humanoids.
- **Major positioning limitation:** Specialized hardware and large-scale motion data constrain independent reproduction; external validation remains limited.
- **Quality/influence signals:** Science Robotics publication with official project and code links; high current relevance.
- **Metadata and assessment confidence:** Medium

#### S4. Navigation and embodied agents

##### P177. [Cognitive Mapping and Planning for Visual Navigation](https://arxiv.org/abs/1702.03920)

- **Authors / year / venue:** Saurabh Gupta et al. · 2017 · CVPR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Bridge · Advanced · High
- **Contribution:** Learns spatial maps and planning policies from visual observations.
- **Lineage and relationships:** Bridge from classical mapping to learned navigation.
- **Major positioning limitation:** Simulation/domain assumptions and supervised map structure.
- **Quality/influence signals:** Influential learned mapping/planning paper.
- **Metadata and assessment confidence:** High

##### P178. [Habitat: A Platform for Embodied AI Research](https://arxiv.org/abs/1904.01201)

- **Authors / year / venue:** Manolis Savva et al. · 2019 · ICCV
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/facebookresearch/habitat-sim
- **Role / level / preparation:** Foundation · Intermediate · Medium
- **Contribution:** Introduces a high-throughput photorealistic simulation platform for embodied navigation.
- **Lineage and relationships:** Infrastructure foundation for modern navigation benchmarks.
- **Major positioning limitation:** Static scanned environments and simulator bias limit transfer.
- **Quality/influence signals:** Widely used open platform and benchmark ecosystem.
- **Metadata and assessment confidence:** High

##### P179. [Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments](https://arxiv.org/abs/1711.07280)

- **Authors / year / venue:** Peter Anderson et al. · 2018 · CVPR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Seminal · Intermediate · Medium
- **Contribution:** Introduces the Room-to-Room benchmark for instruction-following navigation in scanned environments.
- **Lineage and relationships:** Foundation for VLN and language-grounded embodied agents.
- **Major positioning limitation:** Discrete graph navigation, dataset biases, and limited physical interaction.
- **Quality/influence signals:** Canonical VLN benchmark and task.
- **Metadata and assessment confidence:** High

##### P180. [Active Neural SLAM](https://arxiv.org/abs/2004.05155)

- **Authors / year / venue:** Devendra Singh Chaplot et al. · 2020 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Combines learned perception/exploration with explicit mapping and planning for navigation.
- **Lineage and relationships:** Hybrid classical-learned architecture relevant to embodied agents.
- **Major positioning limitation:** Simulation-heavy and dependent on map/action abstractions.
- **Quality/influence signals:** Strong benchmark result with open code.
- **Metadata and assessment confidence:** High

#### S5. Deformable objects, learned physics, and graph models

##### P181. [Interaction Networks for Learning about Objects, Relations and Physics](https://arxiv.org/abs/1612.00222)

- **Authors / year / venue:** Peter Battaglia et al. · 2016 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Seminal · Advanced · High
- **Contribution:** Introduces object–relation message passing for learned physical reasoning.
- **Lineage and relationships:** Foundation for graph-network simulators and object-centric world models.
- **Major positioning limitation:** Requires object decomposition and struggles with perception from raw observations.
- **Quality/influence signals:** Seminal learned-physics paper.
- **Metadata and assessment confidence:** High

##### P182. [Learning to Simulate Complex Physics with Graph Networks](https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html)

- **Authors / year / venue:** Alvaro Sanchez-Gonzalez et al. · 2020 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Expert · High
- **Contribution:** Learns particle-based simulators with message-passing graph networks across complex materials.
- **Lineage and relationships:** Develops Interaction Networks into scalable learned simulation.
- **Major positioning limitation:** Long-rollout error accumulation and particle representation costs remain.
- **Quality/influence signals:** Influential open learned-simulator framework.
- **Metadata and assessment confidence:** High

##### P183. [SoftGym: Benchmarking Deep Reinforcement Learning for Deformable Object Manipulation](https://arxiv.org/abs/2011.07215)

- **Authors / year / venue:** Xingyu Lin et al. · 2020 · CoRL
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/Xingyu-Lin/softgym
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Provides simulation tasks and benchmarks for cloth, rope, and fluid manipulation.
- **Lineage and relationships:** Connects deformable physics to RL/IL evaluation.
- **Major positioning limitation:** Simulation fidelity and benchmark task design limit real transfer.
- **Quality/influence signals:** Open benchmark with broad follow-up use.
- **Metadata and assessment confidence:** High

##### P184. [DiffTaichi: Differentiable Programming for Physical Simulation](https://arxiv.org/abs/1910.00935)

- **Authors / year / venue:** Yuanming Hu et al. · 2020 · ICLR
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** https://github.com/taichi-dev/difftaichi
- **Role / level / preparation:** Bridge to S7 · Expert · High
- **Contribution:** Presents differentiable high-performance physical simulation for gradient-based control and design.
- **Lineage and relationships:** Connects learned physics, system identification, and co-design.
- **Major positioning limitation:** Differentiability and numerical stability do not eliminate model mismatch; specialized implementation.
- **Quality/influence signals:** ICLR paper with open framework.
- **Metadata and assessment confidence:** High

#### S6. Multi-agent reinforcement learning

##### P185. [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275)

- **Authors / year / venue:** Ryan Lowe et al. · 2017 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · Medium
- **Contribution:** Introduces MADDPG with centralized critics and decentralized actors.
- **Lineage and relationships:** Canonical centralized-training/decentralized-execution baseline.
- **Major positioning limitation:** Known instability and limited scalability; simple benchmarks.
- **Quality/influence signals:** Seminal deep multi-agent RL paper.
- **Metadata and assessment confidence:** High

##### P186. [QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning](https://proceedings.mlr.press/v80/rashid18a.html)

- **Authors / year / venue:** Tabish Rashid et al. · 2018 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Factorizes joint action values under a monotonicity constraint for cooperative agents.
- **Lineage and relationships:** Major value-decomposition lineage after independent Q-learning.
- **Major positioning limitation:** Monotonicity limits representable coordination; benchmark concentration.
- **Quality/influence signals:** Canonical cooperative MARL method.
- **Metadata and assessment confidence:** High

##### P187. [The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games](https://arxiv.org/abs/2103.01955)

- **Authors / year / venue:** Chao Yu et al. · 2022 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core; Critical · Advanced · High
- **Contribution:** Shows a carefully implemented multi-agent PPO baseline can outperform specialized methods.
- **Lineage and relationships:** Corrective empirical study emphasizing implementation and evaluation.
- **Major positioning limitation:** Benchmark suite remains game/simulation centric.
- **Quality/influence signals:** Widely adopted MAPPO baseline with open code.
- **Metadata and assessment confidence:** High

#### S7. Differentiable physics, robot design, and co-optimization

##### P188. [ChainQueen: A Real-Time Differentiable Physical Simulator for Soft Robotics](https://arxiv.org/abs/1810.01054)

- **Authors / year / venue:** Yuanming Hu et al. · 2019 · ICRA
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation; Bridge · Expert · High
- **Contribution:** Introduces differentiable simulation for soft-robot control and design.
- **Lineage and relationships:** Precursor to DiffTaichi and differentiable co-design.
- **Major positioning limitation:** Soft-body model scope and sim-to-real mismatch.
- **Quality/influence signals:** Influential differentiable-robotics simulator.
- **Metadata and assessment confidence:** High

##### P189. [Learning to Design and Construct Structures in Simulated Environments](https://arxiv.org/abs/2007.06011)

- **Authors / year / venue:** Allan Zhou et al. · 2020 · ICML
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Optional · Expert · High
- **Contribution:** Jointly learns construction strategies and structural objectives in simulation.
- **Lineage and relationships:** Example of design/control coupling and long-horizon embodied construction.
- **Major positioning limitation:** Simulation/task-specific and not direct robot morphology optimization.
- **Quality/influence signals:** Research bridge to automated physical design.
- **Metadata and assessment confidence:** High

#### S8. Human feedback, shared autonomy, and human–robot interaction

##### P190. [Deep Reinforcement Learning from Human Preferences](https://arxiv.org/abs/1706.03741)

- **Authors / year / venue:** Paul Christiano et al. · 2017 · NeurIPS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Foundation · Advanced · High
- **Contribution:** Learns reward models from pairwise human trajectory preferences and optimizes policies against them.
- **Lineage and relationships:** Foundation for RLHF and embodied reward learning.
- **Major positioning limitation:** Preference burden, reward hacking, and distribution shift remain serious.
- **Quality/influence signals:** Seminal preference-based RL paper.
- **Metadata and assessment confidence:** High

##### P191. [PEBBLE: Feedback-Efficient Interactive Reinforcement Learning via Relabeling Experience and Unsupervised Pre-Training](https://proceedings.mlr.press/v139/lee21i.html)

- **Authors / year / venue:** Kimin Lee, Laura Smith, and Pieter Abbeel · 2021 · ICML
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · High
- **Contribution:** Improves preference-based RL with unsupervised pretraining and relabeling.
- **Lineage and relationships:** Develops human-preference RL toward greater feedback efficiency.
- **Major positioning limitation:** Mostly simulated benchmarks; preference-model exploitation remains.
- **Quality/influence signals:** Strong open baseline for preference learning.
- **Metadata and assessment confidence:** High

##### P192. [Shared Autonomy via Deep Reinforcement Learning](https://arxiv.org/abs/1802.01744)

- **Authors / year / venue:** Siddharth Reddy, Anca Dragan, and Sergey Levine · 2018 · RSS
- **Authoritative version used:** Canonical public paper version linked
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Bridge · Advanced · Medium
- **Contribution:** Learns assistance policies from user input while inferring intended goals.
- **Lineage and relationships:** Connects HRI, intent inference, and policy learning.
- **Major positioning limitation:** Assumes goal sets/training distribution and can over-assist under ambiguity.
- **Quality/influence signals:** Influential learned shared-autonomy system.
- **Metadata and assessment confidence:** High

##### P193. [Learning from Interventions Using Hierarchical Policies for Safe Learning](https://ojs.aaai.org/index.php/AAAI/article/view/6602)

- **Authors / year / venue:** Jing Bi, Vikas Dhiman, Tianyou Xiao, and Chenliang Xu · 2020 · AAAI
- **Authoritative version used:** Version of record / official proceedings
- **Official project/code:** Not identified or not publicly available at the cutoff.
- **Role / level / preparation:** Modern Core · Advanced · Medium
- **Contribution:** Corrects reaction-delay labels and adds hierarchical subgoal prediction to intervention-based learning.
- **Lineage and relationships:** Complements DAgger, ThriftyDAgger, and HIL-SERL.
- **Major positioning limitation:** Evidence is primarily simulated and depends on consistent expert oversight.
- **Quality/influence signals:** Peer-reviewed intervention-learning contribution with clear algorithmic ablations.
- **Metadata and assessment confidence:** High
