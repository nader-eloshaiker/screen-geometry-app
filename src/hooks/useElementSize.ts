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
    if (target.current !== null && target.current !== undefined) {
      const { height, width, x, y } = target.current.getBoundingClientRect()
      setSize({ height, width, x, y })
    }
  }, [target])

  useResizeObserver(target, (entry) => setSize(entry.contentRect))

  return size
}
