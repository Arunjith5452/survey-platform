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

      const jwtDecoded = decoded as { username: string, role: string, iat?: number, exp?: number };
      
      if (jwtDecoded.role !== 'admin') {
        res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'Not authorized as an admin',
        });
        return;
      }

      req.user = {
        username: jwtDecoded.username,
        role: jwtDecoded.role
      };

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
