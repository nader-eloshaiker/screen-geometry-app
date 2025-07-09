import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig, ViteUserConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { dirname, extname, relative, resolve } from 'path'
import { fileURLToPath } from 'url'

import tailwindcss from 'tailwindcss'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

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
      reportsDirectory: 'coverage/unit',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [...configDefaults.exclude, '**/assets/**/*', '**/*.stories.tsx', '**/*.d.ts'],
      reportOnFailure: true,
      // thresholds: {
      //   lines: 70,
      //   branches: 50,
      //   functions: 60,
      //   statements: 70,
      // },
    },
    environment: 'jsdom',
    setupFiles: ['src/configs/vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/// <reference types="vitest" />
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({ include: ['lib'] }), libInjectCss()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-hook-form', 'react-dom', '@screengeometry/lib-style'],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob.sync('lib/**/*.{ts,tsx}').map((file) => [
          // 1. The name of the entry point
          // lib/nested/foo.js becomes nested/foo
          relative('lib', file.slice(0, file.length - extname(file).length)),
          // 2. The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  test: Config.test,
})
