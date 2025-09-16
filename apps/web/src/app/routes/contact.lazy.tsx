import { Contact } from '@/app/pages/Contact'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Contact (Monitor & Screen Comparison Tool | Find the Best Display for You)</title>
      <meta name='description' content='How to engage with me or this screen comparison tool' />
      <meta
        name='keywords'
        content='contact, socials, platforms, reach out, engage, get in touch, discussions, source code, open source, bugs, feedback,  monitor, screen, size, pixel density, aspect ratio, resolution, comparison, differences, overaly, tabulate, monitor comparison, screen size, monitor resolution, monitor tool, display comparison, find a monitor, gaming monitor, monitor for design, side-by-side comparison, monitor size calculator, monitor ppi comparison, display size visualizer, best monitor for gaming, best monitor for video editing, ultrawide vs dual monitors, 4K monitor vs 1440p, what monitor size to get, monitor size calculator, monitor ppi comparison, display size visualizer'
      />
      <link rel='canonical' href='https://screengeometry.com/contact' />
    </article>
    <Contact />
  </>
)

export const Route = createLazyFileRoute('/contact')({
  component: Component,
})
