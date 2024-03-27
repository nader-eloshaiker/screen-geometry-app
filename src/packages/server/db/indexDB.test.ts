import { getGetScreenListMock, getGetScreenMock } from '@packages/openapi/generated'
import { spyOnLocalForage } from '@packages/server/test/mocks/mockLocalForage'
import localforage from 'localforage'
import { screenInput55Fixture } from '../test/fixtures/ScreenFixtures'
import { createItem, createItemList, deleteItem, getItem, getItemList, updateItem } from './indexDB'

describe('#indexDB', () => {
  beforeEach(() => {
    spyOnLocalForage(getGetScreenListMock().list)
  })

  describe('#getItemList', () => {
    it('getItemList should return a list of screens', async () => {
      const result = await getItemList()

      expect(result.length).toBe(4)
    })

    it('getItemList should return an empty list if no screens are found', async () => {
      await localforage.clear()

      const result = await getItemList()

      expect(result.length).toBe(0)
    })
  })

  describe('#createItem', () => {
    it('createItem should return a screen', async () => {
      const created = await createItem(screenInput55Fixture)

      expect(created.tag.diagonalSize).toBe(55)
      expect(await localforage.length()).toBe(5)
    })
  })

  it('createItemList should return a list of screens', async () => {
    await localforage.clear()
    const created = await createItemList([screenInput55Fixture])

    expect(created[0]!.tag.diagonalSize).toBe(55)
    expect(await localforage.length()).toBe(1)
  })

  describe('#getItem', () => {
    it('getItem should return a screens', async () => {
      const result = await getItem('pVesw1Iu')

      expect(result?.id).toBe('pVesw1Iu')
    })

    it.fails('updateItem should throw an error if id is not found', async () => {
      await expect(await getItem('aaaaa')).rejects.toThrowError('No screen found for aaaaa')
    })
  })

  describe('#updateItem', () => {
    it('updateItem should return a screens', async () => {
      const result = await getItem('5HjERJbH')

      expect(result?.id).toBe('5HjERJbH')

      const updated = await updateItem('5HjERJbH', {
        ...getGetScreenMock().item,
        tag: { aspectRatio: '4:3', diagonalSize: 21 },
      })

      expect(updated.tag.diagonalSize).toBe(21)
    })

    it.fails('updateItem should throw an error if id is not found', async () => {
      await expect(await updateItem('aaaaa', getGetScreenMock().item)).rejects.toThrowError('No screen found for aaaaa')
    })
  })

  describe('#deleteItem', () => {
    it('deleteItem should return true if id is found', async () => {
      const result = await getItem('pVesw1Iu')

      expect(result?.id).toBe('pVesw1Iu')

      const deleted = await deleteItem('pVesw1Iu')

      expect(deleted).toBe('pVesw1Iu')
      expect(await localforage.length()).toBe(3)
    })

    it.fails('deleteItem should return false if id is not found', async () => {
      expect(await deleteItem('aaaaa')).rejects.toThrowError('No screen found for aaaaa')
    })
  })
})
