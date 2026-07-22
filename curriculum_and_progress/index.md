---
title: Curriculum Explorer
description: Interactive graph of the Golem Robotics research curriculum.
hide:
  - toc
---

# Curriculum Explorer {: #explorer-title }

<p class="explorer-intro">
Explore topic dependencies, curriculum areas, execution statuses, session timelines, papers, supporting resources, and frontier items. The graph is generated directly from the repository Markdown during every MkDocs build.
</p>

<div id="curriculum-explorer" data-graph-url="assets/data/curriculum_graph.json">
  <div class="explorer-topbar">
    <div class="explorer-search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/></svg>
      <input type="search" autocomplete="off" placeholder="Search topics, sessions, papers, authors, or resources…" aria-label="Search curriculum" data-explorer-search>
      <div class="explorer-search-results" data-search-results hidden></div>
    </div>

    <div class="explorer-view-switcher" role="group" aria-label="Graph view">
      <button type="button" data-view="curriculum" aria-pressed="true">Curriculum</button>
      <button type="button" data-view="sequence" aria-pressed="false">Sequence</button>
      <button type="button" data-view="areas" aria-pressed="false">Areas</button>
      <button type="button" data-view="global-sessions" aria-pressed="false">Global Sessions</button>
      <button type="button" data-view="focus" aria-pressed="false">Focus</button>
    </div>

    <div class="explorer-icon-actions" aria-label="Graph controls">
      <button type="button" title="Zoom in" aria-label="Zoom in" data-zoom-in>+</button>
      <button type="button" title="Zoom out" aria-label="Zoom out" data-zoom-out>−</button>
      <button type="button" title="Fit visible graph" aria-label="Fit visible graph" data-fit>⌗</button>
      <button type="button" title="Reset explorer" aria-label="Reset explorer" data-reset>↺</button>
      <button type="button" title="Fullscreen" aria-label="Open fullscreen" data-fullscreen>⛶</button>
    </div>
  </div>

  <div class="explorer-stats" data-explorer-stats></div>

  <div class="explorer-layout">
    <aside class="explorer-panel" aria-label="Graph filters">
      <h2>Filters</h2>

      <div>
        <h3>Curriculum areas</h3>
        <div class="explorer-filter-list" data-area-filters></div>
      </div>

      <div>
        <h3>Execution status</h3>
        <div class="explorer-filter-list" data-status-filters></div>
      </div>

      <label class="explorer-option-row">
        <input type="checkbox" checked data-transitive-focus>
        <span>Use transitive paths in focus view</span>
      </label>

      <div class="explorer-legend" aria-label="Graph legend">
        <span><i class="explorer-legend-line"></i> Prerequisite → dependent</span>
        <span><i class="explorer-legend-line is-feedback"></i> Mutual/feedback dependency</span>
        <span><b>Thick border</b> Shared Core</span>
        <span><b>Dashed border</b> Specialization/frontier</span>
      </div>
    </aside>

    <section class="explorer-graph-card" aria-label="Interactive curriculum graph">
      <div class="explorer-graph" data-explorer-graph></div>
      <div class="explorer-loading" data-explorer-loading>Loading curriculum graph…</div>
      <footer class="explorer-graph-footer" data-graph-status>
        Dependency view: arrows point from prerequisite to dependent topic.
      </footer>
    </section>

    <aside class="explorer-details-panel" aria-live="polite" data-explorer-details></aside>
  </div>
</div>

<noscript>
The graphical explorer requires JavaScript. Use the [curriculum map](curriculum_map.md), [curriculum table](curriculum_table.md), or [topic timelines](topics/f1_research_evidence_reproducibility_and_empirical_methodology/topic_plan_and_session_timeline.md) instead.
</noscript>
