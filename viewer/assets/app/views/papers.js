"use strict";

import { html, raw, truncate, normalize } from "../dom.js";
import { READING_LABEL } from "../constants.js";
import { paperRow, icon, emptyState } from "../ui.js";
import { ROLE_NOTES } from "../model.js";

const PAGE_STEP = 60;
let shown = PAGE_STEP;
let lastSignature = "";

const SORTS = {
  curriculum: { label: "Curriculum order", compare: (a, b) => a.__rank - b.__rank },
  "year-desc": { label: "Newest first", compare: (a, b) => b.yearValue - a.yearValue || a.title.localeCompare(b.title) },
  "year-asc": { label: "Oldest first", compare: (a, b) => a.yearValue - b.yearValue || a.title.localeCompare(b.title) },
  title: { label: "Title A–Z", compare: (a, b) => a.title.localeCompare(b.title) },
  prep: { label: "Lightest preparation", compare: (a, b) => a.__burden - b.__burden || a.__rank - b.__rank },
  role: { label: "Curriculum role", compare: (a, b) => a.__role - b.__role || a.__rank - b.__rank },
};

const BURDEN_RANK = { Low: 0, "Low–Medium": 1, Medium: 2, "Medium–High": 3, High: 4 };

/** Above the split breakpoint the rail is always expanded and has no toggle. */
const wideEnoughForRail = () => (typeof window === "undefined" ? true : window.innerWidth >= 1100);

const listOf = (query, key) => (query[key] ? String(query[key]).split(",").filter(Boolean) : []);

const withParam = (query, key, value) => {
  const next = { ...query };
  if (value === null || value === undefined || value === "") delete next[key];
  else next[key] = value;
  delete next.n;
  const pairs = Object.entries(next).filter(([, item]) => item !== "" && item !== undefined);
  return pairs.length ? `?${pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}` : "";
};

const toggleInList = (query, key, value) => {
  const current = listOf(query, key);
  const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
  return withParam(query, key, next.join(","));
};

/** Attach sort keys and evaluate every predicate except the named facet. */
const prepare = (app) => {
  const rankOf = new Map();
  let counter = 0;
  for (const topic of app.model.topics) {
    for (const id of topic.paperIds) rankOf.set(id, counter++);
  }
  return app.model.papers.map((paper) => ({
    ...paper,
    __rank: rankOf.get(paper.id) ?? 9999,
    __burden: BURDEN_RANK[paper.burden] ?? 2,
    __role: (paper.roles.length ? Math.min(...paper.roles.map((role) => app.model.roles.indexOf(role))) : 99),
    __haystack: normalize([paper.id, paper.title, paper.authors, paper.venue, paper.contribution,
      paper.lineage, paper.limitation, paper.topic_id, paper.role, paper.preparation].join(" ")),
  }));
};

const predicates = (app, query) => {
  const text = normalize(String(query.q || "").trim());
  const roles = listOf(query, "role");
  const levels = listOf(query, "level");
  const burdens = listOf(query, "prep");
  const areas = listOf(query, "area");
  const topics = listOf(query, "topic");
  const reading = listOf(query, "reading");
  const flags = listOf(query, "flag");
  return {
    q: (paper) => !text || paper.__haystack.includes(text),
    role: (paper) => !roles.length || paper.roles.some((role) => roles.includes(role)),
    level: (paper) => !levels.length || levels.includes(paper.level),
    prep: (paper) => !burdens.length || burdens.includes(paper.burden),
    area: (paper) => !areas.length || areas.includes(paper.areaId),
    topic: (paper) => !topics.length || topics.includes(paper.topic_id),
    reading: (paper) => {
      if (!reading.length) return true;
      const status = app.engine.readingStateOf(paper.id).status;
      return reading.includes(status || "none");
    },
    flag: (paper) => flags.every((flag) => {
      if (flag === "core") return paper.requiredCore;
      if (flag === "beyond") return !paper.requiredCore;
      if (flag === "critical") return paper.critical;
      if (flag === "code") return Boolean(paper.codeURL);
      if (flag === "starred") return app.engine.readingStateOf(paper.id).starred;
      if (flag === "noted") return Boolean((app.state.notes[paper.id] || "").trim());
      if (flag === "hidden") return app.engine.isDisabled(paper.id);
      if (flag === "next") {
        const relevance = app.engine.paperRelevance(paper.id);
        return Boolean(relevance.next || relevance.soon);
      }
      if (flag === "route") {
        const relevance = app.engine.paperRelevance(paper.id);
        return Boolean(relevance.next || relevance.soon || relevance.activeTopic || relevance.route);
      }
      return true;
    }),
  };
};

