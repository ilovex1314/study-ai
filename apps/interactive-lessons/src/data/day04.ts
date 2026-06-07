import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day04Modules: ConceptModule[] = [
  {
    id: "d4-m1",
    eyebrow: "Concept 01",
    title: "AI 产品不是模型调用，是交付闭环",
    summary: "真实产品需要 UX、模型网关、检索、工具、评估、监控、成本、权限和失败处理。",
    visual: "machine",
    concept: "product-delivery",
    whyItMatters: "用户体验到的是延迟、失败、引用、可编辑结果和恢复路径，不是模型参数。",
    coreIdeas: ["模型只是能力节点。","产品要设计 happy path 和 unhappy path。","反馈要进入评估和迭代闭环。"],
    engineerLens: "从请求到反馈画完整链路，再决定日志、指标和人工确认。",
    pitfalls: ["前端直接调模型","没有失败态","没有 eval 和日志"],
    practicePrompt: "为一个 AI 需求评审助手写交付 checklist。",
    fieldExample: "在 AI 产品不是模型调用，是交付闭环 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d4-m2",
    eyebrow: "Concept 02",
    title: "模型网关统一 provider、成本和 fallback",
    summary: "模型网关集中处理 provider adapter、重试、超时、路由、token 统计和审计。",
    visual: "budget",
    concept: "model-gateway",
    whyItMatters: "如果每个功能直接调模型，后续切模型、降成本、排查失败都会很痛。",
    coreIdeas: ["provider adapter 隔离供应商差异。","路由策略按质量、成本、延迟和能力选模型。","每次调用都要记录 token、耗时和结果。"],
    engineerLens: "把模型调用做成内部平台能力，而不是散落在业务代码里的 fetch。",
    pitfalls: ["业务代码绑定单一模型","没有超时和 fallback","不记录 token"],
    practicePrompt: "定义 model gateway 的请求字段、响应字段、日志字段和 fallback 策略。",
    fieldExample: "在 模型网关统一 provider、成本和 fallback 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d4-m3",
    eyebrow: "Concept 03",
    title: "Streaming UX 要展示过程和控制权",
    summary: "流式体验不只是逐字输出，还包括工具状态、引用、取消、重试、编辑和确认。",
    visual: "workbench",
    concept: "streaming-ux",
    whyItMatters: "AI 输出慢且不确定，用户需要知道系统在做什么、能否中断、结果是否可信。",
    coreIdeas: ["显示模型生成和工具调用状态。","引用和证据应跟随答案出现。","用户要能取消、重试和编辑。"],
    engineerLens: "Vercel AI SDK 适合 TypeScript 流式 UI，但复杂编排仍要后端控制状态和工具执行。",
    pitfalls: ["只显示 loading","工具失败没有可见状态","输出不可编辑"],
    practicePrompt: "设计 Chat UI 状态机：idle、streaming、tool-call、needs-confirmation、done、failed。",
    fieldExample: "在 Streaming UX 要展示过程和控制权 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d4-m4",
    eyebrow: "Concept 04",
    title: "可观测与评估决定能否迭代",
    summary: "日志、trace、eval、成本、延迟、失败模式和用户反馈让 AI 功能可度量。",
    visual: "schema",
    concept: "observability",
    whyItMatters: "没有观测和评估，团队只能靠感觉判断模型、prompt 或检索是否变好。",
    coreIdeas: ["离线 eval 保护版本迭代。","在线反馈发现真实失败。","trace 帮你定位模型、检索、工具还是流程问题。"],
    engineerLens: "每次 AI run 都应有 runId、prompt version、model、retrieval config、tool events、score 和反馈。",
    pitfalls: ["只存最终答案","prompt 改动没有版本","没有失败样本回流"],
    practicePrompt: "设计 eval dataset 字段和 run log 字段。",
    fieldExample: "在 可观测与评估决定能否迭代 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  }
];

const day04Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "产品链路",
    question: "请求如何完成交付闭环？",
    choices: [
      { name: "Frontend UX", description: "收集输入，展示进度、引用、确认和编辑。", example: "流式输出时显示 tool-call 状态。" },
      { name: "Backend Orchestration", description: "鉴权、队列、模型网关、工具和状态。", example: "长任务进入 worker 并记录 runId。" }
    ]
  },
  {
    id: "layer-2",
    name: "模型网关",
    question: "如何控制模型调用？",
    choices: [
      { name: "Provider Adapter", description: "隔离供应商 API 差异。", example: "OpenAI、Claude、Gemini 共用内部接口。" },
      { name: "Routing And Fallback", description: "按成本、质量、延迟和能力选模型。", example: "摘要走低成本模型，审查走强模型。" }
    ]
  },
  {
    id: "layer-3",
    name: "质量闭环",
    question: "如何证明功能变好？",
    choices: [
      { name: "Offline Eval", description: "上线前用样例集回归。", example: "PRD 风险识别 golden set。" },
      { name: "Online Feedback", description: "上线后收集采纳、修正、失败。", example: "用户编辑后的答案进入复盘样本。" }
    ]
  }
];

export const day04Lesson: LessonPage = {
  id: "day04",
  path: "/day04",
  title: "Day 04 产品化交付",
  phase: "Day04",
  status: "available",
  summary: "建立 AI 产品交付闭环：模型网关、流式 UX、eval、可观测、成本和部署。",
  hero: "从 demo 到真实用户可用",
  conceptIntro: "把前 3 天的模型、RAG、Agent 能力接成可交付产品架构，明确前端、后端、网关、观测和评估各自负责什么。",
  decisionTitle: "AI product delivery and operations 架构判断",
  decisionIntro: "Frontend UX -> API/Auth -> Model Gateway -> Orchestrator -> Tools/RAG -> Eval/Observability -> Feedback loop。 每次 AI run 都应有 runId、prompt version、model、token、latency、tool events、score 和 user feedback。",
  decisionExample: "需求评审助手流式展示分析过程，保存 run 日志，统计成本，允许编辑输出，并把用户采纳结果回流 eval。",
  modules: day04Modules,
  decisionLayers: day04Architecture,
  questions: [
      {
        id: "d4-q1",
        type: "single",
        concept: "product-delivery",
        prompt: "AI demo 到产品最常缺什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "只缺一个更大的 logo", false), option("b", "缺少交付闭环和非模型工程能力", true), option("c", "只缺更高 temperature", false)],
        explanation: "缺少 UX 状态、网关、评估、观测、成本和失败处理闭环。"
      },
      {
        id: "d4-q2",
        type: "single",
        concept: "model-gateway",
        prompt: "模型网关的核心价值是什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让前端颜色统一", false), option("b", "集中控制模型调用和成本质量策略", true), option("c", "替代所有业务数据库", false)],
        explanation: "统一 provider、路由、重试、fallback、成本和审计。"
      },
      {
        id: "d4-q3",
        type: "single",
        concept: "streaming-ux",
        prompt: "好的 Streaming UX 除了逐字输出还要什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "隐藏所有过程", false), option("b", "展示过程和用户控制权", true), option("c", "只显示一个转圈 loading", false)],
        explanation: "工具状态、引用、取消、重试、编辑和确认。"
      },
      {
        id: "d4-q4",
        type: "single",
        concept: "observability",
        prompt: "为什么 AI 产品必须记录 trace 和 eval？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "为了让日志文件更大", false), option("b", "为了可排错、可回归、可优化", true), option("c", "为了替代用户反馈", false)],
        explanation: "为了定位失败、回归版本、度量质量和控制成本。"
      }
  ]
};
