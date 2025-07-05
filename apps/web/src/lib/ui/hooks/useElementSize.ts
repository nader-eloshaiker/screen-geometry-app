import useResizeObserver from '@react-hook/resize-observer'
import { RefObject, useLayoutEffect, useState } from 'react'

const initRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
}
export type ElementSize = typeof initRect
type Options = { px?: number; py?: number }

export const useElementSize = (target: RefObject<HTMLElement>, options?: Options) => {
  const { px = 0, py = 0 } = options ?? {}
  const [size, setSize] = useState<ElementSize>(initRect)

  useLayoutEffect(() => {
    const { height, width, x, y } = target.current?.getBoundingClientRect() ?? initRect
    setSize({ height: height + 2 * py, width: width + 2 * px, x: x - px, y: y - py })
  }, [px, py, target])

  // where the magic really happens
  useResizeObserver(target, (entry) => {
    const { height, width, x, y } = entry.contentRect
    setSize({ height: height + 2 * py, width: width + 2 * px, x: x - px, y: y - py })
  })

  return size
}
