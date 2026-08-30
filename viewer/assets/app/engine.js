"use strict";

/**
 * Readiness, progress and recommendation logic.
 *
 * Everything the interface claims about "what next" must be explainable, so each
 * recommendation carries the reasons that produced it.
 */

import { PROFILE } from "./constants.js";
import { formatMinutes, plural } from "./dom.js";

const DONE = new Set(["completed"]);

export class Engine {
  constructor(model, state) {
    this.model = model;
    this.state = state;
    this.cache = new Map();
  }

  /** Called whenever personal state changes so derived values stay honest. */
  invalidate(state) {
    if (state) this.state = state;
    this.cache.clear();
  }

  memo(key, compute) {
    if (!this.cache.has(key)) this.cache.set(key, compute());
    return this.cache.get(key);
  }

  // ---------------------------------------------------------------- status
  statusOf(id) {
    return this.state.entityStatus[id] || "not_started";
  }

  isDone(id) {
    return DONE.has(this.statusOf(id));
  }

  isDisabled(id) {
    return this.state.disabledIds.includes(id);
  }

  readingStateOf(paperId) {
    return this.state.paperState[paperId] || { status: null, starred: false };
  }

  // -------------------------------------------------------------- progress
  topicMetrics(topicId) {
    return this.memo(`topic:${topicId}`, () => {
      const topic = this.model.topicById.get(topicId);
      if (!topic) return null;
      const core = topic.completion_model.required_core_session_ids;
      const continuation = topic.completion_model.continuation_session_ids;
      const optional = topic.completion_model.optional_session_ids;
      const activatedContinuation = continuation.filter((id) => this.state.activatedSessionIds.includes(id));
      const activatedOptional = optional.filter((id) => this.state.activatedSessionIds.includes(id));
      const activated = [...core, ...activatedContinuation, ...activatedOptional];
      const countDone = (ids) => ids.filter((id) => this.isDone(id)).length;
      const validated = this.state.competenceValidated.includes(topicId);
      const coreDone = countDone(core);
      const coreComplete = core.length > 0 && coreDone === core.length;
      return {
        topicId,
        coreDone,
        coreTotal: core.length,
        continuationDone: countDone(continuation),
        continuationTotal: continuation.length,
        activatedDone: countDone(activated),
        activatedTotal: activated.length,
        sprintDone: core.filter((id) => this.state.sprintCovered.includes(id)).length,
        started: coreDone > 0 || core.some((id) => this.statusOf(id) === "in_progress"),
        validated,
        coreComplete,
        readinessSatisfied: validated || coreComplete,
      };
    });
  }

  /**
   * A topic is enterable when its topic-scoped hard prerequisites are satisfied.
   * Session-scoped gates block only the specific sessions they name, not the topic.
   */
  isTopicReady(topicId) {
    return this.memo(`ready:${topicId}`, () => (this.model.hardIncoming.get(topicId) || [])
      .every((dependency) => this.topicMetrics(dependency)?.readinessSatisfied));
  }

  topicBlockers(topicId) {
    return (this.model.hardIncoming.get(topicId) || [])
      .filter((dependency) => !this.topicMetrics(dependency)?.readinessSatisfied);
  }

  isSessionReady(session) {
    if (!this.isTopicReady(session.topic_id)) return false;
    if (this.state.competenceValidated.includes(session.topic_id)) return true;
    const localReady = session.readiness.prior_session_ids.every((id) => this.isDone(id) || this.isDisabled(id));
    const gatesReady = session.relationship_gates.every((id) => {
      const edge = this.model.relationshipById.get(id);
      return edge && this.topicMetrics(edge.source)?.readinessSatisfied;
    });
    return localReady && gatesReady;
  }

  sessionBlockers(session) {
    const blockers = [];
    for (const id of session.readiness.prior_session_ids) {
      if (!this.isDone(id) && !this.isDisabled(id)) {
        blockers.push({ kind: "session", id, label: this.label(id) });
      }
    }
    for (const relationshipId of session.relationship_gates) {
      const edge = this.model.relationshipById.get(relationshipId);
      if (edge && !this.topicMetrics(edge.source)?.readinessSatisfied) {
        blockers.push({ kind: "topic", id: edge.source, label: this.label(edge.source), rationale: edge.rationale });
      }
    }
    for (const topicId of this.topicBlockers(session.topic_id)) {
      if (!blockers.some((item) => item.id === topicId)) {
        blockers.push({ kind: "topic", id: topicId, label: this.label(topicId) });
      }
    }
    return blockers;
  }

