import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper tones sampled from the reference invitation.
        cream: {
          50: '#fdfaf4',
          100: '#faf3e8',
          200: '#f8ece0',
          300: '#f0e2d2',
          400: '#e8dcc8',
          500: '#dccbb2',
        },
        gold: {
          100: '#f2e4c4',
          200: '#e5cf9a',
          300: '#d4b169',
          400: '#c19a45',
          500: '#a8842f',
          600: '#8a6a20',
        },
        wine: {
          400: '#9a3540',
          500: '#7a1f2b',
          600: '#5c161f',
          700: '#3d0e15',
        },
        ink: {
          300: '#b0a08c',
          400: '#9a8b78',
          500: '#7a6a58',
          600: '#5c4f42',
          700: '#43392f',
        },
        sage: {
          200: '#cdd6c0',
          300: '#b3bfa3',
          400: '#94a385',
          500: '#74856a',
          600: '#586a50',
        },
      },
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        // One text face for Georgian, Latin and digits alike.
        sans: ['var(--font-body)', 'var(--font-cyrillic)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-body)', 'var(--font-cyrillic)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.22em',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateY(110vh) translateX(6vw) rotate(320deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
