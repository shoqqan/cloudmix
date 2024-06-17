import { SidebarItem } from "@/features/sidebar/sidebarItem"
import { SidebarSearchUsersInput } from "@/features/sidebar/sidebarSearchUsersInput"
import { useAppSelector, useChats } from "@/shared/hooks"
import clsx from "clsx"
import { FC, useState } from "react"

export const Sidebar: FC = () => {
	const { chats } = useAppSelector((state) => state.userchatsReducer)
	const { isSelected } = useAppSelector((state) => state.chatsReducer)
	const userInfo = useAppSelector((state) => state.userReducer.userInfo)
	const [isFocused, setIsFocused] = useState(false)

	useChats(userInfo)

	return (
		<div
			className={clsx("w-[30rem] h-full flex transition-all flex-col overflow-y-scroll border-r border-r-[#ccd5da]", {
				"lg:invisible lg:w-0": isSelected,
				"lg:visible lg:w-full": !isSelected,
			})}
		>
			<SidebarSearchUsersInput isFocused={isFocused} setIsFocused={setIsFocused} />

			<div className={`transition-all ${isFocused ? "collapse hidden" : "visible block"}`}>
				<div
					className={
						"w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da] text-xl font-bold bg-[#FBFBFB]"
					}
				>
					Messages({chats.length + 1})
				</div>
				<SidebarItem
					key={"chatgptid"}
					id={"chatgptid"}
					user={{
						username: "CloudGPT",
						uid: "chatgptid",
					}}
					name={"CloudGPT"}
					lastMessage={"Lets talk wit AI!"}
					time={"Try it now"}
					newMessages={1}
				/>
				{chats &&
					chats.map((chat) => {
						const id = chat[0]
						const chatInfo = chat[1]
						const user = chatInfo.userInfo
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
		</div>
	)
}
