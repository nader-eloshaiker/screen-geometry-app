import { EnvironmentSessionLoaderKey, EnvSessionProvider } from '@/app/hooks/session/EnvSessionProvider'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/screens')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLoaderProvider initialLoadingKeys={[EnvironmentSessionLoaderKey]}>
      <EnvSessionProvider>
        <Outlet />
      </EnvSessionProvider>
    </PageLoaderProvider>
  )
}
