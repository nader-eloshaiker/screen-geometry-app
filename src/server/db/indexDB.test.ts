import { ScreenItem } from '@openapi/generated/models'
import { getGetScreenListMock } from '@openapi/generated/services/screen-list-service'
import localforage from 'localforage'
import { createItem, createItemList, deleteItem, getItem, getItemList, updateItem } from './indexDB'

describe('#indexDB', () => {
  let cache: Array<ScreenItem> | null = []

  beforeEach(() => {
    cache = getGetScreenListMock().list
    vi.spyOn(localforage, 'getItem').mockImplementation((_) => Promise.resolve(cache))
    vi.spyOn(localforage, 'setItem').mockImplementation((_, list: unknown) => {
      cache = list as Array<ScreenItem>
      return Promise.resolve(list)
    })
  })

  describe('#getItemList', () => {
    it('getItemList should return a list of screens', async () => {
      const result = await getItemList()

      expect(result.length).toBe(4)
    })

    it('getItemList should return an empty list if no screens are found', async () => {
      cache = null

      const result = await getItemList()

      expect(result.length).toBe(0)
    })
  })

  describe('#createItem', () => {
    it('createItem should return a screen', async () => {
      const created = await createItem({
        diagonalSize: 55,
        aspectRatio: '16:9',
        hRes: 3840,
        vRes: 2160,
        lightColor: '#67E5AA',
        darkColor: '#168350',
      })

      expect(created.tag.diagonalSize).toBe(55)
      expect(cache!.length).toBe(5)
    })
  })

  it('createItemList should return a list of screens', async () => {
    cache = []
    const created = await createItemList([
      {
        diagonalSize: 55,
        aspectRatio: '16:9',
        hRes: 3840,
        vRes: 2160,
        lightColor: '#67E5AA',
        darkColor: '#168350',
      },
    ])

    expect(created[0].tag.diagonalSize).toBe(55)
    expect(cache!.length).toBe(1)
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
      const result = await getItem('pVesw1Iu')

      expect(result?.id).toBe('pVesw1Iu')

      const updated = await updateItem('pVesw1Iu', { ...cache![0], tag: { aspectRatio: '4:3', diagonalSize: 21 } })

      expect(updated.tag.diagonalSize).toBe(21)
    })

    it.fails('updateItem should throw an error if id is not found', async () => {
      await expect(await updateItem('aaaaa', cache![0])).rejects.toThrowError('No screen found for aaaaa')
    })
  })

  describe('#deleteItem', () => {
    it('deleteItem should return true if id is found', async () => {
      const result = await getItem('pVesw1Iu')

      expect(result?.id).toBe('pVesw1Iu')

      const deleted = await deleteItem('pVesw1Iu')

      expect(deleted).toBe('pVesw1Iu')
      expect(cache!.length).toBe(3)
    })

    it.fails('deleteItem should return false if id is not found', async () => {
      expect(await deleteItem('aaaaa')).rejects.toThrowError('No screen found for aaaaa')
    })
  })
})
