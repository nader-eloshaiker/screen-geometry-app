import { ScreenItem } from '@openapi/generated/models'
import { getGetScreenListMock } from '@openapi/generated/services/screen-list-service'
import localforage from 'localforage'
import {
  createScreen,
  createScreenList,
  deleteScreen,
  getScreen,
  getScreenList,
  getSearchList,
  showScreen,
  updateScreen,
} from './api'

describe('#api', () => {
  let cache: Array<ScreenItem> | null = []

  beforeEach(() => {
    cache = getGetScreenListMock().list
    vi.spyOn(localforage, 'getItem').mockImplementation((_) => Promise.resolve(cache))
    vi.spyOn(localforage, 'setItem').mockImplementation((_, list: unknown) => {
      cache = list as Array<ScreenItem>
      return Promise.resolve(list)
    })
  })

  it('#getSearchList should return a list of screens that match a term', async () => {
    const result = await getSearchList(new URLSearchParams('term=4k'))
    expect(result.list.length).toBe(3)
  })

  it('#getSearchList should return a full list of screens when no term is specified', async () => {
    const result = await getSearchList(new URLSearchParams(''))
    expect(result.list.length).toBe(34)
  })

  it('#getScreenList should return a list of screens', async () => {
    const result = await getScreenList()

    expect(result.list.length).toBe(4)
  })

  it('#getScreen should return a screen', async () => {
    const result = await getScreen('pVesw1Iu')

    expect(result.item?.id).toBe('pVesw1Iu')
  })

  it('#updateScreen should return a screens', async () => {
    const result = await getScreen('pVesw1Iu')

    expect(result.item?.id).toBe('pVesw1Iu')

    const updated = await updateScreen('pVesw1Iu', {
      diagonalSize: 55,
      aspectRatio: '16:9',
      hRes: 3840,
      vRes: 2160,
      lightColor: '#67E5AA',
      darkColor: '#168350',
    })

    expect(updated.item?.tag.diagonalSize).toBe(55)
  })

  it('#createScreen should return a screen', async () => {
    const created = await createScreen({
      diagonalSize: 55,
      aspectRatio: '16:9',
      hRes: 3840,
      vRes: 2160,
      lightColor: '#67E5AA',
      darkColor: '#168350',
    })

    expect(created.item.tag.diagonalSize).toBe(55)
    expect(cache!.length).toBe(5)
  })

  it('#createScreenList should return a list of screens', async () => {
    cache = []
    const created = await createScreenList([
      {
        diagonalSize: 55,
        aspectRatio: '16:9',
        hRes: 3840,
        vRes: 2160,
        lightColor: '#67E5AA',
        darkColor: '#168350',
      },
    ])

    expect(created.list[0].tag.diagonalSize).toBe(55)
    expect(cache!.length).toBe(1)
  })

  it('#deleteScreen should return true if id is found', async () => {
    const result = await getScreen('pVesw1Iu')

    expect(result.item?.id).toBe('pVesw1Iu')

    const deleted = await deleteScreen('pVesw1Iu')

    expect(deleted.id).toBe('pVesw1Iu')
    expect(cache!.length).toBe(3)
  })

  it('#showScreen should return a screen', async () => {
    const updated = await showScreen('pVesw1Iu')

    expect(updated.item?.visible).toBe(false)
  })
})
