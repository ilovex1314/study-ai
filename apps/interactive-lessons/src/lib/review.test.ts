import { describe, expect, it } from "vitest";
import { buildReview, scoreAnswers } from "./review";
import type { LessonQuestion } from "../data/day01";

const questions: LessonQuestion[] = [
  {
    id: "q1",
    type: "single",
    concept: "model-cognition",
    prompt: "LLM 和传统函数最大的工程差异是什么？",
    options: [
      { id: "a", label: "LLM 输出是采样结果", correct: true },
      { id: "b", label: "LLM 永远更稳定", correct: false }
    ],
    explanation: "LLM 更像概率决策器。"
  },
  {
    id: "q2",
    type: "single",
    concept: "rag",
    prompt: "企业内部文档问答优先使用什么？",
    options: [
      { id: "a", label: "RAG", correct: true },
      { id: "b", label: "Fine-tuning", correct: false }
    ],
    explanation: "动态私有知识优先检索增强。"
  }
];

describe("scoreAnswers", () => {
  it("counts correct answers and returns missed question ids", () => {
    const result = scoreAnswers(questions, { q1: "a", q2: "b" });

    expect(result.score).toBe(1);
    expect(result.total).toBe(2);
    expect(result.missedQuestionIds).toEqual(["q2"]);
  });
});

describe("buildReview", () => {
  it("extracts weak concepts and gives targeted recommendations", () => {
    const result = buildReview(questions, { q1: "a", q2: "b" });

    expect(result.score).toBe(1);
    expect(result.weakConcepts).toEqual(["rag"]);
    expect(result.recommendations[0]).toContain("RAG");
  });
});
