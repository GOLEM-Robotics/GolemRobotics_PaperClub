"use strict";

import { html, raw, truncate, plural } from "../dom.js";
import { PROFILE, STATUS_LABEL } from "../constants.js";
import {
  crumbs, icon, areaChip, classificationChip, roleChip, readStateControl, starButton,
  emptyState, profileSummary, planToggle,
} from "../ui.js";
import { SESSION_INTENTS } from "../prompts.js";

const STEPS = {
  guided: (session, sources) => [
    `Read ${sources} from motivation through evidence, recording notation and claims you cannot yet justify.`,
    "Reconstruct the mechanism in your own notation before you consult any summary.",
    `Complete the planned work: ${session.planned_component}`,
    "Use the competence statement as a self-test, and only mark it validated after reviewing your own evidence.",
  ],
  accelerated: (session, sources) => [
    `Read the abstract, method, decisive experiments and limitations in ${sources}; expand only where your reconstruction fails.`,
    "Write down the central assumption, the mechanism, the strongest evidence and the strongest unresolved limitation.",
    `Keep the required artifact even though preparation is compressed: ${session.artifact || "the planned evidence"}.`,
    "Do not treat speed as validation — the evidence boundary is unchanged.",
  ],
  ai_sprint: (session, sources) => [
    "Run the generated prompts to expose the method, assumptions and likely failure modes.",
    `Check every generated technical claim directly against ${sources}.`,
    "Answer the understanding check without your notes, then correct yourself from the source.",
    `Record what you did not personally verify, then mark Sprint coverage — not Required Core completion.`,
  ],
};

const readinessSection = (app, session) => {
  const blockers = app.engine.sessionBlockers(session);
  const priors = session.readiness.prior_session_ids.map((id) => app.model.sessionById.get(id)).filter(Boolean);
  const gates = session.relationship_gates.map((id) => app.model.relationshipById.get(id)).filter(Boolean);
  const gateSources = new Set(gates.map((edge) => edge.source));
  const entryGates = app.model.hardIncoming.get(session.topic_id) || [];
  const ready = app.engine.isSessionReady(session);
  return html`<section id="readiness">
    <div class="section-title"><h2>Readiness</h2>
      ${ready ? html`<span class="chip chip--ok">Everything required is in place</span>`
    : html`<span class="chip chip--warn">${plural(blockers.length, "item")} outstanding</span>`}</div>
    ${session.readiness.raw ? html`<p class="prose">Canonical prerequisite note: ${session.readiness.raw}</p>` : ""}
    <div class="entity-list" style="margin-top:.7rem">
      ${priors.map((prior) => {
    const status = app.engine.statusOf(prior.id);
    const done = status === "completed";
    const hidden = app.engine.isDisabled(prior.id);
    return html`<div class="entity-row ${done ? "is-done" : ""}">
          <div class="row row--between">
            <div class="grow">
              <a class="entity-title" href="#/sessions/${prior.id}">${prior.display_id} — ${prior.title}</a>
              <div class="entity-meta"><span>Earlier session in ${prior.topic_id}</span></div>
            </div>
            <div class="row row--tight">
              ${done ? html`<span class="chip chip--ok">Completed</span>`
    : hidden ? html`<span class="chip">Hidden — treated as satisfied</span>`
      : html`<span class="chip chip--warn">${STATUS_LABEL[status]}</span>
                    <button type="button" class="button button--ghost button--small" data-act="set-status" data-id="${prior.id}" data-status="completed">Mark done</button>`}
            </div>
          </div>
        </div>`;
  })}
      ${gates.map((edge) => {
    const topic = app.model.topicById.get(edge.source);
    const satisfied = app.engine.topicMetrics(edge.source)?.readinessSatisfied;
    return html`<div class="entity-row ${satisfied ? "is-done" : ""}">
          <div class="row row--between">
            <div class="grow">
              <a class="entity-title" href="#/topics/${topic.id}">${topic.id} — ${topic.title}</a>
              <p class="small muted" style="margin:.25rem 0 0">${edge.rationale}</p>
            </div>
            <div class="row row--tight">
              ${satisfied ? html`<span class="chip chip--ok">Satisfied</span>`
    : html`<span class="chip chip--stop">Blocking</span>
                  <button type="button" class="button button--ghost button--small" data-act="validate-competence" data-id="${topic.id}">I already know this</button>`}
            </div>
          </div>
        </div>`;
  })}
      ${entryGates.filter((id) => !gateSources.has(id)).map((topicId) => {
    const topic = app.model.topicById.get(topicId);
    const satisfied = app.engine.topicMetrics(topicId)?.readinessSatisfied;
    return html`<div class="entity-row ${satisfied ? "is-done" : ""}">
          <div class="row row--between">
            <div class="grow">
              <a class="entity-title" href="#/topics/${topic.id}">${topic.id} — ${topic.title}</a>
              <p class="small muted" style="margin:.25rem 0 0">A topic-entry gate: ${session.topic_id} cannot be entered until
                ${topic.id} is complete or you record validated competence for it.</p>
            </div>
            <div class="row row--tight">
              ${satisfied ? html`<span class="chip chip--ok">Satisfied</span>`
    : html`<span class="chip chip--stop">Blocking</span>
                  <button type="button" class="button button--ghost button--small" data-act="validate-competence" data-id="${topic.id}">I already know this</button>`}
            </div>
          </div>
        </div>`;
  })}
      ${!priors.length && !gates.length && !entryGates.length ? emptyState("Nothing formally gates this session.") : ""}
    </div>
  </section>`;
};

