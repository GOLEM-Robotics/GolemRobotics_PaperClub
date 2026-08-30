"use strict";

import {
  html, raw, el, els, setHTML, truncate, normalize, plural, download, copyText, debounce, escapeHTML,
} from "./dom.js";
import { buildModel } from "./model.js";
import { WorkspaceStore, blankState, normalizeState, READING_STATES, WORKSPACE_SCHEMA } from "./store.js";
import { Engine } from "./engine.js";
import {
  PROFILE, PROPOSAL_LABEL, READING_LABEL, STATUS_LABEL,
  MAX_BUNDLE_BYTES, MAX_ATTACHMENT_BYTES, MAX_TOTAL_ATTACHMENT_BYTES, MAX_ATTACHMENTS,
} from "./constants.js";
import { emptyState } from "./ui.js";
import { sessionPrompt, paperPrompt, SESSION_INTENTS, PAPER_INTENTS } from "./prompts.js";
import { artifactPatches, proposalPatches } from "./publish.js";

import planView from "./views/plan.js";
import curriculumView from "./views/curriculum.js";
import mapView from "./views/map.js";
import topicView from "./views/topic.js";
import sessionView from "./views/session.js";
import { papersView, resourcesView, frontierView, showMore } from "./views/papers.js";
import paperView from "./views/paper.js";
import compareView from "./views/compare.js";
import placeView from "./views/place.js";
import workspaceView from "./views/workspace.js";
import referenceView from "./views/reference.js";

const script = document.currentScript || document.querySelector("script[data-graph-url]");
const GRAPH_URL = script?.dataset.graphUrl || "assets/data/curriculum_graph.json";
const REFERENCE_BASE = script?.dataset.referenceBase || "./";

const ROUTES = [
  { match: (parts) => parts.length === 0, name: "plan", view: planView },
  { match: (parts) => parts[0] === "curriculum" && parts.length === 1, name: "curriculum", view: curriculumView },
  { match: (parts) => parts[0] === "map", name: "curriculum", view: mapView },
  { match: (parts) => parts[0] === "topics" && parts.length === 2, name: "curriculum", view: topicView, param: 1 },
  { match: (parts) => parts[0] === "sessions" && parts.length === 2, name: "curriculum", view: sessionView, param: 1 },
  { match: (parts) => parts[0] === "papers" && parts.length === 1, name: "papers", view: papersView },
  { match: (parts) => parts[0] === "papers" && parts.length === 2, name: "papers", view: paperView, param: 1 },
  { match: (parts) => parts[0] === "resources", name: "papers", view: resourcesView },
  { match: (parts) => parts[0] === "frontier", name: "papers", view: frontierView },
  { match: (parts) => parts[0] === "compare", name: "papers", view: compareView },
  { match: (parts) => parts[0] === "place", name: "papers", view: placeView },
  { match: (parts) => parts[0] === "workspace", name: "workspace", view: workspaceView },
  { match: (parts) => parts[0] === "reference", name: "reference", view: referenceView },
];

const notFound = {
  title: () => "Not found — Golem Curriculum",
  render: () => html`<div class="page page--narrow"><div class="card">
    <h1>That address does not exist</h1>
    <p class="prose" style="margin-top:.5rem">The workspace has five destinations: your plan, papers, curriculum,
      workspace and reference. Nothing was lost — your personal record is untouched.</p>
    <p style="margin-top:.8rem"><a class="button button--primary" href="#/">Back to your plan</a></p>
  </div></div>`,
};

class App {
  constructor(model, store, state) {
    this.model = model;
    this.store = store;
    this.state = state;
    this.engine = new Engine(model, state);
    this.referenceBase = REFERENCE_BASE;
    this.outlet = el("[data-outlet]");
    this.toastNode = el("[data-toast]");
    this.sheet = el("[data-sheet]");
    this.compareBar = el("[data-comparebar]");
    this.paletteRoot = el("[data-palette-root]");
    this.revisionNotice = null;
    this.currentRoute = null;
    this.promptIntent = SESSION_INTENTS[0].id;
    this.searchIndex = this.buildSearchIndex();
    this.toastTimer = 0;
    this.scrollPositions = new Map();
    this.poppingHistory = false;
  }

