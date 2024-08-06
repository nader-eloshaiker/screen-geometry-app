let request: IDBOpenDBRequest
let db: IDBDatabase
const version = 2.1
const dbName = 'localforage'

export interface KeyedObject {
  id: string
}

export enum Stores {
  Screens = 'screens',
  DeprecatedLocalForageTable = 'keyvaluepairs',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName, version)

    request.onupgradeneeded = () => {
      db = request.result

      if (db.objectStoreNames.contains(Stores.DeprecatedLocalForageTable)) {
        console.log('Migrating screens store')

        // get old table data
        const oldTx = db.transaction(Stores.DeprecatedLocalForageTable, 'readonly')
        const oldStore = oldTx.objectStore(Stores.DeprecatedLocalForageTable)
        const { result } = oldStore.getAll()

        // create new table and add old data
        db.createObjectStore(Stores.Screens, { keyPath: 'id', autoIncrement: true })
        const tx = db.transaction(Stores.Screens, 'readwrite')
        const store = tx.objectStore(Stores.Screens)
        for (const item of result) {
          delete item.id
          store.add(item)
        }

        db.deleteObjectStore(Stores.DeprecatedLocalForageTable)
      } else if (!db.objectStoreNames.contains(Stores.Screens)) {
        // if the data object store doesn't exist, create it
        console.log('Creating screens store')
        db.createObjectStore(Stores.Screens, { keyPath: 'id', autoIncrement: true })
      }
      // no need to resolve here
    }

    request.onsuccess = () => {
      db = request.result
      console.log('request.onsuccess - initDB', db.version)
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
    }
  })
}

export const getAllData = <T extends Array<KeyedObject>>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
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
  })
}

export const getData = <T extends KeyedObject>(storeName: Stores, key: string): Promise<T | string | null> => {
  return new Promise((resolve) => {
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
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const addData = <T extends KeyedObject>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      store.add(data)
      resolve(data)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const updateData = <T extends KeyedObject>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
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
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const deleteData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
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
        resolve(true)
      }
      res.onerror = () => {
        resolve(false)
      }
    }
  })
}
