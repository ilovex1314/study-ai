# Day 10 AI 质量工程

## Today Goal

围绕“Eval、反馈、红队与回归测试”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

没有质量工程，prompt、模型和检索的每次修改都是盲飞。

## Core Concepts

### Eval dataset 是 AI 功能的测试资产

它包含输入、期望行为、评分标准、证据和失败类型。 没有 eval dataset，团队无法判断改动是优化还是退化。 工程上要记住：像维护单测一样维护 eval。

### 线上反馈把真实失败带回研发

采纳、编辑、差评、转人工和人工修正都应结构化记录。 离线样本永远不完整，真实用户会暴露未知边界。 工程上要记住：把用户行为变成质量信号。

### 红队样本保护高风险边界

用恶意、越权、注入、隐私和误导样本测试系统防线。 AI 产品的失败不仅是答错，还包括泄露、越权和执行危险动作。 工程上要记住：把红队用例纳入发布门禁。

### 回归测试防止 prompt 和模型退化

每次改 prompt、模型、检索配置，都要跑稳定样本。 AI 系统输出不完全确定，更需要统计和阈值管理。 工程上要记住：把 AI 改动纳入 CI/CD 质量门。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> Golden set -> 线上反馈 -> 回归门禁 -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- Eval dataset 是 AI 功能的测试资产：它包含输入、期望行为、评分标准、证据和失败类型。
- 线上反馈把真实失败带回研发：采纳、编辑、差评、转人工和人工修正都应结构化记录。
- 红队样本保护高风险边界：用恶意、越权、注入、隐私和误导样本测试系统防线。
- 回归测试防止 prompt 和模型退化：每次改 prompt、模型、检索配置，都要跑稳定样本。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 Eval、反馈、红队与回归测试 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 Eval、反馈、红队与回归测试 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. Eval dataset 是 AI 功能的测试资产最主要解决什么问题？
   - A. 让页面更花哨
   - B. 它包含输入、期望行为、评分标准、证据和失败类型。
   - C. 完全取消系统控制
   - Answer: B。它包含输入、期望行为、评分标准、证据和失败类型。 工程上要落到边界、数据流和验收。
2. 线上反馈把真实失败带回研发最主要解决什么问题？
   - A. 让页面更花哨
   - B. 采纳、编辑、差评、转人工和人工修正都应结构化记录。
   - C. 完全取消系统控制
   - Answer: B。采纳、编辑、差评、转人工和人工修正都应结构化记录。 工程上要落到边界、数据流和验收。
3. 红队样本保护高风险边界最主要解决什么问题？
   - A. 让页面更花哨
   - B. 用恶意、越权、注入、隐私和误导样本测试系统防线。
   - C. 完全取消系统控制
   - Answer: B。用恶意、越权、注入、隐私和误导样本测试系统防线。 工程上要落到边界、数据流和验收。
4. 回归测试防止 prompt 和模型退化最主要解决什么问题？
   - A. 让页面更花哨
   - B. 每次改 prompt、模型、检索配置，都要跑稳定样本。
   - C. 完全取消系统控制
   - Answer: B。每次改 prompt、模型、检索配置，都要跑稳定样本。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
