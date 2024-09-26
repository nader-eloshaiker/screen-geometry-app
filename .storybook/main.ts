import type { AddonOptionsVite } from '@storybook/addon-coverage'
import type { StorybookConfig } from '@storybook/react-vite'
// import type { AddonOptionsWebpack } from '@storybook/addon-coverage'

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    exclude: [
      'src/app/assets/**',
      'src/configs/**',
      'src/constants/**',
      'src/packages/test/**',
      'src/packages/serviceworker/**',
      'src/packages/openapi/generated/**',
    ],
  },
}

// TODO: review @chromatic-com/storybook

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
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
    disableTelemetry: true, // 👈 Disables telemetry
  },
}
export default config
