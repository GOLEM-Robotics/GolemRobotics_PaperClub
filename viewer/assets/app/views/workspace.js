"use strict";

import { html, raw, truncate, plural, relativeTime, formatDate } from "../dom.js";
import { PROPOSAL_LABEL } from "../constants.js";
import { icon, meter, emptyState, readStateControl, starButton } from "../ui.js";

const TABS = [
  ["overview", "Overview"],
  ["reading", "Reading"],
  ["notes", "Notes"],
  ["artifacts", "Artifacts"],
  ["mine", "My additions"],
  ["hidden", "Hidden items"],
  ["route", "My route order"],
  ["proposals", "Proposals"],
  ["bundle", "Portability"],
];

const overview = (app) => {
  const progress = app.engine.overallProgress();
  const notes = Object.entries(app.state.notes).filter(([, value]) => value.trim());
  const reading = Object.values(app.state.paperState);
  return html`<div class="stack stack--loose">
    <section class="card">
      <p class="eyebrow">Your learning record</p>
      <div class="stat-grid" style="margin-top:.6rem">
        <div class="stat"><span class="stat-value">${app.engine.planProgress().done}/${app.engine.planProgress().total}</span><span class="stat-label">My plan</span></div>
        <div class="stat"><span class="stat-value">${progress.coreDone}/${progress.core}</span><span class="stat-label">Required Core</span></div>
        <div class="stat"><span class="stat-value">${progress.topicsComplete}</span><span class="stat-label">Topics complete</span></div>
        <div class="stat"><span class="stat-value">${app.state.competenceValidated.length}</span><span class="stat-label">Competence validated</span></div>
        <div class="stat"><span class="stat-value">${app.state.sprintCovered.length}</span><span class="stat-label">Sprint covered</span></div>
        <div class="stat"><span class="stat-value">${progress.papersRead}</span><span class="stat-label">Papers read</span></div>
        <div class="stat"><span class="stat-value">${notes.length}</span><span class="stat-label">Notes written</span></div>
      </div>
      <p class="small dim" style="margin-top:.8rem">Your <a href="#/">plan</a> records intent; everything else here
        records what happened. A canonical plan item is ticked off by its own record, never by a second one.
        The five completion records are deliberately separate. Completing a session is
        not the same as validating competence, and Sprint coverage never silently becomes Required Core credit — switching
        to a stricter profile reveals the missing work instead of rewriting your history.</p>
    </section>

    <section>
      <div class="section-title"><h2>Topics you have touched</h2></div>
      ${app.model.topics.filter((topic) => {
    const metrics = app.engine.topicMetrics(topic.id);
    return metrics.started || metrics.validated || metrics.coreComplete;
  }).length
    ? html`<div class="entity-list">${app.model.topics.filter((topic) => {
    const metrics = app.engine.topicMetrics(topic.id);
    return metrics.started || metrics.validated || metrics.coreComplete;
  }).map((topic) => {
    const metrics = app.engine.topicMetrics(topic.id);
    return html`<div class="entity-row">
            <div class="row row--between">
              <div class="grow">
                <a class="entity-title" href="#/topics/${topic.id}">${topic.id} — ${topic.title}</a>
                <div style="max-width:260px;margin-top:.35rem">${meter(metrics.coreDone, metrics.coreTotal, metrics.coreComplete ? "meter--ok" : "")}</div>
              </div>
              <div class="row row--tight">
                <span class="small dim">${metrics.coreDone}/${metrics.coreTotal} core</span>
                ${metrics.validated ? html`<span class="chip chip--ok">Validated</span>` : ""}
              </div>
            </div>
          </div>`;
  })}</div>`
    : emptyState("You have not started any topic yet.", '<a class="button button--secondary button--small" href="#/">See what to do first</a>')}
    </section>

    <section class="card">
      <p class="eyebrow">Recent activity</p>
      ${app.state.recentActivity.length
    ? html`<ul style="list-style:none;padding:0;margin:.5rem 0 0" class="stack stack--tight">
          ${app.state.recentActivity.slice(0, 12).map((entry) => html`<li class="small">
            <a href="${app.hrefFor(entry.entityId)}">${truncate(entry.label, 70)}</a>
            <span class="dim"> · ${entry.kind} · ${relativeTime(entry.at)}</span></li>`)}
        </ul>`
    : html`<p class="small muted" style="margin-top:.4rem">Nothing recorded yet.</p>`}
    </section>
  </div>`;
};

