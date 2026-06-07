import type { LessonSummary } from "./types";
import { day01Lesson } from "./day01";
import { day02Lesson } from "./day02";
import { day03Lesson } from "./day03";
import { day04Lesson } from "./day04";

export { conceptLabels, reviewAdvice } from "./types";
export type { Attempt, ConceptId, ConceptModule, CurrentAttempt, DecisionLayer, LessonPage, LessonQuestion, LessonStatus, LessonSummary } from "./types";

export const lessons = [day01Lesson, day02Lesson, day03Lesson, day04Lesson];

export const seriesLessons: LessonSummary[] = lessons.map(({ id, path, title, phase, status, summary }) => ({
  id,
  path,
  title,
  phase,
  status,
  summary
}));

export const lessonQuestions = lessons[0].questions;
