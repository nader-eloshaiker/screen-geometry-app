import { type ScreenInput } from '@screengeometry/lib-api/spec'
export const ScreenDataEnum = {
  diagonalSize: 'diagonalSize',
  aspectRatio: 'aspectRatio',
  hRes: 'hRes',
  vRes: 'vRes',
  lightColor: 'lightColor',
  darkColor: 'darkColor',
}

export type ScreenDataType = keyof ScreenInput

export interface Dimensions {
  width: number
  height: number
}
