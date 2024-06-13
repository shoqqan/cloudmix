export enum AUTH {
	LOGIN = 'login',
	REGISTER = 'register',
}

export interface FormValues {
	email: string
	password: string
	fullName: string
	secondPassword: string
}
