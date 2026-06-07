import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day06Modules: ConceptModule[] = [
  {
    id: "d6-m1",
    eyebrow: "Concept 01",
    title: "TypeScript AI 栈适合快速产品化",
    summary: "Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。",
    visual: "machine",
    concept: "typescript-ai-stack",
    whyItMatters: "前后端背景可以复用熟悉工程能力，但要尊重服务端边界。",
    coreIdeas: ["UI 流式状态在前端。","模型调用和密钥在服务端。","复杂状态进入后端编排。"],
    engineerLens: "用 TS 栈做体验，用服务端控制风险。",
    pitfalls: ["前端暴露 API key","所有状态放浏览器","没有服务端日志"],
    practicePrompt: "设计一个 Next.js AI route 的输入输出。",
    fieldExample: "在 TypeScript AI 栈适合快速产品化 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d6-m2",
    eyebrow: "Concept 02",
    title: "Provider adapter 隔离模型差异",
    summary: "不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。",
    visual: "schema",
    concept: "provider-adapter",
    whyItMatters: "adapter 让业务功能不被单一模型 API 绑死。",
    coreIdeas: ["统一请求响应。","保留 provider 原始错误。","记录能力和成本元数据。"],
    engineerLens: "先定义内部模型接口，再接外部 provider。",
    pitfalls: ["业务散落 fetch","错误被吞掉","无法按能力路由"],
    practicePrompt: "写 adapter 字段：model、messages、tools、stream、usage、error。",
    fieldExample: "在 Provider adapter 隔离模型差异 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d6-m3",
    eyebrow: "Concept 03",
    title: "Chat UI 是状态机",
    summary: "AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。",
    visual: "workbench",
    concept: "chat-ui-state",
    whyItMatters: "只做一个 loading 会让用户无法理解进度、证据和失败。",
    coreIdeas: ["流式文本和工具事件要分开显示。","引用要跟随答案。","用户要能取消、重试、编辑。"],
    engineerLens: "把 UI 状态显式建模，不靠布尔变量堆叠。",
    pitfalls: ["没有取消","工具失败无提示","引用显示滞后"],
    practicePrompt: "画一个 Chat UI 状态机。",
    fieldExample: "在 Chat UI 是状态机 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d6-m4",
    eyebrow: "Concept 04",
    title: "服务端边界保护密钥、权限和状态",
    summary: "模型调用、工具执行、审计、限流、队列和成本统计应在服务端。",
    visual: "tools",
    concept: "server-boundary",
    whyItMatters: "AI 前端体验再强，也不能绕过后端控制面。",
    coreIdeas: ["密钥不进浏览器。","工具调用走后端鉴权。","长任务进入队列和 run log。"],
    engineerLens: "前端负责体验，后端负责控制。",
    pitfalls: ["浏览器直连 provider","工具参数由前端任意传","无审计日志"],
    practicePrompt: "定义一个 /api/ai-runs 接口职责。",
    fieldExample: "在 服务端边界保护密钥、权限和状态 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  }
];

const day06Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "前端状态",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "API 边界",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "Provider adapter",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day06Lesson: LessonPage = {
  id: "day06",
  path: "/day06",
  title: "Day 06 TypeScript AI 应用栈",
  phase: "Day06",
  status: "available",
  summary: "设计流式 UI 与服务端模型调用边界。",
  hero: "把熟悉的 Web 工程变成 AI 产品底座",
  conceptIntro: "围绕“Vercel AI SDK、Next.js 与前后端协作”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "Vercel AI SDK、Next.js 与前后端协作 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 前端状态 -> API 边界 -> Provider adapter -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day06Modules,
  decisionLayers: day06Architecture,
  questions: [
      {
        id: "d6-q1",
        type: "single",
        concept: "typescript-ai-stack",
        prompt: "TypeScript AI 栈适合快速产品化最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。", true), option("c", "完全取消系统控制", false)],
        explanation: "Next.js、Node、Vercel AI SDK 能快速实现流式 UI、工具调用和 provider 抽象。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d6-q2",
        type: "single",
        concept: "provider-adapter",
        prompt: "Provider adapter 隔离模型差异最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。", true), option("c", "完全取消系统控制", false)],
        explanation: "不同 provider 的模型名、参数、工具调用、流式协议和错误码不同。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d6-q3",
        type: "single",
        concept: "chat-ui-state",
        prompt: "Chat UI 是状态机最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。", true), option("c", "完全取消系统控制", false)],
        explanation: "AI UI 包含 idle、submitting、streaming、tool-call、needs-confirmation、failed、done。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d6-q4",
        type: "single",
        concept: "server-boundary",
        prompt: "服务端边界保护密钥、权限和状态最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "模型调用、工具执行、审计、限流、队列和成本统计应在服务端。", true), option("c", "完全取消系统控制", false)],
        explanation: "模型调用、工具执行、审计、限流、队列和成本统计应在服务端。 工程上要落到边界、数据流和验收。"
      }
  ]
};