  // ------------------------------------------------------------- utilities
  /** Mirror the Python Markdown `toc` slugify so links into the rendered index resolve. */
  slugTitle(value) {
    return String(value ?? "")
      .normalize("NFKD")
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[-\s]+/g, "-");
  }

  hrefFor(id) {
    if (this.model.topicById.has(id)) return `#/topics/${id}`;
    if (this.model.sessionById.has(id)) return `#/sessions/${id}`;
    if (this.model.paperById.has(id)) return `#/papers/${id}`;
    if (this.model.resourceById.has(id)) return "#/resources";
    if (this.model.frontierById.has(id)) return "#/frontier";
    return "#/workspace?tab=mine";
  }

  toast(message, isError = false) {
    if (!this.toastNode) return;
    this.toastNode.textContent = message;
    this.toastNode.classList.toggle("is-error", isError);
    this.toastNode.hidden = false;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.toastNode.hidden = true; }, isError ? 7000 : 3600);
  }

  async save() {
    this.state = await this.store.save(this.state);
    this.engine.invalidate(this.state);
    return this.state;
  }

  async commit(mutate, { rerender = true, message = null } = {}) {
    mutate(this.state);
    await this.save();
    if (message) this.toast(message);
    if (rerender) this.render();
  }

  recordActivity(kind, entityId, label) {
    this.state.recentActivity = [
      { kind, entityId, label, at: new Date().toISOString() },
      ...this.state.recentActivity.filter((item) => !(item.kind === kind && item.entityId === entityId)),
    ].slice(0, 40);
  }

  // ---------------------------------------------------------------- search
  buildSearchIndex() {
    const entries = [];
    for (const topic of this.model.topics) {
      entries.push({
        kind: "Topic", id: topic.id, href: `#/topics/${topic.id}`,
        title: `${topic.id} — ${topic.title}`, subtitle: topic.area_short_label,
        text: normalize([topic.id, topic.title, topic.covers, topic.target_competence, topic.curriculum_role].join(" ")),
      });
    }
    for (const session of this.model.sessions) {
      entries.push({
        kind: "Session", id: session.display_id, href: `#/sessions/${session.id}`,
        title: `${session.display_id} — ${session.title}`, subtitle: `${session.topic_id} · ${session.classification}`,
        text: normalize([session.display_id, session.id, session.title, session.objective, session.stage].join(" ")),
      });
    }
    for (const paper of this.model.papers) {
      entries.push({
        kind: "Paper", id: paper.id, href: `#/papers/${paper.id}`,
        title: paper.title, subtitle: `${paper.authors} · ${paper.year} · ${paper.topic_id}`,
        text: normalize([paper.id, paper.title, paper.authors, paper.venue, paper.contribution, paper.lineage].join(" ")),
      });
    }
    for (const resource of this.model.resources) {
      entries.push({
        kind: "Resource", id: resource.id, href: "#/resources",
        title: resource.title, subtitle: resource.type,
        text: normalize([resource.id, resource.title, resource.type, resource.required_use].join(" ")),
      });
    }
    for (const item of this.model.frontierItems) {
      entries.push({
        kind: "Frontier", id: item.id, href: "#/frontier",
        title: item.title, subtitle: item.decision,
        text: normalize([item.id, item.title, item.reason, item.maturity].join(" ")),
      });
    }
    return entries;
  }

  // ---------------------------------------------------------------- router
  parseRoute() {
    const rawHash = window.location.hash.replace(/^#/, "");
    const [pathAndQuery, fragment = ""] = rawHash.split("#");
    const [path, queryString = ""] = pathAndQuery.split("?");
    const parts = path.split("/").filter(Boolean);
    const query = {};
    for (const [key, value] of new URLSearchParams(queryString)) query[key] = value;
    return { parts, query, fragment };
  }

  resolve() {
    const { parts, query, fragment } = this.parseRoute();
    const route = ROUTES.find((candidate) => candidate.match(parts));
    if (!route) return { view: notFound, name: null, params: { query, fragment } };
    const params = { query, fragment };
    if (route.param !== undefined) params.id = decodeURIComponent(parts[route.param]);
    return { view: route.view, name: route.name, params };
  }

  render() {
    // Remember where the learner was, so returning to a long library keeps its place.
    if (this.renderedHash !== undefined && this.renderedHash !== window.location.hash) {
      this.scrollPositions.set(this.renderedHash, window.scrollY);
    }
    const { view, name, params } = this.resolve();
    this.currentRoute = { view, name, params };
    this.engine.invalidate(this.state);
    document.title = view.title(this, params);
    setHTML(this.outlet, view.render(this, params));
    for (const node of els("[data-nav-match]")) {
      if (node.dataset.navMatch === name) node.setAttribute("aria-current", "page");
      else node.removeAttribute("aria-current");
    }
    const profileLabel = el("[data-profile-label]");
    if (profileLabel) profileLabel.textContent = PROFILE[this.state.profile].label;
    el("[data-open-profile]")?.setAttribute("data-profile", this.state.profile);
    this.renderCompareBar();
    this.renderRevisionNotice();
    this.mount(params);
    this.state.lastRoute = window.location.hash || "#/";
    this.store.save(this.state).catch(() => {});
  }

  mount(params) {
    this.bindNotes();
    this.bindPromptPreview();
    this.bindAttachments();
    this.bindPersonalForm();
    this.bindPlaceForm();
    this.bindQuickAdd();
    this.bindMapNodes();
    this.bindBundleInput();
    this.bindJumpNav();
    const currentNode = el(".lineage-node.is-current");
    if (currentNode) currentNode.scrollIntoView({ block: "nearest", inline: "nearest" });
    const pathOnly = window.location.hash.split("#")[0];
    const restored = this.poppingHistory ? this.scrollPositions.get(window.location.hash) : undefined;
    this.poppingHistory = false;
    if (params.fragment) {
      const target = document.getElementById(params.fragment);
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "auto" }));
    } else if (restored !== undefined) {
      requestAnimationFrame(() => window.scrollTo({ top: restored, behavior: "auto" }));
    } else if (this.lastHashPath !== pathOnly) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    this.lastHashPath = pathOnly;
    this.renderedHash = window.location.hash;
    if (params.query?.tab === "artifacts") this.renderAllAttachments();
  }

  // ------------------------------------------------------------- behaviours
  bindJumpNav() {
    const nav = el(".jumpnav");
    if (!nav) return;
    const links = els("a[data-jump]", nav);
    const sections = links.map((link) => document.getElementById(link.dataset.jump)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver((records) => {
      for (const record of records) {
        if (!record.isIntersecting) continue;
        for (const link of links) link.classList.toggle("is-active", link.dataset.jump === record.target.id);
      }
    }, { rootMargin: "-25% 0px -65% 0px" });
    for (const section of sections) observer.observe(section);
  }

  bindNotes() {
    for (const textarea of els("[data-note-for]")) {
      const id = textarea.dataset.noteFor;
      const status = el(`[data-note-status="${CSS.escape(id)}"]`);
      const persist = debounce(async () => {
        this.state.notes[id] = textarea.value;
        if (!textarea.value.trim()) delete this.state.notes[id];
        this.recordActivity("note", id, this.engine.label(id));
        await this.save();
        if (status) status.textContent = "Saved to this browser";
      }, 500);
      textarea.addEventListener("input", () => {
        if (status) status.textContent = "Saving…";
        persist();
      });
    }
  }

  bindPromptPreview() {
    const preview = el("[data-prompt-preview]");
    if (!preview) return;
    const rawId = this.currentRoute?.params?.id;
    const session = this.model.sessionById.get(rawId) || this.model.sessionById.get(this.model.aliasToStable.get(rawId));
    if (!session) return;
    const draw = () => { preview.textContent = sessionPrompt(this, session, this.promptIntent); };
    draw();
    this.drawPromptPreview = draw;
  }

  bindPersonalForm() {
    const form = el("[data-personal-form]");
    if (!form) return;
    const topicSelect = form.elements.topicId;
    const sessionSelect = form.elements.sessionId;
    const fillSessions = () => {
      const sessions = this.model.sessionsByTopic.get(topicSelect.value) || [];
      sessionSelect.innerHTML = `<option value="">Topic-level addition</option>${sessions
        .map((session) => `<option value="${escapeHTML(session.id)}">${escapeHTML(session.display_id)} — ${escapeHTML(truncate(session.title, 52))}</option>`)
        .join("")}`;
    };
    topicSelect.addEventListener("change", fillSessions);
    fillSessions();

    if (this.editingPersonalId) {
      const item = this.state.customItems.find((entry) => entry.id === this.editingPersonalId);
      if (item) {
        form.elements.itemId.value = item.id;
        form.elements.kind.value = item.kind;
        form.elements.topicId.value = item.topicId;
        fillSessions();
        form.elements.sessionId.value = item.sessionId || "";
        form.elements.title.value = item.title;
        form.elements.authors.value = item.authors;
        form.elements.year.value = item.year;
        form.elements.url.value = item.url;
        form.elements.objective.value = item.objective;
        form.elements.replacesId.value = item.replacesId;
        const cancel = el("[data-act='cancel-personal']");
        if (cancel) cancel.hidden = false;
      }
    }
    if (this.prefillPersonal) {
      if (this.prefillPersonal.topicId) form.elements.topicId.value = this.prefillPersonal.topicId;
      fillSessions();
      if (this.prefillPersonal.sessionId) form.elements.sessionId.value = this.prefillPersonal.sessionId;
      form.elements.title.value = this.prefillPersonal.title || "";
      this.prefillPersonal = null;
      form.scrollIntoView({ block: "center" });
      form.elements.title.focus();
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const id = data.itemId || `MINE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      const record = {
        id,
        kind: data.kind,
        title: String(data.title).trim(),
        topicId: data.topicId,
        sessionId: data.sessionId || "",
        objective: String(data.objective).trim(),
        url: String(data.url || "").trim(),
        authors: String(data.authors || "").trim(),
        year: String(data.year || "").trim(),
        role: "",
        replacesId: String(data.replacesId || "").trim().toUpperCase(),
        disabled: false,
        createdAt: new Date().toISOString(),
      };
      this.editingPersonalId = null;
      await this.commit((state) => {
        const index = state.customItems.findIndex((item) => item.id === id);
        if (index >= 0) state.customItems[index] = { ...state.customItems[index], ...record };
        else state.customItems.push(record);
      }, { message: "Saved to your workspace." });
    });
  }

  /** One box that either finds canonical material or records the learner's own item. */
  bindQuickAdd() {
    const form = el("[data-quick-add]");
    if (!form) return;
    const input = form.elements.q;
    const results = el("[data-quick-add-results]");

    const matches = (query) => {
      const needle = normalize(query.trim());
      if (needle.length < 2) return [];
      const rank = { Paper: 0, Topic: 1, Session: 2, Resource: 3 };
      return this.searchIndex
        .filter((entry) => entry.kind !== "Frontier" && entry.text.includes(needle))
        .map((entry) => ({ entry, score: (rank[entry.kind] ?? 9) * 3 + Math.min(entry.text.indexOf(needle), 60) / 60 }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 6)
        .map((scored) => scored.entry);
    };

    const draw = () => {
      const value = input.value.trim();
      const found = matches(value);
      if (!value) { setHTML(results, ""); return; }
      setHTML(results, html`${found.map((entry) => {
        const kind = entry.kind.toLowerCase();
        const already = this.engine.inPlan(kind, entry.id === entry.title ? entry.id : entry.href.split("/").pop());
        const refId = entry.href.split("/").pop();
        return html`<button type="button" data-act="quick-add-ref" data-kind="${kind}" data-ref="${refId}">
          <span class="chip chip--id">${entry.id}</span>
          <span style="min-width:0"><strong style="font-weight:600">${truncate(entry.title, 68)}</strong>
            <span class="dim" style="display:block;font-size:var(--fs-xs)">${entry.kind} · ${truncate(entry.subtitle, 60)}${already ? " · already in your plan" : ""}</span></span>
        </button>`;
      })}
      <button type="button" data-act="quick-add-custom" data-title="${value}">
        <span class="chip chip--personal">Mine</span>
        <span style="min-width:0"><strong style="font-weight:600">Add “${truncate(value, 60)}” as my own item</strong>
          <span class="dim" style="display:block;font-size:var(--fs-xs)">Nothing in the curriculum has to match it</span></span>
      </button>`);
    };

    input.addEventListener("input", debounce(draw, 160));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      const found = matches(value);
      if (found.length) {
        const entry = found[0];
        ACTIONS["quick-add-ref"](this, { dataset: { kind: entry.kind.toLowerCase(), ref: entry.href.split("/").pop() } });
      } else {
        ACTIONS["quick-add-custom"](this, { dataset: { title: value } });
      }
    });
  }

  /**
   * A map node focuses on activation and opens on a deliberate second action.
   * Browsing a graph should not fire off a navigation on every stray click.
   */
  bindMapNodes() {
    const frame = el("[data-map-frame]");
    if (!frame) return;
    const routeOf = (node) => (node.dataset.mapNode === "paper" ? `#/papers/${node.dataset.id}` : `#/topics/${node.dataset.id}`);
    const focusOn = (node) => {
      const query = this.parseRoute().query;
      const layer = node.dataset.mapNode === "paper" ? "papers" : (query.layer === "papers" ? "papers" : "topics");
      const next = { ...query, layer, focus: query.focus === node.dataset.id ? "" : node.dataset.id };
      if (node.dataset.mapNode === "topic" && query.layer === "papers") { next.layer = "topics"; }
      const pairs = Object.entries(next).filter(([, value]) => value);
      window.location.hash = pairs.length
        ? `#/map?${pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}`
        : "#/map";
    };
    frame.addEventListener("click", (event) => {
      const node = event.target.closest("[data-map-node]");
      if (!node || event.detail > 1) return;
      focusOn(node);
    });
    frame.addEventListener("dblclick", (event) => {
      const node = event.target.closest("[data-map-node]");
      if (!node) return;
      event.preventDefault();
      window.location.hash = routeOf(node);
    });
    frame.addEventListener("keydown", (event) => {
      const node = event.target.closest("[data-map-node]");
      if (!node) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.refocusMapNode = node.dataset.id;
        focusOn(node);
      }
    });
    // Keep the keyboard where it was after the focus change re-renders the map.
    if (this.refocusMapNode) {
      const node = frame.querySelector(`[data-map-node][data-id="${CSS.escape(this.refocusMapNode)}"]`);
      this.refocusMapNode = null;
      if (node) node.focus({ preventScroll: true });
    }
  }

  bindBundleInput() {
    const input = el("[data-bundle-input]");
    if (!input || input.dataset.bound) return;
    input.dataset.bound = "1";
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      input.value = "";
      if (!file) return;
      try {
        await importBundle(this, file);
      } catch (error) {
        const status = el("[data-bundle-status]");
        if (status) status.textContent = `Import refused: ${error.message}`;
        this.toast(`Import refused: ${error.message}`, true);
      }
    });
  }

  bindPlaceForm() {
    const form = el("[data-place-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = String(new FormData(form).get("q") || "").trim();
      window.location.hash = value ? `#/place?q=${encodeURIComponent(value)}` : "#/place";
    });
  }

  bindAttachments() {
    for (const input of els("[data-attachment-for]")) {
      input.addEventListener("change", async () => {
        const file = input.files?.[0];
        input.value = "";
        if (!file) return;
        if (file.size > MAX_ATTACHMENT_BYTES) {
          this.toast("Attachments are limited to 8 MB each.", true);
          return;
        }
        try {
          await this.store.putAttachment(input.dataset.attachmentFor, file);
          this.toast(`Attached ${file.name}.`);
          this.renderAttachmentList(input.dataset.attachmentFor);
        } catch (error) {
          this.toast(String(error.message || error), true);
        }
      });
    }
    for (const node of els("[data-attachment-list]")) this.renderAttachmentList(node.dataset.attachmentList);
  }

  async renderAttachmentList(entityId) {
    const node = el(`[data-attachment-list="${CSS.escape(entityId)}"]`);
    if (!node) return;
    const records = await this.store.listAttachments(entityId);
    setHTML(node, records.length
      ? html`<div class="entity-list">${records.map((record) => html`<div class="entity-row">
          <div class="row row--between">
            <div class="grow"><strong class="small">${record.name}</strong>
              <span class="small dim" style="display:block">${record.type} · ${(record.size / 1024).toFixed(1)} kB</span></div>
            <div class="row row--tight">
              <button type="button" class="button button--ghost button--small" data-act="download-attachment" data-id="${record.id}">Download</button>
              <button type="button" class="button button--ghost button--small" data-act="delete-attachment" data-id="${record.id}" data-entity="${entityId}">Remove</button>
            </div>
          </div></div>`)}</div>`
      : html`<p class="small dim">No file attached yet.</p>`);
  }

  async renderAllAttachments() {
    const node = el("[data-all-attachments]");
    if (!node) return;
    const records = await this.store.listAttachments();
    setHTML(node, records.length
      ? html`<div class="entity-list">${records.map((record) => html`<div class="entity-row">
          <div class="row row--between">
            <div class="grow">
              <strong class="small">${record.name}</strong>
              <span class="small dim" style="display:block">
                <a href="${this.hrefFor(record.entityId)}">${truncate(this.engine.label(record.entityId), 60)}</a>
                · ${record.type} · ${(record.size / 1024).toFixed(1)} kB</span>
            </div>
            <div class="row row--tight">
              <button type="button" class="button button--ghost button--small" data-act="download-attachment" data-id="${record.id}">Download</button>
              <button type="button" class="button button--ghost button--small" data-act="delete-attachment" data-id="${record.id}">Remove</button>
            </div>
          </div></div>`)}</div>`
      : emptyState("No artifacts attached yet. Attach evidence from any session page."));
  }

  renderRevisionNotice() {
    const bar = el("[data-revision-notice]");
    if (!bar) return;
    if (!this.revisionNotice) { bar.hidden = true; return; }
    bar.hidden = false;
    setHTML(bar, html`<div class="inner">
      <strong>The curriculum changed since your workspace was last saved.</strong>
      <span>Your progress, notes and artifacts were preserved and matched by stable identity.</span>
      ${this.revisionNotice.archived
    ? html`<span>${this.revisionNotice.archived} record(s) pointed at entities that no longer exist and were archived in
        <a href="#/workspace?tab=bundle">Workspace, Portability</a>.</span>`
    : ""}
      <button type="button" class="link-button" data-act="dismiss-revision">Dismiss</button>
    </div>`);
  }

  renderCompareBar() {
    if (!this.compareBar) return;
    const ids = this.state.compare;
    const onCompare = this.parseRoute().parts[0] === "compare";
    if (!ids.length || onCompare) { this.compareBar.hidden = true; return; }
    this.compareBar.hidden = false;
    setHTML(this.compareBar, html`<strong style="white-space:nowrap">${ids.length} selected</strong>
      <span class="small dim compare-ids">${ids.join(", ")}</span>
      <a class="button button--primary button--small" href="#/compare">Compare</a>
      <button type="button" class="button button--ghost button--small" data-act="clear-compare">Clear</button>`);
  }

  // ------------------------------------------------------------------ sheet
  openSheet({ title, body, footer = "", onMount = null }) {
    const bodyHTML = body && typeof body === "object" && "value" in body ? body.value : String(body ?? "");
    const footHTML = footer && typeof footer === "object" && "value" in footer ? footer.value : String(footer ?? "");
    setHTML(this.sheet, html`<div class="sheet-head">
        <h2 id="sheet-title" class="card-title">${title}</h2>
        <button type="button" class="icon-button" data-act="close-sheet" aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="sheet-body">${raw(bodyHTML)}</div>
      ${footHTML ? html`<div class="sheet-foot">${raw(footHTML)}</div>` : ""}`);
    if (!this.sheet.open) this.sheet.showModal();
    if (onMount) onMount(this.sheet);
    this.sheet.querySelector("input, textarea, select")?.focus();
  }

  closeSheet() {
    if (this.sheet.open) this.sheet.close();
  }
}

