export type ConceptId =
  "model-cognition"
  | "token"
  | "context"
  | "temperature"
  | "prompting"
  | "rag"
  | "retrieval-evaluation"
  | "source-grounding"
  | "agent"
  | "workflow"
  | "memory"
  | "guardrails"
  | "product-delivery"
  | "model-gateway"
  | "streaming-ux"
  | "observability"
  | "platform-selection"
  | "vendor-lock-in"
  | "framework-fit"
  | "integration-strategy"
  | "typescript-ai-stack"
  | "provider-adapter"
  | "chat-ui-state"
  | "server-boundary"
  | "durable-execution"
  | "checkpointing"
  | "human-interrupt"
  | "state-graph"
  | "visual-workflow"
  | "low-code-automation"
  | "business-validation"
  | "api-bridging"
  | "document-ingestion"
  | "hybrid-search"
  | "permission-filtering"
  | "rag-ops"
  | "eval-dataset"
  | "online-feedback"
  | "red-team"
  | "regression-testing"
  | "context-engineering"
  | "task-decomposition"
  | "prompt-assets"
  | "verification-loop"
  | "capstone-scope"
  | "delivery-plan"
  | "deployment-plan"
  | "postmortem"
  | "design-data"
  | "multi-domain-search"
  | "design-system"
  | "ui-validation"
  | "data-contract"
  | "freshness"
  | "deletion-propagation"
  | "citation-evidence"
  | "untrusted-input"
  | "least-privilege-tool"
  | "policy-enforcement"
  | "audit-trace"
  | "modality-orchestration"
  | "progressive-feedback"
  | "evidence-anchor"
  | "experience-fallback"
  | "unit-economics"
  | "model-routing"
  | "cache-rate-limit"
  | "capacity-protection"
  | "slo"
  | "trace-observability"
  | "rollback-degradation"
  | "incident-postmortem"
  | "versioned-assets"
  | "release-gate"
  | "dataset-drift"
  | "ownership-boundary"
  | "capability-evidence"
  | "north-star-metric"
  | "experiment-design"
  | "roadmap-strategy";

export type LessonStatus = "available" | "planned";

export type LessonSummary = {
  id: string;
  path: string;
  title: string;
  phase: string;
  status: LessonStatus;
  summary: string;
};

export type ConceptDiagram = {
  conclusion: string;
  nodes: Array<{
    id: string;
    label: string;
    tone?: "neutral" | "accent" | "success" | "warning";
  }>;
  edges: Array<{
    from: string;
    to: string;
    label?: string;
    tone?: "default" | "warning";
  }>;
};

export type ArchitectureType =
  | "boundary"
  | "lifecycle"
  | "layered"
  | "state"
  | "feedback"
  | "gate"
  | "flywheel"
  | "pipeline"
  | "tree";

export type ArchitectureNode = {
  id: string;
  label: string;
  tone?: "neutral" | "accent" | "system" | "warning" | "success";
  group?: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
  tone?: "default" | "warning" | "success";
  relation?: "primary" | "feedback" | "branch" | "guard" | "dependency";
};

export type ArchitectureGroup = {
  id: string;
  label: string;
  kind?: "boundary" | "layer" | "lane";
};

export type LessonArchitecture = {
  title: string;
  summary: string;
  type: ArchitectureType;
  renderMode?: "diagram" | "structured-list" | "none";
  nodes: ArchitectureNode[];
  edges?: ArchitectureEdge[];
  groups?: ArchitectureGroup[];
  feedback?: string;
};

export type LessonReference = { label: string; url: string; };

export type ConceptModule = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  visual: "machine" | "budget" | "workbench" | "dial" | "schema" | "tools";
  concept: ConceptId;
  whyItMatters: string;
  coreIdeas: string[];
  engineerLens: string;
  pitfalls: string[];
  practicePrompt: string;
  diagram?: ConceptDiagram;
  fieldExample?: string;
  source?: { label: string; url: string; };
};

export type DecisionLayer = {
  id: string;
  name: string;
  question: string;
  choices: Array<{ name: string; description: string; example: string; }>;
};

export type LessonQuestion = {
  id: string;
  type: "single";
  concept: ConceptId;
  prompt: string;
  scenario?: string;
  options: Array<{ id: string; label: string; correct: boolean; }>;
  explanation: string;
  weight?: number;
};

export type CurrentAttempt = { id: string; startedAt: string; answers: Record<string, string>; };

export type Attempt = CurrentAttempt & { completedAt: string; answers: Record<string, string>; score: number; total: number; weakConcepts: ConceptId[]; recommendations: string[]; };

