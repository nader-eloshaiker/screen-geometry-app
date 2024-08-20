import { getGetScreenMock, ScreenItem } from '@packages/openapi/generated'
import { screenItemFixture } from '@packages/test/fixtures/ScreenFixtures'
import indexeddb from 'fake-indexeddb'
import {
  addAllData,
  addData,
  dbName,
  dbVersion,
  deleteData,
  getAllData,
  getData,
  initDB,
  Stores,
  updateData,
} from './IndexedDB'

export const setupDB = () => {
  const openReq = indexedDB.open(dbName, dbVersion)
  openReq.onupgradeneeded = () => {
    const db = openReq.result
    if (!db.objectStoreNames.contains(Stores.Screens)) {
      db.createObjectStore(Stores.Screens, { keyPath: 'id' })
    }
  }
}

export const cleanupDB = () => {
  const openReq = indexedDB.open(dbName, dbVersion)
  openReq.onsuccess = () => {
    const tx = openReq.result.transaction(Stores.Screens, 'readwrite')
    const store = tx.objectStore(Stores.Screens)
    store.clear()
  }
}

describe('#indexDB', () => {
  describe('#CRUD', () => {
    beforeAll(async () => {
      globalThis.indexedDB = indexeddb
      setupDB()
    })

    afterEach(async () => {
      cleanupDB()
    })

    describe('#getItemList', () => {
      it.skip('getItemList should return a list of screens', async () => {
        const result = await getAllData(Stores.Screens)

        expect(result?.length).toBe(4)
      })

      it('getItemList should return an empty list if no screens are found', async () => {
        // await localforage.clear()

        const result = await getAllData(Stores.Screens)

        expect(result?.length).toBe(0)
      })
    })

    describe('#createItem', () => {
      it('createItem should return a screen', async () => {
        const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)

        expect(created?.tag.diagonalSize).toBe(38)
      })

      it('createItemList should return a list of screens', async () => {
        // await localforage.clear()
        const result = await addAllData<ScreenItem>(Stores.Screens, [screenItemFixture])

        expect(result[0].tag.diagonalSize).toBe(38)
        expect(result.length).toBe(1)
      })
    })

    describe('#getItem', () => {
      it('should return a screens', async () => {
        const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
        expect(created).toBeDefined()

        const result = await getData<ScreenItem>(Stores.Screens, created.id)

        expect(result).toBeDefined()
      })

      it.fails('should throw an error if id is not found', async () => {
        expect(await getData<ScreenItem>(Stores.Screens, 'aaaaa')).rejects.toThrowError('No screen found for aaaaa')
      })
    })

    describe('#updateItem', () => {
      it('updateItem should return an updated screen', async () => {
        const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
        expect(created).toBeDefined()

        const updated = await updateData<ScreenItem>(Stores.Screens, {
          ...created,
          tag: { aspectRatio: '4:3', diagonalSize: 21 },
        })

        expect(updated?.tag.diagonalSize).toBe(21)
      })

      it.fails('updateItem should throw an error if id is not found', async () => {
        expect(await updateData<ScreenItem>(Stores.Screens, getGetScreenMock().item)).rejects.toThrowError(
          'No screen found for aaaaa',
        )
      })
    })

    describe('#deleteItem', () => {
      it('deleteItem should return true if id is found', async () => {
        const originalList = await getAllData<ScreenItem>(Stores.Screens)

        const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
        expect(created).toBeDefined()

        expect(await getAllData<ScreenItem>(Stores.Screens)).toHaveLength(originalList.length + 1)

        const deleted = await deleteData(Stores.Screens, created.id)

        expect(deleted).toBe(created.id)
        expect(await getAllData<ScreenItem>(Stores.Screens)).toHaveLength(originalList.length)
      })

      it.fails('deleteItem should return false if id is not found', async () => {
        expect(await deleteData(Stores.Screens, 'aaaaa')).rejects.toThrowError('No screen found for aaaaa')
      })
    })
  })

  describe('#initDB', () => {
    it('should upgrade from v2 to v3', async () => {
      const deleteDB = () =>
        new Promise((resolve) => {
          const openReq = indexedDB.deleteDatabase(dbName)

          openReq.onsuccess = () => {
            resolve(true)
          }

          openReq.onerror = () => {
            resolve(false)
          }
        })
      const setupV2DB = () =>
        new Promise((resolve) => {
          const openReq = indexedDB.open('localforage', 2)
          openReq.onupgradeneeded = () => {
            const db = openReq.result
            db.createObjectStore(Stores.DeprecatedLocalForageBlob)
            db.createObjectStore(Stores.DeprecatedLocalForageTable)

            const tx = openReq.transaction
            const oldStore = tx!.objectStore(Stores.DeprecatedLocalForageTable)
            oldStore.add(
              [
                {
                  id: 'I0WBgxI_',
                  tag: { aspectRatio: '21:9', diagonalSize: 34 },
                  spec: { hRes: 3440, vRes: 1440, ppi: 109.683 },
                  data: { hAspectRatio: 21, vAspectRatio: 9, hSize: 31.251, vSize: 13.393 },
                  color: { lightColor: '#FCDF50', darkColor: '#967E03' },
                  visible: true,
                },
                {
                  id: 'bxRKJe0g',
                  tag: { aspectRatio: '21:9', diagonalSize: 38 },
                  spec: { hRes: 3840, vRes: 1600, ppi: 109.474 },
                  data: { hAspectRatio: 21, vAspectRatio: 9, hSize: 34.927, vSize: 14.969 },
                  color: { lightColor: '#F6693C', darkColor: '#C33609' },
                  visible: true,
                },
              ],
              'screens',
            )
          }
          openReq.onsuccess = () => {
            openReq.result.close()
            resolve(true)
          }

          openReq.onerror = () => {
            resolve(false)
          }
        })

      await deleteDB()
      await setupV2DB()
      await initDB()
    })
  })
})
