import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import {ROUTES} from "@/shared/lib/routes.ts";
import {useAuth} from "@/processes/AuthProvider/AuthProvider.tsx";

export const ProtectedRoute: React.FC = () => {
	const { isAuthenticated } = useAuth()

	return isAuthenticated ? <Outlet /> : <Navigate to={`/${ROUTES.LOGIN}`} />
}