/* ========================================================================= */
/*  Actions                                                                  */
/* ========================================================================= */

const ACTIONS = {
  async "set-profile"(app, node) {
    const profile = node.dataset.profile;
    if (!PROFILE[profile]) return;
    app.closeSheet();
    await app.commit((state) => { state.profile = profile; },
      { message: `${PROFILE[profile].label}. ${PROFILE[profile].credit}` });
  },

  "open-profile"(app) {
    app.openSheet({
      title: "Choose how you learn",
      body: html`<p class="prose">All three profiles traverse the same curriculum. They change how much you compress,
        not what counts as competence.</p>
        <div class="stack">${Object.values(PROFILE).map((profile) => html`<button type="button"
          class="card ${app.state.profile === profile.id ? "card--accent" : ""}"
          style="text-align:left;cursor:pointer;font:inherit;color:inherit"
          data-act="set-profile" data-profile="${profile.id}">
          <span class="row row--between"><strong>${profile.label}</strong>
            <span class="small dim">${profile.minutes[0]}–${profile.minutes[1]} min per session</span></span>
          <span class="small muted" style="display:block;margin-top:.3rem">${profile.description}</span>
          <span class="small dim" style="display:block;margin-top:.3rem">${profile.credit}</span>
        </button>`)}</div>`,
      footer: '<button type="button" class="button button--secondary" data-act="close-sheet">Done</button>',
    });
  },

  "open-target"(app) {
    app.closeSheet();
    const options = [
      ...app.model.topics.map((topic) => ({ kind: "topic", id: topic.id, label: topic.title, group: "Topic" })),
      ...app.model.papers.map((paper) => ({ kind: "paper", id: paper.id, label: paper.title, group: "Paper" })),
    ];
    app.openSheet({
      title: "What are you trying to reach?",
      body: html`<p class="prose">Name a topic or a specific paper. The shortest prerequisite-valid route is planned from
        what you have already completed or validated.</p>
        <label class="field"><span>Search targets</span>
          <input type="search" data-target-search placeholder="E2, diffusion policy, SLAM…" autocomplete="off"></label>
        <div data-target-results class="stack stack--tight" style="max-height:20rem;overflow:auto"></div>`,
      footer: '<button type="button" class="button button--ghost" data-act="clear-target">Explore without a target</button>'
        + '<button type="button" class="button button--secondary" data-act="close-sheet">Cancel</button>',
      onMount: (sheet) => {
        const input = sheet.querySelector("[data-target-search]");
        const results = sheet.querySelector("[data-target-results]");
        const draw = () => {
          const query = normalize(input.value.trim());
          const matches = (query
            ? options.filter((option) => normalize(`${option.id} ${option.label}`).includes(query))
            : options.filter((option) => option.kind === "topic")).slice(0, 40);
          setHTML(results, matches.length
            ? html`${matches.map((option) => html`<button type="button" class="button button--secondary"
                style="justify-content:flex-start;text-align:left" data-act="set-target"
                data-kind="${option.kind}" data-id="${option.id}">
                <span class="chip chip--id">${option.id}</span> ${truncate(option.label, 62)}
              </button>`)}`
            : html`<p class="small dim">Nothing matches that.</p>`);
        };
        input.addEventListener("input", draw);
        draw();
      },
    });
  },

  async "set-target"(app, node) {
    const target = { kind: node.dataset.kind, id: node.dataset.id };
    app.closeSheet();
    await app.commit((state) => { state.target = target; },
      { message: `Target set: ${truncate(app.engine.label(target.id), 56)}.` });
  },

  async "clear-target"(app) {
    app.closeSheet();
    await app.commit((state) => { state.target = null; }, { message: "Target cleared." });
  },

  // ------------------------------------------------------------- the plan
  async "toggle-plan"(app, node) {
    const kind = node.dataset.kind;
    const refId = node.dataset.ref;
    const present = app.engine.inPlan(kind, refId);
    await app.commit((state) => {
      state.plan = present
        ? state.plan.filter((item) => !(item.kind === kind && item.refId === refId))
        : [...state.plan, {
          id: `PLAN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
          kind, refId, title: "", note: "", done: false, doneAt: "", addedAt: new Date().toISOString(),
        }];
    }, { message: present ? "Removed from your plan." : `Added to your plan: ${truncate(app.engine.label(refId), 48)}` });
  },

  async "quick-add-ref"(app, node) {
    const kind = node.dataset.kind;
    const refId = node.dataset.ref;
    if (app.engine.inPlan(kind, refId)) {
      app.toast("That is already in your plan.");
      return;
    }
    await ACTIONS["toggle-plan"](app, node);
  },

  async "quick-add-custom"(app, node) {
    const title = String(node.dataset.title || "").trim();
    if (!title) return;
    await app.commit((state) => {
      state.plan.push({
        id: `PLAN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        kind: "custom", refId: "", title, note: "", done: false, doneAt: "", addedAt: new Date().toISOString(),
      });
    }, { message: "Added to your plan." });
  },

  async "toggle-plan-done"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => {
      const item = state.plan.find((entry) => entry.id === id);
      if (!item) return;
      item.done = !item.done;
      item.doneAt = item.done ? new Date().toISOString() : "";
    });
  },

  async "move-plan"(app, node) {
    const id = node.dataset.id;
    const direction = Number(node.dataset.dir);
    await app.commit((state) => {
      // Reorder within the open or the finished group, so the two never interleave.
      const done = app.engine.planItemDone(state.plan.find((item) => item.id === id) || {});
      const group = state.plan.filter((item) => app.engine.planItemDone(item) === done);
      const index = group.findIndex((item) => item.id === id);
      const next = index + direction;
      if (index < 0 || next < 0 || next >= group.length) return;
      const first = state.plan.indexOf(group[index]);
      const second = state.plan.indexOf(group[next]);
      [state.plan[first], state.plan[second]] = [state.plan[second], state.plan[first]];
    });
  },

  async "remove-plan"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => { state.plan = state.plan.filter((item) => item.id !== id); },
      { message: "Removed from your plan." });
  },

  "edit-plan-note"(app, node) {
    const id = node.dataset.id;
    const item = app.state.plan.find((entry) => entry.id === id);
    if (!item) return;
    app.openSheet({
      title: `Note — ${truncate(app.engine.planItemLabel(item), 52)}`,
      body: html`<label class="field"><span>Why is this in your plan, and what do you intend to get out of it?</span>
        <textarea data-plan-note rows="6">${item.note}</textarea></label>
        ${item.kind === "custom" ? html`<label class="field"><span>Title</span>
          <input data-plan-title value="${item.title}" maxlength="300"></label>` : ""}`,
      footer: '<button type="button" class="button button--ghost" data-act="close-sheet">Cancel</button>'
        + `<button type="button" class="button button--primary" data-act="save-plan-note" data-id="${escapeHTML(id)}">Save</button>`,
    });
  },

  async "save-plan-note"(app, node) {
    const id = node.dataset.id;
    const note = app.sheet.querySelector("[data-plan-note]")?.value ?? "";
    const title = app.sheet.querySelector("[data-plan-title]")?.value;
    app.closeSheet();
    await app.commit((state) => {
      const item = state.plan.find((entry) => entry.id === id);
      if (!item) return;
      item.note = note;
      if (typeof title === "string" && title.trim()) item.title = title.trim();
    }, { message: "Saved." });
  },

  /** Drop every outstanding session on the target route into the plan, in order. */
  async "plan-route"(app) {
    const targetTopic = app.engine.targetTopicId();
    if (!targetTopic) { app.toast("Choose a target first.", true); return; }
    const sessions = app.engine.routeSessions(targetTopic);
    const added = sessions.filter((session) => !app.engine.inPlan("session", session.id));
    if (!added.length) { app.toast("Every session on that route is already in your plan."); return; }
    await app.commit((state) => {
      for (const session of added) {
        state.plan.push({
          id: `PLAN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
          kind: "session", refId: session.id, title: "", note: "", done: false, doneAt: "",
          addedAt: new Date().toISOString(),
        });
      }
    }, { message: `Added ${plural(added.length, "session")} to your plan. Reorder or remove any of them.` });
  },

  /** Bulk add from a topic, a session's sources, or a filtered library. */
  async "plan-many"(app, node) {
    const kind = node.dataset.kind;
    const ids = String(node.dataset.ids || "").split(",").filter(Boolean).slice(0, 100);
    const added = ids.filter((id) => !app.engine.inPlan(kind, id));
    if (!added.length) { app.toast("Those are already in your plan."); return; }
    await app.commit((state) => {
      for (const refId of added) {
        state.plan.push({
          id: `PLAN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
          kind, refId, title: "", note: "", done: false, doneAt: "", addedAt: new Date().toISOString(),
        });
      }
    }, { message: `Added ${plural(added.length, kind)} to your plan.` });
  },

  async "set-status"(app, node) {
    const id = node.dataset.id;
    const status = node.dataset.status;
    await app.commit((state) => {
      if (status === "not_started") delete state.entityStatus[id];
      else state.entityStatus[id] = status;
      app.recordActivity("session", id, app.engine.label(id));
    }, { message: `${truncate(app.engine.label(id), 44)} — ${STATUS_LABEL[status]}.` });
  },

  async "toggle-sprint"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => {
      state.sprintCovered = state.sprintCovered.includes(id)
        ? state.sprintCovered.filter((item) => item !== id)
        : [...state.sprintCovered, id];
    }, { message: "Sprint coverage is recorded separately from Required Core completion." });
  },

  async "toggle-activation"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => {
      state.activatedSessionIds = state.activatedSessionIds.includes(id)
        ? state.activatedSessionIds.filter((item) => item !== id)
        : [...state.activatedSessionIds, id];
    });
  },

  async "toggle-disabled"(app, node) {
    const id = node.dataset.id;
    const wasDisabled = app.state.disabledIds.includes(id);
    await app.commit((state) => {
      state.disabledIds = wasDisabled
        ? state.disabledIds.filter((item) => item !== id)
        : [...state.disabledIds, id];
    }, {
      message: wasDisabled
        ? "Restored to your route."
        : "Hidden from your route. Canonical material is never deleted — restore it from Workspace, Hidden items.",
    });
  },

  async "cycle-reading"(app, node) {
    const id = node.dataset.id;
    const current = app.engine.readingStateOf(id).status;
    const index = READING_STATES.indexOf(current);
    const next = index === READING_STATES.length - 1 ? null : READING_STATES[index + 1];
    await app.commit((state) => {
      const record = state.paperState[id] || { status: null, starred: false };
      state.paperState[id] = { ...record, status: next, updatedAt: new Date().toISOString() };
      if (!next && !record.starred) delete state.paperState[id];
      app.recordActivity("paper", id, app.engine.label(id));
    }, { message: next ? `${id}: ${READING_LABEL[next]}` : `${id}: reading state cleared` });
  },

  async "toggle-star"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => {
      const record = state.paperState[id] || { status: null, starred: false };
      const starred = !record.starred;
      state.paperState[id] = { ...record, starred, updatedAt: new Date().toISOString() };
      if (!starred && !record.status) delete state.paperState[id];
    });
  },

  async "queue-papers"(app, node) {
    const ids = String(node.dataset.ids || "").split(",").filter(Boolean);
    await app.commit((state) => {
      for (const id of ids) {
        if (state.paperState[id]?.status) continue;
        state.paperState[id] = {
          ...(state.paperState[id] || { starred: false }),
          status: "queued",
          updatedAt: new Date().toISOString(),
        };
      }
    }, { message: `${plural(ids.length, "paper")} added to your reading list.` });
  },

  async "toggle-compare"(app, node) {
    const id = node.dataset.id;
    const present = app.state.compare.includes(id);
    if (!present && app.state.compare.length >= 4) {
      app.toast("Compare up to four papers at once.", true);
      app.render();
      return;
    }
    await app.commit((state) => {
      state.compare = present ? state.compare.filter((item) => item !== id) : [...state.compare, id];
    });
  },

  async "compare-set"(app, node) {
    const ids = String(node.dataset.ids || "").split(",").filter(Boolean).slice(0, 4);
    await app.commit((state) => { state.compare = ids; }, { rerender: false });
    window.location.hash = "#/compare";
  },

  async "clear-compare"(app) {
    await app.commit((state) => { state.compare = []; });
  },

  "select-intent"(app, node) {
    app.promptIntent = node.dataset.intent;
    for (const button of els("[data-act='select-intent']")) {
      const active = button.dataset.intent === app.promptIntent;
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.classList.toggle("button--secondary", active);
      button.classList.toggle("button--ghost", !active);
    }
    app.drawPromptPreview?.();
  },

  async "copy-session-prompt"(app, node) {
    const session = app.model.sessionById.get(node.dataset.id);
    if (!session) return;
    const ok = await copyText(sessionPrompt(app, session, app.promptIntent));
    app.toast(ok ? "Prompt copied. Verify every claim against the linked source." : "Copying failed; select the text instead.", !ok);
  },

  async "copy-paper-prompt"(app, node) {
    const paper = app.model.paperById.get(node.dataset.id);
    if (!paper) return;
    const ok = await copyText(paperPrompt(app, paper, node.dataset.intent));
    app.toast(ok ? "Prompt copied. The model must stay inside the linked source." : "Copying failed; select the text instead.", !ok);
  },

  "inspect-paper-prompt"(app, node) {
    const paper = app.model.paperById.get(node.dataset.id);
    if (!paper) return;
    app.openSheet({
      title: `Generated prompt for ${paper.id}`,
      body: html`<p class="small muted">Every prompt is built from canonical metadata and your profile. Nothing is sent
        anywhere — you copy it into the assistant you already use.</p>
        <label class="field"><span>Intent</span>
          <select data-prompt-intent>${PAPER_INTENTS.map((intent) => html`<option value="${intent.id}">${intent.label}</option>`)}</select></label>
        <pre data-prompt-body style="white-space:pre-wrap;font-size:var(--fs-sm);line-height:1.5;background:var(--surface-2);padding:.75rem;border-radius:var(--radius-sm);max-height:22rem;overflow:auto"></pre>`,
      footer: `<button type="button" class="button button--primary" data-act="copy-paper-prompt" data-id="${escapeHTML(paper.id)}" data-intent="explain">Copy</button>`
        + '<button type="button" class="button button--secondary" data-act="close-sheet">Close</button>',
      onMount: (sheet) => {
        const select = sheet.querySelector("[data-prompt-intent]");
        const body = sheet.querySelector("[data-prompt-body]");
        const copy = sheet.querySelector("[data-act='copy-paper-prompt']");
        const draw = () => {
          body.textContent = paperPrompt(app, paper, select.value);
          copy.dataset.intent = select.value;
        };
        select.addEventListener("change", draw);
        draw();
      },
    });
  },

  "open-note"(app, node) {
    const id = node.dataset.id;
    const current = app.state.notes[id] || "";
    app.openSheet({
      title: `Note — ${truncate(app.engine.label(id), 56)}`,
      body: html`<label class="field"><span>Your private note</span>
        <textarea data-sheet-note rows="12" placeholder="Mechanism, doubts, what you would test…">${current}</textarea></label>
        <p class="small dim">Stored in this browser only, and never published unless you select it in a proposal.</p>`,
      footer: '<button type="button" class="button button--ghost" data-act="close-sheet">Cancel</button>'
        + `<button type="button" class="button button--primary" data-act="save-note" data-id="${escapeHTML(id)}">Save note</button>`,
    });
  },

  async "save-note"(app, node) {
    const id = node.dataset.id;
    const value = app.sheet.querySelector("[data-sheet-note]")?.value ?? "";
    app.closeSheet();
    await app.commit((state) => {
      if (value.trim()) state.notes[id] = value;
      else delete state.notes[id];
      app.recordActivity("note", id, app.engine.label(id));
    }, { message: value.trim() ? "Note saved." : "Note removed." });
  },

  async "delete-note"(app, node) {
    const id = node.dataset.id;
    if (!window.confirm("Delete this note? Your own notes are fully deletable.")) return;
    await app.commit((state) => { delete state.notes[id]; }, { message: "Note deleted." });
  },

  "validate-competence"(app, node) {
    const topicId = node.dataset.id;
    const topic = app.model.topicById.get(topicId);
    const existing = app.state.competenceEvidence[topicId]?.evidence || "";
    const already = app.state.competenceValidated.includes(topicId);
    app.openSheet({
      title: `Validate competence — ${topic.id}`,
      body: html`<p class="prose">Validating says you can already do what this topic requires. It satisfies ${topic.id} as a
        prerequisite <strong>without</strong> marking its sessions complete, so your history stays honest and switching to a
        stricter profile still shows the work you skipped.</p>
        <div class="callout"><strong>Required competence.</strong> ${topic.target_competence}</div>
        <label class="field"><span>What is your evidence?</span>
          <textarea data-competence rows="6" placeholder="Prior work, publications, implementations, a course, an assessment you passed…">${existing}</textarea></label>`,
      footer: (already
        ? `<button type="button" class="button button--danger" data-act="revoke-competence" data-id="${escapeHTML(topicId)}">Withdraw validation</button>`
        : "")
        + '<button type="button" class="button button--ghost" data-act="close-sheet">Cancel</button>'
        + `<button type="button" class="button button--primary" data-act="confirm-competence" data-id="${escapeHTML(topicId)}">${already ? "Update the record" : "Record validated competence"}</button>`,
    });
  },

  async "confirm-competence"(app, node) {
    const topicId = node.dataset.id;
    const evidence = app.sheet.querySelector("[data-competence]")?.value ?? "";
    app.closeSheet();
    await app.commit((state) => {
      if (!state.competenceValidated.includes(topicId)) state.competenceValidated.push(topicId);
      state.competenceEvidence[topicId] = { evidence, recordedAt: new Date().toISOString() };
    }, { message: `${topicId} recorded as validated competence.` });
  },

  async "revoke-competence"(app, node) {
    const topicId = node.dataset.id;
    app.closeSheet();
    await app.commit((state) => {
      state.competenceValidated = state.competenceValidated.filter((item) => item !== topicId);
      delete state.competenceEvidence[topicId];
    }, { message: `${topicId} validation withdrawn.` });
  },

  "open-proposal"(app, node) {
    const targetId = node.dataset.id || "";
    const kindHint = node.dataset.kind || "paper";
    const topicHint = node.dataset.topic
      || app.model.paperById.get(targetId)?.topic_id
      || app.model.sessionById.get(targetId)?.topic_id
      || (app.model.topicById.has(targetId) ? targetId : "");
    const titleHint = node.dataset.title || "";
    const defaultKind = kindHint === "new-paper" ? "add" : "correct";
    app.openSheet({
      title: targetId ? `Propose a change to ${targetId}` : "Propose a change to the canon",
      body: html`<p class="prose">This creates a review request in your workspace. Nothing is changed and nothing is sent:
        you export a Git patch and a maintainer decides through a pull request.</p>
        <label class="field"><span>What are you proposing?</span>
          <select data-proposal-kind>
            ${Object.entries(PROPOSAL_LABEL).map(([value, label]) => html`<option value="${value}" ${value === defaultKind ? raw("selected") : ""}>${label}</option>`)}
          </select></label>
        <label class="field"><span>Topic it concerns</span>
          <select data-proposal-topic>
            <option value="">Not topic-specific</option>
            ${app.model.topics.map((topic) => html`<option value="${topic.id}" ${topic.id === topicHint ? raw("selected") : ""}>${topic.id} — ${truncate(topic.title, 46)}</option>`)}
          </select></label>
        <label class="field"><span>Source title (for an addition or replacement)</span>
          <input data-proposal-title value="${titleHint}" maxlength="300"></label>
        <label class="field"><span>Source URL</span>
          <input data-proposal-url type="url" maxlength="2000" placeholder="https://…"></label>
        <label class="field"><span>Justification — why does the curriculum need this?</span>
          <textarea data-proposal-rationale rows="4" placeholder="What does it change about the lineage, the evidence, or a learner's route?"></textarea></label>
        <label class="field"><span>Anything a reviewer must check</span>
          <textarea data-proposal-detail rows="3" placeholder="Conflicting evidence, licence, replication status, prerequisites it would add…"></textarea></label>`,
      footer: '<button type="button" class="button button--ghost" data-act="close-sheet">Cancel</button>'
        + `<button type="button" class="button button--primary" data-act="save-proposal" data-target="${escapeHTML(targetId)}" data-target-kind="${escapeHTML(kindHint)}">Raise the proposal</button>`,
    });
  },

  async "save-proposal"(app, node) {
    const sheet = app.sheet;
    const proposal = {
      id: `PROP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      kind: sheet.querySelector("[data-proposal-kind]").value,
      targetKind: node.dataset.targetKind,
      targetId: node.dataset.target,
      topicId: sheet.querySelector("[data-proposal-topic]").value,
      sessionId: "",
      title: sheet.querySelector("[data-proposal-title]").value.trim(),
      url: sheet.querySelector("[data-proposal-url]").value.trim(),
      rationale: sheet.querySelector("[data-proposal-rationale]").value.trim(),
      detail: sheet.querySelector("[data-proposal-detail]").value.trim(),
      createdAt: new Date().toISOString(),
    };
    if (!proposal.rationale) {
      app.toast("A proposal needs a justification before a reviewer can act on it.", true);
      return;
    }
    app.closeSheet();
    await app.commit((state) => { state.proposals.push(proposal); },
      { message: "Proposal recorded. Export it from Workspace, Proposals." });
  },

  async "delete-proposal"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => { state.proposals = state.proposals.filter((item) => item.id !== id); },
      { message: "Proposal withdrawn." });
  },

  "add-alternative"(app, node) {
    app.prefillPersonal = { topicId: node.dataset.topic, sessionId: node.dataset.id };
    window.location.hash = "#/workspace?tab=mine";
  },

  "add-personal-paper"(app, node) {
    app.prefillPersonal = { topicId: node.dataset.topic, title: node.dataset.title };
    window.location.hash = "#/workspace?tab=mine";
  },

  "edit-personal"(app, node) {
    app.editingPersonalId = node.dataset.id;
    app.render();
  },

  "cancel-personal"(app) {
    app.editingPersonalId = null;
    app.render();
  },

  async "toggle-personal"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => {
      const item = state.customItems.find((entry) => entry.id === id);
      if (item) item.disabled = !item.disabled;
    });
  },

  async "delete-personal"(app, node) {
    const id = node.dataset.id;
    if (!window.confirm("Delete this personal item? Items you created are fully deletable.")) return;
    await app.commit((state) => { state.customItems = state.customItems.filter((item) => item.id !== id); },
      { message: "Personal item deleted." });
  },

  async "move-topic"(app, node) {
    const id = node.dataset.id;
    const direction = Number(node.dataset.dir);
    const current = app.state.customOrder.length
      ? app.state.customOrder.slice()
      : app.engine.routeTopics().map((topic) => topic.id);
    const index = current.indexOf(id);
    const next = index + direction;
    if (index < 0 || next < 0 || next >= current.length) return;
    [current[index], current[next]] = [current[next], current[index]];
    const violations = app.engine.orderViolations(current);
    const unresolved = violations.filter((edge) => !app.state.orderOverrides.includes(edge.id));
    await app.commit((state) => { state.customOrder = current; }, {
      message: unresolved.length
        ? `That order violates ${plural(unresolved.length, "hard prerequisite")}. Accept the risk explicitly to use it.`
        : "Your personal order updated. The canonical curriculum is unchanged.",
    });
  },

  async "override-order"(app, node) {
    const id = node.dataset.id;
    await app.commit((state) => {
      if (!state.orderOverrides.includes(id)) state.orderOverrides.push(id);
    }, { message: "Override recorded. Your route now carries a visible dependency warning." });
  },

  async "reset-order"(app) {
    await app.commit((state) => { state.customOrder = []; state.orderOverrides = []; },
      { message: "Route order reset to the canonical sequence." });
  },

  async "dismiss-onboarding"(app) {
    await app.commit((state) => { state.onboardingDismissed = true; });
  },

  "dismiss-revision"(app) {
    app.revisionNotice = null;
    app.render();
  },

  "show-more"(app) {
    showMore();
    app.render();
  },

  async "copy-text"(app, node) {
    const ok = await copyText(node.dataset.text || "");
    app.toast(ok ? "Copied." : "Copying failed.", !ok);
  },

  "close-sheet"(app) { app.closeSheet(); },

  async "download-attachment"(app, node) {
    const records = await app.store.listAttachments();
    const record = records.find((item) => item.id === node.dataset.id);
    if (!record) return;
    download(record.name, record.blob, record.type);
  },

  async "delete-attachment"(app, node) {
    if (!window.confirm("Remove this attachment?")) return;
    await app.store.deleteAttachment(node.dataset.id);
    app.toast("Attachment removed.");
    if (node.dataset.entity) app.renderAttachmentList(node.dataset.entity);
    else app.renderAllAttachments();
  },

  async "export-bundle"(app) {
    const includeAttachments = el("[data-include-attachments]")?.checked;
    const status = el("[data-bundle-status]");
    const attachments = [];
    if (includeAttachments) {
      for (const record of await app.store.listAttachments()) {
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(record.blob);
        });
        attachments.push({ entityId: record.entityId, name: record.name, type: record.type, size: record.size, data });
      }
    }
    const bundle = {
      bundle_type: "golem_curriculum_workspace",
      schema_version: WORKSPACE_SCHEMA,
      exported_at: new Date().toISOString(),
      curriculum: {
        version: app.model.data.curriculum_version,
        source_revision: app.model.data.source_revision,
      },
      workspace: app.state,
      attachments,
    };
    download(`golem-workspace-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(bundle, null, 2));
    if (status) status.textContent = `Exported your complete personal record with ${plural(attachments.length, "attachment")}.`;
  },

  "import-bundle"(app) {
    app.bindBundleInput();
    el("[data-bundle-input]")?.click();
  },

  async "reset-workspace"(app) {
    if (!window.confirm("Reset the whole personal workspace in this browser? Export a bundle first if you want to keep it.")) return;
    await app.store.clearAll();
    app.state = blankState();
    app.state.curriculumRevision = app.model.data.source_revision;
    await app.save();
    app.toast("Personal workspace reset. Canonical curriculum data is untouched.");
    window.location.hash = "#/";
    app.render();
  },

  async "export-proposal"(app) {
    const status = el("[data-proposal-status]");
    const context = el("[data-proposal-context]")?.value.trim() || "No additional context supplied.";
    const includeNotes = Boolean(el("[data-proposal-notes]")?.checked);
    const includeArtifacts = Boolean(el("[data-proposal-artifacts]")?.checked);
    const items = app.state.customItems.filter((item) => !item.disabled);
    const attachments = includeArtifacts ? await app.store.listAttachments() : [];
    const { patches, count } = artifactPatches(app, { context, includeNotes, includeArtifacts, attachments, items });
    const reviewPatches = proposalPatches(app, app.state.proposals);
    if (!patches.length && !reviewPatches.length) {
      if (status) status.textContent = "Nothing to export yet. Raise a proposal or add personal material first.";
      return;
    }
    const text = [...reviewPatches, ...patches].join("\n");
    download(`golem-curriculum-proposal-${new Date().toISOString().slice(0, 10)}.patch`, text, "text/x-diff");
    if (status) {
      status.textContent = `Exported ${plural(reviewPatches.length, "review document")} and ${plural(count, "session directory")}. `
        + "Check it with git apply --check before opening a pull request.";
    }
  },
};

