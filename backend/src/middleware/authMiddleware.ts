import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../constants/HttpStatus.js';

export interface AuthRequest extends Request {
  adminId?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'default-secret';
    const decoded = jwt.verify(token, secret) as { adminId: string };
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(HttpStatus.FORBIDDEN).json({ success: false, message: 'Invalid or expired token.' });
  }
};
