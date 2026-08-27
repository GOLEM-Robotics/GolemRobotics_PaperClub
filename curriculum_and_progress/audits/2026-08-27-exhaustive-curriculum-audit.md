# Exhaustive curriculum audit — 27 August 2026

## Decision

The curriculum is structurally consistent and source-audited after the corrections recorded below. The active dataset contains 37 topics, 400 stable sessions, 192 primary papers, 41 supporting resources, 12 frontier records, and 255 typed relationships.

One former paper identity, P189, is quarantined. It is excluded from the active paper inventory and from completion credit until a human verifies the intended work.

## Evidence

- [Machine-readable item-by-item source audit](2026-08-27-source-audit.json) — SHA-256 `10ae91e48d866f79386deb0dc24a6b9b39421fc23c4678fe0958a5fd98ed7973`
- Audited snapshot: 193 then-active papers, 41 resources, and 17 then-listed frontier records; 251 records in total.
- Audit result before correction: 135 passed and 116 required correction or lifecycle clarification.
- Relationship review: every topic boundary, every session-level cross-topic prerequisite, and every registered relationship was reconciled against the topic plans.

The JSON artifact records the pre-correction state and therefore intentionally retains `needs_correction` findings. This document records their disposition; the current Markdown and generated projection are the final state.

## Corrections applied

- Applied 89 exact metadata, version-of-record, title, author, venue, project, code, or link corrections across 59 audit items.
- Propagated 16 identity or URL corrections into their owning topic timelines and synchronized map/table labels.
- Reclassified OpenAI Spinning Up as maintenance/legacy implementation guidance and Orbit as superseded historical lineage; pinned the ROS 2 real-time resource to Lyrical.
- Added dated evidence and review state to every remaining frontier record.
- Corrected W002 to its canonical title, with DreamZero retained as an alias in the maturity note.
- Resolved the P158–P162 lifecycle conflict by retaining them as E3 Frontier Continuation papers and removing their duplicate watchlist records.
- Confirmed P047 as the Burns et al. robust-manipulation representation study using its PMLR record and supporting primary-source evidence.
- Quarantined P189 after its former arXiv URL was proven to resolve to an unrelated paper. No speculative Chang–Cheng substitution was made. Stable session `SES-754CB39B-1D46-544E-959D-89F4E1F5DAD3` remains as a no-credit identity-resolution gate so existing workspace references can migrate safely.

## Semantic and relationship review

The review replaced overloaded dependency semantics with four explicit relationship types: hard prerequisite, recommended background, related, and feedback. Relationships record scope, rationale, evidence, confidence, and stable target-session IDs where applicable.

The initial reviewed registry contained 139 relationships. A second pass found 123 explicit cross-topic prerequisite declarations in 55 sessions that did not yet have effective hard gates. All were reconciled without creating a hard-prerequisite cycle. The final registry contains:

| Type | Records | Blocking |
|---|---:|---:|
| Hard prerequisite | 187 | Yes |
| Recommended background | 50 | No |
| Related | 16 | No |
| Feedback | 2 | No |
| **Total** | **255** |  |

E2 → D4 remains a hard dependency, while D4 → E2 is represented as non-blocking feedback. Topic-entry gates and target-session gates are evaluated independently.

## Data-contract result

The final validators establish that:

- the five reviewed framework documents are byte-identical to their protected hashes;
- all canonical identifiers are unique and match the published identity locks;
- session aliases resolve to stable UUID-based identities and transitions remain ordered;
- Required Core is an exact prefix and optional/frontier work is opt-in;
- primary-paper ownership is unique and every active paper is scheduled;
- resource placement agrees between the central index and topic plans;
- raw cross-topic prerequisites have effective typed hard gates;
- hard prerequisites are acyclic;
- the curriculum map, table, topic plans, and generated JSON agree;
- the generated source revision is deterministic.

## Limits and review horizon

This was an identity, metadata, placement, lifecycle, link, and curriculum-coherence audit. It was not a claim-by-claim reproduction of every paywalled paper. Repository availability establishes implementation provenance, not scientific validity. Recent frontier work remains explicitly uncertain until stronger venue, reproduction, failure-analysis, or transfer evidence appears.

External sources can change after the checked date. The rotating maintenance workflow continues link and frontier review approximately every two days and opens proposals rather than silently changing canonical records. The next default frontier review is 22 October 2026.
