import { PageLoaderProvider } from '@screengeometry/lib-ui/hooks/pageloader'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { EnvironmentSession, EnvironmentSessionLoaderKey } from '../components/envsession/EnvironmentSession'

export const Route = createLazyFileRoute('/screens')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLoaderProvider initialLoadingKeys={[EnvironmentSessionLoaderKey]}>
      <EnvironmentSession>
        <Outlet />
      </EnvironmentSession>
    </PageLoaderProvider>
  )
}
