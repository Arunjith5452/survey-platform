import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../constants/HttpStatus.js';


export const protectAdmin = (req: Request, res: Response, next: NextFunction): void => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {

      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        throw new Error('No token found');
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret'
      );

      req.user = decoded as { username: string, role: string }

      return next();
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Not authorized, token failed',
      });
      return;
    }
  }

  if (!token) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Not authorized, no token',
    });
    return;
  }
};
