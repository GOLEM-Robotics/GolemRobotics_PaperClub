"use strict";

const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs/promises");
const { chromium } = require("playwright-core");

const baseURL = process.env.BASE_URL || "http://127.0.0.1:8001";
const executablePath = process.env.CHROME_PATH || "/usr/bin/google-chrome";
let browser;

async function waitForApp(page) {
  await page.waitForFunction(() => window.__curriculumExplorer?.data?.sessions?.length === 400);
  await page.waitForFunction(() => !document.querySelector("[data-view-panel='home']").hidden || window.__curriculumExplorer.currentView !== "home");
}

function collectErrors(page, errors) {
  const appOrigin = new URL(baseURL).origin;
  const expectations = { offlineFailures: false };
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (expectations.offlineFailures && message.text().includes("ERR_INTERNET_DISCONNECTED")) return;
    errors.push(`console: ${message.text()}`);
  });
  page.on("requestfailed", (request) => {
    const url = request.url();
    if (!url.startsWith("http://127.0.0.1") && !url.startsWith(baseURL)) return;
    if (expectations.offlineFailures && request.failure()?.errorText === "net::ERR_INTERNET_DISCONNECTED") return;
    errors.push(`request: ${url} — ${request.failure()?.errorText}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`response: ${response.status()} ${response.url()}`);
  });
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.origin !== appOrigin) {
      errors.push(`third-party request: ${request.url()}`);
    }
  });
  return expectations;
}

async function openBySearch(page, query, kind, id) {
  await page.locator("[data-global-search]").fill(query);
  const result = page.locator(`[data-search-kind="${kind}"][data-search-id="${id}"]`);
  await result.waitFor();
  await result.click();
}

async function assertNoHorizontalOverflow(page) {
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    true,
    `horizontal overflow at ${await page.evaluate(() => window.innerWidth)}px`,
  );
}

async function runMainJourney(errors) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const untrustedAttachmentRequests = [];
  page.on("request", (request) => {
    if (request.url().startsWith("https://bundle-attachment.invalid/")) untrustedAttachmentRequests.push(request.url());
  });
  const errorExpectations = collectErrors(page, errors);
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(page);

  // First visit and the learner-first information architecture.
  assert.equal(await page.locator("[data-view-panel='home']").isVisible(), true);
  assert.deepEqual(
    await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
      const root = document.querySelector("#curriculum-explorer");
      const isVisible = (node) => !node.closest("[hidden]") && getComputedStyle(node).display !== "none";
      const unlabeledControls = [...root.querySelectorAll("input, select, textarea")]
        .filter((node) => isVisible(node) && node.type !== "hidden" && !node.labels?.length && !node.getAttribute("aria-label"))
        .map((node) => node.outerHTML.slice(0, 160));
      const unnamedButtons = [...root.querySelectorAll("button")]
        .filter((node) => isVisible(node) && !node.innerText.trim() && !node.getAttribute("aria-label") && !node.title)
        .map((node) => node.outerHTML.slice(0, 160));
      return {
        duplicateIds: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
        mainLandmarks: document.querySelectorAll("main").length,
        unlabeledControls,
        unnamedButtons,
      };
    }),
    { duplicateIds: [], mainLandmarks: 1, unlabeledControls: [], unnamedButtons: [] },
  );
  assert.deepEqual(
    await page.locator(".primary-nav [data-view]").allTextContents(),
    ["Home", "Curriculum", "Library", "Workspace", "Reference"],
  );
  assert.match(await page.locator("[data-next-title]").innerText(), /F1-S01|F2-S01|F6-S01|L1-S01/);
  assert.equal(await page.locator("[data-alternative-actions] li").count(), 2);
  assert.match(await page.locator("[data-home-blockers]").innerText(), /Needs/);
  assert.match(await page.locator("[data-home-core-progress]").innerText(), /Required Core sessions completed/);
  assert.match(await page.locator("[data-home-frontier]").innerText(), /review/i);
  assert.equal(await page.locator("[data-stat-strip] article").count(), 4);
  assert.deepEqual(
    await page.evaluate(() => window.__curriculumExplorer.data.statistics),
    {
      topics: 37,
      sessions: 400,
      papers: 192,
      resources: 41,
      frontier_items: 12,
      dependencies: 255,
      hard_prerequisites: 187,
      relationship_types: {
        feedback: 2,
        hard_prerequisite: 187,
        recommended_background: 50,
        related: 16,
      },
    },
  );

  // Target planning and learning profiles alter traversal without rewriting history.
  await page.locator("[data-view-panel='home'] [data-profile-select]").selectOption("accelerated");
  await page.locator("[data-view-panel='home'] [data-target-select]").selectOption("E2");
  await page.waitForFunction(() => window.__curriculumExplorer.state.profile === "accelerated"
    && window.__curriculumExplorer.state.targetTopicId === "E2");
  assert.match(await page.locator("[data-path-heading]").innerText(), /E2/);
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.state.profile),
    "accelerated",
  );
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.state.targetTopicId),
    "E2",
  );

  await page.locator(".primary-nav [data-view='curriculum']").click();
  assert.match(page.url(), /view=curriculum/);
  assert.equal(await page.locator(".page-heading-links a").count(), 2);
  assert.match(await page.locator(".page-heading-links").innerText(), /Curriculum matrix/);
  assert.match(await page.locator(".page-heading-links").innerText(), /Area overview/);
  assert.match(await page.locator("[data-learning-path]").innerText(), /Why here:/);
  await page.locator("[data-curriculum-mode='map']").click();
  await page.waitForFunction(() => window.__curriculumExplorer.cy?.nodes().length === 37);
  assert.deepEqual(
    await page.evaluate(() => ({
      nodes: window.__curriculumExplorer.cy.nodes().length,
      edges: window.__curriculumExplorer.cy.edges().length,
    })),
    { nodes: 37, edges: 255 },
  );
  assert.equal(await page.evaluate(() => window.__curriculumExplorer.cy.edges().filter((edge) => edge.visible()).length), 74);
  await page.locator("[data-map-scope]").selectOption("all");
  assert.equal(await page.evaluate(() => window.__curriculumExplorer.cy.edges().filter((edge) => edge.visible()).length), 255);

  // Topic → session → paper → browser back/forward, including stable alias deep links.
  await page.goto(`${baseURL}/?view=topic&topic=F3&tab=sessions`, { waitUntil: "networkidle" });
  await waitForApp(page);
  assert.match(await page.locator("[data-topic-header]").innerText(), /F3/);
  assert.match(await page.locator("[data-topic-header]").innerText(), /Required Core/);
  assert.match(await page.locator("[data-topic-header]").innerText(), /Continuation/);
  assert.match(await page.locator("[data-topic-header]").innerText(), /My competence/);
  assert.match(await page.locator("[data-topic-header]").innerText(), /Estimated remaining effort/i);
  assert.match(await page.locator("[data-topic-header]").innerText(), /Prerequisites/i);
  assert.match(await page.locator("[data-topic-header]").innerText(), /Downstream/i);
  assert.equal(await page.locator("[data-topic-header] [data-plan-fastest]").count(), 1);
  assert.equal(await page.locator("[data-topic-header] a").filter({ hasText: "Canonical source" }).count(), 1);
  assert.equal(await page.locator("[data-topic-tab='sessions']").getAttribute("aria-pressed"), "true");
  await page.locator('[data-entity-id="SES-220A3F0A-B416-5E1B-AC37-685EA460EE0D"] [data-open-session]').first().click();
  assert.match(page.url(), /view=session/);
  assert.match(await page.locator("[data-session-header]").innerText(), /Attention Is All You Need/);
  assert.match(await page.locator("[data-session-content]").innerText(), /Hard prerequisites/);
  assert.match(await page.locator("[data-session-content]").innerText(), /Why assigned/);
  assert.match(await page.locator("[data-session-content]").innerText(), /Sections \/ preparation/);
  assert.match(await page.locator("[data-session-content]").innerText(), /Project \/ code/);
  assert.match(await page.locator("[data-session-content]").innerText(), /Expected duration/i);
  assert.match(await page.locator("[data-session-content]").innerText(), /Skipped \/ compressed/i);
  assert.equal(await page.locator("[data-session-content] .prompt-grid article").count(), 6);
  const generatedPrompt = await page.evaluate(() => window.__curriculumExplorer.currentPrompts[0].prompt);
  assert.match(generatedPrompt, /stable SES-/);
  assert.match(generatedPrompt, /Desired time budget/);
  assert.match(generatedPrompt, /Canonical sources:/);
  assert.equal(await page.locator("[data-session-content] .prompt-grid details").count(), 6);
  assert.equal(await page.locator("[data-session-side] [data-add-reference]").count(), 1);
  assert.equal(await page.locator("[data-session-side] [data-delete-personal]").count(), 0);

  await openBySearch(page, "P010", "paper", "P010");
  assert.equal(await page.locator("[data-view-panel='library']").isVisible(), true);
  await page.locator('[data-entity-id="P010"]').waitFor();
  assert.match(await page.locator('[data-entity-id="P010"]').innerText(), /Attention Is All You Need/);
  await page.goBack();
  await page.waitForFunction(() => window.__curriculumExplorer.currentView === "session");
  assert.equal(await page.locator("[data-view-panel='session']").isVisible(), true);
  await page.goForward();
  await page.waitForFunction(() => window.__curriculumExplorer.currentView === "library");
  assert.equal(await page.locator("[data-view-panel='library']").isVisible(), true);

  await page.goto(`${baseURL}/?view=session&session=F3-S03`, { waitUntil: "networkidle" });
  await waitForApp(page);
  assert.match(await page.locator("[data-session-header]").innerText(), /Attention Is All You Need/);
  assert.match(page.url(), /session=SES-220A3F0A-B416-5E1B-AC37-685EA460EE0D/);
  await page.reload({ waitUntil: "networkidle" });
  await waitForApp(page);
  assert.match(await page.locator("[data-session-header]").innerText(), /Attention Is All You Need/);

  // Independent handling status, Sprint coverage, competence evidence, notes, and artifacts.
  await page.locator("[data-session-header] [data-session-status]").selectOption("in_progress");
  await page.locator("[data-session-content] [data-note-id]").fill("Reconstructed scaled dot-product attention; verify masking ablation.");
  await page.locator("[data-attachment-input]").setInputFiles({
    name: "attention-notes.md",
    mimeType: "text/markdown",
    buffer: Buffer.from("# Attention reconstruction\n"),
  });
  await page.locator("[data-attachment-list]").getByText("attention-notes.md").waitFor();
  await page.waitForTimeout(400);
  await page.reload({ waitUntil: "networkidle" });
  await waitForApp(page);
  assert.equal(await page.locator("[data-session-header] [data-session-status]").inputValue(), "in_progress");
  assert.match(await page.locator("[data-session-content] [data-note-id]").inputValue(), /masking ablation/);
  await page.locator("[data-session-header] [data-session-status]").selectOption("completed");
  await page.locator("[data-sprint-covered]").check();
  assert.equal(
    await page.evaluate(() => {
      const app = window.__curriculumExplorer;
      return app.isDone(app.currentSessionId) && app.state.sprintCovered.includes(app.currentSessionId)
        && !app.state.competenceValidated.includes("F3");
    }),
    true,
  );
  page.once("dialog", (dialog) => dialog.accept("Explained the architecture and reconstructed the attention equations."));
  await page.locator("[data-validate-topic='F3']").click();
  assert.equal(
    await page.evaluate(() => {
      const metrics = window.__curriculumExplorer.topicMetrics("F3");
      return metrics.validated && metrics.readinessSatisfied && !metrics.coreComplete;
    }),
    true,
  );
  await page.locator("[data-session-topic-link]").click();
  assert.match(await page.locator("[data-topic-content]").innerText(), /Required Core complete\s+13%/);
  assert.match(await page.locator("[data-topic-content]").innerText(), /Validated competence\s+Yes/);
  await page.locator(".primary-nav [data-view='home']").click();
  await page.locator("[data-view-panel='home'] [data-profile-select]").selectOption("guided");
  assert.equal(
    await page.evaluate(() => {
      const app = window.__curriculumExplorer;
      return app.statusOf("SES-220A3F0A-B416-5E1B-AC37-685EA460EE0D");
    }),
    "completed",
  );

  // Canonical session hiding is reversible and never exposes deletion.
  await page.goto(`${baseURL}/?view=session&session=F3-S03`, { waitUntil: "networkidle" });
  await waitForApp(page);
  await page.locator("[data-session-side] [data-toggle-disabled]").click();
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.state.disabledIds.includes(window.__curriculumExplorer.currentSessionId)),
    true,
  );
  await page.waitForFunction(() => document.querySelector("[data-session-side]")?.textContent.includes("Disabled personally"));
  assert.match(await page.locator("[data-session-side]").innerText(), /Disabled personally/);
  await page.locator(".primary-nav [data-view='workspace']").click();
  const disabledSession = page.locator("[data-disabled-items] li").filter({ hasText: "F3-S03" });
  await disabledSession.waitFor();
  assert.match(await disabledSession.innerText(), /Session/i);
  await disabledSession.locator("[data-toggle-disabled]").click();
  await page.waitForFunction(() => !window.__curriculumExplorer.state.disabledIds.includes(window.__curriculumExplorer.currentSessionId));
  await page.waitForFunction(() => document.querySelector("[data-disabled-items]")?.textContent.includes("No disabled items"));
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.state.disabledIds.includes(window.__curriculumExplorer.currentSessionId)),
    false,
  );

  // Optional and frontier work is opt-in and independent of completion.
  await page.goto(`${baseURL}/?view=session&session=F3-S09`, { waitUntil: "networkidle" });
  await waitForApp(page);
  assert.match(await page.locator("[data-session-side]").innerText(), /Available, not activated/);
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.topicMetrics("F3").activatedTotal),
    8,
  );
  await page.locator("[data-session-side] [data-toggle-activation]").click();
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.topicMetrics("F3").activatedTotal),
    9,
  );
  await page.locator("[data-session-side] [data-toggle-activation]").click();
  assert.equal(
    await page.evaluate(() => window.__curriculumExplorer.topicMetrics("F3").activatedTotal),
    8,
  );

  // Library browsing, filters, zero results, and reversible reference hiding.
  await page.locator(".primary-nav [data-view='library']").click();
  await page.locator("[data-library-search]").fill("no-record-can-match-this");
  assert.match(await page.locator("[data-library-content]").innerText(), /No matching records/);
  await page.locator("[data-library-search]").fill("P010");
  const paperCard = page.locator('[data-entity-id="P010"]');
  await paperCard.locator("[data-toggle-disabled]").click();
  await page.waitForFunction(() => window.__curriculumExplorer.state.disabledIds.includes("P010"));
  await page.waitForFunction(() => document.querySelector('[data-entity-id="P010"]')?.classList.contains("disabled"));
  assert.equal(await paperCard.evaluate((node) => node.classList.contains("disabled")), true);
  assert.equal(await paperCard.locator("a").isVisible(), true);
  assert.equal(await paperCard.locator("[data-delete-personal]").count(), 0);
  await paperCard.locator("[data-toggle-disabled]").click();
  await page.waitForFunction(() => !window.__curriculumExplorer.state.disabledIds.includes("P010"));
  await page.waitForFunction(() => !document.querySelector('[data-entity-id="P010"]')?.classList.contains("disabled"));
  assert.equal(await paperCard.evaluate((node) => node.classList.contains("disabled")), false);
  await page.locator("[data-library-search]").fill("");
  await page.locator("[data-library-kind='resources']").click();
  assert.equal(await page.locator("[data-library-content] .library-card").count(), 41);
  await page.locator("[data-library-kind='frontier']").click();
  assert.equal(await page.locator("[data-library-content] .library-card").count(), 12);

  // Personal route ordering: one valid move and one explicit invalid override.
  await page.locator(".primary-nav [data-view='workspace']").click();
  assert.match(await page.locator("[data-workspace-notes] textarea").inputValue(), /masking ablation/);
  assert.match(await page.locator("[data-workspace-artifacts]").innerText(), /attention-notes\.md/);
  assert.match(await page.locator("[data-disabled-items]").innerText(), /No disabled items/);
  await page.waitForSelector("[data-custom-route] li");
  const validMoveId = await page.evaluate(() => {
    const app = window.__curriculumExplorer;
    const ids = app.state.customOrder;
    for (let index = 0; index < ids.length - 1; index += 1) {
      const candidate = ids.slice();
      [candidate[index], candidate[index + 1]] = [candidate[index + 1], candidate[index]];
      if (!app.orderViolations(candidate).length) return ids[index];
    }
    return null;
  });
  assert.ok(validMoveId);
  await page.locator(`[data-route-id="${validMoveId}"][data-route-move="down"]`).click();
  assert.match(await page.locator("[data-custom-route]").innerText(), /Order respects every hard prerequisite/);

  const violatingEdge = await page.evaluate(() => {
    const app = window.__curriculumExplorer;
    const position = new Map(app.state.customOrder.map((id, index) => [id, index]));
    return app.data.relationships
      .filter((edge) => edge.type === "hard_prerequisite" && position.has(edge.source) && position.has(edge.target))
      .map((edge) => ({ source: edge.source, target: edge.target, distance: position.get(edge.target) - position.get(edge.source) }))
      .filter((edge) => edge.distance > 0)
      .sort((a, b) => a.distance - b.distance)[0];
  });
  assert.ok(violatingEdge);
  for (;;) {
    const positions = await page.evaluate(({ source, target }) => {
      const ids = window.__curriculumExplorer.state.customOrder;
      return { source: ids.indexOf(source), target: ids.indexOf(target) };
    }, violatingEdge);
    if (positions.target < positions.source) break;
    await page.locator(`[data-route-id="${violatingEdge.target}"][data-route-move="up"]`).click();
  }
  assert.match(await page.locator("[data-custom-route] .warning").innerText(), /hard prerequisite/);
  assert.match(await page.locator("[data-custom-route] .warning").innerText(), /Suggested repair:/);
  assert.equal(await page.locator("[data-restore-valid-order]").count(), 1);
  await page.locator("[data-accept-order-overrides]").click();
  await page.waitForFunction(() => document.querySelector("[data-custom-route]")?.textContent.includes("Dependency override active"));
  assert.match(await page.locator("[data-custom-route]").innerText(), /Dependency override active/);
  await page.locator("[data-restore-valid-order]").click();
  await page.waitForFunction(() => document.querySelector("[data-custom-route]")?.textContent.includes("Order respects every hard prerequisite"));
  assert.deepEqual(await page.evaluate(() => window.__curriculumExplorer.orderViolations(window.__curriculumExplorer.state.customOrder).length), 0);

  // Personal additions support create, edit, move, disable, re-enable, and delete.
  await page.goto(`${baseURL}/?view=session&session=F3-S03`, { waitUntil: "networkidle" });
  await waitForApp(page);
  await page.locator("[data-session-side] [data-add-reference]").click();
  await page.waitForFunction(() => window.__curriculumExplorer.currentView === "workspace");
  const form = page.locator("[data-addition-form]");
  assert.equal(await form.locator("[name='kind']").inputValue(), "material");
  assert.equal(await form.locator("[name='topicId']").inputValue(), "F3");
  assert.match(await form.locator("[name='sessionId'] option:checked").innerText(), /F3-S03/);
  await form.locator("[name='title']").fill("Attention implementation companion");
  await form.locator("[name='objective']").fill("Compare the paper reconstruction with an implementation-oriented reference.");
  await form.locator("[name='source']").fill("https://example.org/attention-companion");
  await form.locator("button[type='submit']").click();
  await page.waitForFunction(() => window.__curriculumExplorer.state.customItems.some((item) => item.title === "Attention implementation companion"));
  await page.waitForFunction(() => document.querySelector("[data-personal-items]")?.textContent.includes("Attention implementation companion"));
  assert.match(await page.locator("[data-personal-items]").innerText(), /F3-S03/);

  await form.locator("[name='kind']").selectOption("session");
  await form.locator("[name='title']").fill("Personal latency reading");
  await form.locator("[name='topicId']").selectOption("D4");
  await form.locator("[name='objective']").fill("Compare runtime evidence on the target hardware.");
  await form.locator("[name='source']").fill("https://example.org/personal-reference");
  await form.locator("button[type='submit']").click();
  let item = page.locator("[data-personal-items] article").filter({ hasText: "Personal latency reading" });
  await item.waitFor();
  await item.locator("[data-edit-personal]").click();
  await form.locator("[name='title']").fill("Personal latency evidence");
  await form.locator("button[type='submit']").click();
  item = page.locator("[data-personal-items] article").filter({ hasText: "Personal latency evidence" });
  await item.locator("[data-toggle-personal]").click();
  await page.waitForFunction(() => [...document.querySelectorAll("[data-personal-items] article")].some((node) => node.textContent.includes("Personal latency evidence") && node.textContent.includes("Disabled")));
  assert.match(await item.innerText(), /Disabled/);
  await item.locator("[data-toggle-personal]").click();
  await page.waitForFunction(() => window.__curriculumExplorer.state.customItems.some((candidate) => candidate.title === "Personal latency evidence" && !candidate.disabled));

  await form.locator("[name='kind']").selectOption("material");
  await form.locator("[name='title']").fill("Disposable personal source");
  await form.locator("[name='topicId']").selectOption("D4");
  await form.locator("[name='objective']").fill("Temporary comparison.");
  await form.locator("[name='source']").fill("https://example.org/disposable");
  await form.locator("button[type='submit']").click();
  const disposable = page.locator("[data-personal-items] article").filter({ hasText: "Disposable personal source" });
  page.once("dialog", (dialog) => dialog.accept());
  await disposable.locator("[data-delete-personal]").click();
  await page.waitForFunction(() => !window.__curriculumExplorer.state.customItems.some((candidate) => candidate.title === "Disposable personal source"));
  await page.waitForFunction(() => !document.querySelector("[data-personal-items]")?.textContent.includes("Disposable personal source"));
  assert.equal(await page.locator("[data-personal-items]").getByText("Disposable personal source").count(), 0);

  // Proposal generation is credential-free, repository-compatible, and private by default.
  await page.locator("[data-proposal-context]").fill("A hardware-specific extension for review.");
  const proposalPromise = page.waitForEvent("download");
  await page.locator("[data-export-proposal]").click();
  const proposalDownload = await proposalPromise;
  const proposalPath = await proposalDownload.path();
  const proposalText = await fs.readFile(proposalPath, "utf8");
  assert.match(proposalText, /^diff --git /);
  assert.match(proposalText, /Personal latency evidence/);
  assert.match(proposalText, /Attention implementation companion/);
  assert.match(proposalText, /curriculum_and_progress\/topics\/f3_neural_architectures_and_sequence_models\/03_p010_attention_is_all_you_need\/session_plan\.md/);
  assert.match(proposalText, /session_notes\.md/);
  assert.match(proposalText, /pull request/);
  assert.doesNotMatch(proposalText, /masking ablation/);
  assert.doesNotMatch(proposalText, /attention-notes\.md/);
  assert.doesNotMatch(proposalText, /ghp_|github_pat_|Bearer\s/);
  execFileSync("git", ["apply", "--check", proposalPath], { cwd: process.cwd() });

  await page.locator("[data-proposal-notes]").check();
  await page.locator("[data-proposal-artifacts]").check();
  const selectedProposalPromise = page.waitForEvent("download");
  await page.locator("[data-export-proposal]").click();
  const selectedProposal = await selectedProposalPromise;
  const selectedProposalText = await fs.readFile(await selectedProposal.path(), "utf8");
  assert.match(selectedProposalText, /masking ablation/);
  assert.match(selectedProposalText, /attention-notes\.md/);
  assert.match(await page.locator("[data-proposal-status]").innerText(), /explicit privacy choices/);

  // Bundle round trip includes state, source revision, orphan-safe migration, and optional files.
  await page.locator("[data-include-attachments]").check();
  const bundlePromise = page.waitForEvent("download");
  await page.locator("[data-export-bundle]").click();
  const bundleDownload = await bundlePromise;
  const bundlePath = await bundleDownload.path();
  const exported = JSON.parse(await fs.readFile(bundlePath, "utf8"));
  assert.equal(exported.schema_version, 2);
  assert.match(exported.curriculum.source_revision, /^[0-9a-f]{64}$/);
  assert.equal(exported.attachments.length, 1);
  assert.match(exported.attachments[0].data, /^data:text\/markdown;base64,/);

  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("[data-reset-workspace]").click();
  await page.waitForFunction(() => Object.keys(window.__curriculumExplorer.state.entityStatus).length === 0);
  assert.equal(
    await page.evaluate(() => Object.keys(window.__curriculumExplorer.state.entityStatus).length),
    0,
  );
  await page.locator("[data-bundle-input]").setInputFiles(bundlePath);
  await page.waitForFunction(() => document.querySelector("[data-bundle-status]").textContent.includes("Imported workspace"));
  assert.equal(
    await page.evaluate(() => {
      const app = window.__curriculumExplorer;
      const reference = app.state.customItems.find((item) => item.title === "Attention implementation companion");
      return app.state.customItems.some((item) => item.title === "Personal latency evidence")
        && reference?.sessionId === app.aliasToStable.get("F3-S03");
    }),
    true,
  );

  const oldBundle = {
    bundle_type: "golem_curriculum_workspace",
    schema_version: 2,
    curriculum: { version: "old", source_revision: "0".repeat(64) },
    workspace: {
      schemaVersion: 2,
      profile: "ai_sprint",
      entityStatus: { "F1-S01": "completed", "REMOVED-S01": "in_progress" },
      notes: { "REMOVED-S01": "Preserve me" },
      disabledIds: ["REMOVED-PAPER"],
      customItems: [],
      customOrder: [],
      orderOverrides: [],
      competenceValidated: [],
      competenceEvidence: {},
      sprintCovered: [],
      activatedSessionIds: [],
      orphanArchive: [],
    },
    attachments: [],
  };
  await page.locator("[data-bundle-input]").setInputFiles({
    name: "old-workspace.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(oldBundle)),
  });
  await page.waitForFunction(() => document.querySelector("[data-bundle-status]").textContent.includes("Source revision differed"));
  assert.match(await page.locator("[data-view-panel='workspace'] [data-revision-notice]").innerText(), /Curriculum updated since your last visit/);
  assert.match(await page.locator("[data-view-panel='workspace'] [data-revision-notice]").innerText(), /progress, notes, custom path, and artifacts were preserved/);
  assert.equal(
    await page.evaluate(() => {
      const app = window.__curriculumExplorer;
      return app.state.entityStatus[app.aliasToStable.get("F1-S01")] === "completed"
        && app.state.orphanArchive.length === 3;
    }),
    true,
  );
  assert.match(await page.locator("[data-orphan-archive]").innerText(), /archived unknown entr/);

  // Imported bundle content is untrusted: text is escaped, IDs are validated,
  // and attachment payloads cannot trigger remote fetches.
  await page.evaluate(() => { window.__bundleXss = false; });
  const safeMarkupBundle = {
    ...oldBundle,
    curriculum: { version: "current", source_revision: "1".repeat(64) },
    workspace: {
      ...oldBundle.workspace,
      entityStatus: {}, notes: {}, disabledIds: [], orphanArchive: [],
      customItems: [{
        id: "PERSONAL-123E4567-E89B-42D3-A456-426614174000",
        kind: "material", topicId: "F1",
        title: '<img src=x onerror="window.__bundleXss=true">',
        objective: "Treat markup as text.", source: "", disabled: false,
      }],
    },
  };
  await page.locator("[data-bundle-input]").setInputFiles({
    name: "markup-workspace.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(safeMarkupBundle)),
  });
  await page.waitForFunction(() => document.querySelector("[data-bundle-status]").textContent.includes("Imported workspace"));
  assert.equal(await page.evaluate(() => window.__bundleXss), false);
  assert.equal(await page.locator("[data-personal-items] img").count(), 0);
  assert.match(await page.locator("[data-personal-items]").innerText(), /<img src=x/);

  const badIdBundle = structuredClone(safeMarkupBundle);
  badIdBundle.workspace.customItems[0].id = '"><img src=x onerror="window.__bundleXss=true">';
  await page.locator("[data-bundle-input]").setInputFiles({
    name: "bad-id-workspace.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(badIdBundle)),
  });
  await page.waitForFunction(() => document.querySelector("[data-bundle-status]").textContent.includes("Import failed"));
  assert.match(await page.locator("[data-bundle-status]").innerText(), /invalid or duplicate ID/);
  assert.equal(await page.evaluate(() => window.__bundleXss), false);

  const remoteAttachmentBundle = structuredClone(oldBundle);
  remoteAttachmentBundle.workspace.entityStatus = {};
  remoteAttachmentBundle.workspace.notes = {};
  remoteAttachmentBundle.workspace.disabledIds = [];
  remoteAttachmentBundle.attachments = [{
    id: "ignored", entityId: "F1-S01", name: "remote.txt",
    type: "text/plain", size: 1, data: "https://bundle-attachment.invalid/payload",
  }];
  await page.locator("[data-bundle-input]").setInputFiles({
    name: "remote-attachment.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(remoteAttachmentBundle)),
  });
  await page.waitForFunction(() => document.querySelector("[data-bundle-status]").textContent.includes("Import failed"));
  assert.match(await page.locator("[data-bundle-status]").innerText(), /base64 data URL/);
  assert.deepEqual(untrustedAttachmentRequests, []);

  // Offline-after-load stays usable because personal writes are local.
  errorExpectations.offlineFailures = true;
  await context.setOffline(true);
  await page.locator(".primary-nav [data-view='reference']").click();
  assert.equal(await page.locator("[data-view-panel='reference']").isVisible(), true);
  await page.locator(".primary-nav [data-view='workspace']").click();
  assert.match(await page.locator("[data-storage-badge]").innerText(), /IndexedDB/);
  await context.setOffline(false);
  await page.waitForTimeout(100);
  errorExpectations.offlineFailures = false;

  // Responsive desktop/tablet/mobile, menu recovery, dark styling, and reduced-motion CSS.
  await page.setViewportSize({ width: 900, height: 900 });
  await page.locator(".primary-nav [data-view='home']").click();
  await assertNoHorizontalOverflow(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await assertNoHorizontalOverflow(page);
  assert.equal(await page.locator(".primary-nav").isVisible(), false);
  await page.locator("[data-mobile-nav]").click();
  assert.equal(await page.locator(".primary-nav").isVisible(), true);
  assert.equal(await page.locator("[data-mobile-nav]").getAttribute("aria-expanded"), "true");
  await page.locator(".primary-nav [data-view='library']").click();
  assert.equal(await page.locator(".primary-nav").isVisible(), false);
  await assertNoHorizontalOverflow(page);

  const lightBackground = await page.locator("#curriculum-explorer").evaluate((node) => getComputedStyle(node).backgroundColor);
  await page.evaluate(() => document.documentElement.setAttribute("data-md-color-scheme", "slate"));
  const darkBackground = await page.locator("#curriculum-explorer").evaluate((node) => getComputedStyle(node).backgroundColor);
  assert.notEqual(lightBackground, darkBackground);
  await page.locator("[data-global-search]").focus();
  await page.keyboard.type("robot");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("[data-search-results]").isHidden(), true);

  await context.close();
}

async function runRecoveryJourneys(errors) {
  // Competence can satisfy route readiness without claiming Required Core completion.
  const semanticContext = await browser.newContext();
  const semanticPage = await semanticContext.newPage();
  collectErrors(semanticPage, errors);
  await semanticPage.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(semanticPage);
  await semanticPage.evaluate(() => {
    const app = window.__curriculumExplorer;
    app.state.competenceValidated = ["F1", "F2", "F6", "L1"];
    app.renderAll();
  });
  assert.match(await semanticPage.locator("[data-next-title]").innerText(), /No ready Required Core recommendation/);
  assert.equal(await semanticPage.evaluate(() => ["F1", "F2", "F6", "L1"].every((id) => {
    const metrics = window.__curriculumExplorer.topicMetrics(id);
    return metrics.readinessSatisfied && !metrics.coreComplete;
  })), true);
  await semanticContext.close();

  // Legacy localStorage aliases migrate once into stable IDs.
  const legacyContext = await browser.newContext();
  const legacyPage = await legacyContext.newPage();
  collectErrors(legacyPage, errors);
  await legacyPage.addInitScript(() => {
    localStorage.setItem("golem-curriculum-progress-v1", JSON.stringify({
      completedSessions: ["F1-S01", "UNKNOWN-S01"],
    }));
  });
  await legacyPage.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(legacyPage);
  assert.equal(
    await legacyPage.evaluate(() => {
      const app = window.__curriculumExplorer;
      return app.state.entityStatus[app.aliasToStable.get("F1-S01")] === "completed"
        && app.state.orphanArchive.some((item) => item.originalId === "UNKNOWN-S01");
    }),
    true,
  );
  await legacyContext.close();

  // Malformed persisted state normalizes instead of blanking the application.
  const malformedContext = await browser.newContext();
  const malformedPage = await malformedContext.newPage();
  collectErrors(malformedPage, errors);
  await malformedPage.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(malformedPage);
  await malformedPage.evaluate(async () => {
    const app = window.__curriculumExplorer;
    await new Promise((resolve, reject) => {
      const tx = app.store.db.transaction("state", "readwrite");
      tx.objectStore("state").put({
        key: "workspace",
        value: {
          schemaVersion: 999,
          profile: "not-a-profile",
          entityStatus: "bad",
          notes: 42,
          disabledIds: "bad",
          customItems: null,
        },
      });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  });
  await malformedPage.reload({ waitUntil: "networkidle" });
  await waitForApp(malformedPage);
  assert.deepEqual(
    await malformedPage.evaluate(() => ({
      profile: window.__curriculumExplorer.state.profile,
      entityStatus: window.__curriculumExplorer.state.entityStatus,
      disabledIds: window.__curriculumExplorer.state.disabledIds,
      customItems: window.__curriculumExplorer.state.customItems,
    })),
    { profile: "guided", entityStatus: {}, disabledIds: [], customItems: [] },
  );
  await malformedContext.close();

  // A new repository revision is announced once while personal work is preserved.
  const revisionContext = await browser.newContext();
  const revisionPage = await revisionContext.newPage();
  collectErrors(revisionPage, errors);
  await revisionPage.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(revisionPage);
  await revisionPage.evaluate(async () => {
    const app = window.__curriculumExplorer;
    app.state.curriculumRevision = "0".repeat(64);
    app.state.notes.F1 = "Keep this note across a curriculum revision.";
    await app.store.save(app.state);
  });
  await revisionPage.reload({ waitUntil: "networkidle" });
  await waitForApp(revisionPage);
  assert.match(await revisionPage.locator("[data-view-panel='home'] [data-revision-notice]").innerText(), /Curriculum updated since your last visit/);
  assert.equal(await revisionPage.evaluate(() => {
    const app = window.__curriculumExplorer;
    return app.state.notes.F1 === "Keep this note across a curriculum revision."
      && app.state.curriculumRevision === app.data.source_revision;
  }), true);
  await revisionPage.locator("[data-view-panel='home'] [data-dismiss-revision]").click();
  assert.equal(await revisionPage.locator("[data-view-panel='home'] [data-revision-notice]").isHidden(), true);
  await revisionContext.close();

  // Rendered documentation links back to the exact authoritative repository source.
  const docsContext = await browser.newContext();
  const docsPage = await docsContext.newPage();
  collectErrors(docsPage, errors);
  await docsPage.goto(`${baseURL}/product_contract/`, { waitUntil: "networkidle" });
  const sourceHref = await docsPage.locator(".document-source a").getAttribute("href");
  assert.match(sourceHref, /Golem%20Robotics%20Research%20Curriculum%20%E2%80%94%20Product%20Contract\.md$/);
  assert.match(await docsPage.locator("h1").first().innerText(), /Product Contract/);
  await docsContext.close();

  // Browsers without IndexedDB get an explicit memory-only, export-first mode.
  const memoryContext = await browser.newContext();
  await memoryContext.addInitScript(() => {
    Object.defineProperty(window, "indexedDB", { configurable: true, value: undefined });
  });
  const memoryPage = await memoryContext.newPage();
  collectErrors(memoryPage, errors);
  await memoryPage.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(memoryPage);
  await memoryPage.locator(".primary-nav [data-view='workspace']").click();
  assert.match(await memoryPage.locator("[data-storage-badge]").innerText(), /Memory only/);
  assert.equal(await memoryPage.locator("[data-view-panel='workspace']").isVisible(), true);
  await memoryContext.close();

  // Reduced-motion users receive zero-duration app transitions.
  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1024, height: 800 } });
  const reducedPage = await reducedContext.newPage();
  collectErrors(reducedPage, errors);
  await reducedPage.goto(baseURL, { waitUntil: "networkidle" });
  await waitForApp(reducedPage);
  assert.equal(
    await reducedPage.locator(".button").first().evaluate((node) => getComputedStyle(node).transitionDuration),
    "0s",
  );
  await assertNoHorizontalOverflow(reducedPage);
  await reducedContext.close();
}

async function run() {
  browser = await chromium.launch({ executablePath, headless: true });
  const errors = [];
  await runMainJourney(errors);
  await runRecoveryJourneys(errors);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log("Browser journeys passed: navigation, planning, scoped readiness, orthogonal progress, persistence, migration, customization, portability, responsive layout, and recovery.");
}

run().catch(async (error) => {
  console.error(error);
  await browser?.close();
  process.exitCode = 1;
});
