import { ScreenInput } from '@openapi/generated/models'
import { createCSSColor } from '@utils/ScreenCalc'

export const DefaultInputValues = () => {
  const color = createCSSColor()
  const value: Partial<ScreenInput> = {
    aspectRatio: undefined,
    diagonalSize: undefined,
    hRes: undefined,
    vRes: undefined,
    lightColor: color.lightColor,
    darkColor: color.darkColor,
  }

  return value
}
