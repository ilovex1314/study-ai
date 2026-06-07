# Day 01 模型认知

## Today Goal

把“模型会回答”拆成可工程化的能力边界。完成后，你应该能判断一个需求适合 Chat、RAG、Agent、Workflow 还是 Fine-tuning，并说清楚成本、延迟和失败模式。

Estimated time: 60 minutes.

## Why This Matters

很多 AI 项目失败不是模型太弱，而是团队把模型当成确定性函数。真实产品要让模型处理语义理解和生成，让系统控制状态、权限、金额、审计、重试和回滚。

## Core Concepts

### LLM 不是函数，是概率决策器

同样输入不必然得到同样输出，模型根据上下文预测 token 分布再采样生成。 如果把模型当后端函数，就会把权限、金额和状态变更交给不稳定文本。 工程上要记住：把 LLM 当语义判断和生成组件，把状态机、权限、审计、重试、人工确认留给后端。

### Token 是成本、延迟和注意力预算

输入越长、输出越长，通常成本越高、延迟越大，噪声也越多。 真实项目要先检索、筛选和压缩，再把最相关上下文交给模型。 工程上要记住：先用搜索定位资料，再读取必要片段；不要把整仓库或整份文档塞进上下文。

### 上下文不是长期记忆

上下文只代表本轮请求可见的信息，项目约定和历史结论要显式持久化。 该保存的信息丢了、不该进上下文的噪声进来了，模型再强也会不稳定。 工程上要记住：设计 memory schema：什么进本轮上下文，什么存长期，什么由工具实时查。

### Temperature 控制发散，不控制事实正确

temperature 影响采样随机性，不替代检索、校验和评估。 低温能减少随机性，但事实错误和工具参数错误仍要靠系统侧控制。 工程上要记住：把 temperature 当采样参数，不要当可靠性开关。

## Underlying Architecture

```text
用户输入 -> 意图识别 -> 上下文预算 -> 模型生成草稿 -> schema 校验 -> 业务系统决策 -> 输出/人工确认
高风险动作要走确定性状态机；模型只能提出建议或生成解释。
```

## Data And Logic Flow

1. 场景判断流：业务目标 -> 风险等级 -> 数据来源 -> AI 形态 -> 验收指标。
2. 上下文流：当前输入 -> 历史摘要 -> 检索片段 -> 工具结果 -> prompt pack。
3. 可靠性流：模型输出 -> JSON parse -> schema validate -> confidence/rule check -> fallback。

## Key Technical Points

- temperature 控制采样发散，不保证事实正确。
- token 同时是成本、延迟和注意力预算。
- 上下文窗口不是长期记忆，重要事实要持久化并可检索。
- Fine-tuning 主要改善格式、风格和稳定分类，不适合注入大量动态知识。

## Upstream Dependencies And Downstream Applications

上游依赖业务场景、可用数据、风险等级、模型能力、成本预算和用户体验要求。下游影响模型网关、RAG、Agent 编排、评估集和产品验收方式。

## Production Example

退款助手中，模型识别用户诉求并生成解释；退款资格、金额、风控和状态变更由后端规则与审计系统控制。

## Counterexample

让模型直接决定“是否退款 300 元”并调用支付接口，即使 prompt 写得很严，也会把风险控制交给概率输出。

## Hands-On Practice

为 5 个你熟悉的前后端业务场景写一张 AI 化判断表：场景、推荐形态、需要的数据、不可交给模型的控制点、验收指标。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

比较同一问题在低温和高温下的输出差异，并记录哪些差异来自采样，哪些来自上下文缺失。

## Quiz

1. 为什么不能把 LLM 当普通后端函数？
   - A. 因为 LLM 无法输出中文
   - B. 因为 LLM 基于概率生成，关键控制要系统兜底
   - C. 因为 LLM 只能做图片任务
   - Answer: B。因为它基于概率生成，业务状态、权限和审计需要确定性系统控制。
2. token 预算主要影响什么？
   - A. 成本、延迟和注意力质量
   - B. 只影响 UI 样式
   - C. 只影响数据库大小
   - Answer: A。token 同时影响成本、延迟和上下文噪声。
3. 为什么上下文不等于长期记忆？
   - A. 因为上下文只能存图片
   - B. 因为上下文是本轮输入范围，不能替代持久化记忆
   - C. 因为上下文不会消耗 token
   - Answer: B。上下文是本轮可见信息，长期事实要持久化并按需检索。
4. temperature=0 能保证事实正确吗？
   - A. 能，所有答案都会正确
   - B. 不能，它不是事实校验机制
   - C. 能，它会自动调用数据库
   - Answer: B。不能，它只降低采样发散，事实正确要靠证据、工具和校验。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- Vercel AI SDK: https://vercel.com/ai-sdk
