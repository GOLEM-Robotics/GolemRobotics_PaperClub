"use strict";

/**
 * Credential-free publication.
 *
 * The browser never holds repository credentials, so "publishing" means producing
 * a reviewable Git patch that a human applies through a pull request.
 */

import { slugify } from "./dom.js";
import { PROPOSAL_LABEL } from "./constants.js";

const normalizeText = (value) => `${String(value).replaceAll("\r\n", "\n").replaceAll("\r", "\n").replace(/\n+$/, "")}\n`;

export function patchNewFile(path, content) {
  const normalized = normalizeText(content);
  const lines = normalized.slice(0, -1).split("\n");
  return [
    `diff --git a/${path} b/${path}`,
    "new file mode 100644",
    "--- /dev/null",
    `+++ b/${path}`,
    `@@ -0,0 +1,${lines.length} @@`,
    ...lines.map((line) => `+${line}`),
    "",
  ].join("\n");
}

export const sessionDirectory = (topic, session, fallbackTitle = "proposed materials") => {
  const prefix = session ? String(session.sequence).padStart(2, "0") : "99";
  const name = session ? session.title : fallbackTitle;
  return `curriculum_and_progress/topics/${topic.directory}/${prefix}_${slugify(name) || "proposed_session"}`;
};

/** Build one Markdown review document per proposal. */
export function proposalDocument(app, proposal) {
  const created = proposal.createdAt.slice(0, 10);
  const topic = app.model.topicById.get(proposal.topicId);
  const target = proposal.targetId ? app.engine.label(proposal.targetId) : "New material";
  const lines = [
    `# Curriculum proposal — ${PROPOSAL_LABEL[proposal.kind]}`,
    "",
    "> Generated from a private learner workspace. It is a request for review, not an approved change.",
    "> Apply it only through the normal pull-request process after a maintainer has verified the source identity.",
    "",
    "## Proposal",
    "",
    `- Kind: ${PROPOSAL_LABEL[proposal.kind]}`,
    `- Target: ${target}`,
    topic ? `- Topic: ${topic.id} — ${topic.title}` : "- Topic: not specified",
    proposal.sessionId ? `- Session: ${app.engine.label(proposal.sessionId)}` : null,
    proposal.title ? `- Proposed source: ${proposal.title}` : null,
    proposal.url ? `- Proposed URL: ${proposal.url}` : null,
    `- Raised: ${created}`,
    `- Curriculum version: ${app.model.data.curriculum_version}`,
    `- Source revision: \`${app.model.data.source_revision}\``,
    "",
    "## Justification",
    "",
    proposal.rationale || "No justification was supplied.",
    "",
  ];
  if (proposal.detail) lines.push("## Additional detail", "", proposal.detail, "");
  lines.push(
    "## Maintainer review",
    "",
    "- [ ] Verify the source identity, authoritative version and official code or project page",
    "- [ ] Confirm the topic and session placement against the construction rules",
    "- [ ] Decide whether this is a metadata correction or a structural curriculum revision",
    "- [ ] Preserve or assign canonical stable identities",
    "- [ ] Run the semantic validators and browser journeys",
    "- [ ] Record the decision in the topic revision history",
    "",
  );
  return lines.filter((line) => line !== null).join("\n");
}

