import { ScreenItem } from '@packages/openapi/generated'

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
