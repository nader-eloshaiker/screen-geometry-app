import shareConfig from '@screen-geometry-app/style-guide/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,html}', './index.html'],
  presets: [shareConfig],
}

export default config
