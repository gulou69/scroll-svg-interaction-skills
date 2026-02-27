/* =============================================================
   SCROLL EXPERIENCE — ANIMATIONS
   Master timeline architecture: single pin on #scroll-stage,
   one gsap.timeline() drives all scene animations & transitions.
   
   Transition types demonstrated:
   • Scene 1→2: Cross-fade blur dissolve
   • Scene 2→3: Circular iris wipe (clip-path)
   ============================================================= */

gsap.registerPlugin(ScrollTrigger);

// ===== MOBILE DETECTION =====
const isMobile = window.innerWidth < 768;

// ===== SCROLL PROGRESS BAR =====
gsap.to("#scrollProgress", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }
});

// ===== AMBIENT PARTICLES =====
function createParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const num = isMobile ? Math.floor(count * 0.4) : count;
  for (let i = 0; i < num; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    const size = (1 + Math.random() * 3) + 'px';
    p.style.width = size;
    p.style.height = size;
    p.style.opacity = 0.05 + Math.random() * 0.15;
    container.appendChild(p);

    gsap.to(p, {
      y: `random(-60, 60)`,
      x: `random(-30, 30)`,
      duration: 3 + Math.random() * 4,
      repeat: -1, yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 3,
    });
  }
}
createParticles('s1-particles', 35);


// ==========================================================
// MASTER TIMELINE — Pinned on #scroll-stage
// Total scroll: ~1200vh (adjustable via end value)
//
// Timeline breakdown (normalized 0-1):
//   0.00 — 0.30  Scene 1 parallax
//   0.27 — 0.36  Transition 1→2 (cross-fade blur dissolve)
//   0.36 — 0.65  Scene 2 content cards
//   0.62 — 0.73  Transition 2→3 (circular iris wipe)
//   0.73 — 1.00  Scene 3 closing
// ==========================================================

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


// ── Initial states ─────────────────────────────────────
gsap.set("#scene-1", { opacity: 1, visibility: "visible", zIndex: 3 });
gsap.set("#s1-bg", { scale: 1 });
gsap.set(".hero-shape", { scale: 1, rotation: 0 });
gsap.set(".window-frame", { scale: 1, opacity: 1 });
gsap.set("#s1-text", { y: 0, opacity: 1 });


// ── SCENE 1: Layered parallax ──────────────────────────

masterTL
  // BG: slowest zoom
  .to("#s1-bg", {
    scale: 1.15,
    ease: "none",
    duration: 0.30,
  }, 0)

  // MID: moderate zoom + rotate
  .to(".hero-shape", {
    scale: isMobile ? 1.6 : 2.2,
    rotation: 15,
    opacity: 0.3,
    ease: "none",
    duration: 0.28,
  }, 0)

  // FRAME: fastest — zooms past viewer
  .to(".window-frame", {
    scale: isMobile ? 3 : 4.5,
    opacity: 0,
    ease: "power1.in",
    duration: 0.22,
  }, 0)

  // TEXT: fades up and away
  .to("#s1-text", {
    y: "-35vh",
    opacity: 0,
    ease: "none",
    duration: 0.16,
  }, 0)

  // PARTICLES: drift up
  .to("#s1-particles .particle", {
    y: "-=150",
    opacity: 0,
    stagger: 0.002,
    ease: "none",
    duration: 0.25,
  }, 0.05);


// ══════════════════════════════════════════════════════════
// TRANSITION 1→2: Cross-fade Blur Dissolve
// Three phases: pre-transition wind-down → main cross-fade → settle-in
// Wider overlap zone prevents harsh cuts.
// ══════════════════════════════════════════════════════════

// Phase A: Pre-transition wind-down (scene 1 begins softening)
masterTL
  .to("#s1-bg", {
    filter: "blur(4px)",
    opacity: 0.7,
    scale: 1.18,
    ease: "power1.in",
    duration: 0.06,
  }, 0.22)

  .to("#s1-text", {
    filter: "blur(3px)",
    ease: "none",
    duration: 0.05,
  }, 0.24)

