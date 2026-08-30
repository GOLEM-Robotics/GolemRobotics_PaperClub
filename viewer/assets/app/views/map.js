"use strict";

/**
 * The relationship map.
 *
 * Two layers over the same reviewed data. The topic layer shows which topics gate
 * which; the paper layer shows the curated lineages side by side and the links
 * between them. Clicking focuses a node and explains it; opening its page is a
 * separate, deliberate act.
 */

import { html, raw, truncate, plural } from "../dom.js";
import { AREA_TONE } from "../constants.js";
import { icon, roleChip, meter, planToggle } from "../ui.js";

const TOPIC_SCOPES = {
  entry: { label: "Topic-entry gates", test: (edge) => edge.type === "hard_prerequisite" && edge.scope === "topic_entry" },
  hard: { label: "All hard prerequisites", test: (edge) => edge.type === "hard_prerequisite" },
  all: { label: "Every typed relationship", test: () => true },
};

const REL_LABEL = {
  hard_prerequisite: "Hard prerequisite",
  recommended_background: "Recommended background",
  related: "Related",
  feedback: "Feedback / co-development",
};

/**
 * Fit the drawing to the room available.
 *
 * Below `FLOOR` of its natural size the labels stop being readable, so that is
 * the point where a horizontal scrollbar becomes the lesser evil. Above natural
 * size it may grow, bounded both by `CEILING` and by the viewport height, so a
 * very wide window is used rather than left empty.
 */
const FLOOR = 0.78;
const CEILING = 1.3;
const HEIGHT_SHARE = 85;

const fitStyle = (width, height) => [
  "width:100%",
  "height:auto",
  `min-width:${Math.round(width * FLOOR)}px`,
  `max-width:min(${Math.round(width * CEILING)}px, ${((HEIGHT_SHARE * width) / height).toFixed(1)}vh)`,
].join(";");

const link = (query) => {
  const pairs = Object.entries(query).filter(([, value]) => value !== "" && value !== null && value !== undefined);
  return pairs.length ? `#/map?${pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}` : "#/map";
};

/* ----------------------------------------------------------- topic layer */

