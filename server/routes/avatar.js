import express from 'express';
import auth from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';
import { uploadAvatar, deleteAvatar } from '../controller/avatar.js';

const router = express.Router();

// Route to upload avatar using Cloudinary
router.post('/upload', auth, upload.single('avatar'), uploadAvatar);

// Route to delete avatar
router.delete('/delete', auth, deleteAvatar);

export default router;
