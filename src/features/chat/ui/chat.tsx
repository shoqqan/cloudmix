import { setMessages } from "@/entities/chats"
import { ChatInput } from "@/features/chat/chatInput"
import { firestore } from "@/main.tsx"
import { useAppSelector } from "@/shared/hooks"
import { Messages } from "@/widgets/messages"
import { doc, onSnapshot } from "firebase/firestore"
import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"

export const Chat: FC = () => {
	const { user, chatId, messages } = useAppSelector((state) => state.chatsReducer)
	const dispatch = useDispatch()
	console.log("messages", messages)
	useEffect(() => {
		if (chatId) {
			console.log("chatId:", chatId) // Проверка вывода chatId в консоль
			const chatDocRef = doc(firestore, "chats", chatId)
			const unsub = onSnapshot(chatDocRef, (doc) => {
				if (doc.exists()) {
					const data = doc.data()
					if (data) {
						dispatch(setMessages(data.messages))
					}
				} else {
					console.error("Document does not exist")
				}
			})

			return () => {
				unsub()
			}
		}
	}, [chatId, dispatch])

	return (
		<div className="w-full h-full flex flex-col">
			<div className="h-20 py-5 px-5 border-b border-b-[#ccd5da] flex flex-col justify-center">
				<h2 className="font-bold text-lg">{user.username}</h2>
				<p className="text-[#8B8594]">Online</p>
			</div>
			<Messages messages={messages} />
			<ChatInput />
		</div>
	)
}
