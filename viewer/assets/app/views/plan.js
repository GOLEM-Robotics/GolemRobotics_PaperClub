"use strict";

/**
 * The learner's own plan.
 *
 * The canonical curriculum is a reference, not a track. This surface belongs to
 * the learner: an ordered list of what they have decided to do next, which may
 * reference canonical material or contain nothing canonical at all. The
 * curriculum contributes suggestions; it never dictates the contents.
 */

import { html, raw, truncate, plural, relativeTime, formatDate } from "../dom.js";
import { PROFILE } from "../constants.js";
import {
  meter, areaChip, classificationChip, icon, emptyState, roleChip, readStateControl, starButton,
} from "../ui.js";


const quickAdd = () => html`<section class="card" aria-labelledby="quick-add-title">
  <p class="eyebrow">Add to your plan</p>
  <h2 id="quick-add-title" class="card-title" style="margin-bottom:.55rem">What do you want to do next?</h2>
  <form class="quick-add" data-quick-add>
    <label class="visually-hidden" for="quick-add-input">Search the curriculum, or write your own item</label>
    <input id="quick-add-input" type="text" name="q" autocomplete="off" spellcheck="false"
      placeholder="A paper, a session, a topic — or anything of your own">
    <button type="submit" class="button button--primary">Add</button>
  </form>
  <div class="quick-add-results" data-quick-add-results></div>
  <p class="small dim" style="margin-top:.55rem">Anything you type that the curriculum does not recognise is added as your
    own item. Nothing here has to come from the curriculum.</p>
</section>`;

