"use strict";

import { html, truncate } from "../dom.js";
import { crumbs, icon, roleChip, emptyState } from "../ui.js";

const ROWS = [
  { label: "Curriculum topic", get: (app, paper) => html`<a href="#/topics/${paper.topic_id}">${paper.topic_id} — ${app.model.topicById.get(paper.topic_id)?.title}</a>` },
  { label: "Role", get: (app, paper) => roleChip(paper) },
  { label: "Year / venue", get: (app, paper) => html`${paper.year}${paper.venue ? ` · ${paper.venue}` : ""}` },
  { label: "Authors", get: (app, paper) => paper.authors },
  { label: "Technical level", get: (app, paper) => paper.level },
  { label: "Preparation burden", get: (app, paper) => paper.burden },
  { label: "Assigned reading", get: (app, paper) => paper.preparation || "Whole paper" },
  { label: "Contribution", get: (app, paper) => paper.contribution },
  { label: "Lineage", get: (app, paper) => paper.lineage || "—" },
  { label: "Limitation", get: (app, paper) => paper.limitation || "—" },
  { label: "Evidence signals", get: (app, paper) => paper.quality_influence_signals || "—" },
  { label: "Metadata confidence", get: (app, paper) => paper.metadata_confidence },
  {
    label: "Used by sessions",
    get: (app, paper) => html`${paper.sessionIds.map((id, index) => {
      const session = app.model.sessionById.get(id);
      return session ? html`${index ? ", " : ""}<a href="#/sessions/${session.id}">${session.display_id}</a>` : "";
    })}`,
  },
  { label: "Required Core", get: (app, paper) => (paper.requiredCore ? "Yes" : "No — frontier or optional only") },
  {
    label: "My reading state",
    get: (app, paper) => {
      const record = app.engine.readingStateOf(paper.id);
      return html`${record.status || "not marked"}${record.starred ? " · starred" : ""}`;
    },
  },
  {
    label: "My note",
    get: (app, paper) => truncate((app.state.notes[paper.id] || "").trim(), 240) || "—",
  },
];

export default {
  title: () => "Compare papers — Golem Curriculum",
  render(app, params) {
    const requested = params.query?.ids
      ? String(params.query.ids).split(",").filter(Boolean)
      : app.state.compare;
    const papers = requested.map((id) => app.model.paperById.get(id)).filter(Boolean);

    return html`<div class="page">
      ${crumbs([{ label: "Papers", href: "#/papers" }, { label: "Compare" }])}
      <div class="page-head">
        <div class="row row--between" style="align-items:flex-start">
          <div>
            <h1>Compare papers</h1>
            <p class="lead">Set them beside each other on the dimensions the curriculum actually judges:
              contribution, lineage position, evidence and what each one costs you to read.</p>
          </div>
          ${papers.length ? html`<button type="button" class="button button--ghost" data-act="clear-compare">Clear the comparison</button>` : ""}
        </div>
      </div>

      ${papers.length < 2
    ? emptyState(
      papers.length === 1
        ? "Add at least one more paper. Use the checkbox on any paper row, or “Add to comparison” on a paper page."
        : "No papers selected yet. Use the checkbox on any paper row, or “Add to comparison” on a paper page.",
      '<a class="button button--secondary button--small" href="#/papers">Browse papers</a>')
    : html`<div class="table-wrap">
          <table class="data compare-table">
            <caption class="visually-hidden">Side-by-side comparison of ${papers.length} papers</caption>
            <thead>
              <tr>
                <th scope="col">Field</th>
                ${papers.map((paper) => html`<th scope="col">
                  <a href="#/papers/${paper.id}">${paper.id}</a>
                  <span style="display:block;font-weight:600;text-transform:none;letter-spacing:0;color:var(--text);font-size:var(--fs-sm);margin-top:.2rem">${truncate(paper.title, 70)}</span>
                  <button type="button" class="link-button link-button--quiet small" data-act="toggle-compare" data-id="${paper.id}" style="margin-top:.3rem;text-transform:none;letter-spacing:0">Remove</button>
                </th>`)}
              </tr>
            </thead>
            <tbody>
              ${ROWS.map((row) => html`<tr>
                <th scope="row">${row.label}</th>
                ${papers.map((paper) => html`<td>${row.get(app, paper)}</td>`)}
              </tr>`)}
              <tr>
                <th scope="row">Source</th>
                ${papers.map((paper) => html`<td>
                  <a href="${paper.url}" target="_blank" rel="noopener noreferrer">Paper ${icon("external")}</a>
                  ${paper.codeURL ? html` · <a href="${paper.codeURL}" target="_blank" rel="noopener noreferrer">Code ${icon("external")}</a>` : ""}
                </td>`)}
              </tr>
            </tbody>
          </table>
        </div>
        <p class="small dim" style="margin-top:.7rem">Up to four papers can be compared at once. This view is shareable:
          the identifiers are in the address bar.</p>`}
    </div>`;
  },
};
