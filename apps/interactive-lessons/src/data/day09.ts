import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day09Modules: ConceptModule[] = [
  {
    id: "d9-m1",
    eyebrow: "Concept 01",
    title: "文档入库是 RAG 上限",
    summary: "解析、清洗、切分、去重、版本和元数据决定能检索到什么。",
    visual: "machine",
    concept: "document-ingestion",
    whyItMatters: "糟糕入库会让后续 rerank 和 prompt 都在错误数据上补救。",
    coreIdeas: ["保留结构和来源。","表格、代码、图片要单独处理。","版本和权限是 metadata。"],
    engineerLens: "先做好数据管道，再调模型。",
    pitfalls: ["把 PDF 纯文本一切到底","不记录版本","重复文档污染索引"],
    practicePrompt: "设计一条 Markdown/PDF/网页入库管道。",
    fieldExample: "在 文档入库是 RAG 上限 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d9-m2",
    eyebrow: "Concept 02",
    title: "Hybrid search 兼顾语义和精确匹配",
    summary: "向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。",
    visual: "tools",
    concept: "hybrid-search",
    whyItMatters: "真实业务查询经常同时包含概念和精确实体。",
    coreIdeas: ["BM25 处理精确词。","向量处理语义近义。","rerank 负责最终排序。"],
    engineerLens: "按查询类型选择检索组合。",
    pitfalls: ["只用向量搜错误码","只用关键词搜概念","不做 rerank"],
    practicePrompt: "设计三类 query 的检索策略。",
    fieldExample: "在 Hybrid search 兼顾语义和精确匹配 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d9-m3",
    eyebrow: "Concept 03",
    title: "权限过滤必须进入检索层",
    summary: "多租户和企业知识库要在召回前后都控制可见范围。",
    visual: "schema",
    concept: "permission-filtering",
    whyItMatters: "如果先召回再让模型“不要泄露”，已经太晚了。",
    coreIdeas: ["用户身份映射到 source scope。","metadata filter 先限制候选。","引用展示也要检查权限。"],
    engineerLens: "权限是检索条件，不是 prompt 建议。",
    pitfalls: ["跨租户召回","引用隐藏但答案泄露","权限变更不重建索引"],
    practicePrompt: "设计 tenantId、role、sourceAcl 的过滤规则。",
    fieldExample: "在 权限过滤必须进入检索层 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d9-m4",
    eyebrow: "Concept 04",
    title: "RAG 运维关注漂移和回归",
    summary: "文档更新、索引重建、检索参数和 prompt 版本都会影响答案。",
    visual: "budget",
    concept: "rag-ops",
    whyItMatters: "RAG 不是一次性导入，而是持续运维系统。",
    coreIdeas: ["索引要有版本。","eval 要定期跑。","失败问题要回流。"],
    engineerLens: "把 RAG 当搜索产品运营。",
    pitfalls: ["文档更新后不重建","无索引版本","失败样本没人看"],
    practicePrompt: "写 RAG 运营周报字段。",
    fieldExample: "在 RAG 运维关注漂移和回归 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  }
];

const day09Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "入库治理",
    question: "今天首先要决定什么？",
    choices: [
      { name: "快验证", description: "用最短路径证明业务价值。", example: "平台原型或薄后端 demo。" },
      { name: "强控制", description: "用自研边界保证权限、状态和审计。", example: "核心数据写入走后端。" }
    ]
  },
  {
    id: "layer-2",
    name: "权限过滤",
    question: "系统边界如何划分？",
    choices: [
      { name: "平台/SDK 能力", description: "复用成熟流式、工具或编排能力。", example: "用 SDK 处理 provider 差异。" },
      { name: "自研控制面", description: "保留鉴权、日志、状态和成本。", example: "统一 run log 和 gateway。" }
    ]
  },
  {
    id: "layer-3",
    name: "RAG eval",
    question: "怎样判断做对了？",
    choices: [
      { name: "验收样本", description: "用样例、测试或 checklist 验证。", example: "10 条 golden cases。" },
      { name: "复盘指标", description: "记录成本、失败和用户反馈。", example: "按 runId 聚合质量。" }
    ]
  }
];

export const day09Lesson: LessonPage = {
  id: "day09",
  path: "/day09",
  title: "Day 09 RAG 深水区",
  phase: "Day09",
  status: "available",
  summary: "设计带权限和评估的 RAG 服务。",
  hero: "让知识问答进入生产水位",
  conceptIntro: "围绕“检索、重排、权限、多租户与评估”形成可执行工程判断。完成后，你应该能把相关工具、架构边界、数据流和验收方式讲清楚，并产出一个可以继续实现的小设计。",
  decisionTitle: "检索、重排、权限、多租户与评估 架构判断",
  decisionIntro: "用户/业务目标 -> 约束识别 -> 入库治理 -> 权限过滤 -> RAG eval -> 验收与反馈。 架构重点是分清平台能力、自研服务、数据资产、权限控制和质量闭环的责任。",
  decisionExample: "以“AI 工程项目助手”为例，本日主题会决定它如何选择技术栈、如何串联工具、如何保存运行记录，以及如何证明输出质量。",
  modules: day09Modules,
  decisionLayers: day09Architecture,
  questions: [
      {
        id: "d9-q1",
        type: "single",
        concept: "document-ingestion",
        prompt: "文档入库是 RAG 上限最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "解析、清洗、切分、去重、版本和元数据决定能检索到什么。", true), option("c", "完全取消系统控制", false)],
        explanation: "解析、清洗、切分、去重、版本和元数据决定能检索到什么。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d9-q2",
        type: "single",
        concept: "hybrid-search",
        prompt: "Hybrid search 兼顾语义和精确匹配最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。", true), option("c", "完全取消系统控制", false)],
        explanation: "向量适合语义，关键词适合 ID、错误码、产品名，混合后再 rerank。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d9-q3",
        type: "single",
        concept: "permission-filtering",
        prompt: "权限过滤必须进入检索层最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "多租户和企业知识库要在召回前后都控制可见范围。", true), option("c", "完全取消系统控制", false)],
        explanation: "多租户和企业知识库要在召回前后都控制可见范围。 工程上要落到边界、数据流和验收。"
      },
      {
        id: "d9-q4",
        type: "single",
        concept: "rag-ops",
        prompt: "RAG 运维关注漂移和回归最主要解决什么问题？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "让页面更花哨", false), option("b", "文档更新、索引重建、检索参数和 prompt 版本都会影响答案。", true), option("c", "完全取消系统控制", false)],
        explanation: "文档更新、索引重建、检索参数和 prompt 版本都会影响答案。 工程上要落到边界、数据流和验收。"
      }
  ]
};
