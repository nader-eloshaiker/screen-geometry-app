import useResizeObserver from '@react-hook/resize-observer'
import { RefObject, useLayoutEffect, useState } from 'react'

const initRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
}
export type ElementSize = typeof initRect

export const useElementSize = (target: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<ElementSize>(initRect)

  useLayoutEffect(() => {
    const { height, width, x, y } = target.current?.getBoundingClientRect() ?? initRect
    setSize({ height, width, x, y })
  }, [target])

  // where the magic really happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))

  return size
}
