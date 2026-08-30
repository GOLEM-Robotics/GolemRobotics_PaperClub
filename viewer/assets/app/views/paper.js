"use strict";

import { html, raw, truncate, plural, escapeHTML } from "../dom.js";
import { PROFILE } from "../constants.js";
import { ROLE_NOTES } from "../model.js";
import {
  crumbs, icon, roleChip, areaChip, classificationChip, readStateControl, starButton, planToggle,
} from "../ui.js";
import { PAPER_INTENTS } from "../prompts.js";

/** Render the canonical lineage sentence with confident links woven in. */
const linkedLineage = (app, paper) => {
  const text = paper.lineageInfo.text;
  if (!text) return "";
  const spans = [];
  for (const link of paper.lineageInfo.links) {
    if (link.kind === "author" || link.kind === "acronym") {
      const index = text.indexOf(link.evidence);
      if (index >= 0) spans.push({ start: index, end: index + link.evidence.length, id: link.id });
    }
  }
  spans.sort((a, b) => a.start - b.start);
  let cursor = 0;
  let out = "";
  for (const span of spans) {
    if (span.start < cursor) continue;
    out += escapeHTML(text.slice(cursor, span.start));
    out += `<a href="#/papers/${span.id}" title="Inferred reference to ${escapeHTML(span.id)}">${escapeHTML(text.slice(span.start, span.end))}</a>`;
    cursor = span.end;
  }
  out += escapeHTML(text.slice(cursor));
  return raw(out);
};

const quickFacts = (app, paper) => {
  const record = app.engine.readingStateOf(paper.id);
  const disabled = app.engine.isDisabled(paper.id);
  const inCompare = app.state.compare.includes(paper.id);
  return html`<section class="card">
    <p class="eyebrow">This paper in your workspace</p>
    <div class="row" style="margin:.5rem 0 .7rem">
      <span class="small dim">Reading state</span>
      ${readStateControl(paper.id, record)}
      ${starButton(paper.id, record.starred)}
    </div>
    <div class="stack stack--tight">
      ${planToggle(app, "paper", paper.id, { style: "button", block: true })}
      <button type="button" class="button button--secondary button--block" data-act="open-note" data-id="${paper.id}">
        ${icon("note")} ${(app.state.notes[paper.id] || "").trim() ? "Edit my note" : "Add a note"}
      </button>
      <button type="button" class="button button--secondary button--block" data-act="toggle-compare" data-id="${paper.id}">
        ${icon("compare")} ${inCompare ? "Remove from comparison" : "Add to comparison"}
      </button>
      <button type="button" class="button button--ghost button--block" data-act="toggle-disabled" data-id="${paper.id}">
        ${disabled ? "Re-enable in my path" : "Hide from my path"}
      </button>
      <button type="button" class="button button--ghost button--block" data-act="open-proposal" data-id="${paper.id}" data-kind="paper">
        Propose a canonical change
      </button>
    </div>
    ${disabled ? html`<p class="small muted" style="margin-top:.6rem">Hidden material stays in the canon and can be
      restored at any time from <a href="#/workspace?tab=hidden">Workspace → Hidden items</a>. Canonical papers are never deleted.</p>` : ""}
  </section>`;
};

