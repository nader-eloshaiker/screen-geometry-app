import sharedConfig from '@screengeometry/tailwind-config'
/** @type {import('tailwindcss').Config} */

export default {
  ...sharedConfig,
  content: [
    './packages/components/src/**/*.{js,ts,jsx,tsx,mdx}', // temporary while splitting out components
    './src/**/*.{js,ts,jsx,tsx,html}',
    '!./node_modules',
  ],
}
