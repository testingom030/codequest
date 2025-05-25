import express from 'express';
import auth from '../middleware/auth.js';
import { 
    sendEmailVerification, 
    sendSMSVerification, 
    verifyCode 
} from '../controller/language.js';

const router = express.Router();

router.post('/verify-email', auth, sendEmailVerification);
router.post('/verify-phone', auth, sendSMSVerification);
router.post('/verify-code', auth, verifyCode);

export default router;
