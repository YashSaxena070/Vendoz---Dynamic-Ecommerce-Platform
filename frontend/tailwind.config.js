/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      display: ["'Playfair Display'", "Georgia", "serif"],
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        ink: "#1A1A2E",
        canvas: "#F9F7F4",
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        parchment: "#EDE8E0",
      },
      screens: {
        "400px": "400px",
        "800px": "800px",
        "1000px": "1050px",
        "1100px": "1110px",
        "1300px": "1300px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        slideDown: "slideDown 0.2s ease forwards",
      },
    },
  },
  plugins: [],
};
