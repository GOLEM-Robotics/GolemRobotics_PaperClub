"use strict";

/**
 * Generated AI-tutor prompts.
 *
 * Prompts are derived from canonical data, never hand-written per session, and
 * always carry the guardrail that keeps AI a learning accelerator rather than a
 * replacement for the source.
 */

import { PROFILE } from "./constants.js";

const GUARDRAIL = "Ground every explanation primarily in the linked sources. Separate what the source claims from your "
  + "own inference or outside context, state your uncertainty, teach only the prerequisite material this target needs, "
  + "name everything you skipped or compressed, never invent citations or results, and finish with an active check that "
  + "makes me demonstrate the understanding rather than recognise it.";

export const SESSION_INTENTS = [
  { id: "prerequisites", label: "Repair my prerequisites", instruction: "Diagnose only the prerequisites I am missing, then teach the minimum chain that unlocks this session. Ask before explaining." },
  { id: "walkthrough", label: "Walk me through the source", instruction: "Walk me through the decisive method, figures, evidence and limitations in the assigned sections, in the order I should read them." },
  { id: "fast", label: "Give me the fast version", instruction: "Give me the fastest defensible route through this session that still clears the evidence gate. State exactly what you compressed and what I now owe." },
  { id: "quiz", label: "Quiz my readiness", instruction: "Ask one readiness question at a time. Do not reveal the answer before I commit, and repair only the gaps I actually demonstrate." },
  { id: "check", label: "Check my understanding", instruction: "Test whether I can meet the expected capability without notes. Give me a rubric first, wait for my answer, then require source-backed corrections." },
  { id: "reconstruct", label: "Help me reconstruct the method", instruction: "Help me reconstruct the method from first principles with equations, interfaces or pseudocode. Finish with the smallest experiment that would falsify the central claim." },
];

export const PAPER_INTENTS = [
  { id: "explain", label: "Explain this paper", instruction: "Explain the problem, the mechanism, the decisive evidence and the honest limitations of this paper, in that order." },
  { id: "prereq", label: "What must I know first", instruction: "List what I must already understand to read this paper without getting stuck, check whether I do, and repair only the gaps." },
  { id: "sections", label: "Which parts do I actually read", instruction: "Tell me which sections, figures and tables I personally must open, and which parts I can safely take from your summary." },
  { id: "critique", label: "Help me critique it", instruction: "Help me interrogate the experimental design: what is controlled, what is confounded, what the baselines omit, and which claim is weakest." },
  { id: "lineage", label: "Place it in the lineage", instruction: "Explain what this paper responded to, what it changed, and what superseded or complicated it since." },
  { id: "compare", label: "Compare it with its neighbours", instruction: "Compare this paper with the other primary sources in the same topic on mechanism, assumptions, evidence quality and practical cost." },
];

const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