const lineageSection = (app, paper) => {
  const order = app.model.papersByTopic.get(paper.topic_id) || [];
  const topic = app.model.topicById.get(paper.topic_id);
  const backlinks = paper.lineageInfo.backlinks;
  return html`<section id="lineage">
    <div class="section-title"><h2>Lineage</h2><span class="small dim">${topic.id} paper sequence</span></div>
    <p class="prose">The curriculum orders this topic's primary sources deliberately. This paper is
      <strong>${paper.lineagePosition + 1} of ${order.length}</strong> in that sequence.</p>
    <p style="margin-top:.5rem"><a class="link-button small" href="#/map?layer=papers&focus=${paper.id}">
      See this lineage and its cross-links on the map ${icon("arrowRight")}</a></p>
    <div class="scroll-x" style="margin-top:.7rem"><div class="lineage-strip">
      ${order.map((id, index) => {
    const item = app.model.paperById.get(id);
    if (!item) return "";
    return html`<a class="lineage-node ${id === paper.id ? "is-current" : ""}" href="#/papers/${id}"
          ${id === paper.id ? raw('aria-current="page"') : ""}>
          <span class="n-year">${index + 1}. ${item.year} · ${item.role}</span>
          <span class="n-title">${truncate(item.title, 62)}</span>
        </a>`;
  })}
    </div></div>

    <div class="card" style="margin-top:.85rem">
      <p class="eyebrow">Canonical lineage note</p>
      <p class="prose" style="margin-top:.2rem">${paper.lineageInfo.text ? linkedLineage(app, paper) : "No lineage relationship is recorded for this paper."}</p>
      ${paper.lineageInfo.links.length ? html`<p class="small dim" style="margin-top:.5rem">
        Linked references are inferred from the canonical note by name matching; the wording above is unchanged.</p>` : ""}
      ${paper.lineageInfo.topicIds.length ? html`<p class="small" style="margin-top:.5rem">Reaches into
        ${paper.lineageInfo.topicIds.map((id, index) => html`${index ? ", " : ""}<a href="#/topics/${id}">${id}</a>`)}.</p>` : ""}
      ${backlinks.length ? html`<p class="small" style="margin-top:.5rem">Named by
        ${backlinks.map((link, index) => html`${index ? ", " : ""}<a href="#/papers/${link.id}">${link.id}</a>`)} in their own lineage notes.</p>` : ""}
    </div>
  </section>`;
};

const beforeAfter = (app, paper) => {
  const before = app.engine.paperPrerequisites(paper);
  const after = app.engine.paperUnlocks(paper);
  return html`<section id="order" class="grid-2">
    <div class="card">
      <p class="eyebrow">Read first</p>
      <h3 class="card-title" style="margin-bottom:.4rem">What the curriculum assumes you already have</h3>
      ${before.papers.length || before.topics.length
    ? html`<ul style="list-style:none;padding:0;margin:0" class="stack stack--tight">
          ${(() => {
    const generic = before.topics.filter((item) => /is a hard prerequisite of/.test(item.reason));
    const specific = before.topics.filter((item) => !generic.includes(item));
    return html`${generic.length ? html`<li class="small">
              <span>Whole topics the curriculum assumes:
                ${generic.map((item, index) => html`${index ? ", " : ""}<a href="#/topics/${item.topic.id}"><strong>${item.topic.id}</strong></a>`)}</span>
              <span class="dim" style="display:block">Hard prerequisites of ${paper.topic_id}.</span>
            </li>` : ""}
            ${specific.map((item) => html`<li class="small">
              <a href="#/topics/${item.topic.id}"><strong>${item.topic.id}</strong> — ${truncate(item.topic.title, 46)}</a>
              <span class="dim" style="display:block">${truncate(item.reason, 165)}</span>
            </li>`)}`;
  })()}
          ${before.papers.slice(-4).map((item) => html`<li class="small">
            <a href="#/papers/${item.paper.id}"><strong>${item.paper.id}</strong> — ${truncate(item.paper.title, 46)}</a>
            <span class="dim" style="display:block">${item.reason}</span>
          </li>`)}
        </ul>`
    : html`<p class="small muted" style="margin:0">Nothing inside this topic comes before it. It is a valid entry point.</p>`}
      ${before.papers.length > 4 ? html`<p class="small dim" style="margin-top:.5rem">Showing the ${plural(4, "closest predecessor")}; the full sequence is under Lineage.</p>` : ""}
    </div>
    <div class="card">
      <p class="eyebrow">Read after</p>
      <h3 class="card-title" style="margin-bottom:.4rem">What this opens up</h3>
      ${after.length
    ? html`<ul style="list-style:none;padding:0;margin:0" class="stack stack--tight">
          ${after.map((item) => html`<li class="small">
            <a href="#/papers/${item.paper.id}"><strong>${item.paper.id}</strong> — ${truncate(item.paper.title, 46)}</a>
            <span class="dim" style="display:block">${item.reason}</span>
          </li>`)}
        </ul>`
    : html`<p class="small muted" style="margin:0">This is the last paper in its topic lineage.</p>`}
    </div>
  </section>`;
};

