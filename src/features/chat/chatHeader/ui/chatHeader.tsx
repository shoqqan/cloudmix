import { setIsSelected } from "@/entities/chats"
import back from "@/shared/assets/images/back.svg"
import { useAppDispatch } from "@/shared/hooks"
import { FC } from "react"

interface IChatHeaderProps {
	username: string
	isOnline: boolean
}

export const ChatHeader: FC<IChatHeaderProps> = ({ isOnline, username }) => {
	const dispatch = useAppDispatch()
	return (
		<div className={"h-20 py-5 px-5 flex gap-x-3"}>
			<img
				src={back}
				className={"w-7"}
				alt={"go back"}
				onClick={() => {
					dispatch(setIsSelected(false))
				}}
			/>
			<div className=" border-b border-b-[#ccd5da] flex flex-col justify-center">
				<h2 className="font-bold text-lg">{username}</h2>
				<p className="text-[#8B8594]">{isOnline ? "Online" : "Offline"}</p>
			</div>
		</div>
	)
}
