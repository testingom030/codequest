import User from '../models/auth.js';

export const updateAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Avatar updated successfully', avatar: avatarUrl });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
