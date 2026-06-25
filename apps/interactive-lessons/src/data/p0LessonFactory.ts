import { option } from "./helpers";
import type { ConceptId, ConceptModule, DecisionLayer, LessonArchitecture, LessonPage, LessonReference } from "./types";

type P0Module = Omit<ConceptModule, "id" | "eyebrow" | "visual"> & { visual?: ConceptModule["visual"] };
type P0Question = { concept: ConceptId; prompt: string; correct: string; distractors: string[]; explanation: string };

export type P0LessonInput = {
  id: string;
  phase: string;
  title: string;
  summary: string;
  capabilityGoal: string;
  verifiableOutput: string;
  diagramType: LessonArchitecture["type"];
  hero: string;
  conceptIntro: string;
  decisionTitle: string;
  decisionIntro: string;
  decisionExample: string;
  modules: P0Module[];
  decisionLayers: DecisionLayer[];
  questions: P0Question[];
  references: LessonReference[];
};

const weights = [30, 25, 25, 20];

export function createP0Lesson(input: P0LessonInput): LessonPage {
  return {
    id: input.id,
    path: `/${input.id}`,
    phase: input.phase,
    title: input.title,
    status: "available",
    summary: input.summary,
    capabilityGoal: input.capabilityGoal,
    verifiableOutput: input.verifiableOutput,
    diagramType: input.diagramType,
    hero: input.hero,
    conceptIntro: input.conceptIntro,
    decisionTitle: input.decisionTitle,
    decisionIntro: input.decisionIntro,
    decisionExample: input.decisionExample,
    modules: input.modules.map((module, index) => ({
      ...module,
      id: `${input.id}-m${index + 1}`,
      eyebrow: `Concept ${String(index + 1).padStart(2, "0")}`,
      visual: module.visual ?? "schema"
    })),
    decisionLayers: input.decisionLayers,
    questions: input.questions.map((question, index) => ({
      id: `${input.id}-q${index + 1}`,
      type: "single",
      concept: question.concept,
      weight: weights[index] ?? 0,
      prompt: question.prompt,
      scenario: `请按“${input.title}”的真实工程约束判断。`,
      options: [option("a", question.correct, true), ...question.distractors.map((label, offset) => option(String.fromCharCode(98 + offset), label, false))],
      explanation: question.explanation
    })),
    references: input.references
  };
}
