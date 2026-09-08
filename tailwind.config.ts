import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfcf8',
          100: '#faf7f0',
          200: '#f2ece0',
          300: '#e8dfcd',
        },
        sage: {
          50: '#f4f6f2',
          100: '#e3e9dd',
          200: '#c7d3bd',
          300: '#a8b99a',
          400: '#8b9e7c',
          500: '#6f8264',
          600: '#57674e',
          700: '#424e3c',
          800: '#2f382b',
        },
        gold: {
          100: '#f6ecd9',
          200: '#e9d5ad',
          300: '#d9bb7f',
          400: '#c8a15a',
          500: '#b08847',
        },
      },
      letterSpacing: {
        widest: '0.2em',
        wider: '0.12em',
      },
    },
  },
  plugins: [],
};

export default config;
