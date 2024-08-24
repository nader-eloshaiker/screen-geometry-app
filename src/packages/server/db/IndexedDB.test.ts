import { getGetScreenMock, ScreenItem } from '@packages/openapi/generated'
import { screenItemFixture } from '@packages/test/fixtures/ScreenFixtures'
import { setupV2DB } from '@packages/test/stubs/IndexedDBMigration.stub'
import { IDBFactory } from 'fake-indexeddb'
import {
  addAllData,
  addData,
  dbNameDefault,
  dbVersionDefault,
  deleteData,
  getAllData,
  getData,
  initDB,
  Stores,
  updateData,
} from './IndexedDB'

export const setupDB = () => {
  const openReq = indexedDB.open(dbNameDefault, dbVersionDefault)
  openReq.onupgradeneeded = () => {
    const db = openReq.result
    if (!db.objectStoreNames.contains(Stores.Screens)) {
      db.createObjectStore(Stores.Screens, { keyPath: 'id' })
    }
  }
}

describe('#indexDB', () => {
  describe('#CRUD', () => {
    beforeEach(async () => {
      globalThis.indexedDB = new IDBFactory()
      setupDB()
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
    beforeEach(async () => {
      globalThis.indexedDB = new IDBFactory()
    })

    it('should upgrade from v2 to v3', async () => {
      await setupV2DB()
      await initDB({
        dbName: 'Testv2Tov3',
        dbVersion: 3,
      })

      const result = await getAllData<ScreenItem>(Stores.Screens, { dbName: 'Testv2Tov3', dbVersion: 3 })

      expect(result?.length).toBe(2)
      expect(result.find((item) => item.tag.diagonalSize === 38)).toEqual({
        id: expect.any(String),
        color: {
          darkColor: '#C33609',
          lightColor: '#F6693C',
        },
        data: {
          hAspectRatio: 21,
          hSize: 34.927,
          vAspectRatio: 9,
          vSize: 14.969,
        },
        signature: 'dSize=38&aRatio=21:9&hRes=3840&vRes=1600',
        spec: {
          hRes: 3840,
          ppi: 109.474,
          vRes: 1600,
        },
        tag: {
          aspectRatio: '21:9',
          diagonalSize: 38,
        },
        visible: true,
      })

      expect(result.find((item) => item.tag.diagonalSize === 34)).toEqual({
        id: expect.any(String),
        color: {
          darkColor: '#967E03',
          lightColor: '#FCDF50',
        },
        data: {
          hAspectRatio: 21,
          hSize: 31.251,
          vAspectRatio: 9,
          vSize: 13.393,
        },
        signature: 'dSize=34&aRatio=21:9&hRes=3440&vRes=1440',
        spec: {
          hRes: 3440,
          ppi: 109.683,
          vRes: 1440,
        },
        tag: {
          aspectRatio: '21:9',
          diagonalSize: 34,
        },
        visible: true,
      })
    })
  })
})
