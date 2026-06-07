# study-ai

`study-ai` 是一个面向工程实践的 AI Agent 学习项目，用来沉淀学习路线、阶段计划、练习、Prompt 模式和可交互课程页面。

## 项目结构

- `docs/`：系统学习计划、交互课程计划、设计说明和实现计划。
- `notes/`：按主题整理的核心概念笔记。
- `labs/`：可执行练习，用于把概念转成判断和产出。
- `prompts/`：可复用 Prompt 模板和模式。
- `apps/interactive-lessons/`：纯前端 React + TypeScript 互动课程。

## 学习入口

- [AI Agent 系统学习计划](docs/ai-agent-learning-plan.md)
- [交互学习总计划](docs/interactive-learning/overview.md)
- [Day02 Prompt / RAG / Grounding](docs/interactive-learning/day02.md)
- [Day03 Agent 架构](docs/interactive-learning/day03.md)
- [Day04 产品化交付](docs/interactive-learning/day04.md)
- [01 模型认知](notes/01-model-cognition.md)
- [01 业务场景 AI 化判断练习](labs/01-ai-scenario-assessment.md)
- [Prompt Patterns](prompts/prompt-patterns.md)

## 互动课程

互动课程位于 `apps/interactive-lessons`，当前实现 Day01-Day04 的统一入口、独立路由、概念讲解、架构图、做题练习和本地复盘记录。它是纯前端项目，构建后的 `dist` 可以直接随仓库发布。

常用命令：

```powershell
npm run lesson:dev
npm run lesson:test
npm run lesson:build
npm run lesson:dist
```

`lesson:dist` 会在 `apps/interactive-lessons/dist` 生成可发布文件。Vite 使用相对资源路径，适合部署到 GitHub Pages 的仓库子路径。

## GitHub Pages 发布建议

将本仓库推送到 GitHub 后，可以在仓库 Settings -> Pages 中选择从 `main` 分支发布。若发布源为仓库根目录，互动课程页面路径为：

```text
https://<github-user>.github.io/study-ai/apps/interactive-lessons/dist/
```

当前远端通常对应：

```text
https://ilovex1314.github.io/study-ai/apps/interactive-lessons/dist/
```
