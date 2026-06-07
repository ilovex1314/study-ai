import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const day01Modules: ConceptModule[] = [
  {
    id: "d1-m1",
    eyebrow: "Concept 01",
    title: "LLM 不是函数，是概率决策器",
    summary: "同样输入不必然得到同样输出。模型基于上下文预测 token 分布，再通过采样生成答案。",
    visual: "machine",
    concept: "model-cognition",
    whyItMatters: "如果把模型当后端函数，就会把权限、金额、状态变更和合规判断交给不稳定的自然语言输出。",
    coreIdeas: ["传统代码追求确定性；LLM 追求条件生成。", "模型输出需要系统校验，不能直接当事实。", "业务控制平面应留在工程系统里。"],
    engineerLens: "把 LLM 当语义判断和生成组件，把状态机、权限、审计、重试、人工确认留给后端。",
    pitfalls: ["把模型回答当数据库事实", "让模型直接决定高风险动作", "只看 demo 不看失败模式"],
    practicePrompt: "选一个熟悉业务，标出哪些环节可交给 LLM，哪些必须由确定性系统控制。",
    fieldExample: "客服退款助手可以让模型理解诉求和生成解释，但退款金额、风控命中和状态变更必须由后端规则控制。"
  },
  {
    id: "d1-m2",
    eyebrow: "Concept 02",
    title: "Token 是成本、延迟和注意力预算",
    summary: "输入越长、输出越长，通常成本越高、延迟越大，上下文噪声也越容易稀释关键信息。",
    visual: "budget",
    concept: "token",
    whyItMatters: "真实项目要先检索、筛选和压缩，再把最相关上下文交给模型。",
    coreIdeas: ["prompt、历史消息、检索结果、工具结果和输出都会消耗 token。", "更多文字不等于更多有效信息。", "上下文管理是 AI 产品的成本控制入口。"],
    engineerLens: "先用搜索定位文件或资料，再读取必要片段；不要把整仓库或整份文档一次性塞进上下文。",
    pitfalls: ["整篇文档直接进 prompt", "每轮重复粘贴稳定约定", "不区分输入 token 和输出 token 成本"],
    practicePrompt: "把一个长需求压缩成目标、约束、事实、验收四段。",
    fieldExample: "代码助手应先 rg 定位相关文件，再读局部实现，而不是把整个项目交给模型。"
  },
  {
    id: "d1-m3",
    eyebrow: "Concept 03",
    title: "上下文不是长期记忆",
    summary: "上下文只代表本次请求可见的信息；项目约定、用户偏好和历史结论需要显式持久化。",
    visual: "workbench",
    concept: "context",
    whyItMatters: "很多 AI 产品失败不是模型差，而是该保存的信息丢了，不该进上下文的噪声进来了。",
    coreIdeas: ["上下文窗口是本轮可见范围。", "长期知识应进入数据库、索引或对象存储。", "任务状态和用户偏好要分层保存。"],
    engineerLens: "设计 memory schema：什么进本轮上下文，什么存长期，什么由工具实时查。",
    pitfalls: ["把长上下文当记忆系统", "不记录来源", "让用户以为模型记住了全部历史"],
    practicePrompt: "为项目助手设计 memory schema：项目约定、用户偏好、临时任务状态分别怎么存。",
    fieldExample: "销售助手长期保存客户行业和跟进阶段，本轮通话摘要只作为当前任务上下文。"
  },
  {
    id: "d1-m4",
    eyebrow: "Concept 04",
    title: "Temperature 控制发散，不控制事实正确",
    summary: "temperature 越低越稳定，越高越发散；它影响采样，不替代检索、校验和评估。",
    visual: "dial",
    concept: "temperature",
    whyItMatters: "低温能减少随机性，但事实错误、权限错误和工具参数错误仍要靠系统侧控制。",
    coreIdeas: ["低温适合分类、抽取、结构化输出。", "中高温适合创意发散和候选生成。", "事实正确性主要依赖上下文、工具查询和评估。"],
    engineerLens: "把 temperature 当采样参数，不要当可靠性开关。",
    pitfalls: ["以为 temperature=0 就一定正确", "用高温做结构化抽取", "用调参代替事实校验"],
    practicePrompt: "为分类、客服回复、方案 brainstorm、JSON 抽取分别选择 temperature 范围。",
    fieldExample: "订单状态分类用低温并校验 JSON；营销标题可提高温度生成多个候选再评分。"
  }
];