const topicLayer = (app, query) => {
  const NODE_W = 168;
  const NODE_H = 64;
  const GAP = 8;
  const scaleX = 1.32;
  const scaleY = 1.24;
  const LABEL_BAND = 34;
  const PAD = 12;
  const scope = TOPIC_SCOPES[query.scope] ? query.scope : "entry";
  const focus = query.focus && app.model.topicById.has(query.focus) ? query.focus : null;

  // The reviewed layout carries its own outer margin; strip it so the drawing
  // spends its width on nodes rather than on empty gutters.
  const originX = Math.min(...app.model.topics.map((topic) => topic.positions.map.x));
  const originY = Math.min(...app.model.topics.map((topic) => topic.positions.map.y));
  const position = new Map(app.model.topics.map((topic) => [topic.id, {
    x: Math.round((topic.positions.map.x - originX) * scaleX) + PAD,
    y: Math.round((topic.positions.map.y - originY) * scaleY) + LABEL_BAND + PAD,
  }]));
  const width = Math.max(...[...position.values()].map((point) => point.x)) + NODE_W + PAD;
  const height = Math.max(...[...position.values()].map((point) => point.y)) + NODE_H + PAD;

  const edges = app.model.relationships.filter((edge) => position.has(edge.source) && position.has(edge.target)
    && TOPIC_SCOPES[scope].test(edge));
  const neighbours = new Set();
  if (focus) {
    neighbours.add(focus);
    for (const edge of edges) {
      if (edge.source === focus) neighbours.add(edge.target);
      if (edge.target === focus) neighbours.add(edge.source);
    }
  }
  const drawn = focus ? edges.filter((edge) => edge.source === focus || edge.target === focus) : edges;

  const areaLabels = app.model.areas.map((area) => {
    const first = area.topic_ids.map((id) => position.get(id)).filter(Boolean)[0];
    return first ? { label: area.short_label, x: first.x, y: LABEL_BAND } : null;
  }).filter(Boolean);

  const path = (edge) => {
    const from = position.get(edge.source);
    const to = position.get(edge.target);
    const forward = to.x >= from.x + NODE_W;
    const backward = to.x + NODE_W <= from.x;
    let x1;
    let x2;
    if (forward) { x1 = from.x + NODE_W + GAP; x2 = to.x - GAP; }
    else if (backward) { x1 = from.x - GAP; x2 = to.x + NODE_W + GAP; }
    else { x1 = from.x + NODE_W / 2; x2 = to.x + NODE_W / 2; }
    const y1 = from.y + NODE_H / 2;
    const y2 = to.y + NODE_H / 2;
    if (!forward && !backward) {
      const bend = Math.max(34, Math.abs(y2 - y1) / 2);
      return `M${x1} ${y1} C${x1 + bend} ${y1} ${x2 + bend} ${y2} ${x2} ${y2}`;
    }
    const mid = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
  };

  return {
    count: drawn.length,
    totals: `${drawn.length} of ${edges.length} shown`,
    controls: html`<label class="small dim" for="map-scope">Relationships</label>
      <select id="map-scope" data-act="map-control" data-key="scope" style="width:auto">
        ${Object.entries(TOPIC_SCOPES).map(([id, item]) => html`<option value="${id}" ${id === scope ? raw("selected") : ""}>${item.label}</option>`)}
      </select>`,
    svg: html`<svg class="map-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet"
      style="${fitStyle(width, height)}" role="group" aria-label="Topic relationship map">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="currentColor"></path>
        </marker>
      </defs>
      ${areaLabels.map((item) => html`<text class="map-area-label" x="${item.x}" y="${item.y}">${item.label}</text>`)}
      <g class="map-edges" color="var(--border-strong)">
        ${drawn.map((edge) => html`<path class="map-edge ${edge.type === "hard_prerequisite" ? "" : "is-soft"} ${focus ? "is-highlight" : ""}"
          d="${path(edge)}" marker-end="url(#arrow)"><title>${edge.source} to ${edge.target}: ${REL_LABEL[edge.type]}</title></path>`)}
      </g>
      ${app.model.topics.map((topic) => {
    const point = position.get(topic.id);
    const metrics = app.engine.topicMetrics(topic.id);
    const complete = metrics.coreComplete || metrics.validated;
    const ready = app.engine.isTopicReady(topic.id);
    const dim = focus && !neighbours.has(topic.id);
    const state = complete ? "Core complete" : ready ? "Ready to enter" : `Blocked by ${app.engine.topicBlockers(topic.id).join(", ")}`;
    return html`<g class="map-node ${complete ? "is-done" : ""} ${ready && !complete ? "is-ready" : ""} ${topic.id === focus ? "is-focus" : ""}"
        role="button" tabindex="0" opacity="${dim ? "0.22" : "1"}"
        data-map-node="topic" data-id="${topic.id}"
        aria-label="${topic.id}, ${topic.title}. ${state}. Activate to focus, double-click to open."
        aria-pressed="${topic.id === focus ? "true" : "false"}">
        <title>${topic.id} — ${topic.title}. ${state}.</title>
        <rect x="${point.x}" y="${point.y}" width="${NODE_W}" height="${NODE_H}" rx="9"></rect>
        <text class="map-id" x="${point.x + 12}" y="${point.y + 22}">${topic.id}</text>
        <text class="map-label" x="${point.x + 12}" y="${point.y + 40}">${truncate(topic.short_title || topic.title, 24)}</text>
        <text class="map-meta" x="${point.x + 12}" y="${point.y + 56}">${metrics.coreDone}/${metrics.coreTotal} core${ready || complete ? "" : " · blocked"}</text>
      </g>`;
  })}
    </svg>`,
  };
};

/* ----------------------------------------------------------- paper layer */