const reading = (app) => {
  const entries = Object.entries(app.state.paperState)
    .map(([id, record]) => ({ paper: app.model.paperById.get(id), record }))
    .filter((entry) => entry.paper);
  const groups = [["reading", "Reading now"], ["queued", "To read"], ["skimmed", "Skimmed"], ["read", "Read"]];
  const starred = entries.filter((entry) => entry.record.starred);
  return html`<div class="stack stack--loose">
    ${entries.length ? "" : emptyState("You have not marked any paper yet. Reading state is set from any paper row or paper page.",
    '<a class="button button--secondary button--small" href="#/papers">Open the paper library</a>')}
    ${groups.map(([status, label]) => {
    const list = entries.filter((entry) => entry.record.status === status);
    if (!list.length) return "";
    return html`<section>
        <div class="section-title"><h2>${label}</h2><span class="small dim">${list.length}</span></div>
        <div class="entity-list">${list.map(({ paper, record }) => html`<div class="entity-row">
          <div class="split-row">
            <div class="grow">
              <a class="entity-title" href="#/papers/${paper.id}">${paper.title}</a>
              <div class="entity-meta" style="margin-top:.2rem">
                <span class="chip chip--id">${paper.id}</span>
                <a class="chip" href="#/topics/${paper.topic_id}">${paper.topic_id}</a>
                <span>${paper.year}</span><span>·</span><span>updated ${relativeTime(record.updatedAt)}</span>
              </div>
            </div>
            <div class="row row--tight">${readStateControl(paper.id, record)}${starButton(paper.id, record.starred)}</div>
          </div>
        </div>`)}</div>
      </section>`;
  })}
    ${starred.length ? html`<section>
      <div class="section-title"><h2>Starred</h2><span class="small dim">${starred.length}</span></div>
      <div class="chip-list">${starred.map(({ paper }) => html`<a class="chip" href="#/papers/${paper.id}">${paper.id} · ${truncate(paper.title, 44)}</a>`)}</div>
    </section>` : ""}
  </div>`;
};

const notesTab = (app) => {
  const entries = Object.entries(app.state.notes).filter(([, value]) => value.trim());
  if (!entries.length) return emptyState("No notes yet. Every topic, session, paper and resource has a note field.");
  return html`<div class="entity-list">${entries.map(([id, value]) => html`<div class="entity-row">
    <div class="split-row">
      <div class="grow">
        <a class="entity-title" href="${app.hrefFor(id)}">${truncate(app.engine.label(id), 78)}</a>
        <p class="small muted" style="margin:.35rem 0 0;white-space:pre-wrap">${truncate(value.trim(), 320)}</p>
      </div>
      <div class="row row--tight">
        <button type="button" class="button button--ghost button--small" data-act="open-note" data-id="${id}">Edit</button>
        <button type="button" class="button button--ghost button--small link-button--danger" data-act="delete-note" data-id="${id}">Delete</button>
      </div>
    </div>
  </div>`)}</div>`;
};

const artifactsTab = (app) => html`<div class="stack">
  <p class="prose">Attachments live in this browser's IndexedDB. They are never uploaded and are included in an exported
    bundle only when you tick the attachments box.</p>
  <div data-all-attachments>Loading attachments…</div>
</div>`;

