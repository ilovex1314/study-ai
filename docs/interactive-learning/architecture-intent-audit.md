---
title: Day01-Day20 架构图意图审计
slug: architecture-intent-audit
summary: 复核互动课程 Day01-Day20 的 architecture metadata 图形意图，供研发升级语义图形语法和渲染器使用。
description: 本审计只基于项目文档事实源，读取架构图表达质量需求与 docs/interactive-learning/day01.md 到 day20.md，不重写课程正文。
---

# Day01-Day20 架构图意图审计

## 审计范围

事实来源：

- `docs/product/topics/issue/2026-06-26-architecture-diagram-expression-quality.md`
- `docs/interactive-learning/day01.md` 到 `docs/interactive-learning/day20.md`

实现方向：

- 使用方向 A：语义图形语法。
- 保留 Markdown `<!-- architecture ... -->` metadata 作为事实源。
- 将现有 `nodes` 扩展为 `nodes + edges + groups/lanes`。
- 渲染器按 `boundary`、`lifecycle`、`layered`、`state`、`feedback`、`gate`、`flywheel`、`pipeline/tree` 等关系类型选择图式。
- 不为每章写特殊 SVG；不把箭头写进节点文本。

## 总体判断

当前 Day01-Day20 都适合保留架构图，不建议改成 `none`。主要问题不是“有没有图”，而是当前 metadata 多数只有 `nodes`，无法表达边、分组、分支、回流、状态转换和门禁结果。研发应优先补 `edges` 与 `groups/lanes`，并让渲染器按关系类型选择不同布局，而不是继续把所有章节渲染成串式节点流。

## 逐日图形意图

| Day | 当前 metadata type | 推荐关系类型 | 当前类型是否准确 | 图形意图（一句话） | 需要调整的表达 |
| --- | --- | --- | --- | --- | --- |
| Day01 | `boundary` | `boundary` | 准确 | 表达“模型建议”和“系统控制”的责任/信任边界，策略层决定哪些意图可进入工具或人工确认。 | 不应画成线性流程；需要模型区、可信证据区、策略/权限区、业务执行区和审计反馈边。 |
| Day02 | `lifecycle` | `lifecycle` | 准确 | 表达知识从原始文档入库、索引、检索、组装上下文到带引用回答的生命周期。 | 从串式改为离线入库 lane + 在线查询 lane + 反馈/eval lane；metadata 需要区分 `offline`、`online`、`feedback`。 |
| Day03 | `state` | `state` | 准确 | 表达 Agent 从计划、工具调用、checkpoint、人工确认到恢复/补偿的可暂停状态机。 | 需要状态转换边、失败/恢复边和人工确认分支；不应只是“任务进入到恢复执行”的直线。 |
| Day04 | `layered` | `layered` | 基本准确 | 表达 AI 产品交付的前端体验、API、模型网关、编排/RAG/工具、业务系统和观测评估分层。 | 需要上下层依赖和横切观测/评估 group；可加反馈边，但主图式仍是分层。 |
| Day05 | `boundary` | `boundary` 或 `tree` | 基本准确 | 表达平台选型中业务目标、平台能力、框架适配、数据合规和供应商退出的决策边界。 | 当前 `boundary` 可用，但更适合带分支的选型树/决策矩阵；需要“自研/平台/混合/退出成本”分支。 |
| Day06 | `layered` | `layered` | 准确 | 表达 TypeScript AI 应用中 UI 状态、服务端 API、AI SDK、Provider Adapter 和业务数据的层级边界。 | 需要前端 lane、服务端 lane、provider lane、业务数据 lane；避免横向节点串。 |
| Day07 | `state` | `state` | 准确 | 表达持久化工作流的节点执行、checkpoint、失败重试、人工介入和恢复执行状态转换。 | 需要 checkpoint、interrupt、resume、retry、compensation 的状态边；人工介入应是分支状态。 |
| Day08 | `layered` | `layered` | 准确 | 表达可视化平台、工具 API、人工运营、数据记录和工程化接管的责任分层。 | 需要平台层、集成层、运营层、工程接管层；可补“原型验证 -> 工程接管”的 handoff 边。 |
| Day09 | `lifecycle` | `lifecycle` | 准确 | 表达生产 RAG 从知识源、解析切块、权限标记、混合检索、重排到引用回答的受权限约束生命周期。 | 需要权限/租户 group 贯穿入库与查询；应有 RAG eval 反馈边，不是单向流程。 |
| Day10 | `feedback` | `feedback` | 准确 | 表达 golden set、离线评估、红队、发布门禁、线上反馈和回归集更新形成质量闭环。 | 必须画成闭环；线上失败样本回流到评估集和门禁规则，不能只把“反馈”放在终点。 |
| Day11 | `feedback` | `pipeline` + `feedback` | 部分准确 | 表达从任务意图、上下文包、小步实现、验证、人工审阅到 prompt 资产修正的 AI 协作验证回路。 | 主路径是协作流水线，验证结果回流到上下文和任务拆解；建议 `type` 保持 `feedback` 但 `layout` 标记为 `pipeline-loop`。 |
| Day12 | `layered` | `layered` + `feedback` | 部分准确 | 表达 capstone 项目的问题范围、核心任务流、实现切片、验证证据和部署计划如何组成可验收交付结构。 | 需要产品/实现/验证/部署分层，并把验证证据回连到项目范围和发布复盘。 |
| Day13 | `feedback` | `pipeline` + `feedback` | 部分准确 | 表达学习工作台需求经过设计数据、多域检索、设计系统、token/组件到 UX 验收，并将问题回流为设计约束。 | 主图是设计数据流水线，UX 验收回流；建议 metadata 增加 `lanes: data, rules, implementation, validation`。 |
| Day14 | `lifecycle` | `lifecycle` | 准确 | 表达知识源变更如何传播到解析、切片、metadata/version、检索、引用回答、删除传播和缓存失效。 | 必须有更新/撤回/权限变更的补偿边；删除传播不能被画成普通末端节点。 |
| Day15 | `gate` | `gate` | 准确 | 表达不可信输入和模型工具意图必须通过 schema、身份/ACL、策略门禁后，才进入审批、拒绝或执行。 | 必须有允许/拒绝/审批/执行分支，审计 trace 是所有分支的汇聚点；不能画单路径。 |
| Day16 | `pipeline` | `pipeline` + `layered` | 准确 | 表达多模态输入统一为 asset，再经任务队列、OCR/ASR/Vision、证据锚点、模型生成和进度/降级输出。 | 当前流水线准确，但应分层显示输入层、任务层、模态处理层、推理层、体验层，并保留用户纠错回流。 |
| Day17 | `feedback` | `feedback` | 准确 | 表达任务请求进入模型/工具路由，检索、模型和工具结果汇总为成本延迟质量指标，再回写预算与 SLO。 | 必须画成预算控制闭环；Router 应有检索/缓存、模型、工具三个并行分支。 |
| Day18 | `state` | `state` 或 `lifecycle` | 基本准确 | 表达 AI 事故从 SLO 告警、trace 分诊、降级/熔断、回滚恢复、沟通、复盘到 runbook 更新的事故生命周期。 | 当前 `state` 可用；需要状态转换和复盘回流到指标/门禁，不应只画 LR 流程。 |
| Day19 | `gate` | `gate` | 准确 | 表达 AI 资产变更经过评审、离线 eval、红队门禁、灰度、监控后，全量发布或回滚。 | 必须有门禁通过/失败、灰度达标/异常的分支；线上漂移应回流为新版本资产评审。 |
| Day20 | `flywheel` | `flywheel` | 准确 | 表达学习行为产生能力证据，能力画像驱动下一步任务和项目产出，实验优化再回到课程与路线图。 | 必须画成环形飞轮，路线图决策/实验优化回到学习行为或课程内容；不应画成线性阶段图。 |

