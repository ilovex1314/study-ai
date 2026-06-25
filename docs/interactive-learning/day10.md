# Day 10 AI 质量工程

<!-- architecture
{"title":"质量反馈闭环","summary":"离线基准、红队、线上反馈和回归测试共同决定是否允许发布。","type":"feedback","nodes":[{"id":"n1","label":"Golden Set","tone":"system","group":"g1"},{"id":"n2","label":"离线评估","group":"g1"},{"id":"n3","label":"红队测试","tone":"warning","group":"g1"},{"id":"n4","label":"上线门禁","tone":"accent","group":"g1"},{"id":"n5","label":"线上反馈","group":"g1"},{"id":"n6","label":"回归集更新","tone":"system","group":"g2"}],"feedback":"线上失败样本回流到评估集和门禁规则。","renderMode":"diagram","edges":[{"from":"n1","to":"n2","relation":"primary"},{"from":"n2","to":"n3","relation":"primary"},{"from":"n3","to":"n4","relation":"primary"},{"from":"n4","to":"n5","relation":"primary"},{"from":"n5","to":"n6","relation":"primary"},{"from":"n6","to":"n1","relation":"feedback","label":"回流"}],"groups":[{"id":"g1","label":"主流程","kind":"lane"},{"id":"g2","label":"评估与反馈","kind":"lane"}]}
-->

## Today Goal

建立一套 AI 功能质量工程基线：把 golden dataset、评分 rubric、线上反馈、红队样本和回归门禁串成可执行流程。完成后，你应该能判断一次 prompt、模型、检索或工具配置改动是否真的变好。

Estimated time: 60 minutes.

## Why This Matters

传统软件可以靠确定性单测覆盖大量逻辑；AI 产品的输出会受模型版本、上下文、检索结果、工具状态和用户表达影响。没有 eval、trace 和反馈闭环，每一次优化都可能只是主观感觉，甚至让边界场景退化。

## Core Concepts

### Eval dataset 是 AI 功能的测试资产

Eval dataset 不只是“几条示例问题”，而是一组输入、期望行为、评分标准、证据、失败类型和风险标签。它解决的是“怎么知道改动变好还是变坏”。边界是：eval 不能替代业务决策，也不能覆盖所有真实用户表达。常见误区是只保存最终答案，不保存期望证据和失败原因。

### Rubric 把主观质量变成可复核判断

Rubric 定义什么叫正确、部分正确、危险、不可接受，以及每类结果的分值或等级。它解决的是“不同评审者如何一致判断”。边界是：rubric 需要持续校准，不能把模型评分当最终事实。常见误区是让模型自评自己生成的答案。

### 线上反馈把真实失败带回研发

采纳、编辑、差评、转人工、撤回和人工修正都应结构化记录。它解决的是离线样本永远不完整的问题。边界是：反馈信号有噪声，需要去重、分层和抽检。常见误区是只看点赞率，不分析用户改了什么。

### 红队与回归样本保护高风险边界

红队样本覆盖 prompt injection、越权、隐私泄露、错误工具调用和误导性请求；回归样本保证核心能力不因版本迭代退化。它们解决的是“上线门禁”和“风险不回潮”。边界是：红队不是一次性活动，要进入发布流程。常见误区是只测正常问题，不测攻击和异常输入。

## Underlying Architecture

```text
需求变更 -> 样本选择 -> 离线 eval -> 人工抽检 -> 红队回归 -> 发布门禁 -> 线上反馈 -> 样本库更新
                 |              |             |              |             |
                 v              v             v              v             v
              golden set      rubric       risk set      release log    failure backlog
```

Diagram recommendation: use a feedback loop diagram. The key relationship is not a linear test run; it is a quality loop where production failures become future eval assets.

## Data And Logic Flow

