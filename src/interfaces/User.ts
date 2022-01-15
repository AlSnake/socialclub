export interface User {
	type: UserType;
	email: string;
	username: string;
	password: string;
}

export enum UserType {
	ADMIN = 'ADMIN',
	USER = 'USER',
}
