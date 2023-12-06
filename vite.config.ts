/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import packageJson from './package.json'

// https://vitejs.dev/config
export default defineConfig({
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      enableBuild: true,
    }),
  ],
  test: {
    css: true,
    globals: true,
    clearMocks: true,
    mockReset: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: 'src/vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['src/**/node_modules/**/*', 'src/generated/**/*'],
  },
})
