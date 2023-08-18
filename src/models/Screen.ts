export enum ScreenDataEnum {
  diagonalSize = 'diagonalSize',
  aspectRatio = 'aspectRatio',
  hRes = 'hRes',
  vRes = 'vRes',
}

export interface IScreenDataInput {
  diagonalSize: number
  aspectRatio: string
  hRes: number | undefined
  vRes: number | undefined
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

export interface IScreenColor {
  r: number
  g: number
  b: number
}

export interface IScreenRender {
  width: number
  height: number
  color: IScreenColor
  pixelSize?: number
}

export interface IScreen {
  id: string
  tag: IScreenDataInput
  data: IScreenData
  spec?: IScreenSpec
  render?: IScreenRender
  favorite: boolean
}

export interface IDimension {
  width: number
  height: number
}