/* ------------------------------------------------------------------ bundle */

const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const INVALID_FILENAME = /[\\/ -]/;

const decodeAttachmentData = (value, expectedSize, expectedType) => {
  if (typeof value !== "string") throw new Error("an attachment payload is not a string");
  const match = value.match(/^data:([^;,]*)?(;base64)?,(.*)$/s);
  if (!match) throw new Error("an attachment payload is not a data URL");
  const [, declaredType, isBase64, payload] = match;
  if (!isBase64) throw new Error("only base64 attachment payloads are accepted");
  const binary = atob(payload);
  if (binary.length !== expectedSize) throw new Error("an attachment size does not match its payload");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type: expectedType || declaredType || "application/octet-stream" });
};

async function importBundle(app, file) {
  if (file.size > MAX_BUNDLE_BYTES) throw new Error("workspace bundles are limited to 40 MB");
  let parsed;
  try { parsed = JSON.parse(await file.text()); } catch { throw new Error("this file is not valid JSON"); }
  if (!isPlainObject(parsed)) throw new Error("this is not a supported workspace bundle");

  let incoming;
  let attachments = [];
  if (parsed.schema_version === 1 && Array.isArray(parsed.completed_sessions)) {
    incoming = blankState();
    incoming.entityStatus = Object.fromEntries(parsed.completed_sessions
      .filter((id) => typeof id === "string").slice(0, 5000).map((id) => [id, "completed"]));
  } else if (parsed.bundle_type === "golem_curriculum_workspace"
    && [2, 3, 4].includes(parsed.schema_version) && isPlainObject(parsed.workspace)) {
    incoming = normalizeState(parsed.workspace);
    attachments = Array.isArray(parsed.attachments) ? parsed.attachments : [];
  } else {
    throw new Error("this is not a supported workspace bundle");
  }
  if (attachments.length > MAX_ATTACHMENTS) throw new Error(`a bundle may contain at most ${MAX_ATTACHMENTS} attachments`);

  const migrate = (id) => (app.model.knownEntityIds.has(id) ? id : app.model.aliasToStable.get(id) || null);
  const decoded = [];
  let totalBytes = 0;
  for (const [index, item] of attachments.entries()) {
    if (!isPlainObject(item)) throw new Error(`attachment ${index + 1} is malformed`);
    const entityId = migrate(item.entityId);
    if (!entityId) throw new Error(`attachment ${index + 1} references an unknown canonical entity`);
    if (typeof item.name !== "string" || !item.name || item.name.length > 180 || INVALID_FILENAME.test(item.name)) {
      throw new Error(`attachment ${index + 1} has an invalid filename`);
    }
    if (!Number.isInteger(item.size) || item.size < 0 || item.size > MAX_ATTACHMENT_BYTES) {
      throw new Error(`attachment ${index + 1} has an invalid size`);
    }
    const blob = decodeAttachmentData(item.data, item.size, typeof item.type === "string" ? item.type.slice(0, 120) : "");
    totalBytes += blob.size;
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) throw new Error("bundle attachments exceed the 24 MB total limit");
    decoded.push({ entityId, name: item.name, blob });
  }
  if (decoded.length && !app.store.persistent) throw new Error("attachments require persistent browser storage");

  const next = blankState();
  const now = new Date().toISOString();
  let migrated = 0;
  let archived = 0;

  next.profile = incoming.profile;
  next.theme = incoming.theme;
  next.onboardingDismissed = incoming.onboardingDismissed;
  next.target = incoming.target && app.model.knownEntityIds.has(incoming.target.id) ? incoming.target : null;
  next.customItems = incoming.customItems.filter((item) => app.model.topicById.has(item.topicId));
  next.proposals = incoming.proposals;
  next.customOrder = incoming.customOrder.filter((id) => app.model.topicById.has(id));
  next.orderOverrides = incoming.orderOverrides.filter((id) => app.model.relationshipById.has(id));
  next.competenceValidated = incoming.competenceValidated.filter((id) => app.model.topicById.has(id));
  next.competenceEvidence = Object.fromEntries(Object.entries(incoming.competenceEvidence)
    .filter(([id]) => app.model.topicById.has(id)));
  next.sprintCovered = incoming.sprintCovered.map(migrate).filter(Boolean);
  next.activatedSessionIds = incoming.activatedSessionIds.map(migrate)
    .filter((id) => id && ["Frontier Continuation", "Optional Specialization"].includes(app.model.sessionById.get(id)?.classification));
  next.compare = incoming.compare.filter((id) => app.model.paperById.has(id));
  next.orphanArchive = incoming.orphanArchive.slice(0, 500);

  for (const [rawId, status] of Object.entries(incoming.entityStatus)) {
    const id = migrate(rawId);
    if (id) { next.entityStatus[id] = status; if (id !== rawId) migrated += 1; }
    else { next.orphanArchive.push({ kind: "status", originalId: rawId, value: status, importedAt: now }); archived += 1; }
  }
  for (const [rawId, note] of Object.entries(incoming.notes)) {
    const id = migrate(rawId);
    if (id) { next.notes[id] = note; if (id !== rawId) migrated += 1; }
    else { next.orphanArchive.push({ kind: "note", originalId: rawId, value: note, importedAt: now }); archived += 1; }
  }
  for (const [rawId, record] of Object.entries(incoming.paperState)) {
    if (app.model.paperById.has(rawId)) next.paperState[rawId] = record;
    else { next.orphanArchive.push({ kind: "reading", originalId: rawId, value: record.status || "starred", importedAt: now }); archived += 1; }
  }
  for (const rawId of incoming.disabledIds) {
    const id = migrate(rawId);
    if (id) next.disabledIds.push(id);
    else { next.orphanArchive.push({ kind: "hidden", originalId: rawId, importedAt: now }); archived += 1; }
  }
  next.recentActivity = incoming.recentActivity
    .filter((entry) => app.model.knownEntityIds.has(entry.entityId)
      || next.customItems.some((item) => item.id === entry.entityId)).slice(0, 40);

  const importedRevision = parsed.curriculum?.source_revision || incoming.curriculumRevision;
  if (typeof importedRevision === "string" && /^[0-9a-f]{64}$/.test(importedRevision)
    && importedRevision !== app.model.data.source_revision) {
    app.revisionNotice = { previous: importedRevision, current: app.model.data.source_revision, archived };
  }
  next.curriculumRevision = app.model.data.source_revision;

  app.state = await app.store.save(next);
  app.engine.invalidate(app.state);
  for (const item of decoded) {
    await app.store.putAttachment(item.entityId, new File([item.blob], item.name, { type: item.blob.type }));
  }
  app.render();
  const status = el("[data-bundle-status]");
  if (status) {
    status.textContent = `Imported. ${migrated} identifier(s) migrated, ${archived} unknown record(s) archived, `
      + `${decoded.length} attachment(s) restored.`;
  }
  app.toast("Workspace imported.");
}

