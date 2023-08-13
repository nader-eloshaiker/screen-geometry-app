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
}

export interface IScreenRender {
  width: number
  height: number
  pixelSize?: number
  color: {
    r: number
    g: number
    b: number
  }
}

export interface IScreen {
  id: string
  tag: IScreenDataInput
  data: IScreenData
  spec?: IScreenSpec
  render: IScreenRender
  favorite: boolean
}

export enum ScreenDataEnum {
  diagonalSize = 'diagonalSize',
  aspectRatio = 'aspectRatio',
}

type ScreenDataEnumKeys = keyof typeof ScreenDataEnum
type ScreenDataEnumFields = { [key in ScreenDataEnumKeys]: number | string }
