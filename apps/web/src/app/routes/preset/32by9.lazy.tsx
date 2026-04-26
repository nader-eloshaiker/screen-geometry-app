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
        { size: 49, ratio: '32:9', h: 5120, v: 1440 }, // 49" Super Ultrawide - Flagship gaming monitor
        { size: 45, ratio: '32:9', h: 5120, v: 1440 }, // 45" Super Ultrawide - High-end productivity
        { size: 40, ratio: '32:9', h: 5120, v: 2160 }, // 40" 4K Super Ultrawide - Premium option
        { size: 38, ratio: '32:9', h: 3840, v: 1600 }, // 38" Super Ultrawide - Compact superwide
        { size: 34, ratio: '32:9', h: 3440, v: 1440 }, // 34" Super Ultrawide - Entry superwide
        { size: 29, ratio: '32:9', h: 2560, v: 1080 }, // 29" Super Ultrawide - Budget option
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/32by9')({
  component: Component,
})
