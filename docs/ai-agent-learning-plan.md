# AI Agent 系统学习计划

更新时间：2026-06-05

适用对象：有 10 年工程经验，熟悉前端和服务端开发，希望系统掌握 AI Agent、AI 应用交付、部署运维、产品选型和 vibe coding 工作流的工程师。

## 学习目标

这份计划的目标不是“了解很多 AI 名词”，而是把你已有的工程能力迁移到 AI 产品生产中，最终能独立完成从业务识别、方案选型、Agent 编排、产品开发、部署运维到效果迭代的闭环。

1. 熟悉常见 Agent 架构、模型能力边界、模型调优方式，并能基于业务场景做 AI 应用选型。
2. 能独立交付 AI 产品，形态包括 Web 应用、浏览器插件、企业内部工具、API 服务、桌面客户端、自动化工作流等。
3. 理解各厂商 Agent 平台和开源框架的差异，知道什么时候用扣子、Dify、LangGraph、OpenAI Agents SDK、Vercel AI SDK、Mastra、CrewAI、n8n、云厂商平台，以及如何串联它们。
4. 深入理解 vibe coding，让 AI 生成结果更贴近意图，用更少 token 和更短迭代链路完成高质量功能。

## 总体路线

建议周期：12 周。

节奏建议：

- 每周 6 到 10 小时，优先保证每周都有一个可运行产物。
- 每个阶段都形成文档、代码、部署记录和复盘。
- 项目统一沉淀在 `study-ai` 仓库，按 `notes/`、`labs/`、`projects/`、`ops/`、`prompts/` 组织。

推荐目录：

```text
study-ai/
  docs/       # 学习路线、选型报告、方法论
  notes/      # 概念笔记
  labs/       # 小实验
  projects/   # 可交付产品
  ops/        # 部署、监控、评估、成本记录
  prompts/    # prompt、system message、评估样例
```

## 阶段 1：模型认知与 AI 应用基础

周期：第 1 到 2 周。

核心问题：

- LLM 不是传统函数，它的能力边界、随机性、上下文窗口、工具调用、推理成本分别意味着什么？
- Chat、RAG、Agent、Workflow、Fine-tuning、Prompt engineering 分别解决什么问题？
- 什么业务问题适合 AI，什么问题更适合传统规则、搜索、BI 或自动化脚本？

学习内容：

- Transformer、token、上下文窗口、temperature、top_p、结构化输出、function calling、tool calling。
- 主流模型分类：通用大模型、推理模型、多模态模型、Embedding 模型、重排序模型、语音模型、图像模型。
- 模型选择维度：质量、延迟、成本、上下文长度、工具调用稳定性、多模态能力、私有化要求、合规要求。
- 调优方式：
  - Prompt tuning：system message、few-shot、输出 schema、反例约束。
  - RAG tuning：切分、召回、重排、上下文压缩、引用、评估集。
  - Fine-tuning：适合格式、风格、分类、固定任务，不适合“注入大量知识”。
  - Preference/feedback loop：人工标注、A/B、日志回放。

实战任务：

- 写一个“业务场景 AI 化判断表”，至少分析 5 个你熟悉的前端/服务端业务场景。
- 完成一个最小 Chat API 服务：支持模型选择、流式输出、结构化 JSON 输出、错误重试、token 统计。
- 建一个 `prompts/prompt-patterns.md`，沉淀常用 prompt 模板。

验收标准：

- 能解释为什么某个需求该用 Chat、RAG、Agent、Workflow 或 Fine-tuning。
- 能估算一个 AI 功能的基本成本、延迟和失败模式。

## 阶段 2：Agent 架构与编排模式

周期：第 3 到 4 周。

核心问题：

- Agent 和 Workflow 的边界在哪里？
- 传统服务端如何串联 AI 能力？
- 什么时候应该让模型自主规划，什么时候应该用确定性流程控制？

常见架构：

- Single Agent：一个 Agent 通过工具完成任务，适合客服、问答、助手、轻量自动化。
- Planner-Executor：规划器拆任务，执行器调用工具，适合复杂任务和长链路任务。
- Router：根据意图、成本、权限或场景路由到不同模型、工具或 Agent。
- Multi-Agent：多个角色协作，适合代码审查、研究、生成、评估并行，但成本和不确定性更高。
- Workflow + Agent：用传统流程控制关键节点，只把不确定部分交给模型。
- Human-in-the-loop：审批、确认、回滚、敏感动作前置人工确认。
- Memory Agent：短期记忆、长期记忆、用户画像、任务状态、历史偏好。

