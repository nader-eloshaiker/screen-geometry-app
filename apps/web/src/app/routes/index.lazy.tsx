import { Home } from '@/app/pages/Home'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Home (Monitor & Screen Comparison Tool | Find the Best Display for You)</title>
      <meta
        name='description'
        content='Researching a new monitor? Our free tool lets you visually compare monitor sizes, resolutions, pixel density and aspect ratios side-by-side. Easily find the perfect display for gaming, design, or daily use. Make a smart, informed decision on your next screen!'
      />
      <meta
        name='keywords'
        content='home page, home, introduction, overview, monitor, screen, size, pixel density, aspect ratio, resolution, comparison, differences, overaly, tabulate, monitor comparison, screen size, monitor resolution, monitor tool, display comparison, find a monitor, gaming monitor, monitor for design, side-by-side comparison, monitor size calculator, monitor ppi comparison, display size visualizer, best monitor for gaming, best monitor for video editing, ultrawide vs dual monitors, 4K monitor vs 1440p, what monitor size to get, monitor size calculator, monitor ppi comparison, display size visualizer'
      />
      <link rel='canonical' href='https://screengeometry.com' />
    </article>
    <Home />
  </>
)

export const Route = createLazyFileRoute('/')({
  component: Component,
})
