/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly BASE_URL: string
  readonly PACKAGE_VERSION: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
