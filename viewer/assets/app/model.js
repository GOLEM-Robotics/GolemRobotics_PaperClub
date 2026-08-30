"use strict";

/**
 * Turns the canonical schema-2 projection into the learner-facing model.
 *
 * Every derivation here is display-oriented and reversible: the canonical field
 * is always retained beside the parsed value so provenance is never lost.
 */

import { normalize, firstURL } from "./dom.js";

export const ROLE_ORDER = [
  "Entry Point",
  "Foundation",
  "Seminal",
  "Bridge",
  "Frontier Bridge",
  "Modern Core",
  "Frontier",
  "Systems",
  "Synthesis",
  "Reproduction Candidate",
  "Optional Specialization",
  "Optional",
  "Critical",
];

const ROLE_TOKENS = new Set(ROLE_ORDER);
const LEVEL_ORDER = ["Introductory", "Intermediate", "Advanced", "Expert"];
const BURDEN_ORDER = ["Low", "Low–Medium", "Medium", "Medium–High", "High"];
const LEVEL_TOKENS = new Set(LEVEL_ORDER);
const BURDEN_TOKENS = new Set(BURDEN_ORDER);

export const ROLE_NOTES = {
  "Entry Point": "Where the lineage starts. Read it before the rest of the topic.",
  Foundation: "Establishes the mathematics or mechanism everything later depends on.",
  Seminal: "The paper that defined the direction; later work is a response to it.",
  Bridge: "Connects two lineages or carries an idea into robotics.",
  "Frontier Bridge": "Carries a frontier result back into the durable sequence.",
  "Modern Core": "Current durable practice. This is what the field actually builds on now.",
  Frontier: "Recent and still under review; treat its evidence as provisional.",
  Systems: "Systems and engineering contribution rather than a new learning result.",
  Synthesis: "Synthesises a body of work rather than introducing a method.",
  "Reproduction Candidate": "Selected because it can realistically be reproduced.",
  "Optional Specialization": "Deepens a branch; not part of the Required Core.",
  Optional: "Optional depth for this topic.",
  Critical: "Read closely: the curriculum treats its conclusions as load-bearing.",
};

/** Domain words that are never a reliable pointer to one specific paper. */
const GENERIC_ACRONYMS = new Set([
  "SLAM", "RL", "VLA", "VLM", "LLM", "CNN", "RNN", "MLP", "GAN", "VAE", "MDP", "POMDP",
  "SGD", "GPU", "CPU", "API", "IMU", "SDF", "MPC", "PID", "ROS", "SIM", "REAL", "AI",
  "NERF", "3D", "2D", "6D", "SE3", "MSE", "KL", "EM", "SVD", "PCA", "ICP", "RGB", "RGBD",
]);

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "this", "that", "into", "than", "then", "into",
  "precedes", "builds", "extends", "informs", "applies", "connects", "direct", "later",
  "modern", "core", "bridge", "frontier", "seminal", "foundation", "paper", "papers",
  "these", "those", "after", "before", "within", "across", "which", "while", "where",
]);

const parseRole = (rawValue) => {
  const raw = String(rawValue ?? "").trim();
  const roles = [];
  const preparation = [];
  let level = null;
  let burden = null;
  let critical = false;

  for (const segment of raw.split(";")) {
    for (const piece of segment.split("·")) {
      const token = piece.trim().replace(/\.$/, "");
      if (!token) continue;
      if (token === "Critical") { critical = true; roles.push("Critical"); continue; }
      if (ROLE_TOKENS.has(token)) { roles.push(token); continue; }
      if (LEVEL_TOKENS.has(token)) { level = token; continue; }
      if (BURDEN_TOKENS.has(token)) { burden = token; continue; }
      if (/^Bridge to /.test(token)) { roles.push("Bridge"); preparation.push(token); continue; }
      preparation.push(token);
    }
  }

  const ranked = [...new Set(roles)].sort((a, b) => ROLE_ORDER.indexOf(a) - ROLE_ORDER.indexOf(b));
  const primary = ranked.find((role) => role !== "Critical") || ranked[0] || "Modern Core";
  return {
    raw,
    roles: ranked,
    role: primary,
    critical,
    level,
    burden,
    preparation: preparation.join("; "),
  };
};

