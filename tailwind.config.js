/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./renderer/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        foreCast: '666px'
      },
      textColor: {
        temperature: '#F1983D'
      }
    },zIndex: {
      5: '5'
    }
  },
  plugins: [],
}
