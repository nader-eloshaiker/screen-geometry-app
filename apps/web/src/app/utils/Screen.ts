import type { Dimensions } from '@screengeometry/lib-api/extended'
import type { ScreenItem } from '@screengeometry/lib-api/spec'

export const getMaxScreenSize = (screens: Array<ScreenItem>) =>
  screens
    .filter((screen) => screen.visible)
    .reduce(
      (acc, screen) => {
        const width = screen.specs.hSize
        const height = screen.specs.vSize
        return { width: Math.max(acc.width, width), height: Math.max(acc.height, height) } as Dimensions
      },
      { width: 0, height: 0 } as Dimensions
    )