  label(id) {
    const topic = this.model.topicById.get(id);
    if (topic) return `${topic.id} — ${topic.title}`;
    const session = this.model.sessionById.get(id);
    if (session) return `${session.display_id} — ${session.title}`;
    const paper = this.model.paperById.get(id);
    if (paper) return `${paper.id} — ${paper.title}`;
    const resource = this.model.resourceById.get(id);
    if (resource) return `${resource.id} — ${resource.title}`;
    const frontier = this.model.frontierById.get(id);
    if (frontier) return `${frontier.id} — ${frontier.title}`;
    const personal = this.state.customItems.find((item) => item.id === id);
    if (personal) return personal.title;
    return id;
  }

  // ------------------------------------------------------------ global view
  overallProgress() {
    return this.memo("overall", () => {
      let core = 0;
      let coreDone = 0;
      let topicsComplete = 0;
      let topicsStarted = 0;
      for (const topic of this.model.topics) {
        const metrics = this.topicMetrics(topic.id);
        core += metrics.coreTotal;
        coreDone += metrics.coreDone;
        if (metrics.coreComplete || metrics.validated) topicsComplete += 1;
        else if (metrics.started) topicsStarted += 1;
      }
      const papersRead = Object.values(this.state.paperState).filter((item) => item.status === "read").length;
      return { core, coreDone, topicsComplete, topicsStarted, papersRead };
    });
  }

  /** The topic the learner is currently inside, if any. */
  activeTopic() {
    return this.memo("activeTopic", () => {
      for (const entry of this.state.recentActivity) {
        const session = this.model.sessionById.get(entry.entityId);
        if (session) {
          const metrics = this.topicMetrics(session.topic_id);
          if (metrics && !metrics.coreComplete) return this.model.topicById.get(session.topic_id);
        }
        const topic = this.model.topicById.get(entry.entityId);
        if (topic && !this.topicMetrics(topic.id).coreComplete) return topic;
      }
      const started = this.model.topics.find((topic) => {
        const metrics = this.topicMetrics(topic.id);
        return metrics.started && !metrics.coreComplete;
      });
      return started || null;
    });
  }

  // ------------------------------------------------------- target planning
  /** Resolve the learner's target into the topic that has to be reached. */
  targetTopicId(target = this.state.target) {
    if (!target) return null;
    if (target.kind === "topic") return this.model.topicById.has(target.id) ? target.id : null;
    if (target.kind === "session") return this.model.sessionById.get(target.id)?.topic_id ?? null;
    if (target.kind === "paper") {
      const paper = this.model.paperById.get(target.id);
      if (!paper) return null;
      const session = paper.focusSessionId ? this.model.sessionById.get(paper.focusSessionId) : null;
      return session?.topic_id ?? paper.topic_id;
    }
    return null;
  }

  targetLabel(target = this.state.target) {
    if (!target) return null;
    return this.label(target.id);
  }

  /** Topics that must be traversed to reach the target, in a valid order. */
  routeTopics(targetId = this.targetTopicId()) {
    if (!targetId) {
      return this.model.topics.slice().sort((a, b) => a.rank - b.rank
        || a.area_order - b.area_order || a.id.localeCompare(b.id));
    }
    const included = new Set();
    const visit = (id) => {
      if (included.has(id)) return;
      included.add(id);
      for (const source of this.model.coreGateIncoming.get(id) || []) visit(source);
    };
    visit(targetId);
    let route = this.model.topics.filter((topic) => included.has(topic.id));
    route.sort((a, b) => a.rank - b.rank || a.area_order - b.area_order || a.id.localeCompare(b.id));
    if (this.state.customOrder.length) {
      const index = new Map(this.state.customOrder.map((id, position) => [id, position]));
      const candidate = route.slice().sort((a, b) => (index.get(a.id) ?? 9999) - (index.get(b.id) ?? 9999)
        || a.rank - b.rank || a.id.localeCompare(b.id));
      const violations = this.orderViolations(candidate.map((topic) => topic.id));
      if (violations.every((edge) => this.state.orderOverrides.includes(edge.id))) route = candidate;
    }
    return route;
  }

