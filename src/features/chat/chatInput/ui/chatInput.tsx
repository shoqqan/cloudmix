import { sendMessage } from "@/features/chat/utils.ts"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { toasters } from "@/shared/lib"
import { InputWithButton } from "@/shared/ui"
import { useState } from "react"

export const ChatInput = () => {
	const dispatch = useAppDispatch()
	const { chatId, currentUser, user, messages } = useAppSelector((state) => state.chatsReducer)
	const [text, setText] = useState("")
	const [isDisabled, setIsDisabled] = useState(false)
	const handleSend = async () => {
		if (user && currentUser) {
			setText("")
			setIsDisabled(true)
			try {
				await sendMessage(chatId, text, currentUser, user, dispatch, messages)
				setIsDisabled(false)
			} catch (error) {
				toasters.showErrorToast(error)
				setIsDisabled(false)
			}
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
