import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        "right-bottom-md": "3px 3px 5px 0px #01001a",
      },
      colors: {
        accent: {
          1: "hsl(var(--color-accent1) / <alpha-value>)",
        },
        red: {
          1: "hsl(var(--color-red1) / <alpha-value>)",
          2: "hsl(var(--color-red2) / <alpha-value>)",
        },
        dark: "hsl(var(--color-dark) / <alpha-value>)",
        content: {
          normal: "hsl(var(--color-content) / <alpha-value>)",
          light: "hsl(var(--color-text-light) / <alpha-value>)",
        },
        yellow: "hsl(var(--color-yellow) / <alpha-value>)",
      },
      animation: {
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
} satisfies Config;
