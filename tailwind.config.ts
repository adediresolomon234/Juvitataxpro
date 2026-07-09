import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  // Preflight is OFF: the site already ships its own reset and a bespoke
  // navy/gold design. Disabling preflight guarantees Tailwind utilities are
  // available without altering any of the existing styling.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1C3D", mid: "#132347", light: "#1E3468" },
        gold: { DEFAULT: "#C8A84B", light: "#E8C96A", pale: "#F7EDD3" },
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
