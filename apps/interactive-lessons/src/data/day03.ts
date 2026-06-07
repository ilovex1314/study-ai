import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day03Modules: ConceptModule[] = [
  {
    id: "d3-m1",
    eyebrow: "Concept 01",
    title: "Agent 是围绕目标选择步骤的执行体",
    summary: "Agent 根据目标、上下文和工具反馈决定下一步行动。",
    visual: "machine",
    concept: "agent",
    whyItMatters: "它能处理不完全确定的任务，但必须被系统边界约束。",
    coreIdeas: ["Agent 有目标、工具、状态和停止条件。","每一步都应可记录和可回放。","自主性越高，guardrails 越重要。"],
    engineerLens: "把 Agent 当成执行循环，不要当成“更聪明的聊天”。",
    pitfalls: ["聊天框加按钮就叫 Agent","没有停止条件","失败后无法复盘"],
    practicePrompt: "为“读取 PRD 并生成任务”画出 Agent loop。",
    fieldExample: "在 Agent 是围绕目标选择步骤的执行体 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d3-m2",
    eyebrow: "Concept 02",
    title: "Workflow 用确定性流程包住模型节点",
    summary: "流程明确、风险高、审计强时，应优先用 workflow 控制。",
    visual: "schema",
    concept: "workflow",
    whyItMatters: "不是所有自动化都需要 Agent；确定性流程更便宜、更稳、更可审计。",
    coreIdeas: ["Workflow 定义节点和边。","模型节点只处理不确定部分。","分支条件由系统可解释地控制。"],
    engineerLens: "先画状态机，再决定哪些节点引入模型。",
    pitfalls: ["让模型决定所有流程跳转","把状态藏在 prompt","没有重试和补偿"],
    practicePrompt: "把报销审核画成 workflow，并标注哪些节点可以用模型。",
    fieldExample: "在 Workflow 用确定性流程包住模型节点 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d3-m3",
    eyebrow: "Concept 03",
    title: "状态、上下文和长期记忆要分层",
    summary: "Agent run state、短期上下文、长期偏好和知识库不是一回事。",
    visual: "workbench",
    concept: "memory",
    whyItMatters: "混在一起会造成不可恢复、不可解释和隐私风险。",
    coreIdeas: ["run state 保存步骤和 checkpoint。","短期上下文服务当前任务。","长期记忆要有来源、权限和更新策略。"],
    engineerLens: "为 Agent 设计 state schema，而不是把所有内容塞进 messages。",
    pitfalls: ["没有 runId","长期偏好无法删除","工具结果不入日志"],
    practicePrompt: "设计一个 AgentRun 表：runId、status、steps、toolEvents、checkpoint。",
    fieldExample: "在 状态、上下文和长期记忆要分层 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d3-m4",
    eyebrow: "Concept 04",
    title: "Guardrails 是输入、工具和输出的分层防护",
    summary: "Guardrails 不只过滤脏话，还包括权限、副作用、合规和人工确认。",
    visual: "tools",
    concept: "guardrails",
    whyItMatters: "Agent 能调用工具后，安全问题就从文本质量变成系统风险。",
    coreIdeas: ["输入 guardrail 拦截非法目标。","工具 guardrail 控制权限和副作用。","输出 guardrail 校验格式、敏感信息和风险。"],
    engineerLens: "高风险工具执行前必须系统检查，不要只靠模型自觉。",
    pitfalls: ["只在 prompt 写“不要做坏事”","工具没有权限模型","输出不校验就展示"],
    practicePrompt: "列出一个文件操作 Agent 的危险动作和确认规则。",
    fieldExample: "在 Guardrails 是输入、工具和输出的分层防护 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  }
];

const day03Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "自主边界",
    question: "哪里让模型决定？",
    choices: [
      { name: "Agent step", description: "步骤不完全确定，可让模型选择工具。", example: "研究资料并决定下一步查什么。" },
      { name: "Workflow node", description: "流程明确，由系统控制跳转。", example: "审批状态流转。" }
    ]
  },
  {
    id: "layer-2",
    name: "工具执行",
    question: "工具如何安全调用？",
    choices: [
      { name: "Schema", description: "参数少、含义明确、可验证。", example: "create_task(title, owner, dueDate)。" },
      { name: "Policy", description: "执行前检查权限、副作用和确认。", example: "删除文件前要求确认。" }
    ]
  },
  {
    id: "layer-3",
    name: "恢复机制",
    question: "失败后如何继续？",
    choices: [
      { name: "Checkpoint", description: "每步状态可持久化。", example: "工具失败后从上一步恢复。" },
      { name: "Trace", description: "记录模型、工具、guardrail 和 handoff。", example: "按 runId 排查失败。" }
    ]
  }
];

export const day03Lesson: LessonPage = {
  id: "day03",
  path: "/day03",
  title: "Day 03 Agent 编排",
  phase: "Day03",
  status: "available",
  summary: "区分 Agent 与 Workflow，设计工具调用、状态、guardrails、human-in-the-loop 和恢复机制。",
  hero: "让模型会做事，但不乱做事",
  conceptIntro: "理解 Agent 为什么不是“聊天框加工具”，并能设计一个可审计、可恢复、可暂停确认的执行链路。",
  decisionTitle: "Agent loop 与 workflow control 架构判断",
  decisionIntro: "User goal -> Planner/LLM -> tool selection -> policy check -> tool execution -> observation -> state update -> next step/finish。 Human confirmation 和 guardrails 插在高风险工具、输出返回和 handoff 前。",
  decisionExample: "PRD 评审 Agent 读取文档、检索历史 issue、生成风险清单；创建任务前暂停给人确认，确认后才调用项目管理 API。",
  modules: day03Modules,
  decisionLayers: day03Architecture,
  questions: [
      {
        id: "d3-q1",
        type: "single",
        concept: "agent",
        prompt: "Agent 相比普通 Chat 的关键差异是什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "只会输出更长文本", false), option("b", "能基于目标、工具反馈和状态选择下一步", true), option("c", "完全不需要系统控制", false)],
        explanation: "Agent 围绕目标选择步骤和工具，并维护执行状态。"
      },
      {
        id: "d3-q2",
        type: "single",
        concept: "workflow",
        prompt: "什么时候优先 workflow 而不是 Agent？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "流程明确且风险高", true), option("b", "任务完全开放且无法预定义步骤", false), option("c", "只想换按钮颜色", false)],
        explanation: "流程明确、风险高、审计强时。"
      },
      {
        id: "d3-q3",
        type: "single",
        concept: "memory",
        prompt: "为什么 Agent run state 要持久化？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "为了让 UI 更圆润", false), option("b", "为了恢复、审计和复盘", true), option("c", "为了减少所有数据库", false)],
        explanation: "为了恢复、审计、复盘和 human-in-the-loop resume。"
      },
      {
        id: "d3-q4",
        type: "single",
        concept: "guardrails",
        prompt: "工具调用前最关键的系统职责是什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "相信模型不会乱调", false), option("b", "鉴权、校验、副作用控制和确认", true), option("c", "把工具名写得更长", false)],
        explanation: "鉴权、参数校验、副作用评估和必要的人工确认。"
      }
  ]
};
