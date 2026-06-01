/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          sky: '#0ea5e9',
          blue: '#2563eb',
          navy: '#0b1f3a',
          ink: '#10213d',
          red: '#ef4444',
          gold: '#f5b841',
        },
      },
      boxShadow: {
        soft: '0 24px 70px -32px rgba(14, 68, 122, 0.35)',
        glow: '0 24px 80px -36px rgba(14, 165, 233, 0.65)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans Thai',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
