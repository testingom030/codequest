import express from 'express';
import auth from '../middleware/auth.js';
import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    getFriendRequests, 
    getFriendsList,
    removeFriend 
} from '../controller/friend.js';

const router = express.Router();

router.post('/request', auth, sendFriendRequest);
router.put('/request/:requestId/accept', auth, acceptFriendRequest);
router.get('/requests', auth, getFriendRequests);
router.get('/list', auth, getFriendsList);
router.delete('/:friendId', auth, removeFriend);

export default router;
