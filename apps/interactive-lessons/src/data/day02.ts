import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day02Modules: ConceptModule[] = [
  {
    id: "d2-m1",
    eyebrow: "Concept 01",
    title: "Prompt 是可测试的接口合约",
    summary: "生产 prompt 定义任务、输入、约束、输出 schema、拒答规则和示例。",
    visual: "schema",
    concept: "prompting",
    whyItMatters: "它让模型输出可复用、可评估、可回归，而不是靠一次性措辞碰运气。",
    coreIdeas: ["system message 负责角色和边界。","开发者指令定义任务流程和输出格式。","few-shot 示例用来固定难以描述的判断标准。"],
    engineerLens: "像设计 API 一样设计 prompt：字段、错误、版本、验收样例都要可追踪。",
    pitfalls: ["只写“你是专家”","没有 schema 和拒答规则","prompt 变化没有版本"],
    practicePrompt: "为需求评审助手写一版 prompt 合约：输入、输出 JSON、拒答规则和两个示例。",
    fieldExample: "在 Prompt 是可测试的接口合约 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d2-m2",
    eyebrow: "Concept 02",
    title: "RAG 是知识注入策略，不是万能形态",
    summary: "RAG 通过检索把外部知识放入本轮上下文，服务 Chat、Workflow 或 Agent。",
    visual: "workbench",
    concept: "rag",
    whyItMatters: "动态知识、长文档和权限范围不能靠模型参数记忆解决。",
    coreIdeas: ["RAG 适合动态知识和可追溯问答。","入库质量决定召回上限。","RAG 仍需要 prompt、引用和 eval。"],
    engineerLens: "先判断知识是否动态、是否需要引用、是否受权限约束，再决定 RAG。",
    pitfalls: ["把 RAG 当成聊天产品本身","只换向量库不改数据质量","无权限过滤"],
    practicePrompt: "列出一个内部知识库的 source、chunk、metadata 和权限字段。",
    fieldExample: "在 RAG 是知识注入策略，不是万能形态 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d2-m3",
    eyebrow: "Concept 03",
    title: "检索质量要用样例集调参",
    summary: "没有 golden set，就不知道改 chunk、embedding、rerank 还是 prompt。",
    visual: "budget",
    concept: "retrieval-evaluation",
    whyItMatters: "检索错了，模型会在错误证据上写出看似合理的答案。",
    coreIdeas: ["问题要绑定期望证据。","召回率和引用准确率要分开看。","失败样本要回流到评估集。"],
    engineerLens: "先建 20 条高频问题，再调检索策略。",
    pitfalls: ["只看单次 demo","没有 expected evidence","把答案质量和召回质量混在一起"],
    practicePrompt: "写 5 条 golden questions：问题、期望证据、可接受答案、失败备注。",
    fieldExample: "在 检索质量要用样例集调参 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  },
  {
    id: "d2-m4",
    eyebrow: "Concept 04",
    title: "Grounding 要让答案可追溯",
    summary: "回答必须区分证据、推断和不确定，不支持的结论要拒答或标注。",
    visual: "tools",
    concept: "source-grounding",
    whyItMatters: "用户真正需要的是可信答案，不是流畅文本。",
    coreIdeas: ["引用覆盖核心结论。","上下文不足时拒答。","模型推断要明确标注。"],
    engineerLens: "把引用校验作为生成后的 validator，而不是靠 prompt 祈祷。",
    pitfalls: ["没有引用也强答","引用和结论不匹配","把推断写成事实"],
    practicePrompt: "设计一个回答 validator：citation coverage、schema、unsupported claim 三项检查。",
    fieldExample: "在 Grounding 要让答案可追溯 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "Vercel AI SDK", url: "https://vercel.com/ai-sdk" }
  }
];

const day02Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "入库链路",
    question: "知识如何变成可检索资产？",
    choices: [
      { name: "解析切分", description: "把文档变成语义完整的 chunk。", example: "按标题、段落和表格边界切分。" },
      { name: "元数据索引", description: "保留来源、版本、权限和时间。", example: "按产品版本过滤。" }
    ]
  },
  {
    id: "layer-2",
    name: "查询链路",
    question: "问题如何找到正确证据？",
    choices: [
      { name: "混合检索", description: "同时处理语义和精确词。", example: "错误码用关键词，概念问题用向量。" },
      { name: "Rerank", description: "从候选中压缩最相关证据。", example: "top20 召回后重排 top5。" }
    ]
  },
  {
    id: "layer-3",
    name: "回答链路",
    question: "如何避免 unsupported claim？",
    choices: [
      { name: "引用约束", description: "关键结论必须绑定来源。", example: "答案段落附 source id。" },
      { name: "拒答兜底", description: "证据不足时说明缺口。", example: "缺少最新政策时转人工。" }
    ]
  }
];

export const day02Lesson: LessonPage = {
  id: "day02",
  path: "/day02",
  title: "Day 02 Prompt / RAG / Grounding",
  phase: "Day02",
  status: "available",
  summary: "把“问模型”升级成 prompt 合约、检索、引用、评估和反馈闭环。",
  hero: "让模型回答有证据、有边界",
  conceptIntro: "学会把业务输入组织成稳定 prompt 合约，判断什么时候需要 RAG，并画出从文档入库到带引用回答的完整链路。",
  decisionTitle: "Prompt、RAG 与知识 grounding 架构判断",
  decisionIntro: "离线：知识源 -> 解析 -> chunk -> embedding -> metadata -> hybrid index。 在线：问题 -> 查询改写 -> 检索 -> rerank -> context pack -> prompt -> model -> 引用校验 -> 回答。",
  decisionExample: "内部政策助手按地区和版本过滤文档，召回证据片段，要求模型带引用回答，并在引用覆盖不足时拒答。",
  modules: day02Modules,
  decisionLayers: day02Architecture,
  questions: [
      {
        id: "d2-q1",
        type: "single",
        concept: "prompting",
        prompt: "生产 prompt 最像什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "随手写的聊天开场白", false), option("b", "可测试的接口合约", true), option("c", "数据库索引", false)],
        explanation: "它更像接口合约，需要输入、约束、schema 和验收样例。"
      },
      {
        id: "d2-q2",
        type: "single",
        concept: "rag",
        prompt: "什么时候更应该考虑 RAG？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "问题只需要固定格式转换", false), option("b", "需要基于外部动态知识并可引用", true), option("c", "只想让语气更像品牌", false)],
        explanation: "当知识动态、长、需要引用或受权限约束时。"
      },
      {
        id: "d2-q3",
        type: "single",
        concept: "retrieval-evaluation",
        prompt: "检索 golden set 至少要包含什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "按钮颜色和字号", false), option("b", "问题、期望证据和可接受答案", true), option("c", "只包含模型最终回答", false)],
        explanation: "问题、期望证据、可接受答案和失败备注。"
      },
      {
        id: "d2-q4",
        type: "single",
        concept: "source-grounding",
        prompt: "证据不足时最安全的回答策略是什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "编一个合理答案", false), option("b", "拒答或标注不确定", true), option("c", "降低 temperature 后继续强答", false)],
        explanation: "拒答或说明不确定，并请求更多证据。"
      }
  ]
};
