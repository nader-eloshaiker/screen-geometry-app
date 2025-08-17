import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

// Reference
// https://github.com/djkepa/custom-react-hooks/blob/main/packages/use-element-size/src/index.tsx

export interface Size {
  width: number
  height: number
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [(node: T | null) => void, Size] => {
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  const handleSize = useCallback(() => {
    if (ref) {
      setSize({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      })
    }
  }, [ref])

  const useEnviromentEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useEnviromentEffect(() => {
    if (!ref) return

    handleSize()

    const resizeObserver = new ResizeObserver(handleSize)
    resizeObserver.observe(ref)

    return () => resizeObserver.disconnect()
  }, [ref, handleSize])

  return [setRef, size]
}