const paperColumns = (app, query) => {
  const focusPaper = query.focus && app.model.paperById.has(query.focus) ? app.model.paperById.get(query.focus) : null;
  if (focusPaper) {
    const ids = new Set([focusPaper.topic_id]);
    for (const link of [...focusPaper.lineageInfo.links, ...focusPaper.lineageInfo.backlinks]) {
      const other = app.model.paperById.get(link.id);
      if (other) ids.add(other.topic_id);
    }
    for (const id of focusPaper.lineageInfo.topicIds) ids.add(id);
    return app.model.topics.filter((topic) => ids.has(topic.id));
  }
  const areaId = query.area && app.model.areaById.has(query.area) ? query.area : app.model.areas[0].id;
  return app.model.topics.filter((topic) => topic.area_id === areaId);
};

const paperLayer = (app, query) => {
  const NODE_W = 206;
  const NODE_H = 72;
  const COL_GAP = 34;
  const ROW_GAP = 18;
  const HEADER = 92;
  const columns = paperColumns(app, query);
  const focus = query.focus && app.model.paperById.has(query.focus) ? query.focus : null;

  const position = new Map();
  const columnOf = new Map();
  columns.forEach((topic, columnIndex) => {
    columnOf.set(topic.id, columnIndex);
    (app.model.papersByTopic.get(topic.id) || []).forEach((paperId, rowIndex) => {
      position.set(paperId, {
        x: columnIndex * (NODE_W + COL_GAP) + 16,
        y: HEADER + rowIndex * (NODE_H + ROW_GAP),
      });
    });
  });

  const rows = Math.max(1, ...columns.map((topic) => (app.model.papersByTopic.get(topic.id) || []).length));
  const width = columns.length * (NODE_W + COL_GAP) + 16;
  const height = HEADER + rows * (NODE_H + ROW_GAP) + 20;

  // Lineage chain inside a topic is authoritative; note references are inferred.
  const edges = [];
  for (const topic of columns) {
    const lineage = app.model.papersByTopic.get(topic.id) || [];
    for (let index = 0; index < lineage.length - 1; index += 1) {
      edges.push({ from: lineage[index], to: lineage[index + 1], kind: "lineage" });
    }
  }
  for (const [paperId, point] of position) {
    const paper = app.model.paperById.get(paperId);
    if (!paper || !point) continue;
    for (const item of paper.lineageInfo.links) {
      if (!position.has(item.id)) continue;
      edges.push({ from: paperId, to: item.id, kind: "note", evidence: item.evidence });
    }
  }

  const neighbours = new Set();
  if (focus) {
    neighbours.add(focus);
    for (const edge of edges) {
      if (edge.from === focus) neighbours.add(edge.to);
      if (edge.to === focus) neighbours.add(edge.from);
    }
  }
  const drawn = focus ? edges.filter((edge) => edge.from === focus || edge.to === focus) : edges;

  const path = (edge) => {
    const from = position.get(edge.from);
    const to = position.get(edge.to);
    if (edge.kind === "lineage" && from.x === to.x) {
      return `M${from.x + NODE_W / 2} ${from.y + NODE_H + 3} L${to.x + NODE_W / 2} ${to.y - 5}`;
    }
    const rightwards = to.x > from.x;
    const x1 = rightwards ? from.x + NODE_W + 4 : from.x - 4;
    const x2 = rightwards ? to.x - 6 : to.x + NODE_W + 6;
    const y1 = from.y + NODE_H / 2;
    const y2 = to.y + NODE_H / 2;
    const mid = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
  };

  return {
    count: drawn.length,
    totals: `${plural([...position.keys()].length, "paper")} in ${plural(columns.length, "lineage")}`,
    controls: html`<label class="small dim" for="map-area">Area</label>
      <select id="map-area" data-act="map-control" data-key="area" style="width:auto" ${focus ? raw("disabled") : ""}>
        ${app.model.areas.map((area) => html`<option value="${area.id}" ${area.id === (query.area || app.model.areas[0].id) ? raw("selected") : ""}>${area.label}</option>`)}
      </select>
      ${focus ? html`<span class="small dim">Showing the lineages around ${focus}</span>` : ""}`,
    svg: html`<svg class="map-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet"
      style="${fitStyle(width, height)}" role="group" aria-label="Paper lineage map">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="currentColor"></path>
        </marker>
      </defs>
      ${columns.map((topic) => {
    const x = columnOf.get(topic.id) * (NODE_W + COL_GAP) + 16;
    return html`<g class="map-column" role="button" tabindex="0" data-map-node="topic" data-id="${topic.id}"
        aria-label="${topic.id}, ${topic.title}. Activate to focus the topic layer on it.">
        <title>${topic.id} — ${topic.title}</title>
        <rect class="map-column-band" x="${x - 10}" y="${HEADER - 22}" width="${NODE_W + 20}" height="${height - HEADER + 12}" rx="12"></rect>
        <text class="map-id" x="${x}" y="${28}">${topic.id}</text>
        <text class="map-label" x="${x}" y="${46}">${truncate(topic.title, 28)}</text>
        <text class="map-meta" x="${x}" y="${62}">${plural((app.model.papersByTopic.get(topic.id) || []).length, "paper")}</text>
      </g>`;
  })}
      <g class="map-edges" color="var(--border-strong)">
        ${drawn.map((edge) => html`<path class="map-edge ${edge.kind === "note" ? "is-soft" : ""} ${focus ? "is-highlight" : ""}"
          d="${path(edge)}" marker-end="url(#arrow)">
          <title>${edge.from} to ${edge.to}: ${edge.kind === "lineage" ? "next in the curated lineage" : `named in the lineage note (“${edge.evidence}”)`}</title>
        </path>`)}
      </g>
      ${[...position.keys()].map((paperId) => {
    const paper = app.model.paperById.get(paperId);
    const point = position.get(paperId);
    if (!paper) return "";
    const record = app.engine.readingStateOf(paperId);
    const dim = focus && !neighbours.has(paperId);
    const planned = app.engine.inPlan("paper", paperId);
    return html`<g class="map-node map-paper ${record.status === "read" ? "is-done" : ""} ${planned ? "is-planned" : ""} ${paperId === focus ? "is-focus" : ""}"
        role="button" tabindex="0" opacity="${dim ? "0.2" : "1"}"
        data-map-node="paper" data-id="${paperId}"
        aria-label="${paper.id}, ${paper.title}, ${paper.year}, ${paper.role}${record.status ? `, you marked it ${record.status}` : ""}. Activate to focus, double-click to open."
        aria-pressed="${paperId === focus ? "true" : "false"}">
        <title>${paper.id} — ${paper.title}</title>
        <rect x="${point.x}" y="${point.y}" width="${NODE_W}" height="${NODE_H}" rx="9"></rect>
        <text class="map-meta" x="${point.x + 12}" y="${point.y + 20}">${paper.id} · ${paper.year} · ${paper.role}</text>
        <text class="map-label map-title" x="${point.x + 12}" y="${point.y + 40}">${truncate(paper.title, 27)}</text>
        <text class="map-meta" x="${point.x + 12}" y="${point.y + 58}">${paper.level} · ${paper.burden} prep${planned ? " · planned" : ""}${record.status ? ` · ${record.status}` : ""}</text>
      </g>`;
  })}
    </svg>`,
  };
};

