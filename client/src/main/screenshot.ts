import axios from 'axios'
import { Display, desktopCapturer, screen } from 'electron'

interface options {
  types: ('screen' | 'window')[]
  thumbnailSize: { width: number; height: number }
}

export async function captureScreen(id: string): Promise<string> {
  const primaryDisplay: Display = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.size
  const options: options = {
    types: ['screen'],
    thumbnailSize: { width, height }
  }
  const sources = await desktopCapturer.getSources(options)
  await axios.post('http://localhost:8000/screenshots/', {
    userId: id,
    imageUrl: sources[0].thumbnail.toPNG().toString('base64')
  })
  // Return image data
  return sources[0].thumbnail.toPNG().toString('base64')
} // function to capture screen and send to server
