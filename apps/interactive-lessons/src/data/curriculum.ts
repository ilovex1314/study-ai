export type CurriculumDay = { id: string; path: string; phase: string; stage: string; capability: string; title: string; summary: string; };

const route = [
  ["定义可靠 AI 行为", "定义可测量任务与模型边界", "AI 产品问题与模型边界"], ["定义可靠 AI 行为", "把 Prompt 当成可测试接口", "Prompt、结构化输出与工具契约"], ["定义可靠 AI 行为", "用证据约束模型回答", "上下文、RAG 与 Grounding"], ["定义可靠 AI 行为", "把副作用装进确定性工作流", "工具、Workflow 与人工确认"], ["定义可靠 AI 行为", "让 Agent 具备状态和停止条件", "Agent、状态与可恢复执行"], ["构建生产系统", "为用户暴露过程、证据与失败", "AI UX：流式、引用与确认"], ["构建生产系统", "管理知识的进入、更新和删除", "知识生命周期与数据治理"], ["构建生产系统", "让权限和策略约束模型行为", "AI 安全、身份与工具权限"], ["构建生产系统", "把质量变成可回归证据", "Eval、红队与质量工程"], ["构建生产系统", "看见每次 AI 运行的成本和失败", "Trace、可观测性与反馈"], ["构建生产系统", "在约束下选择实现路径", "成本、延迟与技术选型"], ["扩展与运营", "编排图像、语音与文本任务", "多模态与实时体验"], ["扩展与运营", "用设计系统交付可访问体验", "AI 产品 UI/UX 工程化"], ["扩展与运营", "为长链路设计恢复和补偿", "持久化工作流与故障恢复"], ["扩展与运营", "让版本变更可审查可回滚", "发布治理与变更控制"], ["扩展与运营", "把事故响应前置到系统设计", "AI SRE、SLO 与事故响应"], ["项目证据闭环", "把模糊机会缩成可验证项目", "项目发现、用户与成功指标"], ["项目证据闭环", "写清可实现的系统边界", "项目架构、数据契约与风险"], ["项目证据闭环", "用 Eval 验证交付结果", "项目实现、评估与发布检查"], ["项目证据闭环", "把结果沉淀为下一轮能力", "项目复盘、能力证据与产品飞轮"]
] as const;

export const curriculum: CurriculumDay[] = route.map(([stage, capability, title], index) => { const number = String(index + 1).padStart(2, "0"); return { id: `day${number}`, path: `/day${number}`, phase: `Day${number}`, stage, capability, title, summary: capability }; });