// Phase B: Main cross-fade (both scenes visible simultaneously)
  .to("#s1-bg", {
    filter: "blur(20px)",
    opacity: 0,
    ease: "power2.in",
    duration: 0.12,
  }, 0.27)

  .to("#scene-2", {
    opacity: 1,
    visibility: "visible",
    ease: "power2.out",
    duration: 0.14,
  }, 0.28)

// Phase C: Scene 1 fully hidden, Scene 2 settles
  .set("#scene-1", { visibility: "hidden", zIndex: 1, filter: "none" }, 0.42)
  .set("#scene-2", { zIndex: 3 }, 0.42);


// ── SCENE 2: Content cards stagger ─────────────────────

masterTL
  // Section heading appears — gentle entrance with slight scale
  .fromTo("#s2-text", {
    opacity: 0, y: 60, scale: 0.96,
  }, {
    opacity: 1, y: 0, scale: 1,
    ease: "power2.out",
    duration: 0.09,
  }, 0.42)

  // Heading exits to make room for cards
  .to("#s2-text", {
    opacity: 0, y: -80,
    ease: "power2.in",
    duration: 0.06,
  }, 0.50)

  // Cards stagger in with gentle upward motion
  .to(".content-card[data-card='1']", {
    opacity: 1, y: 0, ease: "power2.out", duration: 0.06,
  }, 0.50)
  .to(".content-card[data-card='2']", {
    opacity: 1, y: 0, ease: "power2.out", duration: 0.06,
  }, 0.53)
  .to(".content-card[data-card='3']", {
    opacity: 1, y: 0, ease: "power2.out", duration: 0.06,
  }, 0.56)

  // Cards drift out gradually
  .to(".content-card", {
    y: -60, opacity: 0,
    stagger: 0.015,
    ease: "power1.in",
    duration: 0.08,
  }, 0.58);


// ══════════════════════════════════════════════════════════
// TRANSITION 2→3: Circular Iris Wipe
// Three phases: pre-blur wind-down → iris expansion → settle-in
// ══════════════════════════════════════════════════════════

// Phase A: Pre-transition — Scene 2 content softens, signals change coming
masterTL
  .to("#s2-bg", {
    filter: "blur(3px)", opacity: 0.8,
    ease: "power1.in", duration: 0.05,
  }, 0.58)

// Phase B: Iris expansion — Scene 3 gradually revealed through circle
  .set("#scene-3", {
    visibility: "visible",
    opacity: 1,
    zIndex: 4,
    clipPath: "circle(0% at 50% 50%)",
  }, 0.61)

  // Slow start, smooth expansion — the iris opens deliberately
  .to("#scene-3", {
    clipPath: "circle(75% at 50% 50%)",
    ease: "power1.in",
    duration: 0.10,
  }, 0.61)

  // Accelerate to full cover
  .to("#scene-3", {
    clipPath: "circle(160% at 50% 50%)",
    ease: "power2.out",
    duration: 0.06,
  }, 0.71)

  // Scene 2 also fades during iris so it's not frozen behind the wipe
  .to("#s2-bg", {
    filter: "blur(12px)", opacity: 0.3,
    ease: "power2.in", duration: 0.12,
  }, 0.63)

// Phase C: Settle — clean up, Scene 3 elements gently ease in
  .set("#scene-3", { clipPath: "none" }, 0.77)
  .set("#scene-2", { visibility: "hidden", zIndex: 1, filter: "none" }, 0.77)
  .set("#scene-3", { zIndex: 3 }, 0.77);


// ── SCENE 3: Closing — gentle entrance after iris ──────

masterTL
  // BG warms in with gentle scale
  .to("#s3-bg", {
    scale: 1.05,
    ease: "none",
    duration: 0.24,
  }, 0.77)

  // Text fades in with delay — let the background breathe first
  .fromTo("#s3-text", {
    opacity: 0, scale: 0.92, y: 30,
  }, {
    opacity: 1, scale: 1, y: 0,
    ease: "power3.out",
    duration: 0.14,
  }, 0.81)

  // Text drifts slightly as scene concludes
  .to("#s3-text", {
    y: -25,
    ease: "none",
    duration: 0.16,
  }, 0.88);


// ===== GLOBAL ================================================

// Mobile scroll normalization
if (isMobile) {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Refresh after all triggers are registered
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
