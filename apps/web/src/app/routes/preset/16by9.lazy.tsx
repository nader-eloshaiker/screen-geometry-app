import { SharePage } from '@/app/pages/Share/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: 16:9 Standard Monitors - 4K, QHD, FHD Popular Sizes</title>
      <meta
        name='description'
        content='Compare popular 16:9 monitors including 32" 4K, 27" 4K, 27" QHD, 24" FHD, and more. The standard aspect ratio for gaming, office, and general use.'
      />
      <meta
        name='keywords'
        content='16:9 monitor, standard monitor, 4K monitor, 27" 4K, 32" 4K, QHD monitor, 27" 1440p, 1440p gaming, FHD monitor, 24" 1080p, 1080p gaming, office monitor, gaming monitor, 16:9 aspect ratio, standard aspect ratio, best 4K monitor, best gaming monitor, monitor comparison, 4K vs 1440p, 1440p vs 1080p, 32" monitor, 27" monitor, 24" monitor'
      />
      <link rel='canonical' href='https://screengeometry.com/preset/16by9' />
    </article>
    <SharePage
      screenParams={[
        { size: 55, ratio: '16:9', h: 2840, v: 2160 }, // 55" 4K - Large 4K monitor
        { size: 48, ratio: '16:9', h: 5120, v: 2880 }, // 48" 5K - High-resolution productivity
        { size: 43, ratio: '16:9', h: 3840, v: 2160 }, // 43" 4K - Large 4K display
        { size: 42, ratio: '16:9', h: 3840, v: 2160 }, // 42" 4K - Large 4K monitor
        { size: 32, ratio: '16:9', h: 3840, v: 2160 }, // 32" 4K - Popular 4K productivity
        { size: 32, ratio: '16:9', h: 2560, v: 1440 }, // 32" QHD - Large QHD monitor
        { size: 27, ratio: '16:9', h: 3840, v: 2160 }, // 27" 4K - Most popular 4K size
        { size: 27, ratio: '16:9', h: 2560, v: 1440 }, // 27" QHD - Popular gaming monitor
        { size: 27, ratio: '16:9', h: 1920, v: 1080 }, // 27" FHD - Budget-friendly option
        { size: 24, ratio: '16:9', h: 1920, v: 1080 }, // 24" FHD - Standard office/gaming
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/16by9')({
  component: Component,
})
