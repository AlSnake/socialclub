import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { ThrowExtendedError } from '../core/error';

export class Validator {
	private static handler(req: Request, res: Response, next: NextFunction) {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			ThrowExtendedError('Input Validation Failed', 422, errors.array());

		next();
	}

	static register(): RequestHandler[] {
		return [
			body('email', 'Bad Email Address')
				.exists()
				.trim()
				.isLength({ max: 64 })
				.isEmail()
				.normalizeEmail(),
			body(
				'username',
				'Username must be between 2-32 Characters, and can only contain Letters, and Numbers'
			)
				.exists()
				.trim()
				.isAlphanumeric()
				.isLength({ min: 2, max: 32 }),
			body(
				'password',
				'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number'
			)
				.exists()
				.trim()
				.isStrongPassword({
					minLength: 8,
					minLowercase: 1,
					minUppercase: 1,
					minNumbers: 1,
					minSymbols: 1,
				}),
			Validator.handler,
		];
	}

	static login(): RequestHandler[] {
		return [
			body('email', 'Bad Email Address')
				.exists()
				.trim()
				.isLength({ max: 64 })
				.isEmail()
				.normalizeEmail(),
			body('password', 'Bad Password').exists().trim(),
			Validator.handler,
		];
	}

	static email(): RequestHandler[] {
		return [
			body('email', 'Bad Email Address')
				.exists()
				.trim()
				.isLength({ max: 64 })
				.isEmail()
				.normalizeEmail(),
			Validator.handler,
		];
	}

	static EmailAndCode(): RequestHandler[] {
		return [
			body('email', 'Bad Email Address')
				.exists()
				.trim()
				.isLength({ max: 64 })
				.isEmail()
				.normalizeEmail(),
			body('code', 'Bad Code').exists().trim(),
			Validator.handler,
		];
	}
}
