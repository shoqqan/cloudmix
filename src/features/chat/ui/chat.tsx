import { ChatContent } from "@/features/chat/chatContent"
import { EmptyChatMessage } from "@/features/chat/emptyChatMessage"
import { useAppSelector } from "@/shared/hooks"
import clsx from "clsx"
import { FC } from "react"

export const Chat: FC = () => {
	const { user, isSelected, chatId } = useAppSelector((state) => state.chatsReducer)
	console.log(chatId)
	return (
		<div
			className={clsx("w-full transition-all h-full flex flex-col justify-between", {
				"lg:visible lg:w-full": isSelected,
				"lg:invisible lg:w-0": !isSelected,
			})}
		>
			{user ? <ChatContent username={user.username} isOnline={true} /> : <EmptyChatMessage />}
		</div>
	)
}