const upNext = (app) => {
  const entry = app.engine.planNext();
  if (!entry) return "";
  const { item } = entry;

  if (item.kind === "paper") {
    const paper = app.model.paperById.get(item.refId);
    const record = app.engine.readingStateOf(paper.id);
    const session = paper.focusSessionId ? app.model.sessionById.get(paper.focusSessionId) : null;
    return html`<section class="card card--accent">
      <div class="row row--between"><p class="eyebrow" style="margin:0">Up next in your plan</p>
        <span class="chip">Paper</span></div>
      <h2 style="font-size:clamp(1.25rem,1rem + 1vw,1.5rem);margin-top:.35rem">${paper.title}</h2>
      <p class="lead" style="margin-top:.35rem">${paper.authors} · ${paper.year}${paper.venue ? ` · ${paper.venue}` : ""}</p>
      <div class="row row--tight" style="margin-top:.5rem">
        <span class="chip chip--id">${paper.id}</span>
        <a class="chip" href="#/topics/${paper.topic_id}">${paper.topic_id}</a>
        ${roleChip(paper)}<span class="chip">${paper.level}</span><span class="chip">${paper.burden} prep</span>
      </div>
      <p class="prose" style="margin-top:.6rem">${paper.contribution}</p>
      ${item.note ? html`<p class="callout" style="margin-top:.6rem"><strong>Your note:</strong> ${item.note}</p>` : ""}
      <div class="row" style="margin-top:.9rem">
        <a class="button button--primary" href="${paper.url}" target="_blank" rel="noopener noreferrer">Open the paper ${icon("external")}</a>
        <a class="button button--secondary" href="#/papers/${paper.id}">Its page in the workspace</a>
        ${session ? html`<a class="button button--ghost" href="#/sessions/${session.id}">The session that studies it</a>` : ""}
        <span class="row row--tight">${readStateControl(paper.id, record)}${starButton(paper.id, record.starred)}</span>
      </div>
    </section>`;
  }

  if (item.kind === "session") {
    const session = app.model.sessionById.get(item.refId);
    const topic = app.model.topicById.get(session.topic_id);
    const ready = app.engine.isSessionReady(session);
    return html`<section class="card card--accent">
      <div class="row row--between"><p class="eyebrow" style="margin:0">Up next in your plan</p>
        ${ready ? html`<span class="chip chip--ok">Ready</span>` : html`<span class="chip chip--warn">Prerequisites outstanding</span>`}</div>
      <h2 style="font-size:clamp(1.25rem,1rem + 1vw,1.5rem);margin-top:.35rem">${session.title}</h2>
      <div class="row row--tight" style="margin-top:.45rem">
        <span class="chip chip--id">${session.display_id}</span>
        <a class="chip" href="#/topics/${topic.id}">${topic.id}</a>
        ${areaChip(app.model, topic.area_id)}
        ${classificationChip(session.classification)}
      </div>
      <p class="prose" style="margin-top:.6rem">${session.objective}</p>
      ${item.note ? html`<p class="callout" style="margin-top:.6rem"><strong>Your note:</strong> ${item.note}</p>` : ""}
      <div class="row" style="margin-top:.9rem">
        <a class="button button--primary" href="#/sessions/${session.id}">Open this session ${icon("arrowRight")}</a>
        <button type="button" class="button button--secondary" data-act="set-status" data-id="${session.id}" data-status="completed">Mark it done</button>
      </div>
    </section>`;
  }

  if (item.kind === "topic") {
    const topic = app.model.topicById.get(item.refId);
    const metrics = app.engine.topicMetrics(topic.id);
    const nextSession = topic.completion_model.required_core_session_ids
      .map((id) => app.model.sessionById.get(id))
      .find((session) => session && !app.engine.isDone(session.id) && !app.engine.isDisabled(session.id));
    return html`<section class="card card--accent">
      <div class="row row--between"><p class="eyebrow" style="margin:0">Up next in your plan</p><span class="chip">Topic</span></div>
      <h2 style="font-size:clamp(1.25rem,1rem + 1vw,1.5rem);margin-top:.35rem">${topic.id} — ${topic.title}</h2>
      <p class="prose" style="margin-top:.5rem">${topic.curriculum_role}</p>
      <div style="max-width:340px;margin-top:.6rem">${meter(metrics.coreDone, metrics.coreTotal)}</div>
      <p class="small dim" style="margin-top:.3rem">${metrics.coreDone}/${metrics.coreTotal} Required Core sessions ·
        about ${app.engine.effort(app.engine.remainingCore(topic.id))} left at your ${PROFILE[app.state.profile].label} profile.</p>
      ${item.note ? html`<p class="callout" style="margin-top:.6rem"><strong>Your note:</strong> ${item.note}</p>` : ""}
      <div class="row" style="margin-top:.9rem">
        <a class="button button--primary" href="#/topics/${topic.id}">Open the topic ${icon("arrowRight")}</a>
        ${nextSession ? html`<a class="button button--secondary" href="#/sessions/${nextSession.id}">Go to ${nextSession.display_id}</a>` : ""}
      </div>
    </section>`;
  }

  if (item.kind === "resource") {
    const resource = app.model.resourceById.get(item.refId);
    return html`<section class="card card--accent">
      <div class="row row--between"><p class="eyebrow" style="margin:0">Up next in your plan</p><span class="chip">Resource</span></div>
      <h2 style="font-size:clamp(1.2rem,1rem + 1vw,1.45rem);margin-top:.35rem">${resource.title}</h2>
      <p class="prose" style="margin-top:.5rem">${resource.required_use}</p>
      <div class="row" style="margin-top:.9rem">
        <a class="button button--primary" href="${resource.url}" target="_blank" rel="noopener noreferrer">Open it ${icon("external")}</a>
        <button type="button" class="button button--secondary" data-act="toggle-plan-done" data-id="${item.id}">Mark it done</button>
      </div>
    </section>`;
  }

  return html`<section class="card card--accent">
    <div class="row row--between"><p class="eyebrow" style="margin:0">Up next in your plan</p>
      <span class="chip chip--personal">Your own item</span></div>
    <h2 style="font-size:clamp(1.25rem,1rem + 1vw,1.5rem);margin-top:.35rem">${item.title}</h2>
    ${item.note ? html`<p class="prose" style="margin-top:.5rem">${item.note}</p>` : ""}
    <div class="row" style="margin-top:.9rem">
      <button type="button" class="button button--primary" data-act="toggle-plan-done" data-id="${item.id}">${icon("check")} Mark it done</button>
      <button type="button" class="button button--ghost" data-act="edit-plan-note" data-id="${item.id}">Add a note</button>
    </div>
  </section>`;
};

