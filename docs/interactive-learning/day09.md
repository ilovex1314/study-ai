# Day 09 RAG 深水区

## Today Goal

围绕“检索、重排、权限、多租户与评估”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。

Estimated time: 60 minutes.

## Why This Matters

RAG 上线后的主要问题是数据治理、权限过滤、版本漂移和评估，而不是向量库名字。

## Core Concepts

### 文档入库是 RAG 上限

解析、清洗、切分、去重、版本和元数据决定能检索到什么。 糟糕入库会让后续 rerank 和 prompt 都在错误数据上补救。 工程上要记住：先做好数据管道，再调模型。

### Hybrid search 兼顾语义和精确匹配

向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。 真实业务查询经常同时包含概念和精确实体。 工程上要记住：按查询类型选择检索组合。

### 权限过滤必须进入检索层

多租户和企业知识库要在召回前后都控制可见范围。 如果先召回再让模型“不要泄露”，已经太晚了。 工程上要记住：权限是检索条件，不是 prompt 建议。

### RAG 运维关注漂移和回归

文档更新、索引重建、检索参数和 prompt 版本都会影响答案。 RAG 不是一次性导入，而是持续运维系统。 工程上要记住：把 RAG 当搜索产品运营。

## Underlying Architecture

```text
用户/业务目标 -> 约束识别 -> 入库治理 -> 权限过滤 -> RAG eval -> 验收与反馈。
架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。
```

## Data And Logic Flow

1. 输入流：业务场景 -> 需求约束 -> 技术选择 -> 接口/数据设计。
2. 执行流：最小原型 -> 日志记录 -> 评估样本 -> 迭代调整。
3. 治理流：权限/成本/失败样本 -> 风险判断 -> 上线门禁。

## Key Technical Points

- 文档入库是 RAG 上限：解析、清洗、切分、去重、版本和元数据决定能检索到什么。
- Hybrid search 兼顾语义和精确匹配：向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。
- 权限过滤必须进入检索层：多租户和企业知识库要在召回前后都控制可见范围。
- RAG 运维关注漂移和回归：文档更新、索引重建、检索参数和 prompt 版本都会影响答案。

## Upstream Dependencies And Downstream Applications

上游依赖前面几天建立的模型边界、prompt/RAG 基础、Agent 编排和产品化交付意识。下游会影响 capstone 的技术选型、架构拆分、部署策略和复盘方式。

## Production Example

以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。

## Counterexample

只根据工具热度或演示效果做决定，没有约束表、数据流、验收样本和退出路径，后续会在成本、稳定性或维护性上返工。

## Hands-On Practice

围绕 检索、重排、权限、多租户与评估 写一页工程设计：目标、非目标、架构图、关键接口、失败模式、验收命令和下一步。

Deliverable: commit or save one concrete artifact under `docs/`, `labs/`, `prompts/`, or `projects/`, and include one paragraph explaining how you would verify it.

## Exploration Prompt

找一个你当前项目中的真实流程，判断它在 检索、重排、权限、多租户与评估 上最大的未知风险，并设计一个一小时内可完成的验证实验。

## Quiz

1. 文档入库是 RAG 上限最主要解决什么问题？
   - A. 让页面更花哨
   - B. 解析、清洗、切分、去重、版本和元数据决定能检索到什么。
   - C. 完全取消系统控制
   - Answer: B。解析、清洗、切分、去重、版本和元数据决定能检索到什么。 工程上要落到边界、数据流和验收。
2. Hybrid search 兼顾语义和精确匹配最主要解决什么问题？
   - A. 让页面更花哨
   - B. 向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。
   - C. 完全取消系统控制
   - Answer: B。向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。 工程上要落到边界、数据流和验收。
3. 权限过滤必须进入检索层最主要解决什么问题？
   - A. 让页面更花哨
   - B. 多租户和企业知识库要在召回前后都控制可见范围。
   - C. 完全取消系统控制
   - Answer: B。多租户和企业知识库要在召回前后都控制可见范围。 工程上要落到边界、数据流和验收。
4. RAG 运维关注漂移和回归最主要解决什么问题？
   - A. 让页面更花哨
   - B. 文档更新、索引重建、检索参数和 prompt 版本都会影响答案。
   - C. 完全取消系统控制
   - Answer: B。文档更新、索引重建、检索参数和 prompt 版本都会影响答案。 工程上要落到边界、数据流和验收。

## Review And Reinforcement

- Re-draw the architecture from memory and mark which boxes are deterministic system control.
- Write one failure mode and one validation method for every core concept above.
- Convert today’s hands-on result into a reusable checklist or prompt template.

## References

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk/
