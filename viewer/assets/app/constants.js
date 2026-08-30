"use strict";

export const PROFILE = {
  guided: {
    id: "guided",
    label: "Guided",
    tagline: "Complete and unhurried",
    description: "Work every Required Core session in order: full source reading, reconstruction, practice and explicit evidence.",
    verb: "Work through the source and build the planned artifact",
    minutes: [75, 120],
    assistance: "Use AI for prerequisite repair, Socratic questioning and feedback after you have attempted the source yourself.",
    validation: "Complete the full planned evidence and review it against the canonical competence boundary.",
    compression: "Nothing in the core is compressed. Optional material stays opt-in.",
    credit: "Completing a session here counts towards Required Core.",
  },
  accelerated: {
    id: "accelerated",
    label: "Accelerated",
    tagline: "Faster, same competence gates",
    description: "Keep every competence boundary while compressing orientation, reading only decisive sections and skipping duplicate setup.",
    verb: "Read the decisive sections, test the central claim, and keep the required artifact",
    minutes: [35, 60],
    assistance: "Use AI to diagnose gaps, explain only the prerequisites you are missing and challenge your reconstruction.",
    validation: "The required artifact and the essential evidence gate survive even when preparation is compressed.",
    compression: "Broad orientation, repeated setup and non-decisive sections may be compressed. Evidence gates may not.",
    credit: "Completing a session here still counts towards Required Core.",
  },
  ai_sprint: {
    id: "ai_sprint",
    label: "AI Sprint",
    tagline: "Fastest useful understanding",
    description: "Reach operational understanding quickly with AI, then verify the claims against the authoritative sources yourself.",
    verb: "Interrogate the method with AI, verify it against the source, and record what you did not check",
    minutes: [15, 30],
    assistance: "The generated prompt set is your primary walkthrough. Afterwards you still open the named sections yourself.",
    validation: "Record Sprint coverage after an active check. Required Core still needs its canonical evidence.",
    compression: "Broad reading and known prerequisites may be compressed. Source verification and an active check may not.",
    credit: "This records Sprint coverage, which is deliberately separate from Required Core completion.",
  },
};

export const READING_LABEL = {
  queued: "To read",
  reading: "Reading",
  skimmed: "Skimmed",
  read: "Read",
};

export const READING_ORDER = ["queued", "reading", "skimmed", "read"];

export const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
  skipped: "Skipped in my path",
};

export const AREA_TONE = {
  shared_foundations: "indigo",
  perception_world_models: "teal",
  learning_to_act: "violet",
  data_research_systems: "amber",
  language_embodied_reasoning: "rose",
  specialization_branches: "slate",
};

export const CLASSIFICATION_LABEL = {
  "Required Core": "Core",
  "Frontier Continuation": "Frontier",
  "Optional Specialization": "Optional",
  Quarantined: "Quarantined",
};

export const PROPOSAL_LABEL = {
  add: "Add this source to the canon",
  replace: "Replace a canonical source",
  correct: "Correct canonical metadata",
  remove: "Retire a canonical source",
  move: "Move it to a different topic or session",
  other: "Something else",
};

export const MAX_BUNDLE_BYTES = 40 * 1024 * 1024;
export const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_ATTACHMENT_BYTES = 24 * 1024 * 1024;
export const MAX_ATTACHMENTS = 200;
