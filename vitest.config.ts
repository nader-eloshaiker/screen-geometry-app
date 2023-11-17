import react from '@vitejs/plugin-react'
import { checker } from 'vite-plugin-checker'
import { defineConfig } from 'vitest/config'

// https://vitest.dev/config
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      enableBuild: true,
    }),
  ],
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    environment: 'jsdom',
    setupFiles: 'src/vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
