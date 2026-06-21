/**
 * Shared motion constants + a reduced-motion check.
 * Sections use `gsap.matchMedia()` to branch on reduced-motion (it auto-reverts),
 * but a few imperative spots need the boolean directly.
 */
export const EASE = {
  reveal: 'power3.out',
  curtain: 'power4.inOut',
  scrub: 'none',
} as const;

export const REVEAL_DURATION = 1;

export const MEDIA = {
  motionOk: '(prefers-reduced-motion: no-preference)',
  motionReduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(MEDIA.motionReduce).matches;
}
