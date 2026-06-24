import { option } from "./helpers";
import { curriculum } from "./curriculum";
import type { ConceptId, ConceptModule, DecisionLayer, LessonPage } from "./types";

type ModuleSeed = Pick<ConceptModule, "title" | "summary" | "visual" | "concept" | "whyItMatters" | "coreIdeas" | "engineerLens" | "pitfalls" | "practicePrompt" | "diagram">;
type LessonSeed = { modules: ModuleSeed[]; layers: DecisionLayer[]; questions: Array<{ concept: ConceptId; prompt: string; correct: string; distractors: string[]; explanation: string }> };

const seeds: LessonSeed[] = [
  {
    modules: [
      { title: "先界定可持久化的业务状态", summary: "把订单、审批、外部调用和模型草稿拆成可恢复状态，而不是把整段执行留在内存。", visual: "schema", concept: "durable-execution", whyItMatters: "进程重启、超时和重试是常态；状态边界决定系统能否继续。", coreIdeas: ["状态可序列化", "副作用有幂等键", "恢复点可追踪"], engineerLens: "为每个任务写 state schema 与版本号。", pitfalls: ["把 Promise 当恢复机制", "状态里塞秘密", "忽略迁移"], practicePrompt: "画出一个审批流程的状态、事件和恢复点。", diagram: { conclusion: "checkpoint 保存的是一致状态，失败进入补偿或人工决策。", nodes: [{ id: "input", label: "任务输入" }, { id: "state", label: "状态快照", tone: "accent" }, { id: "tool", label: "工具执行" }, { id: "checkpoint", label: "checkpoint", tone: "warning" }, { id: "continue", label: "继续执行", tone: "success" }, { id: "recover", label: "补偿 / 审批", tone: "warning" }], edges: [{ from: "input", to: "state" }, { from: "state", to: "tool" }, { from: "tool", to: "checkpoint" }, { from: "checkpoint", to: "continue" }, { from: "checkpoint", to: "recover", label: "失败", tone: "warning" }] } },
      { title: "Checkpoint 让长任务从中断处继续", summary: "在稳定步骤后写 checkpoint，恢复时读取最近一致快照而不是重新执行所有工具。", visual: "workbench", concept: "checkpointing", whyItMatters: "它降低重试成本，也避免重复发送邮件或重复扣费。", coreIdeas: ["checkpoint 前后定义一致性", "记录输入版本", "恢复可重放"], engineerLens: "把 checkpoint ID 放进 trace 和用户可见进度。", pitfalls: ["每一步都落盘", "只保存最终结果", "无版本兼容"], practicePrompt: "为一个文档处理任务标出三个 checkpoint。" },
      { title: "补偿不是撤销：为副作用写反向动作", summary: "无法原子提交的跨服务操作，需要定义失败后的补偿和人工处理队列。", visual: "tools", concept: "human-interrupt", whyItMatters: "模型和工具调用可能部分成功，静默失败会污染真实业务。", coreIdeas: ["区分 retry 与 compensate", "高风险动作可暂停", "人工决定不可逆操作"], engineerLens: "为每种副作用写幂等键、补偿动作和升级路径。", pitfalls: ["无限重试", "假定外部 API 可回滚", "没有人工入口"], practicePrompt: "列出创建工单失败后的补偿与升级策略。" },
      { title: "状态图比线性流程更接近真实运行", summary: "把 pending、running、waiting approval、failed、compensating 和 done 显式建模。", visual: "machine", concept: "state-graph", whyItMatters: "状态图让并发、暂停、恢复和终态有共同语言。", coreIdeas: ["终态有限", "事件触发转移", "非法转移被拒绝"], engineerLens: "用状态机测试覆盖每条高风险转移。", pitfalls: ["用布尔变量拼状态", "缺少终态", "转移无审计"], practicePrompt: "为退款申请写一个最小状态转移表。" }
    ],
    layers: [
      { id: "state", name: "状态", question: "什么必须跨进程保存？", choices: [{ name: "业务事实", description: "输入、审批和输出版本进入持久化状态。", example: "approval=approved" }, { name: "临时推理", description: "可丢弃草稿不应成为业务事实。", example: "model scratchpad" }] }, { id: "recovery", name: "恢复", question: "中断后从哪里继续？", choices: [{ name: "最近 checkpoint", description: "读取一致快照并验证版本。", example: "step-3 checkpoint" }, { name: "从头重跑", description: "仅适合无副作用的小任务。", example: "pure summary" }] }, { id: "safety", name: "副作用", question: "失败后谁负责？", choices: [{ name: "补偿与审批", description: "不可逆动作进入人工处理。", example: "refund escalation" }, { name: "模型重试", description: "模型不能替代业务回滚。", example: "not a rollback" }] }],
    questions: [
      { concept: "durable-execution", prompt: "长任务要能在重启后恢复，第一步是什么？", correct: "定义可序列化的业务状态和恢复边界", distractors: ["只加大模型上下文", "把所有步骤放进一个 Promise"], explanation: "持久化状态让执行从运行时内存中解耦。" }, { concept: "checkpointing", prompt: "Checkpoint 最重要的收益是什么？", correct: "从最近一致点恢复并避免重复副作用", distractors: ["让模型更有创造力", "省略输入版本记录"], explanation: "它控制恢复成本和重复执行风险。" }, { concept: "human-interrupt", prompt: "外部扣费已成功但后续失败，应如何处理？", correct: "运行补偿或进入人工升级队列", distractors: ["无限自动重试", "假装整步没有发生"], explanation: "跨服务副作用需要明确的补偿和人工边界。" }, { concept: "state-graph", prompt: "为什么要用状态图？", correct: "让暂停、失败、补偿和终态可验证", distractors: ["只为了画图", "替代所有单元测试"], explanation: "状态图把可恢复执行变成可测试契约。" }
    ]
  },
  {
    modules: [
      { title: "发布先定义风险等级与门禁", summary: "把提示词、模型、检索和工具变更按影响面分类，并绑定相应证据。", visual: "schema", concept: "guardrails", whyItMatters: "AI 变更不只是代码 diff；行为和数据边界也会漂移。", coreIdeas: ["变更分级", "门禁可审计", "高风险需审批"], engineerLens: "将 prompt、eval 和配置纳入同一发布包。", pitfalls: ["只看代码审核", "默认全量发布", "门禁没有证据"], practicePrompt: "给模型升级设计低、中、高三档发布门禁。" },
      { title: "灰度把不确定性限制在可观测范围", summary: "通过用户、任务或流量切分逐步放量，并保留对照与停止阈值。", visual: "dial", concept: "online-feedback", whyItMatters: "离线通过不代表线上任务分布和用户行为相同。", coreIdeas: ["明确 cohort", "保留对照", "预设停止条件"], engineerLens: "在 trace 中写入 release ID 与实验桶。", pitfalls: ["没有基线", "只看平均值", "扩大后才定义回滚"], practicePrompt: "为新检索器写 5% 灰度和停止阈值。" },
      { title: "回滚目标是恢复可信行为", summary: "回滚同时覆盖模型路由、prompt、索引、特性开关和数据版本。", visual: "tools", concept: "regression-testing", whyItMatters: "只回滚应用代码时，线上行为仍可能由配置和数据驱动。", coreIdeas: ["版本可定位", "依赖可回退", "回滚后复测"], engineerLens: "把安全版本和变更清单保存为可执行 manifest。", pitfalls: ["人工临时改配置", "回滚没有演练", "漏掉索引版本"], practicePrompt: "列出一次 RAG 发布的回滚清单。" },
      { title: "变更评审要看失败模式而非演示", summary: "用坏样本、权限场景和降级路径证明变更不会扩大风险。", visual: "machine", concept: "red-team", whyItMatters: "漂亮 demo 容易掩盖提示注入、错误引用和工具越权。", coreIdeas: ["反例优先", "覆盖权限", "记录接受风险"], engineerLens: "将红队样本加入每个高风险发布的必跑集。", pitfalls: ["只评 happy path", "没有负责人", "风险口头确认"], practicePrompt: "为工具权限变更补两条反例测试。" }
    ],
    layers: [
      { id: "classify", name: "分级", question: "变更风险如何决定？", choices: [{ name: "影响面", description: "数据、权限和不可逆副作用越多，门禁越严。", example: "tool permission" }, { name: "提交大小", description: "行数不能代表行为风险。", example: "small but risky" }] }, { id: "release", name: "放量", question: "何时扩大？", choices: [{ name: "满足阈值", description: "质量、成本和安全指标都稳定。", example: "5% to 25%" }, { name: "观察感觉", description: "没有对照的直觉不可审计。", example: "not evidence" }] }, { id: "rollback", name: "回退", question: "停止后恢复什么？", choices: [{ name: "完整版本包", description: "代码、配置、模型和数据一起回退。", example: "release manifest" }, { name: "只回代码", description: "行为依赖仍可能留在线上。", example: "partial rollback" }] }],
    questions: [
      { concept: "guardrails", prompt: "高风险 AI 变更的发布包应包含什么？", correct: "代码、配置、评估证据和审批记录", distractors: ["只包含 UI 截图", "只包含模型名称"], explanation: "可审查发布需要复现行为和风险边界。" }, { concept: "online-feedback", prompt: "灰度扩大前最可靠的依据是什么？", correct: "预设 cohort 的质量、成本和安全阈值", distractors: ["团队觉得不错", "一次成功演示"], explanation: "灰度必须以可观测阈值而非印象驱动。" }, { concept: "regression-testing", prompt: "回滚 RAG 变更时容易遗漏什么？", correct: "索引、prompt 和模型路由版本", distractors: ["只回滚 CSS", "删除全部日志"], explanation: "线上行为由多类可配置资产共同决定。" }, { concept: "red-team", prompt: "发布评审为何需要反例？", correct: "验证失败模式和风险不会随变更扩大", distractors: ["让文档更长", "替代上线监控"], explanation: "反例提供对真实风险的直接证据。" }
    ]
  },
  {
    modules: [
      { title: "SLO 用用户结果约束系统", summary: "把成功率、可用延迟和安全失败率写成用户可感知的目标。", visual: "dial", concept: "observability", whyItMatters: "没有目标的监控只会制造仪表盘噪声。", coreIdeas: ["SLI 可计算", "目标有时间窗", "错误预算指导节奏"], engineerLens: "区分模型成功、业务成功与用户确认。", pitfalls: ["只监控 200", "目标不可行动", "没有时间窗"], practicePrompt: "为证据问答定义三个 SLI 与一个 SLO。" },
      { title: "Trace 连接一次运行的输入、决策和结果", summary: "为模型、检索、工具和审批使用同一 trace ID，定位成本和失败来源。", visual: "workbench", concept: "verification-loop", whyItMatters: "聚合指标告诉你有问题，trace 才能说明问题在哪一跳。", coreIdeas: ["关联 ID", "记录版本", "保留采样策略"], engineerLens: "trace 中脱敏记录 prompt 模板、检索证据和工具结果。", pitfalls: ["存原始秘密", "只记录耗时", "没有版本标签"], practicePrompt: "设计一次工具调用的 trace 字段。" },
      { title: "事故响应先止血，再学习", summary: "把检测、缓解、沟通、恢复和复盘写成可执行 runbook。", visual: "tools", concept: "postmortem", whyItMatters: "高压时临场发挥会放大模型和外部依赖的连锁故障。", coreIdeas: ["明确 owner", "先减小影响", "保留证据"], engineerLens: "将 kill switch、降级模板和联系人放进 runbook。", pitfalls: ["先找责任人", "没有沟通节奏", "复盘无行动项"], practicePrompt: "写一个检索服务超时的五步 runbook。" },
      { title: "容量与成本也是可靠性信号", summary: "追踪队列积压、重试风暴、token 预算和供应商限流，提前触发降级。", visual: "budget", concept: "platform-selection", whyItMatters: "成本失控和限流会以超时、空响应和体验劣化的形式出现。", coreIdeas: ["预算阈值", "限流预警", "降级路径"], engineerLens: "将模型 tiers 与缓存策略绑定到 SLO。", pitfalls: ["只在月末看账单", "无 backpressure", "默认用最贵模型"], practicePrompt: "为流量峰值设计一个模型降级策略。" }
    ],
    layers: [
      { id: "signal", name: "信号", question: "先看哪个健康度？", choices: [{ name: "用户 SLI", description: "成功、延迟和安全结果映射用户任务。", example: "cited-answer success" }, { name: "单机指标", description: "它不能独立代表任务完成。", example: "CPU only" }] }, { id: "diagnose", name: "诊断", question: "如何定位一次失败？", choices: [{ name: "端到端 trace", description: "关联输入、版本、工具与输出。", example: "trace ID" }, { name: "平均日志", description: "聚合会抹掉失败链路。", example: "aggregate only" }] }, { id: "respond", name: "响应", question: "异常时先做什么？", choices: [{ name: "减少影响", description: "降级或关闭高风险动作后再调查。", example: "kill switch" }, { name: "继续放量", description: "会扩大错误预算消耗。", example: "ignore alert" }] }],
    questions: [
      { concept: "observability", prompt: "AI SLO 应优先描述什么？", correct: "用户任务的成功、延迟和安全结果", distractors: ["单次 HTTP 200", "团队在线时长"], explanation: "可靠性目标必须映射到用户可感知结果。" }, { concept: "verification-loop", prompt: "定位一次错误引用最关键的数据是什么？", correct: "关联模型、检索和工具的端到端 trace", distractors: ["只看月度平均", "只看 CSS 版本"], explanation: "trace 保留了跨组件的因果链。" }, { concept: "postmortem", prompt: "事故响应的第一优先级是什么？", correct: "先降低用户影响并保留证据", distractors: ["马上追责", "等下周再处理"], explanation: "止血和证据让后续恢复、复盘可执行。" }, { concept: "platform-selection", prompt: "模型限流如何影响 SRE？", correct: "需要预算、队列和降级策略提前控制", distractors: ["只影响财务", "与用户体验无关"], explanation: "限流与成本会直接转化为延迟和失败。" }
    ]
  },
  {
    modules: [
      { title: "项目发现从用户痛点而非模型能力开始", summary: "访谈真实任务、当前替代方案和失败成本，压缩为一个可验证机会。", visual: "workbench", concept: "business-validation", whyItMatters: "“做聊天机器人”不是问题定义，无法判断是否值得投入。", coreIdeas: ["用户可识别", "痛点可观察", "替代方案存在"], engineerLens: "记录任务频率、时长、错误代价和受影响角色。", pitfalls: ["先选模型", "只访谈朋友", "把需求当方案"], practicePrompt: "为一个内部知识问答项目写问题访谈提纲。" },
      { title: "成功指标要包含质量、效率与风险", summary: "为试点定义北极星结果、护栏指标和明确的失败阈值。", visual: "dial", concept: "eval-dataset", whyItMatters: "没有指标会让团队把活跃度或调用量误当价值。", coreIdeas: ["前置指标", "质量护栏", "停机条件"], engineerLens: "用真实任务样本建立上线前后的可比基线。", pitfalls: ["指标太多", "没有 baseline", "只量化速度"], practicePrompt: "为客服摘要试点写一个成功指标和两个护栏。" },
      { title: "范围切片让验证在两周内发生", summary: "选择单一角色、单一高频任务和一个受控数据源，拒绝一开始做平台。", visual: "schema", concept: "capstone-scope", whyItMatters: "范围越大，反馈越晚，模型不确定性越难隔离。", coreIdeas: ["一个用户", "一个任务", "一个证据来源"], engineerLens: "把不做什么写进 project brief。", pitfalls: ["全公司上线", "多代理愿景", "无验收边界"], practicePrompt: "把一个“智能运营助手”切成两周 MVP。" },
      { title: "假设需要可证伪的实验", summary: "把价值、可用性、可行性和风险假设分别写成观察计划。", visual: "machine", concept: "prompt-assets", whyItMatters: "把所有不确定性混在一起会让失败后无法知道该改产品还是模型。", coreIdeas: ["假设可测", "证据预先定义", "学习决定下一步"], engineerLens: "每个假设绑定样本、负责人、截止时间和决策规则。", pitfalls: ["只收正反馈", "实验没有对照", "结果不影响路线"], practicePrompt: "写一条可证伪的 AI 辅助写作价值假设。" }
    ],
    layers: [
      { id: "problem", name: "问题", question: "项目从哪里开始？", choices: [{ name: "用户任务", description: "观察高频、昂贵且可改进的工作。", example: "support triage" }, { name: "模型能力", description: "能力本身不等于机会。", example: "use GPT" }] }, { id: "measure", name: "衡量", question: "如何证明价值？", choices: [{ name: "基线与护栏", description: "同时观察效率、质量和风险。", example: "time + citation accuracy" }, { name: "调用次数", description: "使用不等于完成任务。", example: "token count" }] }, { id: "scope", name: "范围", question: "首个验证多大？", choices: [{ name: "可控切片", description: "一个角色、任务和数据源。", example: "one team workflow" }, { name: "平台愿景", description: "大范围延迟学习。", example: "company copilot" }] }],
    questions: [
      { concept: "business-validation", prompt: "项目发现阶段最先验证什么？", correct: "真实用户任务、替代方案和失败成本", distractors: ["最新模型排行榜", "首页配色"], explanation: "机会必须建立在可观察的用户问题上。" }, { concept: "eval-dataset", prompt: "成功指标为什么要有护栏？", correct: "避免效率提升伴随质量或风险恶化", distractors: ["让报表更复杂", "替代用户访谈"], explanation: "AI 产品通常需要多维度的成功约束。" }, { concept: "capstone-scope", prompt: "两周 MVP 的正确切法是什么？", correct: "限制在一个角色、任务和数据源", distractors: ["一次覆盖全部部门", "先造通用平台"], explanation: "窄切片带来更快、更可解释的反馈。" }, { concept: "prompt-assets", prompt: "好的项目假设应具备什么？", correct: "可被预定义证据证伪并指导下一步", distractors: ["越模糊越灵活", "只收正面反馈"], explanation: "假设是学习和决策的工具，而不是愿望。" }
    ]
  },
  {
    modules: [
      { title: "边界图先回答谁拥有哪项决策", summary: "划分客户端、服务层、模型、检索、工具和人工控制面，明确输入与输出。", visual: "schema", concept: "server-boundary", whyItMatters: "架构图如果不画所有权和信任边界，风险会被藏进箭头里。", coreIdeas: ["职责单一", "信任边界", "接口可演进"], engineerLens: "为每条跨边界调用写契约、超时和失败处理。", pitfalls: ["模型直连数据库", "前端持有密钥", "边界只按技术栈划分"], practicePrompt: "画出你的 AI 项目的六个责任边界。" },
      { title: "数据契约让输入、证据和输出可验证", summary: "定义 schema、来源、版本、保留期、敏感级别和字段级校验。", visual: "machine", concept: "document-ingestion", whyItMatters: "模糊数据会让检索、评估和审计都失去可重复性。", coreIdeas: ["schema version", "provenance", "validation"], engineerLens: "在写入和读取两端都校验契约。", pitfalls: ["只用自由文本", "丢失来源", "无迁移策略"], practicePrompt: "为知识片段定义最小 JSON 契约。" },
      { title: "权限应贯穿检索和工具执行", summary: "把主体、资源、动作和策略传递到每一层，避免模型绕过授权。", visual: "tools", concept: "permission-filtering", whyItMatters: "服务端有鉴权不代表向量检索和外部工具也安全。", coreIdeas: ["least privilege", "policy decision", "audit trail"], engineerLens: "检索过滤条件来自身份，而不是模型生成。", pitfalls: ["模型决定权限", "只在 UI 隐藏按钮", "跨租户缓存"], practicePrompt: "写出文档检索的主体、资源、动作和策略。" },
      { title: "风险清单把未知变成可管理决策", summary: "分别记录安全、质量、成本、依赖和合规风险，并写缓解和 owner。", visual: "workbench", concept: "guardrails", whyItMatters: "项目失败往往不是因为没有想到风险，而是风险没有进入交付计划。", coreIdeas: ["概率与影响", "缓解可验证", "接受风险有负责人"], engineerLens: "将高风险项连接到测试、监控或发布门禁。", pitfalls: ["风险表无人维护", "用“注意”代替缓解", "不写残余风险"], practicePrompt: "为带工具的 Agent 写三项风险及缓解措施。" }
    ],
    layers: [
      { id: "ownership", name: "所有权", question: "谁做确定性决策？", choices: [{ name: "服务与策略层", description: "权限、状态和提交由系统负责。", example: "policy service" }, { name: "模型", description: "模型只给候选，不拥有权限。", example: "proposal" }] }, { id: "contract", name: "契约", question: "数据如何可靠传递？", choices: [{ name: "版本化 schema", description: "输入、来源与输出可验证。", example: "document v2" }, { name: "隐式文本", description: "难以迁移和审计。", example: "free form" }] }, { id: "risk", name: "风险", question: "发现风险后怎么办？", choices: [{ name: "绑定缓解与 owner", description: "让风险进入日常交付和验收。", example: "mitigation test" }, { name: "记录后忽略", description: "不会降低暴露。", example: "stale spreadsheet" }] }],
    questions: [
      { concept: "server-boundary", prompt: "架构边界图最需要表达什么？", correct: "职责、信任边界和失败处理", distractors: ["框框颜色", "供应商 logo 数量"], explanation: "它们决定系统的安全性和可演进性。" }, { concept: "document-ingestion", prompt: "数据契约为何要有来源与版本？", correct: "让检索、评估和审计可复现", distractors: ["方便生成更长文本", "避免所有校验"], explanation: "来源和版本是可信数据链的基础。" }, { concept: "permission-filtering", prompt: "检索权限过滤应由谁提供？", correct: "身份和策略系统提供的确定性条件", distractors: ["模型临时判断", "前端隐藏按钮"], explanation: "授权不能交给概率性组件。" }, { concept: "guardrails", prompt: "风险清单的有效条目应包含什么？", correct: "影响、缓解方式、负责人和残余风险", distractors: ["一句“注意安全”", "只写风险名称"], explanation: "可管理风险必须能触发行动和验收。" }
    ]
  },
  {
    modules: [
      { title: "实现从最小可走通的任务切片开始", summary: "先连接一个用户输入、一份证据、一条策略和一个可见输出，再扩展能力。", visual: "workbench", concept: "integration-strategy", whyItMatters: "过早搭建通用框架会掩盖真正的产品和评估问题。", coreIdeas: ["垂直切片", "真实接口", "可演示结果"], engineerLens: "每次迭代都保留可运行的 end-to-end 路径。", pitfalls: ["先抽象平台", "mock 掩盖集成", "没有错误体验"], practicePrompt: "定义一个带来源证据的问答最小切片。" },
      { title: "Eval 要覆盖正确、无答案和危险答案", summary: "建立带期望、依据和风险标签的 golden set，测试模型和系统联合行为。", visual: "schema", concept: "eval-dataset", whyItMatters: "只测回答流畅会奖励自信的幻觉。", coreIdeas: ["代表性样本", "可判定预期", "版本管理"], engineerLens: "将评估集分为开发、回归和线上新样本。", pitfalls: ["只用十条 demo", "没有拒答样本", "人工标准不一致"], practicePrompt: "为知识问答写三条 golden 样本：正确、无答案、越权。" },
      { title: "发布检查把离线证据接到线上保护", summary: "在上线前核对评估阈值、权限、成本预算、回滚和监控。", visual: "tools", concept: "deployment-plan", whyItMatters: "通过测试不等于具备安全运行条件。", coreIdeas: ["go/no-go", "责任明确", "回滚可演练"], engineerLens: "用机器可读 checklist 驱动 CI 与发布审批。", pitfalls: ["上线当天补检查", "没有 owner", "检查项无法证明"], practicePrompt: "为试点发布写一份 8 项 go/no-go 清单。" },
      { title: "线上反馈变成下一轮测试资产", summary: "将用户纠正、失败 trace 和边缘案例脱敏后转为回归样本。", visual: "dial", concept: "online-feedback", whyItMatters: "真实分布总会超过初始评估集，忽略反馈等于重复犯错。", coreIdeas: ["反馈分类", "隐私处理", "进入回归"], engineerLens: "为每条反馈指定是否修复、何时评估和如何验证。", pitfalls: ["只收点赞", "直接训练原始数据", "反馈无人消化"], practicePrompt: "设计从坏回答到回归用例的处理流程。" }
    ],
    layers: [
      { id: "build", name: "实现", question: "第一版应先做什么？", choices: [{ name: "真实垂直切片", description: "尽早验证端到端责任链。", example: "input to cited answer" }, { name: "通用框架", description: "会延迟真实反馈。", example: "platform first" }] }, { id: "evaluate", name: "评估", question: "什么样本必须被测？", choices: [{ name: "成功与失败", description: "正确、拒答、越权和边缘情况都需覆盖。", example: "golden set" }, { name: "演示问题", description: "happy path 不代表质量。", example: "demo only" }] }, { id: "release", name: "发布", question: "谁决定上线？", choices: [{ name: "可验证门禁", description: "评估、权限、预算和回滚共同决定。", example: "go/no-go" }, { name: "单一负责人感觉", description: "缺少可复查证据。", example: "gut feel" }] }],
    questions: [
      { concept: "integration-strategy", prompt: "AI 项目首个实现应优先选择什么？", correct: "一个真实、可演示的端到端任务切片", distractors: ["先建通用平台", "先做所有角色"], explanation: "垂直切片最快暴露产品、集成和质量问题。" }, { concept: "eval-dataset", prompt: "Golden set 至少要包含哪类样本？", correct: "正确答案、无答案和危险/越权答案", distractors: ["只有最佳案例", "只有模型喜欢的问题"], explanation: "可靠评估必须测到系统该拒绝或升级的场景。" }, { concept: "deployment-plan", prompt: "上线检查为什么需要回滚演练？", correct: "证明异常时能恢复可信行为", distractors: ["让发布更慢", "替代监控"], explanation: "没有演练的回滚通常只是文档愿望。" }, { concept: "online-feedback", prompt: "坏回答的正确后续是什么？", correct: "脱敏分类后变成可验证的回归资产", distractors: ["直接忽略", "立即把原文喂给模型"], explanation: "反馈只有进入评估闭环才会持续改善产品。" }
    ]
  },
  {
    modules: [
      { title: "复盘重建事实链，而不是重讲故事", summary: "按时间线整理输入、决策、版本、信号、影响和恢复动作。", visual: "workbench", concept: "postmortem", whyItMatters: "没有事实链，团队只能得到模糊的“下次注意”。", coreIdeas: ["无责事实", "因果可追踪", "证据可链接"], engineerLens: "从 trace、发布记录和用户反馈自动汇集证据。", pitfalls: ["先归因个人", "只写结论", "遗漏检测延迟"], practicePrompt: "为一次错误引用事故写时间线骨架。" },
      { title: "能力证据要能被外部复核", summary: "保存设计决策、架构图、评估结果、发布记录和反思，形成项目档案。", visual: "schema", concept: "delivery-plan", whyItMatters: "学完概念不等于能交付；证据让能力可展示、可迭代。", coreIdeas: ["产物可访问", "结论有依据", "改进可跟踪"], engineerLens: "每个项目里程碑链接到一个可验证 artifact。", pitfalls: ["只留截图", "没有数据来源", "成果散落聊天记录"], practicePrompt: "列出你的项目档案应包含的五项证据。" },
      { title: "产品飞轮把使用、质量和路线连起来", summary: "把用户任务、线上反馈、评估集、改进项和价值指标构成可重复的学习循环。", visual: "dial", concept: "verification-loop", whyItMatters: "没有闭环的功能迭代会不断追逐新模型而不是解决用户问题。", coreIdeas: ["反馈入库", "评估回归", "指标驱动优先级"], engineerLens: "每个改进必须说明影响哪个指标和哪个风险。", pitfalls: ["只追新功能", "反馈不入评估", "无优先级依据"], practicePrompt: "画出你的产品反馈到下一次发布的闭环。" },
      { title: "下一轮学习由能力缺口决定", summary: "根据项目证据识别薄弱环节，选择一个可验证的下一项能力练习。", visual: "machine", concept: "capstone-scope", whyItMatters: "学习路线不是打卡清单，而是不断缩小真实交付差距。", coreIdeas: ["缺口具体", "练习有限", "产出可检验"], engineerLens: "把薄弱概念映射到下一次项目任务和复盘标准。", pitfalls: ["泛泛地“继续学习”", "一次补所有短板", "不复测"], practicePrompt: "从项目证据中选一个能力缺口并写 60 分钟练习。" }
    ],
    layers: [
      { id: "facts", name: "事实", question: "复盘依据是什么？", choices: [{ name: "运行与发布证据", description: "时间线和 trace 支撑因果判断。", example: "release + trace" }, { name: "记忆和印象", description: "高压后很容易失真。", example: "retrospective only" }] }, { id: "evidence", name: "能力", question: "如何证明已经掌握？", choices: [{ name: "可复核产物", description: "设计、评估和发布记录形成档案。", example: "project evidence" }, { name: "完成打卡", description: "无法展示工程判断。", example: "checkbox only" }] }, { id: "loop", name: "迭代", question: "下一步如何选择？", choices: [{ name: "指标和能力缺口", description: "从真实问题选择下一项练习。", example: "targeted practice" }, { name: "追逐热度", description: "不保证改善交付能力。", example: "latest trend" }] }],
    questions: [
      { concept: "postmortem", prompt: "有效复盘的起点是什么？", correct: "基于时间线、版本和运行证据重建事实", distractors: ["先确定谁的错", "只记录最终结论"], explanation: "事实链让改进措施有可信因果基础。" }, { concept: "delivery-plan", prompt: "能力档案最应保留什么？", correct: "可复核的决策、架构、评估和发布证据", distractors: ["只保留漂亮截图", "只保留聊天记录"], explanation: "工程能力需要能被他人检查的产物。" }, { concept: "verification-loop", prompt: "产品飞轮为何需要把反馈转为评估集？", correct: "让真实失败在后续改动中可回归验证", distractors: ["为了增加数据量", "替代用户价值指标"], explanation: "反馈进入闭环才会稳定提高产品质量。" }, { concept: "capstone-scope", prompt: "如何选择下一项学习任务？", correct: "从证据识别一个具体能力缺口并设置可验证产出", distractors: ["随便选择热门主题", "同时补齐所有短板"], explanation: "聚焦缺口能让学习继续服务真实交付。" }
    ]
  }
];

