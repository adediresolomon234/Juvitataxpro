import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  // Preflight is OFF: the site already ships its own reset and a bespoke
  // navy/green design. Disabling preflight guarantees Tailwind utilities are
  // available without altering any of the existing styling.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#01244E", mid: "#092B58", light: "#143C79" },
        green: { DEFAULT: "#0B9B44", light: "#4FB778", pale: "#E7F5EC" },
        "off-white": "#F8F6F1",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dmsans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
