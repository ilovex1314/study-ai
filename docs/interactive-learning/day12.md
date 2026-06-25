# Day 12 Capstone：可演示 AI 产品闭环

<!-- architecture
{"title":"可演示项目交付结构","summary":"用范围、用户流、实现切片、验证和部署计划组成可验收的毕业项目。","type":"layered","nodes":[{"label":"问题与用户","tone":"accent"},{"label":"项目范围"},{"label":"核心任务流"},{"label":"实现切片","tone":"system"},{"label":"验证证据","tone":"warning"},{"label":"部署计划"}]}
-->

## Today Goal

把前 11 天能力合成为一个可演示 AI 产品设计：前端体验、编排层、工具、数据、部署、日志、eval 和复盘都要有清晰边界。完成后，你应该能交付一份足够研发实现和产品验收的 capstone 设计包。

Estimated time: 60 minutes.

## Why This Matters

学习 AI 工程的最终证据不是知道多少概念，而是能把一个真实业务问题变成可运行、可评估、可迭代的产品闭环。Capstone 不是大而全项目，而是小而完整的交付证据。

## Core Concepts

### 毕业项目范围要小但完整

范围要覆盖用户任务、AI 编排、工具或检索、结果呈现、日志、eval 和失败处理。它解决的是“demo 无法证明生产能力”的问题。边界是：不要在 capstone 中追求完整平台。常见误区是做一个巨大系统，最后只有聊天框能跑。

### 交付计划把学习成果变成工程项目

交付计划包含里程碑、接口、数据契约、风险、测试、部署和复盘。它解决的是“学习成果无法转成团队协作”的问题。边界是：计划必须有验收，不是愿望清单。常见误区是只写功能列表，不写质量和退出条件。

### 部署方案证明产品能被使用

部署方案明确环境变量、密钥、数据库、队列、日志、限流、灰度和回滚。它解决的是“本地能跑不等于可交付”的问题。边界是：P0 可以本地优先，但仍要声明未来扩展接口。常见误区是把密钥写进前端或忽略失败恢复。

### 复盘让一次项目变成长期能力

复盘记录目标、架构、取舍、失败、成本、eval 结果和下一步。它解决的是经验不能沉淀的问题。边界是：复盘要更新方法，不是情绪总结。常见误区是只展示成功截图，不记录失败和 tradeoff。

## Underlying Architecture

```text
业务任务 -> 产品范围 -> 交互界面 -> 编排/API -> RAG/工具 -> Eval/Trace -> 发布/复盘
             |             |             |             |          |
             v             v             v             v          v
          non-goals     UX states     contracts    evidence   capability record
```

Diagram recommendation: use a project delivery loop. The relationship should show how product scope, implementation contracts and evaluation evidence reinforce each other.

## Data And Logic Flow

1. 发现流：用户痛点 -> 可测任务 -> 非目标 -> 成功指标。
2. 设计流：架构图 -> 数据契约 -> API/tool schema -> UX 状态 -> 风险控制。
3. 实现流：最小功能 -> trace/log -> eval 样本 -> 修复迭代 -> 发布说明。
4. 复盘流：真实输出 -> 质量/成本/延迟 -> 失败样本 -> 下一轮路线图。

## Key Technical Points

- Capstone 候选题要能在 1-2 周内完成，例如内部知识助手、PRD 评审 Agent、会议行动项提取或客服 RAG。
- 每个接口都要说明输入、输出、错误、权限、日志字段和验收样本。
- 设计包要包含 demo path 和 fallback path：AI 不可用、检索失败、工具超时、证据不足时怎么办。
- Eval 不只验收答案，也验收引用、拒答、安全边界、延迟和成本。
- 复盘要产出能力证据，连接 PRD 中的“理解-练习-可独立交付”。

## Upstream Dependencies And Downstream Applications

上游依赖 Day01-Day11 的模型边界、RAG、Agent、产品交付、平台选型、可恢复执行、质量工程和 AI 协作方法。下游连接 Day14-Day20 的生产系统能力：治理、安全、成本、SRE、发布和产品飞轮。

## Production Example

“PRD 评审 Agent”作为 capstone：用户上传需求文档，系统抽取目标和风险，检索历史规范，生成评审清单；创建任务前要求人工确认；每次运行保存 trace、引用、rubric 分数和用户采纳状态。

## Counterexample

做一个“万能 AI 助手”，只有输入框和回答区，没有明确用户任务、数据契约、引用、日志、eval、失败态和部署策略。它很容易演示，却不能证明可交付能力。

## Hands-On Practice

写一份 capstone 设计包：

- 项目目标、用户、非目标和成功指标。
- 系统架构、数据契约、API/tool schema。
- UX 状态：输入、运行中、引用、失败、确认、导出。
- Eval 计划：golden set、rubric、红队样本。
- 部署和复盘：环境变量、日志、成本、回滚、下一步。

Deliverable: save the design package under `projects/` or `docs/`, and include a verification paragraph naming the exact tests, review checklist or demo script.

## Exploration Prompt

从 PRD 的项目模板中选一个：内部知识助手、PRD 评审 Agent、会议行动项或客服 RAG。用“范围小但完整”的原则删掉一半功能，并说明删掉后仍然能证明哪些能力。

## Quiz

1. 好的 capstone 首先证明什么？
   - A. 它包含最多功能
   - B. 它能把真实任务做成可运行、可评估、可复盘的闭环
   - C. 它完全不需要架构
   - Answer: B。Capstone 的价值是可复核的产品交付证据。
2. 为什么交付计划必须包含非目标？
   - A. 为了降低标题长度
   - B. 为了控制范围并保护核心验收
   - C. 为了取消用户研究
   - Answer: B。非目标帮助项目小而完整，避免无止境扩张。
3. P0 本地优先是否意味着不用考虑部署方案？
   - A. 是，本地能跑就够了
   - B. 不是，仍要声明环境、日志、失败处理和未来扩展边界
   - C. 是，部署与产品无关
   - Answer: B。P0 不做生产后端，但交付能力仍要能被验证。
4. 复盘最应该沉淀什么？
   - A. 成功截图
   - B. 目标、取舍、失败、成本、eval 结果和下一步方法
   - C. 没有结论的聊天记录
   - Answer: B。复盘把一次项目转成长期能力资产。

## Review And Reinforcement

- Re-draw the capstone delivery loop and mark each evidence artifact.
- Replace one vague feature idea with a scoped capstone statement.
- Write the first five eval samples for your capstone before writing implementation code.

## References

- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Evals: https://platform.openai.com/docs/guides/evals
- Vercel AI SDK: https://ai-sdk.dev/docs/introduction