/* ------------------------------------------------------------------ palette */

function openPalette(app) {
  const commands = [
    { kind: "Go", id: "plan", title: "My plan — what I am doing next", href: "#/" },
    { kind: "Go", id: "curr", title: "Curriculum", href: "#/curriculum" },
    { kind: "Go", id: "papers", title: "Papers", href: "#/papers" },
    { kind: "Go", id: "compare", title: "Compare papers", href: "#/compare" },
    { kind: "Go", id: "map", title: "Relationship map — topics", href: "#/map" },
    { kind: "Go", id: "papermap", title: "Relationship map — paper lineages", href: "#/map?layer=papers" },
    { kind: "Go", id: "place", title: "I found a paper — where does it fit?", href: "#/place" },
    { kind: "Go", id: "work", title: "Workspace", href: "#/workspace" },
    { kind: "Go", id: "ref", title: "Reference documents", href: "#/reference" },
    { kind: "Do", id: "guided", title: "Switch to Guided", act: "set-profile", data: { profile: "guided" } },
    { kind: "Do", id: "accel", title: "Switch to Accelerated", act: "set-profile", data: { profile: "accelerated" } },
    { kind: "Do", id: "sprint", title: "Switch to AI Sprint", act: "set-profile", data: { profile: "ai_sprint" } },
    { kind: "Do", id: "target", title: "Choose a learning target", act: "open-target", data: {} },
    { kind: "Do", id: "route", title: "Add my target route to my plan", act: "plan-route", data: {} },
    { kind: "Do", id: "bundle", title: "Export my workspace bundle", href: "#/workspace?tab=bundle" },
  ];

  const root = app.paletteRoot;
  setHTML(root, html`<div class="palette-backdrop" data-palette-backdrop>
    <div class="palette" role="dialog" aria-modal="true" aria-label="Search and commands">
      <input class="palette-input" type="search" data-palette-input autocomplete="off" spellcheck="false"
        placeholder="Search topics, sessions, papers, resources — or type a command">
      <div class="palette-results" data-palette-results role="listbox" aria-label="Results"></div>
      <div class="palette-foot"><span>Up and down to move</span><span>Enter to open</span>
        <span>Esc to close</span><span>${app.model.papers.length} papers, ${app.model.sessions.length} sessions</span></div>
    </div></div>`);

  const input = el("[data-palette-input]", root);
  const results = el("[data-palette-results]", root);
  let active = 0;
  let items = [];

  const close = () => {
    setHTML(root, "");
    document.removeEventListener("keydown", onKey, true);
  };

  const choose = (index) => {
    const item = items[index];
    if (!item) return;
    close();
    if (item.href) window.location.hash = item.href;
    else if (item.act) ACTIONS[item.act]?.(app, { dataset: item.data || {} });
  };

  const highlight = () => {
    els(".palette-item", results).forEach((node, index) => {
      node.classList.toggle("is-active", index === active);
      node.setAttribute("aria-selected", index === active ? "true" : "false");
      if (index === active) node.scrollIntoView({ block: "nearest" });
    });
  };

  function onKey(event) {
    if (event.key === "Escape") { event.preventDefault(); close(); }
    else if (event.key === "ArrowDown") { event.preventDefault(); active = Math.min(active + 1, items.length - 1); highlight(); }
    else if (event.key === "ArrowUp") { event.preventDefault(); active = Math.max(active - 1, 0); highlight(); }
    else if (event.key === "Enter") { event.preventDefault(); choose(active); }
  }

  const draw = () => {
    const query = normalize(input.value.trim());
    const rank = { Paper: 0, Topic: 1, Session: 2, Resource: 3, Frontier: 4 };
    const matched = query
      ? app.searchIndex
        .map((entry) => {
          const position = entry.text.indexOf(query);
          if (position < 0) return null;
          const exactId = normalize(entry.id) === query ? -100 : 0;
          const wordStart = position === 0 || /[^a-z0-9]/.test(entry.text[position - 1]) ? -20 : 0;
          return { entry, score: exactId + wordStart + rank[entry.kind] * 3 + Math.min(position, 40) / 40 };
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score)
        .slice(0, 40)
        .map((item) => item.entry)
      : [];
    const matchedCommands = commands.filter((command) => !query || normalize(command.title).includes(query)).slice(0, 8);
    items = [...matchedCommands, ...matched];
    active = 0;
    if (!items.length) {
      setHTML(results, html`<p class="small dim" style="padding:1rem">No match for “${input.value}”. Try a paper title,
        an identifier such as P104 or L6-S02, or an author.</p>`);
      return;
    }
    const seenKinds = new Set();
    let out = "";
    items.forEach((item, index) => {
      if (!seenKinds.has(item.kind)) {
        seenKinds.add(item.kind);
        const label = item.kind === "Go" ? "Navigate" : item.kind === "Do" ? "Commands" : `${item.kind}s`;
        out += `<div class="palette-group">${escapeHTML(label)}</div>`;
      }
      out += `<button type="button" class="palette-item${index === 0 ? " is-active" : ""}" role="option" data-index="${index}"`
        + ` data-search-kind="${escapeHTML(item.kind)}" data-search-id="${escapeHTML(item.id || "")}"`
        + ` aria-selected="${index === 0 ? "true" : "false"}">`
        + `<span class="p-kind">${escapeHTML(item.id || item.kind)}</span>`
        + `<span class="p-title">${escapeHTML(item.title)}</span>`
        + `<span class="p-sub">${escapeHTML(item.subtitle || "")}</span></button>`;
    });
    setHTML(results, out);
  };

  results.addEventListener("click", (event) => {
    const button = event.target.closest(".palette-item");
    if (button) choose(Number(button.dataset.index));
  });
  el("[data-palette-backdrop]", root).addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) close();
  });
  input.addEventListener("input", draw);
  document.addEventListener("keydown", onKey, true);
  draw();
  input.focus();
}