const day01Architecture: DecisionLayer[] = [
  {
    id: "control",
    name: "控制边界",
    question: "哪些逻辑必须确定性控制？",
    choices: [
      { name: "系统控制", description: "权限、金额、状态、审计、重试和回滚留在后端。", example: "退款金额由规则计算，模型只解释原因。" },
      { name: "模型判断", description: "意图识别、总结、生成、语义归类交给模型。", example: "识别用户是在咨询退款还是投诉物流。" }
    ]
  },
  {
    id: "context",
    name: "上下文策略",
    question: "本轮需要哪些信息？",
    choices: [
      { name: "即时上下文", description: "任务输入、相关片段、工具结果。", example: "本次工单内容和订单状态。" },
      { name: "长期记忆", description: "用户偏好、项目约定、历史结论。", example: "团队 API 命名规范。" }
    ]
  },
  {
    id: "reliability",
    name: "可靠性策略",
    question: "如何处理不稳定输出？",
    choices: [
      { name: "结构化输出", description: "用 schema 约束模型结果。", example: "返回 intent/confidence/entities。" },
      { name: "评估与兜底", description: "用测试样例、重试、人工确认保护关键路径。", example: "低置信度时转人工处理。" }
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
    conceptIntro: "先理解模型能力边界，再学习怎么把输出变成可控的工程组件。",
    decisionTitle: "AI 能力边界架构图",
    decisionIntro: "不要把 Chat、RAG、Agent 放在同一层比较。先判断控制边界，再决定上下文、输出和可靠性策略。",
    decisionExample: "客服退款系统中，模型负责理解诉求和生成解释；系统负责权限、金额、状态流转和审计。",
    modules: day01Modules,
    decisionLayers: day01Architecture,
    questions: [
      {
        id: "d1-q1",
        type: "single",
        concept: "model-cognition",
        prompt: "为什么不能把 LLM 当成传统后端函数？",
        options: [
          option("a", "因为 LLM 基于上下文概率生成，输出需要系统校验", true),
          option("b", "因为 LLM 不能处理文本"),
          option("c", "因为 LLM 只能做 UI"),
          option("d", "因为 temperature 总是大于 0")
        ],
        explanation: "LLM 输出不是确定性业务事实，权限、状态和高风险动作必须由工程系统控制。"
      },
      {
        id: "d1-q2",
        type: "single",
        concept: "token",
        prompt: "token 预算主要影响什么？",
        options: [option("a", "颜色主题"), option("b", "成本、延迟和上下文噪声", true), option("c", "数据库连接数"), option("d", "CSS 体积")],
        explanation: "输入输出长度会影响成本、延迟，也会影响模型对关键信息的注意力。"
      },
      {
        id: "d1-q3",
        type: "single",
        concept: "temperature",
        prompt: "temperature=0 最合理的理解是什么？",
        options: [option("a", "一定事实正确"), option("b", "更稳定但仍需事实校验", true), option("c", "自动启用 RAG"), option("d", "禁用工具调用")],
        explanation: "低温降低随机性，但正确性仍依赖上下文、工具、校验和评估。"
      },
      {
        id: "d1-q4",
        type: "single",
        concept: "context",
        prompt: "上下文窗口和长期记忆的区别是什么？",
        options: [
          option("a", "上下文是本轮可见信息，长期记忆需要显式持久化", true),
          option("b", "二者完全一样"),
          option("c", "长期记忆只能存在 prompt 里"),
          option("d", "上下文不会消耗 token")
        ],
        explanation: "上下文是本轮请求范围，长期知识要进入数据库、索引或对象存储。"
      }
    ]
  };
