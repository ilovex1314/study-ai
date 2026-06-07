export type ConceptId =
  | "model-cognition"
  | "token"
  | "context"
  | "temperature"
  | "structured-output"
  | "tool-calling"
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
  | "observability";

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
  source?: {
    label: string;
    url: string;
  };
};

export type DecisionLayer = {
  id: string;
  name: string;
  question: string;
  choices: Array<{
    name: string;
    description: string;
    example: string;
  }>;
};

export type LessonQuestion = {
  id: string;
  type: "single";
  concept: ConceptId;
  prompt: string;
  scenario?: string;
  options: Array<{
    id: string;
    label: string;
    correct: boolean;
  }>;
  explanation: string;
};

export type CurrentAttempt = {
  id: string;
  startedAt: string;
  answers: Record<string, string>;
};

export type Attempt = CurrentAttempt & {
  completedAt: string;
  answers: Record<string, string>;
  score: number;
  total: number;
  weakConcepts: ConceptId[];
  recommendations: string[];
};

export type LessonPage = LessonSummary & {
  hero: string;
  conceptIntro: string;
  decisionTitle: string;
  decisionIntro: string;
  decisionExample?: string;
  modules: ConceptModule[];
  decisionLayers: DecisionLayer[];
  questions: LessonQuestion[];
};

export const conceptLabels: Record<ConceptId, string> = {
  "model-cognition": "模型认知",
  token: "Token 成本",
  context: "上下文",
  temperature: "Temperature",
  "structured-output": "结构化输出",
  "tool-calling": "Tool Calling",
  prompting: "Prompt 合约",
  rag: "RAG",
  "retrieval-evaluation": "检索评估",
  "source-grounding": "来源 grounding",
  agent: "Agent",
  workflow: "Workflow",
  memory: "状态与记忆",
  guardrails: "Guardrails",
  "product-delivery": "产品交付",
  "model-gateway": "模型网关",
  "streaming-ux": "Streaming UX",
  observability: "可观测与评估"
};

export const reviewAdvice: Record<ConceptId, string> = {
  "model-cognition": "复习 LLM 与传统函数的差异：模型负责语义判断和生成，业务状态、权限和审计仍由系统控制。",
  token: "复习 token 预算：成本、延迟和上下文噪声都和输入输出长度有关。",
  context: "复习上下文工程：本轮可见信息不等于长期记忆，重要事实要持久化并按需检索。",
  temperature: "复习 temperature：它影响采样发散程度，不保证事实正确。",
  "structured-output": "复习结构化输出：进入系统的数据必须 parse、validate、fallback。",
  "tool-calling": "复习工具调用：模型提出调用意图，系统负责鉴权、执行、日志和回滚。",
  prompting: "复习 Prompt 合约：目标、输入、约束、输出 schema、拒答规则和验收样例都要显式化。",
  rag: "复习 RAG 边界：RAG 是知识注入策略，可以服务 Chat、Workflow 或 Agent，不是产品形态。",
  "retrieval-evaluation": "复习检索评估：先有 golden set，再调 chunk、metadata、rerank 和 prompt。",
  "source-grounding": "复习来源 grounding：回答要能追溯证据， unsupported claim 应拒答或标注不确定。",
  agent: "复习 Agent：它是围绕目标选择步骤和工具的执行实体，不等于聊天页面。",
  workflow: "复习 Workflow：流程明确、风险高、需要审计时优先用确定性流程控制模型节点。",
  memory: "复习状态与记忆：run state、短期上下文和长期偏好要分层保存。",
  guardrails: "复习 Guardrails：输入、输出、工具、权限和人工确认都需要分层防护。",
  "product-delivery": "复习产品交付：AI 功能需要 UX、成本、评估、监控、失败处理和迭代闭环。",
  "model-gateway": "复习模型网关：统一 provider、重试、fallback、超时、token 统计和审计。",
  "streaming-ux": "复习 Streaming UX：流式体验要展示进度、工具状态、引用、取消和可编辑结果。",
  observability: "复习可观测与评估：没有日志、trace、eval 和反馈样本，就无法判断 AI 功能是否变好。"
};
