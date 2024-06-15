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
			className={`w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da] ${
				uid === user!.uid ? "hidden" : "block"
			}`}
			onClick={handleClick}
		>
			<div className={"flex flex-col gap-2 bg-[#ccd5da] px-4 py-1 rounded-md"}>
				<h1 className={"font-bold text-lg"}>{name}</h1>
			</div>
		</div>
	)
}
