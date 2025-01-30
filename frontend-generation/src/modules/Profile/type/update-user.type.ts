export interface IUpdateUser {
	type: EUpdateUser;
	value: string;
}

export enum EUpdateUser {
	username = "username",
	email = "email",
	password = "password",
}
