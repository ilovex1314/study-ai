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
    "title": "设计数据到可验证界面闭环",
    "summary": "需求约束先转成设计数据检索，再落成 token、组件状态和 UX 验收证据。",
    "type": "feedback",
    "nodes": [
      {
        "label": "学习工作台需求",
        "tone": "accent"
      },
      {
        "label": "设计数据域"
      },
      {
        "label": "多域检索"
      },
      {
        "label": "设计系统",
        "tone": "system"
      },
      {
        "label": "Token / 组件"
      },
      {
        "label": "UX 验收",
        "tone": "warning"
      }
    ],
    "feedback": "验收发现的问题回流为新的设计约束。"
  },
  "day14": {
    "title": "知识生命周期与删除传播",
    "summary": "知识源变更必须传播到解析、切片、向量、缓存、引用和审计状态。",
    "type": "lifecycle",
    "nodes": [
      {
        "label": "知识源"
      },
      {
        "label": "接入校验"
      },
      {
        "label": "解析切分"
      },
      {
        "label": "Metadata / Version",
        "tone": "system"
      },
      {
        "label": "权限过滤检索"
      },
      {
        "label": "带引用回答",
        "tone": "accent"
      },
      {
        "label": "删除传播",
        "tone": "warning"
      }
    ],
    "feedback": "更新、撤回和权限变更触发补偿任务与缓存失效。"
  },
  "day15": {
    "title": "工具调用策略门禁",
    "summary": "模型只能提出工具意图，参数校验、身份策略、审批和审计由确定性系统执行。",
    "type": "gate",
    "nodes": [
      {
        "label": "不可信输入",
        "tone": "warning"
      },
      {
        "label": "模型工具意图"
      },
      {
        "label": "Tool Schema"
      },
      {
        "label": "身份 / ACL",
        "tone": "system"
      },
      {
        "label": "策略门禁",
        "tone": "accent"
      },
      {
        "label": "审批或执行"
      },
      {
        "label": "审计 Trace",
        "tone": "system"
      }
    ],
    "feedback": "注入和越权样本回流到红队回归集。"
  },
  "day16": {
    "title": "多模态异步处理流水线",
    "summary": "图片、语音和文本先统一为任务资产，再抽取证据、生成输出并展示进度与降级状态。",
    "type": "pipeline",
    "nodes": [
      {
        "label": "多模态输入",
        "tone": "accent"
      },
      {
        "label": "Asset Metadata"
      },
      {
        "label": "任务队列",
        "tone": "system"
      },
      {
        "label": "OCR / ASR / Vision"
      },
      {
        "label": "证据锚点",
        "tone": "system"
      },
      {
        "label": "模型生成"
      },
      {
        "label": "进度与降级",
        "tone": "warning"
      }
    ],
    "feedback": "用户纠错回流到证据锚点和任务 contract。"
  },
  "day17": {
    "title": "成本延迟预算控制闭环",
    "summary": "路由器依据质量、预算和 SLO 选择模型与工具，运行指标再回写下一轮路由策略。",
    "type": "feedback",
    "nodes": [
      {
        "label": "任务请求",
        "tone": "accent"
      },
      {
        "label": "预算检查"
      },
      {
        "label": "模型 / 工具路由",
        "tone": "system"
      },
      {
        "label": "检索与缓存"
      },
      {
        "label": "模型调用"
      },
      {
        "label": "成本延迟指标",
        "tone": "warning"
      },
      {
        "label": "预算与 SLO",
        "tone": "system"
      }
    ],
    "feedback": "指标超过阈值时触发缓存、降级、排队或轻量模型路由。"
  },
  "day18": {
    "title": "AI 事故响应生命周期",
    "summary": "SLO 告警进入分诊、降级、回滚、沟通和无责复盘，最后沉淀 runbook 与测试。",
    "type": "state",
    "nodes": [
      {
        "label": "SLO 告警",
        "tone": "warning"
      },
      {
        "label": "Trace 分诊"
      },
      {
        "label": "降级 / 熔断",
        "tone": "system"
      },
      {
        "label": "回滚恢复",
        "tone": "accent"
      },
      {
        "label": "用户沟通"
      },
      {
        "label": "无责复盘"
      },
      {
        "label": "Runbook 更新",
        "tone": "system"
      }
    ],
    "feedback": "复盘行动项进入发布门禁和演练计划。"
  },
  "day19": {
    "title": "AI 资产发布门禁",
    "summary": "Prompt、模型、数据集、工作流和检索索引都作为版本化资产进入评审、灰度和回滚。",
    "type": "gate",
    "nodes": [
      {
        "label": "版本化 AI 资产",
        "tone": "system"
      },
      {
        "label": "变更评审"
      },
      {
        "label": "离线 Eval"
      },
      {
        "label": "红队门禁",
        "tone": "warning"
      },
      {
        "label": "灰度发布",
        "tone": "accent"
      },
      {
        "label": "Trace 监控"
      },
      {
        "label": "回滚 Owner",
        "tone": "system"
      }
    ],
    "feedback": "线上漂移和失败样本触发新版本资产评审。"
  },
  "day20": {
    "title": "产品能力增长飞轮",
    "summary": "学习行为形成能力证据，能力画像驱动下一步任务和实验，实验结果再改进课程与产品路线。",
    "type": "flywheel",
    "nodes": [
      {
        "label": "学习行为"
      },
      {
        "label": "能力证据",
        "tone": "system"
      },
      {
        "label": "能力画像"
      },
      {
        "label": "下一步任务",
        "tone": "accent"
      },
      {
        "label": "项目产出"
      },
      {
        "label": "实验优化",
        "tone": "warning"
      },
      {
        "label": "路线图决策",
        "tone": "system"
      }
    ],
    "feedback": "实验结论回流到课程、题目和产品优先级。"
  }
};
