import { createRouter, RouterProvider } from '@tanstack/react-router'

import { ErrorFallback } from '@/app/pages/ErrorFallback'
import { NotFound } from '@/app/pages/NotFound'
import { routeTree } from '@/lib/routes/routeTree.gen'

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ErrorFallback,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const AppRouterProvider = () => <RouterProvider router={router} />