服务端编排视角：

- 传统后端仍然是 AI 产品的“控制平面”：
  - 负责用户、权限、计费、审计、状态机、队列、数据访问、缓存、日志、评估、回滚。
  - 模型和 Agent 是能力节点，不应该替代所有业务控制逻辑。
- 推荐模式：
  - 前端负责交互、流式展示、中断、确认。
  - API 层负责鉴权、限流、任务创建。
  - Orchestrator 负责模型选择、工具调用、状态推进。
  - Worker/Queue 负责长任务、批处理、重试。
  - Eval/Observability 负责质量、成本、失败分析。

实战任务：

- 用代码实现一个 Agent Orchestrator：支持工具注册、步骤日志、人工确认、失败重试和结构化结果。
- 做一个简单的“个人知识库问答 Agent”：先 RAG，再工具调用，再生成回答。

验收标准：

- 能画出 Agent 执行链路图。
- 能指出哪些环节必须确定性控制，哪些环节可以交给模型。

## 阶段 3：工具、平台与厂商选型

周期：第 5 到 6 周。

核心问题：

- 哪些平台适合快速做产品，哪些适合工程化深度控制？
- 厂商 Agent 能不能串联？怎么串联？
- 国内外平台如何选？

平台和框架地图：

| 类型 | 工具/平台 | 适合场景 | 注意点 |
| --- | --- | --- | --- |
| 模型与 Agent SDK | OpenAI Agents SDK | 自定义 Agent、工具调用、handoff、生产级可控编排 | 适合代码型团队，需要自己负责产品和运维 |
| 前端 AI SDK | Vercel AI SDK | Web/Next.js AI 产品、流式 UI、聊天界面、工具调用 | 前端体验强，复杂后端流程仍需服务端承接 |
| 图式编排 | LangGraph | 状态机、多步骤 Agent、可恢复执行、多 Agent | 学习曲线更高，但适合复杂编排 |
| 应用开发平台 | Dify | 企业内部 AI 应用、RAG、Workflow、快速原型到部署 | 可视化强，复杂定制需理解其运行模型 |
| 国内 Agent 平台 | 扣子 Coze | 快速搭建 Bot、工作流、插件、国内生态接入 | 适合验证业务和渠道分发，深度工程化能力需评估 |
| TypeScript Agent 框架 | Mastra | TS/JS 工程栈 Agent、Workflow、RAG、工具调用 | 适合前后端一体工程师试水 |
| 多 Agent 框架 | CrewAI | 角色型多 Agent 协作、研究/内容/自动化流程 | 要控制成本和幻觉，避免过度多 Agent |
| 微软生态 | Microsoft Agent Framework / Semantic Kernel | 企业系统、M365/Azure、.NET/Python 生态 | 适合微软技术栈和企业集成 |
| 自动化编排 | n8n / Zapier / Make | 低代码工作流、SaaS 串联、通知自动化 | 适合外围自动化，不适合复杂核心业务 |
| 云平台 | AWS Bedrock、Azure AI Foundry、Google Vertex AI | 企业合规、模型托管、监控、权限、私有网络 | 云绑定较强，成本和权限体系要提前设计 |

厂商串联方式：

- API 串联：你的服务端统一封装 OpenAI、Claude、Gemini、DeepSeek、通义、豆包、智谱等模型。
- Workflow 串联：Dify/扣子/n8n 调用你的 API，你的 API 再调用模型或内部系统。
- Tool 串联：一个 Agent 把另一个平台发布的 HTTP 接口当作工具。
- Event 串联：消息队列、Webhook、定时任务触发不同 Agent。
- MCP 串联：把数据库、GitHub、文件系统、浏览器、内部服务封装成统一工具接口。

选型原则：

- 快速验证业务：优先扣子、Dify、n8n、Vercel AI SDK。
- 需要复杂状态和可恢复执行：优先 LangGraph。
- 需要产品级 Web 体验：优先 Vercel AI SDK + 自研后端。
- 需要完全控制 Agent 行为：优先 OpenAI Agents SDK、LangGraph、Mastra。
- 需要企业内部知识库：Dify、LangGraph + RAG、云厂商知识库服务都可评估。
- 需要跨系统自动化：n8n/Make/Zapier + 自研 API。

实战任务：

- 分别用一个代码框架和一个可视化平台实现同一个“需求分析助手”。
- 写一份 `docs/agent-platform-selection.md`，比较至少 5 个平台。
- 做一个“平台 A 调用你的服务端，你的服务端再调用模型和业务系统”的串联 demo。

