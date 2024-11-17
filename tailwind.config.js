/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": "#00C26F",
        "primaryDark": "#00AC62",
        "dark":"#3E3E3E",
        "darkLight":"#E1E1E1",
        "gray":"#E3E3E3",

        "text": "#494949",
        "textLight": "#7C7C7C",
        "textDark": "#1D1D1D",

        "rose": "#EF4444",
        "roseLight":"#F87171",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      radius: {
        "xs": 10,
        "sm": 12,
        "md": 14,
        "lg": 16,
        "xl": 18,
        "xxl": 22,
      },
    },
  },
  plugins: [],
}