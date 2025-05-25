import express from 'express';
import auth from '../middleware/auth.js';
import { createPost, getPosts } from '../controller/post.js';

const router = express.Router();

// Route to create a post
router.post('/create', auth, createPost);

// Route to fetch posts
router.get('/', auth, getPosts);

export default router;
