import type { ConceptModule, DecisionLayer, LessonPage } from "./types";
import { option } from "./helpers";

const modules: ConceptModule[] = [
  { id: "d13-m1", eyebrow: "Concept 01", title: "设计知识先成为可查询数据", summary: "UI/UX Pro Max 把产品类型、风格、色彩、字体、版式和 UX 规则存成结构化数据，而不是让模型凭感觉猜。", visual: "schema", concept: "design-data", whyItMatters: "可查询的约束让设计建议可重复、可审计，也便于补充行业规则。", coreIdeas: ["产品、风格、颜色、字体、UX 是独立数据域。", "规则包含推荐和反模式。", "数据与界面代码分离。"], engineerLens: "把设计决策当作输入数据和输出契约，而非一次性的审美灵感。", pitfalls: ["只复制一个流行风格", "把色值散落在组件中", "没有可访问性规则"], practicePrompt: "打开 data/ 目录，给一个学习产品列出需要的输入维度。", source: { label: "UI/UX Pro Max GitHub", url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" } },
  { id: "d13-m2", eyebrow: "Concept 02", title: "五域检索把模糊需求变成候选方案", summary: "--design-system 并行检索产品、风格、色彩、版式和字体，再将匹配结果交给规则层。", visual: "workbench", concept: "multi-domain-search", whyItMatters: "一个描述同时包含场景、受众和语气；拆域检索能减少单一关键词带来的偏差。", coreIdeas: ["查询要含产品、行业、风格和密度。", "先生成完整系统，再补充 domain 搜索。", "不同关键词可形成对比方案。"], engineerLens: "输入质量决定候选空间；将 query 写入项目文档，方便后续复现。", pitfalls: ["只搜 app", "跳过 --design-system", "把第一次结果当成唯一答案"], practicePrompt: "运行：python3 ~/.codex/skills/ui-ux-pro-max/scripts/search.py 'interactive AI engineering learning platform dark focused editorial' --design-system -p study-ai", source: { label: "UI/UX Pro Max README", url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill#how-design-system-generation-works" } },
  { id: "d13-m3", eyebrow: "Concept 03", title: "规则层输出的是设计系统，不是一张截图", summary: "排序与行业规则把候选项汇总为 pattern、颜色角色、字体、效果、反模式和验收清单。", visual: "machine", concept: "design-system", whyItMatters: "团队要能从输出推导 token、组件状态和页面层级，而不是只看一张漂亮图。", coreIdeas: ["设计系统是组件的共同输入。", "语义 token 比组件里的原始 hex 更稳定。", "反模式是约束的一部分。"], engineerLens: "把输出落为 CSS variables、间距尺度、焦点态和动效时长。", pitfalls: ["盲从 neon/cyberpunk 推荐", "只复制颜色不复制层级", "忽略阅读和对比度"], practicePrompt: "将输出中的 primary、surface、text、CTA 映射为四组语义 token。" },
  { id: "d13-m4", eyebrow: "Concept 04", title: "实施后仍需用 UX 规则验收", summary: "最终界面要检查键盘可达、焦点、对比度、响应式、固定导航遮挡和 reduced motion。", visual: "tools", concept: "ui-validation", whyItMatters: "设计系统建议不是验收；真实页面会暴露内容密度、交互状态和小屏断点问题。", coreIdeas: ["用 --domain ux 搜索风险清单。", "375/768/1024/1440 都要验证。", "减弱动效和颜色之外的状态提示是底线。"], engineerLens: "把 UX checklist 接入代码评审与发布前验证。", pitfalls: ["只有 hover 状态", "固定栏遮住内容", "忽略 prefers-reduced-motion"], practicePrompt: "运行：python3 ~/.codex/skills/ui-ux-pro-max/scripts/search.py 'accessibility navigation responsive reduced motion' --domain ux -n 12" }
];

const layers: DecisionLayer[] = [
  { id: "input", name: "需求输入", question: "先描述什么？", choices: [{ name: "产品与用户", description: "明确学习工作台、长期阅读与工程学习者。", example: "interactive AI engineering learning" }, { name: "体验约束", description: "补充深色、高专注、可访问和响应式。", example: "dark focused editorial" }] },
  { id: "engine", name: "检索与推理", question: "系统怎样选择？", choices: [{ name: "多域搜索", description: "并行读取产品、风格、颜色、版式、字体数据。", example: "--design-system" }, { name: "规则聚合", description: "按行业和优先级筛选候选与反模式。", example: "ui-reasoning.csv" }] },
  { id: "delivery", name: "落地与反馈", question: "输出如何变成页面？", choices: [{ name: "Token 与组件", description: "将颜色、间距、动效映射为可复用 CSS。", example: "--surface, --accent, --motion" }, { name: "UX 验收", description: "检查焦点、键盘、断点和减弱动效。", example: "--domain ux" }] }
];

export const day13Lesson: LessonPage = { id: "day13", path: "/day13", title: "UI/UX Pro Max 实战", phase: "Day13", status: "available", summary: "用数据、规则和验证闭环重做一个学习产品。", hero: "从设计检索到可验证界面的完整工作流", conceptIntro: "理解原理、跑通数据链路，并把建议落为可维护的 UI 系统。", decisionTitle: "UI/UX Pro Max：从需求到界面的数据链路", decisionIntro: "需求关键词 -> 五域结构化数据 -> 检索与规则排序 -> 设计系统 -> token 与组件 -> 可访问性/响应式验收 -> 下一轮需求输入。", decisionExample: "本项目将沉浸式学习的推荐转译成高对比、阅读友好的工作台，而不是机械套用 Cyberpunk 外观。", modules, decisionLayers: layers, questions: [
  { id: "d13-q1",
        weight: 25, type: "single", concept: "design-data", prompt: "为什么 Skill 先把设计知识组织成数据域？", options: [option("a", "为了让每个页面随机换色", false), option("b", "让建议可查询、复现并能携带约束", true), option("c", "为了省略可访问性检查", false)], explanation: "结构化数据让产品、风格和 UX 规则可以被独立检索和复用。" },
  { id: "d13-q2",
        weight: 25, type: "single", concept: "multi-domain-search", prompt: "生成设计系统的正确起点是什么？", options: [option("a", "先只搜一个最潮的风格", false), option("b", "用包含产品、行业与体验关键词的 --design-system 查询", true), option("c", "直接在组件中写 hex", false)], explanation: "先生成完整候选，再用专项 domain 查询补足细节。" },
  { id: "d13-q3",
        weight: 25, type: "single", concept: "design-system", prompt: "设计系统输出落地时应优先形成什么？", options: [option("a", "一份不可修改的截图", false), option("b", "语义 token、组件状态和反模式约束", true), option("c", "每个组件各自决定颜色", false)], explanation: "token 和组件契约使视觉语言一致且可维护。" },
  { id: "d13-q4",
        weight: 25, type: "single", concept: "ui-validation", prompt: "发布前最能证明界面可用的动作是什么？", options: [option("a", "只在桌面截图", false), option("b", "检查键盘焦点、响应式、导航遮挡与 reduced motion", true), option("c", "增加更多装饰动画", false)], explanation: "UX 规则必须在真实断点和交互状态下验证。" }
] };
