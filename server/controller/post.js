import Post from '../models/Post.js';
import User from '../models/auth.js';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = async (buffer, resourceType = 'image') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};

// Create a new post
export const createPost = async (req, res) => {
    try {
        console.log('Creating post for user:', req.userId);
        
        const user = await User.findById(req.userId);
        if (!user) {
            console.error('User not found:', req.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Check posting restrictions
        const friendCount = user.friends?.length || 0;
        const today = new Date().setHours(0, 0, 0, 0);

        if (user.lastPostDate && new Date(user.lastPostDate).setHours(0, 0, 0, 0) === today) {
            if ((friendCount < 2 && user.postCount >= 1) || (friendCount < 10 && user.postCount >= 2)) {
                return res.status(403).json({ message: 'Posting limit reached for today' });
            }
        } else {
            user.postCount = 0;
        }

        let mediaUrl = null;
        let mediaType = null;

        // Handle file upload to Cloudinary if present
        if (req.file) {
            try {
                const resourceType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
                const result = await uploadToCloudinary(req.file.buffer, resourceType);
                mediaUrl = result.secure_url;
                mediaType = resourceType;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return res.status(500).json({ message: 'Failed to upload media' });
            }
        }

        const post = new Post({
            user: req.userId,
            content: req.body.content,
            [mediaType === 'image' ? 'image' : 'video']: mediaUrl
        });

        await post.save();

        // Update user's post count and last post date
        user.lastPostDate = new Date();
        user.postCount += 1;
        await user.save();

        // Populate user details before sending response
        await post.populate('user', 'name avatar');
        
        res.status(201).json(post);
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Fetch posts
export const getPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get posts from friends and the user's own posts
        const posts = await Post.find({
            $or: [
                { user: req.userId },
                { user: { $in: user.friends } }
            ]
        })
        .populate('user', 'name avatar')
        .populate({
            path: 'comments.user',
            select: 'name avatar'
        })
        .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Fetch posts error:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
