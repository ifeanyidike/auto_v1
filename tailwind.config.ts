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
    },
  },
  plugins: [],
} satisfies Config;
