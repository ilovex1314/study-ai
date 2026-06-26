---
title: 架构图表达质量修复
slug: architecture-diagram-expression-quality
type: issue
status: ready
source: user-request, docs/study-ai-product-prd.md, docs/product/topics/feature/2026-06-25-p0-course-upgrade-alignment.md, docs/superpowers/specs/2026-06-24-personal-learning-workbench-design.zh-CN.md, apps/interactive-lessons/src/components/ArchitectureDiagram.tsx, apps/interactive-lessons/src/data/architectures.generated.ts
owner: product-manager
created: 2026-06-26
summary: 修复互动课程架构图普遍串式、箭头混入节点、关系类型表达不准的问题。
description: 本需求聚焦 P0 课程质量中的架构图表达质量。课程已经具备多种 diagram type，但当前渲染仍接近统一节点流，导致闭环、树形、分层、门禁、飞轮等关系无法被直观看懂。
---

## 需求判断

本需求主分类为 `issue`，因为它修复现有课程体验中的质量缺陷。研发实现会包含 `refact` 范围：需要升级架构图数据模型与渲染组件，使不同关系类型有不同布局和视觉语义。

## 背景

PRD 要求 P0 做“课程升级”，目标是提升课程质量。P0 课程升级 topic 已要求每个 Day 具备关系型架构图或流程图，能表达职责、生命周期、状态或反馈闭环。

现有 P0 规格也明确提出：图示应按关系类型选择，而不是统一画成从左到右流程：

- 模型、策略和业务系统之间使用责任/边界图。
- 摄取、版本和删除使用生命周期图。
- 组件及所有权使用分层系统图。
- 可恢复工作流和审批使用状态图。
- 评估、运营与产品学习使用反馈闭环图。

## 当前代码现状

已核实当前实现存在“数据有类型，但渲染表达不足”的断层：

- `apps/interactive-lessons/src/data/architectures.generated.ts` 已为 Day01-Day20 提供 `boundary`、`lifecycle`、`layered`、`state`、`feedback`、`gate`、`flywheel`、`pipeline` 等类型。
- `apps/interactive-lessons/src/components/ArchitectureDiagram.tsx` 仍主要把所有图渲染为 `.architecture-flow` 下的一组节点。
- 当前只有 `lifecycle` 类型在节点文本后插入 `→`，箭头作为节点内部内容出现。
- `ConceptVisual` 也存在类似模式：节点内部追加 `→`，边标签中拼接 `label → target`。
- CSS 对不同 `data-type` 有一些 grid 样式差异，但没有真正表达闭环、树形、门禁、飞轮、泳道、反馈边等结构关系。

## 用户与问题

- 目标用户：使用互动课程学习 AI 工程架构判断的学习者。
- 当前痛点：架构图看起来几乎都是串式流程，无法帮助学习者理解“边界、层级、闭环、门禁、状态、飞轮”等真实关系。
- 体验问题：箭头放在节点或按钮式元素内部，视觉上像按钮文字，既不美观，也不符合图形表达习惯。
- 正确性问题：很多章节本质是闭环、树形、分层或状态图，却被渲染成线性串行，误导学习者对系统关系的理解。

## 产品目标

让每章架构图成为“理解课程架构判断”的核心视觉资产，而不是装饰性的节点列表。

具体目标：

- 图形表达准确：不同关系类型使用不同图式。
- 视觉表达直观：学习者能一眼看出主路径、反馈路径、控制点、边界和风险点。
- 交互表达克制：架构图节点不是按钮，箭头不是节点内文本。
- 内容表达允许留白：如果某章关系不适合画图，应允许不画，或改为更合适的关系图。

## 范围

### In Scope

- 复核 Day01-Day20 的 `architecture.type` 是否与课程关系一致。
- 为每种关系类型定义适合的表达方式：
  - `boundary`：责任边界/信任边界图。
  - `lifecycle`：生命周期或阶段推进图，可包含回补/删除传播路径。
  - `layered`：分层架构图，强调上下层责任与依赖。
  - `state`：状态机或可恢复执行图，强调状态转换、暂停和恢复。
  - `feedback`：反馈闭环图，强调线上反馈、评估、回归和迭代。
  - `gate`：门禁/审批图，强调策略检查、风险判断和分支结果。
  - `flywheel`：飞轮图，强调循环增长和能力累积。
  - `pipeline`：流水线图，仅在确实是线性处理时使用。
- 升级 `LessonArchitecture` 数据模型，使它能表达边、分组、分支、反馈边、可选图形布局和可选不渲染。
- 改造 `ArchitectureDiagram`，按类型渲染不同 SVG/CSS 图式。
- 清理节点内箭头：箭头应是连接线、SVG marker、独立 edge 或 CSS connector，不作为节点文字。
- 检查 `ConceptVisual` 中的节点内箭头和边标签表达，避免同类视觉问题继续存在。
- 增加视觉和数据校验，避免所有类型被同一串式布局吞掉。

### Out of Scope

