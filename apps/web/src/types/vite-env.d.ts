/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_PACKAGE_VERSION: string
  readonly VITE_BUILD_DATE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
