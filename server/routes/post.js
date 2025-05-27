import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import { createPost, getPosts } from '../controller/post.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images and videos are allowed'));
        }
    }
});

// Route to create a post with file upload
router.post('/create', auth, upload.single('media'), createPost);

// Route to fetch posts
router.get('/', auth, getPosts);

// Route to fetch feed posts
router.get('/feed', auth, getPosts);

export default router;
