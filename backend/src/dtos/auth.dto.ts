import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export class LoginDto {
  username!: string;
  password!: string;

  static validate(data: unknown): LoginDto {
    return loginSchema.parse(data) as LoginDto;
  }
}

export interface AdminDto {
  username: string;
}
