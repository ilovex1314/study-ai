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

export { conceptLabels, reviewAdvice } from "./types";
export type { Attempt, ConceptId, ConceptModule, CurrentAttempt, DecisionLayer, LessonPage, LessonQuestion, LessonStatus, LessonSummary } from "./types";

export const lessons = [day01Lesson, day02Lesson, day03Lesson, day04Lesson, day05Lesson, day06Lesson, day07Lesson, day08Lesson, day09Lesson, day10Lesson, day11Lesson, day12Lesson];

export const seriesLessons: LessonSummary[] = lessons.map(({ id, path, title, phase, status, summary }) => ({ id, path, title, phase, status, summary }));

export const lessonQuestions = lessons[0].questions;
