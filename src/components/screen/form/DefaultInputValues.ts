import { ScreenInput } from '@openapi/generated/models'
import { createCSSColor } from '@utils/ScreenCalc'

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
