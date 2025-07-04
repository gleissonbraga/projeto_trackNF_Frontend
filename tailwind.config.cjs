/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/main.tsx", // Caminho atualizado!
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter:['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}