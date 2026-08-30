"use strict";

/** Shared presentational pieces. Every one returns escaped HTML. */

import { html, raw, truncate, plural, formatMinutes } from "./dom.js";
import { AREA_TONE, READING_LABEL, STATUS_LABEL, CLASSIFICATION_LABEL } from "./constants.js";
import { ROLE_NOTES } from "./model.js";

export const icon = (name) => {
  const paths = {
    external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    code: '<path d="m9 8-5 4 5 4M15 8l5 4-5 4"/>',
    star: '<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8Z"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    note: '<path d="M5 4h11l3 3v13H5z"/><path d="M9 11h6M9 15h4"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    warn: '<path d="M12 4 2.8 20h18.4Z"/><path d="M12 10v4M12 17h.01"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/>',
    compare: '<path d="M4 6h7M4 12h7M4 18h7M15 6h5M15 12h5M15 18h5"/>',
  };
  return raw(`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round">${paths[name] || ""}</svg>`);
};

export const meter = (value, total, tone = "") => {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  return html`<div class="meter ${tone}" style="--value:${percent}" role="img" aria-label="${value} of ${total} complete"></div>`;
};

export const areaChip = (model, areaId, extra = "") => {
  const area = model.areaById.get(areaId);
  if (!area) return raw("");
  return html`<span class="chip" data-tone="${AREA_TONE[areaId] || "slate"}" ${raw(extra)}>${area.short_label}</span>`;
};

export const roleChip = (paper) => html`<span class="chip" title="${ROLE_NOTES[paper.role] || ""}">${paper.role}</span>${paper.critical && paper.role !== "Critical" ? html`<span class="chip chip--warn" title="${ROLE_NOTES.Critical}">Critical</span>` : ""}`;

export const classificationChip = (classification) => {
  const tone = classification === "Required Core" ? "chip--accent"
    : classification === "Quarantined" ? "chip--stop"
      : classification === "Frontier Continuation" ? "chip--sprint" : "";
  return html`<span class="chip ${tone}">${CLASSIFICATION_LABEL[classification] || classification}</span>`;
};

export const statusChip = (status) => {
  if (status === "completed") return html`<span class="chip chip--ok">Completed</span>`;
  if (status === "in_progress") return html`<span class="chip chip--warn">In progress</span>`;
  if (status === "skipped") return html`<span class="chip">Skipped</span>`;
  return raw("");
};

export const readStateControl = (paperId, record) => {
  const status = record?.status || null;
  return html`<button type="button" class="readstate" data-act="cycle-reading" data-id="${paperId}"
    ${status ? raw(`data-status="${status}"`) : ""}
    title="Cycle your reading state: to read, reading, skimmed, read"
    aria-label="Reading state for ${paperId}: ${status ? READING_LABEL[status] : "not tracked"}. Activate to move to the next state.">
    ${status ? READING_LABEL[status] : "Track"}
  </button>`;
};

export const starButton = (paperId, starred) => html`<button type="button" class="star-button"
  data-act="toggle-star" data-id="${paperId}" aria-pressed="${starred ? "true" : "false"}"
  aria-label="${starred ? "Remove star from" : "Star"} ${paperId}">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8Z"/></svg>
</button>`;

/** Put anything canonical into the learner's own plan, or take it back out. */
export const planToggle = (app, kind, refId, options = {}) => {
  const inPlan = app.engine.inPlan(kind, refId);
  const style = options.style || "chip";
  const label = inPlan ? (options.inLabel || "In my plan") : (options.addLabel || "Add to my plan");
  if (style === "button") {
    return html`<button type="button" class="button ${inPlan ? "button--ghost" : "button--secondary"} ${options.block ? "button--block" : ""}"
      data-act="toggle-plan" data-kind="${kind}" data-ref="${refId}"
      aria-pressed="${inPlan ? "true" : "false"}">${inPlan ? icon("check") : icon("plus")} ${label}</button>`;
  }
  return html`<button type="button" class="plan-chip ${inPlan ? "is-in" : ""}"
    data-act="toggle-plan" data-kind="${kind}" data-ref="${refId}"
    aria-pressed="${inPlan ? "true" : "false"}"
    title="${inPlan ? "Remove from my plan" : "Add to my plan"}">
    ${inPlan ? icon("check") : icon("plus")}<span>${inPlan ? "Planned" : "Plan"}</span>
  </button>`;
};