const planRow = (app, entry, index, count) => {
  const { item, done } = entry;
  const isNext = !done && app.engine.planNext()?.item.id === item.id;
  let title = item.title;
  let href = null;
  let meta = raw("");

  if (item.kind === "paper") {
    const paper = app.model.paperById.get(item.refId);
    title = paper.title;
    href = `#/papers/${paper.id}`;
    meta = html`<span class="chip chip--id">${paper.id}</span>
      <a class="chip" href="#/topics/${paper.topic_id}">${paper.topic_id}</a>
      <span>${paper.year}</span><span>·</span><span>${paper.burden} prep</span>`;
  } else if (item.kind === "session") {
    const session = app.model.sessionById.get(item.refId);
    title = session.title;
    href = `#/sessions/${session.id}`;
    meta = html`<span class="chip chip--id">${session.display_id}</span>
      <a class="chip" href="#/topics/${session.topic_id}">${session.topic_id}</a>
      ${classificationChip(session.classification)}
      ${app.engine.isSessionReady(session) ? "" : html`<span class="chip chip--warn">prerequisites outstanding</span>`}`;
  } else if (item.kind === "topic") {
    const topic = app.model.topicById.get(item.refId);
    const metrics = app.engine.topicMetrics(topic.id);
    title = `${topic.id} — ${topic.title}`;
    href = `#/topics/${topic.id}`;
    meta = html`<span class="chip">Topic</span><span>${metrics.coreDone}/${metrics.coreTotal} core sessions</span>`;
  } else if (item.kind === "resource") {
    const resource = app.model.resourceById.get(item.refId);
    title = resource.title;
    href = "#/resources";
    meta = html`<span class="chip chip--id">${resource.id}</span><span class="chip">${resource.type}</span>`;
  } else {
    meta = html`<span class="chip chip--personal">Your own item</span>`;
  }

  // A canonical item is ticked off by the record that already exists for it,
  // so the control here is that record's own control rather than a second one.
  let tick;
  if (item.kind === "custom" || item.kind === "resource") {
    tick = html`<input type="checkbox" class="plan-check" ${done ? raw("checked") : ""}
      data-act="toggle-plan-done" data-id="${item.id}"
      aria-label="${done ? "Mark not done" : "Mark done"}: ${title}">`;
  } else if (item.kind === "paper") {
    tick = html`<span class="plan-tick">${readStateControl(item.refId, app.engine.readingStateOf(item.refId))}</span>`;
  } else if (item.kind === "session") {
    tick = html`<button type="button" class="plan-check plan-check--button" data-act="set-status" data-id="${item.refId}"
      data-status="${done ? "not_started" : "completed"}" aria-pressed="${done ? "true" : "false"}"
      aria-label="${done ? "Mark not completed" : "Mark completed"}: ${title}"
      title="${done ? "Mark this session not completed" : "Mark this session completed"}">${done ? icon("check") : ""}</button>`;
  } else {
    const metrics = app.engine.topicMetrics(item.refId);
    tick = html`<span class="plan-tick small dim" title="A topic is finished when its Required Core is"
      style="white-space:nowrap">${metrics.coreDone}/${metrics.coreTotal}</span>`;
  }

  return html`<li class="plan-item ${done ? "is-done" : ""} ${isNext ? "is-next" : ""}">
    ${tick}
    <div style="min-width:0">
      ${href ? html`<a class="plan-title" href="${href}">${title}</a>` : html`<span class="plan-title">${title}</span>`}
      <div class="entity-meta" style="margin-top:.2rem">${meta}<span class="dim">added ${relativeTime(item.addedAt)}</span></div>
      ${item.note ? html`<p class="small muted" style="margin:.3rem 0 0">${item.note}</p>` : ""}
    </div>
    <div class="plan-actions">
      <button type="button" class="button button--ghost button--small" data-act="move-plan" data-id="${item.id}" data-dir="-1"
        aria-label="Move ${truncate(title, 30)} earlier" ${index === 0 ? raw("disabled") : ""}>↑</button>
      <button type="button" class="button button--ghost button--small" data-act="move-plan" data-id="${item.id}" data-dir="1"
        aria-label="Move ${truncate(title, 30)} later" ${index === count - 1 ? raw("disabled") : ""}>↓</button>
      <button type="button" class="button button--ghost button--small" data-act="edit-plan-note" data-id="${item.id}"
        aria-label="Note on ${truncate(title, 30)}">${icon("note")}</button>
      <button type="button" class="button button--ghost button--small" data-act="remove-plan" data-id="${item.id}"
        aria-label="Remove ${truncate(title, 30)} from my plan">✕</button>
    </div>
  </li>`;
};

