# Day 13 UI/UX Pro Max 与学习工作台

<!-- architecture
{"title":"设计数据到可验证界面闭环","summary":"需求约束先转成设计数据检索，再落成 token、组件状态和 UX 验收证据。","type":"feedback","nodes":[{"id":"n1","label":"学习工作台需求","tone":"accent","group":"g1"},{"id":"n2","label":"设计数据域","group":"g1"},{"id":"n3","label":"多域检索","group":"g1"},{"id":"n4","label":"设计系统","tone":"system","group":"g1"},{"id":"n5","label":"Token / 组件","group":"g1"},{"id":"n6","label":"UX 验收","tone":"warning","group":"g2"}],"feedback":"验收发现的问题回流为新的设计约束。","renderMode":"diagram","edges":[{"from":"n1","to":"n2","relation":"primary"},{"from":"n2","to":"n3","relation":"primary"},{"from":"n3","to":"n4","relation":"primary"},{"from":"n4","to":"n5","relation":"primary"},{"from":"n5","to":"n6","relation":"primary"},{"from":"n6","to":"n1","relation":"feedback","label":"回流"}],"groups":[{"id":"g1","label":"主流程","kind":"lane"},{"id":"g2","label":"评估与反馈","kind":"lane"}]}
-->

## Today Goal

掌握 UI/UX Pro Max 的数据化设计思路，并把一次设计建议落成可维护、可访问、可验证的学习工作台界面规范。完成后，你应该能说明设计数据、检索规则、语义 token、组件状态和 UX 验收之间的关系。

Estimated time: 75 minutes.

## Why This Matters

“美化页面”如果不能复现、不能审查、不能验证，就会变成一次性截图。AI 学习产品需要长时间阅读、断点导航、练习和复盘，设计系统必须服务学习效率、可访问性和内容密度，而不是追逐表面风格。

## Core Concepts

### 设计数据让建议可查询和复现

产品类型、行业语境、风格、色彩、字体、版式和 UX 规则应被组织成独立数据域。它解决的是“设计建议凭感觉漂移”的问题。边界是：数据只能提供候选和约束，最终仍要结合用户任务。常见误区是只复制流行配色，不记录适用条件。

### 多域检索把模糊需求拆成候选方案

`--design-system` 类查询会从产品、风格、颜色、版式和字体等域生成候选，再由规则层汇总。它解决的是单一关键词导致的偏差。边界是：查询要包含产品、用户、内容密度和体验约束。常见误区是只搜索 “cool app”，没有说明学习工作台和长阅读任务。

### 设计系统输出要落成 token 和组件状态

推荐结果要被翻译成语义 token、间距尺度、焦点态、按钮状态、导航层级和内容区块。它解决的是“视觉不可维护”的问题。边界是：不要把所有 hex 和特效直接写进组件。常见误区是复制一张截图，却没有设计系统。

### UX 验收决定设计是否真的可用

键盘可达、焦点可见、断点适配、固定导航不遮挡、颜色对比和 reduced motion 都要在真实页面检查。它解决的是“桌面截图好看但用户用不了”的问题。边界是：自动检查不能替代手动断点体验。常见误区是只有 hover 状态，没有键盘和小屏路径。

## Underlying Architecture

```text
需求关键词 -> 设计数据域 -> 多域检索 -> 规则排序 -> 设计系统 -> token/组件 -> UX 验收 -> 下一轮输入
               |              |            |             |             |
               v              v            v             v             v
            product/style   candidates   anti-patterns  CSS vars    evidence
```

Diagram recommendation: use a design data pipeline. The key relationship is how design knowledge becomes reusable implementation constraints.

## Data And Logic Flow

1. 输入流：产品目标、学习者、内容密度、断点、可访问性约束 -> 设计查询。
2. 检索流：产品/风格/色彩/版式/字体/UX 数据域 -> 候选方案 -> 反模式过滤。
3. 落地流：推荐结果 -> semantic tokens -> component states -> page hierarchy。
4. 验收流：375/768/1024/1440 px、键盘、焦点、导航遮挡、reduced motion -> 修正 token 或组件规则。

## Key Technical Points

- 设计查询要包含产品任务，例如 `interactive AI engineering learning platform focused editorial accessible`。
- 语义 token 优先于原始颜色：`surface`、`text`、`accent`、`danger`、`focus`、`motion`。
- 学习工作台需要高可读正文、清晰锚点导航、稳定图示区域和低干扰练习区。
- 图示应该按关系类型选择：边界图、生命周期图、状态图、反馈闭环图，而不是所有章节画成同一种流程。
- 验收要保存证据：断点截图、键盘路径、焦点状态、导航不遮挡结论。

## Upstream Dependencies And Downstream Applications

上游依赖 PRD 的 P0 本地学习工作台边界、Day01-Day12 的课程内容结构和学习者的长阅读需求。下游影响 Day14-Day20 的关系图表达、前端组件系统、README 和研发导入 typed lesson 时的图示字段。

## Production Example

本项目保留暖白纸张底色、深蓝系统状态、金色主行动、克制标签和高对比编辑式排版；右侧导航在桌面折叠/展开，H5 使用文档流内横向导航，避免遮挡课程正文和图示。

## Counterexample

只把某个炫酷深色模板复制进 CSS，仍把 hex 色值散落在组件里，题目区、图示区和导航区没有稳定状态。桌面截图看起来强，但小屏遮挡内容，键盘用户无法跳转。

## Hands-On Practice

为学习工作台输出一份设计落地清单：

- 查询语句和使用的设计约束。
- `surface`、`text`、`accent`、`focus`、`motion` token。
- 组件状态：导航、概念卡、图示、练习、题目、复盘。
- 断点验收：375、768、1024、1440 px。
- 失败修正：遮挡、溢出、对比不足、动效过强。

Deliverable: save the checklist under `docs/` and include one paragraph explaining how you would verify it in the browser.

## Exploration Prompt

对同一页面写两条相反查询：`content-dense focused editorial learning workbench` 与 `playful bento gamified dashboard`。比较它们的反模式，说明哪一个更适合工程学习产品，以及哪些元素可以少量借鉴。

## Quiz

1. 为什么要把设计知识组织成数据域？
   - A. 为了让页面随机换色
   - B. 为了让建议可查询、可复现并携带适用约束
   - C. 为了省略 UX 验收
   - Answer: B。结构化设计数据能减少凭感觉漂移。
2. 多域检索的输入最应该包含什么？
   - A. 只有 “app”
   - B. 产品、用户、内容密度、风格和体验约束
   - C. 只有一个颜色名
   - Answer: B。查询质量决定候选方案质量。
3. 设计系统落地时优先形成什么？
   - A. 不可修改的截图
   - B. 语义 token、组件状态和反模式约束
   - C. 每个组件各自决定颜色
   - Answer: B。Token 和组件状态让视觉语言可维护。
4. 发布前最能证明 UI 可用的动作是什么？
   - A. 只看桌面截图
   - B. 检查键盘焦点、响应式、导航遮挡和 reduced motion
   - C. 增加更多装饰动画
   - Answer: B。UX 规则必须在真实断点和交互状态下验证。

## Review And Reinforcement

- Re-draw the design data pipeline and mark which output becomes code constraint.
- Convert one visual recommendation into semantic tokens and component states.
- Run a manual UX checklist and record the first issue you would fix.

## References

- UI/UX Pro Max Skill: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- W3C Web Content Accessibility Guidelines: https://www.w3.org/WAI/standards-guidelines/wcag/
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
