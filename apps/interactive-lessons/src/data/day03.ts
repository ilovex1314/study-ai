import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day03Modules: ConceptModule[] = [
  {
    id: "d3-m1",
    eyebrow: "Concept 01",
    title: "Agent 是执行实体，不是聊天入口",
    summary: "Agent 围绕目标选择步骤、工具、澄清、handoff 或停止；聊天只是入口之一。",
    visual: "tools",
    concept: "agent",
    whyItMatters: "把 Agent 当 UI 会忽略状态、权限、工具、trace 和失败恢复。",
    coreIdeas: ["Agent 需要目标、工具、状态和停止条件。", "自主性是旋钮，不是开关。", "高风险动作必须系统控制。"],
    engineerLens: "先画执行循环，再决定模型在哪些节点有决策权。",
    pitfalls: ["所有逻辑都塞进 prompt", "没有停止条件", "没有工具权限边界"],
    practicePrompt: "为需求评审 Agent 画执行循环：读输入、查资料、调用工具、人工确认、输出。",
    fieldExample: "PR review agent 可以分析 diff 和生成建议，但不能自动 merge。"
  },
  {
    id: "d3-m2",
    eyebrow: "Concept 02",
    title: "Workflow 控制确定性，Agent 处理不确定性",
    summary: "流程明确、风险高、需要审计时优先 Workflow；路径不可预设时才提高 Agent 自主性。",
    visual: "schema",
    concept: "workflow",
    whyItMatters: "生产系统要把审批、计费、状态变更和重试放进确定性流程。",
    coreIdeas: ["Workflow 适合固定步骤和 SLA。", "Agent 适合动态分解和工具选择。", "常见架构是 Workflow + Agent 节点。"],
    engineerLens: "用状态机控制关键节点，把语义判断作为流程中的能力节点。",
    pitfalls: ["用 Agent 替代状态机", "流程已知仍让模型自由规划", "没有失败恢复路径"],
    practicePrompt: "把一个工单处理流程拆成确定性节点和模型节点。",
    fieldExample: "报销审批应由 workflow 控制流程，模型只做票据理解和风险提示。"
  },
  {
    id: "d3-m3",
    eyebrow: "Concept 03",
    title: "状态与记忆要分层",
    summary: "Run state 记录当前执行，短期上下文服务本轮推理，长期 memory 保存可复用事实和偏好。",
    visual: "workbench",
    concept: "memory",
    whyItMatters: "把临时状态写进长期记忆会污染用户画像；丢失 run state 会让长任务无法恢复。",
    coreIdeas: ["状态用于恢复和审计。", "记忆用于跨任务复用。", "人工确认点需要持久化上下文。"],
    engineerLens: "为 Agent 设计 state schema、memory schema 和 trace schema，不要混成一张表。",
    pitfalls: ["把每轮对话全当记忆", "任务重试丢状态", "人工审批看不到上下文"],
    practicePrompt: "为长任务 Agent 设计 run state、memory 和 trace 三张表的核心字段。",
    fieldExample: "LangGraph interrupt 需要 checkpointer 保存状态，恢复时用 Command 继续执行。"
  },
  {
    id: "d3-m4",
    eyebrow: "Concept 04",
    title: "Guardrails 是分层防护，不是一句安全提示",
    summary: "输入、输出、工具、权限、人工确认和审计都需要防护；不同风险用不同层控制。",
    visual: "tools",
    concept: "guardrails",
    whyItMatters: "工具调用可能触发财务、删除、通知和外部 API，不能只靠模型自觉。",
    coreIdeas: ["工具参数要 schema 校验。", "权限和风险在应用层判断。", "高风险动作要 human-in-the-loop。"],
    engineerLens: "把 guardrail 放在工具执行前后：调用前鉴权，执行后校验结果和记录 trace。",
    pitfalls: ["只写系统提示不做鉴权", "工具权限过大", "审批界面不展示 payload 和风险"],
    practicePrompt: "为三个工具标注权限、风险等级、确认条件和日志字段。",
    fieldExample: "发邮件工具应展示收件人、主题、正文和风险提示，用户确认后才发送。"
  }
];

