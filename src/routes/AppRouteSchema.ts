export const routes = {
  root: {
    path: '/',
  },
  about: {
    path: '/about',
  },
  help: {
    path: '/help',
  },
  contact: {
    path: '/contact',
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
