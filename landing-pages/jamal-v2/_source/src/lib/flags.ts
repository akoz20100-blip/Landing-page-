/**
 * Dev/QA flags read from the URL.
 *
 * `?flat` forces the reduced-motion code path (no pins / no scrubs) and uses
 * native scrolling instead of Lenis. It exists purely so static screenshots can
 * be captured in headless previews, where Lenis + GSAP pinning don't repaint the
 * capture surface. It has no effect on a normal visit (no query param).
 */
export const IS_FLAT =
  import.meta.env.DEV &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('flat');
