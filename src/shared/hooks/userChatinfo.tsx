import { setUser } from "@/entities/chats"
import { firestore } from "@/main.tsx"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"

export const useChatinfo = (chatId: string, currentUserId: string) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!chatId || !currentUserId) return

		const unsubscribe = onSnapshot(doc(firestore, "userChats", currentUserId), (docSnapshot) => {
			const data = docSnapshot.data()
			if (data && data[chatId]) {
				dispatch(setUser(data[chatId].userInfo))
			}
		})

		return () => unsubscribe()
	}, [chatId, currentUserId, dispatch])
}
