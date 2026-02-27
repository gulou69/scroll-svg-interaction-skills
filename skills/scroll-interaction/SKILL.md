```skill
---
name: scroll-interaction
description: Create advanced web scroll-driven interactions with parallax depth, GSAP + ScrollTrigger animations, layered Z-axis effects, and seamless scene transitions. Use this skill when the user asks to build immersive scrolling websites, parallax landing pages, scroll-driven storytelling, or any web page with advanced scroll-based animation effects.
license: Complete terms in LICENSE.txt
---

# Advanced Web Scroll Interaction Builder

Create immersive, scroll-driven web experiences with cinematic depth and layered parallax effects using GSAP + ScrollTrigger.

**Output**: A multi-file project with separate `.html`, `.css`, and `.js` files (GSAP/ScrollTrigger loaded from CDN).

### File Output Structure

```
project-name/
├── index.html          ← Structure only: scene containers, layer elements
├── css/
│   └── styles.css      ← All styling: reset, scenes, layers, typography, responsive
└── js/
    └── animations.js   ← All GSAP: master timeline, transitions, particles, mobile handling
```

---

## Core Philosophy: Depth Through Layers

The secret to compelling scroll interactions is **layered depth**. Elements at different Z-depths move, scale, and transform at different speeds — creating a "visual pull-in" effect.

- **Background layer**: Moves slowest, scales subtly — sets the atmosphere
- **Midground layer**: Moderate speed — carries the main visual content
- **Foreground layer**: Moves fastest, scales aggressively — creates depth and framing
- **Text/UI layer**: Independent timing — fades, slides, or morphs for narrative pacing

This differential motion is the foundation of ALL scroll interactions.

---

## Design Thinking

Before coding, establish creative direction:

1. **Scene Concept**: What is the visual world?
2. **Layer Plan**: Identify 3-5 distinct depth layers
3. **Scroll Narrative**: Map out 3-8 "scenes" or key moments
4. **Transition Style**: How do scenes connect? (blur dissolve, mask wipe, zoom-through, parallax crossfade)
5. **Mood & Palette**: Bold aesthetic — no generic "AI slop" (centered purple gradients, uniform rounded cards, Inter/Roboto fonts)

### Visual Hierarchy Rules

- **Z-axis scaling**: Foreground elements scale 2-4x faster than background
- **Opacity choreography**: Elements fade in/out at precise scroll positions, never all at once
- **Motion blur**: Use CSS `filter: blur()` transitions to simulate depth-of-field
- **Typography as architecture**: Large type can BE a layer, not just sit on one

---

## Core Technology: GSAP + ScrollTrigger

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### The Two Essential Properties

**1. `scrub` — Scroll-Linked Animation**

```javascript
gsap.to(".element", {
  y: -200, scale: 1.5,
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,    // true = instant 1:1 link
    // scrub: 0.5,  // number = smoothed delay (silkier)
  }
});
```

- `scrub: true` → Instant response (parallax backgrounds)
- `scrub: 0.3-0.8` → Smooth lag (text and UI)
- `scrub: 1-2` → Dreamy delay (atmospheric elements)

**Different `scrub` values on different layers create the depth illusion.**

**2. `pin` — Fixing Elements During Scroll**

```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-container",
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  }
})
.to(".bg-layer", { scale: 1.8, opacity: 0.3 }, 0)
.to(".fg-frame", { scale: 4, opacity: 0 }, 0)
.to(".title-text", { y: -300, opacity: 0 }, 0)
.fromTo(".next-scene", { opacity: 0 }, { opacity: 1 }, 0.6);
```

---

## Layered Differential Speed System

### Layer Speed Mapping

| Layer | Scale Speed | Y-Speed | Opacity |
|-------|------------|---------|---------|
| Background (z:-3) | 1.0→1.2x (slow) | -50px | Stays visible longest |
| Midground (z:-1) | 1.0→1.8x (medium) | -150px | Fades at boundary |
| Foreground (z:0) | 1.0→3.5x (fast) | minimal | Fades mid-scene |
| Text (z:1) | none | -200 to -400px | Quick fade in/out |
| Decorative (z:2) | varies | counter-scroll | Ambient, subtle |

### Implementation

```javascript
gsap.registerPlugin(ScrollTrigger);

const sceneTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-1",
    start: "top top",
    end: "+=400%",
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  }
});