export function sessionPrompt(app, session, intentId) {
  const intent = SESSION_INTENTS.find((item) => item.id === intentId) || SESSION_INTENTS[0];
  const profile = PROFILE[app.state.profile];
  const topic = app.model.topicById.get(session.topic_id);
  const papers = session.papers.map((id) => app.model.paperById.get(id)).filter(Boolean);
  const resources = session.resources.map((id) => app.model.resourceById.get(id)).filter(Boolean);
  const frontier = session.frontier_items.map((id) => app.model.frontierById.get(id)).filter(Boolean);
  const sources = [...papers, ...resources, ...frontier];

  const prerequisiteIds = [
    ...session.readiness.prior_session_ids,
    ...session.relationship_gates.map((id) => app.model.relationshipById.get(id)?.source).filter(Boolean),
  ];
  const completed = prerequisiteIds.filter((id) => (app.model.sessionById.has(id)
    ? app.engine.isDone(id)
    : app.engine.topicMetrics(id)?.readinessSatisfied));
  const missing = prerequisiteIds.filter((id) => !completed.includes(id));

  const lines = [
    `You are tutoring me through one session of a rigorous robot-learning research curriculum.`,
    ``,
    `SESSION: ${session.display_id} — ${session.title} (stable id ${session.id})`,
    `TOPIC: ${topic.id} — ${topic.title}`,
    `CENTRAL OBJECTIVE: ${clean(session.objective)}`,
    `CURRICULUM ROLE: ${clean(session.stage)}; classified ${session.classification}.`,
    `EXPECTED CAPABILITY: ${clean(session.completion)}`,
    `REQUIRED EVIDENCE / ARTIFACT: ${clean(session.artifact || session.competence_evidence || "the planned session evidence")}`,
    ``,
    `MY LEARNING PROFILE: ${profile.label} — ${profile.description}`,
    `TIME BUDGET: about ${app.engine.effort(1)}.`,
    `COMPRESSION BOUNDARY: ${profile.compression}`,
    ``,
    `PREREQUISITES ALREADY SATISFIED: ${completed.length ? completed.join(", ") : "none recorded"}`,
    `PREREQUISITES STILL MISSING: ${missing.length ? missing.join(", ") : "none encoded"}`,
    ``,
    `AUTHORITATIVE SOURCES:`,
    ...(sources.length
      ? sources.map((source) => `- ${source.id}: ${source.title} — ${source.url}`)
      : ["- No new source is assigned. Reuse the authoritative sources from the preceding sessions of this topic."]),
  ];

  if (papers.length) {
    lines.push("", "READING ASSIGNMENT PER SOURCE:");
    for (const paper of papers) {
      lines.push(`- ${paper.id}: role ${paper.role}; level ${paper.level}; preparation ${paper.burden}${paper.preparation ? `; ${paper.preparation}` : ""}.`);
      if (paper.limitation) lines.push(`  Known limitation to keep in view: ${clean(paper.limitation)}`);
    }
  }

  lines.push("", `WHAT I WANT NOW: ${intent.instruction}`, "", `HOW YOU MUST WORK: ${GUARDRAIL}`);
  return lines.join("\n");
}

export function paperPrompt(app, paper, intentId) {
  const intent = PAPER_INTENTS.find((item) => item.id === intentId) || PAPER_INTENTS[0];
  const profile = PROFILE[app.state.profile];
  const topic = app.model.topicById.get(paper.topic_id);
  const prerequisites = app.engine.paperPrerequisites(paper);
  const sessions = paper.sessionIds.map((id) => app.model.sessionById.get(id)).filter(Boolean);

  const lines = [
    `You are helping me understand one primary paper inside a rigorous robot-learning research curriculum.`,
    ``,
    `PAPER: ${paper.id} — ${paper.title}`,
    `AUTHORS / YEAR / VENUE: ${paper.authors} · ${paper.year} · ${paper.venue}`,
    `AUTHORITATIVE SOURCE: ${paper.url}`,
    paper.codeURL ? `OFFICIAL CODE OR PROJECT: ${paper.codeURL}` : `OFFICIAL CODE OR PROJECT: ${clean(paper.official_project_or_code) || "none recorded"}`,
    `CURRICULUM PLACEMENT: topic ${topic.id} — ${topic.title}; role ${paper.role}; level ${paper.level}; preparation burden ${paper.burden}.`,
    paper.preparation ? `READING ASSIGNMENT: ${paper.preparation}` : "READING ASSIGNMENT: no section-level restriction is encoded; read the whole paper.",
    `WHY THE CURRICULUM INCLUDES IT: ${clean(paper.contribution)}`,
    `RECORDED LINEAGE: ${clean(paper.lineage) || "not recorded"}`,
    `RECORDED LIMITATION: ${clean(paper.limitation) || "not recorded"}`,
    `EVIDENCE AND INFLUENCE SIGNALS: ${clean(paper.quality_influence_signals) || "not recorded"}`,
    `USED BY SESSIONS: ${sessions.map((session) => `${session.display_id} (${session.classification})`).join(", ") || "none"}`,
    ``,
    `WHAT THE CURRICULUM EXPECTS ME TO KNOW FIRST: ${[
      ...prerequisites.papers.map((item) => `${item.paper.id} ${item.paper.title}`),
      ...prerequisites.topics.map((item) => `topic ${item.topic.id}`),
    ].join("; ") || "nothing beyond the topic foundations"}`,
    `MY LEARNING PROFILE: ${profile.label}. ${profile.description}`,
    ``,
    `WHAT I WANT NOW: ${intent.instruction}`,
    ``,
    `HOW YOU MUST WORK: ${GUARDRAIL}`,
  ];
  return lines.filter(Boolean).join("\n");
}
