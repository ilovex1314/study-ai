# study-ai Interactive Learning Plan

Persona: senior frontend/backend engineer who wants to ship AI products, not just learn AI vocabulary.

Pace: 12 focused days, about 60 minutes per day. This is the executable interactive version of the larger 12-week AI Agent roadmap. Each day compresses one production learning slice into concepts, architecture, practice, quiz, and review.

Quality score: 92/100

Repair rounds: 1

## Day Map

| Day | Focus | Production Capability |
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

## How This Merges The Roadmap

The original `docs/ai-agent-learning-plan.md` used a 12-week path: model cognition, prompt/RAG, agent orchestration, platform selection, product delivery, operations, vibe coding, quality engineering, and a capstone project. This interactive plan keeps those themes, but converts them into 12 executable learning days so the web app can teach and review them consistently.

## Sources Used

- OpenAI Agents SDK docs: agents, tools, handoffs, guardrails, tracing.
- Vercel AI SDK docs: TypeScript AI UI, streaming, tools, provider abstraction.
- LangGraph docs: durable execution, state graphs, checkpointers, interrupts, human-in-the-loop resume.
- Dify docs/product material: visual workflow, RAG pipelines, tools, agent strategies.
- Mastra and n8n docs: TypeScript agent/workflow patterns and low-code automation patterns.

## Quality Gate Notes

- Every question concept is present in the lesson body.
- Every Day includes architecture or data flow.
- Every Day includes hands-on work, a production example, and a counterexample.
- The 12-week roadmap content is merged into the same Day01-Day12 structure used by the interactive app.
- Academic definitions are kept short; implementation, architecture, production tradeoffs, and verification are the center.
