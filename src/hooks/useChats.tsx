import { type IUser } from "@/entities/user"
import { setChats } from "@/entities/userchats/model/userchatsSlice.ts"
import { firestore } from "@/main.tsx"
import { useAppDispatch } from "@/shared/hooks"
import { convertTimestampToTime } from "@/shared/lib/utils.ts"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"

export const useChats = (userInfo: IUser | null) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!userInfo || !userInfo.uid) {
			return
		}

		const unsubscribe = onSnapshot(
			doc(firestore, "userChats", userInfo.uid),
			(docSnapshot) => {
				if (docSnapshot.exists()) {
					const chatData = Object.entries(docSnapshot.data())
						.sort((a, b) => b[1].date - a[1].date)
						.map(([key, value]: [string, any]) => {
							if (value.date && value.date.seconds) {
								value.date = convertTimestampToTime(value.date.seconds)
							}
							return [key, value]
						})
					dispatch(setChats(chatData))
				} else {
					console.error("No such document!")
				}
			},
			(error) => {
				console.error("Error getting document:", error)
			},
		)

		return () => unsubscribe()
	}, [userInfo, dispatch])
}
