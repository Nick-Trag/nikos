const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#373F51",
        lavender: "#D5DCF9",
        'sea-blue': "#0091AD",
      },
      fontFamily: {
        mallanna: ['Mallanna', ...defaultTheme.fontFamily.sans],
        capriola: ['Capriola', 'Mallanna', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

