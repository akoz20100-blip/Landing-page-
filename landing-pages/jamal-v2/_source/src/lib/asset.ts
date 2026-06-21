/**
 * Resolve a public asset path against Vite's configured base URL so the build
 * works whether it's served from the domain root or a sub-path
 * (e.g. GitHub Pages at /landing-pages/jamal-v2/). Accepts paths with or without a
 * leading slash: asset('/assets/x.webp') and asset('assets/x.webp') are equal.
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
