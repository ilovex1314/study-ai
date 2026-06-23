# 个人 AI 学习工作台实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 将互动课程重构为 20 天、100 分制、关系图驱动且具备响应式固定导航的本地优先学习工作台。

**架构：** 课程顺序与能力元数据抽到 `curriculum`；课程内容继续以每一天的类型化数据承载；评估独立按权重计分；UI 使用桌面 fixed overlay 导航和 H5 紧凑锚点导航。Markdown 与类型化课程数据同时作为发布物校验。

**技术栈：** React 19、TypeScript、Vite、Vitest、Testing Library、localStorage。

---

### Task 1：课程、题目与能力元数据契约

**文件：**
- 修改：`apps/interactive-lessons/src/data/types.ts`
- 创建：`apps/interactive-lessons/src/data/curriculum.ts`
- 修改：`apps/interactive-lessons/src/data/lessons.ts`
- 测试：`apps/interactive-lessons/src/data/curriculum.test.ts`

- [ ] **Step 1：写会失败的数据契约测试**

```ts
import { describe, expect, it } from "vitest";
import { curriculum } from "./curriculum";
import { lessons } from "./lessons";

it("publishes the ordered Day01-Day20 capability route", () => {
  expect(curriculum).toHaveLength(20);
  expect(curriculum.map((day) => day.phase)).toEqual(
    Array.from({ length: 20 }, (_, index) => `Day${String(index + 1).padStart(2, "0")}`)
  );
  expect(lessons).toHaveLength(20);
});

it("requires every lesson question set to sum to 100 points", () => {
  for (const lesson of lessons) {
    expect(lesson.questions.reduce((sum, question) => sum + question.weight, 0)).toBe(100);
  }
});
```

- [ ] **Step 2：运行并确认失败**

Run: `node ../../node_modules/vitest/vitest.mjs run src/data/curriculum.test.ts`

Expected: FAIL，因为 `curriculum` 与 `question.weight` 尚不存在。

- [ ] **Step 3：最小实现契约**

在 `LessonQuestion` 添加 `weight: number`；在 `LessonSummary` 添加 `capability` 与 `stage`。创建 `curriculum.ts` 导出 20 项有序路线，`lessons.ts` 从中验证/暴露课程列表。每一天至少 4 题，权重和为 100。

- [ ] **Step 4：运行测试确认通过**

Run: `node ../../node_modules/vitest/vitest.mjs run src/data/curriculum.test.ts`

Expected: PASS。

- [ ] **Step 5：提交**

```bash
git add apps/interactive-lessons/src/data
git commit -m "feat: add curriculum and weighted assessment contracts"
```

### Task 2：加权得分与本地学习证据

**文件：**
- 修改：`apps/interactive-lessons/src/lib/review.ts`
- 修改：`apps/interactive-lessons/src/lib/review.test.ts`
- 修改：`apps/interactive-lessons/src/data/types.ts`
- 修改：`apps/interactive-lessons/src/lib/storage.ts`
- 测试：`apps/interactive-lessons/src/lib/storage.test.ts`

- [ ] **Step 1：写会失败的评分测试**

```ts
it("awards configured points only to correct answers", () => {
  const result = scoreAnswers([
    question("architecture", 30, true),
    question("recall", 10, false)
  ], { architecture: "correct", recall: "wrong" });

  expect(result).toMatchObject({ score: 30, total: 40 });
});
```

- [ ] **Step 2：运行并确认失败**

Run: `node ../../node_modules/vitest/vitest.mjs run src/lib/review.test.ts`

Expected: FAIL，现有逻辑按答对题数累加。

- [ ] **Step 3：最小实现加权评分与证据字段**

`scoreAnswers` 对正确答案累计 `question.weight`，`total` 为所有权重之和；Attempt 保持 `score`/`total`，并增加可选的 `practiceEvidence` 字符串数组。旧 localStorage JSON 缺少字段时按空数组读取。

- [ ] **Step 4：运行单元测试确认通过**

Run: `node ../../node_modules/vitest/vitest.mjs run src/lib/review.test.ts src/lib/storage.test.ts`

Expected: PASS。

- [ ] **Step 5：提交**

```bash
git add apps/interactive-lessons/src/lib apps/interactive-lessons/src/data/types.ts
git commit -m "feat: score learning attempts by weighted points"
```

### Task 3：20 天课程内容与关系图规范

**文件：**
- 修改：`apps/interactive-lessons/src/data/day01.ts` 至 `day13.ts`
- 创建：`apps/interactive-lessons/src/data/day14.ts` 至 `day20.ts`
- 修改：`apps/interactive-lessons/src/data/lessons.ts`
- 修改：`apps/interactive-lessons/src/components/ArchitectureDiagram.tsx`
- 测试：`apps/interactive-lessons/src/data/curriculum.test.ts`

- [ ] **Step 1：扩展失败测试**

```ts
it("gives every day a relationship diagram and four weighted questions", () => {
  for (const lesson of lessons) {
    expect(lesson.diagram.kind).not.toBeUndefined();
    expect(lesson.questions.length).toBeGreaterThanOrEqual(4);
    expect(lesson.questions.reduce((sum, item) => sum + item.weight, 0)).toBe(100);
  }
});
```

- [ ] **Step 2：运行并确认失败**

Run: `node ../../node_modules/vitest/vitest.mjs run src/data/curriculum.test.ts`

Expected: FAIL，现有课程不足 20 天且无 `diagram.kind`。

- [ ] **Step 3：实现课程重排**

按规格将 Day01–20 组织为：可靠行为（01–05）、生产系统（06–11）、扩展与运营（12–16）、项目证据闭环（17–20）。每项数据提供 `diagram.kind`（boundary、lifecycle、layered、state、feedback），并在 ArchitectureDiagram 按类型渲染独占整行的关系图；小屏只缩小元素，不压缩正文列。

