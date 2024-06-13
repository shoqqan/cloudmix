import { Auth } from '@/pages/auth'
import { Home } from '@/pages/home'
import { AUTH } from '@/shared/types/authTypes.ts'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/processes/AuthProvider/AuthProvider.tsx'

export const AppRouters = () => {
	return (
		<AuthProvider>
		<Routes>
			<Route path={'/home'} element={<Home />} />
			<Route path={'/login'} element={<Auth type={AUTH.LOGIN} />} />
			<Route path={'/registration'} element={<Auth type={AUTH.REGISTER} />} />
		</Routes>
		</AuthProvider>
	)
}