  orderViolations(routeIds) {
    const position = new Map(routeIds.map((id, index) => [id, index]));
    return this.model.relationships.filter((edge) => edge.type === "hard_prerequisite"
      && position.has(edge.source) && position.has(edge.target)
      && position.get(edge.source) > position.get(edge.target));
  }

  /** Sessions still outstanding on the way to the target. */
  routeSessions(targetId = this.targetTopicId()) {
    const topics = this.routeTopics(targetId);
    const out = [];
    for (const topic of topics) {
      if (this.isDisabled(topic.id)) continue;
      if (this.topicMetrics(topic.id).validated) continue;
      for (const id of topic.completion_model.required_core_session_ids) {
        if (this.isDisabled(id) || this.isDone(id) || this.statusOf(id) === "skipped") continue;
        out.push(this.model.sessionById.get(id));
      }
    }
    // A session target does not need the rest of its topic.
    const target = this.state.target;
    if (target?.kind === "session" || target?.kind === "paper") {
      const stopId = target.kind === "session"
        ? target.id
        : this.model.paperById.get(target.id)?.focusSessionId;
      const stop = this.model.sessionById.get(stopId);
      if (stop) {
        const index = out.findIndex((session) => session.id === stop.id);
        if (index >= 0) return out.slice(0, index + 1);
        return out.filter((session) => session.topic_id !== stop.topic_id
          || session.sequence <= stop.sequence).concat(this.isDone(stop.id) ? [] : [stop])
          .filter((session, position, list) => list.findIndex((item) => item.id === session.id) === position);
      }
    }
    return out;
  }

  // ------------------------------------------------------- recommendations
  /** Ordered, explained next moves. The first is the primary recommendation. */
  recommendations(limit = 3) {
    return this.memo(`recs:${limit}`, () => {
      const results = [];
      const seen = new Set();
      const profile = PROFILE[this.state.profile];

      const push = (session, reasons, kind) => {
        if (!session || seen.has(session.id)) return;
        seen.add(session.id);
        results.push({ session, reasons, kind, topic: this.model.topicById.get(session.topic_id) });
      };

      const inProgress = this.model.sessions.find((session) => this.statusOf(session.id) === "in_progress"
        && !this.isDisabled(session.id));
      if (inProgress) {
        push(inProgress, ["You marked this session in progress and have not closed it out."], "resume");
      }

      const targetTopic = this.targetTopicId();
      const routes = targetTopic ? this.routeTopics(targetTopic) : this.candidateTopics();

      for (const topic of routes) {
        if (results.length >= limit) break;
        if (this.isDisabled(topic.id) || !this.isTopicReady(topic.id)) continue;
        const metrics = this.topicMetrics(topic.id);
        if (metrics.validated || metrics.coreComplete) continue;
        const session = topic.completion_model.required_core_session_ids
          .map((id) => this.model.sessionById.get(id))
          .find((item) => item && !this.isDisabled(item.id) && !this.isDone(item.id)
            && this.statusOf(item.id) !== "skipped" && this.isSessionReady(item));
        if (!session) continue;

        const reasons = [];
        reasons.push(topic.curriculum_role);
        const gates = this.model.hardIncoming.get(topic.id) || [];
        reasons.push(gates.length
          ? `Every hard prerequisite is satisfied (${gates.join(", ")}).`
          : "It has no blocking prerequisite, so it is a valid entry point.");
        if (metrics.started) reasons.push(`Continues ${topic.id}, the topic you are already inside (${metrics.coreDone}/${metrics.coreTotal} core done).`);
        const downstream = this.model.hardOutgoing.get(topic.id) || [];
        if (downstream.length) {
          const shown = downstream.slice(0, 4).join(", ");
          reasons.push(`${plural(downstream.length, "later topic")} depend on it: ${shown}${downstream.length > 4 ? " and more." : "."}`);
        }
        if (targetTopic && topic.id !== targetTopic) reasons.push(`It is on the shortest valid path to your target ${targetTopic}.`);
        if (targetTopic && topic.id === targetTopic) reasons.push("This is your target topic.");
        if (session.papers.length) {
          const titles = session.papers.map((id) => this.model.paperById.get(id)?.title).filter(Boolean);
          reasons.push(`Primary source: ${titles.join("; ")}.`);
        }
        reasons.push(`${profile.label}: about ${this.effort(1)}.`);
        push(session, reasons, metrics.started ? "continue" : "start");
      }
      return results;
    });
  }

