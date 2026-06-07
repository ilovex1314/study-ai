import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day12Modules: ConceptModule[] = [
  {
    id: "d12-m1",
    eyebrow: "Concept 01",
    title: "毕业项目范围要小但完整",
    summary: "选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。",
    visual: "machine",
    concept: "capstone-scope",
    whyItMatters: "范围太大做不完，范围太小证明不了产品能力。",
    coreIdeas: ["限定核心用户和场景。","保留端到端闭环。","明确非目标。"],
    engineerLens: "宁可小而完整，不要大而散。",
    pitfalls: ["同时做三个产品","只有模型调用没有产品闭环","没有用户场景"],
    practicePrompt: "为 capstone 写 problem statement 和 non-goals。",
    fieldExample: "在 毕业项目范围要小但完整 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d12-m2",
    eyebrow: "Concept 02",
    title: "交付计划把学习成果变成产品",
    summary: "计划包含里程碑、接口、数据、风险、测试、部署和复盘。",
    visual: "schema",
    concept: "delivery-plan",
    whyItMatters: "没有交付计划，最终项目容易变成零散 demo。",
    coreIdeas: ["每个里程碑有可运行产物。","风险有缓解动作。","测试和 eval 前置。"],
    engineerLens: "像真实项目一样管理 capstone。",
    pitfalls: ["只写功能愿望","没有验收","部署最后才想"],
    practicePrompt: "写 3 个里程碑和每个验收标准。",
    fieldExample: "在 交付计划把学习成果变成产品 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d12-m3",
    eyebrow: "Concept 03",
    title: "部署方案证明产品能被使用",
    summary: "环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。",
    visual: "budget",
    concept: "deployment-plan",
    whyItMatters: "能本地跑不等于能给真实用户使用。",
    coreIdeas: ["密钥分环境管理。","日志和成本可观测。","回滚路径明确。"],
    engineerLens: "部署是产品能力的一部分。",
    pitfalls: ["把 key 写进代码","无错误告警","不能回滚"],
    practicePrompt: "写 Docker/云部署 checklist。",
    fieldExample: "在 部署方案证明产品能被使用 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d12-m4",
    eyebrow: "Concept 04",
    title: "复盘让一次项目变成长期能力",
    summary: "记录目标、架构、取舍、失败、成本、eval 结果和下一步。",
    visual: "workbench",
    concept: "postmortem",
    whyItMatters: "复盘把经验沉淀为下一次更快更稳的工作流。",
    coreIdeas: ["保留事实和数据。","区分模型问题和系统问题。","形成可复用模板。"],
    engineerLens: "复盘不是总结情绪，而是更新方法。",
    pitfalls: ["只写“完成了”","不记录失败","没有下一步"],
    practicePrompt: "写一份 capstone 复盘模板。",
    fieldExample: "在 复盘让一次项目变成长期能力 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  }
];

const day12Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "项目范围",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "上线方案",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "复盘文档",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day12Lesson: LessonPage = {
  id: "day12",
  path: "/day12",
  title: "Day 12 毕业项目设计",
  phase: "Day12",
  status: "available",
  summary: "完成 capstone 架构和验收计划。",
  hero: "交付一个能讲清楚、跑起来、可复盘的 AI 产品",
  conceptIntro: "围绕“Capstone：可演示 AI 产品闭环”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "Capstone：可演示 AI 产品闭环 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 项目范围 -> 上线方案 -> 复盘文档 -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day12Modules,
  decisionLayers: day12Architecture,
  questions: [
      {
        id: "d12-q1",
        type: "single",
        concept: "capstone-scope",
        prompt: "毕业项目范围要小但完整最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。", true), option("c", "完全取消系统控制", false)],
        explanation: "选择一个能覆盖 UI、编排、工具、部署、日志和 eval 的真实问题。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d12-q2",
        type: "single",
        concept: "delivery-plan",
        prompt: "交付计划把学习成果变成产品最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "计划包含里程碑、接口、数据、风险、测试、部署和复盘。", true), option("c", "完全取消系统控制", false)],
        explanation: "计划包含里程碑、接口、数据、风险、测试、部署和复盘。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d12-q3",
        type: "single",
        concept: "deployment-plan",
        prompt: "部署方案证明产品能被使用最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。", true), option("c", "完全取消系统控制", false)],
        explanation: "环境变量、密钥、数据库、队列、日志、限流、灰度和回滚都要明确。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d12-q4",
        type: "single",
        concept: "postmortem",
        prompt: "复盘让一次项目变成长期能力最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "记录目标、架构、取舍、失败、成本、eval 结果和下一步。", true), option("c", "完全取消系统控制", false)],
        explanation: "记录目标、架构、取舍、失败、成本、eval 结果和下一步。 工程上要落到边界、数据流和验收。"
      }
  ]
};
