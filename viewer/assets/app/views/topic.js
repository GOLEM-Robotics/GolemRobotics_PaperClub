"use strict";

import { html, plural } from "../dom.js";
import { PROFILE } from "../constants.js";
import { crumbs, meter, icon, areaChip, timelineItem, paperRow, emptyState, planToggle } from "../ui.js";

const SECTIONS = [
  ["overview", "Overview"],
  ["sessions", "Sessions"],
  ["papers", "Papers"],
  ["resources", "Resources"],
  ["connections", "Connections"],
  ["notes", "My notes"],
  ["history", "Revision history"],
];

const relationshipCard = (app, edge, direction) => {
  const otherId = direction === "incoming" ? edge.source : edge.target;
  const other = app.model.topicById.get(otherId);
  if (!other) return "";
  const typeLabel = {
    hard_prerequisite: "Hard prerequisite",
    recommended_background: "Recommended background",
    related: "Related",
    feedback: "Feedback / co-development",
  }[edge.type] || edge.type;
  const tone = edge.type === "hard_prerequisite" ? "chip--stop" : edge.type === "recommended_background" ? "chip--warn" : "";
  return html`<div class="entity-row">
    <div class="row row--tight">
      <span class="chip ${tone}">${typeLabel}</span>
      ${edge.scope === "target_sessions"
    ? html`<span class="chip">holds back named sessions only</span>`
    : edge.type === "hard_prerequisite" ? html`<span class="chip">blocks entry</span>` : ""}
    </div>
    <a class="entity-title" style="display:block;margin-top:.3rem" href="#/topics/${other.id}">${other.id} — ${other.title}</a>
    <p class="small muted" style="margin:.3rem 0 0">${edge.rationale}</p>
    ${edge.evidence ? html`<details class="disclosure" style="margin-top:.4rem;background:transparent;border:0">
      <summary style="padding:.2rem 0">Where this was reviewed · confidence ${edge.confidence}</summary>
      <p class="small dim" style="margin:.15rem 0 .3rem">${edge.evidence}</p>
    </details>` : ""}
  </div>`;
};

