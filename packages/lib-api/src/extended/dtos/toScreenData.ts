import type { ScreenData } from '../../generated/server/models/screenData'
import { ScreenItemRender } from './../../../../../apps/web/src/app/models/screenItemRender'

export const isScreenDataEqual = (screenData: ScreenData, other: ScreenItemRender) =>
  screenData.diagonalSize === other.data.diagonalSize &&
  screenData.aspectRatio === other.data.aspectRatio &&
  screenData.hRes === other.data.hRes &&
  screenData.vRes === other.data.vRes
