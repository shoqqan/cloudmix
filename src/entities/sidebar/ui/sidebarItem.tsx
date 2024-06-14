import React, { FC } from "react"

interface ISidebarItemProps {
	name: string
	lastMessage: string
	time: string
	newMessages: number
}

export const SidebarItem: FC<ISidebarItemProps> = ({ newMessages, lastMessage, time, name }) => {
	return (
		<div className={"w-full px-5 py-6 flex justify-between items-end border-b border-b-[#ccd5da]"}>
			<div className={"flex flex-col gap-2"}>
				<h1 className={"font-bold text-lg"}>{name}</h1>
				<p className={"text-[#8B8594]"}>{lastMessage}</p>
			</div>
			<div className={"flex flex-col justify-center items-center gap-2"}>
				{newMessages && (
					<div className={"w-6 h-6 rounded-full bg-[#9969ff] flex justify-center items-center text-white text-sm"}>
						{newMessages}
					</div>
				)}
				<p className={"text-[#8B8594]"}>{time}</p>
			</div>
		</div>
	)
}
