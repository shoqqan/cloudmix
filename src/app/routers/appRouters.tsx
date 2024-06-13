import { Auth } from "@/pages/auth"
import { Home } from "@/pages/home"
import { AuthProvider } from "@/processes/AuthProvider/AuthProvider.tsx"
import { ProtectedRoute } from "@/processes/protectedRoute/protectedRoute.tsx"
import { PublicRoute } from "@/processes/publicRoute/publicRoute.tsx"
import { ROUTES } from "@/shared/lib/routes.ts"
import { AUTH } from "@/shared/types/authTypes.ts"
import { Route, Routes } from "react-router-dom"

export const AppRouters = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path={ROUTES.LOGIN} element={<Auth type={AUTH.LOGIN} />} />
					<Route path={ROUTES.REGISTRATION} element={<Auth type={AUTH.REGISTER} />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route path={ROUTES.CHAT} element={<Home />} />
				</Route>
			</Routes>
		</AuthProvider>
	)
}