验收标准：

- 能说明某个平台适合什么团队、什么阶段、什么产品形态。
- 能把 Agent 当作系统组件，而不是把所有逻辑都塞进 prompt。

## 阶段 4：AI 产品交付能力

周期：第 7 到 9 周。

核心问题：

- 一个 AI 产品从 demo 到可用，需要补齐哪些非模型能力？
- 如何部署、监控、评估和控制成本？

产品形态：

- Web Chat：知识库助手、运营助手、客服助手、代码助手。
- 浏览器插件：页面理解、表单填写、网页摘要、自动化操作。
- API 服务：文档分析、智能分类、内容生成、搜索增强。
- 企业内部工具：日报生成、需求评审、工单处理、会议纪要、数据分析。
- 桌面客户端：本地文件处理、个人知识库、跨应用助手。
- 自动化 Agent：定时巡检、数据同步、告警处理、报告生成。

工程能力清单：

- 后端：模型网关、Provider adapter、重试、超时、限流、熔断、流式响应、任务队列、工具权限、审计日志、文件解析、向量化、召回和重排。
- 前端：Chat UI、流式渲染、工具调用过程展示、引用来源、可编辑生成结果、人工确认、中断、重试、回滚、历史会话。
- 数据：Postgres、Redis、对象存储、向量数据库、pgvector、Qdrant、Milvus、Weaviate、Pinecone、Elastic/OpenSearch。
- 运维：Docker、Docker Compose、CI/CD、环境变量、密钥管理、Vercel、Cloudflare Workers、Fly.io、Render、Railway、AWS、Azure、GCP、阿里云、腾讯云、火山引擎。
- 质量：Golden dataset、离线评估、在线反馈、幻觉率、命中率、引用准确率、任务完成率、人工接管率、Prompt/模型/检索版本管理。

实战项目：

项目 A：个人知识库 Agent

- 支持 Markdown/PDF/网页导入。
- 支持向量检索、引用、追问。
- 支持本地部署和云端部署。
- 支持基础评估集。

项目 B：工程团队需求评审助手

- 输入 PRD 或 issue。
- 输出风险点、技术拆解、接口设计、测试建议。
- 支持生成任务清单。
- 支持人工编辑后保存。

项目 C：可执行自动化 Agent

- 能调用 GitHub、文件系统或某个业务 API。
- 每一步都有日志。
- 高风险动作需要确认。
- 支持失败恢复。

验收标准：

- 至少完成 1 个可公开演示产品和 1 个偏后端/自动化的 Agent 服务。
- 每个项目都有部署文档、成本估算、失败模式说明和评估样例。

## 阶段 5：Vibe Coding 深入实践

周期：第 10 到 11 周。

核心问题：

- 如何把模糊想法变成 AI 能高质量执行的任务？
- 如何减少 token 消耗？
- 如何让 AI 写出来的代码更像你想要的？

核心方法：

- 先让 AI 读代码再改代码，避免无上下文生成。
- 把需求拆成“目标、约束、验收标准、非目标、参考文件”。
- 使用小步迭代：先骨架，再行为，再样式，再测试，再优化。
- 对重要代码使用“计划 -> diff -> 验证 -> 复盘”循环。
- 为项目建立 `AGENTS.md`、代码风格、目录约定、测试命令、部署命令。
- 用可执行验收替代口头感觉：单测、截图、Playwright、接口测试、日志样例。
- 建立 prompt 资产：功能开发、Bug 修复、Code review、测试生成、重构、文档生成。

降低 token 消耗：

- 让 AI 只读相关文件，不一次性塞全仓库。
- 先用 `rg` 定位，再读目标文件。
- 用摘要文件记录架构和约定，避免反复解释。
- 给明确文件路径、函数名、错误日志、验收命令。
- 大任务拆小，不让上下文膨胀。
- 复用模板、脚手架和已有组件。
- 修改前要求 AI 说明影响面，避免无关重构。
- 对长文档先提取结构化摘要，再进入实现。

推荐工具和工作流：

- Codex / Cursor / Claude Code：适合代码库内协作和多文件修改。
- GitHub Copilot：适合 IDE 内补全和局部生成。
- v0 / Bolt / Lovable：适合快速 UI 原型，但要警惕长期可维护性。
- OpenAI API / Anthropic / Gemini / DeepSeek：适合自建产品能力。
- Playwright：验证前端真实行为。
- Storybook：固定 UI 组件行为。
- Linear/GitHub Issues：把自然语言需求沉淀成可追踪任务。
- Repo Prompt / aider 类工具：适合围绕代码上下文组织任务。

