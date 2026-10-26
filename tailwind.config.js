/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      maxWidth: { screen: "72rem" },
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        fg: v("fg"),
        primary: v("primary"),
        secondary: v("secondary"),
        accent: v("accent"),
        muted: v("muted"),
      },
      boxShadow: {
        glow: "0 12px 40px -12px rgb(var(--primary) / 0.5)",
        glowCyan: "0 12px 40px -12px rgb(var(--secondary) / 0.45)",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at 70% 40%, rgb(var(--primary) / 0.10), transparent 60%)",
        "gradient-brand": "linear-gradient(120deg, rgb(var(--primary)), rgb(var(--secondary)))",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "scroll-hint": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};