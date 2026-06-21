/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A0B10',
        surface: '#2A1620',
        line: '#422835',
        cream: '#F3ECE5',
        muted: '#A98A90',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        wine: 'var(--wine)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        // The wordmark echoes the JAMAL logo (Didone serif).
        serif: ['Didot', '"Bodoni 72"', '"Bodoni MT"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
    },
  },
  plugins: [],
};
