/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bondis-black': '#252823',
        'bondis-green': '#B1FF73',
        'bondis-text-gray': '#EEEEEE',
        'bondis-gray-secondary': '#828282'
      },
      fontFamily: {
        'inter-regular': 'Inter_400Regular',
        'inter-bold': 'Inter_700Bold',
      }
    },
  },
  plugins: [],
}

