# Research Curriculum Construction Rules

1. Produce a structured curriculum, not an explanatory essay.

2. Focus on:
   - defining the research scope;
   - decomposing it into areas, subareas, and topics;
   - selecting the relevant papers;
   - ordering topics and papers into a coherent learning progression.

3. Do not design individual meetings, reading sessions, exercises, supplementary materials, presentation formats, or other operational aspects of running the curriculum.

4. Decompose the complete Intellectual Scope into a clear and sufficiently detailed hierarchy:
   - shared foundations;
   - core research areas;
   - specialized branches;
   - integration and synthesis topics;
   - frontier directions.

5. For each topic, define:
   - its scope and included concepts;
   - prerequisite and related topics;
   - its place in the broader curriculum;
   - the ordered paper sequence.

6. Order topics according to conceptual dependencies and research progression, not purely by publication date.

7. Show the important relationships and intellectual lineages between topics and papers. Do not treat the major research areas as isolated curricula.

8. Use primary research papers as the core material. Select papers that introduced, established, substantially developed, connected, challenged, or currently define an important research direction.

9. Avoid unnecessary duplication and papers that contribute only minor benchmark improvements without meaningful conceptual or methodological value.

10. Include important competing approaches, critical evaluations, replication studies, benchmark critiques, negative results, and failure analyses where they materially affect the understanding of a field.

11. Within each topic, order papers from the most suitable entry point to advanced and frontier work. A typical progression is:
    - entry point;
    - foundational or seminal work;
    - development of the research lineage;
    - modern core methods;
    - advanced and frontier research.

12. Every selected paper must have a clear role in the curriculum. Use one or more concise labels such as:
    - Entry Point;
    - Foundation;
    - Seminal;
    - Bridge;
    - Modern Core;
    - Frontier;
    - Critical;
    - Optional Specialization.

13. For each paper, provide:
    - title, authors, year, and venue;
    - canonical paper link;
    - official project page and code repository, when available;
    - page count for the linked authoritative version;
    - concise description of its contribution;
    - curriculum role and technical level (`Introductory`, `Intermediate`, `Advanced`, or `Expert`);
    - prerequisite topics;
    - relationship to earlier and later work;
    - current relevance;
    - broadly available quality or influence indicators.

14. Assess papers using multiple signals, such as citations, venue, distinctions, code availability, independent reproduction, continued influence, empirical strength, and current relevance. Do not treat any single metric as a definitive quality score. Use the latest available information.[^paper-quality]

15. Briefly note major limitations when they are necessary to position a paper correctly, especially dependencies on proprietary data, exceptional compute, restricted hardware, narrow benchmarks, or limited real-world validation.

16. Treat vision-language-action models and general-purpose robot policies as major synthesis points, not as the sole organizing principle of the curriculum.

17. Verify metadata, links, repositories, publication information, and reported statistics. Do not invent unavailable information; mark uncertainty explicitly.

18. State the literature-search cutoff date and use the newest authoritative paper versions available by that date. By default, use the date on which the literature search for the curriculum is performed.

19. Present the final result as a consistent hierarchy of areas, subareas, topics, and ordered papers, supplemented by:
    - a global dependency map;
    - a final paper index with each paper listed once under its primary topic.

[^paper-quality]: **Fixed Paper Quality Score (0–100):** rate each component from 0 to 10 and calculate
    \[
    Q = 10(0.20S + 0.20E + 0.20M + 0.15I + 0.15R + 0.10T),
    \]
    where:
    - **S** = scientific significance;
    - **E** = strength of evidence;
    - **M** = methodological rigor;
    - **I** = research influence;
    - **R** = current relevance;
    - **T** = transparency and verifiability.

Scoring and reporting:
- use **0** for absent or unsupported, **5** for adequate, and **10** for exceptional; intermediate values are allowed;
- assess influence using age-normalized citations and demonstrated downstream adoption rather than raw citation count alone;
- report the component scores, total score, and source/retrieval date of quantitative statistics;
- if a component cannot be assessed, mark it **N/A** and renormalize the remaining weights;
- treat reproduction feasibility as separate from quality; it does not affect `Q`;
- reduce the score for large compute, proprietary data, specialized hardware, or unavailable code only when they materially weaken the evidence or verifiability.

