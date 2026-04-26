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
        // Full HD (1080p)
        { size: 27, ratio: '16:9', h: 1920, v: 1080 },
        { size: 32, ratio: '16:9', h: 1920, v: 1080 },

        // QHD (1440p)
        { size: 27, ratio: '16:9', h: 2560, v: 1440 },
        { size: 32, ratio: '16:9', h: 2560, v: 1440 },

        // 4K UHD (2160p)
        { size: 27, ratio: '16:9', h: 3840, v: 2160 },
        { size: 32, ratio: '16:9', h: 3840, v: 2160 },
        { size: 42, ratio: '16:9', h: 3840, v: 2160 },
        { size: 43, ratio: '16:9', h: 3840, v: 2160 },
        { size: 55, ratio: '16:9', h: 3840, v: 2160 },

        // 6K (Apple Pro Display XDR)
        { size: 32, ratio: '16:9', h: 6016, v: 3384 },

        // 8K
        { size: 32, ratio: '16:9', h: 7680, v: 4320 },
      ]}
    />
  </>
)

export const Route = createLazyFileRoute('/preset/16by9')({
  component: Component,
})
