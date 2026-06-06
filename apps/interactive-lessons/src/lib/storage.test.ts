import { beforeEach, describe, expect, it } from "vitest";
import {
  clearAttemptHistory,
  completeCurrentAttempt,
  deleteAttempt,
  exportAttemptHistory,
  loadAttemptHistory,
  loadCurrentAttempt,
  resetCurrentAttempt,
  saveCurrentAttempt
} from "./storage";
import type { Attempt, CurrentAttempt } from "../data/day01";

const current: CurrentAttempt = {
  id: "current-1",
  startedAt: "2026-06-06T10:00:00.000Z",
  answers: { q1: "a" }
};

const completed: Attempt = {
  id: "attempt-1",
  startedAt: "2026-06-06T10:00:00.000Z",
  completedAt: "2026-06-06T10:05:00.000Z",
  answers: { q1: "a", q2: "b" },
  score: 1,
  total: 2,
  weakConcepts: ["rag"],
  recommendations: ["复习 RAG 的边界。"]
};

beforeEach(() => {
  localStorage.clear();
});

describe("current attempt storage", () => {
  it("saves, loads, and resets current quiz progress", () => {
    saveCurrentAttempt(current);

    expect(loadCurrentAttempt()).toEqual(current);

    resetCurrentAttempt();

    expect(loadCurrentAttempt()).toBeNull();
  });
});

describe("attempt history storage", () => {
  it("moves a completed attempt into history and clears current progress", () => {
    saveCurrentAttempt(current);
    completeCurrentAttempt(completed);

    expect(loadCurrentAttempt()).toBeNull();
    expect(loadAttemptHistory()).toEqual([completed]);
  });

  it("deletes one history item and can clear all history", () => {
    completeCurrentAttempt(completed);
    completeCurrentAttempt({ ...completed, id: "attempt-2" });

    deleteAttempt("attempt-1");

    expect(loadAttemptHistory().map((attempt) => attempt.id)).toEqual(["attempt-2"]);

    clearAttemptHistory();

    expect(loadAttemptHistory()).toEqual([]);
  });

  it("exports history as readable JSON", () => {
    completeCurrentAttempt(completed);

    expect(exportAttemptHistory()).toContain('"weakConcepts"');
  });
});
