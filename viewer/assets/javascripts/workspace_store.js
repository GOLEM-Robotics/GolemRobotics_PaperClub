(() => {
  "use strict";

  const DB_NAME = "golem-curriculum-workspace";
  const DB_VERSION = 1;
  const STATE_KEY = "workspace";
  const LEGACY_KEYS = ["golem-curriculum-progress-v1", "golem-curriculum-completed"];

  const blankState = () => ({
    schemaVersion: 2,
    profile: "guided",
    targetTopicId: null,
    entityStatus: {},
    competenceValidated: [],
    competenceEvidence: {},
    sprintCovered: [],
    activatedSessionIds: [],
    notes: {},
    disabledIds: [],
    customOrder: [],
    orderOverrides: [],
    customItems: [],
    orphanArchive: [],
    recentActivity: [],
    curriculumRevision: null,
    lastRoute: { view: "home" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  function requestResult(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB request failed."));
    });
  }

  function transactionDone(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("IndexedDB transaction failed."));
      transaction.onabort = () => reject(transaction.error || new Error("IndexedDB transaction was aborted."));
    });
  }

  function normalizeState(value) {
    const base = blankState();
    if (!value || typeof value !== "object") return base;
    const state = { ...base, ...value, schemaVersion: 2 };
    state.entityStatus = value.entityStatus && typeof value.entityStatus === "object" ? value.entityStatus : {};
    state.notes = value.notes && typeof value.notes === "object" ? value.notes : {};
    state.competenceEvidence = value.competenceEvidence && typeof value.competenceEvidence === "object" ? value.competenceEvidence : {};
    for (const key of ["competenceValidated", "sprintCovered", "activatedSessionIds", "disabledIds", "customOrder", "orderOverrides", "customItems", "orphanArchive", "recentActivity"]) {
      state[key] = Array.isArray(value[key]) ? value[key] : [];
    }
    state.recentActivity = state.recentActivity.filter((item) => item && typeof item === "object"
      && typeof item.kind === "string" && typeof item.entityId === "string"
      && typeof item.label === "string" && typeof item.at === "string").slice(0, 100);
    state.curriculumRevision = typeof value.curriculumRevision === "string" && /^[0-9a-f]{64}$/.test(value.curriculumRevision)
      ? value.curriculumRevision
      : null;
    if (!["guided", "accelerated", "ai_sprint"].includes(state.profile)) state.profile = "guided";
    return state;
  }

  class WorkspaceStore {
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

    async migrateLegacy(aliasMap, knownIds, state) {
      const next = normalizeState(state);
      let migrated = 0;
      let archived = 0;
      for (const key of LEGACY_KEYS) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          const ids = Array.isArray(parsed)
            ? parsed
            : (parsed.completedSessions || parsed.completed_sessions || []);
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
          localStorage.removeItem(key);
        } catch (error) {
          next.orphanArchive.push({ kind: "legacy_payload", originalId: key, value: raw, error: String(error), importedAt: new Date().toISOString() });
          archived += 1;
          localStorage.removeItem(key);
        }
      }
      if (migrated || archived) await this.save(next);
      return { state: next, migrated, archived };
    }

    async putAttachment(entityId, file) {
      const record = {
        id: crypto.randomUUID(),
        entityId,
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        addedAt: new Date().toISOString(),
        blob: file,
      };
      if (!this.db) throw new Error("Attachments require persistent browser storage.");
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

  window.GolemWorkspaceStore = { WorkspaceStore, blankState, normalizeState };
})();
