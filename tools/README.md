# Repository tools

The supported tools are deterministic validators, projection builders, and maintenance helpers. Run them from the repository root with the project virtual environment active.

| Command | Default behavior | Writes with |
|---|---|---|
| `python -m tools.build_curriculum_data` | Validate and regenerate the committed browser projection | Always writes only when output changed |
| `python -m tools.assign_session_ids` | Verify session registries and the published alias lock | Historical migration flags only; do not use for routine edits |
| `python -m tools.sync_resource_assignments` | Compare resource-index placement with topic use | `--write` after reviewing the reported delta |
| `python -m tools.update_identity_lock` | Compare canonical entities with the identity lock | `--write` only for an intentional reviewed identity change |
| `python -m tools.maintenance --validate` | Validate scheduler state against current curriculum | No write |
| `python -m tools.maintenance --offline` | Exercise/report maintenance logic without network probes | Writes the selected state/report paths |

`build_curriculum_data.py` is the authoritative contract validator used by MkDocs and CI. It fails closed for protected-document drift, identity reuse, stale registries, paper/resource ownership problems, invalid completion boundaries, missing hard gates, cycles, or projection inconsistency.

The repository intentionally does not retain one-time audit/migration scripts after their reviewed output has been absorbed into canonical Markdown and locks. Git history and the dated audit evidence preserve those decisions without presenting destructive migrations as routine contributor commands.

Maintenance scans never edit curriculum Markdown. They update a maintenance state file and emit evidence; any canonical correction still requires a reviewed pull request.
