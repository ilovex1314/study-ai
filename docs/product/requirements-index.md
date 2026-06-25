---
title: study-ai 历史需求沉淀索引
slug: study-ai-requirements-index
summary: 汇总当前 PRD、superpowers 规格和代码现状中的产品迭代 topic。
description: 该索引把已有需求按 feature、issue、refact 分类，作为后续产品经理对话的入口。新需求进入本目录后，应先更新此索引，再进入具体 topic 文档。
---

## Feature

| Topic | 状态 | 来源 | 摘要 |
| --- | --- | --- | --- |
| [P0 课程升级与规划对齐](topics/feature/2026-06-25-p0-course-upgrade-alignment.md) | ready | 用户原始意图、PRD、代码现状 | 以 PRD P0 为基准，补齐 Day14-Day20、提升 Day01-Day13 质量，并完成学习计划、schema 与渲染数据一致性。 |
| [个人 AI 学习工作台 P0](topics/feature/2026-06-25-personal-learning-workbench-p0.md) | ready | PRD、superpowers spec | 将互动课程升级为 Day01-Day20、本地优先、能力路线和实践证据闭环。 |
| [AI 教练与引用反馈](topics/feature/2026-06-25-ai-coach-and-rubric-feedback.md) | proposed | PRD | 基于课程、任务和用户提交提供可追溯反馈，并沉淀采纳状态。 |
| [团队能力视图](topics/feature/2026-06-25-team-capability-view.md) | deferred | PRD | 为技术负责人提供团队能力矩阵、项目证据和风险项。 |

## Issue

| Topic | 状态 | 来源 | 摘要 |
| --- | --- | --- | --- |
| [课程天数与文档漂移](topics/issue/2026-06-25-course-day-count-doc-drift.md) | ready | README、overview、代码现状 | README 写 Day01-Day04，overview 写 12 天，应用数据为 Day01-Day13，P0 规格要求 Day01-Day20。 |
| [桌面右侧菜单样式问题](topics/issue/2026-06-25-desktop-right-menu-style.md) | ready | 用户历史反馈、superpowers spec | 修复桌面右侧菜单 hover 尺寸过大、图标右侧线条和覆盖/布局语义问题。 |

## Refact

| Topic | 状态 | 来源 | 摘要 |
| --- | --- | --- | --- |
| [课程域与评估域拆分](topics/refact/2026-06-25-curriculum-assessment-domain-split.md) | ready | superpowers spec、plan | 抽出 curriculum、lesson-content、assessment、learner-state 边界。 |
| [Markdown 课程源与应用数据对齐](topics/refact/2026-06-25-markdown-source-of-truth.md) | proposed | superpowers plan | 建立 Markdown lesson contract，减少课程文档与 typed data 漂移。 |

## 使用提示

后续用户提出新需求时，先判断它落入哪个分类：

- 新学习能力、页面、工作流：优先进入 `feature`。
- 现有体验或文档不一致：优先进入 `issue`。
- 为支撑后续能力而调整边界、schema、状态模型：优先进入 `refact`。