const mine = (app) => {
  const items = app.state.customItems;
  return html`<div class="stack stack--loose">
    <section class="card">
      <div class="row row--between">
        <div>
          <p class="eyebrow">Personal material</p>
          <h2 class="card-title">Add your own paper, session or resource</h2>
        </div>
        <span class="chip chip--personal">Personal overlay</span>
      </div>
      <p class="small muted" style="margin:.4rem 0 .7rem">Anything you add here is yours: fully editable, movable and
        deletable. It never modifies the canonical curriculum, and it appears with a personal badge wherever it is shown.</p>
      <form class="stack stack--tight" data-personal-form>
        <input type="hidden" name="itemId">
        <div class="grid-2">
          <label class="field"><span>Type</span>
            <select name="kind">
              <option value="paper">Paper or preprint</option>
              <option value="material">Supporting material</option>
              <option value="session">Custom session</option>
            </select></label>
          <label class="field"><span>Topic</span>
            <select name="topicId" required>
              ${app.model.topics.map((topic) => html`<option value="${topic.id}">${topic.id} — ${truncate(topic.title, 46)}</option>`)}
            </select></label>
        </div>
        <label class="field"><span>Title</span><input name="title" required maxlength="300"></label>
        <div class="grid-2">
          <label class="field"><span>Authors (optional)</span><input name="authors" maxlength="300"></label>
          <label class="field"><span>Year (optional)</span><input name="year" maxlength="12"></label>
        </div>
        <label class="field"><span>Link (optional)</span><input name="url" type="url" maxlength="2000" placeholder="https://…"></label>
        <label class="field"><span>Attach to a canonical session (optional)</span>
          <select name="sessionId"><option value="">Topic-level addition</option></select></label>
        <label class="field"><span>Why it matters to you</span>
          <textarea name="objective" rows="3" required maxlength="4000"
            placeholder="What does it add that the canonical sources do not?"></textarea></label>
        <label class="field"><span>Replaces which canonical source (optional)</span>
          <input name="replacesId" maxlength="24" placeholder="e.g. P104"></label>
        <div class="row">
          <button type="submit" class="button button--primary">Save to my workspace</button>
          <button type="button" class="button button--ghost" data-act="cancel-personal" hidden>Cancel edit</button>
        </div>
      </form>
    </section>

    <section>
      <div class="section-title"><h2>My additions</h2><span class="small dim">${plural(items.length, "item")}</span></div>
      ${items.length ? html`<div class="entity-list">${items.map((item) => html`<div class="entity-row ${item.disabled ? "is-disabled" : ""}">
        <div class="split-row">
          <div class="grow">
            <div class="row row--tight">
              <span class="chip chip--personal">Personal ${item.kind}</span>
              <a class="chip" href="#/topics/${item.topicId}">${item.topicId}</a>
              ${item.replacesId ? html`<span class="chip chip--warn">proposed replacement for ${item.replacesId}</span>` : ""}
              ${item.disabled ? html`<span class="chip">Disabled</span>` : ""}
            </div>
            <p style="margin:.35rem 0 0;font-weight:600">${item.title}</p>
            <p class="small muted" style="margin:.2rem 0 0">${item.objective}</p>
            ${item.url ? html`<p class="small" style="margin:.2rem 0 0"><a href="${item.url}" target="_blank" rel="noopener noreferrer">${truncate(item.url, 70)} ${icon("external")}</a></p>` : ""}
          </div>
          <div class="row row--tight">
            <button type="button" class="button button--ghost button--small" data-act="edit-personal" data-id="${item.id}">Edit</button>
            <button type="button" class="button button--ghost button--small" data-act="toggle-personal" data-id="${item.id}">${item.disabled ? "Enable" : "Disable"}</button>
            <button type="button" class="button button--ghost button--small link-button--danger" data-act="delete-personal" data-id="${item.id}">Delete</button>
          </div>
        </div>
      </div>`)}</div>` : emptyState("Nothing added yet.")}
    </section>
  </div>`;
};

const hidden = (app) => {
  const ids = app.state.disabledIds;
  return html`<div class="stack">
    <p class="prose">Canonical material is never deleted. Hiding removes it from your route and your counters, and
      everything here can be restored in one click.</p>
    ${ids.length ? html`<div class="entity-list">${ids.map((id) => html`<div class="entity-row">
      <div class="row row--between">
        <div class="grow">
          <a class="entity-title" href="${app.hrefFor(id)}">${truncate(app.engine.label(id), 82)}</a>
        </div>
        <button type="button" class="button button--secondary button--small" data-act="toggle-disabled" data-id="${id}">Restore</button>
      </div>
    </div>`)}</div>` : emptyState("Nothing is hidden.")}
  </div>`;
};

const route = (app) => {
  const targetId = app.engine.targetTopicId();
  const ordered = app.engine.routeTopics(targetId);
  const violations = app.engine.orderViolations(app.state.customOrder.length ? app.state.customOrder : ordered.map((topic) => topic.id));
  return html`<div class="stack stack--loose">
    <section>
      <div class="section-title"><h2>My topic order</h2>
        ${app.state.customOrder.length ? html`<button type="button" class="link-button small" data-act="reset-order">Reset to the canonical order</button>` : ""}</div>
      <p class="prose">Reordering changes only your route. The canonical topic sequence never moves because you dragged a
        card — that requires a reviewed curriculum change.</p>
      ${violations.length ? html`<div class="callout callout--warn" style="margin-top:.7rem">
        <strong>${plural(violations.length, "hard prerequisite")} would be violated by this order.</strong>
        ${violations.map((edge) => html`<span style="display:block">${edge.source} must come before ${edge.target} — ${edge.rationale}
          ${app.state.orderOverrides.includes(edge.id)
    ? html`<span class="chip chip--stop">override accepted</span>`
    : html`<button type="button" class="link-button small" data-act="override-order" data-id="${edge.id}">Accept the risk anyway</button>`}</span>`)}
      </div>` : ""}
      <ol class="entity-list" style="list-style:none;padding:0;margin:.8rem 0 0">
        ${ordered.map((topic, index) => html`<li class="entity-row">
          <div class="row row--between">
            <div class="row row--tight grow">
              <span class="chip chip--id">${index + 1}</span>
              <a class="entity-title" style="font-size:var(--fs-sm)" href="#/topics/${topic.id}">${topic.id} — ${truncate(topic.title, 56)}</a>
            </div>
            <div class="row row--tight">
              <button type="button" class="button button--ghost button--small" data-act="move-topic" data-id="${topic.id}" data-dir="-1"
                aria-label="Move ${topic.id} earlier" ${index === 0 ? raw("disabled") : ""}>↑</button>
              <button type="button" class="button button--ghost button--small" data-act="move-topic" data-id="${topic.id}" data-dir="1"
                aria-label="Move ${topic.id} later" ${index === ordered.length - 1 ? raw("disabled") : ""}>↓</button>
            </div>
          </div>
        </li>`)}
      </ol>
    </section>
  </div>`;
};

const proposals = (app) => html`<div class="stack stack--loose">
  <section class="card">
    <div class="row row--between">
      <div><p class="eyebrow">Safe publication</p><h2 class="card-title">Proposals waiting to be reviewed</h2></div>
      <span class="chip">${plural(app.state.proposals.length, "proposal")}</span>
    </div>
    <p class="small muted" style="margin:.45rem 0 0">A proposal is a request for human review, not a change. Exporting
      produces a Git patch you attach to a pull request; no repository credential ever exists in this browser.</p>
  </section>

  ${app.state.proposals.length ? html`<div class="entity-list">${app.state.proposals.map((proposal) => html`<div class="entity-row">
    <div class="split-row">
      <div class="grow">
        <div class="row row--tight">
          <span class="chip chip--accent">${PROPOSAL_LABEL[proposal.kind]}</span>
          ${proposal.targetId ? html`<a class="chip" href="${app.hrefFor(proposal.targetId)}">${proposal.targetId}</a>` : ""}
          ${proposal.topicId ? html`<a class="chip" href="#/topics/${proposal.topicId}">${proposal.topicId}</a>` : ""}
          <span class="small dim">${formatDate(proposal.createdAt)}</span>
        </div>
        ${proposal.title ? html`<p style="margin:.35rem 0 0;font-weight:600">${proposal.title}</p>` : ""}
        <p class="small muted" style="margin:.25rem 0 0">${proposal.rationale || "No justification recorded."}</p>
      </div>
      <div class="row row--tight">
        <button type="button" class="button button--ghost button--small" data-act="delete-proposal" data-id="${proposal.id}">Withdraw</button>
      </div>
    </div>
  </div>`)}</div>` : emptyState("No proposal raised yet. Use “Propose a canonical change” on any topic, session, paper or resource.")}

  <section class="card">
    <p class="eyebrow">Export for review</p>
    <label class="field" style="margin-top:.5rem"><span>Why should the club accept these changes?</span>
      <textarea data-proposal-context rows="3" placeholder="The reviewer sees this first."></textarea></label>
    <div class="stack stack--tight" style="margin-top:.6rem">
      <label class="check"><input type="checkbox" data-proposal-notes>
        <span>Also include my session notes as club records</span></label>
      <label class="check"><input type="checkbox" data-proposal-artifacts>
        <span>Also include an artifact manifest (file names and sizes, never the file contents)</span></label>
    </div>
    <div class="row" style="margin-top:.8rem">
      <button type="button" class="button button--primary" data-act="export-proposal">Download the review patch</button>
      <span class="small dim" data-proposal-status role="status"></span>
    </div>
    <p class="small dim" style="margin-top:.6rem">Verify with <code>git apply --check</code> before opening a pull request.
      Framework documents 1–5 are never touched by a generated patch.</p>
  </section>
</div>`;

