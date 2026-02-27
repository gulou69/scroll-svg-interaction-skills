```skill
---
name: scroll-svg-design
description: Create visually stunning scroll-driven web pages with hand-crafted inline SVG illustrations for all visual layers — backgrounds, foregrounds, icons, decorations, masks, and scene transitions. Use this skill when the user wants a beautiful, immersive scrolling website with original artwork, custom illustrations, decorative elements, or any scroll-based page where imagery should be designed from scratch rather than relying on external photos or stock assets.
license: Complete terms in LICENSE.txt
---

# SVG-Illustrated Scroll Experience Builder

Build scroll-driven web pages where **every visual element is original SVG artwork** — landscapes, frames, decorations, icons, masks. No stock photos, no placeholders. Pure illustrated web art that moves with the scroll.

**Output**: A multi-file project with separate HTML, CSS, JS, and SVG icon files.

### File Output Structure

```
project-name/
├── index.html              ← Structure + inline scene SVGs
├── css/
│   └── styles.css          ← All CSS (reset, scenes, layers, responsive)
├── js/
│   └── animations.js       ← All JS (GSAP master timeline, particles)
└── svg/
    ├── defs.svg            ← Shared filters, masks, gradients
    ├── icons/              ← Reusable small SVG icons
    ├── dividers/           ← Decorative divider/ornament SVGs
    └── frames/             ← Foreground frame SVGs
```

**Scene background SVGs** (large, unique) stay **inline** in `index.html` for GSAP animation access.
**Reusable SVGs** (icons, dividers, frames) go in `svg/` as separate files.

---

## Core Philosophy: Illustrated Depth

Combines **scroll-driven layered parallax** with **original SVG illustration**. Every visual element is inline SVG, giving the page the feel of an illustrated book.

### Why SVG?

- **Infinite resolution** — crisp at any zoom/density
- **Animatable** — every path, shape, gradient animatable via GSAP
- **Lightweight** — complex illustrations in kilobytes
- **Styleable** — colors controlled via CSS variables for instant theme changes
- **Maskable** — SVG masks create organic transitions impossible with CSS alone

### The Illustrated Layer Stack

```
┌─────────────────────────────────────────┐
│  Layer 5: Floating Decorations          │  ← SVG ornaments, sparkles, leaves
│  Layer 4: Text & UI                     │  ← Headlines, CTAs + SVG accents
│  Layer 3: Foreground Frame              │  ← SVG window/arch/border
│  Layer 2: Midground Illustration        │  ← SVG main scene artwork
│  Layer 1: Background Scenery            │  ← SVG landscape/sky/atmosphere
│  Layer 0: Deep Background               │  ← CSS gradient base
└─────────────────────────────────────────┘
```

---

## SVG Design System

### Design Thinking

1. **Theme**: What universe? (mountain wilderness, underwater, cosmic, art deco, zen garden)
2. **Palette**: 5-7 CSS custom properties — all SVGs reference these
3. **Style**: Geometric? Organic? Minimal? Dense? Flat? Gradient-rich?
4. **Mood**: Serene? Bold? Mysterious? Warm?

**CRITICAL**: All SVG elements must share consistent stroke width, corner style, color temperature, and detail level.

### Color System with CSS Variables

```css
:root {
  --color-sky:        #0f1729;
  --color-horizon:    #1a2744;
  --color-land:       #2d4a3e;
  --color-accent:     #c4956a;
  --color-highlight:  #f0dcc0;
  --color-text:       #f0ece2;
  --color-shadow:     #080c14;
  --glass-light: rgba(240, 236, 226, 0.06);
  --glass-mid:   rgba(240, 236, 226, 0.12);
}
```

All SVG fills/strokes reference these: `fill="var(--color-land)"`.

### SVG Backgrounds

Full-width SVGs with `viewBox` and `preserveAspectRatio`:

```html
<svg class="svg-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--color-sky)" />
      <stop offset="100%" stop-color="var(--color-horizon)" />
    </linearGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#skyGrad)" />
  <!-- Stars -->
  <circle cx="200" cy="120" r="1.5" fill="var(--color-highlight)" opacity="0.6" />
  <!-- Distant mountains (lightest) -->
  <path d="M0,650 L200,480 L400,580 L600,420 L800,520 L1000,400 L1200,500 L1440,450 V900 H0 Z"
        fill="var(--color-horizon)" opacity="0.5" />
  <!-- Mid mountains -->
  <path d="M0,700 L300,520 L500,600 L720,480 L950,560 L1150,470 L1440,550 V900 H0 Z"
        fill="var(--color-land)" opacity="0.7" />
  <!-- Near hills -->
  <path d="M0,750 Q200,680 400,720 Q600,660 800,710 Q1000,650 1200,700 Q1350,670 1440,690 V900 H0 Z"
        fill="var(--color-land)" />
