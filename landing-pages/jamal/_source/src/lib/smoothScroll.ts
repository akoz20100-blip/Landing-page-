import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * THE BACKBONE OF THE WHOLE SITE.
 *
 * Lenis drives smooth scrolling; GSAP ScrollTrigger reads scroll position FROM
 * Lenis instead of the native scroll. This single sync is what makes every
 * scroll-driven animation (pinning, the 360 scrub, parallax, reveals) feel
 * "buttery" and stay in sync.
 *
 * ⚠️ Jules: DO NOT remove or refactor this sync away. If you ever see
 * janky / desynced scroll animations, this file is the first place to check.
 */
export function initSmoothScroll(): Lenis {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // 1) Update ScrollTrigger on every Lenis scroll frame.
  lenis.on('scroll', ScrollTrigger.update);

  // 2) Drive Lenis from GSAP's ticker (one rAF loop for everything).
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Tear the ticker callback down with the instance so StrictMode / HMR
  // remounts can't leak rAF callbacks onto a destroyed Lenis (which would
  // throw every frame and freeze the ticker). The sync above is unchanged.
  const destroy = lenis.destroy.bind(lenis);
  lenis.destroy = () => {
    gsap.ticker.remove(raf);
    destroy();
  };

  // Dev-only handles for inspecting scroll-driven animation in the preview.
  if (import.meta.env.DEV) {
    (window as unknown as Record<string, unknown>).__lenis = lenis;
    (window as unknown as Record<string, unknown>).__ScrollTrigger = ScrollTrigger;
  }

  return lenis;
}
