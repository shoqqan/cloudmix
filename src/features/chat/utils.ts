import { AppDispatch } from "@/app/store.ts"
import { IMessage, setMessages } from "@/entities/chats"
import { sendMessageToGPT } from "@/entities/chats/model/chatsSliceThunk.ts"
import { IUser } from "@/entities/user"
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

export const handleSendMessage = async (chatId: string, text: string, currentUser: any, user: any) => {
	if (!currentUser || !user) return

	await updateChatMessages(chatId, text, currentUser.uid)
	await updateUserChats(chatId, text, currentUser.uid)
	await updateUserChats(chatId, text, user.uid)
}

export const sendMessage = async (
	chatId: string,
	text: string,
	currentUser: IUser,
	user: IUser,
	dispatch: AppDispatch,
	messages: IMessage[],
) => {
	if (user.uid !== "chatgptid") {
		await handleSendMessage(chatId, text, currentUser, user)
	} else {
		const newMessage: IMessage = {
			id: uuid(),
			text,
			date: Date.now(),
			senderId: currentUser.uid,
		}
		dispatch(setMessages([...messages, newMessage]))
		dispatch(sendMessageToGPT({ username: currentUser.username, message: text }))
	}
}
