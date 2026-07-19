# Topic Timeline Construction Guideline

This guideline converts one topic from the curriculum map produced under `3_research_curriculum_construction_rules.md` into a complete, dependency-aware sequence of potential study sessions. It defines the topic timeline, not the detailed preparation or execution of individual sessions.

## 1. Use the curriculum map as the source

Start from the topic's:

- scope and included concepts;
- execution status;
- prerequisite and related topics;
- paper inventory and paper order;
- supporting materials;
- intellectual lineages;
- role within the wider curriculum.

Do not reopen the curriculum-wide division into topics unless timeline construction reveals a genuine gap, contradiction, obsolete selection, material feasibility problem, or misplaced paper. Record any such issue and the proposed correction in the curriculum map.

## 2. Confirm the topic boundary and target depth

Define:

- what the topic covers and excludes;
- the level of competence the completed timeline should produce;
- its dependencies on shared foundations and other topics;
- the required core endpoint;
- any advanced, specialization, or frontier continuation.

Prioritize completeness and logical progression within the intended depth over a short timeline or a fixed number of sessions. Do not require every advanced or frontier continuation before the topic can be considered operationally complete.

Split a topic only when its parts form genuinely distinct and independently coherent learning tracks.

## 3. Resolve the required foundations

Classify every prerequisite as:

- already covered by the shared core;
- supplied by another topic timeline;
- a topic-local foundation that must be added before it is needed;
- an individual preparation gap that can be handled during per-session planning.

Add topic-local foundation sessions where necessary. Cross-reference shared or external foundations instead of duplicating complete sequences across topics.

Relevant foundations may include mathematics, probability, optimization, machine learning, robotics, control, physical systems, software, or experimental methodology.

## 4. Build the topic dependency map

Arrange the topic's content into a dependency graph covering, where relevant:

- foundational concepts;
- paper lineages and major methodological transitions;
- central methods and competing approaches;
- mathematical and architectural reconstruction;
- implementation and systems considerations;
- evaluation methods and evidence;
- limitations, critical results, and open problems;
- connections to other physical-AI areas;
- modern synthesis and frontier directions.

The dependency map determines the valid timeline order. Publication chronology is secondary unless it is necessary to understand the development of the field.

The dependency map and prerequisite constraints are authoritative. Any table or schedule is a planning view derived from them.

## 5. Convert the topic into a session timeline

Create an ordered sequence in which each potential session addresses one coherent question, mechanism, comparison, or stage of understanding.

Sessions may:

- combine several papers that serve one objective;
- divide a dense or foundational paper across multiple sessions;
- add non-paper sessions for foundations, reconstruction, evaluation, integration, or synthesis;
- use a paper from another topic through a cross-reference rather than duplicate it in the curriculum inventory;
- be marked as required core, advanced continuation, optional specialization, or frontier continuation.

For important topics, the complete timeline should collectively cover the applicable stages of the club's learning model:

**foundations → intellectual and paper lineage → mathematical or architectural reconstruction → implementation or reproduction where useful → controlled evaluation or evidence analysis → system-level interpretation → synthesis and original research directions**

This is a topic-level progression, not a mandatory one-session-per-stage template. Practical work should be included when it materially improves understanding, not merely because an implementation exists.

For every planned session, specify only the information needed at timeline level:

- sequence number and title;
- central question or objective;
- stage or role within the topic;
- status: required core, advanced continuation, optional specialization, or frontier continuation;
- prerequisite concepts or sessions;
- concepts, papers, and supporting materials covered;
- expected capability or understanding after completion;
- relationship to the preceding and following sessions;
- any planned implementation, evaluation, evidence-analysis, or synthesis component;
- enough resumption context to continue after sessions from other topics.

Detailed reading instructions, preparation tasks, meeting structure, note-taking format, and outcome verification are decided separately for each session. They are not prescribed by this guideline.

## 6. Validate completeness and progression

Before finalizing the timeline, verify that:

- every required concept and selected paper is assigned, cross-referenced, or explicitly marked optional, frontier, or deferred;
- every supporting material has a clear role;
- no session depends on knowledge introduced later;
- transitions from foundations to expert material are sufficiently gradual;
- important competing, critical, and evaluation perspectives are represented;
- implementation is not treated as mandatory when reconstruction or analysis is more appropriate;
- the required core reaches the target competence without artificial compression or filler sessions;
- advanced and frontier continuations are separated from the required core;
- the final core sessions integrate the topic and expose unresolved research questions rather than ending at the last selected paper.

## 7. Design for interleaved execution

Each topic timeline may form one vertical progression in the global curriculum table:

- columns represent topics;
- cells contain successive sessions or depth stages within each topic;
- upper cells contain foundations and early-entry material;
- lower cells progress toward advanced, expert, and frontier work.

The global curriculum should generally rotate between topics to preserve breadth and revisit each topic over the long term. The rotation is a planning preference, not a fixed rule.

The next session should be selected on a per-session basis using:

- prerequisite readiness;
- continuity with recent work;
- current research priorities;
- member availability and preparation;
- access to tools, compute, data, and hardware;
- integration-project needs;
- the value of revisiting a topic after time spent elsewhere.

Construct each topic timeline so that it remains coherent under interleaving:

- make dependencies explicit;
- link every session to the previous session in the same topic;
- include enough resumption context to continue after sessions from other topics;
- preserve prerequisite constraints even when they require changing the rotation;
- allow consecutive sessions from one topic when continuity requires it;
- do not shorten, pad, or distort topic timelines merely to make all columns equal in length.

`curriculum_table.md` is a planning and visualization artifact. The dependency map and topic timelines remain authoritative.

## 8. Required output

Produce one `topic_plan_and_session_timeline.md` containing:

1. topic scope and target depth;
2. execution status and completion boundary;
3. dependencies and required foundations;
4. topic concept and dependency map;
5. ordered session timeline;
6. classification of sessions as required core, advanced continuation, optional specialization, or frontier continuation;
7. cross-topic links;
8. coverage and progression check;
9. planned synthesis, frontier questions, and unresolved gaps;
10. revision notes for any proposed change to the master curriculum.

The file should define what the topic timeline contains and why each session occupies its position. It should not prescribe the detailed conduct of the meetings.

After creating or revising the topic timeline, update only the relevant summary entries in `curriculum_table.md`.
