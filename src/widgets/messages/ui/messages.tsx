import { useAppSelector } from "@/shared/hooks"
import { Message } from "@/shared/ui"
import { FC } from "react"

interface IMessagesProps {
	messages: any[]
}

export const Messages: FC<IMessagesProps> = ({ messages }) => {
	// const messages = [
	// 	{ content: "Yo Samurai, me and pokemon head will going to Dostyk, will u join?", isCurrentUser: false },
	// 	{ content: "Okay what exactly we're doing there?", isCurrentUser: true },
	// 	{ content: "First of all, could we have a snack at Memo's", isCurrentUser: true },
	// 	{ content: "We'll have to look for a gift for Alina", isCurrentUser: false },
	// 	{ content: "Ok cool", isCurrentUser: false },
	// ]
	const { userInfo } = useAppSelector((state) => state.userReducer)
	return (
		<div className={"flex-1 flex flex-col justify-end gap-6 bg-[#FBFBFB] overflow-y-auto p-10"}>
			{messages.map((message, index) => (
				<Message key={index} content={message.text} isCurrentUser={message.senderId === userInfo.uid} />
			))}
		</div>
	)
}
