import { describe, expect, it } from "vitest";
import { assertQuestionWeights } from "./quizWeights";

const questions = [
  { id: "q1", weight: 40 },
  { id: "q2", weight: 35 },
  { id: "q3", weight: 25 }
];

describe("assertQuestionWeights", () => {
  it("accepts non-4 question lessons when explicit weights sum to 100", () => {
    expect(assertQuestionWeights(questions, "sample")).toEqual(questions);
  });

  it("rejects authored weights that do not sum to 100", () => {
    expect(() =>
      assertQuestionWeights(
        [
          { id: "q1", weight: 40 },
          { id: "q2", weight: 40 }
        ],
        "bad-lesson"
      )
    ).toThrow("bad-lesson question weights must sum to 100");
  });

  it("rejects missing question weights instead of silently filling defaults", () => {
    expect(() => assertQuestionWeights([{ id: "q1" }], "missing-weight")).toThrow("missing-weight question weights must be explicit");
  });
});