export const compareToggle = (paperId, selected) => html`<label class="check" style="gap:.35rem">
  <input type="checkbox" data-act="toggle-compare" data-id="${paperId}" ${selected ? raw("checked") : ""}
    aria-label="Add ${paperId} to the comparison">
</label>`;

export const externalLink = (url, label) => (url
  ? html`<a class="chip" href="${url}" target="_blank" rel="noopener noreferrer">${label} ${icon("external")}</a>`
  : raw(""));

export const crumbs = (items) => html`<nav class="crumbs" aria-label="Breadcrumb">${
  items.map((item, index) => html`${index ? html`<span aria-hidden="true">/</span>` : ""}${
    item.href ? html`<a href="${item.href}">${item.label}</a>` : html`<span>${item.label}</span>`
  }`)
}</nav>`;

/** One paper as a dense, scannable row. */
export const paperRow = (app, paper, options = {}) => {
  const record = app.engine.readingStateOf(paper.id);
  const selected = app.state.compare.includes(paper.id);
  const disabled = app.engine.isDisabled(paper.id);
  return html`<div class="paper-row ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}" data-paper-row="${paper.id}">
    ${compareToggle(paper.id, selected)}
    <div class="paper-row-main">
      <a class="paper-row-title" href="#/papers/${paper.id}">${paper.title}</a>
      <div class="paper-row-meta">
        <span class="chip chip--id">${paper.id}</span>
        <span>${paper.authors}</span>
        <span>·</span>
        <span>${paper.year}</span>
        ${paper.venue ? html`<span>·</span><span>${paper.venue}</span>` : ""}
      </div>
      <div class="paper-row-meta">
        <a class="chip" href="#/topics/${paper.topic_id}">${paper.topic_id}</a>
        ${roleChip(paper)}
        <span class="chip">${paper.level}</span>
        <span class="chip" title="Preparation burden">${paper.burden} prep</span>
        ${paper.requiredCore ? html`<span class="chip chip--accent">Required Core</span>` : html`<span class="chip">Beyond core</span>`}
        ${disabled ? html`<span class="chip chip--stop">Hidden in my path</span>` : ""}
        ${(() => {
    if (options.hideRelevance) return "";
    const relevance = app.engine.paperRelevance(paper.id);
    if (relevance.next) return html`<span class="chip chip--ok">In your next session</span>`;
    if (relevance.soon) return html`<span class="chip chip--ok">In an upcoming session</span>`;
    if (relevance.activeTopic) return html`<span class="chip chip--accent">In the topic you are working on</span>`;
    if (relevance.route) return html`<span class="chip chip--accent">On your target route</span>`;
    return "";
  })()}
      </div>
      ${options.showContribution === false ? "" : html`<p class="small muted" style="margin:.35rem 0 0">${truncate(paper.contribution, 190)}</p>`}
      ${options.note ? html`<p class="small dim" style="margin:.3rem 0 0">${options.note}</p>` : ""}
    </div>
    <div class="paper-row-aside">
      ${options.hidePlan ? "" : planToggle(app, "paper", paper.id)}
      ${readStateControl(paper.id, record)}
      ${starButton(paper.id, record.starred)}
    </div>
  </div>`;
};

export const topicCard = (app, topic) => {
  const metrics = app.engine.topicMetrics(topic.id);
  const ready = app.engine.isTopicReady(topic.id);
  const blockers = app.engine.topicBlockers(topic.id);
  const complete = metrics.coreComplete || metrics.validated;
  return html`<a class="topic-card ${complete ? "is-complete" : ""} ${ready ? "" : "is-blocked"}" href="#/topics/${topic.id}">
    <div class="row row--tight">
      <span class="chip chip--id">${topic.id}</span>
      ${areaChip(app.model, topic.area_id)}
      ${complete ? html`<span class="chip chip--ok">Core complete</span>`
    : ready ? html`<span class="chip chip--ok">Ready</span>`
      : html`<span class="chip chip--warn">Needs ${blockers.join(", ")}</span>`}
    </div>
    <h3>${topic.title}</h3>
    <p class="small muted" style="margin:0">${truncate(topic.curriculum_role, 120)}</p>
    ${meter(metrics.coreDone, metrics.coreTotal, complete ? "meter--ok" : "")}
    <div class="kv-inline">
      <span>${metrics.coreDone}/${metrics.coreTotal} core sessions</span>
      <span>${plural(topic.paperIds.length, "paper")}</span>
    </div>
  </a>`;
};

