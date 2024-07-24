import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import axios from 'axios'
import { CameraIcon, CircleStopIcon, ClockIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FullPageSpinner from './components/full-page-spinner'
import PictureDialogBox from './components/picture-dialog-box'

const timerValues = ['0', '5', '10', '30']

export default function ScreenshotDashboard() {
  const [screenshots, setScreenshots] = useState<string[]>([''])
  const [loading, setLoading] = useState(true)
  const [screenLoading, setScreenLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [timer, setTimer] = useState<number>(0)
  const [cnt, setCnt] = useState<number>(0)

  const location = useLocation()
  const navigate = useNavigate()
  const id: string = location.state.user._id
  const name: string = location.state.user.name

  useEffect(() => {
    getScreenshots()
  }, [])

  const getScreenshots = async () => {
    try {
      const response = await axios(`http://localhost:8000/screenshots/${id}`, {
        method: 'GET'
      })
      setScreenshots(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const takeScreenshot = async () => {
    setScreenLoading(true)
    try {
      await window.api.startCapture(id)
      // Create a promise for the screenshot capture
      await new Promise<string>((resolve, reject) => {
        window.api.screenShotCaptured((_event: any, url: string) => {
          if (url) {
            resolve(url)
          } else {
            reject(new Error('Failed to capture screenshot'))
          }
        })
      })
        .then((url) => {
          setScreenshots((prev) => [...prev, url])
        })
        .then(() => setScreenLoading(false))
    } catch (error) {
      console.log(error)
    } finally {
      setScreenLoading(false)
    }
  }

  const handleDeleteScreenshot = async (screenshot: string) => {
    setDeleteLoading(true)
    try {
      await axios(`http://localhost:8000/screenshots/delete`, {
        method: 'DELETE',
        data: { userId: id, imageUrl: screenshot }
      })
      setScreenshots((prev) => prev.filter((image) => image !== screenshot))
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  // timer logic

  useEffect(() => {
    let interval
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    if (timer === 0) {
      isTimerRunning && takeScreenshot()
      setIsTimerRunning(false)
    }
  }, [timer])

  const handleTimerChange = (value) => {
    setCnt(parseInt(value))
    setTimer(parseInt(value))
    setIsTimerRunning(false)
  }

  const handleStartTimer = () => {
    timer > 0 && setIsTimerRunning(true)
    timer === 0 && takeScreenshot()
  }

  const handleStopTimer = () => {
    setTimer(cnt)
    setIsTimerRunning(false)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center justify-between h-16 px-6 border-b border-muted">
        <div className="flex items-center gap-4">
          <p
            className="font-semibold mr-4 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Go back
          </p>
          <p>
            Welcome, <span className="text-lg capitalize">{name}.</span>
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button disabled={screenLoading} onClick={handleStartTimer}>
            <CameraIcon className="w-5 h-5 mr-2" />
            {screenLoading ? 'Capturing...' : 'Take Screenshot'}
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ClockIcon className="w-5 h-5" />
            <Select value={cnt.toString()} onValueChange={handleTimerChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timerValues.map((value, index) => (
                  <SelectItem key={index} value={value}>
                    {value}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isTimerRunning && <div className="font-medium">{timer}s</div>}
            {isTimerRunning && (
              <Button variant="ghost" size="icon" onClick={handleStopTimer}>
                <CircleStopIcon className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </header>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <React.Fragment>
          {screenshots.length === 0 ? (
            <div className="flex flex-1 items-center justify-center capitalize">No screenshots</div>
          ) : (
            <main className="flex-1 p-6 grid gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="relative group">
                  <PictureDialogBox
                    open={open}
                    setOpen={setOpen}
                    screenshot={screenshot}
                    deleteLoading={deleteLoading}
                    handleDeleteScreenshot={handleDeleteScreenshot}
                  />
                </div>
              ))}
            </main>
          )}
        </React.Fragment>
      )}
    </div>
  )
}
