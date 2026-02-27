/* =============================================================
   SVG SCROLL EXPERIENCE — ANIMATIONS
   Master timeline architecture: single pin on #scroll-stage,
   one gsap.timeline() drives ALL scene animations & transitions.

   Transition types demonstrated:
   • Scene 1→2: Cross-fade blur dissolve
   • Scene 2→3: Diagonal wipe (clip-path polygon)
   ============================================================= */

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < 768;

// ===== SCROLL PROGRESS BAR =====
gsap.to("#scrollProgress", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }
});

// ===== SVG PARTICLE GENERATOR =====
function createSVGParticles(containerId, type, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const num = isMobile ? Math.floor(count * 0.4) : count;
  const svgNS = "http://www.w3.org/2000/svg";

  for (let i = 0; i < num; i++) {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    const size = 6 + Math.random() * 18;
    Object.assign(svg.style, {
      position: "absolute",
      width: size + "px",
      height: size + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      opacity: 0.04 + Math.random() * 0.16,
      pointerEvents: "none",
    });

    let shape;
    if (type === 'star') {
      shape = document.createElementNS(svgNS, "polygon");
      shape.setAttribute("points", "12,2 14.5,9 22,9.5 16,14.5 18,22 12,17.5 6,22 8,14.5 2,9.5 9.5,9");
      shape.setAttribute("fill", "var(--color-highlight)");
    } else if (type === 'leaf') {
      shape = document.createElementNS(svgNS, "path");
      shape.setAttribute("d", "M12,3 Q19,8 12,22 Q5,8 12,3 Z");
      shape.setAttribute("fill", "var(--color-land)");
      shape.setAttribute("opacity", "0.7");
    } else if (type === 'diamond') {
      shape = document.createElementNS(svgNS, "polygon");
      shape.setAttribute("points", "12,3 21,12 12,21 3,12");
      shape.setAttribute("fill", "none");
      shape.setAttribute("stroke", "var(--color-accent)");
      shape.setAttribute("stroke-width", "1");
    }

    if (shape) {
      svg.appendChild(shape);
      container.appendChild(svg);

      gsap.to(svg, {
        y: `random(-40, 40)`,
        x: `random(-25, 25)`,
        rotation: `random(-15, 15)`,
        duration: 3 + Math.random() * 4,
        repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });
    }
  }
}

createSVGParticles('s1-decorations', 'star', 30);
createSVGParticles('s2-decorations', 'leaf', 22);
createSVGParticles('s3-decorations', 'diamond', 15);


// ==========================================================
// MASTER TIMELINE — #scroll-stage pinned
//
//   0.00 — 0.28  Scene 1 parallax (mountain pass)
//   0.22 — 0.42  Transition 1→2 (blur dissolve: 3-phase)
//   0.42 — 0.60  Scene 2 content (forest clearing)
//   0.58 — 0.77  Transition 2→3 (diagonal wipe: 3-phase)
//   0.77 — 1.00  Scene 3 closing (summit dawn)
// ==========================================================

const masterTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#scroll-stage",
    start: "top top",
    end: "+=1300%",
    pin: true,
    scrub: 1.2,
    anticipatePin: 1,
  }
});

// ── Initial states ─────────────────────────────────────
gsap.set("#scene-1", { opacity: 1, visibility: "visible", zIndex: 3 });
gsap.set("#s1-bg", { scale: 1 });
gsap.set("#s1-mid", { scale: 1 });
gsap.set("#s1-frame", { scale: 1, opacity: 1 });
gsap.set("#s1-text", { y: 0, opacity: 1 });


// ── SCENE 1: Mountain Pass parallax ────────────────────

masterTL
  .to("#s1-bg", {
    scale: 1.12, y: "-4%",
    ease: "none", duration: 0.30,
  }, 0)

  .to("#s1-mid", {
    scale: isMobile ? 1.4 : 1.7, y: "-12%",
    ease: "none", duration: 0.28,
  }, 0)

  .to("#s1-frame", {
    scale: isMobile ? 3.5 : 5.5, opacity: 0,
    ease: "power1.in", duration: 0.22,
  }, 0)

  .to("#s1-text", {
    y: "-30vh", opacity: 0,
    ease: "none", duration: 0.16,
  }, 0)

  .to("#s1-decorations svg", {
    y: "-=120", opacity: 0,
    stagger: 0.002,
    ease: "none", duration: 0.25,
  }, 0.05);


// ══════════════════════════════════════════════════════════
// TRANSITION 1→2: Cross-fade Blur Dissolve (3-phase)
// Phase A: wind-down → Phase B: cross-fade → Phase C: settle
// ══════════════════════════════════════════════════════════

