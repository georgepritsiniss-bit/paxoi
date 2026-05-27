import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fbf8f3",
          100: "#f4ecdd",
          200: "#e8d8b8",
          300: "#d9bf8a",
          400: "#caa55c",
          500: "#b88a3d",
          600: "#9c7030",
          700: "#7d5829",
          800: "#5e4321",
          900: "#3f2d17",
        },
        sea: {
          50: "#eef9fb",
          100: "#d3f0f6",
          200: "#a9e0eb",
          300: "#74cadc",
          400: "#3aacc5",
          500: "#1f8fab",
          600: "#1a7290",
          700: "#185b75",
          800: "#174a60",
          900: "#143e51",
        },
        ink: {
          50: "#f5f5f4",
          100: "#e7e5e4",
          200: "#d6d3d1",
          300: "#a8a29e",
          400: "#78716c",
          500: "#57534e",
          600: "#44403c",
          700: "#292524",
          800: "#1c1917",
          900: "#0f0d0c",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-grain":
          "radial-gradient(transparent 1px, rgba(0,0,0,0.04) 1px), radial-gradient(transparent 1px, rgba(0,0,0,0.04) 1px)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slow-zoom": "slowZoom 20s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
