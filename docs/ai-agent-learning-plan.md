# AI Agent 系统学习计划

更新时间：2026-06-07

适用对象：有 10 年工程经验，熟悉前端和服务端开发，希望系统掌握 AI Agent、AI 应用交付、部署运维、产品选型和 vibe coding 工作流的工程师。

这份文档已经按 `docs/interactive-learning/overview.md` 的方式重组：原来的 12 周路线被合并为 12 个可执行学习日。每一天都包含目标、概念、架构、数据流、实战、测验和复盘，并同步进入 `apps/interactive-lessons` Web 应用。

## 学习目标

这份计划的目标不是“了解很多 AI 名词”，而是把已有工程能力迁移到 AI 产品生产中，最终能独立完成从业务识别、方案选型、Agent 编排、产品开发、部署运维到效果迭代的闭环。

1. 熟悉常见 Agent 架构、模型能力边界、模型调优方式，并能基于业务场景做 AI 应用选型。
2. 能独立交付 AI 产品：Web 应用、浏览器插件、企业内部工具、API 服务、桌面客户端、自动化工作流等。
3. 理解各厂商 Agent 平台和开源框架的差异，知道什么时候用 Dify、Coze、LangGraph、OpenAI Agents SDK、Vercel AI SDK、Mastra、CrewAI、n8n 或云厂商平台。
4. 深入理解 vibe coding，让 AI 生成结果更贴近意图，用更少 token 和更短迭代链路完成高质量功能。

## 12 天执行路线

| Day | 主题 | 核心产出 |
| --- | --- | --- |
| Day01 | 模型认知与能力边界 | 判断什么时候能信任 LLM，什么时候必须保留确定性系统控制。 |
| Day02 | Prompt、RAG 与知识 grounding | 设计 prompt 合约和最小 RAG 链路，并能度量检索质量。 |
| Day03 | Agent loop 与 workflow control | 设计带工具、状态、trace、人工确认和失败恢复的执行循环。 |
| Day04 | AI product delivery and operations | 把 demo 变成有 UX、网关、eval、观测、成本控制和部署策略的产品。 |
| Day05 | 平台、框架与供应商选型 | 根据团队能力和产品阶段选择 OpenAI Agents SDK、Vercel AI SDK、LangGraph、Dify、Coze、Mastra、n8n 或云平台。 |
| Day06 | Vercel AI SDK、Next.js 与前后端协作 | 用 TypeScript 技术栈搭出流式 AI UI、provider abstraction、工具调用和服务端边界。 |
| Day07 | LangGraph / durable workflow / human-in-the-loop | 学习状态图、checkpoint、interrupt/resume 和多步骤任务恢复。 |
| Day08 | Dify、Coze、n8n 与业务验证 | 理解可视化平台如何加速原型、知识库、工作流和跨系统自动化。 |
| Day09 | 检索、重排、权限、多租户与评估 | 把 Day02 的最小 RAG 扩展为多源、多租户、可评估、可运维的知识系统。 |
| Day10 | Eval、反馈、红队与回归测试 | 建立 AI 功能的 golden dataset、离线评估、在线反馈、回归和风险样本库。 |
| Day11 | 上下文工程、任务拆解与 AI 协作 | 把模糊想法转成 AI 可执行任务，降低 token 浪费和返工。 |
| Day12 | Capstone：可演示 AI 产品闭环 | 把 11 天能力合成一个可演示产品：前端体验、编排层、工具、部署、日志、eval 和复盘。 |

## 每日学习结构

每个 Day 都按同一结构执行：

1. Today Goal：明确今天要形成的工程判断。
2. Why This Matters：解释为什么这件事会影响生产交付。
3. Core Concepts：讲概念、边界、常见误区和工程视角。
4. Underlying Architecture：画出系统组成和职责边界。
5. Data And Logic Flow：说明输入、处理、状态、输出和反馈。
6. Hands-On Practice：产出可保存、可验证的代码、文档或设计。
7. Quiz / Review：用测验和复盘把薄弱概念拉回来。

## 推荐优先技术栈

```text
TypeScript / Next.js / Node.js
  -> Vercel AI SDK
  -> OpenAI Agents SDK 或 Mastra
  -> Postgres + pgvector / Qdrant
  -> Docker + 云部署
  -> LangGraph 作为复杂编排进阶
  -> Dify / Coze / n8n 作为快速验证和业务平台认知
```

如果偏企业后端和复杂编排，可以走：

```text
Python / FastAPI
  -> OpenAI Agents SDK
  -> LangGraph
  -> Redis / Postgres / Queue
  -> Qdrant / Milvus
  -> Docker / Kubernetes / 云厂商 AI 平台
```

## Day 文档索引

- [Day01 模型认知与能力边界](interactive-learning/day01.md)
- [Day02 Prompt、RAG 与知识 grounding](interactive-learning/day02.md)
- [Day03 Agent loop 与 workflow control](interactive-learning/day03.md)
- [Day04 AI product delivery and operations](interactive-learning/day04.md)
- [Day05 平台、框架与供应商选型](interactive-learning/day05.md)
- [Day06 Vercel AI SDK、Next.js 与前后端协作](interactive-learning/day06.md)
- [Day07 LangGraph / durable workflow / human-in-the-loop](interactive-learning/day07.md)
- [Day08 Dify、Coze、n8n 与业务验证](interactive-learning/day08.md)
- [Day09 检索、重排、权限、多租户与评估](interactive-learning/day09.md)
- [Day10 Eval、反馈、红队与回归测试](interactive-learning/day10.md)
- [Day11 上下文工程、任务拆解与 AI 协作](interactive-learning/day11.md)
- [Day12 Capstone：可演示 AI 产品闭环](interactive-learning/day12.md)

## 当前推荐资料源

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK guardrails: https://openai.github.io/openai-agents-python/guardrails/
- Vercel AI SDK: https://vercel.com/ai-sdk
- LangGraph docs: https://docs.langchain.com/oss/python/langgraph
- LangGraph human-in-the-loop: https://docs.langchain.com/oss/python/langgraph/human-in-the-loop
- Dify docs: https://docs.dify.ai/
- Mastra docs: https://mastra.ai/docs
- n8n docs: https://docs.n8n.io/
