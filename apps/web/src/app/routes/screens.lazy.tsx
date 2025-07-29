import { PageLoaderProvider } from '@screengeometry/lib-ui/hooks/pageloader'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { EnvironmentSessionLoaderKey, EnvSession } from '../hooks/session/EnvSession'

export const Route = createLazyFileRoute('/screens')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLoaderProvider initialLoadingKeys={[EnvironmentSessionLoaderKey]}>
      <EnvSession>
        <Outlet />
      </EnvSession>
    </PageLoaderProvider>
  )
}
