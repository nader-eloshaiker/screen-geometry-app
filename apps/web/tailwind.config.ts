import shareConfig from '@screengeometry/lib-style/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,html}',
    './index.html',
    '../../packages/lib-ui/src/**/*.{ts,tsx,html}',
    '../../packages/lib-style/src/**/*.{ts,tsx,html}',
  ],
  presets: [shareConfig],
}

export default config
