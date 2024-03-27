import { ScreenInput, ScreenInputList } from '@packages/openapi/generated'
import { apiRoutes } from '@packages/openapi/meta'
import { HttpHandler, HttpResponse, delay, http, passthrough } from 'msw'
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

type TReturn = {
  screenListMocks: () => HttpHandler[]
  screenMocks: () => HttpHandler[]
  searchMocks: () => HttpHandler[]
  passthroughMocks: () => HttpHandler[]
}

// Stub out the API calls using axios-mock-adapter for indexAPI to store data in the browser's IndexedDB
// The stubbed API calls can later be replaced with real API calls to a backend store
export const generateStub = (baseUrl: string, responseTime?: number): TReturn => {
  const delayResponse = responseTime ?? 1000

  const screenListMocks = () => [
    http.get(`${baseUrl}${apiRoutes.screens}`, async () => {
      await delay(delayResponse)

      const payload = await getScreenList()

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.post(`${baseUrl}${apiRoutes.screens}`, async (resolver) => {
      await delay(delayResponse)

      const requestBody = await resolver.request.json()
      const payload = await createScreenList(requestBody as ScreenInputList)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
  ]

  const screenMocks = () => [
    http.get(`${baseUrl}${apiRoutes.screenId}`, async (resolver) => {
      await delay(delayResponse)

      const { id } = resolver.params as { id: string }
      const payload = await getScreen(id)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.delete(`${baseUrl}${apiRoutes.screenId}`, async (resolver) => {
      await delay(delayResponse)

      const { id } = resolver.params as { id: string }
      const payload = await deleteScreen(id)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.put(`${baseUrl}${apiRoutes.screenId}`, async (resolver) => {
      await delay(delayResponse)

      const { id } = resolver.params as { id: string }
      const requestBody = await resolver.request.json()
      const payload = await updateScreen(id, requestBody as ScreenInput)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.patch(`${baseUrl}${apiRoutes.screenIdShow}`, async (resolver) => {
      await delay(delayResponse)

      const { id } = resolver.params as { id: string }
      const payload = await showScreen(id)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    http.post(`${baseUrl}${apiRoutes.screen}`, async (resolver) => {
      await delay(delayResponse)

      const requestBody = await resolver.request.json()
      const payload = await createScreen(requestBody as ScreenInput)

      return new HttpResponse(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
  ]

  const searchMocks = () => [
    http.get(`${baseUrl}${apiRoutes.search}`, async (resolver) => {
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

  return {
    screenListMocks,
    screenMocks,
    searchMocks,
    passthroughMocks,
  }
}
