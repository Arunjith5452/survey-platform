import { z } from 'zod';

export const createSurveySubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say'] as const, {
    error: 'Please select a valid gender',
  }),
  nationality: z.string().trim().min(2, 'Nationality must be at least 2 characters'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().trim().min(5, 'Address must be at least 5 characters'),
  message: z.string().trim().min(5, 'Message must be at least 5 characters'),
});

export class CreateSurveySubmissionDto {
  name!: string;
  gender!: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality!: string;
  email!: string;
  phone!: string;
  address!: string;
  message!: string;

  static validate(data: unknown): CreateSurveySubmissionDto {
    return createSurveySubmissionSchema.parse(data) as CreateSurveySubmissionDto;
  }
}
