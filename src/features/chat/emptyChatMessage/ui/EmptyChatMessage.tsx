import { FC } from "react"

export const EmptyChatMessage: FC = () => (
	<div className="w-full h-full flex justify-center py-32">
		<div className="w-fit h-fit bg-purple-800 text-white px-2 py-1 opacity-60 rounded-lg">
			Select chat to start messaging
		</div>
	</div>
)
