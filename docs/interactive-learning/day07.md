# Day 07 复杂编排与可恢复执行

## Today Goal

围绕“LangGraph / durable workflow / human-in-the-loop”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

复杂任务的难点不是让模型多想，而是让流程可暂停、可恢复、可解释。

## Core Concepts

### Durable execution 让长任务可恢复

每步状态持久化，失败、重启或人工暂停后可以继续。 复杂 Agent 不可避免会失败；能恢复比一次成功更重要。 工程上要记住：把长任务当 workflow run 管理。

### Checkpoint 是恢复和审计基础

checkpoint 记录节点状态、输入输出、工具结果和下一步位置。 没有 checkpoint，human-in-the-loop 和失败恢复都只是口号。 工程上要记住：用 checkpoint 支持 resume，而不是复制整段聊天。

### Human interrupt 把人接入关键节点

当风险、权限或质量不确定时，流程暂停等待人确认或编辑。 人不是失败兜底，而是系统设计中的审批节点。 工程上要记住：把人工确认当状态转换。

### 状态图让复杂编排可解释

用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。 状态图把系统责任从模型脑内迁回工程结构。 工程上要记住：先画 graph，再写 agent prompt。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> 状态图 -> Checkpoint -> Interrupt/Resume -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- Durable execution 让长任务可恢复：每步状态持久化，失败、重启或人工暂停后可以继续。
- Checkpoint 是恢复和审计基础：checkpoint 记录节点状态、输入输出、工具结果和下一步位置。
- Human interrupt 把人接入关键节点：当风险、权限或质量不确定时，流程暂停等待人确认或编辑。
- 状态图让复杂编排可解释：用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 LangGraph / durable workflow / human-in-the-loop 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 LangGraph / durable workflow / human-in-the-loop 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. Durable execution 让长任务可恢复最主要解决什么问题？
   - A. 让页面更花哨
   - B. 每步状态持久化，失败、重启或人工暂停后可以继续。
   - C. 完全取消系统控制
   - Answer: B。每步状态持久化，失败、重启或人工暂停后可以继续。 工程上要落到边界、数据流和验收。
2. Checkpoint 是恢复和审计基础最主要解决什么问题？
   - A. 让页面更花哨
   - B. checkpoint 记录节点状态、输入输出、工具结果和下一步位置。
   - C. 完全取消系统控制
   - Answer: B。checkpoint 记录节点状态、输入输出、工具结果和下一步位置。 工程上要落到边界、数据流和验收。
3. Human interrupt 把人接入关键节点最主要解决什么问题？
   - A. 让页面更花哨
   - B. 当风险、权限或质量不确定时，流程暂停等待人确认或编辑。
   - C. 完全取消系统控制
   - Answer: B。当风险、权限或质量不确定时，流程暂停等待人确认或编辑。 工程上要落到边界、数据流和验收。
4. 状态图让复杂编排可解释最主要解决什么问题？
   - A. 让页面更花哨
   - B. 用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。
   - C. 完全取消系统控制
   - Answer: B。用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- LangGraph human-in-the-loop: https://docs.langchain.com/oss/python/langgraph/human-in-the-loop
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
