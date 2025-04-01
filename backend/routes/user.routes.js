import express from 'express'

import { loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/user.controller.js'

import { authMiddleware } from '../middleware/user.middleware.js'


const router = express.Router()

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)
router.put('/profile' , authMiddleware ,  updateUserProfile)
export default router;