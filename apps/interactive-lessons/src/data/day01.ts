import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day01Modules: ConceptModule[] = [
  {
    id: "d1-m1",
    eyebrow: "Concept 01",
    title: "LLM 不是函数，是概率决策器",
    summary: "同样输入不必然得到同样输出，模型根据上下文预测 token 分布再采样生成。",
    visual: "machine",
    concept: "model-cognition",
    whyItMatters: "如果把模型当后端函数，就会把权限、金额和状态变更交给不稳定文本。",
    coreIdeas: ["传统代码追求确定性，LLM 追求条件生成。","模型输出需要系统校验，不能直接当事实。","业务控制平面应留在工程系统里。"],
    engineerLens: "把 LLM 当语义判断和生成组件，把状态机、权限、审计、重试、人工确认留给后端。",
    pitfalls: ["把模型回答当数据库事实","让模型直接决定高风险动作","只看 demo 不看失败模式"],
    practicePrompt: "选一个熟悉业务，标出哪些环节可交给 LLM，哪些必须由确定性系统控制。",
    fieldExample: "在 LLM 不是函数，是概率决策器 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d1-m2",
    eyebrow: "Concept 02",
    title: "Token 是成本、延迟和注意力预算",
    summary: "输入越长、输出越长，通常成本越高、延迟越大，噪声也越多。",
    visual: "budget",
    concept: "token",
    whyItMatters: "真实项目要先检索、筛选和压缩，再把最相关上下文交给模型。",
    coreIdeas: ["prompt、历史消息、检索结果、工具结果和输出都会消耗 token。","更多文字不等于更多有效信息。","上下文管理是 AI 产品的成本控制入口。"],
    engineerLens: "先用搜索定位资料，再读取必要片段；不要把整仓库或整份文档塞进上下文。",
    pitfalls: ["整篇文档直接进 prompt","每轮重复粘贴稳定约定","不区分输入和输出 token 成本"],
    practicePrompt: "把一个长需求压缩成目标、约束、事实、验收四段。",
    fieldExample: "在 Token 是成本、延迟和注意力预算 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d1-m3",
    eyebrow: "Concept 03",
    title: "上下文不是长期记忆",
    summary: "上下文只代表本轮请求可见的信息，项目约定和历史结论要显式持久化。",
    visual: "workbench",
    concept: "context",
    whyItMatters: "该保存的信息丢了、不该进上下文的噪声进来了，模型再强也会不稳定。",
    coreIdeas: ["上下文窗口是本轮可见范围。","长期知识应进入数据库、索引或对象存储。","任务状态和用户偏好要分层保存。"],
    engineerLens: "设计 memory schema：什么进本轮上下文，什么存长期，什么由工具实时查。",
    pitfalls: ["把长上下文当记忆系统","不记录来源","让用户以为模型记住了全部历史"],
    practicePrompt: "为项目助手设计 memory schema：项目约定、用户偏好、临时任务状态分别怎么存。",
    fieldExample: "在 上下文不是长期记忆 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  },
  {
    id: "d1-m4",
    eyebrow: "Concept 04",
    title: "Temperature 控制发散，不控制事实正确",
    summary: "temperature 影响采样随机性，不替代检索、校验和评估。",
    visual: "dial",
    concept: "temperature",
    whyItMatters: "低温能减少随机性，但事实错误和工具参数错误仍要靠系统侧控制。",
    coreIdeas: ["低温适合分类、抽取、结构化输出。","中高温适合创意发散和候选生成。","事实正确性主要依赖上下文、工具查询和评估。"],
    engineerLens: "把 temperature 当采样参数，不要当可靠性开关。",
    pitfalls: ["以为 temperature=0 就一定正确","用高温做结构化抽取","用调参代替事实校验"],
    practicePrompt: "为分类、客服回复、方案 brainstorm、JSON 抽取分别选择 temperature 范围。",
    fieldExample: "在 Temperature 控制发散，不控制事实正确 相关工作中，先把边界和验收写出来，再让模型或平台参与生成。",
    source: { label: "OpenAI Agents SDK", url: "https://platform.openai.com/docs/guides/agents-sdk/" }
  }
];

const day01Architecture: DecisionLayer[] = [
  {
    id: "layer-1",
    name: "控制边界",
    question: "哪些逻辑必须确定性控制？",
    choices: [
      { name: "系统控制", description: "权限、金额、状态、审计、重试和回滚留在后端。", example: "退款金额由规则计算。" },
      { name: "模型判断", description: "意图识别、总结、生成和语义归类交给模型。", example: "识别用户是在咨询退款还是投诉物流。" }
    ]
  },
  {
    id: "layer-2",
    name: "上下文策略",
    question: "本轮需要哪些信息？",
    choices: [
      { name: "即时上下文", description: "任务输入、相关片段、工具结果。", example: "本次工单和订单状态。" },
      { name: "长期记忆", description: "用户偏好、项目约定、历史结论。", example: "团队 API 命名规范。" }
    ]
  },
  {
    id: "layer-3",
    name: "可靠性策略",
    question: "如何处理不稳定输出？",
    choices: [
      { name: "结构化输出", description: "用 schema 约束模型结果。", example: "返回 intent/confidence/entities。" },
      { name: "评估与兜底", description: "用测试样例、重试、人工确认保护关键路径。", example: "低置信度转人工。" }
    ]
  }
];

export const day01Lesson: LessonPage = {
  id: "day01",
  path: "/day01",
  title: "Day 01 模型认知",
  phase: "Day01",
  status: "available",
  summary: "理解 LLM 的概率本质、上下文、token、temperature 和工程边界。",
  hero: "把 AI 名词变成工程判断力",
  conceptIntro: "把“模型会回答”拆成可工程化的能力边界。完成后，你应该能判断一个需求适合 Chat、RAG、Agent、Workflow 还是 Fine-tuning，并说清楚成本、延迟和失败模式。",
  decisionTitle: "模型认知与能力边界 架构判断",
  decisionIntro: "用户输入 -> 意图识别 -> 上下文预算 -> 模型生成草稿 -> schema 校验 -> 业务系统决策 -> 输出/人工确认 高风险动作要走确定性状态机；模型只能提出建议或生成解释。",
  decisionExample: "退款助手中，模型识别用户诉求并生成解释；退款资格、金额、风控和状态变更由后端规则与审计系统控制。",
  modules: day01Modules,
  decisionLayers: day01Architecture,
  questions: [
      {
        id: "d1-q1",
        type: "single",
        concept: "model-cognition",
        prompt: "为什么不能把 LLM 当普通后端函数？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "因为 LLM 无法输出中文", false), option("b", "因为 LLM 基于概率生成，关键控制要系统兜底", true), option("c", "因为 LLM 只能做图片任务", false)],
        explanation: "因为它基于概率生成，业务状态、权限和审计需要确定性系统控制。"
      },
      {
        id: "d1-q2",
        type: "single",
        concept: "token",
        prompt: "token 预算主要影响什么？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "成本、延迟和注意力质量", true), option("b", "只影响 UI 样式", false), option("c", "只影响数据库大小", false)],
        explanation: "token 同时影响成本、延迟和上下文噪声。"
      },
      {
        id: "d1-q3",
        type: "single",
        concept: "context",
        prompt: "为什么上下文不等于长期记忆？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "因为上下文只能存图片", false), option("b", "因为上下文是本轮输入范围，不能替代持久化记忆", true), option("c", "因为上下文不会消耗 token", false)],
        explanation: "上下文是本轮可见信息，长期事实要持久化并按需检索。"
      },
      {
        id: "d1-q4",
        type: "single",
        concept: "temperature",
        prompt: "temperature=0 能保证事实正确吗？",
        scenario: "把这个问题放到真实产品或团队工程流程里判断。",
        options: [option("a", "能，所有答案都会正确", false), option("b", "不能，它不是事实校验机制", true), option("c", "能，它会自动调用数据库", false)],
        explanation: "不能，它只降低采样发散，事实正确要靠证据、工具和校验。"
      }
  ]
};
