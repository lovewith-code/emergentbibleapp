// src/constants/config.ts
// Feature flags — set to true when feature is ready to ship
// This allows building screens without breaking current app

export const FEATURES = {
  AI_CHAT:         false,   // v2 — Anthropic API integration
  AUDIO_BIBLE:     false,   // v2 — expo-av audio playback
  COMMUNITY:       false,   // v3 — prayer wall, sharing
  SYNC:            false,   // v2 — Supabase cross-device sync
  READING_PLANS:   false,   // v2 — structured daily plans
  STRONGS:         false,   // v3 — Strong's concordance
} as const;

export const APP_VERSION = '1.0.0';
export const DB_VERSION = 1;
export const SEARCH_MIN_CHARS = 3;
export const SEARCH_DEBOUNCE_MS = 400;
export const DB_SEED_CHUNK_SIZE = 500;
export const HISTORY_MAX_RECORDS = 100;
export const SKELETON_COUNT = 8;       // default number of skeleton rows