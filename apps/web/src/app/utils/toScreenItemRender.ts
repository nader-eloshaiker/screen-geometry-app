import type { ScreenItemRender } from '@/app/models/screenItemRender'
import type { Dimensions } from '@screengeometry/lib-api/extended'
import type { ScreenItem } from '@screengeometry/lib-api/spec'

export const toScreenItemRender = (screen: ScreenItem, biggest?: Dimensions) => {
  return {
    ...screen,
    render:
      screen.visible && biggest
        ? {
            width: screen.specs.hSize / biggest.width,
            height: screen.specs.vSize / biggest.height,
          }
        : { width: 0, height: 0 },
  } as ScreenItemRender
}
