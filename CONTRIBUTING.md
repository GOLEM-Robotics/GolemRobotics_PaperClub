# Contributing

Contributions are welcome when they preserve the separation between club methodology, canonical curriculum, personal workspaces, and generated product data.

## Protected framework

These jointly reviewed files are immutable during ordinary curriculum, application, and maintenance work:

- `1_operating_principles.md`
- `2_research_curriculum_goal.md`
- `3_research_curriculum_construction_rules.md`
- `4_topic_planning_guideline.md`
- `5_repo_structure.md`

The test suite checks their exact bytes. Do not update their checksums to make an incidental change pass. A framework revision requires explicit club approval and should be isolated from implementation changes.

## Choose the correct change class

| Change | Authoritative location | Review expectation |
|---|---|---|
| Personal note, progress, order, or addition | Browser workspace / exported bundle | No repository change |
| Club execution artifact | The relevant published session/project directory | Pull request |
| Metadata or link correction | Canonical index plus affected topic projections | Evidence-backed pull request |
| Curriculum structure or relationship | Topic plans, map/table, and relationship registry | Rationale, impact analysis, pull request |
| Framework revision | Numbered root documents | Explicit club decision |

Maintenance reports are evidence and proposals. They are not authority to rewrite curriculum content automatically.

## Curriculum data rules

- Keep Markdown under `curriculum_and_progress/` authoritative.
- Give every new entity a unique durable ID. Never reuse a retired or quarantined ID.
- Preserve a session's `SES-…` identity when its display order changes; retain prior aliases for bundle migration.
- Keep Required Core as an exact prefix. Optional Specialization and Frontier Continuation must remain explicit opt-ins.
- Assign each primary paper to exactly one topic. Use cross-references rather than duplicate ownership.
- Keep supporting-resource topic assignments bidirectional.
- Encode dependencies in `relationships.md` with a type, scope, rationale, evidence, confidence, and stable target-session IDs when applicable.
- Never encode a cycle in hard prerequisites. Related and feedback edges are non-blocking.
- Quarantine an unverified identity visibly; do not silently substitute a plausible paper.

For a genuinely new session, create a fresh stable UUID:

```bash
python -c 'import uuid; print("SES-" + str(uuid.uuid4()).upper())'
```

Add it to the topic's stable identity registry with its display alias. Existing IDs and aliases must move with their sessions.

## Identity and projection checks

Run these after editing canonical records:

```bash
python -m tools.assign_session_ids
python -m tools.sync_resource_assignments
python -m tools.update_identity_lock
python -m tools.build_curriculum_data
```

If—and only if—a reviewed change intentionally adds, removes, renames, or reassigns a canonical identity, update the identity lock and inspect its diff:

```bash
python -m tools.update_identity_lock --write
git diff -- curriculum_and_progress/canonical_entity_ids.json
```

Commit the regenerated `viewer/assets/data/curriculum_graph.json` with its Markdown inputs. Never hand-edit the generated JSON.

## Application changes

Application source belongs in `viewer/`; deterministic data and maintenance logic belongs in `tools/`; MkDocs integration belongs in `hooks/`.

Keep the static security boundary:

- no repository credentials or secrets in browser code;
- no silent upload of notes, progress, or attachments;
- no analytics without a separate reviewed privacy decision;
- canonical entities can be disabled personally but not deleted by the browser;
- publishing remains an explicit proposal and pull-request action.

## Validation

Every pull request should pass:

```bash
python -m unittest discover -s tests -v
python -m tools.maintenance --validate
mkdocs build --strict
git diff --check
```

For viewer or workspace changes, also run:

```bash
npm ci
python -m http.server 8001 --directory site
```

Then, in another terminal:

```bash
CHROME_PATH=/usr/bin/google-chrome BASE_URL=http://127.0.0.1:8001 npm run test:browser
```

Adjust `CHROME_PATH` if Chrome or Chromium is installed elsewhere.

The browser suite is a product contract, not merely a smoke test. Update an assertion only when a reviewed behavior or inventory change justifies it.

## Pull requests

Keep a pull request focused and explain:

- what changed;
- why the existing record or behavior was insufficient;
- which source or evidence supports the decision;
- whether stable IDs, completion, prerequisites, or saved workspaces are affected;
- which checks were run.

Do not commit `site/`, virtual environments, dependency directories, editor state, private Workspace Bundles, large datasets, model weights, or credentials.
