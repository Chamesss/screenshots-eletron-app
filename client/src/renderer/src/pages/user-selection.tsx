import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { user } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogueBox from './components/dialog-box'
import FullPageSpinner from './components/full-page-spinner'
import TableCell from './components/table-cell'

export default function UserSelection() {
  const [users, setUsers] = React.useState<user[]>([])
  const [loading, setLoading] = React.useState(true)
  const [loadingState, setLoadingState] = React.useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<user>()
  const [newUserName, setNewUserName] = useState('')
  const [editedUserName, setEditedUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [])

  // get users
  const getUsers = async () => {
    try {
      const response = await axios('http://localhost:8000/users', {
        method: 'GET'
      })
      setUsers(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // create user
  const handleSaveNewUser = async () => {
    if (newUserName.trim() !== '') {
      try {
        setLoadingState(true)
        await axios('http://localhost:8000/users/create', {
          method: 'POST',
          data: { name: newUserName }
        })
        getUsers()
        setNewUserName('')
        setIsCreateModalOpen(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingState(false)
      }
    }
  }

  // edit user
  const handleSaveEditedUser = async () => {
    if (editedUserName.trim() !== '' && currentUser) {
      try {
        setLoadingState(true)
        await axios('http://localhost:8000/users/modify', {
          method: 'PUT',
          data: { id: currentUser._id, newName: editedUserName }
        })
        getUsers()
        setIsEditModalOpen(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingState(false)
      }
    }
  }

  //delete user
  const handleConfirmDeleteUser = async () => {
    if (currentUser) {
      try {
        setLoadingState(true)
        await axios('http://localhost:8000/users/delete', {
          method: 'DELETE',
          data: { id: currentUser._id }
        })
        getUsers()
        setIsDeleteModalOpen(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingState(false)
      }
    }
  }

  const handleEditUser = (user) => {
    setCurrentUser(user)
    setEditedUserName(user.name)
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (user) => {
    setCurrentUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleNavigation = (user) => {
    navigate('/dashboard', { state: { user } })
  }

  if (loading) {
    return <FullPageSpinner />
  }

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen">
      <header>
        <div className="flex items-center justify-between h-16 px-6 border-b border-muted">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">Screenshot App</p>
          </div>
        </div>
      </header>
      <div className="w-full bg-background px-6 py-10 rounded-lg">
        <div className="flex items-center justify-between mb-6 mt-10">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>Create Profile</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4">
                    No profiles found. Create one to get started.
                  </td>
                </tr>
              ) : (
                <React.Fragment>
                  {users.map((user, index) => (
                    <React.Fragment key={index}>
                      <TableCell
                        user={user}
                        handleNavigation={handleNavigation}
                        handleEditUser={handleEditUser}
                        handleDeleteUser={handleDeleteUser}
                      />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DialogueBox
        modalOpen={isCreateModalOpen}
        setModalOpen={setIsCreateModalOpen}
        username={newUserName}
        setUsername={setNewUserName}
        action={handleSaveNewUser}
        target="create"
        loadingState={loadingState}
      />
      <DialogueBox
        modalOpen={isEditModalOpen}
        setModalOpen={setIsEditModalOpen}
        username={editedUserName}
        setUsername={setEditedUserName}
        action={handleSaveEditedUser}
        target="edit"
        loadingState={loadingState}
      />
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the user "{currentUser?.name}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteUser}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
