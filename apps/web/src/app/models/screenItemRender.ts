import type { ScreenItem } from '@screengeometry/lib-api/spec'

/**
 * Screen representation in UI
 */
export interface ScreenItemRender extends ScreenItem {
  render: {
    height?: number
    pixelSize?: number
    width?: number
  }
}
