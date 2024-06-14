import { Chat } from "@/features/chat"
import { Sidebar } from "@/features/sidebar"
import { Header } from "@/widgets/header"

export const Home = () => {
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
