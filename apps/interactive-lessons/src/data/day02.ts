import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day02Modules: ConceptModule[] = [
  {
    id: "d2-m1",
    eyebrow: "Concept 01",
    title: "Prompt 是接口合约，不是临场作文",
    summary: "生产 prompt 要定义任务、输入、约束、输出 schema、拒答规则、样例和验收标准。",
    visual: "schema",
    concept: "prompting",
    whyItMatters: "没有合约的 prompt 不能复用、不能评估，也很难排查质量退化。",
    coreIdeas: ["目标和非目标要写清楚。", "输出格式要可解析。", "prompt 应和测试样例一起版本化。"],
    engineerLens: "把 prompt 当 API contract 管理：有版本、有输入输出、有回归样例。",
    pitfalls: ["只写角色不写任务", "没有输出 schema", "每次手工改 prompt"],
    practicePrompt: "把一个模糊需求改写为目标、输入、约束、输出、拒答和验收样例。",
    fieldExample: "需求分析助手的 prompt 应要求输出风险、接口、测试建议和不确定问题，而不是只说“帮我分析需求”。"
  },
  {
    id: "d2-m2",
    eyebrow: "Concept 02",
    title: "RAG 是知识 grounding 策略",
    summary: "RAG 把外部知识检索进上下文，可服务 Chat、Workflow 或 Agent，不是和它们并列的产品形态。",
    visual: "workbench",
    concept: "rag",
    whyItMatters: "私有知识、实时资料和长文档不能靠模型参数记忆解决，需要检索、过滤和引用。",
    coreIdeas: ["文档要先解析、切分、嵌入和索引。", "查询时要检索、重排、压缩再生成。", "引用来源决定答案可信度。"],
    engineerLens: "RAG 的关键是数据治理、metadata、召回质量和评估集，不是向量库品牌。",
    pitfalls: ["上传文档就叫 RAG", "没有权限过滤", "没有引用和拒答策略"],
    practicePrompt: "为内部知识库定义 chunk、metadata、检索、重排、引用和低置信 fallback。",
    fieldExample: "退款政策问答要按地区、产品版本和生效时间过滤文档，再要求答案引用来源。",
    source: { label: "OpenAI Retrieval", url: "https://platform.openai.com/docs/guides/retrieval" }
  },
  {
    id: "d2-m3",
    eyebrow: "Concept 03",
    title: "检索质量要用 golden set 评估",
    summary: "RAG 调优要围绕问题、期望证据、可接受答案和失败原因，而不是凭几次主观体验判断。",
    visual: "budget",
    concept: "retrieval-evaluation",
    whyItMatters: "没有评估集就无法判断 chunk、embedding、rerank、prompt 哪个调整真的变好。",
    coreIdeas: ["先评召回证据，再评生成答案。", "问题集要覆盖正常、边界、无答案和权限场景。", "失败样本要回流到数据和 prompt 设计。"],
    engineerLens: "用小而稳定的 golden set 保护迭代，避免每次优化都只是改了几个 demo 样例。",
    pitfalls: ["只看最终回答不看证据", "没有 no-answer 样本", "改 chunk 后不回归测试"],
    practicePrompt: "写 6 条知识库评估样例：问题、期望来源、可接受答案、失败模式。",
    fieldExample: "客服知识库要测试“找不到来源时拒答”，否则模型会编一个看似合理的政策。"
  },
  {
    id: "d2-m4",
    eyebrow: "Concept 04",
    title: "Grounded answer 要区分事实和推断",
    summary: "答案应能追溯证据，并明确哪些是来源事实，哪些是模型基于事实做出的推断。",
    visual: "tools",
    concept: "source-grounding",
    whyItMatters: "用户信任来自可验证来源，而不是流畅文本。生产系统要避免 unsupported claim。",
    coreIdeas: ["来源覆盖不足时要拒答或标注不确定。", "引用要对应具体片段，不只是文档名。", "答案 validator 应检查 schema 和 citation coverage。"],
    engineerLens: "把来源校验放在生成后处理里：解析答案、核对引用、检查不支持断言。",
    pitfalls: ["只有文末来源列表", "引用和结论对不上", "把模型推断写成事实"],
    practicePrompt: "为 RAG 答案设计 validator：字段、引用覆盖、拒答条件和日志。",
    fieldExample: "法务制度助手回答请假天数时必须引用制度条款，不能只说“通常是 3 天”。"
  }
];

