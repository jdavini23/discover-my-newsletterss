import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        field: (err as any).path || (err as any).param || 'unknown',
        message: err.msg,
      })),
    });
  }
  next();
};

export const validateAdminCreation = [
  // Add specific validation rules for admin creation here
];
