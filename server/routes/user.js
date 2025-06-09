import express from "express"
import { login, signup, verifyOTP } from "../controller/auth.js"
import { getallusers, updateprofile } from "../controller/users.js"
import auth from "../middleware/auth.js"
import friendRoutes from './friend.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/verify-otp', verifyOTP)
router.post('/login', login)
router.get('/getallusers', getallusers)
router.patch('/update/:id', auth, updateprofile)

// Friend routes
router.use('/', friendRoutes);

export default router;