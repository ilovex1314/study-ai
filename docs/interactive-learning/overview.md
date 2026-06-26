---
title: study-ai 20 天互动学习路线
slug: study-ai-interactive-learning-20-days
summary: 以 PRD P0 为基准，将 AI 工程课程整理为 Day01-Day20 的可交付学习路线。
description: 本总览是互动课程的 Markdown 事实源索引，明确每一天的能力目标、可验证产出、关系图类型、题目概念和研发导入要点。
---

# study-ai Interactive Learning Plan

Persona: senior frontend/backend engineer who wants to ship AI products, not just learn AI vocabulary.

Pace: 20 focused days, about 60 minutes per day. This is the P0 course-upgrade version of the larger AI engineering roadmap. Every day must connect concepts, architecture, practice, quiz, review, and a concrete production artifact.

Quality target: every Day includes a learning goal, verifiable output, core concepts, architecture or flow recommendation, production example, counterexample, hands-on task, at least 4 quiz questions, review advice, and references.

## P0 Source Of Truth

- Product baseline: `docs/study-ai-product-prd.md`
- P0 topic: `docs/product/topics/feature/2026-06-25-p0-course-upgrade-alignment.md`
- Learning source: `docs/ai-learning-system-plan.md`
- Interactive lessons: `docs/interactive-learning/day01.md` to `day20.md`

## Day Map

| Day | Focus | Capability Target | Verifiable Output | Diagram Type | Quiz Concepts |
| --- | --- | --- | --- | --- | --- |
| Day01 | 模型认知与能力边界 | 判断什么时候信任 LLM，什么时候保留确定性控制 | 能力边界决策表 | Boundary map | capability, uncertainty, deterministic fallback, eval |
| Day02 | Prompt、RAG 与知识 grounding | 设计 prompt 合约和最小 RAG 链路 | 最小 RAG 设计说明 | Lifecycle | prompt contract, chunking, retrieval, grounding |
| Day03 | Agent loop 与 workflow control | 设计带工具、状态、trace 和人工确认的执行循环 | Agent 状态图 | State machine | loop, tool, state, approval |
| Day04 | AI product delivery and operations | 把 demo 变成可观测、可评估、可部署的产品 | 发布 checklist | Layered system | gateway, eval, observability, cost |
| Day05 | 平台、框架与供应商选型 | 根据团队能力和阶段选择合适平台 | 技术选型矩阵 | Boundary map | build-vs-buy, abstraction, migration, team fit |
| Day06 | Vercel AI SDK、Next.js 与前后端协作 | 搭出流式 AI UI、provider abstraction 和工具边界 | TypeScript AI UI 方案 | Layered system | streaming, provider, server boundary, tool call |
| Day07 | LangGraph / durable workflow / human-in-the-loop | 设计 checkpoint、interrupt/resume 和恢复链路 | durable workflow 状态图 | State machine | checkpoint, interrupt, resume, compensation |
| Day08 | Dify、Coze、n8n 与业务验证 | 用可视化平台加速原型、知识库和跨系统自动化 | 原型验证方案 | Layered system | workflow, connector, prototype, governance |
| Day09 | 检索、重排、权限、多租户与评估 | 把 RAG 扩展为多源、多租户、可评估知识系统 | 多租户 RAG 架构 | Lifecycle | rerank, tenant, permission, retrieval eval |
| Day10 | Eval、反馈、红队与回归测试 | 建立 golden dataset、离线评估、在线反馈和风险样本库 | Eval 回归计划 | Feedback loop | golden set, regression, red team, rubric |
| Day11 | 上下文工程、任务拆解与 AI 协作 | 把模糊想法转成 AI 可执行任务 | 任务拆解模板 | Lifecycle | context, task slicing, constraints, review |
| Day12 | Capstone：可演示 AI 产品闭环 | 合成前端、编排、工具、日志、eval 与复盘 | 可演示产品闭环 | Layered + feedback | integration, evidence, release, review |
| Day13 | UI/UX Pro Max 实战 | 将设计建议落成可维护、可验证的 React 页面 | 设计 token 与验收记录 | Feedback loop | design data, token, accessibility, validation |
| Day14 | 数据治理与知识生命周期 | 为知识库设计可追溯、可删除、可权限过滤的摄取链路 | 知识生命周期图与 metadata contract | Lifecycle | metadata, deletion propagation, permission filter, freshness |
| Day15 | AI 安全、身份与工具权限 | 把 Prompt Injection、越权工具调用和数据泄露转成系统控制点 | 工具权限矩阵与审批策略 | Boundary + gate | untrusted input, tool schema, approval, audit |
| Day16 | 多模态与实时体验 | 为图片、语音与文本任务定义统一输入、异步处理和降级方案 | 多模态任务编排图 | Layered pipeline | multimodal input, async queue, citation, graceful degradation |
| Day17 | 成本、延迟与容量工程 | 将 token、检索、工具调用和队列转成预算与服务目标 | 成本/延迟预算表 | Feedback loop | routing, cache, retry budget, p95 |
| Day18 | AI SRE 与事故响应 | 让 AI 功能具备可观测、可降级、可回滚和可复盘能力 | 两份 runbook 与 trace 分析 | Incident lifecycle | SLO, trace, circuit breaker, rollback |
| Day19 | 团队协作与发布治理 | 把 Prompt、模型、数据集和工作流作为可审查发布物 | AI 发布 checklist | Gate flow | versioning, release gate, gray rollout, ownership |
| Day20 | 产品战略与能力飞轮 | 将课程能力转成持续增强的产品与团队学习机制 | 北极星指标、实验计划和 90 天路线图 | Flywheel | capability evidence, guardrail metric, experiment, retention |

## How This Merges The Roadmap

The original 12-day interactive course covered core AI product delivery. P0 extends it to 20 days by adding production-system depth: data lifecycle, security, multimodal experience, cost engineering, SRE, release governance, and product strategy.

The course order now follows capability dependency:

1. Day01-Day04 establish model, RAG, agent, and product delivery fundamentals.
2. Day05-Day09 compare implementation platforms and mature knowledge systems.
3. Day10-Day13 add eval, context work, capstone integration, and design validation.
4. Day14-Day20 harden the system for data governance, security, multimodal UX, operations, release, and long-term product learning.

## R&D Import Notes

- `docs/interactive-learning/dayXX.md` is the content source for typed lesson generation.
- Every Day includes a recommended diagram type; renderer should support relationship type rather than day-specific special cases.
- Quiz concepts listed in this overview must appear in the matching day body before they are used in typed lesson questions.
- Day14-Day20 should not be imported as outline-only pages; each has practice, quiz, review, and references.

## Quality Gate Notes

- Every Day has a concrete output useful for production delivery.
- Every Day has at least one architecture or flow diagram recommendation.
- Every Day includes a production example and counterexample.
- Quiz concepts are declared in this overview and must be validated against the lesson body.
- Fast-moving topics use official or authoritative references inside each Day.
