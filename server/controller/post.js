import Post from '../models/Post.js';
import User from '../models/auth.js';

// Create a new post
export const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check posting restrictions
        const friendCount = user.friends.length;
        const today = new Date().setHours(0, 0, 0, 0);

        if (user.lastPostDate && new Date(user.lastPostDate).setHours(0, 0, 0, 0) === today) {
            if ((friendCount < 2 && user.postCount >= 1) || (friendCount < 10 && user.postCount >= 2)) {
                return res.status(403).json({ message: 'Posting limit reached for today' });
            }
        } else {
            user.postCount = 0;
        }

        const post = new Post({
            user: req.userId,
            content: req.body.content,
            image: req.file?.path, // Use uploaded file path if exists
            video: req.body.video
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
