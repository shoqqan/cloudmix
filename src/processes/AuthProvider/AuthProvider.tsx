import { auth } from "@/main.tsx"
import { onAuthStateChanged, signOut } from "firebase/auth"
import type { ReactNode } from "react"
import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
	isAuthenticated: boolean
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
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsAuthenticated(!!user)
		})

		return () => unsubscribe()
	}, [])

	const logout = () => {
		signOut(auth).then(() => setIsAuthenticated(false))
	}

	return <AuthContext.Provider value={{ isAuthenticated, logout }}>{children}</AuthContext.Provider>
}
