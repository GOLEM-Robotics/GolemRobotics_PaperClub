(() => {
  "use strict";

  const VIEWS = new Set(["home", "curriculum", "library", "workspace", "reference", "topic", "session"]);
  const TOPIC_TABS = new Set(["summary", "path", "sessions", "papers", "resources", "connections", "notes", "history"]);
  const DONE = new Set(["completed"]);
  const STATUS_LABELS = {
    not_started: "Not started",
    in_progress: "In progress",
    completed: "Completed",
    skipped: "Skipped for this route",
  };
  const PROFILE = {
    guided: {
      label: "Guided",
      description: "Follow every Required Core session with full source reading, reconstruction, practice, and explicit evidence.",
      verb: "Work through the source and build the planned artifact",
    },
    accelerated: {
      label: "Accelerated",
      description: "Keep every competence boundary while compressing orientation, using targeted source sections, and avoiding duplicate setup work.",
      verb: "Read the decisive sections, test the central claim, and preserve the required artifact",
    },
    ai_sprint: {
      label: "AI Sprint",
      description: "Use generated AI prompts for speed, then verify claims against authoritative sources and produce the same competence evidence.",
      verb: "Interrogate the method with AI, verify against the source, and produce auditable evidence",
    },
  };
  const AREA_COLORS = {
    shared_foundations: "#3559c7",
    perception_world_models: "#087f78",
    learning_to_act: "#7548bd",
    data_research_systems: "#b15f14",
    language_embodied_reasoning: "#b83f5a",
    specialization_branches: "#536273",
  };

  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const normalize = (value) => String(value ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const compact = (value, length = 190) => {
    const text = String(value ?? "").trim();
    return text.length <= length ? text : `${text.slice(0, length - 1).trimEnd()}…`;
  };
  const plural = (count, singular, suffix = "s") => `${count} ${singular}${count === 1 ? "" : suffix}`;
  const PERSONAL_ID_RE = /^PERSONAL-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const MAX_BUNDLE_BYTES = 40 * 1024 * 1024;
  const MAX_CUSTOM_ITEMS = 200;
  const MAX_ATTACHMENTS = 32;
  const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
  const MAX_TOTAL_ATTACHMENT_BYTES = 24 * 1024 * 1024;
  const download = (filename, value, type = "application/json") => {
    const blob = value instanceof Blob ? value : new Blob([value], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };
  const fileToDataURL = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
  const decodeAttachmentData = (value, expectedSize, expectedType) => {
    if (typeof value !== "string") throw new Error("Attachment data must be a local base64 data URL.");
    const match = /^data:([a-z0-9][a-z0-9.+-]*\/[a-z0-9][a-z0-9.+-]*);base64,([a-z0-9+/]*={0,2})$/i.exec(value);
    if (!match) throw new Error("Attachments must use a base64 data URL; remote URLs are not accepted.");
    const mimeType = match[1].toLowerCase();
    if (expectedType && String(expectedType).toLowerCase() !== mimeType) throw new Error("Attachment type does not match its data URL.");
    const encoded = match[2];
    const padding = encoded.endsWith("==") ? 2 : encoded.endsWith("=") ? 1 : 0;
    const estimatedSize = Math.floor(encoded.length * 3 / 4) - padding;
    if (estimatedSize > MAX_ATTACHMENT_BYTES) throw new Error("An attachment exceeds the 8 MB import limit.");
    if (Number.isInteger(expectedSize) && expectedSize !== estimatedSize) throw new Error("Attachment size metadata does not match its payload.");
    let binary;
    try { binary = atob(encoded); }
    catch { throw new Error("Attachment base64 data is malformed."); }
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new Blob([bytes], { type: mimeType });
  };

  const validateCustomItems = (value, topicById) => {
    if (!Array.isArray(value)) throw new Error("Workspace customItems must be an array.");
    if (value.length > MAX_CUSTOM_ITEMS) throw new Error(`A bundle may contain at most ${MAX_CUSTOM_ITEMS} personal items.`);
    const seen = new Set();
    return value.map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`Personal item ${index + 1} is malformed.`);
      if (typeof item.id !== "string" || !PERSONAL_ID_RE.test(item.id) || seen.has(item.id)) throw new Error(`Personal item ${index + 1} has an invalid or duplicate ID.`);
      if (!["session", "material"].includes(item.kind)) throw new Error(`Personal item ${index + 1} has an invalid type.`);
      if (typeof item.topicId !== "string" || !topicById.has(item.topicId)) throw new Error(`Personal item ${index + 1} references an unknown topic.`);
      if (typeof item.title !== "string" || !item.title.trim() || item.title.length > 180) throw new Error(`Personal item ${index + 1} has an invalid title.`);
      if (typeof item.objective !== "string" || !item.objective.trim() || item.objective.length > 4000) throw new Error(`Personal item ${index + 1} has an invalid objective.`);
      if (typeof item.source !== "string" || item.source.length > 2048) throw new Error(`Personal item ${index + 1} has an invalid source.`);
      seen.add(item.id);
      return {
        id: item.id,
        kind: item.kind,
        title: item.title.trim(),
        topicId: item.topicId,
        objective: item.objective.trim(),
        source: item.source.trim(),
        disabled: item.disabled === true,
        updatedAt: typeof item.updatedAt === "string" && item.updatedAt.length <= 64 ? item.updatedAt : new Date().toISOString(),
      };
    });
  };

  const validateBoundedArray = (value, label, limit = 5000) => {
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.length > limit || value.some((item) => typeof item !== "string" || item.length > 160)) {
      throw new Error(`${label} is malformed or exceeds its import limit.`);
    }
    return value;
  };

  let cytoscapePromise;
  function loadCytoscape(graphURL) {
    if (!cytoscapePromise) {
      const dataURL = new URL(graphURL, document.baseURI);
      const moduleURL = new URL("../vendor/cytoscape-3.33.1.esm.min.js", dataURL);
      cytoscapePromise = import(moduleURL.href).then((module) => module.c || module.default);
    }
    return cytoscapePromise;
  }

  class CurriculumApp {
    constructor(root) {
      this.root = root;
      this.data = null;
      this.state = null;
      this.store = null;
      this.currentView = "home";
      this.currentTopicId = null;
      this.currentSessionId = null;
      this.currentTab = "summary";
      this.curriculumMode = "path";
      this.libraryKind = "papers";
      this.areaFilter = "";
      this.readyFilter = false;
      this.mapScope = "overview";
      this.cy = null;
      this.saveTimer = null;
    }

    async init() {
      document.body.classList.add("curriculum-app-page");
      this.cacheDOM();
      const response = await fetch(new URL(this.root.dataset.graphUrl, document.baseURI), { cache: "no-cache" });
      if (!response.ok) throw new Error(`Curriculum data could not be loaded (HTTP ${response.status}).`);
      this.data = await response.json();
      if (this.data.schema_version !== 2) throw new Error(`Unsupported curriculum schema ${this.data.schema_version}.`);
      this.indexData();
      this.store = await new window.GolemWorkspaceStore.WorkspaceStore().open();
      this.state = await this.store.load();
      const migration = await this.store.migrateLegacy(this.aliasToStable, this.knownEntityIds, this.state);
      this.state = migration.state;
      let upgradedValidatedState = false;
      const legacyValidatedByTopic = new Map();
      for (const [sessionId, status] of Object.entries(this.state.entityStatus)) {
        if (status !== "validated" || !this.sessionById.has(sessionId)) continue;
        this.state.entityStatus[sessionId] = "completed";
        const topicId = this.sessionById.get(sessionId).topic_id;
        if (!legacyValidatedByTopic.has(topicId)) legacyValidatedByTopic.set(topicId, new Set());
        legacyValidatedByTopic.get(topicId).add(sessionId);
        upgradedValidatedState = true;
      }
      for (const [topicId, validatedIds] of legacyValidatedByTopic) {
        const coreIds = this.topicById.get(topicId).completion_model.required_core_session_ids;
        if (!coreIds.length || !coreIds.every((id) => validatedIds.has(id))) continue;
        if (!this.state.competenceValidated.includes(topicId)) this.state.competenceValidated.push(topicId);
        this.state.competenceEvidence[topicId] = {
          evidence: "Migrated from the legacy state in which every Required Core session was individually validated.",
          recordedAt: new Date().toISOString(),
        };
      }
      if (upgradedValidatedState) this.state = await this.store.save(this.state);
      this.populateControls();
      this.bindEvents();
      this.restoreRoute();
      this.renderAll();
      this.showView(this.currentView, { history: "replace" });
      this.setStatus(migration.migrated || migration.archived
        ? `Workspace ready. Migrated ${migration.migrated}; archived ${migration.archived} unknown entries.`
        : "");
      window.__curriculumExplorer = this;
    }

    cacheDOM() {
      this.views = new Map([...this.root.querySelectorAll("[data-view-panel]")].map((node) => [node.dataset.viewPanel, node]));
      this.status = this.root.querySelector("[data-app-status]");
      this.searchInput = this.root.querySelector("[data-global-search]");
      this.searchResults = this.root.querySelector("[data-search-results]");
      this.libraryContent = this.root.querySelector("[data-library-content]");
      this.topicHeader = this.root.querySelector("[data-topic-header]");
      this.topicContent = this.root.querySelector("[data-topic-content]");
      this.sessionHeader = this.root.querySelector("[data-session-header]");
      this.sessionContent = this.root.querySelector("[data-session-content]");
      this.sessionSide = this.root.querySelector("[data-session-side]");
      this.bundleStatus = this.root.querySelector("[data-bundle-status]");
    }

    indexData() {
      this.topicById = new Map(this.data.topics.map((item) => [item.id, item]));
      this.sessionById = new Map(this.data.sessions.map((item) => [item.id, item]));
      this.paperById = new Map(this.data.papers.map((item) => [item.id, item]));
      this.resourceById = new Map(this.data.resources.map((item) => [item.id, item]));
      this.frontierById = new Map(this.data.frontier_items.map((item) => [item.id, item]));
      this.sessionsByTopic = new Map(this.data.topics.map((topic) => [topic.id, []]));
      this.hardIncoming = new Map(this.data.topics.map((topic) => [topic.id, []]));
      this.coreGateIncoming = new Map(this.data.topics.map((topic) => [topic.id, []]));
      this.hardOutgoing = new Map(this.data.topics.map((topic) => [topic.id, []]));
      this.relationshipById = new Map(this.data.relationships.map((edge) => [edge.id, edge]));
      this.aliasToStable = new Map();
      for (const session of this.data.sessions) {
        this.sessionsByTopic.get(session.topic_id).push(session);
        for (const alias of session.legacy_aliases) this.aliasToStable.set(alias, session.id);
      }
      for (const sessions of this.sessionsByTopic.values()) sessions.sort((a, b) => a.sequence - b.sequence);
      for (const edge of this.data.relationships) {
        if (edge.type !== "hard_prerequisite") continue;
        if (edge.scope === "topic_entry") this.hardIncoming.get(edge.target).push(edge.source);
        if (edge.target_session_ids.some((id) => this.sessionById.get(id)?.classification === "Required Core")) {
          this.coreGateIncoming.get(edge.target).push(edge.source);
        }
        this.hardOutgoing.get(edge.source).push(edge.target);
      }
      this.knownEntityIds = new Set([
        ...this.topicById.keys(), ...this.sessionById.keys(), ...this.paperById.keys(),
        ...this.resourceById.keys(), ...this.frontierById.keys(),
      ]);
      this.searchIndex = this.buildSearchIndex();
    }

    buildSearchIndex() {
      const entries = [];
      for (const topic of this.data.topics) entries.push({
        kind: "topic", id: topic.id, topicId: topic.id, title: topic.title,
        subtitle: `${topic.area_short_label} · ${topic.status}`,
        text: normalize([topic.id, topic.title, topic.covers, topic.target_competence].join(" ")),
      });
      for (const session of this.data.sessions) entries.push({
        kind: "session", id: session.id, topicId: session.topic_id, title: session.title,
        subtitle: `${session.display_id} · ${session.classification}`,
        text: normalize([session.id, ...session.legacy_aliases, session.title, session.objective, session.artifact].join(" ")),
      });
      for (const paper of this.data.papers) entries.push({
        kind: "paper", id: paper.id, topicId: paper.topic_id, title: paper.title,
        subtitle: [paper.authors, paper.year, paper.venue].filter(Boolean).join(" · "),
        text: normalize([paper.id, paper.title, paper.authors, paper.contribution, paper.lineage].join(" ")),
      });
      for (const resource of this.data.resources) entries.push({
        kind: "resource", id: resource.id, topicId: resource.topic_ids[0], title: resource.title,
        subtitle: `${resource.type} · ${resource.topic_ids.join(", ")}`,
        text: normalize([resource.id, resource.title, resource.required_use, resource.topics_raw].join(" ")),
      });
      for (const item of this.data.frontier_items) entries.push({
        kind: "frontier", id: item.id, topicId: item.topic_ids[0], title: item.title,
        subtitle: `Frontier · review ${item.review_date}`,
        text: normalize([item.id, item.title, item.reason, item.maturity, item.related_topics_raw].join(" ")),
      });
      return entries;
    }

    populateControls() {
      const topicOptions = this.data.topics.map((topic) => `<option value="${topic.id}">${topic.id} — ${escapeHTML(topic.title)}</option>`).join("");
      for (const select of this.root.querySelectorAll("[data-target-select]")) select.insertAdjacentHTML("beforeend", topicOptions);
      for (const select of this.root.querySelectorAll("[data-library-topic], [data-map-topic-select]")) select.insertAdjacentHTML("beforeend", topicOptions);
      const formTopic = this.root.querySelector('[data-addition-form] select[name="topicId"]');
      formTopic.innerHTML = topicOptions;
      const areaSelect = this.root.querySelector("[data-area-filter]");
      areaSelect.insertAdjacentHTML("beforeend", this.data.areas.map((area) => `<option value="${area.id}">${escapeHTML(area.label)}</option>`).join(""));
      this.root.querySelector("[data-paper-count]").textContent = this.data.papers.length;
      this.root.querySelector("[data-resource-count]").textContent = this.data.resources.length;
      this.root.querySelector("[data-frontier-count]").textContent = this.data.frontier_items.length;
      this.syncControls();
    }

    syncControls() {
      for (const select of this.root.querySelectorAll("[data-profile-select]")) select.value = this.state.profile;
      for (const select of this.root.querySelectorAll("[data-target-select]")) select.value = this.state.targetTopicId || "";
      for (const node of this.root.querySelectorAll("[data-profile-description]")) node.textContent = PROFILE[this.state.profile].description;
      this.root.querySelector("[data-area-filter]").value = this.areaFilter;
      this.root.querySelector("[data-ready-filter]").checked = this.readyFilter;
      this.root.querySelector("[data-map-scope]").value = this.mapScope;
    }

    statusOf(id) { return this.state.entityStatus[id] || "not_started"; }
    isDone(id) { return DONE.has(this.statusOf(id)); }

    topicMetrics(topicId) {
      const topic = this.topicById.get(topicId);
      const core = topic.completion_model.required_core_session_ids;
      const continuation = topic.completion_model.continuation_session_ids;
      const optional = topic.completion_model.optional_session_ids;
      const activatedContinuation = continuation.filter((id) => this.state.activatedSessionIds.includes(id));
      const activatedOptional = optional.filter((id) => this.state.activatedSessionIds.includes(id));
      const activated = [...core, ...activatedContinuation, ...activatedOptional];
      const countDone = (ids) => ids.filter((id) => this.isDone(id)).length;
      return {
        coreDone: countDone(core), coreTotal: core.length,
        continuationDone: countDone(continuation), continuationTotal: continuation.length,
        activatedDone: countDone(activated), activatedTotal: activated.length,
        activatedContinuation: activatedContinuation.length,
        activatedOptional: activatedOptional.length,
        sprintDone: core.filter((id) => this.state.sprintCovered.includes(id)).length,
        validated: this.state.competenceValidated.includes(topicId),
        coreComplete: this.state.competenceValidated.includes(topicId) || (core.length > 0 && core.every((id) => this.isDone(id))),
      };
    }

    isTopicReady(topicId) {
      return this.hardIncoming.get(topicId).every((dependency) => this.topicMetrics(dependency).coreComplete);
    }

    isSessionReady(session) {
      if (!this.isTopicReady(session.topic_id)) return false;
      if (this.state.competenceValidated.includes(session.topic_id)) return true;
      const localReady = session.readiness.prior_session_ids.every((id) => this.isDone(id));
      const gatesReady = session.relationship_gates.every((id) => {
        const edge = this.relationshipById.get(id);
        return edge && this.topicMetrics(edge.source).coreComplete;
      });
      return localReady && gatesReady;
    }

    routeTo(targetId = this.state.targetTopicId) {
      if (!targetId) return this.data.topics.slice().sort((a, b) => a.rank - b.rank || a.area_order - b.area_order || a.id.localeCompare(b.id));
      const included = new Set();
      const visit = (id) => {
        if (included.has(id)) return;
        included.add(id);
        for (const source of [...(this.hardIncoming.get(id) || []), ...(this.coreGateIncoming.get(id) || [])]) visit(source);
      };
      visit(targetId);
      let route = this.data.topics.filter((topic) => included.has(topic.id));
      route.sort((a, b) => a.rank - b.rank || a.area_order - b.area_order || a.id.localeCompare(b.id));
      if (this.state.customOrder.length) {
        const index = new Map(this.state.customOrder.map((id, position) => [id, position]));
        const candidate = route.slice().sort((a, b) => (index.get(a.id) ?? 9999) - (index.get(b.id) ?? 9999) || a.rank - b.rank || a.id.localeCompare(b.id));
        const violations = this.orderViolations(candidate.map((topic) => topic.id));
        if (violations.every((edge) => this.state.orderOverrides.includes(edge.id))) route = candidate;
      }
      return route;
    }

    orderViolations(routeIds) {
      const position = new Map(routeIds.map((id, index) => [id, index]));
      return this.data.relationships.filter((edge) => edge.type === "hard_prerequisite"
        && position.has(edge.source) && position.has(edge.target)
        && position.get(edge.source) > position.get(edge.target));
    }

    nextSession() {
      const inProgress = this.data.sessions.find((session) => this.statusOf(session.id) === "in_progress");
      if (inProgress) return { session: inProgress, reason: "You already started this session. Resume it before opening another thread." };
      const route = this.state.targetTopicId
        ? this.routeTo()
        : this.data.topics.filter((topic) => ["F1", "F2", "F6", "L1"].includes(topic.id));
      for (const topic of route) {
        if (this.state.disabledIds.includes(topic.id) || !this.isTopicReady(topic.id)) continue;
        const session = topic.completion_model.required_core_session_ids
          .map((id) => this.sessionById.get(id)).find((item) => !this.state.disabledIds.includes(item.id) && !this.isDone(item.id) && this.statusOf(item.id) !== "skipped" && this.isSessionReady(item));
        if (session) {
          const dependencyText = topic.hard_prerequisites.length
            ? `Its ${plural(topic.hard_prerequisites.length, "blocking prerequisite")} are complete.`
            : "It has no blocking topic prerequisite.";
          return { session, reason: `${dependencyText} ${PROFILE[this.state.profile].verb}.` };
        }
      }
      return null;
    }

    async saveState() {
      this.state = await this.store.save(this.state);
      this.syncControls();
    }

    scheduleSave() {
      clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => this.saveState(), 250);
    }

    setStatus(message, error = false) {
      this.status.textContent = message;
      this.status.hidden = !message;
      this.status.classList.toggle("error", error);
    }

    routeURL(view = this.currentView) {
      const params = new URLSearchParams();
      if (view !== "home") params.set("view", view);
      if (view === "topic" && this.currentTopicId) {
        params.set("topic", this.currentTopicId);
        if (this.currentTab !== "summary") params.set("tab", this.currentTab);
      }
      if (view === "session" && this.currentSessionId) params.set("session", this.currentSessionId);
      return `${window.location.pathname}${params.size ? `?${params}` : ""}`;
    }

    restoreRoute() {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("view") || "home";
      this.currentView = VIEWS.has(requested) ? requested : "home";
      const topicId = params.get("topic");
      if (this.topicById.has(topicId)) this.currentTopicId = topicId;
      const sessionRaw = params.get("session");
      const sessionId = this.sessionById.has(sessionRaw) ? sessionRaw : this.aliasToStable.get(sessionRaw);
      if (sessionId) {
        this.currentSessionId = sessionId;
        this.currentTopicId = this.sessionById.get(sessionId).topic_id;
        this.currentView = "session";
      }
      const tab = params.get("tab");
      if (TOPIC_TABS.has(tab)) this.currentTab = tab;
      if (this.currentView === "topic" && !this.currentTopicId) this.currentView = "curriculum";
    }

    showView(view, { history = "push" } = {}) {
      if (!VIEWS.has(view)) return;
      this.currentView = view;
      for (const [name, panel] of this.views) panel.hidden = name !== view;
      for (const button of this.root.querySelectorAll(".primary-nav [data-view]")) {
        button.setAttribute("aria-pressed", String(button.dataset.view === view));
      }
      if (view === "home") this.renderHome();
      if (view === "curriculum") this.renderCurriculum();
      if (view === "library") this.renderLibrary();
      if (view === "workspace") this.renderWorkspace();
      if (view === "reference") this.renderReference();
      if (view === "topic") this.renderTopic();
      if (view === "session") this.renderSession();
      this.state.lastRoute = { view, topicId: this.currentTopicId, sessionId: this.currentSessionId };
      this.scheduleSave();
      const url = this.routeURL(view);
      if (history === "replace") window.history.replaceState({}, "", url);
      else if (history !== "none") window.history.pushState({}, "", url);
      this.root.querySelector(".primary-nav").classList.remove("open");
      this.root.querySelector("[data-mobile-nav]").setAttribute("aria-expanded", "false");
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    renderAll() {
      this.renderHome();
      this.renderCurriculum();
      this.renderLibrary();
      this.renderWorkspace();
      this.renderReference();
      if (this.currentTopicId) this.renderTopic();
      if (this.currentSessionId) this.renderSession();
    }

    renderHome() {
      const stats = this.data.statistics;
      this.root.querySelector("[data-stat-strip]").innerHTML = [
        [stats.topics, "connected topics"], [stats.sessions, "learning sessions"],
        [stats.papers, "primary papers"], [stats.resources + stats.frontier_items, "resources + frontier"],
      ].map(([number, label]) => `<article><strong>${number}</strong><span>${label}</span></article>`).join("");
      const next = this.nextSession();
      const action = this.root.querySelector("[data-next-action]");
      if (next) {
        const topic = this.topicById.get(next.session.topic_id);
        this.root.querySelector("[data-next-title]").textContent = `${next.session.display_id} · ${next.session.title}`;
        this.root.querySelector("[data-next-status]").textContent = this.statusOf(next.session.id) === "in_progress" ? "Resume" : "Ready";
        action.innerHTML = `<p>${escapeHTML(next.reason)}</p><div class="next-meta"><span>${escapeHTML(topic.area_short_label)}</span><span>${escapeHTML(next.session.classification)}</span><span>${escapeHTML(PROFILE[this.state.profile].label)}</span></div><button type="button" class="button primary" data-open-session="${next.session.id}">${this.statusOf(next.session.id) === "in_progress" ? "Resume session" : "Open session"}</button>`;
      } else {
        this.root.querySelector("[data-next-title]").textContent = "Required Core complete";
        this.root.querySelector("[data-next-status]").textContent = "Review";
        action.innerHTML = `<p>Your active route has no unfinished ready Required Core session. Validate competence, activate continuation work, or choose another target.</p><button type="button" class="button secondary" data-view="workspace">Review workspace</button>`;
      }

      const activeSession = this.data.sessions.find((session) => this.statusOf(session.id) === "in_progress");
      const completed = this.data.sessions.filter((session) => this.isDone(session.id));
      const latest = activeSession || completed.at(-1);
      this.root.querySelector("[data-resume-card]").innerHTML = latest
        ? `<p><strong>${escapeHTML(latest.display_id)}</strong> ${escapeHTML(latest.title)}</p><p class="muted">${activeSession ? "In progress" : "Most recently completed in curriculum order"}</p><button type="button" class="text-button" data-open-session="${latest.id}">Open session →</button>`
        : `<p>No progress recorded yet. Your first action will be saved automatically in this browser.</p>`;

      const route = this.routeTo();
      const preview = route.slice(0, this.state.targetTopicId ? 12 : 8);
      this.root.querySelector("[data-path-heading]").textContent = this.state.targetTopicId
        ? `Shortest sensible route to ${this.state.targetTopicId}` : "Your curriculum journey";
      this.root.querySelector("[data-path-preview]").innerHTML = `<div class="path-line">${preview.map((topic, index) => {
        const metrics = this.topicMetrics(topic.id);
        const stateClass = metrics.coreComplete ? "done" : this.isTopicReady(topic.id) ? "ready" : "locked";
        return `<button type="button" class="path-node ${stateClass}" data-open-topic="${topic.id}"><span>${index + 1}</span><strong>${topic.id}</strong><small>${metrics.coreDone}/${metrics.coreTotal} core</small></button>`;
      }).join("<i aria-hidden=\"true\">→</i>")}</div>${route.length > preview.length ? `<p class="muted">+ ${route.length - preview.length} later topics</p>` : ""}`;
      this.root.querySelector("[data-provenance-strip]").innerHTML = `<div><p class="eyebrow">Transparent provenance</p><strong>Curriculum ${escapeHTML(this.data.curriculum_version)}</strong></div><span>Literature cutoff ${escapeHTML(this.data.provenance.literature_cutoff)}</span><span>Source revision <code>${this.data.source_revision.slice(0, 12)}</code></span><button type="button" class="text-button" data-view="reference">Inspect sources →</button>`;
    }

    renderCurriculum() {
      this.syncControls();
      for (const button of this.root.querySelectorAll("[data-curriculum-mode]")) button.setAttribute("aria-pressed", String(button.dataset.curriculumMode === this.curriculumMode));
      for (const panel of this.root.querySelectorAll("[data-curriculum-panel]")) panel.hidden = panel.dataset.curriculumPanel !== this.curriculumMode;
      const route = this.routeTo();
      const visible = route.filter((topic) => (!this.areaFilter || topic.area_id === this.areaFilter)
        && (!this.readyFilter || this.isTopicReady(topic.id)));
      const routeIds = route.map((topic) => topic.id);
      const violations = this.orderViolations(routeIds);
      this.root.querySelector("[data-completion-key]").innerHTML = `
        <article><strong>Required Core</strong><span>Blocking competence boundary</span></article>
        <article><strong>Continuation</strong><span>Frontier work after core</span></article>
        <article><strong>Full activated path</strong><span>Core + continuations you activate</span></article>
        <article><strong>Validated competence</strong><span>Evidence reviewed, not merely read</span></article>
        <article><strong>Sprint coverage</strong><span>Profile-scoped progress only</span></article>`;
      this.root.querySelector("[data-learning-path]").innerHTML = `${violations.length ? `<div class="warning"><strong>Custom-order warning:</strong> ${plural(violations.length, "hard prerequisite")} appear after their dependent. This route requires explicit override in Workspace.</div>` : ""}<ol class="route-list">${visible.map((topic) => this.topicRouteCard(topic)).join("")}</ol>`;
      this.root.querySelector("[data-topic-catalog]").innerHTML = visible.map((topic) => this.topicCatalogCard(topic)).join("");
      if (this.curriculumMode === "map") this.renderMap();
    }

    topicRouteCard(topic) {
      const metrics = this.topicMetrics(topic.id);
      const readiness = this.isTopicReady(topic.id);
      const nextId = topic.completion_model.required_core_session_ids.find((id) => !this.isDone(id));
      const background = topic.recommended_background.length ? `Recommended just in time: ${topic.recommended_background.join(", ")}.` : "No additional recommended background.";
      return `<li class="route-card ${metrics.coreComplete ? "complete" : readiness ? "ready" : "locked"}">
        <div class="route-index">${topic.rank + 1}</div>
        <div class="route-copy"><div class="card-kicker"><span>${topic.id}</span><span>${escapeHTML(topic.area_short_label)}</span><span>${readiness ? "Ready" : "Waiting on core"}</span></div><h3>${escapeHTML(topic.title)}</h3><p>${escapeHTML(compact(topic.target_competence, 240))}</p><p class="relationship-note"><strong>Why here:</strong> ${topic.hard_prerequisites.length ? `requires ${topic.hard_prerequisites.join(", ")}.` : "entry foundation."} ${escapeHTML(background)}</p></div>
        <div class="route-progress"><strong>${metrics.coreDone}/${metrics.coreTotal}</strong><span>Required Core</span><progress max="${metrics.coreTotal || 1}" value="${metrics.coreDone}"></progress>${nextId ? `<button type="button" class="text-button" data-open-session="${nextId}">Next session →</button>` : `<button type="button" class="text-button" data-open-topic="${topic.id}">Review topic →</button>`}</div>
      </li>`;
    }

    topicCatalogCard(topic) {
      const metrics = this.topicMetrics(topic.id);
      return `<article class="catalog-card" style="--area:${AREA_COLORS[topic.area_id]}"><div class="card-kicker"><span>${topic.id}</span><span>${escapeHTML(topic.status)}</span></div><h3>${escapeHTML(topic.title)}</h3><p>${escapeHTML(compact(topic.covers, 180))}</p><div class="catalog-meta"><span>${metrics.coreDone}/${metrics.coreTotal} core</span><span>${topic.papers.length} papers</span><span>${this.isTopicReady(topic.id) ? "Ready" : "Prerequisites open"}</span></div><button type="button" class="button secondary" data-open-topic="${topic.id}">Open topic</button></article>`;
    }

    async renderMap() {
      const container = this.root.querySelector("[data-curriculum-map]");
      if (this.cy) { this.applyMapScope(); setTimeout(() => this.cy.resize().fit(undefined, 35), 0); return; }
      const cytoscape = await loadCytoscape(this.root.dataset.graphUrl);
      const elements = [
        ...this.data.topics.map((topic) => ({ data: { id: topic.id, label: topic.id, title: topic.title, area: topic.area_id }, position: topic.positions.map })),
        ...this.data.relationships.map((edge) => ({ data: { id: edge.id, source: edge.source, target: edge.target, kind: edge.type, scope: edge.scope }, classes: edge.type })),
      ];
      this.cy = cytoscape({
        container, elements, layout: { name: "preset", fit: true, padding: 30 }, wheelSensitivity: 0.2,
        style: [
          { selector: "node", style: { label: "data(label)", width: 42, height: 42, "font-size": 11, "font-weight": 700, color: "#fff", "text-valign": "center", "background-color": "#536273", "border-width": 2, "border-color": "#fff" } },
          ...Object.entries(AREA_COLORS).map(([area, color]) => ({ selector: `node[area = '${area}']`, style: { "background-color": color } })),
          { selector: "edge", style: { width: 1.3, "line-color": "#96a0ad", "target-arrow-color": "#96a0ad", "target-arrow-shape": "triangle", "curve-style": "bezier", opacity: 0.62 } },
          { selector: "edge.recommended_background", style: { "line-style": "dashed", opacity: 0.42, "target-arrow-shape": "triangle-tee" } },
          { selector: "edge.feedback", style: { "line-style": "dotted", "line-color": "#b83f5a", "target-arrow-color": "#b83f5a", opacity: 0.9 } },
        ],
      });
      this.cy.on("tap", "node", (event) => this.openTopic(event.target.id()));
      this.applyMapScope();
    }

    applyMapScope() {
      if (!this.cy) return;
      this.cy.edges().forEach((edge) => {
        const kind = edge.data("kind");
        const visible = this.mapScope === "all"
          || (this.mapScope === "hard" && kind === "hard_prerequisite")
          || (this.mapScope === "overview" && (edge.data("scope") === "topic_entry" || ["related", "feedback"].includes(kind)));
        edge.style("display", visible ? "element" : "none");
      });
      const visible = this.cy.edges().filter((edge) => edge.visible()).length;
      this.root.querySelector("[data-map-count]").textContent = `${visible} of ${this.data.relationships.length} relationships shown.`;
    }

    renderLibrary() {
      for (const button of this.root.querySelectorAll("[data-library-kind]")) button.setAttribute("aria-pressed", String(button.dataset.libraryKind === this.libraryKind));
      const query = normalize(this.root.querySelector("[data-library-search]").value);
      const topicId = this.root.querySelector("[data-library-topic]").value;
      let records;
      if (this.libraryKind === "papers") records = this.data.papers;
      else if (this.libraryKind === "resources") records = this.data.resources;
      else records = this.data.frontier_items;
      records = records.filter((record) => {
        const topics = record.topic_ids || [record.topic_id];
        const text = normalize(Object.values(record).filter((value) => typeof value === "string").join(" "));
        return (!query || text.includes(query)) && (!topicId || topics.includes(topicId));
      });
      this.libraryContent.innerHTML = records.length ? records.map((record) => this.libraryCard(record)).join("") : `<div class="empty-state"><h3>No matching records</h3><p>Try a broader term or remove the topic filter.</p></div>`;
    }

    libraryCard(record) {
      const disabled = this.state.disabledIds.includes(record.id);
      const toggle = `<button type="button" class="text-button" data-toggle-disabled="${record.id}">${disabled ? "Re-enable in my workspace" : "Disable in my workspace"}</button>`;
      if (this.libraryKind === "papers") return `<article class="library-card ${disabled ? "disabled" : ""}" data-entity-id="${record.id}"><div class="card-kicker"><span>${record.id}</span><span>${record.topic_id}</span><span>${escapeHTML(record.metadata_confidence)}</span>${disabled ? '<span class="origin-badge personal">Disabled personally</span>' : ""}</div><h3><a href="${escapeHTML(record.url)}" target="_blank" rel="noopener">${escapeHTML(record.title)}</a></h3><p class="citation">${escapeHTML([record.authors, record.year, record.venue].filter(Boolean).join(" · "))}</p><p>${escapeHTML(record.contribution)}</p><details><summary>Positioning and evidence</summary><dl><dt>Role / preparation</dt><dd>${escapeHTML(record.role_level_preparation)}</dd><dt>Lineage</dt><dd>${escapeHTML(record.lineage)}</dd><dt>Limitation</dt><dd>${escapeHTML(record.limitation)}</dd><dt>Quality signals</dt><dd>${escapeHTML(record.quality_influence_signals)}</dd><dt>Authoritative version</dt><dd>${escapeHTML(record.authoritative_version)}</dd><dt>Project / code</dt><dd>${escapeHTML(record.official_project_or_code)}</dd></dl></details><div class="library-actions"><button type="button" class="text-button" data-open-topic="${record.topic_id}" data-topic-tab-target="papers">See in topic →</button>${toggle}</div></article>`;
      if (this.libraryKind === "resources") return `<article class="library-card ${disabled ? "disabled" : ""}" data-entity-id="${record.id}"><div class="card-kicker"><span>${record.id}</span><span>${escapeHTML(record.type)}</span><span>${escapeHTML(record.confidence)}</span>${disabled ? '<span class="origin-badge personal">Disabled personally</span>' : ""}</div><h3><a href="${escapeHTML(record.url)}" target="_blank" rel="noopener">${escapeHTML(record.title)}</a></h3><p>${escapeHTML(record.required_use)}</p><p class="muted">Supports ${escapeHTML(record.topic_ids.join(", "))} · ${escapeHTML(record.status)}</p>${toggle}</article>`;
      return `<article class="library-card frontier-card ${disabled ? "disabled" : ""}" data-entity-id="${record.id}"><div class="card-kicker"><span>${record.id}</span><span>${escapeHTML(record.decision)}</span><span>Review ${escapeHTML(record.review_date)}</span>${disabled ? '<span class="origin-badge personal">Disabled personally</span>' : ""}</div><h3><a href="${escapeHTML(record.url)}" target="_blank" rel="noopener">${escapeHTML(record.title)}</a></h3><p>${escapeHTML(record.reason)}</p><details><summary>Maturity and lifecycle</summary><p>${escapeHTML(record.maturity)}</p><p><strong>Latest checked evidence:</strong> ${escapeHTML(record.latest_evidence)}</p><p class="muted">Added ${escapeHTML(record.date_added)} · checked ${escapeHTML(record.last_checked)} · topics ${escapeHTML(record.topic_ids.join(", "))}</p></details>${toggle}</article>`;
    }

    openTopic(topicId, tab = "summary") {
      if (!this.topicById.has(topicId)) return;
      this.currentTopicId = topicId;
      this.currentTab = TOPIC_TABS.has(tab) ? tab : "summary";
      this.showView("topic");
    }

    openSession(rawId) {
      const id = this.sessionById.has(rawId) ? rawId : this.aliasToStable.get(rawId);
      if (!id) return;
      this.currentSessionId = id;
      this.currentTopicId = this.sessionById.get(id).topic_id;
      this.showView("session");
    }

    renderTopic() {
      const topic = this.topicById.get(this.currentTopicId);
      if (!topic) return;
      const metrics = this.topicMetrics(topic.id);
      this.root.querySelector("[data-topic-crumb]").textContent = topic.id;
      this.topicHeader.innerHTML = `<div><div class="card-kicker"><span>${topic.id}</span><span>${escapeHTML(topic.area_short_label)}</span><span>${escapeHTML(topic.status)}</span><span class="origin-badge canonical">Canonical</span></div><h2 id="topic-title">${escapeHTML(topic.title)}</h2><p>${escapeHTML(topic.curriculum_role)}</p></div><div class="topic-progress"><strong>${metrics.coreDone}/${metrics.coreTotal}</strong><span>Required Core</span><progress max="${metrics.coreTotal || 1}" value="${metrics.coreDone}"></progress><button type="button" class="button secondary" data-toggle-disabled="${topic.id}">${this.state.disabledIds.includes(topic.id) ? "Re-enable in route" : "Disable from personal route"}</button></div>`;
      for (const button of this.root.querySelectorAll("[data-topic-tab]")) button.setAttribute("aria-pressed", String(button.dataset.topicTab === this.currentTab));
      this.topicContent.innerHTML = this.renderTopicTab(topic, metrics);
      if (this.currentTab === "notes") this.bindAutosaveTextareas();
    }

    renderTopicTab(topic, metrics) {
      const sessions = this.sessionsByTopic.get(topic.id);
      if (this.currentTab === "summary") return `<div class="topic-summary-grid">
        <section class="panel"><p class="eyebrow">Scope</p><h3>What this topic covers</h3><p>${escapeHTML(topic.covers)}</p><h4>Intentionally excludes</h4><p>${escapeHTML(topic.excludes)}</p></section>
        <section class="panel"><p class="eyebrow">Competence target</p><h3>What you should be able to do</h3><p>${escapeHTML(topic.target_competence)}</p><h4>Required Core boundary</h4><p>${escapeHTML(topic.completion_boundary)}</p></section>
        <section class="panel completion-panel"><p class="eyebrow">Five distinct completion states</p>${this.completionBreakdown(topic, metrics)}</section>
        <section class="panel"><p class="eyebrow">Readiness</p><h3>${this.isTopicReady(topic.id) ? "Ready to begin" : "Blocking foundations remain"}</h3><p><strong>Hard prerequisites:</strong> ${topic.hard_prerequisites.join(", ") || "None"}</p><p><strong>Recommended background:</strong> ${topic.recommended_background.join(", ") || "None"}</p><button type="button" class="text-button" data-topic-tab-jump="connections">Why these relationships? →</button></section>
      </div>`;
      if (this.currentTab === "path") return `<section class="panel"><header><div><p class="eyebrow">Within-topic route</p><h3>From foundation to competence</h3></div><span>${escapeHTML(PROFILE[this.state.profile].label)} profile</span></header><ol class="session-path">${sessions.map((session) => `<li class="${this.isDone(session.id) ? "done" : this.statusOf(session.id)}"><button type="button" data-open-session="${session.id}"><span>${session.sequence}</span><div><strong>${escapeHTML(session.title)}</strong><small>${escapeHTML(session.classification)} · ${escapeHTML(STATUS_LABELS[this.statusOf(session.id)])}</small></div></button></li>`).join("")}</ol></section>`;
      if (this.currentTab === "sessions") {
        const groups = [
          ["Required Core", "Required for topic completion", sessions.filter((session) => session.classification === "Required Core")],
          ["Frontier Continuation", "Builds beyond the core boundary", sessions.filter((session) => session.classification === "Frontier Continuation")],
          ["Optional Specialization", "Activated only when relevant", sessions.filter((session) => session.classification === "Optional Specialization")],
          ["Quarantined", "Preserved for identity resolution; never counts for curriculum credit", sessions.filter((session) => session.classification === "Quarantined")],
        ];
        return groups.filter(([, , records]) => records.length).map(([label, description, records]) => `<section class="session-group"><header><div><h3>${label}</h3><p>${description}</p></div><span>${records.filter((session) => this.isDone(session.id)).length}/${records.length}</span></header>${records.map((session) => this.sessionRow(session)).join("")}</section>`).join("");
      }
      if (this.currentTab === "papers") return `<div class="library-grid">${topic.papers.map((id) => {
        const paper = this.paperById.get(id);
        return `<article class="library-card" data-entity-id="${id}"><div class="card-kicker"><span>${id}</span><span>${escapeHTML(paper.year)}</span><span>${escapeHTML(paper.metadata_confidence)}</span></div><h3><a href="${escapeHTML(paper.url)}" target="_blank" rel="noopener">${escapeHTML(paper.title)}</a></h3><p>${escapeHTML(paper.contribution)}</p><details><summary>Evidence, lineage, and limitation</summary><p><strong>Lineage:</strong> ${escapeHTML(paper.lineage)}</p><p><strong>Limitation:</strong> ${escapeHTML(paper.limitation)}</p><p><strong>Source:</strong> ${escapeHTML(paper.authoritative_version)}</p></details></article>`;
      }).join("")}</div>`;
      if (this.currentTab === "resources") return `<div class="library-grid">${topic.resources.map((id) => {
        const resource = this.resourceById.get(id);
        return resource ? `<article class="library-card" data-entity-id="${id}"><div class="card-kicker"><span>${id}</span><span>${escapeHTML(resource.type)}</span><span>${escapeHTML(resource.confidence)}</span></div><h3><a href="${escapeHTML(resource.url)}" target="_blank" rel="noopener">${escapeHTML(resource.title)}</a></h3><p>${escapeHTML(resource.required_use)}</p></article>` : "";
      }).join("")}</div>`;
      if (this.currentTab === "connections") {
        const incoming = topic.relationships.incoming.map((id) => this.relationshipById.get(id));
        const outgoing = topic.relationships.outgoing.map((id) => this.relationshipById.get(id));
        return `<div class="connection-grid"><section class="panel"><p class="eyebrow">Incoming</p><h3>What informs ${topic.id}</h3>${incoming.length ? incoming.map((edge) => this.relationshipCard(edge, "incoming")).join("") : "<p>No incoming topic relationship.</p>"}</section><section class="panel"><p class="eyebrow">Outgoing</p><h3>What ${topic.id} informs</h3>${outgoing.length ? outgoing.map((edge) => this.relationshipCard(edge, "outgoing")).join("") : "<p>No outgoing topic relationship.</p>"}</section></div>`;
      }
      if (this.currentTab === "notes") return `<section class="panel notes-panel"><div class="origin-banner"><span class="origin-badge personal">Personal note</span><span>Stored only in your private workspace overlay.</span></div><label for="topic-note">Topic notes</label><textarea id="topic-note" rows="14" data-note-id="${topic.id}" placeholder="Questions, syntheses, links, and research directions…">${escapeHTML(this.state.notes[topic.id] || "")}</textarea><small>Saved automatically in IndexedDB.</small></section>`;
      return `<div class="reference-grid"><section class="panel"><p class="eyebrow">Canonical source</p><h3>Current curriculum record</h3><dl class="metadata-list"><dt>Source file</dt><dd><a href="${topic.url}">${escapeHTML(topic.source_path)}</a></dd><dt>Stable topic ID</dt><dd><code>${topic.id}</code></dd><dt>Stable session IDs</dt><dd>${sessions.length} UUID-based records; legacy aliases retained</dd><dt>Curriculum version</dt><dd>${escapeHTML(this.data.curriculum_version)}</dd><dt>Source revision</dt><dd><code>${this.data.source_revision}</code></dd></dl></section><section class="panel"><p class="eyebrow">Revision metadata</p><h3>Recorded changes</h3>${topic.revision_history ? `<dl class="metadata-list">${Object.entries(topic.revision_history).map(([key, value]) => `<dt>${escapeHTML(key)}</dt><dd>${escapeHTML(value)}</dd>`).join("")}</dl>` : `<p>The canonical topic plan contains the detailed revision record. Open the source file to inspect it.</p>`}</section></div>`;
    }

    completionBreakdown(topic, metrics) {
      const corePercent = metrics.coreTotal ? Math.round(metrics.coreDone / metrics.coreTotal * 100) : 0;
      const activatedPercent = metrics.activatedTotal ? Math.round(metrics.activatedDone / metrics.activatedTotal * 100) : 0;
      return `<dl class="completion-list"><div><dt>Required Core complete</dt><dd>${metrics.coreComplete ? "Yes" : `${corePercent}%`}</dd></div><div><dt>Continuation complete</dt><dd>${metrics.continuationTotal ? `${metrics.continuationDone}/${metrics.continuationTotal}` : "Not defined"}</dd></div><div><dt>Full activated path</dt><dd>${activatedPercent}%</dd></div><div><dt>Validated competence</dt><dd>${metrics.validated ? "Yes" : "Evidence review pending"}</dd></div><div><dt>AI Sprint coverage</dt><dd>${metrics.sprintDone}/${metrics.coreTotal} core sessions</dd></div></dl>`;
    }

    relationshipCard(edge, direction) {
      const other = direction === "incoming" ? edge.source : edge.target;
      const label = edge.type.replaceAll("_", " ");
      const scope = edge.scope === "topic_entry"
        ? "Blocks topic entry"
        : edge.scope === "target_sessions"
          ? `Applies to ${edge.target_session_ids.map((id) => this.sessionById.get(id)?.display_id || id).join(", ")}`
          : "Topic-wide context";
      const consequence = edge.type === "hard_prerequisite"
        ? scope
        : edge.type === "recommended_background"
          ? `${scope}; useful just in time, not blocking`
          : `${scope}; non-blocking curriculum connection`;
      return `<article class="relationship-card ${edge.type}"><div><span class="relationship-type">${escapeHTML(label)}</span><button type="button" data-open-topic="${other}">${other} — ${escapeHTML(this.topicById.get(other).short_title)}</button></div><p>${escapeHTML(edge.rationale)}</p><small>${escapeHTML(consequence)} · ${escapeHTML(edge.confidence.replaceAll("_", " "))} confidence</small></article>`;
    }

    sessionRow(session) {
      const disabled = this.state.disabledIds.includes(session.id);
      const activationAvailable = ["Frontier Continuation", "Optional Specialization"].includes(session.classification);
      const quarantined = session.classification === "Quarantined";
      const activated = this.state.activatedSessionIds.includes(session.id);
      return `<article class="session-row ${disabled ? "disabled" : ""}" data-entity-id="${session.id}"><button type="button" class="session-number" data-open-session="${session.id}">${session.sequence}</button><div><div class="card-kicker"><span>${escapeHTML(session.display_id)}</span><span>${escapeHTML(session.stage)}</span>${disabled ? '<span class="origin-badge personal">Disabled personally</span>' : ""}${activationAvailable ? `<span class="origin-badge personal">${activated ? "Activated in my path" : "Available continuation"}</span>` : ""}${quarantined ? '<span class="origin-badge personal">Quarantined · no credit</span>' : ""}</div><h4><button type="button" data-open-session="${session.id}">${escapeHTML(session.title)}</button></h4><p>${escapeHTML(compact(session.objective, 220))}</p></div><div class="session-row-actions"><label>${quarantined ? "Review status" : "Status"}<select data-session-status="${session.id}">${Object.entries(STATUS_LABELS).map(([value, label]) => `<option value="${value}" ${this.statusOf(session.id) === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>${activationAvailable ? `<button type="button" class="text-button" data-toggle-activation="${session.id}">${activated ? "Remove from my path" : "Activate in my path"}</button>` : ""}</div></article>`;
    }

    renderSession() {
      const session = this.sessionById.get(this.currentSessionId);
      if (!session) return;
      const topic = this.topicById.get(session.topic_id);
      this.root.querySelector("[data-session-topic-link]").textContent = `${topic.id} ${topic.short_title}`;
      this.root.querySelector("[data-session-topic-link]").dataset.openTopic = topic.id;
      this.root.querySelector("[data-session-crumb]").textContent = session.display_id;
      const currentStatus = this.statusOf(session.id);
      this.sessionHeader.innerHTML = `<div><div class="card-kicker"><span>${escapeHTML(session.display_id)}</span><span>${escapeHTML(session.classification)}</span><span class="origin-badge canonical">Canonical</span></div><h2 id="session-title">${escapeHTML(session.title)}</h2><p>${escapeHTML(session.stage)}</p></div><label class="session-status-control">Learning status<select data-session-status="${session.id}">${Object.entries(STATUS_LABELS).map(([value, label]) => `<option value="${value}" ${currentStatus === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>`;
      const papers = session.papers.map((id) => this.paperById.get(id)).filter(Boolean);
      const resources = session.resources.map((id) => this.resourceById.get(id)).filter(Boolean);
      const frontier = session.frontier_items.map((id) => this.frontierById.get(id)).filter(Boolean);
      const localPrerequisites = session.readiness.prior_session_ids.map((id) => {
        const prior = this.sessionById.get(id);
        const status = this.isDone(id) ? "completed" : this.state.sprintCovered.includes(id) ? "Sprint-covered only" : STATUS_LABELS[this.statusOf(id)];
        return `<li><button type="button" class="text-button" data-open-session="${id}">${prior.display_id} — ${escapeHTML(prior.title)}</button> · <strong>${escapeHTML(status)}</strong></li>`;
      });
      const relationshipGates = session.relationship_gates.map((id) => {
        const edge = this.relationshipById.get(id);
        const complete = edge && this.topicMetrics(edge.source).coreComplete;
        return edge ? `<li><button type="button" class="text-button" data-open-topic="${edge.source}">${edge.source} — ${escapeHTML(this.topicById.get(edge.source).short_title)}</button> · <strong>${complete ? "core completed or competence validated" : "missing"}</strong><p>${escapeHTML(edge.rationale)}</p></li>` : "";
      });
      const recommended = session.recommended_relationships.map((id) => {
        const edge = this.relationshipById.get(id);
        return edge ? `<li><button type="button" class="text-button" data-open-topic="${edge.source}">${edge.source} — ${escapeHTML(this.topicById.get(edge.source).short_title)}</button><p>${escapeHTML(edge.rationale)}</p></li>` : "";
      });
      const readinessItems = [...localPrerequisites, ...relationshipGates].filter(Boolean);
      const readinessState = this.isSessionReady(session) ? "Ready" : "Blocked by missing hard prerequisites";
      const activationAvailable = ["Frontier Continuation", "Optional Specialization"].includes(session.classification);
      const quarantined = session.classification === "Quarantined";
      const activated = this.state.activatedSessionIds.includes(session.id);
      const disabled = this.state.disabledIds.includes(session.id);
      this.sessionContent.innerHTML = `
        <section class="session-section"><p class="eyebrow">Why this session now</p><h3>${escapeHTML(session.objective)}</h3><p>${escapeHTML(topic.curriculum_role)}</p></section>
        <section class="session-section"><p class="eyebrow">Readiness</p><h3>${escapeHTML(readinessState)}</h3><p>${escapeHTML(session.readiness.raw)}</p>${readinessItems.length ? `<h4>Hard prerequisites</h4><ul class="readiness-list">${readinessItems.join("")}</ul>` : `<p class="success-note">No unresolved hard prerequisite is encoded for this session.</p>`}${recommended.length ? `<h4>Recommended background</h4><ul class="readiness-list recommended">${recommended.join("")}</ul>` : ""}</section>
        <section class="session-section"><p class="eyebrow">Authoritative sources</p><h3>Read and inspect</h3>${this.sourceCards(papers, resources, frontier)}</section>
        <section class="session-section"><p class="eyebrow">${escapeHTML(PROFILE[this.state.profile].label)} profile</p><h3>How to work this session</h3>${this.profileInstructions(session, papers)}</section>
        <section class="session-section"><p class="eyebrow">Planned work</p><h3>Produce evidence, not only familiarity</h3><p>${escapeHTML(session.planned_component)}</p><div class="evidence-box"><strong>Expected competence / artifact</strong><p>${escapeHTML(session.completion)}</p></div></section>
        <section class="session-section"><p class="eyebrow">AI prompt set</p><h3>Use AI without surrendering source judgment</h3><p>These prompts are generated from this session’s objective, sources, and evidence boundary. Verify every substantive claim against the linked source.</p><div class="prompt-grid">${this.aiPrompts(session, papers).map((item, index) => `<article><strong>${escapeHTML(item.label)}</strong><p>${escapeHTML(item.prompt)}</p><button type="button" class="text-button" data-copy-prompt="${index}">Copy prompt</button></article>`).join("")}</div></section>
        <section class="session-section notes-panel"><div class="origin-banner"><span class="origin-badge personal">Personal note</span><span>Private workspace overlay</span></div><label for="session-note">Session notes</label><textarea id="session-note" rows="12" data-note-id="${session.id}" placeholder="Reconstruction, open questions, evidence, failure modes…">${escapeHTML(this.state.notes[session.id] || "")}</textarea><small>Saved automatically in IndexedDB.</small></section>`;
      this.currentPrompts = this.aiPrompts(session, papers);
      let nextSessionId = session.next_session_id;
      if (!quarantined && this.sessionById.get(nextSessionId)?.classification === "Quarantined") nextSessionId = this.sessionById.get(nextSessionId)?.next_session_id;
      const pathHeading = quarantined ? "Quarantined identity" : disabled ? "Disabled personally" : activationAvailable ? activated ? "Activated" : "Available, not activated" : "Canonical core";
      const pathExplanation = quarantined ? "This stable placeholder is excluded from Required Core, continuations, activated paths, and Sprint credit until its source identity is resolved." : disabled ? "The canonical session remains accessible and your existing state is preserved." : activationAvailable ? activated ? "This continuation counts toward Full activated path." : "Optional and frontier work does not count until you activate it." : "Required Core is always part of the canonical completion boundary.";
      this.sessionSide.innerHTML = `<section class="panel"><p class="eyebrow">Session identity</p><dl class="metadata-list"><dt>Stable ID</dt><dd><code>${session.id}</code></dd><dt>Legacy alias</dt><dd>${escapeHTML(session.legacy_aliases.join(", "))}</dd><dt>Profile</dt><dd>${escapeHTML(PROFILE[this.state.profile].label)}</dd><dt>Source revision</dt><dd><code>${this.data.source_revision.slice(0, 12)}</code></dd></dl></section><section class="panel"><p class="eyebrow">Personal path</p><h3>${pathHeading}</h3><p>${pathExplanation}</p><div class="panel-actions"><button type="button" class="button secondary" data-toggle-disabled="${session.id}">${disabled ? "Re-enable in my path" : "Disable in my path"}</button>${activationAvailable ? `<button type="button" class="text-button" data-toggle-activation="${session.id}">${activated ? "Remove from activated path" : "Activate in my path"}</button>` : ""}</div></section><section class="panel"><p class="eyebrow">Orthogonal evidence</p>${quarantined ? '<p class="muted">Sprint and competence credit are unavailable for a quarantined identity.</p>' : `<label class="check-label"><input type="checkbox" data-sprint-covered="${session.id}" ${this.state.sprintCovered.includes(session.id) ? "checked" : ""}> AI Sprint covered</label><p class="muted">Sprint coverage does not complete Required Core. Topic competence is validated separately against evidence.</p><button type="button" class="button secondary" data-validate-topic="${topic.id}">${this.state.competenceValidated.includes(topic.id) ? "Review competence record" : "Record competence validation"}</button>`}</section><section class="panel"><p class="eyebrow">Private artifacts</p><p>Files stay in IndexedDB and are included in a Workspace Bundle only when you choose.</p><label class="button secondary attachment-button">Attach file<input type="file" data-attachment-input="${session.id}" hidden></label><div data-attachment-list>Loading…</div></section><section class="panel session-navigation"><p class="eyebrow">Continue</p>${nextSessionId ? `<button type="button" class="button secondary" data-open-session="${nextSessionId}">Next session →</button>` : `<button type="button" class="button secondary" data-open-topic="${topic.id}" data-topic-tab-target="sessions">Back to topic sessions</button>`}</section>`;
      this.bindAutosaveTextareas();
      this.renderAttachments(session.id);
    }

    sourceCards(papers, resources, frontier) {
      const records = [
        ...papers.map((item) => ({ ...item, kind: "Paper", detail: item.contribution })),
        ...resources.map((item) => ({ ...item, kind: "Resource", detail: item.required_use })),
        ...frontier.map((item) => ({ ...item, kind: "Frontier", detail: item.reason })),
      ];
      if (!records.length) return `<p>This is a synthesis or activity session. Reuse the sources from prior sessions and the topic resource set.</p>`;
      return `<div class="source-list">${records.map((item) => `<article><span>${item.kind} · ${item.id}</span><h4><a href="${escapeHTML(item.url)}" target="_blank" rel="noopener">${escapeHTML(item.title)}</a></h4><p>${escapeHTML(compact(item.detail, 220))}</p></article>`).join("")}</div>`;
    }

    profileInstructions(session, papers) {
      const sourceNames = papers.length ? papers.map((paper) => paper.id).join(", ") : "the topic’s prior primary sources";
      const instructions = {
        guided: [
          `Read ${sourceNames} from motivation through evidence; record unfamiliar notation and claims.`,
          `Reconstruct the mechanism in your own notation before consulting summaries.`,
          `Complete the planned work: ${session.planned_component}`,
          `Use the competence statement as a self-test, then mark validated only after evidence review.`,
        ],
        accelerated: [
          `Read the abstract, method, decisive experiments, and limitations in ${sourceNames}; expand only where your reconstruction fails.`,
          `Write the central assumption, mechanism, strongest evidence, and strongest unresolved limitation.`,
          `Preserve the required artifact even if orientation and repeated setup are compressed.`,
          `Do not treat speed as validation: competence still requires the stated evidence boundary.`,
        ],
        ai_sprint: [
          `Run the prompt set below to expose the method, assumptions, and likely failure modes.`,
          `Check every generated technical claim and citation directly against ${sourceNames}.`,
          `Ask the competence-test prompt without showing your notes, then correct the response from source evidence.`,
          `Produce ${session.artifact || "the planned evidence artifact"}; record uncertainty and any source disagreement.`,
        ],
      };
      return `<ol class="instruction-list">${instructions[this.state.profile].map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol>`;
    }

    aiPrompts(session, papers) {
      const sources = papers.length ? papers.map((paper) => `${paper.id}: ${paper.title}`).join("; ") : "the authoritative sources from preceding sessions";
      const limitation = papers.map((paper) => `${paper.id}: ${paper.limitation}`).join(" ") || "identify the strongest evidence limitation yourself";
      const guardrail = "Do not invent citations or findings. Separate source claims, your inference, and uncertainty. Ask me to verify against the original source.";
      return [
        { label: "Orient", prompt: `I am studying ${session.display_id}, “${session.title}”. Objective: ${session.objective} Sources: ${sources}. Build a compact prerequisite check and concept map. ${guardrail}` },
        { label: "Interrogate", prompt: `Act as a Socratic research mentor for ${session.title}. Ask one question at a time about assumptions, mechanism, evidence, and failure modes. Do not reveal the answer before I commit. ${guardrail}` },
        { label: "Reconstruct", prompt: `Help me reconstruct ${session.title} from first principles. Require equations, interfaces, or pseudocode where appropriate, then compare my reconstruction with these sources: ${sources}. ${guardrail}` },
        { label: "Critique", prompt: `Design an adversarial evidence review for ${session.title}. Start from these known positioning limits: ${limitation}. Distinguish what the evidence establishes, what it merely suggests, and the smallest falsifying experiment. ${guardrail}` },
        { label: "Competence test", prompt: `Test whether I can satisfy this boundary without using notes: ${session.completion}. Give me a rubric, wait for my response, identify gaps, and require source-backed corrections. ${guardrail}` },
        { label: "Synthesize", prompt: `Connect ${session.title} to its next research decision. Planned work: ${session.planned_component}. Help produce a concise artifact outline with claims, evidence, limitations, failure cases, and unresolved hypotheses. ${guardrail}` },
      ];
    }

    renderWorkspace() {
      const sessions = this.data.sessions;
      const counts = Object.keys(STATUS_LABELS).map((status) => [status, sessions.filter((session) => this.statusOf(session.id) === status).length]);
      this.root.querySelector("[data-storage-badge]").textContent = this.store.persistent ? "IndexedDB · persistent" : "Memory only · export before leaving";
      this.root.querySelector("[data-storage-badge]").classList.toggle("warning", !this.store.persistent);
      this.root.querySelector("[data-workspace-progress]").innerHTML = `<div class="status-stats">${counts.map(([status, count]) => `<article><strong>${count}</strong><span>${STATUS_LABELS[status]}</span></article>`).join("")}<article><strong>${this.state.sprintCovered.length}</strong><span>AI Sprint covered</span></article><article><strong>${this.state.competenceValidated.length}</strong><span>Topics validated</span></article></div><p class="muted">Completion, sprint coverage, and competence validation are separate personal records. Canonical records remain unchanged.</p>`;

      const canonical = this.state.targetTopicId
        ? (() => {
            const saved = this.state.customOrder;
            this.state.customOrder = [];
            const route = this.routeTo();
            this.state.customOrder = saved;
            return route;
          })()
        : this.data.topics.slice().sort((a, b) => a.rank - b.rank || a.id.localeCompare(b.id));
      const baseIds = canonical.map((topic) => topic.id);
      if (!this.state.customOrder.length || this.state.customOrder.some((id) => !baseIds.includes(id))) this.state.customOrder = baseIds.slice();
      const candidateIds = this.state.customOrder.filter((id) => baseIds.includes(id));
      for (const id of baseIds) if (!candidateIds.includes(id)) candidateIds.push(id);
      const violations = this.orderViolations(candidateIds);
      const unaccepted = violations.filter((edge) => !this.state.orderOverrides.includes(edge.id));
      this.root.querySelector("[data-custom-route]").innerHTML = `${unaccepted.length ? `<div class="warning"><strong>Not active yet:</strong> this custom order places ${plural(unaccepted.length, "hard prerequisite")} after a dependent. Review and explicitly accept the override before the planner uses it.<ul>${unaccepted.map((edge) => `<li>${edge.source} must ordinarily precede ${edge.target}</li>`).join("")}</ul><button type="button" class="button secondary" data-accept-order-overrides>Accept ${plural(unaccepted.length, "override")}</button></div>` : `<p class="success-note">${violations.length ? "All dependency-order overrides are explicit." : "Order respects every hard prerequisite."}</p>`}<ol class="custom-route-list">${candidateIds.map((id, index) => {
        const topic = this.topicById.get(id);
        const disabled = this.state.disabledIds.includes(id);
        return `<li class="${disabled ? "disabled" : ""}"><span>${index + 1}</span><strong>${id}</strong><span>${escapeHTML(topic.short_title)}</span><div><button type="button" title="Move up" data-route-move="up" data-route-id="${id}" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" title="Move down" data-route-move="down" data-route-id="${id}" ${index === candidateIds.length - 1 ? "disabled" : ""}>↓</button><button type="button" data-toggle-disabled="${id}">${disabled ? "Enable" : "Disable"}</button></div></li>`;
      }).join("")}</ol>`;

      this.renderPersonalItems();
      this.renderOrphans();
    }

    renderPersonalItems() {
      const container = this.root.querySelector("[data-personal-items]");
      if (!this.state.customItems.length) {
        container.innerHTML = `<div class="empty-state compact"><p>No personal additions yet. Add a session or source when the canonical route does not cover a personal need.</p></div>`;
        return;
      }
      container.innerHTML = `<div class="personal-item-list">${this.state.customItems.map((item, index) => `<article class="${item.disabled ? "disabled" : ""}"><div><div class="card-kicker"><span class="origin-badge personal">Personal ${escapeHTML(item.kind)}</span><span>${escapeHTML(item.topicId)}</span>${item.disabled ? "<span>Disabled</span>" : ""}</div><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.objective)}</p>${item.source ? `<p class="muted">${escapeHTML(item.source)}</p>` : ""}</div><div class="item-actions"><button type="button" data-personal-move="up" data-item-id="${escapeHTML(item.id)}" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-personal-move="down" data-item-id="${escapeHTML(item.id)}" ${index === this.state.customItems.length - 1 ? "disabled" : ""}>↓</button><button type="button" data-edit-personal="${escapeHTML(item.id)}">Edit</button><button type="button" data-toggle-personal="${escapeHTML(item.id)}">${item.disabled ? "Enable" : "Disable"}</button><button type="button" class="danger" data-delete-personal="${escapeHTML(item.id)}">Delete</button></div></article>`).join("")}</div>`;
    }

    renderOrphans() {
      const container = this.root.querySelector("[data-orphan-archive]");
      container.innerHTML = this.state.orphanArchive.length
        ? `<details class="orphan-panel"><summary>${plural(this.state.orphanArchive.length, "archived unknown entry")}</summary><p>These records were preserved because their IDs do not exist in the current curriculum revision.</p><pre>${escapeHTML(JSON.stringify(this.state.orphanArchive, null, 2))}</pre></details>`
        : "";
    }

    renderReference() {
      const p = this.data.provenance;
      this.root.querySelector("[data-provenance-detail]").innerHTML = `<dt>Curriculum version</dt><dd>${escapeHTML(this.data.curriculum_version)}</dd><dt>Source of truth</dt><dd>${escapeHTML(this.data.source_of_truth)}</dd><dt>Literature cutoff</dt><dd>${escapeHTML(p.literature_cutoff)}</dd><dt>Paper verification</dt><dd>${escapeHTML(p.paper_verification)}</dd><dt>Resource verification</dt><dd>${escapeHTML(p.resource_verification)}</dd><dt>Frontier verification</dt><dd>${escapeHTML(p.frontier_verification)}</dd><dt>Source revision</dt><dd><code>${this.data.source_revision}</code></dd>`;
      this.root.querySelector("[data-maintenance-detail]").innerHTML = `<p><strong>Last exhaustive audit:</strong> ${escapeHTML(p.last_exhaustive_audit || "Not recorded")}</p><p><strong>Last published maintenance review:</strong> ${escapeHTML(p.last_maintenance_scan || "No later review published")}</p><p><strong>Next frontier review:</strong> ${escapeHTML(p.next_frontier_review)}</p><p>The maintenance workflow records evidence, confidence, and a decision; it never silently changes curriculum truth. Link checks and frontier candidates become reviewable reports or proposals.</p><p><strong>State:</strong> <code>${escapeHTML(p.maintenance_state)}</code></p>`;
    }

    async renderAttachments(entityId) {
      const container = this.root.querySelector("[data-attachment-list]");
      if (!container) return;
      try {
        const records = await this.store.listAttachments(entityId);
        container.innerHTML = records.length ? `<ul class="attachment-list">${records.map((item) => `<li><button type="button" class="text-button" data-download-attachment="${escapeHTML(item.id)}">${escapeHTML(item.name)}</button><small>${Math.ceil(item.size / 1024)} KB</small><button type="button" class="danger" data-delete-attachment="${escapeHTML(item.id)}">Delete</button></li>`).join("")}</ul>` : `<p class="muted">No files attached.</p>`;
      } catch (error) {
        container.innerHTML = `<p class="warning">${escapeHTML(error.message)}</p>`;
      }
    }

    bindAutosaveTextareas() {
      for (const textarea of this.root.querySelectorAll("[data-note-id]")) {
        textarea.addEventListener("input", () => {
          this.state.notes[textarea.dataset.noteId] = textarea.value;
          this.scheduleSave();
        });
      }
    }

    async exportBundle() {
      const includeAttachments = this.root.querySelector("[data-include-attachments]").checked;
      const payload = {
        bundle_type: "golem_curriculum_workspace",
        schema_version: 2,
        application: "golem-robotics-paper-club",
        exported_at: new Date().toISOString(),
        curriculum: { version: this.data.curriculum_version, source_revision: this.data.source_revision },
        workspace: this.state,
        attachments: [],
      };
      if (includeAttachments) {
        const records = await this.store.listAttachments();
        const totalBytes = records.reduce((total, item) => total + item.size, 0);
        if (records.length > MAX_ATTACHMENTS || records.some((item) => item.size > MAX_ATTACHMENT_BYTES) || totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
          throw new Error("Attachments exceed the Workspace Bundle export limits (32 files, 8 MB each, 24 MB total).");
        }
        payload.attachments = await Promise.all(records.map(async (item) => ({
          id: item.id, entityId: item.entityId, name: item.name, type: item.type,
          size: item.size, addedAt: item.addedAt, data: await fileToDataURL(item.blob),
        })));
      }
      download(`golem-workspace-${payload.exported_at.slice(0, 10)}.json`, `${JSON.stringify(payload, null, 2)}\n`);
      this.bundleStatus.textContent = `Exported ${plural(Object.keys(this.state.entityStatus).length, "status")} and ${plural(payload.attachments.length, "attachment")}.`;
    }

    migrateEntityId(id) {
      if (this.knownEntityIds.has(id)) return id;
      return this.aliasToStable.get(id) || null;
    }

    async importBundle(file) {
      if (!file || file.size > MAX_BUNDLE_BYTES) throw new Error("Workspace Bundles are limited to 40 MB.");
      const parsed = JSON.parse(await file.text());
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("This is not a supported Golem Workspace Bundle.");
      let incoming;
      let attachments = [];
      if (parsed.schema_version === 1 && Array.isArray(parsed.completed_sessions)) {
        const legacyIds = validateBoundedArray(parsed.completed_sessions, "completed_sessions");
        incoming = window.GolemWorkspaceStore.blankState();
        incoming.entityStatus = Object.fromEntries(legacyIds.map((id) => [id, "completed"]));
      } else if (parsed.bundle_type === "golem_curriculum_workspace" && parsed.schema_version === 2 && parsed.workspace) {
        const raw = parsed.workspace;
        if (typeof raw !== "object" || Array.isArray(raw)) throw new Error("Workspace state is malformed.");
        if (raw.profile !== undefined && !Object.hasOwn(PROFILE, raw.profile)) throw new Error("Workspace profile is invalid.");
        if (raw.targetTopicId !== null && raw.targetTopicId !== undefined && typeof raw.targetTopicId !== "string") throw new Error("Workspace target is invalid.");
        const arrayKeys = ["competenceValidated", "sprintCovered", "activatedSessionIds", "disabledIds", "customOrder", "orderOverrides"];
        const checkedArrays = Object.fromEntries(arrayKeys.map((key) => [key, validateBoundedArray(raw[key], key)]));
        const entityStatus = raw.entityStatus ?? {};
        const notes = raw.notes ?? {};
        const competenceEvidence = raw.competenceEvidence ?? {};
        for (const [label, value] of [["entityStatus", entityStatus], ["notes", notes], ["competenceEvidence", competenceEvidence]]) {
          if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).length > 5000) throw new Error(`${label} is malformed or exceeds its import limit.`);
        }
        if (Object.entries(entityStatus).some(([id, status]) => id.length > 160 || !Object.hasOwn(STATUS_LABELS, status))) throw new Error("Workspace status records are malformed.");
        if (Object.entries(notes).some(([id, note]) => id.length > 160 || typeof note !== "string" || note.length > 200000)) throw new Error("Workspace note records are malformed or too large.");
        if (Object.entries(competenceEvidence).some(([id, record]) => id.length > 160 || !record || typeof record !== "object" || typeof record.evidence !== "string" || record.evidence.length > 200000)) throw new Error("Workspace competence evidence is malformed or too large.");
        const orphanArchive = raw.orphanArchive ?? [];
        if (!Array.isArray(orphanArchive) || orphanArchive.length > 500 || orphanArchive.some((item) => JSON.stringify(item).length > 10000)) throw new Error("Workspace orphan archive is malformed or too large.");
        const customItems = validateCustomItems(raw.customItems ?? [], this.topicById);
        incoming = window.GolemWorkspaceStore.normalizeState({
          ...raw,
          ...checkedArrays,
          entityStatus,
          notes,
          competenceEvidence,
          orphanArchive,
          customItems,
        });
        attachments = Array.isArray(parsed.attachments) ? parsed.attachments : [];
      } else {
        throw new Error("This is not a supported Golem Workspace Bundle.");
      }
      if (attachments.length > MAX_ATTACHMENTS) throw new Error(`A bundle may contain at most ${MAX_ATTACHMENTS} attachments.`);
      const decodedAttachments = [];
      let totalAttachmentBytes = 0;
      for (const [index, item] of attachments.entries()) {
        if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`Attachment ${index + 1} is malformed.`);
        const entityId = this.migrateEntityId(item.entityId);
        if (!entityId) throw new Error(`Attachment ${index + 1} references an unknown canonical entity.`);
        if (typeof item.name !== "string" || !item.name || item.name.length > 180 || /[\\/\u0000-\u001f]/.test(item.name)) throw new Error(`Attachment ${index + 1} has an invalid filename.`);
        if (item.type !== undefined && (typeof item.type !== "string" || item.type.length > 120)) throw new Error(`Attachment ${index + 1} has an invalid media type.`);
        if (!Number.isInteger(item.size) || item.size < 0 || item.size > MAX_ATTACHMENT_BYTES) throw new Error(`Attachment ${index + 1} has an invalid size.`);
        const blob = decodeAttachmentData(item.data, item.size, item.type);
        totalAttachmentBytes += blob.size;
        if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) throw new Error("Bundle attachments exceed the 24 MB total limit.");
        decodedAttachments.push({ entityId, name: item.name, type: blob.type, blob });
      }
      if (decodedAttachments.length && !this.store.persistent) throw new Error("Attachments require persistent browser storage.");
      const next = window.GolemWorkspaceStore.blankState();
      next.profile = incoming.profile;
      next.targetTopicId = this.topicById.has(incoming.targetTopicId) ? incoming.targetTopicId : null;
      next.customItems = incoming.customItems;
      next.customOrder = incoming.customOrder.filter((id) => this.topicById.has(id));
      next.orderOverrides = incoming.orderOverrides.filter((id) => this.relationshipById.has(id));
      next.competenceValidated = incoming.competenceValidated.filter((id) => this.topicById.has(id));
      next.competenceEvidence = Object.fromEntries(Object.entries(incoming.competenceEvidence).filter(([id]) => this.topicById.has(id)));
      next.sprintCovered = incoming.sprintCovered.map((id) => this.migrateEntityId(id)).filter(Boolean);
      next.activatedSessionIds = incoming.activatedSessionIds.map((id) => this.migrateEntityId(id)).filter((id) => id && ["Frontier Continuation", "Optional Specialization"].includes(this.sessionById.get(id)?.classification));
      next.orphanArchive = incoming.orphanArchive.slice();
      let migrated = 0;
      let archived = 0;
      for (const [rawId, status] of Object.entries(incoming.entityStatus)) {
        const id = this.migrateEntityId(rawId);
        if (id) { next.entityStatus[id] = status; migrated += rawId === id ? 0 : 1; }
        else { next.orphanArchive.push({ kind: "status", originalId: rawId, value: status, importedAt: new Date().toISOString() }); archived += 1; }
      }
      for (const [rawId, note] of Object.entries(incoming.notes)) {
        const id = this.migrateEntityId(rawId);
        if (id) next.notes[id] = note;
        else { next.orphanArchive.push({ kind: "note", originalId: rawId, value: note, importedAt: new Date().toISOString() }); archived += 1; }
      }
      for (const rawId of incoming.disabledIds) {
        const id = this.migrateEntityId(rawId);
        if (id) next.disabledIds.push(id);
        else { next.orphanArchive.push({ kind: "disabled", originalId: rawId, importedAt: new Date().toISOString() }); archived += 1; }
      }
      this.state = await this.store.save(next);
      let attachmentCount = 0;
      for (const item of decodedAttachments) {
        const importedFile = new File([item.blob], item.name, { type: item.type });
        await this.store.putAttachment(item.entityId, importedFile);
        attachmentCount += 1;
      }
      await this.saveState();
      this.renderAll();
      const revisionNote = parsed.curriculum?.source_revision && parsed.curriculum.source_revision !== this.data.source_revision
        ? " Source revision differed; IDs were migrated and unknown records archived." : "";
      this.bundleStatus.textContent = `Imported workspace: ${migrated} legacy IDs migrated, ${archived} unknown records archived, ${attachmentCount} attachments restored.${revisionNote}`;
    }

    exportProposal() {
      const context = this.root.querySelector("[data-proposal-context]").value.trim() || "No additional context supplied.";
      const items = this.state.customItems.filter((item) => !item.disabled);
      const lines = [
        "# Curriculum change proposal", "",
        `- Created: ${new Date().toISOString()}`,
        `- Curriculum version: ${this.data.curriculum_version}`,
        `- Source revision: \`${this.data.source_revision}\``,
        "- Publication path: review and apply through a pull request; this file contains no credentials.", "",
        "## Context", "", context, "", "## Proposed additions", "",
      ];
      if (!items.length) lines.push("No enabled personal additions were selected.");
      for (const item of items) lines.push(`### ${item.topicId} · ${item.title}`, "", `- Type: ${item.kind}`, `- Purpose: ${item.objective}`, `- Source or artifact: ${item.source || "Not supplied"}`, `- Personal stable ID: \`${item.id}\``, "");
      lines.push("## Review checklist", "", "- [ ] Verify topic placement and relationship semantics", "- [ ] Verify authoritative sources and metadata", "- [ ] Assign canonical stable IDs", "- [ ] Run semantic validators and browser journeys", "");
      download(`curriculum-proposal-${new Date().toISOString().slice(0, 10)}.md`, lines.join("\n"), "text/markdown");
    }

    showSearch() {
      const query = normalize(this.searchInput.value.trim());
      if (query.length < 2) { this.searchResults.hidden = true; return; }
      const results = this.searchIndex.filter((entry) => entry.text.includes(query)).slice(0, 14);
      this.searchResults.innerHTML = results.length ? results.map((entry) => `<button type="button" role="option" data-search-kind="${entry.kind}" data-search-id="${entry.id}"><span>${escapeHTML(entry.kind)}</span><div><strong>${escapeHTML(entry.title)}</strong><small>${escapeHTML(entry.subtitle)}</small></div></button>`).join("") : `<p class="empty-state compact">No result for “${escapeHTML(this.searchInput.value)}”.</p>`;
      this.searchResults.hidden = false;
      this.searchInput.setAttribute("aria-expanded", "true");
    }

    selectSearchResult(kind, id) {
      this.searchInput.value = "";
      this.searchResults.hidden = true;
      this.searchInput.setAttribute("aria-expanded", "false");
      if (kind === "topic") this.openTopic(id);
      else if (kind === "session") this.openSession(id);
      else {
        if (kind === "paper") this.libraryKind = "papers";
        if (kind === "resource") this.libraryKind = "resources";
        if (kind === "frontier") this.libraryKind = "frontier";
        this.showView("library");
        this.root.querySelector(`[data-entity-id="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        this.root.querySelector(`[data-entity-id="${CSS.escape(id)}"]`)?.classList.add("targeted");
      }
    }

    bindEvents() {
      this.root.addEventListener("click", async (event) => {
        const button = event.target.closest("button, a[data-route-view]");
        if (!button) return;
        if (button.dataset.view) { this.showView(button.dataset.view); return; }
        if (button.dataset.routeView) { event.preventDefault(); this.showView(button.dataset.routeView); return; }
        if (button.dataset.openTopic) { this.openTopic(button.dataset.openTopic, button.dataset.topicTabTarget || "summary"); return; }
        if (button.dataset.openSession) { this.openSession(button.dataset.openSession); return; }
        if (button.dataset.topicTab) { this.currentTab = button.dataset.topicTab; this.renderTopic(); window.history.replaceState({}, "", this.routeURL("topic")); return; }
        if (button.dataset.topicTabJump) { this.currentTab = button.dataset.topicTabJump; this.renderTopic(); window.history.replaceState({}, "", this.routeURL("topic")); return; }
        if (button.matches("[data-start-learning]")) { const next = this.nextSession(); next ? this.openSession(next.session.id) : this.showView("workspace"); return; }
        if (button.matches("[data-plan-target], [data-open-curriculum]")) { this.showView("curriculum"); return; }
        if (button.dataset.curriculumMode) { this.curriculumMode = button.dataset.curriculumMode; this.renderCurriculum(); return; }
        if (button.dataset.libraryKind) { this.libraryKind = button.dataset.libraryKind; this.renderLibrary(); return; }
        if (button.dataset.searchKind) { this.selectSearchResult(button.dataset.searchKind, button.dataset.searchId); return; }
        if (button.matches("[data-mobile-nav]")) {
          const nav = this.root.querySelector(".primary-nav");
          nav.classList.toggle("open");
          button.setAttribute("aria-expanded", String(nav.classList.contains("open")));
          return;
        }
        if (button.dataset.mapZoom === "in") this.cy?.zoom({ level: this.cy.zoom() * 1.2, renderedPosition: { x: this.cy.width() / 2, y: this.cy.height() / 2 } });
        if (button.dataset.mapZoom === "out") this.cy?.zoom({ level: this.cy.zoom() / 1.2, renderedPosition: { x: this.cy.width() / 2, y: this.cy.height() / 2 } });
        if (button.matches("[data-map-fit]")) this.cy?.fit(undefined, 35);
        if (button.dataset.copyPrompt !== undefined) {
          await navigator.clipboard.writeText(this.currentPrompts[Number(button.dataset.copyPrompt)].prompt);
          button.textContent = "Copied";
          setTimeout(() => { button.textContent = "Copy prompt"; }, 1200);
          return;
        }
        if (button.dataset.validateTopic) {
          const topicId = button.dataset.validateTopic;
          const previous = this.state.competenceEvidence[topicId]?.evidence || "";
          const evidence = window.prompt("Record the evidence used to validate competence. Leave blank to remove the validation record.", previous);
          if (evidence === null) return;
          if (evidence.trim()) {
            if (!this.state.competenceValidated.includes(topicId)) this.state.competenceValidated.push(topicId);
            this.state.competenceEvidence[topicId] = { evidence: evidence.trim(), recordedAt: new Date().toISOString() };
          } else {
            this.state.competenceValidated = this.state.competenceValidated.filter((id) => id !== topicId);
            delete this.state.competenceEvidence[topicId];
          }
          await this.saveState(); this.renderAll(); return;
        }
        if (button.dataset.toggleDisabled) {
          const id = button.dataset.toggleDisabled;
          const index = this.state.disabledIds.indexOf(id);
          if (index >= 0) this.state.disabledIds.splice(index, 1); else this.state.disabledIds.push(id);
          await this.saveState(); this.renderAll(); return;
        }
        if (button.dataset.toggleActivation) {
          const id = button.dataset.toggleActivation;
          const session = this.sessionById.get(id);
          if (!session || !["Frontier Continuation", "Optional Specialization"].includes(session.classification)) return;
          const index = this.state.activatedSessionIds.indexOf(id);
          if (index >= 0) this.state.activatedSessionIds.splice(index, 1); else this.state.activatedSessionIds.push(id);
          await this.saveState(); this.renderAll(); return;
        }
        if (button.dataset.routeMove) {
          const id = button.dataset.routeId;
          const index = this.state.customOrder.indexOf(id);
          const offset = button.dataset.routeMove === "up" ? -1 : 1;
          const other = index + offset;
          if (index >= 0 && other >= 0 && other < this.state.customOrder.length) {
            [this.state.customOrder[index], this.state.customOrder[other]] = [this.state.customOrder[other], this.state.customOrder[index]];
            this.state.orderOverrides = [];
            await this.saveState(); this.renderWorkspace(); this.renderCurriculum();
          }
          return;
        }
        if (button.matches("[data-accept-order-overrides]")) {
          this.state.orderOverrides = this.orderViolations(this.state.customOrder).map((edge) => edge.id);
          await this.saveState(); this.renderWorkspace(); this.renderCurriculum(); return;
        }
        if (button.dataset.personalMove) {
          const index = this.state.customItems.findIndex((item) => item.id === button.dataset.itemId);
          const offset = button.dataset.personalMove === "up" ? -1 : 1;
          if (index >= 0 && index + offset >= 0 && index + offset < this.state.customItems.length) {
            [this.state.customItems[index], this.state.customItems[index + offset]] = [this.state.customItems[index + offset], this.state.customItems[index]];
            await this.saveState(); this.renderPersonalItems();
          }
          return;
        }
        if (button.dataset.editPersonal) { this.editPersonal(button.dataset.editPersonal); return; }
        if (button.dataset.togglePersonal) {
          const item = this.state.customItems.find((candidate) => candidate.id === button.dataset.togglePersonal);
          if (item) { item.disabled = !item.disabled; await this.saveState(); this.renderPersonalItems(); }
          return;
        }
        if (button.dataset.deletePersonal) {
          if (window.confirm("Delete this personal item? Canonical curriculum data is unaffected.")) {
            this.state.customItems = this.state.customItems.filter((item) => item.id !== button.dataset.deletePersonal);
            await this.saveState(); this.renderPersonalItems();
          }
          return;
        }
        if (button.matches("[data-cancel-edit]")) { this.resetAdditionForm(); return; }
        if (button.matches("[data-export-bundle]")) { await this.exportBundle(); return; }
        if (button.matches("[data-import-bundle]")) { this.root.querySelector("[data-bundle-input]").click(); return; }
        if (button.matches("[data-export-proposal]")) { this.exportProposal(); return; }
        if (button.matches("[data-reset-workspace]")) {
          if (window.confirm("Reset all personal progress, notes, additions, ordering, and attachments in this browser? Export a bundle first if you may need recovery.")) {
            await this.store.clearAll();
            this.state = window.GolemWorkspaceStore.blankState();
            this.renderAll();
            this.bundleStatus.textContent = "Personal workspace reset. Canonical curriculum unchanged.";
          }
          return;
        }
        if (button.dataset.downloadAttachment) {
          const record = (await this.store.listAttachments()).find((item) => item.id === button.dataset.downloadAttachment);
          if (record) download(record.name, record.blob, record.type);
          return;
        }
        if (button.dataset.deleteAttachment) {
          await this.store.deleteAttachment(button.dataset.deleteAttachment);
          await this.renderAttachments(this.currentSessionId);
        }
      });

      this.root.addEventListener("change", async (event) => {
        const target = event.target;
        if (target.matches("[data-profile-select]")) {
          this.state.profile = target.value; await this.saveState(); this.renderAll(); return;
        }
        if (target.matches("[data-target-select]")) {
          this.state.targetTopicId = target.value || null;
          this.state.customOrder = [];
          this.state.orderOverrides = [];
          await this.saveState(); this.renderAll(); return;
        }
        if (target.matches("[data-area-filter]")) { this.areaFilter = target.value; this.renderCurriculum(); return; }
        if (target.matches("[data-ready-filter]")) { this.readyFilter = target.checked; this.renderCurriculum(); return; }
        if (target.matches("[data-map-scope]")) { this.mapScope = target.value; this.applyMapScope(); this.cy?.fit(undefined, 35); return; }
        if (target.matches("[data-library-topic]")) { this.renderLibrary(); return; }
        if (target.matches("[data-map-topic-select]")) { if (target.value) this.openTopic(target.value); return; }
        if (target.matches("[data-session-status]")) {
          this.state.entityStatus[target.dataset.sessionStatus] = target.value;
          await this.saveState(); this.renderAll(); return;
        }
        if (target.matches("[data-sprint-covered]")) {
          const id = target.dataset.sprintCovered;
          if (target.checked && !this.state.sprintCovered.includes(id)) this.state.sprintCovered.push(id);
          if (!target.checked) this.state.sprintCovered = this.state.sprintCovered.filter((candidate) => candidate !== id);
          await this.saveState(); this.renderAll(); return;
        }
        if (target.matches("[data-bundle-input]")) {
          if (!target.files[0]) return;
          try { await this.importBundle(target.files[0]); }
          catch (error) { this.bundleStatus.textContent = `Import failed: ${error.message}`; }
          target.value = "";
          return;
        }
        if (target.matches("[data-attachment-input]")) {
          if (!target.files[0]) return;
          try {
            const file = target.files[0];
            const records = await this.store.listAttachments();
            const totalBytes = records.reduce((total, item) => total + item.size, 0);
            if (file.size > MAX_ATTACHMENT_BYTES) throw new Error("Attachments are limited to 8 MB each.");
            if (records.length >= MAX_ATTACHMENTS) throw new Error(`The workspace supports at most ${MAX_ATTACHMENTS} attachments.`);
            if (totalBytes + file.size > MAX_TOTAL_ATTACHMENT_BYTES) throw new Error("Workspace attachments are limited to 24 MB total.");
            await this.store.putAttachment(target.dataset.attachmentInput, file);
            await this.renderAttachments(target.dataset.attachmentInput);
          }
          catch (error) { this.setStatus(error.message, true); }
          target.value = "";
        }
      });

      this.root.querySelector("[data-library-search]").addEventListener("input", () => this.renderLibrary());
      this.searchInput.addEventListener("input", () => this.showSearch());
      this.searchInput.addEventListener("keydown", (event) => { if (event.key === "Escape") this.searchResults.hidden = true; });
      document.addEventListener("click", (event) => { if (!event.target.closest(".global-search")) this.searchResults.hidden = true; });
      this.root.querySelector("[data-addition-form]").addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const id = data.get("itemId") || `PERSONAL-${crypto.randomUUID()}`;
        const record = { id, kind: data.get("kind"), title: data.get("title").trim(), topicId: data.get("topicId"), objective: data.get("objective").trim(), source: data.get("source").trim(), disabled: false, updatedAt: new Date().toISOString() };
        const index = this.state.customItems.findIndex((item) => item.id === id);
        if (index >= 0) record.disabled = this.state.customItems[index].disabled;
        if (index >= 0) this.state.customItems[index] = record; else this.state.customItems.push(record);
        await this.saveState(); this.resetAdditionForm(); this.renderPersonalItems();
      });
      window.addEventListener("popstate", () => { this.restoreRoute(); this.showView(this.currentView, { history: "none" }); });
    }

    editPersonal(id) {
      const item = this.state.customItems.find((candidate) => candidate.id === id);
      if (!item) return;
      const form = this.root.querySelector("[data-addition-form]");
      form.elements.itemId.value = item.id;
      form.elements.kind.value = item.kind;
      form.elements.title.value = item.title;
      form.elements.topicId.value = item.topicId;
      form.elements.objective.value = item.objective;
      form.elements.source.value = item.source;
      form.querySelector("[data-cancel-edit]").hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    resetAdditionForm() {
      const form = this.root.querySelector("[data-addition-form]");
      form.reset();
      form.elements.itemId.value = "";
      form.querySelector("[data-cancel-edit]").hidden = true;
    }
  }

  async function boot() {
    const root = document.getElementById("curriculum-explorer");
    if (!root || root.dataset.initialized) return;
    root.dataset.initialized = "true";
    try {
      const app = new CurriculumApp(root);
      await app.init();
    } catch (error) {
      console.error(error);
      const status = root.querySelector("[data-app-status]");
      status.hidden = false;
      status.classList.add("error");
      status.textContent = `The learning workspace could not start: ${error.message}`;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  document.addEventListener("DOMContentSwitch", boot);
})();
