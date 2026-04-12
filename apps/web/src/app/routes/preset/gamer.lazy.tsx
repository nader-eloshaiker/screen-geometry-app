import { SharePage } from '@/app/pages/SharePage'
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
        { size: 57, ratio: '32:9', h: 7680, v: 2160 }, // 57" 8K Super Ultrawide - Ultimate gaming experience
        { size: 49, ratio: '32:9', h: 5120, v: 1440 }, // 49" Super Ultrawide - Immersive gaming powerhouse
        { size: 45, ratio: '32:9', h: 5120, v: 1440 }, // 45" Super Ultrawide - Large format gaming
        { size: 40, ratio: '32:9', h: 5120, v: 2160 }, // 40" 4K Super Ultrawide - Premium gaming display
        { size: 38, ratio: '21:9', h: 3840, v: 1600 }, // 38" UW4K - High-end ultrawide gaming
        { size: 34, ratio: '32:9', h: 3440, v: 1440 }, // 34" Super Ultrawide - Compact superwide gaming
        { size: 34, ratio: '21:9', h: 3440, v: 1440 }, // 34" UWQHD - Popular ultrawide gaming
        { size: 43, ratio: '16:9', h: 3840, v: 2160 }, // 43" 4K - Large console gaming display
        { size: 48, ratio: '16:9', h: 5120, v: 2880 }, // 48" 5K - Premium large format gaming
        { size: 32, ratio: '16:9', h: 3840, v: 2160 }, // 32" 4K - Large 4K gaming monitor
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/gamer')({
  component: Component,
})
