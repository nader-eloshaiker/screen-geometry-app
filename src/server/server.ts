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
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { pathToRegexp } from 'path-to-regexp'

// Stub out the API calls using axios-mock-adapter for indexAPI to store data in the browser's IndexedDB
// The stubbed API calls can later be replaced with real API calls to a backend store
export const generateStub = (axiosInstance: AxiosInstance) => {
  const mock = new MockAdapter(axiosInstance, { onNoMatch: 'passthrough', delayResponse: 1000 })

  const debug = (config: AxiosRequestConfig, response: unknown, stub: string) => {
    console.debug(
      `axios adapter: [${config.method}] ${config.url}`,
      '\n',
      `intercepted: ${stub}`,
      '\n',
      config,
      '\n',
      response,
    )
  }

  const screenIdUrl = new RegExp(
    '^' + apiRoutes.apiUrl + apiRoutes.apiPathVer + '/' + apiRoutes.screen.path + '/' + '(?:([^/]+?))/?$',
  )

  const paramScreenId = (url: string | undefined, action?: string) => {
    if (!url) {
      return undefined
    }

    const regexp = pathToRegexp(`/${apiRoutes.screen.path}/${apiRoutes.screen.key}${action ? `/${action}` : ''}`)
    const match = regexp.exec(url)

    if (!match || match.length < 2) {
      return undefined
    }

    return match[1]
  }

  mock.onGet(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screens.path}`).reply((config) =>
    getScreenList().then((payload) => {
      debug(config, payload, 'getScreenList')

      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onPost(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screens.path}`).reply((config) =>
    createItemListAction(config.data ? JSON.parse(config.data) : {}).then((payload) => {
      debug(config, payload, 'createItemListAction')

      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onGet(screenIdUrl).reply((config) =>
    getScreen(paramScreenId(config.url)).then((payload) => {
      debug(config, payload, 'getScreen')

      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onDelete(screenIdUrl).reply((config) =>
    deleteItemAction(paramScreenId(config.url)).then((payload) => {
      debug(config, payload, 'deleteItemAction')
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onPut(screenIdUrl).reply((config) =>
    updateItemAction(paramScreenId(config.url), config.data ? JSON.parse(config.data) : {}).then((payload) => {
      debug(config, payload, 'updateItemAction')
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  const screenShowUrl = new RegExp(
    '^' +
      apiRoutes.apiUrl +
      apiRoutes.apiPathVer +
      '/' +
      apiRoutes.screen.path +
      '/[^.]+/' +
      apiRoutes.screen.actions.show,
  )
  mock.onPatch(screenShowUrl).reply((config) =>
    showItemAction(paramScreenId(config.url, apiRoutes.screen.actions.show)).then((payload) => {
      debug(config, payload, 'showItemAction')
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onPost(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.screen.path}`).reply((config) =>
    createItemAction(config.data ? JSON.parse(config.data) : {}).then((payload) => {
      debug(config, payload, 'createItemAction')
      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  mock.onGet(`${apiRoutes.apiUrl}${apiRoutes.apiPathVer}/${apiRoutes.search.path}`).reply((config) =>
    getSearchList(config.params).then((payload) => {
      debug(config, payload, 'getSearchList')

      return [200, payload, { Accept: 'application/json', 'Content-Type': 'application/json' }]
    }),
  )

  return mock
}
