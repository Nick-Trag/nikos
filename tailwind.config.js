const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require("tailwindcss/plugin");

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
        'slide-in-left': 'slide-in-left 1s linear forwards',
        'slide-in-up': 'slide-in-up 1s linear forwards',
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
        'slide-in-left': {
          from: {
            translate: '4%',
            opacity: 0,
          },
          to: {
            translate: '0',
            opacity: 1,
          },
        },
        'slide-in-up': {
          from: {
            translate: '0 4%',
            opacity: 0,
          },
          to: {
            translate: '0 0',
            opacity: 1,
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
  plugins: [
    // Add an animation-delay property to Tailwind. Reference: https://github.com/tailwindlabs/tailwindcss/discussions/3378#discussioncomment-4177286
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}

