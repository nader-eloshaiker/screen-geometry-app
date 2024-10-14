import { ScreenInput } from '@/lib/openapi/generated'
import { createCSSColor } from '@/lib/utils/ScreenCalc'

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
