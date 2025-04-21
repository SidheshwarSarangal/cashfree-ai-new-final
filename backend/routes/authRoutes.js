import express from 'express';
import { signup, signin, getLoggedInUser, getUserInfoByToken } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);
router.get('/me', verifyToken, getLoggedInUser);
router.get('/user-info', getUserInfoByToken);

export default router;
