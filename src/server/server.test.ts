import { getGetScreenListMock } from '@openapi/generated'
import { apiRoutes } from '@openapi/meta'
import { spyOnLocalForage } from '@server/test/mocks/mockLocalForage'
import { mswWithSpy, startMSW, stopMSW } from '@serviceworker/NodeServiceWorker'
import { generateStub } from './server'
import { screenInput55Fixture } from './test/fixtures/ScreenFixtures'

describe('#server', () => {
  const baseUrl = 'http://fakeapi.com'
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub(baseUrl, 1)

  const mswRequestEventSpy = mswWithSpy([
    ...searchMocks(),
    ...screenListMocks(),
    ...screenMocks(),
    ...passthroughMocks(),
  ])

  beforeAll(async () => {
    await startMSW()
  })

  afterAll(async () => {
    await stopMSW()
  })

  beforeEach(() => {
    spyOnLocalForage(getGetScreenListMock().list)
  })

  it('should call the GET screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screens}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/screens'),
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
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:POST|url:http://fakeapi.com/v1/screens'),
    )
  })

  it('should call the GET screen api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screen}/pVesw1Iu`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/screen/pVesw1Iu'),
    )
  })

  it('should call the DELETE screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screen}/pVesw1Iu`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:DELETE|url:http://fakeapi.com/v1/screen/pVesw1Iu'),
    )
  })

  it('should call the PUT screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screen}/pVesw1Iu`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenInput55Fixture),
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:PUT|url:http://fakeapi.com/v1/screen/pVesw1Iu'),
    )
  })

  it('should call the PATCH screens api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.screen}/pVesw1Iu/show`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenInput55Fixture),
    })
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:PATCH|url:http://fakeapi.com/v1/screen/pVesw1Iu/show'),
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
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:POST|url:http://fakeapi.com/v1/screen'),
    )
  })

  it('should call the get search api', async () => {
    const response = await fetch(`${baseUrl}${apiRoutes.search}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/search'),
    )
  })
})
