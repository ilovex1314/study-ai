# Day 06 TypeScript AI 应用栈

## Today Goal

围绕“Vercel AI SDK、Next.js 与前后端协作”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

前后端工程师最容易从 TypeScript AI 栈切入，但要避免把复杂编排都塞进前端。

## Core Concepts

### TypeScript AI 栈适合快速产品化

Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。 前后端背景可以复用熟悉工程能力，但要尊重服务端边界。 工程上要记住：用 TS 栈做体验，用服务端控制风险。

### Provider adapter 隔离模型差异

不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。 adapter 让业务功能不被单一模型 API 绑死。 工程上要记住：先定义内部模型接口，再接外部 provider。

### Chat UI 是状态机

AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。 只做一个 loading 会让用户无法理解进度、证据和失败。 工程上要记住：把 UI 状态显式建模，不靠布尔变量堆叠。

### 服务端边界保护密钥、权限和状态

模型调用、工具执行、审计、限流、队列和成本统计应在服务端。 AI 前端体验再强，也不能绕过后端控制面。 工程上要记住：前端负责体验，后端负责控制。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> 前端状态 -> API 边界 -> Provider adapter -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- TypeScript AI 栈适合快速产品化：Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。
- Provider adapter 隔离模型差异：不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。
- Chat UI 是状态机：AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。
- 服务端边界保护密钥、权限和状态：模型调用、工具执行、审计、限流、队列和成本统计应在服务端。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 Vercel AI SDK、Next.js 与前后端协作 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 Vercel AI SDK、Next.js 与前后端协作 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. TypeScript AI 栈适合快速产品化最主要解决什么问题？
   - A. 让页面更花哨
   - B. Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。
   - C. 完全取消系统控制
   - Answer: B。Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。 工程上要落到边界、数据流和验收。
2. Provider adapter 隔离模型差异最主要解决什么问题？
   - A. 让页面更花哨
   - B. 不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。
   - C. 完全取消系统控制
   - Answer: B。不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。 工程上要落到边界、数据流和验收。
3. Chat UI 是状态机最主要解决什么问题？
   - A. 让页面更花哨
   - B. AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。
   - C. 完全取消系统控制
   - Answer: B。AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。 工程上要落到边界、数据流和验收。
4. 服务端边界保护密钥、权限和状态最主要解决什么问题？
   - A. 让页面更花哨
   - B. 模型调用、工具执行、审计、限流、队列和成本统计应在服务端。
   - C. 完全取消系统控制
   - Answer: B。模型调用、工具执行、审计、限流、队列和成本统计应在服务端。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- Vercel AI SDK: https://vercel.com/ai-sdk
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
