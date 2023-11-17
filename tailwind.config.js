/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import { themes as daisyuiThemes } from 'daisyui/src/theming/themes'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
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
  plugins: [daisyui],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes['light'],
          // 'color-scheme': 'light',
          primary: '#e37c07',
          'primary-content': '#f5ecdc',
          secondary: '#0483d2',
          'secondary-content': '#c6e4f7',
          accent: '#e600cf',
          'accent-content': '#fcc0f6',
          // neutral: '#2B3440',
          // 'neutral-content': '#D7DDE4',
          // 'base-100': '#ffffff',
          // 'base-200': '#F2F2F2',
          // 'base-300': '#E5E6E6',
          // 'base-content': '#1f2937',
        },
      },
      'dark',
      {
        dark: {
          ...daisyuiThemes['dark'],
          // 'color-scheme': 'dark',
          primary: '#cc5b14',
          'primary-content': '#f5ecdc',
          secondary: '#059cfa',
          'secondary-content': '#d7eefc',
          accent: '#ff0fe8',
          'accent-content': '#ffd4fb',
          // neutral: '#35253c',
          // 'neutral-focus': '#242b33',
          // 'neutral-content': '#A6ADBB',
          // 'base-100': '#1c1917',
          // 'base-200': '#292524',
          // 'base-300': '#44403c',
          // 'base-content': '#A6ADBB',
          // info: '#419ec3',
          // success: '#19cca2',
          // warning: '#fbb565',
          // error: '#fc5985',
        },
      },
    ],
  },
}
