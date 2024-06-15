import { handleSendMessage } from "@/features/chat"
import { useAppSelector } from "@/shared/hooks"
import { toasters } from "@/shared/lib"
import { InputWithButton } from "@/shared/ui"
import { useState } from "react"

export const ChatInput = () => {
	const { chatId, currentUser, user } = useAppSelector((state) => state.chatsReducer)
	const [text, setText] = useState("")
	const [isDisabled, setIsDisabled] = useState(false)
	const handleSend = async () => {
		setIsDisabled(true)
		try {
			await handleSendMessage(chatId, text, currentUser, user, setText)
			setIsDisabled(false)
		} catch (error) {
			toasters.showErrorToast(error)
		}
	}
	return (
		<div className="h-20 bg-[#FBFBFB] border-t border-t-[#ccd5da] px-5 flex justify-center items-center">
			<InputWithButton
				placeholder={"Write a message..."}
				text={text}
				onSubmit={handleSend}
				setText={setText}
				disabled={text.trim().length === 0 || isDisabled}
			/>
		</div>
	)
}
