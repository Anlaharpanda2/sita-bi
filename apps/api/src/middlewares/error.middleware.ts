import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(err.statusCode ?? 500).json({
    status: 'error',
    message: err.message ?? 'Internal Server Error',
  });
};