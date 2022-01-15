import { Request, Response, NextFunction } from 'express';
import { ThrowExtendedError } from '../core/error';
import { UserService } from '../services/user/User';

export async function isAuthorized(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = req.userId;
	if (!userId) ThrowExtendedError('Not Authenticated', 401);

	const user = await UserService.getUserById(userId);
	if (!user.email_verified) ThrowExtendedError('Email Not Verified', 403);

	next();
}
