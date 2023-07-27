export interface IDataBaseEntry {
  name: string
  size?: number
  width: number
  height: number
  aspectRatio: string
}

export interface ISearchData {
  id: string
  tag: {
    diagonalSize?: number
    aspectRatio: string
  }
  data: {
    hSize?: number
    vSize?: number
    hApsectRatio: number
    vApsectRatio: number
  }
  spec?: {
    hRes: number
    vRes: number
    ppi: number
    refreshRate?: number
  }
}
