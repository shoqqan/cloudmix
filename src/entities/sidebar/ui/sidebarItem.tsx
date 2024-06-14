import { firestore } from "@/main.tsx"
import { useAppSelector } from "@/shared/hooks/useAppSelector.ts"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import type { FC } from "react"

interface ISidebarItemProps {
	uid: string
	name: string
	lastMessage: string
	time: string
	newMessages: number
}

export const SidebarItem: FC<ISidebarItemProps> = ({ uid, newMessages, lastMessage, time, name }) => {
	const user = useAppSelector((state) => state.userReducer.userInfo)
	return (
		<div
			className={"w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da]"}
			onClick={async () => {
				if (user) {
					const combinedId = user.uid > uid ? user.uid + uid : uid + user.uid
					try {
						const chat = await getDoc(doc(firestore, "chats", combinedId))
						if (!chat.exists()) {
							await setDoc(doc(firestore, "chats", combinedId), { messages: [] })
							await updateDoc(doc(firestore, "userChats", user.uid), {
								[combinedId + ".userInfo"]: {
									uid: uid,
									username: name,
								},
								[combinedId + ".date"]: serverTimestamp(),
							})
							await updateDoc(doc(firestore, "userChats", uid), {
								[combinedId + ".userInfo"]: {
									uid: user.uid,
									username: user.username,
								},
								[combinedId + ".date"]: serverTimestamp(),
							})
						}
					} catch (error) {
						showErrorToast(error.message)
					}
					//
				}
			}}
		>
			<div className={"flex flex-col gap-2"}>
				<h1 className={"font-bold text-lg"}>{name}</h1>
				<p className={"text-[#8B8594]"}>{lastMessage}</p>
			</div>
			<div className={"flex flex-col justify-center items-center gap-2"}>
				{newMessages !== 0 && (
					<div className={"w-6 h-6 rounded-full bg-[#9969ff] flex justify-center items-center text-white text-sm"}>
						{newMessages}
					</div>
				)}
				<p className={"text-[#8B8594]"}>{time}</p>
			</div>
		</div>
	)
}
