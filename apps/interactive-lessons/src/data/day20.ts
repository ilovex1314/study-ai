import { createP0Lesson } from "./p0LessonFactory";

export const day20Lesson = createP0Lesson({
  id: "day20",
  phase: "Day20",
  title: "产品战略与能力飞轮",
  summary: "将学习能力做成持续增强的产品，而不是一次性课程目录。",
  capabilityGoal: "把能力证据、北极星指标、护栏指标、实验设计和 90 天路线图连接起来。",
  verifiableOutput: "提交一个 P0 课程实验方案，包含北极星指标、三项护栏、假设、成功阈值、停止条件和 90 天路线图。",
  diagramType: "flywheel",
  hero: "课程完成不等于能力形成，证据和实验才会推动下一轮产品成长。",
  conceptIntro: "AI 学习产品要持续收集能力证据、观察迁移效果、设计实验，并把内容、工具和评估一起迭代。",
  decisionTitle: "产品战略与能力飞轮：证据驱动增长图",
  decisionIntro: "学习行为形成能力证据，能力画像驱动下一步任务和实验，实验结果再改进课程与产品路线。",
  decisionExample: "安全题放弃率高时，产品团队实验更换案例和复盘提示，并观察能力证据质量是否提高。",
  modules: [
    { title: "能力证据比学习活跃度更重要", summary: "任务提交、架构判断、测验、项目结果和复盘比阅读时长更能证明能力迁移。", visual: "schema", concept: "capability-evidence", whyItMatters: "打卡不能证明能交付，证据才能被复核和展示。", coreIdeas: ["project artifact", "rubric evidence", "review history"], engineerLens: "让每个能力标签能追溯到一个具体 artifact。", pitfalls: ["只看日活", "只留截图", "证据散落聊天"], practicePrompt: "列出三阶段最能证明能力迁移的证据。" },
    { title: "北极星指标连接用户价值和增长", summary: "例如每周完成可复核项目证据的学习者，而不是只看访问量。", visual: "dial", concept: "north-star-metric", whyItMatters: "错误指标会让团队优化热闹程度而不是学习成果。", coreIdeas: ["user value", "frequency", "quality signal"], engineerLens: "北极星指标要有数据来源和反作弊解释。", pitfalls: ["用 DAU 替代成果", "指标无法行动", "只追完成率"], practicePrompt: "定义一个 P0 学习工作台北极星指标。" },
    { title: "实验设计让课程改动可学习", summary: "每次改课程、题目或反馈都要定义假设、样本、指标、成功阈值、停止条件和复盘。", visual: "workbench", concept: "experiment-design", whyItMatters: "没有实验，团队不知道是内容、题目还是用户基础造成变化。", coreIdeas: ["hypothesis", "guardrail", "stop condition"], engineerLens: "把失败结果也写入路线图决策。", pitfalls: ["只收正反馈", "无对照", "实验不影响优先级"], practicePrompt: "为安全课程改写设计一个可证伪实验。" },
    { title: "路线图策略来自证据和能力缺口", summary: "90 天路线图应把证据、实验和能力缺口转成优先级，而不是追逐热门模型。", visual: "tools", concept: "roadmap-strategy", whyItMatters: "产品路线要服务真实交付差距。", coreIdeas: ["capability gap", "experiment result", "priority tradeoff"], engineerLens: "每个路线项说明影响哪个指标和哪个风险。", pitfalls: ["同时补所有短板", "跟风新模型", "没有停止条件"], practicePrompt: "从能力证据中选一个缺口并写下一轮 60 分钟练习。" }
  ],
  decisionLayers: [
    { id: "evidence", name: "证据", question: "如何证明能力？", choices: [{ name: "可复核产物", description: "架构、评估、发布和复盘记录支撑判断。", example: "project evidence" }, { name: "访问次数", description: "活跃不等于掌握。", example: "page views" }] },
    { id: "metric", name: "指标", question: "什么驱动产品？", choices: [{ name: "价值型北极星", description: "连接学习成果和产品增长。", example: "weekly evidence" }, { name: "单一活跃度", description: "容易牺牲质量。", example: "DAU only" }] },
    { id: "strategy", name: "策略", question: "下一步做什么？", choices: [{ name: "实验和缺口", description: "依据证据选择优先级。", example: "targeted roadmap" }, { name: "追逐热度", description: "不保证解决用户问题。", example: "latest model" }] }
  ],
  questions: [
    { concept: "capability-evidence", weight: 25, prompt: "能力证据和学习活跃度有什么区别？", correct: "能力证据能被复核并证明真实任务迁移", distractors: ["二者完全相同", "活跃度一定更可靠"], explanation: "能力需要由产物和判断支撑。" },
    { concept: "north-star-metric", weight: 25, prompt: "什么样的指标适合作为北极星指标？", correct: "能连接用户价值、产品增长和高质量行为的指标", distractors: ["只看页面访问", "越复杂越好"], explanation: "北极星指标要指导产品优先级。" },
    { concept: "experiment-design", weight: 25, prompt: "实验设计为什么需要停止条件？", correct: "避免无效或有害改动持续消耗用户和资源", distractors: ["为了让实验不能失败", "为了隐藏结果"], explanation: "停止条件让实验可治理。" },
    { concept: "roadmap-strategy", weight: 25, prompt: "如何选择下一项学习任务？", correct: "从证据识别一个具体能力缺口并设置可验证产出", distractors: ["随便选择热门主题", "同时补齐所有短板"], explanation: "聚焦缺口能让学习继续服务真实交付。" }
  ],
  references: [
    { label: "Lenny's Newsletter North Star Metric", url: "https://www.lennysnewsletter.com/p/north-star-metric" },
    { label: "Nielsen Norman Group A/B testing", url: "https://www.nngroup.com/articles/ab-testing/" },
    { label: "OpenAI Evals guide", url: "https://platform.openai.com/docs/guides/evals" }
  ]
});
