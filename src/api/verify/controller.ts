import { Request, Response, NextFunction } from 'express';
import { VerifyService } from '../../services/auth/Verify';
import { UserService } from '../../services/user/User';

export class VerifyController {
	static async postEmailRequest(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { email } = req.body;

		try {
			if (await UserService.isEmailVerified(email))
				return res
					.status(200)
					.json({ message: 'Email is Already Verified' });

			await VerifyService.requestEmail(email);
			return res
				.status(200)
				.json({ message: 'Verification email has been sent!' });
		} catch (err) {
			next(err);
		}
	}

	static async postEmailConfirm(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { email, code } = req.body;

		try {
			if (await UserService.isEmailVerified(email))
				return res
					.status(200)
					.json({ message: 'Email is Already Verified' });

			await VerifyService.confirmEmail(email, code);
			res.status(200).json({ message: 'Email has been verified' });
		} catch (err) {
			next(err);
		}
	}
}
