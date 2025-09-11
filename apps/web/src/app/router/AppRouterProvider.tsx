import { createRouter, type RouteComponent, RouterProvider } from '@tanstack/react-router'

import { ErrorFallback } from '@/app/pages/ErrorFallback'
import { NotFound } from '@/app/pages/NotFound'
import { routeTree } from '@/app/routetree/routeTree.gen'

const NotFoundComponent = () => (
  <>
    <article>
      <title>Screen Geometry: Page Not Found</title>
      <meta name='description' content='A service error has occured' />
    </article>
    <NotFound />
  </>
)

const ErrorFallbackComponent = ({ ...rest }: React.ComponentProps<typeof ErrorFallback>) => (
  <>
    <article>
      <title>Screen Geometry: Error</title>
      <meta name='description' content='A service error has occured' />
    </article>
    <ErrorFallback {...rest} />
  </>
)

const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundComponent,
  defaultErrorComponent: ErrorFallbackComponent,
})

type AppRouter = typeof appRouter

type Props = {
  defaultComponent?: RouteComponent
}

export const AppRouterProvider = ({ defaultComponent }: Props) => (
  <RouterProvider<AppRouter> router={appRouter} defaultComponent={defaultComponent} />
)
