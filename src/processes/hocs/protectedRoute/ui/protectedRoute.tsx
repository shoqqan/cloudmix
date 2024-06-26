import { useAuth } from "@/processes/providers/authProvider"
import { ROUTES } from "@/shared/lib"
import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute: React.FC = () => {
	const { currentUser } = useAuth()
	return currentUser ? <Outlet /> : <Navigate to={`/${ROUTES.LOGIN}`} />
}
