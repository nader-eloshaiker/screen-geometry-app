export const routes = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiPathVer: '/v1',
  screens: {
    path: 'screens',
    key: ':screenId',
    actions: {
      favorite: 'favorite',
      create: 'create',
    },
  },
}
