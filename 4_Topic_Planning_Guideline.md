# Topic Timeline Construction Guideline

This guideline converts one topic from the curriculum map produced under `3_research_curriculum_construction_rules.md` into a complete, dependency-aware sequence of study sessions. It defines the topic timeline, not the detailed preparation or execution of individual sessions.

## 1. Use the curriculum map as the source

Start from the topic's:

- scope and included concepts;
- prerequisite and related topics;
- paper inventory and paper order;
- intellectual lineages;
- role within the wider curriculum.

Do not reopen the curriculum-wide division into topics unless timeline construction reveals a genuine gap, contradiction, or misplaced paper. Record any such issue for correction in the curriculum map.

## 2. Confirm the topic boundary and target depth

Define:

- what the topic covers and excludes;
- the level of competence the completed timeline should produce;
- its dependencies on shared foundations and other topics;
- the advanced, expert, or frontier endpoint of the topic.

Prioritize completeness and logical progression over a short timeline or a fixed number of sessions. Split a topic only when its parts form genuinely distinct and independently coherent learning tracks.

## 3. Resolve the required foundations

Classify every prerequisite as:

- already covered by the shared core;
- supplied by another topic timeline;
- a topic-local foundation that must be added before it is needed.

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

The dependency map determines the timeline order. Publication chronology is secondary unless it is necessary to understand the development of the field.

## 5. Convert the topic into a session timeline

Create an ordered sequence in which each session addresses one coherent question, mechanism, comparison, or stage of understanding.

Sessions may:

- combine several papers that serve one objective;
- divide a dense or foundational paper across multiple sessions;
- add non-paper sessions for foundations, reconstruction, evaluation, integration, or synthesis;
- use a paper from another topic through a cross-reference rather than duplicate it in the curriculum inventory.

For important topics, the complete timeline should collectively cover the applicable stages of the club's learning model:

**foundations → paper lineage → mathematical and architectural reconstruction → implementation or reproduction where useful → controlled evaluation → system-level interpretation → synthesis, frontier questions, or original extension**

This is a topic-level progression, not a mandatory one-session-per-stage template. Practical work should be included when it materially improves understanding, not merely because an implementation exists.

For every planned session, specify only the information needed at timeline level:

- sequence number and title;
- central question or objective;
- stage or role within the topic;
- prerequisite concepts or sessions;
- concepts and papers covered;
- expected capability or understanding after completion;
- relationship to the preceding and following sessions;
- any planned implementation, evaluation, or synthesis component.

Detailed reading instructions, preparation, meeting structure, note-taking, and outcome verification belong to `Individual_Session_Guideline.md`.

## 6. Validate completeness and progression

Before finalizing the timeline, verify that:

- every required concept and selected paper is assigned, cross-referenced, or explicitly marked optional or deferred;
- no session depends on knowledge introduced later;
- transitions from foundations to expert material are sufficiently gradual;
- important competing, critical, and evaluation perspectives are represented;
- implementation is not treated as mandatory when reconstruction or analysis is more appropriate;
- the timeline reaches the target depth without artificial compression or filler sessions;
- the final sessions integrate the topic and expose unresolved research questions rather than ending at the last selected paper.

## 7. Design for interleaved execution

Each topic timeline will later form one vertical progression in the global curriculum table:

- columns represent topics;
- rows represent successive depth levels or sessions within each topic;
- the upper cells contain foundations and early-entry material;
- lower cells progress toward advanced, expert, and frontier work.

The global schedule proceeds across a row from left to right, changing topic each week, and then continues with the next row. This repeated rotation is intended to revisit each topic over the long term rather than complete one topic before starting another.

Construct each topic timeline so that it remains coherent under this interleaving:

- make dependencies explicit;
- link every session to the previous session in the same topic;
- include enough resumption context to continue after sessions from other topics;
- preserve prerequisite constraints even when they require adjusting the otherwise regular rotation;
- do not shorten, pad, or distort topic timelines merely to make all columns equal in length.

## 8. Required output

Produce one `topic_plan_and_session_timeline.md` containing:

1. topic scope and target depth;
2. dependencies and required foundations;
3. topic concept and dependency map;
4. ordered session timeline;
5. cross-topic links;
6. coverage and progression check;
7. planned synthesis, frontier questions, and unresolved gaps.

The file should define what the topic timeline contains and why each session occupies its position. It should not prescribe the detailed conduct of the meetings.
