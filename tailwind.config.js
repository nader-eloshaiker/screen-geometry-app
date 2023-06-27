/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'
import daisyui from 'daisyui'

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGray: colors.slate[400],
        darkGray: colors.slate[800],
        lightGreen: colors.emerald[400],
        darkGreen: colors.emerald[800],
        lightPurple: colors.violet[400],
        darkPurple: colors.violet[800],
        lightYellow: colors.amber[400],
        darkYellow: colors.amber[800],
        lightPink: colors.fuchsia[400],
        darkPink: colors.fuchsia[800],
        lightRed: colors.rose[400],
        darkRed: colors.rose[800],
      },
    },
  },
  plugins: [daisyui],
  darkMode: 'class',
}