实战任务：

- 为 `study-ai` 写一份 `AGENTS.md`。
- 选一个旧项目功能，用 vibe coding 改造并记录初始需求、第一次 prompt、AI 误解点、调整后的 prompt、token/时间消耗和最终验收。
- 建立 `prompts/vibe-coding-playbook.md`。

验收标准：

- 能稳定把需求描述成 AI 可执行任务。
- 能通过上下文管理显著减少反复沟通和 token 浪费。
- 能识别 AI 生成代码中的架构偏差、过度抽象和隐性 bug。

## 阶段 6：综合毕业项目

周期：第 12 周。

目标：完成一个能代表你 AI 产品能力的作品。

推荐题目：

- AI 工程项目助手：读取需求、代码、Issue、PR，生成拆解、风险、测试建议。
- 私人学习 Agent：管理资料、总结、复习、问答、学习路径更新。
- 企业知识库 + 工单 Agent：结合 RAG、工具调用、人工确认、后台任务。
- 浏览器自动化研究助手：抓取页面、摘要、对比、生成报告。
- 面向团队的 vibe coding 管理台：沉淀 prompt、任务上下文、生成结果、评估记录。

必须包含：

- 一个真实可用的前端或客户端界面。
- 一个服务端编排层。
- 至少一个外部模型 Provider。
- 至少一个工具调用。
- 一套部署方案。
- 基础日志、成本记录和错误处理。
- 一份评估集。
- 一份复盘文档。

## 每周产出

| 周次 | 主题 | 产出 |
| --- | --- | --- |
| 1 | 模型基础 | 模型能力笔记、Chat API demo |
| 2 | Prompt/RAG/调优 | Prompt 模板、RAG 小实验 |
| 3 | Agent 架构 | Agent 架构图、工具调用 demo |
| 4 | 编排与状态 | Orchestrator demo、人类确认机制 |
| 5 | 平台选型 | 平台对比文档、扣子/Dify demo |
| 6 | 框架实践 | LangGraph 或 OpenAI Agents SDK demo |
| 7 | 产品前端 | Chat UI、引用、流式响应 |
| 8 | 后端服务 | 队列、状态、模型网关、日志 |
| 9 | 部署运维 | Docker、云部署、监控和成本记录 |
| 10 | Vibe Coding | AGENTS.md、prompt playbook |
| 11 | 质量与评估 | eval dataset、回归测试 |
| 12 | 毕业项目 | 可演示 AI 产品、复盘文档 |

## 推荐优先学习栈

基于你的前端和服务端背景，建议优先选这条路线：

```text
TypeScript / Next.js / Node.js
  -> Vercel AI SDK
  -> OpenAI Agents SDK 或 Mastra
  -> Postgres + pgvector / Qdrant
  -> Docker + 云部署
  -> LangGraph 作为复杂编排进阶
  -> Dify / 扣子作为快速验证和业务平台认知
```

如果你希望更偏企业后端和复杂编排：

```text
Python / FastAPI
  -> OpenAI Agents SDK
  -> LangGraph
  -> Celery / Redis / Postgres
  -> Qdrant / Milvus
  -> Docker / Kubernetes / 云厂商 AI 平台
```

## 当前推荐资料源

这些资料建议直接读官方文档，避免只看二手教程：

- OpenAI Agents SDK：https://openai.github.io/openai-agents-python/
- OpenAI Platform Docs：https://platform.openai.com/docs
- Vercel AI SDK：https://ai-sdk.dev/docs
- LangGraph：https://langchain-ai.github.io/langgraph/
- Dify：https://docs.dify.ai/
- Coze：https://www.coze.com/docs
- Mastra：https://mastra.ai/docs
- CrewAI：https://docs.crewai.com/
- Microsoft Agent Framework：https://learn.microsoft.com/semantic-kernel/frameworks/agent/
- n8n：https://docs.n8n.io/

## 需要继续校准的问题

后续可以根据你的回答把计划调整成更贴近你的路线：

1. 你更想优先做国内业务场景，还是国际化/独立产品场景？
2. 你现在主力技术栈是 React/Next.js、Vue/Nuxt、Node、Java、Go、Python 中的哪些？
3. 你希望毕业项目偏个人效率工具、企业内部系统、开发者工具，还是商业化 SaaS？
4. 你是否有 GPU、本地模型、私有化部署的需求？
5. 你希望 12 周后达到“会做 demo”，还是“能上线给真实用户使用”的标准？
