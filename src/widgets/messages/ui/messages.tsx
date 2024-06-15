import { setMessages } from "@/entities/chats"
import { firestore } from "@/main.tsx"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { convertTimestampToTime } from "@/shared/lib/utils.ts"
import { Message } from "@/shared/ui"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"

export const Messages = () => {
	const { userInfo } = useAppSelector((state) => state.userReducer)
	const { messages, chatId } = useAppSelector((state) => state.chatsReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (chatId) {
			const chatDocRef = doc(firestore, "chats", chatId)
			const unsub = onSnapshot(chatDocRef, (doc) => {
				if (doc.exists()) {
					const data = doc.data()
					if (data) {
						dispatch(setMessages(data.messages.map((el) => ({ ...el, date: convertTimestampToTime(el.date.seconds) }))))
					}
				} else {
					console.error("Document does not exist")
				}
			})

			return () => {
				unsub()
			}
		} else return
	}, [chatId, dispatch])
	return (
		<div className={"h-96 grow flex flex-col gap-6 bg-[#FBFBFB] overflow-y-scroll p-10"}>
			{messages.map((message, index) => (
				<Message key={index} content={message.text} isCurrentUser={message.senderId === userInfo.uid} />
			))}
		</div>
	)
}
