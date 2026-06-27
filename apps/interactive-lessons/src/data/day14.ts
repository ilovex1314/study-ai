import { createP0Lesson } from "./p0LessonFactory";

export const day14Lesson = createP0Lesson({
  id: "day14",
  phase: "Day14",
  title: "数据治理与知识生命周期",
  summary: "为知识库设计可追溯、可权限过滤、可更新、可删除的摄取链路。",
  capabilityGoal: "为知识库设计可追溯、可权限过滤、可更新、可删除的摄取链路。",
  verifiableOutput: "知识生命周期图与 metadata contract。",
  diagramType: "lifecycle",
  hero: "让知识从入库到删除都可追踪",
  conceptIntro: "用数据契约、新鲜度、删除传播和引用证据治理生产 RAG。",
  decisionTitle: "知识生命周期：从源文件到可复核引用",
  decisionIntro: "知识源进入系统后会派生出解析结果、chunk、embedding、索引、缓存、trace 和引用；任何更新、撤回或权限变更都必须沿派生链传播。",
  decisionExample: "企业制度助手在 HR 撤回旧制度后，清理 chunk、embedding 和缓存，并把旧 trace 标记为引用失效。",
  modules: [
    { title: "数据契约让知识可治理", summary: "数据契约规定 source、owner、tenant、sensitivity、effective_at、expires_at、version、delete_policy 和 access_scope。", concept: "data-contract", whyItMatters: "没有契约，知识进入系统后无法追踪、过滤或删除。", coreIdeas: ["记录来源、owner、租户与敏感级别。", "版本、生效时间和删除策略进入 metadata。", "契约不能替代内容质量审核。"], engineerLens: "把 metadata schema 当作知识系统的第一层接口。", pitfalls: ["只保存文件名和向量 ID", "没有版本字段", "权限不进入索引"], practicePrompt: "为员工制度知识库写 metadata schema。", diagram: { conclusion: "metadata 把知识源、派生资产、权限和引用连接成可追踪生命周期。", nodes: [{ id: "source", label: "知识源" }, { id: "metadata", label: "Metadata", tone: "accent" }, { id: "derived", label: "Chunk / Embedding", tone: "success" }, { id: "citation", label: "引用证据" }], edges: [{ from: "source", to: "metadata" }, { from: "metadata", to: "derived" }, { from: "derived", to: "citation" }, { from: "metadata", to: "citation", label: "权限与版本", tone: "warning" }] }, source: { label: "OpenAI Retrieval and file search concepts", url: "https://platform.openai.com/docs/guides/tools-file-search" } },
    { title: "新鲜度控制避免旧知识伪装成事实", summary: "检索相似不代表内容仍有效，新鲜度要通过生效时间、过期时间、版本和业务状态影响召回。", visual: "dial", concept: "freshness", whyItMatters: "过期政策、合同或产品文档被引用会直接制造生产事故。", coreIdeas: ["相似度不是事实有效性。", "不同业务域有不同生命周期。", "回答时要能说明证据版本。"], engineerLens: "把 validity window 和业务状态纳入检索过滤或重排。", pitfalls: ["只看向量分数", "旧文档永不过期", "答案不展示版本"], practicePrompt: "为政策、FAQ、会议纪要分别定义过期策略。" },
    { title: "删除传播必须覆盖派生资产", summary: "源文件撤回后，原文、解析结果、chunk、embedding、索引、缓存、回答引用和 trace 都要能定位。", visual: "tools", concept: "deletion-propagation", whyItMatters: "只删原文件会留下仍可被检索和引用的残留知识。", coreIdeas: ["删除事件要幂等。", "派生资产要可反查。", "审计保留删除事实而非敏感原文。"], engineerLens: "为每个 source id 建 derived asset manifest。", pitfalls: ["只删对象存储 PDF", "缓存不失效", "向量索引残留"], practicePrompt: "写出文档撤回的补偿任务清单。" },
    { title: "引用要指向可复核证据", summary: "引用至少连接 document version、chunk id、位置锚点、权限状态和生成时快照。", visual: "workbench", concept: "citation-evidence", whyItMatters: "用户和审核者需要知道答案来自哪份内容、对谁可见、何时有效。", coreIdeas: ["引用不是普通 URL。", "证据要能回跳到原文位置。", "引用仍需 grounding 校验。"], engineerLens: "把 citation schema 作为回答结构的一部分。", pitfalls: ["只返回网页 URL", "无 chunk id", "引用不检查权限"], practicePrompt: "为一个答案设计 citation JSON 字段。" }
  ],
  decisionLayers: [
    { id: "ingestion", name: "入库契约", question: "知识进入系统时必须带什么？", choices: [{ name: "Metadata", description: "来源、owner、租户、版本和权限进入 schema。", example: "source_id + acl + version" }, { name: "裸文本", description: "只能生成，不能治理。", example: "plain chunk" }] },
    { id: "change", name: "变更传播", question: "更新或撤回如何处理？", choices: [{ name: "事件驱动补偿", description: "定位派生资产并清理或重建。", example: "delete event" }, { name: "等待下次重建", description: "会留下旧索引和旧缓存。", example: "stale answer" }] },
    { id: "answer", name: "可复核回答", question: "答案如何证明来源？", choices: [{ name: "结构化引用", description: "引用连接版本、chunk 和权限状态。", example: "doc v3 / chunk 12" }, { name: "普通链接", description: "不能证明生成时证据。", example: "homepage URL" }] }
  ],
  questions: [
    { concept: "data-contract", weight: 25, prompt: "数据契约最应该解决什么问题？", correct: "让知识进入系统后可追踪、可过滤、可删除", distractors: ["让文档标题更长", "让模型不用引用"], explanation: "数据契约是治理知识生命周期的基础。" },
    { concept: "freshness", weight: 25, prompt: "为什么向量相似度不能代表事实仍有效？", correct: "因为相似度不反映版本、生效时间和业务状态", distractors: ["因为向量库不能存文本", "因为旧文档都应该最高权重"], explanation: "新鲜度要由 metadata 和业务规则参与控制。" },
    { concept: "deletion-propagation", weight: 25, prompt: "删除事件为什么不能只删原文件？", correct: "chunk、embedding、缓存和引用等派生资产仍可能残留", distractors: ["删除原文件一定会删除数据库", "删除不需要审计"], explanation: "删除传播必须覆盖所有派生资产。" },
    { concept: "citation-evidence", weight: 25, prompt: "引用只保存 URL 的风险是什么？", correct: "无法定位版本、chunk、权限和生成时证据", distractors: ["URL 不能显示中文", "URL 会自动防止越权"], explanation: "生产引用要能复核具体证据。" }
  ],
  references: [
    { label: "OpenAI Retrieval and file search concepts", url: "https://platform.openai.com/docs/guides/tools-file-search" },
    { label: "LangChain indexing and record management", url: "https://python.langchain.com/docs/how_to/indexing/" },
    { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" }
  ]
});
