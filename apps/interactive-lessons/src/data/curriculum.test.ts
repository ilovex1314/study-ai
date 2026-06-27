import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { lessons } from "./lessons";

const root = resolve(process.cwd(), "../..");

describe("curriculum contract", () => {
  it("publishes the ordered Day01-Day20 capability route", async () => {
    const { curriculum } = await import("./curriculum");

    expect(curriculum).toHaveLength(20);
    expect(curriculum.map((day) => day.phase)).toEqual(
      Array.from({ length: 20 }, (_, index) => `Day${String(index + 1).padStart(2, "0")}`)
    );
    expect(lessons).toHaveLength(20);
  });

  it("keeps Markdown day files, typed lesson files, registry ids and routes aligned", () => {
    const dayIds = Array.from({ length: 20 }, (_, index) => `day${String(index + 1).padStart(2, "0")}`);

    expect(lessons.map((lesson) => lesson.id)).toEqual(dayIds);
    expect(lessons.map((lesson) => lesson.path)).toEqual(dayIds.map((id) => `/${id}`));

    for (const id of dayIds) {
      expect(existsSync(resolve(root, `docs/interactive-learning/${id}.md`))).toBe(true);
      expect(existsSync(resolve(root, `apps/interactive-lessons/src/data/${id}.ts`))).toBe(true);
    }
  });

  it("requires every typed lesson to expose the P0 source-of-truth schema", () => {
    for (const lesson of lessons) {
      expect(lesson.capabilityGoal).toEqual(expect.any(String));
      expect(lesson.capabilityGoal.length).toBeGreaterThan(8);
      expect(lesson.verifiableOutput).toEqual(expect.any(String));
      expect(lesson.verifiableOutput.length).toBeGreaterThan(6);
      expect(["boundary", "lifecycle", "layered", "state", "feedback", "gate", "flywheel", "pipeline"]).toContain(lesson.diagramType);
      expect(lesson.references.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("aligns new P0 typed lessons with the upgraded Markdown source titles and references", () => {
    for (const lesson of lessons.slice(13)) {
      const markdown = readFileSync(resolve(root, `docs/interactive-learning/${lesson.id}.md`), "utf8");
      expect(markdown).toContain(lesson.title);
      for (const reference of lesson.references) {
        expect(markdown).toContain(reference.url);
      }
    }
  });

  it("requires every lesson question set to sum to 100 points", () => {
    for (const lesson of lessons) {
      expect(lesson.questions.reduce((sum, question) => sum + question.weight, 0)).toBe(100);
    }
  });

  it("allows lessons to use flexible question counts", () => {
    expect(lessons.some((lesson) => lesson.questions.length !== 4)).toBe(true);
  });

  it("keeps quiz counts driven by lesson content instead of a fixed template", () => {
    const questionCounts = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson.questions.length]));

    expect(questionCounts.day01).toBe(5);
    for (const compactLesson of ["day05", "day06", "day07", "day08", "day11", "day13"]) {
      expect(questionCounts[compactLesson]).toBe(4);
    }
    for (const denseLesson of ["day02", "day03", "day04", "day09", "day10", "day12", "day14", "day15"]) {
      expect(questionCounts[denseLesson]).toBeGreaterThan(4);
    }
    expect(new Set(Object.values(questionCounts)).size).toBeGreaterThan(1);
  });

  it("ships complete learning material instead of placeholder lessons", () => {
    for (const lesson of lessons) {
      expect(lesson.modules.length).toBeGreaterThanOrEqual(4);
      expect(lesson.decisionLayers.length).toBeGreaterThanOrEqual(3);
      expect(lesson.questions.length).toBeGreaterThan(0);
      expect(lesson.questions.every((question) => typeof question.weight === "number")).toBe(true);
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

  it("requires architecture metadata to use semantic edges or groups", () => {
    for (const lesson of lessons) {
      const architecture = lesson.architecture;
      expect(architecture).toBeTruthy();
      if (!architecture || architecture.renderMode === "none") continue;

      expect(architecture.nodes.every((node) => node.id && node.label)).toBe(true);
      expect(architecture.nodes.every((node) => !/[→←↔]|->|<-/.test(node.label))).toBe(true);
      expect((architecture.edges?.length ?? 0) + (architecture.groups?.length ?? 0)).toBeGreaterThan(0);
    }
  });

  it("validates relation-specific architecture semantics", () => {
    for (const lesson of lessons) {
      const architecture = lesson.architecture;
      if (!architecture || architecture.renderMode === "none") continue;
      const relations = new Set((architecture.edges ?? []).map((edge) => edge.relation));
      const groupKinds = new Set((architecture.groups ?? []).map((group) => group.kind));

      if (architecture.type === "feedback" || architecture.type === "flywheel") {
        expect(relations.has("feedback")).toBe(true);
      }
      if (architecture.type === "gate" || architecture.type === "state") {
        expect([...relations].some((relation) => relation === "branch" || relation === "guard" || relation === "feedback")).toBe(true);
      }
      if (architecture.type === "layered") {
        expect(groupKinds.has("layer") || groupKinds.has("lane")).toBe(true);
      }
      if (architecture.type === "boundary") {
        expect(groupKinds.has("boundary") || [...relations].some((relation) => relation === "guard" || relation === "dependency")).toBe(true);
      }
    }
  });
});
