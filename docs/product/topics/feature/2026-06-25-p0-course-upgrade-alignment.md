---
title: P0 课程升级与规划对齐
slug: p0-course-upgrade-alignment
type: feature
status: ready
source: user-request, docs/study-ai-product-prd.md, docs/ai-learning-system-plan.md, docs/interactive-learning, apps/interactive-lessons/src/data
owner: product-manager
created: 2026-06-25
summary: 以 PRD P0 为基准，把现有 Day01-Day13 课程升级为质量一致、schema 统一、可导入学习计划的 Day01-Day20 课程体系。
description: 本 topic 是 P0 课程升级的主交付需求，包含内容补齐、课程质量提升、课程编排架构对齐和 Markdown/前端渲染数据一致性。它属于 feature epic，同时内含规划漂移修复 issue 与课程 schema/data refact 两类子工作。
---

## 需求判断

本需求拆分为一个主 topic 和两个内置工作面：

| 层级 | 分类 | 说明 |
| --- | --- | --- |
| 主 topic | `feature` | P0 课程升级，是 PRD 发布路线图中的明确产品能力。 |
| 子工作 A | `issue` | 当前规划、Markdown 内容和前端数据存在漂移：PRD 要求 P0 Day14-Day20，当前 Markdown 与 typed lesson 只有 Day01-Day13。 |
| 子工作 B | `refact` | 需要统一课程 schema、学习计划导入和 Markdown/渲染数据一致性，避免继续手工漂移。 |

## 背景

用户指出“项目的规划和内容存在差异”，并要求以 `docs/study-ai-product-prd.md` 为规划基准处理 P0 阶段。PRD 的 P0 范围是“Day14-Day20、统一课程 schema、学习计划导入”，成功信号是“完成率与满意度不低于现状”。

当前项目状态：

- `docs/study-ai-product-prd.md`：P0 明确是课程升级。
- `docs/interactive-learning/`：只有 `day01.md` 到 `day13.md` 与 `overview.md`。
- `apps/interactive-lessons/src/data/`：只有 `day01.ts` 到 `day13.ts`。
- `docs/ai-learning-system-plan.md`：已有 20 天路线与 Day14-Day20 简版内容，可作为内容生产输入。
- `docs/ai-agent-learning-plan.md` 与 `docs/interactive-learning/overview.md`：仍保留 12 天口径，需要同步。

## 用户与问题

- 目标用户：已有工程基础、希望学习 AI 产品交付的学习者。
- 当前痛点：课程规划、Markdown 内容和前端可交互课程不一致；后续团队不知道以哪份文档为准。
- 期望结果：P0 课程升级后，学习者看到的是一套 Day01-Day20、质量一致、结构统一、可复盘、可验证产出的学习路线。

## P0 本次交付边界

### In Scope

- **课程质量提升**：复核 Day01-Day13 的目标、概念、架构、实践、题目、复盘建议，补齐质量短板。
- **Day14-Day20 内容补齐**：以 `docs/ai-learning-system-plan.md` 的 Day14-Day20 为初稿，扩展为完整互动课程 Markdown。
- **课程编排架构对齐**：按 PRD 和 20 天路线组织能力依赖，而不是只在 Day13 后机械追加章节。
- **统一课程 schema**：定义 Markdown 与 typed lesson 都必须满足的字段，例如目标、能力、概念、关系图、实践、题目、复盘和参考资料。
- **学习计划导入**：把 `docs/ai-learning-system-plan.md` 的 20 天路线导入 `docs/interactive-learning/overview.md` 和逐日 Markdown。
- **Markdown/渲染数据一致性**：确保 `docs/interactive-learning/dayXX.md` 与 `apps/interactive-lessons/src/data/dayXX.ts` 在天数、标题、概念、题目和能力目标上可校验。
- **发布口径同步**：更新 README、学习计划、overview 和产品索引，让“当前已实现”和“P0 目标/完成状态”一致。

### Out of Scope

- 不做登录、云端同步、团队视图。
- 不做实时 AI 教练和 RAG 反馈。
- 不做 AI 自动评分。
- 不引入生产后端。
- 不在本 topic 内推进 P1/P2/P3。

## 课程质量标准

每个 Day 必须具备：

- 一个明确的学习目标。
- 一个可验证工程产出。
- 核心概念与常见误区。
- 关系型架构图或流程图，能表达职责、生命周期、状态或反馈闭环。
- 生产案例与反例。
- 开放实践任务。
- 至少 4 道题，题目概念必须出现在课程正文中。
- 复盘建议与下一步行动。
- 权威参考或可信来源。

