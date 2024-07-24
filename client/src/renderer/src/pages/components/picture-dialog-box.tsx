import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import Spinner from '../components/spinner'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  screenshot: string
  deleteLoading: boolean
  handleDeleteScreenshot: (screenshot: string) => void
}

export default function PictureDialogBox({
  open,
  setOpen,
  screenshot,
  deleteLoading,
  handleDeleteScreenshot
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="rounded-lg overflow-hidden cursor-pointer transition-all group-hover:scale-[1.02] group-hover:shadow-lg">
          <img
            src={`data:image/png;base64,${screenshot}`}
            width={300}
            height={200}
            alt="Screenshot"
            className="w-full h-auto object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent aria-describedby="screenshot-box" className="max-w-[90vw] overflow-hidden">
        <DialogTitle className="text-center">
          <small>Image Preview</small>
        </DialogTitle>
        <div className="relative w-full h-full">
          <img
            src={`data:image/png;base64,${screenshot}`}
            width={800}
            height={600}
            alt="Screenshot"
            className="w-full h-auto object-contain"
          />
          <div className="absolute left-0 top-0 p-2 rounded-lg bg-black/50">
            {deleteLoading ? (
              <Spinner />
            ) : (
              <Trash
                onClick={() => handleDeleteScreenshot(screenshot)}
                className="w-5 h-5 hover:scale-105 cursor-pointer text-red-600 "
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
