import { useCallback, useEffect, useState } from 'react'

const useResponsiveSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const setSizes = useCallback(() => {
    setWidth(window.innerWidth)
    setHeight(700)
  }, [setWidth, setHeight])

  useEffect(() => {
    window.addEventListener('resize', setSizes)
    setSizes()
  }, [setSizes])

  return { width, height }
}

export default useResponsiveSize
