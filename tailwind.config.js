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
          primary: '#00bda0',
          'primary-content': '#f0fffd',
          secondary: '#e000bf',
          'secondary-content': '#ffebfc',
          accent: '#894eef',
          'accent-content': '#240854',
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
          error: '#dc2626',
          'error-content': '#ffe4e6',
        },
      },
      {
        dark: {
          primary: '#00ffd8',
          'primary-content': '#005c4e',
          secondary: '#ff33e0',
          'secondary-content': '#5c004e',
          accent: '#5b21b6',
          'accent-content': '#d6c3f4',
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
