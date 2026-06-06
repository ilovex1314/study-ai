export type ConceptId =
  | "model-cognition"
  | "token"
  | "context"
  | "temperature"
  | "structured-output"
  | "tool-calling"
  | "rag"
  | "agent"
  | "workflow"
  | "fine-tuning"
  | "prompting"
  | "evaluation"
  | "product-delivery";

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
  context: "上下文窗口",
  temperature: "Temperature",
  "structured-output": "结构化输出",
  "tool-calling": "Tool Calling",
  rag: "RAG",
  agent: "Agent",
  workflow: "Workflow",
  "fine-tuning": "Fine-tuning",
  prompting: "Prompt 设计",
  evaluation: "评估体系",
  "product-delivery": "产品交付"
};

export const reviewAdvice: Record<ConceptId, string> = {
  "model-cognition": "复习 LLM 与传统函数的差异：它不是确定性逻辑，而是基于上下文采样输出。",
  token: "重新看 token 模块：成本、延迟和注意力都会被输入输出长度影响。",
  context: "复习上下文窗口：它是单次请求可见信息，不等于长期记忆。",
  temperature: "复习 temperature：低温更稳定，但不保证事实正确。",
  "structured-output": "复习结构化输出：给系统消费的结果必须能 parse、validate、fallback。",
  "tool-calling": "复习工具调用：模型只决定调用什么，真正执行的是你的系统。",
  rag: "复习 RAG 边界：它是知识注入策略，可以服务 Chat、Agent 或 Workflow，不是和它们并列的产品形态。",
  agent: "复习 Agent 边界：Agent 是能围绕目标选择工具和推进步骤的执行实体，不等于聊天界面。",
  workflow: "复习 Workflow：业务流程明确时，用确定性流程控制模型节点。",
  "fine-tuning": "复习 Fine-tuning：适合固定任务的风格、格式和分类，不适合大量动态知识。",
  prompting: "复习 Prompt 设计：prompt 是接口契约的一部分，不只是自然语言描述。",
  evaluation: "复习评估体系：没有样例集和指标，就无法判断 AI 功能是否真的进步。",
  "product-delivery": "复习产品交付：AI 产品需要体验、成本、监控、失败处理和人工确认。"
};

