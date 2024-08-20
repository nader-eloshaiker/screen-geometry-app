import { ulid } from 'ulid'

export const dbVersion = 3
export const dbName = 'localforage'

export interface KeyedObject {
  id: string
}

export enum Stores {
  Screens = 'screens',
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

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const openReq = indexedDB.open(dbName, dbVersion)
    openReq.onupgradeneeded = (event) => {
      const db = openReq.result

      console.log('current version:', event.oldVersion)

      if (!db.objectStoreNames.contains(Stores.Screens)) {
        db.createObjectStore(Stores.Screens, { keyPath: 'id' })
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
            break
          }

          const newStore = tx.objectStore(Stores.Screens)
          const oldStore = tx.objectStore(Stores.DeprecatedLocalForageTable)
          const oldResponse = oldStore.get('screens')

          oldResponse.onsuccess = () => {
            console.log('result', oldResponse.result)

            for (const item of oldResponse.result ?? []) {
              newStore.add({
                ...item,
                id: ulid(),
                signature: `dSize=${item.tag.diagonalSize}&aRatio=${item.tag.aspectRatio}&hRes=${item.spec.hRes}&vRes=${item.spec.vRes}`,
              })
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
      console.log('openReq.onsuccess - initDB')
      resolve(true)
    }

    openReq.onerror = () => {
      resolve(false)
    }
  })
}

export const getAllData = <T extends KeyedObject>(storeName: Stores): Promise<Array<T>> => {
  return new Promise((resolve, reject) => {
    const openReq = openDatabase(dbName, dbVersion)
    handleRequestError(openReq, reject)

    openReq.onsuccess = () => {
      const { store } = openDatabaseTable({ openReq, storeName, mode: 'readonly' })
      const storeReq = store.getAll()
      handleRequestError(storeReq, reject)

      storeReq.onsuccess = () => {
        resolve(storeReq.result as Array<T>)
      }
    }
  })
}

export const getData = <T extends KeyedObject>(storeName: Stores, key: string): Promise<T | undefined> => {
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

export const addData = <T extends KeyedObject>(storeName: string, data: Omit<T, keyof KeyedObject>): Promise<T> => {
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
): Promise<Array<T>> => {
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

export const updateData = <T extends KeyedObject>(storeName: string, data: T): Promise<T> => {
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

export const deleteData = (storeName: string, key: string): Promise<string> => {
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