const applyAll = (papers, tests, skip = null) => papers.filter((paper) => Object.entries(tests)
  .every(([key, test]) => key === skip || test(paper)));

const facetBlock = (title, key, options, query, hint = "") => html`<div class="facet">
  <h3>${title}</h3>
  ${hint ? html`<p class="small dim" style="margin:-.15rem 0 .35rem">${hint}</p>` : ""}
  <div class="facet-options ${options.length > 14 ? "facet-options--scroll" : ""}">
    ${options.map((option) => {
  const selected = listOf(query, key).includes(option.value);
  return html`<a class="check" href="#/papers${toggleInList(query, key, option.value)}"
        role="checkbox" aria-checked="${selected ? "true" : "false"}" title="${option.title || ""}">
        <input type="checkbox" ${selected ? raw("checked") : ""} tabindex="-1" aria-hidden="true" readonly>
        <span>${option.label}</span><span class="count">${option.count}</span>
      </a>`;
})}
  </div>
</div>`;

const collectionTabs = (app, current) => html`<div class="pill-tabs" style="margin-bottom:.85rem">
  <a href="#/papers" ${current === "papers" ? raw('aria-current="page"') : ""}>Papers <span class="dim">${app.model.papers.length}</span></a>
  <a href="#/resources" ${current === "resources" ? raw('aria-current="page"') : ""}>Supporting resources <span class="dim">${app.model.resources.length}</span></a>
  <a href="#/frontier" ${current === "frontier" ? raw('aria-current="page"') : ""}>Frontier watchlist <span class="dim">${app.model.frontierItems.length}</span></a>
</div>`;

