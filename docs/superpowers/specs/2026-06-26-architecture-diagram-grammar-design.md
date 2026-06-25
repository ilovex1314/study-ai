---
title: 架构图语义图形语法设计
slug: architecture-diagram-grammar-design
status: approved-direction
source: docs/product/topics/issue/2026-06-26-architecture-diagram-expression-quality.md
created: 2026-06-26
summary: 用 Markdown 驱动的语义图形语法替代统一串式架构图渲染。
description: 用户已确认采用 A 方案：保留 Markdown architecture metadata 作为事实源，扩展为 nodes、edges、groups/lanes 和 renderMode，由通用渲染器按关系类型绘制不同图式，不为每章写特殊 SVG。
---

## 背景

当前课程已为 Day01-Day20 生成 `architecture` metadata，并包含 `boundary`、`lifecycle`、`layered`、`state`、`feedback`、`gate`、`flywheel`、`pipeline` 等类型。但 `ArchitectureDiagram` 仍基本把所有类型渲染成一组横向节点，`lifecycle` 的箭头还被放在节点内部文本中。

这会造成三个问题：

- 不直观：闭环、分层、门禁、状态和飞轮都看起来像串式流程。
- 不美观：箭头像节点或按钮里的文本，而不是关系线。
- 不正确：章节真实架构关系被压扁为线性链路，误导学习者。

## 已确认方向

采用 **A. 语义图形语法**。

不采用：

- 每章手写 SVG：视觉可控，但会重新引入 Day 特判和维护成本。
- 自动布局库：当前 20 张教学图复杂度不高，暂不引入额外依赖。

## 设计目标

- 架构图由 Markdown 中的 `architecture` metadata 驱动。
- 前端只实现通用图形语法，不按 Day ID 特判。
- 节点只表达实体、状态、角色或阶段。
- 箭头、回路、分支、边界和层级作为图形关系呈现，不写进节点 label。
- 每种关系类型有明显不同的视觉结构。
- 不适合画图的章节允许 `renderMode: "none"` 或 `structured-list`，不生成误导性默认图。

## 数据模型

`LessonArchitecture` 扩展为：

```ts
type LessonArchitecture = {
  title: string;
  summary: string;
  type:
    | "boundary"
    | "lifecycle"
    | "layered"
    | "state"
    | "feedback"
    | "gate"
    | "flywheel"
    | "pipeline"
    | "tree";
  renderMode?: "diagram" | "structured-list" | "none";
  nodes: Array<{
    id: string;
    label: string;
    tone?: "neutral" | "accent" | "system" | "warning" | "success";
    group?: string;
  }>;
  edges?: Array<{
    from: string;
    to: string;
    label?: string;
    tone?: "default" | "warning" | "success";
    relation?: "primary" | "feedback" | "branch" | "guard" | "dependency";
  }>;
  groups?: Array<{
    id: string;
    label: string;
    kind?: "boundary" | "layer" | "lane";
  }>;
  feedback?: string;
};
```

Backward compatibility:

- 旧 metadata 如果只有 `nodes`，生成器可以在短期内为 `lifecycle` / `pipeline` 推导 primary edges。
- 但最终校验要求所有非 `none` 图显式提供 `edges` 或 `groups`。

## 图形语法

### Boundary

用于回答“谁拥有决策、权限、状态或风险”。

- 用分组或边界容器表达责任区。
- 节点按控制面、模型面、业务面、审计面分布。
- 必须至少有一个 `group.kind = "boundary"` 或明确的 `guard/dependency` edge。

### Lifecycle / Pipeline

用于真实阶段推进。

- 可以呈现为水平或垂直阶段链路。
- 箭头必须来自 `edges`，不能出现在节点文本。
- 如存在撤回、删除传播、补偿，必须用 `feedback` 或 `branch` edge 表达。

### Layered

用于表达系统层级。

- 用上下层或泳道表达责任。
- `groups.kind = "layer"` 优先。
- 不应渲染为横向排一排节点。

### State / Gate

用于表达状态转换、审批、拒绝、恢复或补偿。

- 必须有 `branch` 或 `guard` relation。
- 分支结果要可见，例如允许、拒绝、审批、回滚、补偿。
- 不应只有一条主路径。

