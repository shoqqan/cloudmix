import { setChats } from "@/entities/userchats/model/userchatsSlice.ts"
import { SidebarItem } from "@/features/sidebar/sidebarItem"
import { SidebarSearchUsersInput } from "@/features/sidebar/sidebarSearchUsersInput"
import { firestore } from "@/main.tsx"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export const Sidebar = () => {
	const { chats } = useAppSelector((state) => state.userchatsReducer)
	const userInfo = useAppSelector((state) => state.userReducer.userInfo)
	const dispatch = useAppDispatch()
	const [isFocused, setIsFocused] = useState(false)
	useEffect(() => {
		if (!userInfo || !userInfo.uid) {
			return
		}
		const getChats = () => {
			const unsub = onSnapshot(
				doc(firestore, "userChats", userInfo.uid),
				(doc) => {
					if (doc.exists()) {
						console.log(Object.entries(doc.data()))
						dispatch(setChats(Object.entries(doc.data()).sort((a, b) => b[1].date - a[1].date)))
					} else {
						console.error("No such document!")
					}
				},
				(error) => {
					console.error("Error getting document:", error)
				},
			)
			return () => unsub()
		}

		const unsubscribe = getChats()
		return () => unsubscribe()
	}, [userInfo])
	return (
		<div className={"w-[30rem] h-full flex flex-col border-r border-r-[#ccd5da]"}>
			<SidebarSearchUsersInput isFocused={isFocused} setIsFocused={setIsFocused} />
			{chats && (
				<div className={`transition-all ${isFocused ? "collapse hidden" : "visible block"}`}>
					<div
						className={
							"w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da] text-xl font-bold bg-[#FBFBFB]"
						}
					>
						Messages({chats.length})
					</div>
					{chats.map((chat) => {
						const id = chat[0]
						const chatInfo = chat[1]
						const user = chat[1].userInfo
						console.log(chatInfo)
						return (
							<SidebarItem
								key={id}
								user={user}
								uid={user.uid}
								name={user.username}
								lastMessage={chatInfo.lastMessage.text ? chatInfo.lastMessage.text : "no last message"}
								time={"10:44"}
								newMessages={0}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
