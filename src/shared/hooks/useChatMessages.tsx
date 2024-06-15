import { setMessages } from "@/entities/chats"
import { firestore } from "@/main.tsx"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts"
import { convertTimestampToTime } from "@/shared/lib/utils.ts"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"

export const useChatMessages = (chatId: string | null) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!chatId) return

		const chatDocRef = doc(firestore, "chats", chatId)
		const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
			if (docSnapshot.exists()) {
				const chatData = docSnapshot.data()
				if (chatData) {
					const formattedMessages = chatData.messages.map((message: { date: { seconds: number } }) => ({
						...message,
						date: convertTimestampToTime(message.date.seconds),
					}))
					dispatch(setMessages(formattedMessages))
				}
			} else {
				console.error("Document does not exist")
			}
		})

		return () => unsubscribe()
	}, [chatId, dispatch])
}