/** A canonical session inside a topic timeline. */
export const timelineItem = (app, session, options = {}) => {
  const status = app.engine.statusOf(session.id);
  const done = status === "completed";
  const topicReady = app.engine.isTopicReady(session.topic_id);
  const localReady = session.readiness.prior_session_ids.every((id) => app.engine.isDone(id) || app.engine.isDisabled(id))
    && session.relationship_gates.every((id) => {
      const edge = app.model.relationshipById.get(id);
      return edge && app.engine.topicMetrics(edge.source)?.readinessSatisfied;
    });
  const ready = topicReady && localReady;
  const crossTopicBlockers = session.relationship_gates
    .map((id) => app.model.relationshipById.get(id))
    .filter((edge) => edge && !app.engine.topicMetrics(edge.source)?.readinessSatisfied)
    .map((edge) => edge.source);
  const disabled = app.engine.isDisabled(session.id);
  const papers = session.papers.map((id) => app.model.paperById.get(id)).filter(Boolean);
  return html`<div class="timeline-item ${done ? "is-done" : ""} ${options.current ? "is-current" : ""}">
    <span class="timeline-marker">${done ? icon("check") : session.sequence}</span>
    <div class="timeline-body">
      <a class="entity-title" href="#/sessions/${session.id}">${session.title}</a>
      <div class="entity-meta">
        <span class="chip chip--id">${session.display_id}</span>
        ${classificationChip(session.classification)}
        <span>${session.stage}</span>
      </div>
      ${papers.length ? html`<div class="entity-meta" style="margin-top:.25rem">
        ${papers.map((paper) => html`<a class="chip" href="#/papers/${paper.id}">${paper.id} · ${truncate(paper.title, 46)}</a>`)}
      </div>` : ""}
      ${options.showObjective ? html`<p class="small muted" style="margin:.35rem 0 0">${truncate(session.objective, 180)}</p>` : ""}
    </div>
    <div class="timeline-aside">
      ${options.hidePlan ? "" : planToggle(app, "session", session.id)}
      ${disabled ? html`<span class="chip">Hidden</span>` : ""}
      ${statusChip(status)}
      ${options.current && !done && !disabled
    ? (ready ? html`<span class="chip chip--ok">Start here</span>` : html`<span class="chip chip--warn">Next, once the gate clears</span>`)
    : ""}
      ${!options.current && !done && !localReady && !disabled && crossTopicBlockers.length
    ? html`<span class="chip chip--warn">Needs ${crossTopicBlockers.join(", ")}</span>` : ""}
    </div>
  </div>`;
};

export const emptyState = (message, actionHTML = "") => html`<div class="empty">
  <p style="margin:0 0 .5rem">${message}</p>${raw(actionHTML)}
</div>`;

export const profileSummary = (profile) => html`<dl class="deflist deflist--inline">
  <div><dt>Time per session</dt><dd>${formatMinutes(profile.minutes[0])}–${formatMinutes(profile.minutes[1])}</dd></div>
  <div><dt>AI assistance</dt><dd>${profile.assistance}</dd></div>
  <div><dt>Validation</dt><dd>${profile.validation}</dd></div>
  <div><dt>Compressed</dt><dd>${profile.compression}</dd></div>
  <div><dt>Credit</dt><dd>${profile.credit}</dd></div>
</dl>`;

export const sectionTitle = (title, right = "") => html`<div class="section-title">
  <h2>${title}</h2>${raw(right)}
</div>`;

export { STATUS_LABEL, READING_LABEL };