const day02Architecture: DecisionLayer[] = [
  {
    id: "ingestion",
    name: "知识入库",
    question: "资料如何变成可检索资产？",
    choices: [
      { name: "解析与切分", description: "把文档转成有边界的 chunks。", example: "按标题、段落和表格切政策文档。" },
      { name: "Embedding 与索引", description: "把 chunks 写入向量库并附带 metadata。", example: "region/version/permission/sourceUrl。" }
    ]
  },
  {
    id: "retrieval",
    name: "检索链路",
    question: "查询如何变成可用证据？",
    choices: [
      { name: "召回", description: "关键词、向量和过滤器找候选证据。", example: "先按产品版本过滤，再做语义搜索。" },
      { name: "重排与压缩", description: "减少噪声，把最关键证据塞进上下文。", example: "rerank top20 到 top5。" }
    ]
  },
  {
    id: "answering",
    name: "生成与校验",
    question: "答案如何保证可追溯？",
    choices: [
      { name: "Prompt 合约", description: "要求引用、拒答和结构化字段。", example: "没有来源时返回 unsupported。" },
      { name: "Answer Validator", description: "检查引用覆盖和 schema。", example: "答案事实必须对应 sourceId。" }
    ]
  }
];

export const day02Lesson: LessonPage = {
    id: "day02",
    path: "/day02",
    title: "Day 02 Prompt / RAG / Grounding",
    phase: "Day02",
    status: "available",
    summary: "把 prompt 变成接口合约，设计可评估的知识 grounding 与 RAG 链路。",
    hero: "从会问模型到会设计知识系统",
    conceptIntro: "今天重点不是背 RAG 定义，而是理解资料如何进入索引、如何被检索、如何支撑可验证答案。",
    decisionTitle: "RAG 数据流与质量闸门",
    decisionIntro: "RAG 的质量来自 ingestion、retrieval、rerank、context builder、answer validator 和 eval，而不是向量库名字。",
    decisionExample: "内部政策助手按地区和版本过滤文档，引用具体条款；找不到来源时拒答而不是编答案。",
    modules: day02Modules,
    decisionLayers: day02Architecture,
    questions: [
      {
        id: "d2-q1",
        type: "single",
        concept: "prompting",
        prompt: "生产 prompt 最像什么？",
        options: [option("a", "接口合约", true), option("b", "一次性作文"), option("c", "CSS 变量"), option("d", "数据库索引")],
        explanation: "生产 prompt 要定义目标、输入、约束、输出 schema、拒答规则和验收样例。"
      },
      {
        id: "d2-q2",
        type: "single",
        concept: "rag",
        prompt: "RAG 和 Chat/Agent 的关系更准确的是？",
        options: [
          option("a", "RAG 是知识 grounding 策略，可服务 Chat、Workflow 或 Agent", true),
          option("b", "RAG 是一种聊天 UI"),
          option("c", "RAG 必须替代 Agent"),
          option("d", "RAG 只等于向量数据库")
        ],
        explanation: "RAG 是把外部知识检索进上下文的策略，不是产品形态。"
      },
      {
        id: "d2-q3",
        type: "single",
        concept: "retrieval-evaluation",
        prompt: "调 RAG 前最应该先准备什么？",
        options: [option("a", "更花的 UI"), option("b", "golden evaluation set", true), option("c", "更多 temperature"), option("d", "隐藏引用")],
        explanation: "没有问题、期望证据和可接受答案，就无法判断检索调整是否真的变好。"
      },
      {
        id: "d2-q4",
        type: "single",
        concept: "source-grounding",
        prompt: "Grounded answer 的关键是什么？",
        options: [option("a", "回答越长越好"), option("b", "结论能追溯到具体证据", true), option("c", "不用引用来源"), option("d", "只使用高 temperature")],
        explanation: "可验证来源是用户信任和生产审计的基础。"
      }
    ]
  };
