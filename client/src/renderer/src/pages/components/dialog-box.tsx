import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  username: string
  setUsername: (value: string) => void
  action: () => void
  target: string
  loadingState: boolean
}

export default function DialogueBox({
  modalOpen,
  setModalOpen,
  username,
  setUsername,
  action,
  target,
  loadingState
}: Props) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{target === 'edit' ? 'Edit User' : 'Create User'}</DialogTitle>
          <DialogDescription>
            {target === 'edit'
              ? 'Update the name for the selected user.'
              : 'Enter the name of the new user'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={action}>
            {loadingState ? 'Loading...' : target === 'edit' ? 'Save Changes' : 'Create User'}
          </Button>
          <div>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
