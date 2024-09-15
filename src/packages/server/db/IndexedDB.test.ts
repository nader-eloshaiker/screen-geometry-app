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
  seedSearchDocuments,
  Stores,
  updateData,
} from './IndexedDB'

export const setupDB = ({
  includeSearch = false,
  includeData = false,
}: {
  includeSearch?: boolean
  includeData?: boolean
}) => {
  const openReq = indexedDB.open(dbNameDefault, dbVersionDefault)
  openReq.onupgradeneeded = () => {
    const db = openReq.result
    if (includeData && !db.objectStoreNames.contains(Stores.Screens)) {
      db.createObjectStore(Stores.Screens, { keyPath: 'id' })
    }

    if (includeSearch && !db.objectStoreNames.contains(Stores.Search)) {
      seedSearchDocuments(openReq)
    }
  }
}

describe('#indexDB', () => {
  beforeEach(() => {
    globalThis.indexedDB = new IDBFactory()
  })

  describe('#CRUD', () => {
    beforeEach(() => {
      setupDB({ includeData: true })
    })

    describe('#getItemList', () => {
      // test requires seeded data, covered in data migration tests
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

        expect(created?.data.diagonalSize).toBe(38)
      })

      it('createItemList should return a list of screens', async () => {
        // await localforage.clear()
        const result = await addAllData<ScreenItem>(Stores.Screens, [screenItemFixture])

        expect(result[0].data.diagonalSize).toBe(38)
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
          data: { ...created.data, aspectRatio: '4:3', diagonalSize: 21 },
        })

        expect(updated?.data.diagonalSize).toBe(21)
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
      expect(result.find((item) => item.data.diagonalSize === 38)).toEqual({
        id: expect.any(String),
        color: {
          darkColor: '#C33609',
          lightColor: '#F6693C',
        },
        specs: {
          hAspectRatio: 21,
          hSize: 34.927,
          vAspectRatio: 9,
          vSize: 14.969,
          ppi: 109.474,
        },
        signature: 'dSize=38&aRatio=21:9&hRes=3840&vRes=1600',
        data: {
          aspectRatio: '21:9',
          diagonalSize: 38,
          hRes: 3840,
          vRes: 1600,
        },
        visible: true,
      })

      expect(result.find((item) => item.data.diagonalSize === 34)).toEqual({
        id: expect.any(String),
        color: {
          darkColor: '#967E03',
          lightColor: '#FCDF50',
        },
        specs: {
          hAspectRatio: 21,
          hSize: 31.251,
          vAspectRatio: 9,
          vSize: 13.393,
          ppi: 109.683,
        },
        signature: 'dSize=34&aRatio=21:9&hRes=3440&vRes=1440',
        data: {
          aspectRatio: '21:9',
          diagonalSize: 34,
          hRes: 3440,
          vRes: 1440,
        },
        visible: true,
      })
    })
  })
})
