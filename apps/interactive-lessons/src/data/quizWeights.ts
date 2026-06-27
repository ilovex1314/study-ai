type WeightedQuestion = {
  id: string;
  weight?: number;
};

export function assertQuestionWeights<TQuestion extends WeightedQuestion>(questions: TQuestion[], lessonId: string) {
  if (questions.length === 0) {
    throw new Error(`${lessonId} must include at least one question`);
  }

  const missing = questions.filter((question) => typeof question.weight !== "number").map((question) => question.id);
  if (missing.length > 0) {
    throw new Error(`${lessonId} question weights must be explicit: ${missing.join(", ")}`);
  }

  const total = questions.reduce((sum, question) => sum + question.weight!, 0);
  if (total !== 100) {
    throw new Error(`${lessonId} question weights must sum to 100, received ${total}`);
  }

  return questions;
}
