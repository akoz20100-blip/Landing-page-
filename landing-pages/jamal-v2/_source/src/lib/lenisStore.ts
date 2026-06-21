import type Lenis from 'lenis';

/**
 * Module-level handle to the live Lenis instance so non-App components (the nav)
 * can drive offset-aware anchor scrolling and lock background scroll for the
 * mobile menu — without prop-drilling or a context provider.
 *
 * `current` is null when smooth-scroll is off (reduced-motion or ?flat); callers
 * fall back to native anchor jumps + CSS `scroll-margin-top`.
 */
export const lenisStore: { current: Lenis | null } = { current: null };

/** Approx fixed-nav height; anchor targets land below it. */
export const NAV_OFFSET = 84;

/**
 * Smoothly scroll to an in-page `#hash` via Lenis (offset under the fixed nav).
 * Returns true if it handled the scroll (caller should preventDefault); false
 * for non-hash hrefs or when Lenis is off (native jump + scroll-margin-top wins).
 */
export function scrollToHash(href: string): boolean {
  if (!href.startsWith('#')) return false;
  const target = document.querySelector(href);
  const lenis = lenisStore.current;
  if (lenis && target) {
    lenis.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET });
    return true;
  }
  return false;
}