### Feedback / Flywheel

用于表达质量、反馈、评估、产品学习和能力累积。

- 必须有 `relation: "feedback"` 的边。
- 视觉上形成闭环或循环。
- 不应只是最后一个节点写“反馈”。

### Tree

用于表达父子分解或能力树。

- 使用一个 root 和多条分支。
- 适合能力路线、责任分解、风险分类。

## 渲染设计

`ArchitectureDiagram` 拆为小组件：

- `ArchitectureDiagram`：入口，处理 `renderMode`、标题、说明和无图状态。
- `ArchitectureNode`：统一节点样式。
- `ArchitectureEdgeLayer`：统一渲染边、箭头、标签。
- `BoundaryDiagram`
- `LifecycleDiagram`
- `LayeredDiagram`
- `StateGateDiagram`
- `LoopDiagram`
- `TreeDiagram`

实现建议：

- 优先用 CSS grid/flex + SVG overlay 画边，不引入第三方图形库。
- SVG marker 作为箭头。
- 边标签单独渲染，不拼进节点文本。
- 移动端允许图形纵向重排，必要时隐藏非关键 edge label，但不能隐藏关键反馈/分支关系。

## Markdown 生成器

`apps/interactive-lessons/scripts/generate-architectures.mjs` 需要升级：

- 校验 `nodes[].id` 唯一。
- 校验 `edges[].from/to` 指向已有节点。
- 校验 `groups[].id` 唯一。
- 校验 `nodes[].group` 指向已有 group。
- 校验 type 与必要结构匹配：
  - `feedback` / `flywheel` 必须有 feedback edge。
  - `gate` / `state` 必须有 branch 或 guard edge。
  - `layered` 必须有 layer group 或明确 layout。
  - `tree` 必须有分支结构。
- 禁止节点 label 包含 `→`、`->`、`←` 等箭头字符。

## 内容核查

内容生产师需要输出：

`docs/interactive-learning/architecture-intent-audit.md`

每章一行：

- Day
- 当前图类型
- 建议图类型
- 图形意图
- 必须表达的关键关系
- 是否需要 `edges/groups`

研发以该文件和每篇 `dayXX.md` 的 `architecture` metadata 为输入。

## 测试策略

### 数据测试

- 20 个 Day 的 architecture metadata 均可解析。
- 非 `none` 图至少有 `edges` 或 `groups`。
- 所有 edge 引用有效节点。
- 节点 label 不含箭头字符。
- `feedback` / `flywheel` 有反馈边。
- `gate` / `state` 有分支或 guard 边。

### 组件测试

- `ArchitectureDiagram` 不再渲染统一 `.architecture-flow` 作为所有类型的主结构。
- DOM 中 `.architecture-node` 不包含箭头字符。
- 每种主要 type 至少有一个测试样例。
- Day13 或 Day20 渲染闭环，Day15 渲染门禁分支，Day04 或 Day06 渲染分层。

### 浏览器验收

本需求涉及视觉，研发完成后需要浏览器检查：

- 375 px
- 768 px
- 1024 px
- 1440 px

重点页面：

- Day13：反馈闭环。
- Day14：生命周期与删除传播。
- Day15：门禁/审批分支。
- Day20：飞轮闭环。

验收要求：不重叠、不横向溢出、边线不遮挡文字、图形结构能明显区别于串式流程。

## 交付边界

本迭代只修复架构图表达质量：

- 不重写课程正文。
- 不新增课程章节。
- 不实现 AI 教练、云同步或团队视图。
- 不把每个概念卡都强制配图。
- 不引入第三方图形库，除非实现阶段证明 CSS/SVG 无法满足。

## 风险

- 如果只改 CSS，不补 `edges/groups`，图仍会是伪多样布局。
- 如果每章写特殊 SVG，会破坏后续 Markdown 事实源和可维护性。
- 如果移动端边线过多，可能遮挡文字，需要为小屏定义降级显示。

## 决策记录

- 2026-06-26：用户在视觉 companion 中选择 A 方案，即语义图形语法。
- 2026-06-26：产品经理已将需求沉淀为 `docs/product/topics/issue/2026-06-26-architecture-diagram-expression-quality.md`。
