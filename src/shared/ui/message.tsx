import React from "react"

interface MessageProps {
	content: string
	isCurrentUser: boolean
}

export const Message: React.FC<MessageProps> = ({ content, isCurrentUser }) => {
	const isCurrentUserStyles = `max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg my-2 ${
		isCurrentUser ? "bg-[#7e57c2] text-white self-end" : "bg-white text-black self-start"
	}`
	return (
		<div className={isCurrentUserStyles} style={{ wordBreak: "break-word" }}>
			{content}
		</div>
	)
}
