import type { IUser } from "@/entities/user/model/types"
import { getUserInfo } from "@/entities/user/model/userSliceThunk"
import { auth } from "@/main"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { onAuthStateChanged, signOut } from "firebase/auth"
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
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null)
	const { isLoading } = useAppSelector((state) => state.authReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user as IUser)
				dispatch(getUserInfo(user.uid))
			} else {
				setCurrentUser(null)
			}
		})

		return () => unsubscribe()
	}, [dispatch])

	if (isLoading) {
		return (
			<div className={"w-screen h-screen flex justify-center items-center"}>
				<div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
			</div>
		)
	}

	const logout = () => {
		signOut(auth).then(() => setCurrentUser(null))
	}

	return <AuthContext.Provider value={{ currentUser, logout }}>{children}</AuthContext.Provider>
}
