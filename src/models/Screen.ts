export interface IScreenDataInput extends ScreenDataEnumFields {
  diagonalSize: number
  aspectRatio: string
}

export interface IScreenData {
  hSize: number
  vSize: number
  hApsectRatio: number
  vApsectRatio: number
}

export interface IScreenSpec {
  hRes: number
  vRes: number
  ppi: number
  refreshRate?: number
}
export interface IScreen {
  id: string
  tag: IScreenDataInput
  data: IScreenData
  spec?: IScreenSpec
  favorite: boolean
  notes?: string
}

export enum ScreenDataEnum {
  diagonalSize = 'diagonalSize',
  aspectRatio = 'aspectRatio',
}

type ScreenDataEnumKeys = keyof typeof ScreenDataEnum
type ScreenDataEnumFields = { [key in ScreenDataEnumKeys]: number | string }
