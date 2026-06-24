import { describe, expect, it } from "vitest";
import { lessons } from "./lessons";

describe("curriculum contract", () => {
  it("publishes the ordered Day01-Day20 capability route", async () => {
    const { curriculum } = await import("./curriculum");

    expect(curriculum).toHaveLength(20);
    expect(curriculum.map((day) => day.phase)).toEqual(
      Array.from({ length: 20 }, (_, index) => `Day${String(index + 1).padStart(2, "0")}`)
    );
    expect(lessons).toHaveLength(20);
  });

  it("requires every lesson question set to sum to 100 points", () => {
    for (const lesson of lessons) {
      expect(lesson.questions.reduce((sum, question) => sum + question.weight, 0)).toBe(100);
    }
  });

  it("ships complete learning material instead of placeholder lessons", () => {
    for (const lesson of lessons) {
      expect(lesson.modules.length).toBeGreaterThanOrEqual(4);
      expect(lesson.decisionLayers.length).toBeGreaterThanOrEqual(3);
      expect(lesson.questions.length).toBeGreaterThanOrEqual(4);
    }
  });
});
