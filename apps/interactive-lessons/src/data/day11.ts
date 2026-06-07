import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day11Modules: ConceptModule[] = [
  {
    id: "d11-m1",
    eyebrow: "Concept 01",
    title: "上下文工程决定 AI 协作质量",
    summary: "给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。",
    visual: "machine",
    concept: "context-engineering",
    whyItMatters: "上下文太少会误解，太多会噪声和 token 浪费。",
    coreIdeas: ["先定位再读取。","稳定约定沉淀成文件。","任务上下文按需提供。"],
    engineerLens: "像组织代码依赖一样组织上下文。",
    pitfalls: ["全仓塞给 AI","只给一句模糊需求","不写验收标准"],
    practicePrompt: "为一个 bugfix 写上下文包。",
    fieldExample: "在 上下文工程决定 AI 协作质量 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d11-m2",
    eyebrow: "Concept 02",
    title: "任务拆解降低返工和幻觉",
    summary: "把大目标拆成可验证的小步骤：读现状、改一处、验证一处。",
    visual: "schema",
    concept: "task-decomposition",
    whyItMatters: "AI 适合处理明确边界的小任务，复杂目标要分阶段收敛。",
    coreIdeas: ["每步有输入输出。","每步有验收命令。","高风险步骤先审查。"],
    engineerLens: "先做最小闭环，再扩展。",
    pitfalls: ["一次要求重构全仓","没有中间验收","修改范围不受控"],
    practicePrompt: "把“做一个助手”拆成 6 个工程任务。",
    fieldExample: "在 任务拆解降低返工和幻觉 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d11-m3",
    eyebrow: "Concept 03",
    title: "Prompt 资产要版本化和复用",
    summary: "常用开发、审查、测试、复盘 prompt 应沉淀到仓库。",
    visual: "workbench",
    concept: "prompt-assets",
    whyItMatters: "可复用模板能减少沟通成本，也让团队对 AI 输出有共同标准。",
    coreIdeas: ["模板包含目标和约束。","示例包含好坏对比。","随项目复盘更新。"],
    engineerLens: "把 prompt 当工程资产维护。",
    pitfalls: ["模板散在聊天记录","没有适用条件","从不根据失败更新"],
    practicePrompt: "创建 prompts/vibe-coding-playbook.md 大纲。",
    fieldExample: "在 Prompt 资产要版本化和复用 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d11-m4",
    eyebrow: "Concept 04",
    title: "验证闭环替代“感觉能用”",
    summary: "AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。",
    visual: "tools",
    concept: "verification-loop",
    whyItMatters: "没有验证，vibe coding 只是更快地产生未知风险。",
    coreIdeas: ["先定义验收。","运行真实命令。","把失败反馈给下一轮。"],
    engineerLens: "让 AI 输出跟随证据迭代。",
    pitfalls: ["只看代码觉得对","不跑测试","失败后直接猜修复"],
    practicePrompt: "为一个前端改动列出验证命令和截图检查。",
    fieldExample: "在 验证闭环替代“感觉能用” 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  }
];

const day11Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "任务规格",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "上下文包",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "验证闭环",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day11Lesson: LessonPage = {
  id: "day11",
  path: "/day11",
  title: "Day 11 Vibe Coding 工程化",
  phase: "Day11",
  status: "available",
  summary: "建立提示资产、验收命令和复盘机制。",
  hero: "让 AI 更懂你的工程意图",
  conceptIntro: "围绕“上下文工程、任务拆解与 AI 协作”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "上下文工程、任务拆解与 AI 协作 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 任务规格 -> 上下文包 -> 验证闭环 -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day11Modules,
  decisionLayers: day11Architecture,
  questions: [
      {
        id: "d11-q1",
        type: "single",
        concept: "context-engineering",
        prompt: "上下文工程决定 AI 协作质量最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。", true), option("c", "完全取消系统控制", false)],
        explanation: "给 AI 的上下文要包含目标、约束、相关文件、验收和非目标。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d11-q2",
        type: "single",
        concept: "task-decomposition",
        prompt: "任务拆解降低返工和幻觉最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "把大目标拆成可验证的小步骤：读现状、改一处、验证一处。", true), option("c", "完全取消系统控制", false)],
        explanation: "把大目标拆成可验证的小步骤：读现状、改一处、验证一处。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d11-q3",
        type: "single",
        concept: "prompt-assets",
        prompt: "Prompt 资产要版本化和复用最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "常用开发、审查、测试、复盘 prompt 应沉淀到仓库。", true), option("c", "完全取消系统控制", false)],
        explanation: "常用开发、审查、测试、复盘 prompt 应沉淀到仓库。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d11-q4",
        type: "single",
        concept: "verification-loop",
        prompt: "验证闭环替代“感觉能用”最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。", true), option("c", "完全取消系统控制", false)],
        explanation: "AI 生成后要用测试、构建、截图、日志或人工 checklist 证明。 工程上要落到边界、数据流和验收。"
      }
  ]
};
