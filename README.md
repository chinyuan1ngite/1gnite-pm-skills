# 1gnite PM Skills

面向产品经理的 Agent Skills，覆盖会议纪要、需求追溯、测试用例设计和视觉生图。附“某政务项目”的脱敏示例，可从会议记录一路追溯到 PRD、HTML 原型、台账和测试用例。

## Skills

### [`meeting-minutes`](skills/meeting-minutes/SKILL.md)

把会议逐字稿或笔记整理成中文纪要，提取决定、行动项与待确认问题，并保留时间戳或原文段落。需求评审时可附 PRD 需求来源表。直接处理音频需要当前环境提供获准使用的转写能力。

### [`test-case-design`](skills/test-case-design/SKILL.md)

从 PRD、用户故事或验收标准设计与评审手工功能用例，补齐边界、权限、状态和异常恢复场景。输出可执行步骤、可观察预期、验收覆盖和环境依赖。用例初始标为「未执行」。

### `government-project-visual-design`

面向虚构“某政务项目”的视觉设计适配层。它在通用视觉生图 Skill 之上叠加现代政务视觉口径、任务路由和经过脱敏处理的内置参考图集，用于体现项目定制 Skill 与纯通用 Skill 的差异。

该 Skill 采用显式调用：

```text
$government-project-visual-design
```

适合生成：

- 政务 B 端高保真页面概念图；
- 项目进展、方案架构和问题分析汇报图；
- 运行态势、监测看板和数据大屏概念图。

示例：

```text
使用 $government-project-visual-design 生成一张 16:9 的项目进展汇报图。
主题：本周产品设计进展
核心结论：完成需求框架、形成原型规范、待确认权限边界
不要补充未提供的数字和业务规则。
```

### `visual-design-imagegen`

通用视觉生图 Skill。根据内容简报和可选参考图，生成 UI 概念图、汇报信息图和数据大屏视觉方案。

它将可复用的生图方法与具体项目内容、品牌和资产分离，主要包含：

- UI 概念图、汇报信息图和数据大屏的简报模式；
- 视觉层级、构图与信息密度规范；
- 多参考图角色分配和源内容隔离规则；
- 数据大屏的数据真实性约束；
- 用于显式调用的 Codex UI 元数据。

## 安装与使用

将需要的 Skill 目录复制到 Agent 环境使用的 Skill 目录中。以下是三个调用示例。

```text
使用 $meeting-minutes，把单位管理的模拟会议记录整理成评审纪要，并附 PRD 需求来源表。
```

```text
使用 $test-case-design，根据单位管理 PRD 设计手工用例，并列出验收覆盖、待确认项和联调依赖。
```

```text
使用 $visual-design-imagegen 生成一张 16:9 的运行态势大屏概念图。
展示服务量、办结趋势、区域分布和当前预警。
只使用我提供的标签和数值，缺失数据使用视觉占位。
```

生成结果属于视觉概念稿，不替代功能界面、可编辑演示文稿或经过验证的真实数据可视化。

## 某政务项目产品工作流示例

[`examples/government-project-product-workflow`](examples/government-project-product-workflow) 是一套经过脱敏处理、但保留真实项目结构与协作方式的政务产品资料库示例，包含：

- 仓库级 `AGENTS.md`，约束事实、推断、建议、待确认和历史资料的边界；
- PRD 写作规范、结构模板和质量检查清单；
- 一条可追溯的单位管理链路：模拟会议记录 → 结构化纪要 → 需求与 PRD → HTML 原型和结构化台账 → 验收标准与测试用例；
- 页面、字段、操作、权限、状态和验收标准之间的中文稳定编号；
- 从现有页面反向补档、差异检查和跨资产一致性维护规则。

可以按[工作流指南](examples/government-project-product-workflow/工作流指南.md)试用两个 Skill，再对照[测试用例样表](examples/government-project-product-workflow/07_测试验收/功能测试点.csv)检查验收覆盖。

示例统一使用“某政务项目”、保留示例域名、掩码个人数据和合成业务记录，只用于展示工作流与 Agent 特性，不代表任何真实政务系统的需求或数据。

## 目录结构

```text
1gnite-pm-skills/
├── skills/
│   ├── meeting-minutes/
│   ├── test-case-design/
│   ├── visual-design-imagegen/
│   └── government-project-visual-design/
└── examples/
    └── government-project-product-workflow/
        ├── AGENTS.md
        ├── 工作流指南.md
        ├── 00_项目口径库/
        ├── 01_原始资料/会议纪要/
        ├── 02_结构化台账/
        ├── 03_PRD/
        ├── 04_HTML原型/
        └── 07_测试验收/
```

使用示例工作流时，应先用实际项目事实替换 `00_项目口径库` 中的示例内容，不要直接复用其中的字段、角色、状态或流程作为新项目需求。
