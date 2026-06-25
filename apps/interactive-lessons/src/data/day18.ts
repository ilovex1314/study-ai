import { createP0Lesson } from "./p0LessonFactory";

export const day18Lesson = createP0Lesson({
  id: "day18",
  phase: "Day18",
  title: "AI SRE 与事故响应",
  summary: "让 AI 功能具备可观测、可降级、可回滚和可复盘能力。",
  capabilityGoal: "为 AI 功能定义 SLO、trace、降级回滚和事故复盘机制。",
  verifiableOutput: "两份 runbook 与 trace 分析。",
  diagramType: "state",
  hero: "让 AI 功能在异常时可诊断、可止血、可学习",
  conceptIntro: "用 SLO、Trace、回滚降级和事故复盘建立 AI SRE 能力。",
  decisionTitle: "AI 事故响应：信号、分诊、止血、恢复和复盘",
  decisionIntro: "AI 故障常跨越检索、模型、工具、队列和前端体验；SRE 设计要把用户结果、trace、版本和降级路径连起来。",
  decisionExample: "知识问答引用错误时，值班人通过 trace 找到索引版本，关闭新版检索器，回滚到上一索引并把失败样本加入回归。",
  modules: [
    { title: "SLO 用用户结果约束系统", summary: "把成功率、可用延迟和安全失败率写成用户可感知的目标。", visual: "dial", concept: "slo", whyItMatters: "没有目标的监控只会制造仪表盘噪声。", coreIdeas: ["SLI 可计算。", "目标有时间窗。", "错误预算指导节奏。"], engineerLens: "区分模型成功、业务成功与用户确认。", pitfalls: ["只监控 200", "目标不可行动", "没有时间窗"], practicePrompt: "为证据问答定义三个 SLI 与一个 SLO。", source: { label: "Google SRE SLO", url: "https://sre.google/sre-book/service-level-objectives/" } },
    { title: "Trace 连接一次运行的输入、决策和结果", summary: "为模型、检索、工具和审批使用同一 trace ID，定位成本和失败来源。", visual: "workbench", concept: "trace-observability", whyItMatters: "聚合指标告诉你有问题，trace 才能说明问题在哪一跳。", coreIdeas: ["关联 ID。", "记录版本。", "保留采样策略。"], engineerLens: "trace 中脱敏记录 prompt 模板、检索证据和工具结果。", pitfalls: ["存原始秘密", "只记录耗时", "没有版本标签"], practicePrompt: "设计一次工具调用的 trace 字段。", source: { label: "OpenTelemetry traces", url: "https://opentelemetry.io/docs/concepts/signals/traces/" } },
    { title: "回滚与降级先减少用户影响", summary: "异常时优先通过 kill switch、轻量模型、关闭高风险工具或回退索引止血。", visual: "tools", concept: "rollback-degradation", whyItMatters: "AI 故障常会持续生成错误结果，必须先缩小影响面。", coreIdeas: ["先止血再根因。", "降级路径预先演练。", "回滚覆盖配置和数据。"], engineerLens: "为每个高风险资产保存安全版本。", pitfalls: ["只回代码", "无 kill switch", "继续放量排查"], practicePrompt: "为检索超时写三档降级策略。" },
    { title: "事故复盘把失败变成系统改进", summary: "把检测、缓解、沟通、恢复和复盘写成可执行 runbook。", visual: "schema", concept: "incident-postmortem", whyItMatters: "无责复盘能把失败样本、监控缺口和 owner 变成下一轮行动。", coreIdeas: ["时间线事实。", "行动项有 owner。", "复盘进入门禁。"], engineerLens: "从 trace、发布记录和用户反馈生成复盘证据。", pitfalls: ["先追责", "无行动项", "复盘不更新测试"], practicePrompt: "写一个错误引用事故的五步 runbook。" }
  ],
  decisionLayers: [
    { id: "detect", name: "检测", question: "系统何时算不健康？", choices: [{ name: "用户 SLO", description: "成功、延迟和安全失败率触发告警。", example: "cited answer success" }, { name: "单机指标", description: "不能单独代表用户结果。", example: "CPU only" }] },
    { id: "diagnose", name: "分诊", question: "如何定位一次失败？", choices: [{ name: "端到端 Trace", description: "关联模型、检索、工具和版本。", example: "trace id" }, { name: "平均日志", description: "聚合会抹掉链路。", example: "avg latency" }] },
    { id: "recover", name: "恢复", question: "异常时先做什么？", choices: [{ name: "降级回滚", description: "减少影响并保留证据。", example: "kill switch" }, { name: "继续放量", description: "会扩大错误预算消耗。", example: "ignore alert" }] }
  ],
  questions: [
    { concept: "slo", prompt: "AI SLO 应优先描述什么？", correct: "用户任务的成功、延迟和安全结果", distractors: ["单次 HTTP 200", "团队在线时长"], explanation: "可靠性目标必须映射到用户可感知结果。" },
    { concept: "trace-observability", prompt: "定位一次错误引用最关键的数据是什么？", correct: "关联模型、检索和工具的端到端 trace", distractors: ["只看月度平均", "只看 CSS 版本"], explanation: "trace 保留跨组件因果链。" },
    { concept: "rollback-degradation", prompt: "事故响应的第一优先级是什么？", correct: "先降低用户影响并保留证据", distractors: ["马上追责", "等下周再处理"], explanation: "止血和证据让恢复、复盘可执行。" },
    { concept: "incident-postmortem", prompt: "有效事故复盘必须产出什么？", correct: "事实时间线、根因、行动项、owner 和回归样本", distractors: ["一句下次注意", "只写最终道歉"], explanation: "复盘要让系统变强，而不是只总结情绪。" }
  ],
  references: [
    { label: "Google SRE SLO", url: "https://sre.google/sre-book/service-level-objectives/" },
    { label: "OpenTelemetry traces", url: "https://opentelemetry.io/docs/concepts/signals/traces/" },
    { label: "OpenAI production best practices", url: "https://platform.openai.com/docs/guides/production-best-practices" }
  ]
});
