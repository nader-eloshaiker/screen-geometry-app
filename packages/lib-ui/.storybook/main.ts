import type { AddonOptionsVite } from '@storybook/addon-coverage'
import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
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
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('storybook-addon-pseudo-states'),
    {
      name: getAbsolutePath('@storybook/addon-coverage'),
      options: coverageConfig,
    },
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  features: {},
  docs: {},
  core: {
    disableTelemetry: true,
  },
}
export default config

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
