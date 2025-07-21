/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_GA_TRACKING_ID: string
  readonly VITE_PACKAGE_VERSION: string
  readonly VITE_BUILD_DATE: string
  readonly VITE_GA_TRACKING_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
