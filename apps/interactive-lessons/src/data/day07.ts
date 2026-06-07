import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day07Modules: ConceptModule[] = [
  {
    id: "d7-m1",
    eyebrow: "Concept 01",
    title: "Durable execution 让长任务可恢复",
    summary: "每步状态持久化，失败、重启或人工暂停后可以继续。",
    visual: "machine",
    concept: "durable-execution",
    whyItMatters: "复杂 Agent 不可避免会失败；能恢复比一次成功更重要。",
    coreIdeas: ["步骤状态要 checkpoint。","副作用工具要幂等。","恢复时要知道上次完成到哪。"],
    engineerLens: "把长任务当 workflow run 管理。",
    pitfalls: ["内存里跑完整任务","失败后从头重来","重复调用副作用工具"],
    practicePrompt: "设计一个 checkpoint 字段集合。",
    fieldExample: "在 Durable execution 让长任务可恢复 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "LangGraph human-in-the-loop", url: "https://docs.langchain.com/oss/python/langgraph/human-in-the-loop" }
  },
  {
    id: "d7-m2",
    eyebrow: "Concept 02",
    title: "Checkpoint 是恢复和审计基础",
    summary: "checkpoint 记录节点状态、输入输出、工具结果和下一步位置。",
    visual: "schema",
    concept: "checkpointing",
    whyItMatters: "没有 checkpoint，human-in-the-loop 和失败恢复都只是口号。",
    coreIdeas: ["保存最小必要状态。","敏感数据要脱敏或分级。","checkpoint 版本要兼容。"],
    engineerLens: "用 checkpoint 支持 resume，而不是复制整段聊天。",
    pitfalls: ["只存最终答案","checkpoint 包含明文密钥","状态无法迁移"],
    practicePrompt: "为 PRD 分析 workflow 定义 checkpoint。",
    fieldExample: "在 Checkpoint 是恢复和审计基础 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "LangGraph human-in-the-loop", url: "https://docs.langchain.com/oss/python/langgraph/human-in-the-loop" }
  },
  {
    id: "d7-m3",
    eyebrow: "Concept 03",
    title: "Human interrupt 把人接入关键节点",
    summary: "当风险、权限或质量不确定时，流程暂停等待人确认或编辑。",
    visual: "tools",
    concept: "human-interrupt",
    whyItMatters: "人不是失败兜底，而是系统设计中的审批节点。",
    coreIdeas: ["暂停前保存状态。","恢复输入要校验。","确认结果进入 trace。"],
    engineerLens: "把人工确认当状态转换。",
    pitfalls: ["口头让用户检查","确认后无法追踪","恢复输入不校验"],
    practicePrompt: "设计“创建任务前确认”的 interrupt。",
    fieldExample: "在 Human interrupt 把人接入关键节点 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "LangGraph human-in-the-loop", url: "https://docs.langchain.com/oss/python/langgraph/human-in-the-loop" }
  },
  {
    id: "d7-m4",
    eyebrow: "Concept 04",
    title: "状态图让复杂编排可解释",
    summary: "用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。",
    visual: "workbench",
    concept: "state-graph",
    whyItMatters: "状态图把系统责任从模型脑内迁回工程结构。",
    coreIdeas: ["节点职责单一。","边条件可解释。","错误边和补偿边显式存在。"],
    engineerLens: "先画 graph，再写 agent prompt。",
    pitfalls: ["所有步骤写进一段 prompt","没有错误边","节点职责混杂"],
    practicePrompt: "为资料研究助手画 state graph。",
    fieldExample: "在 状态图让复杂编排可解释 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "LangGraph human-in-the-loop", url: "https://docs.langchain.com/oss/python/langgraph/human-in-the-loop" }
  }
];

const day07Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "状态图",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "Checkpoint",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "Interrupt/Resume",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day07Lesson: LessonPage = {
  id: "day07",
  path: "/day07",
  title: "Day 07 复杂编排与可恢复执行",
  phase: "Day07",
  status: "available",
  summary: "设计可恢复的多步骤 Agent/Workflow。",
  hero: "让长任务能暂停、恢复和审计",
  conceptIntro: "围绕“LangGraph / durable workflow / human-in-the-loop”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "LangGraph / durable workflow / human-in-the-loop 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 状态图 -> Checkpoint -> Interrupt/Resume -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day07Modules,
  decisionLayers: day07Architecture,
  questions: [
      {
        id: "d7-q1",
        type: "single",
        concept: "durable-execution",
        prompt: "Durable execution 让长任务可恢复最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "每步状态持久化，失败、重启或人工暂停后可以继续。", true), option("c", "完全取消系统控制", false)],
        explanation: "每步状态持久化，失败、重启或人工暂停后可以继续。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d7-q2",
        type: "single",
        concept: "checkpointing",
        prompt: "Checkpoint 是恢复和审计基础最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "checkpoint 记录节点状态、输入输出、工具结果和下一步位置。", true), option("c", "完全取消系统控制", false)],
        explanation: "checkpoint 记录节点状态、输入输出、工具结果和下一步位置。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d7-q3",
        type: "single",
        concept: "human-interrupt",
        prompt: "Human interrupt 把人接入关键节点最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "当风险、权限或质量不确定时，流程暂停等待人确认或编辑。", true), option("c", "完全取消系统控制", false)],
        explanation: "当风险、权限或质量不确定时，流程暂停等待人确认或编辑。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d7-q4",
        type: "single",
        concept: "state-graph",
        prompt: "状态图让复杂编排可解释最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。", true), option("c", "完全取消系统控制", false)],
        explanation: "用节点、边、条件和状态描述多步骤任务，比长 prompt 更可控。 工程上要落到边界、数据流和验收。"
      }
  ]
};
