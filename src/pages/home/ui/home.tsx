import { Header } from "@/entities/header/header.tsx"
import { useAuth } from "@/processes/AuthProvider/AuthProvider.tsx"
import { Button } from "@/shared/ui/button.tsx"

export const Home = () => {
	const { logout } = useAuth()
	return (
		<article className={"w-screen h-screen flex flex-col"}>
			<Header />
			<Button
				onClick={() => {
					logout()
				}}
			>
				Logout
			</Button>
		</article>
	)
}
