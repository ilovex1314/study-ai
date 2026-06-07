import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day05Modules: ConceptModule[] = [
  {
    id: "d5-m1",
    eyebrow: "Concept 01",
    title: "平台选型要匹配阶段和控制深度",
    summary: "快速验证、产品化控制、复杂编排和企业合规对应不同工具。",
    visual: "machine",
    concept: "platform-selection",
    whyItMatters: "选错平台会让团队在原型速度、定制能力、成本和锁定之间反复返工。",
    coreIdeas: ["快速验证优先可视化平台。","产品级 Web 优先自研前后端加 SDK。","复杂状态优先图式编排。"],
    engineerLens: "先列约束，再选平台；不要先选喜欢的框架。",
    pitfalls: ["只按热度选型","忽略团队技术栈","没有退出方案"],
    practicePrompt: "为一个需求分析助手做 5 平台选型矩阵。",
    fieldExample: "在 平台选型要匹配阶段和控制深度 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  },
  {
    id: "d5-m2",
    eyebrow: "Concept 02",
    title: "供应商锁定要提前设计出口",
    summary: "锁定来自 API、数据格式、工作流配置、评估数据和运维体系。",
    visual: "budget",
    concept: "vendor-lock-in",
    whyItMatters: "AI 能力变化很快，系统要能替换模型或平台而不重写产品。",
    coreIdeas: ["内部接口隔离 provider。","日志和 eval 数据自己保留。","关键流程避免只存在平台配置里。"],
    engineerLens: "用 adapter 和契约保护业务代码。",
    pitfalls: ["业务代码直连单一 vendor","平台配置不可导出","没有成本对比"],
    practicePrompt: "设计一个 provider adapter 接口。",
    fieldExample: "在 供应商锁定要提前设计出口 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  },
  {
    id: "d5-m3",
    eyebrow: "Concept 03",
    title: "框架适配看团队和任务形态",
    summary: "Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。",
    visual: "schema",
    concept: "framework-fit",
    whyItMatters: "把不同层级的工具当同类比较，会导致架构错位。",
    coreIdeas: ["AI SDK 强在 UI 和 provider。","Agents SDK 强在 agent primitives。","LangGraph 强在状态图和恢复。"],
    engineerLens: "按“UI、编排、工具、状态、运维”分层比较。",
    pitfalls: ["把 Chat SDK 当复杂工作流引擎","把低代码平台当核心后端","忽略状态恢复"],
    practicePrompt: "给每个框架写适合和不适合场景。",
    fieldExample: "在 框架适配看团队和任务形态 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  },
  {
    id: "d5-m4",
    eyebrow: "Concept 04",
    title: "串联方式决定系统边界",
    summary: "API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。",
    visual: "tools",
    concept: "integration-strategy",
    whyItMatters: "平台能快，但核心权限、数据和审计通常要留在自研服务。",
    coreIdeas: ["API 串联适合稳定服务。","Webhook/Queue 适合异步事件。","MCP 适合统一工具接口。"],
    engineerLens: "让平台调用你的受控 API，而不是把核心逻辑写死在平台里。",
    pitfalls: ["共享管理员密钥","没有幂等和重试","平台直接写核心库"],
    practicePrompt: "画出 Dify/Coze 调用自研服务的边界。",
    fieldExample: "在 串联方式决定系统边界 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  }
];

const day05Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "选型矩阵",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "供应商串联",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "迁移与锁定",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day05Lesson: LessonPage = {
  id: "day05",
  path: "/day05",
  title: "Day 05 平台选型",
  phase: "Day05",
  status: "available",
  summary: "建立代码框架、可视化平台和云厂商的选型判断。",
  hero: "把工具地图变成选型矩阵",
  conceptIntro: "围绕“平台、框架与供应商选型”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "平台、框架与供应商选型 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 选型矩阵 -> 供应商串联 -> 迁移与锁定 -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day05Modules,
  decisionLayers: day05Architecture,
  questions: [
      {
        id: "d5-q1",
        type: "single",
        concept: "platform-selection",
        prompt: "平台选型要匹配阶段和控制深度最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "快速验证、产品化控制、复杂编排和企业合规对应不同工具。", true), option("c", "完全取消系统控制", false)],
        explanation: "快速验证、产品化控制、复杂编排和企业合规对应不同工具。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d5-q2",
        type: "single",
        concept: "vendor-lock-in",
        prompt: "供应商锁定要提前设计出口最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "锁定来自 API、数据格式、工作流配置、评估数据和运维体系。", true), option("c", "完全取消系统控制", false)],
        explanation: "锁定来自 API、数据格式、工作流配置、评估数据和运维体系。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d5-q3",
        type: "single",
        concept: "framework-fit",
        prompt: "框架适配看团队和任务形态最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。", true), option("c", "完全取消系统控制", false)],
        explanation: "Vercel AI SDK、Agents SDK、LangGraph、Mastra 解决的问题层级不同。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d5-q4",
        type: "single",
        concept: "integration-strategy",
        prompt: "串联方式决定系统边界最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。", true), option("c", "完全取消系统控制", false)],
        explanation: "API、Tool、Webhook、Queue、MCP 都能连接平台和自研系统。 工程上要落到边界、数据流和验收。"
      }
  ]
};
