/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily : {
        sans : ['Roboto', 'sans-serif'],
        'roboto' : ["Roboto Slab", 'serif'],
        'play' : ["Play", 'sans-serif'],
        'playfair' :["Playfair Display", "serif"],
        'titillium' : ["Titillium Web", "sans-serif"],
        'albert' : ["Albert Sans", 'sans-serif']
      },
    },
  },
  plugins: [],
}

