---
title: Markdown 课程源与应用数据对齐
slug: markdown-source-of-truth
type: refact
status: proposed
source: docs/superpowers/plans/2026-06-06-learning-plan-to-interactive-skill.md
owner: product-manager
created: 2026-06-25
summary: 建立 Markdown lesson contract，降低课程文档与前端 typed data 漂移。
description: 历史计划已经指出内容漂移：Markdown 学习计划、labs、prompts 和前端数据会各自演进。该重构要明确课程源结构和校验规则，让文档与应用能互相对齐。
---

## 背景

项目同时维护 `docs/interactive-learning/dayXX.md` 和 `apps/interactive-lessons/src/data/dayXX.ts`。如果没有契约与校验，课程内容、题目概念和前端展示会持续漂移。

## 用户与问题

- 目标用户：内容生产者、前端实现者、学习者。
- 当前痛点：同一课程在 Markdown 和应用里可能标题、天数、题目概念不一致。
- 期望结果：Markdown 与 typed data 有统一字段约定和自动化检查。

## 范围

### In Scope

- 定义 lesson content schema。
- 明确每日 Markdown 必填字段。
- 校验 Markdown 与 typed lesson 的天数、标题、概念、题目和参考资料。
- 为后续内容生产线程提供稳定模板。

### Out of Scope

- 本阶段不强制从 Markdown 自动生成 TypeScript。
- 不把已有全部内容一次性重写。

## 产品方案

短期先以契约和测试对齐，长期可考虑从 Markdown 解析生成中间数据，再由前端消费。

## 验收标准

- 每个 Day Markdown 都能映射到一个 typed lesson。
- 每道题的 concept 在 Markdown 概念段落中存在。
- overview 与 typed lesson 的标题和顺序一致。
- 漂移时测试失败。

## 依赖与风险

- 依赖：课程 schema、文件命名规范、测试脚本。
- 风险：过早自动生成可能降低内容编辑灵活性。

## 后续动作

- 与 P0 课程重构一起确定最终 schema。
