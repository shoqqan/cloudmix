import { useAuth } from "@/processes/authProvider/AuthProvider.tsx"
import { ROUTES } from "@/shared/lib/routes.ts"
import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoute: React.FC = () => {
	const { currentUser } = useAuth()

	return !!currentUser ? <Navigate to={`/${ROUTES.CHAT}`} /> : <Outlet />
}
