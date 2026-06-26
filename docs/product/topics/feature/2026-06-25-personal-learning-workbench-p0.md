---
title: 个人 AI 学习工作台 P0
slug: personal-learning-workbench-p0
type: feature
status: ready
source: PRD, superpowers specs/2026-06-24-personal-learning-workbench-design.zh-CN.md
owner: product-manager
created: 2026-06-25
summary: 将现有互动课程升级为本地优先的 Day01-Day20 AI 工程能力学习工作台。
description: P0 聚焦个人学习闭环，不做登录、云同步、团队视图和实时 AI 教练。核心是用能力路线、关系图、开放实践、100 分制评估和本地证据记录，让学习者完成可复核的工程产出。
---

## 背景

现有应用已经具备 Day01-Day13 互动课程、路由、答题、复盘和本地记录。PRD 进一步要求从章节学习升级到可追踪能力、可验证产出和持续迭代的学习产品。

## 用户与问题

- 目标用户：已有前后端经验、希望交付 AI 产品的工程师。
- 当前痛点：课程内容可以学习，但能力前置关系、实践证据和评估分值还不够产品化。
- 期望结果：学习者每天约 60 分钟完成一个可复核产出，最终能定义、构建、评估、运营并复盘 AI 产品。

## 范围

### In Scope

- Day01-Day20 能力路线。
- 每日课程包含目标、概念、关系图、生产案例、反例、开放实践、加权题和复盘建议。
- 本地保存当前答案、尝试历史、薄弱能力、实践证据和导出记录。
- 100 分制加权评估。
- 桌面右侧固定 section rail 与 H5 头部横向导航。
- README 与 `docs/interactive-learning/overview.md` 同步到实际发布状态。

### Out of Scope

- 登录与云端同步。
- 团队视图。
- 实时 RAG 或 AI 教练。
- AI 自动评分。
- 生产后端。

## 产品方案

每一天形成一个证据闭环：

`能力路线 -> 概念 -> 架构判断 -> 开放实践证据 -> 加权测验 -> 复盘 -> 能力证据`

课程以能力依赖组织，而不是按平台或工具堆叠。平台与框架只作为具体能力日中的实现路径。

## 验收标准

- Markdown 与 typed lesson 均覆盖 Day01-Day20，路由、标题和顺序一致。
- 每天至少 4 道题，权重合计 100 分。
- 每题概念都能定位到当日内容。
- 每日具备关系图，且桌面和 H5 不重叠、不溢出。
- 本地复做、历史、导出和存储迁移正确。

## 依赖与风险

- 依赖：课程数据 schema、评估逻辑、导航组件、Markdown 文档同步。
- 风险：一次性扩展 20 天内容容易造成内容质量下降，需要分批验收。

## 后续动作

- 优先完成 curriculum 与 weighted assessment 契约。
- 再补 Day14-Day20 和统一关系图模型。
- 最后同步 README、overview 和逐日 Markdown。
