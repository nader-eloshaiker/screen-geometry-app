export const routes = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  root: '/v1',
  screens: {
    path: 'screens',
    key: ':screenId',
    actions: {
      favorite: 'favorite',
      create: 'create',
    },
  },
}