/** Session-artifact directories generated from personal additions and selected work. */
export function artifactPatches(app, { context, includeNotes, includeArtifacts, attachments, items }) {
  const targets = new Map();
  const ensure = (topic, session, title) => {
    const directory = sessionDirectory(topic, session, title);
    if (!targets.has(directory)) targets.set(directory, { directory, topic, session, title, sessions: [], materials: [], papers: [], notes: [], artifacts: [] });
    return targets.get(directory);
  };

  for (const item of items) {
    const topic = app.model.topicById.get(item.topicId);
    if (!topic) continue;
    const session = item.sessionId ? app.model.sessionById.get(item.sessionId) : null;
    const target = ensure(topic, session, item.kind === "session" ? item.title : "proposed materials");
    const bucket = item.kind === "session" ? "sessions" : item.kind === "paper" ? "papers" : "materials";
    target[bucket].push(item);
  }

  if (includeNotes) {
    for (const [entityId, note] of Object.entries(app.state.notes)) {
      const session = app.model.sessionById.get(entityId);
      if (!session || !note.trim()) continue;
      ensure(app.model.topicById.get(session.topic_id), session, session.title).notes.push({ session, note });
    }
  }

  if (includeArtifacts) {
    for (const artifact of attachments) {
      const session = app.model.sessionById.get(artifact.entityId);
      if (!session) continue;
      ensure(app.model.topicById.get(session.topic_id), session, session.title).artifacts.push(artifact);
    }
  }

  const createdAt = new Date().toISOString();
  const patches = [];
  for (const target of targets.values()) {
    const heading = target.session ? target.session.title : target.title;
    const plan = [
      `# ${heading}`, "",
      "> Generated as a review proposal from a private learner workspace. Apply only after human review through a pull request.", "",
      "## Proposal provenance", "",
      `- Created: ${createdAt}`,
      `- Canonical topic: ${target.topic.id} — ${target.topic.title}`,
      ...(target.session ? [`- Canonical session: ${target.session.display_id}`, `- Stable session ID: \`${target.session.id}\``] : []),
      `- Curriculum version: ${app.model.data.curriculum_version}`,
      `- Source revision: \`${app.model.data.source_revision}\``, "",
      "## Context", "", context, "",
    ];
    if (target.session) {
      plan.push("## Canonical objective", "", target.session.objective, "",
        "## Planned evidence", "", target.session.planned_component, "",
        `Expected capability: ${target.session.completion}`, "");
    }
    if (target.sessions.length) {
      plan.push("## Proposed session additions", "");
      for (const item of target.sessions) {
        plan.push(`### ${item.title}`, "", item.objective, "",
          `Source or expected artifact: ${item.url || "Not supplied"}`, `Personal identifier: \`${item.id}\``, "");
      }
    }
    if (target.papers.length) {
      plan.push("## Proposed primary sources", "");
      for (const item of target.papers) {
        plan.push(`### ${item.title}`, "",
          `- Authors / year: ${item.authors || "not supplied"} · ${item.year || "not supplied"}`,
          `- URL: ${item.url || "not supplied"}`,
          `- Proposed role: ${item.role || "not supplied"}`,
          item.replacesId ? `- Proposed as a replacement for: ${item.replacesId}` : null,
          "", item.objective, "", `Personal identifier: \`${item.id}\``, "");
      }
    }
    if (target.materials.length) {
      plan.push("## Proposed supporting material", "");
      for (const item of target.materials) {
        plan.push(`- **${item.title}** — ${item.objective} Source: ${item.url || "not supplied"}. Personal identifier: \`${item.id}\`.`);
      }
      plan.push("");
    }
    plan.push("## Maintainer review", "",
      "- [ ] Confirm topic and session placement",
      "- [ ] Verify source identity, metadata and preparation burden",
      "- [ ] Assign or preserve canonical stable identities",
      "- [ ] Run semantic validators and browser journeys",
      "- [ ] Confirm that only deliberately selected private work is included", "");

    const noteLines = ["# Session notes", "", "> Private notes are never included automatically.", ""];
    if (target.notes.length) {
      noteLines.push("## Selected learner notes", "");
      target.notes.forEach((entry, index) => noteLines.push(`### Note ${index + 1} — ${entry.session.display_id}`, "", entry.note, ""));
    } else {
      noteLines.push("No private notes were selected for this proposal.", "");
    }
    if (target.artifacts.length) {
      noteLines.push("## Selected artifact manifest", "",
        "The files themselves are not embedded. Upload only the reviewed files to `code/` or `other_session_files/`.", "");
      for (const item of target.artifacts) {
        noteLines.push(`- \`${item.name.replaceAll("`", "'")}\` — ${item.type}, ${item.size} bytes`);
      }
      noteLines.push("");
    }

    patches.push(patchNewFile(`${target.directory}/session_plan.md`, plan.filter((line) => line !== null).join("\n")));
    patches.push(patchNewFile(`${target.directory}/session_notes.md`, noteLines.join("\n")));
  }
  return { patches, count: targets.size, createdAt };
}

export function proposalPatches(app, proposals) {
  return proposals.map((proposal) => patchNewFile(
    `curriculum_and_progress/proposals/${proposal.createdAt.slice(0, 10)}-${slugify(`${proposal.kind}-${proposal.targetId || proposal.title || proposal.id}`) || "proposal"}.md`,
    proposalDocument(app, proposal),
  ));
}
