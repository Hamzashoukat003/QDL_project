/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        qd: {
          red: '#CC3433',
          'red-deep': '#A3242A',
          purple: '#330065',
          'purple-ink': '#1C0838',
          'purple-soft': '#EEEAF4',
          grey: '#868686',
        },
        ink: { DEFAULT: '#1E1D22', 2: '#45444C', 3: '#76757D' },
        paper: '#FFFFFF',
        mist: '#F3F2EF',
        rule: '#DCDAD5',
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
