/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  // mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "../../packages/tailwind/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "425px",
        "2xs": "375px",
        "3xs": "320px",
        ...defaultTheme.screens,
        "3xl": "1600px",
      },
      colors: {
        background: "hsl(var(background) / <alpha-value>)",
        muted: "hsl(var(muted) / <alpha-value>)",
        foreground: {
          DEFAULT: "hsl(var(foreground) / <alpha-value>)",
          muted: "hsl(var(foreground-muted) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(card) / <alpha-value>)",
          border: "hsl(var(card-border) / <alpha-value>)",
          "border-hover": "hsl(var(card-border-hover) / <alpha-value>)",
          foreground: "hsl(var(card-foreground) / <alpha-value>)",
        },
        header: {
          DEFAULT: "hsl(var(header) / <alpha-value>)",
          hover: "hsl(var(header-hover) / <alpha-value>)",
          active: "hsl(var(header-active) / <alpha-value>)",
          foreground: "hsl(var(header-foreground) / <alpha-value>)",
          "foreground-hover":
            "hsl(var(header-foreground-hover) / <alpha-value>)",
          "foreground-active":
            "hsl(var(header-foreground-active) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(popover) / <alpha-value>)",
          hover: "hsl(var(popover-hover) / <alpha-value>)",
          active: "hsl(var(popover-active) / <alpha-value>)",
          foreground: "hsl(var(popover-foreground) / <alpha-value>)",
          "foreground-hover":
            "hsl(var(popover-foreground-hover) / <alpha-value>)",
          "foreground-active":
            "hsl(var(popover-foreground-active) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(primary) / <alpha-value>)",
          hover: "hsl(var(primary-hover) / <alpha-value>)",
          active: "hsl(var(primary-active) / <alpha-value>)",
          muted: "hsl(var(primary-muted) / <alpha-value>)",
          ring: "hsl(var(primary-ring) / <alpha-value>)",
          label: "hsl(var(primary-label) / <alpha-value>)",
          foreground: {
            DEFAULT: "hsl(var(primary-foreground) / <alpha-value>)",
            hover: "hsl(var(primary-foreground-hover) / <alpha-value>)",
            active: "hsl(var(primary-foreground-active) / <alpha-value>)",
            muted: "hsl(var(primary-foreground-muted) / <alpha-value>)",
            input: {
              DEFAULT: "hsl(var(primary-foreground-input) / <alpha-value>)",
              hover: "hsl(var(primary-foreground-input-hover) / <alpha-value>)",
            },
          },
          border: {
            DEFAULT: "hsl(var(primary-border) / <alpha-value>)",
            hover: "hsl(var(primary-border-hover) / <alpha-value>)",
          },
          input: "hsl(var(primary-input) / <alpha-value>)",
          50: "hsl(var(primary-50) / <alpha-value>)",
          100: "hsl(var(primary-100) / <alpha-value>)",
          200: "hsl(var(primary-200) / <alpha-value>)",
          300: "hsl(var(primary-300) / <alpha-value>)",
          400: "hsl(var(primary-400) / <alpha-value>)",
          500: "hsl(var(primary-500) / <alpha-value>)",
          600: "hsl(var(primary-600) / <alpha-value>)",
          700: "hsl(var(primary-700) / <alpha-value>)",
          800: "hsl(var(primary-800) / <alpha-value>)",
          900: "hsl(var(primary-900) / <alpha-value>)",
          950: "hsl(var(primary-950) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(secondary) / <alpha-value>)",
          hover: "hsl(var(secondary-hover) / <alpha-value>)",
          active: "hsl(var(secondary-active) / <alpha-value>)",
          muted: "hsl(var(secondary-muted) / <alpha-value>)",
          ring: "hsl(var(secondary-ring) / <alpha-value>)",
          label: "hsl(var(secondary-label) / <alpha-value>)",
          foreground: {
            DEFAULT: "hsl(var(secondary-foreground) / <alpha-value>)",
            hover: "hsl(var(secondary-foreground-hover) / <alpha-value>)",
            active: "hsl(var(secondary-foreground-active) / <alpha-value>)",
            muted: "hsl(var(secondary-foreground-muted) / <alpha-value>)",
            input: {
              DEFAULT: "hsl(var(secondary-foreground-input) / <alpha-value>)",
              hover:
                "hsl(var(secondary-foreground-input-hover) / <alpha-value>)",
            },
          },
          border: {
            DEFAULT: "hsl(var(secondary-border) / <alpha-value>)",
            hover: "hsl(var(secondary-border-hover) / <alpha-value>)",
          },
          input: "hsl(var(secondary-input) / <alpha-value>)",
        },
        mono: {
          DEFAULT: "hsl(var(mono) / <alpha-value>)",
          hover: "hsl(var(mono-hover) / <alpha-value>)",
          active: "hsl(var(mono-active) / <alpha-value>)",
          muted: "hsl(var(mono-muted) / <alpha-value>)",
          ring: "hsl(var(mono-ring) / <alpha-value>)",
          label: "hsl(var(mono-label) / <alpha-value>)",
          foreground: {
            DEFAULT: "hsl(var(mono-foreground) / <alpha-value>)",
            hover: "hsl(var(mono-foreground-hover) / <alpha-value>)",
            active: "hsl(var(mono-foreground-active) / <alpha-value>)",
            muted: "hsl(var(mono-foreground-muted) / <alpha-value>)",
            input: {
              DEFAULT: "hsl(var(mono-foreground-input) / <alpha-value>)",
              hover: "hsl(var(mono-foreground-input-hover) / <alpha-value>)",
            },
          },
          border: {
            DEFAULT: "hsl(var(mono-border) / <alpha-value>)",
            hover: "hsl(var(mono-border-hover) / <alpha-value>)",
            active: "hsl(var(mono-border-active) / <alpha-value>)",
          },
          input: "hsl(var(mono-input) / <alpha-value>)",
          50: "hsl(var(mono-50) / <alpha-value>)",
          100: "hsl(var(mono-100) / <alpha-value>)",
          200: "hsl(var(mono-200) / <alpha-value>)",
          300: "hsl(var(mono-300) / <alpha-value>)",
          400: "hsl(var(mono-400) / <alpha-value>)",
          500: "hsl(var(mono-500) / <alpha-value>)",
          600: "hsl(var(mono-600) / <alpha-value>)",
          700: "hsl(var(mono-700) / <alpha-value>)",
          800: "hsl(var(mono-800) / <alpha-value>)",
          900: "hsl(var(mono-900) / <alpha-value>)",
          950: "hsl(var(mono-950) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(danger) / <alpha-value>)",
          hover: "hsl(var(danger-hover) / <alpha-value>)",
          active: "hsl(var(danger-active) / <alpha-value>)",
          muted: "hsl(var(danger-muted) / <alpha-value>)",
          ring: "hsl(var(danger-ring) / <alpha-value>)",
          label: "hsl(var(danger-label) / <alpha-value>)",
          foreground: {
            DEFAULT: "hsl(var(danger-foreground) / <alpha-value>)",
            hover: "hsl(var(danger-foreground-hover) / <alpha-value>)",
            active: "hsl(var(danger-foreground-active) / <alpha-value>)",
            muted: "hsl(var(danger-foreground-muted) / <alpha-value>)",
            input: {
              DEFAULT: "hsl(var(danger-foreground-input) / <alpha-value>)",
              hover: "hsl(var(danger-foreground-input-hover) / <alpha-value>)",
            },
          },
          border: {
            DEFAULT: "hsl(var(danger-border) / <alpha-value>)",
            hover: "hsl(var(danger-border-hover) / <alpha-value>)",
          },
          input: "hsl(var(danger-input) / <alpha-value>)",
          50: "hsl(var(danger-50) / <alpha-value>)",
          100: "hsl(var(danger-100) / <alpha-value>)",
          200: "hsl(var(danger-200) / <alpha-value>)",
          300: "hsl(var(danger-300) / <alpha-value>)",
          400: "hsl(var(danger-400) / <alpha-value>)",
          500: "hsl(var(danger-500) / <alpha-value>)",
          600: "hsl(var(danger-600) / <alpha-value>)",
          700: "hsl(var(danger-700) / <alpha-value>)",
          800: "hsl(var(danger-800) / <alpha-value>)",
          900: "hsl(var(danger-900) / <alpha-value>)",
          950: "hsl(var(danger-950) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(success) / <alpha-value>)",
          hover: "hsl(var(success-hover) / <alpha-value>)",
          active: "hsl(var(success-active) / <alpha-value>)",
          muted: "hsl(var(success-muted) / <alpha-value>)",
          ring: "hsl(var(success-ring) / <alpha-value>)",
          label: "hsl(var(success-label) / <alpha-value>)",
          foreground: {
            DEFAULT: "hsl(var(success-foreground) / <alpha-value>)",
            hover: "hsl(var(success-foreground-hover) / <alpha-value>)",
            active: "hsl(var(success-foreground-active) / <alpha-value>)",
            muted: "hsl(var(success-foreground-muted) / <alpha-value>)",
            input: {
              DEFAULT: "hsl(var(success-foreground-input) / <alpha-value>)",
              hover: "hsl(var(success-foreground-input-hover) / <alpha-value>)",
            },
          },
          border: {
            DEFAULT: "hsl(var(success-border) / <alpha-value>)",
            hover: "hsl(var(success-border-hover) / <alpha-value>)",
          },
          input: "hsl(var(success-input) / <alpha-value>)",
          50: "hsl(var(success-50) / <alpha-value>)",
          100: "hsl(var(success-100) / <alpha-value>)",
          200: "hsl(var(success-200) / <alpha-value>)",
          300: "hsl(var(success-300) / <alpha-value>)",
          400: "hsl(var(success-400) / <alpha-value>)",
          500: "hsl(var(success-500) / <alpha-value>)",
          600: "hsl(var(success-600) / <alpha-value>)",
          700: "hsl(var(success-700) / <alpha-value>)",
          800: "hsl(var(success-800) / <alpha-value>)",
          900: "hsl(var(success-900) / <alpha-value>)",
          950: "hsl(var(success-950) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(warning) / <alpha-value>)",
          hover: "hsl(var(warning-hover) / <alpha-value>)",
          active: "hsl(var(warning-active) / <alpha-value>)",
          muted: "hsl(var(warning-muted) / <alpha-value>)",
          ring: "hsl(var(warning-ring) / <alpha-value>)",
          label: "hsl(var(warning-label) / <alpha-value>)",
          foreground: {
            DEFAULT: "hsl(var(warning-foreground) / <alpha-value>)",
            hover: "hsl(var(warning-foreground-hover) / <alpha-value>)",
            active: "hsl(var(warning-foreground-active) / <alpha-value>)",
            muted: "hsl(var(warning-foreground-muted) / <alpha-value>)",
            input: {
              DEFAULT: "hsl(var(warning-foreground-input) / <alpha-value>)",
              hover: "hsl(var(warning-foreground-input-hover) / <alpha-value>)",
            },
          },
          border: {
            DEFAULT: "hsl(var(warning-border) / <alpha-value>)",
            hover: "hsl(var(warning-border-hover) / <alpha-value>)",
          },
          input: "hsl(var(warning-input) / <alpha-value>)",
          50: "hsl(var(warning-50) / <alpha-value>)",
          100: "hsl(var(warning-100) / <alpha-value>)",
          200: "hsl(var(warning-200) / <alpha-value>)",
          300: "hsl(var(warning-300) / <alpha-value>)",
          400: "hsl(var(warning-400) / <alpha-value>)",
          500: "hsl(var(warning-500) / <alpha-value>)",
          600: "hsl(var(warning-600) / <alpha-value>)",
          700: "hsl(var(warning-700) / <alpha-value>)",
          800: "hsl(var(warning-800) / <alpha-value>)",
          900: "hsl(var(warning-900) / <alpha-value>)",
          950: "hsl(var(warning-950) / <alpha-value>)",
        },
        chart: {
          1: "hsl(var(chart-1) / <alpha-value>)",
          2: "hsl(var(chart-2) / <alpha-value>)",
          3: "hsl(var(chart-3) / <alpha-value>)",
          4: "hsl(var(chart-4) / <alpha-value>)",
          5: "hsl(var(chart-5) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(radius)",
        md: "calc(var(radius) - 2px)",
        sm: "calc(var(radius) - 4px)",
      },
      textShadow: {
        "bold-sm": "0.02rem 0.02rem 0 currentColor",
        "bold-md": "0.025rem 0.03rem 0 currentColor",
        "bold-lg": "0.03rem 0.04rem 0 currentColor",
      },
    },
  },
  plugins: [
    tailwindAnimate,
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
    // plugin(function ({ addBase, theme }) {
    //   addBase({
    //     ":root": {
    //       /* Shark */
    //       "mono-50": "180 5% 96%",
    //       "mono-100": "180 6% 90%",
    //       "mono-200": "192 5% 82%",
    //       "mono-300": "188 5% 69%",
    //       "mono-400": "186 4% 53%",
    //       "mono-500": "195 6% 43%",
    //       "mono-600": "192 5% 36%",
    //       "mono-700": "190 4% 31%",
    //       "mono-800": "200 4% 27%",
    //       "mono-900": "204 4% 24%",
    //       "mono-950": "200 4% 14%",

    //       /* Curious Blue */
    //       /*
    //         "primary-50:  203 87% 97%;
    //         "primary-100: 205 75% 94%;
    //         "primary-200: 200 75% 86%;
    //         "primary-300: 199 76% 74%;
    //         "primary-400: 198 75% 60%;
    //         "primary-500: 199 71% 45%;
    //         "primary-600: 200 79% 39%;
    //         "primary-700: 201 77% 32%;
    //         "primary-800: 201 73% 27%;
    //         "primary-900: 202 64% 24%;
    //         "primary-950: 204 65% 16%;
    //       */

    //       /* Medium Purple */
    //       "primary-50": "264 100% 98%",
    //       "primary-100": "262 100% 97%",
    //       "primary-200": "262 100% 92%",
    //       "primary-300": "263 100% 85%",
    //       "primary-400": "263 100% 75%",
    //       "primary-500": "264 95% 68%",
    //       "primary-600": "265 85% 56%",
    //       "primary-700": "265 75% 47%",
    //       "primary-800": "266 70% 39%",
    //       "primary-900": "267 68% 32%",
    //       "primary-950": "267 91% 21%",

    //       /* California */
    //       "warning-50": "48 100% 96%",
    //       "warning-100": "48 96% 89%",
    //       "warning-200": "48 97% 77%",
    //       "warning-300": "46 97% 65%",
    //       "warning-400": "43 96% 56%",
    //       "warning-500": "38 92% 50%",
    //       "warning-600": "32 95% 44%",
    //       "warning-700": "26 90% 37%",
    //       "warning-800": "23 83% 31%",
    //       "warning-900": "22 78% 26%",
    //       "warning-950": "21 92% 14%",

    //       /* Pastel Green */
    //       "success-50": "104 65% 97%",
    //       "success-100": "102 68% 93%",
    //       "success-200": "103 63% 85%",
    //       "success-300": "104 61% 66%",
    //       "success-400": "104 55% 58%",
    //       "success-500": "104 56% 45%",
    //       "success-600": "104 61% 36%",
    //       "success-700": "104 57% 29%",
    //       "success-800": "105 51% 24%",
    //       "success-900": "106 50% 20%",
    //       "success-950": "107 65% 10%",

    //       /* Coral Red */
    //       "danger-50": "0 86% 97%",
    //       "danger-100": "0 93% 94%",
    //       "danger-200": "0 96% 89%",
    //       "danger-300": "0 94% 82%",
    //       "danger-400": "0 91% 71%",
    //       "danger-500": "0 84% 60%",
    //       "danger-600": "0 72% 51%",
    //       "danger-700": "0 74% 42%",
    //       "danger-800": "0 70% 35%",
    //       "danger-900": "0 63% 31%",
    //       "danger-950": "0 75% 15%",

    //       radius: "0.5rem",
    //       "ring-offset": "4px",

    //       background: "var(mono-50)",
    //       foreground: "var(mono-950)",
    //       muted: "var(mono-200)",
    //       "foreground-muted": "var(mono-500)",

    //       card: "var(primary-50)",
    //       "card-border": "var(primary-200)",
    //       "card-border-hover": "var(primary-300)",
    //       "card-foreground": "var(primary-800)",

    //       popover: "var(mono-100)",
    //       "popover-hover": "var(mono-500)",
    //       "popover-active": "var(mono-500)",
    //       "popover-foreground": "var(mono-900)",
    //       "popover-foreground-hover": "var(mono-100)",
    //       "popover-foreground-active": "var(mono-100)",

    //       header: "var(primary-600)",
    //       "header-hover": "var(primary-400)",
    //       "header-active": "var(primary-400)",
    //       "header-foreground": "var(primary-200)",
    //       "header-foreground-hover": "var(primary-100)",
    //       "header-foreground-active": "var(primary-100)",

    //       primary: "var(primary-600)",
    //       "primary-active": "var(primary-300)",
    //       "primary-hover": "var(primary-500)",
    //       "primary-muted": "var(primary-200)",
    //       "primary-ring": "var(primary-400)",
    //       "primary-input": "var(primary-50)",
    //       "primary-label": "var(primary-600)",
    //       "primary-border": "var(primary-400)",
    //       "primary-border-hover": "var(primary-600)",
    //       "primary-foreground": "var(primary-100)",
    //       "primary-foreground-active": "var(primary-950)",
    //       "primary-foreground-hover": "var(primary-50)",
    //       "primary-foreground-muted": "var(primary-400)",
    //       "primary-foreground-input": "var(primary-800)",
    //       "primary-foreground-input-hover": "var(primary-900)",

    //       secondary: "var(primary-400)",
    //       "secondary-active": "var(primary-200)",
    //       "secondary-hover": "var(primary-500)",
    //       "secondary-muted": "var(primary-200)",
    //       "secondary-ring": "var(primary-400)",
    //       "secondary-input": "var(primary-50)",
    //       "secondary-label": "var(primary-200)",
    //       "secondary-border": "var(primary-300)",
    //       "secondary-border-hover": "var(primary-500)",
    //       "secondary-foreground": "var(primary-100)",
    //       "secondary-foreground-active": "var(primary-950)",
    //       "secondary-foreground-hover": "var(primary-50)",
    //       "secondary-foreground-muted": "var(primary-400)",
    //       "secondary-foreground-input": "var(primary-500)",
    //       "secondary-foreground-input-hover": "var(primary-600)",

    //       mono: "var(mono-600)",
    //       "mono-active": "var(mono-300)",
    //       "mono-hover": "var(mono-500)",
    //       "mono-muted": "var(mono-200)",
    //       "mono-ring": "var(mono-400)",
    //       "mono-input": "var(mono-50)",
    //       "mono-label": "var(mono-600)",
    //       "mono-border": "var(mono-400)",
    //       "mono-border-hover": "var(mono-600)",
    //       "mono-foreground": "var(mono-100)",
    //       "mono-foreground-active": "var(mono-950)",
    //       "mono-foreground-hover": "var(mono-50)",
    //       "mono-foreground-muted": "var(mono-400)",
    //       "mono-foreground-input": "var(mono-800)",
    //       "mono-foreground-input-hover": "var(mono-900)",

    //       danger: "var(danger-600)",
    //       "danger-active": "var(danger-300)",
    //       "danger-hover": "var(danger-500)",
    //       "danger-muted": "var(danger-200)",
    //       "danger-ring": "var(danger-400)",
    //       "danger-input": "var(danger-50)",
    //       "danger-label": "var(danger-600)",
    //       "danger-border": "var(danger-400)",
    //       "danger-border-hover": "var(danger-600)",
    //       "danger-foreground": "var(primary-100)",
    //       "danger-foreground-active": "var(danger-950)",
    //       "danger-foreground-hover": "var(danger-50)",
    //       "danger-foreground-muted": "var(danger-400)",
    //       "danger-foreground-input": "var(danger-800)",
    //       "danger-foreground-input-hover": "var(danger-900)",

    //       success: "var(success-600)",
    //       "success-active": "var(success-300)",
    //       "success-hover": "var(success-500)",
    //       "success-muted": "var(success-200)",
    //       "success-ring": "var(success-400)",
    //       "success-input": "var(success-50)",
    //       "success-label": "var(success-600)",
    //       "success-border": "var(success-400)",
    //       "success-border-hover": "var(success-600)",
    //       "success-foreground": "var(primary-100)",
    //       "success-foreground-active": "var(success-950)",
    //       "success-foreground-hover": "var(success-50)",
    //       "success-foreground-muted": "var(success-400)",
    //       "success-foreground-input": "var(success-800)",
    //       "success-foreground-input-hover": "var(success-900)",

    //       warning: "var(warning-600)",
    //       "warning-active": "var(warning-300)",
    //       "warning-hover": "var(warning-500)",
    //       "warning-muted": "var(warning-200)",
    //       "warning-ring": "var(warning-400)",
    //       "warning-input": "var(warning-50)",
    //       "warning-label": "var(warning-600)",
    //       "warning-border": "var(warning-400)",
    //       "warning-border-hover": "var(warning-600)",
    //       "warning-foreground": "var(primary-100)",
    //       "warning-foreground-active": "var(warning-950)",
    //       "warning-foreground-hover": "var(warning-50)",
    //       "warning-foreground-muted": "var(warning-400)",
    //       "warning-foreground-input": "var(warning-800)",
    //       "warning-foreground-input-hover": "var(warning-900)",

    //       "chart-1": "var(info-500)",
    //       "chart-2": "var(info-600)",
    //       "chart-3": "var(info-700)",
    //       "chart-4": "var(info-800)",
    //       "chart-5": "var(info-900)",
    //     },
    //     ".dark": {
    //       ":root": {
    //         background: "var(mono-950)",
    //         foreground: "var(mono-50)",
    //         muted: "var(mono-900)",
    //         "foreground-muted": "var(mono-300)",

    //         card: "var(mono-900)",
    //         "card-border": "var(mono-600)",
    //         "card-border-hover": "var(mono-500)",
    //         "card-foreground": "var(mono-200)",

    //         popover: "var(mono-900)",
    //         "popover-hover": "var(mono-500)",
    //         "popover-active": "var(mono-500)",
    //         "popover-foreground": "var(mono-100)",
    //         "popover-foreground-hover": "var(mono-50)",
    //         "popover-foreground-active": "var(mono-50)",

    //         "primary-label": "var(primary-400)",

    //         "secondary-label": "var(primary-200)",

    //         "mono-label": "var(mono-300)",

    //         "danger-label": "var(danger-400)",

    //         "success-label": "var(success-400)",

    //         "warning-label": "var(warning-400)",
    //       },
    //     },
    //   });
    // }),
  ],
  darkMode: ["class", '[data-theme="dark"]'],
};
