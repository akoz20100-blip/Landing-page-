import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from a sub-path on GitHub Pages (/landing-pages/jamal/) in production,
// but from root during local dev so the preview server stays at "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/landing-pages/jamal/' : '/',
  plugins: [react()],
  server: { port: 5173 },
}));
