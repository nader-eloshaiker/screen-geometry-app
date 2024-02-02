import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { screenInput55Fixture } from '@openapi/fixtures/ScreenFixtures'
import { getGetScreenListMock } from '@openapi/generated/services/screen-list-service'
import { spyOnLocalForage } from '@test/mocks/mockLocalForage'
import { mswWithSpy, startMSW, stopMSW } from '@test/mocks/mockMSW'
import { apiRoutes } from './meta/ApiRouteSchema'
import { generateStub } from './server'

describe('#server', () => {
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub(1)

  const mswRequestEventSpy = mswWithSpy(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())

  beforeAll(async () => {
    await startMSW()
  })

  afterAll(async () => {
    await stopMSW()
  })

  beforeEach(() => {
    useElementSizeMock()
    spyOnLocalForage(getGetScreenListMock().list)
  })

  it('should call the GET screens api', async () => {
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screens.path}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/screens'),
    )
  })

  it('should call the POST screens api', async () => {
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screens.path}`, {
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
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/pVesw1Iu`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/screen/pVesw1Iu'),
    )
  })

  it('should call the DELETE screens api', async () => {
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/pVesw1Iu`, {
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
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/pVesw1Iu`, {
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
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/pVesw1Iu/show`, {
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
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}`, {
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
    const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.search.path}`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:GET|url:http://fakeapi.com/v1/search'),
    )
  })
})