const sourceCard = (app, item, kind) => {
  if (kind === "paper") {
    const record = app.engine.readingStateOf(item.id);
    return html`<article class="source-card is-primary">
      <div class="split-row">
        <div class="grow">
          <div class="row row--tight">
            <span class="chip chip--id">${item.id}</span>
            ${roleChip(item)}
            <span class="chip">${item.level}</span>
            <span class="chip">${item.burden} prep</span>
          </div>
          <h3 class="card-title" style="margin-top:.35rem"><a href="#/papers/${item.id}">${item.title}</a></h3>
          <p class="small dim" style="margin:.2rem 0 0">${item.authors} · ${item.year}${item.venue ? ` · ${item.venue}` : ""}</p>
        </div>
        <div class="row row--tight">${readStateControl(item.id, record)}${starButton(item.id, record.starred)}</div>
      </div>
      <dl class="deflist deflist--inline">
        <div><dt>Why it is assigned</dt><dd>${item.contribution}</dd></div>
        <div><dt>What to read</dt><dd>${item.preparation || "No section restriction is recorded; read it in full."}</dd></div>
        <div><dt>Known limitation</dt><dd>${item.limitation || "None recorded."}</dd></div>
      </dl>
      <div class="row row--tight">
        <a class="button button--secondary button--small" href="${item.url}" target="_blank" rel="noopener noreferrer">Open the paper ${icon("external")}</a>
        ${item.codeURL ? html`<a class="button button--ghost button--small" href="${item.codeURL}" target="_blank" rel="noopener noreferrer">${icon("code")} Code</a>` : ""}
        <a class="button button--ghost button--small" href="#/papers/${item.id}">Full paper page</a>
        <button type="button" class="button button--ghost button--small" data-act="open-note" data-id="${item.id}">Note</button>
      </div>
    </article>`;
  }
  const label = kind === "resource" ? item.type : `Frontier · ${item.decision}`;
  const why = kind === "resource" ? item.required_use : item.reason;
  return html`<article class="source-card">
    <div class="row row--tight">
      <span class="chip chip--id">${item.id}</span><span class="chip">${label}</span>
      ${kind === "resource" ? html`<span class="chip ${item.status === "Current" ? "chip--ok" : "chip--warn"}">${item.status}</span>` : ""}
    </div>
    <h3 class="card-title" style="margin-top:.3rem">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title} ${icon("external")}</a></h3>
    <p class="small muted" style="margin:.25rem 0 0">${why}</p>
    <div class="row row--tight">
      <button type="button" class="button button--ghost button--small" data-act="open-note" data-id="${item.id}">Note</button>
      <button type="button" class="button button--ghost button--small" data-act="toggle-disabled" data-id="${item.id}">
        ${app.engine.isDisabled(item.id) ? "Re-enable" : "Hide from my path"}</button>
    </div>
  </article>`;
};

