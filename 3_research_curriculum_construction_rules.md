# Research Curriculum Construction Rules

1. Produce a structured curriculum map, paper inventory, supporting-material inventory, and executable prioritization, not an explanatory essay.

2. This stage is responsible for:
   - defining the curriculum-wide research scope;
   - decomposing it into areas, subareas, and topics;
   - selecting and verifying the relevant papers;
   - identifying supporting materials where primary papers are not the best entry point;
   - establishing conceptual dependencies and ordered paper sequences;
   - distinguishing the complete knowledge map from the currently executable curriculum.

   Its output is the source material for topic-level timeline planning.

3. Do not design individual sessions, reading procedures, exercises, presentation formats, meeting agendas, or other operational aspects of running the curriculum.

4. Decompose the complete Intellectual Scope defined in `2_research_curriculum_goal.md` into a clear and sufficiently detailed hierarchy:
   - shared foundations;
   - core research areas;
   - specialized branches;
   - integration and synthesis topics;
   - frontier directions.

5. Assign every topic an execution status:
   - Shared Core;
   - Active Research Track;
   - Specialization;
   - Optional;
   - Frontier Watchlist;
   - Deferred.

   The complete knowledge map may be broader than the set of topics currently scheduled for execution.

6. For each topic, define:
   - its scope and included concepts;
   - its primary area and important cross-area relationships;
   - prerequisite and related topics;
   - its place in the broader curriculum;
   - its execution status;
   - the ordered paper sequence;
   - any supporting materials required to make the paper sequence accessible.

7. Order topics according to conceptual dependencies and research progression, not purely by publication date.

8. Show the important relationships and intellectual lineages between topics and papers. Do not treat the major research areas as isolated curricula.

9. Use primary research papers as the core material. Select papers that introduced, established, substantially developed, connected, challenged, or currently define an important research direction.

10. Use supporting materials when they provide a better foundation or reconstruction path than a research paper. Supporting materials may include textbook chapters, lecture notes, technical reports, surveys, documentation, or verified derivations. Keep them in a separate supporting-material inventory rather than presenting them as primary research papers.

11. Avoid unnecessary duplication and papers that contribute only minor benchmark improvements without meaningful conceptual, methodological, empirical, or critical value.

12. Include important competing approaches, critical evaluations, replication studies, benchmark critiques, negative results, and failure analyses where they materially affect the understanding of a field.

13. Within each topic, order papers from the most suitable entry point to advanced and frontier work. A typical progression is:
    - entry point;
    - foundational or seminal work;
    - development of the research lineage;
    - modern core methods;
    - advanced and frontier research.

14. Every selected paper must have a clear role in the curriculum. Use one or more concise labels such as:
    - Entry Point;
    - Foundation;
    - Seminal;
    - Bridge;
    - Modern Core;
    - Frontier;
    - Critical;
    - Optional Specialization.

15. For each paper, provide:
    - title, authors, year, and venue;
    - canonical paper link;
    - the authoritative version used;
    - official project page and code repository, when available;
    - page count when it is unambiguous and useful;
    - required or most relevant sections and an approximate preparation burden when this is more informative than page count;
    - concise description of its contribution;
    - curriculum role and technical level (`Introductory`, `Intermediate`, `Advanced`, or `Expert`);
    - prerequisite topics;
    - relationship to earlier and later work;
    - current relevance;
    - broadly available quality or influence indicators;
    - confidence in the metadata and assessment.

16. Assess papers using multiple signals, such as citations, venue, distinctions, code availability, independent reproduction, continued influence, empirical strength, methodological rigor, transparency, and current relevance. Do not treat any single metric or aggregate score as a definitive quality measure. Use the latest available information.[^paper-assessment]

17. Briefly note major limitations when they are necessary to position a paper correctly, especially dependencies on proprietary data, exceptional compute, restricted hardware, narrow benchmarks, unavailable implementation details, or limited real-world validation.

18. Treat vision-language-action models and general-purpose robot policies as major synthesis points, not as the sole organizing principle of the curriculum.

19. Verify metadata, links, repositories, publication information, and reported statistics. Do not invent unavailable information; mark uncertainty explicitly.

20. State the literature-search cutoff date and use the newest authoritative paper versions available by that date. By default, use the date on which the literature search for the curriculum is performed.

21. Present the final result as:
    - a consistent hierarchy of areas, subareas, and topics;
    - a global topic-dependency map;
    - an execution status for every topic;
    - an ordered paper sequence for every topic;
    - a complete paper index in which each paper appears once under its primary topic and may be cross-referenced elsewhere;
    - a separate supporting-material index;
    - a frontier watchlist containing material that should be monitored but has not yet been integrated into the durable curriculum;
    - a distinction between the complete knowledge map and the currently executable curriculum.

22. The ordering produced at this stage represents conceptual and literature progression, not a fixed schedule of study sessions. Topic-level session timelines are constructed separately under `4_topic_planning_guideline.md`.

23. Revisions originating from topic planning or completed sessions should update the master curriculum only when they reveal:
    - a missing prerequisite;
    - an incorrect topic boundary;
    - a misplaced or obsolete paper;
    - a duplicated sequence;
    - a material feasibility constraint;
    - a newly established research direction that changes the durable curriculum.

    Record the reason and date of each material revision.

[^paper-assessment]: **Paper Assessment Profile and Optional Quality Score**

    Assess each component from 0 to 10:

    - **S** = scientific significance;
    - **E** = strength of evidence;
    - **M** = methodological rigor;
    - **I** = research influence;
    - **R** = current relevance;
    - **T** = transparency and verifiability.

    When a numerical summary is useful, the following optional score may be reported:

    \[
    Q = 10(0.20S + 0.20E + 0.20M + 0.15I + 0.15R + 0.10T).
    \]

    Scoring and reporting:

    - use **0** for absent or unsupported, **5** for adequate, and **10** for exceptional; intermediate values are allowed;
    - report the component scores, not only the total;
    - assess influence using age-normalized citations and demonstrated downstream adoption rather than raw citation count alone;
    - report the source and retrieval date of quantitative statistics;
    - if a component cannot be assessed, mark it **N/A** and state that the resulting score is not directly comparable with fully assessed papers;
    - treat reproduction feasibility as separate from quality; it does not affect `Q`;
    - reduce the score for large compute, proprietary data, specialized hardware, or unavailable code only when they materially weaken the evidence or verifiability;
    - report assessment confidence as `Low`, `Medium`, or `High`;
    - do not use `Q` as an automatic inclusion threshold, ordering rule, or replacement for the paper's assigned curricular role;
    - compare papers primarily within similar roles and maturity levels. A seminal paper, a modern empirical paper, and a critical replication may all be essential for different reasons even when their numerical profiles differ.