export type LessonPage = LessonSummary & {
  capabilityGoal?: string;
  verifiableOutput?: string;
  diagramType?: LessonArchitecture["type"];
  references?: LessonReference[];
  hero: string;
  conceptIntro: string;
  decisionTitle: string;
  decisionIntro: string;
  decisionExample?: string;
  architecture?: LessonArchitecture;
  modules: ConceptModule[];
  decisionLayers: DecisionLayer[];
  questions: LessonQuestion[];
};

export const conceptLabels: Record<ConceptId, string> = {
  "model-cognition": "模型认知",
  "token": "Token 成本",
  "context": "上下文",
  "temperature": "Temperature",
  "prompting": "Prompt 合约",
  "rag": "RAG",
  "retrieval-evaluation": "检索评估",
  "source-grounding": "来源 Grounding",
  "agent": "Agent",
  "workflow": "Workflow",
  "memory": "状态与记忆",
  "guardrails": "Guardrails",
  "product-delivery": "产品交付",
  "model-gateway": "模型网关",
  "streaming-ux": "Streaming UX",
  "observability": "可观测与评估",
  "platform-selection": "平台选型",
  "vendor-lock-in": "供应商锁定",
  "framework-fit": "框架适配",
  "integration-strategy": "串联策略",
  "typescript-ai-stack": "TypeScript AI 栈",
  "provider-adapter": "Provider Adapter",
  "chat-ui-state": "Chat UI 状态",
  "server-boundary": "服务端边界",
  "durable-execution": "可恢复执行",
  "checkpointing": "Checkpoint",
  "human-interrupt": "Human Interrupt",
  "state-graph": "状态图",
  "visual-workflow": "可视化工作流",
  "low-code-automation": "低代码自动化",
  "business-validation": "业务验证",
  "api-bridging": "API Bridging",
  "document-ingestion": "文档入库",
  "hybrid-search": "Hybrid Search",
  "permission-filtering": "权限过滤",
  "rag-ops": "RAG 运维",
  "eval-dataset": "Eval Dataset",
  "online-feedback": "线上反馈",
  "red-team": "红队样本",
  "regression-testing": "回归测试",
  "context-engineering": "上下文工程",
  "task-decomposition": "任务拆解",
  "prompt-assets": "Prompt 资产",
  "verification-loop": "验证闭环",
  "capstone-scope": "毕业项目范围",
  "delivery-plan": "交付计划",
  "deployment-plan": "部署方案",
  "postmortem": "项目复盘",
  "design-data": "设计数据",
  "multi-domain-search": "多域检索",
  "design-system": "设计系统",
  "ui-validation": "UI 验收",
  "data-contract": "数据契约",
  "freshness": "新鲜度控制",
  "deletion-propagation": "删除传播",
  "citation-evidence": "引用证据",
  "untrusted-input": "不可信输入",
  "least-privilege-tool": "最小权限工具",
  "policy-enforcement": "策略执行",
  "audit-trace": "审计追踪",
  "modality-orchestration": "多模态编排",
  "progressive-feedback": "渐进反馈",
  "evidence-anchor": "证据锚点",
  "experience-fallback": "体验降级",
  "unit-economics": "单位经济性",
  "model-routing": "模型路由",
  "cache-rate-limit": "缓存与限流",
  "capacity-protection": "容量保护",
  "slo": "SLO",
  "trace-observability": "Trace 可观测",
  "rollback-degradation": "回滚与降级",
  "incident-postmortem": "事故复盘",
  "versioned-assets": "版本化资产",
  "release-gate": "发布门禁",
  "dataset-drift": "数据漂移",
  "ownership-boundary": "责任边界",
  "capability-evidence": "能力证据",
  "north-star-metric": "北极星指标",
  "experiment-design": "实验设计",
  "roadmap-strategy": "路线图策略"
};

