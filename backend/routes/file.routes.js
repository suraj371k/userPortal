import express from 'express'
import { authMiddleware } from '../middleware/user.middleware.js'
import { downloadFile, getUserFiles, uploadFile } from '../controllers/file.controller.js'
import { upload } from '../middleware/multer.middleware.js'
const router = express.Router()

router.post('/upload' , authMiddleware , upload.single('file')  , uploadFile)
router.get('/getFiles' , authMiddleware , getUserFiles)
router.get('/download/:filename' , authMiddleware , downloadFile)

export default router