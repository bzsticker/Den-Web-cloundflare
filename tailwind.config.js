/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#f97316',
          500: '#ff6b00', // Electric Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        blue: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#e60000', // Supercar Red
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        brand: {
          sky: '#ff6b00',
          blue: '#e60000',
          navy: '#12131a', // Carbon Gray
          ink: '#0b0c10', // Deep Obsidian Black
          card: '#181a24', // Lighter Carbon Card
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
          'Kanit',
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
