import { ScreenItem } from '@packages/openapi/generated'
import { screenItemFixture } from '@packages/test/fixtures/ScreenFixtures'
import indexeddb from 'fake-indexeddb'
import { addData, Stores } from '../db/IndexedDB'
import { cleanupDB, setupDB } from '../db/IndexedDB.test'
import { screenInput55Fixture } from '../test/fixtures/ScreenFixtures'
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
  beforeAll(async () => {
    globalThis.indexedDB = indexeddb
    setupDB()
  })

  afterEach(async () => {
    cleanupDB()
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
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const result = await getScreenList()

    expect(result.list).toHaveLength(1)
  })

  it('#getScreen should return a screen', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const result = await getScreen(created.id)
    expect(result.item.id).toBe(created.id)
  })

  it('#updateScreen should return a screens', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const result = await getScreen(created.id)
    expect(result.item.id).toBe(created.id)

    const updated = await updateScreen(created.id, screenInput55Fixture)

    expect(updated.item?.tag.diagonalSize).toBe(55)
  })

  it('#createScreen should return a screen', async () => {
    const created = await createScreen(screenInput55Fixture)

    expect(created.item.tag.diagonalSize).toBe(55)
    // expect(await localforage.length()).toBe(5)
  })

  it('#createScreenList should return a list of screens', async () => {
    // await localforage.clear()
    const result = await createScreenList([screenInput55Fixture])

    expect(result.list[0]!.tag.diagonalSize).toBe(55)
    const screen = await getScreen(result.list[0].id)
    expect(screen.item.id).toBe(result.list[0].id)
  })

  it('#deleteScreen should return true if id is found', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const deleted = await deleteScreen(created.id)

    expect(deleted.id).toBe(created.id)
  })

  it('#showScreen should return a screen', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const updated = await showScreen(created.id)

    expect(updated.item?.visible).toBe(false)
  })
})
