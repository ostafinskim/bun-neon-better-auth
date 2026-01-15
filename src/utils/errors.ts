export enum ErrorCode {
	NOT_FOUND = 'NOT_FOUND',
	VALIDATION_ERROR = 'VALIDATION_ERROR',
	UNAUTHORIZED = 'UNAUTHORIZED',
	FORBIDDEN = 'FORBIDDEN',
	INTERNAL_ERROR = 'INTERNAL_ERROR',
	DATABASE_ERROR = 'DATABASE_ERROR',
}

export interface ErrorResponse {
	error: {
		message: string;
		code: ErrorCode;
		details?: unknown;
	};
}

export class AppError extends Error {
	code: ErrorCode;
	statusCode: number;
	details?: unknown;

	constructor(message: string, code: ErrorCode, statusCode: number, details?: unknown) {
		super(message);
		this.code = code;
		this.statusCode = statusCode;
		this.details = details;
	}
}

export class NotFoundError extends AppError {
	constructor(message = 'Resource not found', details?: unknown) {
		super(message, ErrorCode.NOT_FOUND, 404, details);
		this.name = 'NotFoundError';
	}
}

export class ValidationError extends AppError {
	constructor(message = 'Validation failed', details?: unknown) {
		super(message, ErrorCode.VALIDATION_ERROR, 400, details);
		this.name = 'ValidationError';
	}
}