const day03Architecture: DecisionLayer[] = [
  {
    id: "loop",
    name: "Agent Loop",
    question: "一次执行如何推进？",
    choices: [
      { name: "Model Step", description: "模型选择下一步：回答、工具、澄清、handoff。", example: "需求不清时先问问题。" },
      { name: "System Step", description: "系统验证、授权、执行和记录。", example: "工具参数通过 schema 和权限检查。" }
    ]
  },
  {
    id: "state",
    name: "状态与恢复",
    question: "长任务如何不中断？",
    choices: [
      { name: "Run State", description: "保存当前步骤、工具结果、等待确认状态。", example: "审批前保存 proposedAction。" },
      { name: "Durable Resume", description: "中断后可恢复执行。", example: "LangGraph interrupt + Command resume。" }
    ]
  },
  {
    id: "safety",
    name: "安全边界",
    question: "哪些动作需要防护？",
    choices: [
      { name: "Guardrails", description: "输入、输出和工具调用分层校验。", example: "敏感信息输出前检查。" },
      { name: "Human Review", description: "高风险动作展示 payload 和风险后确认。", example: "发邮件、删数据、花钱前确认。" }
    ]
  }
];

export const day03Lesson: LessonPage = {
    id: "day03",
    path: "/day03",
    title: "Day 03 Agent 架构",
    phase: "Day03",
    status: "available",
    summary: "区分 Agent 和 Workflow，理解工具、状态、记忆、guardrails、trace 和人工确认。",
    hero: "把 Agent 做成可控执行系统",
    conceptIntro: "Agent 不是“更聪明的聊天框”，而是一条带状态、工具、权限、trace 和恢复路径的执行链。",
    decisionTitle: "Agent Loop 与 Workflow 控制",
    decisionIntro: "先用 Workflow 控制确定性流程，再把不确定的语义判断和工具选择交给 Agent 节点。",
    decisionExample: "PR review agent 可以读 diff、调用静态分析、生成建议，但发评论和 merge 必须由用户确认。",
    modules: day03Modules,
    decisionLayers: day03Architecture,
    questions: [
      {
        id: "d3-q1",
        type: "single",
        concept: "agent",
        prompt: "Agent 最准确的定义是什么？",
        options: [option("a", "围绕目标选择步骤和工具的执行实体", true), option("b", "一个聊天输入框"), option("c", "一个向量库"), option("d", "一个 CSS 动画")],
        explanation: "Agent 是执行实体，可能调用工具、澄清、handoff 或停止。"
      },
      {
        id: "d3-q2",
        type: "single",
        concept: "workflow",
        prompt: "什么场景更适合 Workflow？",
        options: [option("a", "流程明确、风险高、需要审计", true), option("b", "完全开放的创意发散"), option("c", "只改按钮颜色"), option("d", "没有任何状态")],
        explanation: "Workflow 适合确定性流程和关键控制点。"
      },
      {
        id: "d3-q3",
        type: "single",
        concept: "memory",
        prompt: "run state 和长期 memory 的关系是什么？",
        options: [option("a", "run state 管当前执行，memory 管跨任务复用事实", true), option("b", "完全一样"), option("c", "memory 不需要权限"), option("d", "state 只能在前端")],
        explanation: "二者生命周期和风险不同，必须分层。"
      },
      {
        id: "d3-q4",
        type: "single",
        concept: "guardrails",
        prompt: "工具调用前应用层必须做什么？",
        options: [option("a", "鉴权、schema 校验和风险判断", true), option("b", "直接执行模型参数"), option("c", "隐藏日志"), option("d", "提高 temperature")],
        explanation: "模型只提出调用意图，真实执行要由系统验证和授权。"
      }
    ]
  };
