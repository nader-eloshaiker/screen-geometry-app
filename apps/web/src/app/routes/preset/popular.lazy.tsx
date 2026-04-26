import { SharePage } from '@/app/pages/Share/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: Popular Monitor Sizes - 4K, QHD, Ultrawide Comparisons</title>
      <meta
        name='description'
        content='Compare popular monitor sizes including 27" 4K, 34" ultrawide, 32" QHD, and more. Find the best display for gaming, productivity, and general use.'
      />
      <meta
        name='keywords'
        content='popular monitors, 27" 4K, 34" ultrawide, 32" QHD, gaming monitors, 4K gaming, ultrawide gaming, monitor comparison, best monitor size, 1440p vs 4K, ultrawide vs standard, monitor for productivity, gaming monitor 2024, best 4K monitor, best ultrawide monitor, 27" monitor, 32" monitor, 49" super ultrawide, 5K monitor, monitor size guide, screen resolution comparison'
      />
      <link rel='canonical' href='https://screengeometry.com/preset/popular' />
    </article>
    <SharePage
      screenParams={[
        { size: 27, ratio: '16:9', h: 3840, v: 2160 }, // 4K 27" - Most popular 4K gaming/productivity monitor
        { size: 32, ratio: '16:9', h: 3840, v: 2160 }, // 4K 32" - Popular 4K productivity monitor
        { size: 27, ratio: '16:9', h: 2560, v: 1440 }, // QHD 27" - Very popular gaming monitor
        { size: 24, ratio: '16:9', h: 1920, v: 1080 }, // FHD 24" - Standard office/gaming monitor
        { size: 34, ratio: '21:9', h: 3440, v: 1440 }, // UWQHD 34" - Popular ultrawide gaming monitor
        { size: 38, ratio: '21:9', h: 3840, v: 1600 }, // UW4K 38" - High-end ultrawide
        { size: 49, ratio: '32:9', h: 5120, v: 1440 }, // Super ultrawide 49" - Immersive gaming
        { size: 32, ratio: '16:9', h: 2560, v: 1440 }, // QHD 32" - Large productivity monitor
        { size: 27, ratio: '16:9', h: 1920, v: 1080 }, // FHD 27" - Budget-friendly option
        { size: 29, ratio: '21:9', h: 2560, v: 1080 }, // WFHD 29" - Entry ultrawide
        { size: 43, ratio: '16:9', h: 3840, v: 2160 }, // 4K 43" - Large 4K monitor
        { size: 32, ratio: '16:9', h: 5120, v: 2880 }, // 5K 32" - High-resolution productivity
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/popular')({
  component: Component,
})