const day01Modules: ConceptModule[] = [
  {
    id: "m1",
    eyebrow: "Concept 01",
    title: "LLM 不是函数，是概率决策器",
    summary: "传统程序追求相同输入得到相同输出；LLM 更像在上下文里选择下一步最可能的表达。",
    visual: "machine",
    concept: "model-cognition",
    whyItMatters: "如果把 LLM 当高级函数，你会把权限、金额、状态变更和合规判断交给一个不稳定的自然语言输出。",
    coreIdeas: [
      "传统函数的核心是确定性：同样输入、同样逻辑、同样输出。",
      "LLM 的核心是条件生成：给定上下文和指令，模型预测 token 概率分布，再采样形成输出。",
      "temperature 等参数影响采样方式，但不能替代事实校验、权限控制和评估体系。"
    ],
    engineerLens: "把 LLM 当成语义判断与生成组件，不是系统控制平面。业务状态、权限、审计、失败重试和人工确认仍由工程系统负责。",
    pitfalls: ["把模型回答当数据库事实", "让模型直接决定高风险动作", "只看几次 demo 就判断功能稳定"],
    practicePrompt: "拿一个你熟悉的业务功能，标出哪些部分必须确定性控制，哪些部分可以交给 LLM 做语义判断。",
    fieldExample: "例如客服退款助手：模型可以判断用户诉求、生成解释话术；但退款金额、风控命中、状态变更必须由后端规则和审计流程控制。"
  },
  {
    id: "m2",
    eyebrow: "Concept 02",
    title: "Token 是 AI 系统的预算单位",
    summary: "输入越长、输出越长，通常成本越高、延迟越大，模型也更容易被无关上下文分散。",
    visual: "budget",
    concept: "token",
    whyItMatters: "token 不只是计费单位，也是上下文管理单位。一次请求塞太多无关内容，会同时影响成本、速度和答案质量。",
    coreIdeas: [
      "prompt、历史消息、检索结果、工具结果、模型输出都会消耗 token。",
      "上下文越长，模型处理的信息越多，延迟通常越高。",
      "更多文字不等于更多有效信息，低质量上下文会稀释注意力。"
    ],
    engineerLens: "真实项目要先检索和筛选，再把最相关的上下文交给模型。代码任务也一样：先搜索定位文件，再读取必要片段。",
    pitfalls: ["把整份文档直接塞进 prompt", "每轮重复粘贴稳定约定", "不区分输入 token 和输出 token 成本"],
    practicePrompt: "把一个长需求压缩成目标、约束、相关事实、验收标准四段，观察信息是否更清楚。",
    fieldExample: "例如代码助手读取仓库时，先用搜索定位相关文件，再只读必要片段；不要把整个仓库或整份需求一次性塞进上下文。",
    source: {
      label: "OpenAI Prompt Engineering",
      url: "https://platform.openai.com/docs/guides/prompt-engineering"
    }
  },
  {
    id: "m3",
    eyebrow: "Concept 03",
    title: "上下文窗口不是长期记忆",
    summary: "上下文窗口只代表这次请求能看到什么；项目约定、用户偏好和历史结论需要显式持久化。",
    visual: "workbench",
    concept: "context",
    whyItMatters: "很多 AI 产品失败不是模型能力不够，而是上下文工程粗糙：该持久化的信息丢了，不该塞进来的噪声又塞进来了。",
    coreIdeas: [
      "上下文窗口是单次请求可见的信息范围，不等于模型长期记住了你的业务。",
      "长期知识应该进入数据库、对象存储、搜索索引或向量库。",
      "任务状态、用户偏好、项目约定需要显式保存，并在需要时检索回来。"
    ],
    engineerLens: "把上下文当有限资源设计：什么必须进请求，什么只需要引用 ID，什么应该由工具实时查询。",
    pitfalls: ["把长上下文当记忆系统", "不记录模型使用过的来源", "让用户以为模型记住了所有历史"],
    practicePrompt: "为项目助手设计 memory schema：哪些是用户偏好，哪些是项目约定，哪些是任务临时状态？",
    fieldExample: "例如销售助手需要长期保存客户行业和跟进阶段，但本轮通话摘要、临时异议处理只应作为当前任务上下文。"
  },
  {
    id: "m4",
    eyebrow: "Concept 04",
    title: "Temperature 控制发散程度，不控制事实正确性",
    summary: "temperature 越低，模型越倾向选择高概率表达；temperature 越高，输出越发散。它影响稳定性和多样性，但不能替代检索、校验和评估。",
    visual: "dial",
    concept: "temperature",
    whyItMatters: "很多工程问题不是把 temperature 调低就能解决。低温能减少随机性，但事实错误、权限错误、工具参数错误仍然需要系统侧控制。",
    coreIdeas: [
      "低 temperature 更适合分类、抽取、结构化输出和代码修改等稳定任务。",
      "中高 temperature 更适合创意方案、文案发散、头脑风暴等需要多样性的任务。",
      "事实正确性主要依赖上下文质量、RAG、工具查询、schema 校验和评估集。"
    ],
    engineerLens: "把 temperature 当成采样参数，不要当成可靠性开关。生产系统应该先定义任务类型，再决定温度、输出约束、校验和 fallback。",
    pitfalls: ["以为 temperature=0 就一定正确", "用高 temperature 做结构化抽取", "把调参当成修复幻觉的主要手段"],
    practicePrompt: "为分类、客服回复、方案 brainstorm、JSON 抽取四类任务分别选择 temperature 范围，并写出为什么。",
    fieldExample: "例如订单状态分类应使用低 temperature 并校验 JSON；营销标题生成可以提高 temperature 生成多个候选，再用评分规则或人工选择。"
  },
  {
    id: "m5",
    eyebrow: "Concept 05",
    title: "结构化输出和工具调用是工程边界",
    summary: "自然语言适合给人看；系统需要 JSON、schema、类型、工具权限、日志和失败兜底。",
    visual: "schema",
    concept: "structured-output",
    whyItMatters: "只要 AI 结果要进入系统，就必须从“看起来对”变成“可解析、可校验、可回滚”。",
    coreIdeas: [
      "结构化输出约束模型返回符合 schema 的数据。",
      "工具调用让模型提出调用请求，由应用执行工具并把结果回传给模型。",
      "应用侧仍然要做验证、权限、错误处理、版本管理和审计。"
    ],
    engineerLens: "把模型输出当不可信外部输入处理。先 parse，再 validate，再进入业务流程。",
    pitfalls: ["只在 prompt 里写请输出 JSON", "工具无权限控制", "执行结果不回填上下文"],
    practicePrompt: "为“创建工单”设计 JSON Schema、权限检查、人工确认条件和日志字段。",
    fieldExample: "例如 AI 生成工单时只能返回 title、priority、assigneeId、reason；系统再校验人员权限、字段合法性和是否需要人工确认。",
    source: {
      label: "OpenAI Function Calling",
      url: "https://platform.openai.com/docs/guides/function-calling"
    }
  }
];

