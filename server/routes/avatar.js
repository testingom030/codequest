import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import { updateAvatar } from '../controller/avatar.js';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Route to update avatar
router.post('/update', auth, upload.single('avatar'), updateAvatar);

export default router;