export const papersView = {
  title: () => "Papers — Golem Curriculum",
  render(app, params) {
    const query = params.query || {};
    const all = prepare(app);
    const tests = predicates(app, query);
    const results = applyAll(all, tests);

    const signature = JSON.stringify(query);
    if (signature !== lastSignature) { shown = PAGE_STEP; lastSignature = signature; }

    const countBy = (skip, keyFn) => {
      const pool = applyAll(all, tests, skip);
      const counts = new Map();
      for (const paper of pool) {
        for (const value of [keyFn(paper)].flat()) {
          if (value === null || value === undefined) continue;
          counts.set(value, (counts.get(value) || 0) + 1);
        }
      }
      return counts;
    };

    const roleCounts = countBy("role", (paper) => paper.roles);
    const levelCounts = countBy("level", (paper) => paper.level);
    const prepCounts = countBy("prep", (paper) => paper.burden);
    const areaCounts = countBy("area", (paper) => paper.areaId);
    const topicCounts = countBy("topic", (paper) => paper.topic_id);
    const readingCounts = countBy("reading", (paper) => app.engine.readingStateOf(paper.id).status || "none");
    const flagPool = applyAll(all, tests, "flag");
    const flagCount = (test) => flagPool.filter(test).length;

    const sortKey = SORTS[query.sort] ? query.sort : "curriculum";
    results.sort(SORTS[sortKey].compare);

    const activeFilters = ["q", "role", "level", "prep", "area", "topic", "reading", "flag"]
      .filter((key) => query[key]);

    const visible = results.slice(0, shown);

    return html`<div class="page">
      <div class="page-head">
        <div class="split-row">
          <div>
            <h1>Papers</h1>
            <p class="lead">Every primary source in the curriculum, with its role, preparation burden, lineage and the
              sessions that use it. ${app.model.papers.length} papers across ${app.model.topics.length} topics.</p>
          </div>
          <a class="button button--secondary" href="#/place">${icon("plus")} I found a paper</a>
        </div>
      </div>

      ${collectionTabs(app, "papers")}

      <div class="split split--rail-left">
        <aside class="rail" aria-label="Filter papers">
          <h2 class="visually-hidden">Filters</h2>
          <details class="facet-panel" ${wideEnoughForRail() || activeFilters.length ? raw("open") : ""}>
            <summary>Filters${activeFilters.length ? html` <span class="chip chip--accent">${activeFilters.length} active</span>` : ""}</summary>
          <form class="facets" data-paper-filters onsubmit="return false">
            <div class="facet">
              <h3>Search</h3>
              <input type="search" name="q" value="${query.q || ""}" data-act="filter-search"
                placeholder="Title, author, contribution…" aria-label="Search papers">
            </div>
            ${facetBlock("Curriculum role", "role",
    app.model.roles.filter((role) => roleCounts.get(role))
      .map((role) => ({ value: role, label: role, count: roleCounts.get(role) || 0, title: ROLE_NOTES[role] })),
    query, "What the paper is for, not how good it is.")}
            ${facetBlock("Technical level", "level",
    app.model.levels.filter((level) => levelCounts.get(level))
      .map((level) => ({ value: level, label: level, count: levelCounts.get(level) || 0 })), query)}
            ${facetBlock("Preparation burden", "prep",
    app.model.burdens.filter((burden) => prepCounts.get(burden))
      .map((burden) => ({ value: burden, label: burden, count: prepCounts.get(burden) || 0 })), query)}
            ${facetBlock("Area", "area",
    app.model.areas.filter((area) => areaCounts.get(area.id))
      .map((area) => ({ value: area.id, label: area.short_label, count: areaCounts.get(area.id) || 0 })), query)}
            ${facetBlock("Topic", "topic",
    app.model.topics.filter((topic) => topicCounts.get(topic.id))
      .map((topic) => ({ value: topic.id, label: `${topic.id} · ${truncate(topic.title, 30)}`, count: topicCounts.get(topic.id) || 0 })), query)}
            ${facetBlock("My reading state", "reading", [
    { value: "none", label: "Not marked" },
    ...Object.entries(READING_LABEL).map(([value, label]) => ({ value, label })),
  ].filter((option) => readingCounts.get(option.value))
    .map((option) => ({ ...option, count: readingCounts.get(option.value) || 0 })), query)}
            ${facetBlock("Filters", "flag", [
    {
      value: "next",
      label: "In a session I am about to do",
      count: flagCount((paper) => {
        const relevance = app.engine.paperRelevance(paper.id);
        return Boolean(relevance.next || relevance.soon);
      }),
    },
    {
      value: "route",
      label: "Anywhere on my current route",
      count: flagCount((paper) => {
        const relevance = app.engine.paperRelevance(paper.id);
        return Boolean(relevance.next || relevance.soon || relevance.activeTopic || relevance.route);
      }),
    },
    { value: "core", label: "Used by a Required Core session", count: flagCount((paper) => paper.requiredCore) },
    { value: "beyond", label: "Frontier or optional only", count: flagCount((paper) => !paper.requiredCore) },
    { value: "critical", label: "Marked critical", count: flagCount((paper) => paper.critical) },
    { value: "code", label: "Has official code", count: flagCount((paper) => Boolean(paper.codeURL)) },
    { value: "starred", label: "Starred by me", count: flagCount((paper) => app.engine.readingStateOf(paper.id).starred) },
    { value: "noted", label: "I wrote a note", count: flagCount((paper) => Boolean((app.state.notes[paper.id] || "").trim())) },
    { value: "hidden", label: "Hidden from my path", count: flagCount((paper) => app.engine.isDisabled(paper.id)) },
  ].filter((option) => option.count), query)}
          </form>
          </details>
        </aside>

        <div class="stack">
          <div class="row row--between">
            <p class="small muted" style="margin:0" role="status">
              <strong>${results.length}</strong> of ${app.model.papers.length} papers${activeFilters.length ? " match your filters" : ""}.
              <span class="dim">Track cycles a paper through to read, reading, skimmed and read.</span>
              ${activeFilters.length ? html`<a class="link-button small" href="#/papers" style="margin-left:.4rem">Clear all</a>` : ""}
            </p>
            <div class="row row--tight">
              ${results.length && results.length <= 100 ? html`<button type="button" class="button button--ghost button--small"
                data-act="plan-many" data-kind="paper" data-ids="${results.map((paper) => paper.id).join(",")}">
                ${icon("plus")} Add ${results.length === app.model.papers.length ? "all" : `these ${results.length}`} to my plan</button>` : ""}
            <label class="row row--tight small" style="gap:.4rem">
              <span class="dim">Sort</span>
              <select data-act="set-sort" style="width:auto">
                ${Object.entries(SORTS).map(([value, sort]) => html`<option value="${value}" ${value === sortKey ? raw("selected") : ""}>${sort.label}</option>`)}
              </select>
            </label>
            </div>
          </div>

          ${results.length
    ? html`<div class="card card--flush">${visible.map((paper) => paperRow(app, paper))}</div>
              ${results.length > visible.length
    ? html`<div class="row" style="justify-content:center;margin-top:.85rem">
                    <button type="button" class="button button--secondary" data-act="show-more">Show ${Math.min(PAGE_STEP, results.length - visible.length)} more of ${results.length - visible.length}</button>
                  </div>` : ""}`
    : emptyState(html`Nothing matches these filters. ${activeFilters.length ? "Try removing one." : ""}`.value,
      '<a class="button button--secondary button--small" href="#/papers">Reset the filters</a>')}
        </div>
      </div>
    </div>`;
  },
};

