import clsx from "clsx"
import React from "react"

interface MessageProps {
	content: string
	isCurrentUser: boolean
}

export const Message: React.FC<MessageProps> = ({ content, isCurrentUser }) => {
	return (
		<div className={clsx("w-full flex", { "justify-end": isCurrentUser })} style={{ wordBreak: "break-word" }}>
			<div className={clsx("bg-white px-6 py-3 rounded-lg text-black", { "bg-[#9969ff] text-white": isCurrentUser })}>
				{content}
			</div>
		</div>
	)
}
