import { IDimension, IScreen, IScreenColor } from '../models/Screen'
import { getRandomInt } from './RandomNumber'

export const getMaxScreenSize = (screens: Array<IScreen>) =>
  screens.reduce(
    (acc, screen) => {
      const width = screen.data.hSize
      const height = screen.data.vSize
      return { width: Math.max(acc.width, width), height: Math.max(acc.height, height) } as IDimension
    },
    { width: 0, height: 0 } as IDimension,
  )

export const normaliseScreenRender = (list: IScreen[]) => {
  if (list.length === 0) {
    return list
  }

  const sorted = list.sort((a, b) => a.tag.diagonalSize - b.tag.diagonalSize)
  const biggest = getMaxScreenSize(sorted)

  for (const screen of sorted) {
    const color = screen.render?.color
    screen.render = {
      width: screen.data.hSize / biggest.width,
      height: screen.data.vSize / biggest.height,
      color: {
        r: color?.r || getRandomInt(256),
        g: color?.g || getRandomInt(256),
        b: color?.b || getRandomInt(256),
      },
    }
  }

  return sorted
}

export const createCSSColor = (color?: IScreenColor, alpha?: number) =>
  color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha || 1})` : 'transparent'
