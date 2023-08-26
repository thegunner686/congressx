/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        licorice: "#13070C",
        gunmetal: "#2A2D34",
        "fire-engine-red": "#C1292E",
        "honolulu-blue": "#197BBD",
        aquamarine: "#36F1CD",
        dark: "#373D37",
        "virginia-blue": "#35575F",
        "virginia-brown": "#8C6915",
        "virginia-orange": "#C7760F",
        "va-green": "#818E5C",
        "va-dark-green": "#464C24",
        "house-orange": "#FC995A",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