  candidateTopics() {
    const active = this.activeTopic();
    const ordered = this.model.topics.slice().sort((a, b) => a.rank - b.rank
      || a.area_order - b.area_order || a.id.localeCompare(b.id));
    if (!active) return ordered;
    return [active, ...ordered.filter((topic) => topic.id !== active.id)];
  }

  /** Papers the learner should read next, with the reason for each. */
  readingSuggestions(limit = 4) {
    return this.memo(`reading:${limit}`, () => {
      const out = [];
      const seen = new Set();
      for (const id of Object.keys(this.state.paperState)) {
        if (out.length >= limit) break;
        const record = this.state.paperState[id];
        const paper = this.model.paperById.get(id);
        if (!paper || this.isDisabled(id)) continue;
        if (record.status === "reading") {
          seen.add(id);
          out.push({ paper, reason: "You marked this one as being read right now." });
        }
      }
      for (const recommendation of this.recommendations(3)) {
        if (out.length >= limit) break;
        for (const paperId of recommendation.session.papers) {
          if (out.length >= limit || seen.has(paperId)) continue;
          const paper = this.model.paperById.get(paperId);
          if (!paper || this.isDisabled(paperId)) continue;
          if (this.readingStateOf(paperId).status === "read") continue;
          seen.add(paperId);
          out.push({ paper, reason: `Assigned to ${recommendation.session.display_id}, your ${out.length === 0 ? "next" : "upcoming"} session.` });
        }
      }
      for (const id of Object.keys(this.state.paperState)) {
        if (out.length >= limit || seen.has(id)) continue;
        if (this.state.paperState[id].status !== "queued") continue;
        const paper = this.model.paperById.get(id);
        if (!paper || this.isDisabled(id)) continue;
        seen.add(id);
        out.push({ paper, reason: "You added it to your reading list." });
      }
      // A session without an assigned paper still sits inside a topic lineage: offer its opening source.
      for (const recommendation of this.recommendations(3)) {
        if (out.length >= limit) break;
        const lineage = this.model.papersByTopic.get(recommendation.session.topic_id) || [];
        for (const paperId of lineage) {
          if (out.length >= limit || seen.has(paperId)) continue;
          const paper = this.model.paperById.get(paperId);
          if (!paper || this.isDisabled(paperId)) continue;
          if (this.readingStateOf(paperId).status === "read") continue;
          seen.add(paperId);
          out.push({
            paper,
            reason: `Opens the ${recommendation.session.topic_id} paper lineage, which ${recommendation.session.display_id} leads into.`,
          });
          break;
        }
      }
      return out;
    });
  }

  /** Papers whose understanding the curriculum expects before this one. */
  paperPrerequisites(paper) {
    const before = [];
    const order = this.model.papersByTopic.get(paper.topic_id) || [];
    const position = order.indexOf(paper.id);
    for (const id of order.slice(0, Math.max(position, 0))) {
      const other = this.model.paperById.get(id);
      if (other) before.push({ paper: other, reason: `Earlier in the ${paper.topic_id} lineage.` });
    }
    const session = paper.focusSessionId ? this.model.sessionById.get(paper.focusSessionId) : null;
    const topics = [];
    if (session) {
      for (const relationshipId of session.relationship_gates) {
        const edge = this.model.relationshipById.get(relationshipId);
        if (edge) topics.push({ topic: this.model.topicById.get(edge.source), reason: edge.rationale });
      }
    }
    for (const topicId of this.model.coreGateIncoming.get(paper.topic_id) || []) {
      if (!topics.some((item) => item.topic?.id === topicId)) {
        topics.push({
          topic: this.model.topicById.get(topicId),
          reason: `${topicId} is a hard prerequisite of ${paper.topic_id}.`,
        });
      }
    }
    return { papers: before, topics: topics.filter((item) => item.topic) };
  }

