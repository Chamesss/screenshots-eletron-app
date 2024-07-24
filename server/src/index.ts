import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import screenshotsRoutes from './routes/screenshots-route'
import userRoutes from './routes/user-route'
const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(helmet())
app.use(cors())

mongoose
    .connect(process.env.MONGODB_ATLAS_SRV || '')
    .then(() => {
        console.log('connected !')
    })
    .catch((err) => {
        console.log('Failed to connect: ', err)
    })

app.use('/users', userRoutes)
app.use('/screenshots', screenshotsRoutes)

app.listen(() => {
    console.log(`Server is running on port ${process.env.PORT || '8000'}`)
})
