import { getGetScreenMock, ScreenItem } from '@packages/openapi/generated'
import { screenItemFixture } from '@packages/test/fixtures/ScreenFixtures'
import indexeddb from 'fake-indexeddb'
import { addAllData, addData, deleteData, getAllData, getData, initDB, Stores, updateData } from './IndexedDB'

describe('#indexDB', () => {
  beforeAll(async () => {
    globalThis.indexedDB = indexeddb
    await initDB()
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
