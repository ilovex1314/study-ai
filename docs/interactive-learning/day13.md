# Day 13 UI/UX Pro Max 实战

<!-- architecture
{"title":"设计建议到可验证界面","summary":"设计上下文驱动组件实现，渲染结果再回到视觉与交互验证。","type":"feedback","nodes":[{"label":"设计目标","tone":"accent"},{"label":"UI/UX 数据检索"},{"label":"设计系统","tone":"system"},{"label":"React 组件"},{"label":"页面验证","tone":"warning"},{"label":"设计调整"}],"feedback":"验证发现的问题回流到设计约束和组件实现。"}
-->

## Goal

掌握 UI/UX Pro Max 的原理和数据链路，并把一次设计建议稳定地落成可维护、可验证的 React 页面。

Estimated time: 75 minutes.

## Why It Matters

未经约束的“美化页面”无法复现，也很难在团队内审查。这个 Skill 将设计判断拆成可查询数据、规则聚合和验收规则，因此可把一次建议变成项目资产。

## Core Concepts

- **设计数据**：产品、风格、色彩、字体、版式和 UX 规则是独立域；每条规则包含适用情境与反模式。
- **多域检索**：`--design-system` 先并行找候选，再由行业规则与排序层汇总。
- **设计系统**：输出应被翻译为语义 token、组件状态和页面层级，而不是复制一张截图。
- **UX 验收**：键盘、焦点、响应式、固定元素和减少动效需要在真实界面中检查。

## Data And Logic Flow

`需求关键词 -> 产品/风格/颜色/版式/字体 CSV -> 检索与行业规则 -> 设计系统 -> token 与组件 -> UX 验收 -> 下一轮输入`。

上游是用户场景、目标用户、内容密度和可访问性约束；下游是 CSS token、组件交互状态、代码评审清单和下一轮查询。反馈只改变查询或 token 映射，不直接让视觉漂移。

```bash
python3 ~/.codex/skills/ui-ux-pro-max/scripts/search.py 'interactive AI engineering learning platform dark focused editorial' --design-system -p study-ai
python3 ~/.codex/skills/ui-ux-pro-max/scripts/search.py 'accessibility navigation responsive reduced motion' --domain ux -n 12
```

## Practice

将输出映射为 `surface`、`text`、`accent`、`motion` token；随后在 375/768/1024/1440 宽度检查键盘焦点、导航遮挡与 reduced motion。

交付物：把查询、生成结果、token 映射与验收结论写入一个项目文档。验证方法：刷新页面后用 Tab 到达跳转链接和所有主操作，切换到窄屏并启用减少动效，再确认内容没有被固定导航遮住。

## Production Example

本项目的查询给出沉浸式/深色候选，但课程需要长时间阅读，因此最终保留高专注层级，改用高对比工作台、语义 token 和可见焦点；这说明推荐必须与产品上下文和验收共同决策。

## Counterexample

只把推荐色复制到 CSS、仍将 hex 散落在组件里，或只在桌面截图中检查，会失去设计系统的复用性和可访问性保障。

## Exploration Prompt

任选现有页面，写两条相反的查询（例如“content-dense editorial”与“playful bento”），比较输出的反模式，并说明哪一个更适合该页面的真实用户和任务。

## Quiz

1. 为什么先用结构化设计数据？因为建议需要可查询、复现并携带约束。
2. 设计系统从什么命令开始？从含产品与体验关键词的 `--design-system` 查询开始。
3. 输出应落为什么？落为语义 token、组件状态和反模式约束。
4. 怎么验收？检查键盘、焦点、断点、固定导航与减少动效。

## Review And Reinforcement

不看资料重画数据链路；为每个阶段写一个失败模式和一个验收方法；把最终查询保存为下一次页面改造的可复用起点。

## References

- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
