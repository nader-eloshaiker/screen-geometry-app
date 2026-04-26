import { createRouter, type RouteComponent, RouterProvider } from '@tanstack/react-router'

import { ErrorFallbackPage } from '@/app/pages/ErrorFallbackPge'
import { NotFoundPage } from '@/app/pages/NotFoundPage'
import { routeTree } from '@/app/routetree/routeTree.gen'

const NotFoundComponent = () => (
  <>
    <article>
      <title>Screen Geometry: Page Not Found</title>
      <meta name='description' content='A service error has occured' />
    </article>
    <NotFoundPage />
  </>
)

const ErrorFallbackComponent = ({ ...rest }: React.ComponentProps<typeof ErrorFallbackPage>) => (
  <>
    <article>
      <title>Screen Geometry: Error</title>
      <meta name='description' content='A service error has occured' />
    </article>
    <ErrorFallbackPage {...rest} />
  </>
)

const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundComponent,
  defaultErrorComponent: ErrorFallbackComponent,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof appRouter
  }

  interface StaticDataRouteOption {
    pageHeading?: string
  }
}

type AppRouter = typeof appRouter

type Props = {
  defaultComponent?: RouteComponent
}

export const AppRouterProvider = ({ defaultComponent }: Props) => (
  <RouterProvider<AppRouter> router={appRouter} defaultComponent={defaultComponent} />
)
