/**
 * Resolve a public asset path. Assets (images, video) are served from the
 * GitHub Pages origin where they already live, so the Vercel build doesn't
 * need to bundle any binary files.
 */
const ASSET_CDN = 'https://akoz20100-blip.github.io/Landing-page-/landing-pages/jamal-v2/';

export const asset = (path: string): string =>
  `${ASSET_CDN}${path.replace(/^\/+/, '')}`;
