import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      boxShadow: {
        'right-bottom-md': '3px 3px 5px 0px #01001a',
      },
      colors: {
        accent: {
          1: 'hsl(var(--color-accent1) / <alpha-value>)',
        },
        red: {
          1: 'hsl(var(--color-red1) / <alpha-value>)',
          2: 'hsl(var(--color-red2) / <alpha-value>)',
        },
        gradient: {
          bg: {
            start: 'hsl(var(--color-bg-grad-start) / <alpha-value>)',
            end: 'hsl(var(--color-bg-grad-end) / <alpha-value>)',
          },
        },
        dark: 'hsl(var(--color-dark) / <alpha-value>)',
        content: {
          normal: 'hsl(var(--color-content) / <alpha-value>)',
          light: 'hsl(var(--color-text-light) / <alpha-value>)',
        },
        yellow: 'hsl(var(--color-yellow) / <alpha-value>)',
        cyanBlue: 'hsl(var(--color-cyan-blue) / <alpha-value>)',
      },
      animation: {
        'spin-slower': 'spin 35s ease infinite',
        'spin-slow': 'spin 25s ease-in-out infinite reverse',
        'rotate-loader-1': 'loader1Rotate 2s infinite',
        'loader-1-ball-1': 'loader1Ball1 2s infinite',
        'loader-1-ball-2': 'loader1Ball2 2s infinite',
        slideIn: 'slideIn .5s ease-in-out',
        slideOut: 'slideOut .5s ease-in-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0px', transform: 'translateX(100%)' },
          '100%': { opacity: '1px', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1px', transform: 'translateX(0)' },
          '100%': { opacity: '0px', transform: 'translateX(100%)' },
        },
        loader1Rotate: {
          '0%': {
            '-webkit-transform': 'rotate(0deg) scale(0.8)',
            '-moz-transform': 'rotate(0deg) scale(0.8)',
          },
          '50%': {
            '-webkit-transform': 'rotate(360deg) scale(1.2)',
            '-moz-transform': 'rotate(360deg) scale(1.2)',
          },
          '100%': {
            '-webkit-transform': 'rotate(720deg) scale(0.8)',
            '-moz-transform': 'rotate(720deg) scale(0.8)',
          },
        },

        loader1Ball1: {
          '0%': {
            boxShadow: '30px 0 0 #f8b334',
          },
          '50%': {
            boxShadow: '0 0 0 #f8b334',
            marginBottom: '0px',
            '-webkit-transform': 'translate(15px,15px)',
            '-moz-transform': 'translate(15px, 15px)',
          },
          '100%': {
            boxShadow: '30px 0 0 #f8b334',
            marginBottom: '10px',
          },
        },
        loader1Ball2: {
          '0%': {
            boxShadow: '30px 0 0 #97bf0d',
          },
          '50%': {
            boxShadow: '0 0 0 #97bf0d',
            marginTop: '-20px',
            '-webkit-transform': 'translate(15px,15px)',
            '-moz-transform': 'translate(15px, 15px)',
          },
          '100%': {
            boxShadow: '30px 0 0 #97bf0d',
            marginTop: '0px',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
