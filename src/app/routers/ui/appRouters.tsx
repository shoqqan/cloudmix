import { Auth } from "@/pages/auth"
import { Home } from "@/pages/home"
import { Welcome } from "@/pages/welcome"
import { ProtectedRoute } from "@/processes/hocs/protectedRoute"
import { PublicRoute } from "@/processes/hocs/publicRoute"
import { AuthProvider } from "@/processes/providers/authProvider"
import { ROUTES } from "@/shared/lib"
import { AUTH } from "@/shared/types"
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
					<Route path={"/"} />
				</Route>
				<Route path={ROUTES.WELCOME} element={<Welcome />} />
			</Routes>
		</AuthProvider>
	)
}
