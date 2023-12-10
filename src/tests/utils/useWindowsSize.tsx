import { useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
