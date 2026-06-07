import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day08Modules: ConceptModule[] = [
  {
    id: "d8-m1",
    eyebrow: "Concept 01",
    title: "可视化工作流适合业务共创",
    summary: "Dify、Coze、n8n 等平台让非工程角色能参与流程验证。",
    visual: "machine",
    concept: "visual-workflow",
    whyItMatters: "业务早期需要快速试错，可视化平台能缩短反馈路径。",
    coreIdeas: ["适合原型和内部工具。","复杂权限和核心数据仍需工程托底。","平台配置也要版本化。"],
    engineerLens: "用平台验证流程，用 API 保持核心边界。",
    pitfalls: ["原型直接当核心系统","配置不可追踪","没有环境隔离"],
    practicePrompt: "用可视化平台搭一个需求收集流程。",
    fieldExample: "在 可视化工作流适合业务共创 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  },
  {
    id: "d8-m2",
    eyebrow: "Concept 02",
    title: "低代码自动化适合外围串联",
    summary: "通知、同步、日报、工单流转适合 n8n/Zapier/Make 类工具。",
    visual: "tools",
    concept: "low-code-automation",
    whyItMatters: "不是每个流程都值得自研，但核心风险不能外包给低代码配置。",
    coreIdeas: ["适合同步和触发。","需要幂等和失败重试。","敏感动作要审批。"],
    engineerLens: "把低代码当集成层，不当核心业务层。",
    pitfalls: ["直接操作核心表","没有重试告警","流程没人维护"],
    practicePrompt: "设计日报生成自动化的节点和失败处理。",
    fieldExample: "在 低代码自动化适合外围串联 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  },
  {
    id: "d8-m3",
    eyebrow: "Concept 03",
    title: "业务验证先证明价值再重构",
    summary: "平台原型的目标是验证数据、流程和用户反馈，不是证明最终架构。",
    visual: "budget",
    concept: "business-validation",
    whyItMatters: "过早工程化和过久停留在原型都会浪费时间。",
    coreIdeas: ["先验证高频场景。","记录失败样本。","到达边界后迁移到工程实现。"],
    engineerLens: "把平台产物当可学习原型。",
    pitfalls: ["为了优雅架构延迟验证","原型无指标","不记录用户反馈"],
    practicePrompt: "定义一个 1 周业务验证计划。",
    fieldExample: "在 业务验证先证明价值再重构 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  },
  {
    id: "d8-m4",
    eyebrow: "Concept 04",
    title: "API bridging 让平台调用受控能力",
    summary: "把内部能力封装成鉴权、限流、审计的 HTTP/API 或 MCP 工具。",
    visual: "schema",
    concept: "api-bridging",
    whyItMatters: "平台越开放，越需要清晰的边界和权限。",
    coreIdeas: ["统一入口鉴权。","参数 schema 严格。","响应可追踪。"],
    engineerLens: "平台只拿到必要工具，不拿到系统内部权限。",
    pitfalls: ["把数据库密码放平台","API 无权限区分","错误不可观测"],
    practicePrompt: "写一个给平台调用的 analyzeRequirement API 契约。",
    fieldExample: "在 API bridging 让平台调用受控能力 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Dify docs", url: "https://docs.dify.ai/" }
  }
];

const day08Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "平台原型",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "外部 API",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "事件触发",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day08Lesson: LessonPage = {
  id: "day08",
  path: "/day08",
  title: "Day 08 可视化平台与低代码工作流",
  phase: "Day08",
  status: "available",
  summary: "设计平台到自研服务的串联方式。",
  hero: "用平台快跑，用工程托底",
  conceptIntro: "围绕“Dify、Coze、n8n 与业务验证”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "Dify、Coze、n8n 与业务验证 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 平台原型 -> 外部 API -> 事件触发 -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day08Modules,
  decisionLayers: day08Architecture,
  questions: [
      {
        id: "d8-q1",
        type: "single",
        concept: "visual-workflow",
        prompt: "可视化工作流适合业务共创最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "Dify、Coze、n8n 等平台让非工程角色能参与流程验证。", true), option("c", "完全取消系统控制", false)],
        explanation: "Dify、Coze、n8n 等平台让非工程角色能参与流程验证。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d8-q2",
        type: "single",
        concept: "low-code-automation",
        prompt: "低代码自动化适合外围串联最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "通知、同步、日报、工单流转适合 n8n/Zapier/Make 类工具。", true), option("c", "完全取消系统控制", false)],
        explanation: "通知、同步、日报、工单流转适合 n8n/Zapier/Make 类工具。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d8-q3",
        type: "single",
        concept: "business-validation",
        prompt: "业务验证先证明价值再重构最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "平台原型的目标是验证数据、流程和用户反馈，不是证明最终架构。", true), option("c", "完全取消系统控制", false)],
        explanation: "平台原型的目标是验证数据、流程和用户反馈，不是证明最终架构。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d8-q4",
        type: "single",
        concept: "api-bridging",
        prompt: "API bridging 让平台调用受控能力最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "把内部能力封装成鉴权、限流、审计的 HTTP/API 或 MCP 工具。", true), option("c", "完全取消系统控制", false)],
        explanation: "把内部能力封装成鉴权、限流、审计的 HTTP/API 或 MCP 工具。 工程上要落到边界、数据流和验收。"
      }
  ]
};
