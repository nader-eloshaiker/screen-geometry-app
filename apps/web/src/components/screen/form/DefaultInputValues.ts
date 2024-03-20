import { ScreenInput } from '@screengeometry/openapi'
import { createCSSColor } from '@screengeometry/utils'

export const DefaultInputValues = () => {
  const color = createCSSColor()
  const value: ScreenInput = {
    aspectRatio: null,
    diagonalSize: null,
    hRes: null,
    vRes: null,
    lightColor: color.lightColor,
    darkColor: color.darkColor,
  }

  return value
}