sceneTimeline
  .to(".scene-1-bg", { scale: 1.2, y: "-5%", ease: "none" }, 0)
  .to(".scene-1-mid", { scale: 1.8, y: "-15%", ease: "none" }, 0)
  .to(".scene-1-frame", { scale: 3.5, opacity: 0, ease: "power1.in" }, 0)
  .to(".scene-1-text", { y: "-40vh", opacity: 0, ease: "none" }, 0);
```

### CSS Layer Stacking

```css
.scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.scene-layer {
  position: absolute;
  inset: 0;
  will-change: transform, opacity;
}
.layer-bg    { z-index: 1; }
.layer-mid   { z-index: 2; }
.layer-frame { z-index: 3; }
.layer-text  { z-index: 4; display: flex; align-items: center; justify-content: center; }
```

---

## Scene Transition Catalog

**Mix different transition types across scene boundaries** — never repeat the same technique.

### 1. Blur Dissolve

```javascript
masterTL
  .to("#scene-1", { filter: "blur(15px)", opacity: 0.2, duration: 0.12 }, 0.27)
  .to("#scene-2", { opacity: 1, visibility: "visible", filter: "blur(0px)", duration: 0.14 }, 0.28);
```

### 2. Circular Iris Wipe

```javascript
masterTL
  .set("#scene-3", { visibility: "visible", zIndex: 4, clipPath: "circle(0% at 50% 50%)" }, 0.61)
  .to("#scene-3", { clipPath: "circle(75% at 50% 50%)", duration: 0.10, ease: "power1.in" }, 0.61)
  .to("#scene-3", { clipPath: "circle(160% at 50% 50%)", duration: 0.06, ease: "power2.out" }, 0.71)
  .set("#scene-2", { visibility: "hidden" }, 0.77)
  .set("#scene-3", { clipPath: "none", zIndex: 3 }, 0.77);
```

### 3. Diagonal Polygon Wipe

```javascript
masterTL.to("#scene-next", {
  clipPath: "polygon(-50% 0, 100% 0, 150% 100%, 0% 100%)",
  duration: 0.14, ease: "power2.inOut"
}, 0.62);
```

### 4. Inset Rectangle Reveal

```javascript
masterTL.to("#scene-next", {
  clipPath: "inset(0% 0% 0% 0%)", // from inset(45%)
  duration: 0.12, ease: "power3.out"
}, 0.60);
```

### 5. Zoom-Through Portal
```javascript
masterTL
  .to("#s1-frame", { scale: 8, opacity: 0, ease: "power1.in", duration: 0.18 }, 0.10)
  .to("#scene-1", { opacity: 0, duration: 0.06 }, 0.28)
  .to("#scene-2", { opacity: 1, visibility: "visible", duration: 0.06 }, 0.29);
```

### 6. Horizontal Slide Push

```javascript
masterTL
  .to("#scene-1", { xPercent: -100, duration: 0.12, ease: "power2.inOut" }, 0.28)
  .fromTo("#scene-2", { xPercent: 100, visibility: "visible", opacity: 1 },
    { xPercent: 0, duration: 0.12, ease: "power2.inOut" }, 0.28);
```

### 7. Vertical Curtain Reveal

```javascript
masterTL
  .to(".curtain-left",  { xPercent: -100, duration: 0.12 }, 0.28)
  .to(".curtain-right", { xPercent: 100, duration: 0.12 }, 0.28)
  .to("#scene-2", { opacity: 1, visibility: "visible", duration: 0.06 }, 0.28);
```

### 8. Diamond Wipe

```javascript
masterTL.to("#scene-next", {
  clipPath: "polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%)",
  visibility: "visible", duration: 0.14, ease: "power2.inOut"
}, 0.62);
```

### 9. Shutter / Blinds

```javascript
const strips = Array.from({ length: 6 }, (_, i) => {
  const strip = document.createElement('div');
  strip.className = 'shutter-strip';
  strip.style.cssText = `position:absolute;left:0;right:0;top:${i*(100/6)}%;height:${100/6}%;background:var(--color-shadow);z-index:10;`;
  stage.appendChild(strip);
  return strip;
});
masterTL.to(strips, { scaleY: 0, transformOrigin: "top", stagger: 0.015, duration: 0.10 }, 0.30);
```

### 10. Radial Spin Wipe

```javascript
masterTL.fromTo("#scene-next", {
  maskImage: "conic-gradient(transparent 0deg, transparent 0deg, black 0deg)",
  WebkitMaskImage: "conic-gradient(transparent 0deg, transparent 0deg, black 0deg)",
  visibility: "visible",
}, {
  maskImage: "conic-gradient(transparent 0deg, black 0deg, black 360deg)",
  WebkitMaskImage: "conic-gradient(transparent 0deg, black 0deg, black 360deg)",
  duration: 0.12
}, 0.62);
```

### 11. Glitch / RGB Split

```javascript
masterTL
  .to("#scene-1", { x: "random(-20,20)", filter: "hue-rotate(90deg) saturate(3)", duration: 0.02, repeat: 3, yoyo: true }, 0.27)
  .set("#scene-1", { visibility: "hidden", filter: "none", x: 0 }, 0.35)
  .set("#scene-2", { visibility: "visible", opacity: 1 }, 0.35);
