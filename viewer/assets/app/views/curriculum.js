"use strict";

import { html, raw, truncate, plural, normalize } from "../dom.js";
import { AREA_TONE } from "../constants.js";
import { topicCard, meter, icon, emptyState, areaChip } from "../ui.js";

const MODES = {
  path: "Your route",
  areas: "By area",
  matrix: "Matrix",
};

const toolbar = (app, query, mode) => {
  const link = (next) => {
    const pairs = Object.entries({ ...query, mode: next }).filter(([, value]) => value);
    return `#/curriculum?${pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}`;
  };
  return html`<div class="row row--between" style="margin-bottom:1rem">
    <div class="pill-tabs">
      ${Object.entries(MODES).map(([id, label]) => html`<a href="${link(id)}" ${id === mode ? raw('aria-current="page"') : ""}>${label}</a>`)}
      <a href="#/map">Relationship map ${icon("arrowRight")}</a>
    </div>
    <div class="row row--tight">
      <input type="search" value="${query.q || ""}" data-act="filter-search" placeholder="Filter topics…"
        aria-label="Filter topics" style="max-width:220px">
      <select data-act="filter-area" aria-label="Filter by area" style="width:auto">
        <option value="">All areas</option>
        ${app.model.areas.map((area) => html`<option value="${area.id}" ${area.id === query.area ? raw("selected") : ""}>${area.short_label}</option>`)}
      </select>
      <label class="check" style="white-space:nowrap">
        <input type="checkbox" data-act="filter-ready" ${query.ready ? raw("checked") : ""}>
        <span>Ready now</span>
      </label>
    </div>
  </div>`;
};

const filterTopics = (app, query) => {
  const text = normalize(String(query.q || "").trim());
  return app.model.topics.filter((topic) => {
    if (query.area && topic.area_id !== query.area) return false;
    if (query.ready && !app.engine.isTopicReady(topic.id)) return false;
    if (!text) return true;
    return normalize([topic.id, topic.title, topic.covers, topic.target_competence, topic.curriculum_role].join(" ")).includes(text);
  });
};

