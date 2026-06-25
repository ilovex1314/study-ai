import type { LessonSummary } from "./types";
import { day01Lesson } from "./day01";
import { day02Lesson } from "./day02";
import { day03Lesson } from "./day03";
import { day04Lesson } from "./day04";
import { day05Lesson } from "./day05";
import { day06Lesson } from "./day06";
import { day07Lesson } from "./day07";
import { day08Lesson } from "./day08";
import { day09Lesson } from "./day09";
import { day10Lesson } from "./day10";
import { day11Lesson } from "./day11";
import { day12Lesson } from "./day12";
import { day13Lesson } from "./day13";
import { day14Lesson } from "./day14";
import { day15Lesson } from "./day15";
import { day16Lesson } from "./day16";
import { day17Lesson } from "./day17";
import { day18Lesson } from "./day18";
import { day19Lesson } from "./day19";
import { day20Lesson } from "./day20";
import { architectures } from "./architectures.generated";

export { conceptLabels, reviewAdvice } from "./types";
export type { Attempt, ConceptId, ConceptModule, CurrentAttempt, DecisionLayer, LessonPage, LessonQuestion, LessonStatus, LessonSummary } from "./types";

const baseLessons = [day01Lesson, day02Lesson, day03Lesson, day04Lesson, day05Lesson, day06Lesson, day07Lesson, day08Lesson, day09Lesson, day10Lesson, day11Lesson, day12Lesson, day13Lesson, day14Lesson, day15Lesson, day16Lesson, day17Lesson, day18Lesson, day19Lesson, day20Lesson];
const defaultWeights = [30, 25, 25, 20];
const defaultReferences = [
  { label: "OpenAI production best practices", url: "https://platform.openai.com/docs/guides/production-best-practices" },
  { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" }
];

export const lessons = baseLessons.map((lesson) => {
  const architecture = architectures[lesson.id];
  return {
    ...lesson,
    capabilityGoal: lesson.capabilityGoal ?? lesson.summary,
    verifiableOutput: lesson.verifiableOutput ?? "完成本日练习、测验和复盘记录。",
    diagramType: lesson.diagramType ?? architecture?.type ?? "boundary",
    references: lesson.references ?? defaultReferences,
    architecture,
    questions: lesson.questions.map((question, index) => ({ ...question, weight: question.weight ?? defaultWeights[index] ?? 0 }))
  };
});

export const seriesLessons: LessonSummary[] = lessons.map(({ id, path, title, phase, status, summary }) => ({ id, path, title, phase, status, summary }));

export const lessonQuestions = lessons[0].questions;
