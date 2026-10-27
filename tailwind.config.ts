import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5fa",
          100: "#ffe1ee",
          200: "#ffb6d5",
          300: "#ff82bb",
          400: "#f94a9d",
          500: "#ed1683",
          600: "#c90d6a",
        },
        rose: {
          gold: "#ed1683",
          light: "#f7bfd9",
        },
        ivory: {
          50: "#fefdf9",
          100: "#fff9fc",
          200: "#fff0f7",
        },
        mink: {
          300: "#d985ae",
          400: "#bd4b82",
          500: "#8f2058",
          600: "#291420",
          700: "#171116",
        },
        champagne: "#ffd5e9",
        petal: "#ffe1ee",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Jost'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(31,10,22,0.10)",
        bloom: "0 8px 40px rgba(237,22,131,0.16)",
        card: "0 2px 16px rgba(31,10,22,0.08)",
        "card-hover": "0 12px 40px rgba(237,22,131,0.18)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "slide-right": "slideRight 0.4s ease forwards",
        "slide-left": "slideLeft 0.35s ease forwards",
        wiggle: "wiggle 0.4s ease",
        shimmer: "shimmer 1.5s infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity:"0", transform:"translateY(24px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        slideRight: { "0%": { transform:"translateX(100%)", opacity:"0" }, "100%": { transform:"translateX(0)", opacity:"1" } },
        slideLeft: { "0%": { transform:"translateX(0)", opacity:"1" }, "100%": { transform:"translateX(100%)", opacity:"0" } },
        wiggle: { "0%,100%": { transform:"scale(1)" }, "50%": { transform:"scale(1.2)" } },
        shimmer: { "0%": { backgroundPosition:"-200% 0" }, "100%": { backgroundPosition:"200% 0" } },
        float: { "0%,100%": { transform:"translateY(0)" }, "50%": { transform:"translateY(-10px)" } },
      },
    },
  },
  plugins: [],
};
export default config;
