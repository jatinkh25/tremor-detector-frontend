import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import styles from './App.module.scss'
import Canvas from './components/canvas'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [acclerometerData, setAcclerometerData] = useState([])
  const [gyroData, setGyroData] = useState([])
  const [magnetometerData, setMagnetometerData] = useState([])
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    const listener = (event: any) => {
      if (event.key === 'p' || event.key === 'P') {
        setIsShaking((isShaking) => !isShaking)
      }
    }

    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const s = io(import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3001')
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  // getting changes of other users
  useEffect(() => {
    if (socket == null) return

    const handleChange = (delta: string) => {
      // setAcclerometerData((data) => [
      //   ...data,
      //   { x: delta.split(',').slice(0, 2)[0], y: delta.split(',').slice(0, 2)[1] },
      // ])
      // setGyroData((data) => [...data, ...delta.split(',').slice(2, 5)])
      // setMagnetometerData((data) => [...data, ...delta.split(',').slice(5)])
    }

    socket.on('get-delta', handleChange)

    return () => {
      socket.off('get-delta', handleChange)
    }
  }, [socket])

  return (
    <div className={styles.wrapper}>
      <h1>Tremor Detector</h1>
      {isShaking && <p>Tremor Detected</p>}
      <div className={styles.canvas_container}>
        <Canvas isShaking={isShaking} />
      </div>
    </div>
  )
}

export default App
