/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
import typograhpy from '@tailwindcss/typography'
import daisyui from 'daisyui'
import colors from 'tailwindcss/colors'

module.exports = {
  content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
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
  plugins: [forms, typograhpy, daisyui],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
