---
name: government-project-visual-design
description: 按某政务项目视觉口径生成高保真页面、汇报图或数据大屏概念图。
---

# 某政务项目视觉设计生图

这是项目适配层。先完整读取并执行 [`../visual-design-imagegen/SKILL.md`](../visual-design-imagegen/SKILL.md)，再叠加本文件的项目口径。通用流程与事实边界以通用 Skill 为单一事实源。

## 项目路由

1. 始终读取 [`references/request-patterns.md`](references/request-patterns.md) 和 [`references/visual-guidelines.md`](references/visual-guidelines.md)。
2. 数据大屏任务再读取 [`references/data-dashboard-guidelines.md`](references/data-dashboard-guidelines.md)。
3. 用户提供参考图时，读取 [`references/reference-image-workflow.md`](references/reference-image-workflow.md) 并优先使用用户参考图。
4. 汇报图片没有用户参考图时，读取 [`references/style-reference-catalog.md`](references/style-reference-catalog.md)，从项目内置参考集中选择一张主参考图；确有必要时最多增加一张辅助参考图。

完成路由后，已确定输出类型、所需参考文件和参考图；再调用图片生成能力。

## 项目覆盖项

- 用户未指定视觉方向时，采用现代政务、专业可信、清晰克制、中高信息密度的默认风格。
- 内容默认仅来自本次请求。只有用户明确点名项目文件时才读取；项目内置汇报参考集是无用户参考图时的唯一例外。
- 项目与参考图中的 Logo、品牌名称、水印、人物、业务文字和数据只作为待排除的源内容，不带入新画面。
- 输出均为视觉示意，不替代 PRD、HTML 原型、结构化台账、真实数据分析或验收依据。
- 默认只在当前对话返回图片。用户明确指定保存位置时才写入文件；本 Skill 不修改项目业务资产、依赖或 Git 状态。

## 完成标准

生成结果同时满足通用 Skill 的完成标准、本文件的项目覆盖项，以及本次任务所路由到的项目参考文件。
