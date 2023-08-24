export const routes = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  basePath: '/v1',
  screens: {
    path: 'screens',
    key: ':screenId',
    actions: {
      favorite: 'favorite',
      create: 'create',
    },
  },
}
