/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rounded: ["Your-Font-Name-Here"],
        mono: ["SpaceMono"],
      },
    },
  },
  plugins: [],
};
