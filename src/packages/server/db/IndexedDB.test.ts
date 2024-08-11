import { getGetScreenMock, ScreenItem } from '@packages/openapi/generated'
import { screenItemFixture } from '@packages/test/fixtures/ScreenFixtures'
import { addAllData, addData, deleteData, getAllData, getData, Stores, updateData } from './IndexedDB'

describe('#indexDB', () => {
  describe('#getItemList', () => {
    it('getItemList should return a list of screens', async () => {
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

      expect(created?.tag.diagonalSize).toBe(55)
      // expect(await localforage.length()).toBe(5)
    })
  })

  it('createItemList should return a list of screens', async () => {
    // await localforage.clear()
    const created = await addAllData<ScreenItem>(Stores.Screens, [screenItemFixture])

    expect(created![0]!.tag.diagonalSize).toBe(55)
    // expect(await localforage.length()).toBe(1)
  })

  describe('#getItem', () => {
    it('getItem should return a screens', async () => {
      const result = await getData<ScreenItem>(Stores.Screens, 'pVesw1Iu')

      expect(result?.id).toBe('pVesw1Iu')
    })

    it.fails('updateItem should throw an error if id is not found', async () => {
      await expect(await getData<ScreenItem>(Stores.Screens, 'aaaaa')).rejects.toThrowError('No screen found for aaaaa')
    })
  })

  describe('#updateItem', () => {
    it('updateItem should return a screens', async () => {
      const result = await getData<ScreenItem>(Stores.Screens, '5HjERJbH')

      expect(result?.id).toBe('5HjERJbH')

      const updated = await updateData<ScreenItem>(Stores.Screens, {
        ...getGetScreenMock().item,
        tag: { aspectRatio: '4:3', diagonalSize: 21 },
      })

      expect(updated?.tag.diagonalSize).toBe(21)
    })

    it.fails('updateItem should throw an error if id is not found', async () => {
      await expect(await updateData<ScreenItem>(Stores.Screens, getGetScreenMock().item)).rejects.toThrowError(
        'No screen found for aaaaa',
      )
    })
  })

  describe('#deleteItem', () => {
    it('deleteItem should return true if id is found', async () => {
      const result = await getData<ScreenItem>(Stores.Screens, 'pVesw1Iu')

      expect(result?.id).toBe('pVesw1Iu')

      const deleted = await deleteData(Stores.Screens, 'pVesw1Iu')

      expect(deleted).toBe('pVesw1Iu')
      // expect(await localforage.length()).toBe(3)
    })

    it.fails('deleteItem should return false if id is not found', async () => {
      expect(await deleteData(Stores.Screens, 'aaaaa')).rejects.toThrowError('No screen found for aaaaa')
    })
  })
})
