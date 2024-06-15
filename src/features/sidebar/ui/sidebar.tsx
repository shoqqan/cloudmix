import { setChats } from "@/entities/userchats/model/userchatsSlice.ts"
import { SidebarItem } from "@/features/sidebar/sidebarItem"
import { SidebarSearchUsersInput } from "@/features/sidebar/sidebarSearchUsersInput"
import { firestore } from "@/main.tsx"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { convertTimestampToTime } from "@/shared/lib/utils.ts"
import clsx from "clsx"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export const Sidebar = () => {
	const { chats } = useAppSelector((state) => state.userchatsReducer)
	const { isSelected } = useAppSelector((state) => state.chatsReducer)
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
						const chatData = Object.entries(doc.data())
							.map(([key, value]: [string, any]) => {
								if (value.date && value.date.seconds) {
									value.date = convertTimestampToTime(value.date.seconds)
								}
								return [key, value]
							})
							.sort((a, b) => b[1].date - a[1].date)
						dispatch(setChats(chatData))
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
		<div
			className={clsx("w-[30rem] h-full flex transition-all flex-col border-r border-r-[#ccd5da]", {
				"lg:invisible lg:w-0": isSelected,
				"lg:visible lg:w-full": !isSelected,
			})}
		>
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
						return (
							<SidebarItem
								key={id}
								id={id}
								user={user}
								name={user.username}
								lastMessage={chatInfo.lastMessage ? chatInfo.lastMessage.text : ""}
								time={chatInfo.date}
								newMessages={0}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
