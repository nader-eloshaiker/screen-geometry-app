import { SharePage } from '@/app/pages/Share/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: 32:9 Super Ultrawide Monitors - Immersive Gaming & Productivity</title>
      <meta
        name='description'
        content='Compare 32:9 super ultrawide monitors including 49" 5120x1440, 45" 5120x1440, 40" 5120x2160, and more. Perfect for immersive gaming and productivity.'
      />
      <meta
        name='keywords'
        content='32:9 monitor, super ultrawide, 49" ultrawide, 5120x1440, 3440x1440, super ultrawide gaming, 32:9 productivity, dual monitor replacement, superwide monitor, Samsung Odyssey G9, Dell U4924DW, 45" ultrawide, 40" ultrawide, 38" ultrawide, 32:9 vs dual monitors, super ultrawide comparison, immersive gaming monitor, productivity ultrawide, 5120x2160 ultrawide, 32:9 aspect ratio'
      />
      <link rel='canonical' href='https://screengeometry.com/preset/32by9' />
    </article>
    <SharePage
      screenParams={[
        // DQHD (1440p) — entry super ultrawide, dual 27" QHD equivalent
        { size: 49, ratio: '32:9', h: 5120, v: 1440 },

        // 8K Dual UHD (2160p) — Samsung Odyssey Neo G9, dual 4K equivalent
        { size: 57, ratio: '32:9', h: 7680, v: 2160 },
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/32by9')({
  component: Component,
})
