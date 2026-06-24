# Semantic Concept Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic concept-card visual templates with optional, content-authored relationship diagrams and no visual placeholder when a diagram adds no explanatory value.

**Architecture:** `ConceptModule` retains its legacy visual field for data compatibility, but adds an optional `diagram` contract. `ConceptVisual` renders only the explicit contract; the legacy six-kind field has no rendering path. Day14 supplies a checkpoint/recovery diagram whose nodes and branching directly restate its lesson content.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, CSS.

---

### Task 1: Make the semantic visual contract testable

**Files:**
- Modify: `apps/interactive-lessons/src/data/types.ts`
- Modify: `apps/interactive-lessons/src/data/curriculum.test.ts`
- Test: `apps/interactive-lessons/src/data/curriculum.test.ts`

- [ ] **Step 1: Write the failing data-contract tests**

```ts
it("allows a lesson module to omit a visual diagram", () => {
  expect(lessons.find((lesson) => lesson.id === "day14")?.modules.some((module) => !module.diagram)).toBe(true);
});

it("requires every authored diagram to contain a conclusion and labeled nodes", () => {
  for (const lesson of lessons) {
    for (const module of lesson.modules) {
      if (!module.diagram) continue;
      expect(module.diagram.conclusion).not.toHaveLength(0);
      expect(module.diagram.nodes.length).toBeGreaterThanOrEqual(2);
      expect(module.diagram.nodes.every((node) => node.label.length > 0)).toBe(true);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test -- src/data/curriculum.test.ts`

Expected: FAIL because `ConceptModule` has no `diagram` field and Day14 has no authored relationship diagram.

- [ ] **Step 3: Define the minimal contract**

```ts
export type ConceptDiagram = {
  conclusion: string;
  nodes: Array<{ id: string; label: string; tone?: "neutral" | "accent" | "success" | "warning" }>;
  edges: Array<{ from: string; to: string; label?: string; tone?: "default" | "warning" }>;
};

export type ConceptModule = {
  // existing fields
  diagram?: ConceptDiagram;
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test -- src/data/curriculum.test.ts`

Expected: PASS after Task 2 supplies the first Day14 diagram.

### Task 2: Render only content-authored diagrams

**Files:**
- Modify: `apps/interactive-lessons/src/components/LessonSections.tsx`
- Modify: `apps/interactive-lessons/src/App.test.tsx`
- Modify: `apps/interactive-lessons/src/styles.css`
- Test: `apps/interactive-lessons/src/App.test.tsx`

- [ ] **Step 1: Write the failing component tests**

```tsx
it("renders an authored relationship diagram with its conclusion", () => {
  renderApp("/day14/concepts");
  expect(screen.getByText("checkpoint 保存的是一致状态，失败进入补偿或人工决策。"))
    .toBeInTheDocument();
  expect(screen.getByText("状态快照")).toBeInTheDocument();
});

it("does not render a generic visual placeholder for a module without a diagram", () => {
  renderApp("/day14/concepts");
  expect(document.querySelectorAll(".concept-diagram").length).toBeGreaterThan(0);
  expect(document.querySelectorAll(".schema-visual, .machine-visual, .tools-visual")).toHaveLength(0);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test -- src/App.test.tsx`

Expected: FAIL because the current component renders a generic `ConceptVisual` for every card.

- [ ] **Step 3: Replace the generic renderer**

```tsx
function ConceptVisual({ diagram }: { diagram?: ConceptDiagram }) {
  if (!diagram) return null;

  return (
    <figure className="concept-diagram">
      <div className="concept-diagram-nodes">
        {diagram.nodes.map((node) => <span key={node.id} data-tone={node.tone ?? "neutral"}>{node.label}</span>)}
      </div>
      <div className="concept-diagram-edges" aria-hidden="true">
        {diagram.edges.map((edge) => <span key={`${edge.from}-${edge.to}`} data-tone={edge.tone ?? "default"}>{edge.label ?? "→"}</span>)}
      </div>
      <figcaption>{diagram.conclusion}</figcaption>
    </figure>
  );
}
```

Remove the `machine-visual`, `budget-visual`, `workbench-visual`, `dial-visual`, `schema-visual`, and `tools-visual` rendering branches. Style `.concept-diagram` as an inline-responsive node/edge sequence with a visually distinct warning branch and a text `figcaption`.

- [ ] **Step 4: Run the component tests to verify they pass**

Run: `pnpm test -- src/App.test.tsx`

Expected: PASS; no generic visual selector is present in the rendered Day14 page.

### Task 3: Author the Day14 recovery relationship diagram

**Files:**
- Modify: `apps/interactive-lessons/src/data/supplemental.ts`
- Test: `apps/interactive-lessons/src/data/curriculum.test.ts`

- [ ] **Step 1: Add the first module diagram**

```ts
diagram: {
  conclusion: "checkpoint 保存的是一致状态，失败进入补偿或人工决策。",
  nodes: [
    { id: "input", label: "任务输入" },
    { id: "state", label: "状态快照", tone: "accent" },
    { id: "tool", label: "工具执行" },
    { id: "checkpoint", label: "checkpoint", tone: "warning" },
    { id: "continue", label: "继续执行", tone: "success" },
    { id: "recover", label: "补偿 / 审批", tone: "warning" }
  ],
  edges: [
    { from: "input", to: "state" },
    { from: "state", to: "tool" },
    { from: "tool", to: "checkpoint" },
    { from: "checkpoint", to: "continue" },
    { from: "checkpoint", to: "recover", label: "失败", tone: "warning" }
  ]
}
```

- [ ] **Step 2: Keep the remaining Day01–Day20 modules visually absent until an explicit relationship is authored**

Do not create inferred diagrams from legacy `visual` values. This removes every recurring generic template from all course pages and leaves text-first cards where the source material has not declared a relationship diagram.

- [ ] **Step 3: Run the data test to verify the content contract passes**

Run: `pnpm test -- src/data/curriculum.test.ts`

Expected: PASS with Day14 carrying the first explicit diagram and modules without `diagram` remaining valid.

### Task 4: Verify responsive behavior and production output

**Files:**
- Modify: none
- Test: `apps/interactive-lessons/src/App.test.tsx`, `apps/interactive-lessons/src/data/curriculum.test.ts`

- [ ] **Step 1: Run the full automated suite**

Run: `pnpm test`

Expected: all test files and tests PASS.

- [ ] **Step 2: Build the publishable bundle**

Run: `pnpm build:dist`

Expected: TypeScript compilation and Vite production build exit 0.

- [ ] **Step 3: Verify the browser at 1440 and 375 px**

At both widths, navigate to `/day14/concepts`; confirm the Day14 diagram contains `状态快照`, `checkpoint`, `继续执行`, and `补偿 / 审批`; confirm a module without `diagram` has no blank visual region.

- [ ] **Step 4: Commit**

```bash
git add apps/interactive-lessons
git commit -m "feat: render concept visuals only when semantically authored"
```

## Self-Review

- Spec coverage: Tasks 1–3 implement the optional authored contract, Day14 recovery graph, generic-template removal, no-visual state, responsive semantics and accessibility; Task 4 verifies production behavior.
- Placeholder scan: no task contains TBD/TODO or an unspecified code action.
- Type consistency: `ConceptDiagram`, `diagram`, `ConceptVisual`, node tones and edge tones use the same names throughout.
