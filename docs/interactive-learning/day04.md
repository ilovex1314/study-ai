# Day 04 产品化交付

## Today Goal

把前 3 天的模型、RAG、Agent 能力接成可交付产品架构，明确前端、后端、网关、观测和评估各自负责什么。

Estimated time: 60 minutes.

## Why This Matters

用户体验到的是等待、失败、引用、可编辑结果、权限和恢复路径。上线后的质量提升依赖日志、trace、eval、反馈和成本数据。

## Core Concepts

### AI 产品不是模型调用，是交付闭环

真实产品需要 UX、模型网关、检索、工具、评估、监控、成本、权限和失败处理。 用户体验到的是延迟、失败、引用、可编辑结果和恢复路径，不是模型参数。 工程上要记住：从请求到反馈画完整链路，再决定日志、指标和人工确认。

### 模型网关统一 provider、成本和 fallback

模型网关集中处理 provider adapter、重试、超时、路由、token 统计和审计。 如果每个功能直接调模型，后续切模型、降成本、排查失败都会很痛。 工程上要记住：把模型调用做成内部平台能力，而不是散落在业务代码里的 fetch。

### Streaming UX 要展示过程和控制权

流式体验不只是逐字输出，还包括工具状态、引用、取消、重试、编辑和确认。 AI 输出慢且不确定，用户需要知道系统在做什么、能否中断、结果是否可信。 工程上要记住：Vercel AI SDK 适合 TypeScript 流式 UI，但复杂编排仍要后端控制状态和工具执行。

### 可观测与评估决定能否迭代

日志、trace、eval、成本、延迟、失败模式和用户反馈让 AI 功能可度量。 没有观测和评估，团队只能靠感觉判断模型、prompt 或检索是否变好。 工程上要记住：每次 AI run 都应有 runId、prompt version、model、retrieval config、tool events、score 和反馈。

## Underlying Architecture

```text
Frontend UX -> API/Auth -> Model Gateway -> Orchestrator -> Tools/RAG -> Eval/Observability -> Feedback loop。
每次 AI run 都应有 runId、prompt version、model、token、latency、tool events、score 和 user feedback。
```

## Data And Logic Flow

1. 请求流：用户输入 -> 鉴权 -> 模型路由 -> 编排 -> 流式响应 -> 保存结果。
2. 质量流：线上反馈 -> 样本归档 -> 离线 eval -> prompt/model/retrieval 版本更新。
3. 成本流：run log -> token/latency 聚合 -> 路由和缓存策略调整。

## Key Technical Points

- 模型网关统一 provider、超时、重试、fallback、token 统计和审计。
- Streaming UX 要展示进度、工具状态、引用、取消、重试和编辑。
- 没有 eval 和 trace，团队只能靠感觉判断版本是否变好。
- 部署要考虑密钥、限流、数据保留、灰度和回滚。

## Upstream Dependencies And Downstream Applications

上游依赖用户旅程、权限、provider、RAG/工具、数据存储和部署环境。下游影响运营效率、用户信任、成本曲线和迭代速度。

## Production Example

需求评审助手流式展示分析过程，保存 run 日志，统计成本，允许编辑输出，并把用户采纳结果回流 eval。

## Counterexample

前端直接调用模型 API、只展示 loading、没有日志和失败态。demo 看起来快，上线后无法排错、无法控费、无法迭代。

## Hands-On Practice

为一个 AI 需求评审助手写交付 checklist：UX 状态、后端接口、模型网关、日志字段、eval 样本、部署和回滚。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

选一个已做 demo，列出让它进入真实用户环境还缺的 20 个非模型能力。

## Quiz

1. AI demo 到产品最常缺什么？
   - A. 只缺一个更大的 logo
   - B. 缺少交付闭环和非模型工程能力
   - C. 只缺更高 temperature
   - Answer: B。缺少 UX 状态、网关、评估、观测、成本和失败处理闭环。
2. 模型网关的核心价值是什么？
   - A. 让前端颜色统一
   - B. 集中控制模型调用和成本质量策略
   - C. 替代所有业务数据库
   - Answer: B。统一 provider、路由、重试、fallback、成本和审计。
3. 好的 Streaming UX 除了逐字输出还要什么？
   - A. 隐藏所有过程
   - B. 展示过程和用户控制权
   - C. 只显示一个转圈 loading
   - Answer: B。工具状态、引用、取消、重试、编辑和确认。
4. 为什么 AI 产品必须记录 trace 和 eval？
   - A. 为了让日志文件更大
   - B. 为了可排错、可回归、可优化
   - C. 为了替代用户反馈
   - Answer: B。为了定位失败、回归版本、度量质量和控制成本。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- Vercel AI SDK: https://vercel.com/ai-sdk
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
