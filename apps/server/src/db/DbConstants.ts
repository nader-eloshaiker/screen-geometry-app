export const dbVersionDefault = 3
export const dbNameDefault = 'localforage'

export interface KeyedObject {
  id: string
}

export const StoresEnum = {
  Screens: 'screens',
  Search: 'search',
  DeprecatedLocalForageTable: 'keyvaluepairs',
  DeprecatedLocalForageBlob: 'local-forage-detect-blob-support',
} as const
export type StoresEnum = 'screens' | 'search' | 'keyvaluepairs' | 'local-forage-detect-blob-support'
