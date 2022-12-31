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
        hoverLight: "#F4F4F4",
        hoverDark: "#1A1A1A",
      }
    },
  },
  plugins: [],
}