```

### 12. Scale Bounce Morph

```javascript
masterTL
  .to("#scene-1", { scale: 0.85, borderRadius: "20px", opacity: 0, duration: 0.10, ease: "back.in(2)" }, 0.27)
  .fromTo("#scene-2", { scale: 1.15, opacity: 0, visibility: "visible" },
    { scale: 1, opacity: 1, duration: 0.10, ease: "back.out(1.5)" }, 0.30);
```

### 13. Color Flash / Whiteout

```javascript
masterTL
  .to("#flash-overlay", { opacity: 1, duration: 0.04 }, 0.28)
  .set("#scene-1", { visibility: "hidden" }, 0.32)
  .set("#scene-2", { visibility: "visible", opacity: 1 }, 0.32)
  .to("#flash-overlay", { opacity: 0, duration: 0.06 }, 0.32);
```

### Transition Best Practices

- **Mix techniques**: Different transition per scene boundary
- **Overlap timing**: Incoming scene starts at 60-80% of outgoing animation
- **Never hard-cut**: Always ≥10% scroll distance as blend zone
- **Use `will-change`**: Apply `will-change: transform, opacity, filter` for GPU acceleration
- **Clean up**: Reset `clipPath: "none"` after wipe completes

---

## CRITICAL: Three-Phase Transition Pattern

Every scene transition must follow three phases:

| Phase | Purpose | Duration |
|-------|---------|----------|
| **A Wind-down** | Outgoing scene softens (blur, brightness shift) | `0.04–0.06` |
| **B Cross-over** | Both scenes visible simultaneously | `0.10–0.16` |
| **C Settle-in** | Incoming scene breathes before content appears | `0.04–0.08` |

### Mandatory Rules

- Phase B duration ≥ `0.10`, overlap ≥ `0.05`
- Phase A duration ≥ `0.04`
- Phase C delay ≥ `0.03` before new content
- No gap between Phase A and Phase B

### Anti-Patterns

- ❌ `duration < 0.10` for Phase B
- ❌ Incoming scene starts at same position as outgoing hides (overlap = 0)
- ❌ Skip Phase A
- ❌ Show content immediately after wipe (no breathing gap)
- ❌ `ease: "none"` for Phase B — always use `power1`/`power2`

### 3-Phase Example (Blur Dissolve)

```javascript
// Phase A: Wind-down
masterTL
  .to("#s1-bg", { filter: "blur(4px)", opacity: 0.7, scale: 1.18, ease: "power1.in", duration: 0.06 }, 0.22)
// Phase B: Cross-fade
  .to("#s1-bg", { filter: "blur(20px)", opacity: 0, ease: "power2.in", duration: 0.12 }, 0.27)
  .to("#scene-2", { opacity: 1, visibility: "visible", ease: "power2.out", duration: 0.14 }, 0.28)
// Phase C: Settle
  .set("#scene-1", { visibility: "hidden", zIndex: 1 }, 0.42)
  .set("#scene-2", { zIndex: 3 }, 0.42);
```

### 3-Phase Example (Iris Wipe)

```javascript
// Phase A
masterTL
  .to("#s2-bg", { filter: "blur(3px)", opacity: 0.8, ease: "power1.in", duration: 0.05 }, 0.58)
// Phase B
  .set("#scene-3", { visibility: "visible", zIndex: 4, clipPath: "circle(0% at 50% 50%)" }, 0.61)
  .to("#scene-3", { clipPath: "circle(75% at 50% 50%)", ease: "power1.in", duration: 0.10 }, 0.61)
  .to("#scene-3", { clipPath: "circle(160% at 50% 50%)", ease: "power2.out", duration: 0.06 }, 0.71)
  .to("#s2-bg", { filter: "blur(12px)", opacity: 0.3, ease: "power2.in", duration: 0.12 }, 0.63)
