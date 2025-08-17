import type { ScreenInput, ScreenItem } from '@screengeometry/lib-api/spec'

const getAspectRatio = (str: string | undefined | null) => {
  const [width, height] = str?.split(':') ?? []
  return [parseFloat(width ?? '1'), parseFloat(height ?? '1')] as const
}

// const generateLabel = (entry: SearchItem) => {
//   let str = entry.name

//   if (entry.diagonalSize && entry.diagonalSize !== 0) {
//     str += ` ${entry.diagonalSize}"`
//   }

//   if (entry.hRes && entry.vRes !== 0) {
//     str += ` ${entry.hRes}x${entry.vRes}`
//   }

//   str += ` ${entry.aspectRatio}`

//   return str
// }

export const transformScreenItem = (screen: ScreenItem) => {
  const item: ScreenInput = {
    diagonalSize: screen.data.diagonalSize,
    aspectRatio: screen.data.aspectRatio,
    hRes: screen.data.hRes,
    vRes: screen.data.vRes,
    lightColor: screen.color.lightColor,
    darkColor: screen.color.darkColor,
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
  const ppi = Math.sqrt(Math.pow(hRes, 2) + Math.pow(vRes, 2)) / diagonalSize
  const item: Omit<ScreenItem, 'id'> = {
    specs: {
      hSize,
      vSize,
      hAspectRatio,
      vAspectRatio,
      ppi,
    },
    data: { hRes, vRes, diagonalSize, aspectRatio }, // createSpec(hRes, vRes, diagonalSize),
    color: {
      lightColor,
      darkColor,
    },
    visible: true,
    signature: `dSize=${diagonalSize}&aRatio=${aspectRatio}&hRes=${hRes}&vRes=${vRes}`,
  }

  return item
}
