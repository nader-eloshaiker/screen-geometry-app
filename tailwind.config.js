/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

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
        background: 'hsl(var(--background) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        foreground: {
          DEFAULT: 'hsl(var(--foreground) / <alpha-value>)',
          muted: 'hsl(var(--foreground-muted) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          border: 'hsl(var(--card-border) / <alpha-value>)',
          'border-hover': 'hsl(var(--card-border-hover) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        header: {
          DEFAULT: 'hsl(var(--header) / <alpha-value>)',
          hover: 'hsl(var(--header-hover) / <alpha-value>)',
          active: 'hsl(var(--header-active) / <alpha-value>)',
          foreground: 'hsl(var(--header-foreground) / <alpha-value>)',
          'foreground-hover': 'hsl(var(--header-foreground-hover) / <alpha-value>)',
          'foreground-active': 'hsl(var(--header-foreground-active) / <alpha-value>)',
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
          muted: 'hsl(var(--primary-muted) / <alpha-value>)',
          ring: 'hsl(var(--primary-ring) / <alpha-value>)',
          label: 'hsl(var(--primary-label) / <alpha-value>)',
          foreground: {
            DEFAULT: 'hsl(var(--primary-foreground) / <alpha-value>)',
            hover: 'hsl(var(--primary-foreground-hover) / <alpha-value>)',
            active: 'hsl(var(--primary-foreground-active) / <alpha-value>)',
            muted: 'hsl(var(--primary-foreground-muted) / <alpha-value>)',
            input: {
              DEFAULT: 'hsl(var(--primary-foreground-input) / <alpha-value>)',
              hover: 'hsl(var(--primary-foreground-input-hover) / <alpha-value>)',
            },
          },
          border: {
            DEFAULT: 'hsl(var(--primary-border) / <alpha-value>)',
            hover: 'hsl(var(--primary-border-hover) / <alpha-value>)',
          },
          input: 'hsl(var(--primary-input) / <alpha-value>)',
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
          950: 'hsl(var(--primary-950) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          hover: 'hsl(var(--secondary-hover) / <alpha-value>)',
          active: 'hsl(var(--secondary-active) / <alpha-value>)',
          muted: 'hsl(var(--secondary-muted) / <alpha-value>)',
          ring: 'hsl(var(--secondary-ring) / <alpha-value>)',
          label: 'hsl(var(--secondary-label) / <alpha-value>)',
          foreground: {
            DEFAULT: 'hsl(var(--secondary-foreground) / <alpha-value>)',
            hover: 'hsl(var(--secondary-foreground-hover) / <alpha-value>)',
            active: 'hsl(var(--secondary-foreground-active) / <alpha-value>)',
            muted: 'hsl(var(--secondary-foreground-muted) / <alpha-value>)',
            input: {
              DEFAULT: 'hsl(var(--secondary-foreground-input) / <alpha-value>)',
              hover: 'hsl(var(--secondary-foreground-input-hover) / <alpha-value>)',
            },
          },
          border: {
            DEFAULT: 'hsl(var(--secondary-border) / <alpha-value>)',
            hover: 'hsl(var(--secondary-border-hover) / <alpha-value>)',
          },
          input: 'hsl(var(--secondary-input) / <alpha-value>)',
        },
        mono: {
          DEFAULT: 'hsl(var(--mono) / <alpha-value>)',
          hover: 'hsl(var(--mono-hover) / <alpha-value>)',
          active: 'hsl(var(--mono-active) / <alpha-value>)',
          muted: 'hsl(var(--mono-muted) / <alpha-value>)',
          ring: 'hsl(var(--mono-ring) / <alpha-value>)',
          label: 'hsl(var(--mono-label) / <alpha-value>)',
          foreground: {
            DEFAULT: 'hsl(var(--mono-foreground) / <alpha-value>)',
            hover: 'hsl(var(--mono-foreground-hover) / <alpha-value>)',
            active: 'hsl(var(--mono-foreground-active) / <alpha-value>)',
            muted: 'hsl(var(--mono-foreground-muted) / <alpha-value>)',
            input: {
              DEFAULT: 'hsl(var(--mono-foreground-input) / <alpha-value>)',
              hover: 'hsl(var(--mono-foreground-input-hover) / <alpha-value>)',
            },
          },
          border: {
            DEFAULT: 'hsl(var(--mono-border) / <alpha-value>)',
            hover: 'hsl(var(--mono-border-hover) / <alpha-value>)',
            active: 'hsl(var(--mono-border-active) / <alpha-value>)',
          },
          input: 'hsl(var(--mono-input) / <alpha-value>)',
          50: 'hsl(var(--mono-50) / <alpha-value>)',
          100: 'hsl(var(--mono-100) / <alpha-value>)',
          200: 'hsl(var(--mono-200) / <alpha-value>)',
          300: 'hsl(var(--mono-300) / <alpha-value>)',
          400: 'hsl(var(--mono-400) / <alpha-value>)',
          500: 'hsl(var(--mono-500) / <alpha-value>)',
          600: 'hsl(var(--mono-600) / <alpha-value>)',
          700: 'hsl(var(--mono-700) / <alpha-value>)',
          800: 'hsl(var(--mono-800) / <alpha-value>)',
          900: 'hsl(var(--mono-900) / <alpha-value>)',
          950: 'hsl(var(--mono-950) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger) / <alpha-value>)',
          hover: 'hsl(var(--danger-hover) / <alpha-value>)',
          active: 'hsl(var(--danger-active) / <alpha-value>)',
          muted: 'hsl(var(--danger-muted) / <alpha-value>)',
          ring: 'hsl(var(--danger-ring) / <alpha-value>)',
          label: 'hsl(var(--danger-label) / <alpha-value>)',
          foreground: {
            DEFAULT: 'hsl(var(--danger-foreground) / <alpha-value>)',
            hover: 'hsl(var(--danger-foreground-hover) / <alpha-value>)',
            active: 'hsl(var(--danger-foreground-active) / <alpha-value>)',
            muted: 'hsl(var(--danger-foreground-muted) / <alpha-value>)',
            input: {
              DEFAULT: 'hsl(var(--danger-foreground-input) / <alpha-value>)',
              hover: 'hsl(var(--danger-foreground-input-hover) / <alpha-value>)',
            },
          },
          border: {
            DEFAULT: 'hsl(var(--danger-border) / <alpha-value>)',
            hover: 'hsl(var(--danger-border-hover) / <alpha-value>)',
          },
          input: 'hsl(var(--danger-input) / <alpha-value>)',
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
          muted: 'hsl(var(--success-muted) / <alpha-value>)',
          ring: 'hsl(var(--success-ring) / <alpha-value>)',
          label: 'hsl(var(--success-label) / <alpha-value>)',
          foreground: {
            DEFAULT: 'hsl(var(--success-foreground) / <alpha-value>)',
            hover: 'hsl(var(--success-foreground-hover) / <alpha-value>)',
            active: 'hsl(var(--success-foreground-active) / <alpha-value>)',
            muted: 'hsl(var(--success-foreground-muted) / <alpha-value>)',
            input: {
              DEFAULT: 'hsl(var(--success-foreground-input) / <alpha-value>)',
              hover: 'hsl(var(--success-foreground-input-hover) / <alpha-value>)',
            },
          },
          border: {
            DEFAULT: 'hsl(var(--success-border) / <alpha-value>)',
            hover: 'hsl(var(--success-border-hover) / <alpha-value>)',
          },
          input: 'hsl(var(--success-input) / <alpha-value>)',
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
          muted: 'hsl(var(--warning-muted) / <alpha-value>)',
          ring: 'hsl(var(--warning-ring) / <alpha-value>)',
          label: 'hsl(var(--warning-label) / <alpha-value>)',
          foreground: {
            DEFAULT: 'hsl(var(--warning-foreground) / <alpha-value>)',
            hover: 'hsl(var(--warning-foreground-hover) / <alpha-value>)',
            active: 'hsl(var(--warning-foreground-active) / <alpha-value>)',
            muted: 'hsl(var(--warning-foreground-muted) / <alpha-value>)',
            input: {
              DEFAULT: 'hsl(var(--warning-foreground-input) / <alpha-value>)',
              hover: 'hsl(var(--warning-foreground-input-hover) / <alpha-value>)',
            },
          },
          border: {
            DEFAULT: 'hsl(var(--warning-border) / <alpha-value>)',
            hover: 'hsl(var(--warning-border-hover) / <alpha-value>)',
          },
          input: 'hsl(var(--warning-input) / <alpha-value>)',
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
        'bold-md': '0.025rem 0.03rem 0 currentColor',
        'bold-lg': '0.03rem 0.04rem 0 currentColor',
      },
    },
  },
  plugins: [
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
        { values: theme('textShadow') }
      )
    }),
  ],
  darkMode: ['class', '[data-theme="dark"]'],
}
