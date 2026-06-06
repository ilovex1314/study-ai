# Interactive Day 01 Lesson Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure frontend React + TypeScript interactive lesson for day 01 of `study-ai`.

**Architecture:** A Vite app under `apps/interactive-lessons` renders day 01 as data-driven learning modules, quiz cards, and a localStorage-backed review center. Business logic for scoring, weak concept detection, and persistence lives outside React components so it can be tested independently.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, localStorage, CSS/SVG visual modules.

---

## File Structure

- Create `package.json`: root scripts for running, testing, and building the lesson app.
- Create `apps/interactive-lessons/package.json`: app dependencies and scripts.
- Create `apps/interactive-lessons/index.html`: Vite entry point.
- Create `apps/interactive-lessons/tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and Vite configuration.
- Create `apps/interactive-lessons/src/data/day01.ts`: day 01 modules, concepts, solution cards, questions, and recommendations.
- Create `apps/interactive-lessons/src/lib/review.ts`: pure scoring and review functions.
- Create `apps/interactive-lessons/src/lib/storage.ts`: localStorage read/write helpers and history management.
- Create `apps/interactive-lessons/src/lib/review.test.ts`: TDD tests for scoring and weak concept recommendations.
- Create `apps/interactive-lessons/src/lib/storage.test.ts`: TDD tests for retry/history/delete/export behavior.
- Create `apps/interactive-lessons/src/components/*.tsx`: focused UI modules.
- Create `apps/interactive-lessons/src/App.tsx`, `main.tsx`, `styles.css`: app composition and styling.

## Task 1: App Scaffold

- [ ] Create Vite React + TS app files under `apps/interactive-lessons`.
- [ ] Add root scripts: `lesson:dev`, `lesson:build`, `lesson:test`.
- [ ] Install dependencies.
- [ ] Run `npm run lesson:test` and confirm the empty test suite is runnable.

## Task 2: Review Logic with TDD

- [ ] Write tests for score calculation, weak concept extraction, and recommendations.
- [ ] Run the tests and confirm they fail because `review.ts` does not exist.
- [ ] Implement `review.ts`.
- [ ] Run tests and confirm they pass.

## Task 3: localStorage Management with TDD

- [ ] Write tests for current attempt save/load, completing an attempt into history, resetting current progress, deleting one history item, clearing all history, and exporting JSON.
- [ ] Run the tests and confirm they fail because `storage.ts` does not exist.
- [ ] Implement `storage.ts`.
- [ ] Run tests and confirm they pass.

## Task 4: Day 01 Data

- [ ] Add structured day 01 data with modules, concepts, solution cards, questions, and recommendations.
- [ ] Keep prose short and use visual labels instead of full copied Markdown.
- [ ] Include enough question metadata to power review recommendations.

## Task 5: React UI

- [ ] Implement the shell, progress route, visual concept modules, solution cards, quiz module, and review center.
- [ ] Use inline SVG/CSS diagrams for visual explanation instead of generated bitmap images.
- [ ] Persist quiz progress and attempts through `storage.ts`.
- [ ] Add controls for retry, reset current progress, delete history item, clear all history, and export JSON.

## Task 6: Styling and Motion

- [ ] Build a calm engineering dashboard visual style.
- [ ] Add lightweight CSS transitions and motion.
- [ ] Ensure mobile and desktop layouts do not overlap.
- [ ] Keep text readable and avoid single-hue monotony.

## Task 7: Verification

- [ ] Run `npm run lesson:test`.
- [ ] Run `npm run lesson:build`.
- [ ] Start `npm run lesson:dev -- --host 127.0.0.1`.
- [ ] Open the local app in the browser and inspect the first-screen layout.
- [ ] Report the URL, verification results, and token usage/cost analysis.

## Deferred Task: Skill Extraction

Do not create the reusable skill in this implementation pass. Extract the workflow only after the user reviews the page effect and token cost and explicitly approves the pattern.