</svg>
```

**Background patterns**: Landscape (rolling `<path>` curves), Cityscape (`<rect>` buildings), Ocean (wavy layers), Abstract (overlapping circles), Starfield (scattered `<circle>`).

### SVG Foreground Frames

Create "window into the world" effect — zoom past viewer on scroll.

```html
<svg class="svg-frame" viewBox="0 0 1000 1200" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="archMask">
      <rect width="1000" height="1200" fill="white" />
      <path d="M300,1200 V450 Q300,200 500,200 Q700,200 700,450 V1200 Z" fill="black" />
    </mask>
  </defs>
  <rect width="1000" height="1200" fill="var(--color-shadow)" mask="url(#archMask)" opacity="0.95" />
  <path d="M300,1200 V450 Q300,200 500,200 Q700,200 700,450 V1200"
        fill="none" stroke="var(--color-accent)" stroke-width="2" opacity="0.4" />
</svg>
```

**Frame variations**: Gothic Arch, Circle Window, Rectangular Window, Organic Blob, Double Frame.

### SVG Icons

Small SVGs as section markers and decorative accents. Keep viewBox small (`0 0 64 64`), consistent stroke width, use `currentColor` in separate files.

```html
<!-- svg/icons/compass.svg -->
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="1" opacity="0.4" />
  <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="0.5" opacity="0.2" />
  <line x1="32" y1="2" x2="32" y2="8" stroke="currentColor" stroke-width="1.5" />
  <polygon points="32,12 35,32 32,36 29,32" fill="currentColor" opacity="0.8" />
  <circle cx="32" cy="32" r="2" fill="currentColor" />
</svg>
```

### SVG Dividers & Ornaments

```html
<svg class="divider" viewBox="0 0 600 40" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="20" x2="260" y2="20" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.4" />
  <polygon points="300,8 312,20 300,32 288,20" fill="none" stroke="var(--color-accent)" stroke-width="1" />
  <polygon points="300,13 307,20 300,27 293,20" fill="var(--color-accent)" opacity="0.3" />
  <line x1="340" y1="20" x2="550" y2="20" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.4" />
</svg>
```

---

## SVG Animation Techniques

### Path Drawing (Stroke Animation)

```javascript
const path = document.querySelector('.ornament-path');
const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
gsap.to(path, {
  strokeDashoffset: 0, ease: "none",
  scrollTrigger: { trigger: ".ornament-section", start: "top 70%", end: "top 20%", scrub: true }
});
```

### Shape Morphing

Paths must have the same number of anchor points:

```javascript
gsap.to("#shape-morph", {
  attr: { d: "M500,100 L900,500 L500,900 L100,500 Z" },
  ease: "power2.inOut",
  scrollTrigger: { trigger: ".morph-section", start: "top center", end: "bottom center", scrub: 1 }
});
```

### Gradient Color Shifts

```javascript
gsap.to("#skyGrad stop:first-child", {
  attr: { "stop-color": "#2a1a3e" },
  scrollTrigger: { trigger: "#scene-2", start: "top bottom", end: "top top", scrub: true }
});
```

### SVG Filter Animations

```html
<svg style="position:absolute;width:0;height:0;">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="soft-blur"><feGaussianBlur stdDeviation="0" /></filter>
  </defs>
