import type { AppError } from "@/utils/errors";
import type { NextFunction, Request, Response } from "express";

// Create a type-safe error handler
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	console.error(err);

	// Handle known error types
	if ('statusCode' in err && 'code' in err) {
		const appError = err as AppError;

		return res.status(appError.statusCode).json({
			error: {
				message: appError.message,
				code: appError.code,
				...(appError.details ? { details: appError.details } : {}),
			},
		});
	}

	// Handle unknown errors
	res.status(500).json({
		error: {
			message: 'Internal server error',
			code: 'INTERNAL_ERROR',
		},
	});
}