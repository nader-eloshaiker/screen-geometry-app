import { SharePage } from '@/app/pages/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Professional Monitors - High-End Displays for Creative Work</title>
      <meta
        name='description'
        content='Compare professional-grade monitors including 55" 4K, 52" 6K ultrawide, 49" super ultrawide, 42" 4K, and more. Perfect for creative professionals, designers, and power users.'
      />
      <meta
        name='keywords'
        content='professional monitor, creative monitor, designer monitor, 55" 4K monitor, 52" 6K ultrawide, 49" super ultrawide, 42" 4K monitor, 40" 4K ultrawide, 38" UW4K, 34" ultrawide, 32" 4K monitor, 27" 4K monitor, color accurate monitor, professional display, video editing monitor, photo editing monitor, graphic design monitor, high-end monitor, premium monitor, 6K display, 5K display, professional ultrawide'
      />
      <link rel='canonical' href='https://screengeometry.com/preset/pro' />
    </article>
    <SharePage
      screenParams={[
        { size: 55, ratio: '16:9', h: 2840, v: 2160 }, // 55" 4K - Large format professional display
        { size: 52, ratio: '21:9', h: 6144, v: 2560 }, // 52" 6K Ultrawide - Professional workstation
        { size: 49, ratio: '32:9', h: 5120, v: 1440 }, // 49" Super Ultrawide - Immersive productivity
        { size: 42, ratio: '16:9', h: 3840, v: 2160 }, // 42" 4K - Professional creative monitor
        { size: 41, ratio: '32:9', h: 5120, v: 1440 }, // 41" Super Ultrawide - High-end productivity
        { size: 40, ratio: '21:9', h: 5120, v: 2160 }, // 40" 4K Ultrawide - Premium creative display
        { size: 38, ratio: '21:9', h: 3840, v: 1600 }, // 38" UW4K - Professional ultrawide
        { size: 34, ratio: '32:9', h: 3440, v: 1440 }, // 34" Super Ultrawide - Compact superwide
        { size: 34, ratio: '21:9', h: 3440, v: 1440 }, // 34" UWQHD - Professional ultrawide gaming
        { size: 32, ratio: '16:9', h: 3840, v: 2160 }, // 32" 4K - Professional productivity monitor
        { size: 27, ratio: '16:9', h: 3840, v: 2160 }, // 27" 4K - Standard professional monitor
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/pro')({
  component: Component,
})
