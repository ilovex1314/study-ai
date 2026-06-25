# study-ai

`study-ai` 是一个面向工程实践的 AI 产品学习工作台。它把概念、架构判断、开放实践、100 分制测验和本地复盘连接成可验证的能力证据。

## 项目结构

- `docs/`：系统学习计划、交互课程计划、设计说明和实现计划。
- `notes/`：按主题整理的核心概念笔记。
- `labs/`：可执行练习，用于把概念转成判断和产出。
- `prompts/`：可复用 Prompt 模板和模式。
- `apps/interactive-lessons/`：本地优先的 React + TypeScript 互动学习工作台。

## 学习入口

- [AI Agent 系统学习计划](docs/ai-agent-learning-plan.md)
- [交互学习总计划](docs/interactive-learning/overview.md)
- [个人学习工作台设计规格（中文）](docs/superpowers/specs/2026-06-24-personal-learning-workbench-design.zh-CN.md)
- [01 模型认知](notes/01-model-cognition.md)
- [01 业务场景 AI 化判断练习](labs/01-ai-scenario-assessment.md)
- [Prompt Patterns](prompts/prompt-patterns.md)

## 互动课程

互动课程位于 `apps/interactive-lessons`，当前提供 Day01–Day20 的能力路线、独立章节路由、关系型架构图、题号直选、100 分制加权测验和本地复盘记录。它是纯前端项目：学习进度和记录只保存在浏览器本地，未伪造登录、云同步或 AI 教练能力。

常用命令：

```bash
pnpm --dir apps/interactive-lessons dev
pnpm --dir apps/interactive-lessons test
pnpm --dir apps/interactive-lessons build
pnpm lesson:dev
pnpm lesson:test
pnpm lesson:build
pnpm lesson:dist
```

课程内容以 `docs/interactive-learning/dayXX.md` 为事实源；P0 阶段覆盖 Day01–Day20，并要求 Markdown、typed lesson、路由、题目概念和参考资料保持一致。

构建会在 `apps/interactive-lessons/dist` 生成可发布文件。Vite 使用相对资源路径，适合部署到 Cloudflare Pages 或 GitHub Pages 的仓库子路径。

## Markdown 格式化脚本

`baoyu-format-markdown` 的 frontmatter 和结构设计完成后，可以用仓库内 wrapper 跑最后的 typography 阶段。该入口会依次尝试 `bun`、`npx -y bun`、`pnpm dlx bun`，并在 Codex 桌面环境中自动 fallback 到 bundled runtime：

```bash
./scripts/baoyu-format-markdown.sh docs/product/topics/feature/example.md
```

也可以通过 pnpm 脚本调用：

```bash
pnpm format:baoyu -- docs/product/topics/feature/example.md
```

## GitHub Pages 发布建议

将本仓库推送到 GitHub 后，可以在仓库 Settings -> Pages 中选择从 `main` 分支发布。若发布源为仓库根目录，互动课程页面路径为：

```text
https://<github-user>.github.io/study-ai/apps/interactive-lessons/dist/
```

当前远端通常对应：

```text
https://ilovex1314.github.io/study-ai/apps/interactive-lessons/dist/
```