// Phase C
  .set("#scene-3", { clipPath: "none" }, 0.77)
  .set("#scene-2", { visibility: "hidden", zIndex: 1 }, 0.77);
```

---

## Stacked-Scene + Master-Timeline Architecture

**Problem**: Separate pinned sections cause black gaps between scenes during unpin/pin transitions.

**Solution**: ONE container (`#scroll-stage`), pinned ONCE, ALL scenes `position: absolute` inside. A single master timeline controls everything.

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Experience</title>
  <link href="https://fonts.googleapis.com/css2?family=CHOSEN_DISPLAY_FONT&family=CHOSEN_BODY_FONT&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>
<body>
  <div class="grain-overlay"></div>
  <div class="vignette"></div>
  <div class="scroll-progress" id="scrollProgress"></div>

  <div id="scroll-stage">
    <section id="scene-1" class="scene">
      <div class="scene-layer layer-bg" id="s1-bg"></div>
      <div class="scene-layer layer-mid" id="s1-mid"></div>
      <div class="scene-layer layer-frame" id="s1-frame"></div>
      <div class="scene-layer layer-text" id="s1-text">
        <h1 class="display-text">HEADLINE</h1>
        <p class="body-text">Supporting text</p>
      </div>
      <div class="scene-layer layer-overlay" id="s1-particles"></div>
    </section>
    <section id="scene-2" class="scene"><!-- Same layer structure --></section>
    <section id="scene-3" class="scene"><!-- Same layer structure --></section>
  </div>

  <script src="js/animations.js"></script>
</body>
</html>
```

### css/styles.css

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: auto; }
body {
  font-family: 'CHOSEN_BODY_FONT', sans-serif;
  background: #FINAL_SCENE_COLOR; /* CRITICAL: match final scene to prevent bottom gap */
  color: #f5f5f0;
  overflow-x: hidden;
}

#scroll-stage {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scene-layer {
  position: absolute;
  inset: 0;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.layer-bg      { z-index: 1; }
.layer-mid     { z-index: 2; }
.layer-frame   { z-index: 3; }
.layer-text    { z-index: 4; }
.layer-overlay { z-index: 5; pointer-events: none; }

#scene-2, #scene-3 { opacity: 0; visibility: hidden; }
```

### js/animations.js

```javascript
gsap.registerPlugin(ScrollTrigger);
const isMobile = window.innerWidth < 768;

const masterTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#scroll-stage",
    start: "top top",
    end: "+=1200%",
    pin: true,
    scrub: 1.2,
    anticipatePin: 1,
  }
});

gsap.set("#scene-1", { opacity: 1, visibility: "visible", zIndex: 3 });

// Scene 1 parallax
masterTL
  .to("#s1-bg", { scale: 1.15, ease: "none", duration: 0.30 }, 0)
  .to("#s1-text", { y: "-35vh", opacity: 0, duration: 0.16 }, 0);

// Transition 1→2 (3-phase blur dissolve)
masterTL
  .to("#s1-bg", { filter: "blur(4px)", opacity: 0.7, duration: 0.06 }, 0.22)
  .to("#s1-bg", { filter: "blur(20px)", opacity: 0, duration: 0.12 }, 0.27)
  .to("#scene-2", { opacity: 1, visibility: "visible", duration: 0.14 }, 0.28)
  .set("#scene-1", { visibility: "hidden", zIndex: 1 }, 0.42)
  .set("#scene-2", { zIndex: 3 }, 0.42);

// Scene 2, Transition 2→3, Scene 3 ... (follow same pattern)
```

---

## Advanced Techniques

### Text Reveal

```javascript
gsap.from(".headline-word", {
  y: 120, opacity: 0, rotateX: -40, stagger: 0.08,
  scrollTrigger: { trigger: ".text-section", start: "top 80%", end: "top 30%", scrub: true }
});
```

### Horizontal Scroll Section

```javascript
const items = gsap.utils.toArray(".horizontal-item");
gsap.to(items, {
  xPercent: -100 * (items.length - 1), ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper", pin: true, scrub: 1,
    snap: 1 / (items.length - 1),
    end: () => "+=" + document.querySelector(".horizontal-wrapper").offsetWidth,
  }
});
```

### SVG Mask Transitions (with fallback)

