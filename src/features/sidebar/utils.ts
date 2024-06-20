import { IUser } from "@/entities/user"
import { firestore } from "@/main.tsx"
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore"

export const initializeChat = async (user: IUser, searchedUser: IUser) => {
	const combinedId = user.uid > searchedUser.uid ? user.uid + searchedUser.uid : searchedUser.uid + user.uid
	const chatDocRef = doc(firestore, "chats", combinedId)

	const chat = await getDoc(chatDocRef)
	if (!chat.exists()) {
		await setDoc(chatDocRef, { messages: [] })

		const searchedUserDocRef = doc(firestore, "users", searchedUser.uid)
		const searchedUserDoc = await getDoc(searchedUserDocRef)
		const searchedUserData = searchedUserDoc.data()
		const searchedUserIsOnline = searchedUserData?.isOnline || false

		await updateDoc(doc(firestore, "userChats", user.uid), {
			[`${combinedId}.userInfo`]: {
				uid: searchedUser.uid,
				username: searchedUser.username,
				isOnline: searchedUserIsOnline,
			},
			[`${combinedId}.date`]: Timestamp.now(),
		})

		const userDocRef = doc(firestore, "users", user.uid)
		const userDoc = await getDoc(userDocRef)
		const userData = userDoc.data()
		const userIsOnline = userData?.isOnline || false

		await updateDoc(doc(firestore, "userChats", searchedUser.uid), {
			[`${combinedId}.userInfo`]: {
				uid: user.uid,
				username: user.username,
				isOnline: userIsOnline,
			},
			[`${combinedId}.date`]: Timestamp.now(),
		})
	}
}
