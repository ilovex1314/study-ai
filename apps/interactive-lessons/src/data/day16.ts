import { createP0Lesson } from "./p0LessonFactory";

export const day16Lesson = createP0Lesson({
  id: "day16",
  phase: "Day16",
  title: "多模态与实时体验",
  summary: "为图片、语音与文本任务设计统一输入、异步处理和体验降级方案。",
  capabilityGoal: "为图片、语音与文本任务定义统一输入、异步处理、可复核引用和体验降级方案。",
  verifiableOutput: "多模态任务 contract 与异步编排图。",
  diagramType: "pipeline",
  hero: "把多模态 demo 变成可复核任务流",
  conceptIntro: "用统一任务契约、渐进反馈、证据锚点和体验降级管理多模态复杂度。",
  decisionTitle: "多模态任务：资产、队列、证据和体验状态",
  decisionIntro: "图片、音频、视频和文本先进入统一 asset/task contract，再经过异步处理、证据抽取、模型生成和前端状态展示。",
  decisionExample: "会议助手先生成带时间戳 transcript，再基于时间段证据生成行动项；实时失败时保留处理中状态并稍后通知。",
  modules: [
    { title: "多模态输入要先统一成任务契约", summary: "不同模态都要统一成 task、asset、metadata、privacy、expected output。", concept: "modality-orchestration", whyItMatters: "没有统一契约，图片、语音和文本会形成不可维护的分支逻辑。", coreIdeas: ["保存 asset metadata。", "声明隐私级别。", "定义期望输出结构。"], engineerLens: "先设计 task contract，再接模型能力。", pitfalls: ["直接把文件塞给模型", "不限制大小和时长", "输出结构不一致"], practicePrompt: "为上传产品截图生成 UI 问题列表设计 contract。", source: { label: "OpenAI Images guide", url: "https://platform.openai.com/docs/guides/images" } },
    { title: "渐进反馈让长任务可感知", summary: "OCR、转写、视觉理解和生成模型延迟不同，长任务应进入队列并展示进度。", visual: "dial", concept: "progressive-feedback", whyItMatters: "用户需要知道任务处于 queued、processing、partial、done 还是 failed。", coreIdeas: ["长任务异步。", "状态可取消。", "partial result 可解释。"], engineerLens: "把任务状态机暴露给前端。", pitfalls: ["白屏等待", "无法取消", "失败无状态"], practicePrompt: "为一个 2 分钟音频转写写 UI 状态机。", source: { label: "Vercel Queues", url: "https://vercel.com/docs/workflow-collaboration/vercel-queues" } },
    { title: "证据锚点让输出可复核", summary: "多模态回答要能引用图片区域、音频时间段、文本片段或文件版本。", visual: "schema", concept: "evidence-anchor", whyItMatters: "用户指出错误时，系统必须能回到原始证据定位问题。", coreIdeas: ["图片用坐标。", "音频用时间戳。", "文本用版本和片段。"], engineerLens: "把 evidence anchors 放入输出 schema。", pitfalls: ["只给总结", "无时间戳", "无法定位图片区域"], practicePrompt: "为 UI 截图问题列表设计 evidence anchor 字段。" },
    { title: "体验降级保护实时失败", summary: "实时能力失败时，应降级为上传后处理、摘要、草稿或稍后通知。", visual: "tools", concept: "experience-fallback", whyItMatters: "实时链路成本和失败率更高，降级路径决定用户是否还能完成任务。", coreIdeas: ["timeout 后可异步。", "降级要解释原因。", "保留任务结果通知。"], engineerLens: "为每个实时路径定义 fallback contract。", pitfalls: ["实时失败就丢任务", "不提示隐私策略", "无限重试"], practicePrompt: "比较实时语音交互和上传后批处理的失败体验。" }
  ],
  decisionLayers: [
    { id: "contract", name: "输入契约", question: "多模态输入如何统一？", choices: [{ name: "Task / Asset", description: "用统一任务和资产 metadata 管理。", example: "asset_id + privacy" }, { name: "模型直连", description: "难以审计和复用。", example: "raw upload" }] },
    { id: "processing", name: "异步处理", question: "长任务如何可感知？", choices: [{ name: "队列状态", description: "展示 queued、processing、partial 和 done。", example: "job status" }, { name: "同步等待", description: "容易超时并失去控制。", example: "blocking UI" }] },
    { id: "fallback", name: "降级", question: "实时失败后怎么办？", choices: [{ name: "异步与通知", description: "保留任务，稍后返回结果。", example: "notify when done" }, { name: "直接失败", description: "用户无法完成任务。", example: "drop session" }] }
  ],
  questions: [
    { concept: "modality-orchestration", prompt: "为什么多模态任务通常需要统一 contract？", correct: "不同模态需要一致的 task、asset、metadata 和输出结构", distractors: ["为了隐藏所有输入", "为了让每种模态都写死流程"], explanation: "统一 contract 是编排、隐私和复核的基础。" },
    { concept: "progressive-feedback", prompt: "为什么多模态任务通常需要异步队列？", correct: "不同处理步骤延迟差异大且可能超时", distractors: ["因为队列能自动保证答案正确", "因为前端不能展示状态"], explanation: "队列让长任务有可恢复状态和进度反馈。" },
    { concept: "evidence-anchor", prompt: "什么是可复核的多模态引用？", correct: "能定位到图片区域、音频时间段、文本片段或文件版本", distractors: ["只显示一个总结标题", "只展示模型自信度"], explanation: "证据锚点让用户可以回看原始依据。" },
    { concept: "experience-fallback", prompt: "什么时候应该采用体验降级？", correct: "实时链路超时、成本过高或证据尚未准备好时", distractors: ["任何成功结果都要降级", "用户点击提交前"], explanation: "降级保护任务完成率和用户预期。" }
  ],
  references: [
    { label: "OpenAI Images guide", url: "https://platform.openai.com/docs/guides/images" },
    { label: "OpenAI Speech to text guide", url: "https://platform.openai.com/docs/guides/speech-to-text" },
    { label: "Vercel Queues", url: "https://vercel.com/docs/workflow-collaboration/vercel-queues" }
  ]
});
