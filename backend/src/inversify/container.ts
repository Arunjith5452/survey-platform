import 'reflect-metadata';
import { Container } from'inversify';
import { SurveySubmissionRepository } from '../repositories/SurveySubmissionRepository.js';
import { SurveyService } from '../services/SurveyService.js';
import { AuthService } from '../services/AuthService.js';
import { TYPES } from './types.js';

const container = new Container();

container.bind(TYPES.SurveySubmissionRepository).to(SurveySubmissionRepository);

container.bind(TYPES.SurveyService).to(SurveyService);
container.bind(TYPES.AuthService).to(AuthService);

export { container, TYPES };
