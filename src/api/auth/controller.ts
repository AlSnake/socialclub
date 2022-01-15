import { Request, Response, NextFunction } from 'express';
import { UserType } from '../../interfaces';
import { AuthService } from '../../services/Auth/Auth';

export class AuthController {
	static async postRegister(req: Request, res: Response, next: NextFunction) {
		const { email, username, password } = req.body;

		try {
			const user = await AuthService.register({
				type: UserType.USER,
				email,
				username,
				password,
			});

			res.status(201).json({
				message: 'User successfully registered!',
				user,
			});
		} catch (err) {
			next(err);
		}
	}

	static async postLogin(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		try {
			const jwtToken = await AuthService.login({ email, password });
			res.cookie('Authorization', `Bearer ${jwtToken}`, {
				maxAge: new Date().getTime() + 60 * 60 * 1000,
				httpOnly: true,
			});

			res.status(200).json({
				message: 'Login Successful',
				token: jwtToken,
			});
		} catch (err) {
			next(err);
		}
	}

	static postLogout(req: Request, res: Response, next: NextFunction) {
		res.clearCookie('Authorization');
		res.status(200).json({ message: 'Successfully Logged Out' });
	}
}
