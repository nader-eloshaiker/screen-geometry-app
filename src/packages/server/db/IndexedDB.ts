let request: IDBOpenDBRequest
let db: IDBDatabase
const version = 3
const dbName = 'localforage'

export interface KeyedObject {
  id: string
}

export enum Stores {
  Screens = 'screens',
  DeprecatedLocalForageTable = 'keyvaluepairs',
  DeprecatedLocalForageBlob = 'local-forage-detect-blob-support',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName, version)

    request.onupgradeneeded = (event) => {
      db = request.result

      console.log('current version:', event.oldVersion)

      if (!db.objectStoreNames.contains(Stores.Screens)) {
        db.createObjectStore(Stores.Screens, { keyPath: 'id', autoIncrement: true })
      }

      switch (event.oldVersion) {
        case 2: {
          if (!db.objectStoreNames.contains(Stores.DeprecatedLocalForageTable)) {
            break
          }

          console.log('Migrating screens store')

          // get old table data\
          const tx = request.transaction
          if (!tx) {
            break
          }

          const newStore = tx.objectStore(Stores.Screens)
          const oldStore = tx.objectStore(Stores.DeprecatedLocalForageTable)
          const oldResponse = oldStore.get('screens')

          oldResponse.onsuccess = () => {
            console.log('result', oldResponse.result)

            for (const item of oldResponse.result) {
              delete item.id
              newStore.add(item)
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

    request.onsuccess = () => {
      console.log('request.onsuccess - initDB')
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
    }

    db.onversionchange = () => {
      db.close()
      alert('Database is outdated, please reload the page.')
    }
  })
}

export const getAllData = <T extends KeyedObject>(storeName: Stores): Promise<Array<T>> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - getAllData')
      db = request.result
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const res = store.getAll()
      res.onsuccess = () => {
        resolve(res.result)
      }
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        reject(error)
      } else {
        reject('Unknown error')
      }
    }
  })
}

export const getData = <T extends KeyedObject>(storeName: Stores, key: string): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - getAllData')
      db = request.result
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const res = store.get(key)
      resolve(res.result)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        reject(error)
      } else {
        reject('Unknown error')
      }
    }
  })
}

export const addData = <T extends KeyedObject>(
  storeName: string,
  data: Omit<T, keyof KeyedObject>,
): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const { result: id } = store.add(data)
      resolve({ ...data, id } as T)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        reject(error)
      } else {
        reject('Unknown error')
      }
    }
  })
}

export const addAllData = <T extends KeyedObject>(
  storeName: string,
  data: Array<Omit<T, keyof KeyedObject>>,
): Promise<Array<T> | null> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const result = data.map((d) => {
        const { result: id } = store.add(d)
        return { ...d, id } as T
      })
      resolve(result)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        reject(error)
      } else {
        reject('Unknown error')
      }
    }
  })
}

export const updateData = <T extends KeyedObject>(storeName: string, data: T): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      store.put(data, data.id)
      resolve(data)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        reject(error)
      } else {
        reject('Unknown error')
      }
    }
  })
}

export const deleteData = (storeName: string, key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // again open the connection
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - deleteData', key)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const res = store.delete(key)

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(key)
      }
      request.onerror = () => {
        const error = request.error?.message
        if (error) {
          reject(error)
        } else {
          reject('Unknown error')
        }
      }
    }
  })
}
