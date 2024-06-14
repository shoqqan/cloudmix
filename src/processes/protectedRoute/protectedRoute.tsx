import { useAuth } from "@/processes/authProvider/AuthProvider.tsx"
import { ROUTES } from "@/shared/lib/routes.ts"
import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute: React.FC = () => {
	const { currentUser } = useAuth()

	return currentUser ? <Outlet /> : <Navigate to={`/${ROUTES.LOGIN}`} />
}
