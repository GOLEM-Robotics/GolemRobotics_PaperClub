"use strict";

/**
 * Learner-journey validation for the Golem Curriculum workspace.
 *
 * These are journeys, not component tests: each block walks a path a real club
 * member would take and asserts the guarantees the product contract makes about
 * it — explainable recommendations, non-destructive canonical data, distinct
 * completion semantics, safe publication, portability, and an interface that
 * stays usable on every viewport, in both colour schemes, and with a keyboard.
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright-core");

const baseURL = process.env.BASE_URL || "http://127.0.0.1:8001";
const executablePath = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "golem-journey-"));

let browser;
const failures = [];

function record(name, error) {
  failures.push(`${name}: ${error.message}`);
  console.error(`  ✗ ${name}\n${error.message.split("\n").slice(0, 12).map((line) => `    ${line}`).join("\n")}`);
}

async function journey(name, run) {
  process.stdout.write(`• ${name}\n`);
  try {
    await run();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    record(name, error);
  }
}

/** Every context asserts the same runtime hygiene: no errors, no third-party traffic. */
function watch(page, expectations = {}) {
  const problems = [];
  const origin = new URL(baseURL).origin;
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (expectations.offline && message.text().includes("ERR_INTERNET_DISCONNECTED")) return;
    problems.push(`console: ${message.text()}`);
  });
  page.on("requestfailed", (request) => {
    if (expectations.offline) return;
    problems.push(`requestfailed: ${request.url()}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) problems.push(`http ${response.status()}: ${response.url()}`);
  });
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.origin !== origin) {
      problems.push(`third-party request: ${request.url()}`);
    }
  });
  return problems;
}

async function openApp(options = {}) {
  const context = await browser.newContext({
    viewport: options.viewport || { width: 1440, height: 1000 },
    colorScheme: options.colorScheme,
    reducedMotion: options.reducedMotion,
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const problems = watch(page, options);
  page.on("dialog", (dialog) => dialog.accept());
  if (options.denyStorage) {
    await page.addInitScript(() => {
      Object.defineProperty(window, "indexedDB", { get() { throw new Error("blocked"); } });
    });
  }
  await page.goto(`${baseURL}/${options.route || ""}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__golem?.model?.papers?.length === 192);
  await page.waitForTimeout(300);
  return { context, page, problems };
}

const go = async (page, route) => {
  await page.goto(`${baseURL}/${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(450);
};

const text = (page) => page.locator("body").innerText();

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 1, `${label} overflows horizontally by ${overflow}px`);
}

/* ------------------------------------------------------------------ audits */

const ACCESSIBILITY_AUDIT = () => {
  const problems = [];
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const surface = canvas.getContext("2d", { willReadFrequently: true });
  const resolve = (value, under = [255, 255, 255]) => {
    surface.clearRect(0, 0, 1, 1);
    surface.fillStyle = `rgb(${under[0]},${under[1]},${under[2]})`;
    surface.fillRect(0, 0, 1, 1);
    surface.fillStyle = value;
    surface.fillRect(0, 0, 1, 1);
    const pixel = surface.getImageData(0, 0, 1, 1).data;
    return [pixel[0], pixel[1], pixel[2]];
  };
  const luminance = (rgb) => {
    const channels = rgb.map((value) => {
      const c = value / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const pageBackground = resolve(getComputedStyle(document.body).backgroundColor);
  const backgroundOf = (node) => {
    const layers = [];
    let current = node;
    while (current && current !== document.documentElement) {
      const colour = getComputedStyle(current).backgroundColor;
      if (colour && colour !== "rgba(0, 0, 0, 0)" && colour !== "transparent") layers.unshift(colour);
      current = current.parentElement;
    }
    return layers.reduce((base, layer) => resolve(layer, base), pageBackground);
  };
  const ratio = (a, b) => {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };

  if (!document.querySelector("main")) problems.push("no main landmark");
  const headings = document.querySelectorAll("main h1");
  if (headings.length !== 1) problems.push(`${headings.length} h1 elements in main`);
  let previous = 1;
  for (const heading of document.querySelectorAll("main h1, main h2, main h3, main h4")) {
    const level = Number(heading.tagName[1]);
    if (level > previous + 1) problems.push(`heading jumps h${previous} to h${level}: ${heading.textContent.trim().slice(0, 40)}`);
    previous = level;
  }

  for (const node of document.querySelectorAll("main button, main a, main input, main select, main textarea, header button, header a")) {
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (node.getAttribute("aria-hidden") === "true" || node.closest("[aria-hidden='true']")) continue;
    const name = (node.getAttribute("aria-label") || node.getAttribute("title") || node.textContent.trim()
      || node.labels?.[0]?.textContent.trim() || node.getAttribute("placeholder") || "").trim();
    if (!name) problems.push(`unnamed ${node.tagName.toLowerCase()}.${String(node.className).slice(0, 28)}`);
  }

  if (window.innerWidth < 500) {
    for (const node of document.querySelectorAll("main button, main a.button, .tabbar a")) {
      const box = node.getBoundingClientRect();
      if (box.width > 0 && box.height > 0 && box.height < 30) {
        problems.push(`tap target ${Math.round(box.height)}px: ${node.textContent.trim().slice(0, 24)}`);
      }
    }
  }

  const seen = new Set();
  for (const node of document.querySelectorAll("main *, header *")) {
    if (node.closest("svg")) continue;
    const own = [...node.childNodes].filter((child) => child.nodeType === 3 && child.nodeValue.trim());
    if (!own.length) continue;
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.4) continue;
    const size = parseFloat(style.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
    const background = backgroundOf(node);
    const value = ratio(resolve(style.color, background), background);
    const required = large ? 3 : 4.5;
    const key = `${style.color}|${background.join(",")}|${Math.round(size)}`;
    if (value < required && !seen.has(key)) {
      seen.add(key);
      problems.push(`contrast ${value.toFixed(2)}:1 (needs ${required}) on "${own[0].nodeValue.trim().slice(0, 30)}"`);
    }
  }

  for (const svg of document.querySelectorAll("main svg, header svg")) {
    if (!svg.hasAttribute("aria-hidden") && !svg.getAttribute("aria-label") && !svg.querySelector("title")) {
      problems.push("svg without aria-hidden or title");
    }
  }

  const identifiers = new Map();
  for (const node of document.querySelectorAll("[id]")) identifiers.set(node.id, (identifiers.get(node.id) || 0) + 1);
  for (const [id, count] of identifiers) if (count > 1) problems.push(`duplicate id ${id} (${count})`);

  return problems;
};

const SAMPLE_ROUTES = [
  "#/", "#/curriculum", "#/curriculum?mode=areas", "#/curriculum?mode=matrix",
  "#/map", "#/map?focus=L6", "#/map?layer=papers&area=learning_to_act", "#/map?layer=papers&focus=P104",
  "#/papers", "#/papers/P104", "#/topics/L6", "#/resources", "#/frontier",
  "#/compare?ids=P102,P104", "#/place", "#/workspace", "#/reference",
];

/* ---------------------------------------------------------------- journeys */

async function firstVisitAndRecommendation() {
  const { context, page, problems } = await openApp();
  try {
    const body = await text(page);
    assert.match(body, /reference curriculum, and a plan that is yours/i, "a first visit must explain what the product is");
    assert.match(body, /reference, not a syllabus/i, "the curriculum must be framed as a reference, not a track");
    assert.match(body, /what the curriculum would suggest/i, "suggestions must be offered, not imposed");
    assert.match(body, /your plan is empty/i, "an empty plan must say so plainly");

    const reasons = await page.locator(".reasons li").allInnerTexts();
    assert.ok(reasons.length >= 2, "a recommendation needs at least two stated reasons");
    assert.ok(reasons.some((reason) => /prerequisite/i.test(reason)), "readiness must be part of the explanation");

    for (const profile of ["accelerated", "ai_sprint", "guided"]) {
      await page.click(`[data-act='set-profile'][data-profile='${profile}']`);
      await page.waitForTimeout(250);
      assert.equal(await page.evaluate(() => window.__golem.state.profile), profile);
    }
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function sessionExecutionAndCompletionSemantics() {
  const { context, page, problems } = await openApp();
  try {
    await go(page, "#/curriculum");
    await page.locator("a[href^='#/sessions/']").first().click();
    await page.waitForTimeout(500);
    assert.match(page.url(), /#\/sessions\//);

    const body = await text(page);
    for (const heading of ["Readiness", "Sources", "How to work this session", "AI assistance", "What you must produce"]) {
      assert.ok(body.toLowerCase().includes(heading.toLowerCase()), `the session workspace must contain "${heading}"`);
    }

    const prompt = await page.locator("[data-prompt-preview]").innerText();
    for (const fragment of ["SESSION:", "MY LEARNING PROFILE:", "AUTHORITATIVE SOURCES:", "HOW YOU MUST WORK:"]) {
      assert.ok(prompt.includes(fragment), `the generated prompt must carry ${fragment}`);
    }
    assert.match(prompt, /Ground every explanation primarily in the linked sources/);

    const sessionId = await page.evaluate(() => window.__golem.currentRoute.params.id);
    await page.click("[data-act='set-status'][data-status='completed']");
    await page.waitForTimeout(350);
    assert.equal(await page.evaluate((id) => window.__golem.state.entityStatus[id], sessionId), "completed");

    // Sprint coverage stays a separate record from Required Core completion.
    await go(page, "#/sessions/SES-3A0BD5C4-8D8B-51D2-8ABB-F6783226941E");
    await page.click("[data-act='toggle-sprint']");
    await page.waitForTimeout(350);
    const sprint = await page.evaluate(() => ({
      covered: window.__golem.state.sprintCovered,
      status: window.__golem.state.entityStatus["SES-3A0BD5C4-8D8B-51D2-8ABB-F6783226941E"],
    }));
    assert.equal(sprint.covered.length, 1);
    assert.equal(sprint.status, undefined, "Sprint coverage must not silently complete a session");

    // Validated competence satisfies a prerequisite without rewriting session history.
    await go(page, "#/topics/L1");
    await page.click("[data-act='validate-competence'][data-id='L1']");
    await page.waitForTimeout(300);
    await page.fill("[data-competence]", "Prior implementation and evaluation work.");
    await page.click("[data-act='confirm-competence']");
    await page.waitForTimeout(400);
    const competence = await page.evaluate(() => {
      const app = window.__golem;
      const topic = app.model.topicById.get("L1");
      return {
        validated: app.state.competenceValidated.includes("L1"),
        satisfied: app.engine.topicMetrics("L1").readinessSatisfied,
        untouched: topic.completion_model.required_core_session_ids.every((id) => !app.state.entityStatus[id]),
      };
    });
    assert.ok(competence.validated && competence.satisfied && competence.untouched);
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function paperIsAFirstClassObject() {
  const { context, page, problems } = await openApp({ route: "#/papers" });
  try {
    assert.equal(await page.locator(".paper-row").count(), 60, "the library must page rather than render 192 rows");

    await page.click("a.check:has-text('Seminal')");
    await page.waitForTimeout(400);
    assert.match(page.url(), /role=Seminal/, "facets must be shareable through the address");
    const filtered = await page.locator(".paper-row").count();
    assert.ok(filtered > 0 && filtered < 60);

    await page.click("a:has-text('Clear all')");
    await page.waitForTimeout(400);
    await page.selectOption("[data-act='set-sort']", "year-desc");
    await page.waitForTimeout(400);
    const years = await page.locator(".paper-row-meta").allInnerTexts();
    assert.ok(years.length > 0);

    await page.fill("[data-act='filter-search']", "zzz-no-such-paper");
    await page.waitForTimeout(700);
    assert.ok(await page.locator(".empty").count() > 0, "a zero-result state must be offered with a way back");

    await go(page, "#/papers/P104");
    const body = await text(page);
    for (const heading of ["Why this paper is in the curriculum", "How to read it", "Read first", "Read after",
      "Lineage", "Evidence and limitations", "Where this paper is used", "My notes on this paper", "Provenance"]) {
      assert.ok(body.toLowerCase().includes(heading.toLowerCase()), `the paper workspace must answer "${heading}"`);
    }
    assert.equal(await page.locator(".lineage-node").count(), 5, "the topic paper lineage must be navigable");
    assert.ok(await page.locator("a[href='#/papers/P103']").count() > 0, "the previous paper must be reachable");
    assert.ok(await page.locator("a[href='#/papers/P105']").count() > 0, "the next paper must be reachable");
    assert.ok(await page.locator("#sessions a[href^='#/sessions/']").count() >= 2, "sessions using the paper must be listed");

    await page.locator("[data-act='cycle-reading'][data-id='P104']").first().click();
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__golem.state.paperState.P104.status), "queued");
    await page.locator("[data-act='toggle-star'][data-id='P104']").first().click();
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__golem.state.paperState.P104.starred), true);

    await page.fill("[data-note-for='P104']", "Sampler cost dominates; verify the latency claim.");
    await page.waitForTimeout(800);
    assert.match(await page.evaluate(() => window.__golem.state.notes.P104), /Sampler cost/);

    await page.click("[data-act='toggle-compare'][data-id='P104']");
    await page.waitForTimeout(300);
    await go(page, "#/papers/P102");
    await page.click("[data-act='toggle-compare'][data-id='P102']");
    await page.waitForTimeout(300);
    await page.click("[data-comparebar] a:has-text('Compare')");
    await page.waitForTimeout(500);
    assert.equal(await page.locator(".compare-table th[scope='col']").count(), 3, "compare shows a field column plus each paper");
    const compareBody = await text(page);
    for (const row of ["Contribution", "Lineage", "Limitation", "Evidence signals", "Preparation burden"]) {
      assert.ok(compareBody.toLowerCase().includes(row.toLowerCase()), `comparison must include ${row}`);
    }
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function placingAPaperYouFound() {
  const { context, page, problems } = await openApp();
  try {
    await go(page, "#/place?q=https%3A%2F%2Farxiv.org%2Fabs%2F2303.04137");
    let body = await text(page);
    assert.match(body, /Already in the curriculum/i);
    assert.match(body, /Diffusion Policy/);

    await go(page, "#/place?q=Diffusion%20Policy%20Visuomotor%20Policy%20Learning%20via%20Action%20Diffusion");
    assert.match(await text(page), /Already in the curriculum/i, "a title must resolve as well as a link");

    await go(page, "#/place?q=Adaptive%20whole-body%20impedance%20shaping%20for%20quadruped%20contact-rich%20manipulation");
    body = await text(page);
    assert.match(body, /Not in the curriculum/i);
    assert.match(body, /Best fit/);
    assert.ok(await page.locator("[data-act='add-personal-paper']").count() >= 1, "an unknown paper must be addable to the personal overlay");
    assert.ok(await page.locator("[data-act='open-proposal'][data-kind='new-paper']").count() >= 1, "an unknown paper must be proposable for the canon");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function canonicalDataIsNonDestructive() {
  const { context, page, problems } = await openApp();
  try {
    await go(page, "#/papers/P104");
    await page.click("[data-act='toggle-disabled'][data-id='P104']");
    await page.waitForTimeout(350);
    assert.ok(await page.evaluate(() => window.__golem.state.disabledIds.includes("P104")));

    await go(page, "#/workspace?tab=hidden");
    assert.match(await text(page), /P104/);
    await page.click("[data-act='toggle-disabled'][data-id='P104']");
    await page.waitForTimeout(350);
    assert.ok(!(await page.evaluate(() => window.__golem.state.disabledIds.includes("P104"))));

    const destructive = await page.evaluate(() => {
      const app = window.__golem;
      return {
        canonicalIntact: app.model.papers.length === 192 && app.model.topics.length === 37,
        deleteControls: document.querySelectorAll("[data-act^='delete-']").length,
      };
    });
    assert.ok(destructive.canonicalIntact);

    // Personal additions, by contrast, are fully editable and deletable.
    await go(page, "#/workspace?tab=mine");
    await page.selectOption("[data-personal-form] [name='topicId']", "L6");
    await page.fill("[data-personal-form] [name='title']", "Flow matching policy notes");
    await page.fill("[data-personal-form] [name='objective']", "A cheaper sampler for the same competence.");
    await page.click("[data-personal-form] button[type='submit']");
    await page.waitForTimeout(450);
    assert.equal(await page.evaluate(() => window.__golem.state.customItems.length), 1);
    assert.ok(await page.locator(".chip--personal").count() > 0, "personal material must be visually distinguished");
    await page.click("[data-act='delete-personal']");
    await page.waitForTimeout(450);
    assert.equal(await page.evaluate(() => window.__golem.state.customItems.length), 0);
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function personalRouteOrdering() {
  const { context, page, problems } = await openApp({ route: "#/workspace?tab=route" });
  try {
    const canonical = await page.evaluate(() => window.__golem.engine.routeTopics().map((topic) => topic.id));
    await page.locator("[data-act='move-topic'][data-dir='-1']").nth(3).click();
    await page.waitForTimeout(500);
    const custom = await page.evaluate(() => window.__golem.state.customOrder);
    assert.notDeepEqual(custom, canonical, "a personal ordering must be recorded");

    const violations = await page.evaluate(() => window.__golem.engine.orderViolations(window.__golem.state.customOrder).length);
    if (violations > 0) {
      assert.match(await text(page), /hard prerequisite/i, "an invalid order must explain the violated prerequisite");
      assert.ok(await page.locator("[data-act='override-order']").count() > 0, "an override must be explicit");
      await page.click("[data-act='override-order']");
      await page.waitForTimeout(400);
      assert.ok(await page.evaluate(() => window.__golem.state.orderOverrides.length > 0));
      assert.match(await text(page), /override accepted/i, "an overridden route must keep a visible warning");
    }

    const canonicalUnchanged = await page.evaluate(() => {
      const sessions = window.__golem.model.sessionsByTopic.get("L6");
      return sessions.map((session) => session.sequence).join(",");
    });
    assert.equal(canonicalUnchanged, "1,2,3,4,5,6,7,8,9,10", "the canonical timeline must never move");

    await page.click("[data-act='reset-order']");
    await page.waitForTimeout(400);
    assert.deepEqual(await page.evaluate(() => window.__golem.state.customOrder), []);
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function safePublication() {
  const { context, page, problems } = await openApp();
  try {
    await go(page, "#/papers/P104");
    await page.click("[data-act='open-proposal'][data-id='P104']");
    await page.waitForTimeout(300);
    await page.selectOption("[data-proposal-kind]", "replace");
    await page.fill("[data-proposal-title]", "Flow Matching Policy");
    await page.click("[data-act='save-proposal']");
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__golem.state.proposals.length), 0,
      "a proposal without a justification must be refused");
    await page.fill("[data-proposal-rationale]", "Independent evidence now favours the cheaper sampler.");
    await page.click("[data-act='save-proposal']");
    await page.waitForTimeout(400);
    assert.equal(await page.evaluate(() => window.__golem.state.proposals.length), 1);

    await go(page, "#/workspace?tab=proposals");
    const waitForPatch = page.waitForEvent("download");
    await page.click("[data-act='export-proposal']");
    const patchFile = await waitForPatch;
    const patchPath = path.join(scratch, "proposal.patch");
    await patchFile.saveAs(patchPath);
    const patch = fs.readFileSync(patchPath, "utf8");
    assert.match(patch, /^diff --git a\/curriculum_and_progress\/proposals\//m);
    assert.match(patch, /new file mode 100644/);
    assert.match(patch, /Apply it only through the normal pull-request process/);
    assert.ok(!patch.includes("1_operating_principles.md"), "a generated patch must never touch the framework documents");
    assert.ok(!/Sampler cost dominates/.test(patch), "private notes must not leak into a proposal by default");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function portabilityAndMigration() {
  const { context, page, problems } = await openApp();
  try {
    await go(page, "#/papers/P058");
    await page.locator("[data-act='cycle-reading'][data-id='P058']").first().click();
    await page.waitForTimeout(300);
    await page.fill("[data-note-for='P058']", "Volume rendering assumptions matter for robot scenes.");
    await page.waitForTimeout(800);

    await go(page, "#/workspace?tab=bundle");
    const waitForBundle = page.waitForEvent("download");
    await page.click("[data-act='export-bundle']");
    const bundleFile = await waitForBundle;
    const bundlePath = path.join(scratch, "workspace.json");
    await bundleFile.saveAs(bundlePath);
    const bundle = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
    assert.equal(bundle.bundle_type, "golem_curriculum_workspace");
    assert.equal(typeof bundle.curriculum.source_revision, "string");

    await page.click("[data-act='reset-workspace']");
    await page.waitForTimeout(600);
    assert.deepEqual(await page.evaluate(() => window.__golem.state.notes), {});

    await go(page, "#/workspace?tab=bundle");
    await page.setInputFiles("[data-bundle-input]", bundlePath);
    await page.waitForTimeout(900);
    assert.match(await page.evaluate(() => window.__golem.state.notes.P058), /Volume rendering/);

    // A bundle written against an older curriculum revision migrates by stable identity.
    const legacy = JSON.parse(JSON.stringify(bundle));
    legacy.curriculum.source_revision = "0".repeat(64);
    legacy.workspace.curriculumRevision = "0".repeat(64);
    legacy.workspace.entityStatus = { "F1-S02": "completed", "SES-DOES-NOT-EXIST": "completed" };
    const legacyPath = path.join(scratch, "legacy.json");
    fs.writeFileSync(legacyPath, JSON.stringify(legacy));
    await page.setInputFiles("[data-bundle-input]", legacyPath);
    await page.waitForTimeout(900);
    const migrated = await page.evaluate(() => ({
      alias: window.__golem.state.entityStatus["SES-B7BB85F3-6BED-598C-BAF1-F34C520358A9"],
      archived: window.__golem.state.orphanArchive.length,
    }));
    assert.equal(migrated.alias, "completed", "a legacy alias must migrate to its stable identity");
    assert.ok(migrated.archived >= 1, "an unknown identity must be archived, never silently dropped");
    assert.match(await text(page), /curriculum changed since your workspace was last saved/i);

    // Adversarial bundles are refused with an explanation instead of corrupting state.
    for (const [name, payload] of [
      ["not-json", "{{{"],
      ["wrong-type", JSON.stringify({ bundle_type: "other", schema_version: 3, workspace: {} })],
      ["bad-attachment", JSON.stringify({
        bundle_type: "golem_curriculum_workspace",
        schema_version: 3,
        workspace: {},
        attachments: [{ entityId: "SES-DOES-NOT-EXIST", name: "x.txt", size: 1, data: "data:text/plain;base64,eA==" }],
      })],
    ]) {
      const hostile = path.join(scratch, `${name}.json`);
      fs.writeFileSync(hostile, payload);
      await page.setInputFiles("[data-bundle-input]", hostile);
      await page.waitForTimeout(600);
      assert.match(await page.locator("[data-bundle-status]").innerText(), /refused/i, `${name} must be refused`);
    }
    assert.equal(await page.evaluate(() => window.__golem.model.papers.length), 192);
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function navigationAndErrorStates() {
  const { context, page, problems } = await openApp();
  try {
    await go(page, "#/papers/P058");
    await page.click("a[href='#/topics/P3']");
    await page.waitForTimeout(400);
    assert.ok(page.url().endsWith("#/topics/P3"));
    await page.goBack();
    await page.waitForTimeout(400);
    assert.ok(page.url().endsWith("#/papers/P058"), "browser back must return to the paper");
    await page.goForward();
    await page.waitForTimeout(400);
    assert.ok(page.url().endsWith("#/topics/P3"));
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    assert.match(await page.locator("main h1").first().innerText(), /3D representation/i, "a deep link must survive reload");

    // Returning to a long library must keep the learner's place.
    await go(page, "#/papers");
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(250);
    await page.locator(".paper-row-title").nth(12).click();
    await page.waitForTimeout(500);
    assert.match(page.url(), /#\/papers\/P/);
    await page.goBack();
    await page.waitForTimeout(600);
    const restored = await page.evaluate(() => window.scrollY);
    assert.ok(restored > 1000, `scroll position was not restored (${restored})`);

    await go(page, "#/papers/PXXX");
    assert.match(await text(page), /No paper with the identifier/i);
    await go(page, "#/topics/ZZ");
    assert.match(await text(page), /No topic with the identifier/i);
    await go(page, "#/nonsense/route");
    assert.match(await text(page), /does not exist/i);
    await go(page, "#/sessions/F1-S02");
    assert.match(await text(page), /F1-S02/, "a legacy session alias must still resolve");

    await page.goto(`${baseURL}/?view=library`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    assert.match(page.url(), /#\/papers/, "old query-string links must migrate");

    await go(page, "#/");
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);
    assert.ok(await page.locator(".palette").isVisible());
    await page.fill("[data-palette-input]", "orb-slam3");
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    assert.match(page.url(), /#\/papers\/P042/, "search must rank the paper above the session that studies it");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function targetDrivenPlanning() {
  const { context, page, problems } = await openApp();
  try {
    await page.click("[data-act='open-target']");
    await page.waitForTimeout(300);
    await page.fill("[data-target-search]", "E2");
    await page.waitForTimeout(300);
    await page.locator("dialog [data-act='set-target']").first().click();
    await page.waitForTimeout(500);
    assert.match(await text(page), /shortest valid route/i, "a target must state what still stands in the way");
    const plan = await page.evaluate(() => ({
      target: window.__golem.state.target,
      route: window.__golem.engine.routeTopics().map((topic) => topic.id),
    }));
    assert.equal(plan.target.id, "E2");
    assert.ok(plan.route.includes("E2") && plan.route.includes("L6") && plan.route.length < 37,
      "a target route must be the prerequisite closure, not the whole curriculum");

    // A paper can be a target in its own right.
    await page.click("[data-act='open-target']");
    await page.waitForTimeout(300);
    await page.fill("[data-target-search]", "diffusion policy");
    await page.waitForTimeout(300);
    await page.locator("dialog [data-act='set-target']").first().click();
    await page.waitForTimeout(500);
    assert.equal(await page.evaluate(() => window.__golem.state.target.kind), "paper");

    await page.click("[data-act='clear-target']");
    await page.waitForTimeout(400);
    assert.equal(await page.evaluate(() => window.__golem.state.target), null);
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function notesArtifactsAndResume() {
  const { context, page, problems } = await openApp();
  try {
    const session = "SES-3A0BD5C4-8D8B-51D2-8ABB-F6783226941E";
    await go(page, `#/sessions/${session}`);
    await page.fill(`[data-note-for='${session}']`, "Reconstructed the k-modes objective; unsure about the residual head.");
    await page.waitForTimeout(800);
    assert.match(await page.evaluate((id) => window.__golem.state.notes[id], session), /k-modes/);

    const upload = path.join(scratch, "evidence.txt");
    fs.writeFileSync(upload, "seed,return\n0,10\n1,12\n");
    await page.setInputFiles(`[data-attachment-for='${session}']`, upload);
    await page.waitForTimeout(700);
    assert.match(await page.locator(`[data-attachment-list='${session}']`).innerText(), /evidence\.txt/);

    await page.click("[data-act='set-status'][data-status='in_progress']");
    await page.waitForTimeout(400);

    await go(page, "#/");
    assert.match(await text(page), /up next in your plan|what the curriculum would suggest/i,
      "the plan surface must always offer something to do next");

    await go(page, "#/workspace?tab=notes");
    assert.match(await text(page), /k-modes/, "notes must aggregate in the workspace");
    await go(page, "#/workspace?tab=artifacts");
    await page.waitForTimeout(600);
    assert.match(await text(page), /evidence\.txt/, "artifacts must aggregate in the workspace");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function responsiveAndThemed() {
  for (const [width, height, label] of [[1440, 1000, "desktop"], [1024, 800, "small desktop"],
    [820, 1180, "tablet"], [390, 844, "mobile"], [320, 640, "narrow mobile"]]) {
    const { context, page, problems } = await openApp({ viewport: { width, height } });
    try {
      for (const route of SAMPLE_ROUTES) {
        await go(page, route);
        await assertNoHorizontalOverflow(page, `${label} ${route}`);
        const visible = await page.evaluate(() => document.querySelector("main").getBoundingClientRect().height);
        assert.ok(visible > 200, `${label} ${route} rendered an empty view`);
      }
      if (width <= 860) assert.ok(await page.locator(".tabbar").isVisible(), "small viewports need the bottom navigation");
      assert.deepEqual(problems, []);
    } finally {
      await context.close();
    }
  }
}

async function accessibilityAudit() {
  for (const colorScheme of ["light", "dark"]) {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const { context, page, problems } = await openApp({ colorScheme, viewport });
      try {
        for (const route of SAMPLE_ROUTES) {
          await go(page, route);
          const found = await page.evaluate(ACCESSIBILITY_AUDIT);
          assert.deepEqual([...new Set(found)], [],
            `${colorScheme} ${viewport.width}px ${route}`);
        }
        assert.deepEqual(problems, []);
      } finally {
        await context.close();
      }
    }
  }
}

async function keyboardAndReducedMotion() {
  const { context, page, problems } = await openApp({ reducedMotion: "reduce" });
  try {
    await page.keyboard.press("Tab");
    assert.match(await page.evaluate(() => document.activeElement.className), /skip-link/);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);

    await go(page, "#/papers");
    await page.keyboard.press("/");
    await page.waitForTimeout(300);
    assert.ok(await page.locator(".palette").isVisible(), "slash must open search");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    assert.equal(await page.locator(".palette").count(), 0, "escape must close search");

    await go(page, "#/map");
    const focusable = await page.evaluate(() => document.querySelectorAll("[data-map-node][tabindex='0']").length);
    assert.equal(focusable, 37, "every map node must be keyboard reachable");

    const animated = await page.evaluate(() => getComputedStyle(document.body).transitionDuration);
    assert.ok(["0s", "0.000001s", "1e-06s"].some((value) => animated.startsWith(value.slice(0, 3))) || animated === "0s");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

async function degradedEnvironments() {
  const denied = await openApp({ denyStorage: true });
  try {
    assert.match(await text(denied.page), /my plan/i, "the workspace must still work without persistent storage");
    await denied.page.click("[data-act='set-profile'][data-profile='accelerated']");
    await denied.page.waitForTimeout(300);
    assert.equal(await denied.page.evaluate(() => window.__golem.state.profile), "accelerated");
    assert.deepEqual(denied.problems, []);
  } finally {
    await denied.context.close();
  }

  const offline = await openApp({ offline: true });
  try {
    await offline.context.setOffline(true);
    await go(offline.page, "#/papers/P104");
    assert.match(await text(offline.page), /Diffusion Policy/, "an already-loaded workspace must keep working offline");
    await offline.context.setOffline(false);
  } finally {
    await offline.context.close();
  }
}

async function referenceSurface() {
  const { context, page, problems } = await openApp({ route: "#/reference" });
  try {
    assert.match(await text(page), /Operating principles/);
    const links = await page.locator("main a[target='_blank']").evaluateAll((nodes) => nodes.map((node) => node.href));
    assert.ok(links.some((href) => href.includes("/paper_index/")));

    await page.goto(`${baseURL}/paper_index/`, { waitUntil: "networkidle" });
    assert.ok(await page.locator("#p001-deep-reinforcement-learning-that-matters").count() === 1,
      "the paper page must be able to link into the rendered canonical record");
    assert.ok(await page.locator(".md-tabs__link:has-text('Learning workspace')").count() >= 1,
      "reference pages must offer a way back into the workspace");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}


/** The curriculum is a reference; the plan belongs to the learner. */
async function thePlanIsTheLearners() {
  const { context, page, problems } = await openApp();
  try {
    // Anything the curriculum does not know is still a legitimate plan item.
    await page.fill("[data-quick-add] input", "Reproduce diffusion policy on my own arm");
    await page.click("[data-quick-add] button[type='submit']");
    await page.waitForTimeout(500);
    let plan = await page.evaluate(() => window.__golem.state.plan);
    assert.equal(plan.length, 1);
    assert.equal(plan[0].kind, "custom");
    assert.match(await text(page), /Reproduce diffusion policy/);

    // Canonical material is borrowed into the plan, never the other way round.
    await go(page, "#/papers/P104");
    await page.click("[data-act='toggle-plan'][data-ref='P104']");
    await page.waitForTimeout(400);
    assert.ok(await page.evaluate(() => window.__golem.engine.inPlan("paper", "P104")));

    await go(page, "#/topics/L6");
    await page.click("[data-act='plan-many'][data-kind='paper']");
    await page.waitForTimeout(500);
    plan = await page.evaluate(() => window.__golem.state.plan);
    assert.equal(plan.filter((item) => item.kind === "paper").length, 5, "bulk add must not duplicate what is already planned");

    // Ordering, notes and removal are the learner's.
    await go(page, "#/");
    const before = await page.evaluate(() => window.__golem.state.plan.map((item) => item.id));
    await page.locator("[data-act='move-plan'][data-dir='1']").first().click();
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => window.__golem.state.plan.map((item) => item.id));
    assert.notDeepEqual(after, before, "plan order must be editable");

    await page.locator("[data-act='edit-plan-note']").first().click();
    await page.waitForTimeout(300);
    await page.fill("[data-plan-note]", "Need this before the arm experiment.");
    await page.click("[data-act='save-plan-note']");
    await page.waitForTimeout(400);
    assert.match(await text(page), /Need this before the arm experiment/);

    const count = await page.evaluate(() => window.__golem.state.plan.length);
    const customId = await page.evaluate(() => window.__golem.state.plan.find((item) => item.kind === "custom").id);
    await page.click(`[data-act='remove-plan'][data-id='${customId}']`);
    await page.waitForTimeout(400);
    assert.equal(await page.evaluate(() => window.__golem.state.plan.length), count - 1);
    assert.equal(await page.evaluate(() => window.__golem.state.plan.some((item) => item.kind === "custom")), false);

    // Completion of a canonical item is the one existing record, not a second one.
    await page.evaluate(() => {
      const app = window.__golem;
      app.state.paperState.P104 = { status: "read", starred: false, updatedAt: new Date().toISOString() };
      return app.save().then(() => app.render());
    });
    await page.waitForTimeout(500);
    const doneStates = await page.evaluate(() => window.__golem.engine.planEntries()
      .filter((entry) => entry.item.kind === "paper" && entry.item.refId === "P104").map((entry) => entry.done));
    assert.deepEqual(doneStates, [true], "reading a paper must tick it off the plan without a separate record");

    // A target route can be borrowed wholesale, and is still just plan items.
    await page.evaluate(() => {
      const app = window.__golem;
      app.state.target = { kind: "topic", id: "L2" };
      return app.save().then(() => app.render());
    });
    await page.waitForTimeout(400);
    await page.click("[data-act='plan-route']");
    await page.waitForTimeout(700);
    assert.ok(await page.evaluate(() => window.__golem.state.plan.filter((item) => item.kind === "session").length) > 3,
      "the target route must be addable to the plan");
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

/** Both map layers: focus explains, opening is deliberate. */
async function relationshipMapLayers() {
  const { context, page, problems } = await openApp({ route: "#/map" });
  try {
    assert.equal(await page.locator("[data-map-node='topic']").count(), 37, "every topic must be a node");
    assert.equal(await page.evaluate(() =>
      [...document.querySelectorAll("[data-map-node]")].every((node) => node.getAttribute("tabindex") === "0")), true,
    "every node must be keyboard reachable");

    await page.click("[data-map-node='topic'][data-id='L6']");
    await page.waitForTimeout(500);
    assert.match(page.url(), /focus=L6/, "a focused map must be shareable through the address");
    const panel = await page.locator("[data-map-panel]").innerText();
    assert.match(panel, /Generative action policies/);
    assert.match(panel, /Comes before it/i);
    assert.match(panel, /Depends on it/i);
    assert.ok(await page.locator("[data-map-panel] a[href='#/topics/L6']").count() >= 1,
      "the panel must hold the real link rather than the node");

    await page.dblclick("[data-map-node='topic'][data-id='L6']");
    await page.waitForTimeout(500);
    assert.ok(page.url().endsWith("#/topics/L6"), "a double click opens the page");

    await go(page, "#/map?layer=papers&area=learning_to_act");
    const paperNodes = await page.locator("[data-map-node='paper']").count();
    assert.ok(paperNodes > 30, `the paper layer must draw the lineages (${paperNodes})`);
    assert.ok(await page.locator("[data-map-node='topic']").count() >= 8, "each lineage must be headed by its topic");

    await page.click("[data-map-node='paper'][data-id='P104']");
    await page.waitForTimeout(500);
    const paperPanel = await page.locator("[data-map-panel]").innerText();
    assert.match(paperPanel, /Diffusion Policy/);
    assert.match(paperPanel, /Position 3 of 5 in L6/i, "the panel must place the paper in its lineage");
    assert.match(paperPanel, /named in lineage notes/i, "cross-lineage references must be explained");
    assert.match(paperPanel, /inferred from the canonical notes/i, "inference must be labelled as inference");
    assert.ok(await page.locator("[data-map-panel] [data-act='toggle-plan'][data-ref='P104']").count() === 1,
      "a paper found on the map must be addable to the plan from there");

    // Keyboard: Enter focuses, and the focus survives the re-render.
    await go(page, "#/map");
    await page.focus("[data-map-node='topic'][data-id='F1']");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(600);
    assert.match(page.url(), /focus=F1/);
    assert.equal(await page.evaluate(() => document.activeElement?.dataset?.id), "F1",
      "keyboard focus must survive the map re-render");
    // The map must spend the room it is given and scroll only when it truly cannot fit.
    const fit = [];
    for (const [width, height] of [[3840, 1400], [1920, 1080], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await go(page, "#/map");
      fit.push(await page.evaluate((viewport) => {
        const frame = document.querySelector(".map-frame");
        const svg = document.querySelector(".map-svg");
        return {
          viewport,
          scrolls: frame.scrollWidth > frame.clientWidth + 1,
          usesWidth: svg.getBoundingClientRect().width / frame.clientWidth,
          withinViewport: svg.getBoundingClientRect().height <= window.innerHeight,
        };
      }, width));
    }
    for (const result of fit) {
      assert.equal(result.scrolls, false, `the topic map must fit at ${result.viewport}px without a scrollbar`);
      assert.ok(result.withinViewport, `the topic map must not exceed the window height at ${result.viewport}px`);
      assert.ok(result.usesWidth > 0.35, `the topic map wastes its container at ${result.viewport}px`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });

    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

/** Long side rails must scroll on their own, not drag the page with them. */
async function railsScrollIndependently() {
  // A short viewport is the honest test: the filter panel is certainly taller than it.
  const { context, page, problems } = await openApp({ route: "#/papers", viewport: { width: 1440, height: 560 } });
  try {
    const rail = await page.evaluate(() => {
      const node = document.querySelector(".rail");
      const style = getComputedStyle(node);
      return {
        sticky: style.position,
        scrolls: node.scrollHeight > node.clientHeight,
        overflow: style.overflowY,
        withinViewport: node.getBoundingClientRect().height <= window.innerHeight + 1,
      };
    });
    assert.equal(rail.sticky, "sticky");
    assert.equal(rail.overflow, "auto");
    assert.ok(rail.withinViewport, "the filter rail must never be taller than the viewport");

    // Scrolling inside the rail must not move the page.
    await page.evaluate(() => { document.querySelector(".rail").scrollTop = 400; });
    await page.waitForTimeout(200);
    const result = await page.evaluate(() => ({
      railTop: document.querySelector(".rail").scrollTop,
      pageTop: window.scrollY,
    }));
    assert.ok(rail.scrolls, "a filter panel taller than the viewport must scroll inside the rail");
    assert.ok(result.railTop > 100, "the rail must scroll");
    assert.equal(result.pageTop, 0, "scrolling the rail must not scroll the page");

    // Below the split breakpoint the filters collapse instead of burying the results.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    const mobile = await page.evaluate(() => ({
      collapsed: !document.querySelector(".facet-panel").open,
      firstRowTop: Math.round(document.querySelector(".paper-row").getBoundingClientRect().top),
    }));
    assert.ok(mobile.collapsed, "filters must collapse on narrow screens");
    assert.ok(mobile.firstRowTop < 700, `results must be reachable without scrolling past the filters (${mobile.firstRowTop}px)`);
    assert.deepEqual(problems, []);
  } finally {
    await context.close();
  }
}

/* -------------------------------------------------------------------- run */

async function run() {
  browser = await chromium.launch({ executablePath });
  try {
    await journey("first visit and explainable recommendation", firstVisitAndRecommendation);
    await journey("the plan belongs to the learner", thePlanIsTheLearners);
    await journey("relationship map layers and interaction", relationshipMapLayers);
    await journey("side rails scroll independently", railsScrollIndependently);
    await journey("session execution and distinct completion semantics", sessionExecutionAndCompletionSemantics);
    await journey("papers as a first-class research object", paperIsAFirstClassObject);
    await journey("placing a paper you found elsewhere", placingAPaperYouFound);
    await journey("canonical data is non-destructive, personal data is not", canonicalDataIsNonDestructive);
    await journey("personal route ordering and prerequisite violations", personalRouteOrdering);
    await journey("safe, credential-free publication", safePublication);
    await journey("workspace portability, migration and hostile bundles", portabilityAndMigration);
    await journey("navigation, deep links and error states", navigationAndErrorStates);
    await journey("target-driven planning", targetDrivenPlanning);
    await journey("notes, artifacts and resuming", notesArtifactsAndResume);
    await journey("responsive layouts", responsiveAndThemed);
    await journey("accessibility in both colour schemes", accessibilityAudit);
    await journey("keyboard operation and reduced motion", keyboardAndReducedMotion);
    await journey("degraded environments", degradedEnvironments);
    await journey("reference surface", referenceSurface);
  } finally {
    await browser.close();
    fs.rmSync(scratch, { recursive: true, force: true });
  }

  if (failures.length) {
    console.error(`\n${failures.length} journey(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll learner journeys passed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
