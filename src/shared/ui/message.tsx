import clsx from "clsx"
import React, { useEffect, useRef } from "react"

interface MessageProps {
	content: string
	isCurrentUser: boolean
}

export const Message: React.FC<MessageProps> = ({ content, isCurrentUser }) => {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" })
	}, [content])
	return (
		<div
			ref={ref}
			className={clsx("w-full flex", { "justify-end": isCurrentUser })}
			style={{ wordBreak: "break-word" }}
		>
			<div
				className={clsx("px-6 py-3 rounded-lg", {
					"bg-purple-900 text-white": isCurrentUser,
					"bg-white border border-gray-200 text-black": !isCurrentUser,
				})}
			>
				{content}
			</div>
		</div>
	)
}
