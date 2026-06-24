# Day16：AI SRE、SLO 与事故响应

<!-- architecture
{"title":"AI SRE 信号与响应环","summary":"用户体验 SLO、trace、告警和 runbook 连接成可执行的事故响应闭环。","type":"feedback","nodes":[{"label":"用户 SLO","tone":"accent"},{"label":"端到端 Trace","tone":"system"},{"label":"告警触发","tone":"warning"},{"label":"降级开关","tone":"system"},{"label":"事故 Runbook"},{"label":"复盘改进"}],"feedback":"事故复盘更新 SLO、告警和演练方案。"}
-->

## 目标

为 AI 功能定义用户 SLO、端到端 trace、降级开关和事故 runbook。

## 核心概念

- SLI 要描述用户任务的成功、延迟与安全结果。
- Trace 用同一 ID 连接模型、检索、工具、审批和版本。
- 事故先降低影响，再恢复、沟通和无责复盘。
- 成本、限流与队列积压同样是可靠性信号。

## 关系图

`用户任务 → SLI/SLO → trace 诊断 → 告警 → 降级/恢复 → 复盘 → 规则更新`。

## 实践与复盘

写一个检索超时 runbook，并为证据问答给出成功率、P95 延迟和安全失败率三个指标。