const pathMode = (app, topics) => {
  const targetId = app.engine.targetTopicId();
  const route = app.engine.routeTopics(targetId).filter((topic) => topics.includes(topic));
  const outstanding = app.engine.routeSessions(targetId);
  return html`<section>
    <div class="callout" style="margin-bottom:.9rem">
      ${targetId
    ? html`<strong>Route to ${app.engine.targetLabel()}.</strong> ${plural(route.length, "topic")},
        ${plural(outstanding.length, "outstanding Required Core session")}, about
        <strong>${app.engine.effort(outstanding.length)}</strong> at your current profile.
        <button type="button" class="link-button small" data-act="clear-target" style="margin-left:.4rem">Show the whole curriculum</button>`
    : html`<strong>No target set.</strong> This is the full curriculum in a prerequisite-valid order.
        <button type="button" class="link-button small" data-act="open-target" style="margin-left:.4rem">Aim at something specific</button>`}
    </div>
    <ol class="entity-list" style="list-style:none;padding:0;margin:0">
      ${route.map((topic, index) => {
    const metrics = app.engine.topicMetrics(topic.id);
    const ready = app.engine.isTopicReady(topic.id);
    const blockers = app.engine.topicBlockers(topic.id);
    const complete = metrics.coreComplete || metrics.validated;
    const nextSession = topic.completion_model.required_core_session_ids
      .map((id) => app.model.sessionById.get(id))
      .find((session) => session && !app.engine.isDone(session.id) && !app.engine.isDisabled(session.id));
    return html`<li class="timeline-item ${complete ? "is-done" : ""} ${!complete && ready ? "is-current" : ""}">
          <span class="timeline-marker">${complete ? icon("check") : index + 1}</span>
          <div class="timeline-body">
            <a class="entity-title" href="#/topics/${topic.id}">${topic.id} — ${topic.title}</a>
            <div class="entity-meta" style="margin-top:.2rem">
              ${areaChip(app.model, topic.area_id)}
              <span class="chip">${topic.status}</span>
              <span>${plural(topic.paperIds.length, "paper")}</span>
              <span>·</span>
              <span>${metrics.coreDone}/${metrics.coreTotal} core sessions</span>
            </div>
            <p class="small muted" style="margin:.35rem 0 0">${truncate(topic.curriculum_role, 150)}</p>
            ${!ready ? html`<p class="small" style="margin:.35rem 0 0;color:var(--warn)">
              Waiting on ${blockers.map((id, position) => html`${position ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)}.</p>` : ""}
            <div style="max-width:220px;margin-top:.45rem">${meter(metrics.coreDone, metrics.coreTotal, complete ? "meter--ok" : "")}</div>
          </div>
          <div class="timeline-aside">
            ${complete ? html`<span class="chip chip--ok">Core complete</span>`
    : ready && nextSession ? html`<a class="button button--secondary button--small" href="#/sessions/${nextSession.id}">Continue</a>`
      : html`<span class="chip chip--warn">Blocked</span>`}
          </div>
        </li>`;
  })}
    </ol>
  </section>`;
};

const areasMode = (app, topics) => html`<div class="stack stack--loose">
  ${app.model.areas.map((area) => {
  const list = topics.filter((topic) => topic.area_id === area.id);
  if (!list.length) return "";
  return html`<section>
      <div class="section-title">
        <h2><span class="chip" data-tone="${AREA_TONE[area.id]}">${area.short_label}</span> ${area.label}</h2>
        <span class="small dim">${plural(list.length, "topic")}</span>
      </div>
      <div class="grid-cards">${list.map((topic) => topicCard(app, topic))}</div>
    </section>`;
})}
</div>`;

const matrixMode = (app, topics) => html`<div class="table-wrap">
  <table class="data">
    <caption class="visually-hidden">Curriculum matrix</caption>
    <thead><tr>
      <th scope="col">Topic</th><th scope="col">Area</th><th scope="col">Status</th>
      <th scope="col">Core</th><th scope="col">Papers</th><th scope="col">Prerequisites</th>
      <th scope="col">Unlocks</th><th scope="col">Readiness</th>
    </tr></thead>
    <tbody>
      ${topics.map((topic) => {
  const metrics = app.engine.topicMetrics(topic.id);
  const ready = app.engine.isTopicReady(topic.id);
  return html`<tr>
          <th scope="row" style="font-weight:600"><a href="#/topics/${topic.id}">${topic.id}</a>
            <span style="display:block;font-weight:450;color:var(--text-2)">${truncate(topic.title, 52)}</span></th>
          <td>${topic.area_short_label}</td>
          <td>${topic.status}</td>
          <td class="numeric">${metrics.coreDone}/${metrics.coreTotal}</td>
          <td class="numeric">${topic.paperIds.length}</td>
          <td>${topic.gatePrerequisites.length
    ? topic.gatePrerequisites.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)
    : html`<span class="dim">none</span>`}</td>
          <td>${topic.downstream.length
    ? topic.downstream.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)
    : html`<span class="dim">none</span>`}</td>
          <td>${metrics.coreComplete || metrics.validated
    ? html`<span class="chip chip--ok">Complete</span>`
    : ready ? html`<span class="chip chip--ok">Ready</span>` : html`<span class="chip chip--warn">Blocked</span>`}</td>
        </tr>`;
})}
    </tbody>
  </table>
</div>`;

export default {
  title: () => "Curriculum — Golem Curriculum",
  render(app, params) {
    const query = params.query || {};
    const mode = MODES[query.mode] ? query.mode : "path";
    const topics = filterTopics(app, query);
    return html`<div class="page">
      <div class="page-head">
        <div class="split-row">
          <div>
            <h1>Curriculum</h1>
            <p class="lead">${app.model.topics.length} topics, ${app.model.sessions.length} sessions and
              ${app.model.data.statistics.hard_prerequisites} reviewed hard prerequisites. Structure is here when you want
              it; it is not what you have to understand first.</p>
          </div>
          <div class="row row--tight">
            <a class="button button--secondary" href="#/papers">Paper library</a>
          </div>
        </div>
      </div>
      ${toolbar(app, query, mode)}
      ${topics.length === 0
    ? emptyState("No topic matches those filters.", '<a class="button button--secondary button--small" href="#/curriculum">Reset</a>')
    : mode === "areas" ? areasMode(app, topics)
      : mode === "matrix" ? matrixMode(app, topics)
        : pathMode(app, topics)}
    </div>`;
  },
};
