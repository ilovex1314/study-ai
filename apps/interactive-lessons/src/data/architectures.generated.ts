import type { LessonArchitecture } from "./types";

export const architectures: Record<string, LessonArchitecture> = {
  "day01": {
    "title": "模型建议与系统控制边界",
    "summary": "模型负责理解与建议；权限、状态和高风险动作由可审计系统控制。",
    "type": "boundary",
    "nodes": [
      {
        "label": "用户目标",
        "tone": "accent"
      },
      {
        "label": "模型建议"
      },
      {
        "label": "策略与权限",
        "tone": "system"
      },
      {
        "label": "业务系统状态",
        "tone": "system"
      },
      {
        "label": "可审计动作",
        "tone": "warning"
      }
    ]
  },
  "day02": {
    "title": "从知识入库到带引用回答",
    "summary": "文档先被处理和索引，再按问题检索、组装上下文并输出可追溯回答。",
    "type": "lifecycle",
    "nodes": [
      {
        "label": "原始文档"
      },
      {
        "label": "清洗切块"
      },
      {
        "label": "索引入库",
        "tone": "system"
      },
      {
        "label": "检索与重排"
      },
      {
        "label": "Prompt 合约",
        "tone": "accent"
      },
      {
        "label": "带引用回答"
      }
    ]
  },
  "day03": {
    "title": "可暂停的 Agent 执行状态",
    "summary": "规划、工具调用和人工确认共享可恢复状态，不把执行当成一次性聊天。",
    "type": "state",
    "nodes": [
      {
        "label": "任务进入"
      },
      {
        "label": "制定计划",
        "tone": "accent"
      },
      {
        "label": "调用工具"
      },
      {
        "label": "保存 checkpoint",
        "tone": "system"
      },
      {
        "label": "人工确认",
        "tone": "warning"
      },
      {
        "label": "恢复或补偿",
        "tone": "system"
      }
    ]
  },
  "day04": {
    "title": "AI 产品交付分层",
    "summary": "体验、应用编排、模型能力与观测治理分层协作，避免把责任塞进聊天界面。",
    "type": "layered",
    "nodes": [
      {
        "label": "前端体验",
        "tone": "accent"
      },
      {
        "label": "应用 API"
      },
      {
        "label": "模型网关",
        "tone": "system"
      },
      {
        "label": "RAG / Agent"
      },
      {
        "label": "业务系统",
        "tone": "system"
      },
      {
        "label": "观测与评估",
        "tone": "warning"
      }
    ]
  },
  "day05": {
    "title": "选型责任边界",
    "summary": "业务目标、平台能力、集成约束和退出成本必须分别被验证。",
    "type": "boundary",
    "nodes": [
      {
        "label": "业务任务",
        "tone": "accent"
      },
      {
        "label": "平台能力"
      },
      {
        "label": "框架适配"
      },
      {
        "label": "数据与合规",
        "tone": "system"
      },
      {
        "label": "供应商退出",
        "tone": "warning"
      }
    ]
  },
  "day06": {
    "title": "TypeScript AI 应用分层",
    "summary": "UI 状态、服务端边界、Provider 适配与业务能力各守自己的接口。",
    "type": "layered",
    "nodes": [
      {
        "label": "React / Next UI",
        "tone": "accent"
      },
      {
        "label": "流式状态"
      },
      {
        "label": "服务端 API",
        "tone": "system"
      },
      {
        "label": "AI SDK"
      },
      {
        "label": "Provider Adapter",
        "tone": "system"
      },
      {
        "label": "业务数据"
      }
    ]
  },
  "day07": {
    "title": "持久化工作流状态",
    "summary": "复杂任务在节点间保存状态，可中断、人工介入并从可靠检查点继续。",
    "type": "state",
    "nodes": [
      {
        "label": "启动任务"
      },
      {
        "label": "图节点执行",
        "tone": "accent"
      },
      {
        "label": "持久化状态",
        "tone": "system"
      },
      {
        "label": "失败重试",
        "tone": "warning"
      },
      {
        "label": "人工介入",
        "tone": "warning"
      },
      {
        "label": "恢复执行",
        "tone": "system"
      }
    ]
  },
  "day08": {
    "title": "低代码验证到工程接管",
    "summary": "可视化流程快速验证业务，稳定接口和数据契约再被工程化实现接管。",
    "type": "layered",
    "nodes": [
      {
        "label": "业务流程",
        "tone": "accent"
      },
      {
        "label": "Dify / Coze / n8n"
      },
      {
        "label": "工具 API",
        "tone": "system"
      },
      {
        "label": "人工运营"
      },
      {
        "label": "数据记录",
        "tone": "system"
      },
      {
        "label": "工程化接管",
        "tone": "warning"
      }
    ]
  },
  "day09": {
    "title": "受权限约束的 RAG 生命周期",
    "summary": "知识在入库、索引、检索和回答时都保留租户与权限过滤。",
    "type": "lifecycle",
    "nodes": [
      {
        "label": "知识源"
      },
      {
        "label": "解析切块"
      },
      {
        "label": "权限标记",
        "tone": "system"
      },
      {
        "label": "混合检索"
      },
      {
        "label": "重排"
      },
      {
        "label": "引用回答",
        "tone": "accent"
      }
    ]
  },
  "day10": {
    "title": "质量反馈闭环",
    "summary": "离线基准、红队、线上反馈和回归测试共同决定是否允许发布。",
    "type": "feedback",
    "nodes": [
      {
        "label": "Golden Set",
        "tone": "system"
      },
      {
        "label": "离线评估"
      },
      {
        "label": "红队测试",
        "tone": "warning"
      },
      {
        "label": "上线门禁",
        "tone": "accent"
      },
      {
        "label": "线上反馈"
      },
      {
        "label": "回归集更新",
        "tone": "system"
      }
    ],
    "feedback": "线上失败样本回流到评估集和门禁规则。"
  },
  "day11": {
    "title": "AI 协作验证回路",
    "summary": "把模糊需求拆成上下文、任务、实现和验证，而不是只让模型一次生成。",
    "type": "feedback",
    "nodes": [
      {
        "label": "任务意图",
        "tone": "accent"
      },
      {
        "label": "上下文包"
      },
      {
        "label": "小步实现"
      },
      {
        "label": "自动验证",
        "tone": "system"
      },
      {
        "label": "人工审阅",
        "tone": "warning"
      },
      {
        "label": "修正提示资产"
      }
    ],
    "feedback": "验证结果反哺上下文和下一次任务拆解。"
  },
  "day12": {
    "title": "可演示项目交付结构",
    "summary": "用范围、用户流、实现切片、验证和部署计划组成可验收的毕业项目。",
    "type": "layered",
    "nodes": [
      {
        "label": "问题与用户",
        "tone": "accent"
      },
      {
        "label": "项目范围"
      },
      {
        "label": "核心任务流"
      },
      {
        "label": "实现切片",
        "tone": "system"
      },
      {
        "label": "验证证据",
        "tone": "warning"
      },
      {
        "label": "部署计划"
      }
    ]
  },
  "day13": {
    "title": "设计建议到可验证界面",
    "summary": "设计上下文驱动组件实现，渲染结果再回到视觉与交互验证。",
    "type": "feedback",
    "nodes": [
      {
        "label": "设计目标",
        "tone": "accent"
      },
      {
        "label": "UI/UX 数据检索"
      },
      {
        "label": "设计系统",
        "tone": "system"
      },
      {
        "label": "React 组件"
      },
      {
        "label": "页面验证",
        "tone": "warning"
      },
      {
        "label": "设计调整"
      }
    ],
    "feedback": "验证发现的问题回流到设计约束和组件实现。"
  },
  "day14": {
    "title": "长任务恢复状态图",
    "summary": "长任务在关键节点保存 checkpoint，失败后可补偿、暂停或恢复。",
    "type": "state",
    "nodes": [
      {
        "label": "任务提交"
      },
      {
        "label": "执行节点",
        "tone": "accent"
      },
      {
        "label": "保存 checkpoint",
        "tone": "system"
      },
      {
        "label": "异常处理",
        "tone": "warning"
      },
      {
        "label": "人工中断",
        "tone": "warning"
      },
      {
        "label": "恢复或补偿",
        "tone": "system"
      }
    ]
  },
  "day15": {
    "title": "受控发布反馈环",
    "summary": "变更经过分级、灰度和停止阈值控制，线上信号决定继续或回滚。",
    "type": "feedback",
    "nodes": [
      {
        "label": "变更包",
        "tone": "accent"
      },
      {
        "label": "风险分级"
      },
      {
        "label": "灰度发布",
        "tone": "system"
      },
      {
        "label": "停止阈值",
        "tone": "warning"
      },
      {
        "label": "线上指标"
      },
      {
        "label": "回滚包",
        "tone": "warning"
      }
    ],
    "feedback": "指标越过阈值时回到已验证版本并记录治理证据。"
  },
  "day16": {
    "title": "AI SRE 信号与响应环",
    "summary": "用户体验 SLO、trace、告警和 runbook 连接成可执行的事故响应闭环。",
    "type": "feedback",
    "nodes": [
      {
        "label": "用户 SLO",
        "tone": "accent"
      },
      {
        "label": "端到端 Trace",
        "tone": "system"
      },
      {
        "label": "告警触发",
        "tone": "warning"
      },
      {
        "label": "降级开关",
        "tone": "system"
      },
      {
        "label": "事故 Runbook"
      },
      {
        "label": "复盘改进"
      }
    ],
    "feedback": "事故复盘更新 SLO、告警和演练方案。"
  },
  "day17": {
    "title": "项目发现验证飞轮",
    "summary": "真实用户任务形成假设和最小切片，验证数据再决定下一轮发现。",
    "type": "feedback",
    "nodes": [
      {
        "label": "目标用户",
        "tone": "accent"
      },
      {
        "label": "高频任务"
      },
      {
        "label": "可证伪假设"
      },
      {
        "label": "两周切片",
        "tone": "system"
      },
      {
        "label": "成功指标",
        "tone": "warning"
      },
      {
        "label": "访谈与数据"
      }
    ],
    "feedback": "证据不足时收缩问题定义，而非扩张功能。"
  },
  "day18": {
    "title": "项目责任与数据边界",
    "summary": "用户、应用、模型、数据和高风险动作由明确契约与权限矩阵隔离。",
    "type": "boundary",
    "nodes": [
      {
        "label": "用户与角色",
        "tone": "accent"
      },
      {
        "label": "应用编排"
      },
      {
        "label": "模型服务"
      },
      {
        "label": "数据契约",
        "tone": "system"
      },
      {
        "label": "权限矩阵",
        "tone": "system"
      },
      {
        "label": "高风险动作",
        "tone": "warning"
      }
    ]
  },
  "day19": {
    "title": "实现到发布的质量闭环",
    "summary": "端到端任务切片通过 golden set、发布门禁和线上反馈持续被验证。",
    "type": "feedback",
    "nodes": [
      {
        "label": "任务切片",
        "tone": "accent"
      },
      {
        "label": "端到端实现"
      },
      {
        "label": "Golden Set",
        "tone": "system"
      },
      {
        "label": "发布检查",
        "tone": "warning"
      },
      {
        "label": "线上监测"
      },
      {
        "label": "缺陷回流"
      }
    ],
    "feedback": "失败样本进入下一轮实现与评估，不被发布后遗忘。"
  },
  "day20": {
    "title": "项目复盘与能力飞轮",
    "summary": "运行事实形成复盘和证据档案，再转为下一轮产品与能力练习。",
    "type": "feedback",
    "nodes": [
      {
        "label": "运行事实",
        "tone": "system"
      },
      {
        "label": "无责复盘",
        "tone": "accent"
      },
      {
        "label": "项目档案"
      },
      {
        "label": "能力证据",
        "tone": "system"
      },
      {
        "label": "能力缺口",
        "tone": "warning"
      },
      {
        "label": "下一轮练习"
      }
    ],
    "feedback": "沉淀的证据决定下一轮优先补齐什么。"
  }
};
