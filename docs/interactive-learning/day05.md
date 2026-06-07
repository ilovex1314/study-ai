# Day 05 平台选型

## Today Goal

围绕“平台、框架与供应商选型”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

选型不是追热门，而是匹配控制深度、交付速度、团队技术栈、合规和成本。

## Core Concepts

### 平台选型要匹配阶段和控制深度

快速验证、产品化控制、复杂编排和企业合规对应不同工具。 选错平台会让团队在原型速度、定制能力、成本和锁定之间反复返工。 工程上要记住：先列约束，再选平台；不要先选喜欢的框架。

### 供应商锁定要提前设计出口

锁定来自 API、数据格式、工作流配置、评估数据和运维体系。 AI 能力变化很快，系统要能替换模型或平台而不重写产品。 工程上要记住：用 adapter 和契约保护业务代码。

### 框架适配看团队和任务形态

Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。 把不同层级的工具当同类比较，会导致架构错位。 工程上要记住：按“UI、编排、工具、状态、运维”分层比较。

### 串联方式决定系统边界

API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。 平台能快，但核心权限、数据和审计通常要留在自研服务。 工程上要记住：让平台调用你的受控 API，而不是把核心逻辑写死在平台里。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> 选型矩阵 -> 供应商串联 -> 迁移与锁定 -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- 平台选型要匹配阶段和控制深度：快速验证、产品化控制、复杂编排和企业合规对应不同工具。
- 供应商锁定要提前设计出口：锁定来自 API、数据格式、工作流配置、评估数据和运维体系。
- 框架适配看团队和任务形态：Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。
- 串联方式决定系统边界：API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 平台、框架与供应商选型 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 平台、框架与供应商选型 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. 平台选型要匹配阶段和控制深度最主要解决什么问题？
   - A. 让页面更花哨
   - B. 快速验证、产品化控制、复杂编排和企业合规对应不同工具。
   - C. 完全取消系统控制
   - Answer: B。快速验证、产品化控制、复杂编排和企业合规对应不同工具。 工程上要落到边界、数据流和验收。
2. 供应商锁定要提前设计出口最主要解决什么问题？
   - A. 让页面更花哨
   - B. 锁定来自 API、数据格式、工作流配置、评估数据和运维体系。
   - C. 完全取消系统控制
   - Answer: B。锁定来自 API、数据格式、工作流配置、评估数据和运维体系。 工程上要落到边界、数据流和验收。
3. 框架适配看团队和任务形态最主要解决什么问题？
   - A. 让页面更花哨
   - B. Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。
   - C. 完全取消系统控制
   - Answer: B。Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。 工程上要落到边界、数据流和验收。
4. 串联方式决定系统边界最主要解决什么问题？
   - A. 让页面更花哨
   - B. API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。
   - C. 完全取消系统控制
   - Answer: B。API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- Dify docs: https://docs.dify.ai/
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
