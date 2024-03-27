import { getGetScreenListMock } from '@packages/openapi/generated'
import { spyOnLocalForage } from '@packages/server/test/mocks/mockLocalForage'
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
import { screenInput55Fixture } from './test/fixtures/ScreenFixtures'

describe('#api', () => {
  beforeEach(() => {
    spyOnLocalForage(getGetScreenListMock().list)
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

    const updated = await updateScreen('pVesw1Iu', screenInput55Fixture)

    expect(updated.item?.tag.diagonalSize).toBe(55)
  })

  it('#createScreen should return a screen', async () => {
    const created = await createScreen(screenInput55Fixture)

    expect(created.item.tag.diagonalSize).toBe(55)
    expect(await localforage.length()).toBe(5)
  })

  it('#createScreenList should return a list of screens', async () => {
    await localforage.clear()
    const created = await createScreenList([screenInput55Fixture])

    expect(created.list[0]!.tag.diagonalSize).toBe(55)
    expect(await localforage.length()).toBe(1)
  })

  it('#deleteScreen should return true if id is found', async () => {
    const result = await getScreen('pVesw1Iu')

    expect(result.item?.id).toBe('pVesw1Iu')

    const deleted = await deleteScreen('pVesw1Iu')

    expect(deleted.id).toBe('pVesw1Iu')
  })

  it('#showScreen should return a screen', async () => {
    const updated = await showScreen('pVesw1Iu')

    expect(updated.item?.visible).toBe(false)
  })
})