- 不重写课程正文。
- 不新增 Day 内容。
- 不引入外部图形库，除非研发评估现有 CSS/SVG 无法满足。
- 不做 AI 教练、云同步或团队版能力。
- 不把每个概念卡都强制配图。

## 图形选择规则

每章先判断“关系类型”，再决定是否画图：

| 关系问题 | 推荐图式 | 不应使用 |
| --- | --- | --- |
| 谁拥有决策、权限、状态或风险？ | 边界图 | 简单串式箭头 |
| 一个对象如何创建、更新、撤回、删除？ | 生命周期图 | 无回补路径的单向流程 |
| 系统有哪些层，各层职责是什么？ | 分层图 | 横向排一排节点 |
| 执行如何暂停、恢复、失败、补偿？ | 状态图 | 普通流程图 |
| 质量、反馈、评估如何回流？ | 闭环图 | 终点式流程 |
| 动作何时允许、拒绝、审批？ | 门禁/分支图 | 单路径流程 |
| 能力或产品如何持续增强？ | 飞轮图 | 线性阶段图 |
| 确实只有顺序处理链路？ | 流水线图 | 复杂关系硬套流水线 |

如果某章无法用图更清楚地表达关系，应允许 `architecture` 为空或使用非图形的结构化清单，而不是生成一个看似有图但语义错误的串式图。

## 内容生产师交接

本需求包含轻量内容核查模块，但不需要内容生产师大规模改写课程。

内容生产师需要先做：

- 复核 `docs/interactive-learning/day01.md` 到 `day20.md` 的架构描述。
- 为每章确认最合适的关系类型。
- 标记当前 `architectures.generated.ts` 中类型不准确的章节。
- 标记“不适合画图”或“更适合结构化清单”的章节。
- 输出每章一句图形意图，例如“Day10 是质量反馈闭环，必须画成闭环而不是流程终点”。

内容生产师不需要做：

- 不需要重写完整课程。
- 不需要写 React 或 CSS。
- 不需要把所有概念卡都补图。

## 研发工程师交接

研发应在内容核查完成后接手。

### 研发可执行范围

- 扩展 `LessonArchitecture`，至少支持：
  - `nodes`：节点。
  - `edges`：连接关系，可含方向、标签、tone、是否反馈边。
  - `groups` 或 `lanes`：边界、层、泳道。
  - `layout`：类型化布局提示。
  - `renderMode`：允许 `diagram`、`structured-list`、`none`。
- 改造 `ArchitectureDiagram`：
  - 不再把所有图统一渲染为 `.architecture-flow`。
  - 按 `type` 渲染不同布局组件或 SVG 模板。
  - 箭头使用连接线/marker/connector，不出现在节点文本内部。
  - 节点是语义图形元素，不渲染成按钮式交互控件。
- 更新 `architectures.generated.ts`：
  - 为 Day01-Day20 补充真实 edges、groups、feedback edges。
  - 修正不准确的 type。
- 检查并必要时修复 `ConceptVisual`：
  - 去掉节点内部 `→`。
  - 让边标签与目标节点分离，避免“label -> node”作为纯文本。
- 增加测试：
  - 每个非 `none` 架构图必须有 edge 或明确的 group/lane。
  - `feedback`、`flywheel` 类型必须存在反馈边或闭环语义。
  - `gate` 类型必须存在分支结果。
  - DOM 中 `.architecture-node` 或 `.concept-diagram-node` 不应包含箭头字符。
  - Day01-Day20 至少覆盖 boundary/lifecycle/layered/state/feedback/gate/flywheel/pipeline 的渲染快照或行为测试。
- 做响应式验收：
  - 375、768、1024、1440 px 下不重叠、不溢出。
  - 图形可读，连线不遮挡文字。

### 研发不应做的事

- 不用 CSS grid 微调伪装成“多类型图”，但本质仍是一组串行节点。
- 不把箭头、分支、回路写进节点 label。
- 不为了让所有章节都有图而保留语义错误的图。

## 验收标准

- Day01-Day20 的架构图类型与课程关系一致。
- 线性流水线只用于确实线性的章节。
- 闭环章节有可见回流路径，不能只是最后一个节点写“反馈”。
- 门禁章节有可见分支或审批/拒绝/执行路径。
- 分层章节能看出层级和责任，不是横向卡片列表。
- 状态章节能看出状态转换、暂停、恢复或补偿。
- 飞轮章节能看出循环增长关系。
- 箭头不作为节点或按钮内文本出现。
- 若某章不适合画图，页面不渲染空白图形占位，也不生成误导性图。
- 图形在移动端和桌面端都不重叠、不溢出。
- 自动化测试覆盖关系类型、DOM 箭头字符约束和响应式基本结构。

## 与 P0 的关系

该需求是 P0 课程质量提升的一部分，优先级高于继续增加新课程内容。原因是架构图承担“架构判断”学习目标，如果图形表达错误，会直接降低课程理解质量。

## 交接摘要

建议先由内容生产师做 Day01-Day20 架构关系核查，再由研发工程师改造数据模型与渲染组件。最终交付应让每章图形服务于真实关系表达，而不是统一节点串。
