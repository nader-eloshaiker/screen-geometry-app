import { ScreenInput, ScreenItem, ScreenSpec, SearchItem } from '@packages/openapi/generated'
import { SearchData, SearchScreenItem } from '@packages/openapi/models'

const getAspectRatio = (str: string | undefined | null) => {
  const [width, height] = str?.split(':') ?? []
  return [parseFloat(width ?? '1'), parseFloat(height ?? '1')] as const
}

const generateLabel = (entry: SearchItem, data: SearchData) => {
  let str = entry.name

  if (entry.diagonalSize && entry.diagonalSize !== 0) {
    str += ` ${entry.diagonalSize}"`
  }

  if (entry.hRes && entry.vRes !== 0) {
    str += ` ${entry.hRes}x${entry.vRes}`
  }

  str += ` ${data.hAspectRatio}:${data.vAspectRatio}`

  return str
}

const createSpec = (width: number, height: number, size: number) => {
  return {
    hRes: width,
    vRes: height,
    ppi: Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / size, // size is optional for search data
  }
}

const createSearchSpec = (width?: number, height?: number, size?: number): ScreenSpec | undefined => {
  if (!width || !height) {
    return undefined
  }
  return {
    hRes: width,
    vRes: height,
    ppi: size ? Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / size : 0, // size is optional for search data
  }
}

export const transformScreenItem = (data: ScreenItem): ScreenInput => {
  const item: ScreenInput = {
    diagonalSize: data.tag.diagonalSize,
    aspectRatio: data.tag.aspectRatio,
    hRes: data.spec.hRes,
    vRes: data.spec.vRes,
    lightColor: data.color.lightColor,
    darkColor: data.color.darkColor,
  }

  return item
}

export const transformScreenInput = ({
  diagonalSize,
  aspectRatio,
  hRes,
  vRes,
  lightColor,
  darkColor,
}: ScreenInput): Omit<ScreenItem, 'id'> => {
  const [hAspectRatio, vAspectRatio] = getAspectRatio(aspectRatio)
  const hSize = hAspectRatio * (diagonalSize / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2)))
  const vSize = vAspectRatio * (diagonalSize / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2)))
  const item: Omit<ScreenItem, 'id'> = {
    tag: {
      diagonalSize,
      aspectRatio,
    },
    data: {
      hSize,
      vSize,
      hAspectRatio,
      vAspectRatio,
    },
    spec: createSpec(hRes, vRes, diagonalSize),
    color: {
      lightColor,
      darkColor,
    },
    visible: true,
    signature: `dSize=${diagonalSize}&aRatio=${aspectRatio}&hRes=${hRes}&vRes=${vRes}`,
  }

  return item
}

export const transformSearchData = (entry: SearchItem): SearchScreenItem => {
  const [hAspectRatio, vAspectRatio] = getAspectRatio(entry.aspectRatio)

  const data: SearchData = {
    hAspectRatio,
    vAspectRatio,
  }

  if (entry.diagonalSize && entry.diagonalSize !== 0) {
    data.hSize = hAspectRatio * (entry.diagonalSize / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2)))
    data.vSize = vAspectRatio * (entry.diagonalSize / Math.sqrt(Math.pow(hAspectRatio, 2) + Math.pow(vAspectRatio, 2)))
  }

  const spec = createSearchSpec(entry.hRes, entry.vRes, entry.diagonalSize)

  const item: SearchScreenItem = {
    id: `${entry.name}${entry.diagonalSize ?? ''}${entry.aspectRatio}`,
    label: generateLabel(entry, data),
    tag: {
      diagonalSize: entry.diagonalSize,
      aspectRatio: entry.aspectRatio,
    },
    data,
    spec,
  }

  return item
}