export default {
  title: (app, params) => {
    const session = app.model.sessionById.get(params.id) || app.model.sessionById.get(app.model.aliasToStable.get(params.id));
    return session ? `${session.display_id} — ${session.title}` : "Session not found";
  },
  render(app, params) {
    const resolved = app.model.sessionById.has(params.id)
      ? params.id
      : app.model.aliasToStable.get(params.id);
    const session = app.model.sessionById.get(resolved);
    if (!session) {
      return html`<div class="page page--narrow">
        ${crumbs([{ label: "Curriculum", href: "#/curriculum" }, { label: "Not found" }])}
        <div class="card">
          <h1>No session with the identifier “${params.id}”</h1>
          <p class="prose" style="margin-top:.5rem">Sessions use durable identifiers such as
            <code>SES-…</code>; the older <code>F1-S02</code> style still resolves as an alias.</p>
          <p style="margin-top:.8rem"><a class="button button--primary" href="#/curriculum">Browse the curriculum</a></p>
        </div>
      </div>`;
    }

    const topic = app.model.topicById.get(session.topic_id);
    const status = app.engine.statusOf(session.id);
    const ready = app.engine.isSessionReady(session);
    const disabled = app.engine.isDisabled(session.id);
    const profile = PROFILE[app.state.profile];
    const papers = session.papers.map((id) => app.model.paperById.get(id)).filter(Boolean);
    const resources = session.resources.map((id) => app.model.resourceById.get(id)).filter(Boolean);
    const frontier = session.frontier_items.map((id) => app.model.frontierById.get(id)).filter(Boolean);
    const sourceNames = papers.length ? papers.map((paper) => paper.id).join(", ") : "the topic's prior primary sources";
    const note = (app.state.notes[session.id] || "").trim();
    const quarantined = session.classification === "Quarantined";
    const previous = session.previousSessionId ? app.model.sessionById.get(session.previousSessionId) : null;
    const next = session.followingSessionId ? app.model.sessionById.get(session.followingSessionId) : null;
    const activatable = ["Frontier Continuation", "Optional Specialization"].includes(session.classification);

    return html`<div class="page">
      ${crumbs([
    { label: "Curriculum", href: "#/curriculum" },
    { label: `${topic.id} — ${truncate(topic.title, 34)}`, href: `#/topics/${topic.id}` },
    { label: session.display_id },
  ])}

      <header class="entity-head" style="margin-bottom:1rem">
        <div class="row row--tight" style="margin-bottom:.45rem">
          <span class="chip chip--id">${session.display_id}</span>
          ${classificationChip(session.classification)}
          ${areaChip(app.model, topic.area_id)}
          <span class="chip">Session ${session.positionInTopic} of ${session.topicSessionCount}</span>
          ${status === "completed" ? html`<span class="chip chip--ok">Completed</span>`
    : status === "in_progress" ? html`<span class="chip chip--warn">In progress</span>`
      : ready ? html`<span class="chip chip--ok">Ready</span>` : html`<span class="chip chip--stop">Blocked</span>`}
          ${app.state.sprintCovered.includes(session.id) ? html`<span class="chip chip--sprint">Sprint covered</span>` : ""}
          ${disabled ? html`<span class="chip chip--stop">Hidden from my path</span>` : ""}
        </div>
        <h1>${session.title}</h1>
        <p class="lead" style="margin-top:.4rem">${session.stage}</p>
      </header>

      ${quarantined ? html`<div class="callout callout--stop" style="margin-bottom:1rem">
        <strong>Quarantined record.</strong> This slot is kept visible for identity stability, but it earns no curriculum
        credit until its intended source is verified.</div>` : ""}

      <div class="split split--wide-rail">
        <div class="stack stack--loose">
          <section id="why" class="card card--accent">
            <p class="eyebrow">Why this session exists</p>
            <p class="prose" style="margin-top:.3rem;font-size:var(--fs-md)">${session.objective}</p>
            <div class="row row--tight" style="margin-top:.7rem">
              ${previous ? html`<a class="chip" href="#/sessions/${previous.id}">${icon("arrowLeft")} after ${previous.display_id}</a>` : ""}
              ${next ? html`<a class="chip" href="#/sessions/${next.id}">before ${next.display_id} ${icon("arrowRight")}</a>` : ""}
              <a class="chip" href="#/topics/${topic.id}">Topic goal: ${truncate(topic.target_competence, 60)}</a>
            </div>
          </section>

          ${raw(readinessSection(app, session))}

          <section id="sources">
            <div class="section-title"><h2>Sources</h2>
              <span class="small dim">${plural(papers.length, "primary paper")}, ${plural(resources.length + frontier.length, "supporting item")}</span></div>
            ${papers.length || resources.length || frontier.length
    ? html`<div class="stack">
                ${papers.map((paper) => sourceCard(app, paper, "paper"))}
                ${resources.map((resource) => sourceCard(app, resource, "resource"))}
                ${frontier.map((item) => sourceCard(app, item, "frontier"))}
              </div>`
    : emptyState("No new source is assigned. This session works from what the preceding sessions established.")}
            <div class="row" style="margin-top:.7rem">
              ${papers.length > 1 ? html`<button type="button" class="button button--secondary button--small"
                data-act="compare-set" data-ids="${papers.slice(0, 4).map((paper) => paper.id).join(",")}">
                ${icon("compare")} Compare these ${Math.min(papers.length, 4)} sources</button>` : ""}
              ${papers.length ? html`<button type="button" class="button button--secondary button--small"
                data-act="plan-many" data-kind="paper" data-ids="${papers.map((paper) => paper.id).join(",")}">
                ${icon("plus")} Add ${papers.length === 1 ? "it" : "them"} to my plan</button>` : ""}
              <button type="button" class="link-button small" data-act="add-alternative" data-id="${session.id}" data-topic="${topic.id}">
                ${icon("plus")} Add my own alternative source</button>
            </div>
          </section>

          <section id="how">
            <div class="section-title"><h2>How to work this session</h2>
              <span class="chip chip--accent">${profile.label} · ${app.engine.effort(1)}</span></div>
            ${profileSummary(profile)}
            <ol class="prose" style="margin-top:.8rem">
              ${STEPS[app.state.profile](session, sourceNames).map((step) => html`<li>${step}</li>`)}
            </ol>
            <div class="row row--tight" style="margin-top:.6rem">
              ${Object.values(PROFILE).filter((item) => item.id !== profile.id).map((item) => html`<button type="button"
                class="button button--ghost button--small" data-act="set-profile" data-profile="${item.id}">Switch to ${item.label}</button>`)}
            </div>
          </section>

          <section id="ai">
            <div class="section-title"><h2>AI assistance</h2></div>
            <p class="prose">Prompts are generated from this session's identity, objective, readiness, sources, profile,
              time budget, expected artifact and evidence boundary. Each one instructs the model to stay inside the linked
              sources, name what it compressed and end with an active check.</p>
            <div class="card card--quiet" style="margin-top:.75rem">
              <div class="row row--tight">
                ${SESSION_INTENTS.map((intent, index) => html`<button type="button"
                  class="button ${index === 0 ? "button--secondary" : "button--ghost"} button--small"
                  data-act="select-intent" data-intent="${intent.id}" aria-pressed="${index === 0 ? "true" : "false"}">${intent.label}</button>`)}
              </div>
              <pre data-prompt-preview style="margin:.8rem 0 0;padding:.75rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);white-space:pre-wrap;font-size:var(--fs-sm);line-height:1.5;max-height:16rem;overflow:auto"></pre>
              <div class="row" style="margin-top:.6rem">
                <button type="button" class="button button--primary button--small" data-act="copy-session-prompt" data-id="${session.id}">${icon("copy")} Copy this prompt</button>
                <span class="small dim">Paste it into whichever assistant you use. Nothing leaves this browser.</span>
              </div>
            </div>
          </section>

          <section id="evidence">
            <div class="section-title"><h2>What you must produce</h2></div>
            <div class="grid-2">
              <div class="card">
                <p class="eyebrow">Planned work</p>
                <p class="small muted" style="margin-top:.25rem">${session.planned_component}</p>
              </div>
              <div class="card">
                <p class="eyebrow">Expected capability and artifact</p>
                <p class="small muted" style="margin-top:.25rem">${session.completion}</p>
              </div>
            </div>
            <div class="card" style="margin-top:.8rem">
              <p class="eyebrow">Record how you handled it</p>
              <p class="small muted" style="margin:.25rem 0 .6rem">These states are deliberately distinct. Sprint coverage
                is not Required Core completion, and validated competence does not rewrite session history.</p>
              <div class="row row--tight">
                ${["not_started", "in_progress", "completed", "skipped"].map((value) => html`<button type="button"
                  class="button ${status === value ? "button--secondary" : "button--ghost"} button--small"
                  data-act="set-status" data-id="${session.id}" data-status="${value}"
                  aria-pressed="${status === value ? "true" : "false"}">${STATUS_LABEL[value]}</button>`)}
              </div>
              ${quarantined ? "" : html`<label class="check" style="margin-top:.7rem">
                <input type="checkbox" data-act="toggle-sprint" data-id="${session.id}" ${app.state.sprintCovered.includes(session.id) ? raw("checked") : ""}>
                <span>I covered this with AI Sprint — record coverage without Required Core credit</span>
              </label>`}
            </div>
          </section>

          <section id="notes">
            <div class="section-title"><h2>Session notes</h2>
              <span class="note-status small dim" data-note-status="${session.id}"></span></div>
            <div class="note-editor">
              <textarea data-note-for="${session.id}" rows="10" aria-label="Notes for ${session.display_id}"
                placeholder="Reconstruction, derivations, open questions, evidence you doubt, failure modes…">${note}</textarea>
              <p class="small dim">Autosaved to this browser. Never published unless you explicitly select it in a proposal.</p>
            </div>
          </section>

          <section id="artifacts">
            <div class="section-title"><h2>Artifacts</h2></div>
            <p class="prose">Attach the code, notebook, figure, result table or PDF that constitutes your evidence.
              Files stay in this browser's storage and are included in a Workspace Bundle only when you ask.</p>
            <div class="row" style="margin-top:.6rem">
              <label class="button button--secondary button--small">Attach a file
                <input type="file" data-attachment-for="${session.id}" hidden></label>
            </div>
            <div data-attachment-list="${session.id}" style="margin-top:.7rem"></div>
          </section>
        </div>

        <aside class="rail stack" aria-label="Session actions">
          <section class="card">
            <p class="eyebrow">Do it now</p>
            <div class="stack stack--tight" style="margin-top:.5rem">
              ${planToggle(app, "session", session.id, { style: "button", block: true, addLabel: "Add to my plan", inLabel: "In my plan" })}
              ${status !== "completed"
    ? html`<button type="button" class="button button--primary button--block" data-act="set-status" data-id="${session.id}" data-status="completed">
                    ${icon("check")} Mark completed</button>` : ""}
              ${status === "not_started"
    ? html`<button type="button" class="button button--secondary button--block" data-act="set-status" data-id="${session.id}" data-status="in_progress">Start working on it</button>` : ""}
              ${next ? html`<a class="button button--secondary button--block" href="#/sessions/${next.id}">Next session ${icon("arrowRight")}</a>` : ""}
              <a class="button button--ghost button--block" href="#/topics/${topic.id}#sessions">Back to the ${topic.id} timeline</a>
            </div>
          </section>

          <section class="card">
            <p class="eyebrow">My overlay</p>
            <div class="stack stack--tight" style="margin-top:.45rem">
              <button type="button" class="button button--ghost button--block" data-act="toggle-disabled" data-id="${session.id}">
                ${disabled ? "Re-enable in my path" : "Hide from my path"}</button>
              ${activatable ? html`<button type="button" class="button button--ghost button--block" data-act="toggle-activation" data-id="${session.id}">
                ${app.state.activatedSessionIds.includes(session.id) ? "Remove from my route" : "Activate in my route"}</button>` : ""}
              <button type="button" class="button button--ghost button--block" data-act="open-proposal" data-id="${session.id}" data-kind="session">
                Propose a change to this session</button>
            </div>
          </section>

          <section class="card">
            <p class="eyebrow">Identity and provenance</p>
            <dl class="deflist" style="margin-top:.4rem">
              <div><dt>Stable identifier</dt><dd><code style="word-break:break-all">${session.id}</code>
                <button type="button" class="link-button small" data-act="copy-text" data-text="${session.id}">copy</button></dd></div>
              <div><dt>Display alias</dt><dd>${session.legacy_aliases.join(", ") || session.display_id}</dd></div>
              <div><dt>Classification</dt><dd>${session.classification}</dd></div>
              <div><dt>Source revision</dt><dd><code>${app.model.data.source_revision.slice(0, 12)}</code></dd></div>
            </dl>
            <p style="margin-top:.55rem"><a class="link-button small" href="${topic.url}" target="_blank" rel="noopener">Canonical topic plan ${icon("external")}</a></p>
          </section>
        </aside>
      </div>
    </div>`;
  },
};
