import { Request, Response } from 'express'
import User from '../models/User'

interface Params {
    userId: string
}

export const getScreenShots = async (req: Request<Params>, res: Response) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId, 'imageUrls').exec()
        if (user) {
            return res.status(200).json(user.imageUrls)
        } else {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export const createScreenShot = async (req: Request, res: Response) => {
    const { userId, imageUrl } = req.body

    try {
        if (!userId || !imageUrl) {
            return res
                .status(400)
                .json({ message: 'UserId and imageUrl are required' })
        }

        // Find the user and update the imageUrls array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { imageUrls: imageUrl } },
            { new: true, useFindAndModify: false }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(201).json(updatedUser)
    } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteScreenShot = async (req: Request, res: Response) => {
    const { userId, imageUrl } = req.body

    try {
        if (!userId || !imageUrl) {
            return res
                .status(400)
                .json({ message: 'UserId and imageUrl are required' })
        }

        // Find the user and update the imageUrls array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { imageUrls: imageUrl } },
            { new: true, useFindAndModify: false }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(updatedUser)
    } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message })
    }
}