</svg>
```

```javascript
gsap.to("#soft-blur feGaussianBlur", {
  attr: { stdDeviation: 6 },
  scrollTrigger: { trigger: ".blur-zone", scrub: true }
});
```

---

## Layered Scroll System with SVG

### Core: GSAP + ScrollTrigger

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**`scrub`** values per layer for depth: `1.5` (BG slowest) → `1.0` (MID) → `0.5` (FG) → `0.3` (Text snappiest).

**`pin`** locks scene in place while scroll animations play within.

### Layer Speed Implementation

```javascript
master
  .to(".svg-bg-mountains", { y: "-8%", scale: 1.1, ease: "none", duration: 0.30 }, 0)
  .to(".svg-mid-elements", { y: "-18%", scale: 1.5, ease: "none", duration: 0.30 }, 0)
  .to(".svg-frame", { scale: isMobile ? 3 : 5, opacity: 0, ease: "power1.in", duration: 0.22 }, 0)
  .to(".scene-text", { y: "-35vh", opacity: 0, ease: "none", duration: 0.18 }, 0)
  .to(".svg-decorations", { y: "-25%", rotation: 15, opacity: 0, ease: "none", duration: 0.28 }, 0);
```

---

## Scene Transition Catalog

**Mix different types** — never repeat the same technique.

### 1. Blur Dissolve

```javascript
masterTL
  .to("#scene-1", { filter: "blur(15px)", opacity: 0.2, duration: 0.12 }, 0.27)
  .to("#scene-2", { opacity: 1, visibility: "visible", filter: "blur(0px)", duration: 0.14 }, 0.28);
```

### 2. SVG Mask Circle Reveal

```html
<svg style="position:absolute;width:0;height:0;">
  <defs>
    <clipPath id="scene-reveal" clipPathUnits="objectBoundingBox">
      <circle cx="0.5" cy="0.5" r="0" class="reveal-circle" />
    </clipPath>
  </defs>
</svg>
```

```javascript
masterTL
  .set("#scene-next", { clipPath: "url(#scene-reveal)", visibility: "visible", zIndex: 4 }, 0.61)
  .to(".reveal-circle", { attr: { r: 1.2 }, duration: 0.14, ease: "power2.inOut" }, 0.61)
  .set("#scene-next", { clipPath: "none", zIndex: 3 }, 0.75);

// CSS clip-path fallback
if (!document.querySelector('#scene-reveal circle')) {
  masterTL.to("#scene-next", { clipPath: "circle(150% at 50% 50%)", duration: 0.14 }, 0.61);
}
```

### 3. Circular Iris Wipe

```javascript
masterTL
  .set("#scene-3", { visibility: "visible", zIndex: 4 }, 0.61)
  .to("#scene-3", { clipPath: "circle(75% at 50% 50%)", duration: 0.10, ease: "power1.in" }, 0.61)
  .to("#scene-3", { clipPath: "circle(160% at 50% 50%)", duration: 0.06, ease: "power2.out" }, 0.71)
  .set("#scene-2", { visibility: "hidden" }, 0.77)
  .set("#scene-3", { clipPath: "none", zIndex: 3 }, 0.77);
```

### 4. Diagonal Polygon Wipe

```javascript
masterTL.to("#scene-next", {
  clipPath: "polygon(-50% 0, 100% 0, 150% 100%, 0% 100%)",
  visibility: "visible", duration: 0.14, ease: "power2.inOut"
}, 0.62);
```

### 5-8. Diamond / Inset / Horizontal Slide / Curtain

Same as scroll-interaction catalog (see transition techniques 4-8 there).

### 9. SVG Path Morphing Mask

```javascript
masterTL.to("#mask-shape", {
  attr: { d: "M0,0 L1,0 L1,1 L0,1 Z" },
  duration: 0.14, ease: "power2.inOut"
}, 0.62);
```

### 10-13. Shutter / Spin Wipe / Flash / Scale Bounce

Same as scroll-interaction catalog (see transitions 9-13 there).

### Transition Best Practices

- **Mix techniques** per scene boundary
- **Match mood**: Nature → SVG mask morphs; tech → shutter blinds; dreamy → blur dissolve
- **Always provide CSS clip-path fallback** for SVG mask transitions
- **Combine techniques**: blur ON TOP of clip-path wipe for richness

---

## CRITICAL: Three-Phase Transition Pattern

Every transition must follow three phases:

| Phase | Purpose | Duration |
|-------|---------|----------|
| **A Wind-down** | Outgoing scene softens | `0.04–0.06` |
| **B Cross-over** | Both scenes visible | `0.10–0.16` |
| **C Settle-in** | Incoming breathes | `0.04–0.08` |

### Rules

- Phase B ≥ `0.10`, overlap ≥ `0.05`
- ❌ Never `duration < 0.10` for Phase B
- ❌ Never skip Phase A
- ❌ Never show content immediately after wipe
- ❌ Never `ease: "none"` for Phase B

### Example (Blur Dissolve)

```javascript
masterTL
  .to("#s1-bg", { filter: "blur(4px)", opacity: 0.7, scale: 1.18, ease: "power1.in", duration: 0.06 }, 0.22)
  .to("#s1-bg", { filter: "blur(20px)", opacity: 0, ease: "power2.in", duration: 0.12 }, 0.27)
  .to("#scene-2", { opacity: 1, visibility: "visible", ease: "power2.out", duration: 0.14 }, 0.28)
  .set("#scene-1", { visibility: "hidden", zIndex: 1 }, 0.42)
  .set("#scene-2", { zIndex: 3 }, 0.42);
