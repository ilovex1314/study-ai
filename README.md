# study-ai

`study-ai` 是一个面向工程实践的 AI 产品学习工作台。项目当前聚焦 P0 阶段：用 Day01-Day20 的课程源、互动应用、架构判断、开放练习、100 分制测验和本地复盘，帮助工程师把 AI 产品能力沉淀为可验证证据。

## 当前入口

- [产品 PRD](docs/study-ai-product-prd.md)
- [产品迭代工作区](docs/product/README.md)
- [需求索引](docs/product/requirements-index.md)
- [项目产线与角色 Prompt](docs/project-pipeline-prompts.md)
- [互动课程总览](docs/interactive-learning/overview.md)
- [Day01-Day20 课程源](docs/interactive-learning/)
- [互动学习应用](apps/interactive-lessons/)

## 项目结构

| 路径 | 用途 |
| --- | --- |
| `docs/product/` | 产品需求、issue、refact 和迭代索引。 |
| `docs/interactive-learning/` | Day01-Day20 课程 Markdown 源与课程总览。 |
| `docs/superpowers/specs/` | 已确认的设计规格。 |
| `docs/superpowers/plans/` | 实施计划与执行拆解。 |
| `apps/interactive-lessons/` | 本地优先的 React + TypeScript 互动学习工作台。 |
| `notes/`、`labs/`、`prompts/` | 早期学习资产，作为历史资料保留，不再作为当前主入口。 |

## 互动课程

互动课程当前覆盖 Day01-Day20。每章包含能力目标、概念讲解、架构判断、做题练习和复盘记录。课程内容以 `docs/interactive-learning/dayXX.md` 为事实源，应用通过数据生成和校验保持 Markdown、typed lesson、路由、题目概念和参考资料一致。

应用是纯前端项目：学习进度和记录保存在浏览器本地，不包含登录、云同步或实时 AI 教练。

常用命令：

```bash
pnpm lesson:dev
pnpm lesson:test
pnpm lesson:build
pnpm lesson:dist
```

应用目录内命令：

```bash
pnpm --dir apps/interactive-lessons dev
pnpm --dir apps/interactive-lessons run validate:lessons
pnpm --dir apps/interactive-lessons test
pnpm --dir apps/interactive-lessons build
```

## 协作产线

项目采用“轻量项目办 + 专项执行线程”的产线，详见 [项目产线与角色 Prompt](docs/project-pipeline-prompts.md)。

基本规则：

- 新需求先沉淀到 `docs/product/topics/...`。
- 小 bug 直接交给研发工程师。
- 课程内容问题先交给内容生产师，再交给研发工程师。
- 产品范围或 P0 边界不清时先交给产品经理。
- 项目负责人只做短交接和验收汇总，不读取完整子线程、长日志、长 diff、图片或 `dist` bundle 内容。

## 历史学习资产

以下文件来自早期 Day01 学习资料，保留用于追溯，但当前课程主线以 `docs/interactive-learning/day01.md` 到 `day20.md` 为准。

- [模型认知笔记](notes/01-model-cognition.md)
- [业务场景 AI 化判断练习](labs/01-ai-scenario-assessment.md)
- [Prompt Patterns](prompts/prompt-patterns.md)

## Markdown 格式化脚本

`baoyu-format-markdown` 的 frontmatter 和结构设计完成后，可以用仓库内 wrapper 跑最后的 typography 阶段。该入口会依次尝试 `bun`、`npx -y bun`、`pnpm dlx bun`，并在 Codex 桌面环境中自动 fallback 到 bundled runtime：

```bash
./scripts/baoyu-format-markdown.sh docs/product/topics/feature/example.md
```

也可以通过 pnpm 脚本调用：

```bash
pnpm format:baoyu -- docs/product/topics/feature/example.md
```

## 发布说明

构建会在 `apps/interactive-lessons/dist` 生成可发布文件。Vite 使用相对资源路径，适合部署到 Cloudflare Pages 或 GitHub Pages 的仓库子路径。

GitHub Pages 路径通常为：

```text
https://ilovex1314.github.io/study-ai/apps/interactive-lessons/dist/
```
