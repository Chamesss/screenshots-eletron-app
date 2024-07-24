import mongoose, { Document, Schema } from 'mongoose'

export interface IScreenshot extends Document {
    name: string
    imageUrls: string[]
    date: Date
}

const User: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrls: {
            type: [String],
        },
    },
    { timestamps: true }
)

export default mongoose.model<IScreenshot>('Screenshot', User)
