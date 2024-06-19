import { changeOnlineStatus, Chat } from "@/features/chat"
import { Sidebar } from "@/features/sidebar"
import { useAppSelector } from "@/shared/hooks"
import { Header } from "@/widgets/header"
import { useEffect } from "react"

export const Home = () => {
	const { userInfo } = useAppSelector((state) => state.userReducer)
	useEffect(() => {
		if (!userInfo) return
		changeOnlineStatus(userInfo.uid, true)
		return () => {
			changeOnlineStatus(userInfo.uid, false)
		}
	}, [])
	return (
		<article className={"w-screen h-screen overflow-hidden flex flex-col"}>
			<Header />
			<main className={"w-full h-full overflow-hidden flex"}>
				<Sidebar />
				<Chat />
			</main>
		</article>
	)
}
