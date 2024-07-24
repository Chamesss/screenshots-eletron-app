import { Request, Response } from 'express'
import User from '../models/User'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, 'name').exec()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { name } = req.body

    try {
        if (!name) {
            return res.status(400).json({ message: 'Username is required' })
        }

        const newUser = new User({ name })
        await newUser.save()

        res.status(201).json(newUser)
    } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message })
    }
}

// Modify a user
export const modifyUser = async (req: Request, res: Response) => {
    const { id, newName } = req.body

    try {
        if (!newName) {
            return res.status(400).json({ message: 'New username is required' })
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name: newName },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(updatedUser)
    } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message })
    }
}

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message })
    }
}
