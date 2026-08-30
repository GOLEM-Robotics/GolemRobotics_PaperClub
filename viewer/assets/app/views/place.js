"use strict";

import { html, raw, truncate, normalize, plural } from "../dom.js";
import { crumbs, icon, roleChip, emptyState, planToggle } from "../ui.js";

const STOP = new Set(["the", "a", "an", "of", "for", "and", "with", "to", "in", "on", "via", "using", "from",
  "is", "are", "by", "at", "as", "that", "this", "we", "our", "learning", "learn", "based", "towards", "toward",
  "new", "novel", "approach", "method", "methods", "model", "models", "networks", "network", "deep"]);

const tokens = (value) => normalize(value)
  .replace(/[^a-z0-9]+/g, " ")
  .split(" ")
  .filter((token) => token.length > 2 && !STOP.has(token));

const canonicalURL = (value) => {
  const text = String(value || "").trim();
  const arxiv = text.match(/arxiv\.org\/(?:abs|pdf)\/([0-9]{4}\.[0-9]{4,5})/i) || text.match(/\barxiv[:\s]*([0-9]{4}\.[0-9]{4,5})/i)
    || text.match(/^([0-9]{4}\.[0-9]{4,5})(v\d+)?$/);
  if (arxiv) return `arxiv:${arxiv[1]}`;
  const doi = text.match(/\b(10\.\d{4,9}\/[^\s"'<>]+)/i);
  if (doi) return `doi:${doi[1].toLowerCase().replace(/[.,;]$/, "")}`;
  try {
    const url = new URL(text);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "").toLowerCase()}`;
  } catch { return null; }
};

const identify = (app, input) => {
  const key = canonicalURL(input);
  if (key) {
    const exact = app.model.papers.find((paper) => canonicalURL(paper.url) === key);
    if (exact) return { kind: "canonical", paper: exact, how: "The address matches this canonical record exactly." };
    const frontier = app.model.frontierItems.find((item) => canonicalURL(item.url) === key);
    if (frontier) return { kind: "frontier", item: frontier, how: "The address matches a frontier watchlist record." };
    const resource = app.model.resources.find((item) => canonicalURL(item.url) === key);
    if (resource) return { kind: "resource", item: resource, how: "The address matches a supporting resource." };
  }
  const queryTokens = new Set(tokens(input));
  if (queryTokens.size >= 2) {
    let best = null;
    for (const paper of app.model.papers) {
      const paperTokens = new Set(tokens(paper.title));
      if (!paperTokens.size) continue;
      let shared = 0;
      for (const token of queryTokens) if (paperTokens.has(token)) shared += 1;
      const score = shared / Math.max(paperTokens.size, 1);
      if (score >= 0.6 && (!best || score > best.score)) best = { paper, score };
    }
    if (best) {
      return {
        kind: "canonical",
        paper: best.paper,
        how: `The title overlaps this canonical record by ${Math.round(best.score * 100)}%. Confirm it is the same work before relying on the match.`,
      };
    }
  }
  return null;
};

const suggestPlacement = (app, input) => {
  const queryTokens = tokens(input);
  if (queryTokens.length < 2) return [];
  const weight = new Map();
  for (const token of queryTokens) weight.set(token, (weight.get(token) || 0) + 1);

  const scored = app.model.topics.map((topic) => {
    const haystack = tokens([topic.title, topic.covers, topic.target_competence, topic.curriculum_role].join(" "));
    const paperText = topic.paperIds.flatMap((id) => {
      const paper = app.model.paperById.get(id);
      return paper ? tokens(`${paper.title} ${paper.contribution}`) : [];
    });
    const pool = new Set([...haystack, ...paperText]);
    let score = 0;
    const matched = [];
    for (const token of new Set(queryTokens)) {
      if (pool.has(token)) { score += haystack.includes(token) ? 2 : 1; matched.push(token); }
    }
    return { topic, score, matched };
  }).filter((entry) => entry.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((entry) => {
    const sessions = (app.model.sessionsByTopic.get(entry.topic.id) || [])
      .filter((session) => /Paper lineage|Reconstruction|Frontier/.test(session.stage))
      .slice(0, 3);
    const closest = entry.topic.paperIds.map((id) => app.model.paperById.get(id)).filter(Boolean)
      .map((paper) => {
        const paperTokens = new Set(tokens(`${paper.title} ${paper.contribution}`));
        const shared = new Set(queryTokens).size
          ? [...new Set(queryTokens)].filter((token) => paperTokens.has(token)).length
          : 0;
        return { paper, shared };
      })
      .sort((a, b) => b.shared - a.shared)
      .filter((item) => item.shared > 0)
      .slice(0, 3);
    return { ...entry, sessions, closest };
  });
};

export default {
  title: () => "Place a paper — Golem Curriculum",
  render(app, params) {
    const input = String(params.query?.q || "").trim();
    const match = input ? identify(app, input) : null;
    const suggestions = input && !match ? suggestPlacement(app, input) : [];

    return html`<div class="page page--reading">
      ${crumbs([{ label: "Papers", href: "#/papers" }, { label: "Place a paper" }])}
      <div class="page-head">
        <h1>I found a paper — where does it fit?</h1>
        <p class="lead">Paste a link, an arXiv identifier, a DOI or the title. If the curriculum already contains it you
          get its exact placement. If it does not, you get the topics it most plausibly belongs to, and a safe way to add
          it to your own workspace or propose it for the canon.</p>
      </div>

      <form class="card" data-place-form style="margin-bottom:1.2rem">
        <label class="field">
          <span>Link, arXiv ID, DOI or title</span>
          <input type="text" name="q" value="${input}" autocomplete="off" spellcheck="false"
            placeholder="https://arxiv.org/abs/2303.04137 · 2303.04137 · Diffusion Policy: Visuomotor Policy Learning…">
        </label>
        <div class="row" style="margin-top:.7rem">
          <button type="submit" class="button button--primary">Find its place</button>
          ${input ? html`<a class="button button--ghost" href="#/place">Clear</a>` : ""}
        </div>
      </form>

      ${!input ? raw(emptyState("Nothing to identify yet. Paste something above.").value) : ""}

      ${match?.kind === "canonical" ? (() => {
    const paper = match.paper;
    const topic = app.model.topicById.get(paper.topic_id);
    const sessions = paper.sessionIds.map((id) => app.model.sessionById.get(id)).filter(Boolean);
    return html`<section class="card card--accent">
          <p class="eyebrow">Already in the curriculum</p>
          <h2 style="font-size:var(--fs-xl);margin-top:.25rem">${paper.title}</h2>
          <div class="row row--tight" style="margin-top:.5rem">
            <span class="chip chip--id">${paper.id}</span>
            <a class="chip" href="#/topics/${topic.id}">${topic.id} — ${truncate(topic.title, 40)}</a>
            ${roleChip(paper)}
            <span class="chip">${paper.year}</span>
          </div>
          <p class="small dim" style="margin-top:.5rem">${match.how}</p>
          <p class="prose" style="margin-top:.7rem">It sits at position <strong>${paper.lineagePosition + 1} of ${paper.lineageLength}</strong>
            in the ${topic.id} lineage and is used by ${plural(sessions.length, "session")}:
            ${sessions.map((session, index) => html`${index ? ", " : ""}<a href="#/sessions/${session.id}">${session.display_id}</a>`)}.</p>
          <div class="row" style="margin-top:.9rem">
            <a class="button button--primary" href="#/papers/${paper.id}">Open the paper page ${icon("arrowRight")}</a>
            ${planToggle(app, "paper", paper.id, { style: "button" })}
            ${paper.focusSessionId ? html`<a class="button button--ghost" href="#/sessions/${paper.focusSessionId}">Open its session</a>` : ""}
            <button type="button" class="button button--ghost" data-act="cycle-reading" data-id="${paper.id}">Mark my reading state</button>
          </div>
        </section>`;
  })() : ""}

      ${match?.kind === "frontier" || match?.kind === "resource" ? html`<section class="card card--accent">
        <p class="eyebrow">${match.kind === "frontier" ? "On the frontier watchlist" : "Already a supporting resource"}</p>
        <h2 style="font-size:var(--fs-lg);margin-top:.25rem">${match.item.title}</h2>
        <p class="small dim" style="margin-top:.4rem">${match.how}</p>
        <p class="prose" style="margin-top:.6rem">
          ${match.kind === "frontier"
    ? html`Decision: <strong>${match.item.decision}</strong>; next review ${match.item.review_date}. ${match.item.maturity}`
    : match.item.required_use}</p>
        <p style="margin-top:.7rem"><a class="button button--secondary" href="#/${match.kind === "frontier" ? "frontier" : "resources"}">Open the ${match.kind === "frontier" ? "watchlist" : "resource list"}</a></p>
      </section>` : ""}

      ${input && !match ? html`<section>
        <div class="section-title"><h2>Not in the curriculum</h2></div>
        <p class="prose">Nothing canonical matches that. Here is where it would most plausibly belong, ranked by how well
          it overlaps each topic's stated scope and existing sources. This is a suggestion from term overlap, not a
          curatorial judgement — read the scope before accepting it.</p>

        ${suggestions.length ? html`<div class="stack" style="margin-top:.9rem">
          ${suggestions.map((entry, index) => html`<article class="card ${index === 0 ? "card--accent" : ""}">
            <div class="row row--between" style="align-items:flex-start">
              <div class="grow">
                <div class="row row--tight">
                  <span class="chip chip--id">${entry.topic.id}</span>
                  <span class="chip">${entry.topic.area_short_label}</span>
                  ${index === 0 ? html`<span class="chip chip--accent">Best fit</span>` : ""}
                </div>
                <h3 class="card-title" style="margin-top:.35rem"><a href="#/topics/${entry.topic.id}">${entry.topic.title}</a></h3>
                <p class="small muted" style="margin:.35rem 0 0">${truncate(entry.topic.covers, 200)}</p>
                <p class="small dim" style="margin:.35rem 0 0">Overlapping terms: ${entry.matched.slice(0, 8).join(", ")}.</p>
                ${entry.closest.length ? html`<p class="small" style="margin:.4rem 0 0">Closest existing sources:
                  ${entry.closest.map((item, position) => html`${position ? ", " : ""}<a href="#/papers/${item.paper.id}">${item.paper.id}</a>`)}.</p>` : ""}
              </div>
            </div>
            <div class="row" style="margin-top:.75rem">
              <button type="button" class="button button--secondary button--small" data-act="add-personal-paper"
                data-topic="${entry.topic.id}" data-title="${input}">Add to my workspace under ${entry.topic.id}</button>
              <button type="button" class="button button--ghost button--small" data-act="open-proposal"
                data-kind="new-paper" data-topic="${entry.topic.id}" data-title="${input}">Propose it for the canon</button>
            </div>
          </article>`)}
        </div>` : raw(emptyState("No topic overlaps those terms. Try the title rather than a bare URL, or browse the curriculum by area.",
    '<a class="button button--secondary button--small" href="#/curriculum?mode=areas">Browse by area</a>').value)}
      </section>` : ""}
    </div>`;
  },
};
