/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        body : ['Inter', 'sans-serif'],
        header : ['Nunito', 'sans-serif']
      },
      colors : {
        primary: "#8FBEEA",
        primaryDark: "#1E1E1E",
        accent: "#6097CB",
        accentDark: "#6097CB",
        text: "#28292E",
        textDark: "#FAFAFA",
        card: "#F9FDFF",
        cardDark: "#101010",
        bg: "#FAFAFA",
        bgDark: "#1E1E1E",
        overlay: "#000000e1"
      }
    },
  },
  plugins: [],
}
