import { ScreenInput } from '@packages/openapi/generated'
import { createCSSColor } from '@packages/utils/ScreenCalc'

export const DefaultInputValues = () => {
  const color = createCSSColor()
  const value: UndefinableObj<ScreenInput> = {
    aspectRatio: undefined,
    diagonalSize: undefined,
    hRes: undefined,
    vRes: undefined,
    lightColor: color.lightColor,
    darkColor: color.darkColor,
  }

  return value
}
