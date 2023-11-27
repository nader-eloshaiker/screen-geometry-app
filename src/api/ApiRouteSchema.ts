export const routes = {
  apiUrl: import.meta.env.VITE_API_URL,
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
}
