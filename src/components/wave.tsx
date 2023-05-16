import WaveEntity from '../entity/WaveEntity'
import { useCanvasContext } from '../hooks/useCanvas'
import useColor from '../hooks/useColor'
import useResponsiveSize from '../hooks/useResponsiveSize'

interface WaveProps {
  isShaking: boolean
}

const Wave = ({ isShaking }: WaveProps) => {
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()
  const { generateColor } = useColor()

  let frequency = status === 'play' ? 0.03 : 0
  const colors: { [key: string]: string } = generateColor()
  let timer = 1
  const waveLength = isShaking ? [0.11, 0.02, 0.015] : [0, 0, 0]
  const waves = {
    frontWave: new WaveEntity(waveLength, 'rgba(255,179,0,0.88)'),
    // backWave: new WaveEntity([body0.0122, 0.018, 0.005], 'rgba(255,179,0,0.48)'),
  }

  const render = () => {
    context?.clearRect(0, 0, width, height)
    Object.entries(waves).forEach(([waveName, wave]) => {
      wave.waveColor = colors[waveName]
      wave.draw(context!, width, height, frequency)
    })
    // if (timer === 500) {
    //   colors = generateColor()
    //   timer = 1
    // }
    timer++
    frequency += isShaking ? 0.15 : 0
    requestAnimationFrame(render)
  }
  if (context) render()
  return null
}

export default Wave
