import { Request, Response, NextFunction } from 'express';
import { container, TYPES } from '../inversify/index.js';
import type { SurveyService } from '../services/SurveyService.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { HttpStatus } from '../constants/HttpStatus.js';

const surveyService = container.get<SurveyService>(TYPES.SurveyService);



export const submitSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, gender, nationality, email, phone, address, message } = req.body;

    if (req.body.website) {
      res.status(HttpStatus.OK).json({ 
        success: true, 
        message: 'Thank you for your submission!' 
      });
      return;
    }

    const surveySubmission = await surveyService.submitSurvey({
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Thank you! Your survey has been submitted successfully.',
      data: surveySubmission,
    });
  } catch (error) {
    next(error);
  }
};



export const getAllSubmissions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
   const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const result = await surveyService.getAllSubmissions(page, limit);

  res.status(HttpStatus.OK).json({
   success: true,
   message: 'Submissions retrieved successfully',
   pagination: result.pagination,
   data: result.data,
 });

 } catch (error) {
  next(error);
 }
};



export const getSubmissionById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
 const id = req.params.id as string;
 
 const submission = await surveyService.getSubmissionById(id);

  if (!submission) {
   res.status(HttpStatus.NOT_FOUND).json({
       success: false,
       message: 'Submission not found',
     });
   return;
  }

 res.status(HttpStatus.OK).json({
    success: true,
    message: 'Submission retrieved successfully',
    data: submission,
  });
 } catch (error) {
  next(error);
 }
};



export const deleteSubmission = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
   const id = req.params.id as string;
      
   const deleted = await surveyService.deleteSubmission(id);

    if (!deleted) {
     res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Submission not found',
      });
     return;
    }

   res.status(HttpStatus.OK).json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
   next(error);
  }
};
