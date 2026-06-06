import { conceptLabels, reviewAdvice, type Attempt, type ConceptId, type CurrentAttempt, type LessonQuestion } from "../data/day01";

export type ScoreResult = {
  score: number;
  total: number;
  missedQuestionIds: string[];
};

export function scoreAnswers(questions: LessonQuestion[], answers: Record<string, string>): ScoreResult {
  const missedQuestionIds: string[] = [];
  const score = questions.reduce((count, question) => {
    const selected = question.options.find((option) => option.id === answers[question.id]);
    if (selected?.correct) {
      return count + 1;
    }

    missedQuestionIds.push(question.id);
    return count;
  }, 0);

  return {
    score,
    total: questions.length,
    missedQuestionIds
  };
}

export function buildReview(questions: LessonQuestion[], answers: Record<string, string>) {
  const score = scoreAnswers(questions, answers);
  const weakConcepts = Array.from(
    new Set(
      score.missedQuestionIds
        .map((id) => questions.find((question) => question.id === id)?.concept)
        .filter((concept): concept is ConceptId => Boolean(concept))
    )
  );

  const recommendations =
    weakConcepts.length > 0
      ? weakConcepts.map((concept) => reviewAdvice[concept])
      : ["本轮掌握度很好。下一步可以把 5 个真实业务场景填进判断表，训练方案选型直觉。"];

  return {
    ...score,
    weakConcepts,
    recommendations
  };
}

export function createCompletedAttempt(current: CurrentAttempt, questions: LessonQuestion[], completedAt = new Date().toISOString()): Attempt {
  const review = buildReview(questions, current.answers);

  return {
    ...current,
    completedAt,
    score: review.score,
    total: review.total,
    weakConcepts: review.weakConcepts,
    recommendations: review.recommendations
  };
}

export function formatConcepts(concepts: ConceptId[]): string {
  return concepts.map((concept) => conceptLabels[concept]).join("、");
}
