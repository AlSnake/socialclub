import User from '../../models/User';
import { User as IUSER } from '../../interfaces';
import { ThrowExtendedError } from '../../core/error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface loginWithEmail extends Omit<IUSER, 'type' | 'username'> {}
interface loginWithUsername extends Omit<IUSER, 'type' | 'email'> {}

export class AuthService {
	static async register(user: IUSER): Promise<IUSER> {
		const findUser = await User.findOne({
			$or: [{ email: user.email }, { username: user.username }],
		});
		if (findUser)
			ThrowExtendedError('Username or Email Already Exists', 422);

		user.password = await bcrypt.hash(user.password, 12);
		return await new User({ ...user }).save();
	}

	static async login(user: loginWithEmail): Promise<string> {
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) ThrowExtendedError('Internal Error JWT!', 500);

		const findUser = await User.findOne({ email: user.email });
		if (!findUser) ThrowExtendedError('User not found!', 404);

		const passwordMatch = await bcrypt.compare(
			user.password,
			findUser.password
		);
		if (!passwordMatch) ThrowExtendedError('Invalid Password', 401);

		return jwt.sign(
			{
				userId: findUser._id.toString(),
			},
			jwtSecret,
			{ expiresIn: '1h' }
		);
	}
}