  /** What reading this paper opens up. */
  paperUnlocks(paper) {
    const out = [];
    const order = this.model.papersByTopic.get(paper.topic_id) || [];
    const position = order.indexOf(paper.id);
    if (position >= 0) {
      for (const id of order.slice(position + 1, position + 4)) {
        const other = this.model.paperById.get(id);
        if (other) out.push({ paper: other, reason: `Next in the ${paper.topic_id} lineage.` });
      }
    }
    return out.slice(0, 6);
  }

  // ------------------------------------------------------------- the plan
  /**
   * Whether a plan item is finished. Canonical items reuse the single record
   * that already exists for them, so the plan never becomes a second truth.
   */
  planItemDone(item) {
    if (item.kind === "custom") return item.done;
    if (item.kind === "paper") return this.readingStateOf(item.refId).status === "read";
    if (item.kind === "session") return this.isDone(item.refId);
    if (item.kind === "topic") {
      const metrics = this.topicMetrics(item.refId);
      return Boolean(metrics && (metrics.coreComplete || metrics.validated));
    }
    if (item.kind === "resource") return item.done;
    return item.done;
  }

  planItemLabel(item) {
    if (item.kind === "custom") return item.title;
    return this.label(item.refId);
  }

  planItemExists(item) {
    if (item.kind === "custom") return true;
    if (item.kind === "paper") return this.model.paperById.has(item.refId);
    if (item.kind === "session") return this.model.sessionById.has(item.refId);
    if (item.kind === "topic") return this.model.topicById.has(item.refId);
    if (item.kind === "resource") return this.model.resourceById.has(item.refId);
    return false;
  }

  planEntries() {
    return this.memo("plan", () => this.state.plan
      .filter((item) => this.planItemExists(item))
      .map((item) => ({ item, done: this.planItemDone(item) })));
  }

  planNext() {
    return this.planEntries().find((entry) => !entry.done) || null;
  }

  planProgress() {
    const entries = this.planEntries();
    return { total: entries.length, done: entries.filter((entry) => entry.done).length };
  }

  inPlan(kind, refId) {
    return this.state.plan.some((item) => item.kind === kind && item.refId === refId);
  }

  /** Effort for a plan item, so a plan can be costed before it is committed to. */
  planItemEffort(item) {
    if (item.kind === "session") return 1;
    if (item.kind === "topic") return this.remainingCore(item.refId);
    return 0;
  }

  /** How a paper relates to what the learner is actually doing right now. */
  paperRelevance(paperId) {
    const map = this.memo("relevance", () => {
      const index = new Map();
      const mark = (id, key) => {
        if (!index.has(id)) index.set(id, {});
        index.get(id)[key] = true;
      };
      for (const recommendation of this.recommendations(3)) {
        for (const id of recommendation.session.papers) mark(id, recommendation === this.recommendations(3)[0] ? "next" : "soon");
      }
      const active = this.activeTopic();
      if (active) for (const id of this.model.papersByTopic.get(active.id) || []) mark(id, "activeTopic");
      const targetTopic = this.targetTopicId();
      if (targetTopic) {
        for (const topic of this.routeTopics(targetTopic)) {
          for (const id of this.model.papersByTopic.get(topic.id) || []) mark(id, "route");
        }
      }
      return index;
    });
    return map.get(paperId) || {};
  }

  // -------------------------------------------------------------- estimates
  effort(sessionCount = 1) {
    const [minimum, maximum] = PROFILE[this.state.profile].minutes;
    if (!sessionCount) return "nothing outstanding";
    return `${formatMinutes(minimum * sessionCount)}–${formatMinutes(maximum * sessionCount)}`;
  }

  remainingCore(topicId) {
    const metrics = this.topicMetrics(topicId);
    return Math.max(metrics.coreTotal - metrics.coreDone, 0);
  }
}
