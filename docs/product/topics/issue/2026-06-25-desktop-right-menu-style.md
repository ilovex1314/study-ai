---
title: 桌面右侧菜单样式问题
slug: desktop-right-menu-style
type: issue
status: ready
source: user feedback, docs/superpowers/specs/2026-06-24-personal-learning-workbench-design.zh-CN.md
owner: product-manager
created: 2026-06-25
summary: 修复桌面右侧菜单 hover 后尺寸过大、图标右侧线条和内容覆盖问题。
description: 历史反馈中提到 PC 右侧 menu hover 上去时容器过大，icon 右边有一条线。P0 规格已把桌面导航定义为固定右边缘折叠把手，hover 或 focus 后展开为 overlay，不改变正文宽度。
---

## 背景

课程导航经历过左侧栏、底部目录、右侧 section rail 等方案。当前 P0 规格明确：桌面端使用固定右侧折叠把手，展开时覆盖右边缘，不改变内容 grid 宽度。

## 用户与问题

- 目标用户：桌面端学习者。
- 当前痛点：hover 展开后菜单视觉面积不受控，图标旁出现异常线条，阅读区域容易被干扰。
- 期望结果：右侧导航稳定、轻量、可访问，不影响正文宽度。

## 范围

### In Scope

- hover/focus 展开尺寸只包裹必要内容。
- 去除 icon 右侧异常线条。
- overlay 层级高于正文，但不改变正文布局。
- 支持键盘 focus、aria-current 和直接章节 URL。

### Out of Scope

- 不重新设计整个课程视觉系统。
- 不引入新的导航信息架构。

## 产品方案

桌面保留右边缘折叠把手。展开态以浮层呈现五个锚点：路线、概念、架构、练习、复盘。H5 不显示右轨，改用头部内横向文字导航。

## 验收标准

- 1440px 桌面下，右侧菜单展开后不推动正文。
- hover 展开容器宽高只覆盖菜单内容。
- icon 旁无异常边线。
- 键盘 focus 可展开并看到当前模块状态。
- 1024px 及以下不显示桌面右轨。

## 依赖与风险

- 依赖：当前 App 导航结构和 CSS 层级。
- 风险：如果与 P0 导航重构同时做，需要避免重复修两套导航。

## 后续动作

- 优先作为 P0 导航验收项纳入实现计划。
