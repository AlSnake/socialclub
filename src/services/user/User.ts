import User from '../../models/User';
import { ThrowExtendedError } from '../../core/error';

export class UserService {
	static async getUserById(id: string) {
		const user = await User.findOne({ _id: id });
		if (!user) ThrowExtendedError('User not found!', 404);
		return user;
	}

	static async getUserByEmail(email: string) {
		const user = await User.findOne({ email: email });
		if (!user) ThrowExtendedError('User not found!', 404);
		return user;
	}

	static async isEmailVerified(email: string): Promise<boolean> {
		return (await UserService.getUserByEmail(email)).email_verified;
	}

	static async setEmailVerifyCode(
		email: string,
		code: string,
		expiry: Date | number
	): Promise<void> {
		const user = await UserService.getUserByEmail(email);
		user.email_verify_code = code;
		user.email_verify_expiry = expiry;
		await user.save();
	}
}
