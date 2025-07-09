import shareConfig from '@screengeometry/lib-style/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,html}',
    './index.html',
    '../../packages/ui/lib/**/*.{ts,tsx,html}',
    '../../packages/ui/src/**/*.{ts,tsx,html}',
  ],
  presets: [shareConfig],
}

export default config
