import tokenGenerator from '../../helpers/tokenGenerator';
import { EmailService } from '../util/email';
import { UserService } from '../user/User';
import { MailConfig } from '../../config/mail';
import { ThrowExtendedError } from '../../core/error';

export class VerifyService {
	static async requestEmail(email: string) {
		const verifyCode = await tokenGenerator(32);
		await UserService.setEmailVerifyCode(
			email,
			verifyCode,
			Date.now() + 10 * 60000
		);

		const body = `
                <p>SocialClub Email Verification</p>
                <p>Verify Code: ${verifyCode}</p>
        `;

		return EmailService.send(
			MailConfig.general.noreply_email,
			email,
			'SocialClub Email Verification',
			body
		);
	}

	static async confirmEmail(email: string, code: string) {
		const user = await UserService.getUserByEmail(email);

		if (user.email_verify_code !== code)
			ThrowExtendedError('Invalid Verification Code', 422);

		if (!user.email_verify_expiry || user.email_verify_expiry < Date.now())
			ThrowExtendedError('Verify Code Expired', 422);

		user.email_verified = true;
		user.email_verify_code = undefined;
		user.email_verify_expiry = undefined;
		return await user.save();
	}
}
