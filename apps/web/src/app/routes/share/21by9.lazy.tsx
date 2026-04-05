import { SharePage } from '@/app/pages/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Compare (Monitor & Screen Comparison Tool | Find the Best Display for You)</title>
      <meta
        name='description'
        content='Compare different screens and monitors side by side to find the perfect display for your needs.'
      />
      <meta
        name='keywords'
        content='compare, comparison, monitor, screen, size, pixel density, aspect ratio, resolution, differences, overlay, tabulate, monitor comparison, screen size, monitor resolution, monitor tool, display comparison, find a monitor, gaming monitor, monitor for design, side-by-side comparison, monitor size calculator, monitor ppi comparison, display size visualizer, best monitor for gaming, best monitor for video editing, ultrawide vs dual monitors, 4K monitor vs 1440p, what monitor size to get, monitor size calculator, monitor ppi comparison, display size visualizer'
      />
      <link rel='canonical' href='https://screengeometry.com/share/21by9' />
    </article>
    <SharePage
      screenParams={[
        { size: 52, ratio: '21:9', h: 6144, v: 2560 },
        { size: 40, ratio: '21:9', h: 5120, v: 2160 },
        { size: 38, ratio: '21:9', h: 3840, v: 1600 },
        { size: 34, ratio: '21:9', h: 3440, v: 1440 },
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/share/21by9')({
  component: Component,
})
