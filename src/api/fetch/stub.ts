import { AxiosInstance, AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { routes } from '../ApiRouteSchema'
import {
  createItemAction,
  deleteItemAction,
  favouriteItemAction,
  getScreen,
  getScreenList,
  updateItemAction,
} from '../db/indexApi'

// Stub out the API calls using axios-mock-adapter for indexAPI to store data in the browser's IndexedDB
// The stubbed API calls can later be replaced with real API calls to a backend store
export const generateStub = (axiosInstance: AxiosInstance) => {
  const mock = new MockAdapter(axiosInstance, { onNoMatch: 'passthrough', delayResponse: 1000 })

  const debug = (config: AxiosRequestConfig, response: unknown) => {
    console.debug(`axios adapter: [${config.method}] ${config.url}`, '\n', config, '\n', response)
  }

  const screenUrl = new RegExp(routes.baseUrl + routes.basePath + '/' + routes.screens.path + '/\\S+')
  const screenFavUrl = new RegExp(
    routes.baseUrl + routes.basePath + '/' + routes.screens.path + '/\\S+' + '/' + routes.screens.actions.favorite,
  )

  mock.onGet(`${routes.baseUrl}${routes.basePath}/${routes.screens.path}`).reply((config) =>
    getScreenList().then((payload) => {
      debug(config, payload)

      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock
    .onPost(`${routes.baseUrl}${routes.basePath}/${routes.screens.path}/${routes.screens.actions.create}`)
    .reply((config) =>
      createItemAction(config.data ? JSON.parse(config.data) : {}).then((payload) => {
        debug(config, payload)

        return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
      }),
    )

  mock.onGet(`${routes.baseUrl}${routes.basePath}/${routes.screens.path}/${routes.screens.key}`).reply((config) =>
    getScreen(config.params || {}).then((payload) => {
      debug(config, payload)

      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onDelete(screenUrl).reply((config) =>
    deleteItemAction(config.url).then((payload) => {
      debug(config, payload)
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onPut(screenUrl).reply((config) =>
    updateItemAction(config.data ? JSON.parse(config.data) : {}).then((payload) => {
      debug(config, payload)
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onPatch(screenFavUrl).reply((config) =>
    favouriteItemAction(config.url).then((payload) => {
      debug(config, payload)
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  return mock
}
