import { useChatMessages } from "@/hooks"
import { useAppSelector } from "@/shared/hooks"
import { Message } from "@/shared/ui"

export const Messages = () => {
	const { userInfo } = useAppSelector((state) => state.userReducer)
	const { messages, chatId, isGPTLoading } = useAppSelector((state) => state.chatsReducer)
	useChatMessages(chatId)
	return (
		<div className={"h-96 grow flex flex-col gap-6 bg-[#FBFBFB] overflow-y-scroll p-10"}>
			{isGPTLoading && (
				<div className={"w-full h-full flex justify-center items-center"}>
					<div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-[#9969FF] border-t-transparent" />
				</div>
			)}
			{messages.map((message, index) => (
				<Message
					key={index}
					content={message.text}
					isCurrentUser={message.senderId === userInfo.uid || message.senderId == userInfo.username}
				/>
			))}
		</div>
	)
}
