import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: "#00ff88",
          cyan: "#00d4ff",
          purple: "#a855f7",
          pink: "#ff006e",
        },
        dark: {
          100: "#1a1a2e",
          200: "#16213e",
          300: "#0f0f23",
          400: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,255,136,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,255,136,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
