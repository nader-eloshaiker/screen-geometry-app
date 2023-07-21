import { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { routes } from '../ApiRouteSchema'
import { createItemAction, getScreen, getScreenList } from '../db/indexApi'

// Stub out the API calls using axios-mock-adapter for indexAPI to store data in the browser's IndexedDB
// The stubbed API calls can later be replaced with real API calls to a backend store
export const generateStub = (axiosInstance: AxiosInstance) => {
  const timeout = 1000

  const mock = new MockAdapter(axiosInstance, { onNoMatch: 'passthrough' })

  mock.onGet(`${routes.baseUrl}${routes.root}/${routes.screens.path}`).reply((config) =>
    getScreenList(config.url || '').then((payload) => {
      setTimeout(() => {}, timeout)
      return [
        200,
        {
          payload,
        },
        { Accept: 'application/json', 'Content-Type': 'application/json' },
      ]
    }),
  )

  mock.onGet(`${routes.baseUrl}${routes.root}/${routes.screens.path}/${routes.screens.key}`).reply((config) =>
    getScreen(config.params || {}).then((payload) => {
      setTimeout(() => {}, timeout)

      return [
        200,
        {
          payload,
        },
        { Accept: 'application/json', 'Content-Type': 'application/json' },
      ]
    }),
  )

  mock
    .onPost(`${routes.baseUrl}${routes.root}/${routes.screens.path}/${routes.screens.actions.create}`)
    .reply((config) =>
      createItemAction(config.data || {}).then((payload) => {
        setTimeout(() => {}, timeout)

        return [
          200,
          {
            payload,
          },
          { Accept: 'application/json', 'Content-Type': 'application/json' },
        ]
      }),
    )

  return mock
}
