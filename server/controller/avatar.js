import users from '../models/auth.js';
import cloudinary from '../config/cloudinary.js';

export const uploadAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete old avatar from Cloudinary if it exists
        if (user.avatarPublicId) {
            await cloudinary.uploader.destroy(user.avatarPublicId);
        }

        // Update user with new avatar
        user.avatar = req.file.path;
        user.avatarPublicId = req.file.filename;
        await user.save();

        res.status(200).json({ 
            message: "Avatar updated successfully",
            avatar: user.avatar
        });
    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({ message: "Error uploading avatar", error: error.message });
    }
};

export const deleteAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await users.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete from Cloudinary if exists
        if (user.avatarPublicId) {
            await cloudinary.uploader.destroy(user.avatarPublicId);
        }

        // Reset to default avatar
        user.avatar = 'https://www.gravatar.com/avatar/?d=identicon';
        user.avatarPublicId = null;
        await user.save();

        res.status(200).json({ message: "Avatar deleted successfully" });
    } catch (error) {
        console.error('Avatar deletion error:', error);
        res.status(500).json({ message: "Error deleting avatar", error: error.message });
    }
};
