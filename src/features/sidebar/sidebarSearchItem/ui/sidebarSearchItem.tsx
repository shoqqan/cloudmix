import { initializeChat } from "@/features/sidebar"
import { useAppSelector } from "@/shared/hooks"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import type { FC } from "react"

interface ISidebarItemProps {
	uid: string
	name: string
}

export const SidebarSearchItem: FC<ISidebarItemProps> = ({ uid, name }) => {
	const user = useAppSelector((state) => state.userReducer.userInfo)
	const handleClick = async () => {
		if (!user) return

		try {
			await initializeChat(user, uid, name)
		} catch (error) {
			showErrorToast(error.message)
		}
	}
	return (
		<div
			className={`w-full px-5 py-6 flex justify-between rounded-lg transition-all items-end border-b border-b-[#ccd5da] hover:bg-purple-300 hover:text-white ${
				uid === user!.uid ? "hidden" : "block"
			}`}
			onClick={handleClick}
		>
			<h1 className={"font-bold text-lg"}>{name}</h1>
		</div>
	)
}