const usedBy = (app, paper) => {
  const sessions = paper.sessionIds.map((id) => app.model.sessionById.get(id)).filter(Boolean);
  return html`<section id="sessions">
    <div class="section-title"><h2>Where this paper is used</h2><span class="small dim">${plural(sessions.length, "session")}</span></div>
    <div class="entity-list">${sessions.map((session) => {
    const topic = app.model.topicById.get(session.topic_id);
    const status = app.engine.statusOf(session.id);
    const other = session.papers.filter((id) => id !== paper.id);
    return html`<div class="entity-row ${status === "completed" ? "is-done" : ""}">
        <div class="split-row">
          <div class="grow">
            <a class="entity-title" href="#/sessions/${session.id}">${session.title}</a>
            <div class="entity-meta" style="margin-top:.2rem">
              <span class="chip chip--id">${session.display_id}</span>
              <a class="chip" href="#/topics/${topic.id}">${topic.id}</a>
              ${classificationChip(session.classification)}
              <span>${session.stage}</span>
            </div>
            <p class="small muted" style="margin:.35rem 0 0">${truncate(session.objective, 170)}</p>
            ${other.length ? html`<p class="small dim" style="margin:.3rem 0 0">Studied alongside
              ${other.map((id, index) => html`${index ? ", " : ""}<a href="#/papers/${id}">${id}</a>`)}.</p>` : ""}
          </div>
          <a class="button button--secondary button--small" href="#/sessions/${session.id}">Open</a>
        </div>
      </div>`;
  })}</div>
  </section>`;
};

const relatedPapers = (app, paper) => {
  const seen = new Set([paper.id]);
  const items = [];
  for (const id of paper.studiedWith) {
    if (seen.has(id)) continue;
    const other = app.model.paperById.get(id);
    if (!other) continue;
    seen.add(id);
    items.push({ paper: other, reason: "Reconstructed in the same session." });
  }
  for (const link of [...paper.lineageInfo.links, ...paper.lineageInfo.backlinks]) {
    if (seen.has(link.id)) continue;
    const other = app.model.paperById.get(link.id);
    if (!other) continue;
    seen.add(link.id);
    items.push({ paper: other, reason: `Connected through the lineage note (“${link.evidence}”).` });
  }
  if (!items.length) return "";
  return html`<section id="related">
    <div class="section-title"><h2>Closely related papers</h2>
      <button type="button" class="link-button small" data-act="compare-set" data-ids="${[paper.id, ...items.slice(0, 3).map((item) => item.paper.id)].join(",")}">Compare these</button>
    </div>
    <div class="entity-list">${items.slice(0, 8).map((item) => html`<div class="entity-row">
      <div class="split-row">
        <div class="grow">
          <a class="entity-title" href="#/papers/${item.paper.id}">${item.paper.title}</a>
          <div class="entity-meta" style="margin-top:.2rem">
            <span class="chip chip--id">${item.paper.id}</span>
            <span class="chip">${item.paper.year}</span>
            ${roleChip(item.paper)}
            <span>${item.reason}</span>
          </div>
        </div>
        <button type="button" class="button button--ghost button--small" data-act="toggle-compare" data-id="${item.paper.id}">
          ${app.state.compare.includes(item.paper.id) ? "In comparison" : "Compare"}
        </button>
      </div>
    </div>`)}</div>
  </section>`;
};

