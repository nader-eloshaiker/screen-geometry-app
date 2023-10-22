/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly PACKAGE_VERSION: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
