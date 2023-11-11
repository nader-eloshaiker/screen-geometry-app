import { ScreenInput } from '../../../../generated/openapi/models'
import { createCSSColor } from '../../../../utils/ScreenCalc'

export const DefaultValues = () => {
  const color = createCSSColor()
  const value: ScreenInput = {
    aspectRatio: '',
    diagonalSize: 0,
    hRes: 0,
    vRes: 0,
    lightColor: color.lightColor,
    darkColor: color.darkColor,
  }

  return value
}
