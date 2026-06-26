# Day 11 上下文工程与 AI 协作

<!-- architecture
{"title":"AI 协作验证回路","summary":"把模糊需求拆成上下文、任务、实现和验证，而不是只让模型一次生成。","type":"feedback","nodes":[{"id":"n1","label":"任务意图","tone":"accent","group":"g1"},{"id":"n2","label":"上下文包","group":"g1"},{"id":"n3","label":"小步实现","group":"g1"},{"id":"n4","label":"自动验证","tone":"system","group":"g1"},{"id":"n5","label":"人工审阅","tone":"warning","group":"g1"},{"id":"n6","label":"修正提示资产","group":"g2"}],"feedback":"验证结果反哺上下文和下一次任务拆解。","renderMode":"diagram","edges":[{"from":"n1","to":"n2","relation":"primary"},{"from":"n2","to":"n3","relation":"primary"},{"from":"n3","to":"n4","relation":"primary"},{"from":"n4","to":"n5","relation":"primary"},{"from":"n5","to":"n6","relation":"primary"},{"from":"n6","to":"n1","relation":"feedback","label":"回流"}],"groups":[{"id":"g1","label":"主流程","kind":"lane"},{"id":"g2","label":"评估与反馈","kind":"lane"}]}
-->

## Today Goal

把模糊需求转成 AI 能稳定执行的工程任务：明确目标、边界、相关文件、约束、验收和迭代节奏。完成后，你应该能设计一份 AI 协作 playbook，让 AI 输出跟随证据迭代，而不是靠感觉“vibe”。

Estimated time: 60 minutes.

## Why This Matters

AI 编程失败通常不是因为模型完全不会写代码，而是上下文包不完整、任务粒度太大、验收标准模糊、变更没有被验证。工程化的 AI 协作能减少返工、token 浪费和隐性风险。

## Core Concepts

### 上下文工程决定 AI 协作质量

上下文工程把目标、非目标、相关文件、代码约定、错误日志、用户约束和验收方式组织成可执行输入。它解决的是“AI 到底应该基于什么做判断”。边界是：上下文不是越多越好，噪声会稀释关键约束。常见误区是一次性塞入整仓库，却不说明要改哪里。

### 任务拆解降低返工和幻觉

大任务要拆成理解现状、提出方案、改一处、验证一处、复盘差异。它解决的是复杂任务难以一次成功的问题。边界是：拆解不能丢掉整体目标和依赖顺序。常见误区是让 AI 同时改 UI、数据模型、测试和部署脚本，却没有中间检查点。

### Prompt 资产需要版本化和复用

常用的开发、审查、测试、调研、复盘 prompt 应保存为项目资产。它解决的是团队协作标准不稳定的问题。边界是：prompt 模板不能替代具体上下文。常见误区是把一个万能 prompt 用在所有场景。

### 验证闭环替代“感觉能用”

AI 输出必须被测试、构建、截图、日志、数据 diff 或人工 checklist 验证。它解决的是“产出看起来合理但没有证据”的风险。边界是：有些体验和内容仍需要人工复核。常见误区是只读 diff，不跑命令。

## Underlying Architecture

```text
用户意图 -> 任务规格 -> 上下文包 -> AI 执行 -> 本地验证 -> 差异复盘 -> 下一轮任务
            |          |          |          |          |
            v          v          v          v          v
         goal/non-goal files    constraints commands   evidence
```

Diagram recommendation: use a collaboration pipeline diagram. The important relationship is how context, execution and verification exchange evidence.

## Data And Logic Flow

1. 输入流：用户需求 -> 背景资料 -> 相关文件 -> 非目标 -> 风险约束。
2. 执行流：计划 -> 小步改动 -> 保存 diff -> 运行验证 -> 修复失败。
3. 反馈流：测试输出、截图、构建日志、用户反馈 -> 更新上下文包 -> 下一轮任务。
4. 资产流：有效 prompt、checklist、调试步骤、失败样本 -> 项目模板或团队手册。

## Key Technical Points

- 每个 AI 任务都应包含 objective、scope、files、constraints、acceptance、verification 和 fallback。
- 上下文预算优先给业务目标、关键文件和错误证据，不优先给完整历史聊天。
- 任务拆解时先确定依赖顺序：数据契约先于 UI 渲染，内容源先于 typed lesson。
- Prompt 资产要连接实际命令和验收标准，例如 `npm test`、`npm run build`、截图断点。
- 复盘要记录“哪个约束缺失导致返工”，而不是只记录模型表现。

## Upstream Dependencies And Downstream Applications

上游依赖 Day01 的模型边界、Day04 的产品交付闭环和 Day10 的质量工程。下游影响 Day12 的 capstone 交付、团队协作、代码审查和后续课程内容生产流程。

## Production Example

内容生产师先完成 Day01-Day20 Markdown 源稿，明确每个 Day 的能力目标、图类型、题目概念和参考资料；研发工程师再基于这些源稿导入 typed lesson，并运行一致性校验。这比研发直接猜测 Day14-Day20 数据更稳定。

## Counterexample

用户说“把课程升级一下”，AI 没读 PRD、没找现有 Markdown、没确认 P0 范围，直接生成前端数据。最终 typed lesson 与学习计划、产品文档和课程源稿继续漂移。

## Hands-On Practice

为一个你准备交给 AI 的开发任务写一份 task packet：

- Objective / Non-goals
- Relevant files and current behavior
- Constraints and design rules
- Step-by-step task slices
- Verification commands or manual checks
- Expected handoff summary

Deliverable: save the task packet under `docs/`, `prompts/`, or `projects/`, then用它实际跑一轮 AI 协作并记录返工点。

## Exploration Prompt

找一次你最近的 AI 协作失败，复盘到底缺了哪个上下文维度：目标、边界、文件、约束、验收、错误证据还是执行顺序。把它改写成一个可复用模板。

## Quiz

1. 上下文工程最主要解决什么问题？
   - A. 让 AI 一次读取无限文件
   - B. 明确 AI 判断所需的目标、边界、证据和验收
   - C. 取消测试和构建
   - Answer: B。上下文工程是把任务变成可执行输入，而不是盲目增加文本。
2. 为什么任务要拆成小步骤？
   - A. 为了让工作显得更多
   - B. 为了降低复杂度、建立检查点并及时验证
   - C. 为了避免保存任何 diff
   - Answer: B。小步闭环能减少返工和隐性错误。
3. Prompt 资产的边界是什么？
   - A. 模板可以替代所有具体上下文
   - B. 模板提供稳定结构，但仍要填入当前项目事实和验收标准
   - C. 模板只用于写诗
   - Answer: B。Prompt 资产可复用，但不能脱离当前任务事实。
4. 验证闭环应优先产出什么？
   - A. 证据，例如测试、构建、截图、日志或人工 checklist
   - B. 更长的聊天记录
   - C. 更多没有来源的解释
   - Answer: A。工程协作要以证据证明完成状态。

## Review And Reinforcement

- Re-draw the collaboration pipeline and mark every evidence point.
- Rewrite one vague user request into a task packet.
- Create a reusable prompt template for “content first, engineering import second”的工作流。

## References

- OpenAI Prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- GitHub pull request review guidance: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests
