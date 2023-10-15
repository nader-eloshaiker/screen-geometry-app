/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
import typograhpy from '@tailwindcss/typography'
import daisyui from 'daisyui'
import daisyuiThemes from 'daisyui/src/theming/themes'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  mode: 'jit',
  content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      screens: {
        xs: '425px',
        '2xs': '375px',
        '3xs': '320px',
        ...defaultTheme.screens,
        '3xl': '1600px',
      },
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
    themes: [
      {
        light: {
          ...daisyuiThemes['[data-theme=light]'],
          '.btn-action': {
            color: '#d1620d',
            'border-color': '#d1620d',
          },
          '.btn-action:hover': {
            color: '#fde68a',
            'border-color': '#d1620d',
            'background-color': '#d1620d',
          },
        },
      },
      'dark',
      {
        dark: {
          ...daisyuiThemes['[data-theme=dark]'],
          '.btn-action': {
            color: '#d1620d',
            'border-color': '#d1620d',
          },
          '.btn-action:hover': {
            color: '#fde68a',
            'border-color': '#d1620d',
            'background-color': '#d1620d',
          },
        },
      },
    ],
  },
}