const weights = [30, 25, 25, 20];

export const supplementalLessons: LessonPage[] = seeds.map((seed, index) => {
  const day = curriculum[index + 13];
  return {
    ...day,
    status: "available",
    hero: day.capability,
    conceptIntro: `用四个相互约束的工程判断完成“${day.capability}”。`,
    decisionTitle: `${day.title}：责任关系图`,
    decisionIntro: "输入、状态、策略、执行证据和反馈共同决定结果；模型只能参与语义判断，不能替代系统控制。",
    decisionExample: "先写清可验证的边界和失败处理，再选择模型、框架或自动化平台。",
    modules: seed.modules.map((module, moduleIndex) => ({ ...module, id: `${day.id}-m${moduleIndex + 1}`, eyebrow: `Concept ${String(moduleIndex + 1).padStart(2, "0")}` })),
    decisionLayers: seed.layers,
    questions: seed.questions.map((question, questionIndex) => ({
      id: `${day.id}-q${questionIndex + 1}`,
      type: "single" as const,
      concept: question.concept,
      weight: weights[questionIndex],
      prompt: question.prompt,
      scenario: `请按“${day.title}”的真实工程约束判断。`,
      options: [option("a", question.correct, true), ...question.distractors.map((label, optionIndex) => option(String.fromCharCode(98 + optionIndex), label, false))],
      explanation: question.explanation
    }))
  };
});
