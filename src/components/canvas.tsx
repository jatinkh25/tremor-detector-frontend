import { useRef, useEffect, useState } from 'react'

import Wave from './wave'
import { CanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'

interface CanvasProps {
  isShaking: boolean
}

const Canvas = ({ isShaking }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useResponsiveSize()

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext('2d')
    if (ctx) setContext(ctx)
  }, [])

  return (
    <>
      <CanvasContext.Provider value={{ context: context }}>
        <canvas id="canvas" ref={canvasRef} width={width} height={height}></canvas>
        <Wave isShaking={isShaking} />
      </CanvasContext.Provider>
    </>
  )
}

export default Canvas
