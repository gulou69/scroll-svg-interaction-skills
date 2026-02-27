# Scroll SVG Interaction Skills / 滚动 SVG 交互技能集

<p align="center">
  <strong>English</strong> | <a href="#中文说明">中文说明</a>
</p>

---

## Overview

This repository contains two complementary **Claude Agent Skills** for building immersive, scroll-driven web experiences:

| Skill | Description |
|-------|-------------|
| **scroll-svg-design** | Create scroll-driven pages where **every visual element is original SVG artwork** — landscapes, frames, decorations, icons, masks. Pure illustrated web art that moves with the scroll. |
| **scroll-interaction** | Build advanced scroll interactions with parallax depth, GSAP + ScrollTrigger animations, layered Z-axis effects, and seamless scene transitions. |

Both skills work with [Claude](https://claude.ai) as Agent Skills — structured instruction sets that teach Claude how to generate high-quality scroll-driven websites in a repeatable way.

> **Origin**: These skills are derived from [Anthropic's official skills repository](https://github.com/anthropics/skills). Full attribution is preserved below.

## Features

- **Layered Parallax System** — Background, midground, foreground, text, and decoration layers moving at differential speeds
- **Original SVG Illustrations** — Hand-crafted inline SVG for backgrounds, frames, icons, dividers (no stock photos)
- **GSAP + ScrollTrigger** — Scroll-locked animations with `scrub`, `pin`, and master timeline architecture
- **Scene Transition Catalog** — Blur dissolve, circular iris wipe, diagonal polygon wipe, SVG mask morphing, and more
- **Three-Phase Transition Pattern** — Wind-down → Cross-over → Settle-in for cinematic scene changes
- **SVG Animation Techniques** — Path drawing (stroke animation), shape morphing, gradient color shifts, filter animations
- **Floating Decoration System** — Dynamic SVG particle generator (stars, leaves, diamonds, dots)
- **Mobile-First Responsive** — Reduced SVG complexity, touch-optimized scroll, `ScrollTrigger.normalizeScroll()`
- **CSS Variable Color System** — All SVG fills/strokes reference CSS custom properties for instant theme changes
- **Multiple Scene Theme Recipes** — Enchanted Mountain, Art Deco Metropolis, Deep Ocean, Cosmic Observatory, Zen Garden

## Project Structure

```
├── skills/
│   ├── scroll-svg-design/          # SVG-Illustrated Scroll Experience
│   │   ├── SKILL.md                # Skill instructions for Claude
│   │   ├── LICENSE.txt             # Apache License 2.0
│   │   └── templates/             # Working demo template
│   │       ├── index.html          # 3-scene scroll experience (Mountain → Forest → Summit)
│   │       ├── css/styles.css      # Full CSS with color system & responsive
│   │       ├── js/animations.js    # Master timeline + transitions + particles
│   │       └── svg/                # Reusable SVG assets
│   │           ├── icons/          # compass.svg, mountain.svg
│   │           └── dividers/       # diamond-divider.svg, circle-divider.svg
│   │
│   └── scroll-interaction/         # Advanced Scroll Interaction Builder
│       ├── SKILL.md                # Skill instructions for Claude
│       ├── LICENSE.txt             # Apache License 2.0
│       └── templates/             # Working demo template
│           ├── index.html
│           ├── css/styles.css
│           └── js/animations.js
├── LICENSE                         # Apache License 2.0
├── NOTICE                          # Attribution & third-party notices
└── README.md                       # This file
```

## Quick Start

### Use as Claude Agent Skill

1. Clone this repository
2. In [Claude](https://claude.ai) or [Claude Code](https://docs.anthropic.com/en/docs/claude-code), add the skill folder as a project resource
3. Ask Claude to create a scroll-driven website — it will follow the skill instructions automatically

### Run the Template Demo

```bash
# Navigate to the template directory
cd skills/scroll-svg-design/templates

# Open index.html in a browser (or use a local server)
# Option 1: Direct open
open index.html

# Option 2: Local server (recommended for SVG file loading)
npx serve .
# or
python -m http.server 8000
```

## Demo Preview

The `scroll-svg-design` template demonstrates a 3-scene "Mountain Pass" experience:

| Scene | Theme | Transition |
|-------|-------|------------|
| Scene 1 | Mountain Pass — starry sky, layered mountains, gothic arch frame | → Blur Dissolve |
| Scene 2 | Forest Clearing — layered trees, light rays, fireflies | → Diagonal Polygon Wipe |
| Scene 3 | Summit Dawn — sunrise, distant ridges, birds |  |

## Technology Stack

| Technology | Version | License | Usage |
|-----------|---------|---------|-------|
| [GSAP](https://gsap.com/) | 3.12.5 | [GreenSock Standard License](https://gsap.com/community/standard-license/) | Core animation engine |
| [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | 3.12.5 | [GreenSock Standard License](https://gsap.com/community/standard-license/) | Scroll-driven animation plugin |
| [Google Fonts](https://fonts.google.com/) | — | SIL Open Font License | Typography (Cormorant Garamond, JetBrains Mono) |

> **⚠️ GSAP License Notice**: GSAP is **not open source**. It uses the [GreenSock Standard License](https://gsap.com/community/standard-license/) which permits free use in most projects, but **prohibits** using GSAP as part of a tool or service that charges others for access. If you plan to use GSAP in a commercial SaaS/tool product, you must purchase a [GreenSock Business License](https://gsap.com/pricing/). See the [NOTICE](NOTICE) file for full details.

## License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

### Attribution

This project is derived from skills originally created by **Anthropic, PBC** as part of the [anthropics/skills](https://github.com/anthropics/skills) repository. Per the Apache 2.0 license requirements:

- The original copyright notice and license are preserved
- Modifications (if any) are noted in the NOTICE file
- The original SKILL.md instructions and template code are attributed to Anthropic

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure any contributions comply with the Apache 2.0 license and GSAP's licensing terms.

---

<h2 id="中文说明">中文说明</h2>

## 概述

本仓库包含两个互补的 **Claude Agent Skill（智能体技能）**，用于构建沉浸式、滚动驱动的网页体验：

| 技能 | 描述 |
|------|------|
| **scroll-svg-design** | 创建以**原创 SVG 插画**为所有视觉元素的滚动驱动网页 — 风景、画框、装饰、图标、遮罩。纯手绘风格网页艺术，随滚动而动。 |
| **scroll-interaction** | 构建高级滚动交互，包含视差深度、GSAP + ScrollTrigger 动画、分层 Z 轴效果和无缝场景过渡。 |

两个技能均配合 [Claude](https://claude.ai) 作为 Agent Skill 使用 — 结构化指令集，教会 Claude 如何可重复地生成高质量的滚动驱动网站。

> **来源**：这些技能源自 [Anthropic 官方 skills 仓库](https://github.com/anthropics/skills)。原始归属声明完整保留。

## 核心特性

- **分层视差系统** — 背景、中景、前景、文字和装饰层以不同速度运动
- **原创 SVG 插画** — 手工制作的内联 SVG 用于背景、画框、图标、分隔线（无外部图片）
- **GSAP + ScrollTrigger** — 基于滚动的动画，支持 `scrub`、`pin` 和主时间轴架构
- **场景过渡目录** — 模糊溶解、圆形虹膜擦除、对角多边形擦除、SVG 蒙版变形等
- **三阶段过渡模式** — 缓退 → 交叉 → 稳定，实现电影级场景切换
- **SVG 动画技术** — 路径绘制（描边动画）、形状变形、渐变色彩偏移、滤镜动画
- **浮动装饰系统** — 动态 SVG 粒子生成器（星星、树叶、菱形、圆点）
- **移动端优先响应式** — 降低 SVG 复杂度、触控优化滚动、`ScrollTrigger.normalizeScroll()`
- **CSS 变量颜色系统** — 所有 SVG 填充/描边引用 CSS 自定义属性，一键换肤
- **多种场景主题方案** — 魔幻山景、装饰艺术都市、深海、宇宙天文台、禅意庭院

## 快速开始

### 作为 Claude Agent Skill 使用

1. 克隆本仓库
2. 在 [Claude](https://claude.ai) 或 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 中，将 skill 文件夹添加为项目资源
3. 让 Claude 创建一个滚动驱动的网站 — 它会自动遵循技能指令

### 运行模板演示

```bash
# 进入模板目录
cd skills/scroll-svg-design/templates

# 在浏览器中打开 index.html（推荐使用本地服务器）
# 方式一：直接打开
open index.html

# 方式二：启动本地服务器（推荐，便于加载 SVG 文件）
npx serve .
# 或
python -m http.server 8000
```

## 演示预览

`scroll-svg-design` 模板展示了一个 3 场景的「山岳之旅」体验：

| 场景 | 主题 | 过渡效果 |
|------|------|---------|
| 场景 1 | 山口 — 星空、层叠群山、哥特式拱门画框 | → 模糊溶解 |
| 场景 2 | 林间空地 — 层叠树木、光线、萤火虫 | → 对角多边形擦除 |
| 场景 3 | 山巅黎明 — 日出、远山剪影、飞鸟 |  |

## 技术栈

| 技术 | 版本 | 许可证 | 用途 |
|------|------|--------|------|
| [GSAP](https://gsap.com/) | 3.12.5 | [GreenSock 标准许可证](https://gsap.com/community/standard-license/) | 核心动画引擎 |
| [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | 3.12.5 | [GreenSock 标准许可证](https://gsap.com/community/standard-license/) | 滚动驱动动画插件 |
| [Google Fonts](https://fonts.google.com/) | — | SIL 开放字体许可证 | 排版字体 (Cormorant Garamond, JetBrains Mono) |

> **⚠️ GSAP 许可证声明**：GSAP **不是**开源软件。它使用 [GreenSock 标准许可证](https://gsap.com/community/standard-license/)，允许在大多数项目中免费使用，但**禁止**将 GSAP 作为工具或服务的一部分向他人收费。如果你计划在商业 SaaS/工具产品中使用 GSAP，必须购买 [GreenSock 商业许可证](https://gsap.com/pricing/)。详见 [NOTICE](NOTICE) 文件。

## 许可证

本项目基于 **Apache License 2.0** 开源 — 详见 [LICENSE](LICENSE) 文件。

### 归属声明

本项目衍生自 **Anthropic, PBC** 在 [anthropics/skills](https://github.com/anthropics/skills) 仓库中创建的技能。根据 Apache 2.0 许可证要求：

- 保留了原始版权声明和许可证
- 修改内容（如有）已在 NOTICE 文件中注明
- 原始 SKILL.md 指令和模板代码的版权归属于 Anthropic

## 参与贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

请确保所有贡献符合 Apache 2.0 许可证和 GSAP 许可条款。

---

<p align="center">
  <sub>Derived from <a href="https://github.com/anthropics/skills">anthropics/skills</a> · Licensed under Apache 2.0</sub>
</p>
