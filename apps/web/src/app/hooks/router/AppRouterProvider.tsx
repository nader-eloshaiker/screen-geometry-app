import { createRouter, RouteComponent, RouterProvider } from '@tanstack/react-router'

import { ErrorFallback } from '@/app/pages/ErrorFallback'
import { NotFound } from '@/app/pages/NotFound'
import { routeTree } from '@/app/routes/routeTree.gen'

const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ErrorFallback,
})

type AppRouter = typeof appRouter

type Props = {
  defaultComponent?: RouteComponent
}

export const AppRouterProvider = ({ defaultComponent }: Props) => (
  <RouterProvider<AppRouter> router={appRouter} defaultComponent={defaultComponent} />
)
