import express from 'express'
const router = express.Router()

import {
    createUser,
    deleteUser,
    getUsers,
    modifyUser,
} from '../controllers/user-controller'

router.get('/', getUsers)
router.post('/create', createUser)
router.put('/modify', modifyUser)
router.delete('/delete', deleteUser)

export default router
