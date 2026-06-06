# Learning Plan To Interactive Lesson Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable workflow that starts from a structured learning plan, expands each phase into Markdown lesson plans, updates exercises/review content, and then generates a React + TypeScript interactive lesson page through the agreed HyperFrames-style frontend process.

**Architecture:** Markdown is the source of truth. The frontend consumes normalized lesson data derived from Markdown, not ad-hoc copy. The final skill documents the workflow, quality gates, token-cost strategy, and "ask before guessing" rules so later learning plans can be converted consistently.

**Tech Stack:** Markdown, React, TypeScript, Vite, Vitest, localStorage, Superpowers planning/review workflow, HyperFrames-style visual module generation.

---

## Review Intent

This plan is intentionally not implementation yet. It is the proposed workflow for review.

The current issue is content drift:

- `docs/ai-agent-learning-plan.md` is still the original broad roadmap.
- `notes/01-model-cognition.md`, `labs/01-ai-scenario-assessment.md`, and `prompts/prompt-patterns.md` describe the original Day 01 learning flow.
- `apps/interactive-lessons/src/data/day01.ts` has evolved through UI review and now contains richer concepts, questions, review advice, and architecture copy that no longer round-trips to the Markdown source.

The fix is to make the Markdown plan explicit and phase-based first, then regenerate/update the frontend from that plan.

## Proposed Source Structure

Create a lesson-plan source layer:

```text
docs/
  ai-agent-learning-plan.md
  learning-phases/
    phase-01-model-cognition.md
    phase-02-prompt-rag-tuning.md
    phase-03-agent-architecture.md
    phase-04-product-delivery.md
  interactive-lessons/
    lesson-content-schema.md
```

Keep exercises and review aligned:

```text
labs/
  phase-01-model-cognition-lab.md
  phase-02-prompt-rag-tuning-lab.md
  phase-03-agent-architecture-lab.md
  phase-04-product-delivery-lab.md

reviews/
  phase-01-model-cognition-review.md
  phase-02-prompt-rag-tuning-review.md
  phase-03-agent-architecture-review.md
  phase-04-product-delivery-review.md
```

Keep frontend derived data explicit:

```text
apps/interactive-lessons/src/data/
  lessons.ts
  types.ts
```

Keep the reusable skill separate from this repo's content:

```text
skills/
  interactive-learning-page/
    SKILL.md
    templates/
      phase-plan-template.md
      lab-template.md
      review-template.md
      frontend-content-checklist.md
```

## Content Model

Each phase Markdown should contain these sections:

```markdown
# Phase NN: <title>

## Learner Profile

## Learning Outcomes

## Core Concepts

### Concept NN: <name>
- Definition:
- Why it matters:
- Engineering interpretation:
- Common mistakes:
- First-line example:
- Visual suggestion:

## Architecture / Workflow

## Decision Framework

## Exercises

## Review Rubric

## Frontend Translation Notes
```

The frontend data should map each phase to:

- route: `/day01`, `/day02`, `/day03`, `/day04`
- `conceptModules`
- `architectureDiagram`
- `quizQuestions`
- `reviewRubric`
- `historyStorageKey`
- `seriesMetadata`

## Task 1: Define The Markdown Content Schema

**Files:**
- Create: `docs/interactive-lessons/lesson-content-schema.md`
- Modify: none
- Test: manual review against `docs/ai-agent-learning-plan.md`

- [ ] **Step 1: Create the schema document**

Add a schema describing required fields for every phase:

```markdown
# Interactive Lesson Content Schema

## Required Phase Metadata

- id: stable id, for example `phase-01-model-cognition`
- route: frontend route, for example `/day01`
- phaseLabel: learner-facing label, for example `阶段 1`
- title: learner-facing title
- summary: one-sentence purpose
- prerequisites: what the learner should already know
- estimatedTime: expected learning time

## Required Learning Content

Every phase must include:

- learning outcomes
- concept modules
- architecture or workflow diagram notes
- first-line engineering examples
- exercises
- quiz questions
- review rubric
- follow-up reinforcement advice

## Concept Module Fields

- conceptId
- title
- short explanation
- why it matters
- engineering interpretation
- common mistakes
- first-line example
- visual suggestion
- exercise prompt

## Quiz Question Fields

- id
- conceptId
- scenario
- prompt
- options
- correct option
- explanation
- review advice when wrong

## Review Rubric Fields

- pass criteria
- weak concept mapping
- remediation suggestions
- suggested next phase
```

