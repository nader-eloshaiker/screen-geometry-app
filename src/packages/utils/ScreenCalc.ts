import { ScreenItemRender } from '@app/models/screenItemRender'
import { ScreenColor, ScreenItem } from '@packages/openapi/generated'
import { Dimensions } from '@packages/openapi/models'
import { lightness } from 'simpler-color'

const hslToHex = (hue: number, saturation: number, light: number) => {
  const lightPercentage = light / 100
  const alpha = (saturation * Math.min(lightPercentage, 1 - lightPercentage)) / 100
  const toHex = (n: number) => {
    const k = (n + hue / 30) % 12
    const color = lightPercentage - alpha * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${toHex(0)}${toHex(8)}${toHex(4)}`
}

export const getMaxScreenSize = (screens: Array<ScreenItem>) =>
  screens
    .filter((screen) => screen.visible)
    .reduce(
      (acc, screen) => {
        const width = screen.data.hSize
        const height = screen.data.vSize
        return { width: Math.max(acc.width, width), height: Math.max(acc.height, height) } as Dimensions
      },
      { width: 0, height: 0 } as Dimensions,
    )

export const normaliseScreenRender = (list: ScreenItem[]) => {
  const biggest = getMaxScreenSize(list)
  // sort in reverse order to avoid using z-index when hovering over panel
  const sorted = list
    .map((item) => toScreenItemRender(item, biggest))
    .sort((a, b) => b.tag.diagonalSize - a.tag.diagonalSize)

  return sorted
}

export const toScreenItemRender = (screen: ScreenItem, biggest?: Dimensions) => {
  return {
    ...screen,
    render:
      screen.visible && biggest
        ? {
            width: screen.data.hSize / biggest.width,
            height: screen.data.vSize / biggest.height,
          }
        : { width: 0, height: 0 },
  } as ScreenItemRender
}

export const createCSSColor = (): ScreenColor => {
  const hue = Math.random() * 360
  const saturation = Math.random() * 100
  const light = Math.random() * 50 // 100
  // const randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  const baseColor = hslToHex(hue, saturation, light)

  return {
    lightColor: lightness(baseColor, 65),
    darkColor: lightness(baseColor, 30),
  }
}
