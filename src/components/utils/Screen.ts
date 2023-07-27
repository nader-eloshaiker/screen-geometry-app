import { IDataBaseEntry, ISearchData } from '../../models/Database'
import { IScreen, IScreenDataInput } from '../../models/Screen'

const getAspectRatio = (str: string) => {
  const [width, height] = str.split(':')
  return [parseFloat(width), parseFloat(height)]
}

export const createScreen = (data: IScreenDataInput): IScreen => {
  const [hApsectRatio, vApsectRatio] = getAspectRatio(data.aspectRatio)
  const item: IScreen = {
    id: Math.random().toString(36).substring(2, 9),
    tag: data,
    data: {
      hSize: hApsectRatio * (data.diagonalSize / Math.sqrt(Math.pow(hApsectRatio, 2) + Math.pow(vApsectRatio, 2))),
      vSize: vApsectRatio * (data.diagonalSize / Math.sqrt(Math.pow(hApsectRatio, 2) + Math.pow(vApsectRatio, 2))),
      hApsectRatio,
      vApsectRatio,
    },
    favorite: false,
  }

  return item
}

export const createSearchData = (data: IDataBaseEntry): ISearchData => {
  const [hApsectRatio, vApsectRatio] = getAspectRatio(data.aspectRatio)

  const item: ISearchData = {
    id: data.name,
    tag: {
      diagonalSize: data.size,
      aspectRatio: data.aspectRatio,
    },
    data: {
      hSize: data.size && hApsectRatio * (data.size / Math.sqrt(Math.pow(hApsectRatio, 2) + Math.pow(vApsectRatio, 2))),
      vSize: data.size && vApsectRatio * (data.size / Math.sqrt(Math.pow(hApsectRatio, 2) + Math.pow(vApsectRatio, 2))),
      hApsectRatio,
      vApsectRatio,
    },
  }

  return item
}