- [ ] **Step 2: Review against current frontend data**

Check that the schema can represent current `apps/interactive-lessons/src/data/day01.ts` fields:

```text
ConceptModule -> concept module fields
DecisionLayer -> architecture / decision framework
LessonQuestion -> quiz question fields
reviewAdvice -> review rubric fields
LessonPage -> phase metadata
```

- [ ] **Step 3: Commit**

```powershell
git add docs/interactive-lessons/lesson-content-schema.md
git commit -m "docs: define interactive lesson content schema"
```

## Task 2: Rewrite The Four Phase Markdown Plans

**Files:**
- Create: `docs/learning-phases/phase-01-model-cognition.md`
- Create: `docs/learning-phases/phase-02-prompt-rag-tuning.md`
- Create: `docs/learning-phases/phase-03-agent-architecture.md`
- Create: `docs/learning-phases/phase-04-product-delivery.md`
- Modify: `docs/ai-agent-learning-plan.md`
- Test: Markdown structure review

- [ ] **Step 1: Convert the existing broad roadmap into four phase documents**

Use the current four interactive days as the first version:

```text
Phase 1 -> Day 01 模型认知
Phase 2 -> Day 02 Prompt / RAG / 调优
Phase 3 -> Day 03 Agent 架构
Phase 4 -> Day 04 产品化交付
```

- [ ] **Step 2: Expand each phase with learning content**

Each phase must include:

```markdown
## Learning Outcomes

## Core Concepts

## Architecture / Workflow

## First-Line Examples

## Exercises

## Review Rubric
```

For Phase 1, the concept set should align with the current page:

```text
LLM probabilistic behavior
token and cost
context window and memory
structured output
tool calling
AI application engineering architecture
```

For Phase 2:

```text
prompt as contract
RAG data pipeline
chunking / retrieval / reranking
evaluation set
fine-tuning boundary
```

For Phase 3:

```text
workflow vs agent
tool permissions
state and memory
handoffs
human-in-the-loop
agent observability
```

For Phase 4:

```text
product experience
model gateway
cost control
monitoring
evals
deployment
fallback and escalation
```

- [ ] **Step 3: Update the root learning plan**

Modify `docs/ai-agent-learning-plan.md` so it links to the four expanded phase documents and states that interactive pages must be generated from those phase documents.

- [ ] **Step 4: Commit**

```powershell
git add docs/ai-agent-learning-plan.md docs/learning-phases/
git commit -m "docs: expand four phase AI learning plans"
```

## Task 3: Update Labs And Review Rubrics

**Files:**
- Create: `labs/phase-01-model-cognition-lab.md`
- Create: `labs/phase-02-prompt-rag-tuning-lab.md`
- Create: `labs/phase-03-agent-architecture-lab.md`
- Create: `labs/phase-04-product-delivery-lab.md`
- Create: `reviews/phase-01-model-cognition-review.md`
- Create: `reviews/phase-02-prompt-rag-tuning-review.md`
- Create: `reviews/phase-03-agent-architecture-review.md`
- Create: `reviews/phase-04-product-delivery-review.md`
- Modify: `labs/01-ai-scenario-assessment.md`
- Test: manual mapping from each quiz question to one concept and one review advice item

- [ ] **Step 1: Create lab files per phase**

Each lab should include:

```markdown
# Phase NN Lab: <title>

## Goal

## Input Materials

## Tasks

## Deliverables

## Acceptance Criteria

## Reflection Questions
```

- [ ] **Step 2: Create review files per phase**

Each review file should include:

```markdown
# Phase NN Review Rubric: <title>

## Score Bands

## Weak Concept Mapping

## Remediation Advice

## Follow-Up Practice

## Promotion Criteria
```

- [ ] **Step 3: Update old Day 01 lab**

Keep `labs/01-ai-scenario-assessment.md` as a compatibility pointer:

```markdown
# Deprecated

This file is superseded by `labs/phase-01-model-cognition-lab.md`.
```

- [ ] **Step 4: Commit**

```powershell
git add labs/ reviews/
git commit -m "docs: align labs and reviews with phase plans"
```

## Task 4: Normalize Frontend Lesson Data Around The Phase Plans

**Files:**
- Create: `apps/interactive-lessons/src/data/types.ts`
- Create: `apps/interactive-lessons/src/data/lessons.ts`
- Modify: `apps/interactive-lessons/src/data/day01.ts`
- Modify: `apps/interactive-lessons/src/App.tsx`
- Test: `apps/interactive-lessons/src/App.test.tsx`

