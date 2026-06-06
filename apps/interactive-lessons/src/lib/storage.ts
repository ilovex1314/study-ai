import type { Attempt, CurrentAttempt } from "../data/day01";

export const storageKeys = {
  currentAttempt: "study-ai.day01.currentAttempt",
  attemptHistory: "study-ai.day01.attemptHistory",
  reviewPreferences: "study-ai.day01.reviewPreferences"
} as const;

function scopedKey(lessonId: string, kind: "currentAttempt" | "attemptHistory" | "reviewPreferences") {
  if (lessonId === "day01") {
    return storageKeys[kind];
  }

  return `study-ai.${lessonId}.${kind}`;
}

function readJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function createCurrentAttempt(now = new Date().toISOString()): CurrentAttempt {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `attempt-${now}`;

  return {
    id,
    startedAt: now,
    answers: {}
  };
}

export function loadCurrentAttempt(lessonId = "day01"): CurrentAttempt | null {
  return readJson<CurrentAttempt | null>(scopedKey(lessonId, "currentAttempt"), null);
}

export function saveCurrentAttempt(attempt: CurrentAttempt, lessonId = "day01") {
  writeJson(scopedKey(lessonId, "currentAttempt"), attempt);
}

export function resetCurrentAttempt(lessonId = "day01") {
  localStorage.removeItem(scopedKey(lessonId, "currentAttempt"));
}

export function loadAttemptHistory(lessonId = "day01"): Attempt[] {
  return readJson<Attempt[]>(scopedKey(lessonId, "attemptHistory"), []);
}

export function saveAttemptHistory(history: Attempt[], lessonId = "day01") {
  writeJson(scopedKey(lessonId, "attemptHistory"), history);
}

export function completeCurrentAttempt(attempt: Attempt, lessonId = "day01") {
  const history = loadAttemptHistory(lessonId);
  saveAttemptHistory([attempt, ...history], lessonId);
  resetCurrentAttempt(lessonId);
}

export function deleteAttempt(id: string, lessonId = "day01") {
  saveAttemptHistory(loadAttemptHistory(lessonId).filter((attempt) => attempt.id !== id), lessonId);
}

export function clearAttemptHistory(lessonId = "day01") {
  localStorage.removeItem(scopedKey(lessonId, "attemptHistory"));
}

export function exportAttemptHistory(lessonId = "day01") {
  return JSON.stringify(loadAttemptHistory(lessonId), null, 2);
}
