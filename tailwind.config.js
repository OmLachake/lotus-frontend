/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-blue": "#151875",
        "off-navy-blue": "#35fo9e",
        "sky-blue": "#f2f4ff",
        blue: "#2f1ac4",
        pink: "#fb2e86",
        "light-purple": "#e0d3f5",
        purple: "#7e33e0",
        "off-purple": "#9f63b6",
        red: "#fb2448",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        josan: ["Josefin Sans", "sans-serif"],
        rye: ["Rye", "cursive"],
      },
      screens: {
        md: "778px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
