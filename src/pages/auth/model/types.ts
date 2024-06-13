export interface IUserInfo {
	uid: string
	email: string
	fullName: string
	createdAt: string
}

export interface IAuthSlice {
	isLoading: boolean
	isAuthenticated: boolean
	userInfo: IUserInfo | null
}
