import { firestore } from "@/main.tsx"
import { useAppSelector } from "@/shared/hooks"
import { InputWithButton } from "@/shared/ui"
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { v4 as uuid } from "uuid"

export const ChatInput = () => {
	const { chatId, currentUser, user } = useAppSelector((state) => state.chatsReducer)
	const [text, setText] = useState("")
	const handleSend = async () => {
		if (currentUser && user) {
			await updateDoc(doc(firestore, "chats", chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			})
			await updateDoc(doc(firestore, "userChats", currentUser.uid), {
				[chatId + ".lastMessage"]: {
					text,
				},
				[chatId + ".date"]: Timestamp.now(),
			})
			await updateDoc(doc(firestore, "userChats", user.uid), {
				[chatId + ".lastMessage"]: {
					text,
				},
				[chatId + ".date"]: Timestamp.now(),
			})
			setText("")
		}
	}
	return (
		<div className="h-20 bg-[#FBFBFB] border-t border-t-[#ccd5da] px-5 flex justify-center items-center">
			<InputWithButton
				placeholder={"Write a message..."}
				text={text}
				onSubmit={handleSend}
				setText={setText}
				disabled={text.trim().length === 0}
			/>
		</div>
	)
}
