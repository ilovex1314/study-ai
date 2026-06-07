# Day 12 毕业项目设计

## Today Goal

围绕“Capstone：可演示 AI 产品闭环”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

毕业项目要证明你能交付产品，而不是只会调用模型。

## Core Concepts

### 毕业项目范围要小但完整

选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。 范围太大做不完，范围太小证明不了产品能力。 工程上要记住：宁可小而完整，不要大而散。

### 交付计划把学习成果变成产品

计划包含里程碑、接口、数据、风险、测试、部署和复盘。 没有交付计划，最终项目容易变成零散 demo。 工程上要记住：像真实项目一样管理 capstone。

### 部署方案证明产品能被使用

环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。 能本地跑不等于能给真实用户使用。 工程上要记住：部署是产品能力的一部分。

### 复盘让一次项目变成长期能力

记录目标、架构、取舍、失败、成本、eval 结果和下一步。 复盘把经验沉淀为下一次更快更稳的工作流。 工程上要记住：复盘不是总结情绪，而是更新方法。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> 项目范围 -> 上线方案 -> 复盘文档 -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- 毕业项目范围要小但完整：选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。
- 交付计划把学习成果变成产品：计划包含里程碑、接口、数据、风险、测试、部署和复盘。
- 部署方案证明产品能被使用：环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。
- 复盘让一次项目变成长期能力：记录目标、架构、取舍、失败、成本、eval 结果和下一步。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 Capstone：可演示 AI 产品闭环 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 Capstone：可演示 AI 产品闭环 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. 毕业项目范围要小但完整最主要解决什么问题？
   - A. 让页面更花哨
   - B. 选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。
   - C. 完全取消系统控制
   - Answer: B。选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。 工程上要落到边界、数据流和验收。
2. 交付计划把学习成果变成产品最主要解决什么问题？
   - A. 让页面更花哨
   - B. 计划包含里程碑、接口、数据、风险、测试、部署和复盘。
   - C. 完全取消系统控制
   - Answer: B。计划包含里程碑、接口、数据、风险、测试、部署和复盘。 工程上要落到边界、数据流和验收。
3. 部署方案证明产品能被使用最主要解决什么问题？
   - A. 让页面更花哨
   - B. 环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。
   - C. 完全取消系统控制
   - Answer: B。环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。 工程上要落到边界、数据流和验收。
4. 复盘让一次项目变成长期能力最主要解决什么问题？
   - A. 让页面更花哨
   - B. 记录目标、架构、取舍、失败、成本、eval 结果和下一步。
   - C. 完全取消系统控制
   - Answer: B。记录目标、架构、取舍、失败、成本、eval 结果和下一步。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
