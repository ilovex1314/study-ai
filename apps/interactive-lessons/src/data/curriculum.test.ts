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

  it("allows a lesson module to omit a visual diagram", () => {
    const day14 = lessons.find((lesson) => lesson.id === "day14");
    expect(day14?.modules.some((module) => !("diagram" in module))).toBe(true);
  });

  it("requires every authored diagram to contain a conclusion and labeled nodes", () => {
    const diagrams = lessons.flatMap((lesson) => lesson.modules.map((module) => module as typeof module & {
      diagram?: { conclusion: string; nodes: Array<{ label: string }> };
    })).flatMap((module) => module.diagram ? [module.diagram] : []);

    expect(diagrams.length).toBeGreaterThan(0);
    for (const diagram of diagrams) {
      expect(diagram.conclusion).not.toHaveLength(0);
      expect(diagram.nodes.length).toBeGreaterThanOrEqual(2);
      expect(diagram.nodes.every((node) => node.label.length > 0)).toBe(true);
    }
  });

  it("gives every lesson its own authored architecture instead of a shared fallback", () => {
    const architectures = lessons.map((lesson) => (lesson as typeof lesson & {
      architecture?: { title: string; nodes: Array<{ label: string }> };
    }).architecture);

    expect(architectures.every((architecture) => architecture && architecture.nodes.length >= 3)).toBe(true);
    expect(new Set(architectures.map((architecture) => architecture?.title)).size).toBe(20);
  });
});