/* --------------------------------------------------------- details panel */

const topicDetails = (app, topic) => {
  const metrics = app.engine.topicMetrics(topic.id);
  const incoming = topic.relationships.incoming;
  const outgoing = topic.relationships.outgoing;
  return html`<section class="card">
    <div class="row row--tight">
      <span class="chip chip--id">${topic.id}</span>
      <span class="chip" data-tone="${AREA_TONE[topic.area_id]}">${topic.area_short_label}</span>
      <span class="chip">${topic.status}</span>
    </div>
    <h2 class="card-title" style="margin-top:.4rem">${topic.title}</h2>
    <p class="small muted" style="margin:.35rem 0 0">${topic.curriculum_role}</p>
    <div style="margin-top:.6rem">${meter(metrics.coreDone, metrics.coreTotal, metrics.coreComplete ? "meter--ok" : "")}</div>
    <p class="small dim" style="margin:.3rem 0 0">${metrics.coreDone}/${metrics.coreTotal} Required Core ·
      ${plural(topic.paperIds.length, "paper")}</p>
    <div class="row" style="margin-top:.7rem">
      <a class="button button--primary button--small" href="#/topics/${topic.id}">Open ${topic.id} ${icon("arrowRight")}</a>
      ${planToggle(app, "topic", topic.id)}
      <a class="button button--ghost button--small" href="${link({ layer: "papers", focus: "", area: topic.area_id })}">Its papers on the map</a>
    </div>
    <div style="margin-top:.85rem">
      <p class="eyebrow">Comes before it (${incoming.length})</p>
      <ul class="reasons" style="margin-top:.3rem">
        ${incoming.length ? incoming.map((edge) => html`<li>
          <a href="${link({ layer: "topics", focus: edge.source })}">${edge.source}</a> — ${REL_LABEL[edge.type]}${edge.scope === "target_sessions" ? ", named sessions only" : ""}
        </li>`) : html`<li>Nothing has to come first.</li>`}
      </ul>
    </div>
    <div style="margin-top:.7rem">
      <p class="eyebrow">Depends on it (${outgoing.length})</p>
      <ul class="reasons" style="margin-top:.3rem">
        ${outgoing.length ? outgoing.map((edge) => html`<li>
          <a href="${link({ layer: "topics", focus: edge.target })}">${edge.target}</a> — ${REL_LABEL[edge.type]}
        </li>`) : html`<li>No topic is gated on it.</li>`}
      </ul>
    </div>
  </section>`;
};

