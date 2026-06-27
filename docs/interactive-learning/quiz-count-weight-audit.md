---
title: Day01-Day20 灵活题量与权重内容审计
slug: quiz-count-weight-audit
summary: 基于当前课程源复核 Day01-Day20 测验题量和权重契约，供研发实现可变题量与 100 分权重校验。
description: 本审计只读取需求文档和 docs/interactive-learning/day01.md 到 day20.md 的测验部分，不修改 React、TypeScript 或构建产物。
---

# Day01-Day20 灵活题量与权重内容审计

## 事实来源

- `docs/product/topics/refact/2026-06-27-flexible-quiz-question-count-and-weights.md`
- `docs/interactive-learning/day01.md` 到 `docs/interactive-learning/day20.md`

## 内容判断

需求文档要求把测验契约从“每章固定 4 题”改为“每章 N 题，权重合计 100”。当前 Markdown 内容显示：

- Day01 已经采用 5 题、显式 100 分权重。
- Day02-Day15 多数为 4 道选择题，但 Markdown 未显式写权重。
- Day16-Day20 为 4 个开放问题，缺少选项、答案和显式权重；如果 typed lesson 已经有更完整题目，后续应由研发做 Markdown/typed lesson 一致性校验。
- 本轮不批量重写 Day01-Day20 题目正文，先给出内容契约与逐章推荐题量/权重，避免在研发 schema 改造前扩大 Markdown 与 typed lesson 漂移。

## 内容契约

每个 Day 的 Markdown 测验应允许可变题量，但必须满足：

1. 每章 `Quiz` 或 `测验` 总分为 100。
2. 每题必须显式声明 `weight` 或在题干中写出分值。
3. 题目概念必须出现在当日正文的 `Core Concepts`、`Key Technical Points` 或等价章节中。
4. 题型可为单选、开放题、情境诊断题或设计题；typed lesson 可按 UI 能力决定哪些题型先落地。
5. 选择题必须有正确答案与解释；开放题必须有评分要点。
6. 章节题量由内容密度决定，不再要求固定 4 题或至少 4 题。

推荐 Markdown metadata 形态：

```md
<!-- quiz-contract
{"totalWeight":100,"questionCount":5,"weights":[25,20,20,20,15],"questionTypes":["scenario","single","single","design","cost"]}
-->
```

如果不使用 metadata，也应在题干中保留类似 Day01 的显式分值：`**架构判断，30 分：** ...`。

## 逐章推荐题量与权重

| Day | 当前 Markdown 题量/权重 | 推荐题量 | 推荐权重 | 内容判断 | 是否建议立即改 Markdown |
| --- | --- | ---: | --- | --- | --- |
| Day01 | 5 题，30/25/20/15/10，合计 100 | 5 | 30/25/20/15/10 | 内容密度高，已有架构、应用、概念、设计、成本五类题；适合保留。 | 否，已符合新方向。 |
| Day02 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | Prompt 合约、RAG 判断、检索评估、grounding、拒答策略都值得单独考。 | typed lesson 已补 1 题“引用校验/拒答边界”；Markdown 后续同步。 |
| Day03 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | Agent、Workflow、state、tool permission、人类确认/恢复是五个关键能力点。 | typed lesson 已补 1 题“checkpoint/resume 诊断”；Markdown 后续同步。 |
| Day04 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | 产品闭环应覆盖 UX、模型网关、streaming、trace/eval、部署/成本。 | typed lesson 已补 1 题“trace/运行证据”；Markdown 后续同步。 |
| Day05 | 4 题，无显式权重 | 4 | 30/25/25/20 | 当前四题已覆盖平台选型、锁定、框架适配、串联方式；可保持 4 题。 | 暂不改；只需研发支持 4 题权重。 |
| Day06 | 4 题，无显式权重 | 4 | 25/25/25/25 | 当前四题覆盖 TS 栈、provider adapter、Chat UI 状态、服务端边界；可保持均衡。 | 暂不改；只需研发支持 4 题权重。 |
| Day07 | 4 题，无显式权重 | 4 | 30/25/25/20 | 当前四题覆盖 durable execution、checkpoint、human interrupt、state graph；适合保留。 | 暂不改；只需研发支持 4 题权重。 |
| Day08 | 4 题，无显式权重 | 4 | 25/25/25/25 | 当前四题覆盖可视化工作流、低代码、业务验证、API bridging；适合保留。 | 暂不改；只需研发支持 4 题权重。 |
| Day09 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | 生产 RAG 密度高，建议把 rerank/eval 或漂移监控拆出一题。 | typed lesson 已补 1 题“rerank”；Markdown 后续同步。 |
| Day10 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | Eval、rubric、反馈、红队、发布门禁都应被测。 | typed lesson 已补 1 题“发布阈值/门禁”；Markdown 后续同步。 |
| Day11 | 4 题，无显式权重 | 4 | 30/25/20/25 | 当前四题覆盖上下文、拆解、prompt 资产、验证闭环；适合保留。 | 暂不改；只需研发支持 4 题权重。 |
| Day12 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | Capstone 内容密度高，建议增加 eval/证据或 fallback 题。 | typed lesson 已补 1 题“可复核证据”；Markdown 后续同步。 |
| Day13 | 4 题，无显式权重 | 4 | 25/25/25/25 | 当前四题覆盖设计数据、多域检索、设计系统、UI 验收；适合保留。 | 暂不改；只需研发支持 4 题权重。 |
| Day14 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | 数据治理应覆盖契约、新鲜度、删除传播、引用、权限过滤。 | typed lesson 已补 1 题“权限传播”；Markdown 后续同步。 |
| Day15 | 4 题，无显式权重 | 5 | 25/20/20/20/15 | 安全章节应覆盖不可信输入、schema、策略、审批、审计/红队。 | typed lesson 已补 1 题“草稿/提交权限拆分”；Markdown 后续同步。 |
| Day16 | 4 个开放问题，无答案/权重 | 5 | 25/20/20/20/15 | 多模态应覆盖异步队列、证据锚点、降级、成本/延迟、隐私/输入契约。 | 内容源不足，typed lesson 本轮不硬补；交给后续内容生产。 |
| Day17 | 4 个开放问题，无答案/权重 | 5 | 25/20/20/20/15 | 成本容量应覆盖缓存、路由、重试预算、p95、预算/SLO 降级。 | 内容源不足，typed lesson 本轮不硬补；交给后续内容生产。 |
| Day18 | 4 个开放问题，无答案/权重 | 5 | 25/20/20/20/15 | SRE 应覆盖 SLO、trace、熔断、回滚、runbook/复盘。 | 内容源不足，typed lesson 本轮不硬补；交给后续内容生产。 |
| Day19 | 4 个开放问题，无答案/权重 | 5 | 25/20/20/20/15 | 发布治理应覆盖 trace 版本、资产版本化、门禁、灰度阻断、owner。 | 内容源不足，typed lesson 本轮不硬补；交给后续内容生产。 |
| Day20 | 4 个开放问题，无答案/权重 | 5 | 25/20/20/20/15 | 产品飞轮应覆盖能力证据、北极星、护栏、实验停止条件、90 天路线图。 | 内容源不足，typed lesson 本轮不硬补；交给后续内容生产。 |