const bundle = (app) => html`<div class="stack stack--loose">
  <section class="card">
    <div class="row row--between">
      <div><p class="eyebrow">Portability</p><h2 class="card-title">Workspace bundle</h2></div>
      <span class="chip ${app.store.persistent ? "chip--ok" : "chip--warn"}">
        ${app.store.persistent ? "Persistent storage available" : "Memory only for this visit"}</span>
    </div>
    <p class="small muted" style="margin:.45rem 0 0">Export progress, reading state, notes, personal additions, hidden
      items, route order, proposals and the curriculum revision. Import migrates by stable identity; anything unknown is
      archived rather than dropped. Bundles are plaintext private files — import only bundles you created or trust.</p>
    <div class="row" style="margin-top:.85rem">
      <label class="check"><input type="checkbox" data-include-attachments><span>Include attached files</span></label>
      <button type="button" class="button button--primary" data-act="export-bundle">Export bundle</button>
      <button type="button" class="button button--secondary" data-act="import-bundle">Import bundle</button>
      <input type="file" accept="application/json,.json" data-bundle-input hidden>
    </div>
    <p class="small dim" style="margin-top:.6rem" data-bundle-status role="status" aria-live="polite"></p>
  </section>

  <section class="card">
    <p class="eyebrow">Curriculum revision</p>
    <dl class="deflist deflist--inline" style="margin-top:.4rem">
      <div><dt>Current revision</dt><dd><code>${app.model.data.source_revision.slice(0, 16)}</code></dd></div>
      <div><dt>Recorded in workspace</dt><dd>${app.state.curriculumRevision ? html`<code>${app.state.curriculumRevision.slice(0, 16)}</code>` : "not yet recorded"}</dd></div>
      <div><dt>Curriculum version</dt><dd>${app.model.data.curriculum_version}</dd></div>
      <div><dt>Literature cutoff</dt><dd>${app.model.data.provenance.literature_cutoff}</dd></div>
    </dl>
  </section>

  ${app.state.orphanArchive.length ? html`<section class="card">
    <p class="eyebrow">Archived records</p>
    <p class="small muted" style="margin:.35rem 0 .5rem">${plural(app.state.orphanArchive.length, "record")} referenced
      identities that no longer exist. They are kept verbatim so nothing is lost.</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th scope="col">Kind</th><th scope="col">Original identifier</th><th scope="col">Imported</th></tr></thead>
      <tbody>${app.state.orphanArchive.slice(0, 50).map((item) => html`<tr>
        <td>${item.kind}</td><td><code>${item.originalId}</code></td><td>${formatDate(item.importedAt)}</td></tr>`)}</tbody>
    </table></div>
  </section>` : ""}

  <section class="card">
    <p class="eyebrow">Danger zone</p>
    <p class="small muted" style="margin:.35rem 0 .6rem">Resetting removes every personal record in this browser: progress,
      reading state, notes, additions, proposals and attachments. Canonical curriculum data is unaffected. Export first.</p>
    <button type="button" class="button button--danger" data-act="reset-workspace">Reset my personal workspace</button>
  </section>
</div>`;

const PANELS = { overview, reading, notes: notesTab, artifacts: artifactsTab, mine, hidden, route, proposals, bundle };

export default {
  title: () => "Workspace — Golem Curriculum",
  render(app, params) {
    const tab = PANELS[params.query?.tab] ? params.query.tab : "overview";
    return html`<div class="page">
      <div class="page-head">
        <h1>Workspace</h1>
        <p class="lead">Everything here is yours and stays in this browser. It never rewrites the canonical curriculum,
          and you can carry it to another machine with a bundle.</p>
      </div>
      <nav class="tabstrip" aria-label="Workspace sections" style="margin-bottom:1.1rem">
        ${TABS.map(([id, label]) => html`<a href="#/workspace?tab=${id}" ${id === tab ? raw('aria-current="true"') : ""}>${label}</a>`)}
      </nav>
      ${PANELS[tab](app)}
    </div>`;
  },
};
