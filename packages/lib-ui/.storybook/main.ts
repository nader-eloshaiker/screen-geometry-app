import type { AddonOptionsVite } from '@storybook/addon-coverage'
import type { StorybookConfig } from '@storybook/react-vite'
// import type { AddonOptionsWebpack } from '@storybook/addon-coverage'

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    exclude: [],
  },
}

// TODO: review @chromatic-com/storybook

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
    '@storybook/addon-docs',
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
