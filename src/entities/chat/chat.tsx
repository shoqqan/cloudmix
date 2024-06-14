import { InputWithButton } from "@/shared/ui/inputWithButton.tsx"
import { Message } from "@/shared/ui/message.tsx"

export const Chat = () => {
	const messages = [
		{ content: "Yo Samurai, me and pokemon head will going to Dostyk, will u join?", isCurrentUser: false },
		{ content: "Okay what exactly we're doing there?", isCurrentUser: true },
		{ content: "First of all, could we have a snack at Memo's", isCurrentUser: true },
		{ content: "We'll have to look for a gift for Alina", isCurrentUser: false },
		{ content: "Ok cool", isCurrentUser: false },
	]
	return (
		<div className={"w-full h-full flex flex-col"}>
			<div className={"h-20 py-5 px-5 border-b border-b-[#ccd5da] flex flex-col justify-center"}>
				<h2 className={"font-bold text-lg"}>Aslan</h2>
				<p className={"text-[#8B8594]"}>Online</p>
			</div>
			<div className={"flex-1 bg-[#FBFBFB] overflow-y-auto px-5 py-3"}>
				{messages.map((message, index) => (
					<Message key={index} content={message.content} isCurrentUser={message.isCurrentUser} />
				))}
			</div>
			<div className={"h-20 bg-[#FBFBFB] border-t border-t-[#ccd5da] px-5 flex justify-center items-center"}>
				<InputWithButton />
			</div>
		</div>
	)
}