- [ ] **Step 1: Write failing tests**

Add tests that enforce:

```typescript
expect(seriesLessons.map((lesson) => lesson.phase)).toEqual(["阶段 1", "阶段 2", "阶段 3", "阶段 4"]);
expect(lessons.every((lesson) => lesson.modules.length > 0)).toBe(true);
expect(lessons.every((lesson) => lesson.questions.length > 0)).toBe(true);
expect(lessons.every((lesson) => lesson.reviewRubric.length > 0)).toBe(true);
```

- [ ] **Step 2: Extract shared data types**

Move current types from `day01.ts` into `types.ts`.

- [ ] **Step 3: Rename `day01.ts` to `lessons.ts`**

Keep all four day records in one data source until content grows enough to split per file.

- [ ] **Step 4: Add review rubric to frontend data**

Each lesson should carry review data sourced from the matching review Markdown:

```typescript
reviewRubric: [
  {
    concept: "rag",
    weakSignal: "Cannot explain why RAG is a knowledge strategy rather than a UI pattern",
    advice: "Review the RAG pipeline and rebuild the retrieval/evaluation diagram."
  }
]
```

- [ ] **Step 5: Run tests**

```powershell
npm run lesson:test
```

Expected:

```text
Test Files  3 passed
Tests       all passed
```

- [ ] **Step 6: Commit**

```powershell
git add apps/interactive-lessons/src/data apps/interactive-lessons/src/App.tsx apps/interactive-lessons/src/App.test.tsx
git commit -m "refactor: align lesson data with phase plans"
```

## Task 5: Update Quiz And Review Behavior From The New Rubrics

**Files:**
- Modify: `apps/interactive-lessons/src/lib/review.ts`
- Modify: `apps/interactive-lessons/src/lib/review.test.ts`
- Modify: `apps/interactive-lessons/src/App.tsx`
- Test: `apps/interactive-lessons/src/lib/review.test.ts`

- [ ] **Step 1: Write failing tests**

Add a test that verifies recommendations come from `reviewRubric`, not hardcoded generic advice:

```typescript
it("uses lesson review rubric for weak concept recommendations", () => {
  const review = buildReview(questions, answers, reviewRubric);
  expect(review.recommendations[0]).toContain(reviewRubric[0].advice);
});
```

- [ ] **Step 2: Update `buildReview` signature**

Change:

```typescript
buildReview(questions, answers)
```

To:

```typescript
buildReview(questions, answers, reviewRubric)
```

- [ ] **Step 3: Update frontend usage**

In `App.tsx`, call:

```typescript
const review = useMemo(
  () => buildReview(lesson.questions, current.answers, lesson.reviewRubric),
  [lesson.questions, lesson.reviewRubric, current.answers]
);
```

- [ ] **Step 4: Run tests**

```powershell
npm run lesson:test
```

- [ ] **Step 5: Commit**

```powershell
git add apps/interactive-lessons/src/lib apps/interactive-lessons/src/App.tsx
git commit -m "feat: drive review advice from lesson rubrics"
```

## Task 6: Define The Reusable Skill

**Files:**
- Create: `skills/interactive-learning-page/SKILL.md`
- Create: `skills/interactive-learning-page/templates/phase-plan-template.md`
- Create: `skills/interactive-learning-page/templates/lab-template.md`
- Create: `skills/interactive-learning-page/templates/review-template.md`
- Create: `skills/interactive-learning-page/templates/frontend-content-checklist.md`
- Test: manual dry run on `docs/learning-phases/phase-01-model-cognition.md`

- [ ] **Step 1: Create `SKILL.md`**

The skill should trigger when the user asks to convert a study plan into an interactive learning page.

Core workflow:

```markdown
# Interactive Learning Page Skill

## When to use

Use this when the user provides a learning plan and wants it converted into an interactive page with concept modules, diagrams, exercises, review, and local frontend implementation.

## Workflow

1. Read the source learning plan.
2. Ask clarification if the learning objective, audience, or phase boundaries are unclear.
3. Expand the plan into phase Markdown first.
4. Create or update labs and review rubrics.
5. Decide visual strategy:
   - Use code diagrams for flow, architecture, comparison, and lifecycle visuals.
   - Use generated bitmap images only when code diagrams cannot explain the concept well.
6. Generate or update React + TypeScript frontend data and components.
7. Add behavior tests for routing, quiz, review, and localStorage.
8. Run tests/build/audit.
9. Report token cost and where cost was spent.

## Non-negotiable rules

- Do not copy user feedback into learner-facing content.
- Do not invent unclear domain content; ask or research primary sources first.
- Markdown phase plans are the source of truth.
- Exercises and review must map to concepts in the phase plan.
- Navigation UI must have real behavior and active state.
- Screenshot tests are not used for this project unless explicitly requested.
```