const surnamesOf = (authors) => {
  const cleaned = String(authors ?? "").replace(/\bet al\.?/gi, "");
  const names = cleaned.split(/,| and | & /).map((part) => part.trim()).filter(Boolean);
  const result = [];
  for (const name of names) {
    const tokens = name.split(/\s+/).filter(Boolean);
    if (!tokens.length) continue;
    const last = tokens[tokens.length - 1].replace(/[^\p{L}\p{M}'-]/gu, "");
    if (last.length >= 4) result.push(last);
  }
  return result;
};

const distinctiveAcronyms = (title) => {
  const found = String(title ?? "").match(/\b[A-Z][A-Za-z0-9.π-]*[A-Z0-9]\b/g) || [];
  return found
    .map((token) => token.replace(/[.]$/, ""))
    .filter((token) => token.length >= 3 && !GENERIC_ACRONYMS.has(token.toUpperCase()));
};

/** Resolve free-text lineage prose into confident links, keeping the prose intact. */
const resolveLineage = (paper, indexes) => {
  const text = String(paper.lineage ?? "");
  if (!text.trim()) return { text, links: [], topicIds: [] };

  const links = new Map();
  const addLink = (id, evidence, kind) => {
    if (!id || id === paper.id) return;
    if (!links.has(id)) links.set(id, { id, evidence, kind });
  };

  for (const token of text.match(/\b\p{Lu}[\p{L}\p{M}'-]{3,}\b/gu) || []) {
    if (STOP_WORDS.has(token.toLowerCase())) continue;
    const owners = indexes.bySurname.get(token);
    if (owners && owners.size <= 2) owners.forEach((id) => addLink(id, token, "author"));
  }

  const lowered = normalize(text);
  for (const [key, owners] of indexes.byTitleLead) {
    if (owners.size === 1 && lowered.includes(key)) owners.forEach((id) => addLink(id, key, "title"));
  }

  for (const [token, owners] of indexes.byAcronym) {
    if (owners.size !== 1) continue;
    const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\p{L}\\p{N}]|$)`, "u");
    if (pattern.test(text)) owners.forEach((id) => addLink(id, token, "acronym"));
  }

  const topicIds = [...new Set((text.match(/\b[FPLDES]\d\b/g) || []))]
    .filter((id) => indexes.topicIds.has(id) && id !== paper.topic_id);

  return { text, links: [...links.values()], topicIds };
};

const uniq = (values) => [...new Set(values)];

/**
 * Build the enriched, memoised model used by every view.
 */
export function buildModel(data) {
  const topicById = new Map(data.topics.map((topic) => [topic.id, topic]));
  const sessionById = new Map(data.sessions.map((session) => [session.id, session]));
  const paperById = new Map(data.papers.map((paper) => [paper.id, paper]));
  const resourceById = new Map(data.resources.map((resource) => [resource.id, resource]));
  const frontierById = new Map(data.frontier_items.map((item) => [item.id, item]));
  const relationshipById = new Map(data.relationships.map((edge) => [edge.id, edge]));
  const areaById = new Map(data.areas.map((area) => [area.id, area]));

  const aliasToStable = new Map();
  for (const session of data.sessions) {
    for (const alias of session.legacy_aliases || []) aliasToStable.set(alias, session.id);
    aliasToStable.set(session.display_id, session.id);
  }

  // --- sessions grouped by topic, in canonical sequence -------------------
  const sessionsByTopic = new Map(data.topics.map((topic) => [topic.id, []]));
  for (const session of data.sessions) sessionsByTopic.get(session.topic_id)?.push(session);
  for (const list of sessionsByTopic.values()) list.sort((a, b) => a.sequence - b.sequence);

  // --- paper ↔ session wiring --------------------------------------------
  const sessionIdsByPaper = new Map(data.papers.map((paper) => [paper.id, []]));
  const sessionIdsByResource = new Map(data.resources.map((resource) => [resource.id, []]));
  const sessionIdsByFrontier = new Map(data.frontier_items.map((item) => [item.id, []]));
  for (const session of data.sessions) {
    for (const id of session.papers) sessionIdsByPaper.get(id)?.push(session.id);
    for (const id of session.resources) sessionIdsByResource.get(id)?.push(session.id);
    for (const id of session.frontier_items) sessionIdsByFrontier.get(id)?.push(session.id);
  }

  // --- lineage indexes ----------------------------------------------------
  const bySurname = new Map();
  const byTitleLead = new Map();
  const byAcronym = new Map();
  const add = (map, key, id) => {
    if (!key) return;
    if (!map.has(key)) map.set(key, new Set());
    map.get(key).add(id);
  };
  for (const paper of data.papers) {
    for (const surname of surnamesOf(paper.authors)) add(bySurname, surname, paper.id);
    const lead = paper.title.split(":")[0].trim();
    if (lead.length >= 8) add(byTitleLead, normalize(lead), paper.id);
    for (const token of distinctiveAcronyms(paper.title)) add(byAcronym, token, paper.id);
  }
  const indexes = { bySurname, byTitleLead, byAcronym, topicIds: new Set(topicById.keys()) };

  // --- curated per-topic paper lineage ------------------------------------
  const papersByTopic = new Map(data.topics.map((topic) => [topic.id, []]));
  for (const topic of data.topics) {
    const ordered = [];
    for (const session of sessionsByTopic.get(topic.id) || []) {
      for (const id of session.papers) {
        if (!paperById.has(id)) continue;
        if (paperById.get(id).topic_id !== topic.id) continue;
        if (!ordered.includes(id)) ordered.push(id);
      }
    }
    // Papers owned by the topic but only referenced elsewhere still belong here.
    for (const paper of data.papers) {
      if (paper.topic_id === topic.id && !ordered.includes(paper.id)) ordered.push(paper.id);
    }
    papersByTopic.set(topic.id, ordered);
  }

  // --- enrich every paper --------------------------------------------------
  const papers = data.papers.map((paper) => {
    const sessionIds = sessionIdsByPaper.get(paper.id) || [];
    const sessions = sessionIds.map((id) => sessionById.get(id)).filter(Boolean);
    const focusSession = sessions.find((session) => session.papers.length === 1)
      || sessions.slice().sort((a, b) => a.sequence - b.sequence)[0]
      || null;
    const lineageOrder = papersByTopic.get(paper.topic_id) || [];
    const position = lineageOrder.indexOf(paper.id);
    const topic = topicById.get(paper.topic_id);
    const parsedRole = parseRole(paper.role_level_preparation);
    const classifications = uniq(sessions.map((session) => session.classification));
    const yearValue = Number.parseInt(String(paper.year).slice(0, 4), 10);

    return {
      ...paper,
      kind: "paper",
      canonical: true,
      parsedRole,
      role: parsedRole.role,
      roles: parsedRole.roles,
      critical: parsedRole.critical,
      level: parsedRole.level,
      burden: parsedRole.burden,
      preparation: parsedRole.preparation,
      yearValue: Number.isFinite(yearValue) ? yearValue : 0,
      area: paper.area,
      areaId: topic?.area_id ?? null,
      topicTitle: topic?.title ?? "",
      sessionIds,
      focusSessionId: focusSession?.id ?? null,
      classifications,
      requiredCore: classifications.includes("Required Core"),
      codeURL: firstURL(paper.official_project_or_code),
      lineageInfo: resolveLineage(paper, indexes),
      lineagePosition: position,
      lineageLength: lineageOrder.length,
      previousInTopic: position > 0 ? lineageOrder[position - 1] : null,
      nextInTopic: position >= 0 && position < lineageOrder.length - 1 ? lineageOrder[position + 1] : null,
      studiedWith: uniq(sessions.flatMap((session) => session.papers)).filter((id) => id !== paper.id),
    };
  });
  const enrichedPaperById = new Map(papers.map((paper) => [paper.id, paper]));

  // Backlinks: who names this paper in their lineage note.
  for (const paper of papers) {
    for (const link of paper.lineageInfo.links) {
      const other = enrichedPaperById.get(link.id);
      if (!other) continue;
      other.lineageInfo.backlinks = other.lineageInfo.backlinks || [];
      if (!other.lineageInfo.backlinks.some((item) => item.id === paper.id)) {
        other.lineageInfo.backlinks.push({ id: paper.id, evidence: link.evidence, kind: link.kind });
      }
    }
  }
  for (const paper of papers) paper.lineageInfo.backlinks = paper.lineageInfo.backlinks || [];

  // --- relationship indexes -----------------------------------------------
  const hardIncoming = new Map(data.topics.map((topic) => [topic.id, []]));
  const hardOutgoing = new Map(data.topics.map((topic) => [topic.id, []]));
  const softIncoming = new Map(data.topics.map((topic) => [topic.id, []]));
  const softOutgoing = new Map(data.topics.map((topic) => [topic.id, []]));
  const coreGateIncoming = new Map(data.topics.map((topic) => [topic.id, []]));
  for (const edge of data.relationships) {
    if (!topicById.has(edge.source) || !topicById.has(edge.target)) continue;
    if (edge.type === "hard_prerequisite") {
      // `topic_entry` blocks the whole topic; `target_sessions` blocks only the
      // sessions it names, which the session's own relationship_gates carry.
      if (edge.scope === "topic_entry") hardIncoming.get(edge.target).push(edge.source);
      coreGateIncoming.get(edge.target).push(edge.source);
      hardOutgoing.get(edge.source).push(edge.target);
    } else {
      softIncoming.get(edge.target).push(edge.source);
      softOutgoing.get(edge.source).push(edge.target);
    }
  }
  for (const map of [hardIncoming, hardOutgoing, softIncoming, softOutgoing, coreGateIncoming]) {
    for (const [key, value] of map) map.set(key, uniq(value));
  }

  const relationshipsByTopic = new Map(data.topics.map((topic) => [topic.id, { incoming: [], outgoing: [] }]));
  for (const edge of data.relationships) {
    relationshipsByTopic.get(edge.target)?.incoming.push(edge);
    relationshipsByTopic.get(edge.source)?.outgoing.push(edge);
  }

  // --- topic enrichment ----------------------------------------------------
  const topics = data.topics.map((topic) => {
    const sessions = sessionsByTopic.get(topic.id) || [];
    const paperIds = papersByTopic.get(topic.id) || [];
    return {
      ...topic,
      kind: "topic",
      canonical: true,
      sessionIds: sessions.map((session) => session.id),
      paperIds,
      resourceIds: uniq(sessions.flatMap((session) => session.resources)),
      frontierIds: uniq(sessions.flatMap((session) => session.frontier_items)),
      hardPrerequisites: hardIncoming.get(topic.id) || [],
      gatePrerequisites: coreGateIncoming.get(topic.id) || [],
      downstream: hardOutgoing.get(topic.id) || [],
      recommendedFrom: softIncoming.get(topic.id) || [],
      recommendedTo: softOutgoing.get(topic.id) || [],
      relationships: relationshipsByTopic.get(topic.id) || { incoming: [], outgoing: [] },
    };
  });
  const enrichedTopicById = new Map(topics.map((topic) => [topic.id, topic]));

  // --- session enrichment --------------------------------------------------
  const sessions = data.sessions.map((session) => {
    const list = sessionsByTopic.get(session.topic_id) || [];
    const index = list.findIndex((item) => item.id === session.id);
    return {
      ...session,
      kind: "session",
      canonical: true,
      topicTitle: enrichedTopicById.get(session.topic_id)?.title ?? "",
      areaId: enrichedTopicById.get(session.topic_id)?.area_id ?? null,
      positionInTopic: index + 1,
      topicSessionCount: list.length,
      previousSessionId: index > 0 ? list[index - 1].id : null,
      followingSessionId: session.next_session_id
        || (index >= 0 && index < list.length - 1 ? list[index + 1].id : null),
      isPaperSession: session.papers.length === 1 && /^Paper lineage/.test(session.stage),
    };
  });
  const enrichedSessionById = new Map(sessions.map((session) => [session.id, session]));

  const resources = data.resources.map((resource) => ({
    ...resource,
    kind: "resource",
    canonical: true,
    sessionIds: sessionIdsByResource.get(resource.id) || [],
  }));
  const frontierItems = data.frontier_items.map((item) => ({
    ...item,
    kind: "frontier",
    canonical: true,
    sessionIds: sessionIdsByFrontier.get(item.id) || [],
  }));

  const knownEntityIds = new Set([
    ...topicById.keys(), ...sessionById.keys(), ...paperById.keys(),
    ...resourceById.keys(), ...frontierById.keys(),
  ]);

  return {
    data,
    topics,
    sessions,
    papers,
    resources,
    frontierItems,
    areas: data.areas,
    statuses: data.statuses,
    relationships: data.relationships,
    topicById: enrichedTopicById,
    sessionById: enrichedSessionById,
    paperById: enrichedPaperById,
    resourceById: new Map(resources.map((item) => [item.id, item])),
    frontierById: new Map(frontierItems.map((item) => [item.id, item])),
    relationshipById,
    areaById,
    sessionsByTopic,
    papersByTopic,
    hardIncoming,
    hardOutgoing,
    coreGateIncoming,
    softIncoming,
    softOutgoing,
    aliasToStable,
    knownEntityIds,
    levels: LEVEL_ORDER,
    burdens: BURDEN_ORDER,
    roles: ROLE_ORDER.filter((role) => papers.some((paper) => paper.roles.includes(role))),
  };
}
