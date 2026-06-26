import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works under any sub-path on GitHub Pages
// (the repo is served at /Landing-page-/landing-pages/jamal/) without hard-coding
// the repo prefix. Assets resolve relative to index.html via asset.ts + BASE_URL.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173 },
});
