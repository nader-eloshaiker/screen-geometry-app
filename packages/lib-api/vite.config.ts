import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig, ViteUserConfig } from 'vitest/config'

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
      reporter: ['text', 'json-summary', 'json', 'html'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        'src/generated/**/*',
        'src/configs/**/*',
        'src/lib/**/*',
        'src/**/*.mock.{ts,tsx}',
        'src/**/*.d.ts',
      ],
      reportOnFailure: true,
    },
    environment: 'jsdom',
    setupFiles: ['src/configs/vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
}
/// <reference types="vitest" />
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: Config.test,
})