export const resourcesView = {
  title: () => "Supporting resources — Golem Curriculum",
  render(app, params) {
    const query = params.query || {};
    const text = normalize(String(query.q || "").trim());
    const topicFilter = query.topic || "";
    const results = app.model.resources.filter((resource) => {
      if (topicFilter && !resource.topic_ids.includes(topicFilter)) return false;
      if (!text) return true;
      return normalize([resource.id, resource.title, resource.type, resource.required_use, resource.topics_raw].join(" ")).includes(text);
    });
    return html`<div class="page page--reading">
      <div class="page-head">
        <h1>Supporting resources</h1>
        <p class="lead">Textbooks, lecture series, documentation and tooling that repair prerequisites. They are assigned
          to sessions deliberately and used selectively, not read end to end.</p>
      </div>
      ${collectionTabs(app, "resources")}
      <div class="row" style="margin-bottom:.85rem">
        <input type="search" value="${query.q || ""}" data-act="filter-search" placeholder="Filter resources…"
          aria-label="Filter resources" style="max-width:320px">
        <select data-act="filter-topic" style="width:auto">
          <option value="">All topics</option>
          ${app.model.topics.map((topic) => html`<option value="${topic.id}" ${topic.id === topicFilter ? raw("selected") : ""}>${topic.id} — ${truncate(topic.title, 44)}</option>`)}
        </select>
        <span class="small dim">${results.length} of ${app.model.resources.length}</span>
      </div>
      ${results.length ? html`<div class="entity-list">${results.map((resource) => {
    const disabled = app.engine.isDisabled(resource.id);
    return html`<div class="entity-row ${disabled ? "is-disabled" : ""}">
          <div class="split-row">
            <div class="grow">
              <a class="entity-title" href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.title} ${icon("external")}</a>
              <div class="entity-meta" style="margin-top:.2rem">
                <span class="chip chip--id">${resource.id}</span>
                <span class="chip">${resource.type}</span>
                <span class="chip ${resource.status === "Current" ? "chip--ok" : "chip--warn"}">${resource.status}</span>
                ${resource.topic_ids.map((id) => html`<a class="chip" href="#/topics/${id}">${id}</a>`)}
              </div>
              <p class="small muted" style="margin:.4rem 0 0">${resource.required_use}</p>
            </div>
            <div class="row row--tight">
              <button type="button" class="button button--ghost button--small" data-act="open-note" data-id="${resource.id}">Note</button>
              <button type="button" class="button button--ghost button--small" data-act="toggle-disabled" data-id="${resource.id}">${disabled ? "Re-enable" : "Hide"}</button>
            </div>
          </div>
        </div>`;
  })}</div>` : emptyState("No resource matches that filter.")}
    </div>`;
  },
};

export const frontierView = {
  title: () => "Frontier watchlist — Golem Curriculum",
  render(app) {
    return html`<div class="page page--reading">
      <div class="page-head">
        <h1>Frontier watchlist</h1>
        <p class="lead">Material that is interesting but not yet durable. Each record carries a maturity judgement,
          a review date and a decision — a fashionable paper is not a reason to change the curriculum.</p>
      </div>
      ${collectionTabs(app, "frontier")}
      <div class="entity-list">${app.model.frontierItems.map((item) => html`<div class="entity-row">
        <a class="entity-title" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title} ${icon("external")}</a>
        <div class="entity-meta" style="margin-top:.25rem">
          <span class="chip chip--id">${item.id}</span>
          <span class="chip ${item.decision === "Monitor" ? "chip--warn" : "chip--accent"}">${item.decision}</span>
          ${item.topic_ids.map((id) => html`<a class="chip" href="#/topics/${id}">${id}</a>`)}
          <span>Added ${item.date_added}</span>
          <span>·</span>
          <span>Review ${item.review_date}</span>
        </div>
        <dl class="deflist deflist--inline" style="margin-top:.55rem">
          <div><dt>Why watched</dt><dd>${item.reason}</dd></div>
          <div><dt>Maturity</dt><dd>${item.maturity}</dd></div>
          <div><dt>Latest evidence</dt><dd>${item.latest_evidence}</dd></div>
          <div><dt>Last checked</dt><dd>${item.last_checked}</dd></div>
        </dl>
        ${item.sessionIds.length ? html`<p class="small" style="margin:.5rem 0 0">Used in
          ${item.sessionIds.map((id, index) => {
    const session = app.model.sessionById.get(id);
    return session ? html`${index ? ", " : ""}<a href="#/sessions/${session.id}">${session.display_id}</a>` : "";
  })}</p>` : ""}
      </div>`)}</div>
    </div>`;
  },
};

export const resetPaging = () => { shown = PAGE_STEP; };
export const showMore = () => { shown += PAGE_STEP; };
