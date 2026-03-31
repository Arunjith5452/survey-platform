import { Router } from 'express';
import { submitSurvey, getAllSubmissions, getSubmissionById, deleteSubmission} from '../controllers/surveyController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', submitSurvey);

router.get('/', protectAdmin, getAllSubmissions);

router.get('/:id', protectAdmin, getSubmissionById);

router.delete('/:id', protectAdmin, deleteSubmission);

export default router;
