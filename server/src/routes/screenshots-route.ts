import express from 'express'
const router = express.Router()

import {
    createScreenShot,
    deleteScreenShot,
    getScreenShots,
} from '../controllers/screenshot-controller'

router.get('/:userId', getScreenShots)
router.post('/', createScreenShot)
router.delete('/delete', deleteScreenShot)

export default router
