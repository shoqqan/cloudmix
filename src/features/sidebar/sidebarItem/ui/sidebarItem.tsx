import { updateConversation } from "@/entities/chats"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import clsx from "clsx"
import type { FC } from "react"

interface ISidebarItemProps {
	name: string
	lastMessage: string
	time: string
	newMessages: number
	user: any
	id: string
}

export const SidebarItem: FC<ISidebarItemProps> = ({ id, user, newMessages, lastMessage, time, name }) => {
	const dispatch = useAppDispatch()
	const { chatId, isSelected } = useAppSelector((state) => state.chatsReducer)
	const handleSelect = () => {
		dispatch(updateConversation(user))
	}
	console.log(chatId, id)
	return (
		<div
			className={clsx(
				"w-full px-5 py-6 bg-white transition-all flex justify-between items-end border-b border-b-[#ccd5da] lg:bg-white",
				{
					"bg-purple-100": chatId === id,
				},
			)}
			onClick={handleSelect}
		>
			<div className={"flex flex-col gap-2"}>
				<h1 className={"font-bold text-lg"}>{name}</h1>
				<p className={"text-[#8B8594]"}>{lastMessage}</p>
			</div>
			<div className={"flex flex-col justify-center items-center gap-2"}>
				{newMessages !== 0 && (
					<div className={"w-6 h-6 rounded-full bg-[#9969ff] flex justify-center items-center text-white text-sm"}>
						{newMessages}
					</div>
				)}
				<p className={"text-[#8B8594]"}>{time}</p>
			</div>
		</div>
	)
}
