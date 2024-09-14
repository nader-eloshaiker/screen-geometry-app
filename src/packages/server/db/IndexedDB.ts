import { ScreenColor, ScreenItem } from '@packages/openapi/generated'
import fuzzysort from 'fuzzysort'
import { ulid } from 'ulid'
import { SearchDocuments } from './SearchDocuments'

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

const handleRequestError = (
  request: IDBRequest | IDBOpenDBRequest | IDBTransaction,
  reject: (reason: string) => void,
) => {
  request.onerror = () => {
    const error = request.error?.message
    if (error) {
      reject(error)
    } else {
      reject('Unknown error')
    }
  }
}

type dbProps = {
  dbName: string
  dbVersion: number
}

const dbPropsDefault: dbProps = {
  dbName: dbNameDefault,
  dbVersion: dbVersionDefault,
}

const openDatabase = (dbName: string, version: number) => {
  const openReq = indexedDB.open(dbName, version)
  openReq.onblocked = (_event) => {
    // If some other tab is loaded with the database, then it needs to be closed
    // before we can proceed.
    /* istanbul ignore next */
    console.log('Please close all other tabs with this site open!')
  }

  return openReq
}

const openDatabaseTable = ({
  openReq,
  storeName,
  mode,
}: {
  openReq: IDBOpenDBRequest
  storeName: string
  mode: IDBTransactionMode
}) => {
  const db = openReq.result
  const tx = db.transaction(storeName, mode)
  const store = tx.objectStore(storeName)

  // Make sure to add a handler to be notified if another page requests a version
  // change. We must close the database. This allows the other page to upgrade the database.
  // If you don't do this then the upgrade won't happen until the user closes the tab.
  db.onversionchange = (_event) => {
    db.close()
    console.log('A new version of this page is ready. Please reload or close this tab!')
  }

  return { db, tx, store }
}

const seedSearchDocuments = (openReq: IDBOpenDBRequest) =>
  new Promise((resolve) => {
    const db = openReq.result

    const searchStore = db.createObjectStore(Stores.Search, { keyPath: 'id' })
    searchStore.createIndex('name', 'name', { unique: false })
    searchStore.createIndex('aspectRatio', 'aspectRatio', { unique: false })
    searchStore.createIndex('diagonalSize', 'diagonalSize', { unique: false })
    searchStore.createIndex('vRes', 'vRes', { unique: false })
    searchStore.createIndex('hRes', 'hRes', { unique: false })

    const tx = openReq.transaction
    if (!tx) {
      throw new Error('Unable to create transaction')
    }

    const searchTx = tx.objectStore(Stores.Search)
    SearchDocuments.forEach((item) => {
      searchTx.add(item)
    })

    tx.oncomplete = () => {
      resolve(true)
    }
  })

export const initDB = (options?: dbProps): Promise<boolean> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }
  console.log('initDB', dbName, dbVersion)

  return new Promise((resolve) => {
    const openReq = indexedDB.open(dbName, dbVersion)
    openReq.onupgradeneeded = (event) => {
      const db = openReq.result

      console.log('current version:', event.oldVersion)

      if (!db.objectStoreNames.contains(Stores.Screens)) {
        db.createObjectStore(Stores.Screens, { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains(Stores.Search)) {
        seedSearchDocuments(openReq)
      }

      switch (event.oldVersion) {
        case 2: {
          if (!db.objectStoreNames.contains(Stores.DeprecatedLocalForageTable)) {
            break
          }

          console.log('Migrating screens store')

          // get old table data\
          const tx = openReq.transaction
          if (!tx) {
            throw new Error('Unable to create transaction')
          }

          const newStore = tx.objectStore(Stores.Screens)
          const oldStore = tx.objectStore(Stores.DeprecatedLocalForageTable)
          const oldResponse = oldStore.get('screens')

          oldResponse.onsuccess = () => {
            console.log('result', oldResponse.result)

            for (const oldItem of oldResponse.result ?? []) {
              const newItem: ScreenItem = {
                id: ulid(),
                signature: `dSize=${oldItem.tag.diagonalSize}&aRatio=${oldItem.tag.aspectRatio}&hRes=${oldItem.spec.hRes}&vRes=${oldItem.spec.vRes}`,
                visible: oldItem.visible as boolean,
                data: {
                  aspectRatio: oldItem.tag.aspectRatio as string,
                  diagonalSize: oldItem.tag.diagonalSize as number,
                  hRes: oldItem.spec.hRes as number,
                  vRes: oldItem.spec.vRes as number,
                },
                specs: {
                  hAspectRatio: oldItem.data.hAspectRatio as number,
                  vAspectRatio: oldItem.data.vAspectRatio as number,
                  ppi: oldItem.spec.ppi as number,
                  hSize: oldItem.data.hSize as number,
                  vSize: oldItem.data.vSize as number,
                },
                color: oldItem.color as ScreenColor,
              }
              newStore.add(newItem)
            }

            console.log('migration complete, removing old store')
            db.deleteObjectStore(Stores.DeprecatedLocalForageTable)
            db.deleteObjectStore(Stores.DeprecatedLocalForageBlob)
          }
          break
        }

        default: {
          break
        }
      }
    }

    openReq.onsuccess = () => {
      openReq.result.close()
      console.log('openReq.onsuccess - initDB')
      resolve(true)
    }

    openReq.onerror = () => {
      openReq.result.close()
      resolve(false)
    }
  })
}

export const getAllData = <T extends KeyedObject>(storeName: Stores, options?: dbProps): Promise<Array<T>> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { db, store } = openDatabaseTable({ openReq, storeName, mode: 'readonly' })
      const storeReq = store.getAll()
      handleRequestError(storeReq, reject)

      storeReq.onsuccess = () => {
        db.close()
        resolve(storeReq.result as Array<T>)
      }
    }
  })
}

