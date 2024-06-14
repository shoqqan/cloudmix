export enum ROLES {
	BOT = "bot",
	USER = "user",
	ADMIN = "admin",
}

export interface IUser {
	createdAt: string
	email: string
	isOnline: boolean
	password: string
	role: ROLES
	uid: string
	username: string
}

export interface IUserSlice {
	userInfo: IUser | null
}
