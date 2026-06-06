# Interactive Day 01 Lesson Design

## Goal

Build a pure frontend React + TypeScript learning page for day 01 of `study-ai`. The page should turn dense AI Agent learning notes into visual modules, quiz-based learning, and a review center that helps the learner understand weak points and repeat the lesson.

## Scope

This first version covers only day 01:

- Model cognition: LLM is not a deterministic function.
- Token, context window, temperature, structured output, and tool calling.
- AI solution design: explain Chat, RAG, Agent, Workflow, Fine-tuning, and traditional programs as different architectural layers that can be composed, not as mutually exclusive alternatives.
- Scenario-based exercises and review.

The page is a local static application. It does not require backend services, API keys, authentication, or image generation at runtime.

## Visual Direction

Use the HyperFrames style of visual storytelling, but implement it as React UI:

- Replace long paragraphs with visual comparison panels, flow diagrams, concept cards, and decision cards.
- Prefer CSS/SVG/diagram modules over generated images in the first version to control token and iteration cost.
- Use generated images only when a concept cannot be expressed clearly with diagrams. For this version, the "function machine vs probability decision engine" concept should be implemented as an inline SVG/HTML visual, not a generated bitmap.
- Use restrained, engineering-oriented visuals: high contrast, calm dark canvas, warm accent colors, readable Chinese text, and lightweight motion.
- Do not create tab-like, button-like, or link-like elements unless they perform a visible action. If a control is only a progress indicator, style it as a non-interactive status element. If it looks like navigation, it must navigate or scroll to a target section.
- Navigation state must reflect the actual view. When a user clicks a nav item, the active state, route/hash, and visible content must update together. A route card must open a page-level route, not merely an anchor on the same page.

## Learning Flow

The page has five modules:

1. Hero and learning route
   - Show the day 01 goal and progress.
   - Show a compact path: cognition -> concepts -> decision framework -> practice -> review.

2. Visual concept modules
   - Show deterministic program vs LLM probability decision.
   - Show token cost as a budget meter.
   - Show context window as a limited workbench.
   - Show temperature as stability vs divergence.
   - Show structured output as human text vs system-consumable JSON.
   - Show tool calling as "model decides, system executes".

3. Solution decision cards
- Present Chat, RAG, Agent, Workflow, Fine-tuning, and traditional program as layered decisions: interaction surface, knowledge strategy, execution control, and capability stabilization.
- Each card includes suitable scenarios, unsuitable scenarios, and risk.
- Do not copy reviewer feedback or implementation notes into learner-facing lesson copy. Convert feedback into instructional content, or ask the user when the intended teaching point is unclear.

4. Quiz and scenario practice
   - Include multiple-choice and scenario questions.
   - Give immediate feedback after each answer.
   - Track answers and completion in localStorage.

5. Review center
   - Show score, weak concepts, recommended review modules, and next actions.
   - Support retrying the quiz without deleting history.
   - Show attempt history.
   - Support deleting one history item, clearing all history, resetting current progress, and exporting JSON.

## State Model

Use localStorage keys:

- `study-ai.day01.currentAttempt`
- `study-ai.day01.attemptHistory`
- `study-ai.day01.reviewPreferences`

Each attempt stores:

- `id`
- `startedAt`
- `completedAt`
- `answers`
- `score`
- `total`
- `weakConcepts`
- `recommendations`

## Technical Design

Create a Vite React + TypeScript app under:

```text
apps/interactive-lessons/
```

Root package scripts:

```json
{
  "lesson:dev": "npm --prefix apps/interactive-lessons run dev",
  "lesson:build": "npm --prefix apps/interactive-lessons run build",
  "lesson:test": "npm --prefix apps/interactive-lessons run test"
}
```

Use these app dependencies:

- React
- TypeScript
- Vite
- Vitest
- Testing Library for behavior tests

No server resource is required after the app is built.

## Token Cost Strategy

This version intentionally avoids generated images by default. Token and iteration cost are controlled by:

- Reusing structured lesson data instead of repeatedly rewriting long prose.
- Using SVG/CSS diagrams for visuals.
- Keeping components small and data-driven.
- Testing review/storage logic separately from UI.
- Deferring Skill extraction until the user approves effect and token cost.

## Acceptance Criteria

- `npm install` succeeds for the React app.
- `npm run lesson:test` passes.
- `npm run lesson:build` passes.
- `npm run lesson:dev` serves the app locally.
- The page lets the user complete a day 01 quiz, see review results, retry, and inspect attempt history.
- The final report includes observed token usage if available from the goal tracker, plus a practical cost analysis.