const planList = (app) => {
  const entries = app.engine.planEntries();
  const open = entries.filter((entry) => !entry.done);
  const done = entries.filter((entry) => entry.done);
  const progress = app.engine.planProgress();

  if (!entries.length) {
    return html`<section>
      <div class="section-title"><h2>Your plan</h2></div>
      ${emptyState(html`Your plan is empty. Add anything above, or take one of the curriculum's suggestions below.
        The curriculum is a reference you can borrow from — you are not required to follow it.`.value)}
    </section>`;
  }

  return html`<section>
    <div class="section-title">
      <h2>Your plan</h2>
      <span class="small dim">${progress.done} of ${progress.total} done</span>
    </div>
    <div style="max-width:320px;margin-bottom:.75rem">${meter(progress.done, progress.total, progress.done === progress.total ? "meter--ok" : "")}</div>
    ${open.length
    ? html`<ol class="entity-list" style="list-style:none;padding:0;margin:0">
        ${open.map((entry, index) => planRow(app, entry, index, open.length))}
      </ol>`
    : html`<div class="callout callout--ok">Everything in your plan is done. Add what comes next, or borrow a suggestion below.</div>`}
    ${done.length ? html`<details class="disclosure" style="margin-top:.8rem" ${app.state.planCollapsedDone ? "" : raw("open")}>
      <summary>${plural(done.length, "finished item")}</summary>
      <div class="disclosure-body">
        <ol class="entity-list" style="list-style:none;padding:0;margin:0">
          ${done.map((entry, index) => planRow(app, entry, index, done.length))}
        </ol>
      </div>
    </details>` : ""}
  </section>`;
};

const suggestions = (app) => {
  const recommendations = app.engine.recommendations(3)
    .filter(({ session }) => !app.engine.inPlan("session", session.id));
  const reading = app.engine.readingSuggestions(4)
    .filter(({ paper }) => !app.engine.inPlan("paper", paper.id));
  if (!recommendations.length && !reading.length) return "";

  return html`<section>
    <div class="section-title">
      <h2>What the curriculum would suggest</h2>
      <a class="link-button small" href="#/curriculum">Browse it yourself</a>
    </div>
    <p class="prose">These are proposals from the reviewed curriculum, ordered by prerequisite readiness. Take one, take
      several, or ignore them entirely — nothing is added to your plan unless you say so.</p>

    ${recommendations.length ? html`<div class="entity-list" style="margin-top:.8rem">
      ${recommendations.map(({ session, reasons, topic }) => html`<div class="entity-row">
        <div class="split-row">
          <div class="grow">
            <a class="entity-title" href="#/sessions/${session.id}">${session.title}</a>
            <div class="entity-meta" style="margin-top:.2rem">
              <span class="chip chip--id">${session.display_id}</span>
              <a class="chip" href="#/topics/${topic.id}">${topic.id}</a>
              ${classificationChip(session.classification)}
            </div>
            <ul class="reasons" style="margin-top:.4rem">${reasons.slice(0, 3).map((reason) => html`<li>${reason}</li>`)}</ul>
          </div>
          <div class="row row--tight">
            <button type="button" class="button button--secondary button--small" data-act="toggle-plan"
              data-kind="session" data-ref="${session.id}">${icon("plus")} Add to my plan</button>
            <a class="button button--ghost button--small" href="#/sessions/${session.id}">Open</a>
          </div>
        </div>
      </div>`)}
    </div>` : ""}

    ${reading.length ? html`<div style="margin-top:1rem">
      <p class="eyebrow">Papers it would put in front of you</p>
      <div class="entity-list" style="margin-top:.4rem">
        ${reading.map(({ paper, reason }) => html`<div class="entity-row">
          <div class="split-row">
            <div class="grow">
              <a class="entity-title" href="#/papers/${paper.id}">${paper.title}</a>
              <div class="entity-meta" style="margin-top:.2rem">
                <span class="chip chip--id">${paper.id}</span>
                <a class="chip" href="#/topics/${paper.topic_id}">${paper.topic_id}</a>
                <span>${paper.year}</span>${roleChip(paper)}
              </div>
              <p class="small dim" style="margin:.3rem 0 0">${reason}</p>
            </div>
            <button type="button" class="button button--secondary button--small" data-act="toggle-plan"
              data-kind="paper" data-ref="${paper.id}">${icon("plus")} Add to my plan</button>
          </div>
        </div>`)}
      </div>
    </div>` : ""}
  </section>`;
};