const day02Modules: ConceptModule[] = [
  {
    id: "p1",
    eyebrow: "Concept 01",
    title: "Prompt 是接口契约，不是临场作文",
    summary: "好的 prompt 明确角色、目标、输入、约束、输出格式和验收标准。",
    visual: "schema",
    concept: "prompting",
    whyItMatters: "开发者需要让 AI 可复用、可评估，而不是每次靠感觉重写提示词。",
    coreIdeas: ["把 prompt 当 API contract", "稳定约定沉淀成模板", "复杂任务先澄清再执行"],
    engineerLens: "prompt 资产应该版本化，和测试样例一起维护。",
    pitfalls: ["需求没澄清就让模型实现", "没有输出格式", "每次手写不同 prompt"],
    practicePrompt: "把一个模糊需求改写成目标、约束、输入、输出、验收标准。"
  },
  {
    id: "p2",
    eyebrow: "Concept 02",
    title: "RAG 是知识策略，可以服务不同产品形态",
    summary: "RAG 不是和 Chat/Agent 并列的形态，而是把外部知识检索进上下文的策略。",
    visual: "workbench",
    concept: "rag",
    whyItMatters: "同一个聊天助手、Agent 或 Workflow 都可能用 RAG 获取私有知识。",
    coreIdeas: ["切分影响召回", "重排影响上下文质量", "引用来源影响可信度"],
    engineerLens: "RAG 的关键不是向量库本身，而是数据治理、召回质量、上下文压缩和评估集。",
    pitfalls: ["把 RAG 当万能知识注入", "没有引用来源", "不评估召回质量"],
    practicePrompt: "为内部知识库问答设计切分、召回、重排、引用和评估指标。"
  }
];

const day03Modules: ConceptModule[] = [
  {
    id: "a1",
    eyebrow: "Concept 01",
    title: "Agent 是执行实体，不是 UI 形态",
    summary: "Agent 围绕目标选择工具、观察结果、推进步骤，可以出现在 Chat、后台任务或自动化流程里。",
    visual: "tools",
    concept: "agent",
    whyItMatters: "如果把 Agent 简化成聊天窗口，会忽略工具权限、状态、计划、日志和恢复机制。",
    coreIdeas: ["目标驱动", "工具调用", "观察和迭代", "状态和人类确认"],
    engineerLens: "Agent 应被当作系统组件，有输入输出、权限、日志、评估和失败处理。",
    pitfalls: ["让 Agent 完全自由执行高风险动作", "没有步骤日志", "没有停止条件"],
    practicePrompt: "画一个代码修复 Agent 的执行链路：读 issue、搜代码、改文件、跑测试、复盘。"
  }
];

