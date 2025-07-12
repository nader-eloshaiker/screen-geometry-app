import { initMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { screenItemFixture } from '@/lib/support/test/fixtures/ScreenFixtures'
import {
  ScreenItem,
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
} from '@screengeometry/lib-api/spec'
import { IDBFactory } from 'fake-indexeddb'
import { apiRoutes } from './ApiRouteSchema'
import { Stores } from './db/DbConstants'
import { addData } from './db/IndexedDB'
import { setupDB } from './db/IndexedDB.test'
import { screenInput55Fixture } from './lib/test/fixtures/ScreenFixtures'

describe('#server', () => {
  const baseUrl = 'http://fakeapi.com'

  const mswObj = initMSW([...getSearchServiceMock(), ...getScreenListServiceMock(), ...getScreenServiceMock()])

  beforeAll(() => {
    mswObj.start()
  })

  afterAll(() => {
    mswObj.stop()
  })

  beforeEach(async () => {
    mswObj.reset()
    globalThis.indexedDB = new IDBFactory()
    setupDB({ includeData: true, includeSearch: true })
  })

  it('should call the GET screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screens}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/screens')
    )
  })

  it('should call the POST screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screens}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([screenInput55Fixture]),
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining('method:POST|url:http://fakeapi.com/v1/screens')
    )
  })

  it('should call the GET screen api', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const response = await fetch(`${baseUrl}${apiRoutes.screen}/${created.id}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining(`method:GET|url:http://fakeapi.com/v1/screen/${created.id}`)
    )
  })

  it('should call the DELETE screens api', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const response = await fetch(`${baseUrl}${apiRoutes.screen}/${created.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining(`method:DELETE|url:http://fakeapi.com/v1/screen/${created.id}`)
    )
  })

  it('should call the PUT screens api', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const response = await fetch(`${baseUrl}${apiRoutes.screen}/${created.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenInput55Fixture),
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining(`method:PUT|url:http://fakeapi.com/v1/screen/${created.id}`)
    )
  })

  it('should call the PATCH screens api', async () => {
    const created = await addData<ScreenItem>(Stores.Screens, screenItemFixture)
    expect(created).toBeDefined()

    const response = await fetch(`${baseUrl}${apiRoutes.screen}/${created.id}/show`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenInput55Fixture),
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining(`method:PATCH|url:http://fakeapi.com/v1/screen/${created.id}/show`)
    )
  })

  it('should call the POST screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screen}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenInput55Fixture),
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining('method:POST|url:http://fakeapi.com/v1/screen')
    )
  })

  it('should call the get search api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.search}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/search')
    )
  })
})
