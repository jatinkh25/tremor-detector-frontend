import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import styles from './App.module.scss'
import Canvas from './components/canvas'

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  // const [acclerometerData, setAcclerometerData] = useState([])
  // const [gyroData, setGyroData] = useState([])
  // const [magnetometerData, setMagnetometerData] = useState([])
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    const listener = (event: any) => {
      if (event.key === 'p' || event.key === 'P') {
        setIsShaking((isShaking) => {
          if (!isShaking) {
            new window.Notification('Touch Event', {
              body: 'Tremor Detected',
            })
          }
          return !isShaking
        })
      }
    }

    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  useEffect(() => {
    // Request permission to display notifications
    window.Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permission Granted')
      }
    })
  }, [])

  useEffect(() => {
    // setIsLoading(true)
    const s = io(import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3001')
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  // getting changes of other users
  useEffect(() => {
    if (socket == null) return

    const handleChange = () => {
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

  const handleTouch = () => {
    if ('Notification' in window && window.Notification.permission === 'granted') {
      setIsShaking((isShaking) => !isShaking)
      // Create a notification
      new window.Notification('Touch Event', {
        body: 'Tremor Detected',
      })
    } else if ('Notification' in window && window.Notification.permission !== 'denied') {
      // Request permission to display notifications
      window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permission Granted')
        }
      })
    }
  }

  return (
    <div className={styles.wrapper} onTouchStart={handleTouch}>
      <h1>Tremor Detector</h1>
      {isShaking && <p>Tremor Detected</p>}
      <div className={styles.canvas_container}>
        <Canvas isShaking={isShaking} />
      </div>
    </div>
  )
}

export default App
