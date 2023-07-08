export interface IScreenSpec {
  id: string
  diagonalSize: number
  aspectRatio: string
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

export type TScreenData = {
  diagonalSize: number
  aspectRatio: string
}
