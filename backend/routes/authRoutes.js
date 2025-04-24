import express from 'express';
import { signup, signin, getLoggedInUser, getUserInfoByToken, unsubscribeUserById, updateSubscriptionStatus, uploadImage, deleteImage } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);
router.get('/me', verifyToken, getLoggedInUser);
router.get('/user-info', getUserInfoByToken);
router.post('/updateSubscriptionStatus', updateSubscriptionStatus);
router.post('/upload-image', uploadImage);
router.post('/delete-image', deleteImage);
router.post('/unsubscribe/:id',unsubscribeUserById);


export default router;
