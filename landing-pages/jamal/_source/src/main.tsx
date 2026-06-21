import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { IS_FLAT } from './lib/flags';

// QA-only: when ?flat is present, force the reduced-motion media query so every
// section renders its static (no pin / no scrub) path for clean screenshots.
if (IS_FLAT) {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (query: string): MediaQueryList => {
    if (query.includes('prefers-reduced-motion')) {
      // Emulate "reduce": the reduce query matches, no-preference does not.
      const matches = !query.includes('no-preference');
      return {
        matches,
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent() {
          return false;
        },
      } as MediaQueryList;
    }
    return orig(query);
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