export default {
  title: (app, params) => {
    const topic = app.model.topicById.get(params.id);
    return topic ? `${topic.id} — ${topic.title}` : "Topic not found";
  },
  render(app, params) {
    const topic = app.model.topicById.get(params.id);
    if (!topic) {
      return html`<div class="page page--narrow">
        ${crumbs([{ label: "Curriculum", href: "#/curriculum" }, { label: "Not found" }])}
        <div class="card">
          <h1>No topic with the identifier “${params.id}”</h1>
          <p class="prose" style="margin-top:.5rem">The curriculum holds ${app.model.topics.length} topics.</p>
          <p style="margin-top:.8rem"><a class="button button--primary" href="#/curriculum">Browse the curriculum</a></p>
        </div>
      </div>`;
    }

    const metrics = app.engine.topicMetrics(topic.id);
    const ready = app.engine.isTopicReady(topic.id);
    const blockers = app.engine.topicBlockers(topic.id);
    const sessions = app.model.sessionsByTopic.get(topic.id) || [];
    const coreIds = new Set(topic.completion_model.required_core_session_ids);
    const nextSession = topic.completion_model.required_core_session_ids
      .map((id) => app.model.sessionById.get(id))
      .find((session) => session && !app.engine.isDone(session.id) && !app.engine.isDisabled(session.id));
    const papers = topic.paperIds.map((id) => app.model.paperById.get(id)).filter(Boolean);
    const resources = topic.resourceIds.map((id) => app.model.resourceById.get(id)).filter(Boolean);
    const frontier = topic.frontierIds.map((id) => app.model.frontierById.get(id)).filter(Boolean);
    const note = (app.state.notes[topic.id] || "").trim();
    const disabled = app.engine.isDisabled(topic.id);
    const continuation = sessions.filter((session) => !coreIds.has(session.id));

    return html`<div class="page page--jumpnav">
      ${crumbs([
    { label: "Curriculum", href: "#/curriculum" },
    { label: topic.area_short_label, href: `#/curriculum?mode=areas&area=${topic.area_id}` },
    { label: topic.id },
  ])}

      <header class="entity-head" style="margin-bottom:1rem">
        <div class="row row--tight" style="margin-bottom:.45rem">
          <span class="chip chip--id">${topic.id}</span>
          ${areaChip(app.model, topic.area_id)}
          <span class="chip">${topic.status}</span>
          ${metrics.coreComplete ? html`<span class="chip chip--ok">Required Core complete</span>`
    : ready ? html`<span class="chip chip--ok">Ready to work</span>`
      : html`<span class="chip chip--warn">Blocked by ${blockers.join(", ")}</span>`}
          ${metrics.validated ? html`<span class="chip chip--ok">Competence validated</span>` : ""}
          ${disabled ? html`<span class="chip chip--stop">Hidden from my route</span>` : ""}
        </div>
        <h1>${topic.title}</h1>
        <p class="lead" style="margin-top:.4rem">${topic.curriculum_role}</p>
      </header>

      <nav class="jumpnav" aria-label="Sections of this topic">
        ${SECTIONS.map(([id, label]) => html`<a href="#/topics/${topic.id}#${id}" data-jump="${id}">${label}</a>`)}
      </nav>

      <div class="split split--wide-rail">
        <div class="stack stack--loose">
          <section id="overview">
            <div class="section-title"><h2>What this topic is for</h2></div>
            <div class="grid-2">
              <div class="card">
                <p class="eyebrow">Scope</p>
                <p class="small muted" style="margin-top:.25rem">${topic.covers}</p>
                <p class="eyebrow" style="margin-top:.7rem">Deliberately excluded</p>
                <p class="small muted" style="margin-top:.25rem">${topic.excludes}</p>
              </div>
              <div class="card">
                <p class="eyebrow">What you should be able to do</p>
                <p class="small muted" style="margin-top:.25rem">${topic.target_competence}</p>
                <p class="eyebrow" style="margin-top:.7rem">Required Core boundary</p>
                <p class="small muted" style="margin-top:.25rem">${topic.completion_boundary}</p>
              </div>
            </div>
            ${topic.foundations?.topic_local ? html`<div class="card" style="margin-top:.75rem">
              <p class="eyebrow">Assumed before you start</p>
              <p class="small muted" style="margin-top:.25rem">${topic.foundations.topic_local}</p>
            </div>` : ""}
          </section>

          <section id="sessions">
            <div class="section-title">
              <h2>Sessions</h2>
              <span class="small dim">${metrics.coreDone}/${metrics.coreTotal} Required Core done</span>
            </div>
            ${!ready ? html`<div class="callout callout--warn" style="margin-bottom:.7rem">
              <strong>${topic.id} has a topic-entry gate.</strong> Finish or validate
              ${blockers.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)}
              first, or record validated competence if you already have it. Sessions stay readable meanwhile.
            </div>` : ""}
            <div class="timeline">
              ${sessions.filter((session) => coreIds.has(session.id))
    .map((session) => timelineItem(app, session, { current: session.id === nextSession?.id, showObjective: true }))}
            </div>
            ${continuation.length ? html`<details class="disclosure" style="margin-top:.8rem">
              <summary>${plural(continuation.length, "optional or frontier session")} beyond the Required Core</summary>
              <div class="disclosure-body">
                <p class="small muted">These never block Required Core completion. Activate one to bring it into your own
                  route and progress counters.</p>
                <div class="timeline" style="margin-top:.6rem">
                  ${continuation.map((session) => html`<div>${timelineItem(app, session, { showObjective: true })}
                    <div class="row" style="margin:.3rem 0 .5rem .5rem">
                      <button type="button" class="link-button small" data-act="toggle-activation" data-id="${session.id}">
                        ${app.state.activatedSessionIds.includes(session.id) ? "Remove from my route" : "Activate in my route"}
                      </button>
                    </div>
                  </div>`)}
                </div>
              </div>
            </details>` : ""}
          </section>

          <section id="papers">
            <div class="section-title">
              <h2>Papers in this topic</h2>
              <a class="link-button small" href="#/papers?topic=${topic.id}">Open in the library</a>
            </div>
            <p class="prose">The order below is the curated lineage, not a bibliography: position 1 to ${papers.length}
              is the sequence the topic teaches them in.
              ${(() => {
    const core = papers.filter((paper) => paper.requiredCore);
    const beyond = papers.filter((paper) => !paper.requiredCore);
    if (!papers.length) return "";
    if (!beyond.length) return html`<strong>All ${papers.length} are studied inside Required Core sessions</strong>, so all of them are essential here.`;
    return html`<strong>${core.length} of ${papers.length} are studied inside Required Core sessions.</strong>
              ${beyond.map((paper) => paper.id).join(", ")} appear only in optional or frontier work.`;
  })()}</p>
            ${papers.length
    ? html`<div class="card card--flush" style="margin-top:.7rem">${papers.map((paper) => paperRow(app, paper, { hideRelevance: app.engine.activeTopic()?.id === topic.id }))}</div>
                <div class="row" style="margin-top:.7rem">
                  <button type="button" class="button button--secondary button--small" data-act="plan-many"
                    data-kind="paper" data-ids="${papers.map((paper) => paper.id).join(",")}">
                    ${icon("plus")} Add all ${papers.length} papers to my plan</button>
                  <button type="button" class="button button--ghost button--small" data-act="compare-set"
                    data-ids="${papers.slice(0, 4).map((paper) => paper.id).join(",")}">${icon("compare")} Compare the first four</button>
                  <button type="button" class="button button--ghost button--small" data-act="queue-papers"
                    data-ids="${papers.map((paper) => paper.id).join(",")}">Mark them all as to read</button>
                </div>`
    : emptyState("No primary paper is owned by this topic.")}
          </section>

          <section id="resources">
            <div class="section-title"><h2>Supporting resources</h2><span class="small dim">${plural(resources.length, "resource")}</span></div>
            ${resources.length ? html`<div class="entity-list">${resources.map((resource) => html`<div class="entity-row">
              <a class="entity-title" href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.title} ${icon("external")}</a>
              <div class="entity-meta" style="margin-top:.2rem">
                <span class="chip chip--id">${resource.id}</span><span class="chip">${resource.type}</span>
              </div>
              <p class="small muted" style="margin:.3rem 0 0">${resource.required_use}</p>
            </div>`)}</div>` : emptyState("No supporting resource is assigned to this topic.")}
            ${frontier.length ? html`<div style="margin-top:.85rem">
              <p class="eyebrow">Frontier material touching this topic</p>
              <div class="entity-list" style="margin-top:.4rem">${frontier.map((item) => html`<div class="entity-row">
                <a class="entity-title" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title} ${icon("external")}</a>
                <div class="entity-meta" style="margin-top:.2rem">
                  <span class="chip chip--id">${item.id}</span>
                  <span class="chip chip--warn">${item.decision}</span>
                  <span>review ${item.review_date}</span>
                </div>
                <p class="small muted" style="margin:.3rem 0 0">${item.reason}</p>
              </div>`)}</div>
            </div>` : ""}
          </section>

          <section id="connections">
            <div class="section-title"><h2>How this connects</h2></div>
            <p class="prose">Four relationship types are distinguished. Only hard prerequisites block entry; the rest
              tell you where an idea came from and where it goes.</p>
            <div class="grid-2" style="margin-top:.8rem;align-items:start">
              <div>
                <p class="eyebrow">Comes before this topic</p>
                <div class="entity-list" style="margin-top:.4rem">
                  ${topic.relationships.incoming.length
    ? topic.relationships.incoming.map((edge) => relationshipCard(app, edge, "incoming"))
    : emptyState("Nothing has to come first.")}
                </div>
              </div>
              <div>
                <p class="eyebrow">Depends on this topic</p>
                <div class="entity-list" style="margin-top:.4rem">
                  ${topic.relationships.outgoing.length
    ? topic.relationships.outgoing.map((edge) => relationshipCard(app, edge, "outgoing"))
    : emptyState("No topic depends on this one yet.")}
                </div>
              </div>
            </div>
          </section>

          <section id="notes">
            <div class="section-title"><h2>My notes on this topic</h2>
              <span class="note-status small dim" data-note-status="${topic.id}"></span></div>
            <div class="note-editor">
              <textarea data-note-for="${topic.id}" rows="7" aria-label="Notes on ${topic.id}"
                placeholder="Synthesis, open questions, what you would test next…">${note}</textarea>
              <p class="small dim">Stored in this browser only.</p>
            </div>
          </section>

          <section id="history">
            <div class="section-title"><h2>Revision history</h2></div>
            <dl class="deflist deflist--inline">
              ${Object.entries(topic.revision_history || {}).map(([key, value]) => html`<div><dt>${key}</dt><dd>${value}</dd></div>`)}
              <div><dt>Literature verification</dt><dd>${topic.literature_verification}</dd></div>
            </dl>
            <p style="margin-top:.7rem"><a class="link-button small" href="${topic.url}" target="_blank" rel="noopener">Canonical topic plan ${icon("external")}</a></p>
          </section>
        </div>

        <aside class="rail stack" aria-label="Topic progress and actions">
          <section class="card">
            <p class="eyebrow">Your progress here</p>
            <div class="stat-grid" style="margin-top:.5rem">
              <div class="stat"><span class="stat-value">${metrics.coreDone}/${metrics.coreTotal}</span><span class="stat-label">Required Core</span></div>
              ${metrics.continuationTotal ? html`<div class="stat"><span class="stat-value">${metrics.continuationDone}/${metrics.continuationTotal}</span><span class="stat-label">Continuation</span></div>` : ""}
              <div class="stat"><span class="stat-value">${metrics.sprintDone}</span><span class="stat-label">Sprint covered</span></div>
            </div>
            <div style="margin-top:.6rem">${meter(metrics.coreDone, metrics.coreTotal, metrics.coreComplete ? "meter--ok" : "")}</div>
            <p class="small dim" style="margin-top:.5rem">
              ${metrics.validated
    ? "You recorded validated competence for this topic, which satisfies it as a prerequisite without rewriting session history."
    : metrics.coreComplete ? "Required Core is complete."
      : html`About <strong>${app.engine.effort(app.engine.remainingCore(topic.id))}</strong> of Required Core remains at your ${PROFILE[app.state.profile].label} profile.`}
            </p>
            <div class="stack stack--tight" style="margin-top:.75rem">
              ${nextSession
    ? html`<a class="button ${ready ? "button--primary" : "button--secondary"} button--block" href="#/sessions/${nextSession.id}">
                    ${ready ? `${metrics.started ? "Continue" : "Start"} — ${nextSession.display_id}` : `Read ahead in ${nextSession.display_id}`}</a>
                  ${ready ? "" : html`<p class="small dim" style="margin:0">You can read this topic now. It counts towards Required
                    Core once ${blockers.join(" and ")} ${blockers.length === 1 ? "is" : "are"} complete or validated.</p>`}`
    : html`<a class="button button--secondary button--block" href="#/topics/${topic.id}#sessions">Review the sessions</a>`}
              ${planToggle(app, "topic", topic.id, { style: "button", block: true, addLabel: "Add this topic to my plan", inLabel: "This topic is in my plan" })}
              <button type="button" class="button button--ghost button--block" data-act="plan-many" data-kind="session"
                data-ids="${topic.completion_model.required_core_session_ids.join(",")}">
                Add its ${topic.completion_model.required_core_session_ids.length} core sessions instead
              </button>
              <button type="button" class="button button--ghost button--block" data-act="set-target" data-kind="topic" data-id="${topic.id}">
                Plan the fastest route here
              </button>
            </div>
          </section>

          <section class="card">
            <p class="eyebrow">Readiness</p>
            <dl class="deflist" style="margin-top:.4rem">
              <div><dt>Topic-entry gates</dt><dd>${topic.hardPrerequisites.length
    ? topic.hardPrerequisites.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>${app.engine.topicMetrics(id).readinessSatisfied ? html` <span class="chip chip--ok">done</span>` : html` <span class="chip chip--warn">outstanding</span>`}`)
    : "None — you can start this topic at any time"}</dd></div>
              <div><dt>Session-scoped gates</dt><dd>${topic.gatePrerequisites.filter((id) => !topic.hardPrerequisites.includes(id)).length
    ? html`${topic.gatePrerequisites.filter((id) => !topic.hardPrerequisites.includes(id)).map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)}
        <span class="small dim" style="display:block">These hold back individual sessions, not the topic.</span>`
    : "None"}</dd></div>
              <div><dt>Recommended background</dt><dd>${topic.recommendedFrom.length
    ? topic.recommendedFrom.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)
    : "None"}</dd></div>
              <div><dt>Unlocks</dt><dd>${topic.downstream.length
    ? topic.downstream.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)
    : "No topic is gated on this one"}</dd></div>
            </dl>
          </section>

          <section class="card">
            <p class="eyebrow">My overlay</p>
            <div class="stack stack--tight" style="margin-top:.45rem">
              <button type="button" class="button button--secondary button--block" data-act="validate-competence" data-id="${topic.id}">
                ${metrics.validated ? "Review my competence record" : "I already know this"}
              </button>
              <button type="button" class="button button--ghost button--block" data-act="toggle-disabled" data-id="${topic.id}">
                ${disabled ? "Re-enable in my route" : "Hide from my route"}
              </button>
              <button type="button" class="button button--ghost button--block" data-act="open-proposal" data-id="${topic.id}" data-kind="topic">
                Propose a curriculum change
              </button>
            </div>
            <p class="small dim" style="margin-top:.55rem">Canonical topics cannot be deleted. Hiding is reversible from
              <a href="#/workspace?tab=hidden">Workspace → Hidden items</a>.</p>
          </section>
        </aside>
      </div>
    </div>`;
  },
};