- [ ] **Step 4：运行数据测试**

Run: `node ../../node_modules/vitest/vitest.mjs run src/data/curriculum.test.ts`

Expected: PASS。

- [ ] **Step 5：提交**

```bash
git add apps/interactive-lessons/src/data apps/interactive-lessons/src/components/ArchitectureDiagram.tsx
git commit -m "feat: rebuild the course as a 20-day capability route"
```

### Task 4：做题区与复盘区的 100 分体验

**文件：**
- 修改：`apps/interactive-lessons/src/components/LessonSections.tsx`
- 修改：`apps/interactive-lessons/src/App.test.tsx`
- 修改：`apps/interactive-lessons/src/styles.css`

- [ ] **Step 1：写 UI 失败测试**

```tsx
it("uses numbered selection and shows the current question weight beside its content", () => {
  renderApp("/day01/practice");
  expect(screen.getByRole("button", { name: "第 1 题" })).toBeInTheDocument();
  expect(screen.getByText("本题 20 分")).toBeInTheDocument();
  expect(screen.queryByText("0/4")).not.toBeInTheDocument();
});
```

- [ ] **Step 2：运行并确认失败**

Run: `node ../../node_modules/vitest/vitest.mjs run src/App.test.tsx`

Expected: FAIL，当前只显示 `1 / 4` 和 `0/4`。

- [ ] **Step 3：最小实现**

QuizPanel 增加题号按钮矩阵与 `onSelectQuestion`；问题元信息显示 `本题 ${weight} 分`；上一题/下一题保留。ReviewPanel 与历史记录统一显示 `/100`；样式仅用 active/非 active 区分题号。

- [ ] **Step 4：运行 UI 测试**

Run: `node ../../node_modules/vitest/vitest.mjs run src/App.test.tsx`

Expected: PASS。

- [ ] **Step 5：提交**

```bash
git add apps/interactive-lessons/src/components apps/interactive-lessons/src/App.test.tsx apps/interactive-lessons/src/styles.css
git commit -m "feat: add numbered weighted quiz navigation"
```

### Task 5：响应式固定导航与阅读层级

**文件：**
- 修改：`apps/interactive-lessons/src/App.tsx`
- 修改：`apps/interactive-lessons/src/App.test.tsx`
- 修改：`apps/interactive-lessons/src/styles.css`

- [ ] **Step 1：写导航失败测试**

```tsx
it("exposes a collapsed desktop section rail that expands without changing routes", () => {
  renderApp("/day01/concepts");
  const rail = screen.getByLabelText("当前页面模块导航");
  expect(rail).toHaveClass("section-rail");
  expect(screen.getByRole("button", { name: "概念讲解" })).toHaveAttribute("aria-current", "page");
});
```

- [ ] **Step 2：运行并确认失败**

Run: `node ../../node_modules/vitest/vitest.mjs run src/App.test.tsx`

Expected: FAIL，当前导航是内容内 sticky 条带。

- [ ] **Step 3：实现导航与排版**

桌面端把 route-strip 改为 `position: fixed` 的 `section-rail`：折叠时只露出把手，`:hover`/`:focus-within` 展开为右侧 overlay，不能参与页面宽度计算。H5 替换为可横向滚动的紧凑文字锚点和 active 下划线。Hero 使用可读最大宽度、1.3–1.4 行高和不强制断行的标题。

- [ ] **Step 4：运行导航测试**

Run: `node ../../node_modules/vitest/vitest.mjs run src/App.test.tsx`

Expected: PASS。

- [ ] **Step 5：提交**

```bash
git add apps/interactive-lessons/src/App.tsx apps/interactive-lessons/src/App.test.tsx apps/interactive-lessons/src/styles.css
git commit -m "feat: add responsive fixed section navigation"
```

### Task 6：课程 Markdown、README 与发布验证

**文件：**
- 修改：`README.md`
- 修改：`docs/interactive-learning/overview.md`
- 修改：`docs/interactive-learning/day01.md` 至 `day13.md`
- 创建：`docs/interactive-learning/day14.md` 至 `day20.md`
- 修改：`docs/ai-learning-system-plan.md`
- 创建：`apps/interactive-lessons/scripts/validate-lessons.mjs`
- 修改：`apps/interactive-lessons/package.json`

- [ ] **Step 1：写校验器失败测试**

```js
assert.equal(lessons.length, markdownDays.length, "课程数据与 Markdown 天数必须一致");
assert.equal(lessons.length, 20, "必须发布完整 20 天路线");
```

- [ ] **Step 2：运行并确认失败**

Run: `node apps/interactive-lessons/scripts/validate-lessons.mjs`

Expected: FAIL，当前 Markdown 和课程路线不完整或标题不一致。

- [ ] **Step 3：补齐中文课程文档和 README**

每个 Day 文档包含目标、重要性、概念、关系图/数据流、技术点、上下游、案例/反例、实践、探索、测验、复盘和参考。README 说明 Day01–Day20、本地优先边界及实际 pnpm 命令。校验器读取 lesson 导出与 Markdown 标题，验证 20 天、顺序、题目数和权重。

- [ ] **Step 4：运行完整验证**

Run: `node apps/interactive-lessons/scripts/validate-lessons.mjs && pnpm --dir apps/interactive-lessons test && pnpm --dir apps/interactive-lessons build`

Expected: 校验、测试和构建全部通过。

- [ ] **Step 5：提交**

```bash
git add README.md docs apps/interactive-lessons/scripts apps/interactive-lessons/package.json
git commit -m "docs: synchronize the 20-day learning workbench"
```
