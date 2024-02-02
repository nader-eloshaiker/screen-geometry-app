export const apiRoutes = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://fakeapi.com',
  apiPathVer: '/v1',
  screens: {
    path: 'screens',
  },
  screen: {
    path: 'screen',
    key: ':id',
    actions: {
      show: 'show',
      createList: 'createlist',
    },
  },
  search: {
    path: 'search',
  },
}