export default {
  title: (app, params) => {
    const paper = app.model.paperById.get(params.id);
    return paper ? `${paper.id} — ${paper.title}` : "Paper not found";
  },
  render(app, params) {
    const paper = app.model.paperById.get(params.id);
    if (!paper) {
      return html`<div class="page page--narrow">
        ${crumbs([{ label: "Papers", href: "#/papers" }, { label: "Not found" }])}
        <div class="card">
          <h1>No paper with the identifier “${params.id}”</h1>
          <p class="prose" style="margin-top:.5rem">It may have been renamed in a newer curriculum revision, or the link
            may be mistyped. The paper library holds ${app.model.papers.length} records.</p>
          <div class="row" style="margin-top:.8rem">
            <a class="button button--primary" href="#/papers">Browse all papers</a>
            <a class="button button--secondary" href="#/place">Identify a paper I have</a>
          </div>
        </div>
      </div>`;
    }

    const topic = app.model.topicById.get(paper.topic_id);
    const record = app.engine.readingStateOf(paper.id);
    const note = (app.state.notes[paper.id] || "").trim();
    const profile = PROFILE[app.state.profile];

    return html`<div class="page">
      ${crumbs([
    { label: "Papers", href: "#/papers" },
    { label: topic.id, href: `#/topics/${topic.id}` },
    { label: paper.id },
  ])}

      <div class="split split--wide-rail">
        <div class="stack stack--loose">
          <header class="entity-head">
            <div class="row row--tight" style="margin-bottom:.45rem">
              <span class="chip chip--id">${paper.id}</span>
              <a class="chip" href="#/topics/${topic.id}">${topic.id} — ${truncate(topic.title, 38)}</a>
              ${areaChip(app.model, topic.area_id)}
              ${roleChip(paper)}
              <span class="chip">${paper.level}</span>
              <span class="chip">${paper.burden} preparation</span>
              ${paper.requiredCore
    ? html`<span class="chip chip--accent">Required Core</span>`
    : html`<span class="chip chip--sprint">Beyond the core</span>`}
              ${record.status ? html`<span class="chip chip--ok">You marked it ${record.status}</span>` : ""}
            </div>
            <h1>${paper.title}</h1>
            <p class="lead" style="margin-top:.4rem">${paper.authors} · ${paper.year}${paper.venue ? ` · ${paper.venue}` : ""}</p>
            <div class="row" style="margin-top:.8rem">
              <a class="button button--primary" href="${paper.url}" target="_blank" rel="noopener noreferrer">Open the paper ${icon("external")}</a>
              ${paper.codeURL ? html`<a class="button button--secondary" href="${paper.codeURL}" target="_blank" rel="noopener noreferrer">${icon("code")} Official code</a>` : ""}
              ${paper.focusSessionId ? html`<a class="button button--secondary" href="#/sessions/${paper.focusSessionId}">Go to its session</a>` : ""}
              <span class="row row--tight" style="margin-left:.25rem">
                ${readStateControl(paper.id, record)}${starButton(paper.id, record.starred)}
              </span>
            </div>
          </header>

          <section id="why">
            <div class="section-title"><h2>Why this paper is in the curriculum</h2></div>
            <p class="prose">${paper.contribution}</p>
            <div class="callout" style="margin-top:.7rem">
              <strong>${paper.role}.</strong> ${ROLE_NOTES[paper.role] || ""}
              ${paper.critical && paper.role !== "Critical" ? html` <strong>Marked critical:</strong> ${ROLE_NOTES.Critical}` : ""}
            </div>
          </section>

          <section id="reading">
            <div class="section-title"><h2>How to read it</h2><span class="small dim">${profile.label} profile</span></div>
            <dl class="deflist deflist--inline">
              <div><dt>Assigned reading</dt><dd>${paper.preparation || "No section-level restriction is recorded; read the paper in full."}</dd></div>
              <div><dt>Technical level</dt><dd>${paper.level}</dd></div>
              <div><dt>Preparation burden</dt><dd>${paper.burden}</dd></div>
              <div><dt>Authoritative version</dt><dd>${paper.authoritative_version}</dd></div>
              <div><dt>Project or code</dt><dd>${paper.official_project_or_code || "None recorded"}</dd></div>
            </dl>
            <div class="card card--quiet" style="margin-top:.8rem">
              <p class="eyebrow">Use AI without surrendering judgement</p>
              <p class="small muted" style="margin:.2rem 0 .6rem">Each prompt is generated from this paper's canonical
                metadata and your current profile, and instructs the model to separate source claims from inference.</p>
              <div class="row row--tight">
                ${PAPER_INTENTS.map((intent) => html`<button type="button" class="button button--secondary button--small"
                  data-act="copy-paper-prompt" data-id="${paper.id}" data-intent="${intent.id}">${intent.label}</button>`)}
              </div>
              <p style="margin-top:.55rem">
                <button type="button" class="link-button small" data-act="inspect-paper-prompt" data-id="${paper.id}" data-intent="explain">Inspect the full prompt before copying</button>
              </p>
            </div>
          </section>

          ${raw(beforeAfter(app, paper))}
          ${raw(lineageSection(app, paper))}

          <section id="evidence">
            <div class="section-title"><h2>Evidence and limitations</h2></div>
            <div class="grid-2">
              <div class="card">
                <p class="eyebrow">Known limitation</p>
                <p class="small muted" style="margin-top:.25rem">${paper.limitation || "None recorded."}</p>
              </div>
              <div class="card">
                <p class="eyebrow">Quality and influence signals</p>
                <p class="small muted" style="margin-top:.25rem">${paper.quality_influence_signals || "None recorded."}</p>
              </div>
            </div>
            <p class="small dim" style="margin-top:.6rem">Metadata and assessment confidence: <strong>${paper.metadata_confidence}</strong>.
              These are curatorial judgements recorded in the paper index, not bibliometrics fetched at runtime.</p>
          </section>

          ${raw(usedBy(app, paper))}
          ${raw(relatedPapers(app, paper))}

          <section id="notes">
            <div class="section-title"><h2>My notes on this paper</h2>
              <span class="note-status small dim" data-note-status="${paper.id}"></span></div>
            <div class="note-editor">
              <textarea data-note-for="${paper.id}" rows="8" aria-label="Notes on ${paper.id}"
                placeholder="What is the actual mechanism? What did the evidence not cover? What would you try?">${note}</textarea>
              <p class="small dim">Saved automatically to this browser only. Notes are included in a proposal only when
                you explicitly select them.</p>
            </div>
          </section>

          <section id="provenance">
            <div class="section-title"><h2>Provenance</h2></div>
            <p class="small muted">Every field above comes from the reviewed paper index. Nothing on this page is generated
              at runtime from a third party.</p>
            <div class="row" style="margin-top:.6rem">
              <a class="button button--secondary button--small" href="${app.referenceBase}paper_index/#${app.slugTitle(`${paper.id}. ${paper.title}`)}" target="_blank" rel="noopener">Canonical record ${icon("external")}</a>
              <button type="button" class="button button--ghost button--small" data-act="open-proposal" data-id="${paper.id}" data-kind="paper">Propose a correction</button>
            </div>
          </section>
        </div>

        <aside class="rail stack" aria-label="Paper actions">
          ${raw(quickFacts(app, paper))}
          ${record.status === "read" || record.status === "skimmed" ? (() => {
    const next = paper.nextInTopic ? app.model.paperById.get(paper.nextInTopic) : null;
    const session = paper.focusSessionId ? app.model.sessionById.get(paper.focusSessionId) : null;
    const sessionDone = session ? app.engine.isDone(session.id) : true;
    return html`<section class="card card--accent">
        <p class="eyebrow">You marked this ${record.status}</p>
        <h2 class="card-title" style="margin-bottom:.4rem">What now?</h2>
        <div class="stack stack--tight">
          ${session && !sessionDone ? html`<a class="button button--primary button--block" href="#/sessions/${session.id}">
            Do the work in ${session.display_id}</a>
            <p class="small dim" style="margin:0">Reading is not the competence gate. ${session.display_id} still expects
            ${session.artifact || "its planned evidence"}.</p>` : ""}
          ${next ? html`<a class="button button--secondary button--block" href="#/papers/${next.id}">
            Next in the lineage: ${truncate(next.title, 40)}</a>` : ""}
        </div>
      </section>`;
  })() : ""}

          <section class="card">
            <p class="eyebrow">Neighbours in the lineage</p>
            <div class="stack stack--tight" style="margin-top:.45rem">
              ${paper.previousInTopic ? html`<a class="small" href="#/papers/${paper.previousInTopic}">${icon("arrowLeft")}
                ${truncate(app.model.paperById.get(paper.previousInTopic)?.title, 48)}</a>` : html`<span class="small dim">First in the ${topic.id} lineage</span>`}
              ${paper.nextInTopic ? html`<a class="small" href="#/papers/${paper.nextInTopic}">${icon("arrowRight")}
                ${truncate(app.model.paperById.get(paper.nextInTopic)?.title, 48)}</a>` : html`<span class="small dim">Last in the ${topic.id} lineage</span>`}
            </div>
          </section>
          ${note ? html`<section class="card">
            <p class="eyebrow">Your note</p>
            <p class="small muted" style="margin-top:.3rem">${truncate(note, 220)}</p>
          </section>` : ""}
        </aside>
      </div>
    </div>`;
  },
};
