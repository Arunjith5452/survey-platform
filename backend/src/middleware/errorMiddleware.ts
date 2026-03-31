import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HttpStatus } from '../constants/HttpStatus.js';



export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
};

export const globalErrorHandler = (
  error: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
    return;
  }

  if (error.name === 'ValidationError' && error.errors) {
    const formattedErrors = Object.keys(error.errors).map((field) => ({
      field,
      message: error.errors[field].message,
    }));

    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
    return;
  }
  
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};
