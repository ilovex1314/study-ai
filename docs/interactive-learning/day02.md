# Day 02 Prompt / RAG / Grounding

## Today Goal

学会把业务输入组织成稳定 prompt 合约，判断什么时候需要 RAG，并画出从文档入库到带引用回答的完整链路。

Estimated time: 60 minutes.

## Why This Matters

大多数知识问答失败来自上下文设计薄弱：prompt 模糊、文档未清洗、切分错误、没有引用、没有检索评估、unsupported claim 没有兜底。

## Core Concepts

### Prompt 是可测试的接口合约

生产 prompt 定义任务、输入、约束、输出 schema、拒答规则和示例。 它让模型输出可复用、可评估、可回归，而不是靠一次性措辞碰运气。 工程上要记住：像设计 API 一样设计 prompt：字段、错误、版本、验收样例都要可追踪。

### RAG 是知识注入策略，不是万能形态

RAG 通过检索把外部知识放入本轮上下文，服务 Chat、Workflow 或 Agent。 动态知识、长文档和权限范围不能靠模型参数记忆解决。 工程上要记住：先判断知识是否动态、是否需要引用、是否受权限约束，再决定 RAG。

### 检索质量要用样例集调参

没有 golden set，就不知道改 chunk、embedding、rerank 还是 prompt。 检索错了，模型会在错误证据上写出看似合理的答案。 工程上要记住：先建 20 条高频问题，再调检索策略。

### Grounding 要让答案可追溯

回答必须区分证据、推断和不确定，不支持的结论要拒答或标注。 用户真正需要的是可信答案，不是流畅文本。 工程上要记住：把引用校验作为生成后的 validator，而不是靠 prompt 祈祷。

## Underlying Architecture

```text
离线：知识源 -> 解析 -> chunk -> embedding -> metadata -> hybrid index。
在线：问题 -> 查询改写 -> 检索 -> rerank -> context pack -> prompt -> model -> 引用校验 -> 回答。
```

## Data And Logic Flow

1. 入库流：文件/API/网页 -> parser -> chunk -> embedding -> vector store -> 元数据索引。
2. 查询流：用户问题 -> intent/query rewrite -> hybrid retrieval -> rerank -> context builder -> answer。
3. 反馈流：用户纠正 -> failed case -> golden set -> 调整 chunk、metadata、rerank 或 prompt。

## Key Technical Points

- prompt 是接口合约，要写清任务、输入、约束、输出 schema、拒答规则和示例。
- RAG 是 grounding 策略，不是产品形态。
- 混合检索通常比纯向量更适合产品名、ID、精确术语。
- 检索评估要有 golden set：问题、期望证据、可接受答案和失败备注。

## Upstream Dependencies And Downstream Applications

上游依赖文档质量、权限模型、解析器、embedding 模型和业务词表。下游服务知识库助手、客服 copilot、销售支持、Agent 工具上下文和搜索增强。

## Production Example

内部政策助手按地区和版本过滤文档，召回证据片段，要求模型带引用回答，并在引用覆盖不足时拒答。

## Counterexample

把整份政策 PDF 粘进 prompt，然后要求模型“严谨回答”。这既贵又难以追踪证据，还会把旧版本和新版本混在一起。

## Hands-On Practice

用 20 条真实或模拟文档建立一个最小 RAG 设计：chunk 规则、metadata 字段、检索策略、回答 schema、5 条 golden questions。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

对比 keyword、vector、hybrid 三种检索在产品名、错误码和语义问题上的命中差异。

## Quiz

1. 生产 prompt 最像什么？
   - A. 随手写的聊天开场白
   - B. 可测试的接口合约
   - C. 数据库索引
   - Answer: B。它更像接口合约，需要输入、约束、schema 和验收样例。
2. 什么时候更应该考虑 RAG？
   - A. 问题只需要固定格式转换
   - B. 需要基于外部动态知识并可引用
   - C. 只想让语气更像品牌
   - Answer: B。当知识动态、长、需要引用或受权限约束时。
3. 检索 golden set 至少要包含什么？
   - A. 按钮颜色和字号
   - B. 问题、期望证据和可接受答案
   - C. 只包含模型最终回答
   - Answer: B。问题、期望证据、可接受答案和失败备注。
4. 证据不足时最安全的回答策略是什么？
   - A. 编一个合理答案
   - B. 拒答或标注不确定
   - C. 降低 temperature 后继续强答
   - Answer: B。拒答或说明不确定，并请求更多证据。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- Vercel AI SDK: https://vercel.com/ai-sdk
- Dify docs: https://docs.dify.ai/
