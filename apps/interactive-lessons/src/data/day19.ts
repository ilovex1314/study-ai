import { createP0Lesson } from "./p0LessonFactory";

export const day19Lesson = createP0Lesson({
  id: "day19",
  phase: "Day19",
  title: "团队协作与发布治理",
  summary: "把 Prompt、模型、数据集和工作流作为可审查、可回滚的发布物。",
  capabilityGoal: "把 Prompt、模型、数据集、检索配置和工作流作为可审查、可回滚、可灰度的发布物。",
  verifiableOutput: "提交一份 RAG 改动发布 checklist，覆盖版本、评审、eval、红队、预算、灰度、回滚和 owner。",
  diagramType: "gate",
  hero: "AI 产品行为由代码、prompt、模型、数据、工具和策略共同决定。",
  conceptIntro: "发布治理要把所有会改变 AI 行为的资产纳入版本、评审、门禁、灰度和回滚。",
  decisionTitle: "团队协作与发布治理：AI 资产门禁图",
  decisionIntro: "资产变更先评审，再通过离线 eval、红队和预算门禁，灰度期间用 trace 监控质量与风险。",
  decisionExample: "RAG 重排策略先跑 golden set，再对内部用户灰度 10%，每条回答 trace 记录 prompt、模型和索引版本。",
  modules: [
    { title: "AI 资产需要版本化", summary: "Prompt 模板、工具 schema、检索配置、eval 数据集、模型路由和策略规则都要有版本号。", visual: "schema", concept: "versioned-assets", whyItMatters: "没有版本号，线上质量变化无法追溯到具体资产。", coreIdeas: ["release id", "asset manifest", "trace linkage"], engineerLens: "让每次 trace 带上 prompt、model、dataset 和 index version。", pitfalls: ["只管理代码版本", "线上直接改 prompt", "版本与 trace 断开"], practicePrompt: "为一个 Prompt 添加版本字段和 owner。" },
    { title: "发布门禁连接质量、成本和安全", summary: "发布前检查 eval、红队、成本、延迟、权限和回滚路径。", visual: "tools", concept: "release-gate", whyItMatters: "通过单元测试不等于具备安全运行条件。", coreIdeas: ["go/no-go", "eval threshold", "rollback ready"], engineerLens: "用机器可读 checklist 驱动 CI 与审批。", pitfalls: ["上线当天补检查", "检查项不可证明", "没有停止条件"], practicePrompt: "写一份 8 项发布门禁清单。" },
    { title: "数据漂移要进入发布判断", summary: "样本分布、权限、业务规则和用户行为变化都可能让旧评估失效。", visual: "dial", concept: "dataset-drift", whyItMatters: "离线通过不代表线上任务分布仍然相同。", coreIdeas: ["distribution shift", "fresh samples", "complaint signal"], engineerLens: "把线上失败样本脱敏后回流到 eval set。", pitfalls: ["长期不更新 golden set", "只看平均分", "忽略权限变化"], practicePrompt: "为一个客服数据集列出三类漂移信号。" },
    { title: "责任边界决定谁能发布和回滚", summary: "每类资产必须有 owner、审批人、灰度观察人和回滚责任人。", visual: "workbench", concept: "ownership-boundary", whyItMatters: "AI 资产跨产品、研发、安全、运营，没人拥有就没人负责效果和事故响应。", coreIdeas: ["owner", "approver", "rollback owner"], engineerLens: "把 owner 写进 asset manifest 和 runbook。", pitfalls: ["审批人不负责回滚", "运营直接改高风险 prompt", "没有值班人"], practicePrompt: "设计哪些资产可由产品更新，哪些必须研发或安全审批。" }
  ],
  decisionLayers: [
    { id: "version", name: "版本", question: "哪些资产要纳管？", choices: [{ name: "所有 AI 行为资产", description: "prompt、模型、数据集、索引、策略和工具都版本化。", example: "release manifest" }, { name: "只管代码", description: "无法复现行为变化。", example: "git only" }] },
    { id: "gate", name: "门禁", question: "何时允许发布？", choices: [{ name: "证据达标", description: "eval、红队、预算、权限和回滚均通过。", example: "go/no-go" }, { name: "演示成功", description: "无法覆盖失败模式。", example: "demo only" }] },
    { id: "owner", name: "责任", question: "谁能回滚？", choices: [{ name: "明确 owner", description: "资产 owner 对效果和事故响应负责。", example: "rollback owner" }, { name: "大家都可以", description: "真正事故时无人负责。", example: "shared vague" }] }
  ],
  questions: [
    { concept: "versioned-assets", weight: 25, prompt: "为什么版本号必须连接 trace？", correct: "才能从线上问题追溯到具体 prompt、模型、数据集或索引", distractors: ["为了让 UI 更漂亮", "版本号只给文档看"], explanation: "trace 与版本连接是复现和回滚的基础。" },
    { concept: "release-gate", weight: 25, prompt: "发布门禁应检查什么？", correct: "eval、红队、成本、延迟、权限和回滚路径", distractors: ["只检查标题", "只看一次演示"], explanation: "门禁要覆盖质量、成本和安全。" },
    { concept: "dataset-drift", weight: 25, prompt: "什么会导致数据漂移？", correct: "样本分布、权限、业务规则或用户行为变化", distractors: ["按钮变圆", "日志文件变小"], explanation: "漂移会让旧评估不再代表线上现实。" },
    { concept: "ownership-boundary", weight: 25, prompt: "谁应该拥有回滚权？", correct: "对资产效果和事故响应负责的 owner", distractors: ["任何路过的人", "只有模型自己"], explanation: "回滚权必须对应责任边界。" }
  ],
  references: [
    { label: "OpenAI Evals guide", url: "https://platform.openai.com/docs/guides/evals" },
    { label: "Google SRE canarying releases", url: "https://sre.google/workbook/canarying-releases/" },
    { label: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" }
  ]
});
