"use strict";

const assert = require("node:assert/strict");
const { chromium } = require("playwright-core");

const baseURL = process.env.BASE_URL || "http://127.0.0.1:8001";
const executablePath = process.env.CHROME_PATH || "/usr/bin/google-chrome";
let browser;

async function run() {
  browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("requestfailed", (request) => errors.push(`request: ${request.url()} — ${request.failure()?.errorText}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`response: ${response.status()} ${response.url()}`);
  });

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__curriculumExplorer?.data?.topics?.length === 37);
  assert.equal(await page.locator("[data-explorer-stats] article").count(), 4);
  assert.equal(await page.locator("[data-view]").count(), 5);
  assert.equal(await page.locator('.explorer-primary-nav [data-view="focus"]').isDisabled(), true);
  assert.equal(await page.locator('.explorer-primary-nav [data-view="topic"]').isDisabled(), true);
  assert.match(await page.locator("[data-next-steps]").innerText(), /F1|F2|F6|L1/);

  await page.locator('[data-view="map"]').click();
  await page.waitForTimeout(350);
  assert.match(page.url(), /view=map/);
  assert.equal(await page.locator("[data-explorer-graph] canvas").count() > 0, true);
  assert.match(await page.locator("[data-graph-status]").innerText(), /37 of 37 topics visible/);
  assert.deepEqual(
    await page.evaluate(() => ({
      nodes: window.__curriculumExplorer.cy.nodes().length,
      edges: window.__curriculumExplorer.cy.edges().length,
      nonTopics: window.__curriculumExplorer.cy.nodes().filter((node) => !node.hasClass("topic")).length,
    })),
    { nodes: 37, edges: 122, nonTopics: 0 }
  );

  await page.locator("[data-map-topic-select]").selectOption("F1");
  assert.equal(await page.locator('.explorer-primary-nav [data-view="focus"]').isEnabled(), true);
  assert.match(await page.locator("[data-explorer-details]").innerText(), /Research evidence/);

  await page.locator('.explorer-primary-nav [data-view="focus"]').click();
  await page.waitForTimeout(350);
  assert.match(page.url(), /view=focus/);
  assert.match(page.url(), /topic=F1/);
  assert.match(await page.locator("[data-focus-status]").innerText(), /topics in transitive/);

  await page.locator('.explorer-primary-nav [data-view="topic"]').click();
  assert.match(await page.locator("[data-topic-header]").innerText(), /F1/);
  await page.locator('[data-topic-tab="sessions"]').click();
  assert.equal(await page.locator("[data-session-complete]").count(), 9);
  assert.match(page.url(), /tab=sessions/);

  const firstSession = page.locator("[data-session-complete]").first();
  await firstSession.check();
  assert.match(await page.locator("[data-topic-header]").innerText(), /1\/9 sessions/);
  assert.equal(
    await page.evaluate(() => JSON.parse(localStorage.getItem("golem-curriculum-progress-v1")).completedSessions.includes("F1-S01")),
    true
  );

  const downloadPromise = page.waitForEvent("download");
  await page.locator('[data-view="overview"]').click();
  await page.locator("[data-export-progress]").click();
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /^golem-paper-club-progress-\d{4}-\d{2}-\d{2}\.json$/);
  assert.match(await page.locator("[data-progress-file-status]").innerText(), /Exported 1 completed session/);

  await page.locator('.explorer-primary-nav [data-view="topic"]').click();
  await firstSession.uncheck();

  await page.locator('[data-view="overview"]').click();
  await page.locator("[data-progress-file-input]").setInputFiles({
    name: "progress.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({ schema_version: 1, completed_sessions: ["F1-S01", "UNKNOWN-S01"] })),
  });
  await page.waitForFunction(() => document.querySelector("[data-progress-file-status]")?.textContent.includes("Imported"));
  assert.match(await page.locator("[data-progress-file-status]").innerText(), /Imported 1 completed session; ignored 1 unknown entry/);
  await page.locator('.explorer-primary-nav [data-view="topic"]').click();
  assert.equal(await firstSession.isChecked(), true);
  await firstSession.uncheck();

  await page.locator("[data-explorer-search]").fill("P010");
  const searchResult = page.locator('[data-search-type="paper"][data-search-id="P010"]');
  await searchResult.click();
  assert.match(page.url(), /topic=F3/);
  assert.match(page.url(), /tab=papers/);
  await page.locator('[data-entity-id="P010"].is-target').waitFor();
  assert.equal(await page.locator('[data-entity-id="P010"].is-target').count(), 1);

  await page.locator("[data-explorer-search]").fill("R004");
  await page.locator('[data-search-type="resource"][data-search-id="R004"]').click();
  assert.match(page.url(), /tab=resources/);
  await page.locator('[data-entity-id="R004"].is-target').waitFor();

  await page.locator("[data-explorer-search]").fill("F1-S01");
  await page.locator('[data-search-type="session"][data-search-id="F1-S01"]').click();
  assert.match(page.url(), /topic=F1/);
  assert.match(page.url(), /tab=sessions/);
  await page.locator('[data-entity-id="F1-S01"].is-target').waitFor();

  await page.locator('[data-view="table"]').click();
  assert.equal(await page.locator("[data-table-content] tbody tr").count(), 37);
  await page.locator('[data-area-filters] input[value="shared_foundations"]').uncheck();
  assert.equal(await page.locator("[data-table-content] tbody tr").count(), 29);
  await page.locator("[data-clear-filters]").click();
  assert.equal(await page.locator("[data-table-content] tbody tr").count(), 37);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-view="overview"]').click();
  assert.equal(await page.locator("#curriculum-explorer").evaluate((element) => element.scrollWidth <= element.clientWidth + 1), true);
  assert.equal(await page.locator(".explorer-primary-nav").isVisible(), true);
  assert.equal(await page.locator(".explorer-sidebar").isVisible(), false);
  await page.locator("[data-filter-toggle]").click();
  assert.equal(await page.locator(".explorer-sidebar").isVisible(), true);
  assert.equal(await page.locator("[data-filter-toggle]").getAttribute("aria-expanded"), "true");

  await page.goto(`${baseURL}/?view=topic&topic=L6&tab=sessions`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__curriculumExplorer?.selectedTopicId === "L6");
  assert.match(await page.locator("[data-topic-header]").innerText(), /L6/);
  assert.equal(await page.locator('[data-topic-tab="sessions"]').getAttribute("aria-pressed"), "true");

  assert.deepEqual(errors, []);
  await browser.close();
  console.log("Browser smoke test passed: navigation, graph, focus, topic tabs, progress, search, filters, and mobile layout.");
}

run().catch(async (error) => {
  console.error(error);
  await browser?.close();
  process.exitCode = 1;
});
