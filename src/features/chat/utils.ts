import { firestore } from "@/main.tsx"
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore"
import { v4 as uuid } from "uuid"

const updateChatMessages = async (chatId: string, text: string, senderId: string) => {
	const message = {
		id: uuid(),
		text,
		senderId,
		date: Timestamp.now(),
	}

	await updateDoc(doc(firestore, "chats", chatId), {
		messages: arrayUnion(message),
	})
}

const updateUserChats = async (chatId: string, text: string, userId: string) => {
	const lastMessage = {
		[chatId + ".lastMessage"]: { text },
		[chatId + ".date"]: Timestamp.now(),
	}

	await updateDoc(doc(firestore, "userChats", userId), lastMessage)
}

export const handleSendMessage = async (
	chatId: string,
	text: string,
	currentUser: any,
	user: any,
	setText: (text: string) => void,
) => {
	if (!currentUser || !user) return

	await updateChatMessages(chatId, text, currentUser.uid)
	await updateUserChats(chatId, text, currentUser.uid)
	await updateUserChats(chatId, text, user.uid)

	setText("")
}
