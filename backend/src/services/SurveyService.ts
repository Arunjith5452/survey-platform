import { injectable, inject } from'inversify';
import { SurveySubmissionRepository } from '../repositories/SurveySubmissionRepository.js';
import type { ISurveySubmission } from '../models/SurveySubmission.js';
import type { PaginatedResult } from './IService.js';
import { TYPES } from '../inversify/types.js';

export interface SurveyData {
  name: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

@injectable()
export class SurveyService {
  private surveyRepo: SurveySubmissionRepository;

  constructor(@inject(TYPES.SurveySubmissionRepository) surveyRepo: SurveySubmissionRepository) {
   this.surveyRepo = surveyRepo;
  }

  async submitSurvey(data: SurveyData): Promise<ISurveySubmission> {
   return await this.surveyRepo.create(data);
  }

  async getAllSubmissions(
    page: number,
    limit: number
  ): Promise<PaginatedResult<ISurveySubmission>> {
   const [submissions, total] = await Promise.all([
     this.surveyRepo.findByPage(page, limit),
     this.surveyRepo.count(),
   ]);

   return {
     data: submissions,
     pagination: {
       currentPage: page,
       totalPages: Math.ceil(total / limit),
       totalItems: total,
       limit,
     },
   };
  }

  async getSubmissionById(id: string): Promise<ISurveySubmission | null> {
   return await this.surveyRepo.findById(id);
  }

  async deleteSubmission(id: string): Promise<boolean> {
   return await this.surveyRepo.delete(id);
  }
}
