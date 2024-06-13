import { useAuth } from "@/processes/AuthProvider/AuthProvider.tsx"
import { Button } from "@/shared/ui/button.tsx"
import React from "react"

export const Home = () => {
	const { logout } = useAuth()
	return (
		<div>
			<p>HomePage</p>
			<Button
				onClick={() => {
					logout()
				}}
			>
				Logout
			</Button>
		</div>
	)
}
