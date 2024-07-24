import { Button } from '@/components/ui/button'
import { user } from '@/types'

type Props = {
  user: user
  handleNavigation: (user: user) => void
  handleEditUser: (user: user) => void
  handleDeleteUser: (user: user) => void
}

export default function TableCell({
  user,
  handleNavigation,
  handleEditUser,
  handleDeleteUser
}: Props) {
  return (
    <tr className="border-b last:border-b-0 hover:bg-muted/40">
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2 flex items-center gap-2 justify-between">
        <Button variant="outline" size="sm" onClick={() => handleNavigation(user)}>
          Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
}
