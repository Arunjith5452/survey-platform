import { Router } from 'express';
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Public route - Register admin (use carefully)
router.post('/register', registerAdmin);

// Public route - Login admin
router.post('/login', loginAdmin);

// Protected route - Get current admin info
router.get('/me', authenticateToken, getCurrentAdmin);

export default router;
