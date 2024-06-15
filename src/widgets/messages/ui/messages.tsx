import { useAppSelector, useChatMessages } from "@/shared/hooks"
import { Message } from "@/shared/ui"

export const Messages = () => {
	const { userInfo } = useAppSelector((state) => state.userReducer)
	const { messages, chatId } = useAppSelector((state) => state.chatsReducer)
	useChatMessages(chatId)
	return (
		<div className={"h-96 grow flex flex-col gap-6 bg-[#FBFBFB] overflow-y-scroll p-10"}>
			{messages.map((message, index) => (
				<Message key={index} content={message.text} isCurrentUser={message.senderId === userInfo.uid} />
			))}
		</div>
	)
}
