import type { ScreenColor } from '@screengeometry/lib-api/spec'
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

export const createScreenColors = (): ScreenColor => {
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
