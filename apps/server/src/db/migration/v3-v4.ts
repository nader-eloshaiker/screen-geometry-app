import { StoresEnum } from '../DbConstants'

export const migrateV3toV4 = (db: IDBDatabase, _openReq: IDBOpenDBRequest) => {
  console.log('Migrating search store to v4')

  if (db.objectStoreNames.contains(StoresEnum.Search)) {
    db.deleteObjectStore(StoresEnum.Search)
    console.log('migration complete, removed old search store')
  }
}
