import express from 'express';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { createPost, getPosts } from '../controller/post.js';

// Multer setup for media uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/posts');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const router = express.Router();

// Route to create a post
router.post('/create', auth, createPost);

// Route to fetch posts
router.get('/', auth, getPosts);

export default router;
