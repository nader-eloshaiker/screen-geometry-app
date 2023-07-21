export interface IScreenData extends ScreenDataEnumFields {
  diagonalSize: number
  aspectRatio: string
}
export interface IScreenSpec extends IScreenData {
  id: string
  aspectRatioFloat: number
  hSize: number
  vSize: number
  hRes?: number
  vRes?: number
  ppi?: number
  favorite?: boolean
  refreshRate?: number
  notes?: string
}

export enum ScreenDataEnum {
  diagonalSize = 'diagonalSize',
  aspectRatio = 'aspectRatio',
}

type ScreenDataEnumKeys = keyof typeof ScreenDataEnum
type ScreenDataEnumFields = { [key in ScreenDataEnumKeys]: number | string }