1. 样本流：线上问题、人工标注、历史事故、红队攻击 -> 去重与分层 -> golden set / risk set。
2. 评估流：候选版本 -> 固定样本运行 -> rubric scoring -> 人工抽检 -> 差异报告。
3. 发布流：质量、成本、延迟、风险阈值 -> go/no-go -> 灰度 -> 线上反馈回收。
4. 修复流：失败样本 -> 归因到 prompt、retrieval、model、tool 或 policy -> 修复后加入回归集。

## Key Technical Points

- 每条 eval 样本至少包含 input、expected behavior、evidence、rubric、risk tag、owner 和 last reviewed time。
- 评分要分层：事实正确性、证据覆盖、指令遵循、安全边界、格式有效性和用户可用性。
- 回归阈值必须同时看质量、成本和延迟；高分但成本翻倍也可能不能发布。
- 红队样本应与 guardrails、权限检查和工具策略一起验证，而不是只看模型文本。
- 每次发布记录 prompt version、model、retrieval config、tool schema 和 evaluator version，便于回滚。

## Upstream Dependencies And Downstream Applications

上游依赖 Day01 的模型边界、Day02 的 grounding、Day03 的 guardrails、Day04 的 observability 和 Day09 的检索评估。下游影响 Day12 的 capstone 验收、Day18 的事故响应和 Day19 的发布治理。

## Production Example

内部政策助手升级 rerank 策略前，团队先在 80 条 golden questions 上比较证据命中、答案正确率、拒答准确率、p95 延迟和单位成本；再跑 30 条 prompt injection 与越权访问红队样本；只有全部不退化才灰度到 10% 用户。

## Counterexample

只挑 3 个成功 demo 问题手动试一遍，就把新 prompt 发布到全量用户。上线后发现旧政策被召回、敏感部门文档泄露、客服转人工率上升，但因为没有版本记录和失败样本，无法定位是哪次改动导致。

## Hands-On Practice

为“内部知识库问答助手”设计一个 eval 资产包：

- 20 条 golden questions，标注期望证据和可接受答案。
- 8 条红队样本，覆盖注入、越权、隐私、过期知识。
- 一份 100 分 rubric，拆成事实、证据、安全、格式、可用性。
- 一条发布门禁规则：质量、成本、延迟和高风险失败阈值。

Deliverable: save the asset package under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

选一个已经上线或准备上线的 AI 功能，找出最近一次“看起来更好”的改动。补写它缺失的 eval 样本、风险样本和发布阈值，并说明你最担心哪类退化。

## Quiz

1. Eval dataset 最应该保存什么？
   - A. 只保存模型最终回答
   - B. 输入、期望行为、证据、rubric 和失败类型
   - C. 只保存用户头像
   - Answer: B。Eval dataset 是测试资产，必须让后续版本可以复核同一质量标准。
2. 为什么不能只让模型给自己的答案打分？
   - A. 因为模型不能输出数字
   - B. 因为自评容易放大偏差，高价值任务需要 rubric、证据和人工抽检
   - C. 因为 eval 与 AI 产品无关
   - Answer: B。Rubric 可以辅助模型评分，但最终质量门槛要由可复核标准和抽检控制。
3. 线上反馈进入样本库前要做什么？
   - A. 全部原样当成真相
   - B. 去重、分层、标注并保留修正证据
   - C. 只统计点赞数
   - Answer: B。反馈信号有噪声，必须转成结构化失败样本。
4. 红队样本为什么要进入发布门禁？
   - A. 为了让测试报告更长
   - B. 为了防止注入、越权、隐私泄露和危险工具调用回归
   - C. 为了替代所有正常样本
   - Answer: B。高风险边界不能只靠正常路径测试。

## Review And Reinforcement

- Re-draw the quality loop and mark which data becomes future eval assets.
- Pick one failed sample and classify it as prompt, retrieval, model, tool, policy or UX failure.
- Turn today’s rubric into a release checklist that another engineer could run.

## References

- OpenAI Evals: https://platform.openai.com/docs/guides/evals
- OpenAI Model optimization: https://platform.openai.com/docs/guides/model-optimization
- OWASP Top 10 for LLM Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/
