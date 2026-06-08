/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        bg: "#0B0F19",
        surface: "#0F1525",
        primary: "#00F5A0",
        secondary: "#00D9FF",
        accent: "#B14BFF",
        muted: "#8A93A6",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,245,160,0.35)",
        glowCyan: "0 0 40px rgba(0,217,255,0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(ellipse at top, rgba(0,245,160,0.15), transparent 60%)",
        "gradient-brand": "linear-gradient(135deg, #00F5A0 0%, #00D9FF 50%, #B14BFF 100%)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        "fade-in": { "0%": { opacity: 0, transform: "translateY(10px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
