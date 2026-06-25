---
title: study-ai 产品迭代工作区
slug: study-ai-product-workspace
summary: 用 topic 化方式沉淀 study-ai 的产品需求、缺陷和重构任务。
description: 本目录承接现有 PRD、superpowers 规格与实施计划，把后续产品需求按 feature、issue、refact 三类开发 topic 管理，便于从用户想法进入产品方案、实施计划和验收。
---

## 定位

`docs/product` 是 `study-ai` 的产品迭代工作区。它不替代 `docs/study-ai-product-prd.md`，而是把 PRD、superpowers 规格和日常需求拆成可推进的 topic。

## Topic 分类

| 类型 | 放置目录 | 使用场景 |
| --- | --- | --- |
| Feature | `topics/feature/` | 新能力、新体验、新课程阶段或新业务闭环。 |
| Issue | `topics/issue/` | 已知缺陷、文档漂移、体验问题、验收不一致。 |
| Refact | `topics/refact/` | 架构边界、数据模型、课程来源、评分逻辑等重构。 |

## 工作流

1. 接收需求：先理解用户目标、目标用户、当前痛点和成功信号。
2. 归类 topic：判断是 feature、issue 还是 refact；必要时拆成多个 topic。
3. 生成草案：基于 `templates/topic-template.md` 写清背景、范围、验收和依赖。
4. 格式化沉淀：对新方案调用 `baoyu-format-markdown`，统一 frontmatter、标题、摘要和结构。
5. 对齐实施：复杂 topic 再进入 `docs/superpowers/specs/` 和 `docs/superpowers/plans/`。

## 当前基线

- 产品 PRD：`docs/study-ai-product-prd.md`
- 项目总结：`docs/study-ai-project-summary.md`
- 已有 app：`apps/interactive-lessons`
- 已有课程数据：Day01-Day13
- P0 目标规格：个人、本地优先、Day01-Day20、能力路线、100 分制、实践证据闭环

## 维护约定

- 文件名使用 `YYYY-MM-DD-<topic>.md`。
- 一个 topic 只描述一个可验收目标。
- `source` 必须写明来自 PRD、superpowers 文档、用户输入或代码现状。
- `status` 可用 `proposed`、`ready`、`in_progress`、`done`、`deferred`。