const day04Modules: ConceptModule[] = [
  {
    id: "d1",
    eyebrow: "Concept 01",
    title: "AI 产品交付不止模型调用",
    summary: "真实产品需要体验、成本、监控、失败处理、人工确认和评估闭环。",
    visual: "budget",
    concept: "product-delivery",
    whyItMatters: "demo 能跑不代表可交付。上线后真正暴露的是成本、延迟、失败率和用户信任。",
    coreIdeas: ["前端体验", "模型网关", "日志监控", "评估集", "反馈闭环"],
    engineerLens: "把 AI 能力纳入正常工程系统：版本、测试、部署、监控、回滚。",
    pitfalls: ["没有成本预算", "没有失败兜底", "没有评估集"],
    practicePrompt: "为一个 AI 功能写上线 checklist：成本、延迟、失败模式、日志、评估、人工接管。"
  }
];

const layeredDecision: DecisionLayer[] = [
  {
    id: "interaction",
    name: "1. 交互形态",
    question: "用户如何使用它？",
    choices: [
      { name: "Chat UI", description: "用户以对话方式表达需求。", example: "客服助手、知识库问答、代码助手。" },
      { name: "Form / Command", description: "用户提交结构化输入或明确命令。", example: "生成周报、分析 PRD、批量分类。" },
      { name: "Background Job", description: "系统定时或事件触发。", example: "每日巡检、告警分析、数据同步。" }
    ]
  },
  {
    id: "knowledge",
    name: "2. 知识策略",
    question: "回答是否依赖外部或私有知识？",
    choices: [
      { name: "Context Only", description: "只需要用户当前输入和短上下文。", example: "改写一句话、总结当前文本。" },
      { name: "RAG", description: "需要检索文档、制度、代码或知识库。", example: "内部文档问答、带引用回答。" },
      { name: "Tool Query", description: "需要实时查 API 或数据库。", example: "查订单状态、拉 GitHub issue。" }
    ]
  },
  {
    id: "execution",
    name: "3. 执行控制",
    question: "任务步骤是否固定？",
    choices: [
      { name: "Workflow", description: "流程固定，模型只是其中节点。", example: "内容审核、审批、固定流水线。" },
      { name: "Agent", description: "目标明确但路径动态，需要选择工具和迭代。", example: "代码修复、研究任务、跨系统助手。" },
      { name: "Deterministic Code", description: "必须精确、可审计、可重复。", example: "计费、权限、状态机、金额计算。" }
    ]
  },
  {
    id: "adaptation",
    name: "4. 能力调优",
    question: "稳定性问题来自哪里？",
    choices: [
      { name: "Prompt / Schema", description: "任务可通过更清晰约束稳定。", example: "固定输出字段、补充反例。" },
      { name: "Eval / Data", description: "需要样例集判断质量。", example: "召回命中率、分类准确率。" },
      { name: "Fine-tuning", description: "大量同类任务需要稳定风格或分类。", example: "固定标签分类、领域表达风格。" }
    ]
  }
];

