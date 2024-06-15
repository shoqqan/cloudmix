import { firestore } from "@/main.tsx"
import { useAppSelector } from "@/shared/hooks"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import type { FC } from "react"

interface ISidebarItemProps {
	uid: string
	name: string
}

export const SidebarSearchItem: FC<ISidebarItemProps> = ({ uid, name }) => {
	const user = useAppSelector((state) => state.userReducer.userInfo)
	return (
		<div
			className={`w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da] ${
				uid === user!.uid ? "hidden" : "block"
			}`}
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
								[combinedId + ".date"]: Timestamp.now(),
							})
							await updateDoc(doc(firestore, "userChats", uid), {
								[combinedId + ".userInfo"]: {
									uid: user.uid,
									username: user.username,
								},
								[combinedId + ".date"]: Timestamp.now(),
							})
						}
					} catch (error) {
						showErrorToast(error.message)
					}
				}
			}}
		>
			<div className={"flex flex-col gap-2 bg-[#ccd5da] px-4 py-1 rounded-md"}>
				<h1 className={"font-bold text-lg"}>{name}</h1>
			</div>
		</div>
	)
}
