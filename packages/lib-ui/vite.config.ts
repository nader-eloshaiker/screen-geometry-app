import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  assetsInclude: ['./sb-preview/runtime.js'],
  plugins: [react(), tailwindcss(), tsconfigPaths()],
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
        'src/configs/**/*',
        'src/lib/**/*',
        'src/**/*.mock.{ts,tsx}',
        'src/**/*.stories.tsx',
        'src/**/*.d.ts',
      ],
      reportOnFailure: true,
    },
    environment: 'jsdom',
    setupFiles: ['src/configs/vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
