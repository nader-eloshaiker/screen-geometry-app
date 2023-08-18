import { IDataBaseEntry, ISearch, ISearchData, ISearchSpec } from '../models/Database'
import { IScreen, IScreenDataInput } from '../models/Screen'

const getAspectRatio = (str: string) => {
  const [width, height] = str.split(':')
  return [parseFloat(width), parseFloat(height)]
}

const generateLabel = (entry: IDataBaseEntry, data: ISearchData) => {
  let str = entry.name

  if (entry.size && entry.size !== 0) {
    str += ` ${entry.size}"`
  }

  if (entry.width && entry.height !== 0) {
    str += ` ${entry.width}x${entry.height}`
  }

  str += ` ${data.hApsectRatio}:${data.vApsectRatio}`

  return str
}

const createSpec = (width?: number, height?: number, size?: number): ISearchSpec | undefined => {
  if (!width || !height) {
    return undefined
  }
  return {
    hRes: width,
    vRes: height,
    ppi: size && Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / size,
  }
}

export const transformScreen = (data: IScreenDataInput): IScreen => {
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

export const transformSearchData = (entry: IDataBaseEntry): ISearch => {
  const [hApsectRatio, vApsectRatio] = getAspectRatio(entry.aspectRatio)

  const data: ISearchData = {
    hApsectRatio,
    vApsectRatio,
  }

  if (entry.size && entry.size !== 0) {
    data.hSize = hApsectRatio * (entry.size / Math.sqrt(Math.pow(hApsectRatio, 2) + Math.pow(vApsectRatio, 2)))
    data.vSize = vApsectRatio * (entry.size / Math.sqrt(Math.pow(hApsectRatio, 2) + Math.pow(vApsectRatio, 2)))
  }

  const spec = createSpec(entry.width, entry.height, entry.size)

  const item: ISearch = {
    id: `${entry.name}${entry.size || ''}${entry.aspectRatio}`,
    label: generateLabel(entry, data),
    tag: {
      diagonalSize: entry.size,
      aspectRatio: entry.aspectRatio,
    },
    data,
    spec,
  }

  return item
}
