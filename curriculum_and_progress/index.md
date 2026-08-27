---
title: Curriculum Explorer
description: Navigate the Golem Robotics research curriculum, dependencies, sessions, and reading material.
hide:
  - toc
---

# Curriculum Explorer {: #explorer-title }

<p class="explorer-intro">
Find a starting point, understand topic prerequisites, and open the authoritative curriculum material. Progress is saved only in this browser.
</p>

<div id="curriculum-explorer" data-graph-url="assets/data/curriculum_graph.json">
  <header class="explorer-appbar">
    <div class="explorer-brand" aria-label="Curriculum Explorer">
      <strong>Curriculum Explorer</strong>
      <span data-current-context>Research learning workspace</span>
    </div>

    <nav class="explorer-primary-nav" aria-label="Explorer views">
      <button type="button" data-view="overview" aria-pressed="true">Overview</button>
      <button type="button" data-view="map" aria-pressed="false">Map</button>
      <button type="button" data-view="focus" aria-pressed="false" disabled title="Select a topic first">Focus</button>
      <button type="button" data-view="topic" aria-pressed="false" disabled title="Select a topic first">Topic</button>
      <button type="button" data-view="table" aria-pressed="false">Table</button>
    </nav>

    <div class="explorer-search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/></svg>
      <input type="search" autocomplete="off" placeholder="Search the curriculum…" aria-label="Search topics, sessions, papers, and resources" aria-expanded="false" data-explorer-search>
      <div class="explorer-search-results" role="listbox" data-search-results hidden></div>
    </div>

    <div class="explorer-app-actions">
      <a href="curriculum_map/" class="explorer-docs-link">Docs</a>
      <button type="button" class="explorer-filter-button" aria-expanded="false" aria-controls="explorer-filters" data-filter-toggle>Filters</button>
      <button type="button" class="explorer-icon-button" title="Reset explorer" aria-label="Reset explorer" data-reset>↺</button>
      <button type="button" class="explorer-icon-button" title="Open fullscreen" aria-label="Open fullscreen" data-fullscreen><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M8 21H3v-5m13 5h5v-5"/></svg></button>
    </div>
  </header>

  <div class="explorer-shell">
    <aside class="explorer-sidebar" id="explorer-filters" aria-label="Curriculum filters and legend">
      <div class="explorer-sidebar-heading">
        <h2>Explore</h2>
        <button type="button" data-clear-filters>Clear</button>
      </div>

      <fieldset>
        <legend>Curriculum areas</legend>
        <div class="explorer-filter-list" data-area-filters></div>
      </fieldset>

      <fieldset>
        <legend>Execution status</legend>
        <div class="explorer-filter-list" data-status-filters></div>
      </fieldset>

      <fieldset>
        <legend>Planning</legend>
        <label class="explorer-option-row">
          <input type="checkbox" data-ready-only>
          <span>Show ready topics only</span>
        </label>
      </fieldset>

      <div class="explorer-legend" aria-label="Map legend">
        <h3>Map legend</h3>
        <span><i class="explorer-legend-line"></i> Prerequisite → dependent</span>
        <span><i class="explorer-legend-line is-feedback"></i> Mutual dependency</span>
        <span><i class="explorer-legend-status is-core"></i> Shared core</span>
        <span><i class="explorer-legend-status is-track"></i> Active track</span>
        <span><i class="explorer-legend-status is-specialization"></i> Specialization / optional</span>
      </div>
    </aside>

    <main class="explorer-workspace">
      <section class="explorer-view" data-view-panel="overview" aria-labelledby="overview-heading">
        <div class="explorer-section-heading">
          <div>
            <p class="explorer-eyebrow">Orientation</p>
            <h2 id="overview-heading">Build research capability, one connected topic at a time</h2>
            <p>Start from shared foundations, follow conceptual prerequisites, and use each topic timeline to turn reading into evidence and working skill.</p>
          </div>
          <button type="button" class="md-button md-button--primary" data-overview-map>Explore the map</button>
        </div>
        <div class="explorer-stat-grid" data-explorer-stats></div>
        <div class="explorer-overview-grid">
          <section class="explorer-card explorer-next-card" aria-labelledby="next-heading">
            <div class="explorer-card-heading">
              <div><p class="explorer-eyebrow">Recommended path</p><h3 id="next-heading">What to study next</h3></div>
              <span data-progress-summary></span>
            </div>
            <div data-next-steps></div>
          </section>
          <section class="explorer-card" aria-labelledby="areas-heading">
            <div class="explorer-card-heading"><div><p class="explorer-eyebrow">Curriculum shape</p><h3 id="areas-heading">Six connected areas</h3></div></div>
            <div class="explorer-area-cards" data-area-cards></div>
          </section>
        </div>
        <section class="explorer-card explorer-quick-links" aria-labelledby="quick-heading">
          <div><p class="explorer-eyebrow">Authoritative material</p><h3 id="quick-heading">Browse the source curriculum</h3></div>
          <div>
            <a href="curriculum_map/">Curriculum map</a>
            <a href="curriculum_table/">Curriculum table</a>
            <a href="paper_index/">Paper index</a>
            <a href="supporting_materials_index/">Supporting resources</a>
            <a href="frontier_watchlist/">Frontier watchlist</a>
          </div>
        </section>
      </section>

      <section class="explorer-view explorer-graph-view" data-view-panel="map" aria-label="Curriculum dependency map" hidden>
        <div class="explorer-graph-toolbar">
          <div>
            <strong>Topic dependency map</strong>
            <span>Arrows point from prerequisite to dependent.</span>
          </div>
          <div class="explorer-graph-actions">
            <button type="button" aria-label="Zoom out" title="Zoom out" data-zoom-out>−</button>
            <button type="button" aria-label="Zoom in" title="Zoom in" data-zoom-in>+</button>
            <button type="button" data-fit>Fit map</button>
          </div>
        </div>
        <div class="explorer-graph-wrap">
          <div class="explorer-graph" data-explorer-graph></div>
          <div class="explorer-loading" role="status" data-explorer-loading>Loading curriculum…</div>
        </div>
        <footer class="explorer-graph-footer">
          <label>Keyboard alternative
            <select data-map-topic-select aria-label="Select a visible topic from the map"><option value="">Choose a topic…</option></select>
          </label>
          <span data-graph-status></span>
        </footer>
      </section>

      <section class="explorer-view explorer-graph-view" data-view-panel="focus" aria-label="Selected topic dependency focus" hidden>
        <div class="explorer-graph-toolbar">
          <div><strong data-focus-title>Topic focus</strong><span>Trace the dependencies that explain this topic.</span></div>
          <div class="explorer-focus-controls" role="group" aria-label="Focus controls">
            <button type="button" data-focus-direction="prerequisites" aria-pressed="false">Prerequisites</button>
            <button type="button" data-focus-direction="both" aria-pressed="true">Both</button>
            <button type="button" data-focus-direction="dependents" aria-pressed="false">Dependents</button>
            <label><input type="checkbox" checked data-transitive-focus> Include transitive paths</label>
            <button type="button" data-fit>Fit focus</button>
          </div>
        </div>
        <div class="explorer-graph-wrap"><div class="explorer-graph-mirror" data-focus-graph></div></div>
        <footer class="explorer-graph-footer"><span data-focus-status></span></footer>
      </section>

      <section class="explorer-view explorer-topic-view" data-view-panel="topic" aria-labelledby="topic-workspace-title" hidden>
        <header class="explorer-topic-header" data-topic-header></header>
        <nav class="explorer-topic-tabs" aria-label="Topic detail sections" data-topic-tabs>
          <button type="button" data-topic-tab="summary" aria-pressed="true">Summary</button>
          <button type="button" data-topic-tab="sessions" aria-pressed="false">Sessions</button>
          <button type="button" data-topic-tab="papers" aria-pressed="false">Papers</button>
          <button type="button" data-topic-tab="resources" aria-pressed="false">Resources</button>
          <button type="button" data-topic-tab="related" aria-pressed="false">Related topics</button>
        </nav>
        <div class="explorer-topic-content" data-topic-content></div>
      </section>

      <section class="explorer-view explorer-table-view" data-view-panel="table" aria-labelledby="table-heading" hidden>
        <div class="explorer-section-heading explorer-table-heading">
          <div><p class="explorer-eyebrow">Dense planning view</p><h2 id="table-heading">Complete curriculum table</h2><p>Sort, filter, and open any topic without relying on the graph.</p></div>
        </div>
        <div class="explorer-table-wrap" data-table-content></div>
      </section>
    </main>

    <aside class="explorer-inspector" aria-live="polite" aria-label="Selected topic" data-explorer-details></aside>
  </div>
</div>

<noscript>
The interactive explorer requires JavaScript. Use the [curriculum map](curriculum_map.md), [curriculum table](curriculum_table.md), or [topic timelines](topics/f1_research_evidence_reproducibility_and_empirical_methodology/topic_plan_and_session_timeline.md) instead.
</noscript>
