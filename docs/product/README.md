---
title: study-ai 产品迭代工作区
slug: study-ai-product-workspace
summary: 用 topic 化方式沉淀 study-ai 的产品需求、缺陷和重构任务。
description: 本目录承接现有 PRD、superpowers 规格与实施计划，把后续产品需求按 feature、issue、refact 三类开发 topic 管理，并作为轻量项目产线的需求入口。
---

## 定位

`docs/product` 是 `study-ai` 的产品迭代工作区。它不替代 `docs/study-ai-product-prd.md`，而是把 PRD、superpowers 规格和日常需求拆成可推进的 topic。

项目协作产线见 [`docs/project-pipeline-prompts.md`](../project-pipeline-prompts.md)。后续新需求以本文档区为入口，交接时只传需求文档路径、验收清单和最小读取文件。

## Topic 分类

| 类型 | 放置目录 | 使用场景 |
| --- | --- | --- |
| Feature | `topics/feature/` | 新能力、新体验、新课程阶段或新业务闭环。 |
| Issue | `topics/issue/` | 已知缺陷、文档漂移、体验问题、验收不一致。 |
| Refact | `topics/refact/` | 架构边界、数据模型、课程来源、评分逻辑等重构。 |

## 轻量工作流

1. 接收需求：识别目标、范围、验收信号和是否需要内容补充。
2. 归类 topic：判断是 feature、issue 还是 refact；必要时拆成多个 topic。
3. 写需求文档：基于 `templates/topic-template.md` 写清背景、范围、验收、依赖和角色交接。
4. 路由执行：小 bug 直接给研发；内容需求先给内容生产师；产品范围不清时先给产品经理。
5. 汇总验收：只记录改动文件、验证命令、提交 hash、风险和后续动作。

禁止把聊天历史作为事实来源。需要历史信息时，从 PRD、需求文档、spec、plan 和课程源读取。

## 当前基线

- 产品 PRD：`docs/study-ai-product-prd.md`
- 项目总结：`docs/study-ai-project-summary.md`
- 已有 app：`apps/interactive-lessons`
- 当前课程数据：Day01-Day20
- 当前内容源：`docs/interactive-learning/day01.md` 到 `day20.md`
- P0 基线：个人、本地优先、Day01-Day20、能力路线、100 分制、实践证据闭环

## 维护约定

- 文件名使用 `YYYY-MM-DD-<topic>.md`。
- 一个 topic 只描述一个可验收目标。
- `source` 必须写明来自 PRD、superpowers 文档、用户输入或代码现状。
- `status` 可用 `proposed`、`ready`、`in_progress`、`done`、`deferred`。
- 交接给其他角色时只传文档路径、验收清单和最小读取文件。
