/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import tailwindAnimate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  mode: 'jit',
  content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    // colors: {
    //   ...defaultTheme.colors,
    //   lightPrimary: 'rgb(from #0096d6 r g b / <alpha-value>)',
    //   lightLightContent: 'rgb(from #d6f3ff r g b / <alpha-value>)',
    //   LightSecondary: 'rgb(from #9933B3 r g b / <alpha-value>)',
    //   lightSecondaryContent: 'rgb(from #FFE5FF r g b / <alpha-value>)',
    //   lightAccent: 'rgb(from #7FD8FF r g b / <alpha-value>)',
    //   lightAccentContent: 'rgb(from #005980 r g b / <alpha-value>)',
    //   darkPrimary: 'rgb(from #7FD8FF r g b / <alpha-value>)',
    //   darkPrimaryContent: 'rgb(from #005980 r g b / <alpha-value>)',
    //   darkSecondary: 'rgb(from #CC66E6 r g b / <alpha-value>)',
    //   darkSecondaryContent: 'rgb(from #660080 r g b / <alpha-value>)',
    //   darkAccent: 'rgb(from #1A739A r g b / <alpha-value>)',
    //   darkAccentContent: 'rgb(from #E5FFFF r g b / <alpha-value>)',
    // },
    extend: {
      screens: {
        xs: '425px',
        '2xs': '375px',
        '3xs': '320px',
        ...defaultTheme.screens,
        '3xl': '1600px',
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          hover: 'hsl(var(--card-hover) / <alpha-value>)',
          active: 'hsl(var(--card-active) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--card-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--card-foreground-active) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          hover: 'hsl(var(--popover-hover) / <alpha-value>)',
          active: 'hsl(var(--popover-active) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--popover-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--popover-foreground-active) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          hover: 'hsl(var(--primary-hover) / <alpha-value>)',
          active: 'hsl(var(--primary-active) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--primary-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--primary-foreground-active) / <alpha-value>)',
          border: 'hsl(var(--primary-border) / <alpha-value>)',
          input: 'hsl(var(--primary-input) / <alpha-value>)',
          ring: 'hsl(var(--primary-ring) / <alpha-value>)',
          25: 'hsl(var(--primary-25) / <alpha-value>)',
          50: 'hsl(var(--primary-50) / <alpha-value>)',
          100: 'hsl(var(--primary-100) / <alpha-value>)',
          200: 'hsl(var(--primary-200) / <alpha-value>)',
          300: 'hsl(var(--primary-300) / <alpha-value>)',
          400: 'hsl(var(--primary-400) / <alpha-value>)',
          500: 'hsl(var(--primary-500) / <alpha-value>)',
          600: 'hsl(var(--primary-600) / <alpha-value>)',
          700: 'hsl(var(--primary-700) / <alpha-value>)',
          800: 'hsl(var(--primary-800) / <alpha-value>)',
          900: 'hsl(var(--primary-900) / <alpha-value>)',
          925: 'hsl(var(--primary-925) / <alpha-value>)',
          950: 'hsl(var(--primary-950) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          hover: 'hsl(var(--secondary-hover) / <alpha-value>)',
          active: 'hsl(var(--secondary-active) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--secondary-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--secondary-foreground-active) / <alpha-value>)',
          border: 'hsl(var(--secondary-border) / <alpha-value>)',
          input: 'hsl(var(--secondary-input) / <alpha-value>)',
          ring: 'hsl(var(--secondary-ring) / <alpha-value>)',
        },
        neutral: {
          DEFAULT: 'hsl(var(--neutral) / <alpha-value>)',
          hover: 'hsl(var(--neutral-hover) / <alpha-value>)',
          active: 'hsl(var(--neutral-active) / <alpha-value>)',
          foreground: 'hsl(var(--neutral-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--neutral-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--neutral-foreground-active) / <alpha-value>)',
          border: 'hsl(var(--neutral-border) / <alpha-value>)',
          input: 'hsl(var(--neutral-input) / <alpha-value>)',
          ring: 'hsl(var(--neutral-ring) / <alpha-value>)',
          25: 'hsl(var(--neutral-25) / <alpha-value>)',
          50: 'hsl(var(--neutral-50) / <alpha-value>)',
          100: 'hsl(var(--neutral-100) / <alpha-value>)',
          200: 'hsl(var(--neutral-200) / <alpha-value>)',
          300: 'hsl(var(--neutral-300) / <alpha-value>)',
          400: 'hsl(var(--neutral-400) / <alpha-value>)',
          500: 'hsl(var(--neutral-500) / <alpha-value>)',
          600: 'hsl(var(--neutral-600) / <alpha-value>)',
          700: 'hsl(var(--neutral-700) / <alpha-value>)',
          800: 'hsl(var(--neutral-800) / <alpha-value>)',
          900: 'hsl(var(--neutral-900) / <alpha-value>)',
          925: 'hsl(var(--neutral-925) / <alpha-value>)',
          950: 'hsl(var(--neutral-950) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger) / <alpha-value>)',
          hover: 'hsl(var(--danger-hover) / <alpha-value>)',
          active: 'hsl(var(--danger-active) / <alpha-value>)',
          foreground: 'hsl(var(--danger-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--danger-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--danger-foreground-active) / <alpha-value>)',
          ring: 'hsl(var(--danger-ring) / <alpha-value>)',
          input: 'hsl(var(--danger-input) / <alpha-value>)',
          border: 'hsl(var(--danger-border) / <alpha-value>)',
          50: 'hsl(var(--danger-50) / <alpha-value>)',
          100: 'hsl(var(--danger-100) / <alpha-value>)',
          200: 'hsl(var(--danger-200) / <alpha-value>)',
          300: 'hsl(var(--danger-300) / <alpha-value>)',
          400: 'hsl(var(--danger-400) / <alpha-value>)',
          500: 'hsl(var(--danger-500) / <alpha-value>)',
          600: 'hsl(var(--danger-600) / <alpha-value>)',
          700: 'hsl(var(--danger-700) / <alpha-value>)',
          800: 'hsl(var(--danger-800) / <alpha-value>)',
          900: 'hsl(var(--danger-900) / <alpha-value>)',
          950: 'hsl(var(--danger-950) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          hover: 'hsl(var(--success-hover) / <alpha-value>)',
          active: 'hsl(var(--success-active) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--success-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--success-foreground-active) / <alpha-value>)',
          ring: 'hsl(var(--success-ring) / <alpha-value>)',
          input: 'hsl(var(--success-input) / <alpha-value>)',
          border: 'hsl(var(--success-border) / <alpha-value>)',
          50: 'hsl(var(--success-50) / <alpha-value>)',
          100: 'hsl(var(--success-100) / <alpha-value>)',
          200: 'hsl(var(--success-200) / <alpha-value>)',
          300: 'hsl(var(--success-300) / <alpha-value>)',
          400: 'hsl(var(--success-400) / <alpha-value>)',
          500: 'hsl(var(--success-500) / <alpha-value>)',
          600: 'hsl(var(--success-600) / <alpha-value>)',
          700: 'hsl(var(--success-700) / <alpha-value>)',
          800: 'hsl(var(--success-800) / <alpha-value>)',
          900: 'hsl(var(--success-900) / <alpha-value>)',
          950: 'hsl(var(--success-950) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          hover: 'hsl(var(--warning-hover) / <alpha-value>)',
          active: 'hsl(var(--warning-active) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--warning-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--warning-foreground-active) / <alpha-value>)',
          ring: 'hsl(var(--warning-ring) / <alpha-value>)',
          input: 'hsl(var(--warning-input) / <alpha-value>)',
          border: 'hsl(var(--warning-border) / <alpha-value>)',
          50: 'hsl(var(--warning-50) / <alpha-value>)',
          100: 'hsl(var(--warning-100) / <alpha-value>)',
          200: 'hsl(var(--warning-200) / <alpha-value>)',
          300: 'hsl(var(--warning-300) / <alpha-value>)',
          400: 'hsl(var(--warning-400) / <alpha-value>)',
          500: 'hsl(var(--warning-500) / <alpha-value>)',
          600: 'hsl(var(--warning-600) / <alpha-value>)',
          700: 'hsl(var(--warning-700) / <alpha-value>)',
          800: 'hsl(var(--warning-800) / <alpha-value>)',
          900: 'hsl(var(--warning-900) / <alpha-value>)',
          950: 'hsl(var(--warning-950) / <alpha-value>)',
        },
        chart: {
          1: 'hsl(var(--chart-1) / <alpha-value>)',
          2: 'hsl(var(--chart-2) / <alpha-value>)',
          3: 'hsl(var(--chart-3) / <alpha-value>)',
          4: 'hsl(var(--chart-4) / <alpha-value>)',
          5: 'hsl(var(--chart-5) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      textShadow: {
        'bold-sm': '0.02rem 0.02rem 0 currentColor',
        'bold-md': '0.04rem 0.04rem 0 currentColor',
        'bold-lg': '0.06rem 0.06rem 0 currentColor',
      },
    },
  },
  plugins: [
    daisyui,
    tailwindAnimate,
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus-visible'])
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
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
          accent: '#1A739A',
          'accent-content': '#E5FFFF',
          neutral: '#363230',
          'neutral-content': '#dddbd9',
          'base-100': '#292524',
          'base-200': '#44403c',
          'base-300': '#78716c',
          'base-content': '#cdcfd3',
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
    ],
  },
}