```

---

## Floating Decoration System

### Particle Generator

```javascript
function createSVGParticles(containerId, type, count) {
  const container = document.getElementById(containerId);
  const isMobile = window.innerWidth < 768;
  const actualCount = isMobile ? Math.floor(count * 0.5) : count;

  for (let i = 0; i < actualCount; i++) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.style.cssText = `position:absolute;width:${8+Math.random()*20}px;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${0.05+Math.random()*0.2};pointer-events:none;`;
    svg.style.height = svg.style.width;

    let shape;
    switch (type) {
      case 'star':
        shape = document.createElementNS(svgNS, "polygon");
        shape.setAttribute("points", "12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9");
        shape.setAttribute("fill", "var(--color-highlight)");
        break;
      case 'leaf':
        shape = document.createElementNS(svgNS, "path");
        shape.setAttribute("d", "M12,2 Q20,8 12,22 Q4,8 12,2 Z");
        shape.setAttribute("fill", "var(--color-land)");
        break;
      case 'diamond':
        shape = document.createElementNS(svgNS, "polygon");
        shape.setAttribute("points", "12,2 22,12 12,22 2,12");
        shape.setAttribute("fill", "none");
        shape.setAttribute("stroke", "var(--color-accent)");
        shape.setAttribute("stroke-width", "1");
        break;
      case 'dot':
        shape = document.createElementNS(svgNS, "circle");
        shape.setAttribute("cx", "12"); shape.setAttribute("cy", "12");
        shape.setAttribute("r", "4"); shape.setAttribute("fill", "var(--color-highlight)");
        break;
    }
    svg.appendChild(shape);
    container.appendChild(svg);

    gsap.to(svg, {
      y: `random(-50,50)`, x: `random(-30,30)`, rotation: `random(-20,20)`,
      duration: 3+Math.random()*5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: Math.random()*4,
    });
    gsap.to(svg, {
      y: "-=180",
      scrollTrigger: { trigger: container.closest(".scene"), start: "top bottom", end: "bottom top", scrub: 2 }
    });
  }
}

createSVGParticles('s1-decorations', 'star', 25);
createSVGParticles('s2-decorations', 'leaf', 20);
createSVGParticles('s3-decorations', 'diamond', 15);
```

---

## Scene Theme Recipes

### "Enchanted Mountain Pass"
Palette: sky:#0f1729, land:#2d4a3e, accent:#c4956a | BG: layered mountain ranges + moon + stars | FRAME: Gothic arch | DECOR: star + leaf particles

### "Art Deco Metropolis"
Palette: sky:#1a1a1a, land:#c8a96e, accent:#e8d5a3 | BG: geometric skyline + sunburst | FRAME: rectangular + fan ornament | DECOR: diamond sparkles

### "Deep Ocean"
Palette: sky:#020b1a, land:#1a4a6a, accent:#4aeadc | BG: light rays + gradient to deep | FRAME: organic blob opening | DECOR: bubbles + bioluminescent dots

### "Cosmic Observatory"
Palette: sky:#05050f, land:#1a1a4a, accent:#8a6ff0 | BG: nebula blobs + starfield | FRAME: circular porthole | DECOR: 4-point stars + orbiting dots

### "Zen Garden"
Palette: sky:#f5f0e8, land:#c8b89a, accent:#6a7a5a | BG: raked sand lines + stones | FRAME: torii gate | DECOR: cherry blossom petals

---

## Stacked-Scene + Master-Timeline Architecture

All scenes `position: absolute` inside ONE `#scroll-stage` container, pinned ONCE. Single master timeline drives everything.

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Illustrated Scroll</title>
  <link href="https://fonts.googleapis.com/css2?family=DISPLAY_FONT&family=BODY_FONT&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>
