export const routes = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  root: '/api',
  screens: {
    path: 'screens',
    key: ':screenId',
    actions: {
      favorite: 'favorite',
      create: 'create',
    },
  },
}
