import { Schema, model } from 'mongoose';
import { UserInfo, UserType } from '../interfaces';

const userSchema = new Schema<UserInfo>(
	{
		type: {
			type: String,
			enum: UserType,
			required: true,
			default: UserType.USER,
		},
		email: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email_verified: {
			type: Boolean,
			required: true,
			default: false,
		},
		email_verify_code: String,
		email_verify_expiry: Date,
	},
	{ timestamps: true }
);

export default model<UserInfo>('User', userSchema);
