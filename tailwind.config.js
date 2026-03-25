/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F2EA",
        ink: "#111111",
        moss: {
          DEFAULT: "#2E6E4D",
          dark: "#24573D",
          light: "#3E8661",
        },
      },
      fontFamily: {
        heading: ["Manrope", "Inter", "sans-serif"],
        body: ["Manrope", "Inter", "sans-serif"],
        logo: ["Michroma", "Manrope", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        soft: "0 12px 28px rgba(17, 17, 17, 0.08)",
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};
