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
      animation: {
        'slow-fade-in': 'slow-fade-in 1.5s linear forwards',
        'slide-in-right': 'slide-in-right 2s linear forwards',
      },
      keyframes: {
        'slow-fade-in': {
          from: {
            opacity: 0,
          },
          '50%': {
            opacity: 0.25,
          },
          to: {
            opacity: 1,
          },
        },
        'slide-in-right': {
          from: {
            right: '-50%',
          },
          to: {
            right: '0',
          },
        },
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