```javascript
gsap.to(".mask-circle", {
  attr: { r: 1.5 }, ease: "power2.inOut",
  scrollTrigger: { trigger: ".mask-section", start: "top center", end: "bottom center", scrub: true }
});

// Fallback for browsers without SVG mask support
if (!CSS.supports("mask", "url(#test)")) {
  gsap.fromTo(".masked-scene",
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(150% at 50% 50%)", ... }
  );
}
```

### Floating Particles

```javascript
gsap.utils.toArray(".floating-particle").forEach((el, i) => {
  gsap.to(el, {
    y: `random(-80, 80)`, x: `random(-40, 40)`, rotation: `random(-15, 15)`,
    duration: `random(3, 6)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2,
  });
  gsap.to(el, {
    y: "-=200",
    scrollTrigger: { trigger: el.closest(".scene"), start: "top bottom", end: "bottom top", scrub: 2 }
  });
});
```

---

## Mobile & Performance

### Mobile Handling

```javascript
const isMobile = window.innerWidth < 768;
const SCALE_FACTOR = isMobile ? 0.6 : 1.0;

ScrollTrigger.normalizeScroll(true);
ScrollTrigger.config({ ignoreMobileResize: true });

// Mobile viewport height fix
function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener('resize', setVH);

if (isMobile) {
  // Reduce scale, particle counts, disable blur transitions
}
```

### Performance Checklist

- `will-change: transform, opacity` on animated layers only
- `backface-visibility: hidden` on scene layers
- Avoid continuous `filter: blur()` — use only for transitions
- Max 8-12 simultaneous scroll-linked animations
- Use `gsap.set()` for initial states
- Never animate `width/height/top/left` — use `transform` only
- Call `ScrollTrigger.refresh()` once after all setup

---

## Scene Recipes

### "Window Into World"
BG scale 1→1.15 | MID scale 1→1.6 | FRAME scale 1→4, opacity→0 | TEXT y→-50vh | 400vh scroll

### "Deep Dive"
Color gradient light→dark | Layers drift upward sequentially | 600vh scroll

### "Horizontal Gallery"
Horizontal snap scroll with `xPercent` + ScrollTrigger `snap`

### "Text Story Scroll"
Typography IS the visual layer — words scale, rotate, blur through scroll

### "Product Showcase Orbit"
Central product rotates/scales | Specs fly in contextually | 500vh scroll

---

## Creative Direction

### DO:
- Atmospheric gradients, grain overlays, vignettes
- Scene-based cinematographic thinking
- Negative space, varied rhythm
- Dramatic typography, micro-details
- CSS `mix-blend-mode` for layered richness

### DON'T:
- ❌ Generic fonts (Inter, Roboto, Arial)
- ❌ Purple gradients on white
- ❌ Everything centered and symmetrical
- ❌ Animate everything at once
- ❌ `scroll-behavior: smooth` (conflicts with ScrollTrigger)
- ❌ Forget `overflow-x: hidden`

---

## Output Requirements

### Architecture Rules

- All scenes inside ONE `#scroll-stage` container, `position: absolute`
- Only `#scroll-stage` is pinned (ONE pin)
- Single `gsap.timeline()` drives ALL animations
- **NEVER** individual `pin: true` on separate sections
- `body { background }` = final scene color (prevents bottom gap)
- **NEVER** add spacer divs after last scene

### Quality Checklist

- [ ] ≥3 depth layers per scene with visible differential speed
- [ ] Every transition follows 3-phase pattern (Phase B ≥ 0.10, overlap ≥ 0.05)
- [ ] No horizontal scrollbar
- [ ] Mobile viewport works without layout shifts
- [ ] Distinctive typography (NOT generic)
- [ ] 60fps performance

---

## Template Reference

**BEFORE CODING**: Read `templates/index.html`, `templates/css/styles.css`, and `templates/js/animations.js`. The template demonstrates TWO different transition types (blur dissolve + iris wipe) between 3 scenes. Use as foundation — adapt content, add scenes, mix transitions.

### Resources

- **GSAP 3 Docs**: https://gsap.com/docs/v3/
- **ScrollTrigger Docs**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Google Fonts**: https://fonts.google.com/

---

## Final Reminders

- Layer speed differential is everything
- `pin` + `scrub` are the two core properties
- Stacked-scene architecture: ONE pin, ONE master timeline
- `body background = final scene color`
- Every transition: 3 phases, Phase B ≥ 0.10
- Performance is non-negotiable — think like a film director

```
