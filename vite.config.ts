/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import { configDefaults, UserConfig as VitestUserConfigInterface } from 'vitest/config'
import packageJson from './package.json'

const viteTest: VitestUserConfigInterface = {
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
        'src/reportWebVitals.ts',
        'src/test/**/*',
        'src/assets/**/*',
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
    setupFiles: 'src/test/vitest.setup.ts',
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
      '@assets': path.resolve(__dirname, '/src/assets'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@constants': path.resolve(__dirname, '/src/constants'),
      '@contexts': path.resolve(__dirname, '/src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, '/src/models'),
      '@openapi': path.resolve(__dirname, '/src/openapi'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@routes': path.resolve(__dirname, '/src/routes'),
      '@server': path.resolve(__dirname, '/src/server'),
      '@serviceworker': path.resolve(__dirname, '/src/service-worker'),
      '@test': path.resolve(__dirname, '/src/test'),
      '@utils': path.resolve(__dirname, '/src/utils'),
    },
  },
  test: viteTest.test,
})
