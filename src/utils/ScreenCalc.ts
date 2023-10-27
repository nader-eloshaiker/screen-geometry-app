import { lightness } from 'simpler-color'
import { ScreenColor, ScreenItem } from '../generated/openapi/models'
import { Dimensions } from '../models/Screen'

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
  screens.reduce(
    (acc, screen) => {
      const width = screen.data.hSize
      const height = screen.data.vSize
      return { width: Math.max(acc.width, width), height: Math.max(acc.height, height) } as Dimensions
    },
    { width: 0, height: 0 } as Dimensions,
  )

export const normaliseScreenRender = (list: ScreenItem[]) => {
  if (list.length === 0) {
    return list
  }

  const sorted = list.sort((a, b) => a.tag.diagonalSize - b.tag.diagonalSize)
  const biggest = getMaxScreenSize(sorted)

  for (const screen of sorted) {
    screen.render = {
      width: screen.data.hSize / biggest.width,
      height: screen.data.vSize / biggest.height,
    }
  }

  return sorted
}

export const createCSSColor = (): ScreenColor => {
  const hue = Math.random() * 360
  const saturation = Math.random() * 50 // 100
  const light = Math.random() * 50 // 100
  // const randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  const baseColor = hslToHex(hue, saturation, light)

  return {
    lightColor: lightness(baseColor, 60),
    darkColor: lightness(baseColor, 40),
  }
}