const paperDetails = (app, paper) => {
  const record = app.engine.readingStateOf(paper.id);
  const previous = paper.previousInTopic ? app.model.paperById.get(paper.previousInTopic) : null;
  const next = paper.nextInTopic ? app.model.paperById.get(paper.nextInTopic) : null;
  const references = paper.lineageInfo.links.map((item) => app.model.paperById.get(item.id)).filter(Boolean);
  const referenced = paper.lineageInfo.backlinks.map((item) => app.model.paperById.get(item.id)).filter(Boolean);
  return html`<section class="card">
    <div class="row row--tight">
      <span class="chip chip--id">${paper.id}</span>
      <a class="chip" href="#/topics/${paper.topic_id}">${paper.topic_id}</a>
      ${roleChip(paper)}
      <span class="chip">${paper.year}</span>
    </div>
    <h2 class="card-title" style="margin-top:.4rem">${paper.title}</h2>
    <p class="small dim" style="margin:.2rem 0 0">${paper.authors}${paper.venue ? ` · ${paper.venue}` : ""}</p>
    <p class="small muted" style="margin:.45rem 0 0">${paper.contribution}</p>
    <div class="row" style="margin-top:.7rem">
      <a class="button button--primary button--small" href="#/papers/${paper.id}">Open ${paper.id} ${icon("arrowRight")}</a>
      ${planToggle(app, "paper", paper.id)}
      <a class="button button--ghost button--small" href="${paper.url}" target="_blank" rel="noopener noreferrer">The paper ${icon("external")}</a>
    </div>
    ${record.status ? html`<p class="small dim" style="margin-top:.5rem">You marked it ${record.status}.</p>` : ""}
    <div style="margin-top:.85rem">
      <p class="eyebrow">Position ${paper.lineagePosition + 1} of ${paper.lineageLength} in ${paper.topic_id}</p>
      <ul class="reasons" style="margin-top:.3rem">
        ${previous ? html`<li>After <a href="${link({ layer: "papers", focus: previous.id })}">${previous.id}</a> — ${truncate(previous.title, 44)}</li>` : html`<li>It opens the lineage.</li>`}
        ${next ? html`<li>Before <a href="${link({ layer: "papers", focus: next.id })}">${next.id}</a> — ${truncate(next.title, 44)}</li>` : html`<li>It closes the lineage.</li>`}
      </ul>
    </div>
    ${references.length || referenced.length ? html`<div style="margin-top:.7rem">
      <p class="eyebrow">Named in lineage notes</p>
      <ul class="reasons" style="margin-top:.3rem">
        ${references.map((other) => html`<li>Its own note names
          <a href="${link({ layer: "papers", focus: other.id })}">${other.id}</a> — ${truncate(other.title, 40)}</li>`)}
        ${referenced.map((other) => html`<li><a href="${link({ layer: "papers", focus: other.id })}">${other.id}</a>'s note names this one</li>`)}
      </ul>
      <p class="small dim" style="margin-top:.35rem">Inferred from the canonical notes by name matching; the notes themselves are unchanged.</p>
    </div>` : ""}
  </section>`;
};

