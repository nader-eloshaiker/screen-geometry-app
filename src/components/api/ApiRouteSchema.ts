export const routes = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  root: '/api',
  screens: {
    path: 'screens',
    key: ':screenId',
    actions: {
      create: 'create',
      delete: 'delete',
      edit: 'edit',
    },
  },
}
