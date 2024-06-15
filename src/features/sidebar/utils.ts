import { IUser } from "@/entities/user"
import { firestore } from "@/main.tsx"
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore"

export const initializeChat = async (user: IUser, uid: string, name: string) => {
	const combinedId = user.uid > uid ? user.uid + uid : uid + user.uid
	const chatDocRef = doc(firestore, "chats", combinedId)

	const chat = await getDoc(chatDocRef)
	if (!chat.exists()) {
		await setDoc(chatDocRef, { messages: [] })
		await updateDoc(doc(firestore, "userChats", user.uid), {
			[`${combinedId}.userInfo`]: {
				uid: uid,
				username: name,
			},
			[`${combinedId}.date`]: Timestamp.now(),
		})
		await updateDoc(doc(firestore, "userChats", uid), {
			[`${combinedId}.userInfo`]: {
				uid: user.uid,
				username: user.username,
			},
			[`${combinedId}.date`]: Timestamp.now(),
		})
	}
}
