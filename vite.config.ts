import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import packageJson from './package.json'

// https://vitejs.dev/config
export default defineConfig({
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      enableBuild: true,
    }),
  ],
})
