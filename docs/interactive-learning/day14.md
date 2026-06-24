# Day14：持久化工作流与故障恢复

<!-- architecture
{"title":"长任务恢复状态图","summary":"长任务在关键节点保存 checkpoint，失败后可补偿、暂停或恢复。","type":"state","nodes":[{"label":"任务提交"},{"label":"执行节点","tone":"accent"},{"label":"保存 checkpoint","tone":"system"},{"label":"异常处理","tone":"warning"},{"label":"人工中断","tone":"warning"},{"label":"恢复或补偿","tone":"system"}]}
-->

## 目标

为长链路 AI 任务设计可持久化状态、checkpoint、补偿与人工中断，交付一张可恢复状态图。

## 核心概念

- 业务状态必须可序列化、版本化，不能只存在进程内存。
- Checkpoint 从最近一致点恢复，避免重复副作用。
- 跨服务失败使用补偿或人工升级，不把无限重试当回滚。
- 用状态图显式表示 waiting approval、failed、compensating 与终态。

## 关系图

`任务输入 → 状态快照 → 工具执行 → checkpoint → 审批/补偿 → 完成证据`。

## 实践与复盘

为一个退款或审批流程画状态转移、幂等键、三个 checkpoint 与一条人工升级路径；复盘哪些动作不可逆。
