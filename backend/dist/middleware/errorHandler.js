"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = void 0;
const customErrors_1 = require("../utils/customErrors");
const errorHandler = (err, req, res, next) => {
    // Default error values
    let statusCode = 500;
    let errorResponse = {
        status: 'error',
        statusCode,
        message: 'Internal Server Error'
    };
    // Handle custom AppError
    if (err instanceof customErrors_1.AppError) {
        statusCode = err.statusCode;
        errorResponse = {
            status: 'error',
            statusCode: err.statusCode,
            message: err.message
        };
    }
    // Handle TypeORM validation errors
    if (err.name === 'QueryFailedError') {
        statusCode = 400;
        errorResponse = {
            status: 'error',
            statusCode: 400,
            message: 'Database validation error'
        };
    }
    // Handle Validation errors (e.g., from class-validator)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorResponse = {
            status: 'error',
            statusCode: 400,
            message: err.message
        };
    }
    // Add stack trace in development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    // Log the error
    console.error(`[ERROR] ${err.message}`, err);
    // Send error response
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
// Async error wrapper to simplify error handling in route handlers
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.asyncHandler = asyncHandler;
