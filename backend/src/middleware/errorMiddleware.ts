import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/HttpStatus.js';

/**
 * 404 Not Found Handler
 * Catches all requests that don't match any defined routes.
 */

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
};

/**
 * Global Error Handler
 * Catches uncaught errors and formats them into a standardized JSON response.
 */
export const globalErrorHandler = (
  error: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  // Handle Mongoose Validation Errors
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
    // Note: It's best practice not to expose stack traces in production
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};
