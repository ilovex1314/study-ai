import { option } from "./helpers";
import { curriculum } from "./curriculum";
import type { ConceptId, LessonPage } from "./types";

const concepts: ConceptId[] = ["document-ingestion", "guardrails", "streaming-ux", "durable-execution", "prompt-assets", "observability", "capstone-scope"];
const weights = [30, 25, 25, 20];

export const supplementalLessons: LessonPage[] = curriculum.slice(13).map((day, index) => {
  const concept = concepts[index];
  return {
    ...day,
    status: "available",
    hero: day.capability,
    conceptIntro: `围绕“${day.capability}”建立能落地、能验证、能复盘的工程判断。`,
    decisionTitle: `${day.title}：责任关系图`,
    decisionIntro: "用户目标、可信输入、策略控制、执行结果与评估反馈相互约束；不将它们误画成不可恢复的流水线。",
    decisionExample: "先把验收、风险和可观察证据写清，再选择具体框架、模型或自动化平台。",
    modules: [{ id: `${day.id}-m1`, eyebrow: "核心关系", title: day.capability, summary: "把概念转成责任边界和可验证行为。", visual: "schema", concept, whyItMatters: "工程交付要能解释谁负责、谁约束、失败时如何恢复。", coreIdeas: ["先定义可测目标。", "模型建议不等于系统决策。", "每项能力都要留可复核证据。"], engineerLens: "将模型、数据、策略和运行状态拆分为独立控制面。", pitfalls: ["只画流程不标责任", "忽略失败与回滚", "用平台名代替设计"], practicePrompt: `为“${day.title}”写一个边界、一个风险和一个验收方法。` }],
    decisionLayers: [{ id: `${day.id}-layer`, name: "控制关系", question: "什么必须由系统而非模型决定？", choices: [{ name: "策略与状态", description: "权限、风险、提交与回滚由确定性系统控制。", example: "高风险动作进入审批。" }, { name: "模型语义", description: "模型负责理解、总结和生成候选。", example: "生成方案草稿。" }] }],
    questions: weights.map((weight, questionIndex) => ({ id: `${day.id}-q${questionIndex + 1}`, type: "single" as const, concept, weight, prompt: `${day.title} 中，最先需要确认的工程控制点是什么？`, scenario: "请按真实交付场景判断，而不是只选择看起来更智能的方案。", options: [option("a", "先明确目标、边界、证据和失败后的确定性处理", true), option("b", "先把所有信息交给模型，后续再补规则", false), option("c", "只优化视觉效果，不记录质量和风险", false)], explanation: "生产 AI 系统先定义可验证目标与控制边界，再选择模型和实现路径。" }))
  };
});
