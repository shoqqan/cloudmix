import { Chat } from "@/entities/chat/chat.tsx"
import { Header } from "@/entities/header/header.tsx"
import { Sidebar } from "@/entities/sidebar/ui/sidebar.tsx"
import { useAppSelector } from "@/shared/hooks/useAppSelector.ts"

export const Home = () => {
	const user = useAppSelector((state) => state.userReducer.userInfo)
	console.log(user)
	return (
		<article className={"w-screen h-screen flex flex-col"}>
			<Header />
			<main className={"w-full h-full flex"}>
				<Sidebar />
				<Chat />
			</main>
		</article>
	)
}