<body>
  <svg style="position:absolute;width:0;height:0;"><defs>...</defs></svg>
  <div class="grain-overlay"></div>
  <div class="vignette"></div>
  <div class="scroll-progress"></div>

  <div id="scroll-stage">
    <section id="scene-1" class="scene active">
      <div class="scene-layer layer-bg">
        <svg class="svg-bg" viewBox="0 0 1440 900"><!-- INLINE background --></svg>
      </div>
      <div class="scene-layer layer-mid">
        <svg class="svg-mid" viewBox="0 0 1440 900"><!-- INLINE midground --></svg>
      </div>
      <div class="scene-layer layer-frame">
        <img src="svg/frames/gothic-arch.svg" alt="" class="svg-frame">
      </div>
      <div class="scene-layer layer-text">
        <h1>HEADLINE</h1>
        <img src="svg/dividers/diamond-divider.svg" alt="" class="divider">
        <p>Subtitle</p>
      </div>
      <div class="scene-layer layer-overlay" id="s1-decorations"></div>
    </section>
    <section id="scene-2" class="scene"><!-- Same structure --></section>
    <section id="scene-3" class="scene"><!-- Same structure --></section>
  </div>

  <script src="js/animations.js"></script>
</body>
</html>
```

### css/styles.css

```css
:root {
  --color-sky: #0f1729;
  --color-horizon: #1a2744;
  --color-land: #2d4a3e;
  --color-accent: #c4956a;
  --color-highlight: #f0dcc0;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: var(--color-land); /* CRITICAL: match final scene */
  color: var(--color-highlight);
  overflow-x: hidden;
}

#scroll-stage { position: relative; width: 100vw; height: 100vh; overflow: hidden; }
.scene { position: absolute; inset: 0; overflow: hidden; }
.scene:not(.active) { opacity: 0; visibility: hidden; z-index: 0; }
.scene.active { opacity: 1; visibility: visible; z-index: 1; }

.scene-layer { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; will-change: transform; }
.layer-bg   { z-index: 1; }
.layer-mid  { z-index: 2; }
.layer-frame { z-index: 3; }
.layer-text { z-index: 4; }
.layer-overlay { z-index: 5; pointer-events: none; }

.svg-bg, .svg-mid { width: 110%; height: 110%; object-fit: cover; }
.svg-frame { width: 100%; height: 100%; object-fit: contain; }
```

### js/animations.js

```javascript
gsap.registerPlugin(ScrollTrigger);
const isMobile = window.innerWidth < 768;

