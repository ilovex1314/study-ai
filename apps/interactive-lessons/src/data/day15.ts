import { createP0Lesson } from "./p0LessonFactory";

export const day15Lesson = createP0Lesson({
  id: "day15",
  phase: "Day15",
  title: "AI 安全、身份与工具权限",
  summary: "把 Prompt Injection、越权工具调用和数据泄露转成可测试的系统控制点。",
  capabilityGoal: "为 AI 工具链设计身份、策略、审批和审计边界。",
  verifiableOutput: "工具权限矩阵与审批策略。",
  diagramType: "gate",
  hero: "让模型意图通过确定性安全门",
  conceptIntro: "把不可信输入、最小权限工具、策略执行和审计追踪连成安全控制面。",
  decisionTitle: "工具调用：模型意图与系统策略的边界",
  decisionIntro: "用户、网页、检索内容和工具返回都可能不可信；模型只能提出工具意图，是否执行由 schema、身份、策略、审批和审计共同决定。",
  decisionExample: "报销 Agent 可以生成付款意图，但提交付款前必须经过身份、金额阈值、预算归属、审批人和幂等键检查。",
  modules: [
    { title: "不可信输入包含用户、网页和检索内容", summary: "用户文本、网页内容、文档片段和工具返回都可能携带恶意指令。", visual: "tools", concept: "untrusted-input", whyItMatters: "模型可能把外部内容误当系统指令。", coreIdeas: ["外部内容是 data。", "RAG 文档也可能注入。", "过滤不能证明动作安全。"], engineerLens: "为每类输入标注 trust level。", pitfalls: ["只防用户输入", "把网页内容提升为指令", "忽略工具返回"], practicePrompt: "写 10 条注入攻击测试样本。", source: { label: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" } },
    { title: "最小权限工具限制副作用", summary: "工具 schema、参数校验、作用域、速率限制、幂等键和审批规则共同约束工具。", visual: "schema", concept: "least-privilege-tool", whyItMatters: "过大权限工具会把模型错误升级为真实业务事故。", coreIdeas: ["读写分离。", "草稿与提交分离。", "高风险动作审批。"], engineerLens: "把 create_draft 和 submit 拆成不同工具。", pitfalls: ["任意 HTTP 工具", "全权限 token", "schema 替代授权"], practicePrompt: "为 create_ticket 和 initiate_payment 写权限矩阵。" },
    { title: "策略执行要独立于模型", summary: "策略引擎根据身份、资源、风险等级和业务状态决定 allow、deny 或 require approval。", visual: "machine", concept: "policy-enforcement", whyItMatters: "安全决策不能交给概率输出。", coreIdeas: ["模型产出候选意图。", "策略做确定性决策。", "策略也要可测试。"], engineerLens: "将 policy decision 写入工具执行前置环节。", pitfalls: ["让模型判断是否安全", "策略无审计", "审批规则写在 prompt"], practicePrompt: "为付款工具写三条策略规则。" },
    { title: "审计追踪让风险可复盘", summary: "审计事件记录 actor、resource、action、input hash、policy decision、approver、tool result、trace id。", visual: "workbench", concept: "audit-trace", whyItMatters: "事故后必须能还原谁在何时基于什么策略执行了什么。", coreIdeas: ["审计连接 trace。", "记录决策理由。", "敏感原文最小化。"], engineerLens: "把审计 schema 加入工具调用结果。", pitfalls: ["只记录最终回答", "保存过多敏感原文", "没有 approver"], practicePrompt: "设计一条付款审批审计事件。" }
  ],
  decisionLayers: [
    { id: "input", name: "输入可信度", question: "哪些内容可当指令？", choices: [{ name: "系统指令", description: "仅来自受控开发者配置。", example: "policy config" }, { name: "外部数据", description: "用户、网页和检索内容只作为 data。", example: "retrieved chunk" }] },
    { id: "tool", name: "工具权限", question: "工具如何限制副作用？", choices: [{ name: "最小权限", description: "读、草稿、提交和审批分离。", example: "send_invoice gated" }, { name: "全能工具", description: "会扩大注入和误操作影响。", example: "admin fetch" }] },
    { id: "audit", name: "可追责执行", question: "执行后如何复盘？", choices: [{ name: "审计 Trace", description: "记录身份、策略、审批和结果。", example: "trace id" }, { name: "聊天记录", description: "无法证明系统决策。", example: "final answer only" }] }
  ],
  questions: [
    { concept: "untrusted-input", weight: 25, prompt: "为什么检索内容也必须视为不可信输入？", correct: "因为文档可能包含恶意指令或过期指令", distractors: ["因为检索内容一定为空", "因为模型不会读取文档"], explanation: "RAG 文档可能携带 prompt injection，不能当作系统指令。" },
    { concept: "least-privilege-tool", weight: 20, prompt: "Tool schema 不能替代什么？", correct: "身份授权、风险策略和审批", distractors: ["参数结构", "参数说明"], explanation: "Schema 描述工具形状，策略决定能不能执行。" },
    { concept: "policy-enforcement", weight: 20, prompt: "高风险工具执行前最关键的控制是什么？", correct: "策略检查、人工审批、幂等和审计", distractors: ["更礼貌的 prompt", "把按钮做大"], explanation: "副作用必须由系统控制。" },
    { concept: "audit-trace", weight: 20, prompt: "审计事件至少应连接什么？", correct: "actor、resource、action、policy decision、tool result 和 trace id", distractors: ["只连接最终回答", "只连接页面颜色"], explanation: "审计要支持复盘和追责。" },
    { concept: "least-privilege-tool", weight: 15, prompt: "为什么要把草稿工具和提交工具拆开？", correct: "让模型可以提出候选，但真实副作用必须经过更严格控制", distractors: ["让工具列表显得更多", "让用户不能看到草稿"], explanation: "最小权限要把低风险生成和高风险提交拆成不同授权边界。" }
  ],
  references: [
    { label: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
    { label: "OpenAI Agents guardrails", url: "https://openai.github.io/openai-agents-python/guardrails/" },
    { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" }
  ]
});
