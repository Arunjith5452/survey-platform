import { Response } from 'express';
import { container, TYPES } from '../inversify/index.js';
import type { AuthService } from '../services/AuthService.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { HttpStatus } from '../constants/HttpStatus.js';

const authService = container.get<AuthService>(TYPES.AuthService);


export const registerAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    await authService.registerAdmin(username, password);

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Admin registered successfully',
    });
  } catch (error: unknown) {
    console.error('Error registering admin:', error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred during registration.',
    });
  }
};


export const loginAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const result = await authService.loginAdmin(username, password);

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


export const getCurrentAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const admin = await authService.getCurrentAdmin(req.adminId!);

    if (!admin) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Admin not found',
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error('Error fetching admin info:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An error occurred while fetching admin info.',
    });
  }
};
