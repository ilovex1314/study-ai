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
  | "postmortem";

export type LessonStatus = "available" | "planned";

export type LessonSummary = {
  id: string;
  path: string;
  title: string;
  phase: string;
  status: LessonStatus;
  summary: string;
};

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
};

export type CurrentAttempt = { id: string; startedAt: string; answers: Record<string, string>; };

export type Attempt = CurrentAttempt & { completedAt: string; answers: Record<string, string>; score: number; total: number; weakConcepts: ConceptId[]; recommendations: string[]; };

export type LessonPage = LessonSummary & { hero: string; conceptIntro: string; decisionTitle: string; decisionIntro: string; decisionExample?: string; modules: ConceptModule[]; decisionLayers: DecisionLayer[]; questions: LessonQuestion[]; };

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
  "postmortem": "项目复盘"
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
  "postmortem": "复习“项目复盘”：回到对应概念卡，重新写一遍它解决的问题、系统边界、常见误区和一个生产验收方法。"
};