// Phase A: Scene 1 begins softening — hints that a change is coming
masterTL
  .to("#s1-bg", {
    filter: "blur(4px)", opacity: 0.7, scale: 1.18,
    ease: "power1.in", duration: 0.06,
  }, 0.22)

  .to("#s1-text", {
    filter: "blur(3px)",
    ease: "none", duration: 0.05,
  }, 0.24)

// Phase B: Main cross-fade — both scenes visible simultaneously
  .to("#s1-bg", {
    filter: "blur(20px)", opacity: 0,
    ease: "power2.in", duration: 0.12,
  }, 0.27)

  .to("#scene-2", {
    opacity: 1, visibility: "visible",
    ease: "power2.out", duration: 0.14,
  }, 0.28)

// Phase C: Scene 1 hidden, Scene 2 settles
  .set("#scene-1", { visibility: "hidden", zIndex: 1, filter: "none" }, 0.42)
  .set("#scene-2", { zIndex: 3 }, 0.42);


// ── SCENE 2: Forest — cards stagger ───────────────────

masterTL
  // Section heading appears with gentle scale
  .fromTo("#s2-text", {
    opacity: 0, y: 50, scale: 0.96,
  }, {
    opacity: 1, y: 0, scale: 1,
    ease: "power2.out", duration: 0.09,
  }, 0.42)

  .fromTo("#s2-text h2", {
    opacity: 0, y: 50,
  }, {
    opacity: 1, y: 0,
    ease: "power2.out", duration: 0.06,
  }, 0.43)

  .to("#s2-text", {
    opacity: 0, y: -60,
    ease: "power2.in", duration: 0.06,
  }, 0.50)

  .to(".info-card[data-card='1']", {
    y: 0, opacity: 1, ease: "power2.out", duration: 0.06,
  }, 0.50)
  .to(".info-card[data-card='2']", {
    y: 0, opacity: 1, ease: "power2.out", duration: 0.06,
  }, 0.53)
  .to(".info-card[data-card='3']", {
    y: 0, opacity: 1, ease: "power2.out", duration: 0.06,
  }, 0.56)

  // Cards exit gradually
  .to("#s2-mid", {
    y: "-15vh", opacity: 0,
    ease: "power1.in", duration: 0.08,
  }, 0.58);


// ══════════════════════════════════════════════════════════
// TRANSITION 2→3: Diagonal Wipe (3-phase)
// Phase A: wind-down → Phase B: wipe expansion → Phase C: settle
// ══════════════════════════════════════════════════════════

// Phase A: Scene 2 softens before wipe begins
masterTL
  .to("#s2-bg", {
    filter: "blur(3px)", opacity: 0.8,
    ease: "power1.in", duration: 0.05,
  }, 0.58)

// Phase B: Diagonal wipe — Scene 3 sweeps from top-right
  .set("#scene-3", {
    visibility: "visible",
    opacity: 1,
    zIndex: 4,
    clipPath: "polygon(100% 0, 100% 0, 100% 0, 100% 0)",
  }, 0.61)

  // Slow start: diagonal begins revealing
  .to("#scene-3", {
    clipPath: "polygon(50% 0, 100% 0, 150% 50%, 100% 50%)",
    ease: "power1.in",
    duration: 0.08,
  }, 0.61)

  // Accelerate to full cover
  .to("#scene-3", {
    clipPath: "polygon(-50% 0, 100% 0, 150% 100%, 0% 100%)",
    ease: "power2.out",
    duration: 0.08,
  }, 0.69)

  // Scene 2 also blurs/fades behind the wipe
  .to("#s2-bg", {
    filter: "blur(12px)", opacity: 0.3,
    ease: "power2.in", duration: 0.12,
  }, 0.63)

// Phase C: Wipe complete, clean up
  .set("#scene-3", { clipPath: "none" }, 0.77)
  .set("#scene-2", { visibility: "hidden", zIndex: 1, filter: "none" }, 0.77)
  .set("#scene-3", { zIndex: 3 }, 0.77);


// ── SCENE 3: Summit Dawn — gentle entrance after wipe ──

masterTL
  // BG warms in with parallax
  .to("#s3-bg", {
    scale: 1.08, y: "-3%",
    ease: "none", duration: 0.24,
  }, 0.77)

  // Text fades in with delay — let the background breathe
  .fromTo("#s3-text", {
    opacity: 0, scale: 0.92, y: 30,
  }, {
    opacity: 1, scale: 1, y: 0,
    ease: "power3.out", duration: 0.14,
  }, 0.81)

  .to("#s3-decorations svg", {
    y: "-=70", opacity: 0.06,
    stagger: 0.003,
    ease: "none", duration: 0.2,
  }, 0.82)

  // Text drifts as scene concludes
  .to("#s3-text", {
    y: -25,
    ease: "none", duration: 0.16,
  }, 0.88);


// ===== GLOBAL =============================================

if (isMobile) {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
