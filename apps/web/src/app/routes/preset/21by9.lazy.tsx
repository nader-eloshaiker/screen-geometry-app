import { SharePage } from '@/app/pages/SharePage'
import { createLazyFileRoute } from '@tanstack/react-router'

const Component = () => (
  <>
    <article>
      <title>Screen Geometry: 21:9 Ultrawide Monitors - 52" 6K, 40" 4K, 38" UW4K, 34" UWQHD</title>
      <meta
        name='description'
        content='Compare premium 21:9 ultrawide monitors: 52" 6K (6144x2560), 40" 4K (5120x2160), 38" UW4K (3840x1600), and 34" UWQHD (3440x1440). Perfect for gaming and productivity.'
      />
      <meta
        name='keywords'
        content='21:9 ultrawide, 52" 6K ultrawide, 6144x2560, 40" 4K ultrawide, 5120x2160, 38" UW4K, 3840x1600, 34" UWQHD, 3440x1440, ultrawide gaming monitor, ultrawide productivity, premium ultrawide, LG 38WN95C, Dell U4021QW, Samsung Odyssey G9, ultrawide comparison, 21:9 aspect ratio, best ultrawide monitor'
      />
      <link rel='canonical' href='https://screengeometry.com/preset/21by9' />
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

export const Route = createLazyFileRoute('/preset/21by9')({
  component: Component,
})
