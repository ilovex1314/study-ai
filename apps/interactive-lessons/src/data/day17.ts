import { createP0Lesson } from "./p0LessonFactory";

export const day17Lesson = createP0Lesson({
  id: "day17",
  phase: "Day17",
  title: "成本、延迟与容量工程",
  summary: "把 token、检索、工具调用和队列转化为预算、路由和服务目标。",
  capabilityGoal: "把 token、检索、工具调用和队列转化为预算、服务目标、路由规则和容量计划。",
  verifiableOutput: "成本/延迟预算表与模型路由策略。",
  diagramType: "feedback",
  hero: "把 AI 成本和尾延迟纳入工程控制",
  conceptIntro: "用单位经济性、模型路由、缓存限流和容量保护管理生产 AI 成本。",
  decisionTitle: "成本延迟控制：预算、路由、指标与降级",
  decisionIntro: "任务请求先进入预算和风险判断，再选择检索、缓存、模型与工具；运行指标回写成本、延迟和质量表，驱动下一轮路由。",
  decisionExample: "AI 教练把概念解释路由到轻量模型，把架构评审路由到高质量模型，并为每类任务记录单位成本、p95 延迟和采纳率。",
  modules: [
    { title: "单位经济性让每类任务有成本边界", summary: "按任务记录输入 token、输出 token、检索、工具、存储和人工审核成本。", visual: "budget", concept: "unit-economics", whyItMatters: "没有单位成本，团队无法判断产品定价、模型选择和功能优先级。", coreIdeas: ["按任务计费。", "区分模型和工具成本。", "连接质量收益。"], engineerLens: "为每个 task_type 保存 cost breakdown。", pitfalls: ["只看总账单", "不分任务类型", "忽略人工审核"], practicePrompt: "为概念解释、代码审查、项目评审建立成本表。", source: { label: "OpenAI latency optimization", url: "https://platform.openai.com/docs/guides/latency-optimization" } },
    { title: "模型路由按风险和预算选择能力", summary: "按任务风险、质量要求、上下文长度和预算选择模型或降级路径。", visual: "machine", concept: "model-routing", whyItMatters: "最贵模型不应成为默认路径，除非评估证明收益超过成本。", coreIdeas: ["低风险走轻量。", "高风险走强模型加审批。", "失败可降级。"], engineerLens: "用 route table 显式描述任务到模型的映射。", pitfalls: ["所有请求都用最贵模型", "无降级路径", "路由不看质量"], practicePrompt: "写三类任务的模型路由规则。" },
    { title: "缓存与限流控制重复消耗", summary: "缓存适合稳定、低风险、可复用的中间结果；重试和并发必须有预算。", visual: "dial", concept: "cache-rate-limit", whyItMatters: "无限重试和无边界检索会放大成本和尾延迟。", coreIdeas: ["权限敏感内容慎缓存。", "重试区分错误类型。", "限流要可解释。"], engineerLens: "把 cache key、TTL、tenant 和 invalidation 写入设计。", pitfalls: ["跨租户缓存", "策略拒绝也重试", "检索 topK 无上限"], practicePrompt: "为知识问答设计缓存和重试预算。" },
    { title: "容量保护让预算超限时仍可服务", summary: "预算超限时要有减少检索、换轻量模型、异步处理或稍后返回的明确降级。", visual: "tools", concept: "capacity-protection", whyItMatters: "成本失控最终会表现为超时、空响应和用户体验劣化。", coreIdeas: ["p95 比平均值关键。", "队列积压触发降级。", "预算阈值有 owner。"], engineerLens: "将 SLO、成本预算和队列阈值绑定到保护动作。", pitfalls: ["月末才看账单", "无 backpressure", "峰值时继续全量调用"], practicePrompt: "为预算超限设计三档降级。" }
  ],
  decisionLayers: [
    { id: "budget", name: "预算", question: "每次任务花费多少？", choices: [{ name: "单位成本表", description: "按任务和组件拆成本。", example: "token + retrieval + tool" }, { name: "总账单", description: "不能指导路由。", example: "monthly cost" }] },
    { id: "route", name: "路由", question: "用哪个模型和路径？", choices: [{ name: "风险/质量路由", description: "按目标选择模型、缓存和工具。", example: "review -> high quality" }, { name: "固定模型", description: "成本和延迟不可控。", example: "always biggest" }] },
    { id: "protect", name: "保护", question: "超限后怎么办？", choices: [{ name: "降级策略", description: "减检索、换模型、排队或稍后通知。", example: "async fallback" }, { name: "无限重试", description: "会制造重试风暴。", example: "retry loop" }] }
  ],
  questions: [
    { concept: "unit-economics", weight: 25, prompt: "AI 单位经济性最应该按什么记录？", correct: "按任务记录 token、检索、工具、存储和人工审核成本", distractors: ["只看月度总账单", "只看页面访问量"], explanation: "按任务拆解才能指导模型选择和定价。" },
    { concept: "model-routing", weight: 25, prompt: "模型路由的核心依据是什么？", correct: "任务风险、质量要求、上下文长度和预算", distractors: ["永远使用最贵模型", "只看模型名字"], explanation: "路由是质量、成本和风险的工程折中。" },
    { concept: "cache-rate-limit", weight: 25, prompt: "缓存最需要避免什么？", correct: "跨租户或权限敏感内容被错误复用", distractors: ["缓存任何稳定结果", "设置 TTL"], explanation: "缓存必须尊重权限、新鲜度和失效策略。" },
    { concept: "capacity-protection", weight: 25, prompt: "预算或容量超限时正确动作是什么？", correct: "触发明确降级、排队、限流或轻量模型路由", distractors: ["无限重试", "继续扩大上下文"], explanation: "容量保护要减少影响而不是放大负载。" }
  ],
  references: [
    { label: "OpenAI latency optimization", url: "https://platform.openai.com/docs/guides/latency-optimization" },
    { label: "OpenAI production best practices", url: "https://platform.openai.com/docs/guides/production-best-practices" },
    { label: "Sentry performance metrics", url: "https://docs.sentry.io/product/performance/metrics/" }
  ]
});
