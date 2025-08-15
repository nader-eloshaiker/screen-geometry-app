import fuzzysort from 'fuzzysort'
import { match } from 'ts-pattern'
import { ulid } from 'ulid'
import { type KeyedObject, StoresEnum, dbNameDefault, dbVersionDefault } from './DbConstants'
import { SearchDocuments } from './SearchDocuments'
import { migrateV2toV3 } from './migration/v2-v3'

const handleRequestError = (
  request: IDBRequest | IDBOpenDBRequest | IDBTransaction,
  reject: (reason: string) => void
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

export const seedSearchDocuments = (openReq: IDBOpenDBRequest) =>
  new Promise((resolve) => {
    const db = openReq.result

    const searchStore = db.createObjectStore(StoresEnum.Search, { keyPath: 'id' })
    searchStore.createIndex('name', 'name', { unique: false })
    searchStore.createIndex('aspectRatio', 'aspectRatio', { unique: false })
    searchStore.createIndex('diagonalSize', 'diagonalSize', { unique: false })
    searchStore.createIndex('vRes', 'vRes', { unique: false })
    searchStore.createIndex('hRes', 'hRes', { unique: false })

    const tx = openReq.transaction
    if (!tx) {
      throw new Error('Unable to create transaction')
    }

    const searchTx = tx.objectStore(StoresEnum.Search)
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

      if (!db.objectStoreNames.contains(StoresEnum.Screens)) {
        db.createObjectStore(StoresEnum.Screens, { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains(StoresEnum.Search)) {
        seedSearchDocuments(openReq)
      }

      match(event)
        .with({ oldVersion: 2 }, () => migrateV2toV3(db, openReq))
        .otherwise(() => {
          console.log('No migration needed')
        })
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

export const getAllData = <T extends KeyedObject>(storeName: StoresEnum, options?: dbProps): Promise<Array<T>> => {
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
  storeName: StoresEnum,
  key: string,
  options?: dbProps
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
  options?: dbProps
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
  options?: dbProps
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
  storeName: StoresEnum,
  query: string,
  key: string,
  options?: dbProps
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
        const response = results.map((result) => ({
          ...result.obj,
          decoratedLabel: result.highlight('<strong>', '</strong>'),
        }))

        resolve(response)
      }
    }
  })
}
