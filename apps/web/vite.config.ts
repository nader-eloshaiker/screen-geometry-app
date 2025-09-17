/// <reference types="vitest" />
import { codecovVitePlugin } from '@codecov/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { type ViteUserConfig, configDefaults, defineConfig } from 'vitest/config'
import packageJson from '../../package.json'

const isTest = process.env.NODE_ENV === 'test'

const Config: ViteUserConfig = {
  test: {
    globals: true,
    clearMocks: true,
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['verbose'],
    coverage: {
      provider: 'istanbul', //'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
      reportsDirectory: './coverage/unit',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        '**/assets/**/*',
        'src/app/routes/**/*',
        'src/app/routetree',
        'src/e2e/**/*',
        'src/test/**/*',
        'src/configs/**/*',
        'src/serviceworker/**/*',
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

const now = new Date().toString()
export default defineConfig({
  base: '',
  define: {
    'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(packageJson.version),
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(now),
  },
  assetsInclude: ['./sb-preview/runtime.js'],
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    !isTest &&
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: false,
        routesDirectory: './src/app/routes',
        generatedRouteTree: './src/app/routetree/routeTree.gen.ts',
        // routeFileIgnorePattern: '\\.(test|spec)\\.[jt]sx?$',
        // quoteStyle: 'single',
        // routeFileIgnorePrefix: '-',
      }),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'screen-geometry-app',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
    react(),
  ],
  resolve: {
    // alias: {
    //   '@': 'src/',
    // },
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  test: Config.test,
})
