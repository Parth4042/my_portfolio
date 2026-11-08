import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",     // primary black
        coal: "#121212",    // surface
        ash: "#2A2A2A",     // borders
        smoke: "#8A8A8A",   // muted text
        bone: "#F4F1EC",    // warm white
        blood: "#E10600",   // signature red
        ember: "#FF3B30",   // highlight red
        wine: "#6B0A0A",    // deep red
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        scrollDot: { "0%": { transform: "translateY(0)", opacity: "1" }, "100%": { transform: "translateY(18px)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        scrollDot: "scrollDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
