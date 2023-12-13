/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import packageJson from './package.json'

// https://vitejs.dev/config
export default defineConfig({
  define: {
    'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
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
      '@api': path.resolve(__dirname, '/src/api'),
      '@assets': path.resolve(__dirname, '/src/assets'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@constants': path.resolve(__dirname, '/src/constants'),
      '@contexts': path.resolve(__dirname, '/src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, '/src/models'),
      '@openapi': path.resolve(__dirname, '/src/generated/openapi'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@routes': path.resolve(__dirname, '/src/routes'),
      '@utils': path.resolve(__dirname, '/src/utils'),
    },
  },
  test: {
    css: {
      include: /.+/,
    },
    globals: true,
    clearMocks: true,
    mockReset: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['src/**/node_modules/**/*', 'src/generated/**/*', 'src/tests/**/*'],
  },
})