Day01-Day13 不只是“保留现状”，需要按同一标准做质量体检；Day14-Day20 不能停留在简版大纲，需要扩展到同等质量。

## 内容补充模块

本需求包含内容补充模块，并且需要内容生产师先处理。

### 内容生产师输入

内容生产师应读取并使用以下材料：

- `docs/study-ai-product-prd.md`：P0 范围与产品基准。
- `docs/ai-learning-system-plan.md`：20 天能力地图，尤其 Day14-Day20 初稿。
- `docs/ai-agent-learning-plan.md`：既有 12 天学习计划与推荐技术栈。
- `docs/interactive-learning/overview.md`：当前互动课程总览。
- `docs/interactive-learning/day01.md` 到 `day13.md`：既有课程内容。
- `docs/superpowers/specs/2026-06-24-personal-learning-workbench-design.zh-CN.md`：本地优先学习工作台规格。
- `docs/product/topics/feature/2026-06-25-p0-course-upgrade-alignment.md`：本需求文档。

### 内容生产师产出

- 更新 `docs/interactive-learning/overview.md` 为 Day01-Day20。
- 新增 `docs/interactive-learning/day14.md` 到 `day20.md`。
- 复核并必要时补强 `day01.md` 到 `day13.md`，使其满足统一课程质量标准。
- 输出课程质量检查说明，标记哪些 Day 只是小修，哪些 Day 做了结构升级。
- 明确每个 Day 的能力目标、可验证产出、关系图类型、题目概念和参考资料。

## 研发工程师输入

研发工程师应在内容生产完成后接手。

### 研发可执行范围

- 建立或更新课程 schema，使 Markdown 与 typed lesson 有同一套必填字段。
- 将 Day14-Day20 转成 `apps/interactive-lessons/src/data/day14.ts` 到 `day20.ts`。
- 更新 `apps/interactive-lessons/src/data/lessons.ts`，注册 Day01-Day20。
- 如有必要，扩展 `ConceptId`、`conceptLabels`、`reviewAdvice`、图示类型和题目权重字段。
- 建立一致性校验：Markdown 天数、typed lesson 天数、标题、路由、概念和题目覆盖必须一致。
- 更新前端渲染以支持新增关系图、实践证据和课程质量字段。
- 更新 README 与应用内导航显示，使 Day01-Day20 可访问。
- 补充或更新测试，至少覆盖课程数量、路由、题目概念、schema 必填项、构建通过。

### 研发不应先做的事

- 不在内容生产完成前直接臆造 Day14-Day20 typed lesson。
- 不把 Day14-Day20 简版大纲直接塞进应用作为最终课程。
- 不绕过 Markdown 源内容做一次性前端数据补丁。

## 验收标准

- `docs/interactive-learning/overview.md` 与应用课程列表都展示 Day01-Day20。
- `docs/interactive-learning/day01.md` 到 `day20.md` 全部存在。
- `apps/interactive-lessons/src/data/day01.ts` 到 `day20.ts` 全部存在并注册。
- 每个 Day 满足课程质量标准。
- Markdown 与 typed lesson 的标题、路由、概念、题目和能力目标一致。
- Day14-Day20 不只是大纲，而是能支撑互动页面渲染的完整课程。
- README、学习计划和产品文档口径同步。
- 测试与构建通过。

## 风险与依赖

- 内容质量风险：Day14-Day20 初稿偏简，需要先扩写再研发实现。
- 架构漂移风险：如果研发先做 typed data，Markdown 与前端数据会继续分叉。
- 范围膨胀风险：P0 只做课程升级，不进入 AI 教练、团队版和云端学习档案。
- 验收风险：完成率与满意度需要后续真实使用数据；本次只能先保证课程质量、结构一致性和可用性。

## 交接摘要

先交给内容生产师完成 Day01-Day20 课程内容统一，再交给研发工程师实现 schema、导入、渲染和一致性校验。

推荐顺序：

1. 内容生产师：基于 PRD 与 20 天学习计划补齐/升级 Markdown。
2. 产品经理：复核内容是否满足 P0 质量标准。
3. 研发工程师：把内容导入 typed lesson，补 schema、渲染和测试。
4. 项目负责人：统一验收 Day01-Day20、README、overview、测试和构建。
