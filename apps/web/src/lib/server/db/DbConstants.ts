export const dbVersionDefault = 3
export const dbNameDefault = 'localforage'

export interface KeyedObject {
  id: string
}

export enum Stores {
  Screens = 'screens',
  Search = 'search',
  DeprecatedLocalForageTable = 'keyvaluepairs',
  DeprecatedLocalForageBlob = 'local-forage-detect-blob-support',
}
