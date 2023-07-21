export const routes = {
  root: {
    path: '/',
  },
  screens: {
    path: 'screens',
    key: ':id',
    actions: {
      create: 'create',
      delete: 'delete',
      edit: 'edit',
    },
  },
}
