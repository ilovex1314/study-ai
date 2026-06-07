import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day10Modules: ConceptModule[] = [
  {
    id: "d10-m1",
    eyebrow: "Concept 01",
    title: "Eval dataset 是 AI 功能的测试资产",
    summary: "它包含输入、期望行为、评分标准、证据和失败类型。",
    visual: "schema",
    concept: "eval-dataset",
    whyItMatters: "没有 eval dataset，团队无法判断改动是优化还是退化。",
    coreIdeas: ["覆盖高频和高风险场景。","包含反例和边界。","评分规则要可复现。"],
    engineerLens: "像维护单测一样维护 eval。",
    pitfalls: ["只测 happy path","没有评分标准","数据集无人更新"],
    practicePrompt: "为需求评审助手写 10 条 eval 样本字段。",
    fieldExample: "在 Eval dataset 是 AI 功能的测试资产 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d10-m2",
    eyebrow: "Concept 02",
    title: "线上反馈把真实失败带回研发",
    summary: "采纳、编辑、差评、转人工和人工修正都应结构化记录。",
    visual: "workbench",
    concept: "online-feedback",
    whyItMatters: "离线样本永远不完整，真实用户会暴露未知边界。",
    coreIdeas: ["反馈要关联 runId。","编辑后的答案是高价值样本。","反馈要进入 triage。"],
    engineerLens: "把用户行为变成质量信号。",
    pitfalls: ["只收点赞不看原因","反馈不关联版本","修正结果丢失"],
    practicePrompt: "设计 feedback 表字段。",
    fieldExample: "在 线上反馈把真实失败带回研发 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d10-m3",
    eyebrow: "Concept 03",
    title: "红队样本保护高风险边界",
    summary: "用恶意、越权、注入、隐私和误导样本测试系统防线。",
    visual: "tools",
    concept: "red-team",
    whyItMatters: "AI 产品的失败不仅是答错，还包括泄露、越权和执行危险动作。",
    coreIdeas: ["覆盖 prompt injection。","覆盖越权数据请求。","覆盖危险工具调用。"],
    engineerLens: "把红队用例纳入发布门禁。",
    pitfalls: ["只测正常用户","危险工具无模拟","红队样本不上 CI"],
    practicePrompt: "写 5 条 prompt injection 测试。",
    fieldExample: "在 红队样本保护高风险边界 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d10-m4",
    eyebrow: "Concept 04",
    title: "回归测试防止 prompt 和模型退化",
    summary: "每次改 prompt、模型、检索配置，都要跑稳定样本。",
    visual: "budget",
    concept: "regression-testing",
    whyItMatters: "AI 系统输出不完全确定，更需要统计和阈值管理。",
    coreIdeas: ["固定样本集。","记录版本差异。","设置上线阈值。"],
    engineerLens: "把 AI 改动纳入 CI/CD 质量门。",
    pitfalls: ["只凭肉眼看新答案","没有版本对比","阈值随意调整"],
    practicePrompt: "定义一次 prompt 改版的回归流程。",
    fieldExample: "在 回归测试防止 prompt 和模型退化 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  }
];

const day10Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "Golden set",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "线上反馈",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "回归门禁",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day10Lesson: LessonPage = {
  id: "day10",
  path: "/day10",
  title: "Day 10 AI 质量工程",
  phase: "Day10",
  status: "available",
  summary: "设计 eval dataset 与回归流程。",
  hero: "用数据证明 AI 功能变好",
  conceptIntro: "围绕“Eval、反馈、红队与回归测试”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "Eval、反馈、红队与回归测试 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> Golden set -> 线上反馈 -> 回归门禁 -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day10Modules,
  decisionLayers: day10Architecture,
  questions: [
      {
        id: "d10-q1",
        type: "single",
        concept: "eval-dataset",
        prompt: "Eval dataset 是 AI 功能的测试资产最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "它包含输入、期望行为、评分标准、证据和失败类型。", true), option("c", "完全取消系统控制", false)],
        explanation: "它包含输入、期望行为、评分标准、证据和失败类型。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d10-q2",
        type: "single",
        concept: "online-feedback",
        prompt: "线上反馈把真实失败带回研发最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "采纳、编辑、差评、转人工和人工修正都应结构化记录。", true), option("c", "完全取消系统控制", false)],
        explanation: "采纳、编辑、差评、转人工和人工修正都应结构化记录。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d10-q3",
        type: "single",
        concept: "red-team",
        prompt: "红队样本保护高风险边界最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "用恶意、越权、注入、隐私和误导样本测试系统防线。", true), option("c", "完全取消系统控制", false)],
        explanation: "用恶意、越权、注入、隐私和误导样本测试系统防线。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d10-q4",
        type: "single",
        concept: "regression-testing",
        prompt: "回归测试防止 prompt 和模型退化最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "每次改 prompt、模型、检索配置，都要跑稳定样本。", true), option("c", "完全取消系统控制", false)],
        explanation: "每次改 prompt、模型、检索配置，都要跑稳定样本。 工程上要落到边界、数据流和验收。"
      }
  ]
};
