import type { ScreenInput, ScreenItem } from '@/generated/server/models'

export const toScreenInput = (screen: ScreenItem) => {
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
