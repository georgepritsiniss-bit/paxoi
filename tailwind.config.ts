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
          50: "#f8f6f2",
          100: "#efe9df",
          200: "#ddd2c0",
          300: "#c7b89c",
          400: "#b09a74",
          500: "#9a8158",
          600: "#816a48",
          700: "#68553c",
          800: "#564734",
          900: "#493d2f",
        },
        sea: {
          50: "#f2f7f7",
          100: "#ddeaea",
          200: "#bcd5d6",
          300: "#91b8bb",
          400: "#6a989d",
          500: "#4f7e84",
          600: "#3e656b",
          700: "#345357",
          800: "#2e4548",
          900: "#293b3e",
        },
        ink: {
          50: "#f7f6f5",
          100: "#eceae8",
          200: "#d8d4d0",
          300: "#b9b2ab",
          400: "#948a80",
          500: "#786e64",
          600: "#615851",
          700: "#4f4843",
          800: "#443e3a",
          900: "#161412",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 20% 0%, rgba(154,129,88,0.08) 0px, transparent 45%), radial-gradient(at 90% 10%, rgba(79,126,132,0.06) 0px, transparent 40%)",
        "premium-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 18px 50px -20px rgba(154,129,88,0.45)",
        "glow-lg": "0 28px 70px -24px rgba(154,129,88,0.5)",
        card: "0 1px 1px rgba(22,20,18,0.03), 0 12px 40px -18px rgba(22,20,18,0.18)",
        "card-hover":
          "0 28px 70px -28px rgba(22,20,18,0.28), 0 0 0 1px rgba(154,129,88,0.12)",
        float:
          "0 10px 40px -14px rgba(22,20,18,0.2), 0 0 0 1px rgba(255,255,255,0.5)",
        premium:
          "0 2px 4px rgba(22,20,18,0.04), 0 24px 64px -28px rgba(22,20,18,0.22)",
      },
      letterSpacing: {
        luxury: "0.32em",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slow-zoom": "slowZoom 24s ease-in-out infinite alternate",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.07)" },
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
