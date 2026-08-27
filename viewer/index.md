---
title: Golem Robotics Research Curriculum
description: A source-grounded learning workspace for robot learning, embodied intelligence, and physical AI.
hide:
  - toc
---

# Golem Robotics Research Curriculum {: #explorer-title }

<p class="explorer-intro">
A rigorous, paper-driven learning workspace for building research competence in robot learning and embodied intelligence.
</p>

<div id="curriculum-explorer" data-graph-url="assets/data/curriculum_graph.json">
  <header class="app-header">
    <a class="app-brand" href="?view=home" data-route-view="home" aria-label="Golem Curriculum home">
      <span class="app-mark" aria-hidden="true">G</span>
      <span><strong>Golem Curriculum</strong><small>Research learning workspace</small></span>
    </a>

    <nav class="primary-nav" aria-label="Primary navigation">
      <button type="button" data-view="home" aria-pressed="true">Home</button>
      <button type="button" data-view="curriculum" aria-pressed="false">Curriculum</button>
      <button type="button" data-view="library" aria-pressed="false">Library</button>
      <button type="button" data-view="workspace" aria-pressed="false">Workspace</button>
      <button type="button" data-view="reference" aria-pressed="false">Reference</button>
    </nav>

    <div class="global-search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/></svg>
      <input type="search" autocomplete="off" placeholder="Search topics, sessions, papers…" aria-label="Search the curriculum" aria-expanded="false" data-global-search>
      <div class="search-results" role="listbox" data-search-results hidden></div>
    </div>

    <button type="button" class="mobile-nav-toggle" aria-expanded="false" aria-label="Open navigation" data-mobile-nav>Menu</button>
  </header>

  <div class="app-status" role="status" aria-live="polite" data-app-status>Loading the curriculum…</div>

  <div class="app-main">
    <section class="app-view home-view" data-view-panel="home" aria-labelledby="home-title">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Research apprenticeship</p>
          <h2 id="home-title">Know what to learn next—and why.</h2>
          <p class="hero-lead">Build a defensible path through 37 connected topics. Every recommendation traces back to prerequisites, primary sources, and an explicit competence boundary.</p>
          <div class="hero-actions">
            <button type="button" class="button primary" data-start-learning>Start learning</button>
            <button type="button" class="button secondary" data-plan-target>Plan toward a target</button>
          </div>
        </div>
        <aside class="orientation-card" aria-label="Workspace orientation">
          <p class="eyebrow">Your setup</p>
          <label>Learning profile
            <select data-profile-select>
              <option value="guided">Guided</option>
              <option value="accelerated">Accelerated</option>
              <option value="ai_sprint">AI Sprint</option>
            </select>
          </label>
          <label>Target capability
            <select data-target-select><option value="">Explore without a target</option></select>
          </label>
          <p class="muted" data-profile-description></p>
        </aside>
      </div>

      <section class="dashboard-grid">
        <article class="panel next-action-panel">
          <header><div><p class="eyebrow">Next meaningful action</p><h3 data-next-title>Choose a starting point</h3></div><span class="status-pill" data-next-status>Ready</span></header>
          <div data-next-action></div>
        </article>
        <article class="panel resume-panel">
          <header><div><p class="eyebrow">Continuity</p><h3>Resume your work</h3></div></header>
          <div data-resume-card></div>
        </article>
      </section>

      <section class="stat-strip" data-stat-strip aria-label="Curriculum inventory"></section>

      <section class="panel pathway-preview">
        <header><div><p class="eyebrow">Explainable route</p><h3 data-path-heading>Your curriculum journey</h3></div><button type="button" class="text-button" data-open-curriculum>Open curriculum →</button></header>
        <div data-path-preview></div>
      </section>

      <section class="panel provenance-strip" data-provenance-strip></section>
    </section>

    <section class="app-view curriculum-view" data-view-panel="curriculum" aria-labelledby="curriculum-title" hidden>
      <header class="page-heading">
        <div><p class="eyebrow">Canonical learning graph</p><h2 id="curriculum-title">Curriculum</h2><p>Plan from a capability target, then study prerequisites in a defensible order. The graph is available as context—not as the starting point.</p></div>
        <div class="segmented" role="group" aria-label="Curriculum presentation">
          <button type="button" data-curriculum-mode="path" aria-pressed="true">Learning path</button>
          <button type="button" data-curriculum-mode="catalog" aria-pressed="false">Topic catalog</button>
          <button type="button" data-curriculum-mode="map" aria-pressed="false">Relationship map</button>
        </div>
      </header>

      <div class="curriculum-toolbar">
        <label>Target
          <select data-target-select><option value="">Complete curriculum journey</option></select>
        </label>
        <label>Profile
          <select data-profile-select>
            <option value="guided">Guided</option>
            <option value="accelerated">Accelerated</option>
            <option value="ai_sprint">AI Sprint</option>
          </select>
        </label>
        <label>Area
          <select data-area-filter><option value="">All areas</option></select>
        </label>
        <label class="check-label"><input type="checkbox" data-ready-filter> Ready now</label>
      </div>

      <div data-curriculum-panel="path">
        <section class="completion-key" data-completion-key></section>
        <div class="learning-path" data-learning-path></div>
      </div>
      <div data-curriculum-panel="catalog" hidden>
        <div class="topic-catalog" data-topic-catalog></div>
      </div>
      <div data-curriculum-panel="map" hidden>
        <div class="map-toolbar"><p><strong>Relationship map</strong><br><span>Solid arrows block; dashed arrows are recommended; feedback never blocks. <span data-map-count></span></span></p><label>Detail<select data-map-scope><option value="overview">Overview</option><option value="hard">All hard gates</option><option value="all">All relationships</option></select></label><div><button type="button" aria-label="Zoom out" data-map-zoom="out">−</button><button type="button" aria-label="Zoom in" data-map-zoom="in">+</button><button type="button" data-map-fit>Fit</button></div></div>
        <div class="curriculum-map" data-curriculum-map></div>
        <label class="map-alternative">Keyboard alternative: <select data-map-topic-select><option value="">Choose a topic…</option></select></label>
      </div>
    </section>

    <section class="app-view library-view" data-view-panel="library" aria-labelledby="library-title" hidden>
      <header class="page-heading">
        <div><p class="eyebrow">Source-grounded library</p><h2 id="library-title">Library</h2><p>Browse primary papers, supporting resources, and frontier records without losing their curriculum context.</p></div>
      </header>
      <div class="library-toolbar">
        <div class="segmented" role="group" aria-label="Library collection">
          <button type="button" data-library-kind="papers" aria-pressed="true">Papers <span data-paper-count></span></button>
          <button type="button" data-library-kind="resources" aria-pressed="false">Resources <span data-resource-count></span></button>
          <button type="button" data-library-kind="frontier" aria-pressed="false">Frontier <span data-frontier-count></span></button>
        </div>
        <input type="search" placeholder="Filter this collection…" aria-label="Filter library" data-library-search>
        <select aria-label="Filter library by topic" data-library-topic><option value="">All topics</option></select>
      </div>
      <div class="library-grid" data-library-content></div>
    </section>

    <section class="app-view workspace-view" data-view-panel="workspace" aria-labelledby="workspace-title" hidden>
      <header class="page-heading">
        <div><p class="eyebrow">Private, durable, portable</p><h2 id="workspace-title">Workspace</h2><p>Your personal overlay is stored in IndexedDB. It never rewrites canonical curriculum data.</p></div>
        <span class="storage-badge" data-storage-badge>Checking storage…</span>
      </header>

      <div class="workspace-grid">
        <section class="panel workspace-progress"><header><div><p class="eyebrow">Learning state</p><h3>Progress and competence</h3></div></header><div data-workspace-progress></div></section>
        <section class="panel workspace-route"><header><div><p class="eyebrow">Personal route</p><h3>Ordering and exclusions</h3></div></header><div data-custom-route></div></section>
      </div>

      <section class="panel personal-additions">
        <header><div><p class="eyebrow">Clearly personal</p><h3>Custom sessions and materials</h3></div><span class="origin-badge personal">Personal overlay</span></header>
        <form class="addition-form" data-addition-form>
          <input type="hidden" name="itemId">
          <label>Type<select name="kind"><option value="session">Custom session</option><option value="material">Added material</option></select></label>
          <label>Title<input name="title" required maxlength="180"></label>
          <label>Topic<select name="topicId" required></select></label>
          <label class="wide">Purpose or objective<textarea name="objective" rows="2" required maxlength="4000"></textarea></label>
          <label class="wide">Source URL or expected artifact<input name="source" maxlength="2048" placeholder="https://… or a concrete artifact"></label>
          <div class="form-actions wide"><button type="submit" class="button primary">Save personal item</button><button type="button" class="button secondary" data-cancel-edit hidden>Cancel edit</button></div>
        </form>
        <div data-personal-items></div>
      </section>

      <section class="panel bundle-panel">
        <header><div><p class="eyebrow">Recovery and portability</p><h3>Workspace Bundle</h3></div><span data-bundle-status role="status" aria-live="polite"></span></header>
        <p>Export progress, notes, custom paths, additions, disabled items, source revision, and optionally private attachments. Unknown IDs are archived during import instead of discarded. Bundles are plaintext private files; import only bundles you created or trust.</p>
        <p class="muted">Browser storage is origin-scoped. On the default GitHub Pages host, other GOLEM-Robotics project sites share the <code>golem-robotics.github.io</code> origin and must be treated as part of the same trust boundary.</p>
        <div class="bundle-actions">
          <label class="check-label"><input type="checkbox" data-include-attachments> Include attachments</label>
          <button type="button" class="button primary" data-export-bundle>Export bundle</button>
          <button type="button" class="button secondary" data-import-bundle>Import bundle</button>
          <input type="file" accept="application/json,.json" data-bundle-input hidden>
          <button type="button" class="text-button danger" data-reset-workspace>Reset personal workspace</button>
        </div>
        <div data-orphan-archive></div>
      </section>

      <section class="panel proposal-panel">
        <header><div><p class="eyebrow">Safe publication fallback</p><h3>Prepare a curriculum proposal</h3></div><span class="origin-badge canonical">No repository credentials</span></header>
        <p>Package selected personal additions as a reviewable Markdown proposal. Publishing remains a deliberate pull-request workflow.</p>
        <label>Proposal context<textarea rows="3" data-proposal-context placeholder="Why should this become part of the canonical curriculum?"></textarea></label>
        <button type="button" class="button secondary" data-export-proposal>Download proposal bundle</button>
      </section>
    </section>

    <section class="app-view reference-view" data-view-panel="reference" aria-labelledby="reference-title" hidden>
      <header class="page-heading"><div><p class="eyebrow">Source and governance</p><h2 id="reference-title">Reference</h2><p>Inspect the exact methodology, canonical records, provenance, and maintenance boundaries behind the product.</p></div></header>
      <div class="reference-grid">
        <section class="panel"><h3>Club methodology</h3><p>The five reviewed framework documents remain the highest-level authority.</p><ol class="reference-links"><li><a href="1_operating_principles/">Operating principles</a></li><li><a href="2_research_curriculum_goal/">Curriculum goal</a></li><li><a href="3_research_curriculum_construction_rules/">Construction rules</a></li><li><a href="4_topic_planning_guideline/">Topic planning guideline</a></li><li><a href="5_repo_structure/">Repository structure</a></li></ol></section>
        <section class="panel"><h3>Canonical curriculum</h3><ul class="reference-links"><li><a href="curriculum_map/">Curriculum map</a></li><li><a href="curriculum_table/">Curriculum table</a></li><li><a href="relationships/">Typed relationships</a></li><li><a href="paper_index/">Paper index</a></li><li><a href="supporting_materials_index/">Supporting resources</a></li><li><a href="frontier_watchlist/">Frontier watchlist</a></li></ul></section>
        <section class="panel"><h3>Provenance</h3><dl class="metadata-list" data-provenance-detail></dl></section>
        <section class="panel"><h3>Maintenance</h3><div data-maintenance-detail></div><p><a href="audits/2026-08-27-exhaustive-curriculum-audit/">Read the exhaustive audit →</a></p><p><a href="architecture/">System architecture and data contract →</a></p></section>
      </div>
    </section>

    <section class="app-view topic-view" data-view-panel="topic" aria-labelledby="topic-title" hidden>
      <nav class="breadcrumbs" aria-label="Breadcrumb"><button type="button" data-view="curriculum">Curriculum</button><span>›</span><span data-topic-crumb></span></nav>
      <header class="topic-header" data-topic-header></header>
      <nav class="topic-tabs" aria-label="Topic sections">
        <button type="button" data-topic-tab="summary" aria-pressed="true">Summary</button>
        <button type="button" data-topic-tab="path" aria-pressed="false">Learning path</button>
        <button type="button" data-topic-tab="sessions" aria-pressed="false">Sessions</button>
        <button type="button" data-topic-tab="papers" aria-pressed="false">Papers</button>
        <button type="button" data-topic-tab="resources" aria-pressed="false">Resources</button>
        <button type="button" data-topic-tab="connections" aria-pressed="false">Connections</button>
        <button type="button" data-topic-tab="notes" aria-pressed="false">Notes</button>
        <button type="button" data-topic-tab="history" aria-pressed="false">Revision history</button>
      </nav>
      <div class="topic-content" data-topic-content></div>
    </section>

    <section class="app-view session-view" data-view-panel="session" aria-labelledby="session-title" hidden>
      <nav class="breadcrumbs" aria-label="Breadcrumb"><button type="button" data-view="curriculum">Curriculum</button><span>›</span><button type="button" data-session-topic-link></button><span>›</span><span data-session-crumb></span></nav>
      <header class="session-header" data-session-header></header>
      <div class="session-layout">
        <article class="session-main" data-session-content></article>
        <aside class="session-side" data-session-side></aside>
      </div>
    </section>
  </div>
</div>

<noscript>
The learning workspace requires JavaScript. The complete canonical curriculum remains available through the [curriculum map](curriculum_map.md), [curriculum table](curriculum_table.md), and [paper index](paper_index.md).
</noscript>
