---
title: 课程域与评估域拆分
slug: curriculum-assessment-domain-split
type: refact
status: ready
source: docs/superpowers/specs/2026-06-24-personal-learning-workbench-design.zh-CN.md
owner: product-manager
created: 2026-06-25
summary: 将课程路线、课程内容、评估和学习者状态拆成清晰边界。
description: 该重构支撑 P0 学习工作台，避免课程顺序、内容、评分和 localStorage 状态继续耦合。拆分后，未来云端同步和 AI 教练可以替换适配器，而不改课程内容域。
---

## 背景

P0 规格定义了四个应用边界：`curriculum`、`lesson-content`、`assessment`、`learner-state`。现有应用已有数据驱动基础，但课程路线、题目、评分和存储仍需要更明确的领域划分。

## 用户与问题

- 目标用户：维护者、后续开发线程、学习者。
- 当前痛点：扩展到 20 天、100 分制和实践证据时，耦合会放大返工成本。
- 期望结果：每个领域职责清楚，测试能定位具体破坏点。

## 范围

### In Scope

- `curriculum` 成为 Day01-Day20 路由与系列导航唯一事实来源。
- `lesson-content` 只负责概念、案例、实践、参考和图示规范。
- `assessment` 负责权重、得分和复盘推导。
- `learner-state` 通过适配器保存本地答案、历史、薄弱能力和实践证据。

### Out of Scope

- 不引入服务端。
- 不改变课程内容风格。
- 不实现 AI 教练。

## 产品方案

把 P0 视为一次产品化重构，而不只是加课程。先落稳定 contract，再扩展 Day14-Day20，最后调整 UI 呈现和文档。

## 验收标准

- `curriculum` 与 `lessons` 均为 20 项，顺序和标题一致。
- 每日题目权重合计 100。
- 旧 localStorage 数据可读取或迁移。
- 课程内容文件不直接持有 React 状态。

## 依赖与风险

- 依赖：类型定义、测试、存储迁移。
- 风险：重构与内容扩展同时推进时，定位失败原因会变难。

## 后续动作

- 先写数据契约测试，再改实现。