- [ ] **Step 2: Create templates**

Create templates matching the schema from Task 1.

- [ ] **Step 3: Add a dry-run checklist**

Checklist:

```markdown
# Frontend Content Checklist

- [ ] Every phase has its own route.
- [ ] Every concept has an explanation, example, visual suggestion, and exercise.
- [ ] Every quiz question maps to a concept.
- [ ] Every weak concept maps to review advice.
- [ ] Architecture diagrams are meaningful, not decorative.
- [ ] The frontend does not contain internal review comments as learner copy.
- [ ] Tests cover routing, quiz, review, localStorage, and active navigation.
```

- [ ] **Step 4: Commit**

```powershell
git add skills/interactive-learning-page/
git commit -m "docs: add interactive learning page skill draft"
```

## Task 7: Document The HyperFrames Execution Contract

**Files:**
- Modify: `skills/interactive-learning-page/SKILL.md`
- Modify: `docs/superpowers/specs/2026-06-06-interactive-day01-lesson-design.md`

- [ ] **Step 1: Add visual generation rules**

Rules:

```markdown
## Visual Generation Rules

Use code-rendered diagrams for:
- architecture maps
- pipelines
- timelines
- comparison matrices
- lifecycle loops

Use generated images for:
- metaphorical scenes that help memory
- rich conceptual illustrations that are not naturally diagrams
- hero backgrounds when the page is a landing page

Do not use generated images just to decorate a technical explanation.
```

- [ ] **Step 2: Add HyperFrames handoff contract**

Contract:

```markdown
## HyperFrames Handoff

Before frontend generation:
1. Confirm phase Markdown is complete.
2. Confirm exercises and review rubrics are aligned.
3. Decide visual strategy per concept.
4. Generate React + TypeScript components.
5. Verify tests/build.
```

- [ ] **Step 3: Commit**

```powershell
git add skills/interactive-learning-page/SKILL.md docs/superpowers/specs/2026-06-06-interactive-day01-lesson-design.md
git commit -m "docs: define hyperframes handoff for learning pages"
```

## Task 8: Final Verification

**Files:**
- All created/modified files above

- [ ] **Step 1: Run markdown path check**

```powershell
Test-Path docs/learning-phases/phase-01-model-cognition.md
Test-Path labs/phase-01-model-cognition-lab.md
Test-Path reviews/phase-01-model-cognition-review.md
Test-Path skills/interactive-learning-page/SKILL.md
```

Expected:

```text
True
True
True
True
```

- [ ] **Step 2: Run frontend checks**

```powershell
npm run lesson:test
npm run lesson:build
npm --prefix apps/interactive-lessons audit --omit=dev
```

Expected:

```text
Tests pass
Build succeeds
0 vulnerabilities
```

- [ ] **Step 3: Manual review checklist**

Verify:

- The root learning plan links to four phase plans.
- Each phase has its own Markdown expansion.
- Labs and review rubrics match the phase concepts.
- Frontend routes match the phase order.
- Quiz and review copy is no longer stale.
- The skill tells future agents to ask or research before guessing.

## Open Review Questions

1. Should the four phases remain `Day 01` to `Day 04`, or should the UI call them `Phase 01` to avoid implying each phase is a single calendar day?
2. Should the skill live inside this repo under `skills/interactive-learning-page/`, or should it be installed into the Codex skill root after review?
3. Should the frontend data be manually maintained from Markdown for now, or should we later add a small parser/generator that converts Markdown into TypeScript data?
4. Do you want generated images allowed only after explicit approval, or can the skill decide when a bitmap image is educationally necessary?

## Self-Review

- Spec coverage: covers source Markdown first, four phase expansions, lab/review alignment, frontend data alignment, HyperFrames handoff, reusable skill.
- Placeholder scan: no `TBD` or `TODO` placeholders; all tasks specify paths and concrete checks.
- Risk: this plan is intentionally document-first and may feel slower, but it fixes the current drift problem and makes future page generation repeatable.

---

Plan complete and saved to `docs/superpowers/plans/2026-06-06-learning-plan-to-interactive-skill.md`.

Recommended next review target: confirm the four-phase structure and the skill location before implementation.
