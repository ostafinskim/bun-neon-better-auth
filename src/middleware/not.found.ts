import { NotFoundError } from "@/utils/errors";
import type { NextFunction, Request, Response } from "express";

// Middleware to catch 404 - Not Found routes
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	const error = new NotFoundError('Route not found', {
		path: req.path,
		method: req.method
	});
	next(error);
}