import sharedConfig from '@screengeometry/tailwind-config/tailwind.config.js'
/** @type {import('tailwindcss').Config} */

export default {
  presets: [sharedConfig],
  content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
}
