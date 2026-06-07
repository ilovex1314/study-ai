# Day 03 Agent 编排

## Today Goal

理解 Agent 为什么不是“聊天框加工具”，并能设计一个可审计、可恢复、可暂停确认的执行链路。

Estimated time: 60 minutes.

## Why This Matters

Agent 的价值是围绕目标选择步骤和工具；风险也来自自主性。生产系统需要把自主部分限制在可观测、可恢复、可授权的边界内。

## Core Concepts

### Agent 是围绕目标选择步骤的执行体

Agent 根据目标、上下文和工具反馈决定下一步行动。 它能处理不完全确定的任务，但必须被系统边界约束。 工程上要记住：把 Agent 当成执行循环，不要当成“更聪明的聊天”。

### Workflow 用确定性流程包住模型节点

流程明确、风险高、审计强时，应优先用 workflow 控制。 不是所有自动化都需要 Agent；确定性流程更便宜、更稳、更可审计。 工程上要记住：先画状态机，再决定哪些节点引入模型。

### 状态、上下文和长期记忆要分层

Agent run state、短期上下文、长期偏好和知识库不是一回事。 混在一起会造成不可恢复、不可解释和隐私风险。 工程上要记住：为 Agent 设计 state schema，而不是把所有内容塞进 messages。

### Guardrails 是输入、工具和输出的分层防护

Guardrails 不只过滤脏话，还包括权限、副作用、合规和人工确认。 Agent 能调用工具后，安全问题就从文本质量变成系统风险。 工程上要记住：高风险工具执行前必须系统检查，不要只靠模型自觉。

## Underlying Architecture

```text
User goal -> Planner/LLM -> tool selection -> policy check -> tool execution -> observation -> state update -> next step/finish。
Human confirmation 和 guardrails 插在高风险工具、输出返回和 handoff 前。
```

## Data And Logic Flow

1. 执行流：goal -> plan -> act -> observe -> reflect -> continue/stop。
2. 状态流：runId -> step log -> tool result -> checkpoint -> resume。
3. 安全流：input guardrail -> tool permission -> human approval -> output guardrail。

## Key Technical Points

- Agent 适合目标清晰但步骤不完全确定的任务。
- Workflow 适合流程明确、风险高、审计要求强的任务。
- 工具 schema 要小而明确，权限和副作用由系统执行前检查。
- trace 记录 LLM generation、tool call、handoff、guardrail 和自定义事件。

## Upstream Dependencies And Downstream Applications

上游依赖工具 API、权限系统、任务状态、用户意图和可回滚设计。下游影响自动化助手、代码代理、运营流程、数据分析和客服处理。

## Production Example

PRD 评审 Agent 读取文档、检索历史 issue、生成风险清单；创建任务前暂停给人确认，确认后才调用项目管理 API。

## Counterexample

给模型一个 GitHub token，让它“自主修复线上问题”，没有 diff 审核、测试、权限和回滚，这不是 Agent，是事故入口。

## Hands-On Practice

设计并实现一个伪代码级 Orchestrator：工具注册、step log、权限检查、人工确认、失败重试、最终结构化结果。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

把同一任务分别画成 deterministic workflow 和 agent loop，比较哪一步需要模型自主决策。

## Quiz

1. Agent 相比普通 Chat 的关键差异是什么？
   - A. 只会输出更长文本
   - B. 能基于目标、工具反馈和状态选择下一步
   - C. 完全不需要系统控制
   - Answer: B。Agent 围绕目标选择步骤和工具，并维护执行状态。
2. 什么时候优先 workflow 而不是 Agent？
   - A. 流程明确且风险高
   - B. 任务完全开放且无法预定义步骤
   - C. 只想换按钮颜色
   - Answer: A。流程明确、风险高、审计强时。
3. 为什么 Agent run state 要持久化？
   - A. 为了让 UI 更圆润
   - B. 为了恢复、审计和复盘
   - C. 为了减少所有数据库
   - Answer: B。为了恢复、审计、复盘和 human-in-the-loop resume。
4. 工具调用前最关键的系统职责是什么？
   - A. 相信模型不会乱调
   - B. 鉴权、校验、副作用控制和确认
   - C. 把工具名写得更长
   - Answer: B。鉴权、参数校验、副作用评估和必要的人工确认。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK guardrails: https://openai.github.io/openai-agents-python/guardrails/
- LangGraph human-in-the-loop: https://docs.langchain.com/oss/python/langgraph/human-in-the-loop
