import { ISurveySubmission } from '../models/SurveySubmission.js';
import { IRepository } from './baseRepository.js';

export interface ISurveySubmissionRepository extends IRepository<ISurveySubmission> {
  findByEmail(email: string): Promise<ISurveySubmission[]>;
}