export const reviewAdvice: Record<ConceptId, string> = {
  "model-cognition": "复习“模型认知”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "token": "复习“Token 成本”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "context": "复习“上下文”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "temperature": "复习“Temperature”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "prompting": "复习“Prompt 合约”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "rag": "复习“RAG”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "retrieval-evaluation": "复习“检索评估”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "source-grounding": "复习“来源 Grounding”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "agent": "复习“Agent”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "workflow": "复习“Workflow”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "memory": "复习“状态与记忆”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "guardrails": "复习“Guardrails”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "product-delivery": "复习“产品交付”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "model-gateway": "复习“模型网关”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "streaming-ux": "复习“Streaming UX”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "observability": "复习“可观测与评估”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "platform-selection": "复习“平台选型”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "vendor-lock-in": "复习“供应商锁定”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "framework-fit": "复习“框架适配”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "integration-strategy": "复习“串联策略”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "typescript-ai-stack": "复习“TypeScript AI 栈”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "provider-adapter": "复习“Provider Adapter”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "chat-ui-state": "复习“Chat UI 状态”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "server-boundary": "复习“服务端边界”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "durable-execution": "复习“可恢复执行”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "checkpointing": "复习“Checkpoint”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "human-interrupt": "复习“Human Interrupt”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "state-graph": "复习“状态图”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "visual-workflow": "复习“可视化工作流”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "low-code-automation": "复习“低代码自动化”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "business-validation": "复习“业务验证”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "api-bridging": "复习“API Bridging”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "document-ingestion": "复习“文档入库”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "hybrid-search": "复习“Hybrid Search”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "permission-filtering": "复习“权限过滤”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "rag-ops": "复习“RAG 运维”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "eval-dataset": "复习“Eval Dataset”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "online-feedback": "复习“线上反馈”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "red-team": "复习“红队样本”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "regression-testing": "复习“回归测试”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "context-engineering": "复习“上下文工程”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "task-decomposition": "复习“任务拆解”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "prompt-assets": "复习“Prompt 资产”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "verification-loop": "复习“验证闭环”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "capstone-scope": "复习“毕业项目范围”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "delivery-plan": "复习“交付计划”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "deployment-plan": "复习“部署方案”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "postmortem": "复习“项目复盘”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。",
  "design-data": "复习设计数据：重新画出输入数据域及其约束。",
  "multi-domain-search": "复习多域检索：写出一个包含产品、行业和体验约束的查询。",
  "design-system": "复习设计系统：将结果映射为语义 token 和组件状态。",
  "ui-validation": "复习 UI 验收：逐项检查焦点、断点和减弱动效。",
  "data-contract": "复习数据契约：写出 source、owner、tenant、version、acl 和删除策略字段。",
  "freshness": "复习新鲜度控制：说明生效时间、过期时间和业务状态如何影响召回。",
  "deletion-propagation": "复习删除传播：列出原文、chunk、embedding、索引、缓存和引用的清理动作。",
  "citation-evidence": "复习引用证据：把答案引用连接到版本、chunk、锚点和权限状态。",
  "untrusted-input": "复习不可信输入：标出用户、网页、检索片段和工具返回中的注入风险。",
  "least-privilege-tool": "复习最小权限工具：把读、草稿、提交和审批拆成独立权限。",
  "policy-enforcement": "复习策略执行：写出 allow、deny、require approval 三类确定性决策。",
  "audit-trace": "复习审计追踪：记录 actor、resource、action、policy decision、tool result 和 trace id。",
  "modality-orchestration": "复习多模态编排：为图片、语音和文本统一 task、asset、metadata 与输出契约。",
  "progressive-feedback": "复习渐进反馈：设计 queued、processing、partial、done、failed 和 canceled 状态。",
  "evidence-anchor": "复习证据锚点：把输出映射到图片坐标、音频时间段、文本片段或文件版本。",
  "experience-fallback": "复习体验降级：说明实时失败时如何转为异步处理、草稿或稍后通知。",
  "unit-economics": "复习单位经济性：按任务记录 token、检索、工具、存储和人工审核成本。",
  "model-routing": "复习模型路由：根据风险、质量、上下文长度和预算选择模型或降级路径。",
  "cache-rate-limit": "复习缓存与限流：区分可缓存结果、权限敏感内容和重试预算。",
  "capacity-protection": "复习容量保护：为队列积压、限流和预算超限设计保护动作。",
  "slo": "复习 SLO：把成功率、延迟和安全失败率写成用户可感知的目标。",
  "trace-observability": "复习 Trace 可观测：串联模型、检索、工具、版本、成本和输出证据。",
  "rollback-degradation": "复习回滚与降级：定义 kill switch、轻量模型、关闭工具和恢复路径。",
  "incident-postmortem": "复习事故复盘：用时间线、影响、根因、行动项和 owner 完成无责复盘。",
  "versioned-assets": "复习版本化资产：为 prompt、模型、数据集、索引和工作流建立 release id。",
  "release-gate": "复习发布门禁：把 eval、红队、成本、灰度和回滚绑定为 go/no-go 条件。",
  "dataset-drift": "复习数据漂移：识别样本分布、权限、业务规则或用户行为的变化。",
  "ownership-boundary": "复习责任边界：明确产品、研发、安全、运营和回滚 owner。",
  "capability-evidence": "复习能力证据：用任务提交、架构判断、测验、项目结果和复盘证明学习迁移。",
  "north-star-metric": "复习北极星指标：连接用户价值和产品增长，避免只看活跃度。",
  "experiment-design": "复习实验设计：写出假设、样本、指标、成功阈值和停止条件。",
  "roadmap-strategy": "复习路线图策略：把证据、实验和能力缺口转成 90 天优先级。"
};
