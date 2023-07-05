export const routes = {
  root: {
    path: '/',
  },
  screens: {
    path: 'screens/',
    key: ':screenId',
    actions: {
      create: '/create',
      delete: '/delete',
      edit: '/edit',
    },
  },
}
