import sharedConfig from '@screengeometry/tailwind-config/tailwind.config.js'
/** @type {import('tailwindcss').Config} */

export default {
  presets: [sharedConfig],
  content: [
    '../../packages/components/src/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/components/src/**/*.{js,ts,jsx,tsx,mdx}', // temporary while splitting out components
    './src/**/*.{js,ts,jsx,tsx,html}',
    '!./node_modules',
  ],
}
