(() => {
  "use strict";



  let activeInstance = null;
  let cytoscapePromise = null;

  const AREA_COLORS = {
    shared_foundations: "#4f7cff",
    perception_world_models: "#13a89e",
    learning_to_act: "#8a5cf6",
    data_research_systems: "#e49335",
    language_embodied_reasoning: "#e25d68",
    specialization_branches: "#718096",
  };

  const STATUS_LABELS = {
    shared_core: "Shared Core",
    active_research_track: "Active Research Track",
    specialization: "Specialization",
    optional: "Optional",
    frontier_watchlist: "Frontier Watchlist",
    deferred: "Deferred",
  };

  const ENTITY_LABELS = {
    topic: "Topic",
    session: "Session",
    paper: "Paper",
    resource: "Resource",
    frontier: "Frontier",
  };

  function loadCytoscape(graphUrlStr) {
    if (!cytoscapePromise) {
      const baseUrl = graphUrlStr ? new URL(graphUrlStr, document.baseURI).href : document.baseURI;
      const cytoscapeUrl = new URL("../vendor/cytoscape-3.33.1.esm.min.js", baseUrl).href;
      cytoscapePromise = import(cytoscapeUrl).then((module) => module.c || module.default);
    }
    return cytoscapePromise;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function compactText(value, limit = 180) {
    const text = String(value ?? "").trim();
    return text.length <= limit ? text : `${text.slice(0, limit - 1).trimEnd()}…`;
  }

  function normalise(value) {
    return String(value ?? "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function entityURL(path) {
    return new URL(path, window.location.href).href;
  }

  function icon(name) {
    const paths = {
      search: '<path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/>',
      fit: '<path d="M8 3H3v5m13-5h5v5M8 21H3v-5m13 5h5v-5"/>',
      reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5"/>',
      fullscreen: '<path d="M8 3H3v5m13-5h5v5M8 21H3v-5m13 5h5v-5"/>',
      graph: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="m7.7 7.1 3.1 8.1m5.5-8.1-3.1 8.1M8 6h8"/>',
      external: '<path d="M14 3h7v7m0-7-9 9"/><path d="M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
      chevron: '<path d="m9 18 6-6-6-6"/>',
      layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
      nodes: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 11 10-5M7 13l10 5"/>',
      minus: '<path d="M5 12h14"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.graph}</svg>`;
  }

  class CurriculumExplorer {
    constructor(root, cytoscape) {
      this.root = root;
      this.cytoscape = cytoscape;
      this.cy = null;
      this.data = null;
      this.currentView = "curriculum";
      this.focusDirection = "both";
      this.selectedTopicId = null;
      this.selectedEntity = null;
      this.expandedMode = null;
      this.transitiveFocus = true;
      this.searchEntries = [];
      this.activeAreas = new Set();
      this.activeStatuses = new Set();
      this.themeObserver = null;
      this.cleanup = [];
      this.boundResize = () => {
        if (this.cy) {
          this.cy.resize();
        }
      };
    }

    async init() {
      document.body.classList.add("curriculum-explorer-page");
      this.cacheDOM();
      this.setLoading("Generating the curriculum graph…");

      const graphURL = new URL(this.root.dataset.graphUrl, document.baseURI);
      const response = await fetch(graphURL, { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`Could not load curriculum_graph.json (${response.status}).`);
      }
      this.data = await response.json();
      this.indexData();
      this.populateSummary();
      this.populateFilters();
      this.createGraph();
      this.bindControls();
      this.renderEmptyDetails();
      this.applyView("curriculum", false);
      this.setLoading(null);
      this.watchTheme();
      window.addEventListener("resize", this.boundResize, { passive: true });
      this.cleanup.push(() => window.removeEventListener("resize", this.boundResize));
    }

    cacheDOM() {
      this.graphContainer = this.root.querySelector("[data-explorer-graph]");
      this.loading = this.root.querySelector("[data-explorer-loading]");
      this.details = this.root.querySelector("[data-explorer-details]");
      this.areaFilters = this.root.querySelector("[data-area-filters]");
      this.statusFilters = this.root.querySelector("[data-status-filters]");
      this.searchInput = this.root.querySelector("[data-explorer-search]");
      this.searchResults = this.root.querySelector("[data-search-results]");
      this.stats = this.root.querySelector("[data-explorer-stats]");
      this.viewButtons = [...this.root.querySelectorAll("[data-view]")];
      this.fitButton = this.root.querySelector("[data-fit]");
      this.resetButton = this.root.querySelector("[data-reset]");
      this.fullscreenButton = this.root.querySelector("[data-fullscreen]");
      this.zoomInButton = this.root.querySelector("[data-zoom-in]");
      this.zoomOutButton = this.root.querySelector("[data-zoom-out]");
      this.transitiveToggle = this.root.querySelector("[data-transitive-focus]");
      this.graphStatus = this.root.querySelector("[data-graph-status]");
    }

    setLoading(message) {
      if (!this.loading) return;
      this.loading.hidden = !message;
      if (message) this.loading.textContent = message;
    }

    indexData() {
      this.topicById = new Map(this.data.topics.map((topic) => [topic.id, topic]));
      this.sessionById = new Map(this.data.sessions.map((session) => [session.id, session]));
      this.paperById = new Map(this.data.papers.map((paper) => [paper.id, paper]));
      this.resourceById = new Map(this.data.resources.map((resource) => [resource.id, resource]));
      this.frontierById = new Map(this.data.frontier_items.map((item) => [item.id, item]));
      this.incoming = new Map(this.data.topics.map((topic) => [topic.id, new Set()]));
      this.outgoing = new Map(this.data.topics.map((topic) => [topic.id, new Set()]));

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
          title: topic.title,
          subtitle: `${topic.area_short_label} · ${topic.status}`,
          topicId: topic.id,
          search: normalise([topic.id, topic.title, topic.covers, topic.target_competence, topic.curriculum_role].join(" ")),
        });
      }
      for (const session of this.data.sessions) {
        entries.push({
          type: "session",
          id: session.id,
          title: session.title,
          subtitle: `${session.topic_id} · ${session.classification}`,
          topicId: session.topic_id,
          search: normalise([session.id, session.title, session.stage, session.objective, session.planned_component].join(" ")),
        });
      }
      for (const paper of this.data.papers) {
        entries.push({
          type: "paper",
          id: paper.id,
          title: paper.title,
          subtitle: `${paper.topic_id || "—"} · ${[paper.authors, paper.year, paper.venue].filter(Boolean).join(" · ")}`,
          topicId: paper.topic_id,
          search: normalise([paper.id, paper.title, paper.authors, paper.year, paper.venue, paper.contribution, paper.lineage].join(" ")),
        });
      }
      for (const resource of this.data.resources) {
        entries.push({
          type: "resource",
          id: resource.id,
          title: resource.title,
          subtitle: `${resource.type} · ${resource.topic_ids.join(", ") || "Cross-topic"}`,
          topicId: resource.topic_ids[0] || null,
          search: normalise([resource.id, resource.title, resource.type, resource.role, resource.topics_raw].join(" ")),
        });
      }
      for (const item of this.data.frontier_items) {
        entries.push({
          type: "frontier",
          id: item.id,
          title: item.title,
          subtitle: `${item.topic_ids.join(", ") || "Cross-topic"} · ${item.decision || "Monitor"}`,
          topicId: item.topic_ids[0] || null,
          search: normalise([item.id, item.title, item.reason, item.maturity, item.related_topics_raw].join(" ")),
        });
      }
      return entries;
    }

    populateSummary() {
      if (!this.stats) return;
      const stats = this.data.statistics;
      const values = [
        [stats.topics, "topics"],
        [stats.sessions, "sessions"],
        [stats.papers, "papers"],
        [stats.resources, "resources"],
        [stats.dependencies, "dependencies"],
      ];
      this.stats.innerHTML = values
        .map(([value, label]) => `<span class="explorer-stat"><strong>${escapeHTML(value)}</strong>${escapeHTML(label)}</span>`)
        .join("");
    }

    populateFilters() {
      this.areaFilters.innerHTML = this.data.areas
        .map((area) => {
          const color = AREA_COLORS[area.id];
          return `
            <label class="explorer-filter-row">
              <input type="checkbox" value="${escapeHTML(area.id)}" checked data-area-filter>
              <span class="explorer-filter-dot" style="--filter-color:${color}"></span>
              <span>${escapeHTML(area.short_label)}</span>
              <small>${area.topic_ids.length}</small>
            </label>`;
        })
        .join("");

      this.statusFilters.innerHTML = this.data.statuses
        .map(
          (status) => `
            <label class="explorer-filter-row">
              <input type="checkbox" value="${escapeHTML(status.id)}" checked data-status-filter>
              <span class="explorer-status-mark explorer-status-${escapeHTML(status.id)}"></span>
              <span>${escapeHTML(status.label)}</span>
              <small>${status.count}</small>
            </label>`,
        )
        .join("");
    }

    graphElements() {
      const elements = [];
      for (const box of this.data.area_boxes) {
        elements.push({
          group: "nodes",
          classes: "area-box",
          data: {
            id: box.id,
            label: box.short_label,
            area_id: box.area_id,
            width: box.width,
            height: box.height,
          },
          position: box.position,
          selectable: false,
          grabbable: false,
        });
      }

      for (const topic of this.data.topics) {
        elements.push({
          group: "nodes",
          classes: `topic status-${topic.status_id}`,
          data: {
            id: `topic:${topic.id}`,
            topic_id: topic.id,
            label: `${topic.id}\n${topic.short_title}`,
            title: topic.title,
            area_id: topic.area_id,
            status_id: topic.status_id,
            status: topic.status,
            paper_count: topic.papers.length,
            session_count: topic.planned_sessions,
          },
          position: topic.positions.curriculum,
        });
      }

      for (const edge of this.data.dependencies) {
        elements.push({
          group: "edges",
          classes: `dependency${edge.cycle ? " feedback-edge" : ""}`,
          data: {
            id: `dependency:${edge.source}:${edge.target}`,
            source: `topic:${edge.source}`,
            target: `topic:${edge.target}`,
            source_topic: edge.source,
            target_topic: edge.target,
            cycle: Boolean(edge.cycle),
          },
        });
      }

      for (const session of this.data.sessions) {
        elements.push({
          group: "nodes",
          classes: "session-global",
          data: {
            id: `session-global:${session.id}`,
            entity_id: session.id,
            topic_id: session.topic_id,
            label: `${session.id}\n${session.title}`,
            area_id: this.topicById.get(session.topic_id)?.area_id,
            status_id: this.topicById.get(session.topic_id)?.status_id,
          },
          position: session.positions?.global_sessions || { x: 0, y: 0 },
        });
      }

      if (this.data.global_session_edges) {
        for (const edge of this.data.global_session_edges) {
          elements.push({
            group: "edges",
            classes: `global-dependency ${edge.type}`,
            data: {
              id: `global-dependency:${edge.source}:${edge.target}`,
              source: `session-global:${edge.source}`,
              target: `session-global:${edge.target}`,
              type: edge.type,
            },
          });
        }
      }

      return elements;
    }

    graphStyles() {
      const dark = this.isDarkTheme();
      const text = dark ? "#f4f7fb" : "#172033";
      const muted = dark ? "#aeb8c7" : "#657089";
      const edge = dark ? "#596579" : "#95a0b4";
      const selected = dark ? "#f8fafc" : "#111827";
      const background = dark ? "#161b24" : "#ffffff";
      const styles = [
        {
          selector: "node.topic",
          style: {
            width: 154,
            height: 68,
            shape: "round-rectangle",
            "background-color": (node) => AREA_COLORS[node.data("area_id")] || "#64748b",
            "background-opacity": dark ? 0.88 : 0.93,
            "border-color": dark ? "#d8e1ee" : "#233047",
            "border-width": 2,
            label: "data(label)",
            color: "#ffffff",
            "font-size": 10.5,
            "font-weight": 600,
            "text-wrap": "wrap",
            "text-max-width": 132,
            "text-valign": "center",
            "text-halign": "center",
            "overlay-opacity": 0,
            "transition-property": "opacity, border-width, border-color, background-opacity",
            "transition-duration": "160ms",
          },
        },
        { selector: "node.topic.status-shared_core", style: { "border-width": 5 } },
        { selector: "node.topic.status-active_research_track", style: { "border-width": 3 } },
        { selector: "node.topic.status-specialization", style: { "border-style": "dashed", "border-width": 3 } },
        { selector: "node.topic.status-optional", style: { "border-style": "dotted", "border-width": 3 } },
        { selector: "node.topic.status-frontier_watchlist", style: { shape: "round-diamond", "border-style": "dashed", "border-width": 3 } },
        { selector: "node.topic.status-deferred", style: { "background-opacity": 0.45, "border-style": "dotted", opacity: 0.7 } },
        {
          selector: "node.area-box",
          style: {
            width: "data(width)",
            height: "data(height)",
            shape: "round-rectangle",
            "background-color": (node) => AREA_COLORS[node.data("area_id")] || "#64748b",
            "background-opacity": dark ? 0.055 : 0.045,
            "border-color": (node) => AREA_COLORS[node.data("area_id")] || "#64748b",
            "border-opacity": 0.35,
            "border-width": 1.5,
            label: "data(label)",
            color: muted,
            "font-size": 17,
            "font-weight": 700,
            "text-valign": "top",
            "text-margin-y": 18,
            "z-index": 0,
            events: "no",
          },
        },
        {
          selector: "edge.dependency",
          style: {
            width: 1.6,
            "line-color": edge,
            "target-arrow-color": edge,
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            "arrow-scale": 0.85,
            opacity: 0.58,
            "overlay-opacity": 0,
            "transition-property": "opacity, width, line-color, target-arrow-color",
            "transition-duration": "150ms",
          },
        },
        {
          selector: "edge.feedback-edge",
          style: {
            "line-style": "dashed",
            "line-color": dark ? "#f0a454" : "#c66c13",
            "target-arrow-color": dark ? "#f0a454" : "#c66c13",
          },
        },
        {
          selector: "node.session",
          style: {
            width: 188,
            height: 58,
            shape: "round-rectangle",
            "background-color": dark ? "#273244" : "#edf2f8",
            "border-color": dark ? "#91a0b7" : "#657089",
            "border-width": 1.5,
            label: "data(label)",
            color: text,
            "font-size": 10,
            "font-weight": 600,
            "text-wrap": "wrap",
            "text-max-width": 168,
            "text-valign": "center",
            "text-halign": "center",
            "overlay-opacity": 0,
          },
        },
        {
          selector: "node.paper",
          style: {
            width: 190,
            height: 62,
            shape: "round-rectangle",
            "background-color": dark ? "#312d45" : "#f2effa",
            "border-color": dark ? "#ad9ee3" : "#7357bd",
            "border-width": 1.5,
            label: "data(label)",
            color: text,
            "font-size": 9.8,
            "font-weight": 600,
            "text-wrap": "wrap",
            "text-max-width": 172,
            "text-valign": "center",
            "text-halign": "center",
            "overlay-opacity": 0,
          },
        },
        {
          selector: "edge.detail-edge",
          style: {
            width: 1.8,
            "line-color": dark ? "#8998ae" : "#718096",
            "target-arrow-color": dark ? "#8998ae" : "#718096",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            "arrow-scale": 0.8,
            opacity: 0.72,
          },
        },
        {
          selector: "node.session-global",
          style: {
            width: 130,
            height: 55,
            shape: "round-rectangle",
            "background-color": (node) => AREA_COLORS[node.data("area_id")] || "#64748b",
            "background-opacity": dark ? 0.8 : 0.9,
            "border-color": dark ? "#d8e1ee" : "#233047",
            "border-width": 1.5,
            label: "data(label)",
            color: "#ffffff",
            "font-size": 9.5,
            "font-weight": 500,
            "text-wrap": "wrap",
            "text-max-width": 115,
            "text-valign": "center",
            "text-halign": "center",
          },
        },
        {
          selector: "edge.global-dependency",
          style: {
            width: 2.5,
            "line-color": edge,
            "target-arrow-color": edge,
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            "arrow-scale": 1.1,
            opacity: 0.8,
          },
        },
        {
          selector: "edge.global-dependency.inter_topic",
          style: {
            "line-style": "dashed",
            "line-dash-pattern": [6, 4],
            opacity: 0.5,
          },
        },
        {
          selector: "node.filtered, edge.filtered",
          style: { display: "none" },
        },{ selector: ".dimmed", style: { opacity: 0.09 } },
        {
          selector: ".neighbour",
          style: {
            opacity: 1,
            "border-width": 4,
            "border-color": selected,
          },
        },
        {
          selector: "edge.neighbour",
          style: {
            opacity: 1,
            width: 3.2,
            "line-color": selected,
            "target-arrow-color": selected,
          },
        },
        {
          selector: ":selected",
          style: {
            "border-width": 5,
            "border-color": dark ? "#ffffff" : "#111827",
            "background-opacity": 1,
            "z-index": 20,
          },
        },
        { selector: "core", style: { "active-bg-color": background, "active-bg-opacity": 0.12 } },
      ];
      return styles;
    }

    createGraph() {
      this.cy = this.cytoscape({
        container: this.graphContainer,
        elements: this.graphElements(),
        style: this.graphStyles(),
        layout: { name: "preset", fit: true, padding: 45 },
        minZoom: 0.18,
        maxZoom: 3.2,
        boxSelectionEnabled: false,
        autoungrabify: false,
        selectionType: "single",
      });

      this.cy.on("tap", "node.topic", (event) => {
        this.selectTopic(event.target.data("topic_id"));
      });
      this.cy.on("dbltap", "node.topic", (event) => {
        this.openTopic(event.target.data("topic_id"));
      });
      this.cy.on("mouseover", "node.topic", (event) => {
        this.highlightNeighbourhood(event.target.data("topic_id"), false);
      });
      this.cy.on("mouseout", "node.topic", () => {
        this.restoreHighlight();
      });
      this.cy.on("tap", "node.session, node.session-global", (event) => {
        const session = this.sessionById.get(event.target.data("entity_id"));
        if (session) this.renderSessionDetails(session);
      });
      this.cy.on("tap", "node.paper", (event) => {
        const paper = this.paperById.get(event.target.data("entity_id"));
        if (paper) this.renderPaperDetails(paper);
      });
      this.cy.on("tap", (event) => {
        if (event.target === this.cy && this.currentView !== "detail") {
          this.clearSelection();
        }
      });
    }

    bindControls() {
      for (const button of this.viewButtons) {
        button.addEventListener("click", () => this.applyView(button.dataset.view));
      }
      this.fitButton?.addEventListener("click", () => this.fitGraph());
      this.resetButton?.addEventListener("click", () => this.resetExplorer());
      this.fullscreenButton?.addEventListener("click", () => this.toggleFullscreen());
      this.zoomInButton?.addEventListener("click", () => this.adjustZoom(1.22));
      this.zoomOutButton?.addEventListener("click", () => this.adjustZoom(0.82));
      this.transitiveToggle?.addEventListener("change", (event) => {
        this.transitiveFocus = event.target.checked;
        if (this.currentView === "focus") this.applyView("focus");
      });

      this.areaFilters.addEventListener("change", () => {
        this.activeAreas = new Set(
          [...this.areaFilters.querySelectorAll("input:checked")].map((input) => input.value),
        );
        this.applyFilters(true);
      });
      this.statusFilters.addEventListener("change", () => {
        this.activeStatuses = new Set(
          [...this.statusFilters.querySelectorAll("input:checked")].map((input) => input.value),
        );
        this.applyFilters(true);
      });

      this.searchInput.addEventListener("input", () => this.renderSearchResults());
      this.searchInput.addEventListener("keydown", (event) => {
        const first = this.searchResults.querySelector("button");
        if (event.key === "Enter" && first) {
          event.preventDefault();
          first.click();
        } else if (event.key === "Escape") {
          this.closeSearchResults();
          this.searchInput.blur();
        }
      });
      document.addEventListener("click", this.handleOutsideSearch = (event) => {
        if (!this.root.querySelector(".explorer-search").contains(event.target)) {
          this.closeSearchResults();
        }
      });
      this.cleanup.push(() => document.removeEventListener("click", this.handleOutsideSearch));

      this.details.addEventListener("click", (event) => {
        const action = event.target.closest("[data-detail-action]");
        if (!action) return;
        const actionName = action.dataset.detailAction;
        const topicId = action.dataset.topicId || this.selectedTopicId;
        if (actionName === "open-topic" && topicId) this.openTopic(topicId);
        if (actionName === "focus-prerequisites" && topicId) this.focusTopic(topicId, "upstream");
        if (actionName === "focus-dependents" && topicId) this.focusTopic(topicId, "downstream");
        if (actionName === "focus-both" && topicId) this.focusTopic(topicId, "both");
        if (actionName === "expand-sessions" && topicId) this.expandSessions(topicId);
        if (actionName === "expand-papers" && topicId) this.expandPapers(topicId);
        if (actionName === "collapse-detail" && topicId) {
          this.removeDetailNodes();
          this.applyView("curriculum");
          this.selectTopic(topicId, false);
        }
        if (actionName === "select-topic" && topicId) this.selectTopic(topicId);
      });

      document.addEventListener("fullscreenchange", this.handleFullscreenChange = () => {
        this.root.classList.toggle("is-fullscreen", document.fullscreenElement === this.root);
        setTimeout(() => {
          this.cy?.resize();
          this.fitGraph();
        }, 120);
      });
      this.cleanup.push(() => document.removeEventListener("fullscreenchange", this.handleFullscreenChange));
    }

    renderSearchResults() {
      const query = normalise(this.searchInput.value).trim();
      if (query.length < 2) {
        this.closeSearchResults();
        return;
      }
      const tokens = query.split(/\s+/).filter(Boolean);
      const matches = this.searchEntries
        .map((entry) => ({ entry, score: this.searchScore(entry, query, tokens) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
        .slice(0, 12);

      if (!matches.length) {
        this.searchResults.innerHTML = '<div class="explorer-search-empty">No matching topics, sessions, papers, or resources.</div>';
      } else {
        this.searchResults.innerHTML = matches
          .map(({ entry }) => `
            <button type="button" data-search-type="${entry.type}" data-search-id="${escapeHTML(entry.id)}">
              <span class="explorer-search-type">${escapeHTML(ENTITY_LABELS[entry.type])}</span>
              <span class="explorer-search-copy">
                <strong>${escapeHTML(entry.id)} · ${escapeHTML(entry.title)}</strong>
                <small>${escapeHTML(entry.subtitle)}</small>
              </span>
              ${icon("chevron")}
            </button>`)
          .join("");
        for (const button of this.searchResults.querySelectorAll("button")) {
          button.addEventListener("click", () => {
            const entry = this.searchEntries.find(
              (candidate) => candidate.type === button.dataset.searchType && candidate.id === button.dataset.searchId,
            );
            if (entry) this.selectSearchEntry(entry);
          });
        }
      }
      this.searchResults.hidden = false;
    }

    searchScore(entry, query, tokens) {
      const id = normalise(entry.id);
      const title = normalise(entry.title);
      if (id === query) return 1000;
      if (title === query) return 900;
      let score = 0;
      if (id.startsWith(query)) score += 500;
      if (title.startsWith(query)) score += 350;
      if (title.includes(query)) score += 240;
      if (entry.search.includes(query)) score += 150;
      if (tokens.every((token) => entry.search.includes(token))) score += 100 + tokens.length * 20;
      return score;
    }

    selectSearchEntry(entry) {
      this.closeSearchResults();
      this.searchInput.value = `${entry.id} — ${entry.title}`;
      if (entry.topicId) this.ensureTopicVisible(entry.topicId);
      if (entry.type === "topic") {
        this.selectTopic(entry.topicId);
      } else if (entry.type === "session") {
        this.selectTopic(entry.topicId, false);
        this.expandSessions(entry.topicId, entry.id);
      } else if (entry.type === "paper") {
        this.selectTopic(entry.topicId, false);
        this.expandPapers(entry.topicId, entry.id);
      } else if (entry.type === "resource") {
        const resource = this.resourceById.get(entry.id);
        if (entry.topicId) this.selectTopic(entry.topicId, false);
        if (resource) this.renderResourceDetails(resource);
      } else if (entry.type === "frontier") {
        const item = this.frontierById.get(entry.id);
        if (entry.topicId) this.selectTopic(entry.topicId, false);
        if (item) this.renderFrontierDetails(item);
      }
    }

    closeSearchResults() {
      this.searchResults.hidden = true;
    }

    ensureTopicVisible(topicId) {
      const topic = this.topicById.get(topicId);
      if (!topic) return;
      this.activeAreas.add(topic.area_id);
      this.activeStatuses.add(topic.status_id);
      const areaInput = this.areaFilters.querySelector(`input[value="${topic.area_id}"]`);
      const statusInput = this.statusFilters.querySelector(`input[value="${topic.status_id}"]`);
      if (areaInput) areaInput.checked = true;
      if (statusInput) statusInput.checked = true;
    }

    applyView(view, animate = true) {
      if (view === "focus" && !this.selectedTopicId) {
        this.setGraphStatus("Select a topic before entering focus view.");
        return;
      }
      if (view !== "detail") this.removeDetailNodes(false);
      this.currentView = view;
      this.updateViewButtons();
      this.applyFilters(false);

      this.cy.stop(true, true);

      if (view === "curriculum" || view === "sequence" || view === "areas" || view === "global-sessions") {
        this.applyPresetPositions(view, animate);
        const labels = {
          curriculum: "Dependency view: arrows point from prerequisite to dependent topic.",
          sequence: "Sequence view: ordered learning path by prerequisite rank.",
          areas: "Area view: topics are grouped by the six curriculum areas.",
          "global-sessions": "Global Sessions view: all sessions ordered topologically.",
        };
        this.setGraphStatus(labels[view]);
      } else if (view === "focus") {
        this.layoutFocus(animate);
        const directionLabel = {
          upstream: "prerequisite path",
          downstream: "dependent topics",
          both: "prerequisites and dependents",
        }[this.focusDirection];
        this.setGraphStatus(`Focus view: ${directionLabel} for ${this.selectedTopicId}.`);
      }
    }

    applyPresetPositions(view, animate) {
      this.cy.batch(() => {
        if (view === "global-sessions") {
          for (const session of this.data.sessions) {
            const node = this.cy.getElementById(`session-global:${session.id}`);
            const position = session.positions?.global_sessions || { x: 0, y: 0 };
            if (animate) node.animate({ position, duration: 380 });
            else node.position(position);
          }
        } else {
          for (const topic of this.data.topics) {
            const node = this.cy.getElementById(`topic:${topic.id}`);
            const position = topic.positions[view] || topic.positions.curriculum;
            node.position(position);
          }
          for (const box of this.data.area_boxes) {
            this.cy.getElementById(box.id).position(box.position);
          }
        }
      });
      if (animate) {
        this.cy.animate({ fit: { eles: this.visibleElements(), padding: 44 }, duration: 420 });
      } else {
        this.fitGraph();
      }
    }

    focusTopic(topicId, direction = "both") {
      this.selectedTopicId = topicId;
      this.focusDirection = direction;
      this.applyView("focus");
      this.selectTopic(topicId, false);
    }

    layoutFocus(animate = true) {
      if (!this.selectedTopicId) return;
      const selected = this.cy.getElementById(`topic:${this.selectedTopicId}`);
      const upstreamDistances = this.graphDistances(this.selectedTopicId, this.incoming);
      const downstreamDistances = this.graphDistances(this.selectedTopicId, this.outgoing);
      const columns = new Map();

      for (const topic of this.data.topics) {
        const node = this.cy.getElementById(`topic:${topic.id}`);
        if (node.hasClass("filtered")) continue;
        let column = 0;
        if (topic.id !== this.selectedTopicId) {
          const up = upstreamDistances.get(topic.id);
          const down = downstreamDistances.get(topic.id);
          if (this.focusDirection === "upstream") column = -(up || 1);
          else if (this.focusDirection === "downstream") column = down || 1;
          else if (up != null && down != null) column = up <= down ? -up : down;
          else if (up != null) column = -up;
          else column = down || 1;
        }
        if (!columns.has(column)) columns.set(column, []);
        columns.get(column).push(topic.id);
      }

      const positionById = new Map();
      for (const [column, ids] of [...columns.entries()].sort((a, b) => a[0] - b[0])) {
        ids.sort((a, b) => {
          const ta = this.topicById.get(a);
          const tb = this.topicById.get(b);
          return ta.area_order - tb.area_order || a.localeCompare(b, undefined, { numeric: true });
        });
        ids.forEach((topicId, index) => {
          positionById.set(topicId, {
            x: 620 + column * 285,
            y: 180 + (index - (ids.length - 1) / 2) * 125,
          });
        });
      }

      this.cy.batch(() => {
        for (const [topicId, position] of positionById) {
          const node = this.cy.getElementById(`topic:${topicId}`);
          if (animate) node.animate({ position, duration: 380 });
          else node.position(position);
        }
      });
      if (animate) {
        this.cy.animate({ fit: { eles: this.visibleElements(), padding: 50 }, duration: 420 });
      }
      selected.select();
    }

    graphDistances(start, adjacency) {
      const distances = new Map();
      const queue = [[start, 0]];
      while (queue.length) {
        const [node, distance] = queue.shift();
        for (const next of adjacency.get(node) || []) {
          if (!distances.has(next)) {
            distances.set(next, distance + 1);
            if (this.transitiveFocus) queue.push([next, distance + 1]);
          }
        }
        if (!this.transitiveFocus) break;
      }
      return distances;
    }


    visibleFocusTopics() {
      if (!this.selectedTopicId) return new Set(this.data.topics.map((topic) => topic.id));
      const result = new Set([this.selectedTopicId]);
      if (this.focusDirection === "upstream" || this.focusDirection === "both") {
        for (const topicId of this.traverse(this.selectedTopicId, this.incoming, this.transitiveFocus)) result.add(topicId);
      }
      if (this.focusDirection === "downstream" || this.focusDirection === "both") {
        for (const topicId of this.traverse(this.selectedTopicId, this.outgoing, this.transitiveFocus)) result.add(topicId);
      }
      return result;
    }

    traverse(start, adjacency, transitive) {
      const result = new Set();
      const queue = [...(adjacency.get(start) || [])];
      while (queue.length) {
        const node = queue.shift();
        if (result.has(node)) continue;
        result.add(node);
        if (transitive) queue.push(...(adjacency.get(node) || []));
      }
      return result;
    }

    applyFilters(refit = true) {
      const focusTopics = this.currentView === "focus" ? this.visibleFocusTopics() : null;
      const detailTopic = this.currentView === "detail" ? this.selectedTopicId : null;

      this.cy.batch(() => {
        for (const topic of this.data.topics) {
          const node = this.cy.getElementById(`topic:${topic.id}`);
          const allowedByFilter = this.activeAreas.has(topic.area_id) && this.activeStatuses.has(topic.status_id);
          const allowedByView = focusTopics
            ? focusTopics.has(topic.id)
            : detailTopic
              ? topic.id === detailTopic
              : true;
          node.toggleClass("filtered", !(allowedByFilter && allowedByView) || this.currentView === "global-sessions");
        }

        for (const edge of this.cy.edges("edge.dependency")) {
          const hidden = edge.source().hasClass("filtered") || edge.target().hasClass("filtered") || this.currentView === "detail" || this.currentView === "global-sessions";
          edge.toggleClass("filtered", hidden);
        }

        for (const box of this.data.area_boxes) {
          const boxNode = this.cy.getElementById(box.id);
          const hasVisibleTopic = this.data.topics.some(
            (topic) => topic.area_id === box.area_id && !this.cy.getElementById(`topic:${topic.id}`).hasClass("filtered"),
          );
          boxNode.toggleClass("filtered", this.currentView !== "areas" || !hasVisibleTopic || this.currentView === "global-sessions");
        }

        for (const session of this.data.sessions) {
          const node = this.cy.getElementById(`session-global:${session.id}`);
          const topic = this.topicById.get(session.topic_id);
          const allowedByFilter = topic && this.activeAreas.has(topic.area_id) && this.activeStatuses.has(topic.status_id);
          node.toggleClass("filtered", !allowedByFilter || this.currentView !== "global-sessions");
        }

        for (const edge of this.cy.edges("edge.global-dependency")) {
          const hidden = edge.source().hasClass("filtered") || edge.target().hasClass("filtered") || this.currentView !== "global-sessions";
          edge.toggleClass("filtered", hidden);
        }
      });

      this.restoreHighlight();
      if (refit) {
        if (this.currentView === "focus") this.layoutFocus();
        else if (this.currentView === "detail") this.layoutDetail();
        else this.fitGraph();
      }
    }

    selectTopic(topicId, center = true) {
      const topic = this.topicById.get(topicId);
      if (!topic) return;
      this.selectedTopicId = topicId;
      this.selectedEntity = { type: "topic", id: topicId };
      this.ensureTopicVisible(topicId);
      this.cy.nodes().unselect();
      const node = this.cy.getElementById(`topic:${topicId}`);
      node.select();
      this.renderTopicDetails(topic);
      this.highlightNeighbourhood(topicId, true);
      if (center && !node.hasClass("filtered")) {
        this.cy.animate({ center: { eles: node }, zoom: Math.max(this.cy.zoom(), 0.75), duration: 280 });
      }
    }

    clearSelection() {
      this.selectedTopicId = null;
      this.selectedEntity = null;
      this.cy.nodes().unselect();
      this.restoreHighlight(true);
      this.renderEmptyDetails();
    }

    highlightNeighbourhood(topicId, persistent) {
      if (!this.cy || this.currentView === "detail") return;
      const node = this.cy.getElementById(`topic:${topicId}`);
      const connectedEdges = node.connectedEdges("edge.dependency:visible");
      const neighbours = connectedEdges.connectedNodes().union(node);
      this.cy.elements(":visible").addClass("dimmed").removeClass("neighbour");
      neighbours.removeClass("dimmed").addClass("neighbour");
      connectedEdges.removeClass("dimmed").addClass("neighbour");
      if (persistent) this.selectedTopicId = topicId;
    }

    restoreHighlight(force = false) {
      if (!this.cy) return;
      this.cy.elements().removeClass("dimmed neighbour");
      if (!force && this.selectedTopicId && this.currentView !== "detail") {
        this.highlightNeighbourhood(this.selectedTopicId, false);
      }
    }

    renderEmptyDetails() {
      this.details.innerHTML = `
        <div class="explorer-empty-state">
          ${icon("nodes")}
          <h3>Select a topic</h3>
          <p>Click a node to inspect its scope, prerequisites, sessions, papers, resources, and links to the detailed timeline.</p>
        </div>`;
    }

    badge(text, className = "") {
      return `<span class="explorer-badge ${className}">${escapeHTML(text)}</span>`;
    }

    topicButton(topicId) {
      const topic = this.topicById.get(topicId);
      if (!topic) return "";
      return `<button type="button" class="explorer-topic-chip" data-detail-action="select-topic" data-topic-id="${topicId}" title="${escapeHTML(topic.title)}">${topicId}</button>`;
    }

    renderTopicDetails(topic) {
      const prerequisites = [...(this.incoming.get(topic.id) || [])].sort();
      const dependents = [...(this.outgoing.get(topic.id) || [])].sort();
      const counts = Object.entries(topic.classification_counts)
        .map(([classification, count]) => `${count} ${classification}`)
        .join(" · ");
      const resources = topic.resources
        .map((id) => this.resourceById.get(id))
        .filter(Boolean)
        .slice(0, 8);

      this.details.innerHTML = `
        <article class="explorer-detail-card">
          <header class="explorer-detail-header">
            <div>
              <span class="explorer-detail-id">${escapeHTML(topic.id)}</span>
              <h2>${escapeHTML(topic.title)}</h2>
            </div>
            <div class="explorer-detail-badges">
              ${this.badge(topic.area_short_label, `area-${topic.area_id}`)}
              ${this.badge(topic.status, `status-${topic.status_id}`)}
            </div>
          </header>

          <div class="explorer-detail-metrics">
            <div><strong>${topic.planned_sessions}</strong><span>Sessions</span></div>
            <div><strong>${topic.papers.length}</strong><span>Papers</span></div>
            <div><strong>${topic.resources.length}</strong><span>Resources</span></div>
          </div>

          <section>
            <h3>Target competence</h3>
            <p>${escapeHTML(topic.target_competence)}</p>
          </section>

          <section>
            <h3>Curriculum role</h3>
            <p>${escapeHTML(topic.curriculum_role)}</p>
          </section>

          <div class="explorer-detail-grid">
            <section>
              <h3>Prerequisites</h3>
              <div class="explorer-chip-list">${prerequisites.length ? prerequisites.map((id) => this.topicButton(id)).join("") : '<span class="explorer-muted">Topic-local or general foundations</span>'}</div>
            </section>
            <section>
              <h3>Enables</h3>
              <div class="explorer-chip-list">${dependents.length ? dependents.map((id) => this.topicButton(id)).join("") : '<span class="explorer-muted">No direct dependent topic</span>'}</div>
            </section>
          </div>

          <section>
            <h3>Completion boundary</h3>
            <p><strong>${escapeHTML(topic.required_core_endpoint || "—")}</strong> · ${escapeHTML(topic.completion_boundary)}</p>
            <p class="explorer-muted">${escapeHTML(counts)}</p>
          </section>

          <section>
            <h3>Topic-local foundation</h3>
            <p>${escapeHTML(topic.foundations.topic_local || "No dedicated topic-local foundation.")}</p>
          </section>

          ${resources.length ? `
          <section>
            <h3>Supporting resources</h3>
            <ul class="explorer-compact-list">
              ${resources.map((resource) => `<li><a href="${escapeHTML(resource.url || "#")}" target="_blank" rel="noopener">${escapeHTML(resource.id)} · ${escapeHTML(resource.title)}</a></li>`).join("")}
            </ul>
          </section>` : ""}

          <div class="explorer-detail-actions">
            <button type="button" class="md-button md-button--primary" data-detail-action="open-topic" data-topic-id="${topic.id}">${icon("external")} Open timeline</button>
            <button type="button" class="md-button" data-detail-action="expand-sessions" data-topic-id="${topic.id}">${icon("layers")} Expand sessions</button>
            <button type="button" class="md-button" data-detail-action="expand-papers" data-topic-id="${topic.id}">${icon("graph")} Show papers</button>
          </div>
          <div class="explorer-focus-actions">
            <button type="button" data-detail-action="focus-prerequisites" data-topic-id="${topic.id}">Prerequisite path</button>
            <button type="button" data-detail-action="focus-dependents" data-topic-id="${topic.id}">Dependents</button>
            <button type="button" data-detail-action="focus-both" data-topic-id="${topic.id}">Both</button>
          </div>
        </article>`;
    }

    renderSessionDetails(session) {
      const topic = this.topicById.get(session.topic_id);
      const papers = session.papers.map((id) => this.paperById.get(id)).filter(Boolean);
      const resources = session.resources.map((id) => this.resourceById.get(id)).filter(Boolean);
      this.details.innerHTML = `
        <article class="explorer-detail-card">
          <header class="explorer-detail-header">
            <div>
              <span class="explorer-detail-id">${escapeHTML(session.id)}</span>
              <h2>${escapeHTML(session.title)}</h2>
            </div>
            ${this.badge(session.classification, `status-${session.classification_id}`)}
          </header>
          <section><h3>Stage</h3><p>${escapeHTML(session.stage || "—")}</p></section>
          <section><h3>Objective</h3><p>${escapeHTML(session.objective)}</p></section>
          <section><h3>Prerequisites</h3><p>${escapeHTML(session.prerequisites)}</p></section>
          <section><h3>Planned component</h3><p>${escapeHTML(session.planned_component)}</p></section>
          <section><h3>Expected capability</h3><p>${escapeHTML(session.completion)}</p></section>
          ${papers.length ? `<section><h3>Papers</h3><ul class="explorer-compact-list">${papers.map((paper) => `<li><a href="${escapeHTML(paper.url)}" target="_blank" rel="noopener">${escapeHTML(paper.id)} · ${escapeHTML(paper.title)}</a></li>`).join("")}</ul></section>` : ""}
          ${resources.length ? `<section><h3>Resources</h3><ul class="explorer-compact-list">${resources.map((resource) => `<li><a href="${escapeHTML(resource.url || "#")}" target="_blank" rel="noopener">${escapeHTML(resource.id)} · ${escapeHTML(resource.title)}</a></li>`).join("")}</ul></section>` : ""}
          <div class="explorer-detail-actions">
            <button type="button" class="md-button md-button--primary" data-detail-action="open-topic" data-topic-id="${topic.id}">${icon("external")} Open topic timeline</button>
            <button type="button" class="md-button" data-detail-action="collapse-detail" data-topic-id="${topic.id}">Back to topic graph</button>
          </div>
        </article>`;
      this.selectedEntity = { type: "session", id: session.id };
      this.cy.nodes().unselect();
      this.cy.getElementById(`session:${session.id}`).select();
    }

    renderPaperDetails(paper) {
      const topic = this.topicById.get(paper.topic_id);
      this.details.innerHTML = `
        <article class="explorer-detail-card">
          <header class="explorer-detail-header">
            <div>
              <span class="explorer-detail-id">${escapeHTML(paper.id)}</span>
              <h2>${escapeHTML(paper.title)}</h2>
            </div>
            ${this.badge(topic?.id || "Paper")}
          </header>
          <section><h3>Metadata</h3><p>${escapeHTML([paper.authors, paper.year, paper.venue].filter(Boolean).join(" · "))}</p></section>
          <section><h3>Contribution</h3><p>${escapeHTML(paper.contribution || "—")}</p></section>
          <section><h3>Lineage</h3><p>${escapeHTML(paper.lineage || "—")}</p></section>
          <section><h3>Positioning limitation</h3><p>${escapeHTML(paper.limitation || "—")}</p></section>
          <div class="explorer-detail-actions">
            <a class="md-button md-button--primary" href="${escapeHTML(paper.url)}" target="_blank" rel="noopener">${icon("external")} Open paper</a>
            ${topic ? `<button type="button" class="md-button" data-detail-action="open-topic" data-topic-id="${topic.id}">Open topic timeline</button>` : ""}
            ${topic ? `<button type="button" class="md-button" data-detail-action="collapse-detail" data-topic-id="${topic.id}">Back to topic graph</button>` : ""}
          </div>
        </article>`;
      this.selectedEntity = { type: "paper", id: paper.id };
      this.cy.nodes().unselect();
      this.cy.getElementById(`paper:${paper.id}`).select();
    }

    renderResourceDetails(resource) {
      this.details.innerHTML = `
        <article class="explorer-detail-card">
          <header class="explorer-detail-header"><div><span class="explorer-detail-id">${escapeHTML(resource.id)}</span><h2>${escapeHTML(resource.title)}</h2></div>${this.badge("Resource")}</header>
          <section><h3>Type</h3><p>${escapeHTML(resource.type)}</p></section>
          <section><h3>Curriculum role</h3><p>${escapeHTML(resource.role)}</p></section>
          <section><h3>Related topics</h3><div class="explorer-chip-list">${resource.topic_ids.map((id) => this.topicButton(id)).join("") || '<span class="explorer-muted">Cross-topic resource</span>'}</div></section>
          <div class="explorer-detail-actions"><a class="md-button md-button--primary" href="${escapeHTML(resource.url || "#")}" target="_blank" rel="noopener">${icon("external")} Open resource</a></div>
        </article>`;
    }

    renderFrontierDetails(item) {
      this.details.innerHTML = `
        <article class="explorer-detail-card">
          <header class="explorer-detail-header"><div><span class="explorer-detail-id">${escapeHTML(item.id)}</span><h2>${escapeHTML(item.title)}</h2></div>${this.badge(item.decision || "Monitor", "status-frontier_watchlist")}</header>
          <section><h3>Why it may matter</h3><p>${escapeHTML(item.reason)}</p></section>
          <section><h3>Maturity / evidence</h3><p>${escapeHTML(item.maturity)}</p></section>
          <section><h3>Related topics</h3><div class="explorer-chip-list">${item.topic_ids.map((id) => this.topicButton(id)).join("") || '<span class="explorer-muted">Cross-topic item</span>'}</div></section>
          <div class="explorer-detail-actions"><a class="md-button md-button--primary" href="${escapeHTML(item.url || "#")}" target="_blank" rel="noopener">${icon("external")} Open source</a></div>
        </article>`;
    }

    expandSessions(topicId, selectedSessionId = null) {
      const topic = this.topicById.get(topicId);
      if (!topic) return;
      this.removeDetailNodes(false);
      this.selectedTopicId = topicId;
      this.expandedMode = "sessions";
      this.currentView = "detail";
      const sessions = this.data.sessions.filter((session) => session.topic_id === topicId).sort((a, b) => a.sequence - b.sequence);
      const elements = [];
      let previous = `topic:${topicId}`;
      for (const session of sessions) {
        const nodeId = `session:${session.id}`;
        elements.push({
          group: "nodes",
          classes: "session detail-node",
          data: {
            id: nodeId,
            entity_id: session.id,
            label: `${session.id}\n${compactText(session.title, 52)}`,
            classification: session.classification,
          },
        });
        elements.push({
          group: "edges",
          classes: "detail-edge detail-node",
          data: { id: `detail-edge:${previous}:${nodeId}`, source: previous, target: nodeId },
        });
        previous = nodeId;
      }
      this.cy.add(elements);
      this.applyFilters(false);
      this.layoutDetail();
      this.updateViewButtons();
      this.setGraphStatus(`${topicId}: ordered session timeline. Select a session for its complete timeline record.`);
      if (selectedSessionId) {
        const session = this.sessionById.get(selectedSessionId);
        if (session) setTimeout(() => this.renderSessionDetails(session), 250);
      } else {
        this.renderTopicDetails(topic);
      }
    }

    expandPapers(topicId, selectedPaperId = null) {
      const topic = this.topicById.get(topicId);
      if (!topic) return;
      this.removeDetailNodes(false);
      this.selectedTopicId = topicId;
      this.expandedMode = "papers";
      this.currentView = "detail";
      const papers = topic.papers.map((id) => this.paperById.get(id)).filter(Boolean);
      const elements = [];
      for (const paper of papers) {
        const nodeId = `paper:${paper.id}`;
        elements.push({
          group: "nodes",
          classes: "paper detail-node",
          data: {
            id: nodeId,
            entity_id: paper.id,
            label: `${paper.id}\n${compactText(paper.title, 56)}`,
          },
        });
        elements.push({
          group: "edges",
          classes: "detail-edge detail-node",
          data: { id: `detail-edge:topic:${topicId}:${paper.id}`, source: `topic:${topicId}`, target: nodeId },
        });
      }
      this.cy.add(elements);
      this.applyFilters(false);
      this.layoutDetail();
      this.updateViewButtons();
      this.setGraphStatus(`${topicId}: primary-paper inventory. Select a paper for metadata and positioning.`);
      if (selectedPaperId) {
        const paper = this.paperById.get(selectedPaperId);
        if (paper) setTimeout(() => this.renderPaperDetails(paper), 250);
      } else {
        this.renderTopicDetails(topic);
      }
    }

    layoutDetail() {
      this.cy.stop(true, true);
      const visible = this.cy.elements(":visible");
      if (!visible.length) return;
      if (this.expandedMode === "sessions") {
        visible.layout({
          name: "breadthfirst",
          directed: true,
          roots: this.cy.getElementById(`topic:${this.selectedTopicId}`),
          direction: "downward",
          spacingFactor: 1.08,
          padding: 52,
          animate: true,
          animationDuration: 420,
          fit: true,
        }).run();
      } else {
        visible.layout({
          name: "concentric",
          concentric: (node) => (node.hasClass("topic") ? 10 : 1),
          levelWidth: () => 1,
          minNodeSpacing: 48,
          padding: 55,
          animate: true,
          animationDuration: 420,
          fit: true,
        }).run();
      }
    }

    removeDetailNodes(resetMode = true) {
      if (!this.cy) return;
      this.cy.elements(".detail-node").remove();
      if (resetMode) this.expandedMode = null;
    }

    openTopic(topicId) {
      const topic = this.topicById.get(topicId);
      if (!topic) return;
      window.location.href = entityURL(topic.url);
    }

    updateViewButtons() {
      for (const button of this.viewButtons) {
        button.classList.toggle("is-active", button.dataset.view === this.currentView);
        button.setAttribute("aria-pressed", String(button.dataset.view === this.currentView));
      }
    }

    fitGraph() {
      const visible = this.visibleElements();
      if (visible.length) this.cy.fit(visible, 44);
    }

    visibleElements() {
      return this.cy.elements(":visible");
    }

    adjustZoom(factor) {
      const zoom = Math.min(this.cy.maxZoom(), Math.max(this.cy.minZoom(), this.cy.zoom() * factor));
      this.cy.animate({ zoom, duration: 150 });
    }

    async toggleFullscreen() {
      if (document.fullscreenElement === this.root) {
        await document.exitFullscreen();
      } else if (this.root.requestFullscreen) {
        await this.root.requestFullscreen();
      }
    }

    resetExplorer() {
      this.removeDetailNodes(false);
      this.currentView = "curriculum";
      this.focusDirection = "both";
      this.selectedTopicId = null;
      this.selectedEntity = null;
      this.expandedMode = null;
      this.activeAreas = new Set(this.data.areas.map((area) => area.id));
      this.activeStatuses = new Set(this.data.statuses.map((status) => status.id));
      for (const input of this.root.querySelectorAll("[data-area-filter], [data-status-filter]")) input.checked = true;
      this.searchInput.value = "";
      this.closeSearchResults();
      this.cy.nodes().unselect();
      this.renderEmptyDetails();
      this.applyView("curriculum");
    }

    setGraphStatus(message) {
      if (this.graphStatus) this.graphStatus.textContent = message;
    }

    isDarkTheme() {
      const scheme = document.body.getAttribute("data-md-color-scheme") || document.documentElement.getAttribute("data-md-color-scheme");
      return scheme === "slate" || document.body.classList.contains("dark");
    }

    watchTheme() {
      const update = () => {
        if (!this.cy) return;
        this.cy.style(this.graphStyles());
      };
      this.themeObserver = new MutationObserver(update);
      this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme", "class"] });
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-md-color-scheme", "class"] });
    }

    destroy() {
      for (const cleanup of this.cleanup) cleanup();
      this.themeObserver?.disconnect();
      this.cy?.destroy();
      document.body.classList.remove("curriculum-explorer-page");
      this.root.dataset.explorerInitialised = "false";
    }
  }

  async function initialiseExplorer() {
    const root = document.getElementById("curriculum-explorer");
    if (!root) {
      if (activeInstance) {
        activeInstance.destroy();
        activeInstance = null;
        window.__curriculumExplorer = null;
      }
      return;
    }
    if (activeInstance && activeInstance.root === root) return;
    if (activeInstance) activeInstance.destroy();

    try {
      const cytoscape = await loadCytoscape(root.dataset.graphUrl);
      const instance = new CurriculumExplorer(root, cytoscape);
      activeInstance = instance;
      await instance.init();
      window.__curriculumExplorer = instance;
    } catch (error) {
      console.error("Curriculum explorer failed to initialise", error);
      const loading = root.querySelector("[data-explorer-loading]");
      if (loading) {
        loading.hidden = false;
        loading.innerHTML = `<strong>Explorer unavailable.</strong><br>${escapeHTML(error.message)}<br><a href="curriculum_map/">Open the curriculum map instead.</a>`;
      }
    }
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(initialiseExplorer);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseExplorer, { once: true });
  } else {
    initialiseExplorer();
  }
})();
