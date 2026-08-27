(() => {
  "use strict";

  const STORAGE_KEY = "golem-curriculum-progress-v1";
  const LEGACY_STORAGE_KEY = "golem-curriculum-completed";
  const VIEWS = new Set(["overview", "map", "focus", "topic", "table"]);
  const TABS = new Set(["summary", "sessions", "papers", "resources", "related"]);
  const AREA_COLORS = {
    shared_foundations: "#4666d5",
    perception_world_models: "#148f86",
    learning_to_act: "#7950c7",
    data_research_systems: "#bd6b20",
    language_embodied_reasoning: "#c94f65",
    specialization_branches: "#607084",
  };

  let activeInstance = null;
  let cytoscapePromise = null;

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalise(value) {
    return String(value ?? "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function compact(value, limit = 150) {
    const text = String(value ?? "").trim();
    return text.length <= limit ? text : `${text.slice(0, limit - 1).trimEnd()}…`;
  }

  function localURL(path) {
    return new URL(path, window.location.href).href;
  }

  function loadCytoscape(graphURL) {
    if (!cytoscapePromise) {
      const dataURL = new URL(graphURL, document.baseURI);
      const moduleURL = new URL("../vendor/cytoscape-3.33.1.esm.min.js", dataURL);
      cytoscapePromise = import(moduleURL.href).then((module) => module.c || module.default);
    }
    return cytoscapePromise;
  }

  class CurriculumExplorer {
    constructor(root, cytoscape) {
      this.root = root;
      this.cytoscape = cytoscape;
      this.data = null;
      this.cy = null;
      this.focusCy = null;
      this.currentView = "overview";
      this.currentTab = "summary";
      this.selectedTopicId = null;
      this.selectedEntityId = null;
      this.focusDirection = "both";
      this.transitiveFocus = true;
      this.readyOnly = false;
      this.activeAreas = new Set();
      this.activeStatuses = new Set();
      this.searchEntries = [];
      this.cleanup = [];
      this.themeObserver = null;
    }

    async init() {
      document.body.classList.add("curriculum-explorer-page");
      this.cacheDOM();
      this.setLoading("Loading the curriculum…");

      const response = await fetch(new URL(this.root.dataset.graphUrl, document.baseURI), { cache: "no-cache" });
      if (!response.ok) throw new Error(`Could not load curriculum data (HTTP ${response.status}).`);
      this.data = await response.json();
      if (this.data.schema_version !== 1) throw new Error(`Unsupported curriculum data schema: ${this.data.schema_version}.`);

      this.indexData();
      this.renderFilters();
      this.renderOverview();
      this.renderTable();
      this.createMap();
      this.bindEvents();
      this.restoreURLState();
      this.applyFilters(false);
      this.renderInspector();
      this.showView(this.currentView, { history: "replace", fit: true });
      this.setLoading(null);
      this.watchTheme();
    }

    cacheDOM() {
      this.viewPanels = new Map(
        [...this.root.querySelectorAll("[data-view-panel]")].map((panel) => [panel.dataset.viewPanel, panel])
      );
      this.viewButtons = [...this.root.querySelectorAll("[data-view]")];
      this.tabButtons = [...this.root.querySelectorAll("[data-topic-tab]")];
      this.areaFilters = this.root.querySelector("[data-area-filters]");
      this.statusFilters = this.root.querySelector("[data-status-filters]");
      this.readyToggle = this.root.querySelector("[data-ready-only]");
      this.searchInput = this.root.querySelector("[data-explorer-search]");
      this.searchResults = this.root.querySelector("[data-search-results]");
      this.graphContainer = this.root.querySelector("[data-explorer-graph]");
      this.focusContainer = this.root.querySelector("[data-focus-graph]");
      this.loading = this.root.querySelector("[data-explorer-loading]");
      this.graphStatus = this.root.querySelector("[data-graph-status]");
      this.focusStatus = this.root.querySelector("[data-focus-status]");
      this.focusTitle = this.root.querySelector("[data-focus-title]");
      this.mapTopicSelect = this.root.querySelector("[data-map-topic-select]");
      this.details = this.root.querySelector("[data-explorer-details]");
      this.topicHeader = this.root.querySelector("[data-topic-header]");
      this.topicContent = this.root.querySelector("[data-topic-content]");
      this.tableContent = this.root.querySelector("[data-table-content]");
      this.context = this.root.querySelector("[data-current-context]");
      this.progressFileInput = this.root.querySelector("[data-progress-file-input]");
      this.progressFileStatus = this.root.querySelector("[data-progress-file-status]");
    }

    setLoading(message) {
      if (!this.loading) return;
      this.loading.hidden = !message;
      this.loading.textContent = message || "";
    }

    indexData() {
      this.topicById = new Map(this.data.topics.map((item) => [item.id, item]));
      this.sessionById = new Map(this.data.sessions.map((item) => [item.id, item]));
      this.paperById = new Map(this.data.papers.map((item) => [item.id, item]));
      this.resourceById = new Map(this.data.resources.map((item) => [item.id, item]));
      this.frontierById = new Map(this.data.frontier_items.map((item) => [item.id, item]));
      this.sessionsByTopic = new Map(this.data.topics.map((topic) => [topic.id, []]));
      this.incoming = new Map(this.data.topics.map((topic) => [topic.id, new Set()]));
      this.outgoing = new Map(this.data.topics.map((topic) => [topic.id, new Set()]));

      for (const session of this.data.sessions) this.sessionsByTopic.get(session.topic_id)?.push(session);
      for (const sessions of this.sessionsByTopic.values()) sessions.sort((a, b) => a.sequence - b.sequence);
      for (const edge of this.data.dependencies) {
        this.incoming.get(edge.target)?.add(edge.source);
        this.outgoing.get(edge.source)?.add(edge.target);
      }

      this.activeAreas = new Set(this.data.areas.map((area) => area.id));
      this.activeStatuses = new Set(this.data.statuses.map((status) => status.id));
      this.searchEntries = this.buildSearchIndex();
    }

    buildSearchIndex() {
      const entries = [];
      for (const topic of this.data.topics) {
        entries.push({
          type: "topic",
          id: topic.id,
          topicId: topic.id,
          title: topic.title,
          subtitle: `${topic.area_short_label} · ${topic.status}`,
          haystack: normalise([topic.id, topic.title, topic.covers, topic.target_competence, topic.curriculum_role].join(" ")),
        });
      }
      for (const session of this.data.sessions) {
        entries.push({
          type: "session",
          id: session.id,
          topicId: session.topic_id,
          title: session.title,
          subtitle: `${session.topic_id} · ${session.classification}`,
          haystack: normalise([session.id, session.title, session.stage, session.objective, session.planned_component].join(" ")),
        });
      }
      for (const paper of this.data.papers) {
        entries.push({
          type: "paper",
          id: paper.id,
          topicId: paper.topic_id,
          title: paper.title,
          subtitle: [paper.authors, paper.year, paper.venue].filter(Boolean).join(" · "),
          haystack: normalise([paper.id, paper.title, paper.authors, paper.year, paper.venue, paper.contribution].join(" ")),
        });
      }
      for (const resource of this.data.resources) {
        const assignedTopic = this.data.topics.find((topic) => topic.resources.includes(resource.id));
        entries.push({
          type: "resource",
          id: resource.id,
          topicId: assignedTopic?.id || resource.topic_ids[0] || null,
          title: resource.title,
          subtitle: `${resource.type} · ${resource.topic_ids.join(", ") || "Cross-topic"}`,
          haystack: normalise([resource.id, resource.title, resource.type, resource.role, resource.topics_raw].join(" ")),
        });
      }
      for (const item of this.data.frontier_items) {
        entries.push({
          type: "frontier",
          id: item.id,
          topicId: item.topic_ids[0] || null,
          title: item.title,
          subtitle: `Frontier · ${item.topic_ids.join(", ") || "Cross-topic"}`,
          haystack: normalise([item.id, item.title, item.reason, item.maturity, item.related_topics_raw].join(" ")),
        });
      }
      return entries;
    }

    getProgress() {
      try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        if (parsed && parsed.version === 1 && Array.isArray(parsed.completedSessions)) {
          return new Set(parsed.completedSessions.filter((id) => this.sessionById.has(id)));
        }
        const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "[]");
        return new Set(Array.isArray(legacy) ? legacy.filter((id) => this.sessionById.has(id)) : []);
      } catch {
        return new Set();
      }
    }

    saveProgress(completed) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 1, completedSessions: [...completed].sort(), updatedAt: new Date().toISOString() })
      );
    }

    refreshProgressViews() {
      this.updateCompletionStyles();
      this.renderOverview();
      this.renderTable();
      this.renderInspector();
      if (this.currentView === "topic") this.renderTopicWorkspace();
      this.applyFilters(false);
    }

    setProgressFileStatus(message, isError = false) {
      this.progressFileStatus.textContent = message;
      this.progressFileStatus.classList.toggle("is-error", isError);
    }

    exportProgress() {
      const completedSessions = [...this.getProgress()].sort();
      const payload = {
        schema_version: 1,
        application: "golem-robotics-paper-club",
        exported_at: new Date().toISOString(),
        completed_sessions: completedSessions,
      };
      const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `golem-paper-club-progress-${payload.exported_at.slice(0, 10)}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
      this.setProgressFileStatus(`Exported ${completedSessions.length} completed session${completedSessions.length === 1 ? "" : "s"}.`);
    }

    async importProgress(file) {
      if (!file) return;
      try {
        const payload = JSON.parse(await file.text());
        if (payload?.schema_version !== 1 || !Array.isArray(payload.completed_sessions)) {
          throw new Error("This is not a supported progress file.");
        }
        const completed = new Set(payload.completed_sessions.filter((id) => this.sessionById.has(id)));
        const ignored = payload.completed_sessions.length - completed.size;
        this.saveProgress(completed);
        this.refreshProgressViews();
        this.setProgressFileStatus(
          `Imported ${completed.size} completed session${completed.size === 1 ? "" : "s"}${ignored ? `; ignored ${ignored} unknown entr${ignored === 1 ? "y" : "ies"}` : ""}.`
        );
      } catch (error) {
        this.setProgressFileStatus(error instanceof Error ? error.message : "Could not import this progress file.", true);
      } finally {
        this.progressFileInput.value = "";
      }
    }

    setSessionComplete(sessionId, complete) {
      if (!this.sessionById.has(sessionId)) return;
      const completed = this.getProgress();
      if (complete) completed.add(sessionId);
      else completed.delete(sessionId);
      this.saveProgress(completed);
      this.refreshProgressViews();
    }

    topicProgress(topicId) {
      const sessions = this.sessionsByTopic.get(topicId) || [];
      const completed = this.getProgress();
      const done = sessions.filter((session) => completed.has(session.id)).length;
      return {
        done,
        total: sessions.length,
        state: done === 0 ? "not-started" : done === sessions.length ? "complete" : "in-progress",
      };
    }

    isTopicComplete(topicId) {
      const progress = this.topicProgress(topicId);
      return progress.total > 0 && progress.done === progress.total;
    }

    isTopicReady(topicId) {
      const prerequisites = [...(this.incoming.get(topicId) || [])];
      return prerequisites.every((id) => this.isTopicComplete(id));
    }

    renderFilters() {
      this.areaFilters.innerHTML = this.data.areas
        .map((area) => `
          <label>
            <input type="checkbox" value="${escapeHTML(area.id)}" checked>
            <i style="--filter-color:${AREA_COLORS[area.id] || "#718096"}"></i>
            <span>${escapeHTML(area.short_label)}</span>
            <small>${area.topic_ids.length}</small>
          </label>`)
        .join("");
      this.statusFilters.innerHTML = this.data.statuses
        .map((status) => `
          <label>
            <input type="checkbox" value="${escapeHTML(status.id)}" checked>
            <span>${escapeHTML(status.label)}</span>
            <small>${status.count}</small>
          </label>`)
        .join("");
    }

    renderOverview() {
      const stats = this.data.statistics;
      const completed = this.getProgress().size;
      const percent = Math.round((completed / stats.sessions) * 100);
      const statItems = [
        [stats.topics, "Topics", "A connected knowledge map"],
        [stats.sessions, "Sessions", "Ordered learning stages"],
        [stats.papers, "Primary papers", "Durable research lineage"],
        [stats.resources, "Resources", "Targeted prerequisite support"],
      ];
      this.root.querySelector("[data-explorer-stats]").innerHTML = statItems
        .map(([value, label, note]) => `
          <article><strong>${value}</strong><span>${escapeHTML(label)}</span><small>${escapeHTML(note)}</small></article>`)
        .join("");

      this.root.querySelector("[data-progress-summary]").textContent =
        completed ? `${completed}/${stats.sessions} sessions · ${percent}%` : "No progress recorded yet";

      const nextTopics = this.recommendedTopics().slice(0, 5);
      this.root.querySelector("[data-next-steps]").innerHTML = nextTopics.length
        ? `<ol class="explorer-next-list">${nextTopics.map(({ topic, reason }) => {
            const progress = this.topicProgress(topic.id);
            return `
              <li>
                <button type="button" data-topic-id="${topic.id}" data-open-view="topic">
                  <span class="explorer-topic-id">${topic.id}</span>
                  <span><strong>${escapeHTML(topic.title)}</strong><small>${escapeHTML(reason)}</small></span>
                  <span class="explorer-mini-progress">${progress.done}/${progress.total}</span>
                </button>
              </li>`;
          }).join("")}</ol>`
        : `<div class="explorer-empty-state"><strong>Curriculum complete</strong><p>Every planned session is marked complete. Revisit the frontier watchlist or synthesis topics next.</p></div>`;

      this.root.querySelector("[data-area-cards]").innerHTML = this.data.areas
        .map((area) => {
          const topics = area.topic_ids.map((id) => this.topicById.get(id)).filter(Boolean);
          const complete = topics.filter((topic) => this.isTopicComplete(topic.id)).length;
          return `
            <button type="button" data-area-id="${area.id}" style="--area-color:${AREA_COLORS[area.id] || "#718096"}">
              <span><strong>${escapeHTML(area.short_label)}</strong><small>${topics.length} topics · ${complete} complete</small></span>
              <b aria-hidden="true">→</b>
            </button>`;
        })
        .join("");
    }

    recommendedTopics() {
      const candidates = this.data.topics
        .filter((topic) => !this.isTopicComplete(topic.id))
        .map((topic) => {
          const progress = this.topicProgress(topic.id);
          const prerequisites = [...(this.incoming.get(topic.id) || [])];
          const completedPrerequisites = prerequisites.filter((id) => this.isTopicComplete(id)).length;
          const ready = completedPrerequisites === prerequisites.length;
          const statusPriority = topic.status === "Shared Core" ? 30 : topic.status === "Active Research Track" ? 15 : 0;
          const progressPriority = progress.done > 0 ? 60 + progress.done / Math.max(progress.total, 1) * 20 : 0;
          const readinessPriority = ready ? 40 : (completedPrerequisites / Math.max(prerequisites.length, 1)) * 20;
          return {
            topic,
            score: progressPriority + readinessPriority + statusPriority - topic.rank,
            reason: progress.done > 0
              ? `Continue at session ${progress.done + 1} of ${progress.total}`
              : ready
                ? prerequisites.length ? "All topic prerequisites are complete" : "A foundation with no topic prerequisites"
                : `${completedPrerequisites} of ${prerequisites.length} prerequisites complete`,
          };
        });
      return candidates.sort((a, b) => b.score - a.score || a.topic.area_order - b.topic.area_order || a.topic.id.localeCompare(b.topic.id));
    }

    graphElements() {
      const nodes = this.data.topics.map((topic) => ({
        group: "nodes",
        classes: `topic status-${topic.status_id}`,
        data: {
          id: `topic:${topic.id}`,
          topic_id: topic.id,
          label: `${topic.id}\n${compact(topic.title, 42)}`,
          area_id: topic.area_id,
        },
        position: this.mapPosition(topic),
      }));
      const edges = this.data.dependencies.map((edge) => ({
        group: "edges",
        classes: `dependency${edge.cycle ? " feedback-edge" : ""}`,
        data: {
          id: `dependency:${edge.source}:${edge.target}`,
          source: `topic:${edge.source}`,
          target: `topic:${edge.target}`,
        },
      }));
      return [...nodes, ...edges];
    }

    mapPosition(topic) {
      return topic.positions.map;
    }

    graphStyles() {
      const dark = this.isDarkTheme();
      const text = dark ? "#edf2f7" : "#172033";
      const edge = dark ? "#69758a" : "#8d98aa";
      const muted = dark ? "#2b3443" : "#edf1f6";
      return [
        {
          selector: "node",
          style: {
            width: 150,
            height: 62,
            shape: "round-rectangle",
            "background-color": muted,
            "border-color": "#718096",
            "border-width": 2,
            label: "data(label)",
            color: text,
            "font-size": 10,
            "font-weight": 650,
            "text-wrap": "wrap",
            "text-max-width": 132,
            "text-valign": "center",
            "text-halign": "center",
          },
        },
        ...Object.entries(AREA_COLORS).map(([area, color]) => ({
          selector: `node[area_id = "${area}"]`,
          style: {
            "border-color": color,
            "background-color": dark ? `${color}33` : `${color}16`,
          },
        })),
        { selector: "node.status-shared_core", style: { "border-width": 4 } },
        {
          selector: "node.status-specialization, node.status-optional, node.status-frontier_watchlist",
          style: { "border-style": "dashed" },
        },
        {
          selector: "node.completed",
          style: {
            "border-color": "#169b62",
            "border-width": 5,
            "background-color": dark ? "#143c2b" : "#e8f7ef",
          },
        },
        {
          selector: "node:selected, node.is-selected",
          style: { "overlay-color": "#f6b73c", "overlay-opacity": 0.16, "overlay-padding": 8, "border-color": "#f6b73c" },
        },
        {
          selector: "edge",
          style: {
            width: 1.6,
            "line-color": edge,
            "target-arrow-color": edge,
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.8,
            "curve-style": "bezier",
            opacity: 0.58,
          },
        },
        {
          selector: "edge.feedback-edge",
          style: { "line-style": "dashed", "line-color": "#e05263", "target-arrow-color": "#e05263" },
        },
        { selector: ".filtered", style: { display: "none" } },
        { selector: ".dimmed", style: { opacity: 0.12 } },
        { selector: "edge.is-path", style: { width: 3.5, opacity: 0.95, "line-color": "#f6b73c", "target-arrow-color": "#f6b73c" } },
      ];
    }

    createMap() {
      this.cy = this.cytoscape({
        container: this.graphContainer,
        elements: this.graphElements(),
        style: this.graphStyles(),
        layout: { name: "preset", fit: false },
        minZoom: 0.2,
        maxZoom: 2.4,
        wheelSensitivity: 0.18,
        boxSelectionEnabled: false,
      });
      this.cy.on("tap", "node", (event) => this.selectTopic(event.target.data("topic_id"), { history: true }));
      this.cy.on("tap", (event) => {
        if (event.target === this.cy) this.cy.elements().unselect();
      });
      this.updateCompletionStyles();
    }

    createFocusGraph() {
      if (this.focusCy) return;
      this.focusCy = this.cytoscape({
        container: this.focusContainer,
        elements: this.graphElements(),
        style: this.graphStyles(),
        layout: { name: "preset", fit: false },
        minZoom: 0.25,
        maxZoom: 2.4,
        wheelSensitivity: 0.18,
        boxSelectionEnabled: false,
      });
      this.focusCy.on("tap", "node", (event) => this.selectTopic(event.target.data("topic_id"), { history: true, rerenderFocus: true }));
      this.updateCompletionStyles();
    }

    updateCompletionStyles() {
      for (const graph of [this.cy, this.focusCy].filter(Boolean)) {
        graph.batch(() => {
          graph.nodes().removeClass("completed is-selected");
          for (const topic of this.data.topics) {
            const node = graph.getElementById(`topic:${topic.id}`);
            if (this.isTopicComplete(topic.id)) node.addClass("completed");
            if (topic.id === this.selectedTopicId) node.addClass("is-selected");
          }
        });
      }
    }

    bindEvents() {
      const listen = (target, type, handler, options) => {
        target.addEventListener(type, handler, options);
        this.cleanup.push(() => target.removeEventListener(type, handler, options));
      };

      listen(this.root, "click", (event) => {
        const viewButton = event.target.closest("[data-view]");
        if (viewButton && !viewButton.disabled) {
          this.showView(viewButton.dataset.view, { history: "push", fit: true });
          return;
        }
        const tabButton = event.target.closest("[data-topic-tab]");
        if (tabButton) {
          this.showTopicTab(tabButton.dataset.topicTab, { history: "push" });
          return;
        }
        const topicButton = event.target.closest("[data-topic-id]");
        if (topicButton) {
          this.selectTopic(topicButton.dataset.topicId, { history: false });
          const view = topicButton.dataset.openView || "topic";
          const tab = topicButton.dataset.openTab || "summary";
          this.currentTab = TABS.has(tab) ? tab : "summary";
          this.showView(view, { history: "push", fit: true });
          return;
        }
        const areaButton = event.target.closest("[data-area-id]");
        if (areaButton) {
          this.activeAreas = new Set([areaButton.dataset.areaId]);
          this.syncFilterInputs();
          this.applyFilters(false);
          this.showView("table", { history: "push" });
          return;
        }
        if (event.target.closest("[data-overview-map]")) this.showView("map", { history: "push", fit: true });
        if (event.target.closest("[data-filter-toggle]")) this.toggleMobileFilters();
        if (event.target.closest("[data-clear-filters]")) this.clearFilters();
        if (event.target.closest("[data-reset]")) this.reset();
        if (event.target.closest("[data-export-progress]")) this.exportProgress();
        if (event.target.closest("[data-import-progress]")) this.progressFileInput.click();
        if (event.target.closest("[data-fullscreen]")) this.toggleFullscreen();
        const fitButton = event.target.closest("[data-fit]");
        if (fitButton) this.fitCurrentGraph();
        if (event.target.closest("[data-zoom-in]")) this.adjustZoom(1.2);
        if (event.target.closest("[data-zoom-out]")) this.adjustZoom(0.83);
      });

      listen(this.root, "change", (event) => {
        if (event.target.matches("[data-area-filters] input")) {
          this.updateFilterSets();
        } else if (event.target.matches("[data-status-filters] input")) {
          this.updateFilterSets();
        } else if (event.target === this.readyToggle) {
          this.readyOnly = event.target.checked;
          this.applyFilters(true);
        } else if (event.target.matches("[data-session-complete]")) {
          this.setSessionComplete(event.target.value, event.target.checked);
        } else if (event.target.matches("[data-transitive-focus]")) {
          this.transitiveFocus = event.target.checked;
          this.renderFocus();
          this.updateURL("replace");
        } else if (event.target === this.mapTopicSelect && event.target.value) {
          this.selectTopic(event.target.value, { history: true });
        } else if (event.target === this.progressFileInput) {
          this.importProgress(event.target.files?.[0]);
        }
      });

      for (const button of this.root.querySelectorAll("[data-focus-direction]")) {
        listen(button, "click", () => {
          this.focusDirection = button.dataset.focusDirection;
          this.renderFocus();
          this.updateURL("replace");
        });
      }

      listen(this.searchInput, "input", () => this.renderSearchResults());
      listen(this.searchInput, "keydown", (event) => this.handleSearchKeydown(event));
      listen(document, "click", (event) => {
        if (!event.target.closest(".explorer-search")) this.closeSearch();
      });
      listen(window, "popstate", () => {
        this.restoreURLState();
        this.applyFilters(false);
        this.renderInspector();
        this.showView(this.currentView, { history: "none", fit: true });
      });
      listen(window, "resize", () => {
        this.cy?.resize();
        this.focusCy?.resize();
      }, { passive: true });
    }

    updateFilterSets() {
      this.activeAreas = new Set(
        [...this.areaFilters.querySelectorAll("input:checked")].map((input) => input.value)
      );
      this.activeStatuses = new Set(
        [...this.statusFilters.querySelectorAll("input:checked")].map((input) => input.value)
      );
      this.applyFilters(true);
    }

    clearFilters() {
      this.activeAreas = new Set(this.data.areas.map((area) => area.id));
      this.activeStatuses = new Set(this.data.statuses.map((status) => status.id));
      this.readyOnly = false;
      this.readyToggle.checked = false;
      this.syncFilterInputs();
      this.applyFilters(true);
    }

    syncFilterInputs() {
      for (const input of this.areaFilters.querySelectorAll("input")) input.checked = this.activeAreas.has(input.value);
      for (const input of this.statusFilters.querySelectorAll("input")) input.checked = this.activeStatuses.has(input.value);
    }

    visibleTopicIds() {
      return new Set(
        this.data.topics
          .filter((topic) =>
            this.activeAreas.has(topic.area_id) &&
            this.activeStatuses.has(topic.status_id) &&
            (!this.readyOnly || this.isTopicReady(topic.id))
          )
          .map((topic) => topic.id)
      );
    }

    applyFilters(refit = true) {
      const visible = this.visibleTopicIds();
      if (this.cy) {
        this.cy.batch(() => {
          for (const topic of this.data.topics) {
            this.cy.getElementById(`topic:${topic.id}`).toggleClass("filtered", !visible.has(topic.id));
          }
          for (const edge of this.data.dependencies) {
            const hidden = !visible.has(edge.source) || !visible.has(edge.target);
            this.cy.getElementById(`dependency:${edge.source}:${edge.target}`).toggleClass("filtered", hidden);
          }
        });
      }
      this.populateMapSelect(visible);
      this.renderTable();
      if (this.currentView === "focus") this.renderFocus();
      if (refit && this.currentView === "map") this.fitGraph(this.cy);
      const count = visible.size;
      this.graphStatus.textContent = `${count} of ${this.data.topics.length} topics visible`;
    }

    populateMapSelect(visible) {
      const selected = this.mapTopicSelect.value;
      this.mapTopicSelect.innerHTML = '<option value="">Choose a topic…</option>' +
        this.data.topics
          .filter((topic) => visible.has(topic.id))
          .map((topic) => `<option value="${topic.id}">${topic.id} — ${escapeHTML(topic.title)}</option>`)
          .join("");
      if (visible.has(selected)) this.mapTopicSelect.value = selected;
    }

    showView(view, options = {}) {
      const requested = VIEWS.has(view) ? view : "overview";
      const guarded = (requested === "focus" || requested === "topic") && !this.selectedTopicId ? "overview" : requested;
      this.currentView = guarded;
      for (const [name, panel] of this.viewPanels) panel.hidden = name !== guarded;
      for (const button of this.viewButtons) button.setAttribute("aria-pressed", String(button.dataset.view === guarded));
      this.updateNavigationState();

      if (guarded === "map") {
        requestAnimationFrame(() => {
          this.cy.resize();
          if (options.fit) this.fitGraph(this.cy);
        });
      } else if (guarded === "focus") {
        this.createFocusGraph();
        this.renderFocus();
      } else if (guarded === "topic") {
        this.renderTopicWorkspace();
      } else if (guarded === "table") {
        this.renderTable();
      } else {
        this.renderOverview();
      }

      const selected = this.selectedTopicId ? this.topicById.get(this.selectedTopicId) : null;
      this.context.textContent = selected ? `${selected.id} · ${selected.short_title}` : "Research learning workspace";
      if (options.history && options.history !== "none") this.updateURL(options.history);
    }

    updateNavigationState() {
      for (const button of this.viewButtons) {
        if (button.dataset.view === "focus" || button.dataset.view === "topic") {
          button.disabled = !this.selectedTopicId;
          button.title = this.selectedTopicId ? "" : "Select a topic first";
        }
      }
    }

    selectTopic(topicId, options = {}) {
      if (!this.topicById.has(topicId)) return;
      this.selectedTopicId = topicId;
      this.selectedEntityId = null;
      this.updateNavigationState();
      this.updateCompletionStyles();
      this.renderInspector();
      if (this.currentView === "topic") this.renderTopicWorkspace();
      if (this.currentView === "focus" || options.rerenderFocus) this.renderFocus();
      this.context.textContent = `${topicId} · ${this.topicById.get(topicId).short_title}`;
      this.cy?.getElementById(`topic:${topicId}`).select();
      if (options.history) this.updateURL("push");
    }

    renderInspector() {
      if (!this.selectedTopicId) {
        const starters = this.recommendedTopics().slice(0, 3);
        this.details.innerHTML = `
          <div class="explorer-inspector-empty">
            <p class="explorer-eyebrow">Getting started</p>
            <h2>Select a topic</h2>
            <p>Choose a map node, search result, or table row to inspect its role and dependencies.</p>
            <h3>Suggested now</h3>
            <div class="explorer-inspector-suggestions">
              ${starters.map(({ topic }) => `<button type="button" data-topic-id="${topic.id}" data-open-view="topic"><b>${topic.id}</b><span>${escapeHTML(topic.short_title)}</span></button>`).join("")}
            </div>
          </div>`;
        return;
      }

      const topic = this.topicById.get(this.selectedTopicId);
      const prerequisites = [...(this.incoming.get(topic.id) || [])].sort();
      const dependents = [...(this.outgoing.get(topic.id) || [])].sort();
      const progress = this.topicProgress(topic.id);
      const ready = this.isTopicReady(topic.id);
      this.details.innerHTML = `
        <div class="explorer-inspector-topic">
          <div class="explorer-inspector-id"><span style="--area-color:${AREA_COLORS[topic.area_id]}">${topic.id}</span><small>${escapeHTML(topic.status)}</small></div>
          <h2>${escapeHTML(topic.title)}</h2>
          <p>${escapeHTML(compact(topic.curriculum_role || topic.covers, 260))}</p>
          <div class="explorer-progress-block">
            <div><strong>${progress.done} of ${progress.total}</strong><span> sessions complete</span></div>
            <div class="explorer-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${progress.total}" aria-valuenow="${progress.done}"><i style="width:${progress.total ? progress.done / progress.total * 100 : 0}%"></i></div>
            <small class="explorer-readiness ${ready ? "is-ready" : ""}">${ready ? "Ready to study" : "Complete prerequisites first"}</small>
          </div>
          <div class="explorer-inspector-links">
            <button type="button" data-view="focus">Explain dependencies</button>
            <button type="button" data-view="topic">Open topic workspace</button>
            <a href="${escapeHTML(localURL(topic.url))}">Open source document ↗</a>
          </div>
          <section>
            <h3>Prerequisites <span>${prerequisites.length}</span></h3>
            ${this.topicChipList(prerequisites, "No curriculum-topic prerequisite.")}
          </section>
          <section>
            <h3>Unlocks <span>${dependents.length}</span></h3>
            ${this.topicChipList(dependents, "No direct dependent topic.")}
          </section>
        </div>`;
    }

    topicChipList(ids, emptyText) {
      if (!ids.length) return `<p class="explorer-muted">${escapeHTML(emptyText)}</p>`;
      return `<div class="explorer-topic-chips">${ids.map((id) => {
        const topic = this.topicById.get(id);
        return `<button type="button" data-topic-id="${id}"><b>${id}</b><span>${escapeHTML(topic?.short_title || id)}</span></button>`;
      }).join("")}</div>`;
    }

    focusTopicIds() {
      if (!this.selectedTopicId) return new Set();
      const result = new Set([this.selectedTopicId]);
      const includeIncoming = this.focusDirection !== "dependents";
      const includeOutgoing = this.focusDirection !== "prerequisites";
      if (includeIncoming) for (const id of this.traverse(this.selectedTopicId, this.incoming, this.transitiveFocus)) result.add(id);
      if (includeOutgoing) for (const id of this.traverse(this.selectedTopicId, this.outgoing, this.transitiveFocus)) result.add(id);
      const allowed = this.visibleTopicIds();
      return new Set([...result].filter((id) => id === this.selectedTopicId || allowed.has(id)));
    }

    traverse(start, adjacency, transitive) {
      const result = new Set();
      const queue = [...(adjacency.get(start) || [])];
      while (queue.length) {
        const id = queue.shift();
        if (result.has(id)) continue;
        result.add(id);
        if (transitive) queue.push(...(adjacency.get(id) || []));
      }
      return result;
    }

    distances(start, adjacency) {
      const result = new Map([[start, 0]]);
      const queue = [start];
      while (queue.length) {
        const id = queue.shift();
        for (const next of adjacency.get(id) || []) {
          if (!result.has(next)) {
            result.set(next, result.get(id) + 1);
            queue.push(next);
          }
        }
      }
      return result;
    }

    renderFocus() {
      if (!this.selectedTopicId) return;
      this.createFocusGraph();
      const visible = this.focusTopicIds();
      const upstream = this.distances(this.selectedTopicId, this.incoming);
      const downstream = this.distances(this.selectedTopicId, this.outgoing);
      const columns = new Map();
      for (const id of visible) {
        if (id === this.selectedTopicId) columns.set(id, 0);
        else if (upstream.has(id)) columns.set(id, -upstream.get(id));
        else columns.set(id, downstream.get(id) || 1);
      }
      const grouped = new Map();
      for (const [id, column] of columns) {
        if (!grouped.has(column)) grouped.set(column, []);
        grouped.get(column).push(id);
      }
      this.focusCy.batch(() => {
        this.focusCy.nodes().removeClass("is-selected");
        for (const topic of this.data.topics) {
          const node = this.focusCy.getElementById(`topic:${topic.id}`);
          node.toggleClass("filtered", !visible.has(topic.id));
          if (topic.id === this.selectedTopicId) node.addClass("is-selected");
        }
        for (const edge of this.data.dependencies) {
          const shown = visible.has(edge.source) && visible.has(edge.target);
          const element = this.focusCy.getElementById(`dependency:${edge.source}:${edge.target}`);
          element.toggleClass("filtered", !shown);
          element.toggleClass("is-path", shown);
        }
        for (const [column, ids] of grouped) {
          ids.sort((a, b) => this.topicById.get(a).area_order - this.topicById.get(b).area_order || a.localeCompare(b));
          ids.forEach((id, index) => {
            this.focusCy.getElementById(`topic:${id}`).position({
              x: 140 + (column - Math.min(...grouped.keys())) * 240,
              y: 100 + index * 100,
            });
          });
        }
      });
      const topic = this.topicById.get(this.selectedTopicId);
      this.focusTitle.textContent = `${topic.id} · ${topic.title}`;
      this.focusStatus.textContent = `${visible.size} topics in ${this.transitiveFocus ? "transitive" : "direct"} ${this.focusDirection} context`;
      for (const button of this.root.querySelectorAll("[data-focus-direction]")) {
        button.setAttribute("aria-pressed", String(button.dataset.focusDirection === this.focusDirection));
      }
      this.root.querySelector("[data-transitive-focus]").checked = this.transitiveFocus;
      requestAnimationFrame(() => {
        this.focusCy.resize();
        this.fitGraph(this.focusCy);
      });
    }

    renderTopicWorkspace() {
      if (!this.selectedTopicId) return;
      const topic = this.topicById.get(this.selectedTopicId);
      const progress = this.topicProgress(topic.id);
      this.topicHeader.innerHTML = `
        <div>
          <p class="explorer-eyebrow">${escapeHTML(topic.area_short_label)} · ${escapeHTML(topic.status)}</p>
          <h2 id="topic-workspace-title"><span>${topic.id}</span> ${escapeHTML(topic.title)}</h2>
          <p>${escapeHTML(topic.curriculum_role)}</p>
        </div>
        <div class="explorer-topic-header-actions">
          <span>${progress.done}/${progress.total} sessions</span>
          <button type="button" data-view="focus">Focus dependencies</button>
          <a href="${escapeHTML(localURL(topic.url))}">Open Markdown ↗</a>
        </div>`;
      for (const button of this.tabButtons) button.setAttribute("aria-pressed", String(button.dataset.topicTab === this.currentTab));

      const renderers = {
        summary: () => this.renderTopicSummary(topic),
        sessions: () => this.renderTopicSessions(topic),
        papers: () => this.renderTopicPapers(topic),
        resources: () => this.renderTopicResources(topic),
        related: () => this.renderTopicRelated(topic),
      };
      this.topicContent.innerHTML = renderers[this.currentTab]();
      if (this.selectedEntityId) {
        requestAnimationFrame(() => {
          const row = this.topicContent.querySelector(`[data-entity-id="${CSS.escape(this.selectedEntityId)}"]`);
          row?.scrollIntoView({ block: "center", behavior: "smooth" });
          row?.classList.add("is-target");
        });
      }
    }

    showTopicTab(tab, options = {}) {
      this.currentTab = TABS.has(tab) ? tab : "summary";
      this.selectedEntityId = null;
      this.renderTopicWorkspace();
      if (options.history) this.updateURL(options.history);
    }

    renderTopicSummary(topic) {
      const prerequisites = [...(this.incoming.get(topic.id) || [])].sort();
      const dependents = [...(this.outgoing.get(topic.id) || [])].sort();
      return `
        <div class="explorer-topic-summary-grid">
          <section class="explorer-card"><p class="explorer-eyebrow">Scope</p><h3>What this topic covers</h3><p>${escapeHTML(topic.covers)}</p><h4>Explicitly excluded</h4><p>${escapeHTML(topic.excludes)}</p></section>
          <section class="explorer-card"><p class="explorer-eyebrow">Target</p><h3>Competence to develop</h3><p>${escapeHTML(topic.target_competence)}</p><h4>Completion boundary</h4><p>${escapeHTML(topic.completion_boundary)}</p></section>
          <section class="explorer-card"><p class="explorer-eyebrow">Continuity</p><h3>Foundations and dependencies</h3><p>${escapeHTML(topic.foundations.other_topics || "No curriculum-topic prerequisite.")}</p><h4>Topic-local preparation</h4><p>${escapeHTML(topic.foundations.topic_local)}</p></section>
          <section class="explorer-card"><p class="explorer-eyebrow">Connections</p><h3>${prerequisites.length} prerequisites · ${dependents.length} dependents</h3>${this.topicChipList([...new Set([...prerequisites, ...dependents])], "No direct topic connections.")}</section>
        </div>`;
    }

    renderTopicSessions(topic) {
      const completed = this.getProgress();
      const sessions = this.sessionsByTopic.get(topic.id) || [];
      return `
        <div class="explorer-content-intro"><div><h3>Ordered session timeline</h3><p>Mark completed sessions to get useful continuation and readiness recommendations.</p></div><span>${sessions.length} sessions</span></div>
        <div class="explorer-session-list">
          ${sessions.map((session) => `
            <article data-entity-id="${session.id}" class="${completed.has(session.id) ? "is-complete" : ""}">
              <label class="explorer-session-check">
                <input type="checkbox" value="${session.id}" data-session-complete ${completed.has(session.id) ? "checked" : ""}>
                <span class="explorer-sr-only">Mark ${escapeHTML(session.id)} complete</span>
              </label>
              <div class="explorer-session-sequence"><span>S${session.sequence}</span><small>${escapeHTML(session.classification)}</small></div>
              <div>
                <h4>${escapeHTML(session.title)}</h4>
                ${session.stage ? `<p class="explorer-session-stage">${escapeHTML(session.stage)}</p>` : ""}
                <p>${escapeHTML(session.objective)}</p>
                <details><summary>Planned work and completion evidence</summary><p><strong>Component:</strong> ${escapeHTML(session.planned_component || "Not specified.")}</p><p><strong>Completion:</strong> ${escapeHTML(session.completion || "Not specified.")}</p></details>
              </div>
              <div class="explorer-session-materials">
                <span>${session.papers.length} papers</span><span>${session.resources.length} resources</span>
              </div>
            </article>`).join("")}
        </div>`;
    }

    renderTopicPapers(topic) {
      const papers = topic.papers.map((id) => this.paperById.get(id)).filter(Boolean);
      return `
        <div class="explorer-content-intro"><div><h3>Primary paper sequence</h3><p>The durable research lineage assigned to this topic.</p></div><span>${papers.length} papers</span></div>
        <div class="explorer-record-list">
          ${papers.map((paper, index) => `
            <article data-entity-id="${paper.id}">
              <span class="explorer-record-order">${index + 1}</span>
              <div><p class="explorer-eyebrow">${paper.id} · ${escapeHTML([paper.year, paper.venue].filter(Boolean).join(" · "))}</p><h4><a href="${escapeHTML(paper.url)}">${escapeHTML(paper.title)} ↗</a></h4><p>${escapeHTML(paper.authors)}</p><p>${escapeHTML(paper.contribution)}</p><details><summary>Lineage and limitations</summary><p>${escapeHTML(paper.lineage)}</p><p><strong>Positioning limitation:</strong> ${escapeHTML(paper.limitation)}</p></details></div>
            </article>`).join("")}
        </div>`;
    }

    renderTopicResources(topic) {
      const resources = topic.resources.map((id) => this.resourceById.get(id)).filter(Boolean);
      const frontier = this.data.frontier_items.filter((item) => item.topic_ids.includes(topic.id));
      return `
        <div class="explorer-content-intro"><div><h3>Supporting resources</h3><p>Targeted preparation and implementation references, separate from primary papers.</p></div><span>${resources.length} resources</span></div>
        <div class="explorer-record-list">
          ${resources.map((resource, index) => `
            <article data-entity-id="${resource.id}">
              <span class="explorer-record-order">${index + 1}</span>
              <div><p class="explorer-eyebrow">${resource.id} · ${escapeHTML(resource.type)}</p><h4>${resource.url ? `<a href="${escapeHTML(resource.url)}">${escapeHTML(resource.title)} ↗</a>` : escapeHTML(resource.title)}</h4><p>${escapeHTML(resource.role)}</p><small>${escapeHTML(resource.status)} · confidence ${escapeHTML(resource.confidence)}</small></div>
            </article>`).join("") || '<div class="explorer-empty-state"><p>No dedicated supporting resources are assigned.</p></div>'}
        </div>
        ${frontier.length ? `<div class="explorer-content-intro explorer-frontier-heading"><div><h3>Related frontier watchlist</h3><p>Recent candidates to monitor, not durable curriculum commitments.</p></div><span>${frontier.length} items</span></div>
          <div class="explorer-record-list">${frontier.map((item) => `<article data-entity-id="${item.id}"><span class="explorer-record-order">◎</span><div><p class="explorer-eyebrow">${item.id} · ${escapeHTML(item.decision || "Monitor")}</p><h4>${item.url ? `<a href="${escapeHTML(item.url)}">${escapeHTML(item.title)} ↗</a>` : escapeHTML(item.title)}</h4><p>${escapeHTML(item.reason)}</p><small>${escapeHTML(item.maturity)}</small></div></article>`).join("")}</div>` : ""}
      `;
    }

    renderTopicRelated(topic) {
      const prerequisites = [...(this.incoming.get(topic.id) || [])].sort();
      const dependents = [...(this.outgoing.get(topic.id) || [])].sort();
      const crossLinks = Object.entries(topic.cross_topic_links || {});
      const group = (title, subtitle, ids) => `
        <section class="explorer-card"><p class="explorer-eyebrow">${escapeHTML(subtitle)}</p><h3>${escapeHTML(title)}</h3>${this.topicChipList(ids, "None.")}</section>`;
      return `
        <div class="explorer-related-grid">
          ${group("Prerequisites", "Capabilities needed first", prerequisites)}
          ${group("Direct dependents", "Capabilities this topic unlocks", dependents)}
          <section class="explorer-card explorer-related-notes"><p class="explorer-eyebrow">Curriculum interfaces</p><h3>Cross-topic relationships</h3>${crossLinks.map(([label, value]) => `<div><h4>${escapeHTML(label)}</h4><p>${escapeHTML(value)}</p></div>`).join("")}</section>
        </div>`;
    }

    renderTable() {
      if (!this.tableContent || !this.data) return;
      const visible = this.visibleTopicIds();
      const rows = this.data.topics.filter((topic) => visible.has(topic.id));
      this.tableContent.innerHTML = `
        <table>
          <thead><tr><th scope="col">Topic</th><th scope="col">Area</th><th scope="col">Status</th><th scope="col">Depth</th><th scope="col">Sessions</th><th scope="col">Progress</th><th scope="col">Readiness</th><th scope="col"><span class="explorer-sr-only">Actions</span></th></tr></thead>
          <tbody>
            ${rows.map((topic) => {
              const progress = this.topicProgress(topic.id);
              const ready = this.isTopicReady(topic.id);
              return `
                <tr class="progress-${progress.state}">
                  <th scope="row"><button type="button" data-topic-id="${topic.id}" data-open-view="topic"><b>${topic.id}</b><span>${escapeHTML(topic.title)}</span></button></th>
                  <td>${escapeHTML(topic.area_short_label)}</td>
                  <td><span class="explorer-status-badge status-${topic.status_id}">${escapeHTML(topic.status)}</span></td>
                  <td>${topic.rank}</td>
                  <td>${topic.planned_sessions}</td>
                  <td><span class="explorer-table-progress"><i style="width:${progress.total ? progress.done / progress.total * 100 : 0}%"></i></span><small>${progress.done}/${progress.total}</small></td>
                  <td><span class="explorer-readiness ${ready ? "is-ready" : ""}">${ready ? "Ready" : "Prerequisites"}</span></td>
                  <td><a href="${escapeHTML(localURL(topic.url))}" aria-label="Open ${escapeHTML(topic.id)} source document">↗</a></td>
                </tr>`;
            }).join("")}
          </tbody>
        </table>
        ${rows.length ? "" : '<div class="explorer-empty-state"><strong>No topics match these filters.</strong><p>Clear one or more filters to restore the curriculum.</p></div>'}`;
    }

    renderSearchResults() {
      const query = normalise(this.searchInput.value);
      if (!query) {
        this.closeSearch();
        return;
      }
      const tokens = query.split(/\s+/).filter(Boolean);
      const matches = this.searchEntries
        .map((entry) => ({ entry, score: this.searchScore(entry, query, tokens) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
        .slice(0, 12);
      this.searchResults.hidden = false;
      this.searchInput.setAttribute("aria-expanded", "true");
      this.searchResults.innerHTML = matches.length
        ? matches.map(({ entry }, index) => `
            <button type="button" role="option" data-search-index="${index}" data-search-type="${entry.type}" data-search-id="${entry.id}">
              <span class="explorer-search-type">${escapeHTML(entry.type)}</span>
              <span><strong>${escapeHTML(entry.id)} · ${escapeHTML(entry.title)}</strong><small>${escapeHTML(entry.subtitle)}</small></span>
            </button>`).join("")
        : '<div class="explorer-search-empty"><strong>No matching curriculum item</strong><span>Try a topic ID, author, paper title, or concept.</span></div>';
      for (const button of this.searchResults.querySelectorAll("button")) {
        button.addEventListener("click", () => this.openSearchResult(button.dataset.searchType, button.dataset.searchId));
      }
    }

    searchScore(entry, query, tokens) {
      const id = normalise(entry.id);
      const title = normalise(entry.title);
      if (id === query) return 1000;
      if (title === query) return 900;
      let score = id.startsWith(query) ? 250 : title.startsWith(query) ? 180 : 0;
      if (entry.haystack.includes(query)) score += 100;
      for (const token of tokens) if (entry.haystack.includes(token)) score += 18;
      return tokens.every((token) => entry.haystack.includes(token)) ? score : 0;
    }

    handleSearchKeydown(event) {
      if (event.key === "Escape") {
        this.closeSearch();
        this.searchInput.blur();
        return;
      }
      const buttons = [...this.searchResults.querySelectorAll("button")];
      if (!buttons.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        buttons[0].focus();
      } else if (event.key === "Enter") {
        event.preventDefault();
        buttons[0].click();
      }
    }

    openSearchResult(type, id) {
      const entry = this.searchEntries.find((item) => item.type === type && item.id === id);
      if (!entry?.topicId) return;
      this.selectTopic(entry.topicId, { history: false });
      this.selectedEntityId = id;
      this.currentTab = type === "session" ? "sessions" : type === "paper" ? "papers" : type === "resource" || type === "frontier" ? "resources" : "summary";
      this.showView("topic", { history: "push" });
      this.closeSearch();
      this.searchInput.value = "";
    }

    closeSearch() {
      this.searchResults.hidden = true;
      this.searchInput.setAttribute("aria-expanded", "false");
    }

    fitCurrentGraph() {
      this.fitGraph(this.currentView === "focus" ? this.focusCy : this.cy);
    }

    fitGraph(graph) {
      if (!graph) return;
      const visible = graph.elements(":visible");
      if (!visible.length) return;
      requestAnimationFrame(() => {
        graph.stop();
        graph.fit(visible, 44);
      });
    }

    adjustZoom(factor) {
      const graph = this.currentView === "focus" ? this.focusCy : this.cy;
      if (!graph) return;
      const zoom = Math.max(graph.minZoom(), Math.min(graph.maxZoom(), graph.zoom() * factor));
      graph.animate({ zoom, duration: this.prefersReducedMotion() ? 0 : 120 });
    }

    async toggleFullscreen() {
      try {
        if (!document.fullscreenElement) await this.root.requestFullscreen();
        else await document.exitFullscreen();
        requestAnimationFrame(() => {
          this.cy?.resize();
          this.focusCy?.resize();
          this.fitCurrentGraph();
        });
      } catch {
        // Fullscreen is optional; browsers can deny it without breaking navigation.
      }
    }

    toggleMobileFilters() {
      const open = this.root.classList.toggle("is-filters-open");
      this.root.querySelector("[data-filter-toggle]")?.setAttribute("aria-expanded", String(open));
    }

    reset() {
      this.selectedTopicId = null;
      this.selectedEntityId = null;
      this.currentTab = "summary";
      this.focusDirection = "both";
      this.transitiveFocus = true;
      this.searchInput.value = "";
      this.root.classList.remove("is-filters-open");
      this.clearFilters();
      this.cy?.elements().unselect();
      this.updateCompletionStyles();
      this.renderInspector();
      this.showView("overview", { history: "push" });
    }

    restoreURLState() {
      const params = new URLSearchParams(window.location.search);
      const topic = params.get("topic");
      this.selectedTopicId = topic && this.topicById.has(topic.toUpperCase()) ? topic.toUpperCase() : null;
      const view = params.get("view");
      this.currentView = VIEWS.has(view) ? view : "overview";
      if ((this.currentView === "focus" || this.currentView === "topic") && !this.selectedTopicId) this.currentView = "overview";
      const tab = params.get("tab");
      this.currentTab = TABS.has(tab) ? tab : "summary";
      const direction = params.get("direction");
      this.focusDirection = ["prerequisites", "both", "dependents"].includes(direction) ? direction : "both";
      this.transitiveFocus = params.get("paths") !== "direct";
      this.updateCompletionStyles();
    }

    updateURL(mode = "replace") {
      const url = new URL(window.location.href);
      url.search = "";
      if (this.currentView !== "overview") url.searchParams.set("view", this.currentView);
      if (this.selectedTopicId) url.searchParams.set("topic", this.selectedTopicId);
      if (this.currentView === "topic" && this.currentTab !== "summary") url.searchParams.set("tab", this.currentTab);
      if (this.currentView === "focus") {
        if (this.focusDirection !== "both") url.searchParams.set("direction", this.focusDirection);
        if (!this.transitiveFocus) url.searchParams.set("paths", "direct");
      }
      const method = mode === "push" ? "pushState" : "replaceState";
      window.history[method]({}, "", url);
    }

    isDarkTheme() {
      const scheme = document.body.getAttribute("data-md-color-scheme") || document.documentElement.getAttribute("data-md-color-scheme");
      return scheme === "slate" || window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    watchTheme() {
      this.themeObserver = new MutationObserver(() => {
        this.cy?.style(this.graphStyles());
        this.focusCy?.style(this.graphStyles());
        this.updateCompletionStyles();
      });
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-md-color-scheme", "class"] });
      this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme", "class"] });
    }

    prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    destroy() {
      for (const cleanup of this.cleanup) cleanup();
      this.cleanup = [];
      this.themeObserver?.disconnect();
      this.cy?.destroy();
      this.focusCy?.destroy();
      this.root.classList.remove("is-fullscreen");
      document.body.classList.remove("curriculum-explorer-page");
    }
  }

  async function initialiseExplorer() {
    const root = document.getElementById("curriculum-explorer");
    if (!root) {
      activeInstance?.destroy();
      activeInstance = null;
      return;
    }
    if (activeInstance?.root === root) return;
    activeInstance?.destroy();
    try {
      const cytoscape = await loadCytoscape(root.dataset.graphUrl);
      activeInstance = new CurriculumExplorer(root, cytoscape);
      await activeInstance.init();
      window.__curriculumExplorer = activeInstance;
    } catch (error) {
      console.error("Curriculum explorer failed to initialise", error);
      const loading = root.querySelector("[data-explorer-loading]");
      if (loading) {
        loading.hidden = false;
        loading.innerHTML = `<strong>Explorer unavailable.</strong><span>${escapeHTML(error.message)}</span><a href="curriculum_map/">Open the textual curriculum map</a>`;
      }
    }
  }

  if (window.document$?.subscribe) window.document$.subscribe(initialiseExplorer);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialiseExplorer, { once: true });
  else initialiseExplorer();
})();
