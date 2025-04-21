import express from 'express';
import { requestOtp, verifyOtp, sendOtpEmail,  } from '../controllers/otpEmailControllers.js';

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/send-otp-mail', sendOtpEmail);

export default router;
