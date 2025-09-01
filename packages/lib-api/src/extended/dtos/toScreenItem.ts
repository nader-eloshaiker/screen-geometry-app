import type { ScreenInput, ScreenItem } from '@/generated/server/models'

const getAspectRatio = (str: string) => {
  const [width, height] = str.indexOf(':') === -1 ? [] : str.split(':')
  return [parseFloat(width ?? '1'), parseFloat(height ?? '1')] as const
}

export const toScreenItem = ({
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