export const getData = <T extends KeyedObject>(
  storeName: Stores,
  key: string,
  options?: dbProps,
): Promise<T | undefined> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { store } = openDatabaseTable({ openReq, storeName, mode: 'readonly' })
      const storeReq = store.get(key)
      handleRequestError(storeReq, reject)

      storeReq.onsuccess = () => {
        resolve(storeReq.result as T)
      }
    }
  })
}

export const addData = <T extends KeyedObject>(
  storeName: string,
  data: Omit<T, keyof KeyedObject>,
  options?: dbProps,
): Promise<T> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { store } = openDatabaseTable({ openReq, storeName, mode: 'readwrite' })
      const id = ulid()
      const storeReq = store.add({ ...data, id })
      handleRequestError(storeReq, reject)

      storeReq.onsuccess = () => {
        resolve({ ...data, id } as T)
      }
    }
  })
}

export const addAllData = <T extends KeyedObject>(
  storeName: string,
  data: Array<Omit<T, keyof KeyedObject>>,
  options?: dbProps,
): Promise<Array<T>> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { tx, store } = openDatabaseTable({ openReq, storeName, mode: 'readwrite' })
      handleRequestError(tx, reject)

      const keyedData = data.map((d) => ({ ...d, id: ulid() }) as T)
      keyedData.forEach((d) => store.add(d))

      tx.oncomplete = () => {
        resolve(keyedData)
      }
    }
  })
}

export const updateData = <T extends KeyedObject>(storeName: string, data: T, options?: dbProps): Promise<T> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { store } = openDatabaseTable({ openReq, storeName, mode: 'readwrite' })
      const storeReq = store.put(data)
      handleRequestError(storeReq, reject)

      storeReq.onsuccess = () => {
        resolve(data)
      }
    }
  })
}

export const deleteData = (storeName: string, key: string, options?: dbProps): Promise<string> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    // again open the connection
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { store } = openDatabaseTable({ openReq, storeName, mode: 'readwrite' })
      const storeReq = store.delete(key)
      handleRequestError(storeReq, reject)

      // add listeners that will resolve the Promise
      storeReq.onsuccess = () => {
        resolve(key)
      }
    }
  })
}

export const searchData = <T extends object>(
  storeName: Stores,
  query: string,
  key: string,
  options?: dbProps,
): Promise<Array<T>> => {
  const { dbName, dbVersion } = { ...dbPropsDefault, ...options }

  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { db, store } = openDatabaseTable({ openReq, storeName, mode: 'readonly' })
      const storeReq = store.getAll()
      handleRequestError(storeReq, reject)

      storeReq.onsuccess = () => {
        db.close()
        const data = storeReq.result as Array<T>

        if (!query) {
          return resolve(data)
        }

        const results = fuzzysort.go<T>(query, data, { key })
        const sorted = results.toSorted((a, b) => b.score - a.score)
        const response = sorted.map((result) => ({
          ...result.obj,
          [key]: result.highlight('<strong>', '</strong>'),
        }))

        resolve(response)
      }
    }
  })
}
