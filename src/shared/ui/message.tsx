import clsx from "clsx"
import React from "react"

interface MessageProps {
	content: string
	isCurrentUser: boolean
}

export const Message: React.FC<MessageProps> = ({ content, isCurrentUser }) => {
	console.log(content)
	return (
		<div className={clsx("w-full flex", { "justify-end": isCurrentUser })} style={{ wordBreak: "break-word" }}>
			<div
				className={clsx("bg-white px-6 py-3 rounded-lg text-black", {
					"bg-purple-700 text-white": isCurrentUser,
				})}
			>
				{content}
			</div>
		</div>
	)
}