/* -------------------------------------------------------------------- boot */

function applyTheme(value) {
  if (value === "light" || value === "dark") document.documentElement.dataset.theme = value;
  else document.documentElement.removeAttribute("data-theme");
  try { localStorage.setItem("golem-theme", value); } catch { /* storage may be blocked */ }
}

function migrateLegacyQueryRoute() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  if (!view) return;
  const map = {
    home: "#/", curriculum: "#/curriculum", library: "#/papers",
    workspace: "#/workspace", reference: "#/reference",
  };
  let hash = map[view] || "#/";
  if (view === "topic" && params.get("topic")) hash = `#/topics/${params.get("topic")}`;
  if (view === "session" && params.get("session")) hash = `#/sessions/${params.get("session")}`;
  window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
}

async function boot() {
  const outlet = el("[data-outlet]");
  let data;
  try {
    const response = await fetch(GRAPH_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (error) {
    setHTML(outlet, html`<div class="page page--narrow"><div class="card">
      <h1>The curriculum data could not be loaded</h1>
      <p class="prose" style="margin-top:.5rem">${String(error.message || error)}. The canonical Markdown remains
        readable: <a href="${REFERENCE_BASE}curriculum_map/">curriculum map</a> and
        <a href="${REFERENCE_BASE}paper_index/">paper index</a>.</p>
      <p style="margin-top:.8rem"><button type="button" class="button button--primary" data-act="reload">Try again</button></p>
    </div></div>`);
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-act='reload']")) window.location.reload();
    });
    return;
  }

  const model = buildModel(data);
  const store = await new WorkspaceStore().open();
  let state = await store.load();
  const migration = await store.migrateLegacy(model.aliasToStable, model.knownEntityIds, state);
  state = migration.state;

  const app = new App(model, store, state);
  window.__golem = app;

  if (state.curriculumRevision && state.curriculumRevision !== data.source_revision) {
    app.revisionNotice = { previous: state.curriculumRevision, current: data.source_revision, archived: 0 };
  }
  state.curriculumRevision = data.source_revision;
  await app.save();
  applyTheme(app.state.theme);

  migrateLegacyQueryRoute();
  if (!window.location.hash) {
    window.history.replaceState(null, "", `${window.location.pathname}${app.state.lastRoute || "#/"}`);
  }

  document.addEventListener("click", async (event) => {
    const trigger = event.target.closest("[data-act]");
    if (trigger) {
      // Checkboxes and radios are owned by the change handler; acting here too would toggle twice.
      if (trigger.tagName === "INPUT" && ["checkbox", "radio"].includes(trigger.type)) return;
      const action = ACTIONS[trigger.dataset.act];
      if (action) {
        if (trigger.tagName === "A" || trigger.tagName === "LABEL") event.preventDefault();
        await action(app, trigger);
        return;
      }
    }
    if (event.target.closest("[data-open-palette]")) { event.preventDefault(); openPalette(app); return; }
    if (event.target.closest("[data-open-profile]")) { event.preventDefault(); ACTIONS["open-profile"](app); return; }
    if (event.target.closest("[data-toggle-theme]")) {
      event.preventDefault();
      const order = ["system", "light", "dark"];
      const next = order[(order.indexOf(app.state.theme) + 1) % order.length];
      app.state.theme = next;
      applyTheme(next);
      await app.save();
      app.toast(`Colour theme: ${next}`);
    }
  });

  document.addEventListener("change", async (event) => {
    const node = event.target;
    if (node.matches("[data-act='toggle-compare']")) { await ACTIONS["toggle-compare"](app, node); return; }
    if (node.matches("[data-act='toggle-sprint']")) { await ACTIONS["toggle-sprint"](app, node); return; }
    const query = app.parseRoute().query;
    if (node.matches("[data-act='set-sort']")) {
      query.sort = node.value;
      window.location.hash = `#/papers?${new URLSearchParams(query)}`;
      return;
    }
    if (node.matches("[data-act='filter-area']")) {
      if (node.value) query.area = node.value; else delete query.area;
      window.location.hash = `#/curriculum?${new URLSearchParams(query)}`;
      return;
    }
    if (node.matches("[data-act='filter-ready']")) {
      if (node.checked) query.ready = "1"; else delete query.ready;
      window.location.hash = `#/curriculum?${new URLSearchParams(query)}`;
      return;
    }
    if (node.matches("[data-act='filter-topic']")) {
      if (node.value) query.topic = node.value; else delete query.topic;
      window.location.hash = `#/resources?${new URLSearchParams(query)}`;
      return;
    }
    if (node.matches("[data-act='map-control']")) {
      const next = { ...query };
      if (node.value) next[node.dataset.key] = node.value; else delete next[node.dataset.key];
      delete next.focus;
      const pairs = Object.entries(next).filter(([, value]) => value);
      window.location.hash = pairs.length
        ? `#/map?${pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}`
        : "#/map";
      return;
    }
    if (node.matches("[data-act='map-scope']") || node.matches("[data-act='map-focus']")) {
      const key = node.dataset.act === "map-scope" ? "scope" : "focus";
      if (node.value) query[key] = node.value; else delete query[key];
      query.mode = "map";
      window.location.hash = `#/curriculum?${new URLSearchParams(query)}`;
    }
  });

  const runSearchFilter = debounce((value) => {
    const { parts, query } = app.parseRoute();
    if (value) query.q = value; else delete query.q;
    const base = parts[0] === "curriculum" ? "#/curriculum" : parts[0] === "resources" ? "#/resources" : "#/papers";
    const search = new URLSearchParams(query).toString();
    app.restoreFilterFocus = true;
    window.location.hash = search ? `${base}?${search}` : base;
  }, 350);

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-act='filter-search']")) runSearchFilter(event.target.value.trim());
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette(app);
      return;
    }
    if (event.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) && !event.target.isContentEditable) {
      event.preventDefault();
      openPalette(app);
    }
  });

  app.sheet.addEventListener("close", () => setHTML(app.sheet, ""));

  window.addEventListener("popstate", () => { app.poppingHistory = true; });

  // A few surfaces render differently either side of the split breakpoint, so a
  // rotated tablet or a resized window must be re-rendered rather than left stale.
  let wasWide = window.innerWidth >= 1100;
  window.addEventListener("resize", debounce(() => {
    const isWide = window.innerWidth >= 1100;
    if (isWide !== wasWide) {
      wasWide = isWide;
      app.render();
    }
  }, 180));

  window.addEventListener("hashchange", () => {
    app.render();
    if (app.restoreFilterFocus) {
      const field = el("[data-act='filter-search']");
      if (field) {
        field.focus();
        field.setSelectionRange(field.value.length, field.value.length);
      }
      app.restoreFilterFocus = false;
    }
  });

  app.render();
}

boot();