function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener('resize', setVH);
if (isMobile) {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const master = gsap.timeline({
  scrollTrigger: {
    trigger: '#scroll-stage', start: 'top top', end: '+=1300%',
    pin: true, scrub: 1.2, anticipatePin: 1,
  }
});

// Scene 1 parallax (0% → 30%)
master
  .to('#scene-1 .svg-bg', { y: '-8%', scale: 1.1, ease: 'none', duration: 0.30 }, 0)
  .to('#scene-1 .svg-mid', { y: '-18%', scale: 1.5, ease: 'none', duration: 0.30 }, 0)
  .to('#scene-1 .svg-frame', { scale: isMobile ? 3 : 5, opacity: 0, ease: 'power1.in', duration: 0.22 }, 0)
  .to('#scene-1 .layer-text', { y: '-35vh', opacity: 0, ease: 'none', duration: 0.18 }, 0);

// Transition 1→2 (3-phase cross-fade)
master
  .to('#scene-1 .layer-bg', { filter: 'blur(4px)', opacity: 0.7, duration: 0.06 }, 0.22)
  .to('#scene-1 .layer-bg', { filter: 'blur(20px)', opacity: 0, duration: 0.12 }, 0.27)
  .to('#scene-2', { opacity: 1, visibility: 'visible', duration: 0.14 }, 0.28)
  .set('#scene-1', { visibility: 'hidden', zIndex: 0 }, 0.42)
  .set('#scene-2', { zIndex: 1 }, 0.42);

// Transition 2→3 (3-phase diagonal wipe)
master
  .to('#scene-2 .layer-bg', { filter: 'blur(3px)', opacity: 0.8, duration: 0.05 }, 0.58)
  .set('#scene-3', { visibility: 'visible', zIndex: 2, clipPath: 'polygon(100% 0,100% 0,100% 0,100% 0)' }, 0.61)
  .to('#scene-3', { clipPath: 'polygon(50% 0,100% 0,150% 50%,100% 50%)', duration: 0.08 }, 0.61)
  .to('#scene-3', { clipPath: 'polygon(-50% 0,100% 0,150% 100%,0% 100%)', duration: 0.08 }, 0.69)
  .to('#scene-2 .layer-bg', { filter: 'blur(12px)', opacity: 0.3, duration: 0.12 }, 0.63)
  .set('#scene-3', { clipPath: 'none' }, 0.77)
  .set('#scene-2', { visibility: 'hidden', zIndex: 0 }, 0.77);

// Particle generator
function createSVGParticles(containerId, type, count) { /* ... */ }
createSVGParticles('s1-decorations', 'star', 25);

ScrollTrigger.refresh();
```

---

## Performance & Compatibility

### SVG Performance

- Limit `<path>` elements under ~200 anchor points
- Use `<g>` groups for batch transforms
- `will-change: transform` on scene layers, NOT individual SVGs
- Simplify on mobile: remove 30-50% decorative SVGs

### Browser Compatibility

- SVG `clip-path` via `url()`: Chrome, Firefox, Safari 16+. Always provide CSS `clip-path` fallback
- SVG masks: inconsistent on older Safari — prefer `clipPath`
- CSS custom properties in SVG: works in all modern browsers

### Mobile Handling

```javascript
const MOBILE_SCALE = isMobile ? 0.6 : 1.0;
if (isMobile) {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}
```

---

## Output Requirements

### Architecture Rules

- All scenes in ONE `#scroll-stage`, `position: absolute`, ONE pin
- Single `gsap.timeline()` drives ALL animations
- **NEVER** individual `pin: true` on separate sections
- `body { background }` = final scene color
- Scene backgrounds inline in HTML; icons/dividers/frames as separate files

### SVG File Creation Checklist

| Element Type | Location | Rule |
|---|---|---|
| Scene backgrounds | **Inline in HTML** | GSAP needs DOM access |
| Icons (compass, leaf, star) | **`svg/icons/`** separate files | NEVER inline |
| Dividers/ornaments | **`svg/dividers/`** separate files | NEVER inline |
| Static frames | **`svg/frames/`** separate files | If GSAP-animated: inline |
| Shared defs (filters, gradients) | **`svg/defs.svg`** | Inline into HTML `<head>` |

Separate files use `currentColor` for theming. Reference via `<img src="svg/icons/compass.svg">`.

### Minimum SVG File Count

| Scenes | Icon Files | Divider Files | Total |
|--------|-----------|--------------|-------|
| 3 | 2 | 1 | 3 |
| 4-5 | 3 | 2 | 5 |
| 6-8 | 4 | 2 | 6 |

### Quality Checklist

- [ ] Every background is designed SVG (no solid colors)
- [ ] Foreground frames are crafted SVG shapes
- [ ] All SVG colors use CSS custom properties
- [ ] At least one SVG path-drawing animation
- [ ] Every transition follows 3-phase pattern (Phase B ≥ 0.10)
- [ ] Layer differential speed clearly visible
- [ ] Mobile has reduced SVG complexity
- [ ] Distinctive typography (NOT Inter/Roboto/Arial)
- [ ] `svg/icons/` ≥ 2 files, `svg/dividers/` ≥ 1 file

---

## Template Reference

**BEFORE CODING**: Read `templates/index.html`, `templates/css/styles.css`, `templates/js/animations.js`, and check `templates/svg/icons/` and `templates/svg/dividers/`. The template demonstrates TWO transition types (blur dissolve + diagonal polygon wipe) with 3-phase pattern. Use as foundation — redesign all SVGs for your theme.

### Resources

- **GSAP 3 Docs**: https://gsap.com/docs/v3/
- **ScrollTrigger Docs**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Google Fonts**: https://fonts.google.com/

```
