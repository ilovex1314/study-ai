# Day 14 数据治理与知识生命周期

<!-- architecture
{"title":"知识生命周期与删除传播","summary":"知识源变更必须传播到解析、切片、向量、缓存、引用和审计状态。","type":"lifecycle","nodes":[{"label":"知识源"},{"label":"接入校验"},{"label":"解析切分"},{"label":"Metadata / Version","tone":"system"},{"label":"权限过滤检索"},{"label":"带引用回答","tone":"accent"},{"label":"删除传播","tone":"warning"}],"feedback":"更新、撤回和权限变更触发补偿任务与缓存失效。"}
-->

## Today Goal

为知识库设计可追溯、可权限过滤、可更新、可删除的摄取链路。完成后，你应该能写出文档 metadata schema，并说明更新、撤回、权限变更如何传播到原文、切片、向量、缓存和引用。

Estimated time: 60 minutes.

## Why This Matters

RAG 失败不只来自检索算法，也来自数据生命周期失控：旧文档没有下线、权限没有进入索引、引用只保存 URL、删除只删原文件。生产知识系统必须证明“答案来自哪份内容、对谁可见、何时生效、何时失效、如何撤回”。

## Core Concepts

### 数据契约让知识可治理

数据契约规定 source、owner、tenant、sensitivity、effective_at、expires_at、version、delete_policy 和 access_scope。它解决的是知识进入系统后不可追踪的问题。边界是：metadata 不能替代内容质量审核。常见误区是只保存文件名和向量 ID。

### 新鲜度控制避免旧知识伪装成事实

检索相似不代表内容仍有效，新鲜度要通过生效时间、过期时间、版本和业务状态影响召回与回答。它解决的是“过期知识仍被模型引用”的问题。边界是：新鲜度不是简单按时间排序，法规、合同和产品文档有不同生命周期。常见误区是只看向量分数。

### 删除传播必须覆盖派生资产

源文件撤回后，原文、解析结果、chunk、embedding、索引、缓存、回答引用和 trace 都要能定位。它解决的是“删了文件但系统仍能回答”的问题。边界是：审计记录可能需要保留删除事件而不是保留敏感原文。常见误区是只删对象存储里的 PDF。

### 引用要指向可复核证据

引用至少要连接 document version、chunk id、位置锚点、权限状态和生成时快照。它解决的是用户和审核者无法验证答案来源的问题。边界是：引用不是保证答案正确，仍要做 grounding 校验。常见误区是只返回一个网页 URL。

## Underlying Architecture

```text
知识源 -> 接入校验 -> 分类/脱敏 -> 解析切分 -> metadata/version -> 索引 -> 权限过滤检索 -> 带引用回答
   ^           |              |              |               |             |
   |           v              v              v               v             v
更新/撤回事件 -> 补偿任务 -> 删除传播 -> 缓存失效 -> trace 标记 -> 拒答或重新生成
```

Diagram recommendation: use a lifecycle diagram. The key relationship is how source changes propagate through derived assets.

## Data And Logic Flow

1. 入库流：source -> validation -> classification -> parsing -> chunking -> embedding -> index。
2. 权限流：identity/tenant/role -> metadata filter -> retrieval -> answer citation。
3. 更新流：new version -> diff -> re-chunk/re-embed -> index swap -> cache invalidation。
4. 删除流：delete event -> locate derived assets -> purge or tombstone -> audit record -> refusal behavior。

## Key Technical Points

- Metadata schema 要覆盖 owner、tenant、classification、acl、version、validity、source checksum 和 deletion state。
- 权限过滤应在检索前或检索阶段生效，不能只在回答后让模型“不要说”。
- 删除传播要有幂等补偿任务，避免部分索引失败导致残留。
- 引用锚点要能定位到 chunk 与原文位置，不能只保存文档标题。
- 新鲜度策略需要按业务域定义：政策、代码、FAQ、合同、会议纪要的过期方式不同。

## Upstream Dependencies And Downstream Applications

上游依赖 Day02 的 RAG 基础、Day09 的多租户检索和权限过滤。下游影响 Day15 的安全策略、Day18 的事故响应、Day19 的发布治理和 PRD 中未来 AI 教练的引用可信度。

## Production Example

企业制度助手按租户、部门、地区和生效日期过滤制度文档；当 HR 撤回旧版政策时，系统生成删除传播任务，清理 chunk、embedding 和缓存，并在旧 trace 中标记引用已失效。

## Counterexample

把所有 PDF 一次性丢进向量库，没有 owner、版本、权限和过期时间。员工问到报销政策时，模型召回旧制度并给出无权限部门的条款，回答看似有引用但不可治理。

## Hands-On Practice

为一个“员工制度知识库”写 metadata schema，并列出三类事件的补偿动作：

- 文档更新。
- 文档撤回。
- 用户部门权限变更。

Deliverable: save schema and event actions under `docs/`, `labs/`, or `projects/`, and include how you would verify stale answers are no longer returned.

## Exploration Prompt

找一个真实知识源，判断它最容易发生哪种生命周期问题：过期、越权、重复、删除残留还是引用不可复核。设计一个一小时内可验证的检查方法。

## Quiz

1. 数据契约最应该解决什么问题？
   - A. 让文档标题更长
   - B. 让知识进入系统后可追踪、可过滤、可删除
   - C. 让模型不用引用
   - Answer: B。数据契约是治理知识生命周期的基础。
2. 为什么向量相似度不能代表事实仍有效？
   - A. 因为相似度只反映语义接近，不反映版本、生效时间和业务状态
   - B. 因为向量库不能存文本
   - C. 因为所有旧文档都应该保留最高权重
   - Answer: A。新鲜度要由 metadata 和业务规则参与控制。
3. 删除事件为什么不能只删原文件？
   - A. 因为 chunk、embedding、缓存和引用等派生资产仍可能残留
   - B. 因为删除原文件一定会删除数据库
   - C. 因为删除不需要审计
   - Answer: A。删除传播必须覆盖所有派生资产。
4. 引用只保存 URL 的风险是什么？
   - A. URL 不能显示中文
   - B. 无法定位版本、chunk、权限和生成时证据
   - C. URL 会自动防止越权
   - Answer: B。生产引用要能复核具体证据。

## Review And Reinforcement

- Re-draw the lifecycle diagram and mark every derived asset.
- Pick one metadata field and explain缺失它会造成什么生产事故。
- Write one stale-answer test case and one delete-propagation test case.

## References

- OpenAI Retrieval and file search concepts: https://platform.openai.com/docs/guides/tools-file-search
- LangChain indexing and record management: https://python.langchain.com/docs/how_to/indexing/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
