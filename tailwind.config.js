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
    // themes: [
    //   {
    //     light: {
    //       primary: '#d400ff',
    //       'primary-content': '#100016',
    //       secondary: '#00b1dc',
    //       'secondary-content': '#000c11',
    //       accent: '#567d00',
    //       'accent-content': '#dbe5d1',
    //       neutral: '#2e2114',
    //       'neutral-content': '#d1ceca',
    //       'base-100': '#f6ffff',
    //       'base-200': '#d6dede',
    //       'base-300': '#b7bebe',
    //       'base-content': '#151616',
    //       info: '#00f2ff',
    //       'info-content': '#001416',
    //       success: '#9edb2e',
    //       'success-content': '#091101',
    //       warning: '#f07d00',
    //       'warning-content': '#140500',
    //       error: '#c20028',
    //       'error-content': '#fad5d2',
    //     },
    //   },
    //   {
    //     dark: {
    //       primary: '#ff00d7',
    //       'primary-content': '#160011',
    //       secondary: '#00ffd8',
    //       'secondary-content': '#001611',
    //       accent: '#4000ff',
    //       'accent-content': '#cfdaff',
    //       neutral: '#2d0f18',
    //       'neutral-content': '#d2c9cb',
    //       'base-100': '#282737',
    //       'base-200': '#21202e',
    //       'base-300': '#1b1a26',
    //       'base-content': '#cfcfd3',
    //       info: '#00d9ff',
    //       'info-content': '#001116',
    //       success: '#00aa80',
    //       'success-content': '#000b06',
    //       warning: '#ff6c00',
    //       'warning-content': '#160400',
    //       error: '#ff5c64',
    //       'error-content': '#160303',
    //     },
    //   },
    // ],
  },
}
