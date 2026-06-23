import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deployment: the repo is served at /Landing-page-/ so the
// jamal-v2 sub-page lives at /Landing-page-/landing-pages/jamal-v2/.
// Assets (images, video) are served from the CDN via asset.ts.
export default defineConfig({
  base: '/Landing-page-/landing-pages/jamal-v2/',
  plugins: [react()],
  server: { port: 5173 },
});
