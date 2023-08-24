import { ScreenInput, ScreenItem, ScreenSpec } from '../generated/openapi/models'
import { DataBaseEntry, SearchData, SearchItem } from '../models/Database'
import { getRandomInt } from './RandomNumber'

const getAspectRatio = (str: string) => {
  const [width, height] = str.split(':')
  return [parseFloat(width), parseFloat(height)]
}

const generateLabel = (entry: DataBaseEntry, data: SearchData) => {
  let str = entry.name

  if (entry.size && entry.size !== 0) {
    str += ` ${entry.size}"`
  }

  if (entry.width && entry.height !== 0) {
    str += ` ${entry.width}x${entry.height}`
  }

  str += ` ${data.hAspectRatio}:${data.vAspectRatio}`

  return str
}

const createSpec = (width?: number, height?: number, size?: number): ScreenSpec | undefined => {
  if (!width || !height) {
    return undefined
  }
  return {
    hRes: width,
    vRes: height,
    ppi: size ? Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / size : 0, // size is optional for search data
  }
}

export const transformScreenInput = (data: ScreenInput): ScreenItem => {
  const [hAspectRatio, vAspectRatio] = getAspectRatio(data.aspectRatio)
  const item: ScreenItem = {
    id: Math.random().toString(36).substring(2, 9),
    tag: data,
    data: {
      hSize: hAspectRatio * (data.diagonalSize / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2))),
      vSize: vAspectRatio * (data.diagonalSize / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2))),
      hAspectRatio,
      vAspectRatio,
    },
    spec: createSpec(data.hRes, data.vRes, data.diagonalSize),
    render: {
      color: {
        r: getRandomInt(256),
        g: getRandomInt(256),
        b: getRandomInt(256),
      },
    },
    favorite: false,
  }

  return item
}

export const transformSearchData = (entry: DataBaseEntry): SearchItem => {
  const [hAspectRatio, vAspectRatio] = getAspectRatio(entry.aspectRatio)

  const data: SearchData = {
    hAspectRatio,
    vAspectRatio,
  }

  if (entry.size && entry.size !== 0) {
    data.hSize = hAspectRatio * (entry.size / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2)))
    data.vSize = vAspectRatio * (entry.size / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2)))
  }

  const spec = createSpec(entry.width, entry.height, entry.size)

  const item: SearchItem = {
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
