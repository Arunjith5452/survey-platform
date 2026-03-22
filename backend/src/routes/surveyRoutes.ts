import { Router } from 'express';
import {
  submitSurvey,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
} from '../controllers/surveyController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Public route - Submit survey
router.post('/', submitSurvey);

// Protected routes - Get all submissions
router.get('/', authenticateToken, getAllSubmissions);

// Protected routes - Get single submission
router.get('/:id', authenticateToken, getSubmissionById);

// Protected routes - Delete submission
router.delete('/:id', authenticateToken, deleteSubmission);

export default router;