## 分组结论

适合继续 4 题的章节：

- Day05、Day06、Day07、Day08、Day11、Day13。

当前 typed lesson 已按内容补为 5 题的章节：

- Day01 已经是 5 题。
- Day02、Day03、Day04、Day09、Day10、Day12、Day14、Day15。

建议内容生产后再决定是否补到 5 题的章节：

- Day16、Day17、Day18、Day19、Day20。

暂不建议超过 5 题的章节：

- 当前课程每日学习预算约 60 分钟；超过 5 题会增加复盘负担。
- 综合章节可以通过高权重情境题或设计题提高区分度，而不是单纯堆题量。

## 研发输入

研发实现可变题量时，应以以下内容契约为准：

- `question.weight` 必填，单日合计必须为 100。
- 不再用固定 `[30,25,25,20]` 补权重。
- 不再校验“至少 4 题”或“固定 4 题”；改为校验 `questions.length >= 1` 与 `sum(weight) === 100`。
- UI 进度、题号直选、结果页和复盘只读取 `questions.length` 与 `weight`。
- 对 Markdown/typed lesson 一致性校验时，Day16-Day20 需要特别标记：Markdown 当前缺答案和权重，typed lesson 若已补全，应反向同步到 Markdown 或生成差异报告。

## 质量检查

- 已逐章读取 Day01-Day20 的测验部分。
- 已识别 Day01 显式 100 分权重。
- 已识别 Day02-Day15 未显式写权重。
- 已识别 Day16-Day20 只有开放问题，缺答案和权重说明。
- 本轮未修改课程题目正文，避免在研发 schema 改造前造成二次漂移。

## 研发差异结论

研发实现检查 typed lesson 后确认：

- Day01 typed lesson 已有 5 道选择题与显式权重，合计 100。
- Day02、Day03、Day04、Day09、Day10、Day12、Day14、Day15 typed lesson 已按内容密度补为 5 题，权重为 25/20/20/20/15，合计 100。
- Day05、Day06、Day07、Day08、Day11、Day13 typed lesson 保持 4 题，但使用显式权重，合计 100。
- Day16-Day20 typed lesson 已有完整选择题、答案和解释，本轮保留 4 题与显式权重，合计 100；不因审计建议机械补题。
- Day16-Day20 Markdown 当前仍弱于 typed lesson：Markdown 只有开放问题，缺少选择题答案、解释和权重。后续建议由内容生产师按 typed lesson 反向同步 Markdown，或在 Markdown 中补 `quiz-contract` metadata 与评分要点。
- 本轮研发不反向改写 Day16-Day20 Markdown 题目正文，只把差异显式记录，避免在 schema/校验收口阶段扩大内容改写范围。

## 风险与后续

- Day16-Day20 内容测验结构明显弱于 Day01-Day15，需要后续内容生产单独补“题型、答案/评分要点、权重”。
- 若 typed lesson 中已经存在 Day16-Day20 的完整选择题和权重，应以一致性校验结果决定是同步 Markdown 还是调整 typed lesson。
- 可变题量上线后，内容生产师再按本审计表逐章补齐 Markdown quiz metadata。
