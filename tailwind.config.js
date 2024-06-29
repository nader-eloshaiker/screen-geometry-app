/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
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
    },
  },
  plugins: [daisyui],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0096d6',
          'primary-content': '#d6f3ff',
          secondary: '#9933B3',
          'secondary-content': '#FFE5FF',
          accent: '#7FD8FF',
          'accent-content': '#005980',
          neutral: '#44403c',
          'neutral-content': '#e7e5e4',
          'base-100': '#f5f5f4',
          'base-200': '#d6d3d1',
          'base-300': '#a8a29e',
          'base-content': '#1c1917',
          info: '#38bdf8',
          'info-content': '#001116',
          success: '#84cc16',
          'success-content': '#000b06',
          warning: '#facc15',
          'warning-content': '#160400',
          error: '#b81e1e',
          'error-content': '#ffe4e6',
        },
      },
      {
        dark: {
          primary: '#7FD8FF',
          'primary-content': '#005980',
          secondary: '#CC66E6',
          'secondary-content': '#660080',
          accent: '#005980',
          'accent-content': '#E5FFFF',
          neutral: '#363230',
          'neutral-content': '#dddbd9',
          'base-100': '#292524',
          'base-200': '#44403c',
          'base-300': '#78716c',
          'base-content': '#cdcfd3',
          info: '#0ea5e9',
          'info-content': '#001116',
          success: '#00c950',
          'success-content': '#000b06',
          warning: '#ffc500',
          'warning-content': '#160400',
          error: '#e11d48',
          'error-content': '#160506',
        },
      },
    ],
  },
}
