import { Response } from 'express';
import { container, TYPES } from '../inversify/index.js';
import type { AuthService } from '../services/AuthService.js';
import { Request } from 'express';
import { HttpStatus } from '../constants/HttpStatus.js';

const authService = container.get<AuthService>(TYPES.AuthService);



import { LoginDto } from '../dtos/auth.dto.js';

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginDto = LoginDto.validate(req.body);

    const result = await authService.loginAdmin(loginDto);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
    
  } catch (error: unknown) {
    console.error('Error logging in admin:', error);
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: error instanceof Error ? error.message : 'Invalid credentials.',
    });
  }
};


