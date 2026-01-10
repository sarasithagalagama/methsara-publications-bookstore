/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fbf6f3",
          100: "#f5ebe5",
          200: "#edd5c6",
          300: "#e3ba9f",
          400: "#d59470",
          500: "#c87941", // The copper/clay color from reference
          600: "#bc6235",
          700: "#9c4d2e",
          800: "#80402b",
          900: "#673626",
          950: "#381b13",
        },
        secondary: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#1a1a1a", // Dark charcoal from reference
          950: "#0f0f0f",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Sinhala", "sans-serif"],
        serif: ["Playfair Display", "Noto Sans Sinhala", "serif"],
        sinhala: ["Noto Sans Sinhala", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        glow: "0 0 15px rgba(200, 121, 65, 0.5)",
      },
    },
  },
  plugins: [],
};