const orientation = (app) => {
  if (app.state.onboardingDismissed) return "";
  const started = app.state.plan.length > 0
    || Object.keys(app.state.entityStatus).length > 0
    || Object.keys(app.state.paperState).length > 0;
  if (started) return "";
  return html`<section class="card card--accent" style="margin-bottom:1.1rem" role="region" aria-labelledby="orient-title">
    <div class="split-row">
      <div>
        <p class="eyebrow">First visit</p>
        <p id="orient-title" class="card-title" style="font-weight:640">A reference curriculum, and a plan that is yours</p>
      </div>
      <button type="button" class="link-button link-button--quiet small" data-act="dismiss-onboarding">Hide this</button>
    </div>
    <div class="grid-2" style="margin-top:.7rem">
      <div>
        <p class="eyebrow">1 · What is here</p>
        <p class="small muted">${app.model.papers.length} primary papers organised into ${app.model.topics.length} topics and
          ${app.model.sessions.length} sessions by people who read them. It is a reviewed map of the field — a reference,
          not a syllabus you have to complete.</p>
      </div>
      <div>
        <p class="eyebrow">2 · Make it yours</p>
        <p class="small muted">Browse the papers, then put what you actually intend to read into your own plan. Add your
          own papers and goals too. The curriculum will suggest things; you decide what goes in.</p>
      </div>
      <div>
        <p class="eyebrow">3 · Or let it lead</p>
        <p class="small muted">If you would rather be guided, take the suggestion below and pick a speed. Guided is
          complete and slow, Accelerated compresses preparation, AI Sprint gets you operational fast.</p>
        <p style="margin:.4rem 0 0"><a class="link-button small" href="#/place">I found a paper — where does it fit?</a></p>
      </div>
    </div>
  </section>`;
};

const profileCard = (app) => html`<section class="card" aria-labelledby="profile-heading">
  <p class="eyebrow">Learning profile</p>
  <h2 id="profile-heading" class="card-title" style="margin-bottom:.5rem">How fast, and at what cost</h2>
  <div class="stack stack--tight" role="radiogroup" aria-label="Learning profile">
    ${Object.values(PROFILE).map((profile) => {
  const active = app.state.profile === profile.id;
  return html`<button type="button" role="radio" aria-checked="${active ? "true" : "false"}"
      class="card ${active ? "card--accent" : "card--quiet"}"
      style="text-align:left;cursor:pointer;padding:.6rem .7rem;font:inherit;color:inherit"
      data-act="set-profile" data-profile="${profile.id}">
      <span class="row row--between" style="gap:.5rem">
        <strong style="font-size:var(--fs-sm)">${profile.label}</strong>
        <span class="small dim">${profile.minutes[0]}–${profile.minutes[1]} min</span>
      </span>
      <span class="small muted" style="display:block;margin-top:.15rem">${profile.tagline}</span>
    </button>`;
})}
  </div>
  <p class="small muted" style="margin-top:.6rem">${PROFILE[app.state.profile].description}</p>
</section>`;

const targetCard = (app) => {
  const target = app.state.target;
  const targetTopic = app.engine.targetTopicId();
  const outstanding = targetTopic ? app.engine.routeSessions(targetTopic) : [];
  return html`<section class="card">
    <p class="eyebrow">Target</p>
    <h2 class="card-title" style="margin-bottom:.4rem">${target ? "Working toward" : "Aim at something specific"}</h2>
    ${target
    ? html`<p class="small" style="margin:0"><a href="${app.hrefFor(target.id)}">${app.engine.targetLabel()}</a></p>
        <p class="small dim" style="margin:.4rem 0 0">${plural(outstanding.length, "Required Core session")} on the shortest
          valid route — about ${app.engine.effort(outstanding.length)}.</p>
        <div class="row" style="margin-top:.6rem">
          <button type="button" class="button button--secondary button--small" data-act="plan-route">Add the route to my plan</button>
          <button type="button" class="button button--ghost button--small" data-act="open-target">Change</button>
          <button type="button" class="button button--ghost button--small" data-act="clear-target">Clear</button>
        </div>`
    : html`<p class="small muted" style="margin:0">Name a topic, a session or a single paper and the shortest valid
        prerequisite path is worked out from what you have already done. You can then drop that route into your plan.</p>
        <button type="button" class="button button--secondary button--small" style="margin-top:.6rem" data-act="open-target">Choose a target</button>`}
  </section>`;
};

