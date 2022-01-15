import { Request, Response, NextFunction } from 'express';
import { ThrowExtendedError } from '../core/error';
import jwt from 'jsonwebtoken';

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) ThrowExtendedError('Internal Error JWT', 500);

	const authCookie: string = req.cookies.Authorization;
	if (!authCookie) ThrowExtendedError('Not Authenticated', 401);

	const token = authCookie.split(' ')[1];
	const decoded = jwt.verify(token, jwtSecret);
	req.userId = decoded.userId;
	next();
}
