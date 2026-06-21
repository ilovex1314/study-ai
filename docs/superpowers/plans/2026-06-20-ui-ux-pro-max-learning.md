# UI/UX Pro Max 学习单元与视觉改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete interactive Day 13 course for UI/UX Pro Max and make the learning app itself a token-driven, accessible visual example.

**Architecture:** Keep the existing data-driven lesson contract. Add a Day13 Markdown lesson and a typed Day13 data module, register it in the lesson series, then refactor the shared stylesheet around semantic design tokens so every existing lesson receives the visual upgrade.

**Tech Stack:** React 19, TypeScript, React Router, Vitest, CSS, UI/UX Pro Max Python search CLI.

---

### Task 1: Define and test the Day13 lesson contract

**Files:**
- Modify: `apps/interactive-lessons/src/App.test.tsx`
- Modify: `apps/interactive-lessons/src/data/types.ts`
- Create: `apps/interactive-lessons/src/data/day13.ts`
- Modify: `apps/interactive-lessons/src/data/lessons.ts`

- [ ] **Step 1: Write a failing series test**

```ts
expect(seriesLessons.map((lesson) => lesson.phase)).toContain("Day13");
expect(screen.getByRole("heading", { name: /Day 13 UI\/UX Pro Max/ })).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and confirm the Day13 assertion fails**

Run: `npm test -- App.test.tsx`
Expected: FAIL because Day13 is absent.

- [ ] **Step 3: Add typed concepts and Day13 data**

Create a `LessonPage` with four modules (`design-data`, `multi-domain-search`, `design-system`, `ui-validation`), four linked questions, a source link to the upstream repository, and decision layers describing the full data chain.

- [ ] **Step 4: Register the lesson**

Import `day13Lesson` and append it to `lessons` so the existing routing and navigation render it automatically.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- App.test.tsx`
Expected: PASS with the Day13 route and concept coverage present.

### Task 2: Create the source-grounded tutorial

**Files:**
- Create: `docs/interactive-learning/day13.md`
- Modify: `docs/interactive-learning/overview.md`

- [ ] **Step 1: Write the Day13 Markdown lesson**

Include goal, why it matters, core concepts, architecture, data and logic flow, upstream/downstream context, production example, counterexample, a hands-on runbook using `search.py`, four-question quiz, review advice and source URLs.

- [ ] **Step 2: Register Day13 in the learning overview**

Add its objective and expected outcome next to the existing twelve-day sequence.

- [ ] **Step 3: Cross-check the Markdown against the typed lesson**

Confirm all four quiz concepts appear in both lesson body and `day13.ts`.

### Task 3: Apply the generated design system to the app

**Files:**
- Modify: `apps/interactive-lessons/src/styles.css`
- Modify: `apps/interactive-lessons/src/App.tsx`

- [ ] **Step 1: Add semantic CSS tokens and a keyboard skip link**

Define `--surface-*`, `--text-*`, `--accent-*`, spacing, radius and motion tokens in `:root`; render an `<a className="skip-link" href="#main-content">跳到课程内容</a>` before the route view and identify the main content region.

- [ ] **Step 2: Rebuild shared visual primitives from tokens**

Update hero, sticky module navigation, series cards, panels, quiz feedback, focus states and bottom dock to use token-based contrast, layered surfaces and stable 160–240ms color/shadow transitions.

- [ ] **Step 3: Add responsive and reduced-motion safeguards**

At narrow widths turn card grids into one column, expose the compact module navigation, reserve dock space, and add a `prefers-reduced-motion` rule that disables smooth transitions and scroll behavior.

- [ ] **Step 4: Run app tests and production build**

Run: `npm test` and `npm run build` in `apps/interactive-lessons`.
Expected: all tests pass and Vite emits `dist/`.

### Task 4: Validate the learning data and source workflow

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document installation and repeatable usage**

Add the official install command, design-system generation command, a targeted UX query command, and where to find the Day13 tutorial.

- [ ] **Step 2: Perform final evidence-based verification**

Run the full test suite, TypeScript/Vite build, and `git diff --check`; inspect the Day13 route in the dev server if the browser is available.
