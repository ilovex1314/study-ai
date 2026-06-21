# App Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the desktop course directory an application-level, collapsible layout sidebar that never overlays lesson content.

**Architecture:** `SeriesDock` continues to own its open state and uses an SVG chevron. `lesson-layout` is the only desktop layout authority: it switches between a 220px sidebar column and a 44px rail column. Mobile keeps the existing drawer behavior.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, CSS Grid.

---

### Task 1: Specify and test the navigation control

**Files:**
- Modify: `apps/interactive-lessons/src/App.test.tsx`
- Modify: `apps/interactive-lessons/src/components/LessonSections.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("toggles the course navigation and exposes the matching accessible state", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: "收起课程目录" });
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(toggle.querySelector("svg")).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(screen.getByRole("button", { name: "展开课程目录" })).toHaveAttribute("aria-expanded", "false");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --dir apps/interactive-lessons test -- App.test.tsx`

Expected: failure because the control renders a text chevron instead of an SVG.

- [ ] **Step 3: Write minimal implementation**

Replace the text chevron in `SeriesDock` with an inline 24px SVG path and keep `aria-expanded` and label values synchronized with `open`.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --dir apps/interactive-lessons test -- App.test.tsx`

Expected: App test suite passes.

### Task 2: Make desktop sidebar structural

**Files:**
- Modify: `apps/interactive-lessons/src/styles.css`

- [ ] **Step 1: Add a deterministic browser assertion**

Verify in the running desktop app that `.series-dock` has `position: sticky`, and that its grid parent changes from `220px` to `44px` after the toggle.

- [ ] **Step 2: Verify current implementation fails the assertion**

Expected: current override rules resolve `.series-dock` to `position: fixed`.

- [ ] **Step 3: Write minimal implementation**

Remove conflicting fixed-position desktop overrides. Define grid templates on `.lesson-layout` for the open and collapsed dock states; keep the sidebar sticky and constrain its own overflow. Reserve fixed positioning for the mobile media query only.

- [ ] **Step 4: Verify the assertion passes**

Expected: expanded grid has 220px first track, collapsed grid has 44px first track, and no desktop content overlap.

### Task 3: Verify the complete change

**Files:**
- Verify: `apps/interactive-lessons/src/App.test.tsx`
- Verify: `apps/interactive-lessons/src/styles.css`

- [ ] **Step 1: Run unit tests**

Run: `pnpm --dir apps/interactive-lessons test`

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `pnpm --dir apps/interactive-lessons build`

Expected: TypeScript and Vite build complete with exit code 0.

- [ ] **Step 3: Browser verification**

At 1440px, verify expanded and collapsed screenshots: no overlay, content width changes, SVG icon remains centered. At 1024px, verify the existing mobile drawer behavior remains available.
