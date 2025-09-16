import { EnvironmentSessionLoaderKey, EnvSessionProvider } from '@/app/stores/session/EnvSessionProvider'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Screens (Monitor & Screen Comparison Tool | Find the Best Display for You)</title>
      <meta
        name='description'
        content='Visually compare multiple monitor sizes and resolutions simultaneously. Get clear tabulated insights into size, resolution, pixel density and aspect ratio differences. Perfect for tech enthusiasts and professionals!'
      />
      <meta
        name='keywords'
        content='monitor, screen, size, pixel density, aspect ratio, resolution, comparison, differences, overaly, tabulate, monitor comparison, screen size, monitor resolution, monitor tool, display comparison, find a monitor, gaming monitor, monitor for design, side-by-side comparison, monitor size calculator, monitor ppi comparison, display size visualizer, best monitor for gaming, best monitor for video editing, ultrawide vs dual monitors, 4K monitor vs 1440p, what monitor size to get, monitor size calculator, monitor ppi comparison, display size visualizer'
      />
      <link rel='canonical' href='https://screengeometry.com/screens' />
    </article>
    <PageLoaderProvider initialLoadingKeys={[EnvironmentSessionLoaderKey]}>
      <EnvSessionProvider>
        <Outlet />
      </EnvSessionProvider>
    </PageLoaderProvider>
  </>
)

export const Route = createLazyFileRoute('/screens')({
  component: Component,
})
