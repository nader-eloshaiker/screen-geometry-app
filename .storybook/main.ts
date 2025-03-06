import type { AddonOptionsVite } from '@storybook/addon-coverage'
import type { StorybookConfig } from '@storybook/react-vite'
// import type { AddonOptionsWebpack } from '@storybook/addon-coverage'

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    exclude: [
      'src/app/assets/**/*',
      'src/configs/**/*',
      'src/constants/**/*',
      'src/lib/e2e/**/*',
      'src/lib/support/**/*',
      'src/lib/serviceworker/**/*',
      'src/lib/openapi/generated/**/*',
    ],
  },
}

// TODO: review @chromatic-com/storybook

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {},
  docs: {},
  core: {
    disableTelemetry: true,
  },
}
export default config
