import { injectable, inject } from 'inversify';
import { ISurveySubmissionRepository } from '../repositories/ISurveySubmissionRepository.js';
import type { ISurveySubmission } from '../models/SurveySubmission.js';
import type { PaginatedResult } from './IService.js';
import { TYPES } from '../inversify/types.js';

import { CreateSurveySubmissionDto } from '../dtos/survey.dto.js';

@injectable()
export class SurveyService {
  private _surveyRepo: ISurveySubmissionRepository

  constructor(@inject(TYPES.SurveySubmissionRepository) surveyRepo: ISurveySubmissionRepository) {
    this._surveyRepo = surveyRepo
  }

  async submitSurvey(data: CreateSurveySubmissionDto): Promise<ISurveySubmission> {
    return await this._surveyRepo.create(data)
  }

  async getAllSubmissions(page: number,limit: number): Promise<PaginatedResult<ISurveySubmission>> {

    const [submissions, total] = await Promise.all([
      this._surveyRepo.findByPage(page, limit),
      this._surveyRepo.count(),
    ])

    return {
      data: submissions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        limit,
      },
    }
  }

  async getSubmissionById(id: string): Promise<ISurveySubmission | null> {
    return await this._surveyRepo.findById(id)
  }

  async deleteSubmission(id: string): Promise<boolean> {
    return await this._surveyRepo.delete(id)
  }
}
