import type { AppDispatch } from "@/app/store.ts"
import type { IMessage } from "@/entities/chats"
import { setMessages } from "@/entities/chats"
import { sendMessageToGPT } from "@/entities/chats/model/chatsSliceThunk.ts"
import type { IUser } from "@/entities/user"
import { firestore } from "@/main.tsx"
import { toasters } from "@/shared/lib"
import { arrayUnion, collection, doc, getDocs, Timestamp, updateDoc, writeBatch } from "firebase/firestore"
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
	currentUser: Partial<IUser>,
	user: Partial<IUser>,
) => {
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

export const changeOnlineStatus = async (userId: string, isOnline: boolean) => {
	const userDocRef = doc(firestore, "users", userId)
	const userChatsCollectionRef = collection(firestore, "userChats")

	try {
		await updateDoc(userDocRef, {
			isOnline,
		})

		const querySnapshot = await getDocs(userChatsCollectionRef)

		if (querySnapshot.empty) {
			console.log(`No documents found in userChats collection`)
			return
		}

		const batch = writeBatch(firestore)

		querySnapshot.forEach((docSnapshot) => {
			const userChatsData = docSnapshot.data()
			const updates = {}

			for (const [key, value] of Object.entries(userChatsData)) {
				if (value?.userInfo?.uid === userId) {
					updates[`${key}.userInfo.isOnline`] = isOnline
				}
			}

			if (Object.keys(updates).length > 0) {
				const userChatRef = doc(firestore, `userChats/${docSnapshot.id}`)
				batch.update(userChatRef, updates)
			}
		})

		await batch.commit()
		console.log("User online status updated successfully")
	} catch (err) {
		console.error("Error updating online status: ", err)
		toasters.showErrorToast(err.message)
		throw err
	}
}
