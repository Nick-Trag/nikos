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
      },
      screens: {
        'h-xs': {
          'raw': '(min-height: 150px)'
        },
        'h-sm': {
          'raw': '(min-height: 300px)'
        },
        'h-md': {
          'raw': '(min-height: 450px)'
        },
        'h-lg': {
          'raw': '(min-height: 600px)'
        },
        'h-xl': {
          'raw': '(min-height: 750px)'
        },
        'h-2xl': {
          'raw': '(min-height: 900px)'
        },
      }
    },
  },
  plugins: [],
}

