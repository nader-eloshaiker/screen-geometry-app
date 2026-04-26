import { SharePage } from '@/app/pages/Share/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Gaming Monitors - Large Format & Super Ultrawide Displays</title>
      <meta
        name='description'
        content='Compare large format gaming monitors including 34" ultrawide, 38" ultrawide, 49" super ultrawide, and more. Perfect for immersive gaming and ultimate gameplay experience.'
      />
      <meta
        name='keywords'
        content='gaming monitor, super ultrawide, 49" gaming monitor, 34" ultrawide gaming, 38" ultrawide gaming, 32:9 gaming, 21:9 gaming, large format gaming, immersive gaming, ultrawide gaming monitor, superwide gaming, dual monitor gaming, gaming display, esports display, best gaming monitor, gaming monitor comparison, ultrawide vs standard, super ultrawide gaming'
      />
      <link rel='canonical' href='https://screengeometry.com/preset/gamer' />
    </article>
    <SharePage
      screenParams={[
        // 1440p — best all-round gaming sweet spot
        { size: 27, ratio: '16:9', h: 2560, v: 1440 },
        { size: 32, ratio: '16:9', h: 2560, v: 1440 },

        // 4K — premium gaming
        { size: 27, ratio: '16:9', h: 3840, v: 2160 },
        { size: 32, ratio: '16:9', h: 3840, v: 2160 },

        // Ultrawide 21:9 — immersive gaming
        { size: 34, ratio: '21:9', h: 3440, v: 1440 },
        { size: 45, ratio: '21:9', h: 3440, v: 1440 },

        // Super ultrawide 32:9 — hardcore/sim racing
        { size: 49, ratio: '32:9', h: 5120, v: 1440 },
        { size: 57, ratio: '32:9', h: 7680, v: 2160 },
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/gamer')({
  component: Component,
})