export const lessons: LessonPage[] = [
  {
    id: "day01",
    path: "/day01",
    title: "Day 01 模型认知",
    phase: "阶段 1",
    status: "available",
    summary: "理解 LLM 的概率本质、上下文、token、结构化输出和工具调用。",
    hero: "把 AI 名词变成工程判断力",
    conceptIntro: "先理解模型能力边界，再学习怎么把输出变成可控的工程组件。",
    decisionTitle: "AI 应用工程架构：从入口到反馈闭环",
    decisionIntro:
      "业内更常见的做法不是把 Chat、RAG、Agent 当成同一层选项，而是把 AI 应用拆成入口、编排、上下文、模型能力、工具执行、安全控制和评估反馈。Chat 是入口形态，RAG 是上下文增强策略，Agent 是一种更动态的编排方式，Workflow 是更确定的编排方式，工具和确定性代码负责真实动作。",
    decisionExample:
      "一线例子：企业售后助手可以用 Chat UI 接收用户问题；用路由判断是订单、退款还是技术支持；用 RAG 检索政策文档；用订单工具查询实时状态；退款审批走 Workflow；跨系统排查异常时再启动 Agent；高风险退款要经过权限、规则和人工确认；上线后用日志和评估集持续检查答案质量、工具参数和交接边界。",
    modules: day01Modules,
    decisionLayers: layeredDecision,
    questions: [
      {
        id: "q1",
        type: "single",
        concept: "model-cognition",
        prompt: "同一个 prompt 得到不同结果时，最合理的工程理解是什么？",
        options: [
          { id: "a", label: "模型坏了，必须换模型", correct: false },
          { id: "b", label: "LLM 是概率采样系统，关键输出要加约束和校验", correct: true },
          { id: "c", label: "把 temperature 调到 0 就永远正确", correct: false }
        ],
        explanation: "LLM 不是确定性函数。低 temperature 能提高稳定性，但正确性仍依赖上下文、工具、校验和评估。"
      },
      {
        id: "q2",
        type: "single",
        concept: "rag",
        scenario: "一个聊天式客服助手，需要回答内部文档问题并引用来源。",
        prompt: "更准确的描述是什么？",
        options: [
          { id: "a", label: "Chat 和 RAG 二选一", correct: false },
          { id: "b", label: "它可以是 Chat UI，底层使用 RAG 作为知识策略", correct: true },
          { id: "c", label: "必须 Fine-tuning 才能使用内部知识", correct: false }
        ],
        explanation: "Chat 是交互形态，RAG 是知识策略，它们不在同一层。"
      },
      {
        id: "q3",
        type: "single",
        concept: "agent",
        scenario: "需要读取 issue、搜索代码、修改文件、运行测试，并根据失败继续调整。",
        prompt: "这个任务为什么适合 Agent？",
        options: [
          { id: "a", label: "它需要多步骤工具调用和动态决策", correct: true },
          { id: "b", label: "它只需要固定格式分类", correct: false },
          { id: "c", label: "它不需要任何工程约束", correct: false }
        ],
        explanation: "Agent 的价值在于跨步骤、跨工具推进任务。但仍需要权限、日志、测试和确认。"
      },
      {
        id: "q4",
        type: "single",
        concept: "workflow",
        scenario: "运营内容发布固定经过草稿、审核、敏感词检测、排期发布。",
        prompt: "更适合的执行控制是什么？",
        options: [
          { id: "a", label: "Workflow 中嵌入模型节点", correct: true },
          { id: "b", label: "让 Agent 完全自由决定每一步", correct: false },
          { id: "c", label: "只用 RAG", correct: false }
        ],
        explanation: "流程明确时，用 Workflow 控制状态，模型只处理不确定的文本节点。"
      }
    ]
  },
  {
    id: "day02",
    path: "/day02",
    title: "Day 02 Prompt / RAG / 调优",
    phase: "阶段 2",
    status: "available",
    summary: "从 prompt 资产到检索增强，建立可评估的知识问答能力。",
    hero: "把提示词和知识检索做成可维护资产",
    conceptIntro: "这一页聚焦 prompt 契约、RAG 数据链路和评估闭环。",
    decisionTitle: "RAG 设计不是选一个向量库",
    decisionIntro: "RAG 的质量来自数据治理、切分、召回、重排、上下文压缩、引用和评估，而不是单点技术名词。",
    modules: day02Modules,
    decisionLayers: layeredDecision.slice(1, 4),
    questions: [
      {
        id: "q1",
        type: "single",
        concept: "prompting",
        prompt: "为什么 prompt 应该被当成接口契约？",
        options: [
          { id: "a", label: "因为它需要稳定表达输入、约束和输出", correct: true },
          { id: "b", label: "因为 prompt 不需要测试", correct: false },
          { id: "c", label: "因为每次临场发挥最好", correct: false }
        ],
        explanation: "prompt 是 AI 功能的行为契约，需要版本化和评估。"
      },
      {
        id: "q2",
        type: "single",
        concept: "rag",
        prompt: "RAG 最应该用什么方式验收？",
        options: [
          { id: "a", label: "只看向量库品牌", correct: false },
          { id: "b", label: "用问题集评估召回、引用和答案质量", correct: true },
          { id: "c", label: "把所有文档塞进 prompt", correct: false }
        ],
        explanation: "RAG 需要评估集，否则无法判断切分、召回和重排是否有效。"
      }
    ]
  },
  {
    id: "day03",
    path: "/day03",
    title: "Day 03 Agent 架构",
    phase: "阶段 3",
    status: "available",
    summary: "区分 Agent 和 Workflow，理解工具、状态、记忆和人类确认。",
    hero: "把 Agent 当系统组件设计",
    conceptIntro: "这一页聚焦 Agent 的执行链路、工具边界、状态和安全控制。",
    decisionTitle: "Agent 与 Workflow 的边界",
    decisionIntro: "固定流程优先 Workflow；开放目标、动态路径和多工具迭代才需要 Agent。",
    modules: day03Modules,
    decisionLayers: layeredDecision.slice(2, 4),
    questions: [
      {
        id: "q1",
        type: "single",
        concept: "agent",
        prompt: "Agent 更准确的定义是什么？",
        options: [
          { id: "a", label: "一种聊天 UI", correct: false },
          { id: "b", label: "围绕目标选择工具并推进步骤的执行实体", correct: true },
          { id: "c", label: "一个向量数据库", correct: false }
        ],
        explanation: "Agent 是执行实体，可以出现在 Chat、后台任务或 Workflow 节点中。"
      }
    ]
  },
  {
    id: "day04",
    path: "/day04",
    title: "Day 04 产品化交付",
    phase: "阶段 4",
    status: "available",
    summary: "把 AI 能力接入真实产品：体验、成本、监控、评估和迭代。",
    hero: "从 demo 到可交付 AI 产品",
    conceptIntro: "这一页聚焦非模型能力：体验、成本、日志、评估、失败处理和人工接管。",
    decisionTitle: "上线前要问的工程问题",
    decisionIntro: "模型能力只是一个节点，真正可交付的产品需要完整工程闭环。",
    modules: day04Modules,
    decisionLayers: [
      {
        id: "delivery",
        name: "交付闭环",
        question: "上线前必须具备哪些非模型能力？",
        choices: [
          { name: "Observability", description: "记录请求、成本、延迟、工具调用和失败原因。", example: "模型网关日志。" },
          { name: "Evaluation", description: "用样例集和指标判断质量。", example: "黄金问题集。" },
          { name: "Fallback", description: "失败时能重试、降级或人工接管。", example: "高风险动作确认。" }
        ]
      }
    ],
    questions: [
      {
        id: "q1",
        type: "single",
        concept: "product-delivery",
        prompt: "为什么 demo 能跑不等于产品可交付？",
        options: [
          { id: "a", label: "因为真实产品还需要成本、监控、失败处理和评估", correct: true },
          { id: "b", label: "因为 demo 不需要 UI", correct: false },
          { id: "c", label: "因为只要模型更大就够了", correct: false }
        ],
        explanation: "AI 产品上线后真正暴露的是成本、延迟、失败率和用户信任。"
      }
    ]
  }
];

export const seriesLessons: LessonSummary[] = lessons.map(({ id, path, title, phase, status, summary }) => ({
  id,
  path,
  title,
  phase,
  status,
  summary
}));

export const lessonModules = lessons[0].modules;
export const lessonQuestions = lessons[0].questions;
