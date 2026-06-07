# Day 11 Vibe Coding 工程化

## Today Goal

围绕“上下文工程、任务拆解与 AI 协作”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

vibe coding 的本质不是让 AI 随便写，而是用上下文、约束和验证提高协作质量。

## Core Concepts

### 上下文工程决定 AI 协作质量

给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。 上下文太少会误解，太多会噪声和 token 浪费。 工程上要记住：像组织代码依赖一样组织上下文。

### 任务拆解降低返工和幻觉

把大目标拆成可验证的小步骤：读现状、改一处、验证一处。 AI 适合处理明确边界的小任务，复杂目标要分阶段收敛。 工程上要记住：先做最小闭环，再扩展。

### Prompt 资产要版本化和复用

常用开发、审查、测试、复盘 prompt 应沉淀到仓库。 可复用模板能减少沟通成本，也让团队对 AI 输出有共同标准。 工程上要记住：把 prompt 当工程资产维护。

### 验证闭环替代“感觉能用”

AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。 没有验证，vibe coding 只是更快地产生未知风险。 工程上要记住：让 AI 输出跟随证据迭代。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> 任务规格 -> 上下文包 -> 验证闭环 -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- 上下文工程决定 AI 协作质量：给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。
- 任务拆解降低返工和幻觉：把大目标拆成可验证的小步骤：读现状、改一处、验证一处。
- Prompt 资产要版本化和复用：常用开发、审查、测试、复盘 prompt 应沉淀到仓库。
- 验证闭环替代“感觉能用”：AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 上下文工程、任务拆解与 AI 协作 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 上下文工程、任务拆解与 AI 协作 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. 上下文工程决定 AI 协作质量最主要解决什么问题？
   - A. 让页面更花哨
   - B. 给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。
   - C. 完全取消系统控制
   - Answer: B。给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。 工程上要落到边界、数据流和验收。
2. 任务拆解降低返工和幻觉最主要解决什么问题？
   - A. 让页面更花哨
   - B. 把大目标拆成可验证的小步骤：读现状、改一处、验证一处。
   - C. 完全取消系统控制
   - Answer: B。把大目标拆成可验证的小步骤：读现状、改一处、验证一处。 工程上要落到边界、数据流和验收。
3. Prompt 资产要版本化和复用最主要解决什么问题？
   - A. 让页面更花哨
   - B. 常用开发、审查、测试、复盘 prompt 应沉淀到仓库。
   - C. 完全取消系统控制
   - Answer: B。常用开发、审查、测试、复盘 prompt 应沉淀到仓库。 工程上要落到边界、数据流和验收。
4. 验证闭环替代“感觉能用”最主要解决什么问题？
   - A. 让页面更花哨
   - B. AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。
   - C. 完全取消系统控制
   - Answer: B。AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- Vercel AI SDK: https://vercel.com/ai-sdk
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
