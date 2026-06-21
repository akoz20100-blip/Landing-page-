/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        surface: '#111111',
        line: '#222222',
        cream: '#F5F2EC',
        muted: '#8A8A8A',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
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
