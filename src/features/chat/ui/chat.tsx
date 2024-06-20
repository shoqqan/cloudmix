import { ChatContent } from "@/features/chat/chatContent"
import { EmptyChatMessage } from "@/features/chat/emptyChatMessage"
import { useAppSelector, useChatinfo } from "@/shared/hooks"
import clsx from "clsx"
import { type FC } from "react"

export const Chat: FC = () => {
	const { user, currentUser, isSelected, chatId } = useAppSelector((state) => state.chatsReducer)
	useChatinfo(chatId, currentUser.uid)
	return (
		<div
			className={clsx("w-full transition-all h-full flex flex-col justify-between", {
				"lg:visible lg:w-full": isSelected,
				"lg:invisible lg:w-0": !isSelected,
			})}
		>
			{user ? (
				<ChatContent username={user.username} isOnline={user.uid !== "chatgptid" ? user.isOnline : true} />
			) : (
				<EmptyChatMessage />
			)}
		</div>
	)
}
