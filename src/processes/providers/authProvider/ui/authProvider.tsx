import type { IUser } from "@/entities/user/model/types.ts"
import { getUserInfo } from "@/entities/user/model/userSliceThunk.ts"
import { auth } from "@/main.tsx"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { signOut } from "firebase/auth"
import type { ReactNode } from "react"
import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
	currentUser: IUser | null
	logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an authProvider")
	}
	return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const { isLoading } = useAppSelector((state) => state.authReducer)
	const dispatch = useAppDispatch()
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user)
				dispatch(getUserInfo(user.uid))
			}
		})
	}, [])

	if (isLoading) {
		return <>Loading...</>
	}
	const logout = () => {
		signOut(auth).then(() => setCurrentUser(null))
	}

	return <AuthContext.Provider value={{ currentUser, logout }}>{children}</AuthContext.Provider>
}