const progressCard = (app) => {
  const progress = app.engine.overallProgress();
  const plan = app.engine.planProgress();
  const active = app.engine.activeTopic();
  return html`<section class="card">
    <p class="eyebrow">Where you are</p>
    <div class="stat-grid" style="margin-top:.4rem">
      <div class="stat"><span class="stat-value">${plan.done}/${plan.total}</span><span class="stat-label">My plan</span></div>
      <div class="stat"><span class="stat-value">${progress.papersRead}</span><span class="stat-label">Papers read</span></div>
      <div class="stat"><span class="stat-value">${progress.coreDone}</span><span class="stat-label">Core sessions</span></div>
    </div>
    ${active ? html`<div style="margin-top:.75rem">
      <p class="small muted" style="margin:0 0 .25rem">Most recently inside
        <a href="#/topics/${active.id}">${active.id} — ${truncate(active.title, 40)}</a></p>
      ${meter(app.engine.topicMetrics(active.id).coreDone, app.engine.topicMetrics(active.id).coreTotal)}
    </div>` : ""}
    <p class="small dim" style="margin-top:.65rem">Canonical Required Core is tracked separately from your plan:
      ${progress.coreDone} of ${progress.core} across all ${app.model.topics.length} topics.
      <a href="#/workspace">See the full record</a>.</p>
  </section>`;
};

const recentCard = (app) => {
  const recent = app.state.recentActivity.slice(0, 6);
  if (!recent.length) return "";
  return html`<section class="card">
    <p class="eyebrow">Recent work</p>
    <ul style="list-style:none;padding:0;margin:.4rem 0 0" class="stack stack--tight">
      ${recent.map((entry) => html`<li class="small">
        <a href="${app.hrefFor(entry.entityId)}">${truncate(entry.label, 56)}</a>
        <span class="dim"> · ${relativeTime(entry.at)}</span>
      </li>`)}
    </ul>
  </section>`;
};

const provenanceCard = (app) => {
  const provenance = app.model.data.provenance;
  return html`<section class="card">
    <p class="eyebrow">Curriculum provenance</p>
    <dl class="deflist" style="margin-top:.4rem">
      <div><dt>Version</dt><dd>${app.model.data.curriculum_version}</dd></div>
      <div><dt>Literature cutoff</dt><dd>${provenance.literature_cutoff}</dd></div>
      <div><dt>Last exhaustive audit</dt><dd>${formatDate(provenance.last_exhaustive_audit)}</dd></div>
      <div><dt>Source revision</dt><dd><code>${app.model.data.source_revision.slice(0, 12)}</code></dd></div>
    </dl>
    <p style="margin-top:.55rem"><a class="link-button small" href="#/reference">Inspect the sources ${icon("arrowRight")}</a></p>
  </section>`;
};

export default {
  title: () => "My plan — Golem Curriculum",
  render(app) {
    const progress = app.engine.planProgress();
    return html`<div class="page">
      <div class="page-head">
        <h1>My plan</h1>
        <p class="lead">${progress.total
    ? html`${progress.done} of ${progress.total} done. The curriculum below is a reference you can borrow from — this list
        is yours to order, annotate and ignore.`
    : html`What you have decided to do next. The curriculum is a reference you can borrow from; nothing lands here
        unless you put it here.`}</p>
      </div>
      ${raw(orientation(app))}
      <div class="split split--wide-rail">
        <div class="stack stack--loose">
          ${raw(upNext(app))}
          ${raw(quickAdd())}
          ${raw(planList(app))}
          ${raw(suggestions(app))}
        </div>
        <aside class="rail stack" aria-label="Your setup">
          ${raw(profileCard(app))}
          ${raw(targetCard(app))}
          ${raw(progressCard(app))}
          ${raw(recentCard(app))}
          ${raw(provenanceCard(app))}
        </aside>
      </div>
    </div>`;
  },
};
