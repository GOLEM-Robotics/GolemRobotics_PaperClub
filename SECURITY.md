# Security policy

## Supported version

Security fixes target the current `main` branch and the current GitHub Pages deployment. Older forks, exported site builds, and unmerged branches are not maintained by this repository.

## Report a vulnerability privately

Use GitHub's private vulnerability reporting for this repository: open the **Security** tab, choose **Advisories**, and select **Report a vulnerability**. Please do not open a public issue for a vulnerability that could expose another learner's browser data or repository workflow.

Include the affected URL or revision, reproduction steps, impact, and any suggested mitigation. Do not include real private notes, attachments, Workspace Bundles, tokens, or credentials in the report. This project does not currently operate a bug-bounty program.

## Browser-data boundary

The learner application has no account, sync backend, analytics, or repository-write credential. Progress, notes, custom items, and attachments are stored in IndexedDB and are exported only by an explicit learner action.

Important limits:

- IndexedDB is isolated by origin, not by URL path. On the default GitHub Pages deployment, all project sites under `golem-robotics.github.io` share an origin and therefore share a trust boundary. A dedicated custom origin is recommended for stronger isolation.
- Workspace Bundles and attachments are plaintext. Treat exported files as private data and import only files you created or independently trust.
- Browser cleanup, storage eviction, private-browsing behavior, or unavailable IndexedDB can remove persistence. Export a Workspace Bundle for durable backup.
- Bundle import validates IDs, sizes, counts, text bounds, and local base64 attachment payloads. Remote attachment URLs are rejected.
- The application never embeds GitHub credentials. Publishing produces a proposal for human review rather than writing to the repository.

Third-party runtime code is vendored and versioned; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
