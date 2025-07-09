/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/main.tsx", // Caminho atualizado!
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "340px"
      },
      fontFamily: {
        inter:['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}