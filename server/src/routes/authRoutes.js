import { Router } from 'express';
import { register, login, getMe, getUserSessions, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.get('/sessions', authenticateToken, getUserSessions);
router.post('/logout', logout);

export default router;