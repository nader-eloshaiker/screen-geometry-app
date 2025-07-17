/// <reference types="vitest" />
import { codecovVitePlugin } from '@codecov/vite-plugin'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import tsconfigPaths from 'vite-tsconfig-paths'
import { ViteUserConfig, configDefaults, defineConfig } from 'vitest/config'
import packageJson from './package.json'

const isTest = process.env.NODE_ENV === 'test'

const Config: ViteUserConfig = {
  test: {
    // Do not error on unhandled rejections
    dangerouslyIgnoreUnhandledErrors: true,

    globals: true,
    clearMocks: true,
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['verbose'],
    coverage: {
      provider: 'istanbul', //'v8',
      reporter: ['text', 'json-summary', 'json', 'clover', 'html'],
      reportsDirectory: '../../coverage/unit/web',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        '**/assets',
        'src/app/routes',
        'src/lib',
        'src/**/*.mock.{ts,tsx}',
        'src/**/*.stories.tsx',
        'src/**/*.d.ts',
      ],
      reportOnFailure: true,
      // thresholds: {
      //   lines: 70,
      //   branches: 50,
      //   functions: 60,
      //   statements: 70,
      //   // autoUpdate: true, // Update thresholds when writing tests, disabled due to refactoring tests changes coverage
      // },
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
    'import.meta.env.VITE_GA_TRACKING_ID': process.env.GA_TRACKING_ID,
  },
  assetsInclude: ['./sb-preview/runtime.js'],
  plugins: [
    tsconfigPaths(),
    !isTest &&
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/app/routes',
        generatedRouteTree: 'src/app/routes/routeTree.gen.ts',
        routeFileIgnorePattern: '\\.(test|spec)\\.[jt]sx?$',
        quoteStyle: 'single',
        routeFileIgnorePrefix: '-',
      }),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'screen-geometry-app',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  resolve: {
    // alias: {
    //   '@': 'src/',
    // },
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  test: Config.test,
})
