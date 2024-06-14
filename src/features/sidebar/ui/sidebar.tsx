import { setChats } from "@/entities/userchats/model/userchatsSlice.ts"
import { SidebarItem } from "@/features/sidebar/sidebarItem"
import { SidebarSearchUsersInput } from "@/features/sidebar/sidebarSearchUsersInput"
import { firestore } from "@/main.tsx"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"

export const Sidebar = () => {
	const { searchedUsers, chats } = useAppSelector((state) => state.userchatsReducer)
	const userInfo = useAppSelector((state) => state.userReducer.userInfo)
	const dispatch = useAppDispatch()
	console.log("chats", chats)
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
						dispatch(setChats(Object.entries(doc.data())))
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
			<SidebarSearchUsersInput />
			{searchedUsers &&
				searchedUsers.map((user) => {
					const key = `search${user.uid}`
					return (
						<SidebarItem key={key} uid={user.uid} name={user.username} lastMessage={""} time={""} newMessages={0} />
					)
				})}
			<div
				className={
					"w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da] text-xl font-bold bg-[#FBFBFB]"
				}
			>
				Messages(3)
			</div>
			{chats.map((chat) => {
				console.log(chat)
				const id = chat[0]
				const user = chat[1].userInfo
				return <SidebarItem key={id} uid={user.uid} name={user.username} lastMessage={""} time={""} newMessages={0} />
			})}
		</div>
	)
}
