import { colors, fontFamily, fontSize, boxShadow } from "./tokens";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: fontFamily,
      fontSize: fontSize,
      boxShadow: boxShadow,
    },
  },
  plugins: [],
};
