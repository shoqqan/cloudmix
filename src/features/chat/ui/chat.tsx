import { ChatHeader } from "@/features/chat/chatHeader"
import { ChatInput } from "@/features/chat/chatInput"
import { useAppSelector } from "@/shared/hooks"
import { Messages } from "@/widgets/messages"
import clsx from "clsx"
import { FC } from "react"

export const Chat: FC = () => {
	const { user } = useAppSelector((state) => state.chatsReducer)
	const { isSelected } = useAppSelector((state) => state.chatsReducer)
	console.log(user)
	return (
		<div
			className={clsx("w-full transition-all h-full flex flex-col justify-between", {
				"lg:visible lg:w-full": isSelected,
				"lg:invisible lg:w-0": !isSelected,
			})}
		>
			{!user && (
				<div className={"w-full h-full flex justify-center py-32"}>
					<div className={"w-fit h-fit bg-purple-800 text-white px-2 py-1 opacity-60 rounded-lg"}>
						Select chat to start messaging
					</div>
				</div>
			)}
			{user && (
				<>
					<ChatHeader username={user.username} isOnline={true} />
					<Messages />
					<ChatInput />
				</>
			)}
		</div>
	)
}
