import User from '../models/auth.js';
import FriendRequest from '../models/FriendRequest.js';

// Send friend request
export const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.userId;

        // Check if users exist
        const [sender, receiver] = await Promise.all([
            User.findById(senderId),
            User.findById(receiverId)
        ]);

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already exists' });
        }

        // Create new friend request
        const friendRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId
        });

        await friendRequest.save();

        res.status(201).json({
            message: 'Friend request sent successfully',
            request: friendRequest
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.userId;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        if (request.receiver.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to accept this request' });
        }

        // Update request status
        request.status = 'accepted';
        await request.save();

        // Add users to each other's friend lists
        await Promise.all([
            User.findByIdAndUpdate(request.sender, {
                $addToSet: { friends: request.receiver }
            }),
            User.findByIdAndUpdate(request.receiver, {
                $addToSet: { friends: request.sender }
            })
        ]);

        res.status(200).json({
            message: 'Friend request accepted',
            request
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get friend requests
export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.userId;

        const requests = await FriendRequest.find({
            $or: [{ sender: userId }, { receiver: userId }],
            status: 'pending'
        })
        .populate('sender', 'name avatar')
        .populate('receiver', 'name avatar');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get friends list
export const getFriendsList = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
            .populate('friends', 'name avatar');

        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove friend
export const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.params;
        const userId = req.userId;

        await Promise.all([
            User.findByIdAndUpdate(userId, {
                $pull: { friends: friendId }
            }),
            User.findByIdAndUpdate(friendId, {
                $pull: { friends: userId }
            })
        ]);

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
