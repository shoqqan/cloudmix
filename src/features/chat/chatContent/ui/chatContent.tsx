import { ChatHeader } from "@/features/chat/chatHeader"
import { ChatInput } from "@/features/chat/chatInput"
import { Messages } from "@/widgets/messages"
import { FC } from "react"

interface IChatContentProps {
	username: string
	isOnline: boolean
}

export const ChatContent: FC<IChatContentProps> = ({ username, isOnline }) => (
	<>
		<ChatHeader username={username} isOnline={isOnline} />
		<Messages />
		<ChatInput />
	</>
)
