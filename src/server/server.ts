import { ScreenInput, ScreenInputList } from '@openapi/generated/models'
import {
  createItemAction,
  createItemListAction,
  deleteItemAction,
  getScreen,
  getScreenList,
  getSearchList,
  showItemAction,
  updateItemAction,
} from '@server/api'
import { apiRoutes } from '@server/meta/ApiRouteSchema'
import { HttpResponse, delay, http, passthrough } from 'msw'
import { setupWorker } from 'msw/browser'

// Stub out the API calls using axios-mock-adapter for indexAPI to store data in the browser's IndexedDB
// The stubbed API calls can later be replaced with real API calls to a backend store
export const generateStub = async () => {
  // use explicit mocks with fixtures for testing
  if (import.meta.env.NODE_ENV) {
    console.debug('[MSW] Browser MockServiceWorker Disabled')
    return Promise.resolve()
  }

  const delayResponse = 1000

  const screenListMocks = () => [
    http.get(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screens.path}`, async () => {
      await delay(delayResponse)

      const payload = await getScreenList()

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.post(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screens.path}`, async (resolver) => {
      await delay(delayResponse)

      const requestBody = await resolver.request.json()
      const payload = await createItemListAction(requestBody as ScreenInputList)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
  ]

  const screenMocks = () => [
    http.get(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/:screenId`, async (resolver) => {
      await delay(delayResponse)

      const { screenId } = resolver.params as { screenId: string }
      const payload = await getScreen(screenId)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.delete(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/:screenId`, async (resolver) => {
      await delay(delayResponse)

      const { screenId } = resolver.params as { screenId: string }
      const payload = await deleteItemAction(screenId)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.put(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/:screenId`, async (resolver) => {
      await delay(delayResponse)

      const { screenId } = resolver.params as { screenId: string }
      const requestBody = await resolver.request.json()
      const payload = await updateItemAction(screenId, requestBody as ScreenInput)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.patch(
      `${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}/:screenId/show`,
      async (resolver) => {
        await delay(delayResponse)

        const { screenId } = resolver.params as { screenId: string }
        const payload = await showItemAction(screenId)

        return new HttpResponse(JSON.stringify(payload), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    ),
    http.post(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}`, async (resolver) => {
      await delay(delayResponse)

      const requestBody = await resolver.request.json()
      const payload = await createItemAction(requestBody as ScreenInput)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
  ]

  const searchMocks = () => [
    http.get(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.search.path}`, async (resolver) => {
      await delay(delayResponse)

      const url = new URL(resolver.request.url)
      const payload = await getSearchList(url.searchParams)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
  ]

  const passthroughMocks = () => [
    http.get('*', async () => {
      return passthrough()
    }),
  ]

  const server = setupWorker(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())

  return server.start()
}
