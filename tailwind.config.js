/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        primary: "#14b8a6",
        "primary-hover": "#0d9488",
        light: "#e2e8f0",
        lighter: "#f1f5f9",
        lightest: "#f8fafc",
        dark: "#334155",
        gray: "#64748b",
        "light-gray": "#94a3b8",
      },
    },
  },
  plugins: [],
};