/* ------------------------------------------------------------------ view */

export default {
  title: (app, params) => (params.query?.layer === "papers" ? "Paper map" : "Topic map") + " — Golem Curriculum",
  render(app, params) {
    const query = params.query || {};
    const layer = query.layer === "papers" ? "papers" : "topics";
    const rendered = layer === "papers" ? paperLayer(app, query) : topicLayer(app, query);

    const focusId = query.focus || "";
    const focusTopic = app.model.topicById.get(focusId);
    const focusPaper = app.model.paperById.get(focusId);

    return html`<div class="page page--full">
      <div class="page-head">
        <div class="split-row">
          <div>
            <h1>Relationship map</h1>
            <p class="lead">Two views of the same reviewed relationships. Click a node to focus it and read what it
              connects to; double-click, or use the panel, to open its page.</p>
          </div>
          <div class="pill-tabs">
            <a href="${link({ layer: "topics", scope: query.scope, focus: focusTopic ? focusId : "" })}"
              ${layer === "topics" ? raw('aria-current="page"') : ""}>Topics</a>
            <a href="${link({ layer: "papers", area: query.area, focus: focusPaper ? focusId : "" })}"
              ${layer === "papers" ? raw('aria-current="page"') : ""}>Papers</a>
          </div>
        </div>
      </div>

      <div class="row row--between" style="margin-bottom:.7rem">
        <div class="row row--tight">${rendered.controls}</div>
        <div class="row row--tight">
          <span class="small dim">${rendered.totals}</span>
          ${focusId ? html`<a class="button button--ghost button--small" href="${link({ layer, scope: query.scope, area: query.area })}">Clear focus</a>` : ""}
        </div>
      </div>

      <div class="${focusId ? "split split--wide-rail" : ""}">
        <div>
          <div class="map-frame" data-map-frame>${rendered.svg}</div>
          <div class="row row--tight" style="margin-top:.6rem">
            ${layer === "topics"
    ? html`<span class="chip chip--ok">Core complete</span><span class="chip chip--ready">Ready to enter</span><span class="chip">Blocked</span>
        <span class="small dim">Solid arrows block; dashed arrows never do.</span>`
    : html`<span class="chip chip--ok">Read</span><span class="chip chip--accent">In my plan</span>
        <span class="small dim">Solid arrows follow the curated lineage; dashed arrows are references inferred from lineage notes.</span>`}
          </div>
          <p class="small dim" style="margin-top:.5rem">The map fills the window and only scrolls sideways when it genuinely
            cannot fit. Every node is reachable with Tab; Enter or Space focuses it and opens a panel with the real link,
            and a double-click goes straight there. Prefer the
            <a href="#/curriculum?mode=matrix">matrix</a> if you would rather read this as text.</p>
        </div>

        ${focusId ? html`<aside class="rail stack" aria-label="Focused node" data-map-panel>
          ${focusPaper && layer === "papers" ? paperDetails(app, focusPaper) : focusTopic ? topicDetails(app, focusTopic)
    : html`<section class="card card--quiet"><p class="small muted">Nothing is focused.</p></section>`}
        </aside>` : ""}
      </div>
    </div>`;
  },
};
