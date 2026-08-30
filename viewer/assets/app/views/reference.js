"use strict";

import { html, formatDate } from "../dom.js";
import { icon } from "../ui.js";

const doc = (base, path, title, description) => html`<li style="margin-bottom:.55rem">
  <a href="${base}${path}/" target="_blank" rel="noopener"><strong>${title}</strong> ${icon("external")}</a>
  <span class="small dim" style="display:block">${description}</span>
</li>`;

export default {
  title: () => "Reference — Golem Curriculum",
  render(app) {
    const base = app.referenceBase;
    const provenance = app.model.data.provenance;
    return html`<div class="page page--reading">
      <div class="page-head">
        <h1>Reference</h1>
        <p class="lead">The workspace is a projection. These are the reviewed documents it is projected from — rendered
          with a table of contents, stable anchors and a link to the exact file on GitHub.</p>
      </div>

      <div class="grid-2" style="align-items:start">
        <section class="card">
          <p class="eyebrow">Club methodology</p>
          <h2 class="card-title" style="margin-bottom:.5rem">The highest authority</h2>
          <p class="small muted">Five documents define what the curriculum is for and how it may be changed. They outrank
            the product contract and are byte-for-byte protected by a test.</p>
          <ol style="margin-top:.7rem;padding-left:1.1rem">
            ${doc(base, "1_operating_principles", "Operating principles", "How the club works and what counts as learning.")}
            ${doc(base, "2_research_curriculum_goal", "Curriculum goal", "What competence the curriculum is trying to produce.")}
            ${doc(base, "3_research_curriculum_construction_rules", "Construction rules", "How topics, lineages and sessions may be built.")}
            ${doc(base, "4_topic_planning_guideline", "Topic planning guideline", "The structure every topic plan must follow.")}
            ${doc(base, "5_repo_structure", "Repository structure", "Where durable club artifacts live.")}
          </ol>
        </section>

        <section class="card">
          <p class="eyebrow">Canonical curriculum</p>
          <h2 class="card-title" style="margin-bottom:.5rem">The reviewed source of truth</h2>
          <p class="small muted">Markdown is authoritative. Everything in the workspace is derived from these files.</p>
          <ul style="list-style:none;padding:0;margin-top:.7rem">
            ${doc(base, "curriculum_map", "Curriculum map", "Areas, topics and their primary sequences.")}
            ${doc(base, "curriculum_table", "Curriculum table", "Every topic with status, scope and boundaries.")}
            ${doc(base, "relationships", "Typed relationships", "Each dependency with type, scope, rationale and evidence.")}
            ${doc(base, "paper_index", "Paper index", "All 192 primary papers with full metadata.")}
            ${doc(base, "supporting_materials_index", "Supporting materials", "Textbooks, courses, documentation and tools.")}
            ${doc(base, "frontier_watchlist", "Frontier watchlist", "Candidates under review, with decisions and review dates.")}
          </ul>
        </section>

        <section class="card">
          <p class="eyebrow">Provenance</p>
          <h2 class="card-title" style="margin-bottom:.5rem">What this build is made of</h2>
          <dl class="deflist deflist--inline" style="margin-top:.4rem">
            <div><dt>Curriculum version</dt><dd>${app.model.data.curriculum_version}</dd></div>
            <div><dt>Source revision</dt><dd><code>${app.model.data.source_revision.slice(0, 16)}</code></dd></div>
            <div><dt>Source of truth</dt><dd>${app.model.data.source_of_truth}</dd></div>
            <div><dt>Literature cutoff</dt><dd>${provenance.literature_cutoff}</dd></div>
            <div><dt>Paper verification</dt><dd>${provenance.paper_verification}</dd></div>
            <div><dt>Resource verification</dt><dd>${provenance.resource_verification}</dd></div>
            <div><dt>Frontier verification</dt><dd>${provenance.frontier_verification}</dd></div>
            <div><dt>Next frontier review</dt><dd>${provenance.next_frontier_review}</dd></div>
            <div><dt>Last exhaustive audit</dt><dd>${formatDate(provenance.last_exhaustive_audit)}</dd></div>
            <div><dt>Last maintenance scan</dt><dd>${provenance.last_maintenance_scan ? formatDate(provenance.last_maintenance_scan) : "not yet recorded"}</dd></div>
          </dl>
        </section>

        <section class="card">
          <p class="eyebrow">Governance and maintenance</p>
          <h2 class="card-title" style="margin-bottom:.5rem">How change is controlled</h2>
          <ul style="list-style:none;padding:0;margin-top:.5rem">
            ${doc(base, "product_contract", "Product contract", "What the product must do and must never become.")}
            ${doc(base, "architecture", "Architecture and data contract", "Build boundary, identities, validation.")}
            ${doc(base, "audits/2026-08-27-exhaustive-curriculum-audit", "Exhaustive curriculum audit", "Item-by-item validation of every entity and link.")}
            ${doc(base, "CONTRIBUTING", "Contributing", "How a change becomes canonical.")}
            ${doc(base, "SECURITY", "Security", "Trust boundary and reporting.")}
            ${doc(base, "THIRD_PARTY_NOTICES", "Third-party notices", "Vendored assets and their licences.")}
          </ul>
        </section>
      </div>

      <section class="card" style="margin-top:1.2rem">
        <p class="eyebrow">Counts in this build</p>
        <div class="stat-grid" style="margin-top:.6rem">
          <div class="stat"><span class="stat-value">${app.model.data.statistics.topics}</span><span class="stat-label">Topics</span></div>
          <div class="stat"><span class="stat-value">${app.model.data.statistics.sessions}</span><span class="stat-label">Sessions</span></div>
          <div class="stat"><span class="stat-value">${app.model.data.statistics.papers}</span><span class="stat-label">Primary papers</span></div>
          <div class="stat"><span class="stat-value">${app.model.data.statistics.resources}</span><span class="stat-label">Resources</span></div>
          <div class="stat"><span class="stat-value">${app.model.data.statistics.frontier_items}</span><span class="stat-label">Frontier records</span></div>
          <div class="stat"><span class="stat-value">${app.model.data.statistics.hard_prerequisites}</span><span class="stat-label">Hard prerequisites</span></div>
        </div>
      </section>
    </div>`;
  },
};
