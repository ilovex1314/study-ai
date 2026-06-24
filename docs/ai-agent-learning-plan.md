# AI Agent 系统学习计划

更新时间：2026-06-24

适用对象：有 10 年工程经验，熟悉前端和服务端开发，希望系统掌握 AI Agent、AI 应用交付、部署运维、产品选型和 vibe coding 工作流的工程师。

这份文档已经按 `docs/interactive-learning/overview.md` 的方式重组为 20 个可执行学习日。每一天都包含目标、概念、关系图、实战、100 分制测验和复盘，并同步进入 `apps/interactive-lessons` Web 应用。课程总览是唯一的顺序与标题来源。

## 学习目标

这份计划的目标不是“了解很多 AI 名词”，而是把已有工程能力迁移到 AI 产品生产中，最终能独立完成从业务识别、方案选型、Agent 编排、产品开发、部署运维到效果迭代的闭环。

1. 熟悉常见 Agent 架构、模型能力边界、模型调优方式，并能基于业务场景做 AI 应用选型。
2. 能独立交付 AI 产品：Web 应用、浏览器插件、企业内部工具、API 服务、桌面客户端、自动化工作流等。
3. 理解各厂商 Agent 平台和开源框架的差异，知道什么时候用 Dify、Coze、LangGraph、OpenAI Agents SDK、Vercel AI SDK、Mastra、CrewAI、n8n 或云厂商平台。
4. 深入理解 vibe coding，让 AI 生成结果更贴近意图，用更少 token 和更短迭代链路完成高质量功能。

## 20 天执行路线

| Day | 主题 | 核心产出 |
| --- | --- | --- |
| Day01–05 | 定义可靠 AI 行为 | 定义任务、模型边界、Prompt、证据、工具与 Agent 状态。 |
| Day06–11 | 构建生产系统 | 完成 AI UX、知识治理、安全、Eval、可观测性与技术选型。 |
| Day12–16 | 扩展与运营 | 处理多模态、UI/UX、持久化工作流、发布治理与 AI SRE。 |
| Day17–20 | 项目证据闭环 | 发现项目、定义契约、实现评估、发布复盘并沉淀能力证据。 |

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

完整的 Day01–Day20 主题、顺序、产出与文档链接见 [交互学习总计划](interactive-learning/overview.md)。其中 Day14–20 覆盖恢复、发布、SRE 与项目交付证据，是前 13 天工程基础的必经延伸，不是可选附录。

## 当前推荐资料源

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK guardrails: https://openai.github.io/openai-agents-python/guardrails/
- Vercel AI SDK: https://vercel.com/ai-sdk
- LangGraph docs: https://docs.langchain.com/oss/python/langgraph
- LangGraph human-in-the-loop: https://docs.langchain.com/oss/python/langgraph/human-in-the-loop
- Dify docs: https://docs.dify.ai/
- Mastra docs: https://mastra.ai/docs
- n8n docs: https://docs.n8n.io/
