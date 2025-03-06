/// <reference types="vitest" />
import { codecovVitePlugin } from '@codecov/vite-plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { ViteUserConfig, configDefaults, defineConfig } from 'vitest/config'
import packageJson from './package.json'
const isTest = process.env.NODE_ENV === 'test'

const Config: ViteUserConfig = {
  test: {
    // Do not process css files (is slow)
    // css: {
    //   include: /.+/,
    // },
    globals: true,
    clearMocks: true,
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['verbose'],
    coverage: {
      provider: 'istanbul', //'v8',
      reporter: ['text', 'json-summary', 'json', 'clover', 'html'],
      reportsDirectory: 'coverage/vitest',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        'src/app/assets/**/*',
        'src/configs/**/*',
        'src/constants/**/*',
        'src/lib/e2e/**/*',
        'src/lib/support/**/*',
        'src/lib/serviceworker/**/*',
        'src/lib/openapi/generated/**/*',
        'src/**/*.mock.{ts,tsx}',
        'src/**/*.stories.tsx',
        'src/**/*.d.ts',
      ],
      reportOnFailure: true,
      thresholds: {
        lines: 70,
        branches: 50,
        functions: 70,
        statements: 70,
        // autoUpdate: true, // Update thresholds when writing tests, disabled due to refactoring tests changes coverage
      },
    },
    environment: 'jsdom',
    setupFiles: ['src/configs/vitest.setup.ts', 'vitest-localstorage-mock'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
}

export default defineConfig({
  base: process.env.BASE_URL,
  define: {
    'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(packageJson.version),
    'process.env': process.env,
  },
  assetsInclude: ['./sb-preview/runtime.js'],
  plugins: [
    react(),
    tsconfigPaths(),
    !isTest && TanStackRouterVite(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'screen-geometry-app',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  resolve: {
    // alias: {
    //   '@': 'src/',
    // },
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  test: Config.test,
})
