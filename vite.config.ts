import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import { configDefaults, UserConfig as VitestUserConfigInterface } from 'vitest/config'
import packageJson from './package.json'

const VitestUserConfig: VitestUserConfigInterface = {
  test: {
    // Do not process css files (is slow)
    // css: {
    //   include: /.+/,
    // },
    globals: true,
    clearMocks: true,
    mockReset: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'istanbul', //'v8',
      reporter: ['text', 'json-summary', 'json', 'clover', 'html'],
      reportsDirectory: 'reports/coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        'src/assets/**/*',
        'src/configs/**/*',
        'src/constants/**/*',
        'src/packages/test/**/*',
        'src/packages/service-worker/**/*',
        'src/packages/openapi/generated/**/*',
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
    setupFiles: 'src/configs/vitest.setup.ts',
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
    checker({
      typescript: true,
      enableBuild: true,
    }),
  ],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@local/assets': path.resolve(__dirname, '/src/assets'),
      '@local/components': path.resolve(__dirname, '/src/components'),
      '@local/constants': path.resolve(__dirname, '/src/constants'),
      '@local/contexts': path.resolve(__dirname, '/src/contexts'),
      '@local/hooks': path.resolve(__dirname, './src/hooks'),
      '@packages/openapi': path.resolve(__dirname, '/src/packages/openapi'),
      '@local/pages': path.resolve(__dirname, '/src/pages'),
      '@local/routes': path.resolve(__dirname, '/src/routes'),
      '@packages/server': path.resolve(__dirname, '/src/packages/server'),
      '@packages/serviceworker': path.resolve(__dirname, '/src/packages/service-worker'),
      '@packages/test': path.resolve(__dirname, '/src/packages/test'),
      '@packages/uilibrary': path.resolve(__dirname, '/src/packages/ui-library'),
      '@packages/utils': path.resolve(__dirname, '/src/packages/utils'),
    },
  },
  test: VitestUserConfig.test,
})
