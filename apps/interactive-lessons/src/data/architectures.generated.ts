import type { LessonArchitecture } from "./types";

export const architectures: Record<string, LessonArchitecture> = {
  "day01": {
    "title": "模型建议与系统控制边界",
    "summary": "模型负责理解与建议；权限、状态和高风险动作由可审计系统控制。",
    "type": "boundary",
    "nodes": [
      {
        "id": "n1",
        "label": "用户目标",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "模型建议",
        "group": "g2"
      },
      {
        "id": "n3",
        "label": "策略与权限",
        "tone": "system",
        "group": "g3"
      },
      {
        "id": "n4",
        "label": "业务系统状态",
        "tone": "system",
        "group": "g4"
      },
      {
        "id": "n5",
        "label": "可审计动作",
        "tone": "warning",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n1",
        "to": "n3",
        "relation": "guard",
        "label": "边界判断"
      },
      {
        "from": "n5",
        "to": "n2",
        "relation": "dependency",
        "label": "审计反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "输入 / 目标",
        "kind": "boundary"
      },
      {
        "id": "g2",
        "label": "模型与平台能力",
        "kind": "boundary"
      },
      {
        "id": "g3",
        "label": "系统控制",
        "kind": "boundary"
      },
      {
        "id": "g4",
        "label": "治理与退出",
        "kind": "boundary"
      }
    ]
  },
  "day02": {
    "title": "从知识入库到带引用回答",
    "summary": "文档先被处理和索引，再按问题检索、组装上下文并输出可追溯回答。",
    "type": "lifecycle",
    "nodes": [
      {
        "id": "n1",
        "label": "原始文档",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "清洗切块",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "索引入库",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "检索与重排",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "Prompt 合约",
        "tone": "accent",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "带引用回答",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n4",
        "relation": "feedback",
        "label": "反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "离线入库",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "在线查询",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "更新 / 删除 / 反馈",
        "kind": "lane"
      },
      {
        "id": "g4",
        "label": "分组 4",
        "kind": "lane"
      }
    ]
  },
  "day03": {
    "title": "可暂停的 Agent 执行状态",
    "summary": "规划、工具调用和人工确认共享可恢复状态，不把执行当成一次性聊天。",
    "type": "state",
    "nodes": [
      {
        "id": "n1",
        "label": "任务进入",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "制定计划",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "调用工具",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "保存 checkpoint",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n5",
        "label": "人工确认",
        "tone": "warning",
        "group": "g2"
      },
      {
        "id": "n6",
        "label": "恢复或补偿",
        "tone": "system",
        "group": "g3"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "feedback",
        "label": "恢复"
      },
      {
        "from": "n4",
        "to": "n6",
        "relation": "feedback",
        "label": "恢复"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "正常状态",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "人工 / 暂停",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "失败 / 恢复",
        "kind": "lane"
      }
    ]
  },
  "day04": {
    "title": "AI 产品交付分层",
    "summary": "体验、应用编排、模型能力与观测治理分层协作，避免把责任塞进聊天界面。",
    "type": "layered",
    "nodes": [
      {
        "id": "n1",
        "label": "前端体验",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "应用 API",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "模型网关",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "RAG / Agent",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "业务系统",
        "tone": "system",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "观测与评估",
        "tone": "warning",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "观测 / 反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "体验层",
        "kind": "layer"
      },
      {
        "id": "g2",
        "label": "应用服务层",
        "kind": "layer"
      },
      {
        "id": "g3",
        "label": "模型 / 平台层",
        "kind": "layer"
      },
      {
        "id": "g4",
        "label": "业务与治理层",
        "kind": "layer"
      }
    ]
  },
  "day05": {
    "title": "选型责任边界",
    "summary": "业务目标、平台能力、集成约束和退出成本必须分别被验证。",
    "type": "boundary",
    "nodes": [
      {
        "id": "n1",
        "label": "业务任务",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "平台能力",
        "group": "g2"
      },
      {
        "id": "n3",
        "label": "框架适配",
        "group": "g3"
      },
      {
        "id": "n4",
        "label": "数据与合规",
        "tone": "system",
        "group": "g4"
      },
      {
        "id": "n5",
        "label": "供应商退出",
        "tone": "warning",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n1",
        "to": "n3",
        "relation": "guard",
        "label": "边界判断"
      },
      {
        "from": "n5",
        "to": "n2",
        "relation": "dependency",
        "label": "审计反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "输入 / 目标",
        "kind": "boundary"
      },
      {
        "id": "g2",
        "label": "模型与平台能力",
        "kind": "boundary"
      },
      {
        "id": "g3",
        "label": "系统控制",
        "kind": "boundary"
      },
      {
        "id": "g4",
        "label": "治理与退出",
        "kind": "boundary"
      }
    ]
  },
  "day06": {
    "title": "TypeScript AI 应用分层",
    "summary": "UI 状态、服务端边界、Provider 适配与业务能力各守自己的接口。",
    "type": "layered",
    "nodes": [
      {
        "id": "n1",
        "label": "React / Next UI",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "流式状态",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "服务端 API",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "AI SDK",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "Provider Adapter",
        "tone": "system",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "业务数据",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "观测 / 反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "体验层",
        "kind": "layer"
      },
      {
        "id": "g2",
        "label": "应用服务层",
        "kind": "layer"
      },
      {
        "id": "g3",
        "label": "模型 / 平台层",
        "kind": "layer"
      },
      {
        "id": "g4",
        "label": "业务与治理层",
        "kind": "layer"
      }
    ]
  },
  "day07": {
    "title": "持久化工作流状态",
    "summary": "复杂任务在节点间保存状态，可中断、人工介入并从可靠检查点继续。",
    "type": "state",
    "nodes": [
      {
        "id": "n1",
        "label": "启动任务",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "图节点执行",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "持久化状态",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "失败重试",
        "tone": "warning",
        "group": "g2"
      },
      {
        "id": "n5",
        "label": "人工介入",
        "tone": "warning",
        "group": "g2"
      },
      {
        "id": "n6",
        "label": "恢复执行",
        "tone": "system",
        "group": "g3"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "feedback",
        "label": "恢复"
      },
      {
        "from": "n4",
        "to": "n6",
        "relation": "feedback",
        "label": "恢复"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "正常状态",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "人工 / 暂停",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "失败 / 恢复",
        "kind": "lane"
      }
    ]
  },
  "day08": {
    "title": "低代码验证到工程接管",
    "summary": "可视化流程快速验证业务，稳定接口和数据契约再被工程化实现接管。",
    "type": "layered",
    "nodes": [
      {
        "id": "n1",
        "label": "业务流程",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "Dify / Coze / n8n",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "工具 API",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "人工运营",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "数据记录",
        "tone": "system",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "工程化接管",
        "tone": "warning",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "观测 / 反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "体验层",
        "kind": "layer"
      },
      {
        "id": "g2",
        "label": "应用服务层",
        "kind": "layer"
      },
      {
        "id": "g3",
        "label": "模型 / 平台层",
        "kind": "layer"
      },
      {
        "id": "g4",
        "label": "业务与治理层",
        "kind": "layer"
      }
    ]
  },
  "day09": {
    "title": "受权限约束的 RAG 生命周期",
    "summary": "知识在入库、索引、检索和回答时都保留租户与权限过滤。",
    "type": "lifecycle",
    "nodes": [
      {
        "id": "n1",
        "label": "知识源",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "解析切块",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "权限标记",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "混合检索",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "重排",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "引用回答",
        "tone": "accent",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n4",
        "relation": "feedback",
        "label": "反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "离线入库",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "在线查询",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "更新 / 删除 / 反馈",
        "kind": "lane"
      },
      {
        "id": "g4",
        "label": "分组 4",
        "kind": "lane"
      }
    ]
  },
  "day10": {
    "title": "质量反馈闭环",
    "summary": "离线基准、红队、线上反馈和回归测试共同决定是否允许发布。",
    "type": "feedback",
    "nodes": [
      {
        "id": "n1",
        "label": "Golden Set",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "离线评估",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "红队测试",
        "tone": "warning",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "上线门禁",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n5",
        "label": "线上反馈",
        "group": "g1"
      },
      {
        "id": "n6",
        "label": "回归集更新",
        "tone": "system",
        "group": "g2"
      }
    ],
    "feedback": "线上失败样本回流到评估集和门禁规则。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "回流"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "主流程",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "评估与反馈",
        "kind": "lane"
      }
    ]
  },
  "day11": {
    "title": "AI 协作验证回路",
    "summary": "把模糊需求拆成上下文、任务、实现和验证，而不是只让模型一次生成。",
    "type": "feedback",
    "nodes": [
      {
        "id": "n1",
        "label": "任务意图",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "上下文包",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "小步实现",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "自动验证",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n5",
        "label": "人工审阅",
        "tone": "warning",
        "group": "g1"
      },
      {
        "id": "n6",
        "label": "修正提示资产",
        "group": "g2"
      }
    ],
    "feedback": "验证结果反哺上下文和下一次任务拆解。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "回流"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "主流程",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "评估与反馈",
        "kind": "lane"
      }
    ]
  },
  "day12": {
    "title": "可演示项目交付结构",
    "summary": "用范围、用户流、实现切片、验证和部署计划组成可验收的毕业项目。",
    "type": "layered",
    "nodes": [
      {
        "id": "n1",
        "label": "问题与用户",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "项目范围",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "核心任务流",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "实现切片",
        "tone": "system",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "验证证据",
        "tone": "warning",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "部署计划",
        "group": "g4"
      }
    ],
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "观测 / 反馈"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "体验层",
        "kind": "layer"
      },
      {
        "id": "g2",
        "label": "应用服务层",
        "kind": "layer"
      },
      {
        "id": "g3",
        "label": "模型 / 平台层",
        "kind": "layer"
      },
      {
        "id": "g4",
        "label": "业务与治理层",
        "kind": "layer"
      }
    ]
  },
  "day13": {
    "title": "设计数据到可验证界面闭环",
    "summary": "需求约束先转成设计数据检索，再落成 token、组件状态和 UX 验收证据。",
    "type": "feedback",
    "nodes": [
      {
        "id": "n1",
        "label": "学习工作台需求",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "设计数据域",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "多域检索",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "设计系统",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n5",
        "label": "Token / 组件",
        "group": "g1"
      },
      {
        "id": "n6",
        "label": "UX 验收",
        "tone": "warning",
        "group": "g2"
      }
    ],
    "feedback": "验收发现的问题回流为新的设计约束。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n1",
        "relation": "feedback",
        "label": "回流"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "主流程",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "评估与反馈",
        "kind": "lane"
      }
    ]
  },
  "day14": {
    "title": "知识生命周期与删除传播",
    "summary": "知识源变更必须传播到解析、切片、向量、缓存、引用和审计状态。",
    "type": "lifecycle",
    "nodes": [
      {
        "id": "n1",
        "label": "知识源",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "接入校验",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "解析切分",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "Metadata / Version",
        "tone": "system",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "权限过滤检索",
        "group": "g3"
      },
      {
        "id": "n6",
        "label": "带引用回答",
        "tone": "accent",
        "group": "g4"
      },
      {
        "id": "n7",
        "label": "删除传播",
        "tone": "warning",
        "group": "g4"
      }
    ],
    "feedback": "更新、撤回和权限变更触发补偿任务与缓存失效。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "primary"
      },
      {
        "from": "n7",
        "to": "n5",
        "relation": "feedback",
        "label": "更新 / 删除传播"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "离线入库",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "在线查询",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "更新 / 删除 / 反馈",
        "kind": "lane"
      },
      {
        "id": "g4",
        "label": "分组 4",
        "kind": "lane"
      }
    ]
  },
  "day15": {
    "title": "工具调用策略门禁",
    "summary": "模型只能提出工具意图，参数校验、身份策略、审批和审计由确定性系统执行。",
    "type": "gate",
    "nodes": [
      {
        "id": "n1",
        "label": "不可信输入",
        "tone": "warning",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "模型工具意图",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "Tool Schema",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "身份 / ACL",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n5",
        "label": "策略门禁",
        "tone": "accent",
        "group": "g2"
      },
      {
        "id": "n6",
        "label": "审批或执行",
        "group": "g3"
      },
      {
        "id": "n7",
        "label": "审计 Trace",
        "tone": "system",
        "group": "g4"
      }
    ],
    "feedback": "注入和越权样本回流到红队回归集。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "guard"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "guard"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "guard"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "guard"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "guard"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "guard"
      },
      {
        "from": "n5",
        "to": "n4",
        "relation": "branch",
        "label": "允许"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "branch",
        "label": "审批"
      },
      {
        "from": "n5",
        "to": "n7",
        "relation": "branch",
        "label": "拒绝"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "输入",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "确定性控制",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "结果分支",
        "kind": "lane"
      },
      {
        "id": "g4",
        "label": "审计",
        "kind": "lane"
      }
    ]
  },
  "day16": {
    "title": "多模态异步处理流水线",
    "summary": "图片、语音和文本先统一为任务资产，再抽取证据、生成输出并展示进度与降级状态。",
    "type": "pipeline",
    "nodes": [
      {
        "id": "n1",
        "label": "多模态输入",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "Asset Metadata",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "任务队列",
        "tone": "system",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "OCR / ASR / Vision",
        "group": "g3"
      },
      {
        "id": "n5",
        "label": "证据锚点",
        "tone": "system",
        "group": "g4"
      },
      {
        "id": "n6",
        "label": "模型生成",
        "group": "g5"
      },
      {
        "id": "n7",
        "label": "进度与降级",
        "tone": "warning",
        "group": "g5"
      }
    ],
    "feedback": "用户纠错回流到证据锚点和任务 contract。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "primary"
      },
      {
        "from": "n7",
        "to": "n5",
        "relation": "feedback",
        "label": "纠错回流"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "输入层",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "任务层",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "处理层",
        "kind": "lane"
      },
      {
        "id": "g4",
        "label": "推理层",
        "kind": "lane"
      },
      {
        "id": "g5",
        "label": "体验层",
        "kind": "lane"
      }
    ]
  },
  "day17": {
    "title": "成本延迟预算控制闭环",
    "summary": "路由器依据质量、预算和 SLO 选择模型与工具，运行指标再回写下一轮路由策略。",
    "type": "feedback",
    "nodes": [
      {
        "id": "n1",
        "label": "任务请求",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "预算检查",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "模型 / 工具路由",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "检索与缓存",
        "group": "g1"
      },
      {
        "id": "n5",
        "label": "模型调用",
        "group": "g1"
      },
      {
        "id": "n6",
        "label": "成本延迟指标",
        "tone": "warning",
        "group": "g1"
      },
      {
        "id": "n7",
        "label": "预算与 SLO",
        "tone": "system",
        "group": "g2"
      }
    ],
    "feedback": "指标超过阈值时触发缓存、降级、排队或轻量模型路由。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "primary"
      },
      {
        "from": "n7",
        "to": "n1",
        "relation": "feedback",
        "label": "回流"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "主流程",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "评估与反馈",
        "kind": "lane"
      }
    ]
  },
  "day18": {
    "title": "AI 事故响应生命周期",
    "summary": "SLO 告警进入分诊、降级、回滚、沟通和无责复盘，最后沉淀 runbook 与测试。",
    "type": "state",
    "nodes": [
      {
        "id": "n1",
        "label": "SLO 告警",
        "tone": "warning",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "Trace 分诊",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "降级 / 熔断",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "回滚恢复",
        "tone": "accent",
        "group": "g2"
      },
      {
        "id": "n5",
        "label": "用户沟通",
        "group": "g2"
      },
      {
        "id": "n6",
        "label": "无责复盘",
        "group": "g3"
      },
      {
        "id": "n7",
        "label": "Runbook 更新",
        "tone": "system",
        "group": "g3"
      }
    ],
    "feedback": "复盘行动项进入发布门禁和演练计划。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "branch",
        "label": "异常"
      },
      {
        "from": "n4",
        "to": "n6",
        "relation": "feedback",
        "label": "恢复"
      },
      {
        "from": "n4",
        "to": "n7",
        "relation": "feedback",
        "label": "恢复"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "正常状态",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "人工 / 暂停",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "失败 / 恢复",
        "kind": "lane"
      }
    ]
  },
  "day19": {
    "title": "AI 资产发布门禁",
    "summary": "Prompt、模型、数据集、工作流和检索索引都作为版本化资产进入评审、灰度和回滚。",
    "type": "gate",
    "nodes": [
      {
        "id": "n1",
        "label": "版本化 AI 资产",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "变更评审",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "离线 Eval",
        "group": "g2"
      },
      {
        "id": "n4",
        "label": "红队门禁",
        "tone": "warning",
        "group": "g2"
      },
      {
        "id": "n5",
        "label": "灰度发布",
        "tone": "accent",
        "group": "g2"
      },
      {
        "id": "n6",
        "label": "Trace 监控",
        "group": "g3"
      },
      {
        "id": "n7",
        "label": "回滚 Owner",
        "tone": "system",
        "group": "g4"
      }
    ],
    "feedback": "线上漂移和失败样本触发新版本资产评审。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "guard"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "guard"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "guard"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "guard"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "guard"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "guard"
      },
      {
        "from": "n2",
        "to": "n5",
        "relation": "branch",
        "label": "允许"
      },
      {
        "from": "n2",
        "to": "n6",
        "relation": "branch",
        "label": "审批"
      },
      {
        "from": "n2",
        "to": "n7",
        "relation": "branch",
        "label": "拒绝"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "输入",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "确定性控制",
        "kind": "lane"
      },
      {
        "id": "g3",
        "label": "结果分支",
        "kind": "lane"
      },
      {
        "id": "g4",
        "label": "审计",
        "kind": "lane"
      }
    ]
  },
  "day20": {
    "title": "产品能力增长飞轮",
    "summary": "学习行为形成能力证据，能力画像驱动下一步任务和实验，实验结果再改进课程与产品路线。",
    "type": "flywheel",
    "nodes": [
      {
        "id": "n1",
        "label": "学习行为",
        "group": "g1"
      },
      {
        "id": "n2",
        "label": "能力证据",
        "tone": "system",
        "group": "g1"
      },
      {
        "id": "n3",
        "label": "能力画像",
        "group": "g1"
      },
      {
        "id": "n4",
        "label": "下一步任务",
        "tone": "accent",
        "group": "g1"
      },
      {
        "id": "n5",
        "label": "项目产出",
        "group": "g1"
      },
      {
        "id": "n6",
        "label": "实验优化",
        "tone": "warning",
        "group": "g1"
      },
      {
        "id": "n7",
        "label": "路线图决策",
        "tone": "system",
        "group": "g2"
      }
    ],
    "feedback": "实验结论回流到课程、题目和产品优先级。",
    "renderMode": "diagram",
    "edges": [
      {
        "from": "n1",
        "to": "n2",
        "relation": "primary"
      },
      {
        "from": "n2",
        "to": "n3",
        "relation": "primary"
      },
      {
        "from": "n3",
        "to": "n4",
        "relation": "primary"
      },
      {
        "from": "n4",
        "to": "n5",
        "relation": "primary"
      },
      {
        "from": "n5",
        "to": "n6",
        "relation": "primary"
      },
      {
        "from": "n6",
        "to": "n7",
        "relation": "primary"
      },
      {
        "from": "n7",
        "to": "n1",
        "relation": "feedback",
        "label": "回流"
      }
    ],
    "groups": [
      {
        "id": "g1",
        "label": "飞轮循环",
        "kind": "lane"
      },
      {
        "id": "g2",
        "label": "策略决策",
        "kind": "lane"
      }
    ]
  }
};
