import { ScreenInput } from '@packages/openapi/generated'
import { createCSSColor } from '@packages/utils/ScreenCalc'

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
