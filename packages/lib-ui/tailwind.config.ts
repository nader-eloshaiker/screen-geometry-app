import shareConfig from '@screengeometry/lib-style/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,html}'],
  presets: [shareConfig],
}

export default config
