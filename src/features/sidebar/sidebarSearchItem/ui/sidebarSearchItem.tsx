import { IUser } from "@/entities/user"
import { initializeChat } from "@/features/sidebar"
import { useAppSelector } from "@/shared/hooks"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import type { FC } from "react"

interface ISidebarItemProps {
	searchedUser: IUser
}

export const SidebarSearchItem: FC<ISidebarItemProps> = ({ searchedUser }) => {
	const user = useAppSelector((state) => state.userReducer.userInfo)
	const handleClick = async () => {
		if (!user) return

		try {
			await initializeChat(user, searchedUser)
		} catch (error) {
			showErrorToast(error.message)
		}
	}
	console.log(searchedUser)
	return (
		<div
			className={`w-full px-5 py-6 flex justify-between rounded-lg transition-all items-end border-b border-b-[#ccd5da] hover:bg-purple-300 hover:text-white ${
				searchedUser.uid === user!.uid ? "hidden" : "block"
			}`}
			onClick={handleClick}
		>
			<h1 className={"font-bold text-lg"}>{searchedUser.username}</h1>
		</div>
	)
}
