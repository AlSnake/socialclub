export interface User {
	type: UserType;
	email: string;
	username: string;
	password: string;
}

export interface UserExtra {
	email_verified: boolean;
	email_verify_code?: string;
	email_verify_expiry?: Date | number;
}

export type UserInfo = User & UserExtra;

export enum UserType {
	ADMIN = 'ADMIN',
	USER = 'USER',
}