## 推荐 metadata 调整清单

### 必须补 edges

所有非 `none` 图都应补 `edges`。最低要求：

- `source`
- `target`
- `label`（可选）
- `tone`（可选，例如 `system`、`warning`、`accent`）
- `kind`（可选，例如 `primary`、`feedback`、`branch`、`guard`、`dependency`）

优先章节：

- Day10、Day17、Day20：必须有闭环/反馈边。
- Day15、Day19：必须有分支边。
- Day03、Day07、Day18：必须有状态转换边。
- Day02、Day09、Day14：必须有生命周期推进边和更新/反馈/删除传播边。

### 必须补 groups 或 lanes

建议按类型补分组：

- `boundary`：信任边界、模型边界、系统控制边界、外部依赖边界。
- `lifecycle`：离线入库、在线查询、更新/删除/反馈。
- `layered`：UI 层、服务端层、模型/平台层、业务系统层、治理层。
- `state`：正常路径、暂停/人工介入、失败/补偿、恢复。
- `gate`：输入、校验、策略、审批/拒绝/执行、审计。
- `pipeline`：输入层、任务层、处理层、推理层、体验层。
- `feedback` 和 `flywheel`：主循环节点与回流节点。

### 类型需要重点复核的章节

- Day05：当前 `boundary` 基本准确，但研发可选择 `tree`/`decision-tree` 布局表达选型分支。
- Day11：当前 `feedback` 不错，但视觉上应是流水线 + 回流，不是纯闭环。
- Day12：当前 `layered` 不够完整，应加验证/复盘回流；可用 `layered-feedback` 布局。
- Day13：当前 `feedback` 不错，但视觉上应是设计数据 pipeline + UX 反馈回流。
- Day18：当前 `state` 可保留，但要按事故状态机/生命周期画，不要画成普通流程。

## 渲染器验收关注点

- `feedback`、`flywheel`：必须看见回流路径。
- `gate`: 必须看见通过、失败、审批/拒绝/执行等分支。
- `state`: 必须看见状态转换、暂停、恢复或补偿。
- `layered`: 必须看见层级和上下层责任。
- `boundary`: 必须看见责任/信任边界，而非串行步骤。
- `lifecycle`: 必须看见对象生命周期与更新/删除/反馈路径。
- `pipeline`: 只能用于确实有顺序处理链路的章节，复杂关系要叠加 lanes 或 feedback edge。
- 节点 label 中不得包含箭头字符；箭头应由 edge/connector/SVG marker 表达。

## 研发交接结论

Day01-Day20 的当前 `type` 整体方向可用，只有 Day05、Day11、Day12、Day13、Day18 需要布局语义重点复核；不建议通过为每章写特殊 SVG 解决。研发应把 Markdown architecture metadata 升级为语义图形语法，再按关系类型渲染通用图式。
