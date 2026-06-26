---
title: 课程天数与文档漂移
slug: course-day-count-doc-drift
type: issue
status: ready
source: README, docs/interactive-learning/overview.md, apps/interactive-lessons/src/data/lessons.ts
owner: product-manager
created: 2026-06-25
summary: README、overview、应用数据和 P0 规格中的课程天数描述不一致。
description: 当前 README 仍描述 Day01-Day04，overview 写 12 天，而应用数据已经注册 Day01-Day13。新的 P0 规格又要求重构为 Day01-Day20，需要明确过渡口径并同步文档。
---

## 背景

项目总结分析已经指出 README 与代码进度不同步。最新代码中的 `lessons.ts` 注册 Day01-Day13，`docs/interactive-learning/overview.md` 仍写 12 天。

## 用户与问题

- 目标用户：学习者、维护者、后续执行开发的 Codex 线程。
- 当前痛点：不知道哪个文档是事实来源，容易重复返工。
- 期望结果：README、overview、产品 PRD 和应用数据有清晰的当前状态与目标状态。

## 范围

### In Scope

- 标注当前已实现 Day01-Day13。
- 标注 P0 目标是 Day01-Day20。
- 同步 README、overview 和产品索引。
- 后续实现完成后再把口径切换到 Day01-Day20 已发布。

### Out of Scope

- 本 issue 不直接补 Day14-Day20 内容。
- 不修改课程路线架构。

## 产品方案

短期用文档修复消除误导：当前状态写 Day01-Day13，路线目标写 Day01-Day20。长期由 refact topic 建立 Markdown 与 typed data 的一致性测试。

## 验收标准

- README 不再写“当前实现 Day01-Day04”。
- overview 不再只宣称 12 天且遗漏 Day13。
- 文档明确区分“当前已实现”和“P0 目标”。

## 依赖与风险

- 依赖：课程路线决策。
- 风险：如果 P0 重构马上开始，文档修复可能需要与大改合并处理。

## 后续动作

- 可以作为独立文档修复先做。
