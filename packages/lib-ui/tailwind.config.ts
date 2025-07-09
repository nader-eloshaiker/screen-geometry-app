import shareConfig from '@screengeometry/lib-style/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./lib/**/*.{ts,tsx,html}', './src/**/*.{ts,tsx,html}', './index.html'],
  presets: [shareConfig],
}

export default config
