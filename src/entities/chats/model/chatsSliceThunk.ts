import { IMessage } from "@/entities/chats"
import { toasters } from "@/shared/lib"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getMessagesFromGPT = createAsyncThunk(
	"chats/getMessagesFromBot",
	async (uid: string): Promise<IMessage[]> => {
		try {
			const response = await axios.get(`http://195.49.210.50:7676/messages/${uid}`)
			const messagesData = await response.data
			return messagesData.map((el) => ({
				date: "20:20",
				id: el.id.toString(),
				senderId: el.chatgpt ? "chatgpt" : uid,
				text: el.text,
			}))
		} catch (error) {
			showErrorToast(`Error when try to get gpt messages: ${error}`)
			throw error
		}
	},
)

export const sendMessageToGPT = createAsyncThunk(
	"chats/sendMessageToBot",
	async ({ username, message }: { username: string; message: string }): Promise<string> => {
		try {
			const response = await axios.post("http://195.49.210.50:7676/send-message", {
				user: username,
				message,
			})
			const messageData = await response.data
			return messageData
		} catch (error) {
			toasters.showErrorToast(error.message)
			throw Error(error.message)
		}
	},
)
