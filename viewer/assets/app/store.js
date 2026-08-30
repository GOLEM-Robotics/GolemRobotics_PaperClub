"use strict";

/**
 * Durable personal workspace.
 *
 * Canonical curriculum data is never written here. Everything in this module is
 * the learner's own overlay: progress, reading state, notes, personal additions,
 * disabled canonical items, route ordering and review proposals.
 */

const DB_NAME = "golem-curriculum-workspace";
const DB_VERSION = 1;
const STATE_KEY = "workspace";
const LEGACY_KEYS = ["golem-curriculum-progress-v1", "golem-curriculum-completed"];

export const WORKSPACE_SCHEMA = 4;

export const READING_STATES = ["queued", "reading", "skimmed", "read"];
export const PROGRESS_STATES = ["not_started", "in_progress", "completed", "skipped"];
export const PROFILES = ["guided", "accelerated", "ai_sprint"];
export const PROPOSAL_KINDS = ["add", "replace", "correct", "remove", "move", "other"];
export const PLAN_KINDS = ["paper", "session", "topic", "resource", "custom"];

export const blankState = () => ({
  schemaVersion: WORKSPACE_SCHEMA,
  profile: "guided",
  target: null,
  entityStatus: {},
  competenceValidated: [],
  competenceEvidence: {},
  sprintCovered: [],
  activatedSessionIds: [],
  notes: {},
  paperState: {},
  plan: [],
  planCollapsedDone: true,
  compare: [],
  disabledIds: [],
  customOrder: [],
  orderOverrides: [],
  customItems: [],
  proposals: [],
  orphanArchive: [],
  recentActivity: [],
  curriculumRevision: null,
  onboardingDismissed: false,
  theme: "system",
  lastRoute: "#/",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

const requestResult = (request) => new Promise((resolve, reject) => {
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error || new Error("IndexedDB request failed."));
});

const transactionDone = (transaction) => new Promise((resolve, reject) => {
  transaction.oncomplete = () => resolve();
  transaction.onerror = () => reject(transaction.error || new Error("IndexedDB transaction failed."));
  transaction.onabort = () => reject(transaction.error || new Error("IndexedDB transaction was aborted."));
});

const normalizeTarget = (value) => {
  if (!isPlainObject(value)) return null;
  if (!["topic", "session", "paper"].includes(value.kind)) return null;
  if (typeof value.id !== "string" || !value.id || value.id.length > 160) return null;
  return { kind: value.kind, id: value.id };
};

const normalizePaperState = (value) => {
  if (!isPlainObject(value)) return {};
  const out = {};
  for (const [id, record] of Object.entries(value).slice(0, 5000)) {
    if (typeof id !== "string" || id.length > 160 || !isPlainObject(record)) continue;
    const status = READING_STATES.includes(record.status) ? record.status : null;
    const starred = record.starred === true;
    if (!status && !starred) continue;
    out[id] = {
      status,
      starred,
      updatedAt: typeof record.updatedAt === "string" ? record.updatedAt.slice(0, 40) : new Date().toISOString(),
    };
  }
  return out;
};

/**
 * The plan is the learner's own ordered intent. It references canonical entities
 * without owning them, and may contain items the curriculum knows nothing about.
 */
const normalizePlan = (value) => {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value.slice(0, 2000).filter(isPlainObject).map((item, index) => {
    const kind = PLAN_KINDS.includes(item.kind) ? item.kind : "custom";
    const refId = typeof item.refId === "string" ? item.refId.slice(0, 160) : "";
    return {
      id: typeof item.id === "string" && item.id.length <= 80 ? item.id : `PLAN-${index + 1}`,
      kind,
      refId: kind === "custom" ? "" : refId,
      title: typeof item.title === "string" ? item.title.slice(0, 400) : "",
      note: typeof item.note === "string" ? item.note.slice(0, 4000) : "",
      done: item.done === true,
      doneAt: typeof item.doneAt === "string" ? item.doneAt.slice(0, 40) : "",
      addedAt: typeof item.addedAt === "string" ? item.addedAt.slice(0, 40) : new Date().toISOString(),
    };
  }).filter((item) => {
    if (item.kind === "custom") return Boolean(item.title);
    if (!item.refId) return false;
    const key = `${item.kind}:${item.refId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const normalizeProposals = (value) => {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 500).filter(isPlainObject).map((item, index) => ({
    id: typeof item.id === "string" && item.id.length <= 80 ? item.id : `PROP-${index + 1}`,
    kind: PROPOSAL_KINDS.includes(item.kind) ? item.kind : "other",
    targetKind: typeof item.targetKind === "string" ? item.targetKind.slice(0, 24) : "paper",
    targetId: typeof item.targetId === "string" ? item.targetId.slice(0, 160) : "",
    topicId: typeof item.topicId === "string" ? item.topicId.slice(0, 24) : "",
    sessionId: typeof item.sessionId === "string" ? item.sessionId.slice(0, 160) : "",
    title: typeof item.title === "string" ? item.title.slice(0, 400) : "",
    url: typeof item.url === "string" ? item.url.slice(0, 2048) : "",
    rationale: typeof item.rationale === "string" ? item.rationale.slice(0, 8000) : "",
    detail: typeof item.detail === "string" ? item.detail.slice(0, 8000) : "",
    createdAt: typeof item.createdAt === "string" ? item.createdAt.slice(0, 40) : new Date().toISOString(),
  }));
};

const normalizeCustomItems = (value) => {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 1000).filter(isPlainObject).map((item, index) => ({
    id: typeof item.id === "string" && item.id.length <= 80 ? item.id : `MINE-${index + 1}`,
    kind: ["paper", "session", "material"].includes(item.kind) ? item.kind : "material",
    title: String(item.title ?? "").slice(0, 400),
    topicId: String(item.topicId ?? "").slice(0, 24),
    sessionId: String(item.sessionId ?? "").slice(0, 160),
    objective: String(item.objective ?? "").slice(0, 8000),
    url: String(item.url ?? item.source ?? "").slice(0, 2048),
    authors: String(item.authors ?? "").slice(0, 400),
    year: String(item.year ?? "").slice(0, 16),
    role: String(item.role ?? "").slice(0, 80),
    replacesId: String(item.replacesId ?? "").slice(0, 160),
    disabled: item.disabled === true,
    createdAt: typeof item.createdAt === "string" ? item.createdAt.slice(0, 40) : new Date().toISOString(),
  })).filter((item) => item.title);
};

export function normalizeState(value) {
  const base = blankState();
  if (!isPlainObject(value)) return base;
  const state = { ...base, ...value, schemaVersion: WORKSPACE_SCHEMA };

  state.entityStatus = isPlainObject(value.entityStatus)
    ? Object.fromEntries(Object.entries(value.entityStatus)
      .filter(([id, status]) => typeof id === "string" && id.length <= 160 && PROGRESS_STATES.includes(status)))
    : {};
  state.notes = isPlainObject(value.notes)
    ? Object.fromEntries(Object.entries(value.notes)
      .filter(([id, note]) => typeof id === "string" && id.length <= 160 && typeof note === "string")
      .map(([id, note]) => [id, note.slice(0, 200000)]))
    : {};
  state.competenceEvidence = isPlainObject(value.competenceEvidence) ? value.competenceEvidence : {};
  state.paperState = normalizePaperState(value.paperState);
  state.plan = normalizePlan(value.plan);
  state.planCollapsedDone = value.planCollapsedDone !== false;
  state.proposals = normalizeProposals(value.proposals);
  state.customItems = normalizeCustomItems(value.customItems);

  for (const key of ["competenceValidated", "sprintCovered", "activatedSessionIds", "disabledIds",
    "customOrder", "orderOverrides", "orphanArchive", "recentActivity", "compare"]) {
    state[key] = Array.isArray(value[key]) ? value[key] : [];
  }
  state.compare = state.compare.filter((id) => typeof id === "string" && id.length <= 160).slice(0, 4);
  state.recentActivity = state.recentActivity
    .filter((item) => isPlainObject(item) && typeof item.kind === "string"
      && typeof item.entityId === "string" && typeof item.label === "string" && typeof item.at === "string")
    .slice(0, 60);

  // Accept the schema-2 field name so older bundles keep their target.
  state.target = normalizeTarget(value.target)
    || (typeof value.targetTopicId === "string" ? { kind: "topic", id: value.targetTopicId } : null);

  state.curriculumRevision = typeof value.curriculumRevision === "string" && /^[0-9a-f]{64}$/.test(value.curriculumRevision)
    ? value.curriculumRevision
    : null;
  if (!PROFILES.includes(state.profile)) state.profile = "guided";
  if (!["system", "light", "dark"].includes(state.theme)) state.theme = "system";
  state.onboardingDismissed = value.onboardingDismissed === true;
  state.lastRoute = typeof value.lastRoute === "string" && value.lastRoute.startsWith("#/")
    ? value.lastRoute.slice(0, 400)
    : "#/";
  return state;
}

export class WorkspaceStore {
  constructor() {
    this.db = null;
    this.memoryState = blankState();
    this.persistent = true;
  }

  async open() {
    if (!("indexedDB" in window)) {
      this.persistent = false;
      return this;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("state")) db.createObjectStore("state", { keyPath: "key" });
        if (!db.objectStoreNames.contains("attachments")) {
          const store = db.createObjectStore("attachments", { keyPath: "id" });
          store.createIndex("entityId", "entityId", { unique: false });
        }
      };
      this.db = await requestResult(request);
    } catch (error) {
      console.warn("Persistent workspace unavailable; using memory for this visit.", error);
      this.persistent = false;
    }
    return this;
  }

  async load() {
    if (!this.db) return normalizeState(this.memoryState);
    const transaction = this.db.transaction("state", "readonly");
    const record = await requestResult(transaction.objectStore("state").get(STATE_KEY));
    return normalizeState(record?.value);
  }

  async save(state) {
    const normalized = normalizeState({ ...state, updatedAt: new Date().toISOString() });
    if (!this.db) {
      this.memoryState = normalized;
      return normalized;
    }
    const transaction = this.db.transaction("state", "readwrite");
    transaction.objectStore("state").put({ key: STATE_KEY, value: normalized });
    await transactionDone(transaction);
    return normalized;
  }

  /** One-time rescue of pre-stable-identity progress kept in localStorage. */
  async migrateLegacy(aliasMap, knownIds, state) {
    const next = normalizeState(state);
    let migrated = 0;
    let archived = 0;
    for (const key of LEGACY_KEYS) {
      let raw = null;
      try { raw = localStorage.getItem(key); } catch { raw = null; }
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        const ids = Array.isArray(parsed) ? parsed : (parsed.completedSessions || parsed.completed_sessions || []);
        for (const oldId of ids) {
          const stableId = knownIds.has(oldId) ? oldId : aliasMap.get(oldId);
          if (stableId) {
            next.entityStatus[stableId] = next.entityStatus[stableId] || "completed";
            migrated += 1;
          } else {
            next.orphanArchive.push({ kind: "legacy_progress", originalId: oldId, value: "completed", importedAt: new Date().toISOString() });
            archived += 1;
          }
        }
      } catch (error) {
        next.orphanArchive.push({ kind: "legacy_payload", originalId: key, value: String(raw).slice(0, 4000), error: String(error), importedAt: new Date().toISOString() });
        archived += 1;
      }
      try { localStorage.removeItem(key); } catch { /* storage may be blocked */ }
    }
    if (migrated || archived) await this.save(next);
    return { state: next, migrated, archived };
  }

  async putAttachment(entityId, file) {
    if (!this.db) throw new Error("Attachments require persistent browser storage.");
    const record = {
      id: crypto.randomUUID(),
      entityId,
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      addedAt: new Date().toISOString(),
      blob: file,
    };
    const transaction = this.db.transaction("attachments", "readwrite");
    transaction.objectStore("attachments").put(record);
    await transactionDone(transaction);
    return record;
  }

  async listAttachments(entityId = null) {
    if (!this.db) return [];
    const transaction = this.db.transaction("attachments", "readonly");
    const store = transaction.objectStore("attachments");
    const records = entityId
      ? await requestResult(store.index("entityId").getAll(entityId))
      : await requestResult(store.getAll());
    return records.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
  }

  async deleteAttachment(id) {
    if (!this.db) return;
    const transaction = this.db.transaction("attachments", "readwrite");
    transaction.objectStore("attachments").delete(id);
    await transactionDone(transaction);
  }

  async clearAll() {
    if (!this.db) {
      this.memoryState = blankState();
      return;
    }
    const transaction = this.db.transaction(["state", "attachments"], "readwrite");
    transaction.objectStore("state").clear();
    transaction.objectStore("attachments").clear();
    await transactionDone(transaction);
  }
}
