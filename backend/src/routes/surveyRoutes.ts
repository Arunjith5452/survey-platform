import { Router } from 'express';
import {
  submitSurvey,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
} from '../controllers/surveyController.js';

const router = Router();

router.post('/', submitSurvey);

router.get('/', getAllSubmissions);

router.get('/:id', getSubmissionById);

router.delete('/:id', deleteSubmission);

export default router;
